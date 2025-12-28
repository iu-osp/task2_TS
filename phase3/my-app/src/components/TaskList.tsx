import { FC, useState, useEffect} from 'react';
import { Task } from '../types/types';
import { TaskItem } from './TaskItem';
import { AddTask } from './AddTask';
import { DeleteTask } from './DeleteTask';

type Props = {
    proptasks:Task[];
}

export const TaskList:FC<Props> = ({proptasks}) => {

    const [tasks,setTasks] = useState<Task[]>(proptasks);
    const [filter,setFilter] = useState('');

    useEffect(() => {
        setTasks(proptasks);
    }, [proptasks]);

    const handleAdd = (task:Task) =>{
        setTasks(cur => [...cur,task]);
    }

    const handleDelete = (id:number) =>{
        setTasks(cur => cur.filter((element,i) => i!=id));
    }



    return(
        <>
        <table><thead><tr><th>ID</th><th>Description</th><th>Status</th><th>Priority</th></tr></thead><tbody>
        {
            filter=='' ?
                tasks.map((task,index) =>(
                    <tr><td>{index+1}</td><TaskItem task = {task}/></tr>
    
                )) :
                tasks.map((task,index) =>(
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