import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, ArrowLeft } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';


const schema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .min(3, "Name must be at least 3 characters"),
    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .toLowerCase()
        .pipe(z.email({ error: "Invalid email address" })),

    phone: z
        .string()
        .trim()
        .min(1, "Phone is required")
        .regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
});

const Create = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues:{
          phone:"",
        }
    });

    const submit = (data) => {
        router.post("/employees", data);
    };
    return (
        <div className="uk-container uk-margin-top">
            <div className="uk-flex uk-flex-between uk-flex-middle uk-margin">
                <h2 className="uk-text-large">Create Employee</h2>

                   <Link
                        href="/employees"
                        className="uk-button uk-button-default flex items-center gap-2"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </Link>
            </div>
            <div className="uk-width-1-2">
                <form onSubmit={handleSubmit(submit)} className="uk-margin-top">
                    {/* Name */}
                    <div className="uk-margin-bottom">
                        <label htmlFor="name">
                            Name<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className="uk-input"
                            {...register("name")}
                            placeholder="Enter Employee Name"
                        />

                        {errors.name && (
                            <p className="text-red-500 uk-text-small">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    {/* Email */}
                    <div>
                        <label htmlFor="email">
                            Email<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className="uk-input"
                            {...register("email")}
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-500 uk-text-small">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    {/* Phone */}
                    <div className="uk-margin-top">
                        <label htmlFor="phone">
                            Phone<span className="text-red-500">*</span>
                        </label>

                          {/* <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <PhoneInput
                                    {...field}
                                    defaultCountry="IN"
                                    international
                                    className="uk-input"
                                />
                            )}
                        /> */}
                        <input
                            type="text"
                            className="uk-input"
                            {...register("phone")}
                            placeholder="Enter your phone"
                        />

                        {errors.phone && (
                            <p className="text-red-500 uk-text-small">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    {/* Button */}
                    <div className="uk-margin-top">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="uk-button uk-button-primary"
                        >
                            {isSubmitting && (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            )}
                            {isSubmitting ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Create;
