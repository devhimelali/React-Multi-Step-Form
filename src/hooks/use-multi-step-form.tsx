import { billingInfoSchema, personalInfoSchema, professionalInfoSchema, type Step, type StepFormData } from "@/types";
import { Briefcase, CreditCard, User } from "lucide-react";
import { useState } from "react";

const stepSchemas = [
    personalInfoSchema,
    professionalInfoSchema,
    billingInfoSchema
];

export const steps: Step[] = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "professional", name: "Professional Info", icon: Briefcase },
    { id: "billing", name: "Billing Info", icon: CreditCard }
];

export function useMultiStepForm() {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [formData, setFormData] = useState<Partial<StepFormData>>({});
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === steps.length - 1;

    // Return the schema for the current step
    const getCurrentStepSchema = () => stepSchemas[currentStep];
    // Go to the next step
    const goToNextStep = () => {
        if (!isLastStep) setCurrentStep((prev) => prev + 1);
    }

    // Go to the previous step
    const goToPreviousStep = () => {
        if (!isFirstStep) setCurrentStep((prev) => prev - 1);
    }

    const updateFormData = (newData: Partial<StepFormData>) => {
        setFormData((prev) => ({ ...prev, ...newData }));
    }

    const submitForm = (data: StepFormData) => {
        console.log("✅ Final Submitted Data:", data);
        setIsSubmitted(true);
    }

    const resetForm = () => {
        setFormData({});
        setCurrentStep(0);
        setIsSubmitted(false);
    }

    return {
        currentStep,
        isFirstStep,
        isLastStep,
        steps,
        formData,
        isSubmitted,
        getCurrentStepSchema,
        goToNextStep,
        goToPreviousStep,
        updateFormData,
        submitForm,
        resetForm
    };
}