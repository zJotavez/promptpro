/* ===== JV PROMPT PRO — App Logic (PT-BR) ===== */

// === NAV ===
function nav(id){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.querySelectorAll('.mob-item').forEach(n=>n.classList.remove('active'));
  const v=document.getElementById('view-'+id);if(v)v.classList.add('active');
  document.querySelectorAll(`.nav-item[data-view="${id}"]`).forEach(n=>n.classList.add('active'));
  const mm={dashboard:0,library:1,history:2,favorites:3};
  if(mm[id]!==undefined)document.querySelectorAll('.mob-item')[mm[id]]?.classList.add('active');
  document.getElementById('sidebar')?.classList.remove('open');
  window.scrollTo(0,0);
  if(id==='library')renderPrompts();
  if(id==='favorites')renderFavs();
  if(id==='history'){renderHistGallery();renderTimeline();}
  if(id==='image-gen')renderImgGallery();
}

// === TOAST ===
function toast(msg,type='info'){
  document.querySelectorAll('.toast').forEach(t=>t.remove());
  const t=document.createElement('div');
  t.className='toast '+type;
  const icons={success:'check_circle',info:'info',error:'error'};
  t.innerHTML=`<span class="material-symbols-outlined" style="font-size:18px">${icons[type]||'info'}</span>${msg}`;
  document.body.appendChild(t);
  setTimeout(()=>{t.style.animation='toastOut .25s var(--ease) forwards';setTimeout(()=>t.remove(),250)},2800);
}

// === COUNTERS ===
function animCounters(){
  document.querySelectorAll('.stat-value[data-target]').forEach(el=>{
    const target=+el.dataset.target;const dur=1200;const step=Math.ceil(target/(dur/16));
    let cur=0;const ti=setInterval(()=>{cur+=step;if(cur>=target){cur=target;clearInterval(ti)}el.textContent=cur.toLocaleString('pt-BR')},16);
  });
}

// === TABS ===
function switchTab(btn,tabId){
  btn.closest('.tabs').querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  const parent=btn.closest('.view')||btn.closest('main');
  parent.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
  document.getElementById(tabId)?.classList.add('active');
}

// === CLIPBOARD ===
function copyText(text){
  navigator.clipboard.writeText(text).then(()=>toast('✅ Copiado para a área de transferência!','success'));
}

