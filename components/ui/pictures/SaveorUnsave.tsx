import { useDispatch, useSelector } from 'react-redux';
import { isIdSaved } from '../../../app/reduxservices/Imagestore';
import { RootState } from '../../../app/store';
import { Button } from '../button';
import { deleteSaved, createSaved } from '../../../app/reduxservices/Imagestore';
import { selectSavedData } from '../../../app/reduxservices/Imagestore';
import { useState } from 'react';
import unsave from "@/public/iconsblue.png"
import save from "@/public/savewhite.svg"
import Image from 'next/image';


interface props {
  itemId: number;
  title:string

}



const SaveorUnSave =({ itemId,title}:props) => {
  const saveddata = useSelector(selectSavedData);
  const [savedData, setSavedData] = useState(saveddata);
  const dispatch = useDispatch();

  const onDeleteSavedClick = (id: number) => {
    dispatch(deleteSaved(id));
    setSavedData(saveddata.filter((item) => item.id !== id));
  }
  const isSaved = useSelector((state: RootState) => isIdSaved(state, itemId));
  const onSaveClick = (id: number, title: string) => {
    dispatch(createSaved({ id, title, saved: true }));
  }
  return (
    <div>
      <Button onClick={(e) => isSaved ? onDeleteSavedClick(itemId) : onSaveClick(itemId, title)}>
        {isSaved ? <Image src={unsave}
      width={30} height={30} alt='image'/>
      
      : <Image src={save} className='fill-white ' 
      width={30} height={30} alt='image'/>}
      </Button>
    </div>
  );
};

export default SaveorUnSave;