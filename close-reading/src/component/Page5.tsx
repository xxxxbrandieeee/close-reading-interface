import React, { useMemo, useContext, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './page5.css'
import './page4.css'
import { Button, Input, message, Radio, Tooltip, type RadioChangeEvent, Tabs, type TabsProps, ConfigProvider } from 'antd'
import allInfo from '../data.js'
import PageContext from '../PageContext';
import CountButton from './Countbtn';
import { shuffleArray } from '../utils'
import * as pageInfo from '../pageInfo'
import { getCurrentConfig } from '../config/projectConfig'

const countdownTime = 1

// Get the current configuration
const config = getCurrentConfig()

// Generate AI's Answer tab items based on configuration
const generateAiAnswerItems = () => {
    if (!config.page6.showAiAnswers || config.page6.aiAnswerCount === 0) {
        return []
    }

    // Generate an index array of the specified length and shuffle it
    const indices = Array.from({ length: config.page6.aiAnswerCount }, (_, i) => i)
    const shuffledIndices = shuffleArray(indices)

    return shuffledIndices.map((item, index) => {
        return {
            key: item.toString(),
            label: `AI's Answer ${index + 1}`,
            children: null,
        }
    })
}

const items = generateAiAnswerItems()

console.log(5555, items);

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    marginBottom: '30px',
};


