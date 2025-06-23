
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Calendar, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
            BabySteps
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your modern, inclusive parenting companion supporting you from preconception through pregnancy and beyond
          </p>
        </div>

        {/* Hero Feature */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-4">Milestone Tracker & Community Tips</h2>
                  <p className="text-lg opacity-90 mb-6">
                    Track your precious moments, connect with a supportive community, and get personalized recommendations for your unique journey.
                  </p>
                  <Link to="/milestone-tracker">
                    <Button size="lg" variant="secondary" className="text-primary">
                      Start Your Journey
                      <Heart className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                <div className="text-6xl">👶</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-pink-500" />
                Track Milestones
              </CardTitle>
              <CardDescription>
                Record and celebrate every precious moment of your journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• First ultrasound memories</li>
                <li>• Heartbeat moments</li>
                <li>• Preparation milestones</li>
                <li>• Personalized timeline</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="h-6 w-6 text-blue-500" />
                Community Tips
              </CardTitle>
              <CardDescription>
                Learn from experienced parents and share your wisdom
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Real parent experiences</li>
                <li>• Milestone-specific advice</li>
                <li>• Verified recommendations</li>
                <li>• Safe, supportive community</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Star className="h-6 w-6 text-purple-500" />
                Personalized
              </CardTitle>
              <CardDescription>
                Get recommendations tailored to your unique journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Week-based suggestions</li>
                <li>• Progress tracking</li>
                <li>• Smart recommendations</li>
                <li>• Gentle reminders</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Ready to start tracking your journey?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of parents who trust BabySteps to support them through their most precious moments.
            </p>
            <Link to="/milestone-tracker">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600">
                Get Started Now
                <Heart className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
