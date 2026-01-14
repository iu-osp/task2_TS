import { FC, useState, useEffect} from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { Task } from '../types/types';
import { TaskItem } from './TaskItem';
import { AddTask } from './AddTask';
import { DeleteTask } from './DeleteTask';

type Props = {
    proptasks:Task[];
}

export const TaskList:FC<Props> = ({proptasks}) => {

    const [tasks,setTasks] = useLocalStorage<Task[]>('tasks',proptasks);
    const [filter,setFilter] = useState('');

    // useEffect(() => {
    //     setTasks(proptasks);
    // }, [proptasks]);

    const handleAdd = (task:Task) =>{
        setTasks((cur : Task[]) => [...cur,task]);
    }

    const handleDelete = (id:number) =>{
        setTasks((cur : Task[]) => cur.filter((element,i) => i!=id));
    }



    return(
        <>
        <table><thead><tr><th>ID</th><th>Description</th><th>Status</th><th>Priority</th></tr></thead><tbody>
        {
            filter=='' ?
                tasks.map((task : Task,index:number) =>(
                    <tr><td>{index+1}</td><TaskItem task = {task}/></tr>
    
                )) :
                tasks.map((task : Task,index:number) =>(
                    task.status==filter?
                    <tr><td>{index+1}</td><TaskItem task = {task}/></tr>
                    : <></>
                ))
        }
        </tbody></table>
        <AddTask handleAdd={handleAdd}/>
        <DeleteTask handleDelete={handleDelete}/>
        <form>
            <input type='text'onChange={(f)=>setFilter(f.target.value)} placeholder='filter by status'/>
        </form>
        <code>{JSON.stringify({ tasks:tasks }, null, 2)}</code>
        </>
    );
};