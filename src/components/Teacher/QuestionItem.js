import React, { useState } from 'react'
import 'mathlive'
import { useEffect } from 'react'

const handleQuestionType = (typeId) => {
  if (typeId === 1) return 'Multi Choice'
  if (typeId === 2) return 'True False'
  if (typeId === 3) return 'Input'
  if (typeId === 4) return 'Select'
}

const QuestionItem = ({
  handleReviewQuestion,
  question,
  index,
  removeQuestionItem,
}) => {
  const [isHovering, setIsHovering] = useState(false)
  const [passedQuestion, setPassedQuestion] = useState([])

  useEffect(() => {
    setPassedQuestion(question)
  }, [question])

  const handleMouseOver = () => {
    setIsHovering(true)
  }

  const handleMouseOut = () => {
    setIsHovering(false)
  }

  useEffect(() => {
    const mf = document.querySelector(`#formula-${index}`)
    mf.setValue(passedQuestion?.content)
  }, [passedQuestion?.content, index])

  return (
    <div
      className="flex relative flex-row gap-2 px-4 py-3 hover:bg-gray-50 transition-all items-center border rounded-md shadow-sm cursor-pointer"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {isHovering && (
        <div
          className="cursor-pointer transition-all translate-x-[295px] -translate-y-5 absolute z-10"
          onClick={() => removeQuestionItem(passedQuestion?.id)}
        >
          <i className="far fa-trash-alt text-red-500 text-sm" />
        </div>
      )}
      <div className="pr-1">
        <span className="text-3xl text-primary">{index + 1}</span>
      </div>
      <div
        className="flex flex-col overflow-hidden w-full overflow-y-hidden"
        onClick={() => {
          handleReviewQuestion(passedQuestion)
        }}
      >
        <div className="mr-7 pointer-events-none">
          <math-field readOnly id={`formula-${index}`}></math-field>
        </div>
        <div className="flex flex-row justify-between text-xs">
          <span>
            Type : {handleQuestionType(passedQuestion?.questionTypeId)}
          </span>
          <span>Score : {passedQuestion?.score}.pt</span>
        </div>
      </div>
    </div>
  )
}

export default QuestionItem
