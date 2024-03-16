"use client"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useEffect, useState } from "react";
export function PaginationSection({
  totalPages,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  currentItems
}: {
  totalPages: number,
  itemsPerPage: number,
  currentPage: number,
  setCurrentPage: Function,
  currentItems: Array<any> // Provide a type argument for the Array type
}) {
  const [pagesToShow, setPagesToShow] = useState(5);

  useEffect(() => {
    // Redirect to page 1 if there are no items to show
    if (currentItems.length <20 ) {
      setPagesToShow(1);
    }
  }, [currentItems]);
  
  
   // Number of pages to show in the pagination bar
  const totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  const indexOfCurrentPage = currentPage - 1;

  const startIndex = Math.max(0, indexOfCurrentPage - Math.floor(pagesToShow / 2));
  const endIndex = Math.min(totalPagesArray.length - 1, startIndex + pagesToShow - 1);
  const visiblePages = totalPagesArray.slice(startIndex, endIndex + 1);
  

  useEffect(() => {
    // Redirect to page 1 if there are no items to show
    if (currentItems.length === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [currentItems, currentPage, setCurrentPage]);


  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevValue: any) => prevValue - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevValue: any) => prevValue + 1);
    }
    else {
      // If current page is equal to total pages or exceeds, reset current page to 1 if currentItems is empty
      if (currentItems.length === 0) {
        setCurrentPage(1);
      }
    }
    
  };
  
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className="hover:cursor-pointer" onClick={() => handlePrevPage()} />
        </PaginationItem>

        {visiblePages.map((page, idx) => (
          <PaginationItem key={idx} className={currentPage === page ? "bg-gray-100 rounded-md" : ""}>
            <PaginationLink className={` ${currentPage === page ? 'text-black hover:text-black' : ''} hover:cursor-pointer `} onClick={() => setCurrentPage(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext className="hover:cursor-pointer" onClick={() => handleNextPage()} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}