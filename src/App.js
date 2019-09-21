import React from 'react';
import ProviderList from '../src/components/providerList';
import styled from 'styled-components';


const CSSWrapper = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
`;


function App() {
  return (
    <CSSWrapper>
      <ProviderList />
    </CSSWrapper>
  );
}

export default App;
