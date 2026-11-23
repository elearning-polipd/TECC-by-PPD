/* v5: concept-driven, animated & interactive layer. Reads window.TECC_DATA; wraps TECC_RENDER. */
(function(){
const D=window.TECC_DATA;if(!D)return;
document.documentElement.classList.add('js');
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let LG='ms';const L=o=>o==null?'':(typeof o==='string'?o:(o[LG]||o.bm||''));
const U={
 cmapK:{bm:'01 — PETA KONSEP',en:'01 — CONCEPT MAP'},cmapH:{bm:'Enam teras laman TECC, empat komponen wajib',en:'Six pillars of the TECC site, four mandatory components'},
 cmapP:{bm:'Struktur ini mengikut Google Sites TECC anda. Pilih komponen wajib untuk melihat teras yang menyokongnya.',en:'This structure follows your TECC Google Site. Pick a mandatory component to see the pillars that support it.'},all:{bm:'Semua',en:'All'},
 tlK:{bm:'GARIS MASA 2026',en:'2026 TIMELINE'},tlH:{bm:'Aktiviti yang dikenal pasti, bulan demi bulan',en:'Identified activities, month by month'},
 tlP:{bm:'Hanya aktiviti yang mempunyai bukti dalam Drive atau rekod tempahan. Butiran peserta masih perlu disahkan.',en:'Only activities with evidence in Drive or booking records. Participant details still need verification.'},
 r2:{bm:'TECC 2.0',en:'TECC 2.0'},r4:{bm:'TECC 4.0',en:'TECC 4.0'},open:{bm:'Buka',en:'Open'},
 zK:{bm:'KAWASAN & CIRI PINTAR',en:'ZONES & SMART FEATURES'},zH:{bm:'Empat zon, satu aliran pembelajaran',en:'Four zones, one learning flow'},
 zP:{bm:'Klik zon untuk melihat fungsinya. Skema konsep sahaja, bukan pelan lantai sebenar. Pelan sebenar akan dilampirkan.',en:'Click a zone to see its role. Conceptual schematic only, not the actual floor plan. The real plan will be attached.'},
 feat:{bm:'Ciri pintar',en:'Smart features'},dig:{bm:'Integrasi digital',en:'Digital integration'},
 vis:{bm:'Visi',en:'Vision'},mis:{bm:'Misi',en:'Mission'},obj:{bm:'Objektif TECC',en:'TECC objectives'},
 srcN:{bm:'Sumber kandungan: laporan Google Sites TECC 2025 anda (konsep, bukan statistik 2026).',en:'Content source: your TECC 2025 Google Sites report (concept, not 2026 statistics).'},
 ttK:{bm:'JADUAL WAKTU INTERAKTIF',en:'INTERACTIVE TIMETABLE'},ttH:{bm:'Bila TECC 2.0 digunakan untuk PdP',en:'When TECC 2.0 is used for classes'},
 ttP:{bm:'Klik atau tap blok untuk butiran. Jalur bergaris ialah ko-kurikulum Rabu (bertindih dengan PdP tidak dikira dua kali).',en:'Click or tap a block for details. The hatched band is Wednesday co-curricular (overlap with classes is not double counted).'},
 hrs:{bm:'jam',en:'h'},pick:{bm:'Pilih satu blok dalam jadual.',en:'Pick a block in the timetable.'},grp:{bm:'Kumpulan',en:'Group'},slot:{bm:'Slot',en:'Slots'},
 mdK:{bm:'MODUL PdP TECCgogy',en:'TECCgogy TEACHING MODULES'},mdH:{bm:'Lima modul pengajaran berasaskan TECC',en:'Five TECC-based teaching modules'},
 mdP:{bm:'Tajuk modul daripada laporan konsep anda. Dokumen modul penuh dan bukti pelaksanaan 2026 perlu dilampirkan.',en:'Module titles from your concept report. Full module documents and 2026 implementation evidence still need attaching.'},
 mdS:{bm:'Perlu dilampirkan',en:'To attach'},
 stat1:{bm:'komponen wajib',en:'mandatory components'},stat2:{bm:'ruang dilaporkan',en:'spaces reported'},stat3:{bm:'tempahan TECC 4.0',en:'TECC 4.0 bookings'},stat4:{bm:'aktiviti direkod',en:'activities recorded'},stat5:{bm:'item bukti & lampiran',en:'evidence & attachment items'},
 rbK:{bm:'RUBRIK PENARAFAN BINTANG',en:'STAR RATING RUBRIC'},rbH2:{bm:'Tiga elemen penarafan TECC 2.0',en:'The three TECC 2.0 rating elements'},rbH4:{bm:'Empat elemen penarafan DigitalEyez',en:'The four DigitalEyez rating elements'},see:{bm:'Lihat bahagian',en:'See section'},rbR:{bm:'Kesediaan bukti (berpemberat)',en:'Evidence readiness (weighted)'},pol:{bm:'Dasar pusat TECC (BIPD)',en:'TECC central policy (BIPD)'},i2K:{bm:'IMMERSIVE INVESTIGATION (I2)',en:'IMMERSIVE INVESTIGATION (I2)'},i2H:{bm:'Empat jenis aktiviti imersif',en:'Four types of immersive activity'},i2P:{bm:'Jenis I2 dalam garis panduan DigitalEyez, sebagai rujukan untuk memadankan aktiviti 2026.',en:'I2 types in the DigitalEyez guideline, as a reference for matching 2026 activities.'},zoom:{bm:'Tutup',en:'Close'},mon:['Jan','Feb','Mac','Apr','Mei','Jun','Jul','Ogos','Sep','Okt','Nov','Dis'],monE:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']};
const u=k=>L(U[k]);const mon=m=>(LG==='en'?U.monE:U.mon)[m-1];
const head=(k,h,p)=>'<div class="wrap"><span class="kicker">'+esc(u(k))+'</span><h2>'+esc(u(h))+'</h2>'+(p?'<p class="lead">'+esc(u(p))+'</p>':'')+'</div>';
const state={el:0,comp:'all',room:'all',zone:0,sess:'jan26',ttSel:null,vm:'vis',obj:0,mod:null};
function heroStats(){const el=$('#heroStats');if(!el)return;
 const s=[[4,'stat1'],[2,'stat2'],[D.tecc4.summary?D.tecc4.summary.total||63:63,'stat3'],[D.activities.length,'stat4'],[D.register.length,'stat5']];
 el.innerHTML=s.map(x=>'<div class="hs rv"><b data-count="'+x[0]+'">'+x[0]+'</b><span>'+esc(u(x[1]))+'</span></div>').join('')}
function cmap(){const el=$('#cmap');if(!el)return;
 const comps=c=>c.id==='sm'?['c2','c3']:[c.comp];
 const chips='<div class="chips" role="group"><button class="chip'+(state.comp==='all'?' on':'')+'" data-comp="all">'+esc(u('all'))+'</button>'+['c1','c2','c3','c4'].map(k=>'<button class="chip'+(state.comp===k?' on':'')+'" data-comp="'+k+'">'+esc(L(D.ui[k]))+'</button>').join('')+'</div>';
 el.innerHTML=head('cmapK','cmapH','cmapP')+'<div class="wrap">'+chips+'<div class="cmap-grid">'+D.cmap.map((c,i)=>{const cs=comps(c),dim=state.comp!=='all'&&!cs.includes(state.comp);
  return '<article class="cmcard rv'+(dim?' dim':'')+'" style="--i:'+i+'"><span class="cmnum">0'+(i+1)+'</span><h3>'+esc(L(c.name))+'</h3><p>'+esc(L(c.desc))+'</p><div class="cmtags">'+cs.map(k=>'<span class="badge ready">'+esc(L(D.ui[k]))+'</span>').join('')+'</div><div class="cmlinks">'+c.links.map(l=>'<a href="'+l[0]+'">'+esc(L(l[1]))+' ↗</a>').join('')+'</div></article>'}).join('')+'</div></div>';
 $$('.chip',el).forEach(b=>b.onclick=()=>{state.comp=b.dataset.comp;cmap();reveal()})}
function timeline(){const el=$('#timeline');if(!el)return;
 const rooms=[['all',u('all')],['tecc2',u('r2')],['tecc4',u('r4')]];
 const items=D.activities.filter(a=>state.room==='all'||a.room===state.room).sort((a,b)=>a.sort<b.sort?-1:1);
 el.innerHTML=head('tlK','tlH','tlP')+'<div class="wrap"><div class="chips" role="group">'+rooms.map(r=>'<button class="chip'+(state.room===r[0]?' on':'')+'" data-room="'+r[0]+'">'+esc(r[1])+'</button>').join('')+'</div>'
 +'<ol class="tl">'+items.map((a,i)=>{const m=+a.sort.slice(5,7);return '<li class="tli rv '+a.room+'" style="--i:'+(i%6)+'"><span class="tlm">'+mon(m)+'</span><div class="tlc"><small>'+esc(L(a.date))+' · '+esc(a.room==='tecc2'?u('r2'):u('r4'))+'</small><b>'+esc(L(a.title))+'</b><p>'+esc(L(a.note))+'</p></div></li>'}).join('')+'</ol></div>';
 $$('.chip',el).forEach(b=>b.onclick=()=>{state.room=b.dataset.room;timeline();reveal()})}
function zones(){const el=$('#zones');if(!el)return;const C=D.concept;const z=C.zones[state.zone];
 const pos=['zx','zc','zp','zt'];
 el.innerHTML=head('zK','zH','zP')+'<div class="wrap"><div class="zonewrap"><div class="plan" role="tablist">'+C.zones.map((q,i)=>'<button role="tab" aria-selected="'+(i===state.zone)+'" class="zone '+pos[i]+' '+q.c+(i===state.zone?' on':'')+'" data-z="'+i+'"><span>'+q.icon+'</span><b>'+esc(L(q.name))+'</b></button>').join('')+'<i class="screen">Smart TV</i></div>'
 +'<div class="zdetail" aria-live="polite"><span class="zbig '+z.c+'">'+z.icon+'</span><h3>'+esc(L(z.name))+'</h3><p>'+esc(L(z.desc))+'</p></div></div>'
 +'<h3 class="sub">'+esc(u('feat'))+'</h3><div class="featgrid">'+C.features.map(f=>'<div class="feat rv"><span>'+f.icon+'</span><b>'+esc(L(f.name))+'</b><p>'+esc(L(f.desc))+'</p></div>').join('')+'</div>'
 +'<h3 class="sub">'+esc(u('dig'))+'</h3><div class="chips static">'+C.digital.map(d=>'<span class="chip tool">'+esc(L(d))+'</span>').join('')+'</div>'
 +'<div class="vm"><div class="chips" role="group"><button class="chip'+(state.vm==='vis'?' on':'')+'" data-vm="vis">'+esc(u('vis'))+'</button><button class="chip'+(state.vm==='mis'?' on':'')+'" data-vm="mis">'+esc(u('mis'))+'</button></div><p class="vmtext">'+esc(L(state.vm==='vis'?C.vision:C.mission))+'</p></div>'
 +'<h3 class="sub">'+esc(u('obj'))+'</h3><ol class="objs">'+C.objectives.map((o,i)=>'<li class="'+(state.obj===i?'on':'')+'"><button data-o="'+i+'" aria-expanded="'+(state.obj===i)+'"><b>'+(i+1)+'</b><span>'+esc(L(o))+'</span></button></li>').join('')+'</ol>'
 +'<p class="small muted">'+esc(u('srcN'))+'</p></div>';
 $$('[data-z]',el).forEach(b=>b.onclick=()=>{state.zone=+b.dataset.z;zones();reveal()});
 $$('[data-vm]',el).forEach(b=>b.onclick=()=>{state.vm=b.dataset.vm;zones();reveal()});
 $$('[data-o]',el).forEach(b=>b.onclick=()=>{state.obj=+b.dataset.o;zones();reveal()})}
function timetable(){const el=$('#timetable');if(!el)return;const T=D.timetable,S=T.sessions[state.sess];
 const blocks=S.blocks;let sel=state.ttSel;
 const hasCell=(d,c)=>blocks.findIndex(b=>b[0]===d&&c>=b[1]&&c<=b[2]);
 const perDay=T.days.map((_,d)=>blocks.filter(b=>b[0]===d).reduce((a,b)=>a+(b[2]-b[1]+1),0));
 const mx=Math.max(...perDay,1);
 let grid='<div class="ttgrid" style="--cols:'+T.cols.length+'"><span class="tth"></span>'+T.cols.map((c,i)=>'<span class="tth'+(c==='B'||c==='L'?' brk':'')+'">'+(c==='B'?(LG==='en'?'Break':'Rehat'):c==='L'?(LG==='en'?'Lunch':'Makan'):c)+'<small>'+T.times[i]+'</small></span>').join('');
 T.days.forEach((dn,d)=>{grid+='<span class="ttd">'+esc(L(dn))+'</span>';
  T.cols.forEach((c,ci)=>{const bi=hasCell(d,ci),ko=(d===T.ko.day&&ci>=T.ko.from&&ci<=T.ko.to);
   if(c==='B'||c==='L'){grid+='<span class="ttc brk"></span>';return}
   if(bi>=0){const b=blocks[bi],first=ci===b[1];grid+='<button class="ttc busy'+(ko?' ko':'')+(sel===bi?' sel':'')+'" data-b="'+bi+'" aria-label="'+esc(L(dn)+' '+b[3])+'">'+(first?'<b>'+esc(b[3])+'</b>':'')+'</button>'}
   else grid+='<span class="ttc'+(ko?' ko':'')+'"></span>'})});
 grid+='</div>';
 let det='<p class="muted">'+esc(u('pick'))+'</p>';
 if(sel!=null&&blocks[sel]){const b=blocks[sel],st=T.times[b[1]],en=T.times[b[2]].split(':'),h=(+en[0]+1)+':'+en[1];const sl=T.cols.slice(b[1],b[2]+1).join('–');
  det='<h4>'+esc(b[3])+'</h4><p>'+esc(L(T.days[b[0]]))+' · '+st+'–'+h+'</p><p class="muted">'+esc(u('slot'))+' '+sl+' · '+(b[2]-b[1]+1)+' '+esc(u('hrs'))+'</p>'}
 el.innerHTML=head('ttK','ttH','ttP')+'<div class="wrap"><div class="chips" role="group">'+Object.keys(T.sessions).map(k=>'<button class="chip'+(state.sess===k?' on':'')+'" data-s="'+k+'">'+esc(L(T.sessions[k].label))+'</button>').join('')+'</div>'
 +'<div class="ttscroll">'+grid+'</div><div class="ttside"><div class="ttdet" aria-live="polite">'+det+'</div><div class="ttbars">'+T.days.map((dn,d)=>'<div class="tb"><span>'+esc(L(dn))+'</span><i style="--w:'+(100*perDay[d]/mx)+'%"></i><b>'+perDay[d]+' '+esc(u('hrs'))+'</b></div>').join('')+'</div></div>'
 +'<p class="small muted"><span class="lg ko"></span>'+esc(L(T.ko.label))+'. '+esc(L(T.note))+'</p></div>';
 $$('[data-s]',el).forEach(b=>b.onclick=()=>{state.sess=b.dataset.s;state.ttSel=null;timetable()});
 $$('[data-b]',el).forEach(b=>b.onclick=()=>{state.ttSel=+b.dataset.b;timetable()})}
function modules(){const el=$('#modules');if(!el)return;
 el.innerHTML=head('mdK','mdH','mdP')+'<div class="wrap"><div class="mods">'+D.concept.modules.map((m,i)=>'<button class="mod rv'+(state.mod===i?' on':'')+'" data-m="'+i+'" style="--i:'+i+'"><span class="mn">'+m.n+'</span><b>'+esc(L(m.name))+'</b><small class="badge pending">'+esc(u('mdS'))+'</small></button>').join('')+'</div></div>';
 $$('[data-m]',el).forEach(b=>b.onclick=()=>{state.mod=state.mod===+b.dataset.m?null:+b.dataset.m;modules();reveal()})}
function rubric(){const el=$('#rubric');if(!el)return;const room=el.dataset.room,R=D.rubric[room];if(!R)return;
 const ei=Math.min(state.el,R.els.length-1);const E=R.els[ei];
 const st={ready:'ready',partial:'partial',pending:'pending'};
 const tot=R.els.reduce((a,e)=>a+e.w,0);
 const share=k=>{let m=0;R.els.forEach(e=>{const tm=e.items.reduce((a,i)=>a+i.mk,0);e.items.forEach(i=>{if(i.st===k)m+=e.w*i.mk/tm})});return Math.round(m)};
 const rd=share('ready'),pt=share('partial');
 el.innerHTML='<div class="wrap"><span class="kicker">'+esc(u('rbK'))+'</span><h2>'+esc(u(room==='tecc4'?'rbH4':'rbH2'))+'</h2><p class="lead">'+esc(L(R.src))+'</p>'
 +'<div class="elbar" role="tablist">'+R.els.map((e,i)=>'<button role="tab" aria-selected="'+(i===ei)+'" class="elseg c'+i+(i===ei?' on':'')+'" style="flex:'+e.w+'" data-el="'+i+'"><b>'+e.w+'%</b><span>'+esc(L(e.n))+'</span></button>').join('')+'</div>'
 +'<div class="rbitems">'+E.items.map(i=>'<div class="rbi"><div><b>'+esc(L(i.n))+'</b>'+(i.link?'<a href="'+i.link+'">'+esc(u('see'))+' ↗</a>':'')+'</div><span class="mk">'+i.mk+'</span><span class="badge '+i.st+'">'+esc(L(D.ui[i.st]))+'</span></div>').join('')+'</div>'
 +'<div class="ready"><div class="rbar"><i class="r" style="--w:'+rd+'%"></i><i class="p" style="--w:'+pt+'%"></i></div><p>'+esc(u('rbR'))+': <b>'+rd+'%</b> '+esc(L(D.ui.ready))+' · <b>'+pt+'%</b> '+esc(L(D.ui.partial))+'</p></div>'
 +(room==='tecc2'?'<h3 class="sub">'+esc(u('pol'))+'</h3><ul class="pol">'+D.rubric.policy2.map(p=>'<li>'+esc(L(p))+'</li>').join('')+'</ul>':'')
 +'<p class="small muted">'+esc(L(D.rubric.note))+'</p></div>';
 $$('[data-el]',el).forEach(b=>b.onclick=()=>{state.el=+b.dataset.el;rubric()})}
function i2(){const el=$('#i2');if(!el)return;
 el.innerHTML='<div class="wrap"><span class="kicker">'+esc(u('i2K'))+'</span><h2>'+esc(u('i2H'))+'</h2><p class="lead">'+esc(u('i2P'))+'</p><div class="featgrid">'+D.rubric.i2.map((x,i)=>'<div class="feat rv" style="--i:'+i+'"><span class="tech">'+esc(x.tech)+'</span><b>'+esc(L(x.t))+'</b><p>'+esc(L(x.d))+'</p></div>').join('')+'</div><p class="small muted">'+esc(L(D.rubric.srcg))+'</p></div>'}
function archi(){const el=$('#innovation');if(!el)return;const A=D.archi;
 el.innerHTML='<div class="wrap"><span class="kicker">'+esc(u('inK'))+'</span><h2>'+esc(A.name)+'</h2><p class="lead">'+esc(L(A.tag))+'</p><div class="archi"><div class="factgrid">'+A.facts.map(f=>'<div class="fact"><small>'+esc(L(f[0]))+'</small><strong>'+esc(L(f[1]))+'</strong></div>').join('')+'</div>'
 +'<div class="herostats astats">'+A.stats.map(s=>'<div class="hs"><b>'+esc(s[0])+'</b><span>'+esc(L(s[1]))+'</span></div>').join('')+'</div>'
 +'<div class="evgrid">'+A.photos.map(p=>'<figure><img src="'+p[0]+'" alt="'+esc(L(p[1]))+'" loading="lazy"/><figcaption>'+esc(L(p[1]))+'</figcaption></figure>').join('')+'</div>'
 +'<div class="note">'+esc(L(A.design))+'</div><div class="chips static">'+A.elems.map(x=>'<span class="chip tool">'+esc(L(x))+'</span>').join('')+'</div>'
 +'<div class="cmlinks">'+A.links.map(l=>'<a href="'+l[0]+'" target="_blank" rel="noopener">'+esc(L(l[1]))+' ↗</a>').join('')+'<a href="lampiran.html#register">'+esc(u('see'))+' ↗</a></div><p class="small muted">'+esc(L(A.note))+'</p></div></div>'}
let io;function reveal(){if(!('IntersectionObserver' in window)){$$('.rv').forEach(e=>e.classList.add('in'));return}
 io=io||new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);$$('[data-count]',e.target).forEach(count)}}),{threshold:.12});
 $$('.rv:not(.in)').forEach(e=>io.observe(e))}
