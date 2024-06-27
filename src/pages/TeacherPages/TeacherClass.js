import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

import { API_URL } from '../../constant'
import Button from '../../components/Button'
import DetailsCard from '../../components/Teacher/DetailsCard'

const TeacherClass = () => {
  const noti = 2
  const navigate = useNavigate()
  const { classId } = useParams()
  const [classInfo, setClassInfo] = useState({})

  useEffect(() => {
    axios.get(API_URL + `class/${classId}}`).then((res) => {
      setClassInfo(res.data)
    })
  }, [classId])

  return (
    <div className="mt-8 mx-20 mb-5">
      {/* <PageHeader pageName={`Classes`}></PageHeader> */}
      <div className="flex flex-col gap-7">
        {/* top */}
        <div className="flex flex-row justify-between items-center">
          <div className="flex gap-2 items-center">
            <i className="fas fa-caret-left text-xl font-bold"></i>
            <span
              className="underline underline-offset-4 font-semibold cursor-pointer"
              onClick={() => {
                navigate('/class')
              }}
            >
              All Classes
            </span>
          </div>
          <Button className="bg-white text-black border-none shadow-lg relative flex flex-row justify-center items-center gap-3">
            Open Requests
            {noti !== 0 ? (
              <div className="relative shadow-md shadow-red-300 flex justify-center mb-1 bg-red-500 w-6 h-6 rounded-full">
                <span className="absolute translate-y-[3px] text-xs font-semibold text-white font-sans">
                  {noti <= 9 ? noti : '9+'}
                </span>
              </div>
            ) : (
              ''
            )}
          </Button>
        </div>

        {/* class infos */}
        <div className="flex flex-col justify-center items-center">
          <img
            src="https://img.freepik.com/premium-vector/students-classroom-teacher-near-blackboard-auditorium-teaches-maths-lesson-children-study-subject-kids-group-studying-elementary-primary-school-class-interior-cartoon-vector-flat-concept_176411-2393.jpg?w=2000"
            alt=""
            className="w-[200px] h-[200px] rounded-full border-4 border-white shadow-2xl mb-5"
          />
          <span className="font-bold text-3xl my-3">{classInfo.className}</span>
          <span className="">
            Date created:{' '}
            {`${moment(classInfo.createdAt).format('MM/DD/YYYY')}`}
          </span>
        </div>

        {/* detail cards */}
        <div className="px-16 flex flex-row gap-32 justify-center items-center">
          <DetailsCard
            value={classInfo.averageScore}
            title="Average Score"
            isScore={true}
            shadow="teacherdetails__AScore"
            color={'text-[#00d4ff]'}
            nav="/dashboard"
          />
          <DetailsCard
            value={classInfo.numberTopics}
            title="Topics"
            shadow="teacherdetails__Topics"
            color="text-[#9fff24]"
            nav={`/class/${classId}/topic`}
          />
          <DetailsCard
            value={classInfo.numberStudents}
            title="Students"
            shadow="teacherdetails__Students"
            color="text-[#ff24cf78]"
            nav={`/class/${classId}/manage-student`}
          />
        </div>
      </div>
    </div>
  )
}

export default TeacherClass
