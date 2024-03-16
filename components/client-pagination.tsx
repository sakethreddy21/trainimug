"use client"

import { useState} from "react";

import {PaginationSection} from "@/components/paginationsection";
import { HoverEffect } from './ui/card-hover-effect';
interface IntermediateComponentProps {
  data: any;
  }

const ClientPagination = ({data}: IntermediateComponentProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;  
  
 

  
  const currentItems = data ? (data as Array<any>).slice(indexOfFirstItem, indexOfLastItem) : [];
   


  return (
    <>
      <div>
        <HoverEffect items={currentItems} 
        
        className='flex flex-wrap justify-evenly p-2' />
      </div>
      <PaginationSection
        totalPages={data ? Math.ceil((data as Array<any>).length) : 0}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentItems={currentItems}
      />
    </>
  )
}




export default ClientPagination;