// Классы и функции CRM

class Client {
  constructor(id, name, email, phone) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.notes = [];
  }
  addNote(note) {
    this.notes.push({ date: new Date(), note });
  }
}

class Deal {
  constructor(id, clientId, title, value, stage = 'lead') {
    this.id = id;
    this.clientId = clientId;
    this.title = title;
    this.value = value;
    this.stage = stage;
    this.createdAt = new Date();
  }
  updateStage(newStage) {
    this.stage = newStage;
  }
}

class Task {
  constructor(id, title, description, assignedTo, dueDate) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.assignedTo = assignedTo;
    this.dueDate = dueDate;
    this.completed = false;
  }
  markComplete() {
    this.completed = true;
  }
}

class CRM {
  constructor() {
    this.clients = [];
    this.deals = [];
    this.tasks = [];
    this.nextClientId = 1;
    this.nextDealId = 1;
    this.nextTaskId = 1;
  }

  addClient(name, email, phone) {
    const client = new Client(this.nextClientId++, name, email, phone);
    this.clients.push(client);
    return client;
  }

  addDeal(clientId, title, value, stage='lead') {
    const deal = new Deal(this.nextDealId++, clientId, title, value, stage);
    this.deals.push(deal);
    return deal;
  }

  addTask(title, description, assignedTo, dueDate) {
    const task = new Task(this.nextTaskId++, title, description, assignedTo, dueDate);
    this.tasks.push(task);
    return task;
  }

  getClientById(id) {
    return this.clients.find(c => c.id === id);
  }

  getDealsByClientId(clientId) {
    return this.deals.filter(d => d.clientId === clientId);
  }

  getDeals() {
    return this.deals;
  }

  getTasksByAssignee(assignee) {
    return this.tasks.filter(t => t.assignedTo === assignee);
  }

  updateDealStage(dealId, newStage) {
    const deal = this.deals.find(d => d.id === dealId);
    if (deal) {
      deal.updateStage(newStage);
    }
  }

  completeTask(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.markComplete();
    }
  }
}

// UI логика
class CRMUI {
  constructor(crm) {
    this.crm = crm;
    this.appContainer = document.getElementById('app');
    this.render();
  }

  render() {
    this.appContainer.innerHTML = '';

    // Заголовок
    const header = document.createElement('div');
    header.innerText = 'Объемная CRM-система';
    header.style.fontSize = '24px';
    header.style.fontWeight = 'bold';
    header.style.marginBottom = '20px';
    header.style.textAlign = 'center';

    this.appContainer.appendChild(header);

    // Кнопки добавления
    this.createButtons();

    // Разделы
    this.renderClients();
    this.renderDeals();
    this.renderTasks();
  }

  createButtons() {
    const btnAddClient = this.createButton('Добавить клиента', () => this.showAddClientForm());
    const btnAddDeal = this.createButton('Добавить сделку', () => this.showAddDealForm());
    const btnAddTask = this.createButton('Добавить задачу', () => this.showAddTaskForm());
    this.appContainer.appendChild(btnAddClient);
    this.appContainer.appendChild(btnAddDeal);
    this.appContainer.appendChild(btnAddTask);
  }

  createButton(text, onClick) {
    const btn = document.createElement('button');
    btn.innerText = text;
    btn.onclick = onClick;
    return btn;
  }

  renderClients() {
    const title = document.createElement('h2');
    title.innerText = 'Клиенты';
    this.appContainer.appendChild(title);

    const list = document.createElement('ul');
    this.crm.clients.forEach(client => {
      const deals = this.crm.getDealsByClientId(client.id);
      const item = document.createElement('li');
      item.innerHTML = `
        <strong>${client.name}</strong> (${client.email}, ${client.phone})
        <button style="margin-left:10px;" onclick="alert('Заметки: ${client.notes.map(n => n.note).join('; ')}')">Заметки</button>
        <button style="margin-left:10px;" onclick="ui.renderClientDeals(${client.id})">Сделки клиента</button>
      `;
      list.appendChild(item);
    });
    this.appContainer.appendChild(list);
  }

  renderDeals() {
    const title = document.createElement('h2');
    title.innerText = 'Все сделки';
    this.appContainer.appendChild(title);

    const list = document.createElement('ul');
    this.crm.deals.forEach(deal => {
      const client = this.crm.getClientById(deal.clientId);
      const item = document.createElement('li');
      item.innerHTML = `
        <strong>${deal.title}</strong> - ${deal.stage} (${deal.value}$)
        <br/>Клиент: ${client ? client.name : 'Не найден'}
        <button style="margin-left:10px;" onclick="ui.promptUpdateDealStage(${deal.id})">Обновить стадию</button>
      `;
      list.appendChild(item);
    });
    this.appContainer.appendChild(list);
  }

  renderTasks() {
    const title = document.createElement('h2');
    title.innerText = 'Задачи';
    this.appContainer.appendChild(title);

    const list = document.createElement('ul');
    this.crm.tasks.forEach(task => {
      const item = document.createElement('li');
      item.innerHTML = `
        <strong>${task.title}</strong> - ${task.completed ? 'Завершена' : 'В работе'}
        <br/>Ответственный: ${task.assignedTo}
        <br/>Дедлайн: ${task.dueDate.toDateString()}
        <button style="margin-left:10px;" onclick="ui.completeTask(${task.id})">${task.completed ? 'Посмотреть' : 'Выполнить'}</button>
      `;
      list.appendChild(item);
    });
    this.appContainer.appendChild(list);
  }

  showAddClientForm() {
    const form = document.createElement('div');
    form.innerHTML = `
      <h3>Добавить клиента</h3>
      <input placeholder="Имя" id="clientName"/>
      <input placeholder="Email" id="clientEmail"/>
      <input placeholder="Телефон" id="clientPhone"/>
      <button onclick="addClient()">Добавить</button>
    `;
    this.appContainer.appendChild(form);

    window.addClient = () => {
      const name = document.getElementById('clientName').value;
      const email = document.getElementById('clientEmail').value;
      const phone = document.getElementById('clientPhone').value;
      this.crm.addClient(name, email, phone);
      this.render();
    };
  }

  showAddDealForm() {
    const form = document.createElement('div');
    form.innerHTML = `
      <h3>Добавить сделку</h3>
      <input placeholder="Заголовок" id="dealTitle"/>
      <input placeholder="Стоимость" id="dealValue"/>
      <select id="dealClientId">
        ${this.crm.clients.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
      </select>
      <button onclick="addDeal()">Добавить сделку</button>
    `;
    this.appContainer.appendChild(form);

    window.addDeal = () => {
      const title = document.getElementById('dealTitle').value;
      const value = parseFloat(document.getElementById('dealValue').value);
      const clientId = parseInt(document.getElementById('dealClientId').value);
      this.crm.addDeal(clientId, title, value);
      this.render();
    };
  }

  showAddTaskForm() {
    const form = document.createElement('div');
    form.innerHTML = `
      <h3>Добавить задачу</h3>
      <input placeholder="Заголовок" id="taskTitle"/>
      <input placeholder="Описание" id="taskDesc"/>
      <input placeholder="Ответственный" id="taskAssignee"/>
      <input type="date" id="taskDue"/>
      <button onclick="addTask()">Добавить задачу</button>
    `;
    this.appContainer.appendChild(form);

    window.addTask = () => {
      const title = document.getElementById('taskTitle').value;
      const description = document.getElementById('taskDesc').value;
      const assignedTo = document.getElementById('taskAssignee').value;
      const dueDate = new Date(document.getElementById('taskDue').value);
      this.crm.addTask(title, description, assignedTo, dueDate);
      this.render();
    };
  }

  // Метод для отображения сделок конкретного клиента
  renderClientDeals(clientId) {
    const client = this.crm.getClientById(clientId);
    if (!client) return;

    // Очистка контейнера и отображение сделок клиента
    this.appContainer.innerHTML = '';

    const backBtn = this.createButton('Назад к списку клиентов', () => this.render());
    this.appContainer.appendChild(backBtn);

    const title = document.createElement('h2');
    title.innerText = `Сделки клиента: ${client.name}`;
    this.appContainer.appendChild(title);

    const deals = this.crm.getDealsByClientId(clientId);
    const list = document.createElement('ul');

    deals.forEach(deal => {
      const item = document.createElement('li');
      item.innerHTML = `
        <strong>${deal.title}</strong> - ${deal.stage} (${deal.value}$)
        <button style="margin-left:10px;" onclick="ui.promptUpdateDealStage(${deal.id})">Обновить стадию</button>
      `;
      list.appendChild(item);
    });

    this.appContainer.appendChild(list);
  }

  promptUpdateDealStage(dealId) {
    const newStage = prompt('Введите новую стадию сделки (lead, negotiation, won, lost):');
    if (newStage) {
      this.crm.updateDealStage(dealId, newStage);
      this.render();
    }
  }

  completeTask(taskId) {
    this.crm.completeTask(taskId);
    this.render();
  }
}

// Инициализация
const crm = new CRM();
const ui = new CRMUI(crm);