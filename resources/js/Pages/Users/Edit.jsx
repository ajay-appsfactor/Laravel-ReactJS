import React, { useState } from "react";
import { router } from "@inertiajs/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldContent,
    FieldLabel,
    FieldError,
    FieldGroup,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field";

export default function Edit({ user }) {
    const [form, setForm] = useState({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        router.put(`/users/${user.id}/update`, form);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6"  >
                <h2 className="text-2xl font-bold">Edit Users</h2>

                <div className="flex items-center space-x-8">
                   
                    <Button onClick={() => window.history.back()}>
                        <ArrowLeft size={16} /> Back
                    </Button>
                </div>
            </div>

            <Card className="w-full mx-auto max-w-lg shadow-lg">
                <CardHeader>
                    <CardTitle>Edit User</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={submit} className="space-y-5">
                        <FieldSet>
                            <FieldTitle>User Information</FieldTitle>

                            <FieldGroup>
                                {/* Name */}
                                <Field>
                                    <FieldLabel>Name</FieldLabel>

                                    <FieldContent>
                                        <Input
                                            value={form.name}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    </FieldContent>

                                    <FieldError />
                                </Field>

                                {/* Email */}
                                <Field>
                                    <FieldLabel>Email</FieldLabel>

                                    <FieldContent>
                                        <Input
                                            type="email"
                                            value={form.email}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                    </FieldContent>

                                    <FieldError />
                                </Field>
                            </FieldGroup>
                        </FieldSet>

                        <div className="flex gap-3 mt-6">
                            <Button type="submit">Update</Button>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
