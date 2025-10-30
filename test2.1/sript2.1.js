document.addEventListener('DOMContentLoaded', () => {
  const newNoteButton = document.getElementById('new_note_button');
  const notesContainer = document.getElementById('notes_container');
  const tagsButtons = document.querySelectorAll('.tags_item');
  const searchInput = document.getElementById('note_input');
  const searchButton = document.getElementById('poisk1');
  const modalWindow = document.getElementById('modal_window');
  const modalNoteText = document.getElementById('modal_note_text');
  const saveNoteButton = document.getElementById('save_note_button');

  let notes = [];
  let currentTag = 'Все';

  // Предопределённые теги
  const tags = ['Все', 'Работа', 'Личное', 'Учеба'];

  // Переменная для редактируемой заметки
  let editingNoteId = null;

  // Обработчик открытия модального окна для добавления
  newNoteButton.addEventListener('click', () => {
    editingNoteId = null;
    modalNoteText.value = '';
    showModal();
  });

  // Обработчик сохранения заметки
  saveNoteButton.addEventListener('click', () => {
    const text = modalNoteText.value.trim();
    if (text === '') return;

    if (editingNoteId) {
      // редактирование
      const note = notes.find(n => n.id === editingNoteId);
      if (note) {
        note.text = text;
      }
    } else {
      // добавление новой
      const newNote = {
        id: Date.now(),
        text: text,
        tags: [currentTag]
      };
      notes.push(newNote);
    }
    hideModal();
    filterNotesByTag(currentTag);
  });

  // Обработчик фильтра по тегам
  tagsButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentTag = btn.textContent;
      filterNotesByTag(currentTag);
    });
  });

  // Обработчик поиска
  searchButton.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase();
    filterNotesBySearch(query);
  });

  // Функции для отображения/скрытия модального окна
  function showModal() {
    document.getElementById('modal_window').style.display = 'flex';
  }

  function hideModal() {
    document.getElementById('modal_window').style.display = 'none';
  }

  // Функция для рендеринга заметок
  function renderNotes(notesToRender) {
    notesContainer.innerHTML = '';
    notesToRender.forEach(note => {
      const noteDiv = document.createElement('div');
      noteDiv.className = 'note';

      // Текст заметки
      const noteText = document.createElement('div');
      noteText.textContent = note.text;
      noteDiv.appendChild(noteText);

      // Теги
      note.tags.forEach(tag => {
        const tagBadge = document.createElement('div');
        tagBadge.className = 'note_tag_badge';
        tagBadge.textContent = tag;
        noteDiv.appendChild(tagBadge);
      });

      // Обработчик клика для редактирования
      noteDiv.addEventListener('click', () => {
        editingNoteId = note.id;
        modalNoteText.value = note.text;
        showModal();
      });

      notesContainer.appendChild(noteDiv);
    });
  }

  // Фильтрация по тегу
  function filterNotesByTag(tag) {
    if (tag === 'Все') {
      renderNotes(notes);
    } else {
      const filtered = notes.filter(note => note.tags.includes(tag));
      renderNotes(filtered);
    }
  }

  // Поиск по тексту
  function filterNotesBySearch(query) {
    const filtered = notes.filter(note => note.text.toLowerCase().includes(query));
    renderNotes(filtered);
  }

  // Инициализация
  // Можно добавить стартовые заметки
  notes = [
    { id: 1, text: 'Купить продукты', tags: ['Личное'] },
    { id: 2, text: 'Подготовиться к экзамену', tags: ['Учеба'] },
    { id: 3, text: 'Позвонить клиенту', tags: ['Работа'] }
  ];

  // Отрисовать все заметки по умолчанию
  filterNotesByTag('Все');
});