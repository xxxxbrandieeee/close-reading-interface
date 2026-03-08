import React, { useContext, useMemo, useState } from 'react';
import './page8.css';
import { Checkbox, Input, message, Radio, type RadioChangeEvent } from 'antd';
import allInfo from '../data.js';
import PageContext from '../PageContext.js';
import CountButton from './Countbtn.js';
const countdownTime = 1

allInfo['page8'] = {};

const init_data: any = [
  {
    title: 'How familiar are you with LLMs and LLM-infused applications such as ChatGPT, Copilot, and Claude?',
    value: '',
    id: 1,
    type: 'radio',
    option: [
      {
        value: "Not familiar at all, I have never heard of them",
        label: "Not familiar at all, I have never heard of them"
      },
      {
        value: "Slightly familiar, I have heard of them or have some idea of what they are",
        label: "Slightly familiar, I have heard of them or have some idea of what they are"
      },
      {
        value: "Moderately familiar, I know what they are and can explain",
        label: "Moderately familiar, I know what they are and can explain"
      },
      {
        value: "Very familiar, I have technical knowledge of what they are and how they work",
        label: "Very familiar, I have technical knowledge of what they are and how they work"
      },
      {
        value: "Extremely familiar, I consider myself an expert on them",
        label: "Extremely familiar, I consider myself an expert on them"
      }
    ],
  },
  {
    title: 'How often do you use LLMs and LLM-infused applications such as ChatGPT, Copilot, and Claude?',
    value: '',
    id: 2,
    type: 'radio',
    option: [
      {
        value: "Never",
        label: "Never"
      },
      {
        value: "Rarely, about 1–2 times a month",
        label: "Rarely, about 1–2 times a month"
      },
      {
        value: "Sometimes, about 3–4 times a month",
        label: "Sometimes, about 3–4 times a month"
      },
      {
        value: "Often, about twice a week",
        label: "Often, about twice a week"
      },
      {
        value: "Always, about once or more a day",
        label: "Always, about once or more a day"
      }
    ],
  },
  {
    title: 'Overall, how do you feel about LLMs and LLM-infused applications such as ChatGPT, Copilot, and Claude?',
    value: '',
    id: 3,
    type: 'radio',
    option: [
      {
        value: "Very negative",
        label: "Very negative"
      },
      {
        value: "Somewhat negative",
        label: "Somewhat negative"
      },
      {
        value: "Neither negative nor positive",
        label: "Neither negative nor positive"
      },
      {
        value: "Somewhat positive",
        label: "Somewhat positive"
      },
      {
        value: "Very positive",
        label: "Very positive"
      }
    ],
  }, {
    title: 'What is your age?',
    value: '',
    id: 4,
    type: 'radio',
    option: [
      {
        value: "18–24",
        label: "18–24"
      },
      {
        value: "25–34",
        label: "25–34"
      },
      {
        value: "35–44",
        label: "35–44"
      },
      {
        value: "45–54",
        label: "45–54"
      },
      {
        value: "55–64",
        label: "55–64"
      },
      {
        value: "65 +",
        label: "65 +"
      },
      {
        value: "I prefer not to answer",
        label: "I prefer not to answer"
      }
    ],
  }, {
    title: 'What is the highest degree of education you have completed? (If you’re currently enrolled in school, please indicate the highest degree you have received.)',
    value: '',
    id: 5,
    type: 'radio',
    option: [
      {
        value: "Less than high school",
        label: "Less than high school"
      },
      {
        value: "High school graduate",
        label: "High school graduate"
      },
      {
        value: "Some college (no degree)",
        label: "Some college (no degree)"
      },
      {
        value: "Associate degree",
        label: "Associate degree"
      },
      {
        value: "Bachelor’s degree",
        label: "Bachelor’s degree"
      },
      {
        value: "Master’s degree",
        label: "Master’s degree"
      },
      {
        value: "Professional degree",
        label: "Professional degree"
      },
      {
        value: "Doctoral degree",
        label: "Doctoral degree"
      },
      {
        value: "I prefer not to answer",
        label: "I prefer not to answer"
      }
    ],
  }, {
    title: 'What is your gender identity?',
    value: '',
    id: 6,
    type: 'radio',
    option: [
      {
        value: "Male",
        label: "Male"
      },
      {
        value: "Female",
        label: "Female"
      },
      {
        value: "Non-Binary",
        label: "Non-Binary"
      },
      {
        value: "Other",
        label: "Other"
      },
      {
        value: "I prefer not to answer",
        label: "I prefer not to answer"
      }
    ],
  }, {
    title: 'How would you describe your race and ethnicity?',
    value: '',
    id: 7,
    type: 'radio',
    option: [
      {
        value: "American Indian or Alaska Native",
        label: "American Indian or Alaska Native"
      },
      {
        value: "Asian",
        label: "Asian"
      },
      {
        value: "Black or African American",
        label: "Black or African American"
      },
      {
        value: "Native Hawaiian or Other Pacific Islander",
        label: "Native Hawaiian or Other Pacific Islander"
      },
      {
        value: "White",
        label: "White"
      },
      {
        value: "Hispanic or Latino",
        label: "Hispanic or Latino"
      },
      {
        value: "Other",
        label: "Other"
      },
      {
        value: "I prefer not to answer",
        label: "I prefer not to answer"
      }
    ],
  }, {
    title: 'Before this activity, were you already familiar with the skill and technique of “close reading?” For example, did you learn this skill in an English class in high school, college or some other educational context? If you have, how often do you put this skill to use, whether in an educational context and/or in your everyday life for personal enjoyment (like after listening to a favorite song or watching a TV show) or for any other reason?',
    value: '',
    id: 8,
    type: 'radio',
    option: [
      {
        value: "Never",
        label: "No, never"
      },
      {
        value: "Rarely",
        label: "Rarely (e.g., once or twice a year)"
      },
      {
        value: "Sometimes",
        label: "Sometimes (e.g., once or twice a month)"
      },
      {
        value: "Often",
        label: "Often (e.g., about once a week)"
      },
      {
        value: "Very often",
        label: "Very often (e.g., multiple times per week)"
      }
    ],
  }, {
    title: 'In the past month, how many poems have you read?',
    value: '',
    id: 9,
    type: 'radio',
    option: [
      {
        value: "0",
        label: "0"
      },
      {
        value: "1",
        label: "1"
      },
      {
        value: "2–5",
        label: "2–5"
      },
      {
        value: "6–10",
        label: "6–10"
      },
      {
        value: "More than 10",
        label: "More than 10"
      }
    ],
  }, {
    title: 'Have you ever taken any college-level humanities courses (e.g., literature, philosophy, history)?',
    value: '',
    id: 10,
    type: 'radio',
    option: [
      {
        value: "None",
        label: "None"
      },
      {
        value: "Very little",
        label: "Very little (e.g., briefly covered in a non-humanities course)"
      },
      {
        value: "A little",
        label: "A little (e.g., one or two class sessions on humanities in a non-humanities course)"
      },
      {
        value: "A moderate amount",
        label: "A moderate amount (e.g., a full unit or a single course focused on humanities)"
      },
      {
        value: "A lot",
        label: "A lot (e.g., multiple courses or extensive coursework specifically focused on humanities)"
      }
    ],
  }, {
    title: 'How much coursework have you completed that is related to poetry?',
    value: '',
    id: 11,
    type: 'radio',
    option: [
      {
        value: "None",
        label: "None"
      },
      {
        value: "Very little",
        label: "Very little (e.g., poetry briefly covered in a non-poetry course)"
      },
      {
        value: "A little",
        label: "A little (e.g., one or two class sessions on poetry in a non-poetry course)"
      },
      {
        value: "A moderate amount",
        label: "A moderate amount (e.g., a full unit or a single course focused on poetry)"
      },
      {
        value: "A lot",
        label: "A lot (e.g., multiple courses or extensive coursework specifically focused on poetry)"
      }
    ],
  }
];



