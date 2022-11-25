import { useState, useEffect } from 'react';

const updateTodo = (title, description, id) => {
    const todo = { id, title, description }

    fetch('/api/todos', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
}

export default function TodoDialog(props) {
    const { title, description } = props.item;

    const [inputTitle, setInputTitle] = useState("")
    const [inputDescription, setInputDescription] = useState("")

    useEffect(() => {
        title ? setInputTitle(title) : setInputTitle("")
        description ? setInputDescription(description) : setInputDescription("")
    }, [title, description])

    return (
        <>
            {
                props.isOpen ?
                    <div className='todo-dialog'>
                        <div className='todo-dialog-toolbar'>
                            <div>{props.title}</div>
                            <div onClick={() => props.setIsOpen(false)} className='close'>X</div>
                        </div>
                        <div className="todo-dialog-body">
                            <input className='title-input' type="text" placeholder="Título" value={inputTitle} onChange={e => setInputTitle(e.target.value)} />
                            <textarea className='description-input' type="text" placeholder="Descrição" value={inputDescription} onChange={e => setInputDescription(e.target.value)} />
                            <div className="action-buttons">
                                <button onClick={() => {
                                    updateTodo(inputTitle, inputDescription, props.item.id)
                                    props.setIsOpen(false)
                                }}>Salvar</button>
                            </div>
                        </div>
                    </div> : <></>
            }
        </>
    )
}