import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormData } from '../WebsiteForm';
import { Mail } from 'lucide-react';

interface ContactStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export const ContactStep: React.FC<ContactStepProps> = ({ formData, updateFormData }) => {
  const handleEmailChange = (email: string) => {
    updateFormData({ contactEmail: email });
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">How can we reach you?</h3>
        <p className="text-muted-foreground">We'll send you updates about your website project</p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="space-y-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Mail className="h-8 w-8 text-primary" />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-base font-medium">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.contactEmail}
              onChange={(e) => handleEmailChange(e.target.value)}
              className={`mt-2 ${
                formData.contactEmail && !isValidEmail(formData.contactEmail) 
                  ? 'border-destructive' 
                  : ''
              }`}
            />
            {formData.contactEmail && !isValidEmail(formData.contactEmail) && (
              <p className="text-destructive text-sm mt-1">
                Please enter a valid email address
              </p>
            )}
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">What happens next?</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Our team will review your requirements</li>
              <li>• We'll contact you within 72 hours</li>
              <li>• Project timeline and next steps will be shared</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};