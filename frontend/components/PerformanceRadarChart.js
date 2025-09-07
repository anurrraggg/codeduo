'use client';
import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';

// Register radar chart components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

const PerformanceRadarChart = ({ user }) => {
  // Fall back to zeros if user is not loaded yet
  const chartData = {
    labels: [
      'Accuracy',
      'Speed',
      'Consistency',
      'Problem-Solving',
      'Knowledge',
      'Endurance',
      'Improvement Rate',
    ],
    datasets: [
      {
        label: 'Your Skill Profile',
        data: [
          user?.Accuracy || 0,
          user?.Speed || 0,
          user?.Consistency || 0,
          user?.ProblemSolving || 0,
          user?.KnowledgeBreadth || 0,
          user?.Endurance || 0,
          user?.Improvement_Rate || 0,
        ],
        backgroundColor: 'rgba(139, 92, 246, 0.2)', // Purple with transparency
        borderColor: 'rgba(139, 92, 246, 1)', // Solid purple
        borderWidth: 2,
        pointBackgroundColor: 'rgba(139, 92, 246, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(139, 92, 246, 1)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: 'rgba(196, 181, 253, 0.5)', // Light purple lines
        },
        grid: {
          color: 'rgba(196, 181, 253, 0.5)',
        },
        pointLabels: {
          font: {
            size: 12,
            weight: '500',
          },
          color: '#4b5563', // Gray text
        },
        ticks: {
          backdropColor: 'transparent',
          color: 'transparent', // Hide tick labels
        },
        min: 0,
        max: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Radar data={chartData} options={chartOptions} />;
};

export default PerformanceRadarChart;
