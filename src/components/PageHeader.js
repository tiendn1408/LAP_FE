import React from 'react'
import { useState } from 'react'

const PageHeader = ({ pageName }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const noti = '11'
  return (
    <div className="w-full py-3 flex bg-white justify-between items-center shadow-sm top-0">
      <span className="font-semibold text-2xl px-10 uppercase">{pageName}</span>
      <div className="flex cursor-pointer px-4 py-2 mr-10">
        <div className="flex items-center justify-center w-11 h-11 gap-2 rounded-full relative hover:text-gray-500 transition-all">
          {noti !== 0 ? (
            <div className="absolute translate-x-3 border-2 border-solid border-white flex pb-[1px] pl-[1px] justify-center items-center -translate-y-3 bg-red-500 w-5 h-5 rounded-full">
              <span className="text-xs font-semibold text-white font-sans">
                {noti <= 9 ? noti : '9+'}
              </span>
            </div>
          ) : (
            ''
          )}
          <i className="far fa-bell text-3xl"></i>
        </div>
      </div>
    </div>
  )
}

export default PageHeader
