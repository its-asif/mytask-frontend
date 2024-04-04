import { useState } from "react";
import usePageTitle from "../shared/usePageTitle";
import TaskForm from "./components/TaskForm";
import { Toaster } from "react-hot-toast";
import AllTasks from "./components/AllTasks";
import TaskSummary from "./components/TaskSummary";

const Tasks = () => {
    usePageTitle('MyTask');
    const [toggle, setToggle] = useState(false);

    return (
        <div>
            <Toaster />

            {/* <TaskSummary /> */}

            
            {/* Modal */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Add Task</h3>


                    <TaskForm  toggle={toggle} setToggle={setToggle} />

                    {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
                </div>
            </dialog>

            {/* Task Section */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold text-xl my-10">Tasks</h1>
                
                <button 
                className="btn text-white bg-blue-600" 
                onClick={()=>document.getElementById('my_modal_3').showModal()}
                > + Create Tasks</button>
            </div>



            {/* Tasks */}
            <AllTasks  toggle={toggle} setToggle={setToggle} />

        </div>
    );
};

export default Tasks;