import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/axios/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import TaskDetails from "./TaskDetails";


const AllTasks = ({ toggle, setToggle }) => {
    const {user} = useAuth();
    const email = user?.email;
    const [tasks, setTasks] = useState([]);
    const axiosPublic = useAxiosPublic();
    const [taskId, setTaskId] = useState('');

    useEffect(() => {
        (async () => {
            try{
                const response = await axiosPublic.get(`/tasks/email/${email}`);
                console.log(response.data);
                setTasks(response.data);
            } catch (error){
                console.log(error);
            }
        })();
    }, [toggle]);

    const onTaskClick = (id) => {
        setTaskId(id);
        document.getElementById('my_modal_4').showModal();
    }



    return (
        <div>
            <dialog id="my_modal_4" className="modal">
                <TaskDetails id={taskId} toggle={toggle} setToggle={setToggle} />
            </dialog>
            
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map(task => (
                    <div key={task._id} 
                    onClick={() => onTaskClick(task._id)}
                    className="p-4 bg-white rounded-md shadow-md cursor-pointer hover:shadow-lg transition duration-300 ease-in-out">


                        <div className="flex justify-between">
                            <div>
                                {/* title & description */}
                                <h3 className="font-bold text-xl">{task.title}</h3>
                                <p className="text-sm">{task.description}</p>
                            </div>
                        
                            <div>
                                <span className={`
                                 font-semibold text-sm badge p-4
                                    ${ task?.status == 'completed' || (task?.subtasks.taskDone === task?.subtasks.totalTask && task?.subtasks?.totalTask != 0 ) ? 'bg-green-200 text-green-700'
                                    :task?.subtasks.taskDone === 0 ? 'bg-red-200 text-red-700'
                                    : 'bg-blue-200 text-blue-700 '}
                                `}>
                                    { task?.status == 'completed' || (task?.subtasks.taskDone === task?.subtasks.totalTask && task?.subtasks?.totalTask != 0 )  ? 'Completed'
                                    :task?.subtasks.taskDone === 0 ? 'Pending'
                                    : 'In Progress'}
                                </span>
                            </div>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex items-center mt-4">
                            <span className="text-sm">Tags:  &nbsp; </span>
                            <div className="flex flex-wrap gap-2">
                                {task.tags && task.tags.map((tag, index) => (
                                    <span key={index} className="bg-gray-200 text-sm px-2 py-1 rounded-md">{tag}</span>
                                ))}
                            </div>
                        </div>

                        {/* Due Date & Priority */}
                        <div className="flex justify-between items-center mt-4">
                            
                                <span className="text-sm">Last Date : {task.dueDate}</span>
                                
                            
                            <span className="text-sm">
                                    <span className={`
                                    font-bold
                                        ${task.priority === 'high' && 'text-red-500'}
                                        ${task.priority === 'moderate' && 'text-yellow-500'}
                                        ${task.priority === 'low' && 'text-green-500'}
                                    `}>
                                    {task.priority === 'high' && '!!! High'}
                                    {task.priority === 'moderate' && '!! Moderate'}
                                    {task.priority === 'low' && '! Low'}
                                    </span>
                            </span>
                        </div>


                    </div>
                ))}

            </div>
        </div>
    );
};

export default AllTasks;