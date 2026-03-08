import { useEffect, useState } from 'react'
import Page1 from './component/Page1'
import Page2 from './component/Page2'
import Page3 from './component/Page3'
import Page4 from './component/Page4'
import Page5 from './component/Page5'
import Page6 from './component/Page6'
import Page7 from './component/Page7'
import Page8 from './component/Page8'
import Page9 from './component/Page9'
import Page10 from './component/Page10'

import PageContext from './PageContext'
import pageInfo from './pageInfo'
import allInfo from './data'


import { Button, Modal, Progress } from 'antd'
import './App.css'
import React from 'react'


const PAGE_MAP = {
  4: Page4,
  5: Page5,
  6: Page6,
}

const arr = []
for (const element of pageInfo) {
  const key = Object.keys(element)[0].split("_")
  console.log(key[0].slice(-1), Object.keys(element)[0]);
  const index = key[0].slice(-1);

  arr.push({
    component: PAGE_MAP[index],
    page: Object.keys(element)[0]
  })
}


// 这个数组决定页面顺序，可以根据需要调整顺序
const PAGE_ARR = [
  {
    component: Page1,
    page: "page1"
  },
  {
    component: Page2,
    page: "page2"
  },
  {
    component: Page3,
    page: "page3"
  },
  {
    component: Page8,
    page: "page8"
  },
  ...arr,
  {
    component: Page7,
    page: "page7"
  },
  {
    component: Page9,
    page: "page9"
  },
  {
    component: Page10,
    page: "page10"
  },
]


const PAGE_MAP_INFO = {}

for (const element of PAGE_ARR) {
  PAGE_MAP_INFO[element.page] = element.component
}
console.log(111111, PAGE_MAP_INFO);




const handleBeforeUnload = (event: any) => {
  event.preventDefault()
  event.returnValue = 'Are you sure you want to leave this page? Your progress will be lost.'
}


function App() {
  // navigate to a specific page
  const [currentPage, setCurrentPage] = useState(1)
  const key = PAGE_ARR[currentPage - 1].page
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const load = () => {
      if (localStorage.getItem('isRefreshed')) {
        allInfo.isRefresh=true;
        // console.log('Page refreshed',currentPage);
      } else {
        // console.log('Load page for the first time',currentPage);
        localStorage.setItem('isRefreshed', 'true');
      }
    }
    window.addEventListener('load', load)
    return () => {
      window.removeEventListener('load', load)
    }
  }, [])
  
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload)

    const handVisibilitychange = () => {
      if (document.hidden) {
        // disable the pop up
        if(![1,2,PAGE_ARR.length,PAGE_ARR.length-1].includes(currentPage)){
          setOpen(true)
        }
        if (!allInfo[key]['leave_page']) {
          allInfo[key]['leave_page'] = []
        }
        allInfo[key]['leave_page'].push({
          "type": "leave",
          "time": + new Date()
        })
      } else {
        allInfo[key]['leave_page'].push({
          "type": "return",
          "time": + new Date()
        })
      }
    }

    document.addEventListener('visibilitychange', handVisibilitychange);
    return () => {
      
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handVisibilitychange);

    }
  }, [key])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // if(localStorage.getItem('state') === '1'){
  //   return <h2>You have already answered this system</h2>
  // }

  return (
    <>
      <Modal
        open={open}
        title=""
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <h2>Please do not leave this page.</h2>
        <p>While participating in this study, we ask that you remain on the study’s interface and refrain from using any other systems (e.g., search engines, ChatGPT, etc.).</p>
        <div className='modal_btn'>
          <Button onClick={() => setOpen(false)}>I understand</Button>
        </div>
      </Modal>
      <PageContext.Provider value={{ key, currentPage, setCurrentPage, length: PAGE_ARR.length }}>
        <Progress size="small" percent={currentPage / (PAGE_ARR.length - 1) * 100} showInfo={false} />
        {React.createElement(PAGE_ARR[currentPage - 1].component)}
      </PageContext.Provider>
    </>
  )
}

export default App
