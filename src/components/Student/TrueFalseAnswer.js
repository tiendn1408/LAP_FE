import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const TrueFalseAnswer = ({ answers, setAnswers }) => {
  const [chosenAnswer, setChosenAnswer] = useState(null)
  const convert = ['a', 'b']

  const handleAnswer = (e) => {
    let { value } = e.target
    setChosenAnswer(value)
    setAnswers((prev) => ({
      ...answers,
      trueFalse: [
        {
          answer: prev.trueFalse[0]?.answer,
          isTrue: value === 'a' ? true : false,
        },
        {
          answer: prev.trueFalse[1]?.answer,
          isTrue: value === 'b' ? true : false,
        },
      ],
    }))
  }

  useEffect(() => {
    const trueAnswer = answers.trueFalse?.findIndex(
      (element) => element.isTrue === true,
    )
    setChosenAnswer(convert[trueAnswer])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers])

  return (
    <div className="flex flex-wrap">
      <div className="hidden">
        <input
          type="radio"
          onChange={(e) => handleAnswer(e)}
          value="a"
          id="option-A"
          name="chosenAnswer"
        />
        <input
          type="radio"
          onChange={(e) => handleAnswer(e)}
          value="b"
          id="option-B"
          name="chosenAnswer"
        />
      </div>
      <div className="grid grid-cols-2 gap-5 my-5">
        <label
          htmlFor="option-A"
          className={`border border-primary  outline-none px-32 py-3 rounded-lg transition-all cursor-pointer ${
            chosenAnswer === 'a'
              ? 'bg-primary text-white'
              : 'text-primary bg-white'
          }`}
        >
          {answers.trueFalse[0]?.answer}
        </label>
        <label
          htmlFor="option-B"
          className={`border border-primary  outline-none px-32 py-3 rounded-lg transition-all cursor-pointer ${
            chosenAnswer === 'b'
              ? 'bg-primary text-white'
              : 'text-primary bg-white'
          }`}
        >
          {answers.trueFalse[1]?.answer}
        </label>
      </div>
    </div>
  )
}

export default TrueFalseAnswer
