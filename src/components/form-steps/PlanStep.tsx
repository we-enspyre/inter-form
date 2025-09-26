import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FormData } from '../WebsiteForm';
import { Globe, PenTool, Calendar, ShoppingCart } from 'lucide-react';

interface PlanStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const plans = [
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'Perfect for startups and small businesses',
    icon: Globe,
    features: ['Single powerful page', 'Contact forms', 'Mobile responsive']
  },
  {
    id: 'portfolio',
    name: 'Blogging / Portfolio',
    description: 'Showcase your work and thoughts',
    icon: PenTool,
    features: ['Blog system', 'Portfolio gallery', 'SEO optimized']
  },
  {
    id: 'booking',
    name: 'Website with Booking System',
    description: 'For service-based businesses',
    icon: Calendar,
    features: ['Online booking', 'Calendar integration', 'Payment processing']
  },
  {
    id: 'eshop',
    name: 'E-Shop',
    description: 'Full e-commerce solution',
    icon: ShoppingCart,
    features: ['Product catalog', 'Shopping cart', 'Payment gateway']
  }
];

export const PlanStep: React.FC<PlanStepProps> = ({ formData, updateFormData }) => {
  const handlePlanSelect = (planId: string) => {
    updateFormData({ plan: planId });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">What type of website do you need?</h3>
        <p className="text-muted-foreground">Choose the plan that best fits your business needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((plan) => {
          const IconComponent = plan.icon;
          const isSelected = formData.plan === plan.id;
          
          return (
            <Card
              key={plan.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-card-hover ${
                isSelected 
                  ? 'ring-2 ring-primary shadow-card-hover bg-gradient-card' 
                  : 'hover:shadow-card'
              }`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">{plan.name}</h4>
                    <p className="text-muted-foreground text-sm mb-3">{plan.description}</p>
                    
                    <ul className="space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="text-sm flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};