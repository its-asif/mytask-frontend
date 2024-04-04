import { Link } from 'react-router-dom';
// import img from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { Toaster, toast } from 'react-hot-toast';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import app from '../../firebase/firebase.config';
import usePageTitle from '../shared/usePageTitle';
import useAxiosPublic from '../../hooks/axios/useAxiosPublic';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    usePageTitle('MyTask');
    const { createUser, setUser } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic(); 
    
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    
    
    const handleGoogleSignIn = () =>{
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            const {displayName, photoURL, email} = user;
            const createdAt = user?.metadata?.creationTime;
            const newUser = { name : displayName , photoURL ,email, createdAt : createdAt};
            // fetch('http://localhost:3000/api/users', {
            //     method: 'POST',
            //     headers:{
            //         'content-type': 'application/json'
            //     },
            //     body: JSON.stringify(newUser)
            // })
            //     .then(res => res.json())
            //     .then(data => {
            //         console.log(data);
            //     }
            //     )

            
            axiosPublic.post('/users', newUser)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })

            setUser({displayName, photoURL, email});
            toast.success("Successfully Logged In")
            // ...
        }).catch((error) => {
            console.log(error);
        }
        );
    }



    const handleRegister = async(e) =>{
        e.preventDefault();

        const form = new FormData(e.currentTarget);


        // console.log(form.get('photoURL'));
        const imageFile = {image : form.get('photoURL')};
        const res = await axiosPublic.post(image_hosting_api, imageFile,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log(res);
        // e.photoURL = res.data.data.url;

        
        const name = form.get('name');
        const photo = res.data.data.url;
        const email = form.get('email');
        const password = form.get('password');
        console.log(name, photo, email, password);

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{6,})$/;
        if (!passwordRegex.test(password)) {
            toast.error("Password must contain at least 6 characters, 1 capital letter, and 1 special character.")
            // You can display an error message to the user
            return;
        }

        // create user
        createUser(email,password, name, photo)
            .then(res => {
                toast.success("Successfully Registered")

                
                const createdAt = res.user?.metadata?.creationTime;
                const user = { name, photoURL, email, createdAt : createdAt};
                // fetch('http://localhost:3000/api/users',{
                //     method : 'POST',
                //     headers: {
                //         'content-type' : 'application/json'
                //     },
                //     body: JSON.stringify(user)


                // })
                //     .then(result => result.json())
                //     .then(data =>{
                //         console.log(data);
                //     })

                axiosPublic.post('/users', user)
                .then(response => {
                    console.log(response);
                })
                .catch(err => {
                    console.log(err);
                })

                navigate( '/dashboard');
            })  
            .catch( err => console.log(err));

            // const auth = getAuth();
            // console.log("hello", auth.currentUser);

        
    }

    return (
        <div>
            <Toaster/>

            <div>
                <h2 className="text-4xl my-10 font-bold text-center">Please Register</h2>
                <form className="w-3/4 md:w-1/2 lg:w-1/3 mx-auto" onSubmit={handleRegister}>

                    {/* Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                    </div>

                    {/* Photo */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="file"  name="photoURL" className="file-input w-full max-w-xs"  required/>
                    </div>

                    {/* Email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                    </div>

                    {/* Password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="Password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>

                    {/* button */}
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Register</button>
                    </div>
                </form>

                <p className="text-center mt-4">Already have an account? <Link className="text-blue-600" to="/login">Login</Link></p>
            </div>

            <div>
            <div className="divider">OR</div>


            {/* Continue with google */}
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



export default Register;