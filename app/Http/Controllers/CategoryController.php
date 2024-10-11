<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

use App\Models\Category;

class CategoryController extends Controller
{
    public function fetchCategory() {
        $bookCategories = Category::all()->map(function ($category) {
            return [
                'id' => Crypt::encryptString($category->id),
                'category_name' => $category->category_name,
            ];
        });

        $data = [
            "status" => 200,
            "categories" => $bookCategories
        ];
        
        return response()->json($data, 200);
    }

    public function show($encryptedId)
    {
        try {
            // Decrypt the ID
            $id = Crypt::decryptString($encryptedId);

            // Fetch the category by the decrypted ID
            $category = Category::findOrFail($id);

            return response()->json(['status' => 200, 'category' => $category]);
        } catch (\Exception $e) {
            // Handle the case where decryption fails or category is not found
            return response()->json(['status' => 404, 'message' => 'Category not found or invalid ID'], 404);
        }
    }
}
