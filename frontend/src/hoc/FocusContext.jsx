import { createContext, useRef } from 'react';
import PropTypes from 'prop-types';
// Создаём контекст
const FocusContext = createContext(null);

// Компонент-провайдер, оборачивающий приложение
export const FocusProvider = ({ children }) => {
  const inputRef = useRef(null); // 👈 Общий ref

  return (
    <FocusContext.Provider value={inputRef}>{children}</FocusContext.Provider>
  );
};
FocusProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FocusContext;
