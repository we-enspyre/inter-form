import React, { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FormData } from '../WebsiteForm';
import { Upload, Palette, X, Check } from 'lucide-react';

interface ContentStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export const ContentStep: React.FC<ContentStepProps> = ({ formData, updateFormData }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = React.useState<string>('');

  const handleContentChange = (field: 'title' | 'description', value: string) => {
    updateFormData({
      content: {
        ...formData.content,
        [field]: value
      }
    });
  };

  const handleLogoOption = (option: string) => {
    updateFormData({ logo: option });
    if (option !== 'upload') {
      updateFormData({ logoFile: null });
      setUploadError('');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setUploadError('');

    if (!file) return;

    const validTypes = ['image/png', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Please upload only PNG or SVG files');
      event.target.value = '';
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError('File size must be less than 5MB');
      event.target.value = '';
      return;
    }

    updateFormData({ logoFile: file });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    updateFormData({ logoFile: null });
    setUploadError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Tell us about your business</h3>
        <p className="text-muted-foreground">Help us understand your brand and content needs</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <Label htmlFor="title" className="text-base font-medium">
            Website Title *
          </Label>
          <Input
            id="title"
            placeholder="e.g., Your Business Name"
            value={formData.content.title}
            onChange={(e) => handleContentChange('title', e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-base font-medium">
            Short Description
          </Label>
          <Textarea
            id="description"
            placeholder="Brief description of what your business does..."
            value={formData.content.description}
            onChange={(e) => handleContentChange('description', e.target.value)}
            className="mt-2"
            rows={3}
          />
        </div>

        <div>
          <Label className="text-base font-medium mb-4 block">Logo Options</Label>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card 
              className={`cursor-pointer transition-all hover:shadow-card-hover ${
                formData.logo === 'upload' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleLogoOption('upload')}
            >
              <CardContent className="p-4 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h4 className="font-medium">Upload Logo</h4>
                <p className="text-sm text-muted-foreground">I have a logo file</p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all hover:shadow-card-hover ${
                formData.logo === 'design' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleLogoOption('design')}
            >
              <CardContent className="p-4 text-center">
                <Palette className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h4 className="font-medium">Design Logo</h4>
                <p className="text-sm text-muted-foreground">Create a new logo</p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all hover:shadow-card-hover ${
                formData.logo === 'skip' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleLogoOption('skip')}
            >
              <CardContent className="p-4 text-center">
                <X className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h4 className="font-medium">Skip for Now</h4>
                <p className="text-sm text-muted-foreground">Add logo later</p>
              </CardContent>
            </Card>
          </div>

          {formData.logo === 'upload' && (
            <div className="mt-4">
              <Label htmlFor="logo-upload" className="sr-only">
                Upload logo file (PNG or SVG, max 5MB)
              </Label>
              <input
                ref={fileInputRef}
                id="logo-upload"
                type="file"
                accept=".png,.svg,image/png,image/svg+xml"
                onChange={handleFileSelect}
                className="hidden"
                aria-label="Upload logo file (PNG or SVG, max 5MB)"
              />
              
              {!formData.logoFile ? (
                <div 
                  className="p-8 border-2 border-dashed border-muted rounded-lg text-center cursor-pointer hover:border-primary transition-colors"
                  onClick={handleUploadClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleUploadClick();
                    }
                  }}
                  aria-label="Click to upload logo file"
                >
                  <Upload className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="font-medium mb-1">Click to upload logo</p>
                  <p className="text-sm text-muted-foreground">PNG or SVG (max 5MB)</p>
                </div>
              ) : (
                <div className="p-4 border-2 border-primary rounded-lg bg-primary/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{formData.logoFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(formData.logoFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveFile}
                      aria-label="Remove uploaded logo"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {uploadError && (
                <p className="mt-2 text-sm text-red-500" role="alert">{uploadError}</p>
              )}
            </div>
          )}

          {formData.logo === 'design' && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Logo Design Service:</strong> Our design team will create a custom logo based on your brand preferences and style.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};