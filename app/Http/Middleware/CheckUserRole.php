<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // return $next($request);
        if (session('data')) {

        $user = session('data'); // Mengambil data user dari session

        if ($user->role == 'Pengepul') {
            return $next($request);
            
        }elseif ($user->role == 'produsen') {
              return redirect('/unauthorized');
           
        }

    }
        return $next($request);
    }
}
