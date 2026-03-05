import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
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

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();

        router.post("/users", form, {
            onSuccess: () => {
                toast.success("User created successfully.");
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
                                            setForm({
                                                ...form,
                                                name: e.target.value,
                                            })
                                        }
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
                                            setForm({
                                                ...form,
                                                email: e.target.value,
                                            })
                                        }
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
                                            setForm({
                                                ...form,
                                                password: e.target.value,
                                            })
                                        }
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
                            <Button type="submit">Save User</Button>
                        </div>
                    </form>
                </FieldSet>
            </div>
        </div>
    );
}
