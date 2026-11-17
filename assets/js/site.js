(async()=>{
 const root=document.documentElement.dataset.root||'.';
 const get=async p=>{const r=await fetch(`${root}/${p}`);if(!r.ok)throw new Error(p);return r.json()};
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 document.querySelectorAll('[data-menu]').forEach(b=>b.addEventListener('click',()=>document.querySelector('.nav')?.classList.toggle('open')));
 const labHost=document.querySelector('[data-labs]');
 if(labHost){try{const d=await get('data/labs.json');labHost.innerHTML=d.labs.map((l,i)=>`<article class="card labcard"><span class="pill">${esc(l.pillar)}</span><div class="iconbox">${['✚','⚡','⌁'][i]}</div><h3>${esc(l.name)}</h3><p>${esc(l.tagline)}</p><ul>${l.focus.slice(0,4).map(x=>`<li>${esc(x)}</li>`).join('')}</ul><a class="more" href="${esc(l.url)}" target="_blank" rel="noopener">Visit ${esc(l.short_name)} ↗</a></article>`).join('')}catch(e){labHost.innerHTML='<p class="empty">Lab directory data could not be loaded. Check the data/labs.json path.</p>'}}
 const peopleHost=document.querySelector('[data-people]');
 if(peopleHost){try{const d=await get('data/people.json');const render=arr=>peopleHost.innerHTML=arr.map(p=>`<article class="person"><h3>${esc(p.name)}</h3><div class="role">${esc(p.role)}</div><p><strong>${esc(p.domain)}</strong></p><p>${esc(p.contribution)}</p></article>`).join('');render(d);const s=document.querySelector('[data-people-search]');s?.addEventListener('input',()=>render(d.filter(p=>(p.name+' '+p.domain+' '+p.role).toLowerCase().includes(s.value.toLowerCase()))))}catch(e){peopleHost.innerHTML='<p class="empty">People data could not be loaded.</p>'}}
 const pathwayHost=document.querySelector('[data-pathways]');
 if(pathwayHost){try{const d=await get('data/programmes.json');pathwayHost.innerHTML=d.pathways.map(p=>`<article class="card pathway"><span class="pill">${esc(p.code)}</span><h3>${esc(p.level)}</h3><p>${esc(p.purpose)}</p></article>`).join('')}catch(e){}}
 const year=document.querySelector('[data-year]');if(year)year.textContent=new Date().getFullYear();
})()
