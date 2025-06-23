
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const MilestoneForm = ({ onAddMilestone }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const predefinedMilestones = [
    'First ultrasound',
    'Heard the heartbeat',
    'Started prenatal vitamins',
    'First prenatal appointment',
    'Gender reveal',
    'Baby shower',
    'Nursery setup complete',
    'Hospital bag packed',
    'First kick felt',
    'Started birth classes'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    
    const newMilestone = {
      id: Date.now().toString(),
      title: title.trim(),
      date: date.toISOString(),
      notes: notes.trim(),
      category,
      createdAt: new Date().toISOString()
    };

    await onAddMilestone(newMilestone);
    
    // Reset form
    setTitle('');
    setNotes('');
    setDate(new Date());
    setCategory('general');
    setIsSubmitting(false);
  };

  const handlePredefinedClick = (milestone) => {
    setTitle(milestone);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add New Milestone
        </CardTitle>
        <CardDescription>
          Record an important moment in your journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Milestone Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., First ultrasound"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Quick Select</Label>
            <div className="flex flex-wrap gap-2">
              {predefinedMilestones.map((milestone) => (
                <Button
                  key={milestone}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handlePredefinedClick(milestone)}
                  className="text-xs"
                >
                  {milestone}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-input rounded-md bg-background"
            >
              <option value="general">General</option>
              <option value="medical">Medical</option>
              <option value="preparation">Preparation</option>
              <option value="emotional">Emotional</option>
              <option value="physical">Physical</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional details or feelings about this milestone..."
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || !title.trim()}
          >
            {isSubmitting ? 'Adding...' : 'Add Milestone'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MilestoneForm;
