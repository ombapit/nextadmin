<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }
    
    public function index(Request $request){
        $bodyContent = stripslashes($request->getContent());
        $body = json_decode($bodyContent);
        $filters = (array) $body->filter;
        $order = (array) $body->order;
        
        $query = User::query();
        
        //filter
        if (isset($filters[1][0])) {
            $query = $query->where('name', 'LIKE',"%{$filters[1][0]}%");
        }
        if (isset($filters[2][0])) {
            $query = $query->where('email', 'LIKE',"%{$filters[2][0]}%");
        }
        
        //order
        if (!empty($order)) {
            $query->orderBy($order['column'], $order['sort']);
        } else {
            $query->orderBy('created_at', 'desc');
        }
        
        $users = $query->paginate(10);
        return $users;
    }
    
    public function deleteBatch(Request $request)
    {
        $req = json_decode($request->getContent());
        //delete user
        User::destroy($req->param);
        
        $resp['success'] = true;
        $resp['msg'] = "Data Deleted";

        return json_encode($resp);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

}
