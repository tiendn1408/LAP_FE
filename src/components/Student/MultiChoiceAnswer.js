import React, { useState, useEffect } from 'react'

const MultiChoiceAnswer = ({ answers, setAnswers }) => {
  const [chosenAnswer, setChosenAnswer] = useState(null)
  const convert = ['a', 'b', 'c', 'd']

  const handleAnswer = (e) => {
    let { value } = e.target
    setChosenAnswer(value)
    setAnswers((prev) => ({
      ...answers,
      multiChoice: [
        {
          answer: prev.multiChoice[0]?.answer,
          isTrue: value === 'a' ? true : false,
        },
        {
          answer: prev.multiChoice[1]?.answer,
          isTrue: value === 'b' ? true : false,
        },
        {
          answer: prev.multiChoice[2]?.answer,
          isTrue: value === 'c' ? true : false,
        },
        {
          answer: prev.multiChoice[3]?.answer,
          isTrue: value === 'd' ? true : false,
        },
      ],
    }))
  }

  useEffect(() => {
    const trueAnswer = answers.multiChoice?.findIndex(
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
        <input
          type="radio"
          onChange={(e) => handleAnswer(e)}
          value="c"
          id="option-C"
          name="chosenAnswer"
        />
        <input
          type="radio"
          onChange={(e) => handleAnswer(e)}
          value="d"
          id="option-D"
          name="chosenAnswer"
        />
      </div>
      <div className="flex flex-col w-full gap-5 my-5">
        <label
          htmlFor="option-A"
          className={`border border-primary outline-none w-full inline-block whitespace-normal break-words px-5 justify-center py-3 rounded-lg transition-all cursor-pointer ${
            chosenAnswer === 'a'
              ? 'bg-primary text-white'
              : 'text-primary bg-white'
          }`}
        >
          {answers.multiChoice[0]?.answer}
        </label>
        <label
          htmlFor="option-B"
          className={`border border-primary outline-none w-full inline-block whitespace-normal break-words px-5 h-fit justify-center py-3 rounded-lg transition-all cursor-pointer ${
            chosenAnswer === 'b'
              ? 'bg-primary text-white'
              : 'text-primary bg-white'
          }`}
        >
          {answers.multiChoice[1]?.answer}
        </label>
        <label
          htmlFor="option-C"
          className={`border border-primary outline-none w-full inline-block whitespace-normal break-words px-5 h-fit justify-center py-3 rounded-lg transition-all cursor-pointer ${
            chosenAnswer === 'c'
              ? 'bg-primary text-white'
              : 'text-primary bg-white'
          }`}
        >
          {answers.multiChoice[2]?.answer}
        </label>
        <label
          htmlFor="option-D"
          className={`border border-primary outline-none w-full inline-block whitespace-normal break-words px-5 h-fit justify-center py-3 rounded-lg transition-all cursor-pointer ${
            chosenAnswer === 'd'
              ? 'bg-primary text-white'
              : 'text-primary bg-white'
          }`}
        >
          {answers.multiChoice[3]?.answer}
        </label>
      </div>
    </div>
  )
}

export default MultiChoiceAnswer
