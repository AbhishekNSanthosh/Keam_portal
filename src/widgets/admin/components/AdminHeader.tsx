import React from 'react'

export default function AdminHeader() {
  return (
    <div className='h-[12vh] flex flex-row w-full px-[2vw]'>
        <div className="flex-1 items-center flex">
            Welcome, Abhishek Santhosh
        </div>
        <div className="flex-1 flex items-center justify-end">
            Profile
        </div>
    </div>
  )
}
