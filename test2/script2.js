const tags = [
      { id: 1, title: 'Все' },
      { id: 2, title: 'Идеи' },
      { id: 3, title: 'Личное' },
      { id: 4, title: 'Работа' },
    ];

    const notes = [];
    let activeTag = 1;

    const noteInput = document.getElementById('note_input');
    const searchButton = document.getElementById('search_button');
    const newNoteButton = document.getElementById('new_note_button');
    const notesContainer = document.getElementById('notes_container');
    const tagsContainer = document.getElementById('tags_container');
    const modalWindow = document.getElementById('modal_window');
    const modalInput = document.getElementById('modal_input');
    const modalDropdown = document.getElementById('modal_dropdown');
    const modalButton = document.getElementById('modal_button');

    function createNoteElement(note) {
      const el = document.createElement('div');
      el.className = 'note';

      const tagEl = document.createElement('div');
      tagEl.className = 'note_tag_badge';
      tagEl.textContent = tags.find(t => t.id === note.tag)?.title || '—';

      const titleEl = document.createElement('div');
      titleEl.className = 'note_title';
      titleEl.textContent = note.title;

      const dateEl = document.createElement('div');
      dateEl.className = 'note_date';
      dateEl.textContent = note.updateAt;

      el.append(tagEl, titleEl, dateEl);
      return el;
    }

    function renderNotes() {
      const searchTerm = noteInput.value.trim().toLowerCase();
      let filtered = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm)
      );

      if (activeTag !== 1) {
        filtered = filtered.filter(note => note.tag === activeTag);
      }

      notesContainer.innerHTML = '';
      if (filtered.length === 0) {
        notesContainer.textContent = 'Ничего не найдено';
        return;
      }

      filtered.forEach(note => {
        notesContainer.appendChild(createNoteElement(note));
      });
    }

    function renderTags() {
      tagsContainer.innerHTML = '<span class="title_tags">Теги</span>';
      tags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'tags_item';
        btn.textContent = tag.title;
        btn.addEventListener('click', () => {
          activeTag = tag.id;
          renderNotes();
        });
        tagsContainer.appendChild(btn);
      });
    }

    function addNote() {
      const title = modalInput.value.trim();
      if (!title) return;

      notes.push({
        id: notes.length + 1,
        title,
        tag: Number(modalDropdown.value),
        updateAt: new Date().toDateString()
      });

      modalWindow.style.display = 'none';
      modalInput.value = '';
      renderNotes();
    }

    // Инициализация
    renderTags();
    renderNotes();

    // Обработчики
    newNoteButton.addEventListener('click', () => {
      modalInput.value = '';
      modalDropdown.value = '1';
      modalWindow.style.display = 'flex';
    });

    modalButton.addEventListener('click', addNote);

    searchButton.addEventListener('click', renderNotes);

    noteInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') renderNotes();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') modalWindow.style.display = 'none';
    });