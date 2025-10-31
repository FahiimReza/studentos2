function TodoWidget() {
  try {
    const [todos, setTodos] = React.useState([
      { id: 1, text: 'Complete assignment', done: false },
      { id: 2, text: 'Study for exam', done: false },
      { id: 3, text: 'Group project meeting', done: true }
    ]);

    return (
      <div className="glass-effect rounded-2xl p-4" data-file="widgets/TodoWidget.js">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <div className="icon-check-circle text-lg"></div>
          To-Do List
        </h3>
        <div className="space-y-2">
          {todos.map(todo => (
            <div key={todo.id} className="flex items-center gap-2 p-2 bg-white/20 rounded-lg">
              <input type="checkbox" checked={todo.done} className="rounded" readOnly />
              <span className={`text-sm ${todo.done ? 'line-through opacity-50' : ''}`}>
                {todo.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('TodoWidget error:', error);
    return null;
  }
}