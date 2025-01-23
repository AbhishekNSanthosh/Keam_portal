import React from 'react'

export default function AdminHeader() {
  return (
    <div className='flex w-[82vw] px-[2vw] py-[1rem] h-[13vh] fixed bg-white ml-[18vw] z-10'>
        <div className="flex-1 items-center flex">
            Welcome, Abhishek Santhosh
        </div>
        <div className="flex-1 flex items-center justify-end">
            Profile
        </div>
    </div>
  )
}
