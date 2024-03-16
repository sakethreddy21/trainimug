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

import ClientPagination from "@/components/client-pagination";
import { useEffect, useState } from "react"

const page=()=> {


  const [patientData, setPatientData] = useState(null);
  const apiUrl = 'https://jsonplaceholder.typicode.com/photos';
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
          setPatientData(response.data);
        } else {
          console.error('Failed to fetch patient data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error during patient data fetching:', error);
      }
    };

    fetchData();
  }, []);

  
  return (
    <div className="flex justify-center items-center w-[1200px] ml-20">
    <Tabs defaultValue="pictures" className="flex flex-col items-center justify-center ">
      <TabsList className="grid w-full grid-cols-2">
        
        <TabsTrigger value="pictures">pictures</TabsTrigger>
        <TabsTrigger value="liked_pictures">liked_pictures</TabsTrigger>
      </TabsList>
      <TabsContent value="pictures">
        <Card>
          <CardHeader>
            
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
            <div className="flex flex-col items-center justify-center ">
      <span className="text-4xl font-bold mb-6">Photos</span>
      <ClientPagination data={patientData}/>
    </div>
            </div>
            
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="liked_pictures">
        <Card>
          <CardHeader>
            <CardTitle>liked_pictures</CardTitle>
            <CardDescription>
              Change your liked_pictures here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current liked_pictures</Label>
              <Input id="current" type="liked_pictures" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New liked_pictures</Label>
              <Input id="new" type="liked_pictures" />
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