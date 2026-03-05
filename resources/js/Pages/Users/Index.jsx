import React from "react";
import { Link, router } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function Index({ users }) {
    console.log("check users :", users);
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Users</h2>

                <div className="flex items-center space-x-8">
                    <Link href={route("users.create")}>
                        <Button>Create User</Button>
                    </Link>
                    <Button onClick={() => window.history.back()}>
                        <ArrowLeft size={16} /> Back
                    </Button>
                </div>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Updated At</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell className="font-medium">
                                    {user.name}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{format(new Date(user.created_at), "dd MMM yyyy, hh:mm a")}</TableCell>
                                <TableCell>{format(new Date(user.updated_at), "dd MMM yyyy, hh:mm a")}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Link href={`/users/${user.id}/edit`}>
                                        <Button variant="outline" size="sm">
                                            Edit
                                        </Button>
                                    </Link>

                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => {
                                            if (
                                                confirm(
                                                    "Are you sure you want to delete this user?",
                                                )
                                            ) {
                                                router.delete(
                                                    `/users/delete/${user.id}`,
                                                );
                                            }
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
