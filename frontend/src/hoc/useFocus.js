import { useContext } from 'react';
import FocusContext from './FocusContext'

export const useFocus = () => {
  return useContext(FocusContext);
};
