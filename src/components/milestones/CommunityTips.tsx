
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageSquare, Plus, ThumbsUp, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const CommunityTips = ({ tips, selectedMilestone, onAddTip }) => {
  const [showAddTip, setShowAddTip] = useState(false);
  const [newTip, setNewTip] = useState('');
  const [tipAuthor, setTipAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredTips = selectedMilestone 
    ? tips.filter(tip => tip.milestoneType === selectedMilestone.title.toLowerCase())
    : tips;

  const handleSubmitTip = async (e) => {
    e.preventDefault();
    if (!newTip.trim() || !tipAuthor.trim()) return;

    setIsSubmitting(true);
    
    const tip = {
      id: Date.now().toString(),
      content: newTip.trim(),
      author: tipAuthor.trim(),
      milestoneType: selectedMilestone?.title.toLowerCase() || 'general',
      likes: 0,
      createdAt: new Date().toISOString(),
      verified: false
    };

    await onAddTip(tip);
    
    setNewTip('');
    setTipAuthor('');
    setShowAddTip(false);
    setIsSubmitting(false);
  };

  const getMilestoneTypeColor = (type) => {
    const colors = {
      'first ultrasound': 'bg-blue-100 text-blue-800',
      'heard the heartbeat': 'bg-red-100 text-red-800',
      'started prenatal vitamins': 'bg-green-100 text-green-800',
      'general': 'bg-purple-100 text-purple-800'
    };
    return colors[type] || colors.general;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <span className="font-medium">
            {filteredTips.length} {filteredTips.length === 1 ? 'tip' : 'tips'}
          </span>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowAddTip(!showAddTip)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Tip
        </Button>
      </div>

      {showAddTip && (
        <Card className="border-dashed">
          <CardContent className="p-4">
            <form onSubmit={handleSubmitTip} className="space-y-3">
              <div>
                <Input
                  placeholder="Your name (or stay anonymous)"
                  value={tipAuthor}
                  onChange={(e) => setTipAuthor(e.target.value)}
                  required
                />
              </div>
              <div>
                <Textarea
                  placeholder={`Share a helpful tip${selectedMilestone ? ` for "${selectedMilestone.title}"` : ''}...`}
                  value={newTip}
                  onChange={(e) => setNewTip(e.target.value)}
                  rows={3}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  size="sm"
                  disabled={isSubmitting || !newTip.trim() || !tipAuthor.trim()}
                >
                  {isSubmitting ? 'Sharing...' : 'Share Tip'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowAddTip(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {filteredTips.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              {selectedMilestone 
                ? `No tips yet for "${selectedMilestone.title}". Be the first to share!`
                : 'No tips available. Start by adding one!'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredTips.map((tip) => (
            <Card key={tip.id} className="transition-all hover:shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {tip.author.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{tip.author}</span>
                      {tip.verified && (
                        <Badge variant="secondary" className="text-xs">
                          ✓ Verified
                        </Badge>
                      )}
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getMilestoneTypeColor(tip.milestoneType)}`}
                      >
                        {tip.milestoneType}
                      </Badge>
                    </div>
                    
                    <p className="text-sm mb-2">{tip.content}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                        <ThumbsUp className="h-3 w-3" />
                        {tip.likes} likes
                      </button>
                      <span>
                        {formatDistanceToNow(new Date(tip.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityTips;
