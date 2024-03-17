"use client";
import axios from "axios";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {useDispatch, useSelector } from "react-redux";
import { selectLikedsSaved, deleteLiked, createLiked } from "../../reduxservices/Imagestore";


import ClientPagination from "@/components/client-pagination";
import { SetStateAction, useEffect, useState } from "react"

interface DataItem {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  
}
interface LikedSavedItem {
  id: number;
  title: string;
  liked?: boolean;
  saved?: boolean;
}



const page=()=> {
  const dispatch = useDispatch();

  const [wholeLikedSavedData, setwholeLikedSavedData] = useState<LikedSavedItem[]>([]); // Initialize wholeLikedSavedData as an empty array 
  const [apiData, setApiData] = useState<DataItem>();
  const apiUrl = 'https://jsonplaceholder.typicode.com/photos';
  
  const LikedSavedData = useSelector(selectLikedsSaved);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
          setApiData(response.data);
        } else {
          console.error('Failed to fetch patient data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error during patient data fetching:', error);
      }
    };

    fetchData();
  }, []);


  

  // Fix: Update the type of wholeLikedSavedData and initialize it as an empty array

  

  //now we have find the subset of LikedSavedData from apiData
  
useEffect(() => {
    const  filteredData =  Array.isArray(apiData) ? apiData.filter((apItem: DataItem) => {
      return LikedSavedData.some(likedItem => likedItem.id === apItem.id && likedItem.liked);
    })
     : [];
  setwholeLikedSavedData(filteredData);

  }, [apiData, LikedSavedData]);

  
  const [activeTab, setActiveTab] = useState('pictures');

  const openTab = (tabName: SetStateAction<string>) => {
    setActiveTab(tabName);
  };
  //create a function to save the liked data
  
  return (
    <div className="flex justify-center items-center w-[1200px] ml-20">
    <Tabs defaultValue="pictures" className="flex flex-col items-center justify-center ">
      <TabsList className="grid w-full grid-cols-2">
        
      
        <TabsTrigger className="w-230" value="pictures"
        ><div onClick={()=>openTab('pictures')} className={`flex justify-center items-center w-full h-10 ml-64 rounded-xl ${
        activeTab === "pictures" ?  'bg-white text-black':'bg-black text-white'
      }`} >Posts </div></TabsTrigger>
     

<TabsTrigger value="liked_pictures" ><div onClick={()=>openTab('liked_pictures')} className={`w-full h-10 flex justify-center items-center ml-5 rounded-xl ${activeTab === "liked_pictures" ?  'bg-white text-black':'bg-black text-white'
      }`} >liked_Pictures
      
       </div></TabsTrigger>
      
     
      </TabsList>
      <TabsContent value="pictures">
                <Card>
                  <CardHeader>
                    
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                    <div className="flex flex-col items-center justify-center ">
              <span className="text-4xl font-bold mb-6">Photos</span>
              <ClientPagination data={apiData} />
            </div>
                    </div>
                    
                  </CardContent>
                </Card>
      </TabsContent>
      <TabsContent value="liked_pictures">
            <Card>
              <CardHeader>
               
              </CardHeader>
              <CardContent className="space-y-2">
              <div className="space-y-1">
                <div className="flex flex-col items-center justify-center ">
          <span className="text-4xl font-bold mb-6">liked photos</span>

         {wholeLikedSavedData.length === 0 ? 
         <span className="text-4xl font-bold mb-6">No liked photos</span> : <ClientPagination data={wholeLikedSavedData} />}
          
        </div>
                </div>
              </CardContent>
            </Card>
      </TabsContent>
    </Tabs>
    </div>
  )
 
}
export default page