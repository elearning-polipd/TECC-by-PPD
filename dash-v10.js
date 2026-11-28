/* V10 animated analytics. Reads window.TECC_DATA. No dependencies. Removable: delete this file, dash-v10.css and the two tags. */
(function(){'use strict';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const EN=()=>document.documentElement.lang==='en';
const T=(b,e)=>EN()?e:b;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ROOM=/tecc4/.test(location.pathname)?'tecc4':'tecc2';
const MON_BM=['Jan','Feb','Mac','Apr','Mei','Jun','Jul','Ogos','Sep','Okt','Nov','Dis'],MON_EN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MON=()=>EN()?MON_EN:MON_BM;
const nd=n=>Number.isInteger(+n)?0:(Math.round(n*10)===n*10?1:2);
const fmt=(n,d=0)=>(+n).toLocaleString(EN()?'en-US':'ms-MY',{minimumFractionDigits:d,maximumFractionDigits:d});
const hrs=(a,b)=>(parseInt(b.slice(0,2))*60+parseInt(b.slice(3))-parseInt(a.slice(0,2))*60-parseInt(a.slice(3)))/60;
const S={mo:0,dep:'',res:'',st:'',view:'bk',sesi:0,open:false};
let root=null,tip=null;

/* ---------- helpers ---------- */
function cnt(el,to,dec,suf,delay){
 if(!el)return;const from=el._v||0;el._v=to;const fin=()=>{el.textContent=fmt(to,dec)+(suf||'')};
 if(reduce){fin();return}
 const t0=performance.now()+(delay||0),dur=1500;
 cancelAnimationFrame(el._r);
 (function f(t){const k=Math.max(0,Math.min(1,(t-t0)/dur)),e=1-Math.pow(1-k,3);el.textContent=fmt(from+(to-from)*e,dec)+(suf||'');if(k<1)el._r=requestAnimationFrame(f)})(performance.now());
}
function tilt(card){
 if(!matchMedia('(hover:hover)').matches)return;
 card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;card.style.setProperty('--ry',((x-.5)*14).toFixed(1)+'deg');card.style.setProperty('--rx',((.5-y)*12).toFixed(1)+'deg');card.style.setProperty('--mx',(x*100)+'%');card.style.setProperty('--my',(y*100)+'%')});
 card.addEventListener('pointerleave',()=>{card.style.setProperty('--ry','0deg');card.style.setProperty('--rx','0deg')});
}
function showTip(el,text){
 if(!tip)return;const r=el.getBoundingClientRect(),h=tip.parentElement.getBoundingClientRect();
 tip.textContent=text;tip.style.left=(r.left-h.left+r.width/2)+'px';tip.style.top=(r.top-h.top)+'px';tip.classList.add('show');
}
function gaugeSVG(pct,band,id){
 const C=339.29,R2=64,C2=2*Math.PI*R2;
 let band_='';
 if(band){const a=band[0]/100,b=band[1]/100;band_='<circle class="v10-gband" cx="70" cy="70" r="'+R2+'" stroke-dasharray="'+(C2*(b-a)).toFixed(1)+' '+C2.toFixed(1)+'" transform="rotate('+(a*360-90).toFixed(1)+' 70 70)"/>'}
 return '<svg viewBox="-10 -10 160 160" role="img" aria-label="'+esc(T('Tolok faktor penggunaan','Utility factor gauge'))+' '+pct+'%"><defs><linearGradient id="'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--b)"/><stop offset="1" stop-color="var(--a)"/></linearGradient></defs><circle class="v10-gtrack" cx="70" cy="70" r="54"/>'+band_+'<circle class="v10-garc" cx="70" cy="70" r="54" transform="rotate(-90 70 70)" style="stroke:url(#'+id+')" data-pct="'+pct+'"/></svg>';
}
function setGauge(pct){const a=$('.v10-garc',root);if(!a)return;a.style.strokeDashoffset=(339.29*(1-Math.min(100,pct)/100)).toFixed(1);cnt($('.v10-gnum',root),pct,1,'%',350)}

/* ---------- TECC 4.0 ---------- */
function rows4(D){return D.tecc4.bookingRows.map(r=>({d:r[0],mo:+r[0].slice(5,7),s:r[1],e:r[2],dep:r[3],res:r[4],st:r[5],h:hrs(r[1],r[2]),ap:r[5]==='booked'||r[5]==='done'}))}
const stg=r=>r.ap?'ap':r.st==='cancelled'?'cx':'pd';
function pass(r,skip){return(skip==='mo'||!S.mo||r.mo===S.mo)&&(skip==='dep'||!S.dep||r.dep===S.dep)&&(!S.res||r.res===S.res)&&(!S.st||stg(r)===S.st)}
function build4(D){
 const R=rows4(D),deps=[...new Set(R.map(r=>r.dep))].sort((a,b)=>R.filter(r=>r.dep===b&&r.ap).reduce((s,r)=>s+r.h,0)-R.filter(r=>r.dep===a&&r.ap).reduce((s,r)=>s+r.h,0)),topDeps=deps.slice(0,6),ress=[...new Set(R.map(r=>r.res))],months=[...new Set(R.map(r=>r.mo))].sort((a,b)=>a-b);
 const tFac=D.tecc4.dashboardFactor,tHrs=D.tecc4.dashboardHours;
 const sel=(id,lab,opts)=>'<label>'+lab+'<select data-f="'+id+'">'+opts+'</select></label>';
 const html='<div class="v10-head"><div><span class="v10-kick">TECC 4.0 · 2026</span><h3>'+T('Analitik Pembelajaran Imersif','Immersive Learning Analytics')+'</h3></div><button class="v10-replay" type="button">↻ '+T('Ulang animasi','Replay animation')+'</button></div>'
 +'<div class="v10-filters">'+sel('mo',T('Bulan','Month'),'<option value="0">'+T('Semua','All')+'</option>'+months.map(m=>'<option value="'+m+'">'+MON()[m-1]+'</option>').join(''))
 +sel('dep',T('Jabatan','Department'),'<option value="">'+T('Semua','All')+'</option>'+deps.map(d=>'<option>'+esc(d)+'</option>').join(''))
 +sel('res',T('Sumber','Resource'),'<option value="">'+T('Semua','All')+'</option>'+ress.map(d=>'<option>'+esc(d)+'</option>').join(''))
 +sel('st',T('Status','Status'),'<option value="">'+T('Semua','All')+'</option><option value="ap">'+T('Diluluskan','Approved')+'</option><option value="cx">'+T('Dibatalkan','Cancelled')+'</option><option value="pd">'+T('Menunggu','Pending')+'</option>')+'</div>'
 +'<div class="v10-grid">'
 +'<article class="v10-card c-gauge"><h4>'+T('Faktor penggunaan setahun','Annual utility factor')+'</h4><div class="v10-gwrap"><div class="v10-orbit"></div>'+gaugeSVG(tFac,[75,75.8],'v10g')+'<div class="v10-gcenter"><b class="v10-gnum">0%</b><span>'+fmt(tHrs,2)+' / 999 '+T('j','h')+'</span></div></div><small>'+T('Tanda pada cincin: rujukan sasaran 75%.','Mark on the ring: 75% target reference.')+'</small></article>'
 +['ap','rate','hrs','dash'].map((k,i)=>'<article class="v10-card c-kpi" style="--k:'+['var(--a)','var(--b)','var(--c)','var(--d)'][i]+'"><small>'+[T('Tempahan diluluskan','Approved bookings'),T('Kadar kelulusan','Approval rate'),T('Jam tempahan diluluskan','Approved booking hours'),T('Jumlah jam (aktiviti + tempahan)','Total hours (activities + bookings)')][i]+'</small><b data-k="'+k+'">0</b><i></i></article>').join('')
 +'<article class="v10-card c-trend" style="position:relative"><div class="v10-hb"><h4 style="flex:1">'+T('Trend tempahan bulanan','Monthly booking trend')+'</h4><button class="v10-chip" data-view="bk" aria-pressed="true">'+T('Tempahan','Bookings')+'</button><button class="v10-chip" data-view="hr" aria-pressed="false">'+T('Jam','Hours')+'</button></div><div class="v10-bars" data-bars></div><div class="v10-line" data-line></div><small>'+T('Pilih Tempahan atau Jam untuk menukar carta. Ketik bar untuk butiran.','Select Bookings or Hours to change the chart. Tap a bar for details.')+'</small></article>'
 +'<article class="v10-card c-dept"><h4>'+T('Penggunaan mengikut jabatan','Usage by department')+'</h4><div data-depts></div></article>'
 +'<article class="v10-card c-photo" style="background-image:url(assets/activity/e70-akri-persediaan-kumpulan-3.webp)"><div><b data-k="found">0</b><small>'+T('jam asas 2025: Kick Off, pemasangan, Simlab dan latihan peralatan','h of 2025 foundation work: Kick Off, installation, Simlab and equipment training')+'</small></div></article>'
 +'<article class="v10-card c-rec"><div class="v10-rec"><div><h4>'+T('Rekod tempahan','Booking records')+'</h4><small data-reccount></small></div><button class="v10-exp" type="button" aria-expanded="false">'+T('Papar semua','Show all')+'</button></div><ul class="v10-list" data-list></ul></article>'
 +'</div><p class="v10-note">'+T('Jam diluluskan = tempahan berstatus diluluskan atau dilaksanakan. Faktor penggunaan = jumlah jam / kapasiti 999 j.','Approved hours = bookings with approved or held status. Utility factor = total hours / 999 h capacity.')+'</p><div class="v10-tip"></div>';
 root.innerHTML=html;tip=$('.v10-tip',root);
 const bars=$('[data-bars]',root),line=$('[data-line]',root);
 bars.innerHTML=months.map((m,i)=>'<div class="v10-col"><button class="v10-bar" type="button" data-m="'+m+'" style="--i:'+i+';--h:0%" aria-label="'+MON()[m-1]+'"></button><span>'+MON()[m-1]+'</span></div>').join('');
 $('[data-depts]',root).innerHTML=topDeps.map((d,i)=>'<div class="v10-hrow" data-d="'+esc(d)+'" style="--i:'+i+'"><span>'+esc(d)+'</span><i></i><b>0</b></div>').join('');
 function upd(){
  const f=R.filter(r=>pass(r)),ap=f.filter(r=>r.ap),h=ap.reduce((s,r)=>s+r.h,0);
  cnt($('[data-k=ap]',root),ap.length,0,'',500);cnt($('[data-k=rate]',root),f.length?ap.length/f.length*100:0,1,'%',600);cnt($('[data-k=hrs]',root),h,1,' '+T('j','h'),700);cnt($('[data-k=dash]',root),tHrs,2,' '+T('j','h'),800);
  cnt($('[data-k=found]',root),80,0,' '+T('j','h'),400);
  const tr=R.filter(r=>r.ap&&pass(r,'mo')),val=m=>S.view==='bk'?tr.filter(r=>r.mo===m).length:tr.filter(r=>r.mo===m).reduce((s,r)=>s+r.h,0),vs=months.map(val),mx=Math.max(1,...vs);
  $$('.v10-bar',root).forEach((b,i)=>{b.style.setProperty('--h',Math.max(vs[i]?4:0,vs[i]/mx*100)+'%');b.classList.toggle('sel',S.mo===months[i]);b.dataset.tip=MON()[months[i]-1]+': '+(S.view==='bk'?fmt(vs[i])+' '+T('tempahan','bookings'):fmt(vs[i],1)+' '+T('jam','hours'))});
  const W=300,H=130,xs=i=>months.length>1?8+i*(W-16)/(months.length-1):W/2,ys=v=>H-8-v/mx*(H-24);
  const pts=vs.map((v,i)=>[xs(i),ys(v)]);
  let d='';pts.forEach((p,i)=>{if(!i)d='M'+p[0]+' '+p[1];else{const q=pts[i-1],cx=(q[0]+p[0])/2;d+=' C'+cx+' '+q[1]+' '+cx+' '+p[1]+' '+p[0]+' '+p[1]}});
  line.innerHTML='<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none" style="height:100%;width:100%"><path class="v10-path" pathLength="1" d="'+d+'"/>'+pts.map((p,i)=>'<circle class="v10-dot" style="--i:'+i+'" cx="'+p[0]+'" cy="'+p[1]+'" data-tip="'+esc(MON()[months[i]-1]+': '+(S.view==='bk'?fmt(vs[i])+' '+T('tempahan','bookings'):fmt(vs[i],1)+' '+T('jam','hours')))+'"/>').join('')+'</svg>';
  const dd=R.filter(r=>r.ap&&pass(r,'dep')),dv=topDeps.map(x=>dd.filter(r=>r.dep===x).reduce((s,r)=>s+r.h,0)),dm=Math.max(1,...dv);
  $$('.v10-hrow',root).forEach((el,i)=>{el.style.setProperty('--w',(dv[i]/dm*100)+'%');el.classList.toggle('sel',S.dep===topDeps[i]);cnt($('b',el),dv[i],1,' '+T('j','h'),500+i*100)});
  const lst=f.slice().sort((a,b)=>a.d<b.d?-1:1);$('[data-reccount]',root).textContent=lst.length+' '+T('rekod ditunjukkan','records shown');
  $('[data-list]',root).innerHTML=lst.map(r=>'<li><em>'+r.d.slice(8)+' '+MON()[r.mo-1]+'</em><span>'+esc(r.dep)+' · '+esc(r.res)+' · '+r.s+'–'+r.e+'</span><span class="v10-tag '+stg(r)+'">'+({ap:T('Diluluskan','Approved'),cx:T('Dibatalkan','Cancelled'),pd:T('Menunggu','Pending')})[stg(r)]+'</span></li>').join('')||'<li><em>—</em><span>'+T('Tiada rekod untuk penapis ini.','No records for this filter.')+'</span><span></span></li>';
 }
 root._upd=upd;root._gauge=()=>setGauge(tFac);
 $$('select[data-f]',root).forEach(s=>s.onchange=()=>{S[s.dataset.f]=s.dataset.f==='mo'?+s.value:s.value;upd()});
 $$('[data-view]',root).forEach(b=>b.onclick=()=>{S.view=b.dataset.view;$$('[data-view]',root).forEach(x=>x.setAttribute('aria-pressed',x===b));upd()});
 $$('.v10-bar',root).forEach(b=>b.onclick=()=>{S.mo=S.mo===+b.dataset.m?0:+b.dataset.m;$('select[data-f=mo]',root).value=S.mo;upd()});
 $$('.v10-hrow',root).forEach(el=>el.onclick=()=>{S.dep=S.dep===el.dataset.d?'':el.dataset.d;$('select[data-f=dep]',root).value=S.dep;upd()});
 upd();
}

