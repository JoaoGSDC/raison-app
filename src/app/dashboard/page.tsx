'use client';

import React, { useState } from 'react';
import { Body, HeaderContainer, PageContainer, SaveButton } from './styles';
import { Card } from '@mui/material';
import { gray } from '../getLPTheme';
import BarChart from './components/BarChart';

const style = (theme: any) => {
  return {
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: 'none',
    boxShadow:
      theme.palette.mode === 'light' ? `0 8px 12px hsla(210, 98%, 42%, 0.2)` : `0 8px 12px hsla(0, 0%, 0%, 0.8)`,
    background: theme.palette.mode === 'light' ? gray[100] : gray[800],
    flex: 1,
  };
};

const Dashboard = () => {
  const [images, setImages] = useState([]);

  const saveImages = () => {
    console.log('Saved images:', images);
    alert('Images saved!');
  };

  return (
    <PageContainer>
      <h1>Dashboard</h1>

      <HeaderContainer>
        <Card sx={style}>
          <h3>Serviço</h3>
          <h1>4.5</h1>
        </Card>

        <Card sx={style}>
          <h3>Comida</h3>
          <h1>4.5</h1>
        </Card>

        <Card sx={style}>
          <h3>Limpeza</h3>
          <h1>4.5</h1>
        </Card>

        <Card sx={style}>
          <h3>Ambiente</h3>
          <h1>4.5</h1>
        </Card>

        <Card sx={style}>
          <h3>Crianças</h3>
          <h1>4.5</h1>
        </Card>
      </HeaderContainer>

      <Body>
        <Card sx={style}>
          <BarChart
            labels={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
            data={[4, 5, 4, 3, 5, 4]}
          />
        </Card>
      </Body>
    </PageContainer>
  );
};

export default Dashboard;
