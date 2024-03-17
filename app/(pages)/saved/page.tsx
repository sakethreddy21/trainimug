"use client"
import axios from "axios";
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
import ClientPagination from "@/components/client-pagination";

import {selectSavedPosts, unSavePost} from "@/app/reduxservices/Postsstore";
import { selectLikedsSaved ,selectSavedData, deleteSaved} from "@/app/reduxservices/Imagestore";
import { useState, useEffect, SetStateAction } from "react";

interface DataItem {
  
  id: number;
  title: string;
  url?: string;
  thumbnailUrl?: string;
  body?: string;
  
}

interface SavedItem{
  id: number;
  title: string;
  saved?: boolean;
}



const page = () => {
  const [picturesapiData, setPicturesApiData] = useState<DataItem>();
  const apiUrlphotos = 'https://jsonplaceholder.typicode.com/photos';
const [wholepicSavedData, setwholepicSavedData] = useState<SavedItem[]>([]);
const [wholepostSavedData, setwholepostSavedData] = useState<SavedItem[]>([]);
  const [postapidata, setPostApidata] = useState<DataItem>();
  const apiUrlposts = 'https://jsonplaceholder.typicode.com/posts';


  const savedpictures = useSelector(selectSavedData);
  const savedposts = useSelector(selectSavedPosts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrlphotos);
        if (response.status === 200) {
          setPicturesApiData(response.data);
        } else {
          console.error('Failed to fetch patient data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error during patient data fetching:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrlposts);
        if (response.status === 200) {
          setPostApidata(response.data);
        } else {
          console.error('Failed to fetch patient data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error during patient data fetching:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = Array.isArray(picturesapiData) ? picturesapiData.filter((apItem: DataItem) => {
      return savedpictures.some(likedItem => likedItem.id === apItem.id && likedItem.saved);
    }) : [];
    setwholepicSavedData(filteredData);
  }, [picturesapiData, savedpictures]);

  useEffect(() => {
    const filteredData = Array.isArray(postapidata) ? postapidata.filter((apItem: DataItem) => {
      return savedposts.some(likedItem => likedItem.id === apItem.id && likedItem.saved);
    }) : [];
    setwholepostSavedData(filteredData);
  }, [postapidata, savedposts]);
  const [activeTab, setActiveTab] = useState('pictures');

  const openTab = (tabName: SetStateAction<string>) => {
    setActiveTab(tabName);
  };


  return (
    <div className="flex justify-center items-center w-[1200px] ml-20">
    <Tabs defaultValue="pictures" className="flex flex-col items-center justify-center ">
      <TabsList className="grid w-full grid-cols-2">
        
      
        <TabsTrigger className="w-230"  value="pictures"
        ><div onClick={()=>openTab('pictures')} className={`flex justify-center items-center w-full h-10 ml-64 rounded-xl ${
        activeTab === "pictures" ?  'bg-white text-black':'bg-black text-white'
      }`} >Pictures</div></TabsTrigger>
      

<TabsTrigger  value="Posts" className=" flex "><div onClick={()=>openTab('Posts')} className={`w-full h-10 flex justify-center items-center ml-5 rounded-xl ${activeTab === "Posts" ?  'bg-white text-black':'bg-black text-white'
      }`} >Posts
      </div>
      </TabsTrigger>
      
      
      </TabsList>
      <TabsContent value="pictures">
        <Card>
          <CardHeader>
            
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
            <div className="flex flex-col items-center justify-center ">
      <span className="text-4xl font-bold mb-6">Photos</span>
      {wholepicSavedData.length === 0 ? 
         <span className="text-4xl font-bold mb-6">No liked photos</span> : <ClientPagination data={wholepicSavedData} />}
    </div>
            </div>
            
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="Posts">
        <Card>
          <CardHeader>
           
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
            <div className="flex flex-col items-center justify-center ">
              <span className="text-4xl font-bold mb-6">Posts</span>
              {wholepostSavedData.length === 0 ? 
         <span className="text-4xl font-bold mb-6">No liked Posts</span> : <ClientPagination data={wholepostSavedData} />}
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