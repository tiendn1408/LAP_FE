import React from 'react'
import { useNavigate } from 'react-router-dom'

import error404 from '../assets/image/Notfound.jpg'
import Button from '../components/Button'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="h-[100vh] w-[100vw] bg-white flex flex-col gap-5 items-center justify-center">
      <img src={error404} alt="" className="w-[600px] h-[400px]" />
      <span className="text-primary text-4xl">404 Page Not Found</span>
      <Button className="py-5 px-5" onClick={() => navigate('/')}>
        Back to Home page
      </Button>
    </div>
  )
}

export default NotFound
