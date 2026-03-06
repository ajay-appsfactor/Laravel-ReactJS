<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{

    public function index()
    {
        $bladeContent = [
            'title' => 'Employees',
            'employees' => Employee::latest()->get(),
        ];

        return Inertia::render('Employees/Index', [
            'bladeContent' => $bladeContent
        ]);
    }

    public function create()
    {
        return Inertia::render('Employees/Create');
    }


    public function store(Request $request)
    {
        $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email',
            'phone' => 'nullable|string|max:10',
        ]);

        $employee = Employee::create($request->only('name', 'email', 'phone'));

        return redirect()
            ->route('employees.create', $employee->id)
            ->with('success', 'Employee created successfully');
    }

    public function edit($id)
    {
        return Inertia::render('Employees/Edit', [
            'employee' => Employee::findOrFail($id)
        ]);
    }

    // public function edit($id)
    // {
    //     $employee = Employee::find($id);
    // }

    public function update(Request $request, Employee $employee)
    {
        $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email,' . $employee->id,
            'phone' => 'nullable|string|max:10',
        ]);

        $employee->update($request->only('name', 'email', 'phone'));

        return redirect()->route('employees.index')
            ->with('success', 'Employee updated successfully');
    }


    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect()->route('employees.index')
            ->with('success', 'Employee deleted successfully');
    }
}
