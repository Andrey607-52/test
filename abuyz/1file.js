const ideaElement = document.getElementById("idea");
ideaElement.addEventListener("click", function() {
    console.log("Клик по Идеям");
    const allNotes = document.querySelectorAll('.zad > *');
    
    allNotes.forEach(note => {
        if (note.classList.contains("zad_item_idea")) {
            note.style.display = "block";
        } else if (!note.classList.contains('no-notes-message')) {
            note.style.display = "none";
        }
    });
});

// Код для "Все"
const allElement = document.getElementById('all');
allElement.addEventListener('click', function() {
    console.log('Клик по Все!');
    
    const allNotes = document.querySelectorAll('.zad > *');
    allNotes.forEach(note => {
        note.style.display = 'block';
    });
});

// Код для "личное"
const pElement = document.getElementById("p");
pElement.addEventListener("click", function(){
    const Allz = document.querySelectorAll(".zad > *");
    Allz.forEach(note => {
        if (note.classList.contains("zad_item_p")) {
            note.style.display = "block";
        } else if (!note.classList.contains('no-notes-message')) {
            note.style.display = "none";
        }
    });
});

// Код для "работа"
const WElement = document.getElementById("W");
WElement.addEventListener("click", function(){
    const Allz = document.querySelectorAll(".zad > *");
    Allz.forEach(note => {
        if (note.classList.contains("zad_item_W")) {
            note.style.display = "block";
        } else if (!note.classList.contains('no-notes-message')) {
            note.style.display = "none";
        }
    });
});

// Код для "Новая заметка"
const newNoteButton = document.querySelector('.menu_button');
newNoteButton.addEventListener('click', function() {
    console.log('Создание новой заметки');
    
    // Создаем новую заметку
    const newNote = document.createElement('div');
    newNote.className = 'zad_item';
    
    // Добавляем содержимое заметки
    newNote.innerHTML = 
        `<div class="info-line">
            <span class="title">Новая заметка</span>
            <span class="work">work</span>
        </div>
        <button class = "delete">Удалить</button>
        <div class="date">${getCurrentDate()}</div>
    `;
    
    // Добавляем заметку в начало списка
    document.querySelector('.zad').prepend(newNote);

    newNote.querySelector(".delete").addEventListener("click", function(){
        newNote.remove();
    });
});

// Функция для получения текущей даты
function getCurrentDate() {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return now.toLocaleDateString('ru-RU', options);
}

// Код для кнопок удаления
document.querySelectorAll('.delete').forEach(btn => {
    btn.addEventListener('click', function() {
        this.closest('[class^="zad_item"]').remove();
    });
});