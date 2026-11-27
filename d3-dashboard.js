/* 3D animated dashboard: pure CSS 3D, drag to rotate, tap bars for detail. Data comes from window.TECC_DATA. */
(function(){'use strict';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const EN=()=>document.documentElement.lang==='en';
const T=(bm,en)=>EN()?en:bm;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=n=>(Math.round(n*100)/100).toLocaleString(EN()?'en-US':'ms-MY',{maximumFractionDigits:2});
const U=()=>T('j','h');
const MINT='#2fbf9b',LIL='#8f72f2',ORG='#fc875d',YEL='#f2b92f',BLU='#5b8cff',LIM='#9bc23c';
let state={};
function hrs(s){const m=/(\d+)j(?:\s*(\d+)m)?/.exec(s||'');return m?+m[1]+(m[2]?+m[2]/60:0):0}
function views(D,room){
 if(room==='tecc2'){
  const S=D.tecc2.summary,sem=D.tecc2.semesters||[];
  const cat=S.rows.map((r,i)=>({v:r.h,c:[LIL,YEL,BLU,MINT,LIM,ORG][i],l:T(...[['PdP berjadual','Ko-kurikulum','Program & institusi','Tempahan','Tanpa tempahan','Pengemasan Jumaat'][i],['Scheduled classes','Co-curricular','Programmes','Bookings','Unbooked use','Friday tidy'][i]]),d:(EN()?r.k.en:r.k.bm)}));
  return [
   {id:'year',name:T('Setahun','Full year'),max:S.capacity,bars:[
     {v:S.capacity,c:'#fff',t:'glass',l:T('Kapasiti','Capacity'),d:T('Kapasiti setahun: 37 j seminggu × 27 minggu kuliah','Annual capacity: 37 h a week × 27 teaching weeks')},
     {v:S.total,c:MINT,l:T('Digunakan','Used'),d:T('Jumlah jam penggunaan, faktor penggunaan '+S.factor+'%','Total usage hours, utility factor '+S.factor+'%')},
     {v:S.capacity*.75,c:ORG,l:T('Sasaran 75%','75% target'),d:T('Sasaran Garis Panduan TECC 2.0 (75–80%)','TECC 2.0 Guideline target (75–80%)')}],
    sum:S.factor+'%',sumsub:T('Faktor penggunaan setahun','Annual utility factor')},
   {id:'sem',name:T('Semester','Semester'),max:Math.max(...sem.map(s=>s.cap)),bars:sem.flatMap((s,i)=>[
     {v:s.cap,c:'#fff',t:'glass',l:T('Kapasiti','Capacity'),g:s.k[EN()?'en':'bm'],gi:i,d:s.k[EN()?'en':'bm']+' · '+T('kapasiti','capacity')},
     {v:s.used,c:i?LIL:MINT,l:T('Digunakan','Used'),d:s.k[EN()?'en':'bm']+' · '+s.f+'% '+T('daripada kapasiti','of capacity')}]),
    sum:'',sumsub:''},
   {id:'cat',name:T('Kategori','Categories'),max:Math.max(...cat.map(x=>x.v)),bars:cat,sum:fmt(S.total)+' '+U(),sumsub:T('Jumlah semua kategori','Total of all categories')}];
 }
 const T4=D.tecc4,mo=['Jan','Feb',T('Mac','Mar'),'Apr',T('Mei','May'),'Jun','Jul',T('Ogo','Aug'),'Sep',T('Okt','Oct'),'Nov',T('Dis','Dec')];
 const mon=T4.monthly.filter(m=>m.m<=11).map(m=>({v:hrs(m.hours),c:m.state==='known'?(m.m===8?ORG:MINT):'#cfd3da',l:mo[m.m-1],d:m.state==='known'?(T('Tempahan diluluskan: ','Approved bookings: ')+m.bookings+' · '+m.hours):T('Tiada tempahan diluluskan','No approved bookings')}));
 const tot=612.06;
 return [
  {id:'mon',name:T('Bulanan','Monthly'),max:Math.max(...mon.map(x=>x.v)),bars:mon,sum:fmt(mon.reduce((a,b)=>a+b.v,0))+' '+U(),sumsub:T('Jam tempahan diluluskan, Jan–Nov','Approved booking hours, Jan–Nov'),small:true},
  {id:'year',name:T('Setahun','Full year'),max:999,bars:[
   {v:999,c:'#fff',t:'glass',l:T('Kapasiti','Capacity'),d:T('Kapasiti setahun: 37 j × 27 minggu kuliah','Annual capacity: 37 h × 27 teaching weeks')},
   {v:tot,c:MINT,l:T('Digunakan','Used'),d:T('Jam penggunaan direkod, dashboard induk','Recorded usage hours, master dashboard')},
   {v:749.25,c:ORG,l:T('Sasaran 75%','75% target'),d:T('Rujukan sasaran kapasiti 75%','75% capacity reference')}],sum:'61.3%',sumsub:T('Faktor penggunaan setahun (termasuk 72 j asas 2025)','Annual utility factor (includes 72 h of 2025 foundation work)')}];
}
function build(host,room){
 const D=window.TECC_DATA;if(!D)return;
 const V=views(D,room);if(!state[room])state[room]={view:0,sel:0,ry:-28,px:34,drag:false};
 const st=state[room];if(st.view>=V.length)st.view=0;const v=V[st.view];
 host.innerHTML='<div class="d3"><div class="d3-card"><div class="d3-top"><div class="d3-views" role="group" aria-label="'+esc(T('Paparan','View'))+'">'+V.map((x,i)=>'<button type="button" data-v="'+i+'" aria-pressed="'+(i===st.view)+'">'+esc(x.name)+'</button>').join('')+'</div><button class="d3-reset" type="button">'+esc(T('Set semula','Reset view'))+'</button></div><div class="d3-stage" role="img" aria-label="'+esc(T('Carta bar 3D penggunaan bilik','3D bar chart of room usage'))+'"><div class="d3-scene"></div></div><p class="d3-hint">'+esc(T('Seret untuk memutar. Ketik bar untuk butiran.','Drag to rotate. Tap a bar for details.'))+'</p></div><div class="d3-side"><div class="d3-read" aria-live="polite"><small></small><b></b><span></span></div><ul class="d3-list"></ul><p class="d3-note"></p></div></div>';
 const stage=$('.d3-stage',host),scene=$('.d3-scene',host),list=$('.d3-list',host),read=$('.d3-read',host);
 const n=v.bars.length,W=v.small?24:(n>4?44:56),D_=v.small?30:56,pitch=v.small?W+16:(n>4?W+40:W+54);
 const gaps=v.bars.map((b,i)=>b.gi!==undefined&&b.gi>0&&v.bars[i-1].gi!==b.gi?30:0);
 let xs=[],x=0;v.bars.forEach((b,i)=>{x+=gaps[i];xs.push(x);x+=pitch});const total=x-pitch,off=total/2;
 const sc=v.small?210:225,hmax=sc/v.max;
 const floorW=total+130,floorD=150;
 let h='<div class="d3-floor" style="width:'+floorW+'px;height:'+floorD+'px"></div>';
 v.bars.forEach((b,i)=>{const H=Math.max(3,b.v*hmax),cls='d3-bar'+(b.t==='glass'?' glass':'');
  h+='<div class="'+cls+'" data-i="'+i+'" tabindex="0" role="button" aria-label="'+esc(b.l+': '+fmt(b.v)+' '+U())+'" style="transform:translate3d('+(xs[i]-off)+'px,0,0)"><div class="d3-box" style="--c:'+b.c+';--w:'+W+'px;--d:'+D_+'px;--i:'+i+';width:'+W+'px;height:'+H+'px;left:'+(-W/2)+'px;top:'+(-H)+'px"><i class="f" style="left:0;top:0;width:'+W+'px;height:'+H+'px"></i><i class="b" style="left:0;top:0;width:'+W+'px;height:'+H+'px"></i><i class="l" style="left:'+((W-D_)/2)+'px;top:0;width:'+D_+'px;height:'+H+'px"></i><i class="r" style="left:'+((W-D_)/2)+'px;top:0;width:'+D_+'px;height:'+H+'px"></i><i class="t" style="left:0;top:'+(-D_/2)+'px;width:'+W+'px;height:'+D_+'px"></i></div><div class="d3-lab" style="--ty:'+(-H-4)+'px">'+fmt(b.v)+'</div><div class="d3-axis" style="--az:'+(D_/2+14)+'px">'+esc(b.g&&b.gi>=0&&(v.bars[i-1]&&v.bars[i-1].gi===b.gi)?b.g:b.l)+'</div></div>'});
 scene.innerHTML=h;
 list.innerHTML=v.bars.map((b,i)=>'<li><button type="button" data-i="'+i+'" aria-pressed="false" style="--c:'+(b.t==='glass'?'#c9bff7':b.c)+'"><i></i><em>'+esc((b.g?b.g+' · ':'')+b.l)+'</em><b>'+fmt(b.v)+' '+U()+'</b></button></li>').join('');
 $('.d3-note',host).textContent=room==='tecc2'?T('Kapasiti = 37 j seminggu (tolak rehat) × 27 minggu kuliah = 999 j.','Capacity = 37 h a week (excluding breaks) × 27 teaching weeks = 999 h.'):T('Jam tempahan diluluskan daripada log tempahan TECC 4.0. Faktor tahunan = 612.06 j ÷ 999 j = 61.3%, termasuk 72 j asas 2025 (makluman proses awal TECC 4.0).','Approved booking hours from the TECC 4.0 booking log. Annual factor = 612.06 h ÷ 999 h = 61.3%, including 72 h of 2025 foundation work (background on the early TECC 4.0 process).');
 function fit(){const s=Math.min(1,(stage.clientWidth-12)/(floorW*.92));stage.style.setProperty('--s',s.toFixed(3))}
 function apply(){fit();stage.style.setProperty('--ry',st.ry+'deg');stage.style.setProperty('--px',st.px+'deg')}
 function count(el,to,dec){if(reduce){el.textContent=fmt(to);return}const f=+el.dataset.v||0,t0=performance.now();el.dataset.v=to;(function s(t){const k=Math.min(1,(t-t0)/600),e=1-Math.pow(1-k,3);el.textContent=fmt(f+(to-f)*e);if(k<1)requestAnimationFrame(s)})(t0)}
 function select(i,fromUser){st.sel=i;const b=v.bars[i];$$('.d3-bar',host).forEach(e=>e.classList.toggle('sel',+e.dataset.i===i));$$('.d3-list button',host).forEach(e=>e.setAttribute('aria-pressed',+e.dataset.i===i));
  $('small',read).textContent=(b.g?b.g+' · ':'')+b.l;count($('b',read),b.v);$('span',read).textContent=U()+' · '+b.d;read.style.setProperty('--rc',b.t==='glass'?'#c9bff7':b.c)}
 host.onclick=e=>{const vb=e.target.closest('[data-v]');if(vb){st.view=+vb.dataset.v;st.sel=0;build(host,room);return}
  const bb=e.target.closest('[data-i]');if(bb){select(+bb.dataset.i,true);return}if(e.target.closest('.d3-reset')){st.ry=-28;st.px=34;apply()}};
 host.onkeydown=e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('.d3-bar')){e.preventDefault();select(+e.target.dataset.i,true)}};
 host.onpointerover=e=>{const bb=e.target.closest('.d3-bar');if(bb&&matchMedia('(hover:hover)').matches)select(+bb.dataset.i)};
 /* drag to rotate */
 let sx=0,sy=0,r0=0,p0=0,moved=false;
 stage.onpointerdown=e=>{st.drag=true;moved=false;sx=e.clientX;sy=e.clientY;r0=st.ry;p0=st.px;try{stage.setPointerCapture(e.pointerId)}catch(_){}} ;
 stage.onpointermove=e=>{if(!st.drag)return;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)+Math.abs(dy)>4)moved=true;st.ry=r0+dx*.45;st.px=Math.max(10,Math.min(75,p0+dy*.3));apply()};
 stage.onpointerup=stage.onpointercancel=()=>{st.drag=false};
 apply();if(!st.pick||st.pickV!==st.view){st.pick=1;st.pickV=st.view;st.sel=v.bars.reduce((m,b,i,a)=>b.v>a[m].v&&b.t!=='glass'?i:m,v.bars.findIndex(b=>b.t!=='glass'))}select(Math.min(st.sel,n-1));addEventListener('resize',fit);
 /* entrance + gentle sway */
 const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){stage.classList.add('d3-on');io.disconnect()}}),{threshold:.25});io.observe(stage);if(reduce)stage.classList.add('d3-on');
 if(st.raf)cancelAnimationFrame(st.raf);
 if(!reduce){let t0=performance.now(),base=st.ry,vis=true;new IntersectionObserver(es=>vis=es[0].isIntersecting).observe(stage);
  (function loop(t){if(!stage.isConnected)return;if(!st.drag&&vis&&!document.hidden&&stage.classList.contains('d3-on')){const a=(t-t0)/1000;st.ry+=Math.sin(a*.6)*.07;apply()}st.raf=requestAnimationFrame(loop)})(t0)}
}
function init(){const h=$('#d3');if(!h)return;build(h,h.dataset.room)}
document.addEventListener('click',e=>{if(e.target.closest('.lang-option'))setTimeout(init,160)});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
addEventListener('load',()=>{if($('#d3')&&!$('#d3 .d3'))init()});
})();
