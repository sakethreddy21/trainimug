import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Button } from '../button';
import { unSavePost, savePost, isPostSaved , selectSavedPosts} from '@/app/reduxservices/Postsstore';
import { useState } from 'react';
import unsave from "@/public/iconsblue.png"
import save from "@/public/savewhite.svg"
import Image from 'next/image';


interface props {
  itemId: number;
  title: string;
}

const PostSaveUnSave = ({ itemId, title }: props) => {

  const dispatch = useDispatch();
  const saveddata = useSelector(selectSavedPosts);
  const [savedData, setSavedData] = useState(saveddata);

  const onDeleteSavedClick = (id: number) => {
    dispatch(unSavePost(id));
    setSavedData(saveddata.filter((item) => item.id !== id));
  }
  const isSaved = useSelector((state: RootState) => isPostSaved(state, itemId));

  const onSaveClick = (id: number, title: string) => {
    dispatch(savePost({ id, title, saved: true }));
  }

  return (
    <Button onClick={(e) => isSaved ? onDeleteSavedClick(itemId) : onSaveClick(itemId, title)}>
      {isSaved ? <Image src={unsave}
      width={30} height={30} alt='image'/>
      
      : <Image src={save} className='fill-white ' 
      width={30} height={30} alt='image'/>}
    </Button>
  );

}
export default PostSaveUnSave;