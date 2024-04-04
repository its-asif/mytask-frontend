import React from 'react';
import ContinueWithGoogle from './userAuthentication/ContinueWithGoogle';
import useAuth from '../hooks/useAuth';
import usePageTitle from './shared/usePageTitle';

const Home = () => {
    usePageTitle('MyTask');
    

    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 ">
          <div className="flex flex-col justify-between lg:flex-row mx-10">
            <div className="mb-12 lg:max-w-lg lg:pr-5 lg:mb-0 flex items-center ">
              <div className="max-w-xl mb-6 ">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                  Welcome to <br/> Task Management
                </h2>
                <p className="text-base text-gray-700 md:text-lg">
                  Manage your tasks efficiently with our Task Management application. Stay organized, set deadlines, and achieve more.
                </p>
              </div>


            </div>
            <div className="px-5 pt-6 pb-5 text-center border border-gray-300 rounded lg:w-2/5">
              <div className="mb-5 font-semibold">Create an Account</div>
              <div className="flex justify-center w-full mb-3">
                <ContinueWithGoogle/>
              </div>
              <p className="max-w-md px-5 mb-3 text-xs text-gray-600 sm:text-sm md:mb-5">
                Sign up to start managing your tasks more efficiently.
              </p>
              <div className="flex items-center w-full mb-5">
                <hr className="flex-1 border-gray-300" />
                <div className="px-3 text-xs text-gray-500 sm:text-sm">or</div>
                <hr className="flex-1 border-gray-300" />
              </div>
              <a
                href="/register"
                className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold transition duration-200 bg-white border border-gray-300 rounded md:w-auto hover:bg-gray-100 focus:shadow-outline focus:outline-none"
              >
                Sign Up with Email
              </a>
            </div>
          </div>
        </div>
      );
};

export default Home;