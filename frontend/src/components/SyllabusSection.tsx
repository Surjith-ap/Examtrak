'use client';

import { useState, useEffect } from 'react';
import { SectionData, SubTopic } from '../types/syllabus';

interface SyllabusSectionProps {
  section: SectionData;
}

function countTopics(topics: (string | SubTopic)[]): number {
  return topics.reduce((acc, topic) => {
    return acc + (typeof topic === 'string' ? 1 : topic.sub.length);
  }, 0);
}

export default function SyllabusSection({ section }: SyllabusSectionProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const totalTopics = countTopics(section.topics);

  const handleCheckboxChange = (topicId: string) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(topicId)) {
      newCheckedItems.delete(topicId);
    } else {
      newCheckedItems.add(topicId);
    }
    setCheckedItems(newCheckedItems);
  };

  const checkedCount = checkedItems.size;
  const percentage = totalTopics > 0 ? Math.round((checkedCount / totalTopics) * 100) : 0;

  const renderTopics = () => {
    return section.topics.map((topic, index) => {
      const topicId = `${section.id}-topic-${index}`;
      
      if (typeof topic === 'string') {
        return (
          <li key={topicId} className="flex items-center">
            <input
              type="checkbox"
              id={topicId}
              checked={checkedItems.has(topicId)}
              onChange={() => handleCheckboxChange(topicId)}
              className="h-4 w-4 rounded border-gray-300 text-warm-brown focus:ring-warm-brown"
            />
            <label htmlFor={topicId} className="ml-3 text-sm text-warm-text">
              {topic}
            </label>
          </li>
        );
      } else {
        return (
          <li key={topicId}>
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-warm-bg-light">
                <span className="font-semibold text-sm text-warm-text">{topic.name}</span>
                <span className="arrow transition-transform duration-200">▶</span>
              </summary>
              <ul className="pl-6 pt-2 space-y-3">
                {topic.sub.map((subTopic, subIndex) => {
                  const subTopicId = `${topicId}-${subIndex}`;
                  return (
                    <li key={subTopicId} className="flex items-center">
                      <input
                        type="checkbox"
                        id={subTopicId}
                        checked={checkedItems.has(subTopicId)}
                        onChange={() => handleCheckboxChange(subTopicId)}
                        className="h-4 w-4 rounded border-gray-300 text-warm-brown focus:ring-warm-brown"
                      />
                      <label htmlFor={subTopicId} className="ml-3 text-sm text-warm-text-light">
                        {subTopic}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </details>
          </li>
        );
      }
    });
  };

  return (
    <section id={section.id} className="scroll-mt-20 bg-white rounded-2xl shadow-sm p-6 border border-warm-border">
      <h3 className="text-2xl font-bold flex items-center">
        <span className="text-3xl mr-3">{section.icon}</span> 
        {section.title}
      </h3>
      <p className="mt-1 text-warm-text-light">{section.description}</p>
      
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold inline-block text-warm-brown">Progress</span>
          <span className="text-xs font-semibold inline-block text-warm-brown">
            {percentage}% ({checkedCount}/{totalTopics})
          </span>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-warm-bg-lighter">
          <div 
            style={{ width: `${percentage}%` }} 
            className="progress-bar-fill shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-warm-brown"
          />
        </div>
      </div>
      
      <ul className="space-y-3 mt-4">
        {renderTopics()}
      </ul>
    </section>
  );
}
