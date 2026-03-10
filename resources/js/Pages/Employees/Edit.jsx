import React from "react";
import { router, Link, Head, usePage } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowLeft } from "lucide-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const schema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
    aadhaar: z
        .string()
        .min(1, "Aadhaar is required")
        .length(12, "Aadhaar must be 12 digits")
        .regex(/^[0-9]+$/, "Only numbers allowed"),
    gender: z.string().min(1, "Gender is required"),
});

const Edit = ({ employee, genders }) => {
    if (!employee) {
        return <div>Loading...</div>;
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: employee?.name || "",
            email: employee?.email || "",
            aadhaar: employee?.aadhaar || "",
            phone: employee?.phone || "",
            gender: employee?.gender || "",
        },
    });

    const { errors: backendErrors, flash, encryptedId } = usePage().props;
    // console.log("flash :", flash)
    // console.log("Edit backend error :", backendErrors);
    const onSubmit = (data) => {
        router.put(`/employees/${encryptedId}`, data);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Employee Edit" />
            <div className="uk-container uk-margin-top">
                <div className="uk-card uk-card-default  uk-card-body uk-border-rounded">
                    <div className="uk-flex uk-flex-between uk-flex-middle uk-margin">
                        <h2 className="uk-text-large">Edit Employee</h2>

                        <Link
                            href="/employees"
                            className="uk-button uk-button-default flex items-center gap-2"
                        >
                            <ArrowLeft size={18} />
                            Back
                        </Link>
                    </div>
                    {flash?.success && (
                        <div className="uk-alert uk-alert-success">
                            <p>{flash.success}</p>
                        </div>
                    )}

                    <div className="uk-width-1-2">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="uk-margin-top"
                        >
                            {/* Name */}
                            <div className="uk-margin">
                                <label className="uk-form-label">
                                    Name<span className="text-red-500">*</span>
                                </label>

                                <input
                                    {...register("name")}
                                    className="uk-input"
                                    type="text"
                                />

                                {errors.name && (
                                    <p className="uk-text-danger">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="uk-margin">
                                <label className="uk-form-label">
                                    Email<span className="text-red-500">*</span>
                                </label>

                                <input
                                    {...register("email")}
                                    className="uk-input"
                                    type="text"
                                />
                                {(errors.email?.message ||
                                    backendErrors.email) && (
                                    <p className="text-red-500 uk-text-small">
                                        {errors.email?.message ||
                                            backendErrors.email}
                                    </p>
                                )}
                            </div>

                            {/* Phone */}
                            <div className="uk-margin">
                                <label className="uk-form-label">
                                    Phone<span className="text-red-500">*</span>
                                </label>

                                <input
                                    {...register("phone")}
                                    className="uk-input"
                                    type="text"
                                />

                                {errors.phone && (
                                    <p className="uk-text-danger">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>
                            {/* Aadhaar */}
                            <div className="uk-margin">
                                <label className="uk-form-label">
                                    Aadhaar
                                    <span className="text-red-500">*</span>
                                </label>

                                <input
                                    {...register("aadhaar")}
                                    className="uk-input"
                                    type="text"
                                />

                                {errors.aadhaar && (
                                    <p className="uk-text-danger">
                                        {errors.aadhaar.message}
                                    </p>
                                )}
                            </div>

                            {/* Gender */}
                            <div className="uk-margin">
                                <label className="uk-form-label">
                                    Gender
                                    <span className="text-red-500">*</span>
                                </label>

                                <select
                                    {...register("gender")}
                                    className="uk-select"
                                >
                                    <option value="">Select Gender</option>

                                    {Object.entries(genders || {}).map(
                                        ([key, value]) => (
                                            <option key={key} value={key}>
                                                {value}
                                            </option>
                                        ),
                                    )}
                                </select>

                                {errors.gender && (
                                    <p className="uk-text-danger">
                                        {errors.gender.message}
                                    </p>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="uk-margin flex gap-3">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="uk-button uk-button-primary flex items-center gap-2"
                                >
                                    {isSubmitting && (
                                        <Loader2
                                            className="animate-spin"
                                            size={16}
                                        />
                                    )}
                                    {isSubmitting ? "Updating..." : "Update"}
                                </button>

                                {/* <Link
                            href="/employees"
                            className="uk-button uk-button-default"
                        >
                            Cancel
                        </Link> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
