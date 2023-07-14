<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use DataTables;

class SessionController extends Controller
{
    function index()
    {
        // return view('sesi/index');
        if (session('data')) {
                     return view('home');
        }
        // return view('login');
        return view('login');
    }

    function login(Request $request)
    {
        try {
            // lakukan aksi yang mungkin menimbulkan kesalahan, misalnya login user
            // $client = new Client(['base_uri' => 'https://wastemanagement.tubagusariq.repl.co/login']);
            $client = new Client(['base_uri' => 'https://wastemngmt.fdvsdeveloper.repl.co/login']);
            $response = $client->request('POST', 'login', [
                'form_params' => [
                    'email' => $request->email,
                    'password' => $request->password,
                ],
            ]);

            $statusCode = $response->getStatusCode();
            $body = $response->getBody()->getContents();
            $data = json_decode($body);
            session(['login_ok' => true, 'data' => $data]);

            return redirect('/home');
        } catch (\Exception $e) {
            return redirect('/login')->with('message', 'Email atau password salah');
        }
    }

    function logout(Request $request)
    {
        $request->session()->flush();
        return redirect('/login');
    }

    function kt(Request $request)
    {
        // echo "asdas";
        $client = new Client();
        // $response = $client->request('GET', 'https://wastemngmt.fdvsdeveloper.repl.co/waste');
        $response = $client->request('GET', 'https://wastemngmt.fdvsdeveloper.repl.co/user');
    
        $statusCode = $response->getStatusCode(); // Mendapatkan status code dari response
        $body = $response->getBody(); // Mendapatkan body respon
        $array = json_decode($body, true);
        // $halValue =$array['entries'];
        // echo "<pre>";print_r($array[0]);die;
        if($request->ajax()){
            return Datatables::of($array)->addIndexColumn()
            ->addColumn('action', function($array){
                $button = '<button type="button" name="edit" id="'.$array['_id'].'" class="edit btn btn-primary btn-sm"> <i class="bi bi-pencil-square"></i>Edit</button>';
                $button .= '   <button type="button" name="edit" id="$data->id" class="delete btn btn-danger btn-sm"> <i class="bi bi-backspace-reverse-fill"></i> Delete</button>';
                return $button;
            })->make(true);

        }



        // $client = new Client();
        // $response = $client->request('GET', 'https://wastemngmt.fdvsdeveloper.repl.co/waste');
    
        // $statusCode = $response->getStatusCode(); // Mendapatkan status code dari response
        // $body = $response->getBody(); // Mendapatkan body respon
        // $array = json_decode($body, true);
        // echo "<pre>";print_r($array);die;
        // echo "<pre>";echo $body;die;
        // return "Kt";
        return view('kt');
    }

    
}
