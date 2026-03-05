<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Get All Users
    public function index()
    {

        // return response()->json(User::all());
        $users = User::orderBy('id', 'desc')->get();

        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create');
    }

    // Create User
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required | email',
            'password' => 'required'
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return redirect('/users');

        // return response()->json([
        //     'message' => 'User Created Successfully',
        //     'data' => $user
        // ]);
    }

    // Single User
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function edit($id)
    {
        return Inertia::render('Users/Edit', [
            'user' => User::findOrFail($id)
        ]);
    }

    // Update User
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return redirect('/users');

        // return response()->json([
        //     'message' => 'User Updated Successfully',
        //     'data' => $user
        // ]);
    }

    // Delete User
    public function destroy($id)
    {

        User::destroy($id);

        return redirect('/users');

        // return response()->json([
        //     'message' => 'User Deleted Successfully'
        // ]);
    }
}
