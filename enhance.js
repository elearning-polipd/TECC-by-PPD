/* Navigation enhancements: current page, scroll-spy, menu close, back-to-top. */
document.addEventListener('DOMContentLoaded',()=>{
const page=(location.pathname.split('/').pop()||'index.html');
document.querySelectorAll('#nav a[data-page]').forEach(a=>{if(a.dataset.page===page){a.setAttribute('aria-current','page');a.classList.add('current')}});
const btn=document.getElementById('menu'),nav=document.getElementById('nav');
const close=()=>{if(nav&&nav.classList.contains('open')){nav.classList.remove('open');btn&&btn.setAttribute('aria-expanded','false')}};
nav&&nav.addEventListener('click',e=>{if(e.target.closest('a'))close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
document.addEventListener('click',e=>{if(nav&&!e.target.closest('#nav'))close()});
const links=[...document.querySelectorAll('.reportnav a[href^="#"]')];
if(links.length&&'IntersectionObserver' in window){const map=new Map(links.map(a=>[a.getAttribute('href').slice(1),a]));
 const io=new IntersectionObserver(es=>{es.forEach(en=>{if(en.isIntersecting){links.forEach(a=>{a.classList.remove('active');a.removeAttribute('aria-current')});const a=map.get(en.target.id);if(a){a.classList.add('active');a.setAttribute('aria-current','true');a.scrollIntoView({block:'nearest',inline:'center'})}}})},{rootMargin:'-30% 0px -60% 0px'});
 map.forEach((a,id)=>{const s=document.getElementById(id);s&&io.observe(s)})}
const top=document.createElement('button');top.className='totop';top.type='button';top.setAttribute('aria-label','Back to top');top.textContent='↑';top.hidden=true;document.body.append(top);
top.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
addEventListener('scroll',()=>{top.hidden=scrollY<700},{passive:true});
});
