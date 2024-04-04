import axios from "axios";

const axiosPublic = axios.create({
    // baseURL: 'http://localhost:3000/api/',
    baseURL: 'https://my-task-backend.vercel.app/api/',
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;