import { useState } from "react";
import { useForm } from "react-hook-form"
import useAxiosPublic from "../../../hooks/axios/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

const TaskForm = ({ toggle, setToggle }) => {
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth(); 
    const email = user?.email;
    

    const { register, handleSubmit } = useForm();
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState('');
    const [subtaskName, setSubtaskName] = useState('');
    const [subtasks, setSubtasks] = useState({
        taskDone: 0,
        taskLeft: 0,
        totalTask: 0,
        tasks: []
    });
    const [errorMessages, setErrorMessages] = useState(""); 
    
    
    const addTag = () => {
        if (tag.length > 10) {
            setErrorMessages(["Tag must be less than 10 characters"]);
            return;
        }
        if (!/^[a-zA-Z0-9]*$/.test(tag)) {
            setErrorMessages(["Tag should not contain space and special characters"]);
            return;
        }
        if (tags.includes(tag.toLowerCase())) {
            setErrorMessages(["Tag already exists"]);
            return;
        }
        if(tags.length > 5) {
            setErrorMessages(["You can add maximum 5 tags"]);
            return;
        }
        setErrorMessages("");
        setTags([...tags, tag.toLowerCase()]);
        setTag('');
    }

    const removeTag = (index) => {
        setTags(tags.filter((tag, i) => i !== index));
    }
 
    const addSubtask = (e) => {
        e.preventDefault();
        setSubtasks({
            ...subtasks,
            tasks: [...subtasks.tasks, {title: subtaskName, status: false}]
        });
        setSubtaskName('');
    }

    const removeSubtask = (index) => {
        setSubtasks({
            ...subtasks,
            tasks: subtasks.tasks.filter((task, i) => i !== index)
        });
    }

    const handleSubtaskChange = (e, index) => {
        const { value } = e.target;
        setSubtasks({
            ...subtasks,
            tasks: subtasks.tasks.map((task, i) => i === index ? {title: value, status: task.status} : task)
        });
    }
    
    const onSubmit = (data) =>{
        
        document.getElementById('my_modal_3').close();

        const { taskTitle, taskDescription, dueDate, priority } = data;
        const filteredTags = tags.filter(tag => tag.trim() !== "");
  

        subtasks.totalTask = subtasks.tasks.length;
        subtasks.taskLeft = subtasks.tasks.length;

        // add id to all subtasks
        subtasks.tasks = subtasks.tasks.map((task, index) => {
            return {
                id: uuidv4(),
                title: task.title,
                status: task.status
            }
        });

        const taskData = {
            userEmail: email,
            title: taskTitle,
            description: taskDescription,
            dueDate: dueDate,
            priority: priority,
            tags: filteredTags,
            subtasks: subtasks
        }

        console.log(taskData)
        axiosPublic.post('/tasks', taskData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response);
            toast.success("Task added successfully");
            setToggle(!toggle);
        })
        .catch(error => {
            console.log(error);
            toast.error( error.response.data.message || "Task could not be added");
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-3">

            {/* Title */}
            <label className="form-control w-full max-w-xs ">
                <div className="label">
                    <span className="label-text">Task Title</span>
                </div>
                <input type="text" 
                    {...register("taskTitle", { required: true })}
                    placeholder="Task Title" 
                    className="input input-bordered w-full max-w-xs" />
            </label>

            {/* Description */}
            <label className="form-control w-full max-w-xs ">
                <div className="label">
                    <span className="label-text">Task Description</span>
                </div>
                <input type="text" 
                    {...register("taskDescription", { required: true })}
                    placeholder="Task Description" 
                    className="textarea textarea-bordered w-full max-w-xs" />
            </label>

            {/* Due Date */}
            <label className="form-control w-full max-w-xs ">
                <div className="label">
                    <span className="label-text">Due Date</span>
                </div>
                <input type="date" 
                    {...register("dueDate", { required: true })}
                    // placeholder="Last Date" 
                    className="input input-bordered w-full max-w-xs" />
            </label>

            {/* Priority */}
            <label className="form-control w-full max-w-xs ">
                <div className="label">
                    <span className="label-text">Priority</span>
                </div>
                <select 
                    {...register("priority", { required: true })} 
                    defaultValue="Choose priority"
                    className={`select select-bordered`}
                >
                    <option value="Choose priority" disabled>Choose priority</option>
                    <option value="high" className="text-red-600">!!! High</option>
                    <option value="moderate" className="text-orange-600">!! Moderate</option>
                    <option value="low" className="text-blue-600">! Low</option>
                </select>
            </label>

            {/* Tags */}
            <label className="form-control w-full max-w-xs ">
                <div className="label">
                    <span className="label-text">Add Tags</span>
                </div>
                <div className="flex items-center join">
                    <input type="text" 
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        placeholder="Add Tags" 
                        className="input input-bordered w-full max-w-xs join-item border-slate-200" />
                    <button  type="button" onClick={addTag} className="btn join-item border-slate-200">Add</button>
                </div>
                <div className="mt-2">
                    {tags.map((tag, index) => (
                        <span key={index} className="tag">
                            {tag}
                            <button 
                            type="button"
                            onClick={() => removeTag(index)} 
                            className="btn btn-xs btn-circle btn-ghost">✕</button>
                        </span>
                    ))}
                </div>
                <div className="label">
                    <span className="label-text text-red-600">{errorMessages}</span>
                </div>
            </label>


            {/* Subtasks */}
            <label className="form-control w-full max-w-xs ">
                <div className="label">
                    <span className="label-text">Add Subtasks</span>
                </div>
                <div className="flex items-center join">
                    <input type="text" 
                        value={subtaskName}
                        onChange={(e) => setSubtaskName(e.target.value)}
                        placeholder="Add Subtask" 
                        className="input input-bordered w-full max-w-xs join-item border-slate-200" />
                    <button 
                    type="button"
                    onClick={addSubtask} 
                    className="btn btn-md join-item border-slate-200">Add</button>
                </div>
                <div className="mt-2">
                    {subtasks.tasks.map((task, index) => (
                        <div key={index} className="flex items-center">
                            <input type="text" 
                                value={task.title}
                                onChange={(e) => handleSubtaskChange(e, index)}
                                placeholder="Add Subtask" 
                                className="input input-bordered w-full max-w-xs" />
                            <button 
                            type="button"
                            onClick={() => removeSubtask(index)} 
                            className="btn btn-xs btn-circle btn-ghost">✕</button>
                        </div>
                    ))}
                </div>
            </label>


            <button type="submit" className="btn btn-primary col-span-2">Add Task</button>
        </form>
    );
};

export default TaskForm;
