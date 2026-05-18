import Header from './Header'
import Footer from './Footer';
import { Outlet } from 'react-router'
import { useEffect } from 'react';
import { useAuth } from '../store/authStore';


function RootLayout() {
    return (
        <div>
            <Header />
            <div>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
export default RootLayout;