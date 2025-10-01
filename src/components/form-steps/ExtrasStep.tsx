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
  ShoppingCart,
  Bot,
  PenTool,
  Languages,
  CreditCard
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
  },
  {
    id: 'hosting',
    name: 'Hosting',
    description: 'Fast and reliable web hosting',
    icon: Server,
  },
  {
    id: 'domain',
    name: 'Domain Name',
    description: 'Custom domain registration',
    icon: Globe,
  },
  {
    id: 'email',
    name: 'Professional Email',
    description: 'Professional email addresses',
    icon: Mail,
  },
  {
    id: 'contact-form',
    name: 'Contact Form',
    description: 'Advanced contact form with validation (gratis)',
    icon: MessageCircle,
  },
  {
    id: 'newsletter',
    name: 'Newsletter Signup',
    description: 'Email marketing integration',
    icon: Mail,
  },
  {
    id: 'analytics',
    name: 'Analytics Integration',
    description: 'Track visitors and performance',
    icon: BarChart,
  },

  // New requested extras
  {
    id: 'booking',
    name: 'Booking',
    description: 'Integrated appointment & booking system',
    icon: Calendar,
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Online store functionality with cart & checkout',
    icon: ShoppingCart,
  },
  {
    id: 'ai-chatbot',
    name: 'AI Chatbot',
    description: 'Automated chatbot for customer support',
    icon: Bot,
  },
  {
    id: 'cms',
    name: 'CMS Blogging',
    description: 'Content management system for blogs',
    icon: PenTool,
  },
  {
    id: 'domain-email',
    name: 'Domain Email',
    description: 'Custom email with your domain name',
    icon: Mail,
  },
  {
    id: 'translation',
    name: 'Translation',
    description: 'Multi-language site support',
    icon: Languages,
  },
  {
    id: 'payment-processing',
    name: 'Payment Processing',
    description: 'Accept online payments securely',
    icon: CreditCard,
  },
];

export const ExtrasStep: React.FC<ExtrasStepProps> = ({ formData, updateFormData }) => {
  const handleExtraToggle = (extraId: string) => {
    const currentExtras = formData.extras || [];
    const updatedExtras = currentExtras.includes(extraId)
      ? currentExtras.filter(id => id !== extraId)
      : [...currentExtras, extraId];
    
    updateFormData({ extras: updatedExtras });
  };

  const extras = baseExtras;

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
                    <h4 className="font-semibold">{extra.name}</h4>
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
