import { FC, useState, useEffect} from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { Task } from '../types/types';
import { TaskItem } from './TaskItem';
import { AddTask } from './AddTask';
import { DeleteTask } from './DeleteTask';

import { useAtomValue, useSetAtom, useAtom } from 'jotai';
import { tasksGlobal, filterGlobal } from '../atoms/atoms';
import { Link} from 'react-router';



export const TaskList:FC = () => {
    
    const tasks = useAtomValue(tasksGlobal);
    const [filter, setFilter] = useAtom(filterGlobal);


    return(
        <>
        <table><thead><tr><th>ID</th><th>Description</th><th>Status</th><th>Priority</th></tr></thead><tbody>
        {
            filter=='' ?
                tasks.map((task : Task,index:number) =>(
                    <tr><td>{index+1}</td><TaskItem task = {task} id = {index}/></tr>
    
                )) :
                tasks.map((task : Task,index:number) =>(
                    task.status==filter?
                    <tr><td>{index+1}</td><TaskItem task = {task} id = {index}/></tr>
                    : <></>
                ))
        }
        </tbody></table>
        <Link to="/addT">ADD</Link><br></br>
        <Link to="/deleteT">DELETE</Link>
        {/* <AddTask/>
        <DeleteTask/> */}
        <form>
            <input type='text'onChange={(f)=>setFilter(f.target.value)} placeholder='filter by status'/>
        </form>
        <code>{JSON.stringify({ tasks:tasks }, null, 2)}</code>
        </>
    );
};