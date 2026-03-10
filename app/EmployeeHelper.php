<?php 

namespace App\Helpers;

class EmployeeHelper{

    // Latest employees with encrypted_id
    public static function encryptId($id)
    {
        return encrypt($id);
    }
   

    // Decrypt an encrypted id
    public static function decryptId($encryptedId)
    {
        return decrypt($encryptedId);
    }

}