// === PROMPTS DATA ===
const PROMPTS = [
  { id: 1, cat: 'celebration', tag: 'Luxo', title: 'Brinde Elegante (Vestido Vermelho)', desc: 'Retrato de corpo inteiro em cenário de celebração com vestido vermelho e taça.', img: 'assets/celebration_1.png', full: `ultra-realistic photo, 8K resolution, full-body studio portrait of a woman standing centered in an elegant indoor celebration setting, facing the camera directly while holding a champagne flute filled with golden sparkling beverage at chest height, background metallic gold and deep burgundy balloons, red evening gown with high slit.` },
  { id: 2, cat: 'celebration', tag: 'Estúdio', title: 'Comemoração 40 Anos', desc: 'Mulher sentada em bloco pedestal com balões de número "40" dourados.', img: 'assets/celebration_2.png', full: `ultra-realistic photo, 8K resolution, studio portrait of a woman seated on a white rectangular pedestal block, centered against a clean light gray seamless background, holding two large metallic gold foil balloons shaped as the numbers “4” and “0”, black tailored blazer and trousers.` },
  { id: 3, cat: 'celebration', tag: 'Festivo', title: 'Festa 60 Anos (Chão)', desc: 'Sentada no chão de madeira com balões "Happy Birthday" e "60" prateados.', img: 'assets/celebration_3.png', full: `ultra-realistic photo, 8K resolution, indoor celebratory portrait of a woman seated on a polished wooden floor, white wall background decorated with large metallic silver foil balloon letters forming the phrase “HAPPY BIRTHDAY” and silver number balloons “60”, beige suit.` },
  { id: 4, cat: 'celebration', tag: 'Minimalista', title: 'Bolo Preto (Soprando Velas)', desc: 'Perfil lateral soprando velas "60" em um bolo preto fosco elegante.', img: 'assets/celebration_4.png', full: `ultra-realistic photo, 8K resolution, side-profile composition, woman holding a two-tier black cake at chest level while gently blowing toward lit number candles “60” on top, matte black fondant cake, warm studio glow.` },
  { id: 5, cat: 'celebration', tag: 'Dourado', title: 'Cenário Luxo 45 Anos', desc: 'Bolo branco matelassê com velas "45" e fundo de cortinas com luzes.', img: 'assets/celebration_5.png', full: `ultra-realistic photo, 8K resolution, elegant indoor celebration scene, woman standing behind a decorated table, two-tier white cake with gold number candles “45”, champagne glass, background beige curtains with bokeh lights.` },
  { id: 6, cat: 'celebration', tag: 'Profissional', title: 'Blazer Marfim (40 Anos)', desc: 'Pose profissional com balão champagne "40" e bolo com drip gold.', img: 'assets/celebration_6.png', full: `ultra-realistic photo, 8K resolution, woman standing centered behind a small pedestal table, large metallic number balloon “40” in champagne-gold, minimalist white cake with gold drip, ivory blazer.` },
  { id: 7, cat: 'celebration', tag: 'Ação', title: 'Bolo de Chocolate (45 Anos)', desc: 'Segurando bolo de chocolate para a frente com balões pretos e dourados.', img: 'assets/celebration_7.png', full: `ultra-realistic photo, 8K resolution, close-up studio portrait, woman holding a round chocolate cake forward toward the camera, glossy chocolate ganache, gold number candles “45”, black balloons background.` },
  { id: 8, cat: 'celebration', tag: 'Criativo', title: 'Balões Flutuantes (Branco)', desc: 'Interagindo com balões dourados flutuantes em estúdio all-white.', img: 'assets/celebration_8.png', full: `ultra-realistic photo, 8K resolution, studio scene, woman seated on white cyclorama floor, lifting both arms upward toward floating metallic gold balloons, all-white outfit, visible softbox lights in background.` },
  { id: 9, cat: 'celebration', tag: 'Disco', title: 'Cadeira Acrílica & Prata', desc: 'Look preto strapless com globos de discoteca e balões prata.', img: 'assets/celebration_9.png', full: `ultra-realistic photo, 8K resolution, woman seated on a transparent acrylic chair, gray background, symmetrical balloon arrangements in matte black and metallic silver, mirrored disco balls on floor, strapless black evening gown.` },
  { id: 10, cat: 'celebration', tag: 'Moderno', title: 'Bolo Drip Gold (58 Anos)', desc: 'Segurando taça atrás de bolo drip com glitter e velas "58".', img: 'assets/celebration_10.png', full: `ultra-realistic photo, 8K resolution, tight medium portrait, woman holding champagne flute, behind a two-tier gold drip birthday cake with metallic gold number candles “58”, gold and transparent balloons background.` },
  { id: 11, cat: 'celebration', tag: 'Elegante', title: 'Cubo Branco (44 Anos)', desc: 'Sentada em cubo branco com bolo delicado e balões rose gold.', img: 'assets/celebration_11.png', full: `ultra-realistic photo, 8K resolution, studio portrait of a woman seated on a clean white cube pedestal, holding a small round white birthday cake with gold number candles “44”, gold and rose-gold balloons.` }
];

let favs = JSON.parse(localStorage.getItem('jvpp-favs') || '[]');
let curFilter = 'all';

