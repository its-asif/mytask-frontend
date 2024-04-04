
import { Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import usePageTitle from '../pages/shared/usePageTitle';

const Dashboard = () => {
    usePageTitle('MyTask');
    const isAdmin = false;
    const {user, logOut} = useContext(AuthContext);
    const email = user?.email;


    const handleSignOut = () =>{
        logOut()
            .then()
            .catch()
    }

    return (
        <div className="flex h-screen">
            {/* left side bar */}
            <div className="flex flex-col justify-between border-e bg-base-200 left-0 top-0 bottom-0 w-fit">
                <div className="px-4 py-6 ">

                    <ul className="menu w-32 lg:w-56 rounded-box ">
                        <li>
                            <h2 className="menu-title font-bold text-gray-600">MyTask</h2>
                            <ul>        
                            {
                                isAdmin ?
                                <>
                                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                                    <li><Link to={'/dashboard/userList'} >All Users</Link></li>
                                    
                                </>
                                :
                                <>
                                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                                    <li><Link to={'/dashboard/tasks'}>Tasks</Link></li>
                                    
                                </>
                            }
                            </ul>
                        </li>
                    </ul>
                </div>


                 {/* user info */}
                <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 ">
                    <div className="flex flex-col md:flex-row items-center text-center gap-2 bg-base-200 p-4">
                    <img
                        alt="Man"
                        src={user?.photoURL || "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"}
                        className="h-10 w-10 rounded-full object-cover"
                    />

                    <div>
                        <p className="text-xs">
                        <strong className="block font-medium">{user?.displayName}</strong>

                        <span> {user?.email} </span>
                        </p> 
                    </div>
                    </div>


                    <div className='px-2 mb-2'>
                        <button className='btn btn-error text-white w-full' onClick={handleSignOut} >Logout</button>

                    </div>
                </div> 

            </div>

                
            {/* dashboard content */}
            <div className="flex-1 p-10 overflow-auto">
                    <Outlet></Outlet>
            </div>
        </div>

    );
};

export default Dashboard;