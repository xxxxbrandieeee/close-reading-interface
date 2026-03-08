import { Button, Input, message } from 'antd'
import React, { useContext, useState } from 'react'
import allInfo from '../data.js'
import PageContext from '../PageContext';
import './page2.css'
import CountButton from './Countbtn';
import axios from 'axios';
import { BASE_API_URL, getCurrentConfig } from '../config/projectConfig'
const countdownTime = 1

allInfo.page2 = {}

function getURLParameters(url) {
  // Extract the query string portion
  const queryString = url.split('?')[1];

  // If there is no query string, return an empty object
  if (!queryString) {
    return {};
  }

  // Split the query string into key-value pairs
  const pairs = queryString.split('&');
  const paramsObject = {};

  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    paramsObject[decodeURIComponent(key)] = decodeURIComponent(value);
  }

  return paramsObject;
}




export default function Page2() {
  // Example of use
  console.log(333);

  const parameters = getURLParameters(window.location.href);
  const { setCurrentPage } = useContext(PageContext);
  const [value, setValue] = useState(parameters?.prolificId)
  const [loading, setLoading] = useState(false)
  const next = async () => {
    if (!value) {
      message.error("You need to answer all the questions to proceed.")
      return
    }
    try {
      setLoading(true)
      // const config = getCurrentConfig()
      // const res = await axios.post(
      //   `${BASE_API_URL}/find`,
      //   {
      //     time: + new Date(),
      //     prolificId: value,
      //     type: config.api.fileName
      //   }
      // )
      // if (res.data.data && res.data.msg) {
      //   return message.error(res.data.msg)
      // }
      allInfo['page2']['value'] = value
      allInfo['page2']['time'] = + new Date()
      console.log('allInfo', allInfo);
      setCurrentPage(3)
    } catch (error) {
      if (typeof error?.response?.data.error == 'string') {
        message.error(error?.response?.data.error)
      } else {
        message.error('Unknown error')
      }
    } finally {
      setLoading(false)
    }


  }
  return (
    <div>
      <div className='page2_content'>
        Please enter your User ID: <Input style={{ width: '400px', marginLeft: '20px' }} className='input' value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <CountButton loading={loading} countdownTime={0} onAction={next} />
    </div>
  )
}
