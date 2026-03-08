import React, { useContext, useLayoutEffect, useState, useRef } from 'react';
import './page7.css';
import { message, Radio, Checkbox, type RadioChangeEvent, type CheckboxChangeEvent, Input } from 'antd';
import allInfo from '../data.js';
import PageContext from '../PageContext.js';
import CountButton from './Countbtn.js';
import * as pageInfo from '../pageInfo'
import { produce } from 'immer'
import axios from 'axios'
import { BASE_API_URL, getCurrentConfig } from '../config/projectConfig'
import { IS_COLLECT_DATA } from '../config/projectConfig'

const countdownTime = 1

const init_data = [
    {
        title: 'In this activity, you read and interpreted three poems: Love Poem, Dusting, Theme for English B. Before participating in this study, had you read any of these poems? Please select all that apply.',
        value: '',
        type: "checkbox",
        option: [
            { value: 'Love Poem', label: 'Love Poem', disabled: false },
            { value: 'Dusting', label: 'Dusting', disabled: false },
            { value: 'Theme for English B', label: 'Theme for English B', disabled: false },
            { value: 'I have not read any of them', label: 'I have not read any of them', disabled: false },
        ],
    },
    {
        title: "In the study, you read and interpreted three poems: Love Poem, Dusting, Theme for English B. When interpreting each poem, what's your approach?",
        value: "",
        type: "input",
    },
    {
        title: "How did you feel about your experience engaging in close reading during this study? Did anything feel confusing, challenging, or particularly interesting? Did you take away anything new or surprising about the skill of close reading — whether about how it works, how you approach it, or how it might apply to your everyday life?",
        value: "",
        type: "input",
    }
]


const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    marginBottom: '30px',
};

export default function Page7() {
    const { length, currentPage, key, setCurrentPage } = useContext(PageContext);
    const [data, setData] = useState(init_data);
    const [loading, setLoading] = useState(false)
    const flagId = useRef(false)

    console.log(77777, pageInfo[key]);

    useLayoutEffect(() => {
        allInfo[key] = {};
    }, [])

    const handleChange = (index: number, e: RadioChangeEvent) => {
        const newData = [...data];
        newData[index].value = e.target.value;
        setData(newData);
    };

    const handleCheckBoxChange = (index: number, e: CheckboxChangeEvent) => {
        console.log(1111, e);
        const flag = e.includes('I have not read any of them')
        const newData = [...data];

        const arr = produce(data[index].option, draft => {
            draft.forEach((item, index) => {
                if (item.value !== "I have not read any of them") {
                    item.disabled = flag
                }
            })
        })

        newData[index].option = arr;
        newData[index].value = flag ? ['I have not read any of them'] : e;
        setData(newData);
    };

    const next = async () => {
        const allAnswered = data.every((item) => item.value !== '');
        if (!allAnswered) {
            message.error('You need to answer all the questions to proceed.');
            return;
        }
        allInfo[key].info = data.map((item) => ({
            title: item.title,
            answer: item.value,
        }));
        allInfo[key]['time'] = +new Date();
        console.log(3333, currentPage, length);
        const config = getCurrentConfig()

        if (length - 2 == currentPage) {
            if (IS_COLLECT_DATA) {
                setLoading(true)
                flagId.current = false
                axios.post(`${BASE_API_URL}/response`, {
                    data: allInfo,
                    type: config.api.fileName
                }).then(res => {
                    setCurrentPage(currentPage + 1);
                    setLoading(false)
                    message.success("success")
                }).catch(err => {
                    message.error(error.response?.data?.error || "Submission failed. Please do not close or refresh the page. Please check your internet connection and try again.")
                    setLoading(false)
                    flagId.current = true
                })
            } else {
                setCurrentPage(currentPage + 1);
                // setLoading(false)
            }

        } else {
            setCurrentPage(currentPage + 1);
        }
        console.log('allInfo', allInfo);
    };

    const DOM = (item: any, index) => {
        if (item.type === 'radio') {
            return <div key={item.title}>
                <p className='page7_item'>{item.title}</p>
                <Radio.Group
                    style={style}
                    onChange={(e) => handleChange(index, e)}
                    value={item.value}
                    options={item.option}
                />
            </div>
        } else if (item.type === 'input') {
            return <div key={item.title}>
                <p className='page7_item'>{item.title}</p>
                <Input.TextArea
                    className='page7_textarea'
                    value={item.value}
                    rows={3}
                    onChange={(e) => handleChange(index, e)}
                />
            </div>
        } else if (item.type === 'checkbox') {
            return <div key={item.title}>
                <p className='page7_item'>{item.title}</p>
                <Checkbox.Group
                    style={style}
                    onChange={(e) => handleCheckBoxChange(index, e)}
                    value={item.value}
                    disabled={item.disabled}
                    options={item.option}
                />
            </div>
        }
    }

    return (
        <div className='page7_content'>
            {data.map((item, index) => DOM(item, index))}
            <CountButton loading={loading} countdownTime={countdownTime} onAction={next} />
        </div>
    );
}