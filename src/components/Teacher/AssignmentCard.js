import React from 'react'

const AssignmentCard = ({ assignments }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-[100px] w-[250px] rounded-lg flex flex-col text-white shadow-lg">
      <div className="flex flex-row mt-5">
        <div className="flex flex-col w-[60%] ml-4 mr-4 gap-5 truncate">
          <span className="font-semibold cursor-pointer">
            {assignments?.name}
          </span>
          <span className="cursor-pointer">{assignments?.className}</span>
        </div>
        <div className="flex flex-col w-[40%] justify-center items-center cursor-default">
          <span>{assignments?.date}</span>
          <span>{assignments?.time}</span>
        </div>
      </div>
    </div>
  )
}

export default AssignmentCard
