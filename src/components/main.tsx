import { Menu } from '@/layout/menu'
import React, { useState } from 'react'

import { useThemeContext } from '../context/contextProvider'
import ChatCard from './chat/chat';

const users = [
  {
    name: "Olivia Martin",
    id: 31,
    email: "m@example.com",
    avatar: "/avatars/01.png",
  },
  {
    name: "Isabella Nguyen",
    id: 32,
    email: "isabella.nguyen@email.com",
    avatar: "/avatars/03.png",
  },
  {
    name: "Emma Wilson",
    id: 38,
    email: "emma@example.com",
    avatar: "/avatars/05.png",
  },
  {
    name: "Jackson Lee",
    id: 3,
    email: "lee@example.com",
    avatar: "/avatars/02.png",
  },
  {
    name: "William Kim",
    id: 2,
    email: "will@email.com",
    avatar: "/avatars/04.png",
  },
]

const Main = () => {
  const [activeUsers, setActiveUsers] = useState(users)


  const { chatTo, setChatTo} = useThemeContext();
  

 const handleChat = (item)=>{
  setChatTo(item)

 }


  return (
    <>
    <div className='w-1/3 flex flex-col h-full'>
      <div className='menuheader h-[5vh] m-4 text-3xl'>
      <Menu/>
      </div>
      <div className='MenuContent  h-[96vh] overflow-y-auto  grid grid-cols-1'>
      {
        activeUsers.map((item)=>(

            <div onClick={()=> handleChat(item)} className='h-[10vh]  flex flex-row w-full border bg-slate-600'>
            <img height={50} width={50} src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'/>

            <div className='m-2'>
                <h1>{item.name}</h1>
                <p>{item.email}</p>
            </div>
              <div className='ml-auto m-4'>

                
              </div>

                </div>
        ))
      }
      
      </div>
    </div>
    {chatTo?

      <ChatCard/>
      :  <div className=' h-screen flex items-center justify-center text-center w-2/3 text-2xl font-bold  '>new chat</div>
    }
      </>
  )
}

export default Main
