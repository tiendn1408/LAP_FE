import axios from 'axios'
import React, { useState } from 'react'
import { API_URL } from '../../constant'
import createAxiosJWT from '../../createAxiosJWT'

const axiosJWT = createAxiosJWT()
const imgsrc =
  'https://students.flinders.edu.au/_jcr_content/content/section_856874544_co/par_0/image_general.coreimg.png/1621207287287/waving-person.png'

const StudentCard = ({ student, setStudentInfo, onGetStudentOfClass }) => {
  const [openMoreOption, setOpenMoreOption] = useState(false)

  const handleViewStudent = () => {
    setStudentInfo(student)
  }

  const handleRemoveStudent = async (id) => {
    try {
      await axiosJWT.delete(API_URL + `student/${id}/class`)
      onGetStudentOfClass()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="w-full h-[140px] flex flex-row gap-4 bg-white rounded-[16px] items-center shadow-md hover:shadow-lg transition-all select-none px-3 py-3">
      <img src={imgsrc} alt="" className="object-fill h-32 w-36 rounded-lg" />
      <div className="flex flex-col justify-evenly h-full">
        <div className="flex flex-row justify-between items-center">
          <span
            className="font-medium max-w-[380px] truncate cursor-pointer"
            onClick={() => handleViewStudent()}
          >
            {student?.fullName}
          </span>
          <div className="flex flex-col">
            <div
              className={`rounded-full relative h-[24px] w-[24px] cursor-pointer  select-none flex items-center justify-center bg-${
                openMoreOption ? `gray-100` : `white`
              } hover:bg-gray-100`}
              onClick={() => setOpenMoreOption(!openMoreOption)}
            >
              <i className="fas fa-ellipsis-h font-xs"></i>
              {openMoreOption && (
                <div className="absolute translate-y-8 -translate-x-5 border-t-2 text-sm border-primary bg-[#ffffff] flex flex-col divide-y shadow-lg rounded-b">
                  <div
                    className="cursor-pointer px-2 py-1 hover:bg-[#ffffff] transition-all"
                    onClick={() => handleRemoveStudent(student?.id)}
                  >
                    <span>Remove</span>
                  </div>
                  {/* <div className='cursor-pointer px-2 py-1 hover:bg-[#ffffff] transition-all'>
                                        <span>Remove</span>
                                    </div> */}
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="text-xs w-[260px] h-[48px] whitespace-normal break-words line-clamp-3">
          Lorem Ipsum is simply dummy text of the printing and
          typesettingindustry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum
        </p>
        <div className="flex flex-row justify-between items-center pr-1 text-xs">
          <span>
            Average Score :{' '}
            <span className="text-primary">{student?.averageScore}</span>
          </span>
          <span
            className="text-primary cursor-pointer"
            onClick={() => handleViewStudent()}
          >
            View
          </span>
        </div>
      </div>
    </div>
  )
}

export default StudentCard
