import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import app from "../../firebase/firebase.config";
import usePageTitle from "../shared/usePageTitle";

const Login = () => {
    usePageTitle('MyTask');
    const {signIn} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    // if user was redirected to this page from Single Job page with :id, show a toast message "You have to log in first to view details"
    if(location?.state){
        console.log(location.state);
        toast.error("You have to log in first to view details");
    }

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const handleGoogleSignIn = () =>{
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            const {displayName, photoURL, email} = user;
            const createdAt = user?.metadata?.creationTime;
            const newUser = { name : displayName , photoURL ,email, createdAt : createdAt};
            fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                }
                )
            setUser({displayName, photoURL, email});
            toast.success("Successfully Logged In")
            // ...
        }).catch((error) => {
            console.log(error);
        }
        );
    }

    const handleLogin = e =>{
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        const email = form.get('email');
        const password = form.get('password');
        // console.log(email, password);



        signIn(email, password)
            .then((result) => {
                toast.success("Successfully logged in")
                
                // navigate after login
                navigate( location?.state ? location.state : '/');
            })
            .catch((error) => toast.error("Email or Password didn't matched"));
    }

    return (
        <div className="min-h-[60vh]">
        <Toaster/>
            <div>
                <h2 className="text-4xl my-10 font-bold text-center">Please Login</h2>
                <form className="w-3/4 md:w-1/2 lg:w-1/3 mx-auto" onSubmit={handleLogin}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="Password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
                <p className="text-center mt-4">Don't have an account? <Link className="text-blue-600" to="/register">Register</Link></p>
            </div>
            <div>
            <div className="divider ">OR</div>

                <div className="text-center">
                    <button 
                    className="btn bg-blue-500 text-white font-bold text-xl"
                    onClick={handleGoogleSignIn}
                    >Continue with Google</button>
                </div>
            </div>
        </div>
    );
};



export default Login;
