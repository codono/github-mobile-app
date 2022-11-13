import React, {createContext} from 'react';

interface Props {
  children?: React.ReactElement;
}

function RootProvider({children}: Props): React.ReactElement {
  const Context = createContext({
    organizationName: '',
    repositoryName: '',
  });

  return (
    <Context.Provider
      value={{
        organizationName: 'Angular',
        repositoryName: 'Angular-cli',
      }}>
      {children}
    </Context.Provider>
  );
}

export default RootProvider;
