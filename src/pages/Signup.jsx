import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { axiosInstance } from '@/lib/axiosIntance';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '@/hooks/useAuth';

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Email is not valid').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
});

const Signup = () => {
    const {signup} = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
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

    const toggleConfirmPasswordVisibility = () => {
        setConfirmVisible(prevVisible => !prevVisible);
    };

    const onSubmit = (data) => {
        setLoading(true);
        // Handle form submission here
        axiosInstance.post('/api/v1/users/signup', data, {withCredentials: true})
        .then(res => {
            toast.success(res.data.message);
            signup(res.data.user, res.data.token, res.data.isAuthenticated);
            setTimeout(() => navigate('/'), 1000);
            setLoading(false);
        }).catch(err => {
            console.error(err.response.data.message || err);
            setLoading(false);
        })
    };

    return (
        <main className='h-screen w-screen grid place-items-center p-5'>
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
                <h1 className='text-3xl font-semibold text-center'>Sign Up</h1>
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        type='text'
                        id='name'
                        {...register('name')}
                    />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
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
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className='relative'>
                        <Input
                            type={confirmVisible ? "text" : "password"}
                            id='confirmPassword'
                            {...register('confirmPassword')}
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-2"
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {confirmVisible ? <Eye /> : <EyeOff />}
                        </button>
                    </div>
                    {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
                </div>
                <div>
                    <Button type='submit' className='w-full px-4 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700' disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </Button>
                </div>
                <p className="mt-2 text-right text-sm text-gray-600 pb-2">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    title=""
                                    className="font-semibold text-black dark:text-white transition-all duration-200"
                                >
                                    <span className='hover:underline hover:text-blue-500'>Log in</span>
                                </Link>
                            </p>
            </form>
        </main>
    );
};

export default Signup;
