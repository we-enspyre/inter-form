import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { FormData } from '../WebsiteForm';
import { 
  Search, 
  Server, 
  Globe, 
  Mail, 
  MessageCircle, 
  BarChart, 
  Calendar,
  ShoppingCart
} from 'lucide-react';

interface ExtrasStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const baseExtras = [
  {
    id: 'seo',
    name: 'SEO Optimization',
    description: 'Improve search engine visibility',
    icon: Search,
    price: '$99'
  },
  {
    id: 'hosting',
    name: 'Hosting',
    description: 'Fast and reliable web hosting',
    icon: Server,
    price: '$15/month'
  },
  {
    id: 'domain',
    name: 'Domain Name',
    description: 'Custom domain registration',
    icon: Globe,
    price: '$15/year'
  },
  {
    id: 'email',
    name: 'Professional Email',
    description: 'Professional email addresses',
    icon: Mail,
    price: '$10/month'
  },
  {
    id: 'contact-form',
    name: 'Contact Form',
    description: 'Advanced contact form with validation',
    icon: MessageCircle,
    price: '$49'
  },
  {
    id: 'newsletter',
    name: 'Newsletter Signup',
    description: 'Email marketing integration',
    icon: Mail,
    price: '$79'
  },
  {
    id: 'analytics',
    name: 'Analytics Integration',
    description: 'Track visitors and performance',
    icon: BarChart,
    price: '$59'
  }
];

const planSpecificExtras = {
  booking: [
    {
      id: 'calendar-sync',
      name: 'Calendar Sync',
      description: 'Sync with Google/Outlook calendars',
      icon: Calendar,
      price: '$99'
    },
    {
      id: 'payment-booking',
      name: 'Payment Processing',
      description: 'Accept payments for bookings',
      icon: ShoppingCart,
      price: '$149'
    }
  ],
  eshop: [
    {
      id: 'inventory-management',
      name: 'Inventory Management',
      description: 'Track stock and products',
      icon: BarChart,
      price: '$199'
    },
    {
      id: 'payment-gateway',
      name: 'Premium Payment Gateway',
      description: 'Multiple payment options',
      icon: ShoppingCart,
      price: '$249'
    }
  ]
};

export const ExtrasStep: React.FC<ExtrasStepProps> = ({ formData, updateFormData }) => {
  const handleExtraToggle = (extraId: string) => {
    const currentExtras = formData.extras || [];
    const updatedExtras = currentExtras.includes(extraId)
      ? currentExtras.filter(id => id !== extraId)
      : [...currentExtras, extraId];
    
    updateFormData({ extras: updatedExtras });
  };

  const getExtras = () => {
    let extras = [...baseExtras];
    
    if (formData.plan === 'booking') {
      extras = [...extras, ...planSpecificExtras.booking];
    } else if (formData.plan === 'eshop') {
      extras = [...extras, ...planSpecificExtras.eshop];
    }
    
    return extras;
  };

  const extras = getExtras();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Choose Additional Services</h3>
        <p className="text-muted-foreground">Select extra services to enhance your website</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {extras.map((extra) => {
          const IconComponent = extra.icon;
          const isSelected = formData.extras.includes(extra.id);
          
          return (
            <Card
              key={extra.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-card-hover ${
                isSelected ? 'ring-2 ring-primary shadow-card-hover' : 'hover:shadow-card'
              }`}
              onClick={() => handleExtraToggle(extra.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <Checkbox
                    checked={isSelected}
                    onChange={() => handleExtraToggle(extra.id)}
                    className="mt-1"
                  />
                  
                  <div className={`p-2 rounded-lg ${
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold">{extra.name}</h4>
                      <span className="text-sm font-medium text-primary">{extra.price}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{extra.description}</p>
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