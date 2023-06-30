import React, { ChangeEvent, FC, useState } from 'react';
import './App.css';

type Todo = {
  id: number;
  text: string;
  date: Date;
  priority: '高' | '中' | '低';
};

const TodoApp: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>("");

  const handleTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const handleTaskAdd = () => {
    setTodos([{id: Math.random(), text: task, date: new Date(), priority: '中'}, ...todos]);
    setTask("");
  };

  const handleTaskDelete = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handlePriorityChange = (index: number) => {
    const newTodos = [...todos];
    const priorities: ('高' | '中' | '低')[] = ['高', '中', '低'];
    const currentIndex = priorities.indexOf(newTodos[index].priority);
    newTodos[index].priority = priorities[(currentIndex + 1) % priorities.length];
    setTodos(newTodos);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newTodos = [...todos];
    const temp = newTodos[index - 1];
    newTodos[index - 1] = newTodos[index];
    newTodos[index] = temp;
    setTodos(newTodos);
  };

  const handleMoveDown = (index: number) => {
    if (index === todos.length - 1) return;
    const newTodos = [...todos];
    const temp = newTodos[index + 1];
    newTodos[index + 1] = newTodos[index];
    newTodos[index] = temp;
    setTodos(newTodos);
  };

  const handleEditTask = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newTodos = [...todos];
    newTodos[index].text = event.target.value;
    setTodos(newTodos);
  };

  return (
    <div className="app-container">
      <h1>Todoタスクアプリケーション</h1>
      <h3><p className='ExplanationColumn'>追加………タスクの内容を追加する<br></br>
      削除………タスクの内容を削除する<br></br>
      優先度……タスクの優先度を変更する<br></br>
      ↑↓…………タスクの位置を変更する<br></br></p></h3>
      <div className="input-container">
        <input className="task-input" value={task} onChange={handleTaskChange} placeholder="新しいタスクを入力してください" />
        <button className="task-add-button" onClick={handleTaskAdd}>追加</button>
      </div>
      <div className="output-container">
        {todos.map((todo, index) => (
          <div key={todo.id} className={`todo-item priority-${todo.priority}`}>
            <button className="delete-button" onClick={() => handleTaskDelete(index)}>削除</button>
            <button className="priority-button" onClick={() => handlePriorityChange(index)}>優先度: {todo.priority}</button>
            <button className="move-button" onClick={() => handleMoveUp(index)}>↑</button>
            <button className="move-button" onClick={() => handleMoveDown(index)}>↓</button>
            <span className="date">{todo.date.toLocaleDateString()}</span>
            <input className="task-text" value={todo.text} onChange={(event) => handleEditTask(index, event)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoApp;
