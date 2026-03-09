<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee;
use Barryvdh\DomPDF\Facade\Pdf;

class PdfController extends Controller
{
    

    public function index()
    {
         $employees = Employee::all();
        //  dd($employees);
         $data = [
            'title' => 'Employee List',
            'date' => date('d-m-Y'),
            'employees' => $employees
        ];

        

        $pdf = Pdf::loadView('pdf', $data);
        return $pdf->stream('employee-list.pdf');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
