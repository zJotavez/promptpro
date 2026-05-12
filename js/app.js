/* ===== JV PROMPT PRO — App Logic (PT-BR) ===== */

// === NAV ===
function nav(id){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.querySelectorAll('.mob-item').forEach(n=>n.classList.remove('active'));
  const v=document.getElementById('view-'+id);if(v)v.classList.add('active');
  document.querySelectorAll(`.nav-item[data-view="${id}"]`).forEach(n=>n.classList.add('active'));
  const mm={dashboard:0, library:1, 'image-gen':2, 'copy-gen':3, history:4, favorites:5};
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
  { id: 1, cat: 'celebration', tag: 'Luxo', title: 'Brinde Elegante (Vestido Vermelho)', desc: 'Retrato de corpo inteiro em cenário de celebração com vestido vermelho e taça.', img: 'assets/celebration_1.png', full: `ultra-realistic photo, 8K resolution, full-body studio portrait of a woman standing centered in an elegant indoor celebration setting, facing the camera directly while holding a champagne flute filled with golden sparkling beverage at chest height, posture upright and poised, one arm relaxed at her side, composition balanced and symmetrical

background features a luxurious decorative setup with a large balloon arch on the left side composed of metallic gold and deep burgundy balloons in varying sizes, glossy surfaces reflecting warm light, on the right side a cluster of matching gold and burgundy balloons arranged vertically, behind the subject a curtain backdrop in soft beige tones combined with warm string lights creating a dense bokeh effect of small glowing points, adding depth and a festive ambiance

to the left of the subject, a small round side table with a gold metal frame and thin vertical rods supports a white frosted cake decorated with red berries on top, the cake placed on a simple stand, table surface clean and minimal, positioned slightly behind the subject to maintain depth layering

subject wearing a luxurious floor-length red satin evening gown with a fitted bodice and wide flowing skirt, fabric highly reflective with rich sheen and visible folds cascading to the floor, deep draped neckline with gathered detailing across the chest, a high slit on one side revealing the leg, paired with red high-heeled sandals featuring thin straps, stance stable with weight evenly distributed

facial features accurately matched from the provided reference image, hairstyle, hair texture, hair length, and hair color accurately matched from the provided reference image, body type, physical build, proportions, and overall physique accurately matched from the provided reference image

lighting setup is warm and cinematic, with a soft key light from the front illuminating the subject evenly, complemented by ambient glow from the string lights behind, subtle rim lighting outlining the silhouette and enhancing separation from the background, reflections visible on satin fabric, glass surface, and balloon materials

captured with an 85mm portrait lens, eye-level camera perspective, full-body framing with slight vertical emphasis, shallow depth of field keeping the subject sharply in focus while softly blurring background elements, high dynamic range with rich warm color grading, extremely detailed textures including satin fabric, balloon latex, glass reflections, and cake frosting, natural imperfections such as slight fabric creases, tiny reflections on balloons, and subtle variations in lighting intensity, refined and luxurious celebratory atmosphere` },
  { id: 2, cat: 'celebration', tag: 'Estúdio', title: 'Comemoração 40 Anos', desc: 'Mulher sentada em bloco pedestal com balões de número "40" dourados.', img: 'assets/celebration_2.png', full: `ultra-realistic photo, 8K resolution, studio portrait of a woman seated on a white rectangular pedestal block, centered against a clean light gray seamless background, holding two large metallic gold foil balloons shaped as the numbers “4” and “0”, one in each hand, balloons highly reflective with visible seams, creases, and subtle distortions, catching studio light with bright specular highlights

floor scattered with decorative balloons in gold, champagne, and rose-gold tones, some matte and some metallic, loosely arranged around the base of the pedestal, creating a balanced celebratory composition, soft shadows and faint reflections visible on the smooth studio floor

subject wearing a tailored black outfit consisting of a fitted blazer and slim-cut trousers, paired with a black top underneath, fabric with a subtle matte finish and natural creases along the arms and legs, footwear includes black open-toe high-heeled sandals with thin straps and a glossy finish, legs crossed at the knee in a relaxed seated posture, confident and professional expression. Facial features accurately matched from the provided reference image, hairstyle, hair texture, hair length, and hair color accurately matched from the provided reference image, body type, physical build, proportions, and overall physique accurately matched from the provided reference image. Lighting is clean and commercial, with a soft key light from the front right and subtle fill light, sharp focus on the subject and balloons, high dynamic range, crisp shadows and realistic textures.` },
  { id: 3, cat: 'celebration', tag: 'Festivo', title: 'Festa 60 Anos (Chão)', desc: 'Sentada no chão de madeira com balões "Happy Birthday" e "60" prateados.', img: 'assets/celebration_3.png', full: `ultra-realistic photo, 8K resolution, indoor celebratory portrait of a woman seated on a polished wooden floor, centered composition with a clean white wall background decorated with large metallic silver foil balloon letters forming the phrase “HAPPY BIRTHDAY” arranged in two rows, and a separate set of silver number balloons “60” positioned to the right side, all balloons slightly reflective with visible seams and subtle distortions, attached with thin strings or adhesive points

floor covered with scattered multicolored confetti pieces in various shapes and sizes, creating a festive texture across the foreground, surrounding the subject are multiple balloons resting on the floor including metallic gold balloons, deep blue balloons, and transparent balloons filled with gold confetti, arranged loosely on both sides to frame the subject

subject seated in a relaxed pose with one leg bent inward and the other crossed over, posture casual yet composed, hands resting gently on the knee, wearing a tailored beige suit with matching trousers and a lightweight white blouse underneath, natural fabric folds, barefoot, casual and approachable expression. Facial features accurately matched from the provided reference image, hairstyle, hair texture, hair length, and hair color accurately matched from the provided reference image, body type, physical build, proportions, and overall physique accurately matched from the provided reference image. Lighting is bright and airy with a soft window-light effect, sharp focus on the subject, high dynamic range, realistic textures including wood grain, foil reflection, and confetti.` },
  { id: 4, cat: 'celebration', tag: 'Minimalista', title: 'Bolo Preto (Soprando Velas)', desc: 'Perfil lateral soprando velas "60" em um bolo preto fosco elegante.', img: 'assets/celebration_4.png', full: `ultra-realistic photo, 8K resolution, intimate studio portrait captured in a side-profile composition, featuring a woman holding a two-tier black cake at chest level while gently blowing toward lit number candles “60” on top, small candle flames flickering with subtle motion and warm glow, the subject positioned slightly right of center, facing left toward the cake, creating a dynamic directional composition

the cake is coated in smooth matte black fondant with a refined, velvety texture, clean sharp edges on both tiers, a satin black ribbon wrapped around the base of the top tier tied into a neat bow at the front, placed on a thin round cake board with a subtle reflective edge, minimalist and elegant design emphasizing monochromatic styling

background is a soft neutral beige-to-warm-gray gradient studio backdrop with a diffused circular spotlight effect centered behind the subject, creating a halo-like illumination, faint blurred “60” shape visible in the background as a soft shadow or projection, adding depth and focus. Subject wearing a sleek black sleeveless top with delicate detailing, subtle fabric textures, poised posture, eyes focused softly on the candles, warm ambient glow illuminating the face. Facial features accurately matched from the provided reference image, hairstyle, hair texture, hair length, and hair color accurately matched from the provided reference image, body type, physical build, proportions, and overall physique accurately matched from the provided reference image. Cinematic lighting, deep shadows contrasting with the warm candlelight, sharp focus on the cake and profile, high dynamic range, elegant monochromatic styling.` },
  { id: 5, cat: 'celebration', tag: 'Dourado', title: 'Cenário Luxo 45 Anos', desc: 'Bolo branco matelassê com velas "45" e fundo de cortinas com luzes.', img: 'assets/celebration_5.png', full: `ultra-realistic photo, 8K resolution, elegant indoor celebration scene with a woman standing behind a decorated table, centered composition, framed from mid-thigh upward, luxurious warm-toned environment with beige draped curtains in the background, layered fabric creating soft vertical folds, integrated warm white string lights scattered behind the curtains producing a soft glowing bokeh effect

foreground features a two-tier celebration cake placed on a round white cake stand, cake covered in smooth white fondant with a quilted diamond pattern and small gold bead accents at intersections, both tiers wrapped with satin gold ribbon bands tied into neat bows at the front, top tier decorated with metallic gold number candles “45” lit with small warm flames and subtle melted wax detail, soft glow illuminating the upper surface of the cake

table surface covered in a neutral beige tablecloth, scattered with small round gold confetti pieces, on both sides of the table are dessert arrangements including small sweet treats, macarons, and decorative candles, balanced symmetrically. Subject wearing a refined champagne-colored satin dress, elegant drape and natural sheen, holding a single glass of champagne, standing gracefully with a slight smile. Facial features accurately matched from the provided reference image, hairstyle, hair texture, hair length, and hair color accurately matched from the provided reference image, body type, physical build, proportions, and overall physique accurately matched from the provided reference image. Lighting is warm, inviting, and cinematic, high dynamic range, crisp focus on the subject and cake, softly blurred bokeh background, luxurious aesthetic.` },
  { id: 6, cat: 'celebration', tag: 'Profissional', title: 'Blazer Marfim (40 Anos)', desc: 'Pose profissional com balão champagne "40" e bolo com drip gold.', img: 'assets/celebration_6.png', full: `ultra-realistic photo, 8K resolution, woman standing centered behind a small pedestal table, large metallic number balloon “40” in champagne-gold, minimalist white cake with gold drip, ivory blazer.` },
  { id: 7, cat: 'celebration', tag: 'Ação', title: 'Bolo de Chocolate (45 Anos)', desc: 'Segurando bolo de chocolate para a frente com balões pretos e dourados.', img: 'assets/celebration_7.png', full: `ultra-realistic photo, 8K resolution, close-up studio portrait of a woman centered in frame, holding a round chocolate cake forward toward the camera with both hands, creating a slight foreground emphasis on the cake, composition framed from mid-torso upward, dark neutral studio background with a subtle warm gradient, softly blurred to enhance subject separation, celebratory setup with balloon clusters in the background including matte black balloons, transparent balloons filled with gold confetti, and a prominent metallic gold star-shaped foil balloon positioned to the left side

the cake is richly detailed with glossy dark chocolate ganache coating, smooth reflective surface with natural drips along the sides, topped with chocolate shavings and curls, base edge covered with small chocolate sprinkles, placed on a simple dark plate, on top of the cake are glittery gold number candles “45” with small lit flames producing a warm glow and slight melted wax texture

subject wearing a black velvet or satin evening dress with long sleeves and a subtle V-neck, rich texture with deep shadows and soft highlights, holding the cake confidently with a slight celebratory smile. Facial features accurately matched from the provided reference image, hairstyle, hair texture, hair length, and hair color accurately matched from the provided reference image, body type, physical build, proportions, and overall physique accurately matched from the provided reference image. Professional studio lighting, directional key light creating depth and shape, subtle rim lighting to separate subject from the dark background, high dynamic range, sharp focus on the cake and subject's face.` },
  { id: 8, cat: 'celebration', tag: 'Criativo', title: 'Balões Flutuantes (Branco)', desc: 'Interagindo com balões dourados flutuantes em estúdio all-white.', img: 'assets/celebration_8.png', full: `ultra-realistic photo, 8K resolution, studio scene with a woman seated on a seamless white cyclorama floor, captured in a dynamic candid moment as she lifts both arms upward toward several floating metallic gold balloons above her, balloons suspended mid-air with thin strings barely visible, additional balloon clusters arranged on the left side including a grouped bunch of gold balloons tied to a small white base, and a secondary cluster of white balloons resting on the floor in the background on the right side, minimalistic high-key studio environment

visible studio equipment included in the composition: two large rectangular softbox lights positioned on both sides of the frame, slightly angled inward, with black outer casing and bright diffused panels facing the subject, contributing to a clean commercial photoshoot aesthetic, smooth white background and floor blending seamlessly with soft shadows beneath the subject and props

subject wearing a coordinated all-white outfit consisting of a sleeveless knit-textured top with subtle vertical patterns and a long, lightweight, semi-flowing skirt with soft fabric draping naturally around the legs, paired with white open-toe heeled sandals featuring ankle straps and medium block heels with a natural wood-tone sole, accessories include multiple gold bracelets stacked on one wrist and rings on fingers, hands open and fingers slightly spread in a gesture of playful interaction with the balloons, seated posture slightly reclined with legs bent and angled to the side, feet relaxed on the floor

facial features accurately matched from the provided reference image, hairstyle, hair texture, hair length, and hair color accurately matched from the provided reference image, body type, physical build, proportions, and overall physique accurately matched from the provided reference image

lighting setup is bright, soft, and evenly diffused, with key light coming from the front and slightly above, enhanced by side softboxes creating minimal harsh shadows and smooth skin illumination, subtle specular highlights visible on the metallic balloon surfaces, gentle reflections on the floor, high dynamic range with balanced whites and preserved detail

captured with a 50mm lens, slightly low-to-mid angle perspective enhancing the upward motion of the hands and balloons, shallow to moderate depth of field keeping the subject and foreground balloons sharp while slightly softening distant elements, crisp rendering of textures including knit fabric, smooth balloon latex, and matte studio floor, natural imperfections such as slight creases in clothing, tiny reflections and distortions on balloon surfaces, and minor variations in fabric folds, clean and modern celebratory visual style with a light, airy atmosphere` },
  { id: 9, cat: 'celebration', tag: 'Disco', title: 'Cadeira Acrílica & Prata', desc: 'Look preto strapless com globos de discoteca e balões prata.', img: 'assets/celebration_9.png', full: `ultra-realistic photo, 8K resolution, full-body studio portrait of a woman seated on a transparent acrylic chair, centered composition against a smooth neutral gray seamless background, modern celebratory setup with symmetrical balloon arrangements on both sides consisting of matte black, metallic silver, and reflective chrome balloons, including a prominent silver star-shaped foil balloon on the right side, balloons tied in clustered bunches with thin strings extending to the floor

on the floor surrounding the subject are multiple mirrored disco balls of varying sizes with tiled reflective surfaces, scattering fragmented reflections of light across the glossy studio floor, small metallic star-shaped confetti pieces scattered irregularly across the ground, adding texture and visual detail, subtle reflections visible beneath the chair and decorative elements

subject wearing a strapless black evening gown with a sleek, form-fitting silhouette, smooth matte fabric with slight natural sheen, high slit revealing one leg crossed over the other in a poised seated posture, hem draping naturally with soft folds and fabric tension, paired with open-toe high-heeled sandals featuring thin metallic straps and a glossy finish, accessories include minimal jewelry such as a bracelet on one wrist, arms relaxed with hands resting naturally on the chair arms, posture upright and confident

facial features accurately matched from the provided reference image, hairstyle, hair texture, hair length, and hair color accurately matched from the provided reference image, body type, physical build, proportions, and overall physique accurately matched from the provided reference image

professional studio lighting setup with a soft key light positioned front-center creating even illumination across the subject, subtle fill light reducing shadows, and gentle rim lighting enhancing separation from the background, controlled highlights reflecting off metallic balloons and disco balls, realistic specular highlights on the acrylic chair edges, natural shadow gradients beneath the subject and objects

captured with an 85mm portrait lens, eye-level camera perspective, shallow depth of field keeping the subject sharply in focus while slightly softening background elements, high dynamic range, precise texture rendering including fabric weave, reflective balloon surfaces, mirrored disco tiles, and acrylic transparency, realistic imperfections such as minor creases in fabric, subtle smudges on reflective surfaces, and slight irregularities in confetti placement, clean color grading with balanced contrast and neutral tones, elegant and modern celebratory aesthetic` },
  { id: 10, cat: 'celebration', tag: 'Moderno', title: 'Bolo Drip Gold (58 Anos)', desc: 'Segurando taça atrás de bolo drip com glitter e velas "58".', img: 'assets/celebration_10.png', full: `ultra-realistic photo, 8K resolution, tight medium portrait of a woman standing against a clean, light gray studio background, framed from mid-torso upward, holding a tall champagne flute filled with pale golden sparkling wine in one hand at chest level, and positioned behind a two-tier birthday cake placed on a flat surface in front of her, celebratory composition with symmetrical balloon arrangement in the background featuring metallic gold balloons and transparent balloons filled with black confetti, balloons overlapping and softly out of focus, creating depth

the cake consists of two tiers: the bottom tier covered in dense gold glitter texture with fine reflective particles, the top tier coated in smooth white fondant with glossy metallic gold drip icing flowing naturally down the sides, subtle irregularities in the drip thickness for realism, a neat white ribbon wrapped around the base of the top tier tied into a small bow at the front, on top of the cake are metallic gold number candles “58” with small lit flames and subtle glow. Subject wearing an elegant dark emerald green dress with a modern asymmetrical neckline, soft flowing fabric, holding the glass lightly with natural finger positioning, relaxed and sophisticated posture. Facial features accurately matched from the provided reference image, hairstyle, hair texture, hair length, and hair color accurately matched from the provided reference image, body type, physical build, proportions, and overall physique accurately matched from the provided reference image. Lighting is clean and bright, soft shadows, sharp focus on subject and cake, high dynamic range, realistic textures including glitter, fondant drip, and glass.` },
  { id: 11, cat: 'celebration', tag: 'Elegante', title: 'Cubo Branco (44 Anos)', desc: 'Sentada em cubo branco com bolo delicado e balões rose gold.', img: 'assets/celebration_11.png', full: `ultra-realistic photo, 8K resolution, studio portrait of a woman seated on a clean white cube pedestal, holding a small round birthday cake at chest height with both hands, the cake decorated with smooth white frosting and metallic gold confetti-like accents around the sides, topped with lit number candles “44” emitting small warm flames and subtle glow, elegant celebratory setup with symmetrical clusters of metallic balloons on both sides of the subject, balloons in gold and rose-gold tones with reflective surfaces, tied together in bunches resting on the floor and rising upward, minimalistic light gray seamless studio background, glossy white floor with soft reflections visible beneath the subject and balloons, soft diffused photographic lighting from the front and slightly above creating gentle shadows and even skin tone illumination, subtle rim light separating the subject from the background, high dynamic range, sharp focus on the subject and cake, shallow depth of field slightly softening distant balloons` },
  { id: 12, cat: 'celebration', tag: 'Ar Livre', title: 'Parque Ensolarado (29 Anos)', desc: 'Jovem ao ar livre segurando bolo branco com velas "29" em parque ensolarado.', img: 'assets/celebration_12.png', full: `Ultra-realistic photo, 8K resolution, young woman standing outdoors in a sunlit park holding a round birthday cake toward the camera with both hands, medium close-up portrait composition, centered framing, direct eye contact with the camera, relaxed and natural pose, genuine warm smile, facial features accurately matched from the provided reference image, hairstyle, hair texture, hair length, and hair color accurately matched from the provided reference image, body type, physical build, proportions, and overall physique accurately matched from the provided reference image.

The subject is wearing a black satin spaghetti-strap camisole with delicate black lace trim along the neckline, subtle fabric sheen, realistic folds and natural fabric tension, visible collarbones and shoulders, natural arm positioning while holding the cake, realistic skin texture with natural imperfections, soft pores, subtle tonal variations, realistic fingernails and hand anatomy.

The birthday cake is a small elegant round cake with smooth white fondant icing, evenly spaced metallic gold pearl decorations around the sides and top surface, black flower decoration centered on top, reflective golden cake base tray, realistic fondant texture, subtle imperfections and handcrafted details. Two metallic gold number candles “2” and “9” are lit on top of the cake, visible candle flames with warm glow, realistic melted wax details and soft flame illumination affecting nearby surfaces.

Outdoor park environment during golden hour, lush green grass field, colorful flowerbeds in the background with red, yellow, orange, and white flowers, tall trees softly blurred in the distance, warm sunset sunlight casting long soft shadows across the grass, cinematic natural lighting, warm color palette, soft ambient highlights on skin and cake surfaces, realistic environmental depth.

Shallow depth of field with creamy background bokeh, professional portrait photography aesthetic, high-end DSLR or mirrorless camera quality, 85mm portrait lens, f/1.8 aperture look, natural perspective, ultra-detailed textures, realistic lighting transitions, accurate skin reflectance, realistic fabric rendering, subtle atmospheric haze from sunset light, photorealistic color grading, high dynamic range, crisp focus on the subject and cake, natural outdoor illumination, premium lifestyle photography style, authentic candid atmosphere, realistic optical imperfections, ultra-sharp foreground details with smooth background separation.` },
  { id: 13, cat: 'celebration', tag: 'Elegante', title: 'Vestido Verde Esmeralda', desc: 'Mulher madura sentada no chão com balões e bolo verde esmeralda em estúdio.', img: 'assets/celebration_13.png', full: `Ultra-realistic photo, 8K resolution, mature woman posing in a professional indoor studio environment, seated gracefully on the floor with legs positioned to the side, relaxed elegant posture, one hand resting on the floor for support and the other gently placed over the dress, warm natural smile directed toward the camera, facial features accurately matched from the provided reference image, hairstyle, hair texture, hair length, and hair color accurately matched from the provided reference image, body type, physical build, proportions, and overall physique accurately matched from the provided reference image.

The subject is wearing a long emerald green sequin gown with full-length sleeves, highly reflective sequined fabric with dense sparkle texture, elegant flowing silhouette, realistic fabric folds and draping across the seated pose, subtle stretch and compression in the fabric around the torso and legs, realistic textile reflections from studio lighting, sophisticated eveningwear styling. Bare feet visible with natural relaxed positioning, realistic skin texture on hands and feet, natural imperfections and authentic anatomy details.

Studio setup with a clean seamless light gray backdrop and floor, minimalist professional portrait environment, balanced composition with decorative celebration elements. To the left side of the frame, a cluster of helium balloons in deep emerald green metallic finish and transparent balloons filled with metallic green confetti dots, realistic balloon reflections, glossy latex texture, thin translucent balloon strings visible. To the right side near the subject, an elegant round dark emerald green cake placed on a white cake board, smooth fondant finish with decorative satin ribbon bows around the sides and top, matte fondant texture contrasting with subtle satin ribbon sheen, handcrafted cake detailing with realistic edges and shadows.

Professional studio lighting setup with soft diffused key light, subtle fill lighting, gentle shadows beneath the subject and props, controlled reflections on sequins and balloons, soft specular highlights across the dress surface, evenly illuminated scene with clean commercial portrait quality. Medium-wide portrait composition, eye-level camera perspective, balanced symmetrical framing with decorative elements surrounding the subject.

Shot with a high-end full-frame DSLR or mirrorless camera, 50mm portrait lens, ultra-sharp focus on the subject, moderate depth of field maintaining clarity across the foreground props and subject, crisp studio detail rendering, realistic skin texture, natural fabric shimmer behavior, physically accurate reflections, photorealistic color grading emphasizing emerald green tones, premium editorial portrait photography style, highly detailed materials and textures, subtle natural imperfections, realistic studio atmosphere, commercial luxury celebration portrait aesthetic.` },
  { id: 14, cat: 'celebration', tag: 'Estúdio', title: 'Sentada com Velas 60', desc: 'Mulher sentada em banco alto segurando velas "60" com balões verdes e globo espelhado.', img: 'assets/celebration_14.png', full: `Ultra-realistic photo, 8K resolution, mature woman seated on a tall black minimalist stool in a professional indoor studio environment, full-body portrait composition, centered framing with ample negative space, relaxed elegant posture with legs crossed at the ankles, warm natural smile directed toward the camera, both hands gently holding lit “60” birthday candles at chest level, facial features accurately matched from the provided reference image, hairstyle, hair texture, hair length, and hair color accurately matched from the provided reference image, body type, physical build, proportions, and overall physique accurately matched from the provided reference image.

The subject is wearing a sophisticated emerald green sequined midi dress with long sleeves, subtle puff shoulders, gathered waist detail with tied fabric knot accent, highly reflective sequin texture producing realistic sparkle highlights, elegant draping across the seated pose, realistic textile folds and compression around the waist and knees, luxurious eveningwear aesthetic. Nude open-toe block-heel sandals with ankle straps, realistic leather texture and natural foot positioning. Gold wristwatch on one wrist and small delicate earrings visible, subtle metallic reflections from studio lighting. Hands holding metallic “60” number candles with small realistic flames and melted wax details, warm candlelight subtly illuminating the fingers and nearby fabric.

Clean seamless white studio backdrop and floor with minimalist editorial styling. Decorative arrangement of balloons scattered symmetrically around the stool, including glossy metallic emerald green balloons, lighter teal metallic balloons, and transparent balloons filled with green metallic confetti dots. Balloons feature realistic latex reflections, subtle surface imperfections, visible tied ends, and natural placement shadows on the floor. Silver mirrored disco ball positioned in the foreground near the subject’s feet, highly reflective mosaic mirror tiles producing realistic fragmented reflections and highlights. Gold and metallic confetti pieces scattered organically across the white floor surface, adding celebratory atmosphere.

Professional studio lighting setup with large softboxes creating smooth even illumination, soft diffused shadows beneath the stool and decorative objects, controlled specular highlights on sequins, balloons, and disco ball surfaces, balanced high-key lighting aesthetic with clean commercial portrait quality. Eye-level camera perspective, medium distance framing, premium editorial birthday photoshoot style.

Captured with a high-end full-frame DSLR or mirrorless camera, 50mm portrait lens, sharp focus throughout the subject and foreground elements, moderate depth of field preserving environmental clarity, ultra-detailed material rendering, realistic skin texture with natural imperfections, authentic fabric shimmer behavior, physically accurate reflections and light bounce, photorealistic color grading emphasizing emerald and teal tones, commercial luxury portrait photography aesthetic, elegant celebratory atmosphere, realistic studio environment, high dynamic range, ultra-clean image quality with subtle natural optical imperfections.` }
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

// === API CONFIG ===
const OPENAI_KEY = '';

// === IMAGE GENERATOR (REAL DALL-E 3) ===
async function genImage(){
  const prompt=document.getElementById('imgPrompt').value.trim();
  if(!prompt){toast('⚠️ Digite um prompt primeiro','error');return;}
  
  const gallery=document.getElementById('imgGallery');
  const originalContent = gallery.innerHTML;
  gallery.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:40px"><div class="skeleton" style="width:48px;height:48px;border-radius:50%;margin:0 auto 12px"></div><p style="color:var(--on-dim);font-size:13px">Conectando ao DALL-E 3... Gerando arte...</p></div>';
  
  const model=document.getElementById('imgModel').value;
  const style=document.getElementById('imgStyle').value;
  const finalPrompt = `${prompt} --style ${style} --ar 1:1, ultra-realistic, 8k, cinematic lighting, masterpiece`;

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: finalPrompt,
        n: 1,
        size: "1024x1024",
        quality: "hd"
      })
    });

    const data = await response.json();
    if(data.error) throw new Error(data.error.message);

    const url = data.data[0].url;
    const img={url,prompt,model:"DALL-E 3",style,time:new Date().toISOString()};
    images.unshift(img);
    if(images.length>20) images.pop();
    localStorage.setItem('jvpp-imgs',JSON.stringify(images));
    
    renderImgGallery(); renderHistGallery();
    toast('🎨 Imagem gerada com sucesso pela OpenAI!','success');
  } catch (err) {
    gallery.innerHTML = originalContent;
    toast('❌ Erro na API: ' + err.message, 'error');
  }
}

