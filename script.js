const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const savedTheme = localStorage.getItem('ta-theme');
if (savedTheme) root.dataset.theme = savedTheme;
function updateThemeButton(){
  const dark = root.dataset.theme === 'dark';
  themeIcon.textContent = dark ? '☀' : '☾';
  themeToggle.setAttribute('aria-label', dark ? 'Ativar modo claro' : 'Ativar modo escuro');
  themeToggle.title = dark ? 'Ativar modo claro' : 'Ativar modo escuro';
}
updateThemeButton();
themeToggle.addEventListener('click',()=>{
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('ta-theme',root.dataset.theme);
  updateThemeButton();
});

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click',()=>{
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',String(open));
  menuToggle.textContent = open ? '×' : '☰';
});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  navLinks.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰';
}));

const toTop = document.getElementById('toTop');
window.addEventListener('scroll',()=>toTop.classList.toggle('visible',window.scrollY>420),{passive:true});
toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const revealObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');revealObserver.unobserve(entry.target);}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const galleryItems = [
 {src:'assets/tela-inicial-cadastro-original.jpg',alt:'Telas originais: início e cadastro de notas',caption:'Tela inicial e cadastro de notas.'},
 {src:'assets/tela-grafico-evolucao-original.jpg',alt:'Tela original do gráfico de evolução',caption:'Gráfico de evolução.'},
 {src:'assets/tela-calcular-notas-original.jpg',alt:'Tela original de calcular notas',caption:'Calcular notas.'},
 {src:'assets/tela-atividades-original.jpg',alt:'Tela original de atividades',caption:'Atividades.'},
 {src:'assets/tela-notas-por-materia-original.jpg',alt:'Tela original de notas por matéria',caption:'Notas por matéria.'}
];
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
let activeIndex = 0;
function showImage(index){
 activeIndex=(index+galleryItems.length)%galleryItems.length;
 const item=galleryItems[activeIndex];lightboxImage.src=item.src;lightboxImage.alt=item.alt;lightboxCaption.textContent=item.caption;
}
function openLightbox(index){showImage(index);lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';document.getElementById('lightboxClose').focus();}
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow='';}
document.querySelectorAll('.gallery-card').forEach(card=>card.addEventListener('click',()=>openLightbox(Number(card.dataset.index))));
document.getElementById('lightboxClose').addEventListener('click',closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click',()=>showImage(activeIndex-1));
document.getElementById('lightboxNext').addEventListener('click',()=>showImage(activeIndex+1));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener('keydown',e=>{
 if(!lightbox.classList.contains('open'))return;
 if(e.key==='Escape')closeLightbox();
 if(e.key==='ArrowLeft')showImage(activeIndex-1);
 if(e.key==='ArrowRight')showImage(activeIndex+1);
});
