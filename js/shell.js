// Shared header, footer, skip link and progress bar for every page. Menu content lives in data/site.json.
(()=>{
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const FB={menu:[{label:'Home',href:'index.html'},{label:'Community',href:'community.html'},{label:'Activities',href:'scientific-activities.html'}],
 statutes:{short:'Statutes & Governance',url:'https://didarmurad2019.github.io/Statutes.github.io/'},footer:[],org:{name:'ICRI-HEE',fullName:'International Council for Research & Innovation in Healthcare, Energy & Environment'}};
const here=(location.pathname.split('/').pop()||'index.html');
const file=h=>h.split('#')[0];
const ext=i=>i.external||/^https?:/.test(i.href)?' target="_blank" rel="noopener"':'';
const lab=i=>esc(i.label)+(ext(i)?'<span class="sr" style="position:absolute;left:-999px"> (opens in a new tab)</span>':'');
document.body.insertAdjacentHTML('afterbegin','<a class="skip" href="#main">Skip to content</a><div class="progress" id="progress" aria-hidden="true"></div>');
const pg=document.getElementById('progress');
addEventListener('scroll',()=>{const m=document.documentElement.scrollHeight-innerHeight;pg.style.transform=`scaleX(${m>0?scrollY/m:0})`},{passive:true});
function header(s){const H=document.getElementById('site-header');if(!H)return;
  const items=s.menu.map((m,i)=>{
    if(!m.children){const cur=file(m.href)===here&&!m.href.includes('#');return`<li><a href="${m.href}"${cur?' aria-current="page"':''}${ext(m)}>${lab(m)}</a></li>`}
    const cur=m.children.some(c=>file(c.href)===here&&here!=='index.html');
    return`<li class="has${cur?' cur':''}"><button class="dd" aria-expanded="false" aria-controls="sm${i}">${esc(m.label)}<span class="chev"></span></button><ul class="sm" id="sm${i}">${m.children.map(c=>`<li><a href="${c.href}"${ext(c)}>${lab(c)}</a></li>`).join('')}</ul></li>`}).join('');
  H.innerHTML=`<div class="hd"><a class="brand" href="index.html"><img src="assets/images/ICRI-HEE_logo.svg" alt="" width="50" height="50"><span>${esc(s.org.name)}</span></a><button class="menu-btn" id="mb" aria-expanded="false" aria-controls="mainnav">Menu</button><nav id="mainnav" aria-label="Main"><ul>${items}</ul><a class="cta-gov" href="${s.statutes.url}" target="_blank" rel="noopener">${esc(s.statutes.short||'Statutes & Governance')}<span class="sr" style="position:absolute;left:-999px"> (opens in a new tab)</span></a></nav></div>`;
  const nav=document.getElementById('mainnav'),mb=document.getElementById('mb');
  mb.onclick=()=>{const v=nav.classList.toggle('open');mb.setAttribute('aria-expanded',v)};
  const closeAll=()=>H.querySelectorAll('.has.open').forEach(h=>{h.classList.remove('open');h.firstChild.setAttribute('aria-expanded','false')});
  H.querySelectorAll('.dd').forEach(b=>b.onclick=e=>{e.stopPropagation();const li=b.parentNode,was=li.classList.contains('open');closeAll();if(!was){li.classList.add('open');b.setAttribute('aria-expanded','true')}});
  document.addEventListener('click',e=>{if(!H.contains(e.target))closeAll()});
  H.addEventListener('keydown',e=>{if(e.key==='Escape'){closeAll();nav.classList.remove('open');mb.setAttribute('aria-expanded','false')}});
  nav.addEventListener('click',e=>{if(e.target.closest('.sm a, #mainnav>ul>li>a')){closeAll();nav.classList.remove('open');mb.setAttribute('aria-expanded','false')}})}
function footer(s){const F=document.getElementById('site-footer');if(!F)return;
  const cols=(s.footer||[]).map(g=>`<div><h2>${esc(g.title)}</h2><ul>${g.links.map(l=>`<li><a href="${l.href}"${ext(l)}>${lab(l)}</a></li>`).join('')}</ul></div>`).join('');
  F.innerHTML=`<div class="ft"><div><div class="fb"><img src="assets/images/ICRI-HEE_logo.svg" alt="" width="50" height="50">${esc(s.org.name)}</div><p>${esc(s.org.fullName)}</p></div>${cols}</div><p class="copy">© ${new Date().getFullYear()} ${esc(s.org.name)}. All rights reserved.</p>`}
fetch('data/site.json').then(r=>r.json()).catch(()=>FB).then(s=>{s={...FB,...s};header(s);footer(s)});
})();
