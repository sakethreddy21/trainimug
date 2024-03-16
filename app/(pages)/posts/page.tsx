

"use client";
import axios from "axios";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {useDispatch, useSelector } from "react-redux";
import { selectAllPosts } from "@/app/feature/Postsstore";

import ClientPagination from "@/components/client-pagination";
import { useEffect, useState } from "react"


interface DataItem {
  userId: number;
  id: number;
  title: string;
  body: string;
  
}

interface LikedSavedItem {
  id: number;
  title: string;
  liked?: boolean;
  saved?: boolean;
}



const page=()=> {


  const [postapidata, setPostApidata] = useState<DataItem>();
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  const [wholeLikedSavedData, setwholeLikedSavedData] = useState<LikedSavedItem[]>([]);

  const LikedSavedData = useSelector(selectAllPosts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
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
    const filteredData = Array.isArray(postapidata) ? postapidata.filter((apItem: DataItem) => {
      return LikedSavedData.some(likedItem => likedItem.id === apItem.id && likedItem.liked);
    }) : [];
    setwholeLikedSavedData(filteredData);
  }, [postapidata, LikedSavedData]);

  

  
  return (
    <div className="flex justify-center items-center w-[1200px] ml-20">
    <Tabs defaultValue="pictures" className="flex flex-col items-center justify-center ">
      <TabsList className="grid w-full grid-cols-2">
        
        <TabsTrigger value="pictures">Posts</TabsTrigger>
        <TabsTrigger value="liked_pictures">liked_Posts</TabsTrigger>
      </TabsList>
      <TabsContent value="pictures">
        <Card>
          <CardHeader>
            
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
            <div className="flex flex-col items-center justify-center ">
      <span className="text-4xl font-bold mb-6">Posts</span>
      <ClientPagination data={postapidata} />
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
              <span className="text-4xl font-bold mb-6">Photos</span>
              {wholeLikedSavedData.length === 0 ? 
         <span className="text-4xl font-bold mb-6">No liked photos</span> : <ClientPagination data={wholeLikedSavedData} />}
            </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save liked_pictures</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  )
 
}
export default page