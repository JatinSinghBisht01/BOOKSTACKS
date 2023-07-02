import React, { useEffect, useRef } from 'react';
import {Chart} from "chart.js/auto"

const TopBooksChart = ({ topBooks }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  useEffect(() => {
    if (topBooks && topBooks.length > 0) {
      const labels = topBooks.map((book) => book.bookName);
      const counts = topBooks.map((book) => book.count);
      const chartOptions = {
        responsive: true,
        scales: {
          r: {
            angleLines: {
              display: true,
            },
            ticks: {
              beginAtZero: true,
            },
          },
        },
      };
      

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Book Counts',
            data: counts,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(75, 192, 192)',
              'rgb(255, 205, 86)',
              'rgb(201, 203, 207)',
              'rgb(54, 162, 235)'
            ], // Customize the color as needed
          },
        ],
      };
      
      if (chartInstanceRef.current) {
        // Destroy the previous chart instance
        chartInstanceRef.current.destroy();
      }
  
      if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
        chartInstanceRef.current = new Chart(ctx, {
          type: 'polarArea',
          data: chartData,
          options: chartOptions,
        });
      }
    }
    
  }, [topBooks]);

  return (
    <div className='h-fit md:mx-[30%]'>
      <canvas ref={chartRef}>
      </canvas>
    </div>
  );
};

export default TopBooksChart;
