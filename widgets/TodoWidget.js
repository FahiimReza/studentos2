function TodoWidget() {
  try {
    const [todos, setTodos] = React.useState([
      { id: 1, text: 'Complete assignment', done: false },
      { id: 2, text: 'Study for exam', done: false },
      { id: 3, text: 'Group project meeting', done: true }
    ]);

    return (
      <div className="backdrop-blur-xl bg-white/20 dark:bg-black/30 rounded-3xl p-4 shadow-2xl border border-white/30 dark:border-white/20 transition-all hover:scale-105 hover:bg-white/30 dark:hover:bg-black/40" data-file="widgets/TodoWidget.js">
        <h3 className="font-semibold mb-3 flex items-center gap-2 text-white drop-shadow-lg">
          <div className="icon-check-circle text-lg"></div>
          To-Do List
        </h3>
        <div className="space-y-2">
          {todos.map(todo => (
            <div key={todo.id} className="flex items-center gap-2 p-2 bg-white/10 dark:bg-white/5 rounded-lg backdrop-blur-sm border border-white/20 dark:border-white/10">
              <input type="checkbox" checked={todo.done} className="rounded" readOnly />
              <span className={`text-sm ${todo.done ? 'line-through opacity-50' : ''} text-white drop-shadow`}>
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