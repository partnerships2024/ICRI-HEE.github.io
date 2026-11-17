const $=s=>document.querySelector(s);
const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const get=u=>fetch(u).then(r=>{if(!r.ok)throw 0;return r.json()});
Promise.all([get('data/site.json'),get('data/community.json').catch(()=>null)]).then(([s,c])=>build(s,c)).catch(()=>{
  $('#about-text').innerHTML='<p>Content could not load. Serve this folder over HTTP (for example on GitHub Pages) so data/site.json can be read.</p>'});
function count(node,to){const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;if(rm||to>1e3){node.textContent=to;return}let t0;const f=t=>{t0=t0||t;const p=Math.min((t-t0)/1100,1);node.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
function build(d,c){
  const o=d.org,st=d.statutes;
  $('#h-tag').textContent=o.tagline;$('#h-sub').textContent=o.subtitle;
  $('#about-text').innerHTML=o.about.map(p=>`<p>${esc(p)}</p>`).join('');
  const g=$('#g-link');g.href=st.url;$('#g-title').textContent=st.label;$('#g-text').textContent=st.intro;
  const f=d.founder;$('#f-photo').src=f.photo;$('#f-photo').alt=`Placeholder portrait of ${f.name}`;
  $('#f-name').textContent=f.name;$('#f-roles').innerHTML=f.roles.map(esc).join('<br>');
  $('#f-bio').innerHTML=f.bio.map(p=>`<p>${esc(p)}</p>`).join('');
  $('#p-title').textContent=d.philosophy.title;$('#p-text').innerHTML=d.philosophy.text.map(p=>`<p>${esc(p)}</p>`).join('');
  const box=$('#divs');
  const show=i=>[...box.children].forEach((p,j)=>{p.classList.toggle('on',i===j);p.firstChild.setAttribute('aria-expanded',i===j)});
  d.divisions.forEach((v,i)=>{const p=el('article','dv',`<button class="dv-h" aria-expanded="false"><img src="${v.icon}" alt="">${esc(v.name)}</button><div class="dv-b"><p>${esc(v.summary)}</p><p><b>Flagship laboratory:</b> ${esc(v.lab.name)}</p><a class="btn dark" href="${v.lab.url}" target="_blank" rel="noopener">Visit ${esc(v.lab.short)} (opens in a new tab)</a></div>`);
    p.style.setProperty('--c',v.color);p.firstChild.onclick=()=>show(i);box.append(p)});show(0);
  const x=d.crossCutting;$('#cross').innerHTML=`<img src="${x.icon}" alt=""><p><b>${esc(x.name)}.</b> ${esc(x.summary)}</p>`;
  $('#labs-list').innerHTML=d.divisions.map(v=>`<a class="lab" style="--c:${v.color}" href="${v.lab.url}" target="_blank" rel="noopener"><b>${esc(v.lab.short)}</b><span>${esc(v.name)} (opens in a new tab)</span></a>`).join('');
  $('#vision-t').textContent=d.vision;$('#mission-t').textContent=d.mission;
  $('#objs').innerHTML=d.objectives.map(y=>`<li><b>${esc(y.title)}</b><span>${esc(y.text)}</span></li>`).join('');
  const strip=$('#strip');
  if(c){c.members.filter(m=>m.tier==='principal').forEach(m=>strip.append(Object.assign(el('a','person',`<img src="${m.photo}" alt="" loading="lazy"><div><b>${esc(m.name)}</b><span>${esc(m.rank||'Principal Scientist')}</span></div>`),{href:'community.html'})))}
  else $('#community').hidden=true;
  $('#team-grid').innerHTML=d.team.map(g=>`<div class="group"><h3>${esc(g.group)}</h3><div class="people">${g.members.map(m=>`<article class="person"><img src="${m.photo}" alt="Placeholder portrait of ${esc(m.name)}" loading="lazy"><div><b>${esc(m.name)}</b><span>${esc(m.role)}</span>${m.bio?`<span style="margin-top:8px">${esc(m.bio)}</span>`:''}</div></article>`).join('')}</div></div>`).join('');
  const hs=[[o.founded,'founded'],[d.divisions.length,'flagship laboratories'],[d.divisions.length+1,'research domains']];if(c)hs.push([c.members.length,'community scientists']);
  $('#hstats').innerHTML=hs.map(([n,l])=>`<li><b data-n="${n}">0</b><span>${esc(l)}</span></li>`).join('');
  document.querySelectorAll('#hstats b').forEach(b=>count(b,+b.dataset.n));
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
