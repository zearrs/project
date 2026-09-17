document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  initNavToggle();
  initScrollSpy();
  typeTerminal();
  loadContactPersons();
  loadGalery();
  loadInfo();
  initInfoForm();
});

/* =========================================
   NAV TOGGLE (mobile)
========================================= */
function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const navbar = document.getElementById('navbar');

  toggle.addEventListener('click', () => {
    navbar.classList.toggle('open');
  });

  navbar.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navbar.classList.remove('open'));
  });
}

/* =========================================
   SCROLLSPY (highlight nav aktif)
========================================= */
function initScrollSpy() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));
}

/* =========================================
   HERO TERMINAL TYPING EFFECT
========================================= */
/* =========================================
   HERO TERMINAL — ASCII ART STATIS
========================================= */
const ASCII_ART = `
                                                                                                            
                                                                                                            
                                                                                                            
                                                                                                            
                                                                                                            
                                                 ++                                                         
                                             +*  **++*+ ++++++ ++++   ++                                    
                                           *****+**+***+**=+*++*++*+++*+                                    
                                 **  *****+** ***+*****+**=+*+**++*+++*+++++                                
                              ******+*****+******###%#####%%###*+++++*++*++*+==+                            
                            *******  ******%%%%%%%%#         %%%%#%%#*=+*++*+++++                           
                                ****  *#%%%#      :::::::::::       %%%%#*++ ++++++=                        
                                 ***%%#     :::::::::::::::::----:::     ##*=+**++                          
                        ****     %%%   :::-:::::::::::::::::::::::::::-:   ++++*                            
                       **+****###=:::::::::::::::::::::::::::::------::::::::::*#                           
                   ******#**+#%   --------:::::::::::::::::::::-----:::::::::::::::                         
                   *##*-:**#%#  ----------:::::::::::::::::::::::-----:::-====== ::::                       
                   =**###*%%  ------------:::::::::::::::::::::::::------=====++=   :::                     
                 *####**#%# -====------::::::::::::::::::::::::::::::----=====++++=   ::                    
                *#* **#%#  ======----:::::::::::::::::::::::::::::::::::::::------==    :                   
                 *#####%  =======--:::::::::::::::::::::::::::::::::::::::-:::==+==+=    :                  
               ##*  *%%  -+-:::-::::::::::::::::::::::::::::::::::::::::::::::::::----   ::                 
            *#*######%# :::::::::::::::::::::::::::::-::::::::::::::::::::::::::::-----   :                 
            *######*%% :::::::::::::::::::::::::::::---::::::::::::::::::::::::::::-----                    
             *######%  :::::::::::::::::::::::::::::--:::::::::::::::::::::::::::::-=+===                   
             #####*%# ===::::::::::--:::::::::::-----:::::::::::::::::::::::::::::-=====-                   
          #######*#%  -=+::::::::::::::::::--------::::::::::::::::::::::::::::---::-=++-                   
           #######%% =+=-:::::::::::::::::-========--:::::::::::::::::::::::::------:==++=                  
             #####%# ===::::::::%*#%##===+###+*##*+*-::+-:*=****-+=-++=:==-+-:------==++*=                  
            ######%% ++-:::::::+#::#*+++=*#*++#+*#+#::-*==*=:=+::+=+::+:++++::-----++=-=**                  
            ######%= +=--::::::##:=#*+++=-+##*#*****-:=*-=*-:+=:-+=+-==:+=++:----=-=***=**                  
             +###*%= --==::::::**-=#+===-+***+***--++=:-+=:::=-:-+--++::=:-=-----===+***=+                  
          ##%%####%% ++=====::::--:::-=-:=:-=++++-::::::::::::::::::=+=-:::++=--=+*+::-**-                  
           ########%  =+*+++++++=:-::::::--:-=+++-:::::::::::::::::==-++==+=*+=+++*+:::=*                   
            ##%%##*%# +*********+=-:::::::-=::-=-++----::::::::::::::::++++=+++#*+++**+::                   
           *%%%%%%#%# =**********+-:::::::::==-:::++++++::::::::::::::::****=***##*+***+:                   
            ##%%#  %%# +**********+-::::::::::-=++++++++=:::-:::::::::::+****=*##***++**:                   
                   ##%  ************+::::::::+*++=-=+***=-----::::::::::-****+***+++++++:                   
                ##%%#%%  *************:-----=+*******+====----+=:::::::::*****+++++++++                     
               #%%%*#%%%  ************=----=*************=--:--:::::+*=*******=+***+++                      
                %%#%%%#%#  ***********=---=***************=++::::::+++==++***+=+=+==                        
                 ###  ##%%  **********+===****************+::::::+************+****                         
                  #%%%%%##%# +*********++=**************+::::::=**************+***                          
                   %%###%%*%%  ********+**+**********+:::::::+****************+*                            
                     #%%%#+**%%  ******+**********-:::::::+*******************                              
                    #%%%%#%%%%#%-:::=+*+=++=-:::::::::=*********************                                
                        %%# %%% #%%::::::::::::-+***********************                                    
                          %%%%#   #%%#     **************************                                       
                            #%%%%#%%%#           *#****##******                                             
                            #%%%#%%%                                                                        
                             #%%%%%                                                                         
                                %%                                                                          
                                                                                                            
                                                                                                            
                                                                                                                    
`;

