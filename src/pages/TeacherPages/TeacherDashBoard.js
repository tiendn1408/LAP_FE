import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import moment from 'moment'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// import 'react-modern-calendar-datepicker/lib/DatePicker.css'
// import { Calendar } from 'react-modern-calendar-datepicker'
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css'
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker'
import { Bar } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'
import ClassCard from '../../components/Teacher/ClassCard'
import { API_URL } from '../../constant'
import createAxiosJWT from '../../createAxiosJWT'

const axiosJWT = createAxiosJWT()

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const TeacherDashBoard = () => {
  moment().locale('en')

  const navigate = useNavigate()
  const [selectedDay, setSelectedDay] = useState(null)
  const [classes, setClasses] = useState([])
  const [assignments, setAssignments] = useState([])
  const [assignmentDays, setAssignmentsDays] = useState([])
  useEffect(() => {
    axiosJWT
      .get(API_URL + `class/teacher`)
      .then((res) => {
        setClasses(res.data)
      })
      .catch((err) => console.log(err))

    axiosJWT
      .get(API_URL + `assignment/teacher`)
      .then((res) => {
        setAssignments(res.data)
        handleDays(res.data)
        console.log(res.data)
      })
      .catch((err) => console.log(err))

    // eslint-disable-next-line
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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: `'top' as const`,
      },
      title: {
        display: 'true',
        text: 'Average Score',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 100,
            },
          },
        ],
      },
    },
  }
  // classes
  const labels = ['MATH_333', 'MATH_33323', 'MATH_113', 'MATH_44', 'MATH_AB32']

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        borderColor: 'rgb(117,185,204)',
        backgroundColor: 'rgb(117,185,204, 0.5)',
      },
    ],
  }

  return (
    <div className="flex flex-col h-[100vh]">
      <div className="flex flex-row w-full divide-solid h-full pt-8">
        <div className="w-[75%] h-[100%] overflow-hidden flex flex-col  items-center">
          <div className="flex justify-center min-w-[92%] bg-white rounded-md shadow-md hover:shadow-lg transition-all">
            <Bar
              responsive="true"
              height={175}
              width={400}
              className="chartJS"
              options={options}
              data={data}
            />
          </div>
          <div className="flex min-w-[90%] mt-10 gap-10 mb-8">
            <div className="flex flex-col gap-5 w-full">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-xl">Classes</span>
                <span
                  className="mr-3 text-sm duration-300 hover:cursor-pointer hover:underline underline-offset-4"
                  onClick={() => {
                    navigate('/class')
                  }}
                >
                  View all
                </span>
              </div>
              <div className="flex flex-row gap-7 w-full">
                {classes &&
                  classes.map((val, index) => {
                    return <ClassCard key={val?.id} classInfo={val} />
                  })}
              </div>
            </div>
          </div>
        </div>
        {/* calendar */}
        <div className="min-w-[30%]">
          <div className="flex items-center justify-center">
            <Calendar
              colorPrimary="#75b9cc"
              value={selectedDay}
              onChange={setSelectedDay}
              calendarClassName="custom-calendar"
              calendarTodayClassName="custom-today-day"
              customDaysClassName={assignmentDays}
              renderFooter={() => (
                <motion.div
                  style={{
                    height: '245px',
                    paddingLeft: '2rem',
                    paddingRight: '2rem',
                  }}
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  layout
                  className="flex flex-col gap-3"
                >
                  <span className="text-base text-gray-600 font-semibold">
                    Upcoming Assignments
                  </span>
                  <div
                    style={{
                      padding: '0.5rem',
                    }}
                    className="flex flex-col gap-4 overflow-y-scroll"
                  >
                    {assignments
                      .filter(
                        (item) =>
                          parseInt(moment(item.dateDue).format('DD')) ===
                          selectedDay?.day,
                      )
                      .map((item, index) => {
                        return (
                          <div key={index} className="flex flex-col gap-4">
                            <div className="shadow-md hover:shadow-lg transition-all rounded-md flex items-center justify-between cursor-pointer">
                              <div
                                style={{
                                  padding: '10px 1rem',
                                }}
                                className="flex flex-col"
                              >
                                <span className="text-primary text-base">
                                  {item.assignmentName}
                                </span>
                                <span>Class</span>
                              </div>
                              <div
                                style={{
                                  paddingRight: '1rem',
                                }}
                                className="flex flex-col justify-center items-center"
                              >
                                <span className="text-sm">
                                  {selectedDay.day +
                                    '-' +
                                    moment(
                                      selectedDay?.month.toString(),
                                    ).format('MMM')}
                                </span>
                                <span className="text-sm">
                                  {moment(item.dateDue).format('hh:mm:ss A')}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </motion.div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashBoard
