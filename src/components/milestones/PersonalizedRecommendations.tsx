
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, Star, Calendar, ArrowRight } from 'lucide-react';

const PersonalizedRecommendations = ({ milestones }) => {
  // Calculate pregnancy week based on milestones (simplified logic)
  const getPregnancyWeek = () => {
    const firstUltrasound = milestones.find(m => 
      m.title.toLowerCase().includes('ultrasound') || 
      m.title.toLowerCase().includes('first appointment')
    );
    
    if (firstUltrasound) {
      const weeksAgo = Math.floor((Date.now() - new Date(firstUltrasound.date)) / (7 * 24 * 60 * 60 * 1000));
      return Math.max(8 + weeksAgo, 8); // Assume first ultrasound at 8 weeks
    }
    
    return null;
  };

  const pregnancyWeek = getPregnancyWeek();

  const getRecommendations = () => {
    const recentMilestones = milestones.map(m => m.title.toLowerCase());
    const recommendations = [];

    // Week-based recommendations
    if (pregnancyWeek) {
      if (pregnancyWeek >= 8 && pregnancyWeek < 12) {
        recommendations.push({
          type: 'week-based',
          title: 'First Trimester Care',
          description: 'Focus on prenatal vitamins and regular checkups',
          icon: '🌱',
          priority: 'high'
        });
      } else if (pregnancyWeek >= 12 && pregnancyWeek < 28) {
        recommendations.push({
          type: 'week-based',
          title: 'Second Trimester Planning',
          description: 'Consider genetic testing and start thinking about baby gear',
          icon: '📋',
          priority: 'medium'
        });
      } else if (pregnancyWeek >= 28) {
        recommendations.push({
          type: 'week-based',
          title: 'Third Trimester Prep',
          description: 'Hospital bag, birth plan, and nursery setup',
          icon: '🎒',
          priority: 'high'
        });
      }
    }

    // Milestone-based recommendations
    if (!recentMilestones.some(m => m.includes('prenatal vitamins'))) {
      recommendations.push({
        type: 'milestone',
        title: 'Start Prenatal Vitamins',
        description: 'Essential nutrients for you and baby',
        icon: '💊',
        priority: 'high'
      });
    }

    if (!recentMilestones.some(m => m.includes('birth classes'))) {
      recommendations.push({
        type: 'milestone',
        title: 'Consider Birth Classes',
        description: 'Prepare for labor and delivery',
        icon: '👶',
        priority: 'medium'
      });
    }

    if (!recentMilestones.some(m => m.includes('hospital bag'))) {
      recommendations.push({
        type: 'milestone',
        title: 'Pack Hospital Bag',
        description: 'Be ready for the big day',
        icon: '🏥',
        priority: 'medium'
      });
    }

    // Community recommendations
    recommendations.push({
      type: 'community',
      title: 'Join BabySteps Community',
      description: 'Connect with other parents at similar stages',
      icon: '👥',
      priority: 'low'
    });

    return recommendations.slice(0, 4); // Show top 4 recommendations
  };

  const recommendations = getRecommendations();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          For You
        </CardTitle>
        <CardDescription>
          Personalized recommendations based on your journey
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {pregnancyWeek && (
          <div className="p-3 bg-primary/10 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="font-medium">Week {pregnancyWeek}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Based on your milestones
            </p>
          </div>
        )}

        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div 
              key={index}
              className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <span className="text-lg">{rec.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{rec.title}</h4>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getPriorityColor(rec.priority)}`}
                    >
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {rec.description}
                  </p>
                  
                  {rec.type === 'milestone' && (
                    <Button variant="outline" size="sm" className="h-6 text-xs">
                      Add Milestone
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Star className="h-3 w-3" />
            <span>Recommendations update based on your progress</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalizedRecommendations;
