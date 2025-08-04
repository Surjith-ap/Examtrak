'use client';

import { useState, useEffect } from 'react';
import { SectionData, SubTopic } from '../types/syllabus';
import { useProgressTracker } from '@/hooks/useProgressTracker';
import { useToast } from './Toast';

interface SyllabusSectionProps {
  section: SectionData;
}

function countTopics(topics: (string | SubTopic)[]): number {
  return topics.reduce((acc, topic) => {
    return acc + (typeof topic === 'string' ? 1 : topic.sub.length);
  }, 0);
}

function getAllTopicIds(section: SectionData): string[] {
  const ids: string[] = [];
  
  section.topics.forEach((topic, index) => {
    const topicId = `${section.id}-topic-${index}`;
    
    if (typeof topic === 'string') {
      ids.push(topicId);
    } else {
      topic.sub.forEach((_, subIndex) => {
        const subTopicId = `${topicId}-${subIndex}`;
        ids.push(subTopicId);
      });
    }
  });
  
  return ids;
}

export default function SyllabusSection({ section }: SyllabusSectionProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const { 
    updateProgress, 
    getTopicProgress, 
    isUserLoggedIn,
    completeTopicHandler 
  } = useProgressTracker();
  
  const totalTopics = countTopics(section.topics);
  const allTopicIds = getAllTopicIds(section);

  // Load saved progress when component mounts
  useEffect(() => {
    if (isUserLoggedIn) {
      const savedProgress = getTopicProgress(section.id);
      if (savedProgress && savedProgress.completed_items) {
        const savedItems = new Set(savedProgress.completed_items);
        setCheckedItems(savedItems);
      }
    }
  }, [section.id, isUserLoggedIn, getTopicProgress]);

  const handleCheckboxChange = async (topicId: string) => {
    // Optimistic update - update UI immediately
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(topicId)) {
      newCheckedItems.delete(topicId);
    } else {
      newCheckedItems.add(topicId);
    }
    setCheckedItems(newCheckedItems);

    // Save to database if user is logged in
    if (isUserLoggedIn) {
      setIsLoading(true);
      try {
        const completedItemsArray = Array.from(newCheckedItems);
        const newCheckedCount = completedItemsArray.length;
        const newPercentage = totalTopics > 0 ? Math.round((newCheckedCount / totalTopics) * 100) : 0;
        
        const success = await updateProgress(
          section.id, 
          section.title, 
          newPercentage,
          completedItemsArray
        );
        
        if (success) {
          // Show success notification
          if (newPercentage >= 100 && checkedCount < totalTopics) {
            showToast(`🎉 ${section.title} completed!`, 'success');
          } else {
            showToast(`Progress saved: ${newPercentage}%`, 'success');
          }
          
          // If section is completed, mark it as completed
          if (newPercentage >= 100) {
            await completeTopicHandler(section.id, section.title);
          }
        } else {
          // Revert optimistic update on failure
          setCheckedItems(checkedItems);
          showToast('Failed to save progress. Please try again.', 'error');
        }
      } catch (error) {
        // Revert optimistic update on error
        setCheckedItems(checkedItems);
        showToast('Error saving progress. Please check your connection.', 'error');
      } finally {
        setIsLoading(false);
      }
    }
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
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold flex items-center">
          <span className="text-3xl mr-3">{section.icon}</span> 
          {section.title}
        </h3>
        {isLoading && (
          <div className="flex items-center text-amber-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600 mr-2"></div>
            <span className="text-sm">Saving...</span>
          </div>
        )}
        {isUserLoggedIn && !isLoading && (
          <div className="flex items-center text-green-600">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Synced</span>
          </div>
        )}
      </div>
      
      <p className="mt-1 text-warm-text-light mb-4">{section.description}</p>
      
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-warm-brown">Progress</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-warm-brown">
              {percentage}% ({checkedCount}/{totalTopics})
            </span>
            {percentage === 100 && (
              <span className="text-green-600 text-sm">✅ Complete!</span>
            )}
          </div>
        </div>
        <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-lg bg-warm-bg-lighter">
          <div 
            style={{ width: `${percentage}%` }} 
            className={`progress-bar-fill shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ease-out ${
              percentage === 100 ? 'bg-green-500' : 'bg-warm-brown'
            }`}
          />
        </div>
      </div>
      
      <ul className="space-y-3 mt-4">
        {renderTopics()}
      </ul>
      
      {/* Progress indicator for logged in users */}
      {isUserLoggedIn && (
        <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-center text-sm text-amber-700">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Your progress is automatically saved and synced across all devices
          </div>
        </div>
      )}
    </section>
  );
}
