import type { AllFormFields, StepFormData } from "@/types";
import type { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const FormField = ({
    id,
    label,
    register,
    error,
    type = "text",
    maxLength
}: {
    id: keyof AllFormFields;
    label: string;
    register: ReturnType<typeof useForm<StepFormData>>["register"];
    error?: Record<string, { message?: string }>;
    type?: string;
    maxLength?: number;
}) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>
                {label}
            </Label>
            <Input
                id={id}
                type={type}
                maxLength={maxLength}
                {...register(id)}
            />
            {error && error[id] && (
                <p className="text-sm text-destructive mt-1">
                    {error[id]?.message}
                </p>
            )}
        </div>
    );
};

export default FormField;