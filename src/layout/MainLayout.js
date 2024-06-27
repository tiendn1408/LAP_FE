import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../modules/main/Footer'
import TeacherSidebar from '../modules/main/TeacherSidebar'

const MainLayout = ({ role }) => {
  if (!role) return <Outlet></Outlet>

  return (
    <>
      <TeacherSidebar />
      <div className="pl-60">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  )
}

export default MainLayout
