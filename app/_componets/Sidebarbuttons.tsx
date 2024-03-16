
import React from 'react'
import { TbHomeDot } from "react-icons/tb";
import Image from 'next/image';
import { LiaImage } from "react-icons/lia";
import { HiOutlineSave } from "react-icons/hi";
import { TbLogout2 } from "react-icons/tb";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
export const Featurebuttons = () => {
  

  const router = useRouter();
  const pathname = usePathname()
  const isActive = (route: string): boolean => {
    return pathname === route;
  };
  return (
    <div className="flex flex-col gap-4 mt-10">
      {/* Four buttons with a gap of 4px */}
      <button className={`flex items-center gap-2 text-white px-4 py-2 rounded-xl ${isActive('/') ? 'bg-blue-500' : ''}`}
      onClick={() => router.push('/')}>
        <TbHomeDot className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          {/* Insert your icon SVG here */}
        </TbHomeDot>
         Home
      </button>
      <button className={`flex items-center gap-2 text-white px-4 py-2 rounded-xl ${isActive('/pictures') ? 'bg-blue-500' : ''}`}
      onClick={() => router.push('/pictures')}>
        <LiaImage className="w-5 h-5 object-contain"   >
          {/* Insert your icon SVG here */}
        </LiaImage>
        Pictures
      </button>
      <button className={`flex items-center gap-2 text-white px-4 py-2 rounded-xl ${isActive('/posts') ? 'bg-blue-500' : ''}`}
      onClick={() => router.push('/posts ')}>
        <LiaImage className="w-5 h-5 object-contain"   >
          {/* Insert your icon SVG here */}
        </LiaImage>
         Posts
      </button>
      <button className={`flex items-center gap-2 text-white px-4 py-2 rounded-xl ${isActive('/saved') ? 'bg-blue-500' : ''}`}
      onClick={() => router.push('/saved')}>
      <HiOutlineSave className="w-5 h-5 object-contain"   >
          {/* Insert your icon SVG here */}
        </HiOutlineSave>
        Saved Items
      </button>
    </div>
  )
}


export const Belowbuttons = () => {
  return(
    <div className="flex flex-col gap-4 mt-10">
      {/* Four buttons with a gap of 4px */}
      <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl">
      <Image src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxLzI3OS1wYWkxNTc5LW5hbS1qb2IxNTI5LnBuZw.png" alt="Logo" width={35} height={35} className='rounded-full'/>
        Manage Profile
      </button>
      <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl">
      <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
       <TbLogout2 />   
        </svg>
         Log Out
      </button>


    </div>
  )
}
