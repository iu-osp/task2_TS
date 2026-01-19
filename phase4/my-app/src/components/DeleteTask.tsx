import { useAtom } from 'jotai';
import { FC, useState } from 'react';
import { tasksGlobal } from '../atoms/atoms';
import { Link, NavLink, useNavigate } from 'react-router';



export const DeleteTask: FC = () =>{
    const [id,setId] = useState(0);
    const to = useNavigate();

    const [list, setList] = useAtom(tasksGlobal);

    const handleSubmit =(e:React.FormEvent) =>{
        e.preventDefault();
        setList(list.filter((element,i) => i!=id-1));
        to('/');
    }
    return (
        <form>
            <input type='number'onChange={(f)=>setId(Number(f.target.value))}/>
           <button onClick={handleSubmit}> Delete</button>

        </form>
    );
};