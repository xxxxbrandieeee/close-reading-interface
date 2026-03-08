import { Button, Input, message, Radio } from 'antd';

import './page1.css'
import { useContext, useState } from 'react';
import allInfo from '../data'
import PageContext from '../PageContext';
import CountButton from './Countbtn';
import axios from 'axios';
import { BASE_API_URL, getCurrentConfig } from '../config/projectConfig'
const countdownTime = 1

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
};

allInfo.page1 = {}


export default function Page1() {
    const [value, setValue] = useState()
    const { setCurrentPage, length } = useContext(PageContext);
    const [loading, setLoading] = useState(false)

    const onChange = (e: any) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const next = () => {
        allInfo['page1']['value'] = value
        allInfo['page1']['time'] = + new Date()
        if(!value){
            message.error("You need to answer all the questions to proceed.")
            return
        }
        console.log('allInfo', allInfo);

        if (value == 'I would like to get started.') {
            setCurrentPage(2)
        } else {
            setLoading(true)
            const config = getCurrentConfig()
            axios.post(`${BASE_API_URL}/response`, {
                data: allInfo,
                type: config.api.fileName
            }).then(res => {
                setCurrentPage(length)
                message.success("success")
            }).catch(err => {
                message.error("Submission failed. Please do not close or refresh the page. Please check your internet connection and try again.")
            }).finally(() => {
                setLoading(false)
            })
        }
    }
    
    // To edit the consent form content, update the JSX below. Look for bracketed placeholders like [INSERT ...] or [REPLACE ...] and fill them in with study-specific information.
    return (
        <>
            <div className='div_des'>
                <span className='highlight'>Online Consent Form for Research Participation </span>
            </div>
            <div className='content'>
                <p className='list_item'>
                    <span className='highlight'>Study Number:</span> [INSERT YOUR STUDY NUMBER HERE]
                </p>
                <p className='list_item'><span className='highlight'>Study Title:</span> [REPLACE WITH YOUR STUDY TITLE] Understanding How Individuals Interpret Poems through Close Reading</p>
                <p className='list_item'>
                    This is a consent form for research participation. It contains important information about this study and what to expect if you decide to participate. Your participation is voluntary.
                </p>
                <p className='list_item'>
                    <span className='highlight'>Purpose:</span> [REPLACE WITH A BRIEF DESCRIPTION OF YOUT STUDE PURPOSE] The purpose of this research is to better understand how people approach the task of interpreting poems and what their experience is like during the process. People from all backgrounds are welcome to participate.
                </p>
                <div className='list_item'>
                    <span className='highlight'>Study Description:</span> [REPLACE WITH YOUR CUSTOM PROCEDURE] In this study, you will engage in close reading of three poems. Close reading is the practice of carefully examining a literary text to understand, evaluate, interpret, and critique it. This involves paying close attention to the poem’s language, structure, and style in order to develop a meaningful and persuasive interpretation — not just identifying what the poem says on the surface, but exploring how and why the author conveys deeper meaning. For each poem:
                    <p className='list_item' style={{ marginLeft: '15px', marginTop: '5px', marginBottom: '5px' }}>● You will first read the poem first and answer a set of questions based on your first impression.</p>
                    <p className='list_item' style={{ marginLeft: '15px', marginTop: '5px', marginBottom: '5px' }}>● Then, you will perform a close reading of the poem and write your interpretation of the poem.</p>
                    <p className='list_item' style={{ marginLeft: '15px', marginTop: '5px', marginBottom: '5px' }}>● After close reading, you will answer a similar set of questions about your impression of the poem.</p>
                    This process will be repeated for all three poems. Afterward, you’ll answer questions about your overall experience.
                </div>
                <p className='list_item'>
                    <span className='highlight'>Time Required:</span> The entire study will take approximately 1 hour, though this may vary a bit depending on individual pace. We ask that you remain focused and continue participating without breaks unless absolutely necessary.
                </p>
                <p className='list_item'>
                    <span className='highlight'>Eligibility:</span> 1) Use <span className='highlight'>a desktop or a laptop</span> (as opposed to cell phones to ensure the desired rendering of the interface) for participating in the study; [UPDATE THE FOLLOWING CRITERIA IF NEEDED] 2) Above 18 years old; 3) Proficiency in reading and writing in English; 4) Do not have a disability in reading or cognitive impairment that affects decision-making ability.
                </p>
                <p className='list_item'>
                    <span className='highlight'>Incentives:</span> You will be paid [INSERT THE PAYMENT] upon completing the entire study. If you choose to withdraw from the study at any point, you will no longer receive any compensation for participating in the study.
                </p>
                <p className='list_item'>
                    <span className='highlight'>Risks and Benefits:</span> [UPDATE IF NEEDED] Your participation in this study does not involve any risk to you beyond those associated with completing a personality survey, including boredom or excessive introspection. Although participating in the research may not directly benefit you, the study will help us learn how to better support people in interpreting literary text.
                </p>
                <p className='list_item'>
                    <span className='highlight'>Confidentiality:</span> [INSERT YOUR CONFIDENTIALITY PROTECTION APPROACHES HERE]
                </p>
                <p className='list_item'>
                    <span className='highlight'>Contacts & Questions:</span> [INSERT YOUR CONTACT INFORMATION HERE]
                </p>
                <p className='list_item'>
                    By clicking “Agree” below, you confirm that you have read the consent form, <span className='highlight'>meet all the eligibility criteria</span> and agree to participate in the research. Please print or save a copy of this page for your records.
                </p>

            </div>
            <div className='select'>
                <Radio.Group
                    style={style}
                    onChange={onChange}
                    value={value}
                    options={[
                        { value: 'I agree to participate in the research.', label: 'I agree to participate in the research.' },
                        { value: 'I do NOT agree to participate in the research', label: 'I do NOT agree to participate in the research' },
                    ]}
                />
            </div>
            <div className='page-btn'>
                <CountButton loading={loading} countdownTime={0} onAction={next} />
            </div>
        </>

    )
}
