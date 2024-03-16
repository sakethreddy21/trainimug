import { useSelector } from 'react-redux';
import { isIdLiked } from '../../app/feature/Imagestore';
import { RootState } from '../../app/store';
import { Button } from './button';
import { useDispatch } from 'react-redux';
import { deleteLiked, createLiked, createSaved } from '../../app/feature/Imagestore';
import { selectLikedData } from '../../app/feature/Imagestore';
import { useState } from 'react';

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
    setLikedData(likeddata.filter((item: { id: number; }) => item.id !== id));
    // setLikedData(likeddata.filter((item) => item.id !== id));

  }
  const isLiked = useSelector((state: RootState) => isIdLiked(state, itemId));

  const onLikeClick = (id: number, title: string) => {
    dispatch(createLiked({ id, title, liked: true }));
  }


  return (
    <Button onClick={(e) => isLiked ? onDeleteLikedClick(itemId) : onLikeClick(itemId, title)}>
      {isLiked ? 'Unlike' : 'like'}
    </Button>
  );
};

export default LikeButton;