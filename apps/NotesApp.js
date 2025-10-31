function NotesApp() {
  try {
    const [notes, setNotes] = React.useState([
      { id: 1, title: 'Lecture Notes', content: 'Key concepts from today...', date: '2025-10-30' },
      { id: 2, title: 'Assignment Ideas', content: 'Project brainstorming...', date: '2025-10-29' }
    ]);
    const [selectedNote, setSelectedNote] = React.useState(notes[0]);

    const handleTitleChange = (e) => {
      const updatedNote = { ...selectedNote, title: e.target.value };
      setSelectedNote(updatedNote);
      setNotes(notes.map(n => n.id === updatedNote.id ? updatedNote : n));
    };

    const handleContentChange = (e) => {
      const updatedNote = { ...selectedNote, content: e.target.value };
      setSelectedNote(updatedNote);
      setNotes(notes.map(n => n.id === updatedNote.id ? updatedNote : n));
    };

    return (
      <div className="flex h-full" data-file="apps/NotesApp.js">
        <div className="w-64 border-r border-white/10 p-4 overflow-auto">
          <button onClick={() => {
            if (typeof soundManager !== 'undefined') {
              soundManager.play('success');
            }
          }} className="w-full mb-4 px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90">
            <div className="icon-plus text-lg"></div>
          </button>
          <div className="space-y-2">
            {notes.map(note => (
              <div
                key={note.id}
                onClick={() => {
                  if (typeof soundManager !== 'undefined') {
                    soundManager.play('click');
                  }
                  setSelectedNote(note);
                }}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedNote.id === note.id ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                <div className="font-semibold text-sm">{note.title}</div>
                <div className="text-xs opacity-70 mt-1">{note.date}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 p-6">
          {selectedNote && (
            <div>
              <input
                type="text"
                value={selectedNote.title}
                onChange={handleTitleChange}
                className="text-2xl font-bold mb-4 w-full bg-transparent border-none outline-none"
                placeholder="Note title"
              />
              <textarea
                value={selectedNote.content}
                onChange={handleContentChange}
                className="w-full h-96 bg-transparent border-none outline-none resize-none"
                placeholder="Start writing..."
              />
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('NotesApp error:', error);
    return null;
  }
}
