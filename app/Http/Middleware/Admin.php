<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;
use Symfony\Component\HttpFoundation\Response;


class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        if (!session('login_ok')) {
           return redirect('/');
        }

        $user = session('data');
        //role user yg ngak boleh login
        if ($user->role == 'produsen') {
            return redirect('/login')->with('message', 'Email atau password salah');
        }

        return $next($request);
    }
}
