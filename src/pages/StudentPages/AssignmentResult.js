import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'

import { API_URL } from '../../constant'
import createAxiosJWT from '../../createAxiosJWT'

const axiosJWT = createAxiosJWT()
const AssignmentResult = () => {
  const { assignmentId } = useParams()
  const [listQuestionOfStudent, setListQuestionOfStudent] = useState([])
  const [listQuestionOfAssignment, setListQuestionOfAssignment] = useState([])
  const [assignment, setAssignment] = useState({})
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0)
  const [score, setScore] = useState(0)

  const executeScroll = (id) => {
    let elementId = `question-${id}`
    document.getElementById(elementId).scrollIntoView({ behavior: 'smooth' })
  }

  const checkStudentAnswered = (questionOfAssignment) => {
    const questionType = [
      '',
      'multiChoice',
      'trueFalse',
      'input',
      'multiSelect',
    ]
    const answerOfStudent = questionOfAssignment?.answerOfStudent?.answer
    const typeOfquestion =
      questionOfAssignment?.questionTypeId &&
      questionType[questionOfAssignment?.questionTypeId]
    if (answerOfStudent && typeOfquestion && answerOfStudent[typeOfquestion]) {
      const resultOfStudent = answerOfStudent[typeOfquestion]
      if (typeOfquestion === 'multiChoice')
        for (let i = 0; i < resultOfStudent.length; i++)
          if (resultOfStudent[i].isTrue) return resultOfStudent[i].answer
      if (typeOfquestion === 'trueFalse')
        for (let i = 0; i < resultOfStudent.length; i++)
          if (resultOfStudent[i].isTrue) return resultOfStudent[i].answer
      if (typeOfquestion === 'input' && resultOfStudent[0].answer.length > 0)
        return resultOfStudent[0].answer
      if (typeOfquestion === 'multiSelect')
        for (let i = 0; i < resultOfStudent.length; i++)
          if (resultOfStudent[i].isTrue) return resultOfStudent[i].answer
    }
    return false
  }

  const getCorrectAnswerOfQuestion = (questionOfAssignment) => {
    const questionType = [
      '',
      'multiChoice',
      'trueFalse',
      'input',
      'multiSelect',
    ]
    const answerOfQuestion = questionOfAssignment?.option
    const typeOfquestion =
      questionOfAssignment?.questionTypeId &&
      questionType[questionOfAssignment?.questionTypeId]
    if (
      answerOfQuestion &&
      typeOfquestion &&
      answerOfQuestion[typeOfquestion]
    ) {
      const resultOfQuestion = answerOfQuestion[typeOfquestion]
      if (typeOfquestion === 'multiChoice')
        for (let i = 0; i < resultOfQuestion.length; i++)
          if (resultOfQuestion[i].isTrue) return resultOfQuestion[i].answer
      if (typeOfquestion === 'trueFalse')
        for (let i = 0; i < resultOfQuestion.length; i++)
          if (resultOfQuestion[i].isTrue) return resultOfQuestion[i].answer
      if (typeOfquestion === 'input' && resultOfQuestion[0].answer.length > 0)
        return resultOfQuestion[0].answer
      if (typeOfquestion === 'multiSelect')
        for (let i = 0; i < resultOfQuestion.length; i++)
          if (resultOfQuestion[i].isTrue) return resultOfQuestion[i].answer
    }
    return false
  }

  useEffect(() => {
    axiosJWT
      .get(API_URL + `student-question/assignment/${assignmentId}`)
      .then((res) => {
        const questionsOfStudent = res.data

        for (let i = 0; i < questionsOfStudent.length; i++)
          questionsOfStudent[i].index = i
        if (questionsOfStudent && questionsOfStudent.length > 0) {
          setListQuestionOfStudent(questionsOfStudent)
          let countCorrect = 0
          let sumScore = 0
          for (let i = 0; i < questionsOfStudent.length; i++)
            if (questionsOfStudent[i]?.answerOfStudent?.isCorrect) {
              ++countCorrect
              sumScore += questionsOfStudent[i].score
            }
          setNumberOfCorrectAnswers(countCorrect)
          setScore(sumScore)
        }
      })
    axiosJWT.get(API_URL + `assignment/${assignmentId}`).then((res) => {
      setAssignment(res.data)
    })
    axiosJWT
      .get(API_URL + `assignment-question/assignment/${assignmentId}`)
      .then((res) => {
        setListQuestionOfAssignment(res.data)
      })
  }, [assignmentId])

  return (
    <div className="px-10 py-7 flex flex-row">
      {/* left */}
      <div className=" bg-white  w-[40%] h-fit px-5 py-4 shadow rounded-lg">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <span className="text-2xl font-[500] text-primary">
              {assignment.assignmentName}
            </span>
            <span className="text-gray-500 text-sm">
              <i className="fa-regular fa-clock"></i> {assignment.time} mins -{' '}
              <i className="fa-regular fa-calendar"></i>{' '}
              {moment(assignment.dateDue).format('YYYY-MM-DD HH:mm:ss')}
            </span>
            <span>Correct answers: {numberOfCorrectAnswers}</span>
            <span className="font-base">Score: {score}</span>
          </div>
          {/* answers */}
          <div className="flex flex-col gap-3">
            <span className="text-xl font-base">Your answers</span>
            <div className="flex flex-wrap gap-5 px-2 py-3 rounded-xl items-center">
              {listQuestionOfStudent.map((questionOfStudent, i) => {
                return (
                  <div
                    onClick={() => executeScroll(i)}
                    key={i}
                    className="h-[40px] w-[30px] flex flex-col outline outline-2 outline-gray-200 hover:outline-red-400 rounded overflow-hidden transition-all cursor-pointer select-none"
                  >
                    <div className="flex justify-center items-center">
                      <span>{i + 1}</span>
                    </div>

                    {questionOfStudent?.answerOfStudent?.isCorrect ? (
                      <div className="text-white flex w-full h-full items-center justify-center bg-green-400">
                        <i className="fas fa-check text-[8px]"></i>
                      </div>
                    ) : (
                      <div className="text-white flex w-full h-full items-center justify-center bg-red-400">
                        <i className="fa solid fa-xmark text-[8px]"></i>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      {/* right */}
      <div className="px-10 gap-5 h-[90vh] w-[60%] overflow-y-auto  items-center justify-center">
        <div className="flex flex-col gap-5 pb-5 ">
          {listQuestionOfStudent.map((questionOfStudent, i) => {
            return (
              <div
                id={`question-${i}`}
                key={i}
                className="flex flex-row gap-5 w-full bg-white rounded-lg shadow px-3 py-3"
              >
                <div className="w-[80px] h-[80px] flex items-center justify-center bg-primary rounded-lg select-none">
                  <span className="text-white text-xl font-semibold">
                    {i + 1}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col gap-3">
                      <span className="text-xl w-[480px]">
                        {questionOfStudent.content}
                      </span>
                      <span>
                        Correct Answer:{' '}
                        {getCorrectAnswerOfQuestion(
                          listQuestionOfAssignment.find(
                            (questionOfAssignment) =>
                              questionOfAssignment.questionId ===
                              questionOfStudent.questionId,
                          ),
                        )}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400 pt-1">
                      {questionOfStudent.score}pt
                    </span>
                  </div>
                  <div className="text-sm flex flex-row items-center gap-5">
                    <div className="bg-[#dcedfd] w-[480px] flex justify-between px-3 py-5 rounded-lg">
                      <span className="max-w-[430px] break-words whitespace-normal">
                        Your Answer: {checkStudentAnswered(questionOfStudent)}
                      </span>
                    </div>
                    {/* sai nao thi lay do */}
                    <div>
                      {questionOfStudent?.answerOfStudent?.isCorrect ? (
                        <i className="fa-solid fa-circle-check text-xl text-green-400"></i>
                      ) : (
                        <i className="fa-solid fa-circle-xmark text-xl text-red-500"></i>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AssignmentResult
