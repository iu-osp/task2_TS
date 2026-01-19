import { useAtomValue } from 'jotai';
import { FC } from 'react';
import { useParams } from 'react-router';
import { tasksGlobal } from '../atoms/atoms';
import { Task } from '../types/types';
import { TaskItem } from './TaskItem';

export const TaskItemPage:FC = () => {

    const params = useParams();
    const tasks = useAtomValue(tasksGlobal);

    return(
        <>{tasks.map((task : Task,index:number) =>(
            index.toString() == params.id ?
                            <tr><td>{index+1}</td><TaskItem task = {task} id = {index}/></tr>
                            : <></>
                        ))}
        </>
    );
};
