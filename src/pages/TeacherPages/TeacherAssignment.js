import React, { useEffect, useReducer, useState } from 'react'
import 'mathlive'
import Select from 'react-select'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
// import { utils } from 'react-modern-calendar-datepicker';
import moment from 'moment'
// import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import axios from 'axios'
import Modal from 'react-modal'
import 'react-modern-calendar-datepicker/lib/DatePicker.css'

import { API_URL } from '../../constant'
import Button from '../../components/Button'
import AssignmentInfo from '../../components/Teacher/AssignmentInfo'
import QuestionItem from '../../components/Teacher/QuestionItem'
import MultiChoice from '../../components/Teacher/AnswerType/MultiChoice'
import TrueFalse from '../../components/Teacher/AnswerType/TrueFalse'
import InputAnswer from '../../components/Teacher/AnswerType/InputAnswer'
import MultiSelect from '../../components/Teacher/AnswerType/MultiSelect'
import QuestionBank from '../../components/Teacher/QuestionBank'
import GenerateQuestionForAssignenment from '../../components/Teacher/GenerateQuestionForAssignenment'
import QuestionOption from '../../components/Teacher/QuestionOption'

const TeacherAssignment = () => {
  const teacherId = 1
  const Selectoptions = [
    { value: 1, label: 'Multi Choice' },
    { value: 2, label: 'True False' },
    { value: 3, label: 'Input' },
    { value: 4, label: 'Multi Select' },
  ]
  const { skillId, assignmentId } = useParams()

  const [question, setQuestion] = useState('')
  const [questionList, setQuestionList] = useState([])
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState(Selectoptions[0])

  const [enableHint, setEnableHint] = useState(false)
  const [hint, setHint] = useState('')
  const [answers, setAnswers] = useState({
    multiChoice: [
      { isTrue: false, answer: '' },
      { isTrue: false, answer: '' },
      { isTrue: false, answer: '' },
      { isTrue: false, answer: '' },
    ],
    multiSelect: [],
    input: [],
    trueFalse: [],
  })
  const [currentQid, setCurrentQid] = useState('')
  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  const [selectedGrade, setSelectedGrade] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('')
  const [selectedSkills, setSelectedSkills] = useState(() =>
    skillId ? [skillId] : [],
  )
  const [selectedLevel, setSelectedLevel] = useState('Easy')

  const [selectedAssignmentName, setSelectedAssignmentName] = useState('')
  const [selectedTotalScore, setSelectedTotalScore] = useState('')
  const [selectedTimeDo, setSelectedTimeDo] = useState('')
  const [selectedRedo, setSelectedRedo] = useState('')
  const [selectedTimeDue, setSelectedTimeDue] = useState('')
  const [selectedDayDue, setSelectedDayDue] = useState('')

  const [modalBankIsOpen, setBankIsOpen] = useState(false)
  const [modalGenerateIsOpen, setGenerateIsOpen] = useState(false)

  const handleOpenModalBank = () => {
    setBankIsOpen(true)
  }

  const handleCloseModalBank = () => {
    setBankIsOpen(false)
  }

  const handleOpenModalGenerate = () => {
    setGenerateIsOpen(true)
  }

  const handleCloseModalGenerate = () => {
    setGenerateIsOpen(false)
  }

  const handleUpdateQuestionBank = (questionBank) => {
    setQuestionList([...questionBank])
  }
  const handleUpdateGenerateQuestion = (questionGenerate) => {
    setQuestionList([...questionList, ...questionGenerate])
  }
  const handleScore = (e) => {
    const score = Math.max(0, Math.min(100, Number(e.target.value)))
    setScore(score)
  }

  const handleEnableHint = () => {
    setEnableHint(!enableHint)
  }
  const resetValue = () => {
    setCurrentQid('')
    setScore(0)
    setQuestion('')
    setHint('')
    setEnableHint(false)
    setSelectedOption(Selectoptions[0])
    setAnswers({
      multiChoice: [
        { isTrue: false, answer: '' },
        { isTrue: false, answer: '' },
        { isTrue: false, answer: '' },
        { isTrue: false, answer: '' },
      ],
      multiSelect: [],
      input: [],
      trueFalse: [],
    })
    forceUpdate()
    setSelectedLevel('')
  }

  const handleReviewQuestion = (data) => {
    setCurrentQid(data?.id)
    setQuestion(data?.content)
    if (data?.hint !== '') {
      setEnableHint(true)
      setHint(data?.hint)
    } else {
      setEnableHint(false)
      setHint('')
    }
    setAnswers(data?.option)
    setScore(data?.score)
    setSelectedLevel(data?.level)
    setSelectedOption(Selectoptions[data?.questionTypeId - 1])
    setSelectedGrade(data?.gradeId)
    setSelectedTopic(data?.topicId)
    setSelectedSkills(data?.skillIds)
  }

  const addQuestionItem = () => {
    if (questionList.find((item) => item.id === currentQid)) {
      let index = questionList.findIndex((item) => item.id === currentQid)
      const questionUpdate = {
        content: question,
        option: answers,
        hint: hint,
        score: score,
        level: selectedLevel,
        skillIds: selectedSkills,
        questionTypeId: selectedOption?.value,
        teacherId,
      }
      axios
        .put(API_URL + `question/${currentQid}`, questionUpdate)
        .then((res) => {
          questionList[index] = {
            id: res.data?.id,
            content: res.data?.content,
            hint: res.data?.hint,
            score: res.data?.score,
            option: res.data?.option,
            level: res.data?.level,
            questionTypeId: res.data?.questionTypeId,
            teacherId: res.data?.teacherId,
            gradeId: res.data?.gradeId,
            topicId: res.data?.topicId,
            skillIds: res.data?.skillIds,
          }
          setQuestionList([...questionList])
          resetValue()
        })
        .catch((err) => console.log(err))
      return
    }
    let questionCreate = {
      content: question,
      option: answers,
      hint: hint,
      score: score,
      level: selectedLevel,
      skillIds: selectedSkills,
      questionTypeId: selectedOption?.value,
      teacherId,
    }
    axios
      .post(API_URL + `question`, questionCreate)
      .then((res) => {
        const questionNewCreate = {
          id: res.data?.id,
          content: res.data?.content,
          hint: res.data?.hint,
          score: res.data?.score,
          option: res.data?.option,
          level: res.data?.level,
          questionTypeId: res.data?.questionTypeId,
          teacherId: res.data?.teacherId,
          gradeId: res.data?.gradeId,
          topicId: res.data?.topicId,
          skillIds: res.data?.skillIds,
        }
        setQuestionList([...questionList, questionNewCreate])
        resetValue()
      })
      .catch((err) => console.log(err))
  }
  const removeQuestionItem = (id) => {
    const newList = questionList.filter((item) => item.id !== id)
    setQuestionList(newList)
    resetValue()
  }
  const handleSaveAssignment = () => {
    const due = new Date(
      `${selectedDayDue.year}-${selectedDayDue.month}-${selectedDayDue.day} ${selectedTimeDue}`,
    )
    const assignment = {
      assignmentName: selectedAssignmentName,
      time: selectedTimeDo,
      totalScore: selectedTotalScore,
      redo: selectedRedo,
      dateDue: moment(due).format('YYYY-MM-DD HH:mm:ss'),
      teacherId: 1,
    }
    axios
      .put(API_URL + `assignment/${assignmentId}`, assignment)
      .then((res) => {
        const questionIds = questionList.map((question) => question.id)
        axios
          .put(API_URL + `assignment-question`, {
            assignmentId,
            questionIds,
          })
          .then((res) => {
            console.log(res.data)
          })
      })
  }

  useEffect(() => {
    axios.get(API_URL + `skill/${skillId}`).then((res) => {
      setSelectedGrade(res.data.gradeId)
      setSelectedTopic(res.data.topicId)
      setSelectedSkills([res.data.id])
    })
  }, [skillId])

  useEffect(() => {
    axios
      .get(API_URL + `assignment-question/assignment/${assignmentId}`)
      .then((res) => {
        const assignmentQuestion = res.data
        setQuestionList(
          assignmentQuestion.map((question) => ({
            id: question?.questionId,
            content: question?.content,
            hint: question?.hint,
            score: question?.score,
            option: question?.option,
            level: question?.level,
            questionTypeId: question?.questionTypeId,
            teacherId: question?.teacherId,
            gradeId: question?.gradeId,
            topicId: question?.topicId,
            skillIds: question?.skillIds,
          })),
        )
      })
  }, [assignmentId])

  // useEffect(() => {
  //   if (selectedLevel) {
  //     if (selectedLevel.toLowerCase() === 'easy') setScore(5)
  //     if (selectedLevel.toLowerCase() === 'medium') setScore(10)
  //     if (selectedLevel.toLowerCase() === 'hard') setScore(20)
  //   }
  // }, [selectedLevel, score])

  useEffect(() => {
    const mf = document.querySelector('#formula')
    mf.setValue(question)
  }, [question])

  return (
    <div className="flex flex-col items-center gap-7 justify-center h-full">
      <div className="flex flex-row gap-7 justify-center w-full h-full">
        <div className="w-[800px] bg-white rounded-lg shadow-lg flex flex-col justify-between my-4 px-10 py-5">
          <div className="flex flex-col gap-4">
            <div className="h-[88px]">
              <QuestionOption
                setSelectedSkills={setSelectedSkills}
                selectedSkills={selectedSkills}
                setSelectedLevel={setSelectedLevel}
                selectedLevel={selectedLevel}
                setSelectedGrade={setSelectedGrade}
                selectedGrade={selectedGrade}
                setSelectedTopic={setSelectedTopic}
                selectedTopic={selectedTopic}
                handleScore={handleScore}
                score={score}
              />
            </div>

            <math-field
              id="formula"
              style={{
                whiteSpace: 'initial',
                fontSize: '20px',
                outline: 'none',
                padding: '0.5rem 1.5rem',
                userSelect: 'none',
                width: '100%',
                maxHeight: '150px',
                overflowWrap: 'break-word',
                fontFamily: 'Poppins',
              }}
              readonly
            ></math-field>

            <motion.div
              layout
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="duration-300 h-[48px]"
            >
              {enableHint && (
                <div className="px-6 py-3 text-white flex flex-row gap-4 items-center bg-primary rounded-md overflow-hidden w-full break-words">
                  <i className="far fa-lightbulb"></i>
                  <span className=" whitespace-pre-line">
                    {hint ? hint : 'Hint'}
                  </span>
                </div>
              )}
            </motion.div>
            <textarea
              id="latex"
              className="outline-none focus:shadow-md duration-300 shadow-sm bg-gray-100 rounded-lg resize-none px-4 py-[0.5rem] h-36"
              onChange={(e) => {
                setQuestion(e.target.value)
              }}
              value={question || ''}
              placeholder="Type your question"
            />

            <div className="flex flex-row gap-5 items-baseline duration-500">
              <div className="flex flex-row items-baseline gap-5 h-[72px]">
                <input
                  type="checkbox"
                  checked={enableHint}
                  onClick={() => setHint('')}
                  onChange={handleEnableHint}
                  className="hidden"
                  id="hint"
                />
                <label
                  htmlFor="hint"
                  className="cursor-pointer select-none py-1"
                >
                  {enableHint ? (
                    <span className="bg-primary rounded-md px-2 border-2 border-primary py-1 text-white duration-300">
                      Hint
                    </span>
                  ) : (
                    <span className="bg-white rounded-md px-2 py-1 border-2 border-gray-500 duration-300">
                      Hint
                    </span>
                  )}
                </label>
              </div>
              {enableHint && (
                <motion.textarea
                  layout
                  maxLength="250"
                  placeholder="Enter hint"
                  value={hint || ''}
                  className="outline-none border-b-2 duration-500 px-2 py-1 w-full resize-none overflow-y"
                  onChange={(e) => {
                    setHint(e.target.value)
                  }}
                />
              )}
            </div>
          </div>

          <div className="flex flex-row items-center justify-between">
            <span className="font-medium text-xl">Answers</span>
            <Select
              value={selectedOption || ''}
              defaultValue={Selectoptions[0]}
              onChange={setSelectedOption}
              options={Selectoptions}
              className="w-44 transition-all"
            />
          </div>
          <div className="flex flex-col justify-center content-center min-h-[184px] my-2">
            {selectedOption?.value === 1 ? (
              <MultiChoice
                setAnswers={setAnswers}
                answers={answers}
                questionType={selectedOption}
              />
            ) : selectedOption?.value === 2 ? (
              <TrueFalse
                setAnswers={setAnswers}
                answers={answers}
                questionType={selectedOption}
              />
            ) : selectedOption?.value === 3 ? (
              <InputAnswer
                setAnswers={setAnswers}
                answers={answers}
                questionType={selectedOption}
              />
            ) : selectedOption?.value === 4 ? (
              <MultiSelect
                setAnswers={setAnswers}
                answers={answers}
                questionType={selectedOption}
              />
            ) : (
              ''
            )}
          </div>

          <div className="flex flex-row-reverse">
            <Button
              className="border-none shadow-lg"
              onClick={() => {
                addQuestionItem()
              }}
            >
              {currentQid ? 'Save' : 'Create Question'}
            </Button>
          </div>
        </div>
        <div className="flex flex-col my-4 gap-3">
          <div className="bg-white h-[280px] w-[400px] p-7 rounded-lg shadow-lg flex flex-col justify-between">
            <AssignmentInfo
              setSelectedAssignmentName={setSelectedAssignmentName}
              setSelectedTotalScore={setSelectedTotalScore}
              setSelectedTimeDo={setSelectedTimeDo}
              setSelectedRedo={setSelectedRedo}
              setSelectedTimeDue={setSelectedTimeDue}
              setSelectedDayDue={setSelectedDayDue}
            />
          </div>
          <div className="grow bg-white w-[400px] pb-7 rounded-lg shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex justify-between px-10 pt-8">
                <span className="font-medium text-xl">Question list</span>
                <div className="flex items-center">
                  <span
                    className="text-primary cursor-pointer"
                    onClick={handleOpenModalBank}
                  >
                    Bank question
                  </span>
                  <Modal
                    isOpen={modalBankIsOpen}
                    style={{
                      top: '0',
                      left: '0',
                      right: 'auto',
                      bottom: 'auto',
                      marginRight: '-50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                  >
                    <QuestionBank
                      questionsBank={questionList}
                      onUpdateQuestionBank={handleUpdateQuestionBank}
                      onCloseModalBank={handleCloseModalBank}
                    />
                  </Modal>
                </div>
              </div>
              <div className="h-[300px] rounded-sm mx-5 my-5 px-2 py-2 flex flex-col gap-4 overflow-y-auto duration-1000">
                {questionList.map((val, i) => (
                  <QuestionItem
                    question={val}
                    key={val + i}
                    index={i}
                    removeQuestionItem={() => {
                      removeQuestionItem(val.id)
                    }}
                    handleReviewQuestion={handleReviewQuestion}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col w-full justify-center items-center gap-5">
              <div className="flex w-full items-center justify-center">
                <Button
                  className="w-[80%] border-none shadow-lg"
                  onClick={handleOpenModalGenerate}
                >
                  Generate question
                </Button>
              </div>

              <Modal
                isOpen={modalGenerateIsOpen}
                style={{
                  top: '0',
                  left: '0',
                  right: 'auto',
                  bottom: 'auto',
                  marginRight: '-50%',
                  transform: 'translate(-50%, -50%)',
                }}
                contentLabel="Example Modal"
                ariaHideApp={false}
              >
                <GenerateQuestionForAssignenment
                  selectedGrade={selectedGrade}
                  selectedTopic={selectedTopic}
                  selectedSkills={selectedSkills}
                  listCurrentQuestion={questionList}
                  onCloseModalGenerate={handleCloseModalGenerate}
                  onUpdateGenerateQuestion={handleUpdateGenerateQuestion}
                />
              </Modal>
              <div className="flex w-full items-center justify-center">
                <Button
                  className="w-[80%] border-none shadow-lg"
                  onClick={handleSaveAssignment}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherAssignment
