function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

function renderStages() {
  const wrap = document.getElementById('stageGrid');
  clear(wrap);
  SITE_DATA.stages.forEach(function(stage) {
    const card = el('article', 'stage-card');
    card.appendChild(el('div', 'num', stage.num));
    card.appendChild(el('h3', '', stage.title));
    card.appendChild(el('p', '', stage.body));
    const list = el('ul');
    stage.points.forEach(function(point) { list.appendChild(el('li', '', point)); });
    card.appendChild(list);
    wrap.appendChild(card);
  });
}

let activeCategory = '전체';

function renderFilters() {
  const wrap = document.getElementById('filterRow');
  clear(wrap);
  SITE_DATA.categories.forEach(function(category) {
    const button = el('button', 'filter-btn' + (category === activeCategory ? ' active' : ''), category);
    button.type = 'button';
    button.addEventListener('click', function() {
      activeCategory = category;
      renderFilters();
      renderArticles();
    });
    wrap.appendChild(button);
  });
}

function renderArticles() {
  const wrap = document.getElementById('articleGrid');
  clear(wrap);
  const list = activeCategory === '전체' ? SITE_DATA.articles : SITE_DATA.articles.filter(function(item) { return item.category === activeCategory; });
  list.forEach(function(article) {
    const card = el('article', 'article-card');
    const meta = el('div', 'meta');
    meta.appendChild(el('span', '', article.category));
    meta.appendChild(el('span', '', article.time));
    card.appendChild(meta);
    card.appendChild(el('h3', '', article.title));
    card.appendChild(el('p', '', article.summary));
    card.appendChild(el('div', 'lesson', article.lesson));
    wrap.appendChild(card);
  });
}

function renderFaqs() {
  const wrap = document.getElementById('faqList');
  clear(wrap);
  SITE_DATA.faqs.forEach(function(faq, index) {
    const item = el('article', 'faq-item' + (index === 0 ? ' open' : ''));
    const button = el('button', 'faq-q');
    button.type = 'button';
    button.appendChild(el('span', '', faq.q));
    button.appendChild(el('span', '', '+'));
    const answer = el('div', 'faq-a', faq.a);
    button.addEventListener('click', function() { item.classList.toggle('open'); });
    item.appendChild(button);
    item.appendChild(answer);
    wrap.appendChild(item);
  });
}

function renderWarnings() {
  const wrap = document.getElementById('warningList');
  clear(wrap);
  SITE_DATA.warnings.forEach(function(item) {
    const card = el('article', 'warning-card');
    card.appendChild(el('h3', '', item.title));
    card.appendChild(el('p', '', item.body));
    wrap.appendChild(card);
  });
}

function renderPartners() {
  const wrap = document.getElementById('partnerGrid');
  clear(wrap);
  SITE_DATA.partners.forEach(function(partner) {
    const card = el('article', 'partner-card');
    card.appendChild(el('div', 'type', partner.type));
    card.appendChild(el('h3', '', partner.title));
    card.appendChild(el('p', '', partner.body));
    wrap.appendChild(card);
  });
}

function bindMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const panel = document.getElementById('mobilePanel');
  toggle.addEventListener('click', function() { panel.classList.toggle('open'); });
  Array.prototype.forEach.call(panel.querySelectorAll('a'), function(link) {
    link.addEventListener('click', function() { panel.classList.remove('open'); });
  });
}

renderStages();
renderFilters();
renderArticles();
renderFaqs();
renderWarnings();
renderPartners();
bindMobileMenu();
