import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import UserProfileAvatarEdit from '../component/UserProfileAvatarEdit'
import { FaUserCircle } from 'react-icons/fa'

const EditUserProfile = () => {
    const user = useSelector(state => state.user)
    const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false)
  return (
    <div>
        <div className='w-20 h-20 bg-red-500 flex item-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
            {
              user.avatar ? (
                <img 
                  alt={user.name} 
                  src={user.avatar}
                  className='w-full h-full'
                  />
              ):(
                <FaUserCircle size={60}/>
              )
            }
        </div>
        <button onClick={()=> setProfileAvatarEdit(true)} className='text-sm min-w-20 border border-primary-100 hover:border-primary-200 hover:bg-primary-200 px-3 py-1 rounded-full mt-3'>Edit</button>
        {
            openProfileAvatarEdit && (
                <UserProfileAvatarEdit close={()=>setProfileAvatarEdit(false)}/>
            )
        }
    </div>
  )
}

export default EditUserProfile