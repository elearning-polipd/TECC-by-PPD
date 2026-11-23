/* Renders every data-driven block from window.TECC_DATA. Called by app.js on each language change. */
(function(){
const D=window.TECC_DATA;if(!D)return;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
let LG='ms';
const L=o=>o==null?'':(typeof o==='string'?o:(o[LG]||o.bm||''));
const ui=k=>L(D.ui[k]);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const MS=['Jan','Feb','Mac','Apr','Mei','Jun','Jul','Ogos','Sep','Okt','Nov','Dis'],EN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const mn=m=>(LG==='en'?EN:MS)[m-1];
const H=s=>LG==='en'?String(s).replace(/(\d)j/g,'$1h'):String(s);
const badge=(st,txt)=>'<span class="badge '+st+'">'+esc(txt||ui(st))+'</span>';
const roomName=r=>r==='both'?ui('both'):ui(r==='tecc2'?'room2':'room4');
function href(it){return it.url||''}
function link(it){return it.url?'<a class="inl" href="'+esc(href(it))+'" target="_blank" rel="noopener">'+esc(ui('open'))+'</a>':'<span class="muted">'+esc(ui(it.status==='missing'?'noattach':'hold'))+'</span>'}
function bars(){const el=$('#resourceBars');if(!el)return;const rs=D.tecc4.resources;el.innerHTML=rs.map(x=>'<div class="barrow"><span>'+esc(x.name)+'</span><div class="bartrack"><div class="barfill" style="width:'+(100*x.approved/46)+'%"></div></div><b>'+x.approved+'</b><em>'+esc(H(x.hours))+'</em></div>').join('')}
function depts(){const el=$('#deptTable');if(!el)return;const t=D.tecc4;el.innerHTML=t.departments.map(x=>'<tr><td>'+esc(x.name)+'</td><td>'+x.bookings+'</td><td>'+esc(x.hours)+'</td></tr>').join('')+'<tr><td colspan="3" class="muted">'+esc(ui('other_dept'))+': '+esc(t.deptAll.filter(d=>!t.departments.some(x=>x.name===d)).join(', '))+'</td></tr>'}
function monthChart(){const el=$('#monthChart');if(!el)return;const t=D.tecc4;el.innerHTML=t.monthly.map(x=>{let bar='',txt='';
 if(x.state==='known'){bar='<div class="bartrack"><div class="barfill" style="width:'+(100*x.bookings/22)+'%"></div></div>';txt='<b>'+x.bookings+' '+esc(ui('bookings'))+' · '+esc(H(x.hours))+'</b>'+(x.note?' <small>'+esc(L(x.note))+'</small>':'')}
 else if(x.state==='none'){bar='<div class="bartrack empty"></div>';txt='<span class="muted">'+esc(ui('norec'))+'</span>'}
 else if(x.state==='outside'){bar='<div class="bartrack empty"></div>';txt='<span class="muted">'+esc(ui('outside'))+'</span>'}
 else{bar='<div class="bartrack hatch"></div>';txt='<span class="muted">'+esc(ui('pend_split'))+'</span>'+(x.note?' <small>'+esc(L(x.note))+'</small>':'')}
 return '<div class="monthrow"><span>'+mn(x.m)+'</span>'+bar+'<div class="mtxt">'+txt+'</div></div>'}).join('');
 const r=t.residual;$('#monthResidual').textContent=({ms:'Baki '+r.bookings+' tempahan diluluskan ('+H(r.hours)+') berada dalam bulan '+L(r.months)+'. Pecahan bulanan akan dikira apabila eksport tempahan dimuat naik.',en:'The remaining '+r.bookings+' approved bookings ('+H(r.hours)+') fall in '+L(r.months)+'. The monthly split will be calculated once the booking export is uploaded.'})[LG]}
function room2Months(){const el=$('#month2Rows');if(!el)return;const ev={};D.evidence.byMonth.forEach(e=>ev[e.m]=e.tecc2);
 el.innerHTML=D.tecc2.monthly.map(x=>{const acts=x.acts.map(id=>D.activities.find(a=>a.id===id)).filter(Boolean);
 return '<tr><td><b>'+mn(x.m)+'</b></td><td>'+esc(L(x.pdp))+'</td><td>'+(x.extra?x.extra+' '+esc(ui('hours')):'—')+'</td><td>'+(acts.length?acts.map(a=>esc(L(a.title))).join('; '):'—')+'</td><td>'+(ev[x.m]?'≥'+ev[x.m]+' '+esc(ui('files')):'—')+'</td></tr>'}).join('')}
function activities(){$$('[data-activities]').forEach(tb=>{const room=tb.dataset.activities;const rows=D.activities.filter(a=>a.room===room).sort((a,b)=>a.sort<b.sort?-1:1);
 tb.innerHTML=rows.map(a=>{const ev=(a.evidence||[]).map(id=>D.register.find(r=>r.id===id)).filter(Boolean).map(r=>r.url?'<a class="inl" href="'+esc(r.url)+'" target="_blank" rel="noopener">'+esc(L(r.title).slice(0,34))+(L(r.title).length>34?'…':'')+'</a>':'').filter(Boolean).join('<br>');
 return '<tr><td>'+esc(L(a.date))+'</td><td><b>'+esc(L(a.title))+'</b><br><small class="muted">'+esc(L(a.note))+'</small></td><td>'+esc(ui('unverified'))+'</td><td>'+badge(a.status==='booked'?'ready':'partial',ui(a.status))+'</td><td>'+ev+'</td></tr>'}).join('')})}
function statusViews(){const sk=['c1','c2','c3','c4'],sec={c1:'#profile',c2:'#usage',c3:'#sop',c4:'#sharing'};
 $$('[data-status-strip]').forEach(el=>{const r=el.dataset.statusStrip;el.innerHTML=sk.map(k=>'<a class="spill '+D.status[r][k]+'" href="'+sec[k]+'"><b>'+esc(ui(k))+'</b>'+badge(D.status[r][k])+'<small>'+esc(L(D.statusNote[r][k]))+'</small></a>').join('')});
 const m=$('#statusMatrix');if(m)m.innerHTML=sk.map(k=>'<tr><th scope="row">'+esc(ui(k))+'</th>'+['tecc2','tecc4'].map(r=>'<td><a href="'+r+'.html'+sec[k]+'">'+badge(D.status[r][k])+'</a><br><small class="muted">'+esc(L(D.statusNote[r][k]))+'</small></td>').join('')+'</tr>').join('');
 m&&$$('#statusMatrix a').forEach(a=>{a.setAttribute('href',a.getAttribute('href')+(LG==='en'?'':'')) })}
function register(){const el=$('#registerRows');if(!el)return;const fr=$('#fRoom').value,fc=$('#fComp').value;
 const rows=D.register.filter(x=>(fr==='all'||x.room===fr||x.room==='both')&&(fc==='all'||x.comp===fc));
 el.innerHTML=rows.map(x=>'<tr><td>'+esc(roomName(x.room))+'</td><td>'+esc(ui(x.comp))+'</td><td>'+esc(L(D.kinds[x.kind]))+'</td><td><b>'+esc(L(x.title))+'</b>'+(x.note?'<br><small class="muted">'+esc(L(x.note))+'</small>':'')+'</td><td>'+badge(x.status==='ready'?'ready':x.status==='internal'?'internal':x.status==='hold'?'hold':'missing')+'</td><td>'+link(x)+'</td></tr>').join('');
 const c=k=>D.register.filter(x=>x.status===k).length;const s=$('#registerSummary');if(s)s.textContent=({ms:c('ready')+' sedia · '+c('internal')+' dalaman · '+c('hold')+' jangan terbit · '+c('missing')+' perlu dimuat naik',en:c('ready')+' ready · '+c('internal')+' internal · '+c('hold')+' do not publish · '+c('missing')+' to upload'})[LG]}
function evidence(){const el=$('#evidenceRows');if(!el)return;const bm={};D.evidence.byMonth.forEach(e=>bm[e.m]=e);
 el.innerHTML=[1,2,3,4,5,6,7,8,9,10,11,12].map(m=>{const e=bm[m]||{};const t4=D.tecc4.monthly[m-1],t2=D.tecc2.monthly[m-1];
 return '<tr><td><b>'+mn(m)+'</b></td><td>'+(t2.extra?t2.extra+' '+esc(ui('hours')):'—')+'</td><td>'+(e.tecc2?'≥'+e.tecc2:'—')+'</td><td>'+(t4.state==='known'?t4.bookings+' ('+esc(H(t4.hours))+')':t4.state==='pending'?'?':'—')+'</td><td>'+(e.tecc4?'≥'+e.tecc4:'—')+(e.unass?' <small class="muted">(+'+e.unass+' '+esc(ui('unass'))+')</small>':'')+'</td></tr>'}).join('');
 $('#evidenceNote').textContent=L(D.evidence.note);
 $('#unmatchedRows').innerHTML=D.evidence.unmatched.map(u=>'<tr><td>'+esc(roomName(u.room))+'</td><td>'+esc(L(u.date))+'</td><td>'+esc(L(u.note))+'</td></tr>').join('')}
window.TECC_RENDER=function(l){LG=l==='en'?'en':'ms';$$('[data-hours]').forEach(e=>e.textContent=H(e.dataset.hours));bars();depts();monthChart();room2Months();activities();statusViews();register();evidence()};
document.addEventListener('change',e=>{if(e.target.id==='fRoom'||e.target.id==='fComp')register()});
})();
