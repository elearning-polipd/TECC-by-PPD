/* v14: searchable evidence register (cards). Safe to remove: the original table still works. */
(function(){'use strict';
var D=window.TECC_DATA;if(!D||!D.register)return;
var host=document.querySelector('#register .wrap');if(!host)return;
var LG='ms',st={q:'',room:'all',comp:'all',kind:'all',status:'all'};
var $=function(s,r){return(r||document).querySelector(s)};
var esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var L=function(o){return o==null?'':(typeof o==='string'?o:(o[LG]||o.bm||''))};
var T={ms:{search:'Cari dokumen, surat atau bukti…',all:'Semua',room:'Ruang',comp:'Komponen',kind:'Jenis',status:'Status',count:function(n,t){return n+' daripada '+t+' dokumen'},reset:'Set semula',none:'Tiada dokumen sepadan. Cuba kata kunci lain.',open:'Buka ↗',sheet:'Dalam Sheet induk',img:'Pratonton',ready:'Sedia',internal:'Rujukan',hold:'Jangan terbit',missing:'Perlu dimuat naik',both:'Kedua-dua'},
en:{search:'Search documents, letters or evidence…',all:'All',room:'Space',comp:'Component',kind:'Type',status:'Status',count:function(n,t){return n+' of '+t+' documents'},reset:'Reset',none:'No matching documents. Try another keyword.',open:'Open ↗',sheet:'In master Sheet',img:'Preview',ready:'Ready',internal:'Reference',hold:'Do not publish',missing:'To upload',both:'Both'}};
var R=D.register;
function uniq(k){var o=[];R.forEach(function(r){if(o.indexOf(r[k])<0&&r[k])o.push(r[k])});return o}
var rooms=['tecc2','tecc4'],comps=['c1','c2','c3','c4'],kinds=uniq('kind'),stats=['ready','internal'].concat(uniq('status').filter(function(s){return s!=='ready'&&s!=='internal'}));
var KI={guide:'📘',sched:'🗓',record:'🧾',photo:'🖼',letter:'✉️',sop:'📋',report:'📊',link:'🔗'};
function chips(key,vals,label){var t=T[LG];return '<div class="lv-group" role="group" aria-label="'+esc(label)+'"><span class="lv-lab">'+esc(label)+'</span>'+['all'].concat(vals).map(function(v){var tx=v==='all'?t.all:(key==='room'?(v==='tecc2'?'TECC 2.0':'TECC 4.0'):key==='comp'?L(D.ui[v]):key==='kind'?L(D.kinds[v]):t[v]||v);return '<button type="button" class="lv-chip'+(st[key]===v?' on':'')+'" data-k="'+key+'" data-v="'+v+'" aria-pressed="'+(st[key]===v)+'">'+esc(tx)+'</button>'}).join('')+'</div>'}
function match(x){if(st.room!=='all'&&x.room!==st.room&&x.room!=='both')return false;if(st.comp!=='all'&&x.comp!==st.comp)return false;if(st.kind!=='all'&&x.kind!==st.kind)return false;if(st.status!=='all'&&x.status!==st.status)return false;
 if(st.q){var h=(L(x.title)+' '+L(x.note)+' '+L(D.kinds[x.kind])+' '+x.id).toLowerCase();return st.q.toLowerCase().split(/\s+/).every(function(w){return h.indexOf(w)>=0})}return true}
function card(x){var t=T[LG],isImg=false,rm=x.room==='both'?t.both:x.room==='tecc2'?'TECC 2.0':'TECC 4.0';
 var th=isImg?'<img src="'+esc(x.url)+'" alt="" loading="lazy" decoding="async">':'<span class="lv-ico" aria-hidden="true">'+(KI[x.kind]||'📄')+'</span>';
 var act=x.url?'<a class="lv-open" href="'+esc(x.url)+'" target="_blank" rel="noopener">'+t.open+'</a>':'<span class="lv-sheet">'+t.sheet+'</span>';
 return '<article class="lv-card r-'+x.room+'"><div class="lv-th">'+th+'</div><div class="lv-b"><div class="lv-tags"><span class="lv-room r-'+x.room+'">'+rm+'</span><span class="lv-kind">'+esc(L(D.kinds[x.kind]))+'</span><span class="lv-st s-'+x.status+'">'+esc(t[x.status]||x.status)+'</span></div><h3>'+esc(L(x.title))+'</h3>'+(x.note?'<p>'+esc(L(x.note))+'</p>':'')+'<div class="lv-foot"><span class="lv-comp">'+esc(L(D.ui[x.comp]))+'</span>'+act+'</div></div></article>'}
function draw(){var t=T[LG],rows=R.filter(match);
 $('#lvCount').textContent=t.count(rows.length,R.length);
 $('#lvGrid').innerHTML=rows.length?rows.map(card).join(''):'<p class="lv-none">'+t.none+'</p>';
 $('#lvChips').innerHTML=chips('room',rooms,t.room)+chips('comp',comps,t.comp)+chips('kind',kinds,t.kind)+chips('status',stats,t.status)}
function build(){var t=T[LG],box=$('#lvBox');
 if(!box){box=document.createElement('div');box.id='lvBox';box.className='lv';
  box.innerHTML='<div class="lv-bar"><input id="lvQ" type="search" autocomplete="off"><span id="lvCount" class="lv-count" aria-live="polite"></span><button type="button" id="lvReset" class="lv-reset"></button></div><div id="lvChips"></div><div id="lvGrid" class="lv-grid"></div>';
  var tw=$('#register .tablewrap');tw.parentNode.insertBefore(box,tw);document.body.classList.add('v14-lamp');
  $('#lvQ').addEventListener('input',function(e){st.q=e.target.value.trim();draw()});
  $('#lvReset').addEventListener('click',function(){st={q:'',room:'all',comp:'all',kind:'all',status:'all'};$('#lvQ').value='';draw()});
  box.addEventListener('click',function(e){var b=e.target.closest('.lv-chip');if(!b)return;st[b.dataset.k]=b.dataset.v;draw()})}
 $('#lvQ').placeholder=t.search;$('#lvReset').textContent=t.reset;draw()}
function lang(){var b=document.querySelector('.lang-option[aria-pressed="true"]');return b&&b.dataset.lang==='en'?'en':'ms'}
LG=lang();build();
var w=window.TECC_RENDER;if(typeof w==='function')window.TECC_RENDER=function(l){var r=w.apply(this,arguments);try{LG=l==='en'?'en':'ms';build()}catch(e){}return r};
document.addEventListener('click',function(e){if(e.target.closest('.lang-option'))setTimeout(function(){LG=lang();build()},120)});
})();
