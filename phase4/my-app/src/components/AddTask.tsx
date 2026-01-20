import { FC, useState } from 'react';
import { Task, Status } from '../types/types';
import { tasksGlobal } from '../atoms/atoms';
import { useAtom } from 'jotai';
import { Link, useNavigate } from 'react-router';

export const AddTask: FC = () =>{
    const [description,setDesc] = useState('');
    const [status,setStatus] = useState('pending');
    const [priority,setPriority] = useState(0);
    const to = useNavigate();

    const [list, setList] = useAtom(tasksGlobal);

    const handleSubmit =(e:React.FormEvent) =>{
        e.preventDefault();
        let task:Task;
        const response = fetch('http://127.0.0.1:8000/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', },
            body: JSON.stringify({description,status,priority}),
        }).then((response)=>response.json())
        .then((taskData) =>{
            task = taskData;
            setList([...list,task]);
            to('/');
        });;

    }

    return (
        <form>
            <input type='text'onChange={(f)=>setDesc(f.target.value)}/>
            <input type='text'onChange={(f)=>setStatus(f.target.value)}/>
            <input type='number'onChange={(f)=>setPriority(Number(f.target.value))}/>
            <button onClick={handleSubmit}>Add</button>

        </form>
    );
};