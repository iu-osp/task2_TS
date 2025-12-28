import { FC, useState } from 'react';

type Props ={
    handleDelete: (id:number) => void;
};


export const DeleteTask: FC<Props> = ({handleDelete}) =>{
    const [id,setId] = useState(0);

    const handleSubmit =(e:React.FormEvent) =>{
        e.preventDefault();
        handleDelete(id-1);
    }
    return (
        <form>
            <input type='number'onChange={(f)=>setId(Number(f.target.value))}/>
            <button onClick={handleSubmit}>Delete</button>

        </form>
    );
};