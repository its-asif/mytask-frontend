import usePageTitle from "../shared/usePageTitle";
import TaskSummary from "./components/TaskSummary";

const Dash = () => {
    usePageTitle('MyTask');

    return (
        <div>
            <TaskSummary />
        </div>
    );
};

export default Dash;