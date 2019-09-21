import React from 'react';
import styled from 'styled-components';


const CSSElement = styled.div`
    width: 30%;
    border: 2px rgba(0, 0, 0, .8) solid;
    border-radius: 15%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    &:hover{
        background: rgba(197, 253, 174, .5);
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
    }

    

`;

const CSSElementLogo = styled.img`
    width: 100px;
    margin: 5px;
`;

const CSSElementName = styled.div`
    font-size: 16px;
    font-weight: bold;
    margin: 5px;
`;



function ProviderElement({provider, onClick}) {
    return (
            <CSSElement onClick={(e) => onClick({provider})}>
                <CSSElementLogo src={provider.logo}/> 
                <CSSElementName>{provider.name}</CSSElementName>
            </CSSElement>
    );
  }
  
  export default ProviderElement;