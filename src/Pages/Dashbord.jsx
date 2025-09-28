import React from 'react'
import Sidebar from '../Components/Sidebar'
import MainPageComponent from '../Components/MainPageComponent'

const Dashbord = () => {
  return (
   <div className='flex dark:bg-gray-900'>
        <Sidebar/>
        <MainPageComponent/>
      
    </div>
  )
}

export default Dashbord
