import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./button";

import LikeButton from "./LikeorUnLike";
import SaveorUnSave from "./SaveorUnsave";
interface DataItem {
  id: number;
  userId?: number;
  title: string;
  url?: string;
  thumbnailUrl?: string;
  body?: string;
}
//ussestate of items
interface Props {
  items: DataItem[];
 
  className?: string;
}


export const HoverEffect = ({
  items,
  className,
  
}:Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);// Add type annotation to items
 
  

  
  
   
   

  return (
    <div
      className={cn(
        "flex flex-wrap justify-center  p-2", // Updated classes for centering and padding
        className
      )}
    >


      {items.map((item, idx) => (

        <div
          key={item.id ?? idx}
          className="relative group  block p-2 h-full w-full sm:w-1/3" // Set width for each card for three columns in small screens and above
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0  bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card className="flex flex-wrap justify-evenly   p-2">
            {item.thumbnailUrl ? (
              <Image src={item.thumbnailUrl} alt={item.title} width={300} height={200} />
            ) : (
              <CardBody body={item.body} />
            )}
            <CardTitle>{item.title}</CardTitle>


            <SaveorUnSave itemId={item.id} title={item.title} />
            <LikeButton itemId={item.id} title={item.title}  />
          </Card>
        </div>
      ))}
    </div>
  );
};

const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

const CardBody = ({ body }: { body?: React.ReactNode }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <p className="text-gray-800">{body}</p>
    </div>
  );
};

const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};


export default HoverEffect;