/* ---------- TECC 2.0 ---------- */
function build2(D){
 const sm=D.tecc2.summary,sem=D.tecc2.semesters||[],ex=D.tecc2.bookingRows||[];
 const NB=['PdP berjadual','Ko-kurikulum','Program & institusi','Tempahan','Tanpa tempahan','Pengemasan Jumaat'],NE=['Scheduled classes','Co-curricular','Programmes & institutions','Bookings','Unbooked use','Friday cleaning'];
 const gv=[{k:T('Setahun','Full year'),p:sm.factor,u:sm.total,c:sm.capacity},...sem.map(s=>({k:s.k[EN()?'en':'bm'],p:s.f,u:s.used,c:s.cap}))];
 const E=ex.map(r=>({mo:+r[0].slice(5,7),d:r[0],h:+r[4],dep:r[3],st:r[5],s:r[1],e:r[2]})),months=[...new Set(E.map(r=>r.mo))].sort((a,b)=>a-b);
 const html='<div class="v10-head"><div><span class="v10-kick">TECC 2.0 · 2026</span><h3>'+T('Risikan Penggunaan','Usage Intelligence')+'</h3></div><button class="v10-replay" type="button">↻ '+T('Ulang animasi','Replay animation')+'</button></div>'
 +'<div class="v10-filters"><label>'+T('Bulan (rekod aktiviti)','Month (activity records)')+'<select data-f="mo"><option value="0">'+T('Semua','All')+'</option>'+months.map(m=>'<option value="'+m+'">'+MON()[m-1]+'</option>').join('')+'</select></label></div>'
 +'<div class="v10-grid"><article class="v10-card c-gauge"><h4>'+T('Faktor penggunaan','Utility factor')+'</h4><div class="v10-gwrap"><div class="v10-orbit"></div>'+gaugeSVG(sm.factor,[75,80],'v10g')+'<div class="v10-gcenter"><b class="v10-gnum">0%</b><span data-gsub></span></div></div><div class="v10-seg">'+gv.map((g,i)=>'<button class="v10-chip" data-s="'+i+'" aria-pressed="'+(i===0)+'">'+esc(g.k)+'</button>').join('')+'</div><small style="margin-top:8px">'+T('Jalur pada cincin: sasaran Garis Panduan 75–80%.','Band on the ring: Guideline target 75–80%.')+'</small></article>'
 +[[sm.total,nd(sm.total),T('Jumlah jam penggunaan','Total usage hours'),'var(--a)'],[633,0,T('Jam PdP berjadual','Scheduled class hours'),'var(--b)'],[sm.total-633,nd(sm.total-633),T('Jam bukan PdP','Non-class hours'),'var(--c)'],[ex.length,0,T('Slot aktiviti tambahan','Extra activity slots'),'var(--d)']].map((k,i)=>'<article class="v10-card c-kpi" style="--k:'+k[3]+'"><small>'+k[2]+'</small><b data-kv="'+k[0]+'" data-kd="'+k[1]+'">0</b><i></i></article>').join('')
 +'<article class="v10-card c-cat"><h4>'+T('Sumbangan jam mengikut kategori','Hours by category')+'</h4><div data-cats></div></article>'
 +'<article class="v10-card c-photo"><div><b data-kv="633" data-kd="0" data-suf=" '+T('j','h')+'">0</b><small>'+T('PdP berjadual sepanjang Sesi II 2025/2026 dan Sesi I 2026/2027','of scheduled classes across Session II 2025/2026 and Session I 2026/2027')+'</small></div></article>'
 +'<article class="v10-card c-trend" style="position:relative"><div class="v10-hb"><h4 style="flex:1">'+T('Aktiviti tambahan mengikut bulan','Extra activities by month')+'</h4><button class="v10-chip" data-view="bk" aria-pressed="true">'+T('Bilangan','Count')+'</button><button class="v10-chip" data-view="hr" aria-pressed="false">'+T('Jam','Hours')+'</button></div><div class="v10-bars" data-bars></div><div class="v10-line" data-line></div><small>'+T('Ketik bar untuk menapis rekod di bawah.','Tap a bar to filter the records below.')+'</small></article>'
 +'<article class="v10-card c-rec"><div class="v10-rec"><div><h4>'+T('Rekod aktiviti tambahan','Extra activity records')+'</h4><small data-reccount></small></div><button class="v10-exp" type="button" aria-expanded="false">'+T('Papar semua','Show all')+'</button></div><ul class="v10-list" data-list></ul></article></div>'
 +'<p class="v10-note">'+T('Jam mengikut jadual waktu rasmi dan rekod aktiviti. Kapasiti = 37 j × 27 minggu kuliah.','Hours follow the official timetable and activity records. Capacity = 37 h × 27 teaching weeks.')+'</p><div class="v10-tip"></div>';
 root.innerHTML=html;tip=$('.v10-tip',root);
 $('[data-cats]',root).innerHTML=sm.rows.map((r,i)=>'<div class="v10-hrow" style="--i:'+i+';--w:'+(r.h/633*100)+'%"><span>'+esc((EN()?NE:NB)[i]||'')+'</span><i></i><b data-kv="'+r.h+'" data-kd="'+nd(r.h)+'" data-suf=" '+T('j','h')+'">0</b></div>').join('');
 $('[data-bars]',root).innerHTML=months.map((m,i)=>'<div class="v10-col"><button class="v10-bar" type="button" data-m="'+m+'" style="--i:'+i+';--h:0%"></button><span>'+MON()[m-1]+'</span></div>').join('');
 function upd(){
  const g=gv[S.sesi];$('[data-gsub]',root).textContent=fmt(g.u,nd(g.u))+' / '+fmt(g.c)+' '+T('j','h');root._gp=g.p;setGauge(g.p);
  $$('.v10-chip[data-s]',root).forEach(b=>b.setAttribute('aria-pressed',+b.dataset.s===S.sesi));
  $$('[data-kv]',root).forEach((el,i)=>cnt(el,+el.dataset.kv,+el.dataset.kd,el.dataset.suf||'',500+i*80));
  const val=m=>S.view==='bk'?E.filter(r=>r.mo===m).length:E.filter(r=>r.mo===m).reduce((s,r)=>s+r.h,0),vs=months.map(val),mx=Math.max(1,...vs);
  $$('.v10-bar',root).forEach((b,i)=>{b.style.setProperty('--h',Math.max(vs[i]?4:0,vs[i]/mx*100)+'%');b.classList.toggle('sel',S.mo===months[i]);b.dataset.tip=MON()[months[i]-1]+': '+(S.view==='bk'?fmt(vs[i])+' '+T('aktiviti','activities'):fmt(vs[i],1)+' '+T('jam','hours'))});
  const W=300,H=130,xs=i=>months.length>1?8+i*(W-16)/(months.length-1):W/2,ys=v=>H-8-v/mx*(H-24),pts=vs.map((v,i)=>[xs(i),ys(v)]);
  let d='';pts.forEach((p,i)=>{if(!i)d='M'+p[0]+' '+p[1];else{const q=pts[i-1],cx=(q[0]+p[0])/2;d+=' C'+cx+' '+q[1]+' '+cx+' '+p[1]+' '+p[0]+' '+p[1]}});
  $('[data-line]',root).innerHTML='<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none" style="height:100%;width:100%"><path class="v10-path" pathLength="1" d="'+d+'"/>'+pts.map((p,i)=>'<circle class="v10-dot" style="--i:'+i+'" cx="'+p[0]+'" cy="'+p[1]+'" data-tip="'+esc(MON()[months[i]-1]+': '+(S.view==='bk'?fmt(vs[i])+' '+T('aktiviti','activities'):fmt(vs[i],1)+' '+T('jam','hours')))+'"/>').join('')+'</svg>';
  const lst=E.filter(r=>!S.mo||r.mo===S.mo).sort((a,b)=>a.d<b.d?-1:1);$('[data-reccount]',root).textContent=lst.length+' '+T('rekod ditunjukkan','records shown');
  $('[data-list]',root).innerHTML=lst.map(r=>'<li><em>'+r.d.slice(8)+' '+MON()[r.mo-1]+'</em><span>'+r.s+'–'+r.e+(r.dep!=='-'?' · '+esc(r.dep):'')+'</span><span class="v10-tag">'+fmt(r.h,r.h%1?1:0)+' '+T('j','h')+'</span></li>').join('');
 }
 root._upd=upd;root._gauge=()=>setGauge(root._gp||sm.factor);
 $$('.v10-chip[data-s]',root).forEach(b=>b.onclick=()=>{S.sesi=+b.dataset.s;upd()});
 $$('select[data-f]',root).forEach(s=>s.onchange=()=>{S.mo=+s.value;upd()});
 $$('[data-view]',root).forEach(b=>b.onclick=()=>{S.view=b.dataset.view;$$('[data-view]',root).forEach(x=>x.setAttribute('aria-pressed',x===b));upd()});
 $$('.v10-bar',root).forEach(b=>b.onclick=()=>{S.mo=S.mo===+b.dataset.m?0:+b.dataset.m;$('select[data-f=mo]',root).value=S.mo;upd()});
 upd();
}

