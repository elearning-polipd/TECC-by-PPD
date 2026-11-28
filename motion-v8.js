/* V8 motion layer. No dependencies. Safe to remove: pages work without it. */
(function(){'use strict';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
document.documentElement.classList.add('m8');document.body.classList.add('m8');
function go(){document.body.classList.remove('m8-go');void document.body.offsetWidth;document.body.classList.add('m8-go')}
if(reduce){document.body.classList.add('m8-go')}

/* scroll progress */
const bar=document.createElement('div');bar.className='m8-progress';document.body.appendChild(bar);

/* split plain-text headings into words */
function split(){$$('.report-section h2,.chhead h2,.chbody h2').forEach(h=>{
 if(h.querySelector('.m8w')||h.children.length||h.childNodes.length!==1||h.firstChild.nodeType!==3)return;
 const t=h.textContent.trim();if(!t)return;h.setAttribute('aria-label',t);
 h.innerHTML=t.split(/\s+/).map((w,i)=>'<span class="m8w" aria-hidden="true"><i style="--k:'+i+'">'+w.replace(/&/g,'&amp;')+'</i></span>').join(' ');
 if(reduce||!io)h.classList.add('m8-in');else io.observe(h)})}
const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('m8-in');io.unobserve(e.target)}}),{threshold:.2}):null;
function observe(){$$('.chhead').forEach(h=>{if(!h.classList.contains('m8-in')){if(reduce||!io)h.classList.add('m8-in');else io.observe(h)}});
 $$('.gmas figure').forEach((f,i)=>{if(f.dataset.m8)return;f.dataset.m8=1;f.style.setProperty('--k',i%6);if(reduce||!io)f.classList.add('m8-in');else io.observe(f)})}

/* photo ribbon on the homepage */
function ribbon(){const m=$('.marquee');if(!m||$('.pstrip'))return;
 const P=[['assets/gallery/idx-sesi-skrin-led.webp','Sesi LED'],['assets/gallery/idx-sesi-ramah.webp','Bersama'],['assets/gallery/idx-pensyarah-sesi.webp','Pensyarah'],['assets/gallery/idx-cenderamata-1.webp','Cenderamata'],['assets/gallery/idx-cenderamata-2.webp','Penghargaan']];
 const one=P.map(p=>'<figure><img loading="lazy" decoding="async" alt="" src="'+p[0]+'"><figcaption>'+p[1]+'</figcaption></figure>').join('');
 const s=document.createElement('section');s.className='pstrip';s.setAttribute('aria-hidden','true');s.innerHTML='<div class="pstrip-track">'+one+one+'</div>';
 m.parentNode.insertBefore(s,m.nextSibling);if(reduce)s.style.display='none'}

/* hero gallery autoplay (pauses on hover, focus, touch, hidden tab) */
function autoplay(){const g=$('.v7-hero-gallery');if(!g||reduce||g.dataset.m8)return;g.dataset.m8=1;
 const b=$$('.v7-photo',g);let hold=false,vis=true;
 ['pointerenter','focusin','touchstart'].forEach(e=>g.addEventListener(e,()=>hold=true,{passive:true}));
 ['pointerleave','focusout'].forEach(e=>g.addEventListener(e,()=>hold=false));
 g.addEventListener('touchend',()=>setTimeout(()=>hold=false,6000),{passive:true});
 if('IntersectionObserver' in window)new IntersectionObserver(es=>vis=es[0].isIntersecting).observe(g);
 setInterval(()=>{if(hold||!vis||document.hidden)return;const i=b.findIndex(x=>x.classList.contains('is-active'));(b[(i+1)%b.length]).click()},3800)}

/* parallax + progress */
let tick=false;
function frame(){tick=false;const h=document.documentElement,max=h.scrollHeight-innerHeight;bar.style.transform='scaleX('+(max>0?scrollY/max:0)+')';
 if(!reduce)$$('.v7-roomportrait img,.herofig img').forEach(i=>{const r=i.parentElement.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;i.style.setProperty('--py',((r.top+r.height/2-innerHeight/2)*-.06).toFixed(1)+'px')})}
addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(frame)}},{passive:true});addEventListener('resize',frame);

/* pointer tilt on cards */
function tilt(){if(reduce||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;
 $$('.room-card,.v7-tile,.pstrip figure,.gmas figure').forEach(c=>{if(c.dataset.tilt)return;c.dataset.tilt=1;c.classList.add('m8-tilt');
  c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(800px) rotateX('+(-y*5).toFixed(2)+'deg) rotateY('+(x*6).toFixed(2)+'deg) translateZ(0)'});
  c.addEventListener('pointerleave',()=>c.style.transform='')})}

function all(){split();observe();ribbon();autoplay();tilt();frame()}
const w=window.TECC_RENDER;
if(typeof w==='function')window.TECC_RENDER=function(){const r=w.apply(this,arguments);try{all()}catch(e){}return r};
document.addEventListener('click',e=>{if(e.target.closest('.lang-option')){setTimeout(()=>{all();go()},140)}else if(e.target.closest('.tabbtn,.pillink,.gfilter button')){setTimeout(all,160)}});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{all();go()});else{all();go()}
addEventListener('load',()=>{all()});
})();
