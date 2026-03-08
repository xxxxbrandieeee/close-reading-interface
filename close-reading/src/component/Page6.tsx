import React, { useContext, useLayoutEffect, useState } from 'react';
import './page6.css';
import { message, Radio, type RadioChangeEvent, Input } from 'antd';
import allInfo from '../data.js';
import PageContext from '../PageContext.js';
import CountButton from './Countbtn.js';
import * as pageInfo from '../pageInfo'
import axios from 'axios'

const countdownTime = 1

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    marginBottom: '30px',
};

export default function Page7() {
    const { length, currentPage, key, setCurrentPage } = useContext(PageContext);
    const [data, setData] = useState(pageInfo[key].data);
    const [loading, setLoading] = useState(false)

    console.log(77777, pageInfo[key]);

    useLayoutEffect(() => {
        allInfo[key] = {};
    }, [])

    const handleChange = (index: number, e: RadioChangeEvent) => {
        const newData = [...data];
        newData[index].value = e.target.value;
        setData(newData);
    };

    const next = () => {
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
        setCurrentPage(currentPage + 1);
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
        }
    }

    return (
        <div className='page7_content'>
            {data.map((item, index) => DOM(item, index))}
            <CountButton loading={loading} countdownTime={countdownTime} onAction={next} />
        </div>
    );
}