import { FC } from 'react';
import {Task} from "../types/types";

type Props = {
    task: Task;
}

export const TaskItem:FC<Props> = ({task}) => {

    return(
        <>
            <td>{task.description}</td><td>{task.status}</td><td>{task.priority}</td>
        </>
    );
};
