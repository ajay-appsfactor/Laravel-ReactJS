import { Head, Link, router, usePage } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z
    .object({
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
        password: z
            .string()
            .min(1, "Password is required")
            .min(6, "Password must be at least 6 characters"),
        password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords do not match",
        path: ["password_confirmation"],
    });

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const { errors: backendErrors } = usePage().props;
    const submit = (data) => {
        // console.log(data);

        router.post(route("register"), data);
    };

    return (
        <div className="uk-container mt-5" style={{ maxWidth: "500px" }}>
            <Head title="Register" />

            <h2 className="uk-text-large">Register</h2>

            <form onSubmit={handleSubmit(submit)} className="uk-form-stacked">
                {/* Name */}
                <div className="uk-margin">
                    <label className="uk-form-label">Name</label>

                    <div className="uk-form-controls">
                        <input
                            className="uk-input"
                            type="text"
                            {...register("name")}
                        />
                    </div>

                    {errors.name && (
                        <p className="uk-text-danger uk-text-small">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div className="uk-margin">
                    <label className="uk-form-label">Email</label>

                    <div className="uk-form-controls">
                        <input
                            className="uk-input"
                            type="email"
                            {...register("email")}
                        />
                    </div>

                    {(errors.email?.message || backendErrors.email) && (
                        <p className="text-red-500 uk-text-small">
                            {errors.email?.message || backendErrors.email}
                        </p>
                    )}
                </div>

                {/* Phone */}
                <div className="uk-margin">
                    <label className="uk-form-label">Phone</label>

                    <div className="uk-form-controls">
                        <input
                            className="uk-input"
                            type="text"
                            {...register("phone")}
                        />
                    </div>

                    {errors.phone && (
                        <p className="uk-text-danger uk-text-small">
                            {errors.phone.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="uk-margin">
                    <label className="uk-form-label">Password</label>

                    <div className="uk-form-controls">
                        <input
                            className="uk-input"
                            type="password"
                            {...register("password")}
                        />
                    </div>

                    {errors.password && (
                        <p className="uk-text-danger uk-text-small">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="uk-margin">
                    <label className="uk-form-label">Confirm Password</label>

                    <div className="uk-form-controls">
                        <input
                            className="uk-input"
                            type="password"
                            {...register("password_confirmation")}
                        />
                    </div>

                    {errors.password_confirmation && (
                        <p className="uk-text-danger uk-text-small">
                            {errors.password_confirmation.message}
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="uk-margin uk-flex uk-flex-between uk-flex-middle">
                    <Link href={route("login")} className="uk-link">
                        Already registered?
                    </Link>

                    <button
                        className="uk-button uk-button-primary"
                        disabled={isSubmitting}
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}
