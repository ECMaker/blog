import type { ReactNode } from 'react';

import { createContext, useContext, useState } from 'react';

type TableOfContentsContextType = {
  showTableOfContents: boolean;
  setShowTableOfContents: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TableOfContentsContext = createContext<TableOfContentsContextType | undefined>(undefined);

export const useTableOfContentsContext = () => {
  const context = useContext(TableOfContentsContext);
  if (!context) {
    throw new Error('useTableOfContentsContext must be used within a TableOfContentsProvider');
  }

  return context;
};

type TableOfContentsProviderProps = {
  children: ReactNode;
};

export const TableOfContentsProvider: React.FC<TableOfContentsProviderProps> = ({ children }) => {
  const [showTableOfContents, setShowTableOfContents] = useState(false);

  return (
    <TableOfContentsContext.Provider value={{ showTableOfContents, setShowTableOfContents }}>
      {children}
    </TableOfContentsContext.Provider>
  );
};