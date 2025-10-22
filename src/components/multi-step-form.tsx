import type { StepFormData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const MultiStepForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        setValue,
        reset
    } = useForm<StepFormData>({
        // resolver
    });
    return <div>MultiStepForm</div>;
};

export default MultiStepForm;