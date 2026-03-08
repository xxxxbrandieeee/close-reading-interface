import { useEffect } from 'react'
import './page10.css'
import { Button, message } from 'antd'
import allInfo from '../data.js'
import axios from 'axios'


export default function Page10() {
    return (
        <div className='page10_content'>
            <h2>Since you are not interested in this activity, you may now close this page.</h2>

            {/* <Button className='next_btn' type="primary" onClick={next}>next</Button> */}
        </div>
    )
}
