import { useEffect } from 'react'
import './page9.css'
import { Button, message } from 'antd'
import allInfo from '../data.js'
import axios from 'axios'


export default function Page9() {
    return (
       <div className='page9_content'>
           <h2>Thank you for your participation! You may now close this page or click the following link to return to our project website: <a href="https://closereading-ai.app/">https://closereading-ai.app</a >.</h2>

           {/* <Button className='next_btn' type="primary" onClick={next}>next</Button> */}
       </div>
   )
}