const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  marginBottom: '30px',
};

export default function Page8() {
  const [data, setData] = useState(init_data);
  const {currentPage, setCurrentPage } = useContext(PageContext);

   const handleChange = (id: number, e: RadioChangeEvent) => {
    const newData = [...data];
    if (typeof id === 'string') {
      console.log(333, id, e);
      for (const element of newData) {
        if (element.id === id) {
          element.value = e
        }
      }
      setData(newData);

      return
    }

    const value = ['Some college (no degree)', 'Associate degree', 'Bachelor’s degree', 'Master’s degree', 'Professional degree', 'Doctoral degree']
    console.log(11111, id, e.target.value);


    if (id === 5) {
      const flag = newData.some((item) => typeof item.id === 'string')
      console.log(1111,flag,e.target.value,id);
      
      if (value.includes(e.target.value) && !flag) {
        newData.splice(5, 0, {
          id: `checkbox_${+ new Date()}`,
          title: 'What is your major or field of study? (Select all that apply.)',
          value: [],
          type: 'checkbox',
          option: [
            {
              value: "Arts & Humanities",
              label: "Arts & Humanities"
            },
            {
              value: "Education",
              label: "Education"
            },
            {
              value: "Social Sciences",
              label: "Social Sciences"
            },
            {
              value: "Journalism & Information",
              label: "Journalism & Information"
            },
            {
              value: "Business, administration & law",
              label: "Business, administration & law"
            },
            {
              value: "Mathematics and statistics",
              label: "Mathematics and statistics"
            },
            {
              value: "Information and Communication Technologies",
              label: "Information and Communication Technologies"
            },
            {
              value: "Engineering, manufacturing and construction",
              label: "Engineering, manufacturing and construction"
            },
            {
              value: "Agriculture, forestry, fisheries and veterinary",
              label: "Agriculture, forestry, fisheries and veterinary"
            },
            {
              value: "Health and welfare",
              label: "Health and welfare"
            },
            {
              value: "Services",
              label: "Services"
            },
            {
              value: "Natural sciences",
              label: "Natural sciences"
            },
            {
              value: "History",
              label: "History"
            },
            {
              value: "Other",
              label: "Other"
            }
          ]
        })
      }
      if(!value.includes(e.target.value)){
        const index=newData.findIndex(el=>typeof el.id==='string')
        if(index!=-1){
          newData.splice(index,1)
        }
      }
    }
    console.log(3333, newData);

    for (const element of newData) {
      if (element.id === id) {
        element.value = e.target.value
      }
    }
    setData(newData);
  };

  const next = () => {
    const allAnswered = data.every((item) => item.value !== '');
    if (!allAnswered) {
      message.error('You need to answer all the questions to proceed.');
      return;
    }
    allInfo['page8'].info = data.map((item) => ({
      title: item.title,
      answer: item.value,
    }));
    allInfo['page8']['time'] = +new Date();
    console.log('allInfo', allInfo);
    setCurrentPage(currentPage+1);
  };

  const DOM = (item: any) => {
    if (item.type === 'radio') {
      return <div key={item.title}>
        <p className='page8_item'>{item.title}</p>
        <Radio.Group
          style={style}
          onChange={(e) => handleChange(item.id, e)}
          value={item.value}
          options={item.option}
        />
      </div>
    } else if (item.type === 'checkbox') {
      return <div key={item.title}>
        <p className='page8_item'>{item.title}</p>
        <Checkbox.Group
          style={style}
          options={item.option}
          value={item.value}
          onChange={(e) => handleChange(item.id, e)}
        />
      </div>
    } else if (item.type === 'input') {
      return <div key={item.title}>
        <p className='page8_item'>{item.title}</p>
        <Input.TextArea
          value={item.value}
          rows={3}
          onChange={(e) => handleChange(item.id, e)}
        />
      </div>
    }
  }

  return (
    <div className='page8_content'>
      {data.map((item: any) => DOM(item))}
      <CountButton countdownTime={countdownTime} onAction={next} />
    </div>
  );
}