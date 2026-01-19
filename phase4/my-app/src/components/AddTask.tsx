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
        const task:Task = {description,status,priority};
        setList([...list,task]);
        to('/');
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