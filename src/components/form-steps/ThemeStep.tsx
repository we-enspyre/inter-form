import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FormData } from '../WebsiteForm';

interface ThemeStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const colorPalettes = [
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    description: 'Professional and trustworthy',
    colors: ['#3B82F6', '#1E40AF', '#F8FAFC', '#64748B'],
    gradient: 'from-blue-500 to-blue-700'
  },
  {
    id: 'elegant-purple',
    name: 'Elegant Purple',
    description: 'Creative and sophisticated',
    colors: ['#8B5CF6', '#5B21B6', '#FAF5FF', '#6B7280'],
    gradient: 'from-purple-500 to-purple-700'
  },
  {
    id: 'fresh-green',
    name: 'Fresh Green',
    description: 'Natural and growth-focused',
    colors: ['#10B981', '#047857', '#F0FDF4', '#6B7280'],
    gradient: 'from-green-500 to-green-700'
  },
  {
    id: 'warm-orange',
    name: 'Warm Orange',
    description: 'Energetic and friendly',
    colors: ['#F59E0B', '#D97706', '#FFFBEB', '#6B7280'],
    gradient: 'from-orange-500 to-orange-600'
  }
];

export const ThemeStep: React.FC<ThemeStepProps> = ({ formData, updateFormData }) => {
  const [customColors, setCustomColors] = useState('');
  const [isCustomSelected, setIsCustomSelected] = useState(false);

  const handleThemeSelect = (themeId: string) => {
    if (themeId === 'custom') {
      setIsCustomSelected(true);
      updateFormData({ theme: customColors ? `Custom - ${customColors}` : 'Custom' });
    } else {
      setIsCustomSelected(false);
      const selectedTheme = colorPalettes.find(p => p.id === themeId);
      updateFormData({ theme: selectedTheme ? `${selectedTheme.name} - ${selectedTheme.description}` : '' });
    }
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCustomColors(value);
    if (isCustomSelected) {
      updateFormData({ theme: `Custom - ${value}` });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Choose Your Color Palette</h3>
        <p className="text-muted-foreground">Select a color scheme that reflects your brand</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {colorPalettes.map((palette) => {
          const isSelected = formData.theme.includes(palette.name) && !isCustomSelected;
          
          return (
            <Card
              key={palette.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-card-hover ${
                isSelected 
                  ? 'ring-2 ring-primary shadow-card-hover' 
                  : 'hover:shadow-card'
              }`}
              onClick={() => handleThemeSelect(palette.id)}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className={`h-16 rounded-lg bg-gradient-to-r ${palette.gradient}`}></div>
                  
                  <div>
                    <h4 className="font-semibold text-lg">{palette.name}</h4>
                    <p className="text-muted-foreground text-sm">{palette.description}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    {palette.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Custom Color Option */}
        <Card
          className={`cursor-pointer transition-all duration-300 hover:shadow-card-hover ${
            isCustomSelected 
              ? 'ring-2 ring-primary shadow-card-hover' 
              : 'hover:shadow-card'
          }`}
          onClick={() => handleThemeSelect('custom')}
        >
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="h-16 rounded-lg bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center">
                <span className="text-white font-semibold">Custom</span>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg">Other</h4>
                <p className="text-muted-foreground text-sm">Describe your custom colors</p>
              </div>
              
              <textarea
                value={customColors}
                onChange={handleCustomColorChange}
                onClick={(e) => {
                  e.stopPropagation();
                  handleThemeSelect('custom');
                }}
                placeholder="e.g., Navy blue, gold accents, cream background..."
                className="w-full h-20 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};