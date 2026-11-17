const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
$('#yr').textContent=new Date().getFullYear();
const st={q:'',tier:'all',group:'all'};let D,tc={};
fetch('data/community.json').then(r=>r.json()).then(init).catch(()=>{$('#list').innerHTML='<p class="empty">The community data could not load. Serve this folder over HTTP (for example on GitHub Pages) so data/community.json can be read.</p>'});
function init(d){D=d;d.tiers.forEach(t=>tc[t.id]=t);
  $('#intro').textContent=d.intro;
  const n=d.members.length;
  $('#stats').innerHTML=`<li><b>${n}</b><span>researchers</span></li>`+d.tiers.map(t=>`<li><b style="color:${t.color}">${d.members.filter(m=>m.tier===t.id).length}</b><span>${esc(t.label.toLowerCase())}</span></li>`).join('');
  chips('#tier-chips','tier',[{id:'all',label:'All levels'},...d.tiers]);
  chips('#group-chips','group',[{id:'all',label:'All disciplines'},...d.groups]);
  $('#q').oninput=e=>{st.q=e.target.value.trim().toLowerCase();render()};
  $('#close').onclick=()=>$('#dlg').close();
  $('#dlg').addEventListener('click',e=>{if(e.target===$('#dlg'))$('#dlg').close()});
  render();network(d);
}
function chips(sel,key,items){const w=$(sel);items.forEach(i=>{const b=document.createElement('button');b.className='chip';b.textContent=i.label;b.setAttribute('aria-pressed',st[key]===i.id);
  b.onclick=()=>{st[key]=i.id;[...w.children].forEach(c=>c.setAttribute('aria-pressed',c===b));render()};w.append(b)})}
function match(m){if(st.tier!=='all'&&m.tier!==st.tier)return false;if(st.group!=='all'&&!m.groups.includes(st.group))return false;
  if(!st.q)return true;return [m.name,m.headline,m.profile,...m.expertise].join(' ').toLowerCase().includes(st.q)}
function render(){const L=$('#list');const ms=D.members.filter(match);
  $('#count').textContent=`${ms.length} of ${D.members.length} researchers`;
  if(!ms.length){L.innerHTML='<p class="empty">No researchers match these filters. Clear the search or choose "All levels" and "All disciplines".</p>';return}
  L.innerHTML=D.tiers.map(t=>{const g=ms.filter(m=>m.tier===t.id);if(!g.length)return'';
    return`<section class="tier" style="--c:${t.color}"><h2>${esc(t.label)}</h2><div class="grid">${g.map(m=>`<button class="card" data-id="${m.id}" style="--c:${t.color}"><img src="${m.photo}" alt="" loading="lazy"><div>${m.rank?`<span class="badge">${esc(m.rank)}</span>`:''}<h3>${esc(m.name)}</h3><p>${esc(m.headline)}</p></div></button>`).join('')}</div></section>`}).join('');
  L.querySelectorAll('.card').forEach(c=>c.onclick=()=>open(c.dataset.id))}
function open(id){const m=D.members.find(x=>x.id===id),t=tc[m.tier],gl=m.groups.map(g=>D.groups.find(x=>x.id===g).label);
  const list=(h,a)=>a.length?`<h4>${h}</h4><ul>${a.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'';
  $('#d-body').innerHTML=`<div class="d" style="--c:${t.color}"><img src="${m.photo}" alt="Placeholder portrait of ${esc(m.name)}"><section><span class="badge" style="--c:${t.color}">${esc(t.label.replace(/s$/,''))}${m.rank?' · '+esc(m.rank):''}</span><h2 id="d-name">${esc(m.name)}</h2><p class="lead">${esc(m.headline)}</p><div class="tags">${gl.map(g=>`<span>${esc(g)}</span>`).join('')}</div>${m.profile?`<h4>Research profile</h4><p style="color:var(--muted);margin:0">${esc(m.profile)}</p>`:''}${list('Expertise',m.expertise)}${list('Selected contributions',m.contributions)}</section></div>`;
  $('#dlg').showModal()}
// hero network: one node per member, coloured by level; drifts and reacts to the pointer
function network(d){const cv=$('#net'),x=cv.getContext('2d'),dpr=devicePixelRatio||1;let W,H,mx=-1e3,my=-1e3;
  const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const size=()=>{W=cv.width=cv.offsetWidth*dpr;H=cv.height=cv.offsetHeight*dpr};size();addEventListener('resize',size);
  const N=d.members.map((m,i)=>({c:tc[m.tier].color,g:m.groups,x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35*dpr,vy:(Math.random()-.5)*.35*dpr,r:(m.tier==='principal'?7:m.tier==='senior'?5.5:4.5)*dpr}));
  cv.parentElement.addEventListener('pointermove',e=>{const b=cv.getBoundingClientRect();mx=(e.clientX-b.left)*dpr;my=(e.clientY-b.top)*dpr});
  cv.parentElement.addEventListener('pointerleave',()=>{mx=my=-1e3});
  function f(){x.clearRect(0,0,W,H);
    N.forEach(a=>{if(!rm){a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1;
      const dx=a.x-mx,dy=a.y-my,dd=Math.hypot(dx,dy);if(dd<160*dpr){a.x+=dx/dd*1.4*dpr;a.y+=dy/dd*1.4*dpr}}});
    for(let i=0;i<N.length;i++)for(let j=i+1;j<N.length;j++){const a=N[i],b=N[j],dd=Math.hypot(a.x-b.x,a.y-b.y),sh=a.g.some(g=>b.g.includes(g));
      if(sh&&dd<320*dpr){x.strokeStyle=`rgba(157,184,181,${.35*(1-dd/(320*dpr))})`;x.lineWidth=dpr;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}
    N.forEach(a=>{x.fillStyle=a.c;x.shadowColor=a.c;x.shadowBlur=18*dpr;x.beginPath();x.arc(a.x,a.y,a.r,0,7);x.fill()});x.shadowBlur=0;
    if(!rm)requestAnimationFrame(f)}f()}
