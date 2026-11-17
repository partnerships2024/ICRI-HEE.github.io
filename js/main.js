const $=s=>document.querySelector(s);
const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
fetch('data/site.json').then(r=>r.json()).then(build).catch(()=>{
  $('#h-tag').textContent='ICRI-HEE';
  $('#h-sub').textContent='Content could not load. Serve this folder over HTTP (for example on GitHub Pages) so data/site.json can be read.';
});
function build(d){
  const o=d.org;
  $('#h-tag').textContent=o.tagline;$('#h-sub').textContent=o.subtitle;
  $('#about-text').innerHTML=o.about.map(p=>`<p>${esc(p)}</p>`).join('');
  const sb=d.statutes;if(sb){$('#st-label').textContent=sb.label;$('#st-note').textContent=sb.note;const l=$('#st-link');l.href=sb.url;l.textContent=sb.cta+' (opens in a new tab)'}
  const nav=$('#links');d.nav.forEach(n=>{const a=Object.assign(el('a',0,esc(n.label)),{href:n.href});if(/^https?:/.test(n.href)){a.target='_blank';a.rel='noopener'}nav.append(a)});
  nav.addEventListener('click',()=>{nav.classList.remove('open');$('#menu').setAttribute('aria-expanded','false')});
  $('#menu').onclick=e=>{const v=nav.classList.toggle('open');e.target.setAttribute('aria-expanded',v)};
  const f=d.founder;$('#f-photo').src=f.photo;$('#f-photo').alt=`Placeholder portrait of ${f.name}`;
  $('#f-name').textContent=f.name;$('#f-roles').innerHTML=f.roles.map(esc).join('<br>');
  $('#f-bio').innerHTML=f.bio.map(p=>`<p>${esc(p)}</p>`).join('');
  $('#p-title').textContent=d.philosophy.title;$('#p-text').innerHTML=d.philosophy.text.map(p=>`<p>${esc(p)}</p>`).join('');
  const tabs=$('#tabs'),panel=$('#panel');
  const show=i=>{[...tabs.children].forEach((b,j)=>b.setAttribute('aria-selected',i===j));
    const v=d.divisions[i];panel.style.setProperty('--c',v.color);panel.style.animation='none';panel.offsetWidth;panel.style.animation='';
    panel.innerHTML=`<img src="${v.icon}" alt=""><div><h3>${esc(v.name)}</h3><p>${esc(v.summary)}</p><p><b>Flagship laboratory:</b> ${esc(v.lab.name)}</p><a class="btn" href="${v.lab.url}" target="_blank" rel="noopener">Visit ${esc(v.lab.short)} (opens in a new tab)</a></div>`};
  d.divisions.forEach((v,i)=>{const b=el('button','tab',`<i style="background:${v.color}"></i>${esc(v.name)}`);b.role='tab';b.onclick=()=>show(i);tabs.append(b)});show(0);
  const c=d.crossCutting;$('#cross').innerHTML=`<img src="${c.icon}" alt=""><p><b>${esc(c.name)}.</b> ${esc(c.summary)}</p>`;
  $('#vision-t').textContent=d.vision;$('#mission-t').textContent=d.mission;
  $('#objs').innerHTML=d.objectives.map(x=>`<li><b>${esc(x.title)}</b><span>${esc(x.text)}</span></li>`).join('');
  $('#team-grid').innerHTML=d.team.map(g=>`<div class="group"><h3>${esc(g.group)}</h3><div class="people">${g.members.map(m=>`<article class="person"><img src="${m.photo}" alt="Placeholder portrait of ${esc(m.name)}" loading="lazy"><div><b>${esc(m.name)}</b><span>${esc(m.role)}</span>${m.bio?`<span style="margin-top:8px">${esc(m.bio)}</span>`:''}</div></article>`).join('')}</div></div>`).join('');
  $('#foot').textContent=`© ${new Date().getFullYear()} ${o.name}. ${o.fullName}. Founded ${o.founded}.`;
  const links=[...nav.children];const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
  d.nav.forEach(n=>{if(n.href[0]!=='#')return;const s=document.querySelector(n.href);s&&io.observe(s)});
}
(()=>{const cv=$('#waves'),x=cv.getContext('2d'),cols=['#e0525b','#e8a317','#5fd0a0'];
 const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;let W,H,t=0,mx=.5;
 const size=()=>{W=cv.width=cv.offsetWidth*devicePixelRatio;H=cv.height=cv.offsetHeight*devicePixelRatio};size();addEventListener('resize',size);
 cv.parentElement.addEventListener('pointermove',e=>mx=e.clientX/innerWidth);
 function draw(){x.clearRect(0,0,W,H);const sync=.5+.5*Math.sin(t*.4);
  cols.forEach((c,k)=>{x.beginPath();x.strokeStyle=c;x.globalAlpha=.75;x.lineWidth=2.5*devicePixelRatio;
   for(let i=0;i<=W;i+=6){const u=i/W,ph=(k-1)*(1-sync)*2.2+t+u*(5+mx*3),a=H*.11*(1+.6*Math.sin(u*3+k));
    const y=H*.62+Math.sin(ph)*a+(k-1)*H*.05*(1-sync);i?x.lineTo(i,y):x.moveTo(i,y)}x.stroke()});
  t+=rm?0:.012;if(!rm)requestAnimationFrame(draw)}draw();})();
