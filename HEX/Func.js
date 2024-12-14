document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('LIST');
    const input = document.getElementById('Input_Item');
    const list = document.getElementById('LIST');
  
    // Code tto Load items from local storage
    const savedItems = JSON.parse(localStorage.getItem('todoItems')) || [];
    savedItems.forEach(item => addItemToDOM(item.text, item.completed));
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskText = input.value.trim();
      if (taskText !== '') {
        addItemToDOM(taskText, false);
        saveItem(taskText, false);
        input.value = '';
      }
    });
  
    function addItemToDOM(text, completed) {
      const li = document.createElement('li');
      li.textContent = text;
      if (completed) li.classList.add('completed');
  
      li.addEventListener('click', () => {
        li.classList.toggle('completed');
        updateItem(text, li.classList.contains('completed'));
      });
  
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.classList.add('remove');
      removeButton.addEventListener('click', () => {
        li.remove();
        deleteItem(text);
      });
  
      li.appendChild(removeButton);
      list.appendChild(li);
    }
  
    function saveItem(text, completed) {
      const items = JSON.parse(localStorage.getItem('todoItems')) || [];
      items.push({ text, completed });
      localStorage.setItem('todoItems', JSON.stringify(items));
    }
  
    function updateItem(text, completed) {
      const items = JSON.parse(localStorage.getItem('todoItems')) || [];
      const item = items.find(i => i.text === text);
      if (item) {
        item.completed = completed;
        localStorage.setItem('todoItems', JSON.stringify(items));
      }
    }
  
    function deleteItem(text) {
      let items = JSON.parse(localStorage.getItem('todoItems')) || [];
      items = items.filter(i => i.text !== text);
      localStorage.setItem('todoItems', JSON.stringify(items));
    }
  });
  