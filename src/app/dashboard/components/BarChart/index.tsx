import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ChartContainer } from './styles';
import { brand } from '@/app/getLPTheme';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, labels }: any) => {
  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Média das Avaliações dos Usuários por Mês',
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Média das Avaliações',
        data: data,
        backgroundColor: brand[400],
        borderColor: brand[100],
        borderWidth: 1,
      },
    ],
  };

  return (
    <ChartContainer>
      <Bar options={options} data={chartData} />
    </ChartContainer>
  );
};

export default BarChart;
