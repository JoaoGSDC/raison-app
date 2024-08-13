import { useState } from 'react';
import {
  CarouselContainer,
  RemoveButton,
  Image,
  ThumbnailList,
  ThumbnailWrapper,
  Thumbnail,
  ImageViewer,
} from './styles';
import { gray } from '@/app/getLPTheme';

const ImageCarousel = ({ images, setImages }: any) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleAddImage = (event: any) => {
    const file = event.target.files[0];
    if (file && images?.length < 5) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([...images, reader.result] as any);
      };
      reader.readAsDataURL(file);
    } else if (images.length >= 5) {
      alert('O limite de 5 imagens foi atingido.');
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images?.filter((_: any, i: number) => i !== index);
    setImages(newImages);
  };

  return (
    <CarouselContainer>
      <ImageViewer sx={(theme) => ({ backgroundColor: theme.palette.mode === 'light' ? gray[100] : gray[800] })}>
        {images.length > 0 ? (
          <Image src={images[currentImageIndex]} alt={`Imagem ${currentImageIndex + 1}`} />
        ) : (
          <p>Sem imagens</p>
        )}
      </ImageViewer>

      <ThumbnailList>
        {images.map((img: any, index: number) => (
          <ThumbnailWrapper key={index} onClick={() => setCurrentImageIndex(index)}>
            <Thumbnail src={img} alt={`Miniatura ${index + 1}`} />

            <RemoveButton
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage(index);
              }}
            >
              X
            </RemoveButton>
          </ThumbnailWrapper>
        ))}
      </ThumbnailList>

      <input
        type="file"
        accept="image/*"
        onChange={handleAddImage}
        style={{ display: images.length < 5 ? 'block' : 'none' }}
      />
    </CarouselContainer>
  );
};

export default ImageCarousel;
