<!DOCTYPE html>
<html>

<head>
    <title>Employee PDF</title>
    <style>
        body {
            font-family: sans-serif;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            border: 1px solid #000;
            padding: 8px;
        }
    </style>
</head>

<body>
    <h2>{{ $employee->name }}, Employee Details</h2>
    <table>
        <tr>
            <th>Name</th>
            <td>{{ $employee->name }}</td>
        </tr>
        <tr>
            <th>Email</th>
            <td>{{ $employee->email }}</td>
        </tr>
        <tr>
            <th>Gender</th>
            <td>{{ $employee->gender }}</td>
        </tr>
        <tr>
            <th>Phone</th>
            <td>{{ $employee->phone }}</td>
        </tr>
        <tr>
            <th>Aadhaar</th>
            <td>{{ $employee->aadhaar }}</td>
        </tr>
        <tr>
            <th>Created At</th>
            <td>{{ $employee->created_at->format('d M Y, h:i A') }}</td>
        </tr>
        <tr>
            <th>Updated At</th>
            <td>{{ $employee->updated_at->format('d M Y, h:i A') }}</td>
        </tr>
    </table>
</body>

</html>