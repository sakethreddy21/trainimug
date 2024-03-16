"use client"
import React from 'react'
import { sidebarLinks } from "@/constants";
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';
import Image from "next/image";
import { Featurebuttons, Belowbuttons } from "./Sidebarbuttons";

const Sidebar = () => {


  
 
  return (
        <div className="h-screen w-full bg-black text-white flex flex-col items-center">

          <div className='logo flex flex-row justify-center items-center mt-4'> 
          <Image src="https://media.licdn.com/dms/image/C4D03AQHLGT8P7mALQw/profile-displayphoto-shrink_800_800/0/1517582884639?e=2147483647&v=beta&t=tlzhm-5HRwX7w78KJQy4G3bM73JAHWaJQoYSOAm_kzg" alt="Logo" width={30} height={30} className='pr-4'/>
          Training mug</div>

          <Image src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxLzI3OS1wYWkxNTc5LW5hbS1qb2IxNTI5LnBuZw.png" alt="Logo" width={50} height={50} className='mx-auto mt-9  rounded-full'/>
                
    <Separator className='my-4 mt-8 bg-white w-[80%] '/>


    <Featurebuttons/>
    <Separator className='my-4 mt-14 bg-white w-[80%] '/>

<Belowbuttons/>
        </div>
  )
}

export default Sidebar