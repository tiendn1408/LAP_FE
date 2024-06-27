import React, { useEffect, useState } from 'react'
import { useCallback } from 'react'
import 'react-circular-progressbar/dist/styles.css'
import { useNavigate, useParams } from 'react-router-dom'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import Button from '../../components/Button'
import TokenExpire from '../../components/Modals/TokenExpire'
import TopicCard from '../../components/Student/TopicCard'
import { API_URL } from '../../constant'
import createAxiosJWT from '../../createAxiosJWT'
import GrowingTextArea from '../TeacherPages/GrowingTextArea'

const axiosJWT = createAxiosJWT()

const SkillInTopics = ({ isTeacher, val, getTopicOfClass }) => {
  const navigate = useNavigate()

  const [openMoreOption, setOpenMoreOption] = useState(false)
  const [assignmentsOfSkill, setAssignmentsOfSkill] = useState([])
  const [isExpired, setIsExpired] = useState(false)

  const handleGetAssignmentsOfSkill = useCallback(async () => {
    try {
      const res = await axiosJWT.get(
        API_URL + `skill-assignment/skill/${val?.id}`,
      )
      setAssignmentsOfSkill(res.data)
    } catch (error) {
      console.log(error)
      if (error.response.status === 401) setIsExpired(true)
    }
  }, [val])

  const handleDoAssignment = async (id) => {
    navigate(`/assignment/${id}/question/`)
  }

  useEffect(() => {
    handleGetAssignmentsOfSkill()
  }, [handleGetAssignmentsOfSkill])

  const handleDeleteSkill = async (id) => {
    try {
      await axiosJWT.delete(API_URL + `skill/${id}`)
      getTopicOfClass()
    } catch (error) {
      console.log(error)
      if (error.response.status === 401) setIsExpired(true)
    }
  }

  return (
    <div className="flex flex-col gap-3 px-2 py-3 ">
      <div className="flex border-b p-y-2 pb-2 flex-row justify-between items-center">
        <span className="text-xl">{val.skillName}</span>
        <div className="flex flex-row gap-5 items-center">
          <span className="text-primary text-sm">{val.standardName}</span>
          {isTeacher && (
            <div className="flex flex-col">
              <div
                className={`rounded-full relative h-[24px] w-[24px] cursor-pointer  select-none flex items-center justify-center bg-${
                  openMoreOption ? `gray-100` : `white`
                } hover:bg-gray-100`}
                onClick={() => setOpenMoreOption(!openMoreOption)}
              >
                <i className="fas fa-ellipsis-h font-xs"></i>
                {openMoreOption && (
                  <div className="absolute z-1 w-[125px] translate-y-14 -translate-x-12 border-t-2 text-sm border-primary bg-[#ffffff] flex flex-col divide-y shadow-lg rounded-b">
                    <div
                      className="cursor-pointer px-2 py-1 hover:bg-[#ffffff] transition-all"
                      onClick={() => {
                        handleDeleteSkill(val.id)
                      }}
                    >
                      <span>Remove</span>
                    </div>
                    <div className="cursor-pointer px-2 py-1 hover:bg-[#ffffff] transition-all">
                      <span>Create Assignment</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {assignmentsOfSkill?.map((val, i) => {
          return (
            <div key={i} className="flex flex-row items-center justify-between">
              <span
                className="cursor-pointer"
                onClick={() => {
                  navigate(`/assignment-summary/${val.id}/`)
                }}
              >
                {val?.Assignment?.assignmentName}
              </span>
              <Button
                className="text-xs"
                onClick={() => handleDoAssignment(val.Assignment.id)}
              >
                Do assignment
              </Button>
            </div>
          )
        })}
      </div>
      <TokenExpire isOpen={isExpired} />
    </div>
  )
}

const topicImage =
  'https://thumbs.dreamstime.com/b/letter-block-word-topic-wood-background-business-concept-170764857.jpg'
const StudentClass = () => {
  const { classId } = useParams()
  const [topicsOfClass, setTopicsOfClass] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentTopic, setCurrentTopic] = useState()
  const [skills, setSkills] = useState([])
  const [currentTopicId, setCurrentTopicId] = useState('')
  const [topics, setTopics] = useState()
  const [isExpired, setIsExpired] = useState(false)

  const getTopicOfClass = useCallback(async () => {
    try {
      const res = await axiosJWT.get(
        API_URL + `class-topic/student/class/${classId}`,
      )
      const result = res.data
      console.log(result)
      if (result.length > 0 && result[0]?.topicId && !currentTopicId)
        setCurrentTopicId(result[0].topicId)
      let valueTopics = []
      for (let i = 0; i < result.length; ++i) {
        valueTopics = [
          ...valueTopics,
          {
            id: result[i].topicId,
            topicName: result[i].topicName,
            description: result[i].description,
            topicImg: result[i].topicImg,
            prerequisiteTopicName: result[i].prerequisiteTopicName,
            classTopicId: result[i].id,
          },
        ]
      }
      setTopics(valueTopics)
      setTopicsOfClass(result)
    } catch (error) {
      console.log(error)
      if (error.response.status === 401) setIsExpired(true)
    }
  }, [classId, currentTopicId])

  const getSkillsOfTopic = useCallback(async () => {
    try {
      if (currentTopicId) {
        const res = await axiosJWT.get(
          API_URL + `skill/topic/${currentTopicId}`,
        )
        setSkills(res.data)
        setCurrentTopic(
          topics.find((topic) => topic.id === currentTopicId) || {},
        )
      }
    } catch (error) {
      console.log(error)
      if (error.response.status === 401) setIsExpired(true)
    }
  }, [currentTopicId, topics])

  useEffect(() => {
    getSkillsOfTopic()
  }, [getSkillsOfTopic])

  useEffect(() => {
    getTopicOfClass()
  }, [getTopicOfClass])

  console.log(topicsOfClass)

  return (
    <div className="flex flex-row h-screen">
      {/* left */}
      <div className="w-[40%] flex flex-col px-5 py-5 gap-6">
        <div className="flex flex-col gap-3 px-4">
          <span className="text-2xl font-medium truncate">ClassName</span>
          {/* search */}
          <div className="flex flex-row justify-between items-center w-full">
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none rounded-lg text-base px-4 py-2 w-[65%] drop-shadow-md focus:drop-shadow-lg transition-all"
              placeholder="Search topics"
            />
          </div>
        </div>
        {/* filter */}
        {/* courses */}
        <div className="flex flex-col gap-7 px-4 pb-4 overflow-auto scroll-smooth">
          {topicsOfClass
            .filter((val) => {
              if (
                searchTerm === '' ||
                val.topicName.toLowerCase().includes(searchTerm.toLowerCase())
              )
                return val
              return ''
            })
            .map((item, i) => {
              return (
                <TopicCard
                  TopicInfo={item}
                  key={i}
                  setCurrentTopicId={setCurrentTopicId}
                />
              )
            })}
        </div>
      </div>
      {/* right */}
      <div className="flex flex-col gap-5 w-[60%] bg-white py-5 px-10 overflow-y-auto">
        {/* Topic tile */}
        <div className="flex flex-row gap-3 justify-center items-center">
          {currentTopic?.topicName}
          {/* {currentTopic?.topicName && (
                        <input
                            size={topicName?.length || 10}
                            value={topicName || ''}
                            className={`text-2xl text-center font-medium max-w-[600px] text-primary outline-none px-3 transition-all border-b-2 py-2  `}
                        />
                    )} */}
        </div>
        {/* image */}
        <div
          className={`relative rounded-lg min-h-[300px] overflow-hidden flex items-center justify-center bg-center w-full select-none  transition-all`}
        >
          <img
            src={currentTopic?.topicImg || topicImage}
            className="h-[300px] w-full"
            alt=""
          />
        </div>
        {/* topic des */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between items-center">
            <span className="text-2xl font-medium text-gray-700">
              Topic descriptions
            </span>
          </div>
          {currentTopic?.description && (
            <GrowingTextArea
              value={currentTopic?.description}
              className="text-justify"
            />
          )}
        </div>
        {/* skills */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between items-center">
            <span className="text-2xl font-medium text-gray-700">Skills</span>
          </div>
          <div className="flex flex-col gap-1">
            {skills.map((val, i) => {
              return (
                <SkillInTopics
                  val={val}
                  key={val.id + i}
                  getTopicOfClass={getTopicOfClass}
                />
              )
            })}
          </div>
        </div>
      </div>
      <TokenExpire isOpen={isExpired} />
    </div>
  )
}

export default StudentClass
