import { LogOut } from 'lucide-react';
import React from 'react';
import useAuth from '@/hooks/useAuth';
import { axiosInstance } from '@/lib/axiosIntance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const {logout} = useAuth();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();
    const handleLogout = () => {
       axiosInstance.post('/api/v1/users/logout', null, {withCredentials: true})
       .then(res => {
        logout();
        setTimeout(() => navigate('/login'), 0);
       }).catch(err => {
        toast.error(err.response.data.message || err);
       })
    }
    return (
        <header className='bg-white dark:bg-zinc-900 px-4 py-3 flex justify-between'>
            <div className='flex items-center text-lg '>
                <span className='font-semibold text-blue-600'>Clockie</span>
            </div>
            <div className='flex items-center gap-x-5'>
                <p>{user?.name}</p>
                <LogOut className='w-6 h-6 cursor-pointer' onClick={handleLogout}/>
            </div>
        </header>
    )
}

export default Header;