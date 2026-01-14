import { FC, useState } from 'react';
import { Task, Status } from '../types/types';

type Props ={
    handleAdd: (task:Task) => void;
};


export const AddTask: FC<Props> = ({handleAdd}) =>{
    const [description,setDesc] = useState('');
    const [status,setStatus] = useState('pending');
    const [priority,setPriority] = useState(0);

    const handleSubmit =(e:React.FormEvent) =>{
        e.preventDefault();
        const task:Task = {description,status,priority};
        handleAdd(task);
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