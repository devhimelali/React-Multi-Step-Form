import FormField from "@/components/form-field";
import { CardTitle } from "@/components/ui/card";
import type { StepFormData } from "@/types";
import type { useForm } from "react-hook-form";
interface PersonalInfoStepProps {
    register: ReturnType<typeof useForm<StepFormData>>["register"];
    errors: Record<string, { message?: string }>;
    setValue?: ReturnType<typeof useForm<StepFormData>>["setValue"];
}

const PersonalInfoStep = ({ register, errors }: PersonalInfoStepProps) => {
    return (
        <div className="space-y-4">
            <CardTitle className="text-xl">
                Personal Information
            </CardTitle>
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    id="firstName"
                    label="First Name"
                    register={register}
                    error={errors}
                />
                <FormField
                    id="lastName"
                    label="Last Name"
                    register={register}
                    error={errors}
                />
            </div>
            <FormField
                id="email"
                label="Email Address"
                type="email"
                register={register}
                error={errors}
            />

            <FormField
                id="phone"
                label="Phone Number"
                type="tel"
                register={register}
                error={errors}
            />
        </div>
    );
};

export default PersonalInfoStep;