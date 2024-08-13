'use client';

import React, { useState } from 'react';
import { PageContainer, SaveButton } from './styles';
import ImageCarousel from '@/components/ImageCarousel';

const Anuncios = () => {
  const [images, setImages] = useState([]);

  const saveImages = () => {
    console.log('Saved images:', images);
    alert('Images saved!');
  };

  return (
    <PageContainer>
      <h1>Anúncios</h1>
      <h3>Carregue as imagens que deseja que sejam incluídos no perfil do seu estabelecimento</h3>
      <ImageCarousel images={images} setImages={setImages} />

      <SaveButton onClick={saveImages}>Salvar</SaveButton>
    </PageContainer>
  );
};

export default Anuncios;
