import { useMultiStepForm } from "@/hooks/use-multi-step-form";
import type { StepFormData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProgressSteps from "@/components/progress-steps";
import PersonalInfoStep from "@/components/steps/personal-info";
import ProfessionalInfoStep from "@/components/steps/professional";
import BillingInfoStep from "@/components/steps/billing-info";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
const MultiStepForm = () => {
    const {
        formData,
        currentStep,
        steps,
        isFirstStep,
        isLastStep,
        isSubmitted,
        goToNextStep,
        goToPreviousStep,
        updateFormData,
        submitForm,
        resetForm,
        getCurrentStepSchema
    } = useMultiStepForm();
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        setValue,
        reset
    } = useForm<StepFormData>({
        resolver: zodResolver(getCurrentStepSchema()),
        mode: "onChange",
        defaultValues: formData
    });

    useEffect(() => {
        reset(formData);
    }, [currentStep, formData, reset]);

    const onNext = async (data: StepFormData) => {
        const isValid = await trigger();
        if (!isValid) return;
        updateFormData(data);
        if (isLastStep) {
            submitForm();
        } else {
            goToNextStep();
        }
    }

    return <div className="min-h-screen flex item-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <ProgressSteps currentStep={currentStep} steps={steps} />
            </CardHeader>
            <CardContent className="space-y-6">
                {currentStep === 0 && <PersonalInfoStep />}
                {currentStep === 1 && <ProfessionalInfoStep />}
                {currentStep === 2 && <BillingInfoStep />}
                <div className="flex justify-between pt-4">
                    <Button type="button" variant="outline" onClick={goToPreviousStep} disabled={isFirstStep}>
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                    </Button>
                    <Button type="button" variant="default" onClick={handleSubmit(onNext)}>
                        {isLastStep ? "Submit" : 'Next'}
                        {!isLastStep && <ChevronRight className="h-4 w-4 ml-1" />}
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div >;
};

export default MultiStepForm;