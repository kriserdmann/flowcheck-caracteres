const API_BASE = 'https://api.escuelajs.co/api/v1';

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function getProducts(limit, offset) {
  let url = `${API_BASE}/products`;
  const qs = [];
  if (limit != null) qs.push(`limit=${limit}`);
  if (offset != null) qs.push(`offset=${offset}`);
  if (qs.length) url += `?${qs.join('&')}`;
  return fetchJSON(url);
}

async function getProduct(id) {
  return fetchJSON(`${API_BASE}/products/${id}`);
}

async function getCategories() {
  return fetchJSON(`${API_BASE}/categories`);
}

async function getProductsByCategory(catId) {
  return fetchJSON(`${API_BASE}/products/?categoryId=${catId}`);
}

function createProductCard(p) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${p.images[0]}" alt="${p.title}">
    <h3>${p.title}</h3>
    <p class="price">$${p.price}</p>
    <a href="detail.html?id=${p.id}" class="btn">Ver Detalhes</a>
  `;
  return card;
}

async function loadHome() {
  try {
    const container =
      document.querySelector('#destaques') ||
      document.querySelector('.destaques') ||
      document.querySelector('#products-container');
    if (!container) return;
    const produtos = await getProducts(3, 0);
    container.innerHTML = '';
    produtos.forEach(p => container.appendChild(createProductCard(p)));
  } catch (e) {
    console.error('Erro ao carregar destaques', e);
  }
}

async function renderMenuProducts(container, catId) {
  if (!container) return;
  try {
    container.innerHTML = '';
    const produtos = catId ? await getProductsByCategory(catId) : await getProducts();
    produtos.forEach(p => container.appendChild(createProductCard(p)));
  } catch (e) {
    console.error('Erro ao renderizar produtos do menu', e);
  }
}

async function loadMenu() {
  try {
    const container =
      document.querySelector('#menu-products') ||
      document.querySelector('#product-list') ||
      document.querySelector('.products-grid');
    const select =
      document.querySelector('#categoryFilter') ||
      document.querySelector('.category-filter');
    if (select) {
      const cats = await getCategories();
      select.innerHTML = '<option value="">Todas as categorias</option>';
      cats.forEach(c => {
        const o = document.createElement('option');
        o.value = c.id;
        o.textContent = c.name;
        select.appendChild(o);
      });
      select.addEventListener('change', e => {
        renderMenuProducts(container, e.target.value);
      });
    }
    await renderMenuProducts(container, null);
  } catch (e) {
    console.error('Erro na página de menu', e);
  }
}

async function loadDetail() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) return;
    const p = await getProduct(id);
    const container =
      document.querySelector('#product-detail') ||
      document.querySelector('.product-detail') ||
      document.querySelector('#detail-container');
    if (!container) return;
    container.innerHTML = `
      <img src="${p.images[0]}" alt="${p.title}">
      <h2>${p.title}</h2>
      <p class="price">$${p.price}</p>
      <p class="description">${p.description}</p>
      <p class="category">Categoria: ${p.category?.name || ''}</p>
    `;
  } catch (e) {
    console.error('Erro ao carregar detalhes do produto', e);
  }
}

function initTheme() {
  const html = document.documentElement;
  const stored = localStorage.getItem('theme');
  const defaultTheme = window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
  const theme = stored || defaultTheme;
  html.setAttribute('data-theme', theme);

  const btn =
    document.querySelector('#theme-toggle') ||
    document.querySelector('.theme-toggle') ||
    document.querySelector('#mode-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  const page = window.location.pathname.split('/').pop();
  if (page === '' || page === 'index.html') loadHome();
  else if (page === 'menu.html') loadMenu();
  else if (page === 'detail.html') loadDetail();
});