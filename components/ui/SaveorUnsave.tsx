import { useSelector } from 'react-redux';
import { isIdLiked } from '../../app/feature/Imagestore';
import { RootState } from '../../app/store';
import { Button } from './button';

interface props {
  itemId: number;
  title:string
  onLikeClick?: (id: number, title:string) => void;
  onDeleteLikedClick: (id: number) => void;
}



const LikeButton =({ itemId,title, onDeleteLikedClick,onLikeClick }:props) => {

  const handleDeleteClick = (id: number) => {
    onDeleteLikedClick(id);
    };
  const isLiked = useSelector((state: RootState) => isIdLiked(state, itemId));

  const handleLikeClick = (id: number, title: string) => {
    if (onLikeClick) {
      onLikeClick(id, title);
    }
  }

  return (
    <Button onClick={(e) => isLiked ? handleDeleteClick(itemId) : handleLikeClick(itemId, title)}>
      {isLiked ? 'Unlike' : 'like'}
    </Button>
  );
};

export default LikeButton;