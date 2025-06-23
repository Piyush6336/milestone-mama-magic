
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MilestoneForm from '@/components/milestones/MilestoneForm';
import MilestoneTimeline from '@/components/milestones/MilestoneTimeline';
import CommunityTips from '@/components/milestones/CommunityTips';
import PersonalizedRecommendations from '@/components/milestones/PersonalizedRecommendations';
import { useMilestones } from '@/hooks/useMilestones';
import { useCommunityTips } from '@/hooks/useCommunityTips';

const MilestoneTracker = () => {
  const { milestones, addMilestone } = useMilestones();
  const { tips, addTip } = useCommunityTips();
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-2">Milestone Tracker</h1>
        <p className="text-xl text-muted-foreground text-center">
          Track your journey and connect with the community
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="timeline">My Timeline</TabsTrigger>
              <TabsTrigger value="add">Add Milestone</TabsTrigger>
            </TabsList>
            
            <TabsContent value="timeline" className="space-y-4">
              <MilestoneTimeline 
                milestones={milestones} 
                onSelectMilestone={setSelectedMilestone}
              />
            </TabsContent>
            
            <TabsContent value="add" className="space-y-4">
              <MilestoneForm onAddMilestone={addMilestone} />
            </TabsContent>
          </Tabs>

          {/* Community Tips Section */}
          <Card>
            <CardHeader>
              <CardTitle>Community Tips</CardTitle>
              <CardDescription>
                {selectedMilestone 
                  ? `Tips for: ${selectedMilestone.title}` 
                  : 'Select a milestone to see related tips, or browse all tips'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CommunityTips 
                tips={tips} 
                selectedMilestone={selectedMilestone}
                onAddTip={addTip}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <PersonalizedRecommendations milestones={milestones} />
          
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Milestones</span>
                  <span className="font-semibold">{milestones.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>This Month</span>
                  <span className="font-semibold">
                    {milestones.filter(m => {
                      const thisMonth = new Date();
                      const milestoneDate = new Date(m.date);
                      return milestoneDate.getMonth() === thisMonth.getMonth() &&
                             milestoneDate.getFullYear() === thisMonth.getFullYear();
                    }).length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MilestoneTracker;
