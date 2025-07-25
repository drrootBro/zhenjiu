import { data } from './data.js';
import { renderPage } from './app.js';

let lang = localStorage.getItem('lang') ||
           (navigator.language.startsWith('en') ? 'en' : 'zh');

export function getLang() {
  return lang;
}

export function t(key) {
  return data[lang][key] || '';
}

export function switchLang(newLang) {
  lang = newLang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  renderPage();
}

window.addEventListener('DOMContentLoaded', () => {
  switchLang(lang); // 🟢 加这一句触发语言初始化

  document.getElementById('btn-zh').addEventListener('click', () => switchLang('zh'));
  document.getElementById('btn-en').addEventListener('click', () => switchLang('en'));
});

