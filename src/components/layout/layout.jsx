import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '..'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    return (
        <div className='bg-zinc-100 min-h-screen'>
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
            <Header />
            <main className='px-5 py-5 sm:px-10'>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout