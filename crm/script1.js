let clients = [];
let filteredClients = [];

const STORAGE_KEY = 'crm_clients';

// Загружаем клиентов из localStorage при старте
window.onload = () => {
  const storedClients = localStorage.getItem(STORAGE_KEY);
  if (storedClients) {
    clients = JSON.parse(storedClients);
  }
  renderClients();
};

// Добавление клиента
function addClient() {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!name || !phone || !email) {
    alert('Пожалуйста, заполните все поля.');
    return;
  }

  const newClient = {
    id: Date.now(),
    name,
    phone,
    email
  };

  clients.push(newClient);
  saveClients();
  renderClients();

  // Очистить поля
  document.getElementById('name').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('email').value = '';
}

// Сохранение в localStorage
function saveClients() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
}

// Рендер клиентов
function renderClients() {
  const tbody = document.getElementById('clientsBody');
  tbody.innerHTML = '';

  const listToRender = filteredClients.length !== 0 || document.getElementById('search').value ? filteredClients : clients;

  listToRender.forEach(client => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${client.id}</td>
      <td>${client.name}</td>
      <td>${client.phone}</td>
      <td>${client.email}</td>
      <td class="actions">
        <button class="edit" onclick="editClient(${client.id})">Редактировать</button>
        <button class="delete" onclick="deleteClient(${client.id})">Удалить</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Поиск по имени
function searchClients() {
  const query = document.getElementById('search').value.toLowerCase();
  filteredClients = clients.filter(c => c.name.toLowerCase().includes(query));
  renderClients();
}

// Удаление клиента
function deleteClient(id) {
  clients = clients.filter(c => c.id !== id);
  saveClients();
  searchClients();
}

// Редактирование клиента (простой пример)
function editClient(id) {
  const client = clients.find(c => c.id === id);
  if (!client) return;

  const newName = prompt('Редактировать имя:', client.name);
  const newPhone = prompt('Редактировать телефон:', client.phone);
  const newEmail = prompt('Редактировать email:', client.email);

  if (newName !== null && newPhone !== null && newEmail !== null) {
    client.name = newName.trim() || client.name;
    client.phone = newPhone.trim() || client.phone;
    client.email = newEmail.trim() || client.email;
    saveClients();
    searchClients();
  }
}