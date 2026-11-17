const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const catC={research:'#7aa7ff',ecr:'#5fd0a0',governance:'#e8a317',verify:'#e0525b'};
let D,pathN=10;
fetch('data/activities.json').then(r=>r.json()).then(init).catch(()=>{$('#plist').innerHTML='<p class="empty">Content could not load. Serve this folder over HTTP (for example on GitHub Pages) so data/activities.json can be read.</p>'});
function init(d){D=d;
  $('#intro').textContent=d.intro;$('#full').href=d.base;$('#news-all').href=d.base+'newsroom.html';
  const e=d.event;$('#e-title').textContent=e.title;$('#e-sub').textContent=e.sub;$('#e-text').textContent=e.text;$('#e-date').textContent=e.dateLabel;$('#e-link').href=e.url;
  $('#e-tags').innerHTML=e.tags.map(t=>`<span>${esc(t)}</span>`).join('');clock(e.date);
  $('#eco').innerHTML=d.ecosystem.map(x=>`<article class="card"><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join('');
  $('#newsl').innerHTML=d.news.map(n=>`<a class="card" href="${n.url}" target="_blank" rel="noopener"><h3>${esc(n.title)}</h3><p>${esc(n.text)}</p><span class="go">Read update (opens in a new tab)</span></a>`).join('');
  // pathway
  const L=$('#steps');d.pathway.forEach((p,i)=>{const li=document.createElement('li');li.innerHTML=`<button role="tab" aria-selected="false"><i>${i+1}</i>${esc(p.t)}</button>`;li.firstChild.onclick=()=>step(i);L.append(li)});step(0);
  // portals
  const ch=$('#chips');[{id:'all',label:'All'},...d.categories].forEach(c=>{const b=document.createElement('button');b.className='chip';b.textContent=c.label;b.setAttribute('aria-pressed',c.id==='all');b.onclick=()=>{st.cat=c.id;[...ch.children].forEach(x=>x.setAttribute('aria-pressed',x===b));list()};ch.append(b)});
  $('#q').oninput=x=>{st.q=x.target.value.trim().toLowerCase();list()};list();
  scrollspy();ribbon();
}
const st={q:'',cat:'all'};
function list(){const cl=Object.fromEntries(D.categories.map(c=>[c.id,c.label]));
  const m=D.portals.filter(p=>(st.cat==='all'||p.cat===st.cat)&&(!st.q||(p.name+' '+p.text).toLowerCase().includes(st.q)));
  $('#pc').textContent=`${m.length} of ${D.portals.length} portals`;
  $('#plist').innerHTML=m.length?m.map(p=>`<a class="card" style="--c:${catC[p.cat]}" href="${p.url}" target="_blank" rel="noopener"><span class="tag">${esc(cl[p.cat])}</span><h3>${esc(p.name)}</h3><p>${esc(p.text)}</p><span class="go">Open (new tab)</span></a>`).join(''):'<p class="empty">No portals match. Clear the search or choose "All".</p>'}
function step(i){const b=[...document.querySelectorAll('#steps button')];b.forEach((x,j)=>{x.setAttribute('aria-selected',i===j);x.classList.toggle('done',j<i)});
  $('#steps').style.setProperty('--p',i/(b.length-1));const p=D.pathway[i];
  $('#stepbox').innerHTML=`<h3>Stage ${i+1}: ${esc(p.t)}</h3><p>${esc(p.s)}</p>`}
function clock(date){const t=new Date(date+'T00:00:00'),c=$('#clock');
  const f=()=>{const ms=t-Date.now();if(ms<=0){c.innerHTML='';$('#e-state').textContent='This event date has passed. Open the portal for outcomes and updates.';return false}
    const d=Math.floor(ms/864e5),h=Math.floor(ms/36e5)%24,m=Math.floor(ms/6e4)%60,s=Math.floor(ms/1e3)%60;
    c.innerHTML=[[d,'days'],[h,'hours'],[m,'minutes'],[s,'seconds']].map(([n,l])=>`<div><b>${String(n).padStart(2,'0')}</b><span>${l}</span></div>`).join('');
    $('#e-state').textContent='Until the symposium opens';return true};
  if(f()){const i=setInterval(()=>{if(!f())clearInterval(i)},1000)}}
function scrollspy(){const ls=[...document.querySelectorAll('.sub a')];const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)ls.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-40% 0px -55% 0px'});
  ls.forEach(l=>{const s=document.querySelector(l.getAttribute('href'));s&&io.observe(s)})}
// hero: the ten pathway stages as nodes on a flowing ribbon, lit in sequence
function ribbon(){const cv=$('#ribbon'),x=cv.getContext('2d'),dpr=devicePixelRatio||1,rm=matchMedia('(prefers-reduced-motion:reduce)').matches;let W,H,t=0;
  const size=()=>{W=cv.width=cv.offsetWidth*dpr;H=cv.height=cv.offsetHeight*dpr};size();addEventListener('resize',size);
  const pt=(u,k)=>[W*(.08+.84*u),H*.72+Math.sin(u*6+t+k)*H*.07+Math.sin(u*2.5-t*.6)*H*.04];
  function f(){x.clearRect(0,0,W,H);
    [['#e0525b',0],['#e8a317',.6],['#5fd0a0',1.2]].forEach(([c,k])=>{x.beginPath();x.strokeStyle=c;x.globalAlpha=.5;x.lineWidth=2*dpr;for(let i=0;i<=120;i++){const[a,b]=pt(i/120,k);i?x.lineTo(a,b):x.moveTo(a,b)}x.stroke()});
    x.globalAlpha=1;const lit=(t*.9)%(pathN+3);
    for(let n=0;n<pathN;n++){const[a,b]=pt(n/(pathN-1),1.2),on=n<lit,r=(on?7:4.5)*dpr;x.fillStyle=on?'#5fd0a0':'#21424f';x.shadowColor='#5fd0a0';x.shadowBlur=on?16*dpr:0;x.beginPath();x.arc(a,b,r,0,7);x.fill()}
    x.shadowBlur=0;if(!rm){t+=.012;requestAnimationFrame(f)}}f()}
