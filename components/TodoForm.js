import { useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { mutate } from 'swr';

const postNewTodo = function (todo) {
    fetch('/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    })
}

const checkKeyPressed = function (event, callbackFunc) {
    if (event.defaultPrevented) return;
    let key = event.key || event.keyCode;
    if (key === 'Enter' || key === 13) callbackFunc();
}

export default function TodoForm() {

    const [title, setTitle] = useState("")

    const insertTodo = () => {
        postNewTodo({ title, description: '' }, mutate)
        setTitle("")
    }

    return (
        <>
        <div className='mt-4'>
            <InputGroup className='mb-3'>
                <Form.Control 
                value={title}
                onChange={e => setTitle(e.target.value)}
                onKeyUp={(e) => checkKeyPressed(e, () => insertTodo())}
                placeholder='O que você precisa fazer?' />
                <Button variant="success" onClick={() => insertTodo()}>Adicionar</Button>
            </InputGroup>
        </div>
        </>
    )
}