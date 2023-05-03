<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;

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
                session(['login_ok' => true,'data' => $data]);
                
                return redirect('/home');
            } catch (\Exception $e) {
                return redirect('/login')->with('message','Email atau pasword salah');
            }

    }

                    function logout(Request $request)
                    {
                        $request->session()->flush();
                        return redirect('/login');
                    }
                }
