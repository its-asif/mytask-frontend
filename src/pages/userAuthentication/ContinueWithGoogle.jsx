import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../../firebase/firebase.config";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { useContext } from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/axios/useAxiosPublic";




const ContinueWithGoogle = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const {setUser} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    
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
            .catch(error => {
                console.log(error);
            });

            setUser({displayName, photoURL, email});
            toast.success("Successfully Logged In")
            navigate( '/dashboard');
            // ...
        }).catch((error) => {
            console.log(error);
        }
        );
    }

    return (
        <div>
            <div className="text-center">
                <button 
                className="btn bg-blue-500 text-white font-bold text-xl"
                onClick={handleGoogleSignIn}
                >Continue with Google</button>
            </div>
        </div>
    );
};

export default ContinueWithGoogle;