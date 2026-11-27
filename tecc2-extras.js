/* TECC 2.0 interactive layer. Reads window.TECC_DATA; re-runs on every language change. */
(function(){
const D=window.TECC_DATA;if(!D)return;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
let LG='ms';const L=o=>o==null?'':(typeof o==='string'?o:(o[LG]||o.bm||''));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const COL=['#6fd3bb','#b39bf5','#fc875d','#f2c14e','#5aa9e6','#9bd36d'];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);if(e.target.classList.contains('uhero'))countUp(e.target)}}),{threshold:.2}):null;
function countUp(root){$$('[data-cu]',root).forEach(el=>{const t=+el.dataset.cu,d=+(el.dataset.dec||0),suf=el.dataset.suf||'';if(reduce){el.textContent=t.toFixed(d)+suf;return}const st=performance.now();(function f(n){const p=Math.min(1,(n-st)/1400),v=t*(1-Math.pow(1-p,3));el.textContent=v.toFixed(d)+suf;if(p<1)requestAnimationFrame(f)})(st)})}
function utility(){const host=$('#utility');if(!host)return;const hs=$('.herostats',host);if(!hs)return;const S=D.tecc2.summary,h=LG==='en'?'h':'j';
 const T={ms:{tot:'jam penggunaan 2026',cap:'kapasiti setahun (37 j × 27 minggu)',tg:'sasaran 75–80%',ft:'Faktor penggunaan',hint:'Sentuh atau arahkan kursor pada bar untuk butiran.'},en:{tot:'usage hours 2026',cap:'annual capacity (37 h × 27 weeks)',tg:'target 75–80%',ft:'Utility factor',hint:'Tap or hover a bar segment for details.'}}[LG];
 const off=(326.7*(1-S.factor/100)).toFixed(1);
 const seg=S.rows.map((r,i)=>'<button type="button" style="--w:'+r.h+';background:'+COL[i%COL.length]+'" data-i="'+i+'" aria-label="'+esc(L(r.k)+': '+r.h+' '+h)+'"></button>').join('');
 const leg=S.rows.map((r,i)=>'<button type="button" data-i="'+i+'"><i style="background:'+COL[i%COL.length]+'"></i>'+esc(L(r.k).split(' (')[0].split(' · ')[0])+'</button>').join('');
 const div=document.createElement('div');div.className='uhero';
 div.innerHTML='<div class="gauge" style="--off:'+off+'"><svg viewBox="0 0 120 120" aria-hidden="true"><circle class="g-bg" cx="60" cy="60" r="52"/><circle class="g-fg" cx="60" cy="60" r="52"/><circle class="g-tg" cx="60" cy="60" r="52"/></svg><div class="g-c"><b data-cu="'+S.factor+'" data-dec="1" data-suf="%">0%</b><span>'+esc(T.ft)+' · '+esc(T.tg)+'</span></div></div>'
 +'<div class="ustats"><div class="ustat"><b data-cu="'+S.total+'" data-dec="1">0</b><span>'+esc(T.tot)+'</span></div><div class="ustat"><b data-cu="'+S.capacity+'" data-dec="0">0</b><span>'+esc(T.cap)+'</span></div>'
 +'<div><div class="ustack" role="group">'+seg+'</div><div class="uread" aria-live="polite">'+esc(T.hint)+'</div><div class="ulegend">'+leg+'</div></div></div>';
 hs.replaceWith(div);
 const rd=$('.uread',div),show=i=>{const r=S.rows[i];$$('.ustack button,.ulegend button',div).forEach(b=>b.classList.toggle('on',+b.dataset.i===i));rd.textContent=L(r.k)+' · '+r.h+' '+h+' · '+(100*r.h/S.total).toFixed(1)+'%'};
 $$('.ustack button,.ulegend button',div).forEach(b=>{['mouseenter','focus','click'].forEach(ev=>b.addEventListener(ev,()=>show(+b.dataset.i)))});
 const g=$('.gauge',div),st=$('.ustack',div);if(io){io.observe(div);const o2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){g.classList.add('in');st.classList.add('in');o2.disconnect()}}),{threshold:.2});o2.observe(div)}else{g.classList.add('in');st.classList.add('in');countUp(div)}
 if(reduce){g.classList.add('in');st.classList.add('in')}}
