/* v18 landing dashboard toggle Semua / TECC 2.0 / TECC 4.0. Replaces .lp-stats visually; safe to remove. */
(function(){'use strict';
var D=window.TECC_DATA;if(!D||!D.tecc2||!D.tecc4)return;
var $=function(s,r){return(r||document).querySelector(s)};
var esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var lg=function(){var b=$('.lang-option[aria-pressed="true"]');return b&&b.dataset.lang==='en'?'en':'bm'};
var L=function(o){return typeof o==='string'?o:(o[lg()]||o.bm||'')};
var f1=function(n){return(Math.round(n*100)/100).toString()};
var CAP=D.tecc2.summary.capacity,t2=D.tecc2.summary,t4=D.tecc4;
var PAL=['#B8FF3C','#7EE2BC','#C9B6F7','#FF7F6B','#E6F7F0','#d6f08a'];
var T={bm:{k:'PAPAN PEMUKA RINGKAS',h:'Berapa banyak ruang ini digunakan?',p:'Tukar paparan untuk lihat gabungan, atau setiap ruang.',all:'Semua',hrs:'jam digunakan',fac:'faktor penggunaan',cap:'Kapasiti',tgt:'Sasaran 75%',f2:'TECC 2.0',f4:'TECC 4.0',comb:'faktor gabungan',pdp:'jam PdP berjadual',oth:'jam selain PdP',bk:'tempahan diluluskan',bkh:'jam tempahan',act:'jam aktiviti',found:'Asas 2025',a26:'Aktiviti 2026',bkl:'Tempahan diluluskan',note:'Faktor = jam digunakan / kapasiti 999 j (37 j × 27 minggu) bagi setiap ruang. Gabungan = jumlah dua ruang / 1,998 j. Butiran penuh di papan pemuka setiap ruang.',open:'Papan pemuka penuh'},
en:{k:'QUICK DASHBOARD',h:'How much are these spaces used?',p:'Switch the view to see the combined picture, or each space.',all:'All',hrs:'hours used',fac:'utility factor',cap:'Capacity',tgt:'75% target',f2:'TECC 2.0',f4:'TECC 4.0',comb:'combined factor',pdp:'scheduled teaching hours',oth:'non-teaching hours',bk:'approved bookings',bkh:'booking hours',act:'activity hours',found:'2025 foundation',a26:'2026 activities',bkl:'Approved bookings',note:'Factor = hours used / 999 h capacity (37 h × 27 weeks) for each space. Combined = both spaces / 1,998 h. Full detail in each space\'s dashboard.',open:'Full dashboard'}};
var H2=t2.total,H4=t4.dashboardHours,F2=t2.factor,F4=t4.dashboardFactor,sel='all',first=true;
function seg2(){return t2.rows.map(function(r,i){return{l:L(r.k).split(' (')[0].split(' · ')[0],h:r.h,c:PAL[i%PAL.length]}})}
function seg4(t){var bk=136.32,fo=80,ac=t4.activityHours-fo;return[{l:t.found,h:fo,c:'#C9B6F7'},{l:t.a26,h:ac,c:'#B8FF3C'},{l:t.bkl,h:bk,c:'#7EE2BC'}]}
function bar(name,hrs,fac,segs,href,cls){var t=T[lg()];
 return '<div class="d18-bar '+cls+'"><div class="d18-bh"><b>'+name+'</b><span>'+f1(hrs)+' / '+CAP+' j · '+fac+'%</span></div><div class="d18-track"><div class="d18-fill">'+segs.map(function(s){return '<i style="--w:'+(s.h/CAP*100).toFixed(2)+'%;background:'+s.c+'" title="'+esc(s.l)+' '+f1(s.h)+' j"></i>'}).join('')+'</div><span class="d18-tgt" style="left:75%"></span></div>'
 +'<ul class="d18-leg">'+segs.map(function(s){return '<li><i style="background:'+s.c+'"></i>'+esc(s.l)+' <b>'+f1(s.h)+'</b></li>'}).join('')+'</ul></div>'}
function cards(){var t=T[lg()],all=H2+H4,fa=Math.round(all/(CAP*2)*1000)/10;
 if(sel==='all')return[[f1(all),t.hrs,'a'],[fa+'%',t.comb,'b'],[F2+'%','TECC 2.0','a2'],[F4+'%','TECC 4.0','c']];
 if(sel==='t2')return[[f1(H2),t.hrs,'a'],[F2+'%',t.fac,'b'],[f1(t2.rows[0].h),t.pdp,'a2'],[f1(H2-t2.rows[0].h),t.oth,'c']];
 return[[f1(H4),t.hrs,'c'],[F4+'%',t.fac,'b'],[String(t4.summary.approved),t.bk+' ('+f1(136.32)+' j)','a2'],[f1(t4.activityHours),t.act,'a']]}
function render(){var s=$('#d18');if(!s)return;var t=T[lg()];
 var tabs=[['all',t.all],['t2','TECC 2.0'],['t4','TECC 4.0']].map(function(x){return '<button type="button" role="tab" class="d18-t'+(sel===x[0]?' on':'')+' '+x[0]+'" data-s="'+x[0]+'" aria-selected="'+(sel===x[0])+'">'+x[1]+'</button>'}).join('');
 var bars=(sel!=='t4'?bar('TECC 2.0',H2,F2,seg2(),'tecc2.html#dash','b2'):'')+(sel!=='t2'?bar('TECC 4.0',H4,F4,seg4(t),'tecc4.html#dash','b4'):'');
 s.innerHTML='<div class="lp-head"><span class="kicker">'+t.k+'</span><h2>'+t.h+'</h2><p class="lead">'+t.p+'</p></div><div class="d18-tabs" role="tablist">'+tabs+'</div>'
 +'<div class="d18-cards">'+cards().map(function(c,i){return '<div class="d18-c '+c[2]+'" style="--i:'+i+'"><strong data-v="'+esc(c[0])+'">'+esc(c[0])+'</strong><span>'+esc(c[1])+'</span></div>'}).join('')+'</div>'
 +'<div class="d18-bars">'+bars+'<div class="d18-scale"><span>0</span><span class="m">'+t.tgt+'</span><span>'+t.cap+' '+CAP+' j</span></div></div>'
 +'<div class="d18-foot"><span>'+t.note+'</span>'+(sel!=='t4'?'<a class="a" href="tecc2.html#dash">TECC 2.0 · '+t.open+' ↗</a>':'')+(sel!=='t2'?'<a class="c" href="tecc4.html#dash">TECC 4.0 · '+t.open+' ↗</a>':'')+'</div>';
 var fills=s.querySelectorAll('.d18-fill i');fills.forEach(function(i){i.style.width='0'});
 requestAnimationFrame(function(){requestAnimationFrame(function(){fills.forEach(function(i){i.style.width=i.style.getPropertyValue('--w')})})});
 s.querySelectorAll('.d18-c strong').forEach(function(e){var raw=e.dataset.v,m=raw.match(/^([\d.]+)(%?)$/);if(!m||matchMedia('(prefers-reduced-motion: reduce)').matches)return;var to=parseFloat(m[1]),dec=(m[1].split('.')[1]||'').length,t0=performance.now();(function st(n){var p=Math.min(1,(n-t0)/700),v=to*(1-Math.pow(1-p,3));e.textContent=v.toFixed(dec)+m[2];if(p<1)requestAnimationFrame(st)})(t0)})}
function build(){if($('#d18'))return;var st=$('.lp-stats');if(!st)return;st.style.display='none';var s=document.createElement('section');s.id='d18';s.className='wrap section d18';st.parentNode.insertBefore(s,st.nextSibling);render()}
document.addEventListener('click',function(e){var b=e.target.closest('#d18 .d18-t');if(b){sel=b.dataset.s;render();return}if(e.target.closest('.lang-option'))setTimeout(render,300)});
build();
})();