/* ---------- mount + animation ---------- */
function wire(){
 $$('.v10-card',root).forEach((c,i)=>{c.style.setProperty('--dl',(i*.12)+'s');tilt(c)});
 $('.v10-replay',root).onclick=replay;
 const ex=$('.v10-exp',root),ls=$('.v10-list',root);ex.onclick=()=>{const o=ls.classList.toggle('open');ex.setAttribute('aria-expanded',o);ex.textContent=o?T('Tutup','Collapse'):T('Papar semua','Show all')};
 root.addEventListener('pointerover',e=>{const t=e.target.closest('[data-tip]');if(t)showTip(t,t.dataset.tip)});
 root.addEventListener('pointerout',e=>{if(e.target.closest('[data-tip]'))tip.classList.remove('show')});
 root.addEventListener('focusin',e=>{const t=e.target.closest('[data-tip]');if(t)showTip(t,t.dataset.tip)});
 root.addEventListener('focusout',()=>tip.classList.remove('show'));
 root.addEventListener('click',e=>{const t=e.target.closest('[data-tip]');if(t){showTip(t,t.dataset.tip);clearTimeout(tip._t);tip._t=setTimeout(()=>tip.classList.remove('show'),2200)}});
}
function start(){root.classList.add('on');root._gauge&&root._gauge();root._upd&&root._upd();clearTimeout(root._s);root._s=setTimeout(()=>root.classList.add('settled'),reduce?0:2200)}
function replay(){root.classList.remove('on','settled');$$('.v10-garc',root).forEach(a=>a.style.strokeDashoffset=339.29);$$('[data-k],[data-kv],.v10-gnum,.v10-hrow b',root).forEach(el=>{el._v=0;el.textContent='0'});void root.offsetWidth;setTimeout(start,80)}
function mount(){
 const host=$('#dash');const D=window.TECC_DATA;if(!host||!D||!D.tecc2)return;
 let el=$('#v10',host);if(el)return;
 root=document.createElement('div');root.id='v10';root.className='v10 v10-'+ROOM;host.insertBefore(root,host.firstChild);
 try{ROOM==='tecc4'?build4(D):build2(D)}catch(e){console.error('v10',e);root.remove();return}
 wire();
 if(reduce){start();return}
 new IntersectionObserver((es,o)=>es.forEach(en=>{if(en.isIntersecting){start();o.disconnect()}}),{threshold:.12}).observe(root);
}
/* ---------- Analisis ---------- */
function analysis(){
 const host=$('#analysis');const D=window.TECC_DATA;if(!host||!D||host.dataset.v10)return;const finds=$('.finds',host);if(!finds)return;host.dataset.v10=1;
 host.classList.add('v10-an');if(ROOM==='tecc4')host.classList.add('v10-tecc4an');
 const sm=D.tecc2.summary,t4=D.tecc4;
 const items=ROOM==='tecc4'?[[t4.summary.approved,0,'',T('tempahan diluluskan','approved bookings')],[t4.summary.approved/t4.summary.total*100,1,'%',T('kadar kelulusan','approval rate')],[t4.dashboardHours,2,' '+T('j','h'),T('jam papan pemuka induk','master dashboard hours')],[t4.dashboardFactor,1,'%',T('faktor penggunaan','utility factor')]]
 :[[sm.factor,1,'%',T('faktor penggunaan','utility factor')],[633,0,' '+T('j','h'),T('PdP berjadual','scheduled classes')],[sm.total-633,1,' '+T('j','h'),T('bukan PdP','non-class use')],[75,0,'–80%',T('sasaran Garis Panduan','Guideline target')]];
 const hd=document.createElement('div');hd.className='v10-anhead';hd.innerHTML=items.map((k,i)=>'<div style="--dl:'+(i*.12)+'s"><b data-an="'+k[0]+'" data-d="'+k[1]+'" data-s="'+esc(k[2])+'">0</b><small>'+k[3]+'</small></div>').join('');
 finds.parentNode.insertBefore(hd,finds.previousElementSibling||finds);
 $$('li',finds).forEach((li,i)=>{li.classList.remove('rv');li.style.setProperty('--dl',(i*.1)+'s');tilt(li)});
 const run=()=>{host.classList.add('on');$$('[data-an]',hd).forEach((b,i)=>cnt(b,+b.dataset.an,+b.dataset.d,b.dataset.s,i*120))};
 const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.target===hd&&en.isIntersecting)run();if(en.target.tagName==='LI'&&en.isIntersecting){en.target.classList.add('v10-in');io.unobserve(en.target)}}),{threshold:.2});
 if(reduce){run();$$('li',finds).forEach(l=>l.classList.add('v10-in'));return}
 io.observe(hd);$$('li',finds).forEach(l=>io.observe(l));
}
function init(){mount();analysis()}
let tm;function later(){clearTimeout(tm);tm=setTimeout(()=>{const h=$('#dash');if(h&&!$('#v10',h))init();const a=$('#analysis');if(a&&!$('.v10-anhead',a)){delete a.dataset.v10;analysis()}},220)}
document.addEventListener('click',e=>{if(e.target.closest('.lang-option')){S.mo=0;setTimeout(()=>{const o=$('#v10');if(o)o.remove();const a=$('#analysis .v10-anhead');if(a)a.remove();const an=$('#analysis');if(an){an.classList.remove('on');delete an.dataset.v10}later()},260)}});
new MutationObserver(later).observe(document.body,{childList:true,subtree:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,150));else setTimeout(init,150);
})();
