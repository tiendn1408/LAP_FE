import React from 'react'
import { useState } from 'react'
import MultiChoiceAnswer from '../components/Student/MultiChoiceAnswer'
import TrueFalseAnswer from '../components/Student/TrueFalseAnswer'

const Test = () => {
  // const answer = {
  //   multiChoice: [{ answer: '10' }, { answer: '10' }, { answer: '10' }],
  // }

  const [answers, setAnswers] = useState({
    trueFalse: [{ answer: 'True' }, { answer: 'False' }],
  })

  return (
    <div className="flex flex-col items-center mt-10 w-full h-screen bg-white">
      <TrueFalseAnswer answers={answers} setAnswers={setAnswers} />
    </div>
  )
}

export default Test
