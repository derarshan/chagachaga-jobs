import Header from '@/components/header';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
    return (
        <div>

            <div className="grid-background"></div>

            <main className="min-h-screen max-w-11/12 mx-auto">
                <Header />
                <Outlet />
            </main>


            <div className="p-10 text-center bg-gray-800 mt-10">
                Made With Purpose by Aeshan
            </div>
        </div>
    );
};

export default AppLayout;