function renderPrompts(filter, search) {
  filter = filter || curFilter; search = search || '';
  const grid = document.getElementById('promptsGrid'); if (!grid) return;
  const list = PROMPTS.filter(p => {
    const ms = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
    return ms;
  });
  if (!list.length) { grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><span class="material-symbols-outlined">search_off</span><h4>Nenhum prompt encontrado</h4><p>Tente buscar por outro termo.</p></div>'; return; }
  grid.innerHTML = list.map(p => {
    const isFav = favs.includes(p.id);
    return `<div class="glass-card prompt-card card-glow">
      <button class="fav-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation();toggleFav(${p.id})"><span class="material-symbols-outlined" style="font-size:16px">${isFav ? 'favorite' : 'favorite_border'}</span></button>
      <div class="card-preview" style="background-image: url('${p.img}'); background-size: cover; background-position: center;">
        <div class="cat-badge cat-premium">${p.tag}</div>
      </div>
      <div class="card-body"><h3>${p.title}</h3><p>${p.desc}</p></div>
      <div class="card-actions">
        <button class="btn btn-primary btn-sm" onclick="usePrompt(${p.id})"><span class="material-symbols-outlined">auto_fix</span>Usar & Adaptar</button>
        <button class="btn btn-secondary btn-sm" onclick="copyText('${p.full.replace(/'/g, "\\'")}')"><span class="material-symbols-outlined">content_copy</span>Copiar</button>
      </div>
    </div>`;
  }).join('');
}

function filterCat(el,cat){
  el.closest('.chips').querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');curFilter=cat;filterPrompts();
}
function filterPrompts(){renderPrompts(curFilter,document.getElementById('promptSearch')?.value||'');}

function usePrompt(id){
  const p=PROMPTS.find(x=>x.id===id);if(!p)return;
  if(p.use==='image'){nav('image-gen');setTimeout(()=>{document.getElementById('imgPrompt').value=p.full},100);}
  else{nav('copy-gen');setTimeout(()=>{document.getElementById('copyPrompt').value=p.full},100);}
  toast('✨ Prompt carregado! Clique em Gerar.','success');
}

function toggleFav(id){
  if(favs.includes(id))favs=favs.filter(x=>x!==id);else favs.push(id);
  localStorage.setItem('jvpp-favs',JSON.stringify(favs));
  renderPrompts();renderFavs();
  toast(favs.includes(id)?'❤️ Adicionado aos favoritos!':'💔 Removido dos favoritos',favs.includes(id)?'success':'info');
}

function renderFavs(){
  const grid=document.getElementById('favsGrid');if(!grid)return;
  const list=PROMPTS.filter(p=>favs.includes(p.id));
  if(!list.length){grid.innerHTML='<div class="empty-state" style="grid-column:1/-1"><span class="material-symbols-outlined">favorite_border</span><h4>Nenhum favorito ainda</h4><p>Clique no ❤️ em qualquer prompt para salvá-lo aqui.</p></div>';return;}
  grid.innerHTML=list.map(p=>{
    const catClass={sales:'cat-sales',marketing:'cat-marketing',code:'cat-code',seo:'cat-seo'}[p.cat]||'';
    return `<div class="glass-card prompt-card card-glow">
      <button class="fav-btn active" onclick="event.stopPropagation();toggleFav(${p.id})"><span class="material-symbols-outlined" style="font-size:16px">favorite</span></button>
      <div class="card-preview" style="background:linear-gradient(135deg,${p.colors[0]},${p.colors[1]})"><span class="material-symbols-outlined" style="font-size:48px;color:${p.colors[2]};opacity:.25">${p.icon}</span><div class="cat-badge ${catClass}">${p.tag}</div></div>
      <div class="card-body"><h3>${p.title}</h3><p>${p.desc}</p></div>
      <div class="card-actions"><button class="btn btn-primary btn-sm" onclick="usePrompt(${p.id})"><span class="material-symbols-outlined">play_arrow</span>Usar</button><button class="btn btn-secondary btn-sm" onclick="copyText('${p.full.replace(/'/g,"\\'")}')"><span class="material-symbols-outlined">content_copy</span>Copiar</button></div>
    </div>`;
  }).join('');
}

// === IMAGE GENERATOR ===
const RAND_PROMPTS=['Uma cidade cyberpunk deslumbrante ao pôr do sol com reflexos neon nas ruas molhadas, iluminação cinematográfica','Uma instalação de arte digital com formas geométricas brilhantes suspensas em uma galeria minimalista','Uma paisagem surreal em um planeta alienígena com flora bioluminescente em tons de azul elétrico e púrpura','Um retrato hiper-realista de um androide futurista com pele cromada e olhos holográficos','Uma biblioteca antiga massiva com livros flutuantes e feixes de luz dourada mágica','Um carro de Fórmula 1 feito inteiramente de cristal, correndo em uma pista iluminada por neon à noite','Um izakaya japonês aconchegante à noite durante a chuva, luz quente de lanternas refletindo nas poças','Uma visualização de dados abstrata renderizada como um rio de partículas de luz no espaço profundo'];

function randPrompt(){document.getElementById('imgPrompt').value=RAND_PROMPTS[Math.floor(Math.random()*RAND_PROMPTS.length)];}

let images=JSON.parse(localStorage.getItem('jvpp-imgs')||'[]');

function genImage(){
  const prompt=document.getElementById('imgPrompt').value.trim();
  if(!prompt){toast('⚠️ Digite um prompt primeiro','error');return;}
  const gallery=document.getElementById('imgGallery');
  gallery.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:40px"><div class="skeleton" style="width:48px;height:48px;border-radius:50%;margin:0 auto 12px"></div><p style="color:var(--on-dim);font-size:13px">Gerando sua imagem...</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:20px"><div class="skeleton skel-block"></div><div class="skeleton skel-block"></div></div></div>';
  const model=document.getElementById('imgModel').value;
  const style=document.getElementById('imgStyle').value;
  setTimeout(()=>{
    const c=document.createElement('canvas');c.width=512;c.height=512;const x=c.getContext('2d');
    const palettes=[['#0a0e27','#1a0a3e','#00F0FF','#3B82F6'],['#0d1117','#161b22','#58a6ff','#f778ba'],['#1a1a2e','#16213e','#e94560','#0f3460'],['#0f0c29','#302b63','#24243e','#00F0FF'],['#0a2540','#0d3158','#00f0ff','#34d399']];
    const pal=palettes[Math.floor(Math.random()*palettes.length)];
    const bg=x.createLinearGradient(0,0,512,512);bg.addColorStop(0,pal[0]);bg.addColorStop(1,pal[1]);x.fillStyle=bg;x.fillRect(0,0,512,512);
    for(let i=0;i<10;i++){x.beginPath();const px=Math.random()*512,py=Math.random()*512,r=30+Math.random()*140;const g=x.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,pal[2]+'35');g.addColorStop(1,'transparent');x.fillStyle=g;x.arc(px,py,r,0,Math.PI*2);x.fill();}
    x.strokeStyle=pal[3]+'25';x.lineWidth=.8;for(let i=0;i<15;i++){x.beginPath();x.moveTo(Math.random()*512,Math.random()*512);x.lineTo(Math.random()*512,Math.random()*512);x.stroke();}
    for(let i=0;i<4;i++){x.beginPath();const sz=20+Math.random()*60;const px=Math.random()*512,py=Math.random()*512;x.strokeStyle=pal[2]+'20';x.lineWidth=1;x.rect(px,py,sz,sz);x.stroke();}
    const cg=x.createRadialGradient(256,256,0,256,256,180);cg.addColorStop(0,pal[2]+'12');cg.addColorStop(1,'transparent');x.fillStyle=cg;x.fillRect(0,0,512,512);
    const url=c.toDataURL('image/png');
    const img={url,prompt,model,style,time:new Date().toISOString()};
    images.unshift(img);if(images.length>20)images.pop();
    localStorage.setItem('jvpp-imgs',JSON.stringify(images));
    renderImgGallery();renderHistGallery();
    toast('🎨 Imagem gerada com sucesso!','success');
  },2200);
}

