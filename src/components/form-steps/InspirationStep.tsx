import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FormData } from '../WebsiteForm';

interface InspirationStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const templates = [
  {
    id: 'modern-business',
    name: 'Modern Business',
    description: 'Clean and professional layout',
    preview: 'https://via.placeholder.com/300x200/3B82F6/ffffff?text=Modern+Business'
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    description: 'Artistic and visually striking',
    preview: 'https://via.placeholder.com/300x200/8B5CF6/ffffff?text=Creative+Portfolio'
  },
  {
    id: 'minimal-elegant',
    name: 'Minimal Elegant',
    description: 'Simple and sophisticated',
    preview: 'https://via.placeholder.com/300x200/10B981/ffffff?text=Minimal+Elegant'
  },
  {
    id: 'bold-dynamic',
    name: 'Bold Dynamic',
    description: 'Eye-catching and energetic',
    preview: 'https://via.placeholder.com/300x200/F59E0B/ffffff?text=Bold+Dynamic'
  }
];

export const InspirationStep: React.FC<InspirationStepProps> = ({ formData, updateFormData }) => {
  const handleTemplateSelect = (templateId: string) => {
    const selectedTemplate = templates.find(t => t.id === templateId);
    updateFormData({ inspiration: selectedTemplate ? selectedTemplate.name : '' });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Choose Your Design Inspiration</h3>
        <p className="text-muted-foreground">Select a template style that matches your vision</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => {
          const isSelected = formData.inspiration === template.name;
          
          return (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-card-hover ${
                isSelected 
                  ? 'ring-2 ring-primary shadow-card-hover' 
                  : 'hover:shadow-card'
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={template.preview} 
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg">{template.name}</h4>
                    <p className="text-muted-foreground text-sm">{template.description}</p>
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