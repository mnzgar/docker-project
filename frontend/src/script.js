const API_URL = 'http://10.6.130.156:8081/api';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#text-form');
  const input = document.querySelector('#text-input');
  const textsContainer = document.querySelector('#texts');

  async function fetchTexts() {
    try {
      const response = await fetch(`${API_URL}/texts`);
      const texts = await response.json();

      textsContainer.innerHTML = '';
      texts.forEach((text) => {
        const li = document.createElement('li');
        li.textContent = text.content;
        textsContainer.appendChild(li);
      });
    } catch (error) {
      console.error('Error fetching texts:', error);
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    try {
      await fetch(`${API_URL}/insert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      input.value = '';
      fetchTexts();
    } catch (error) {
      console.error('Error inserting text:', error);
    }
  });

  fetchTexts();
});