export default function Page6() {
    const isBlurIndex = useRef(-1)
    const isInKnownAreaRef = useRef(false)
    const { currentPage, key, setCurrentPage } = useContext(PageContext);
    const [isAIShow, setIsAIShow] = useState(true)
    const [valueInfo, setValueInfo] = useState(pageInfo[key].right_answer.info)
    const [tapIndex, setTapIndex] = useState(0)
    const [allTapIndex, setAllTapIndex] = useState([0])
    console.log(2222222, pageInfo[key]);


    useLayoutEffect(() => {
        allInfo[key] = {}
        allInfo[key].copy_text = {}
        allInfo[key].answer_input = {}
        allInfo[key].ai_select_text = []
        allInfo[key].poemItemHover = []
        allInfo[key]['question_hover'] = []
        allInfo[key]['poem_hover'] = []
        allInfo[key]['ai_hover'] = []
        allInfo[key]['answer_hover'] = []
        allInfo[key]['rest_area'] = []
        allInfo[key]['question_total'] = 0
        allInfo[key]['poem_total'] = 0
        allInfo[key]['ai_total'] = 0
        allInfo[key]['answer_total'] = 0
        allInfo[key]['rest_area_total_time'] = 0
        allInfo[key]['tap1'] = [
            {
                type: 'start',
                time: +new Date(),
            }
        ]
    }, [])

    useEffect(() => {
        // Observe whether the end element is visible in the viewport
        const arr = pageInfo[key].right_poem.arr.flat();

        const end = document.querySelector(`.page6_item_${arr.length}`)
        console.log(99999, end);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    allInfo[key].poemScroll = {
                        time: +new Date(),
                        total_num: arr.length,
                        text: arr.at(-1)
                    }
                    console.log(4444444, allInfo);

                    observer.disconnect()
                }
            })
        })
        if (end) {
            observer.observe(end)
        }
        return () => {
            observer.disconnect()
        }
    }, [])

    useEffect(() => {
        const pastefn = (event) => {
            // Get the pasted content
            let clipboardData = event.clipboardData || window.clipboardData;
            let pastedData = clipboardData.getData('text');
            if (isBlurIndex.current !== -1) {
                if (allInfo[key].copy_text[isBlurIndex.current]) {
                    allInfo[key].copy_text[isBlurIndex.current].copy_text.push(pastedData)
                } else {
                    allInfo[key].copy_text[isBlurIndex.current] = {
                        copy_text: [pastedData],
                        title: valueInfo[isBlurIndex.current].title
                    }
                }
            }
            console.log('Pasted content:', pastedData, allInfo[key].copy_text, isBlurIndex.current);
        }

        document.addEventListener('paste', pastefn);
        return () => {
            document.removeEventListener('paste', pastefn)
        }
    }, [])

    const onChange = (k: string) => {
        console.log(33333, key, allInfo[key]);
        setTapIndex(k)
        if (allInfo[key][`tap${parseInt(tapIndex.toString()) + 1}`]) {
            allInfo[key][`tap${parseInt(tapIndex.toString()) + 1}`].push({
                type: 'end',
                time: +new Date(),
            })
        } else {
            allInfo[key][`tap${parseInt(tapIndex.toString()) + 1}`] = [
                {
                    type: 'end',
                    time: +new Date(),
                }
            ]
        }
        if (allInfo[key][`tap${parseInt(k) + 1}`]) {
            allInfo[key][`tap${parseInt(k) + 1}`].push({
                type: 'start',
                time: +new Date(),
            })
        } else {
            allInfo[key][`tap${parseInt(k) + 1}`] = [
                {
                    type: 'start',
                    time: +new Date(),
                }
            ]
        }
        if (!allTapIndex.includes(k)) {
            setAllTapIndex([...allTapIndex, k])
        }
    };

    const disable = useMemo(() => {
        if (!config.page6.showAiAnswers || config.page6.aiAnswerCount === 0) {
            return false
        }
        return allTapIndex.length !== config.page6.aiAnswerCount
    })

    const next = () => {

        if (config.page5.isRequired) {
            for (const element of valueInfo) {
                if (!element.value) {
                    message.error('You need to answer all the questions to proceed.');
                    return
                }
            }
        }

        // Record the end time for all tabs
        for (let i = 1; i <= config.page6.aiAnswerCount; i++) {
            if (allInfo[key][`tap${i}`]?.at(-1)?.type === 'start') {
                allInfo[key][`tap${i}`].push({
                    type: 'end',
                    time: +new Date(),
                })
            }
        }

        console.log(3333333, allInfo[key].tap3);


        for (let index = 0; index < valueInfo.length; index++) {
            let input_total_time = 0
            if (allInfo[key][`input_time_${index}`]) {
                for (let i = 1; i < allInfo[key][`input_time_${index}`].length; i += 2) {
                    const enterTime = allInfo[key][`input_time_${index}`][i - 1].time;
                    const leaveTime = allInfo[key][`input_time_${index}`][i].time;
                    const stayTime = leaveTime - enterTime;
                    input_total_time += stayTime;
                }
            }
            allInfo[key][`input_total_time_${index}`] = input_total_time / 1000;

            let stop_input_total_time = 0
            if (allInfo[key][`stop_input_time_${index}`]) {
                for (let i = 1; i < allInfo[key][`stop_input_time_${index}`].length; i += 2) {
                    const enterTime = allInfo[key][`stop_input_time_${index}`][i - 1].time;
                    const leaveTime = allInfo[key][`stop_input_time_${index}`][i].time;
                    const stayTime = leaveTime - enterTime;
                    stop_input_total_time += stayTime;
                }
            }
        }

        // Calculate the total time spent on each tab
        for (let i = 1; i <= config.page6.aiAnswerCount; i++) {
            let tab_total_time = 0;
            if (allInfo[key][`tap${i}`]) {
                for (let j = 1; j < allInfo[key][`tap${i}`].length; j += 2) {
                    const enterTime = allInfo[key][`tap${i}`][j - 1].time;
                    const leaveTime = allInfo[key][`tap${i}`][j].time;
                    const stayTime = leaveTime - enterTime;
                    tab_total_time += stayTime;
                }
            }
            allInfo[key][`tab_total_time${i}`] = tab_total_time / 1000;
        }

        let hide_total_time = 0
        if (allInfo[key].ai_show) {
            for (let i = 1; i < allInfo[key].ai_show.length; i += 2) {
                const enterTime = allInfo[key].ai_show[i - 1].time;
                const leaveTime = allInfo[key].ai_show[i].time;
                const stayTime = leaveTime - enterTime;
                hide_total_time += stayTime;
            }
        }
        allInfo[key]['hide_total_time'] = hide_total_time / 1000;
        allInfo[key].info = valueInfo

        let rest_area_total_time = 0
        if (allInfo[key].rest_area && allInfo[key].rest_area.length > 0) {
            for (let i = 1; i < allInfo[key].rest_area.length; i += 2) {
                const enterTime = allInfo[key].rest_area[i - 1].time;
                const leaveTime = allInfo[key].rest_area[i].time;
                const stayTime = leaveTime - enterTime;
                rest_area_total_time += stayTime;
            }
        }
        allInfo[key].rest_area_total_time = rest_area_total_time / 1000;

        allInfo[key]['time'] = + new Date()
        console.log('allInfo', allInfo);
        setCurrentPage(currentPage + 1)
    }
    const timer = useRef<any>(null)
    const handTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        const { value } = e.target
        if (timer.current) {
            clearTimeout(timer.current)
        }

        if (!allInfo[key][`stop_input_time_${index}`]) {
            allInfo[key][`stop_input_time_${index}`] = []
        }

        if (allInfo[key][`stop_input_time_${index}`].at(-1)?.type == 'start') {
            allInfo[key][`stop_input_time_${index}`].push({
                type: "end",
                time: +new Date()
            })
        }
        timer.current = setTimeout(() => {
            if (allInfo[key][`input_time_${index}`].at(-1).type !== 'end') {
                allInfo[key][`input_time_${index}`].push({
                    type: "end",
                    time: +new Date()
                })
            }
            console.log(33333333, '3 seconds');

            if (allInfo[key][`stop_input_time_${index}`].at(-1)?.type !== 'start') {
                allInfo[key][`stop_input_time_${index}`].push({
                    type: "start",
                    time: +new Date()
                })
            }
        }, 3000);

        if (allInfo[key][`input_time_${index}`].at(-1).type == "end") {
            allInfo[key][`input_time_${index}`].push({
                type: "start",
                time: +new Date()
            })
        }


        setValueInfo((prev) => {
            const newArr = [...prev]
            newArr[index].value = value
            return newArr
        })
    }

    const handAiMouseUp = () => {
        const selection = window.getSelection();
        if (selection && selection.toString().trim().length > 0) {
            console.log(33333, selection, selection.toString());
            allInfo[key].ai_select_text.push(selection.toString())
        }
    }

    function calculateTimeDifferenceInSeconds(timestamp1: number, timestamp2: number) {
        // Convert timestamps to numbers (ensure inputs are valid timestamps)
        timestamp1 = Number(timestamp1);
        timestamp2 = Number(timestamp2);
        // Check whether the inputs are valid timestamps
        if (isNaN(timestamp1) || isNaN(timestamp2)) {
            return 0
        }

        // Calculate the time difference (in seconds)
        var differenceInSeconds = Math.abs((timestamp2 - timestamp1) / 1000);
        return differenceInSeconds;
    }

    const handleRestAreaEnter = () => {
        if (!allInfo[key]['rest_area']) {
            allInfo[key]['rest_area'] = [
                {
                    type: "enter",
                    time: +new Date()
                }
            ]
        } else {
            allInfo[key]['rest_area'].push({
                type: "enter",
                time: +new Date()
            })
        }
    }

    const handleRestAreaLeave = () => {
        allInfo[key]['rest_area'].push({
            type: "leave",
            time: +new Date()
        })
    }

    const handPageMouseEnter = () => {
        if (!isInKnownAreaRef.current) {
            handleRestAreaEnter()
        }
    }

    const handPageMouseLeave = () => {
        if (!isInKnownAreaRef.current) {
            handleRestAreaLeave()
        }
    }
    const handItemMouseEnter = useCallback(
        (e) => {
            if (e.target.dataset.index == undefined) return
            const index = (e.target.dataset.index) - 1
            console.log(444444, index, pageInfo[key].right_poem.arr.flat()[index]);
            allInfo[key]['poemItemHover'].push({
                index,
                time: + new Date(),
                text: pageInfo[key].right_poem.arr.flat()[index]
            })
        }, [])

    const handLeftTopMouseEnter = () => {
        if (!isInKnownAreaRef.current) {
            handleRestAreaLeave()
        }
        isInKnownAreaRef.current = true
        allInfo[key]['question_hover'].push({
            time: + new Date(),
            type: 'enter'
        })
    }

    const handLeftTopMouseLeave = () => {
        allInfo[key]['question_hover'].push({
            time: + new Date(),
            type: 'leave'
        })
        const len = allInfo[key]['question_hover'].length
        const total = calculateTimeDifferenceInSeconds(allInfo[key]['question_hover'][len - 1].time, allInfo[key]['question_hover'][len - 2].time)
        allInfo[key]['question_total'] += total
        isInKnownAreaRef.current = false
        handleRestAreaEnter()
    }

    const handAIMouseLeave = () => {
        allInfo[key]['ai_hover'].push({
            time: + new Date(),
            type: 'leave'
        })
        const len = allInfo[key]['ai_hover'].length
        const total = calculateTimeDifferenceInSeconds(allInfo[key]['ai_hover'][len - 1].time, allInfo[key]['ai_hover'][len - 2].time)
        allInfo[key]['ai_total'] += total
        isInKnownAreaRef.current = false
        handleRestAreaEnter()
    }

    const handAIMouseEnter = () => {
        if (!isInKnownAreaRef.current) {
            handleRestAreaLeave()
        }
        isInKnownAreaRef.current = true
        allInfo[key]['ai_hover'].push({
            time: + new Date(),
            type: 'enter'
        })

    }

    const handPoemMouseEnter = () => {
        if (!isInKnownAreaRef.current) {
            handleRestAreaLeave()
        }
        isInKnownAreaRef.current = true
        allInfo[key]['poem_hover'].push({
            time: + new Date(),
            type: 'enter'
        })
    }

    const handPoemMouseLeave = () => {
        allInfo[key]['poem_hover'].push({
            time: + new Date(),
            type: 'leave'
        })
        const len = allInfo[key]['poem_hover'].length
        const total = calculateTimeDifferenceInSeconds(allInfo[key]['poem_hover'][len - 1].time, allInfo[key]['poem_hover'][len - 2].time)
        allInfo[key]['poem_total'] += total
        isInKnownAreaRef.current = false
        handleRestAreaEnter()
    }

    const handAnswerMouseEnter = () => {
        if (!isInKnownAreaRef.current) {
            handleRestAreaLeave()
        }
        isInKnownAreaRef.current = true
        allInfo[key]['answer_hover'].push({
            time: + new Date(),
            type: 'enter'
        })
    }

    const handAnswerMouseLeave = () => {
        allInfo[key]['answer_hover'].push({
            time: + new Date(),
            type: 'leave'
        })
        const len = allInfo[key]['answer_hover'].length
        const total = calculateTimeDifferenceInSeconds(allInfo[key]['answer_hover'][len - 1].time, allInfo[key]['answer_hover'][len - 2].time)
        allInfo[key]['answer_total'] += total
        isInKnownAreaRef.current = false
        handleRestAreaEnter()
    }



    const handTextAreaFocus = (e: React.FocusEvent<HTMLTextAreaElement>, index: number) => {
        isBlurIndex.current = index
        if (!allInfo[key].answer_input[index]) {
            allInfo[key].answer_input[index] = [
                {
                    start_time: +new Date(),
                    title: valueInfo[index].title,
                }
            ]
        } else {
            allInfo[key].answer_input[index].push({
                start_time: +new Date(),
                title: valueInfo[index].title,
            })
        }
        console.log(2222, allInfo[key]);

        if (!allInfo[key][`input_time_${index}`]) {
            console.log(333);

            allInfo[key][`input_time_${index}`] = [
                {
                    type: "start",
                    time: +new Date()
                }
            ]
        } else {
            allInfo[key][`input_time_${index}`].push({
                type: "start",
                time: +new Date()
            })
        }
    }

    const handTextAreaBlur = (e: React.FocusEvent<HTMLTextAreaElement>, index: number) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        isBlurIndex.current = -1
        if (!allInfo[key].answer_input[index]) {
            allInfo[key].answer_input[index] = [
                {
                    end_time: +new Date(),
                    title: valueInfo[index].title,
                }
            ]
        } else {
            allInfo[key].answer_input[index].push({
                end_time: +new Date(),
                title: valueInfo[index].title,
            })
        }

        if (allInfo[key][`input_time_${index}`].at(-1).type !== 'end') {
            allInfo[key][`input_time_${index}`].push({
                type: "end",
                time: +new Date()
            })
        }
        if (allInfo[key][`stop_input_time_${index}`].at(-1)?.type == 'start') {
            allInfo[key][`stop_input_time_${index}`].push({
                type: "end",
                time: +new Date()
            })
        }
    }

    const handPeom = useMemo(() => {
        const arr = [];
        let index = 0
        for (const element of pageInfo[key].right_poem.arr) {
            for (const item of element) {
                index++
                arr.push(<div className={`page6_right_item page6_item_${index}`} data-index={index} onMouseEnter={(e) => handItemMouseEnter(e)}>
                    <span>{item}</span>
                    <span className='grey'>{index}</span>
                </div>)
            }
            arr.push(<div className="page6_right_item_empty">

            </div>)
        }
        console.log("arr----", arr);

        return arr


    }, [handItemMouseEnter])

    const handAIShow = () => {
        setIsAIShow(!isAIShow)
        if (allInfo[key].ai_show) {
            allInfo[key].ai_show.push({
                type: !isAIShow,
                time: +new Date()
            })
        } else {
            allInfo[key].ai_show = [{
                type: !isAIShow,
                time: +new Date()
            }]
        }
    }

    const handTextClick = () => {
        if (disable) {
            message.error("You need to view through the AI's answers to proceed.")
        }
    }


    return (
        <div className='page6_content' onMouseEnter={handPageMouseEnter} onMouseLeave={handPageMouseLeave}>
            <div className='page6_left'>
                <div className={`page6_left_box_top ${config.page6.showAiAnswers && config.page6.aiAnswerCount > 0 ? 'has-ai' : 'no-ai'}`}
                    onMouseLeave={handLeftTopMouseLeave}
                    onMouseEnter={handLeftTopMouseEnter}
                >
                    <div
                        className={`page6_left_top`}

                        dangerouslySetInnerHTML={{ __html: pageInfo[key].left_top_instruction }}
                    >
                    </div>
                </div>

                <div className='page6_left_box_bottom'>
                    {/* {config.page6.showAiAnswers && config.page6.aiAnswerCount > 0 && (
                        <div className='page6_left_mid highlight'>
                            {pageInfo[key].left_mid}
                        </div>
                    )} */}
                    {config.page6.showAiAnswers && config.page6.aiAnswerCount > 0 && (
                        <div
                            className='page6_left_bottom'
                            onMouseEnter={handAIMouseEnter}
                            onMouseLeave={handAIMouseLeave}
                            onMouseUp={handAiMouseUp}
                        >
                            <div className="ai-answer-header">
                                {config.page6.aiAnswerCount === 1 ? (
                                    <div>
                                        <img src="/star_ai_icon.png" className="star-icon" alt="Star" /> AI's Answer
                                    </div>
                                ) : (
                                    <div>
                                        <ConfigProvider
                                            theme={{
                                                token: {
                                                    // Seed token — affects a wide range of styles
                                                    colorPrimary: '#cc97faff',
                                                    borderRadius: 2,
                                                    // Derived variable — affects a narrower range of styles
                                                    colorBgContainer: '#f6ffed',
                                                },
                                            }}
                                        >
                                            <Tabs
                                                defaultActiveKey="0"
                                                items={items}
                                                onChange={onChange}
                                                style={{ display: items.length > 0 ? 'block' : 'none' }}
                                            />
                                        </ConfigProvider>
                                    </div>
                                )}
                            </div>
                            {
                                isAIShow && <div className="ai-answer-content">
                                    {
                                        pageInfo[key].left_bottom_ai_content[tapIndex]?.map((item, index) => {
                                            return <>
                                                <div className='ai-answer-content-box'>
                                                    {item.map((el, i) => {
                                                        return <div className='ai-answer-content-item' key={`${index}-${i}`}>
                                                            <div className='ai-answer-content-title'>{el.title}</div>
                                                            <div className='ai-answer-content-value'>{el.content}</div>
                                                        </div>
                                                    })}
                                                </div>
                                                {/* <div className='ai-answer-content-bottom' dangerouslySetInnerHTML={{ __html: pageInfo[key].left_bottom_ai_item[index] }}></div> */}
                                            </>
                                        })
                                    }
                                </div>
                            }
                            {/* <div className="ai-answer-content" dangerouslySetInnerHTML={{ __html: pageInfo[key].left_bottom_ai_content }}>
                        </div> */}
                        </div>
                    )}
                </div>


            </div>
            <div className='page6_right'>
                <div onMouseEnter={handPoemMouseEnter} onMouseLeave={handPoemMouseLeave} className='page6_right_top'>
                    <div className='page6_right_title'>
                        {/* <p className='page6_right_top_text'>{pageInfo[key].right_poem.obj.top_text}</p> */}
                        <p className='page6_right_title'>{pageInfo[key].right_poem.obj.title}</p>
                        <p className='page6_right_author'>{pageInfo[key].right_poem.obj.author}</p>
                    </div>
                    <div className='page6_right_content'>
                        {handPeom}
                    </div>
                </div>
                <div className='page6_right_bottom' onMouseEnter={handAnswerMouseEnter} onMouseLeave={handAnswerMouseLeave}>
                    <div className='page6_right_bottom_title'>Your Answer</div>
                    {/* {
                        disable && <div className='bg' onClick={handTextClick}></div>
                    } */}
                    <div className='page6_right_bottom_content'>
                        {
                            valueInfo.map((item, index) => {
                                return <div className='page6_right_bottom_item' key={index}>
                                    <Tooltip zIndex={99999} placement="top" key={index} color="#108ee9" title={item.placeholder}>
                                        <div className='page6_right_bottom_item_title'>
                                            {item.title}
                                        </div>
                                        <Input.TextArea
                                            // disabled={disable}
                                            style={{
                                                lineHeight: 1.2
                                            }}
                                            onFocus={(e) => handTextAreaFocus(e, index)} onBlur={(e) => handTextAreaBlur(e, index)} value={item.value} onChange={(e) => handTextAreaChange(e, index)} placeholder={item.placeholder}
                                            rows={6} />
                                    </Tooltip>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>

            <CountButton
                // style={{ right: '40px' }}
                countdownTime={countdownTime} onAction={next} />
        </div>
    )
}
