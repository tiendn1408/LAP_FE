import React from 'react'
import { useState } from 'react'

const testImg =
  'https://thumbs.dreamstime.com/b/student-school-boy-studying-computer-online-lesson-education-vector-concept-student-school-boy-studying-computer-114522764.jpg'

const AssignmentView = () => {
  //search
  const [searchTerm, setSearchTerm] = useState('')
  const [testStudents, setTestStudents] = useState([
    {
      img: testImg,
      name: 'Nhat asdasdadasdasdasdasdasdasadasdasds',
      score: 70,
      daySubmit: '25 April 2022 9:00 AM',
    },
    {
      img: testImg,
      name: 'Nhat 1',
      score: 60,
      daySubmit: '25 April 2022 9:00 AM',
    },
    {
      img: testImg,
      name: 'Nhat 2',
      score: 40,
      daySubmit: '25 April 2022 9:00 AM',
    },
    {
      img: testImg,
      name: 'Nhat 3',
      score: 40,
      daySubmit: '25 April 2022 9:00 AM',
    },
    {
      img: testImg,
      name: 'Nhat 4',
      score: 40,
      daySubmit: '25 April 2022 9:00 AM',
    },
    {
      img: testImg,
      name: 'Nhat 5',
      score: 70,
      daySubmit: '25 April 2022 9:00 AM',
    },
    {
      img: testImg,
      name: 'Nhat 6',
      score: 70,
      daySubmit: '25 April 2022 9:00 AM',
    },
  ])

  const returnView = (score) => {
    if (score >= 70) {
      return (
        <span className="bg-green-400 text-sm py-1 w-24 flex justify-center text-white px-2 rounded-full">
          Excellent
        </span>
      )
    }
    if (score < 50) {
      return (
        <span className="bg-red-400 text-sm py-1 w-24 flex justify-center text-white px-2 rounded-full">
          Failed
        </span>
      )
    }
    return (
      <span className="bg-primary text-sm py-1 w-24 flex justify-center text-white px-2 rounded-full">
        Good
      </span>
    )
  }

  return (
    <div className="px-10 py-10 flex flex-col gap-5">
      <div className="flex flex-col gap-4 w-full h-fit px-10 pb-10 pt-7 bg-white rounded-lg shadow">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-3 text-gray-500">
            <span className="text-2xl text-gray-700">Assignment name</span>
            <span className="">Course : topic name</span>
            <span>20 Questions</span>
          </div>
          <div className="flex flex-col gap-3 text-gray-500">
            <div className="flex flex-row-reverse gap-3">
              {new Array(3).fill(0).map((val, i) => {
                return (
                  <div className="px-2 py-1 h-fit flex items-center justify-center text-primary rounded-full border-2 border-primary">
                    <span className="text-sm">Skill name</span>
                  </div>
                )
              })}
            </div>
            <span>25 April 2022 9:00 AM - 25 April 2022 3:00 PM</span>
            <span className="text-left">
              <i className="fa-regular fa-clock"></i> 30 Mins
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-7">
          {/* Total student */}
          <div className="flex flex-row items-center w-[355px] gap-7 border border-gray-300 px-5 py-4 rounded-md">
            <div className="flex items-center justify-center text-white bg-primary  rounded-full w-[40px] h-[40px]">
              <i className="fa-solid fa-user"></i>
            </div>
            <div className="flex flex-col">
              <span>Assigned Students</span>
              <span className="text-2xl">30</span>
            </div>
          </div>
          {/* Average Score */}
          <div className="flex flex-row items-center w-[355px] gap-7 border border-gray-300 px-5 py-4 rounded-md">
            <div className="flex items-center justify-center text-white bg-yellow-400  rounded-full w-[40px] h-[40px]">
              <i className="fa-solid fa-star"></i>
            </div>
            <div className="flex flex-col">
              <span>Average Score</span>
              <span className="text-2xl">30</span>
            </div>
          </div>
          {/* Passed Students */}
          <div className="flex flex-row items-center w-[355px] gap-7 border border-gray-300 px-5 py-4 rounded-md">
            <div className="flex items-center justify-center text-white bg-green-400  rounded-full w-[40px] h-[40px]">
              <i className="fa-solid fa-check font-bold"></i>
            </div>
            <div className="flex flex-col">
              <span>Total Passed students</span>
              <span className="text-2xl">30</span>
            </div>
          </div>
          {/* Passed Students */}
          <div className="flex flex-row items-center w-[355px] gap-7 border border-gray-300 px-5 py-4 rounded-md">
            <div className="flex items-center justify-center text-white bg-red-400  rounded-full w-[40px] h-[40px]">
              <i className="fa-solid fa-xmark"></i>
            </div>
            <div className="flex flex-col">
              <span>Failed Students</span>
              <span className="text-2xl">30</span>
            </div>
          </div>
          {/* Passed Students */}
          <div className="flex flex-row items-center w-[355px] gap-7 border border-gray-300 px-5 py-4 rounded-md">
            <div className="flex items-center justify-center text-white bg-yellow-500  rounded-full w-[40px] h-[40px]">
              <i className="fa-solid fa-circle-info"></i>
            </div>
            <div className="flex flex-col">
              <span>Late submit</span>
              <span className="text-2xl">30</span>
            </div>
          </div>
          {/* Passed Students */}
          <div className="flex flex-row items-center w-[355px] gap-7 border border-gray-300 px-5 py-4 rounded-md">
            <div className="flex items-center justify-center text-white bg-pink-400  rounded-full w-[40px] h-[40px]">
              <i className="fa-solid fa-question"></i>
            </div>
            <div className="flex flex-col">
              <span>Not submitted</span>
              <span className="text-2xl">30</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <span className="text-xl">Submitted students</span>
        <div className="flex flex-row items-center gap-10">
          <input
            type="text"
            placeholder="Search student.."
            className="px-3 py-2 rounded-lg shadow outline-none focus:shadow-lg transition-all"
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }}
          />
          <div className="flex flex-row gap-3 text-gray-500 items-center">
            <div className="flex flex-col text-xs select-none">
              <i
                onClick={() => {
                  setTestStudents([
                    ...testStudents.sort((a, b) => b.score - a.score),
                  ])
                }}
                className="fa-solid fa-caret-up cursor-pointer rounded active:scale-90"
              ></i>
              <i
                onClick={() => {
                  setTestStudents([
                    ...testStudents.sort((a, b) => a.score - b.score),
                  ])
                }}
                className="fa-solid fa-caret-down cursor-pointer rounded active:scale-90 "
              ></i>
            </div>
            <span className="font-medium ">Score Sort</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {testStudents
            .filter((val) => {
              if (
                searchTerm === '' ||
                val.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val
              }
              return ''
            })
            .map((val, i) => {
              return (
                <div className="flex flex-row gap-28 items-center rounded-md shadow-md bg-white px-5 py-4 w-full h-fit">
                  <div className="flex flex-row gap-4 items-center w-[170px]">
                    <img
                      src={val?.img}
                      className="w-[40px] h-[40px] rounded-full"
                      alt=""
                    />
                    <span className="truncate w-[125px]">{val?.name}</span>
                  </div>
                  <span>{val?.score}</span>
                  {returnView(val?.score)}
                  <span className="text-gray-500">25 April 2022 9:00 AM</span>
                  <span className="text-gray-500">Late</span>
                  <span className="text-primary cursor-pointer select-none">
                    View Answers
                  </span>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default AssignmentView
