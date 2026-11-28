/* v15 TECC 4.0: sticky-scroll story + horizontal photo timeline. Safe to remove. */
(function(){'use strict';
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var en=function(){var b=$('.lang-option[aria-pressed="true"]');return b&&b.dataset.lang==='en'};
/* sticky story */
function story(){var st=$('.st');if(!st||st.dataset.v15)return;st.dataset.v15=1;
 var li=$$('.st-steps li',st),im=$$('.st-frame img',st);
 function on(i){li.forEach(function(x,k){x.classList.toggle('on',k===i)});im.forEach(function(x,k){x.classList.toggle('on',k===i)})}
 li.forEach(function(x,i){x.addEventListener('click',function(){on(i)});x.addEventListener('focus',function(){on(i)})});
 if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)on(+e.target.dataset.i)})},{rootMargin:'-42% 0px -42% 0px'});li.forEach(function(x){io.observe(x)})}}
/* horizontal timeline */
var busy=false;
function timeline(){var g=$('#t4gallery .actgal');if(!g||g.dataset.v15||busy)return;busy=true;g.dataset.v15=1;
 var cards=$$('.actcard',g),ph=cards.filter(function(c){return c.querySelector('.col')}),tx=cards.filter(function(c){return!c.querySelector('.col')});
 if(!ph.length){busy=false;return}
 var wrap=document.createElement('div');wrap.className='tl4';
 wrap.innerHTML='<div class="tl4-bar"><span class="tl4-t"></span><span class="tl4-btns"><button type="button" class="tl4-b" data-d="-1" aria-label="Previous">←</button><button type="button" class="tl4-b" data-d="1" aria-label="Next">→</button></span></div><div class="tl4-track" tabindex="0"></div>';
 var tr=$('.tl4-track',wrap);ph.forEach(function(c){tr.appendChild(c)});
 $('.tl4-t',wrap).textContent=en()?'Activities with photos · swipe or use arrows':'Aktiviti dengan foto · gesel atau guna anak panah';
 wrap.addEventListener('click',function(e){var b=e.target.closest('.tl4-b');if(!b)return;tr.scrollBy({left:(+b.dataset.d)*Math.min(tr.clientWidth*.85,640),behavior:'smooth'})});
 var rest=document.createElement('details');rest.className='tl4-more';rest.innerHTML='<summary>'+(en()?tx.length+' more activities · photos to come':tx.length+' aktiviti lain · foto menyusul')+'</summary><div class="actgal tl4-list"></div>';
 var ls=$('.tl4-list',rest);tx.forEach(function(c){ls.appendChild(c)});
 g.innerHTML='';g.classList.add('tl4-host');g.appendChild(wrap);if(tx.length)g.appendChild(rest);
 setTimeout(function(){busy=false},50)}
function run(){try{story();timeline()}catch(e){}}
var gl=$('#t4gallery');if(gl&&'MutationObserver' in window)new MutationObserver(function(){if(!busy)run()}).observe(gl,{childList:true,subtree:true});
document.addEventListener('click',function(e){if(e.target.closest('.lang-option'))setTimeout(run,250)});
run();addEventListener('load',run);
})();
