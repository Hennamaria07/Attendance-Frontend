import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/lib/axiosIntance';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '@/hooks/useAuth';

const schema = yup.object().shape({
    email: yup.string().email('Email is not valid').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
    const navigate = useNavigate();
    const {login} = useAuth();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    });

    const togglePasswordVisibility = () => {
        setVisible(prevVisible => !prevVisible);
    };

    const onSubmit = (data) => {
        setLoading(true);
        console.log(data);
        axiosInstance.post('/api/v1/users/login', data, { withCredentials: true })
            .then(res => {
                // console.log(res.data.user);
                toast.success(res.data.message);
                login(res.data.user, res.data.token, res.data.isAuthenticated);
                setTimeout(() => navigate('/'), 1000);
                setLoading(false);
            }).catch(err => {
                toast.error(err.response.data.message || err);
                setLoading(false);
            })
    };

    return (
        <main className='py-40 w-screen grid place-items-center p-5'>
            <ToastContainer
                position='top-right'
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <form method='post' onSubmit={handleSubmit(onSubmit)} className='space-y-2 w-full sm:w-1/2 p-5 rounded-lg bg-white shadow-md'>
                <h1 className='text-3xl font-semibold text-center'>Login</h1>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type='email'
                        id='email'
                        {...register('email')}
                    />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <div className='relative'>
                        <Input
                            type={visible ? "text" : "password"}
                            id="password"
                            {...register('password')}
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-2"
                            onClick={togglePasswordVisibility}
                        >
                            {visible ? <Eye /> : <EyeOff />}
                        </button>
                    </div>
                    {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                </div>
                <div>
                    <Button type='submit' className='w-full px-4 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700' disabled={loading}>
                        {loading ? 'logging...' : 'login'}
                    </Button>
                </div>
                <p className="mt-2 text-right text-sm text-gray-600 pb-2">
                    Don't have an account?{' '}
                    <Link
                        to="/signup"
                        title=""
                        className="font-semibold text-black dark:text-white transition-all duration-200"
                    >
                        <span className='hover:underline hover:text-blue-500'>Sign up</span>
                    </Link>
                </p>
            </form>
        </main>
    );
};

export default Login;
