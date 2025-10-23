import type { Step } from "@/types";
import { Check } from "lucide-react";

const ProgressSteps = ({
    currentStep,
    steps
}: {
    currentStep: number;
    steps: Step[]
}) => {
    return (
        <div className="flex justify-between items-center w-full">
            {steps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                return (
                    <div key={step.id} className="flex items-center flex-1 relative">
                        <div className="flex flex-col items-center z-10">
                            <div
                                className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors
                  ${isCompleted
                                        ? "bg-primary text-primary-foreground"
                                        : isCurrent
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-gray-200 text-gray-500"
                                    }`}
                            >
                                {isCompleted ? (
                                    <Check className="h-5 w-5" />
                                ) : (
                                    <Icon className="h-5 w-5" />
                                )}
                            </div>
                            <span className="text-xs mt-2 font-medium">{step.name}</span>
                        </div>

                        {index < steps.length - 1 && (
                            <div
                                className={`absolute top-1/2 left-1/2 right-0 h-0.5 transform -translate-y-1/2 transition-colors ${isCompleted ? "bg-primary" : "bg-gray-200"
                                    }`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ProgressSteps;