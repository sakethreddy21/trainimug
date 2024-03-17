import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {cn} from '@/lib/utils';


import LikeButton from '../components/ui/pictures/LikeorUnLike'
import SaveorUnSave from '../components/ui/pictures/SaveorUnsave'
import PicLikeorUnLike from '../components/ui/posts/PostLikeUnLink'
import PostSaveUnSave from '../components/ui/posts/PostSaveUnSave'

interface DataItem {
  id: number;
  userId?: number;
  title: string;
  url?: string;
  thumbnailUrl?: string;
  body?: string;
}

interface Props {
  item1: DataItem[];
  item2: DataItem[];
  className?: string;
}


export const SearchBar = ({ item1,item2, className }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); // State to hold the search query
  const allItems = [...(item1 || []), ...(item2 || [])];

  // Filter items based on the search query
  const filteredItems = allItems.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => {
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
  
  const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => {
    return <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>{children}</h4>;
  };

  let renderedItems = null;

  // If search query is empty, show nothing
  if (searchQuery.trim() === '') {
    renderedItems = null;
  } else if (filteredItems.length === 0) {
    // If there are no search results, show nothing
    renderedItems = null;
  } else {
    // If there are search results, show only the top 3
    renderedItems = filteredItems.slice(0, 2).map((item, idx) => (
      <div
        key={item.id ?? idx}
        className="relative group block p-2 h-full w-full sm:w-1/3"
        onMouseEnter={() => setHoveredIndex(idx)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <AnimatePresence>
          {hoveredIndex === idx && (
            <motion.span
              className="absolute inset-0 bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
              layoutId="hoverBackground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.15 } }}
              exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
            />
          )}
        </AnimatePresence>
        <Card className="flex flex-wrap justify-evenly p-2">
          {item.thumbnailUrl ? (
            <Image src={item.thumbnailUrl} alt={item.title} width={300} height={200} />
          ) : (
            <CardBody body={item.body} />
          )}
          <CardTitle>{item.title}</CardTitle>
          {item.body ? (
            <>
              <PicLikeorUnLike itemId={item.id} title={item.title} />
              <PostSaveUnSave itemId={item.id} title={item.title} />
            </>
          ) : (
            <>
              <SaveorUnSave itemId={item.id} title={item.title} />
              <LikeButton itemId={item.id} title={item.title} />
            </>
          )}
        </Card>
      </div>
    ));
  }
 
  
  return (
    <div className={cn("flex flex-col", className)}>
      <input
        type="text"

        placeholder="Search by title for saved and liked items..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="px-4 py-2 border border-gray-300  mb-4 text-black fixed top-[38%] left-[47%] bg-white z-50 w-[300px] rounded-3xl" 
      />
      <div className="flex flex-wrap justify-center p-2 mt-20">
        {renderedItems}
      </div>
    </div>
  );
};
