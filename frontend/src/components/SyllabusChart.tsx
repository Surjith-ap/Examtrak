'use client';

import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { syllabusData } from '../data/syllabusData';
import { SectionData, SubTopic } from '../types/syllabus';

ChartJS.register(ArcElement, Tooltip, Legend);

function countTopics(topics: (string | SubTopic)[]): number {
  return topics.reduce((acc, topic) => {
    return acc + (typeof topic === 'string' ? 1 : topic.sub.length);
  }, 0);
}

export default function SyllabusChart() {
  const data = {
    labels: Object.values(syllabusData).map(s => s.title),
    datasets: [{
      label: 'Number of Topics',
      data: Object.values(syllabusData).map(s => countTopics(s.topics)),
      backgroundColor: ['#A26734', '#C99E78', '#E6CBAA', '#8F5734', '#B58D67'],
      borderColor: '#FDFBF7',
      borderWidth: 4,
      hoverOffset: 8
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#3D352E',
          font: {
            family: "'Inter', sans-serif"
          }
        }
      },
      tooltip: {
        backgroundColor: '#3D352E',
        titleFont: {
          weight: 'bold' as const
        },
        bodyFont: {
          family: "'Inter', sans-serif"
        },
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed;
            }
            return label;
          }
        }
      }
    },
    cutout: '60%'
  };

  return (
    <section id="overview" className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-warm-brown tracking-tight">Syllabus Overview</h2>
        <p className="mt-2 max-w-2xl mx-auto text-lg text-warm-text-light">
          This interactive syllabus helps you track your preparation for the Technician Grade I Signal exam.
          The chart below shows the distribution of topics across different sections.
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-warm-border">
        <h3 className="text-xl font-semibold text-center mb-4 text-warm-text">Topic Distribution</h3>
        <div className="chart-container">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </section>
  );
}
