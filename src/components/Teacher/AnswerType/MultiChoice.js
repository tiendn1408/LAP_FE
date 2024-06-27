import React, { useState, useEffect, useMemo } from 'react'

const MultiChoice = ({ answers, setAnswers, Preview }) => {
  const [value, setValue] = useState('')
  const [answerA, setAnswerA] = useState('')
  const [answerB, setAnswerB] = useState('')
  const [answerC, setAnswerC] = useState('')
  const [answerD, setAnswerD] = useState('')

  // const handleOnChange = (e) => {
  //     setValue(e.target.value);
  // };

  const convert = useMemo(
    () => ({
      0: 'a',
      1: 'b',
      2: 'c',
      3: 'd',
    }),
    [],
  )

  useEffect(() => {
    if (answers && answers?.multiChoice?.length === 4) {
      const trueAnswer = answers?.multiChoice?.findIndex(
        (element) => element.isTrue === true,
      )
      setValue(convert[`${trueAnswer}`])
      setAnswerA(answers.multiChoice[0]?.answer)
      setAnswerB(answers.multiChoice[1]?.answer)
      setAnswerC(answers.multiChoice[2]?.answer)
      setAnswerD(answers.multiChoice[3]?.answer)
    }
  }, [answers, convert])

  useEffect(() => {
    setAnswers((prev) => {
      prev.multiChoice[0].isTrue = value === 'a' ? true : false
      prev.multiChoice[1].isTrue = value === 'b' ? true : false
      prev.multiChoice[2].isTrue = value === 'c' ? true : false
      prev.multiChoice[3].isTrue = value === 'd' ? true : false
      return prev
    })
  }, [value, setAnswers])

  useEffect(() => {
    setAnswers((prev) => {
      prev['multiChoice'][0]['answer'] = answerA
      return prev
    })
  }, [answerA, setAnswers])
  useEffect(() => {
    setAnswers((prev) => {
      prev['multiChoice'][1]['answer'] = answerB
      return prev
    })
  }, [answerB, setAnswers])

  useEffect(() => {
    setAnswers((prev) => {
      prev['multiChoice'][2]['answer'] = answerC
      return prev
    })
  }, [answerC, setAnswers])

  useEffect(() => {
    setAnswers((prev) => {
      prev['multiChoice'][3]['answer'] = answerD
      return prev
    })
  }, [answerD, setAnswers])

  return (
    <div className="w-full">
      <div className="hidden">
        <input
          type="radio"
          checked={value === 'a'}
          onChange={(e) => setValue(e.target.value)}
          name="right-answer"
          value="a"
          id="option-a"
        />
        <input
          type="radio"
          checked={value === 'b'}
          onChange={(e) => setValue(e.target.value)}
          name="right-answer"
          value="b"
          id="option-b"
        />
        <input
          type="radio"
          checked={value === 'c'}
          onChange={(e) => setValue(e.target.value)}
          name="right-answer"
          value="c"
          id="option-c"
        />
        <input
          type="radio"
          checked={value === 'd'}
          onChange={(e) => setValue(e.target.value)}
          name="right-answer"
          value="d"
          id="option-d"
        />
      </div>
      <div className="grid grid-cols-2 gap-5 my-5">
        <label
          htmlFor="option-a"
          className="h-full w-full bg-primary px-3 py-4 rounded-md flex flex-row gap-5 items-center justify-between cursor-pointer"
        >
          {Preview ? (
            <span className="text-white outline-none  duration-300  pb-1 px-1">
              {answerA}
            </span>
          ) : (
            <input
              value={answerA}
              onChange={(e) => setAnswerA(e.target.value)}
              placeholder="Type in answer"
              readOnly={Preview ? true : false}
              className={`text-white outline-none w-full bg-primary placeholder-gray-100 border-b border-primary duration-300 focus:border-gray-100 pb-1 px-1`}
            />
          )}
          {value === 'a' ? (
            <div className="w-[20px] h-[20px] rounded-full bg-green-400 text-white cursor-pointer flex justify-center items-center">
              <i className="fas fa-check text-xs"></i>
            </div>
          ) : (
            <div className="w-[20px] h-[20px] rounded-full border-2  cursor-pointer"></div>
          )}
        </label>
        <label
          htmlFor="option-b"
          className="h-full w-full bg-primary px-3 py-4 rounded-md flex flex-row gap-5 items-center justify-between cursor-pointer"
        >
          {Preview ? (
            <span className="text-white outline-none  duration-300  pb-1 px-1">
              {answerB}
            </span>
          ) : (
            <input
              value={answerB}
              onChange={(e) => setAnswerB(e.target.value)}
              placeholder="Type in answer"
              readOnly={Preview ? true : false}
              className={` text-white outline-none bg-primary placeholder-gray-100 w-full border-b border-primary duration-300 focus:border-gray-100 pb-1 px-1`}
            />
          )}
          {value === 'b' ? (
            <div className="w-[20px] h-[20px] rounded-full bg-green-400 text-white cursor-pointer flex justify-center items-center">
              <i className="fas fa-check text-xs"></i>
            </div>
          ) : (
            <div className="w-[20px] h-[20px] rounded-full border-2 cursor-pointer"></div>
          )}
        </label>
        <label
          htmlFor="option-c"
          className="h-full w-full bg-primary px-3 py-4 rounded-md flex flex-row gap-5 items-center justify-between cursor-pointer"
        >
          {Preview ? (
            <span className="text-white outline-none  duration-300  pb-1 px-1">
              {answerC}
            </span>
          ) : (
            <input
              value={answerC}
              onChange={(e) => setAnswerC(e.target.value)}
              placeholder="Type in answer"
              readOnly={Preview ? true : false}
              className={` text-white outline-none bg-primary placeholder-gray-100 w-full border-b border-primary duration-300 focus:border-gray-100 pb-1 px-1`}
            />
          )}
          {value === 'c' ? (
            <div className="w-[20px] h-[20px] rounded-full bg-green-400 text-white cursor-pointer flex justify-center items-center">
              <i className="fas fa-check text-xs"></i>
            </div>
          ) : (
            <div className="w-[20px] h-[20px] rounded-full border-2  cursor-pointer"></div>
          )}
        </label>
        <label
          htmlFor="option-d"
          className="h-full w-full bg-primary px-3 py-4 rounded-md flex flex-row gap-5 items-center justify-between cursor-pointer"
        >
          {Preview ? (
            <span className="text-white outline-none  duration-300  pb-1 px-1">
              {answerD}
            </span>
          ) : (
            <input
              value={answerD}
              onChange={(e) => setAnswerD(e.target.value)}
              placeholder="Type in answer"
              readOnly={Preview ? true : false}
              className={` text-white outline-none bg-primary placeholder-gray-100 w-full border-b border-primary duration-300 focus:border-gray-100 pb-1 px-1`}
            />
          )}
          {value === 'd' ? (
            <div className="w-[20px] h-[20px] rounded-full bg-green-400 text-white cursor-pointer flex justify-center items-center">
              <i className="fas fa-check text-xs"></i>
            </div>
          ) : (
            <div className="w-[20px] h-[20px] rounded-full border-2  cursor-pointer"></div>
          )}
        </label>
      </div>
    </div>
  )
}

export default MultiChoice
