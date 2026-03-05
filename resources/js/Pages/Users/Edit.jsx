import React, { useState } from "react";
import { router } from "@inertiajs/react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

    <div className="flex justify-center p-6">

      <Card className="w-full max-w-lg shadow-lg">

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
                        setForm({ ...form, name: e.target.value })
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
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </FieldContent>

                  <FieldError />
                </Field>

              </FieldGroup>

            </FieldSet>

            <div className="flex gap-3 mt-6">

              <Button type="submit">
                Update
              </Button>

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