function renderImgGallery(){
  const g=document.getElementById('imgGallery');if(!g)return;
  if(!images.length){g.innerHTML='<div class="empty-state" style="grid-column:1/-1"><span class="material-symbols-outlined">add_photo_alternate</span><h4>Nenhuma imagem gerada</h4><p>Suas imagens aparecerão aqui após a geração.</p></div>';return;}
  g.innerHTML=images.map((img,i)=>`<div class="gallery-item"><img src="${img.url}" alt="${img.prompt}"><div class="overlay"><p>${img.prompt.substring(0,70)}...</p><div class="overlay-actions"><button class="btn-icon" onclick="downloadImg(${i})" title="Baixar"><span class="material-symbols-outlined" style="font-size:16px">download</span></button><button class="btn-icon" onclick="copyText('${img.prompt.replace(/'/g,"\\'")}')" title="Copiar prompt"><span class="material-symbols-outlined" style="font-size:16px">content_copy</span></button><button class="btn-icon" onclick="delImg(${i})" title="Excluir"><span class="material-symbols-outlined" style="font-size:16px">delete</span></button></div></div></div>`).join('');
}

function downloadImg(i){
  const a=document.createElement('a');a.href=images[i].url;a.download='jvpp-image-'+(i+1)+'.png';a.click();
  toast('⬇️ Download iniciado!','success');
}
function delImg(i){
  images.splice(i,1);localStorage.setItem('jvpp-imgs',JSON.stringify(images));
  renderImgGallery();renderHistGallery();toast('🗑️ Imagem excluída','info');
}

