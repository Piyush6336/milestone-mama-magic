
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Heart, MessageSquare, ChevronRight } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

const MilestoneTimeline = ({ milestones, onSelectMilestone }) => {
  const sortedMilestones = [...milestones].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getCategoryColor = (category) => {
    const colors = {
      medical: 'bg-red-100 text-red-800',
      preparation: 'bg-blue-100 text-blue-800',
      emotional: 'bg-purple-100 text-purple-800',
      physical: 'bg-green-100 text-green-800',
      general: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.general;
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'medical':
        return '🏥';
      case 'preparation':
        return '📋';
      case 'emotional':
        return '💝';
      case 'physical':
        return '💪';
      default:
        return '✨';
    }
  };

  if (milestones.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No milestones yet</h3>
            <p className="text-muted-foreground mb-4">
              Start tracking your journey by adding your first milestone!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Your Journey</h2>
        <Badge variant="secondary">{milestones.length} milestones</Badge>
      </div>
      
      <div className="space-y-4">
        {sortedMilestones.map((milestone, index) => (
          <Card 
            key={milestone.id} 
            className="transition-all hover:shadow-md cursor-pointer"
            onClick={() => onSelectMilestone(milestone)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg">{getCategoryIcon(milestone.category)}</span>
                    <h3 className="font-semibold text-lg">{milestone.title}</h3>
                    <Badge 
                      variant="secondary" 
                      className={getCategoryColor(milestone.category)}
                    >
                      {milestone.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      {format(new Date(milestone.date), 'MMM dd, yyyy')}
                    </div>
                    <span>•</span>
                    <span>{formatDistanceToNow(new Date(milestone.date), { addSuffix: true })}</span>
                  </div>
                  
                  {milestone.notes && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {milestone.notes}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MilestoneTimeline;
