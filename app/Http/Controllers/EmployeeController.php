<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Config;

class EmployeeController extends Controller
{


    public function index()
    {
        // $arr = ["1", "2", "3", "4", "5"];
        //  pre($arr);
        // die();
        $employees = Employee::latest()->get();
        foreach ($employees as $key => $employee) {
            $employee->encrypted_id = encrypt($employee->id);
        }
        $bladeContent = [
            'title' => 'Employees',
            'employees' => $employees,
        ];

        return Inertia::render('Employees/Index', [
            'bladeContent' => $bladeContent
        ]);
    }

    public function create()
    {


        //  $userTypes = Config::get('enums.userType');
        // return Inertia::render('Employees/Create', ['userTypes'=> $userTypes]);
        return Inertia::render('Employees/Create');
    }


    public function store(Request $request)
    {
        $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email',
            'phone' => 'nullable|string|max:10',
            'aadhaar' => 'nullable|digits:12',
        ]);

        $employee = Employee::create($request->only('name', 'email', 'phone', 'aadhaar'));

        return redirect()
            ->route('employees.edit', encrypt($employee->id))
            ->with('success', 'Employee created successfully');
    }

    public function edit($id)
    {
        $decryptedId = decrypt($id);
        $employee =  Employee::where('id', $decryptedId)->first();

        if (!$employee) {
            return redirect('employees')->with('error', 'Employee not found.');
        }
        return Inertia::render('Employees/Edit', [
            'employee' => $employee,
            'encryptedId' => $id
        ]);
    }

    // public function edit($id)
    // {
    //     $employee = Employee::find($id);
    // }

    public function update(Request $request, $id)
    {
        $decryptedId = decrypt($id);
        $employee = Employee::findOrFail($decryptedId);

        $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email,' . $employee->id,
            'phone' => 'nullable|string|max:10',
        ]);

        $employee->update($request->only('name', 'email', 'phone'));

        return redirect()
            ->route('employees.edit', encrypt($employee->id))
            ->with('success', 'Employee updated successfully');
    }


    public function destroy($id)
{
    $decryptedId = decrypt($id);
    $employee = Employee::findOrFail($decryptedId);

    $employee->delete();

    return redirect()->route('employees.index')
        ->with('success', 'Employee deleted successfully');
}

    // public function destroy(Employee $employee)
    // {
    //     $employee->delete();

    //     return redirect()->route('employees.index')
    //         ->with('success', 'Employee deleted successfully');
    // }
}
