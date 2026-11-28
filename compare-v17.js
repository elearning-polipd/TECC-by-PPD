/* v17 compare view TECC 2.0 vs 4.0 on landing. Data: D.compare + summary figures. Safe to remove. */
(function(){'use strict';
var D=window.TECC_DATA;if(!D||!D.compare)return;
var $=function(s,r){return(r||document).querySelector(s)};
var esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var lg=function(){var b=$('.lang-option[aria-pressed="true"]');return b&&b.dataset.lang==='en'?'en':'bm'};
var L=function(o){return o==null?'':(typeof o==='string'?o:(o[lg()]||o.bm||''))};
var T={bm:{k:'BANDING PANTAS',h:'Dua ruang, dua kekuatan.',p:'Pilih satu aspek untuk lihat perbezaan TECC 2.0 dan TECC 4.0 bersebelahan.',all:'Semua aspek',n2:['jam penggunaan','faktor penggunaan'],n4:['tempahan diluluskan','jam aktiviti tambahan'],note:'Angka dan kandungan daripada rekod tempahan, jadual waktu dan log aktiviti 2026.',go:'Buka laporan'},
en:{k:'QUICK COMPARE',h:'Two spaces, two strengths.',p:'Pick an aspect to see TECC 2.0 and TECC 4.0 side by side.',all:'All aspects',n2:['usage hours','utility factor'],n4:['approved bookings','additional activity hours'],note:'Figures and content from 2026 booking records, timetable and activity logs.',go:'Open report'}};
var sel=0;
function nums(){var a=D.tecc2.summary,c=D.tecc4;return{a:[String(a.total).replace(/\.0$/,''),a.factor+'%'],c:[String(c.summary.approved),String(c.activityHours)]}}
function render(){var sec=$('#cmp17');if(!sec)return;var t=T[lg()],n=nums(),rows=D.compare;
 var pills='<button type="button" class="c17-p'+(sel<0?' on':'')+'" data-i="-1">'+t.all+'</button>'+rows.map(function(r,i){return '<button type="button" class="c17-p'+(i===sel?' on':'')+'" data-i="'+i+'">'+esc(L(r.k))+'</button>'}).join('');
 var body;
 if(sel>=0){var r=rows[sel];body='<div class="c17-pair"><article class="c17-c a"><span class="c17-tag">TECC 2.0</span><p>'+esc(L(r.a))+'</p></article><div class="c17-vs">VS</div><article class="c17-c c"><span class="c17-tag">TECC 4.0</span><p>'+esc(L(r.c))+'</p></article></div>'}
 else{body='<div class="c17-all">'+rows.map(function(r){return '<div class="c17-row"><b>'+esc(L(r.k))+'</b><p class="a">'+esc(L(r.a))+'</p><p class="c">'+esc(L(r.c))+'</p></div>'}).join('')+'</div>'}
 sec.innerHTML='<div class="lp-head"><span class="kicker">'+t.k+'</span><h2>'+t.h+'</h2><p class="lead">'+t.p+'</p></div>'
 +'<div class="c17-nums"><a class="a" href="tecc2.html#dash"><strong>'+n.a[0]+'</strong><span>'+t.n2[0]+'</span></a><a class="a" href="tecc2.html#dash"><strong>'+n.a[1]+'</strong><span>'+t.n2[1]+'</span></a><a class="c" href="tecc4.html#dash"><strong>'+n.c[0]+'</strong><span>'+t.n4[0]+'</span></a><a class="c" href="tecc4.html#usage"><strong>'+n.c[1]+'</strong><span>'+t.n4[1]+'</span></a></div>'
 +'<div class="c17-pills" role="tablist">'+pills+'</div><div class="c17-body" aria-live="polite">'+body+'</div>'
 +'<div class="c17-foot"><span>'+t.note+'</span><a class="a" href="tecc2.html">TECC 2.0 ↗</a><a class="c" href="tecc4.html">TECC 4.0 ↗</a></div>';
 var b=$('.c17-body',sec);b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop')}
function build(){if($('#cmp17'))return;var ch=$('#choose');if(!ch)return;var s=document.createElement('section');s.id='cmp17';s.className='wrap section c17';ch.parentNode.insertBefore(s,ch.nextSibling);render()}
document.addEventListener('click',function(e){var p=e.target.closest('#cmp17 .c17-p');if(p){sel=+p.dataset.i;render();return}if(e.target.closest('.lang-option'))setTimeout(render,300)});
build();
})();
