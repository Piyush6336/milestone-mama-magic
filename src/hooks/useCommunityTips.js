
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'babysteps-community-tips';

export const useCommunityTips = () => {
  const [tips, setTips] = useState([]);

  // Load tips from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTips(parsed);
      } catch (error) {
        console.error('Error loading tips:', error);
        initializeSampleData();
      }
    } else {
      initializeSampleData();
    }
  }, []);

  // Save tips to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tips));
  }, [tips]);

  const initializeSampleData = () => {
    const sampleTips = [
      {
        id: '1',
        content: 'Take your prenatal vitamin with a meal to reduce nausea. I found taking it with dinner worked best for me!',
        author: 'Sarah M.',
        milestoneType: 'started prenatal vitamins',
        likes: 12,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        verified: true
      },
      {
        id: '2',
        content: 'Bring snacks to your first ultrasound appointment - you might be there longer than expected and the excitement can make you hungry!',
        author: 'Mom of 2',
        milestoneType: 'first ultrasound',
        likes: 8,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        verified: false
      },
      {
        id: '3',
        content: 'Ask for extra ultrasound photos! Most places are happy to print a few more for you to share with family.',
        author: 'Jessica L.',
        milestoneType: 'first ultrasound',
        likes: 15,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        verified: true
      },
      {
        id: '4',
        content: 'Write down questions before your appointment - pregnancy brain is real and you might forget what you wanted to ask!',
        author: 'NewMama',
        milestoneType: 'first prenatal appointment',
        likes: 20,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        verified: false
      },
      {
        id: '5',
        content: 'Consider taking a small recording of the heartbeat if your doctor allows it. Its such a special sound to share with your partner!',
        author: 'DadToBe',
        milestoneType: 'heard the heartbeat',
        likes: 18,
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        verified: true
      }
    ];
    setTips(sampleTips);
  };

  const addTip = async (tip) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setTips(prev => [tip, ...prev]);
    
    // In a real app, you would send this to your backend
    console.log('Tip added:', tip);
  };

  const likeTip = async (tipId) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    setTips(prev =>
      prev.map(tip =>
        tip.id === tipId
          ? { ...tip, likes: tip.likes + 1 }
          : tip
      )
    );
  };

  const getTipsByMilestone = (milestoneType) => {
    return tips.filter(tip => tip.milestoneType === milestoneType.toLowerCase());
  };

  const getMostLikedTips = (limit = 5) => {
    return [...tips]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, limit);
  };

  const getRecentTips = (limit = 10) => {
    return [...tips]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  };

  return {
    tips,
    addTip,
    likeTip,
    getTipsByMilestone,
    getMostLikedTips,
    getRecentTips
  };
};
