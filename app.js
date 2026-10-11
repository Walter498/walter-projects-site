(()=>{
'use strict';
const data=window.PROJECTS||{};
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const dialog=$('#project-dialog'), dialogContent=$('#dialog-content'), toast=$('.toast');
let lastTrigger=null,toastTimer;
const icon=k=>`<svg><use href="#${k}"></use></svg>`;
function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2600)}
function openDetails(key,trigger){
 const p=data[key]; if(!p||!dialog)return; lastTrigger=trigger||null;
 dialogContent.innerHTML=`<div class="dialog-hero"><span class="app-icon ${p.color}">${icon(p.icon)}</span><div><h2 id="dialog-title">${p.name}</h2><p>${p.subtitle}</p></div></div><p class="dialog-copy">${p.description}</p><ul class="dialog-list">${p.features.map(x=>`<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul><div class="dialog-foot"><span>${p.platform}</span><a class="button primary" href="${p.releaseUrl||`https://github.com/Walter498/${p.repo}`}" target="_blank" rel="noopener noreferrer">${p.releaseLabel||'打开 GitHub'} ${icon('external')}</a></div><p class="dialog-compatibility">${p.compatibility}</p><div class="dialog-note">${p.note}</div><div class="demo-box" data-demo="${key}"><div class="demo-heading"><strong>${p.demoLabel}</strong><span>网页演示</span></div><p>${p.demoHint}</p>${demoMarkup(key)}</div>`;
 dialog.showModal(); bindDemo(key); 
}
function demoMarkup(key){
 if(key==='duo')return `<div class="demo-duo"><div class="demo-status"><span id="demo-clock">09:41</span><div class="status-right duo-stack demo-status-icons"><div class="ring-battery"><small>86</small></div><span class="network demo-net">5G</span><div class="signal-dots"><i></i><i></i><i></i><i></i></div></div></div><label for="scale-range">状态栏缩放 <output id="scale-output">100%</output></label><input id="scale-range" type="range" min="70" max="135" value="100"><div class="demo-options"><button type="button" class="demo-option selected" data-net="5G">5G</button><button type="button" class="demo-option" data-net="Wi-Fi">Wi-Fi</button></div></div>`;
 if(key==='filter')return `<div class="demo-filter"><div class="demo-filter-top"><strong>示例图库</strong><span id="filter-result">24 项内容</span></div><div class="demo-photos">${Array.from({length:24},(_,i)=>`<i class="photo-${i%4}" data-unfiled="${i<7}"></i>`).join('')}</div><button type="button" class="filter-toggle" aria-pressed="false"><span class="toggle-check">✓</span><span>只看不在相簿中的内容</span><b id="filter-count">24 项</b></button></div>`;
 if(key==='video')return `<div class="demo-player"><div class="demo-player-screen"><span class="demo-play">▶</span></div><div class="demo-player-controls"><span id="demo-time">00:00</span><input id="video-range" type="range" min="0" max="90" value="0" aria-label="演示视频进度"><span>01:30</span></div><div class="demo-player-bottom"><div class="demo-speeds">${[1,2,3].map(x=>`<button type="button" data-speed="${x}" class="${x===1?'selected':''}">${x}×</button>`).join('')}</div><button id="demo-play" class="play-action" type="button">播放演示</button></div></div>`;
 return `<div class="demo-reader"><div class="reader-demo-bar"><button type="button" class="reader-theme active" data-theme="paper">纸张</button><button type="button" class="reader-theme" data-theme="night">夜间</button><button type="button" id="page-next">下一页 →</button></div><div class="reader-page" id="reader-page"><small>CHAPTER 01 · PAGE 0<span id="page-num">1</span></small><strong id="reader-line">把阅读留给<br>你喜欢的节奏。</strong><span>演示书页 · Venera-Max</span></div></div>`;
}
function bindDemo(key){
 if(key==='duo'){
  const range=$('#scale-range'),out=$('#scale-output'),clock=$('.demo-status-icons'),net=$('.demo-net');
  range?.addEventListener('input',()=>{out.textContent=`${range.value}%`;clock.style.transform=`scale(${range.value/100})`;});
  $$('.demo-option').forEach(btn=>btn.addEventListener('click',()=>{$$('.demo-option').forEach(x=>x.classList.remove('selected'));btn.classList.add('selected');net.textContent=btn.dataset.net;showToast(`已切换为 ${btn.dataset.net} 示例`)}));
 }
 if(key==='filter'){
  const btn=$('.filter-toggle'),count=$('#filter-count'),result=$('#filter-result');
  btn?.addEventListener('click',()=>{const active=btn.getAttribute('aria-pressed')==='true';btn.setAttribute('aria-pressed',String(!active));btn.classList.toggle('selected',!active);count.textContent=active?'24 项':'7 项';result.textContent=active?'24 项内容':'7 项内容';$$('.demo-photos i').forEach(photo=>photo.hidden=!active&&photo.dataset.unfiled!=='true');showToast(active?'已显示全部示例内容':'已筛选出 7 项未归类内容')});
 }
 if(key==='video'){
  const range=$('#video-range'),time=$('#demo-time'),play=$('#demo-play');let timer=null,seconds=0,speed=1,previous=0;
  const update=()=>{range.value=Math.floor(seconds);time.textContent=`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(Math.floor(seconds%60)).padStart(2,'0')}`;range.setAttribute('aria-valuetext',`${Math.floor(seconds)} 秒，共 90 秒`)};
  function pause(){clearInterval(timer);timer=null;play.textContent=seconds>=90?'重新播放':'播放演示';$('.demo-play').textContent='▶'}
  range.addEventListener('input',()=>{seconds=Number(range.value);previous=performance.now();update()});
  $$('.demo-speeds button').forEach(btn=>{btn.setAttribute('aria-pressed',String(btn.classList.contains('selected')));btn.addEventListener('click',()=>{$$('.demo-speeds button').forEach(x=>{x.classList.toggle('selected',x===btn);x.setAttribute('aria-pressed',String(x===btn))});speed=Number(btn.dataset.speed);showToast(`演示倍速已切换为 ${speed}×`)})});
  play.addEventListener('click',()=>{if(timer){pause();return}if(seconds>=90)seconds=0;previous=performance.now();play.textContent='暂停演示';$('.demo-play').textContent='Ⅱ';timer=setInterval(()=>{const now=performance.now();seconds=Math.min(90,seconds+(now-previous)/1000*speed);previous=now;update();if(seconds>=90)pause()},100)});
  const hide=()=>{if(document.hidden)pause()};document.addEventListener('visibilitychange',hide);
  dialog.addEventListener('close',()=>{pause();document.removeEventListener('visibilitychange',hide)},{once:true});update();
 }
 if(key==='venera'){
  $$('.reader-theme').forEach(btn=>btn.addEventListener('click',()=>{$$('.reader-theme').forEach(x=>x.classList.remove('active'));btn.classList.add('active');$('#reader-page').classList.toggle('night',btn.dataset.theme==='night');showToast(btn.dataset.theme==='night'?'已切换夜间阅读':'已切换纸张阅读')}));
  let page=1;$('#page-next')?.addEventListener('click',()=>{page=page===3?1:page+1;$('#page-num').textContent=page;$('#reader-line').innerHTML=page===1?'把阅读留给<br>你喜欢的节奏。':page===2?'翻到下一页，<br>故事还在继续。':'这一刻，<br>只读眼前一页。'});
 }
}
function setup(){
 if(dialog){new MutationObserver(()=>{$$('.demo-option,.reader-theme').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.classList.contains('selected')||btn.classList.contains('active'))))}).observe(dialogContent,{subtree:true,childList:true,attributes:true,attributeFilter:['class']})}
 $$('.card-actions button').forEach(b=>b.addEventListener('click',()=>openDetails(b.dataset.detail,b)));
 $('.close-dialog')?.addEventListener('click',()=>dialog.close());
 dialog?.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()});
 dialog?.addEventListener('close',()=>{lastTrigger?.focus();lastTrigger=null});
 $$('.filters button').forEach(btn=>btn.addEventListener('click',()=>{const f=btn.dataset.filter;$$('.filters button').forEach(x=>{x.classList.toggle('active',x===btn);x.setAttribute('aria-pressed',String(x===btn))});let shown=0;$$('.project-card').forEach(card=>{const visible=f==='all'||card.dataset.category===f;card.hidden=!visible;if(visible)shown++});$('.project-count').textContent=`${shown} 个项目`;$('.project-grid').classList.toggle('filtered',f!=='all')}));
 const theme=$('.theme-btn');
 function updateThemeButton(){const dark=document.documentElement.dataset.theme==='dark';theme?.setAttribute('aria-label',dark?'切换到浅色模式':'切换到深色模式');theme&&(theme.innerHTML=icon(dark?'sun':'moon'))}
 theme?.addEventListener('click',()=>{const dark=document.documentElement.dataset.theme==='dark';document.documentElement.dataset.theme=dark?'':'dark';try{localStorage.setItem('walter-theme',dark?'light':'dark')}catch(e){}updateThemeButton();showToast(dark?'已切换浅色模式':'已切换深色模式')});updateThemeButton();
 $$('.faq details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)$$('.faq details').filter(x=>x!==d).forEach(x=>x.open=false)}));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();
