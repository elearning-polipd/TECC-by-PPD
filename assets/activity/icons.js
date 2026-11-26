/* Connects assets/icons/*.webp to the UI. Idempotent; re-runs after every render / language change. */
(function(){
const P='assets/icons/',$$=(s,r=document)=>[...r.querySelectorAll(s)];
const img=(n,c)=>{const i=document.createElement('img');i.src=P+n+'.webp';i.alt='';i.width=48;i.height=48;i.decoding='async';i.setAttribute('aria-hidden','true');i.className='ico '+(c||'');return i};
const TAB={intro:'pengenalan',admin:'pentadbiran',dash:'dashboard',usage:'penggunaan',analysis:'analisis',highlights:'sorotan',improve:'penambahbaikan',attach:'lampiran'};
const LEG=['kelas','tecc2-kolaboratif','jabatan','tempahan','semak','pentadbiran'];
const GF={room:'tecc2-kolaboratif',prog:'jabatan',plat:'pautan',all:'sorotan'};
function run(){
 $$('.tabbtn[data-tab]').forEach(b=>{if(b.querySelector('.ico'))return;const n=TAB[b.dataset.tab];if(n)b.insertBefore(img(n,'ico-tab'),b.querySelector('span'))});
 $$('.chhead').forEach(h=>{if(h.querySelector('.ico'))return;const id=(h.id||'').replace('ch-',''),n=TAB[id];if(n)h.insertBefore(img(n,'ico-head'),h.querySelector('div'))});
 $$('.ulegend button').forEach((b,i)=>{if(b.querySelector('.ico'))return;const n=LEG[i];if(n)b.insertBefore(img(n,'ico-leg'),b.firstChild.nextSibling||null)});
 $$('.ustat').forEach((s,i)=>{if(s.querySelector('.ico'))return;s.insertBefore(img(i?'dashboard':'jam','ico-stat'),s.firstChild)});
 $$('.gfilter button').forEach(b=>{if(b.querySelector('.ico'))return;const n=GF[b.dataset.c];if(n)b.insertBefore(img(n,'ico-leg'),b.firstChild)});
 $$('.room-card').forEach((c,i)=>{const t=c.querySelector('.room-info h3');if(!t||t.querySelector('.ico'))return;const n=/4\.0/.test(t.textContent)?'tecc4-imersif':(/2\.0/.test(t.textContent)?'tecc2-kolaboratif':null);if(n)t.insertBefore(img(n,'ico-card'),t.firstChild)});
 const hero=document.querySelector('.inside-hero .eyebrow');if(hero&&!hero.querySelector('.ico')){const f=location.pathname.split('/').pop();const n={'lampiran.html':'lampiran','arkib2025.html':'arkib','tecc4.html':'tecc4-imersif','tecc2.html':'tecc2-kolaboratif'}[f];if(n)hero.insertBefore(img(n,'ico-eyebrow'),hero.firstChild)}
}
const w=window.TECC_RENDER;
if(w&&typeof w==='object'){Object.keys(w).forEach(k=>{if(typeof w[k]!=='function')return;const o=w[k];w[k]=function(){const r=o.apply(this,arguments);try{run()}catch(e){}return r}})}
else if(typeof w==='function'){window.TECC_RENDER=function(){const r=w.apply(this,arguments);try{run()}catch(e){}return r}}
document.addEventListener('DOMContentLoaded',run);window.addEventListener('load',run);
document.addEventListener('click',e=>{if(e.target.closest('.lang-option,.gfilter button'))setTimeout(run,80)});
run();
})();
