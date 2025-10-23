import type { StepFormData } from "@/types";
import type { useForm } from "react-hook-form";
import { CardTitle } from "@/components/ui/card";
import FormField from "@/components/form-field";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface ProfessionalInfoStepProps {
    register: ReturnType<typeof useForm<StepFormData>>["register"];
    errors: Record<string, { message?: string }>;
    setValue?: ReturnType<typeof useForm<StepFormData>>["setValue"];
}
const ProfessionalInfoStep = ({ register, errors, setValue }: ProfessionalInfoStepProps) => {
    const [experience, setExperience] = useState<string>("");
    return (
        <div className="space-y-4">
            <CardTitle className="text-xl">
                Professional Details
            </CardTitle>
            <FormField
                id="company"
                label="Company Name"
                register={register}
                error={errors}
            />
            <FormField
                id="position"
                label="Position"
                register={register}
                error={errors}
            />
            <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Select onValueChange={(value) => {
                    setValue?.(
                        "experience", value as Extract<
                            StepFormData,
                            { experience: string }
                        >["experience"],
                        { shouldValidate: true }
                    );
                    setExperience(value);
                }}
                    value={experience}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select experience" /> {" "}
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0-2 years">0-2 years</SelectItem>
                        <SelectItem value="3-5 years">3-5 years</SelectItem>
                        <SelectItem value="6-10 years">6-10 years</SelectItem>
                        <SelectItem value="10+ years">10+ years</SelectItem>
                    </SelectContent>

                </Select>
                {errors && errors.experience && (
                    <p className="text-sm text-destructive mt-1">
                        {errors.experience.message}
                    </p>
                )}
            </div>
            <FormField
                id="industry"
                label="Industry"
                register={register}
                error={errors}
            />
        </div >
    );
};
export default ProfessionalInfoStep;