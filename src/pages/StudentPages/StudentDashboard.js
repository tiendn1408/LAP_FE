import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css'
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker'

import studentImage from '../../assets/image/students.webp'

import CustomProgressBar from '../../components/CustomProgressBar'
import { buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

//swiper
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'

import achievementImg from '../../assets/image/achievement.png'
import axios from 'axios'
import { API_URL } from '../../constant'
import moment from 'moment'

const StudentDashboard = () => {
  const [selectedDay, setSelectedDay] = useState(null)

  const [assignments, setAssignments] = useState([])
  const [assignmentDays, setAssignmentsDays] = useState([])

  let studentId = 1

  useEffect(() => {
    axios
      .get(API_URL + 'student-assignment/' + studentId)
      .then((res) => {
        setAssignments(res?.data)
        handleDays(res?.data)
      })
      .catch((err) => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDays = async (assignments) => {
    let days = []

    // [
    //   {
    //     year: 2022,
    //     month: 9,
    //     day: 26,
    //     className: 'deadline',
    //   },
    // ]

    for (let i = 0; i < assignments.length; i++) {
      days.push({
        year: parseInt(moment(assignments[i]?.dateDue).format('YYYY')),
        month: parseInt(moment(assignments[i]?.dateDue).format('MM')),
        day: parseInt(moment(assignments[i]?.dateDue).format('DD')),
        className: 'deadline',
      })
    }

    await setAssignmentsDays(days)
  }

  const averageScore = 68
  return (
    <div className="px-10 py-7 flex flex-row gap-5 h-[full] text-gray-800">
      <div className="flex flex-col w-[80%] gap-7">
        <span className="text-xl font-semibold font-inter">Dashboard</span>
        {/* welcome back */}
        <div className="flex flex-row h-[150px] -z-50 bg-primary relative rounded-lg shadow-lg px-4 py-3">
          <div className="text-xl text-white w-[40%] flex flex-col pl-10 gap-5 self-center">
            <span className="text-2xl">Welcome back Nhat !</span>{' '}
            <span className="text-base">It is what it is</span>
          </div>
          {/* image */}
          <div className="">
            <img
              src={studentImage}
              alt=""
              className="w-72 h-48 absolute 2xl:translate-x-[200px] xl:translate-x-[75px] -translate-y-[70px]"
            ></img>
          </div>
        </div>
        <div className="flex flex-row gap-7">
          {/* topics */}
          <div className=" px-4 py-3 flex flex-col w-[60%] bg-white shadow-lg rounded-lg">
            <div className="flex flex-row items-center px-2 justify-between">
              <h2 className="font-semibold font-inter text-gray-600">
                Class Topics
              </h2>
              <span className="text-xs text-primary cursor-pointer select-none">
                View all
              </span>
            </div>
            <div className="flex flex-col h-[297px] text-gray-800 gap-3 py-3 divide-y">
              {new Array(5).fill(0).map((val, i) => {
                return (
                  <div
                    key={i}
                    className="flex pt-5 px-3 flex-row justify-between items-center "
                  >
                    <span className="truncate max-w-[50%]">
                      Unit - <span className="text-gray-500">{i}</span>
                    </span>
                    <div className="flex w-[50%] flex-row items-center gap-3">
                      <div className="w-full bg-gray-200 gap-4 rounded-full h-1.5">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{ width: '45%' }}
                        ></div>
                      </div>
                      <span className="text-sm text-primary">45%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          {/* Achievements */}
          <div className="bg-white rounded-lg select-none px-4 py-3 w-[40%] shadow-lg gap-7 flex flex-col">
            <span className="font-semibold font-inter text-gray-600">
              Achievements
            </span>
            <Swiper
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="achievementSwiper w-[100%] justify-center items-center py-10"
            >
              <SwiperSlide>
                <div className="w-[200px] h-[200px]">
                  <CustomProgressBar
                    value={averageScore}
                    circleRatio={0.75}
                    initialAnimation={true}
                    styles={buildStyles({
                      pathColor: '#5199ad',
                      rotation: 1 / 2 + 1 / 8,
                      trailColor: '#eee',
                    })}
                  >
                    <div className="flex flex-col items-center justify-center text-primary">
                      <span className="font-semibold text-4xl">
                        {averageScore}
                      </span>
                      <span className="font-semibold text-sm">
                        Average Score
                      </span>
                    </div>
                  </CustomProgressBar>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex flex-col h-full">
                  <div
                    className="bg-cover self-center w-[150px] h-[150px] bg-center"
                    style={{
                      backgroundImage: "url('" + achievementImg + "')",
                    }}
                  ></div>
                  <div className="flex gap-3 items-center">
                    <span className="text-primary text-2xl">56</span> Topics
                    completed
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        {/* foot */}
        <div className="flex items-center justify-center px-7 w-full h-[50px] bg-white rounded-lg shadow-lg">
          <span>Class Name</span>
        </div>
      </div>
      {/* calendar */}
      <div className="flex flex-col h-[500px] gap-4">
        <Calendar
          colorPrimary="#75b9cc"
          value={selectedDay}
          onChange={setSelectedDay}
          calendarTodayClassName="custom-today-day"
          customDaysClassName={assignmentDays}
          calendarClassName="custom-calendar"
        />
        <div className="w-full  py-4 flex flex-col gap-2 bg-primary rounded-lg shadow-lg">
          <span className="text-white px-5 text-base font-semibold font-inter">
            Deadlines
          </span>
          <div className="flex flex-col py-1 mx-5 pr-2 gap-3 h-[210px] overflow-y-auto">
            {assignments
              .filter(
                (item) =>
                  parseInt(moment(item.dateDue).format('DD')) ===
                  selectedDay?.day,
              )
              .map((item, i) => {
                return (
                  <motion.div
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    layout
                    key={i}
                    className="bg-white w-full px-5 py-3 h-[60px] flex justify-between items-center rounded-lg font-inter font-semibold text-gray-600"
                  >
                    <div className="flex flex-col max-w-[200px] gap-2">
                      <span className="text-sm truncate">
                        {item?.assignmentName}
                      </span>
                      <div className="flex flex-row gap-2 items-center text-xs text-gray-500">
                        <span>
                          {selectedDay.day +
                            '-' +
                            moment(selectedDay?.month.toString()).format('MMM')}
                        </span>
                        <span>
                          Due : {moment(item.dateDue).format('hh:mm A')}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-xs cursor-pointer">View</span>
                    </div>
                  </motion.div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
