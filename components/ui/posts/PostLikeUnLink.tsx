import { isIdSaved } from '../../../app/reduxservices/Imagestore';
import { isPostLiked , isPostSaved} from '@/app/reduxservices/Postsstore';
import { RootState } from '../../../app/store';
import { Button } from '../button';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { unLikePost, likePost } from '@/app/reduxservices/Postsstore';
import { selectAllPosts } from '@/app/reduxservices/Postsstore';
import { useState } from 'react';
import heart from '@/public/heart.png';
import notheart from '@/public/whiteheart.jpeg';
import Image from 'next/image';

interface props {
  itemId: number;
  title: string;
}

const PostLikeorUnLike = ({ itemId, title }: props) => {

  const dispatch = useDispatch();
  const likeddata = useSelector(selectAllPosts);
  const [likedData, setLikedData] = useState(likeddata);

  const onDeleteLikedClick = (id: number) => {
    dispatch(unLikePost(id));
    setLikedData(likeddata.filter((item) => item.id !== id));
  }
  const isLiked = useSelector((state: RootState) => isPostLiked(state, itemId));

  const onLikeClick = (id: number, title: string) => {
    dispatch(likePost({ id, title, liked: true }));
  }

  return (
    <Button onClick={(e) => isLiked ? onDeleteLikedClick(itemId) : onLikeClick(itemId, title)}>
      {isLiked ? 
      <Image src={heart}
      width={30} height={30} alt='image'/>
      
      : <Image src={notheart} className='fill-white ' 
      width={30} height={30} alt='image'/>}
    </Button>
  );

}
export default PostLikeorUnLike;