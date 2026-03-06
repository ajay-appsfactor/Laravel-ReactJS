import { Head, Link, router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .toLowerCase()
        .pipe(z.email({ error: "Invalid email address" })),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
    remember: z.boolean().optional(),
});

export default function Login({ status, canResetPassword }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    const submit = (data) => {
        console.log(data);

        router.post(route("login"), data, {
            onFinish: () => {
                data.password = "";
            },
        });
    };

    return (
        <div className="uk-container mt-5" style={{ maxWidth: "420px" }}>
            <Head title="Login" />

            <h2 className="uk-text-large">Login</h2>

            {status && (
                <div
                    className="uk-alert-success uk-padding-small uk-margin"
                    uk-alert=""
                >
                    {status}
                </div>
            )}

            <form onSubmit={handleSubmit(submit)} className="uk-form-stacked">
                {/* Email */}
                <div className="uk-margin">
                    <label className="uk-form-label">Email</label>

                    <div className="uk-form-controls">
                        <input
                            type="email"
                            className="uk-input"
                            {...register("email")}
                        />
                    </div>

                    {errors.email && (
                        <p className="uk-text-danger uk-text-small">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="uk-margin">
                    <label className="uk-form-label">Password</label>

                    <div className="uk-form-controls">
                        <input
                            type="password"
                            className="uk-input"
                            {...register("password")}
                        />
                    </div>

                    {errors.password && (
                        <p className="uk-text-danger uk-text-small">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Remember */}
                <div className="uk-margin">
                    <label>
                        <input
                            className="uk-checkbox"
                            type="checkbox"
                            {...register("remember")}
                        />{" "}
                        Remember me
                    </label>
                </div>

                {/* Actions */}
                <div className="uk-flex uk-flex-between uk-flex-middle uk-margin">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="uk-link"
                        >
                            Forgot password?
                        </Link>
                    )}

                    <button
                        className="uk-button uk-button-primary"
                        disabled={isSubmitting}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
