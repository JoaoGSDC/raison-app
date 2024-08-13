import styled from 'styled-components';
import { brand } from '../getLPTheme';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  row-gap: 8px;

  h1 {
    margin: 0px;
  }

  h3 {
    margin: 0px;
  }
`;

export const SaveButton = styled.button`
  margin-top: 20px;
  height: 40px;
  border-radius: 16px;
  background-color: ${brand[400]};
  color: #ffffff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 16px;
  min-width: 120px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${brand[700]};
  }
`;

export const ImagesContainer = styled.div`
  display: flex;
  width: 500px;
  overflow: auto;
`;
