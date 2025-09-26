import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormData } from '../WebsiteForm';

interface PagesStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export const PagesStep: React.FC<PagesStepProps> = ({ formData, updateFormData }) => {
  const handlePageCountChange = (count: string) => {
    const pageCount = parseInt(count);
    const names = Array(pageCount).fill('').map((_, index) => 
      formData.pages.names[index] || ''
    );
    
    updateFormData({ 
      pages: { count: pageCount, names } 
    });
  };

  const handlePageNameChange = (index: number, name: string) => {
    const newNames = [...formData.pages.names];
    newNames[index] = name;
    
    updateFormData({ 
      pages: { ...formData.pages, names: newNames } 
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">How many pages do you need?</h3>
        <p className="text-muted-foreground">Choose the number of pages and optionally name them</p>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        <div>
          <Label htmlFor="pageCount" className="text-base font-medium">Number of Pages</Label>
          <Select value={formData.pages.count.toString()} onValueChange={handlePageCountChange}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select number of pages" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? 'Page' : 'Pages'}
                </SelectItem>
              ))}
              <SelectItem value="11">10+ Pages (Custom)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.pages.count > 0 && (
          <div className="space-y-4">
            <Label className="text-base font-medium">
              Page Names (Optional)
            </Label>
            <p className="text-sm text-muted-foreground">
              Give your pages custom names, or leave blank for default naming
            </p>
            
            <div className="space-y-3">
              {Array.from({ length: formData.pages.count }, (_, index) => (
                <div key={index}>
                  <Label htmlFor={`page-${index}`} className="text-sm">
                    Page {index + 1}
                  </Label>
                  <Input
                    id={`page-${index}`}
                    placeholder={`e.g., ${index === 0 ? 'Home' : index === 1 ? 'About' : index === 2 ? 'Services' : 'Contact'}`}
                    value={formData.pages.names[index] || ''}
                    onChange={(e) => handlePageNameChange(index, e.target.value)}
                    className="mt-1"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};