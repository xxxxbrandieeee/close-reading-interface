import { Button, message, Radio } from 'antd';
import './page3.css'
import { useContext, useState } from 'react';
import React from 'react';
import allInfo from '../data.js'
import PageContext from '../PageContext';
import CountButton from './Countbtn';
const countdownTime=2

allInfo.page3={}

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 7,
};


// To edit the instruction content, update the JSX in Page3_1 through Page3_4 below.
// Each function corresponds to one instruction screen shown to participants.
function Page3_1() {
    const [value, setValue] = useState()
    const onChange = (e) => {
        setValue(e.target.value);
        allInfo.page3['3_1']=e.target.value
    }
    return (
        <>
            <p className='list_item instruction'>
                <p className='list_item'><span className='highlight'>[Instruction]</span> During the study, you will perform close reading of three poems. Close reading is the practice of <span className='highlight'>carefully examining a literary text to understand, evaluate, interpret, and critique it.</span> This involves paying close attention to the poem’s <span className='highlight'>language, structure, and style</span> in order to develop a meaningful and persuasive interpretation — not just identifying what the poem says on the surface, but exploring how and why the author conveys deeper meaning.</p>
                <p className='list_item'> Before starting, you will read the study instructions to learn about the task. <span className='highlight'>Please read each instruction carefully.</span> A timer is set for each instruction to ensure sufficient reading time.</p>
            </p>
            <Radio.Group
                style={style}
                onChange={onChange}
                value={value}
                options={[
                    { value: 'I understand what is close reading and I will read each instruction carefully.', label: 'I understand what is close reading and I will read each instruction carefully.' },
                ]}
            />
        </>
    )
}

function Page3_2() {
    const [value, setValue] = useState()
    const onChange = (e) => {
        setValue(e.target.value);
        allInfo.page3['3_2']=e.target.value
    }
    return (
        <>
            <p className='list_item instruction'>
                    <span className='highlight'>[Instruction - Procedure of the Study]</span> For each poem:
                    <p className='list_item' style={{ marginLeft: '15px', marginTop: '5px', marginBottom: '5px' }}>● You will read the poem first.</p>
                    <p className='list_item' style={{ marginLeft: '15px', marginTop: '5px', marginBottom: '5px' }}>● Then, you will <span className='highlight'>perform a close reading</span> of the poem. You will be asked to write your <span className='highlight'>interpretation</span> of the poem in response to an interpretive question.</p>
                    <p className='list_item' style={{ marginLeft: '15px', marginTop: '5px', marginBottom: '5px' }}>● After close reading, you will <span className='highlight'>answer a set of questions</span> about your impression of the poem.</p>
                    <p className='list_item'>This process will be repeated for all three poems. Afterward, you’ll answer questions about your overall experience.</p>
                    <p className='list_item'>The entire study will take <span className='highlight'>approximately 1 hour</span>, though this may vary a bit depending on individual pace. We ask that you remain focused and continue participating without breaks unless absolutely necessary.</p>
            </p>
            <Radio.Group
                style={style}
                onChange={onChange}
                value={value}
                options={[
                    { value: 'I understand the procedure and estimated time of the study.', label: 'I understand the procedure and estimated time of the study.' },
                ]}
            />
        </>
    )
}


function Page3_3() {
    const [value, setValue] = useState()
    const onChange = (e) => {
        allInfo.page3['3_3']=e.target.value
        setValue(e.target.value);
    }
    return <>

        <p className='list_item instruction'>
            <span className='highlight'>[Instruction - No Going Backward]</span> Please <span className='highlight'>do not go backward</span> at any point in this study. If you attempt to use the back button or the refresh button on your browser, you will <span className='highlight'>lose all your progress</span> and have to restart the study from the beginning.
        </p>
        <Radio.Group
            style={style}
            onChange={onChange}
            value={value}
            options={[
                { value: 'I understand that I will not go back or refresh the webpage at any point in this study. ', label: 'I understand that I will not go back or refresh the webpage at any point in this study.' },
            ]}
        />
    </>
}

function Page3_4() {
    const [value, setValue] = useState()
    const onChange = (e) => {
        allInfo.page3['3_4']=e.target.value
        setValue(e.target.value);
    }
    return <>
        <p className='list_item instruction'>
            <span className='highlight'>[Instruction - No Using External Sources]</span> Please <span className='highlight'>do not leave this page.</span> While participating in this study, we ask that you <span className='highlight'>remain on the study’s interface</span> and <span className='highlight'>refrain from using any other systems</span> (e.g., search engines, ChatGPT, etc.) that are not on this interface. You will see a warning message like below if you leave the interface.
        </p>
        <Radio.Group
            style={style}
            onChange={onChange}
            value={value}
            options={[
                { value: 'I understand that I must only use the web interface provided and no external sources.', label: 'I understand that I must only use the web interface provided and no external sources.' },
            ]}
        />
        <img className='img' src="/leave_page_warning.png" alt="" />
    </>
}

function Page3_5() {
  
    return <h2>
       Let's get started!
    </h2>
}


const PAGEMAP={
    1:Page3_1,
    2:Page3_2,
    3:Page3_3,
    4:Page3_4,
    5:Page3_5
}

export default function Page1() {
    // navigate to a specific page
    const [count, setCount] = useState(1)
    const {currentPage,setCurrentPage} = useContext(PageContext);

    const next=()=>{
        if(count>=5){
            console.log(allInfo);
            allInfo['page3']['time'] = + new Date()
            console.log('allInfo', allInfo);
            setCurrentPage(currentPage+1)
          return 
        }
        if(!allInfo.page3[`3_${count}`]){
           message.error("You need to answer all the questions to proceed.") 
           return
        }
        setCount(count+1)
    }
    
    return (
        <>
            <div className='page'>
             {React.createElement(PAGEMAP[count])}
             <CountButton countdownTime={countdownTime} trigger={count} onAction={next} />
            </div>
        </>

    )
}