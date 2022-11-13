import React, {createContext} from 'react';

interface Props {
  children?: React.ReactElement;
}

export const Context = createContext({
  organizationName: '',
  repositoryName: '',
});

export const RootProvider = ({children}: Props) => {
  return (
    <Context.Provider
      value={{
        organizationName: 'Angular',
        repositoryName: 'Angular-cli',
      }}>
      {children}
    </Context.Provider>
  );
};