// === PROMPT REFINER (REAL GPT-4o) ===
async function genRefinedPrompt(){
  const prompt=document.getElementById('copyPrompt').value.trim();
  const instr=document.getElementById('refineInstructions').value.trim();
  if(!prompt || !instr){toast('⚠️ Preencha o prompt e a instrução','error');return;}
  
  const rd=document.getElementById('copyResult');const out=document.getElementById('copyOut');
  rd.style.display='block';
  out.innerHTML='<div class="skeleton skel-line w80"></div><div class="skeleton skel-line"></div><p style="font-size:11px;color:var(--on-muted)">GPT-4o está analisando e otimizando seu prompt...</p>';
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "Você é um engenheiro de prompts especialista em Midjourney e DALL-E. Sua tarefa é pegar um prompt base e aplicar instruções de modificação do usuário, transformando-os em um prompt técnico em INGLÊS, ultra-detalhado, focando em iluminação cinematográfica, texturas 8K e fotorrealismo. Retorne APENAS o prompt final." },
          { role: "user", content: `Prompt Base: ${prompt}\nInstruções de Mudança: ${instr}` }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    if(data.error) throw new Error(data.error.message);

    const newPrompt = data.choices[0].message.content.trim();
    out.textContent = newPrompt;
    toast('✅ Prompt refinado com GPT-4o!','success');
  } catch (err) {
    out.textContent = "Erro ao processar prompt.";
    toast('❌ Erro na API: ' + err.message, 'error');
  }
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
