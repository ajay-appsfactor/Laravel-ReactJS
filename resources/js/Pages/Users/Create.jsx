import React from "react";
import {  usePage, useForm } from "@inertiajs/react";
import { Loader } from 'lucide-react';
import { toast } from "sonner";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Create() {
    const { errors } = usePage().props;

    // const [form, setForm] = useState({
    //     name: "",
    //     email: "",
    //     password: "",
    // });

    const { data, setData, post, processing, reset } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post("/users", {
            onSuccess: () => {
                toast.success("User created successfully.");
                reset();
            },
            onError: () => {
                toast.error("Failed to create user.");
            },
        });
    };
    // const submit = (e) => {
    //     e.preventDefault();
    //     toast.success("User created successfully.")
    //     router.post("/users", form);
    //     toast.success("User created successfully.")
    // };

    return (
        <div className="flex justify-center p-6">
            <div className="w-full max-w-lg">
                <FieldSet>
                    <FieldTitle>Create User</FieldTitle>

                    <FieldDescription>
                        Fill the form below to create a new user.
                    </FieldDescription>

                    <form onSubmit={submit} className="mt-6">
                        <FieldGroup>
                            {/* Name */}

                            <Field>
                                <FieldLabel>Name</FieldLabel>

                                <FieldContent>
                                    <Input
                                        placeholder="Enter user name"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        value={data.name}
                                    />
                                </FieldContent>
                                {errors.name && (
                                    <FieldError>{errors.name}</FieldError>
                                )}
                            </Field>

                            {/* Email */}

                            <Field>
                                <FieldLabel>Email</FieldLabel>

                                <FieldContent>
                                    <Input
                                        type="email"
                                        placeholder="Enter email"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        value={data.email}
                                    />
                                </FieldContent>

                                {errors.email && (
                                    <FieldError>{errors.email}</FieldError>
                                )}
                            </Field>

                            {/* Password */}

                            <Field>
                                <FieldLabel>Password</FieldLabel>

                                <FieldContent>
                                    <Input
                                        type="password"
                                        placeholder="Enter password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        value={data.password}
                                    />
                                </FieldContent>

                                <FieldDescription>
                                    Password should be secure.
                                </FieldDescription>

                                {errors.password && (
                                    <FieldError>{errors.password}</FieldError>
                                )}
                            </Field>
                        </FieldGroup>

                        <div className="mt-6">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2"
                            >
                                {processing && (
                                    <span className="animate-spin"><Loader /></span>
                                )}
                                {processing ? "Saving..." : "Save User"}
                            </Button>
                        </div>
                    </form>
                </FieldSet>
            </div>
        </div>
    );
}
