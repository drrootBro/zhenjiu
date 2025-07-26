import { data } from './data.js';
import { getLang, t } from './i18n.js';

export function renderPage() {
  document.title = t('pageTitle');
  document.querySelector('[data-i18n="title"]').textContent = t('title');
  document.querySelector('[data-i18n="chooseSymptom"]').textContent = t('chooseSymptom');
  renderMenu();
  clearResults();
}

function renderMenu() {
  const menu = document.getElementById('menu');
  menu.innerHTML = '';
  const symptoms = data[getLang()].symptoms;
  symptoms.forEach(sym => {
    const btn = document.createElement('button');
    btn.textContent = sym;
    btn.onclick = () => showDetails(sym, btn);  // 关键：传入 btn 本身
    menu.appendChild(btn);
  });
}

function clearResults() {
  document.getElementById('results').innerHTML = '';
}

function showDetails(symptom, clickedButton) {
  // 高亮当前按钮
  document.querySelectorAll('#menu button').forEach(btn => {
    btn.classList.remove('active');
  });
  if (clickedButton) clickedButton.classList.add('active');

  const entry = data[getLang()].content[symptom];
  if (!entry) return;

  const main = entry.main;
  let html = `
    <div class="result">
      <h3 style="color:#2f7a5f;">${getLang() === 'zh' ? '你选择的症状：' : 'Selected Symptom:'} ${symptom}</h3>
      <h3>${main.name} (${main.pinyin})</h3>
      <p><strong>${getLang() === 'zh' ? '经络' : 'Meridian'}:</strong> ${main.jingluo}</p>
      <p><strong>${getLang() === 'zh' ? '穴位码' : 'Code'}:</strong> ${main.code}</p>
      <p><strong>${getLang() === 'zh' ? '位置' : 'Location'}:</strong> ${main.location}</p>
      <p><strong>${getLang() === 'zh' ? '功效' : 'Effect'}:</strong> ${main.description}</p>
      <img src="${main.image}" alt="${main.name}">
      <iframe src="${main.video}" allowfullscreen></iframe>
  `;

  if (entry.sub && Array.isArray(entry.sub)) {
    html += `<h4>${getLang() === 'zh' ? '副穴位' : 'Sub Points'}:</h4>`;
    html += entry.sub.map(ap => `
      <div class="subpoint">
        <h5>${ap.name} (${ap.pinyin})</h5>
        <p><strong>${getLang() === 'zh' ? '经络' : 'Meridian'}:</strong> ${ap.jingluo} ｜ <strong>${getLang() === 'zh' ? '穴位码' : 'Code'}:</strong> ${ap.code}</p>
        <p><strong>${getLang() === 'zh' ? '位置' : 'Location'}:</strong> ${ap.location}</p>
        <p><strong>${getLang() === 'zh' ? '功效' : 'Effect'}:</strong> ${ap.description}</p>
        <img src="${ap.image}" alt="${ap.name}">
      </div>
    `).join('');
  }

  html += '</div>';
  document.getElementById('results').innerHTML = html;
}

window.addEventListener('DOMContentLoaded', renderPage);

