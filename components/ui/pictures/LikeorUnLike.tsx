import { useSelector } from 'react-redux';
import { isIdLiked } from '../../../app/reduxservices/Imagestore';
import { RootState } from '../../../app/store';
import { Button } from '../button';
import { useDispatch } from 'react-redux';
import { deleteLiked, createLiked, createSaved } from '../../../app/reduxservices/Imagestore';
import { selectLikedData } from '../../../app/reduxservices/Imagestore';
import { useState } from 'react';
import heart from '@/public/heart.png';
import notheart from '@/public/whiteheart.jpeg';
import Image from 'next/image';


interface props {
  itemId: number;
  title:string  
}



const LikeButton =({ itemId,title }:props) => {
 const likeddata = useSelector(selectLikedData);
 const [likedData, setLikedData] = useState(likeddata);
  const dispatch = useDispatch();

  const onDeleteLikedClick = (id: number) => {
    dispatch(deleteLiked(id));
    setLikedData(likeddata.filter((item) => item.id !== id));
    // setLikedData(likeddata.filter((item) => item.id !== id));

  }
  const isLiked = useSelector((state: RootState) => isIdLiked(state, itemId));

  const onLikeClick = (id: number, title: string) => {
    dispatch(createLiked({ id, title, liked: true }));
  }


  return (
    <Button onClick={(e) => isLiked ? onDeleteLikedClick(itemId) : onLikeClick(itemId, title)}>
      {isLiked ?<Image src={heart}
      width={30} height={30} alt='image'/>
      
      : <Image src={notheart} className='fill-white ' 
      width={30} height={30} alt='image'/>}
    </Button>
  );
};

export default LikeButton;