const $ = id => document.getElementById(id);

// ── FOTO ──
$('photo-input').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    $('photo-ph').style.display = 'none';
    let img = $('photo-circle').querySelector('img');
    if (!img) {
      img = document.createElement('img');
      $('photo-circle').appendChild(img);
    }
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
});

// ── MODALES ──
function openModal(type) {
  const box = $('modal-box');
  let html = '';

  if (type === 'hero') {
    html = `
      <h3>Editar presentación</h3>
      <input id="m-name" placeholder="Nombre completo" value="${$('hero-name').textContent}">
      <input id="m-title" placeholder="Profesión / título" value="${$('hero-title').textContent}">
      <textarea id="m-bio" placeholder="Descripción personal">${$('hero-bio').textContent}</textarea>
      <div class="modal-btns">
        <button class="btn-cancel" onclick="closeModal()">Cancelar</button>
        <button class="btn-save" onclick="saveHero()">Guardar</button>
      </div>`;

  } else if (type === 'edu') {
    html = `
      <h3>Agregar estudio</h3>
      <input id="m-etitle" placeholder="Título o carrera">
      <input id="m-einst" placeholder="Institución">
      <input id="m-eyear" placeholder="Período (ej: 2019 – 2023)">
      <div class="modal-btns">
        <button class="btn-cancel" onclick="closeModal()">Cancelar</button>
        <button class="btn-save" onclick="saveEdu()">Agregar</button>
      </div>`;

  } else if (type === 'exp') {
    html = `
      <h3>Agregar experiencia</h3>
      <input id="m-erole" placeholder="Cargo o rol">
      <input id="m-ecomp" placeholder="Empresa o proyecto">
      <input id="m-eperiod" placeholder="Período (ej: 2022 – hoy)">
      <textarea id="m-edesc" placeholder="Descripción breve de tus tareas y logros"></textarea>
      <div class="modal-btns">
        <button class="btn-cancel" onclick="closeModal()">Cancelar</button>
        <button class="btn-save" onclick="saveExp()">Agregar</button>
      </div>`;

  } else if (type === 'skill') {
    html = `
      <h3>Agregar habilidad</h3>
      <input id="m-sname" placeholder="Nombre de la habilidad">
      <label>Nivel de dominio</label>
      <input type="range" id="m-slevel" min="10" max="100" value="75" style="width:100%;margin-bottom:10px">
      <div class="modal-btns">
        <button class="btn-cancel" onclick="closeModal()">Cancelar</button>
        <button class="btn-save" onclick="saveSkill()">Agregar</button>
      </div>`;

  } else if (type === 'hobby') {
    html = `
      <h3>Agregar hobby / interés</h3>
      <input id="m-hobby" placeholder="Ej: Cocina, Ciclismo, Gaming...">
      <div class="modal-btns">
        <button class="btn-cancel" onclick="closeModal()">Cancelar</button>
        <button class="btn-save" onclick="saveHobby()">Agregar</button>
      </div>`;

  } else if (type === 'contact') {
    html = `
      <h3>Editar contacto</h3>
      <input id="m-cemail" placeholder="Email" value="${$('c-email').textContent}">
      <input id="m-clink" placeholder="LinkedIn (usuario o URL)" value="${$('c-linkedin').textContent}">
      <input id="m-cgit" placeholder="GitHub (usuario)" value="${$('c-github').textContent}">
      <input id="m-cphone" placeholder="Teléfono" value="${$('c-phone').textContent}">
      <div class="modal-btns">
        <button class="btn-cancel" onclick="closeModal()">Cancelar</button>
        <button class="btn-save" onclick="saveContact()">Guardar</button>
      </div>`;
  }

  box.innerHTML = html;
  $('modal-bg').classList.add('open');
}

function closeModal() {
  $('modal-bg').classList.remove('open');
}

// Cerrar modal al hacer clic fuera
$('modal-bg').addEventListener('click', e => {
  if (e.target === $('modal-bg')) closeModal();
});

// ── GUARDAR DATOS ──
function saveHero() {
  const n = $('m-name').value.trim();
  const t = $('m-title').value.trim();
  const b = $('m-bio').value.trim();
  if (n) $('hero-name').textContent = n;
  if (t) $('hero-title').textContent = t;
  if (b) $('hero-bio').textContent = b;
  closeModal();
}

function saveEdu() {
  const t = $('m-etitle').value.trim();
  if (!t) return;
  const i = $('m-einst').value.trim();
  const y = $('m-eyear').value.trim();
  const div = document.createElement('div');
  div.className = 'edu-item';
  div.innerHTML = `
    <div class="edu-dot"></div>
    <div>
      <div class="edu-title">${t}</div>
      <div class="edu-sub">${i}</div>
      <div class="edu-year">${y}</div>
    </div>`;
  $('edu-list').appendChild(div);
  closeModal();
}

function saveExp() {
  const r = $('m-erole').value.trim();
  if (!r) return;
  const c = $('m-ecomp').value.trim();
  const p = $('m-eperiod').value.trim();
  const d = $('m-edesc').value.trim();
  const div = document.createElement('div');
  div.className = 'exp-item';
  div.innerHTML = `
    <div class="exp-top">
      <div class="exp-role">${r}</div>
      <div class="exp-period">${p}</div>
    </div>
    <div class="exp-company">${c}</div>
    <div class="exp-desc">${d}</div>`;
  $('exp-list').appendChild(div);
  closeModal();
}

function saveSkill() {
  const n = $('m-sname').value.trim();
  if (!n) return;
  const l = $('m-slevel').value;
  const div = document.createElement('div');
  div.className = 'skill-card';
  div.innerHTML = `
    <div class="skill-name">${n}</div>
    <div class="skill-bar-bg"><div class="skill-bar-fill" style="width:${l}%"></div></div>`;
  $('skills-grid').appendChild(div);
  closeModal();
}

function saveHobby() {
  const h = $('m-hobby').value.trim();
  if (!h) return;
  const div = document.createElement('div');
  div.className = 'hobby-tag';
  div.innerHTML = `<i class="ti ti-star"></i> ${h}`;
  $('hobbies-wrap').appendChild(div);
  closeModal();
}

function saveContact() {
  $('c-email').textContent    = $('m-cemail').value.trim();
  $('c-linkedin').textContent = $('m-clink').value.trim();
  $('c-github').textContent   = $('m-cgit').value.trim();
  $('c-phone').textContent    = $('m-cphone').value.trim();
  closeModal();
}