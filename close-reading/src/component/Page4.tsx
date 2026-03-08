import { useMemo, useCallback, useContext, useEffect, useLayoutEffect } from 'react'
import './page4.css'
import PageContext from '../PageContext';
import allInfo from '../data.js'
import CountButton from './Countbtn';
import * as pageInfo from '../pageInfo'
const countdownTime = 1


export default function Page4() {
    const { key, currentPage, setCurrentPage } = useContext(PageContext);

    useLayoutEffect(() => {
        console.log(111, pageInfo[key]);
        allInfo[key] = {}
        allInfo[key]['poemItemHover'] = []
        allInfo[key]['poemScroll'] = {}
        allInfo[key]['left_content_hover'] = []
        allInfo[key]['right_content_hover'] = []
    }, [])

    useEffect(() => {
        // Observe whether the end element is visible in the viewport
        console.log('Observe whether the end element is visible in the viewport');
        const arr=pageInfo[key].right_poem.arr.flat();
        const end = document.querySelector(`.page4_item_${arr.length}`)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log(4444444,arr);
                    
                    allInfo[key].poemScroll = {
                        time: +new Date(),
                        total_num: arr.length,
                        text: arr.at(-1)
                    }
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


  const handItemMouseEnter = useCallback(
            (e) => {
                if(e.target.dataset.index==undefined)return
                const index = (e.target.dataset.index)-1
                allInfo[key]['poemItemHover'].push({
                    index,
                    time: + new Date(),
                    text: pageInfo[key].right_poem.arr.flat()[index]
                })
            }, [])

    const handLeftMouseEnter = () => {
        allInfo[key]['left_content_hover'].push({
            time: + new Date(),
            type: 'enter'
        })
    }

    const handLeftMouseLeave = () => {
        allInfo[key]['left_content_hover'].push({
            time: + new Date(),
            type: 'leave'
        })
    }

    const handRightMouseEnter = () => {
        allInfo[key]['right_content_hover'].push({
            time: + new Date(),
            type: 'enter'
        })
    }

    const handRightMouseLeave = () => {
        allInfo[key]['right_content_hover'].push({
            time: + new Date(),
            type: 'leave'
        })
    }

    const next = () => {
        allInfo[key]['time'] = + new Date()
        console.log('allInfo', allInfo);
        setCurrentPage(currentPage + 1)
    }

    const handPeom = useMemo(() => {
        const arr = [];
        let index = 0
        for (const element of pageInfo[key].right_poem.arr) {
            for (const item of element) {
                index++
                arr.push(<div className={`page4_right_item page4_item_${index}`} data-index={index} onMouseEnter={(e) => handItemMouseEnter(e)}>
                    <span>{item}</span>
                    <span className='grey'>{index}</span>
                </div>)
            }
            arr.push(<div className="page4_right_item_empty">

            </div>)
        }
        console.log("arr----", arr);

        return arr


    }, [handItemMouseEnter])

    return (
        <>
            <div className='page4_content'>
                <div className='page4_left'>
                    <div className='instruction page4_left_content' onMouseEnter={handLeftMouseEnter} onMouseLeave={handLeftMouseLeave} dangerouslySetInnerHTML={{ __html: pageInfo[key].left_instruction }}>
                    </div>
                </div>
                <div className='page4_right' onMouseEnter={handRightMouseEnter} onMouseLeave={handRightMouseLeave}>
                    <div className='page4_right_title'>
                        {/* <p className='page4_right_top_text'>{pageInfo[key].right_poem.obj.top_text}</p> */}
                        <p className='page4_right_title'>{pageInfo[key].right_poem.obj.title}</p>
                        <p className='page4_right_author'>{pageInfo[key].right_poem.obj.author}</p>
                    </div>
                    <div className='page4_right_content'>
                        {
                            handPeom
                        }
                    </div>
                </div>
            </div >
            <CountButton countdownTime={countdownTime} onAction={next} />
        </>

    )
}