function typeTerminal() {
  const el = document.getElementById('terminalBody');
  el.textContent = ASCII_ART;
}


/* =========================================
   LOAD DATA FROM BACKEND (FastAPI)
========================================= */
async function loadContactPersons() {
  const grid = document.getElementById('cpGrid');
  try {
    const res = await fetch('/api/contact-persons');
    if (!res.ok) throw new Error('Gagal memuat data');
    const data = await res.json();
 
    grid.innerHTML = data.map(cp => {
      let actionBtn = '';
      if (cp.whatsapp) {
        actionBtn = `<a href="${escapeHtml(cp.whatsapp)}" target="_blank" rel="noopener noreferrer" class="cp-btn cp-btn-wa">Chat WhatsApp</a>`;
      } else if (cp.maps) {
        actionBtn = `<a href="${escapeHtml(cp.maps)}" target="_blank" rel="noopener noreferrer" class="cp-btn cp-btn-maps">Buka Maps</a>`;
      } else if (cp.gmail) {
  actionBtn = `<a href="https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(cp.gmail)}"
    target="_blank"
    rel="noopener noreferrer"
    class="cp-btn cp-btn-mail">
    Kirim Email
  </a>`;
}
 
      return `
        <div class="cp-card">
          <img class="cp-avatar" src="${escapeHtml(cp.photo)}" alt="${escapeHtml(cp.name)}" onerror="this.src='/static/img/placeholder.jpg'">
          <h3>${escapeHtml(cp.name)}</h3>
          <p class="cp-role">${escapeHtml(cp.role)}</p>
          ${cp.email ? `<p class="cp-detail">${escapeHtml(cp.email)}</p>` : ''}
          ${cp.phone ? `<p class="cp-detail">${escapeHtml(cp.phone)}</p>` : ''}
          ${actionBtn ? `<div class="cp-actions">${actionBtn}</div>` : ''}
        </div>
      `;
    }).join('');
  } catch (err) {
    grid.innerHTML = `<p class="cp-detail">Tidak dapat memuat data contact person saat ini.</p>`;
    console.error(err);
  }
}

let galeryData = {};
let activeYear = null;

async function loadGalery() {
  const tabsEl = document.getElementById('galeryTabs');
  const gridEl = document.getElementById('galeryGrid');

  try {
    const res = await fetch('/api/galery');
    if (!res.ok) throw new Error('Gagal memuat data');
    galeryData = await res.json();

    const years = Object.keys(galeryData).sort((a, b) => b - a); // terbaru dulu
    activeYear = years[0];

    tabsEl.innerHTML = years.map(year => `
      <button class="galery-tab ${year === activeYear ? 'active' : ''}" data-year="${year}">
        ${year}
      </button>
    `).join('');

    renderGaleryGrid(activeYear);

    tabsEl.querySelectorAll('.galery-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        activeYear = btn.dataset.year;
        tabsEl.querySelectorAll('.galery-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGaleryGrid(activeYear);
      });
    });

  } catch (err) {
    gridEl.innerHTML = `<p class="cp-detail">Tidak dapat memuat galeri saat ini.</p>`;
    console.error(err);
  }
}

function renderGaleryGrid(year) {
  const gridEl = document.getElementById('galeryGrid');
  const items = galeryData[year] || [];

  gridEl.innerHTML = items.map(item => `
    <div class="galery-item">
      <span>${escapeHtml(item.title)}</span>
    </div>
  `).join('');
}


/* =========================================
   CONTACT / INFO FORM SUBMIT
========================================= */
function initInfoForm() {
  const form = document.getElementById('infoForm');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Mengirim...';
    status.className = 'form-status';

    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || 'Gagal mengirim pesan');
      }

      status.textContent = 'Pesan berhasil dikirim. Terima kasih!';
      status.className = 'form-status success';
      form.reset();
    } catch (err) {
      status.textContent = err.message || 'Terjadi kesalahan, coba lagi.';
      status.className = 'form-status error';
    }
  });
}

/* =========================================
   HELPERS
========================================= */
function initials(name) {
  return name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}
