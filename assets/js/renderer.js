
function escapeHtml(value){
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function iconMarkup(item){
  if(item.image){
    return `<img src="${item.image}" alt="${escapeHtml(item.title)} icon">`;
  }
  return `<span>${escapeHtml(item.icon || item.title.slice(0,2).toUpperCase())}</span>`;
}

function buttonsMarkup(buttons){
  return buttons.map(btn => `
    <a class="action-btn ${btn.primary ? 'white' : ''}" href="${escapeHtml(btn.url || '#')}">
      ${escapeHtml(btn.label)}
    </a>
  `).join('');
}

function chipsMarkup(chips){
  if(!chips || !chips.length) return '';
  return `
    <div class="meta-row">
      ${chips.map(chip => `<span class="meta-chip">${escapeHtml(chip)}</span>`).join('')}
    </div>
  `;
}

function featuresMarkup(features){
  if(!features || !features.length) return '';
  return `
    <ul class="feature-list">
      ${features.map(feature => `<li>${escapeHtml(feature)}</li>`).join('')}
    </ul>
  `;
}

function createCard(item, featured=false){
  const tag = item.tag ? `<span class="pill">${escapeHtml(item.tag)}</span>` : '';
  const titleClass = featured ? 'card-title' : 'small-title';
  const wrapClass = featured ? 'featured-card' : 'project-card';
  const actionMarkup = item.page
    ? `<div class="action-row"><span class="action-btn ${item.primary ? 'white' : ''}">View project</span></div>`
    : `<div class="action-row">${buttonsMarkup(item.buttons || [])}</div>`;
  const inner = `
    <div class="project-inner">
      <div class="icon-box red">${iconMarkup(item)}</div>
      <div>
        <div class="card-top">
          <h3 class="${titleClass}">${escapeHtml(item.title)}</h3>
          ${tag}
        </div>
        <p class="card-desc">${escapeHtml(item.description)}</p>
        ${chipsMarkup(item.meta || [])}
        ${featuresMarkup(item.features || [])}
        ${actionMarkup}
      </div>
    </div>
  `;

  if(item.page){
    return `<a class="${wrapClass} project-link-card" href="${escapeHtml(item.page)}">${inner}</a>`;
  }

  return `<article class="${wrapClass}">${inner}</article>`;
}

function renderFeatured(targetId, items){
  const el = document.getElementById(targetId);
  if(!el) return;
  el.innerHTML = items.map(item => createCard(item, true)).join('');
}

function renderGrid(targetId, items){
  const el = document.getElementById(targetId);
  if(!el) return;
  el.innerHTML = items.map(item => createCard(item, false)).join('');
}

function renderEmpty(targetId, message){
  const el = document.getElementById(targetId);
  if(!el) return;
  el.innerHTML = `<article class="panel empty-panel"><p>${escapeHtml(message)}</p></article>`;
}
