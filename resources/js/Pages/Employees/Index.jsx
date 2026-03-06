import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { format } from "date-fns";
import { Pencil, Trash2, ArrowLeft } from "lucide-react";

const Index = ({ employees }) => {
    const deleteEmployee = (id) => {
        if(UIkit.modal.confirm(`Are you sure you want to delete this employee ID ${id} ?`)){
             router.delete(`/employees/${id}`);
        }
        // if (confirm("Are you sure you want to delete this employee?")) {
        //     router.delete(`/employees/${id}`);
        // }
    };
    return (
        <div className="uk-container uk-margin mt-5">
            <div className="flex items-center justify-between uk-margin-bottom">
                {/* Left Side */}
                <div className="flex items-center gap-4">
                    <h2 className="uk-text-large m-0">Employee List</h2>

                    <Link
                        href="/dashboard"
                        className="uk-button uk-button-default flex items-center gap-2"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </Link>
                </div>

                {/* Right Side */}
                <Link
                    href="/employees/create"
                    className="uk-button uk-button-primary flex items-center gap-2"
                >
                    Add Employee
                </Link>
            </div>

            <table className="uk-table uk-table-striped uk-table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>
                                    {format(
                                        new Date(employee.created_at),
                                        "dd MMM yyyy, hh:mm a",
                                    )}
                                </td>
                                <td>
                                    {format(
                                        new Date(employee.updated_at),
                                        "dd MMM yyyy, hh:mm a",
                                    )}
                                </td>
                                <td className="uk-flex gap-3">
                                    <Link
                                        href={`/employees/${employee.id}/edit`}
                                    >
                                        <Pencil size={18} />
                                    </Link>
                                    <button
                                    
                                        onClick={()=>{
                                           deleteEmployee(employee.id)
                                        }}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No Employees Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
};

export default Index;
