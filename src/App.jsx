import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  function handleAddTodo(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteTodo(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleTogggleCheckBox(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }

  function handleReset() {
    setItems([]);
  }

  return (
    <div className="app">
      <Form onSubmitTodo={handleAddTodo} />
      <Todos
        items={items}
        onDeleteTodo={handleDeleteTodo}
        onCheck={handleTogggleCheckBox}
        onReset={handleReset}
      />
    </div>
  );
}

function Form({ onSubmitTodo }) {
  const [todo, setTodo] = useState("");

  function handleSubmitTodo(e) {
    e.preventDefault();

    if (!todo) return;

    const newTodo = { todo, id: Date.now(), done: false };

    onSubmitTodo(newTodo);

    setTodo("");
  }

  return (
    <form className="form" onSubmit={handleSubmitTodo}>
      <input
        type="text"
        placeholder="Add Todo.."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button>&#43;</button>
    </form>
  );
}

function Todos({ items, onDeleteTodo, onCheck, onReset }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  }

  if (sortBy === "checked") {
    sortedItems = items.slice().sort((a, b) => a.done - b.done);
  }

  return (
    <div>
      <ul>
        {sortedItems.map((item) => (
          <TodoItems
            item={item}
            key={item.id}
            onDeleteTodo={onDeleteTodo}
            onCheck={onCheck}
          />
        ))}
      </ul>

      <div className="footer">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by Input</option>
          <option value="checked">Sort by Checked</option>
        </select>

        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}

function TodoItems({ item, onDeleteTodo, onCheck }) {
  return (
    <li className="items">
      <input
        type="checkbox"
        value={item.done}
        onChange={() => onCheck(item.id)}
      />
      <p>{item.todo}</p>
      <button onClick={() => onDeleteTodo(item.id)}>❌</button>
    </li>
  );
}

export default App;
