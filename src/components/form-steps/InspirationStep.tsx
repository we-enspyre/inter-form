import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FormData } from '../WebsiteForm';

interface InspirationStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const templates = [
  {
    id: 'hestia',
    name: 'Hestia',
    preview: 'https://demo.themeisle.com/hestia/'
  },
  {
    id: 'roblog',
    name: 'Roblog',
    preview: 'https://roblogdemo.wordpress.com/?demo'
  },
  {
    id: 'pizza-template',
    name: 'Pizzaria Template',
    preview: 'https://we-enspyre.github.io/PizzaTemplate/'
  },
  {
    id: 'astra',
    name: 'Astra',
    preview: 'https://wp-themes.com/astra/'
  },
  {
    id: 'sham-united',
    name: 'Sham United',
    preview: 'https://www.sham-united.com/'
  },
  {
    id: 'bt-template',
    name: 'BT Template',
    preview: 'https://we-enspyre.github.io/BT/'
  },
  {
    id: 'education-formula',
    name: 'Education Formula',
    preview: 'https://wp-themes.com/education-formula/'
  },
  {
    id: 'kiddiemart',
    name: 'Kiddiemart',
    preview: 'https://fse.catchthemes.com/kiddiemart/'
  },
  {
    id: 'fotograf',
    name: 'Fotograf',
    preview: 'https://we-enspyre.github.io/fotograf/'
  },
  {
    id: 'sydney',
    name: 'Sydney',
    preview: 'https://athemes.com/theme/sydney/'
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
                  <div className="aspect-video rounded-lg overflow-hidden border border-gray-200 relative">
                    <iframe
                      sandbox="allow-scripts allow-same-origin"
                      referrerPolicy="no-referrer"
                      src={template.preview}
                      title={template.name}
                      className="w-full h-full top-0 left-0 origin-top-left"
                      style={{
                          width: '1280px',
                          height: '720px',
                          transform: 'scale(0.3)',
                          border: 'none'
                        }}  
                      frameBorder="0"
                      loading="lazy"
                    ></iframe>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg">{template.name}</h4>
                    <p className="text-muted-foreground text-sm"> Live preview</p>
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
