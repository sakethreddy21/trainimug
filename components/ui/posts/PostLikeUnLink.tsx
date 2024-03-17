import { isIdSaved } from '../../../app/reduxservices/Imagestore';
import { isPostLiked , isPostSaved} from '@/app/reduxservices/Postsstore';
import { RootState } from '../../../app/store';
import { Button } from '../button';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { unLikePost, likePost } from '@/app/reduxservices/Postsstore';
import { selectAllPosts } from '@/app/reduxservices/Postsstore';
import { useState } from 'react';

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
      {isLiked ? 'Unlike' : 'like'}
    </Button>
  );

}
export default PostLikeorUnLike;