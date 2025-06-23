
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'babysteps-milestones';

export const useMilestones = () => {
  const [milestones, setMilestones] = useState([]);

  // Load milestones from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setMilestones(parsed);
      } catch (error) {
        console.error('Error loading milestones:', error);
        // Initialize with sample data if parsing fails
        initializeSampleData();
      }
    } else {
      // Initialize with sample data for demo
      initializeSampleData();
    }
  }, []);

  // Save milestones to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(milestones));
  }, [milestones]);

  const initializeSampleData = () => {
    const sampleMilestones = [
      {
        id: '1',
        title: 'First prenatal appointment',
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks ago
        notes: 'Everything looks good! Due date confirmed.',
        category: 'medical',
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        title: 'Started prenatal vitamins',
        date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 3 weeks ago
        notes: 'Doctor recommended folic acid supplement',
        category: 'preparation',
        createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        title: 'First ultrasound',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
        notes: 'Amazing to see the baby for the first time! Heart rate looks perfect.',
        category: 'medical',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    setMilestones(sampleMilestones);
  };

  const addMilestone = async (milestone) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setMilestones(prev => [milestone, ...prev]);
    
    // In a real app, you would also send this to your backend
    console.log('Milestone added:', milestone);
  };

  const updateMilestone = async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setMilestones(prev => 
      prev.map(milestone => 
        milestone.id === id 
          ? { ...milestone, ...updates, updatedAt: new Date().toISOString() }
          : milestone
      )
    );
  };

  const deleteMilestone = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setMilestones(prev => prev.filter(milestone => milestone.id !== id));
  };

  const getMilestonesByCategory = (category) => {
    return milestones.filter(milestone => milestone.category === category);
  };

  const getMilestonesByDateRange = (startDate, endDate) => {
    return milestones.filter(milestone => {
      const milestoneDate = new Date(milestone.date);
      return milestoneDate >= startDate && milestoneDate <= endDate;
    });
  };

  return {
    milestones,
    addMilestone,
    updateMilestone,
    deleteMilestone,
    getMilestonesByCategory,
    getMilestonesByDateRange
  };
};
