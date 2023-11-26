import React, { ReactNode, useEffect } from 'react';
import { useAppDispatch } from '../../app/store';
import { getStorageData } from '../../app/services/storage';
import { setSearchText } from '../../app/slices/searchTextSlice';

interface AuthInitializerProps {
  children?: ReactNode;
}

const StoreInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const text = getStorageData() || '';

      //   if (text) {
      dispatch(setSearchText(text));
      // dispatch(getMTGCards.initiate({name: text, page:'1', pageSize:'3'}));
      //   }
    }
  }, [dispatch]);

  return children;
};

export default StoreInitializer;
