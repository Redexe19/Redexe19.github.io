function detailRow(label, value){
  return `
    <div class="detail-row">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `;
}

function renderProjectDetail(){
  const mount = document.getElementById('project-detail');
  if(!mount) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || '';
  const project = projectDetails[id];

  if(!project){
    document.title = 'Project not found - Redexe19';
    mount.innerHTML = `
      <article class="panel empty-panel">
        <h1 class="small-title">Project not found</h1>
        <p>This project page does not exist yet.</p>
        <div class="action-row">
          <a class="action-btn white" href="minecraft/index.html">Back to Minecraft</a>
        </div>
      </article>
    `;
    return;
  }

  document.title = `${project.title} - Redexe19`;
  const meta = [
    detailRow('Category', project.category),
    detailRow('Status', project.status),
    detailRow('License', project.license),
    detailRow('Availability', project.availability),
    detailRow('Version', project.version)
  ].join('');

  mount.innerHTML = `
    <a class="back-link" href="minecraft/index.html">Back to Minecraft</a>
    <article class="project-detail-card">
      <header class="detail-head">
        <div class="detail-icon">${escapeHtml(project.icon)}</div>
        <div>
          <p class="kicker">${escapeHtml(project.category)}</p>
          <h1 class="page-title">${escapeHtml(project.title)}</h1>
          <p class="lead">${escapeHtml(project.description)}</p>
        </div>
      </header>

      <div class="detail-layout">
        <section class="detail-main">
          <h2>Features</h2>
          <ul class="detail-list">
            ${project.features.map(feature => `<li>${escapeHtml(feature)}</li>`).join('')}
          </ul>
          <div class="notice">
            <strong>Private showcase</strong>
            <p>${escapeHtml(project.notes)}</p>
          </div>
        </section>

        <aside class="detail-side">
          <h2>Project Info</h2>
          <div class="detail-meta">${meta}</div>
        </aside>
      </div>
    </article>
  `;
}

renderProjectDetail();
