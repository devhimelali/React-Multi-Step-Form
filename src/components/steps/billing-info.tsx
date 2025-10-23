import FormField from "@/components/form-field";
import { CardTitle } from "@/components/ui/card";
import type { StepFormData } from "@/types";
import type { useForm } from "react-hook-form";
interface BillingInfoStepProps {
    register: ReturnType<typeof useForm<StepFormData>>["register"];
    errors: Record<string, { message?: string }>;
    setValue?: ReturnType<typeof useForm<StepFormData>>["setValue"];
}

const billingInfoStep = ({ register, errors }: BillingInfoStepProps) => {
    return (
        <div className="space-y-4">
            <CardTitle className="text-xl">Billing Information</CardTitle>
            <FormField
                id="cardNumber"
                label="Card Number"
                register={register}
                error={errors}
                maxLength={16}
            />
            <FormField
                id="cardHolderName"
                label="Card Holder Name"
                register={register}
                error={errors}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    id="expirationDate"
                    label="Expiration Date"
                    register={register}
                    error={errors}
                />
                <FormField
                    id="cvv"
                    label="CVV"
                    register={register}
                    error={errors}
                />
            </div>
        </div>
    );
}

export default billingInfoStep;