import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { PagesStep } from './form-steps/PagesStep';
import { ThemeStep } from './form-steps/ThemeStep';
import { ContentStep } from './form-steps/ContentStep';
import { InspirationStep } from './form-steps/InspirationStep';
import { ExtrasStep } from './form-steps/ExtrasStep';
import { ContactStep } from './form-steps/ContactStep';
import { ReviewStep } from './form-steps/ReviewStep';
import emailjs from '@emailjs/browser';
import heroBg from '@/assets/hero-bg.jpg';

export interface FormData {
  pages: { count: number; names: string[] };
  theme: string;
  content: { title: string; description: string };
  logo: string;
  logoFile?: File | null;
  inspiration: string;
  extras: string[];
  contactEmail: string;
}

const steps = [
  'Pages',
  'Theme',
  'Content & Logo',
  'Inspiration',
  'Extras',
  'Contact Info',
  'Review & Submit'
];

export const WebsiteForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    pages: { count: 1, names: [] },
    theme: '',
    content: { title: '', description: '' },
    logo: '',
    logoFile: null,
    inspiration: '',
    extras: [],
    contactEmail: ''
  });

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => currentStep < steps.length - 1 && setCurrentStep(prev => prev + 1);
  const prevStep = () => currentStep > 0 && setCurrentStep(prev => prev - 1);

  const canProceed = () => {
    switch (currentStep) {
      case 0: return formData.pages.count > 0;
      case 1: return formData.theme !== '';
      case 2: return formData.content.title.trim() !== '';
      case 3: return formData.inspiration !== '';
      case 4: return true;
      case 5: return formData.contactEmail !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail);
      default: return true;
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      let logoData = formData.logo;
      let logoFileBase64;

      if (formData.logoFile) {
        logoFileBase64 = await convertFileToBase64(formData.logoFile);
        logoData = `${formData.logo} - File: ${formData.logoFile.name}`;
      }

      await emailjs.send(
        "service_b6mk06t",
        "template_8tx3u5y",
        {
          pages_count: formData.pages.count,
          pages_names: formData.pages.names.join(', ') || 'Default naming will be used',
          theme: formData.theme,
          title: formData.content.title,
          description: formData.content.description || 'No description provided',
          logo: logoData || 'No logo option selected',
          logo_file: logoFileBase64,
          logo_filename: formData.logoFile?.name,
          inspiration: formData.inspiration || 'No inspiration selected',
          extras: formData.extras.length > 0 ? formData.extras.join(', ') : 'None selected',
          contact_email: formData.contactEmail,
        },
        "Bs6VJ1s_47EaUP-4z"
      );

      toast({ title: "Form Submitted Successfully!", description: "We'll contact you soon." });
      setCurrentStep(0);
      setFormData({
        pages: { count: 1, names: [] },
        theme: '',
        content: { title: '', description: '' },
        logo: '',
        logoFile: null,
        inspiration: '',
        extras: [],
        contactEmail: ''
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({ title: "Submission Failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <PagesStep formData={formData} updateFormData={updateFormData} />;
      case 1: return <ThemeStep formData={formData} updateFormData={updateFormData} />;
      case 2: return <ContentStep formData={formData} updateFormData={updateFormData} />;
      case 3: return <InspirationStep formData={formData} updateFormData={updateFormData} />;
      case 4: return <ExtrasStep formData={formData} updateFormData={updateFormData} />;
      case 5: return <ContactStep formData={formData} updateFormData={updateFormData} />;
      case 6: return <ReviewStep formData={formData} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroBg})` }} />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Build Your Perfect Website</h1>
          <p className="text-white/80 text-lg">Tell us what you need and we'll create it for you</p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-elegant">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-2xl">Step {currentStep + 1}: {steps[currentStep]}</CardTitle>
              <span className="text-sm text-muted-foreground">{currentStep + 1} of {steps.length}</span>
            </div>
            <Progress value={((currentStep + 1) / steps.length) * 100} className="w-full" />
          </CardHeader>

          <CardContent className="min-h-[400px]">{renderStep()}</CardContent>

          <div className="px-6 pb-6">
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 0} className="min-w-24">Back</Button>

              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-gradient-accent text-white hover:opacity-90 min-w-32"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Form'}
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="bg-gradient-accent text-white hover:opacity-90 min-w-24"
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
