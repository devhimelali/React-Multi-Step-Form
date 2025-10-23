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
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

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
        const updateData = { ...formData, ...data };
        updateFormData(updateData);
        if (isLastStep) {
            try {
                submitForm(updateData);
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        } else {
            goToNextStep();
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <Card className="w-full max-w-md text-center">
                    <CardContent className="pt-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">Success!</h2>
                        <p className="text-gray-600 mb-6">
                            Your form has been successfully submitted.
                        </p>
                        <Button onClick={resetForm} className="w-full">
                            Fill Another Form
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-2xl shadow-md">
                <CardHeader>
                    <ProgressSteps currentStep={currentStep} steps={steps} />
                </CardHeader>
                <CardContent className="space-y-6 pt-2 pb-6">
                    {currentStep === 0 && (
                        <PersonalInfoStep register={register} errors={errors} />
                    )}
                    {currentStep === 1 && (
                        <ProfessionalInfoStep
                            register={register}
                            errors={errors}
                            setValue={setValue}
                        />
                    )}
                    {currentStep === 2 && (
                        <BillingInfoStep register={register} errors={errors} />
                    )}

                    <div className="flex justify-between pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={goToPreviousStep}
                            disabled={isFirstStep}
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Previous
                        </Button>

                        <Button type="button" onClick={handleSubmit(onNext)}>
                            {isLastStep ? "Submit" : "Next"}
                            {!isLastStep && <ChevronRight className="h-4 w-4 ml-1" />}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MultiStepForm;