const G=[
 ['room','assets/hero/tecc2.webp',{bm:'Ruang TECC 2.0',en:'TECC 2.0 room'}],
 ['room','assets/gallery/tecc2-ruang.webp',{bm:'Susun atur meja modular',en:'Modular table layout'}],
 ['prog','assets/lampiran/taklimat-tecc20-21jan2026-a.webp',{bm:'Taklimat TECC 2.0, 21 Jan 2026',en:'TECC 2.0 briefing, 21 Jan 2026'}],
 ['prog','assets/lampiran/taklimat-tecc20-21jan2026-b.webp',{bm:'Penyampai dalam bilik TECC 2.0',en:'Presenter in the TECC 2.0 room'}],
 ['prog','assets/lampiran/kursus-tecc-smart-teaching-21jan2026-video.webp',{bm:'Kursus TECC Smart Teaching',en:'TECC Smart Teaching course'}],
 ['prog','assets/lampiran/susun-atur-ujian-muet-apr2026.webp',{bm:'Susun atur bilik Ujian Lisan MUET, Apr 2026',en:'Room layout for the MUET Speaking Test, Apr 2026'}],
 ['room','assets/gallery/tecc2-sesi-1.webp',{bm:'Sesi taklimat di ruang',en:'Briefing session in the room'}],
 ['room','assets/gallery/tecc2-sesi-2.webp',{bm:'Pembentangan latar belakang TECC 2.0',en:'TECC 2.0 background presentation'}],
 ['room','assets/gallery/tecc2-bilik-kolaboratif.webp',{bm:'Susun atur bilik untuk kerja berkumpulan',en:'Room layout for group work'}],
 ['prog','assets/gallery/tecc2-perjumpaan-staf-jun2026.webp',{bm:'Perjumpaan staf JPA di TECC 2.0, Jun 2026',en:'JPA staff gathering in TECC 2.0, Jun 2026'}],
 ['prog','assets/gallery/tecc2-mesyuarat-jpa-jun2026.webp',{bm:'Warga JPA bersama di TECC 2.0',en:'JPA colleagues together in TECC 2.0'}],
 ['plat','assets/gallery/cidos-polycc.webp',{bm:'Platform CIDOS POLYCC',en:'CIDOS POLYCC platform'}],
 ['plat','assets/gallery/micro-credential-polycc.webp',{bm:'Platform Micro-Credential POLYCC',en:'Micro-Credential POLYCC platform'}]];
const G4=[
 ['room','assets/hero/tecc4.webp',{bm:'Studio TECC 4.0',en:'TECC 4.0 studio'}],
 ['room','assets/archi/archi-space-lab-overview.webp',{bm:'Makmal ARCHI-SPACE: pandangan keseluruhan',en:'ARCHI-SPACE lab overview'}],
 ['room','assets/archi/archi-space-lab-stations.webp',{bm:'Stesen VR dalam makmal',en:'VR stations in the lab'}],
 ['prog','assets/gallery/tecc4-bengkel-green-screen-rakaman.webp',{bm:'Rakaman Green Screen, Bengkel RMI Future, 2 Jul 2026',en:'Green screen recording, RMI Future workshop, 2 Jul 2026'}],
 ['prog','assets/gallery/tecc4-bengkel-rmi-future-penyampaian.webp',{bm:'Majlis penutup Bengkel RMI Future',en:'RMI Future workshop closing ceremony'}],
 ['prog','assets/gallery/tecc4-bengkel-rmi-future-sijil.webp',{bm:'Sijil penghargaan SMK Bandar Baru Sri Sendayan',en:'Certificate of appreciation, SMK Bandar Baru Sri Sendayan'}],
 ['prog','assets/archi/vr-session-lecturer-guidance.webp',{bm:'Sesi VR: bimbingan pensyarah',en:'VR session: lecturer guidance'}],
 ['prog','assets/archi/vr-session-multi-station.webp',{bm:'Sesi VR berbilang stesen',en:'Multi-station VR session'}]];
const CAT={all:{bm:'Semua',en:'All'},room:{bm:'Ruang',en:'Room'},prog:{bm:'Program',en:'Programmes'},plat:{bm:'Platform digital',en:'Digital platforms'}};
let cat='all';
function gallery(){const host=$('#gal2')||$('#gal4');if(!host)return;const G_=host.id==='gal4'?G4:G;
 const fl=Object.keys(CAT).filter(k=>G_.some(g=>k==='all'||g[0]===k)).map(k=>'<button type="button" data-c="'+k+'" class="'+(k===cat?'on':'')+'" aria-pressed="'+(k===cat)+'">'+esc(L(CAT[k]))+'</button>').join('');
 const items=G_.filter(g=>cat==='all'||g[0]===cat).map(g=>'<figure><a href="'+g[1]+'"><img loading="lazy" src="'+g[1]+'" alt="'+esc(L(g[2]))+'"></a><span class="tag">'+esc(L(CAT[g[0]]))+'</span><figcaption>'+esc(L(g[2]))+'</figcaption></figure>').join('');
 host.innerHTML='<div class="wrap"><h3 class="sub">'+(LG==='en'?'Gallery':'Galeri')+'</h3><div class="gfilter" role="group">'+fl+'</div><div class="gmas">'+items+'</div></div>';
 $$('.gfilter button',host).forEach(b=>b.addEventListener('click',()=>{cat=b.dataset.c;gallery()}))}
const prev=window.TECC_RENDER;
window.TECC_RENDER=function(l){if(prev)prev(l);LG=l==='en'?'en':'ms';utility();gallery()};
})();
