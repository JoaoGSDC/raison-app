import { gray } from '@/app/getLPTheme';
import { Box } from '@mui/material';
import styled from 'styled-components';

export const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const ImageList = styled.div`
  display: flex;
  overflow-x: auto;
  margin-bottom: 20px;
  max-width: 50%;
`;

export const ImageWrapper = styled.div`
  position: relative;
  margin: 0 10px;
`;

export const Image = styled.img`
  width: 640px;
  height: 180px;
  object-fit: cover;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

export const AddButton = styled.button`
  margin-bottom: 10px;
`;

export const SaveButton = styled.button`
  margin-top: 20px;
`;

export const ThumbnailList = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const ThumbnailWrapper = styled.div`
  position: relative;
  margin: 0 5px;
  cursor: pointer;
`;

export const Thumbnail = styled.img`
  width: 160px;
  height: 45px;
  object-fit: cover;
`;

export const ImageViewer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 360px;
  margin-bottom: 20px;
`;