// === PROMPT REFINER (ANTIGO COPY GEN) ===
function genRefinedPrompt(){
  const prompt=document.getElementById('copyPrompt').value.trim();
  const instr=document.getElementById('refineInstructions').value.trim();
  if(!prompt || !instr){toast('⚠️ Preencha o prompt e a instrução','error');return;}
  
  const rd=document.getElementById('copyResult');const out=document.getElementById('copyOut');
  rd.style.display='block';
  out.innerHTML='<div class="skeleton skel-line w80"></div><div class="skeleton skel-line"></div>';
  
  setTimeout(()=>{
    // Simulação inteligente de atualização de prompt
    let newPrompt = prompt;
    
    // Lógica simples de substituição para demonstração (ex: idade)
    if(instr.toLowerCase().includes('anos')){
      const ageMatch = instr.match(/\d+/);
      if(ageMatch) newPrompt = newPrompt.replace(/\d+ anos/g, ageMatch[0] + ' anos').replace(/“\d+”/g, `“${ageMatch[0]}”`);
    }
    
    // Adiciona as novas instruções de forma técnica
    newPrompt = newPrompt + ", refined with: " + instr + ", cinematic lighting, detailed textures, 8K resolution.";
    
    out.textContent = newPrompt;
    toast('✅ Prompt refinado com sucesso!','success');
  },1500);
}

function useRefinedPrompt(){
  const newPrompt = document.getElementById('copyOut').textContent;
  nav('image-gen');
  setTimeout(()=>{
    document.getElementById('imgPrompt').value = newPrompt;
    toast('✨ Novo prompt carregado no gerador!','success');
  },100);
}

// === HISTORY ===
function renderHistGallery(){
  const g=document.getElementById('histGallery');if(!g)return;
  if(!images.length){g.innerHTML='<div class="empty-state" style="grid-column:1/-1"><span class="material-symbols-outlined">photo_library</span><h4>Nenhuma criação ainda</h4><p>Suas imagens geradas aparecerão aqui.</p></div>';return;}
  g.innerHTML=images.slice(0,6).map((img,i)=>`<div class="hist-item"><img src="${img.url}" alt="${img.prompt}"><div class="caption">${img.prompt.substring(0,60)}...</div><div class="hover-actions"><button class="btn-icon" onclick="downloadImg(${i})" style="width:28px;height:28px"><span class="material-symbols-outlined" style="font-size:14px">download</span></button><button class="btn-icon" onclick="copyText('${img.prompt.replace(/'/g,"\\'")}')" style="width:28px;height:28px"><span class="material-symbols-outlined" style="font-size:14px">content_copy</span></button><button class="btn-icon" onclick="delImg(${i})" style="width:28px;height:28px"><span class="material-symbols-outlined" style="font-size:14px">delete</span></button></div></div>`).join('');
}

function renderTimeline(){
  const l=document.getElementById('timelineList');if(!l)return;
  const ev=[{t:'Gerou imagem de cidade cyberpunk',time:'2 horas atrás'},{t:'Criou sequência de emails de lançamento SaaS',time:'5 horas atrás'},{t:'Salvou prompt de componente React glassmorphism',time:'1 dia atrás'},{t:'Gerou arte de paisagem alienígena',time:'2 dias atrás'},{t:'Criou outline de post SEO',time:'3 dias atrás'},{t:'Atualizou configurações da conta',time:'1 semana atrás'}];
  l.innerHTML=ev.map(e=>`<div class="timeline-item"><div class="timeline-dot"></div><div><h4>${e.t}</h4><p>${e.time}</p></div></div>`).join('');
}

// === INIT ===
document.addEventListener('DOMContentLoaded',()=>{
  animCounters();renderPrompts();renderFavs();renderImgGallery();renderHistGallery();renderTimeline();
});
