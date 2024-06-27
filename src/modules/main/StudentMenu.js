import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

const StudentSidebar = () => {
  const accessToken = localStorage.getItem('access_token')
  const decodedToken = accessToken && jwtDecode(accessToken)
  const classId = decodedToken && decodedToken.classId

  const [isOpenNoti, setIsOpenNoti] = useState(false)

  let mock = [
    {
      type: 'Accepted',
      message:
        'Topic abc unlock request accepted asdasdasdasdsadsddasdasdsadasdasdasdasdasdasdasdasdasdasdsaasdadasds',
      time: '25 April 2001',
    },
    {
      type: 'Denied',
      message: 'Topic def unlock request denied',
      time: '25 April 2001',
    },
    {
      type: 'Accepted',
      message: 'Topic cas unlock request accepted',
      time: '25 April 2001',
    },
    {
      type: 'Denied',
      message: 'Topic dasd unlock request denied',
      time: '25 April 2001',
    },
  ]

  return (
    <div className="flex flex-col gap-3">
      <NavLink
        to={'/dashboard'}
        className={({ isActive }) =>
          isActive
            ? 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all  text-gray-600 bg-[#e5ebee]'
            : 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all hover:bg-gray-100 text-gray-600'
        }
      >
        <i className="fas fa-home text-xl pb-1"></i>
        <span className="font-semibold text-sm">Dashboard</span>
      </NavLink>
      <NavLink
        to={`/class/${classId}`}
        className={({ isActive }) =>
          isActive
            ? 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all  text-gray-600 bg-[#e5ebee]'
            : 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all hover:bg-gray-100  text-gray-600'
        }
      >
        <i className="far fa-bookmark text-xl mb-1 ml-1"></i>
        <span className="font-semibold ml-1 text-sm">Class</span>
      </NavLink>

      <div className="relative">
        <div
          onClick={() => setIsOpenNoti(!isOpenNoti)}
          className={
            isOpenNoti
              ? 'flex flex-row relative items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all select-none  text-gray-600 bg-[#e5ebee]'
              : 'flex flex-row relative items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all select-none hover:bg-gray-100  text-gray-600'
          }
        >
          <i className="fa-regular fa-bell text-xl"></i>
          <span className="font-semibold ml-1 text-sm">Notification</span>
          <div className="absolute bg-red-500 w-[8px] h-[8px] translate-x-3 -translate-y-3 rounded-full"></div>
        </div>
        <div
          className={`${
            isOpenNoti ? `` : `hidden`
          }  absolute bg-white rounded-lg pr-1 pb-2 shadow flex flex-col w-[350px] h-[300px] translate-x-52 -translate-y-11 z-[1000px]`}
        >
          <span className="text-xl text-gray-600 font-[500] px-5 py-3">
            Notifications
          </span>
          <div className="flex flex-col overflow-y-auto">
            {mock.map((val, i) => {
              return <Notification key={i} value={val} />
            })}
          </div>
        </div>
      </div>

      <NavLink
        to={'/profile'}
        className={({ isActive }) =>
          isActive
            ? 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all  text-gray-600 bg-[#f9fbfc]'
            : 'flex flex-row items-center gap-5 cursor-pointer px-8 py-2 rounded-lg transition-all hover:bg-gray-100 text-gray-600'
        }
      >
        <i className="fa-regular fa-user text-xl pb-1 pr-1"></i>
        <span className="font-semibold text-sm">Profile</span>
      </NavLink>
    </div>
  )
}

const Notification = ({ value }) => {
  return (
    <div className="flex flex-row p-3 select-none  hover:bg-gray-100 transition-all gap-4">
      {value.type === 'Accepted' ? (
        <i className="fa-solid fa-square-check text-2xl text-green-400"></i>
      ) : (
        <i className="fa-solid fa-square-xmark text-2xl text-red-400"></i>
      )}
      <div className="flex flex-col gap-2">
        <span className="max-w-[260px] pt-1 text-sm whitespace-normal break-words text-gray-600">
          {value.message}
        </span>
        <span className="text-xs text-gray-400">{value.time}</span>
      </div>
    </div>
  )
}

export default StudentSidebar
