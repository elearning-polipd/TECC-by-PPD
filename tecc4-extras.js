/* TECC 4.0 extras: slot pengemasan Jumaat dan galeri aktiviti. Bahasa Melayu baku / English. */
(function(){
const D=window.TECC_DATA;if(!D)return;
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const MON={bm:['Jan','Feb','Mac','Apr','Mei','Jun','Jul','Ogo','Sep','Okt','Nov','Dis'],en:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']};
const F=id=>'https://drive.google.com/drive/folders/'+id;
const G={
 c9:{f:'1QTxyzNGgwvJM74LGEwzKmr8ZL1Q4K6jo',p:[]},
 c21:{f:'1aj21Wq7b_jgJ36uJLu2lGbNrkHWZTULK',p:['assets/activity/c21-kick-off.webp']},
 c22:{f:'1ctf9y98nIAuuvEnfub5b5f1o0sD3fRWf',p:['assets/activity/c22-pemasangan-led.webp','assets/activity/c22-bilik-sebelum.webp']},
 c23:{f:'1ctf9y98nIAuuvEnfub5b5f1o0sD3fRWf',p:[]},
 c1:{f:'1nDHPr08BH3rVpIVMiDM4KUe2TqvVsytH',p:['assets/lampiran/kursus-tecc-smart-teaching-21jan2026-video.webp','assets/lampiran/taklimat-tecc20-21jan2026-a.webp']},
 c2:{f:'1zviainl_cGrxSRnzTkCeNv46zrY4BONK',p:['assets/gallery/tecc4-bengkel-green-screen-rakaman.webp']},
 c3:{f:'1Y_YqmYzOkQrqq_IW8r60KsdddpaGKXwq',p:[]},
 c4:{f:'1WXOkVULeqynMI0Kv1zwbgirXdvUbrV88',p:[]},
 c5:{f:'',p:['assets/gallery/tecc4-bengkel-rmi-future-penyampaian.webp','assets/gallery/tecc4-bengkel-rmi-future-sijil.webp']},
 c6:{f:'1HFR5JTh7Y1BCTcRqi6AHjt81sw6luqcO',p:['assets/activity/c6-bengkel-prep-akri.webp']},
 c7:{f:'',p:[]},
 c8:{f:'1EenEN4ae0UcLUxo9QeLG3Ns5JSnWdohJ',p:[]},
 c10:{f:'18V-4MLoeEtE0atj1WCVJ9Pcij99RPaKi',p:[]},
 c11:{f:'1tWkxby44r7wnofTUfqcc44nAStFkC-yU',p:['assets/archi/archi-space-lab-overview.webp','assets/archi/vr-session-multi-station.webp','assets/archi/vr-session-lecturer-guidance.webp']},
 c12:{f:'1PGjrbkz7N2Vev9-hZxHPpta7VaL1gP9h',p:['assets/activity/c12-raya-jpa.webp']},
 c14:{f:'1yaFTJUcYp8qzN9IqkPyx8h8yCoCaaZHm',p:[]},
 c15:{f:'1I6rknumyIm3oU1yRN6qJ1gKF7PR1jcVs',p:[]},
 c16:{f:'1lIS-mfxaPiRTJQrPJn6AOiT5Ze1KsT6G',p:[]},
 c17:{f:'1RdejKF-hm4USfKRjhR-HSdKa9SUpHpwy',p:['assets/activity/c17-konvo.webp']},
 c18:{f:'1z7Jvf8CV-DDsrEKKj0xN4HwykU-Kdeb1',p:[]},
 c19:{f:'1z7Jvf8CV-DDsrEKKj0xN4HwykU-Kdeb1',p:[]}
};
function draw(l){
 const en=l==='en',L=o=>o?(en?o.en:o.bm):'';
 const T=(bm,e)=>en?e:bm;
 /* --- Jadual mingguan + Jumaat --- */
 const w=$('#t4week');
 if(w){
  const fr=D.tecc4.fridays||[],cnt=fr.filter(x=>x.s==='counted').length,hol=fr.filter(x=>x.s==='holiday'),up=fr.filter(x=>x.s==='upcoming').length;
  const days=en?['Mon','Tue','Wed','Thu','Fri']:['Isnin','Selasa','Rabu','Khamis','Jumaat'];
  const hrs=['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'];
  let g='<div class="wk4"><span class="h"></span>'+days.map(d=>'<span class="h">'+d+'</span>').join('');
  hrs.forEach(h=>{g+='<span class="h">'+h+'</span>';for(let d=0;d<5;d++){const c=d===4&&(h==='15:00'||h==='16:00');g+='<span class="'+(c?'clean':'use')+'">'+(c?T('Pengemasan','Cleaning'):T('Ikut tempahan','By booking'))+'</span>'}});
  g+='</div>';
  const cells=fr.map(x=>{const dt=new Date(x.d+'T00:00:00');const lab=dt.getDate()+' '+MON[en?'en':'bm'][dt.getMonth()];
   return '<div class="fri '+x.s+'"><b>'+lab+'</b>'+(x.s==='counted'?'2 '+T('j','h'):x.s==='holiday'?esc(L(x.n))+'<br>'+T('tidak dikira','not counted'):T('akan datang','upcoming'))+'</div>'}).join('');
  w.innerHTML='<div class="wrap"><div class="section-num">'+T('JADUAL PENGGUNAAN MINGGUAN','WEEKLY USE TIMETABLE')+'</div><h2>'+T('Slot pengemasan Jumaat TECC 4.0','TECC 4.0 Friday cleaning slot')+'</h2><p class="lead">'+T('Pengemasan dan pembersihan bilik dijadualkan setiap Jumaat, 3.00–5.00 petang. Jumaat yang jatuh pada cuti umum tidak dikira dalam jam penggunaan.','Room cleaning and tidying is scheduled every Friday, 3.00–5.00 pm. Fridays that fall on a public holiday are not counted in usage hours.')+'</p><div class="tablewrap">'+g+'</div><div class="factgrid fri-wrap"><div class="fact"><small>'+T('Jumaat dikira','Fridays counted')+'</small><strong>'+cnt+' × 2 '+T('jam','h')+' = '+(cnt*2)+' '+T('jam','h')+'</strong></div><div class="fact"><small>'+T('Cuti umum pada hari Jumaat','Public holidays on Fridays')+'</small><strong>'+hol.map(x=>(new Date(x.d+'T00:00:00')).getDate()+' '+MON[en?'en':'bm'][(new Date(x.d+'T00:00:00')).getMonth()]+' ('+L(x.n)+')').join(', ')+'</strong></div><div class="fact"><small>'+T('Jumaat akan datang','Upcoming Fridays')+'</small><strong>'+up+'</strong></div></div><div class="fri-grid">'+cells+'</div><p class="small muted">'+T('Anggaran 2 jam setiap Jumaat mengikut amalan TECC 2.0. Sahkan masa sebenar pengemasan.','Estimated at 2 hours per Friday, following TECC 2.0 practice. Confirm the actual cleaning time.')+'</p></div>';
 }
 /* --- Galeri aktiviti --- */
 const gl=$('#t4gallery');
 if(gl){
  const acts=D.activities.filter(a=>a.room==='tecc4'&&G[a.id]).sort((a,b)=>a.sort<b.sort?-1:1);
  const slot=(a,i,src)=>{if(!src)return '<div class="ph '+(i===0?'main':'')+'">'+T('Foto','Photo')+' '+(i+1)+'</div>';const s=src;return '<img class="'+(i===0?'main':'')+'" src="'+s+'" alt="'+esc(L(a.title))+'" loading="lazy" decoding="async" onerror="this.outerHTML=\'<div class=\\\'ph '+(i===0?'main':'')+'\\\'>'+T('Foto','Photo')+' '+(i+1)+'</div>\'"/>'};
  gl.innerHTML='<div class="wrap"><div class="section-num">'+T('GALERI AKTIVITI','ACTIVITY GALLERY')+'</div><h2>'+T('Foto dan kolaj mengikut aktiviti','Photos and collage by activity')+'</h2><p class="lead">'+T('Setiap aktiviti dipautkan kepada folder Google Drive e-Pembelajaran. Ruang kosong ialah tempat foto tambahan.','Each activity links to its e-Learning Google Drive folder. Empty frames are placeholders for more photos.')+'</p><div class="actgal">'+acts.map(a=>{const g=G[a.id];const ps=[0,1,2].map(i=>slot(a,i,g.p[i])).join('');return '<article class="actcard"><div class="col">'+ps+'</div><div class="meta"><b>'+esc(L(a.title))+'</b><small>'+esc(L(a.date))+(a.h!=null?' · '+a.h+' '+T('jam','h'):'')+'</small>'+(g.f?'<a href="'+F(g.f)+'" target="_blank" rel="noopener">'+T('Buka folder Drive ↗','Open Drive folder ↗')+'</a>':'<small>—</small>')+'</div></article>'}).join('')+'</div></div>';
 }
}
const orig=window.TECC_RENDER;
window.TECC_RENDER=function(l){if(orig)orig(l);draw(l==='en'?'en':'ms')};
})();
