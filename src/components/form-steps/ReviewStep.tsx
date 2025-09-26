import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormData } from '../WebsiteForm';
import { CheckCircle, Edit } from 'lucide-react';

interface ReviewStepProps {
  formData: FormData;
  onSubmit: () => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ formData, onSubmit }) => {
  const formatPageNames = () => {
    if (formData.pages.names.length > 0 && formData.pages.names.some(name => name.trim())) {
      return formData.pages.names.filter(name => name.trim()).join(', ');
    }
    return 'Default naming will be used';
  };

  const formatExtras = () => {
    if (formData.extras.length === 0) return 'None selected';
    return formData.extras.join(', ');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Review Your Website Project</h3>
        <p className="text-muted-foreground">Please confirm all details before submitting</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {/* Plan */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Website Plan
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium capitalize">{formData.plan.replace('-', ' ')}</p>
          </CardContent>
        </Card>

        {/* Pages */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Pages
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p><span className="font-medium">Count:</span> {formData.pages.count}</p>
            <p><span className="font-medium">Names:</span> {formatPageNames()}</p>
          </CardContent>
        </Card>

        {/* Theme */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Theme
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{formData.theme || 'No theme selected'}</p>
          </CardContent>
        </Card>

        {/* Content */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Content & Logo
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><span className="font-medium">Title:</span> {formData.content.title}</p>
            <p><span className="font-medium">Description:</span> {formData.content.description || 'No description provided'}</p>
            <p><span className="font-medium">Logo:</span> {formData.logo ? formData.logo.charAt(0).toUpperCase() + formData.logo.slice(1) : 'No logo option selected'}</p>
          </CardContent>
        </Card>

        {/* Inspiration */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Design Inspiration
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{formData.inspiration || 'No inspiration selected'}</p>
          </CardContent>
        </Card>

        {/* Extras */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Additional Services
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{formatExtras()}</p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Contact Information
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p><span className="font-medium">Email:</span> {formData.contactEmail}</p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center pt-6">
        <Button
          onClick={onSubmit}
          size="lg"
          className="bg-gradient-accent text-white hover:opacity-90 px-8"
        >
          Submit Website Request
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          By submitting, you agree to our terms and conditions
        </p>
      </div>
    </div>
  );
};