function count(el){const t=+el.dataset.count;if(matchMedia('(prefers-reduced-motion: reduce)').matches||el.dataset.done)return;el.dataset.done=1;let n=0;const st=performance.now();(function f(now){const p=Math.min(1,(now-st)/900);el.textContent=Math.round(t*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(st)}
function lightbox(){if(window.__lb)return;window.__lb=1;
 document.addEventListener('click',e=>{const a=e.target.closest('a[href$=".webp"],.evgrid img,.preview');if(!a)return;e.preventDefault();
  const src=a.tagName==='IMG'?a.getAttribute('src'):a.getAttribute('href');const o=document.createElement('div');o.className='lb';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');
  o.innerHTML='<button class="lbx" aria-label="'+esc(u('zoom'))+'">×</button><img alt="" src="'+esc(src)+'"/>';document.body.append(o);const x=$('.lbx',o);x.focus();
  const close=()=>{o.remove();document.removeEventListener('keydown',k)};const k=ev=>{if(ev.key==='Escape')close()};document.addEventListener('keydown',k);o.onclick=ev=>{if(ev.target===o||ev.target===x)close()}})}
const orig=window.TECC_RENDER;
window.TECC_RENDER=function(l){if(orig)orig(l);LG=l==='en'?'en':'ms';heroStats();cmap();timeline();zones();timetable();modules();rubric();i2();archi();reveal();lightbox()};
document.addEventListener('DOMContentLoaded',()=>{reveal();$$('.hs').forEach(e=>{});
 if(!matchMedia('(pointer:coarse)').matches)$$('.room-card:not(.soon)').forEach(c=>{c.addEventListener('mousemove',ev=>{const r=c.getBoundingClientRect();c.style.setProperty('--rx',((ev.clientY-r.top)/r.height-.5)*-6+'deg');c.style.setProperty('--ry',((ev.clientX-r.left)/r.width-.5)*6+'deg')});c.addEventListener('mouseleave',()=>{c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')})})});
})();
