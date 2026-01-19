import { FC } from 'react';
import {Task} from "../types/types";
import { useNavigate } from 'react-router';

type Props = {
    task: Task;
    id: number;
}

export const TaskItem:FC<Props> = ({task,id}) => {
    const to = useNavigate();

    return(
        <>
            <td onClick={() => {to(`/${id}`)}}>{task.description}</td><td>{task.status}</td><td>{task.priority}</td>
        </>
    );
};
