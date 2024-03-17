"use client"
import React, { useState } from "react";



import { selectAllPosts } from "./reduxservices/Postsstore";
import { selectLikedsSaved } from "./reduxservices/Imagestore";
import { useSelector } from "react-redux";
import { SearchBar } from "./homesearch";
export default function Page() {
  const posts = useSelector(selectAllPosts);
  const pics= useSelector(selectLikedsSaved);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;  
  const postItems = posts ? (posts as Array<any>).slice(indexOfFirstItem, indexOfLastItem) : [];
  const picItems = pics ? (pics as Array<any>).slice(indexOfFirstItem, indexOfLastItem) : []; 
   
  return (
    <div className="h-[43rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center pt-20 antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-4xl md:text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Search For Posts you like and pictures you love
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          In the land of posts and pictures bright,
          Words and images take flight.
          Stories told in bytes and frames,
          In pixels, dreams, and virtual games.
        </p>
        
      </div>
     <SearchBar item1={postItems} item2={picItems} />
    </div>
  );
}
