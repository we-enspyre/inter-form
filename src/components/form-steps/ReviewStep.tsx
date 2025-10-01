import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { FormData } from '../WebsiteForm';

interface ReviewStepProps {
  formData: FormData;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ formData }) => {
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
        <Card>
          <CardHeader className="pb-3"><CardTitle>Pages</CardTitle></CardHeader>
          <CardContent>
            <p><span className="font-medium">Count:</span> {formData.pages.count}</p>
            <p><span className="font-medium">Names:</span> {formatPageNames()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle>Theme</CardTitle></CardHeader>
          <CardContent><p>{formData.theme || 'No theme selected'}</p></CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle>Content & Logo</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <p><span className="font-medium">Title:</span> {formData.content.title}</p>
            <p><span className="font-medium">Description:</span> {formData.content.description || 'No description provided'}</p>
            <p><span className="font-medium">Logo:</span> {formData.logo || 'No logo option selected'}</p>
            {formData.logoFile && (
              <p><span className="font-medium">Logo File:</span> {formData.logoFile.name} ({(formData.logoFile.size / 1024).toFixed(2)} KB)</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle>Design Inspiration</CardTitle></CardHeader>
          <CardContent><p>{formData.inspiration || 'No inspiration selected'}</p></CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle>Additional Services</CardTitle></CardHeader>
          <CardContent><p>{formatExtras()}</p></CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle>Contact Information</CardTitle></CardHeader>
          <CardContent><p><span className="font-medium">Email:</span> {formData.contactEmail}</p></CardContent>
        </Card>
      </div>

      <div className="text-center pt-6">
        <p className="text-sm text-muted-foreground mb-4">
          By submitting, you agree to our terms and conditions
        </p>
        <p className="text-xs text-muted-foreground italic">
          Note: The submit button is at the bottom of the page
        </p>
      </div>
    </div>
  );
};
