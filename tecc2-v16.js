/* v16b TECC 2.0: cinematic zone plan (camera zoom + spotlight + autoplay) and animated facility tiles. Safe to remove. */
(function(){'use strict';
var D=window.TECC_DATA;if(!D||!D.concept)return;var C=D.concept;
var $=function(s,r){return(r||document).querySelector(s)};
var esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var lg=function(){var b=$('.lang-option[aria-pressed="true"]');return b&&b.dataset.lang==='en'?'en':'ms'};
var L=function(o){var g=lg();return o==null?'':(typeof o==='string'?o:(o[g]||o.bm||''))};
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var T={ms:{k:'FASILITI & ZON',h:'Masuk ke dalam TECC 2.0.',p:'Pilih zon dan kamera akan zum ke kawasan itu pada pelan sebenar.',all:'Semua zon',feat:'Ciri pintar',see:'Lihat di pelan',tools:'Platform digital',src:'Kandungan zon dan ciri daripada laporan TECC 2025 dan pelan bilik TECC 2.0. Bukan statistik 2026.',auto:'Main sendiri',pause:'Jeda'},
en:{k:'FACILITIES & ZONES',h:'Step inside TECC 2.0.',p:'Pick a zone and the camera zooms into that area on the real plan.',all:'All zones',feat:'Smart features',see:'Show on plan',tools:'Digital platforms',src:'Zone and feature content from the TECC 2025 report and the TECC 2.0 room plan. Not 2026 statistics.',auto:'Autoplay',pause:'Pause'}};
var M=[[[222,365],[580,715]],[[435,533],[795,533]],[[537,233],[948,533],[310,712]],[[222,588]]];
var COL=['#7EE2BC','#B8FF3C','#FF7F6B','#C9B6F7'];
var W=1400,H=847;
function cam(i){if(i<0)return{s:1,tx:0,ty:0};var ps=M[i],xs=ps.map(function(p){return p[0]}),ys=ps.map(function(p){return p[1]});
 var x0=Math.min.apply(0,xs),x1=Math.max.apply(0,xs),y0=Math.min.apply(0,ys),y1=Math.max.apply(0,ys);
 var bw=Math.max(x1-x0,260)+300,bh=Math.max(y1-y0,200)+260,s=Math.min(W/bw,H/bh,2.3);s=Math.max(s,1.25);
 var cx=(x0+x1)/2/W*100,cy=(y0+y1)/2/H*100;return{s:s,tx:Math.min(0,Math.max(100-100*s,50-s*cx)),ty:Math.min(0,Math.max(100-100*s,50-s*cy))}}
var ICON={
f0:'<svg viewBox="0 0 64 48" class="zi zi-tv"><rect x="3" y="3" width="58" height="34" rx="5"/><rect class="b b1" x="10" y="26" width="6" height="6"/><rect class="b b2" x="20" y="20" width="6" height="12"/><rect class="b b3" x="30" y="14" width="6" height="18"/><rect class="b b4" x="40" y="22" width="6" height="10"/><path d="M22 44h20"/></svg>',
f1:'<svg viewBox="0 0 64 48" class="zi zi-wifi"><circle cx="32" cy="38" r="3.5" class="dot"/><path class="a a1" d="M24 31a11 11 0 0 1 16 0"/><path class="a a2" d="M17 24a21 21 0 0 1 30 0"/><path class="a a3" d="M10 17a31 31 0 0 1 44 0"/></svg>',
f2:'<svg viewBox="0 0 64 48" class="zi zi-net"><path d="M4 44h56"/><rect class="s s1" x="8" y="30" width="7" height="14" rx="2"/><rect class="s s2" x="20" y="22" width="7" height="22" rx="2"/><rect class="s s3" x="32" y="13" width="7" height="31" rx="2"/><rect class="s s4" x="44" y="4" width="7" height="40" rx="2"/></svg>',
f3:'<svg viewBox="0 0 64 48" class="zi zi-ict"><circle cx="32" cy="24" r="6" class="core"/><ellipse cx="32" cy="24" rx="26" ry="11" class="ring"/><circle class="orb o1" cx="6" cy="24" r="3"/><circle class="orb o2" cx="58" cy="24" r="3"/></svg>'};
var sel=-1,planImg=null,fig=null,timer=null,auto=true,inView=false;
function pins(){return M.map(function(ms,z){return ms.map(function(m){return '<i class="zp" data-z="'+z+'" style="left:'+(m[0]/14).toFixed(2)+'%;top:'+(m[1]/8.47).toFixed(2)+'%;--c:'+COL[z]+'"></i>'}).join('')}).join('')}
function build(){var host=$('#zones .zonewrap');if(!host)return;
 var old=$('#zv16');if(old){var oi=old.querySelector('.zv-pinbox img');if(oi)planImg=oi;old.remove()}
 ['.featgrid','.chips.static'].forEach(function(q){var e=$('#zones '+q);if(e){e.style.display='none';var h=e.previousElementSibling;if(h&&h.classList.contains('sub'))h.style.display='none'}});
 var t=T[lg()];if(!fig)fig=$('#t2plan .planfig');
 var box=document.createElement('section');box.id='zv16';box.className='zv16';
 box.innerHTML='<div class="zv-head"><span class="zv-k">'+t.k+'</span><div class="zv-h">'+t.h+'</div><p>'+t.p+'</p></div>'
 +'<div class="zv-stage"><div class="zv-view"><div class="zv-cam"><div class="zv-pinbox"></div></div><div class="zv-spot"></div><div class="zv-lab"></div></div>'
 +'<div class="zv-side"><div class="zv-tabs" role="tablist"><button type="button" role="tab" class="zv-tab all" data-z="-1" style="--c:#E3F6EE"><b>◎</b><span>'+t.all+'</span></button>'+C.zones.map(function(q,i){return '<button type="button" role="tab" class="zv-tab" data-z="'+i+'" style="--c:'+COL[i]+'"><b>'+(i+1)+'</b><span>'+esc(L(q.name))+'</span></button>'}).join('')+'</div>'
 +'<div class="zv-det" aria-live="polite"></div><div class="zv-ctl"><button type="button" class="zv-play" aria-pressed="true"></button><span class="zv-prog"><i></i></span></div></div></div>'
 +'<div class="zv-feat"><h3>'+t.feat+'</h3><div class="zv-fg">'+C.features.map(function(f,i){return '<article class="zv-f f'+i+'"><div class="zv-ico">'+ICON['f'+i]+'</div><h4>'+esc(L(f.name))+'</h4><p>'+esc(L(f.desc))+'</p>'+(i===0?'<button type="button" class="zv-see" data-z="2">'+t.see+' ↗</button>':'')+'</article>'}).join('')+'</div></div>'
 +'<div class="zv-tools"><span>'+t.tools+'</span><div class="zv-mq"><div>'+(function(){var a=C.digital.map(function(d){return '<i>'+esc(L(d))+'</i>'}).join('');return a+a})()+'</div></div></div>'
 +'<p class="zv-src">'+t.src+'</p>';
 host.parentNode.insertBefore(box,host);
 var pb=$('.zv-pinbox',box);
 var im=planImg||(fig&&fig.querySelector('img'));
 if(im){planImg=im;pb.appendChild(im);pb.insertAdjacentHTML('beforeend',pins())}
 apply(box,false);bindHover(box)}
function apply(box,anim){box=box||$('#zv16');if(!box)return;var t=T[lg()],c=cam(sel),cm=$('.zv-cam',box);
 cm.style.transform='translate('+c.tx.toFixed(2)+'%,'+c.ty.toFixed(2)+'%) scale('+c.s.toFixed(3)+')';
 box.classList.toggle('zoomed',sel>=0);
 var sp=$('.zv-spot',box);sp.style.setProperty('--o',sel>=0?1:0);
 box.querySelectorAll('.zv-tab').forEach(function(b){var on=+b.dataset.z===sel;b.classList.toggle('on',on);b.setAttribute('aria-selected',on)});
 box.querySelectorAll('.zp').forEach(function(p){p.classList.toggle('on',+p.dataset.z===sel);p.classList.toggle('dim',sel>=0&&+p.dataset.z!==sel)});
 var d=$('.zv-det',box),lab=$('.zv-lab',box);
 if(sel<0){d.style.setProperty('--c','#BFEBD9');d.innerHTML='<span class="zv-num">·</span><h3>'+esc(t.all)+'</h3><p>'+esc(L(C.zones.map(function(z){return L(z.name)}).join(' · ')))+'</p>';lab.textContent=''}
 else{var z=C.zones[sel];d.style.setProperty('--c',COL[sel]);d.innerHTML='<span class="zv-num">0'+(sel+1)+'</span><span class="zv-zi">'+z.icon+'</span><h3>'+esc(L(z.name))+'</h3><p>'+esc(L(z.desc))+'</p>';lab.textContent=L(z.name)}
 d.classList.remove('pop');void d.offsetWidth;d.classList.add('pop');
 var pr=$('.zv-prog i',box);if(pr){pr.style.animation='none';void pr.offsetWidth;if(auto&&!reduce)pr.style.animation='zvprog 5s linear forwards'}
 var pl=$('.zv-play',box);if(pl){pl.textContent=(auto?'❚❚ ':'▶ ')+(auto?t.pause:t.auto);pl.setAttribute('aria-pressed',auto)}}
function go(i){sel=i;apply()}
function tick(){clearTimeout(timer);if(!auto||!inView||reduce)return;timer=setTimeout(function(){sel=sel>=3?-1:sel+1;apply();tick()},5000)}
function bindHover(box){var io='IntersectionObserver' in window?new IntersectionObserver(function(es){inView=es[0].isIntersecting;tick()},{threshold:.35}):null;if(io)io.observe(box);else{inView=true;tick()}}
document.addEventListener('click',function(e){var b=e.target.closest('#zv16 [data-z]');if(b){auto=false;clearTimeout(timer);go(+b.dataset.z);if(b.classList.contains('zv-see')){var m=$('#zv16 .zv-view');if(m)m.scrollIntoView({behavior:'smooth',block:'center'})}return}
 var p=e.target.closest('#zv16 .zv-play');if(p){auto=!auto;apply();tick()}});
function run(){if(!$('#zv16')&&$('#zones .zonewrap'))build()}
var z=$('#zones');if(z&&'MutationObserver' in window)new MutationObserver(function(){run()}).observe(z,{childList:true});
document.addEventListener('click',function(e){if(e.target.closest('.lang-option'))setTimeout(function(){var o=$('#zv16');if(o)o.remove();run()},300)});
run();addEventListener('load',run);
})();
