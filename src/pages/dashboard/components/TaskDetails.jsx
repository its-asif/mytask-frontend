import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/axios/useAxiosPublic";
import Swal from "sweetalert2";

const TaskDetails = ({id, toggle, setToggle }) => {
    const [taskData, setTaskData] = useState({});
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        (async () => {
            try{
                const response = await axiosPublic.get(`/tasks/${id}`);
                console.log(response.data[0]);
                setTaskData(response.data[0]);
            } catch (error){
                console.log(error);
            }
        })();
    }, [id, toggle]);


    const SubtaskStatus = async (taskId, subtaskId, status) => {
        console.log(taskId, subtaskId, status)
        try{
            const response = await axiosPublic.put(`/tasks/${taskId}/subtasks/${subtaskId}/done`, {status});
            console.log(response.data);

            // update the taskData
            const updatedTaskData = {...taskData};
            updatedTaskData.subtasks.tasks = updatedTaskData.subtasks.tasks.map(subtask => {
                if(subtask.id === subtaskId){
                    subtask.status = status;
                }
                return subtask;
            });
            setTaskData(updatedTaskData);

            setToggle(!toggle);

        } catch (error){
            console.log(error);
        }
    }

    const handleDelete = async () => {
        document.getElementById('my_modal_4').close();

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                try{
                    const response = await axiosPublic.delete(`/tasks/${id}`);
                    console.log(response.data);
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    );
                } catch (error){
                    console.log(error);
                }

                setToggle(!toggle);
            }
          });
    }

    const handleMarkCompleted = async () => {
        try{
            const response = await axiosPublic.patch(`/tasks/${id}/status`, {status: 'completed'});
            console.log(response.data);
            setToggle(!toggle);
        } catch (error){
            console.log(error);
        }
    }

    return (
        <div className="modal-box">
            <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg"> Task</h3>


            
            <div className="p-4 bg-white rounded-md shadow-md">

                <div className="flex justify-between">
                    <div>
                        {/* title & description */}
                        <h3 className="font-bold text-xl">{taskData.title}</h3>
                        <p className="text-sm">{taskData.description}</p>
                    </div>

                    {/* task status */}
                    <div>
                        <span className={`
                            font-semibold text-sm badge p-4
                            ${ taskData?.status == 'completed' || (taskData?.subtasks?.taskDone === taskData?.subtasks?.totalTask && taskData?.subtasks?.totalTask != 0 )? 'bg-green-200 text-green-700'
                            :taskData?.subtasks?.taskDone === 0 ? 'bg-red-200 text-red-700'
                            : 'bg-blue-200 text-blue-700 '}
                        `}>
                            {taskData?.status == 'completed' || (taskData?.subtasks?.taskDone === taskData?.subtasks?.totalTask && taskData?.subtasks?.totalTask != 0 )? 'Completed'
                            :taskData?.subtasks?.taskDone === 0 ? 'Pending'
                            : 'In Progress'}
                        </span>
                    </div>
                </div>
                {/* DueDate & Priority */}
                <div className="flex justify-between items-center mt-4">
                    <span>Due Date: <span className="text-sm">{taskData.dueDate}</span></span>
                    
                    <span> Priority : 
                    <span className="text-sm">
                        <span className={`
                            font-bold
                            ${taskData.priority === 'high' && 'text-red-500'}
                            ${taskData.priority === 'moderate' && 'text-yellow-500'}
                            ${taskData.priority === 'low' && 'text-green-500'}
                        `}>
                            {taskData.priority === 'high' && ' !!! High'}
                            {taskData.priority === 'moderate' && ' !! Moderate'}
                            {taskData.priority === 'low' && ' ! Low'}
                        </span>
                        </span>
                    </span>
                </div>

                {/* Tags */}
                <div className="flex items-center mt-4">
                    <span className="text-sm">Tags:  &nbsp; </span>
                    <div className="flex flex-wrap gap-2">
                        {taskData.tags && taskData.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-200 text-sm px-2 py-1 rounded-md">{tag}</span>
                        ))}
                    </div>
                </div>

                {/* SubTasks */}
                <div className="mt-4">
                    <h3 className="font-bold text-lg">Subtasks</h3>
                    <div className="flex flex-col gap-2">
                        {taskData.subtasks && taskData.subtasks.tasks.map((subtask, index) => (
                            <div key={index} className="flex items-center">
                                <input type="checkbox"
                                    onChange={(e) => SubtaskStatus(taskData._id, subtask.id, e.target.checked)}
                                    checked={subtask.status} />
                                <span className="ml-2">{subtask.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
            
            {/* edit & delete button */}
            <div className={`grid grid-cols-2 gap-x-1 mt-4 w-full 
                ${taskData?.status == 'completed' || (taskData?.subtasks?.taskDone === taskData?.subtasks?.totalTask && taskData?.subtasks?.totalTask != 0 )? 'grid-cols-1': 'grid-cols-2'}
            `}>
            { 
            !(taskData?.status == 'completed' || (taskData?.subtasks?.taskDone === taskData?.subtasks?.totalTask && taskData?.subtasks?.totalTask != 0 ))  && 
                <button 
                className="btn w-full btn-success text-white"
                onClick={handleMarkCompleted}
                >Mark as Completed</button>
            }
                <button 
                    className={`btn w-full btn-error text-white
                        ${taskData?.status == 'completed' || (taskData?.subtasks?.taskDone === taskData?.subtasks?.totalTask && taskData?.subtasks?.totalTask != 0 )? 'col-span-2': 'col-span-1'}
                    `}
                    onClick={handleDelete}
                >Delete</button>
            </div>
            
        </div>
    );
};

export default TaskDetails;