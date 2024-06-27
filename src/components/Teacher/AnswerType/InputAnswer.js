import React, { useEffect, useState, useRef } from 'react'

const InputAnswer = ({  answers, setAnswers }) => {
  const [answer, setAnswer] = useState('')

  const preValue = useRef('')

  useEffect(() => {
    if (preValue.current !== answer && answer.length > 0) {
      preValue.current = answer
      setAnswers({ ...answers, input: [{ answer: answer }] })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer])

  useEffect(() => {
    if (
      answers &&
      answers?.input?.length === 1 &&
      answer !== answers?.input[0]?.answer
    ) {
      setAnswer(answers.input[0]?.answer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers])

  return (
    <div className="flex justify-center w-full">
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter the answer..."
        className="outline-primary resize-none transition-all border-2 border-gray-500 px-5 py-2 rounded-md w-[90%]"
      ></textarea>
    </div>
  )
}

export default InputAnswer
