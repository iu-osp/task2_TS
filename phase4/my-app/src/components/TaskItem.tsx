import { FC } from 'react';
import {Task} from "../types/types";
import { useNavigate } from 'react-router';

type Props = {
    task: Task;
}

export const TaskItem:FC<Props> = ({task}) => {
    const to = useNavigate();

    return(
        <div onClick={() => {to(`/${task.id}`)}}>
            <td>{task.id}</td><td >{task.description}</td><td>{task.status}</td><td>{task.priority}</td>
        </div>
    );
};
