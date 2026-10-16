const header=document.querySelector('#header'),menu=document.querySelector('.menu-button');
menu?.addEventListener('click',()=>{const open=header.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Menüyü kapat':'Menüyü aç')});
document.querySelectorAll('nav a').forEach(link=>link.addEventListener('click',()=>{header.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));
document.querySelectorAll('.nav-group>button').forEach(button=>button.addEventListener('click',event=>{event.stopPropagation();const group=button.closest('.nav-group');const opening=!group.classList.contains('open');document.querySelectorAll('.nav-group.open').forEach(item=>{item.classList.remove('open');item.querySelector('button')?.setAttribute('aria-expanded','false')});group.classList.toggle('open',opening);button.setAttribute('aria-expanded',String(opening))}));
document.addEventListener('click',()=>document.querySelectorAll('.nav-group.open').forEach(item=>{item.classList.remove('open');item.querySelector('button')?.setAttribute('aria-expanded','false')}));
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>24),{passive:true});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
const canvas=document.querySelector('#hero-canvas'),ctx=canvas?.getContext('2d',{alpha:true});let width,height,dpr,nodes=[],pointerX=.5,pointerY=.5,time=0;const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;const mobileLayout=matchMedia('(max-width: 900px)');
function resizeCanvas(){if(!canvas||!ctx)return;dpr=Math.min(devicePixelRatio,1.25);width=canvas.clientWidth;height=canvas.clientHeight;canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);const count=innerWidth<760?42:64;nodes=Array.from({length:count},(_,index)=>{const longitude=(index/count)*Math.PI*8.5;const latitude=Math.acos(1-2*((index+.5)/count));return{longitude,latitude,layer:index%4,x:0,y:0,z:0,scale:1}})}
function projectNode(node,centerX,centerY){const spin=time*.0022+node.layer*.17;const radius=Math.min(width,height)*(.23+node.layer*.035);const sx=Math.sin(node.latitude)*Math.cos(node.longitude+spin),sy=Math.cos(node.latitude),sz=Math.sin(node.latitude)*Math.sin(node.longitude+spin);const tilt=.28+(pointerY-.5)*.35;const ty=sy*Math.cos(tilt)-sz*Math.sin(tilt),tz=sy*Math.sin(tilt)+sz*Math.cos(tilt);const perspective=1/(1.42-tz*.36);node.x=centerX+(sx+(pointerX-.5)*.18)*radius*perspective*1.58;node.y=centerY+ty*radius*perspective*.83;node.z=tz;node.scale=perspective}
function drawNetwork(){if(!ctx)return;ctx.clearRect(0,0,width,height);time+=reducedMotion?0:.7;const centerX=width*.5,centerY=height*.5;nodes.forEach(node=>projectNode(node,centerX,centerY));ctx.globalCompositeOperation='lighter';for(let index=0;index<nodes.length;index+=1){const node=nodes[index];for(let offset=1;offset<=7;offset+=1){const other=nodes[(index+offset)%nodes.length],distance=Math.hypot(node.x-other.x,node.y-other.y);if(distance<118&&Math.abs(node.z-other.z)<.58){const alpha=(1-distance/118)*(.08+Math.max(0,(node.z+other.z)*.05));ctx.strokeStyle=`rgba(${index%11===0?'255,123,65':'79,151,255'},${alpha})`;ctx.lineWidth=.45;ctx.beginPath();ctx.moveTo(node.x,node.y);ctx.lineTo(other.x,other.y);ctx.stroke()}}const front=Math.max(.12,(node.z+1)*.34);ctx.fillStyle=`rgba(${index%13===0?'255,133,73':index%9===0?'255,255,255':'74,145,255'},${front})`;ctx.beginPath();ctx.arc(node.x,node.y,(index%13===0?2.5:1)*node.scale,0,Math.PI*2);ctx.fill()}for(let ring=0;ring<2;ring+=1){const pulse=(time*.8+ring*98)%230;ctx.strokeStyle=`rgba(${ring===1?'255,116,56':'89,158,255'},${Math.max(0,.13-pulse/2100)})`;ctx.lineWidth=.6;ctx.beginPath();ctx.ellipse(centerX,centerY,Math.min(width,height)*(.18+ring*.1)+pulse*.18,Math.min(width,height)*(.055+ring*.03)+pulse*.06,-.18,0,Math.PI*2);ctx.stroke()}if(!mobileLayout.matches)requestAnimationFrame(drawNetwork)}
addEventListener('resize',resizeCanvas);addEventListener('pointermove',event=>{if(innerWidth>700){pointerX=.68+(event.clientX/innerWidth-.5)*.035;pointerY=.5+(event.clientY/innerHeight-.5)*.035}},{passive:true});resizeCanvas();drawNetwork();

const machine=document.querySelector('.hero-aurora');
const heroStage=document.querySelector('.hero-stage');
const heroElement=document.querySelector('.hero');
const heroSteps=[...document.querySelectorAll('.hero-process span')];
const story=document.querySelector('.system-story');
const storySticky=document.querySelector('.story-sticky');
const flowNodes=[...document.querySelectorAll('.flow-node')];
const parallaxItems=[
  [document.querySelector('.flap-visual'),.07],
  [document.querySelector('.labs-map'),-.025],
  [document.querySelector('.cta-lines'),.04]
];

if(!reducedMotion){
  document.querySelector('.hero')?.addEventListener('pointermove',event=>{
    const x=event.clientX/innerWidth-.5;
    const y=event.clientY/innerHeight-.5;
    machine?.style.setProperty('--rx',`${-6-y*12}deg`);
    machine?.style.setProperty('--ry',`${-10+x*16}deg`);
  },{passive:true});

  document.querySelectorAll('.cap-card').forEach(card=>{
    card.addEventListener('pointermove',event=>{
      const rect=card.getBoundingClientRect();
      const x=(event.clientX-rect.left)/rect.width-.5;
      const y=(event.clientY-rect.top)/rect.height-.5;
      card.style.transform=`perspective(850px) rotateX(${-y*8}deg) rotateY(${x*9}deg) translateY(-7px)`;
    });
    card.addEventListener('pointerleave',()=>card.style.transform='');
  });
}

function updateScrollScenes(){
  const docMax=document.documentElement.scrollHeight-innerHeight;
  document.documentElement.style.setProperty('--page-progress',`${docMax?scrollY/docMax*100:0}%`);
  if(mobileLayout.matches)return;
  if(heroStage&&heroElement){
    const rect=heroStage.getBoundingClientRect();
    const travel=Math.max(1,heroStage.offsetHeight-innerHeight);
    const progress=Math.max(0,Math.min(1,-rect.top/travel));
    const outgoing=Math.max(0,Math.min(1,(progress-.12)/.32));
    const incoming=Math.max(0,Math.min(1,(progress-.46)/.3));
    heroElement.style.setProperty('--hero-progress',String(progress));
    heroElement.style.setProperty('--hero-out',String(outgoing));
    heroElement.style.setProperty('--hero-in',String(incoming));
    heroSteps.forEach((step,index)=>step.classList.toggle('active',progress>=index*.16+.05));
  }
  if(story){
    const rect=story.getBoundingClientRect();
    const progress=Math.max(0,Math.min(1,-rect.top/(story.offsetHeight-innerHeight)));
    storySticky?.style.setProperty('--story-progress',`${progress*100}%`);
    storySticky?.style.setProperty('--flow',String(progress));
    flowNodes.forEach((node,index)=>{
      const local=Math.max(0,Math.min(1,(progress-index*.12)*2.8));
      node.style.setProperty('--node-opacity',String(.18+local*.82));
      node.style.setProperty('--node-scale',String(.75+local*.25));
      node.style.setProperty('--node-y',`${(1-local)*80}px`);
    });
  }
  if(!reducedMotion){
    parallaxItems.forEach(([element,speed])=>{
      if(!element)return;
      const rect=element.getBoundingClientRect();
      if(rect.bottom>0&&rect.top<innerHeight)element.style.transform=`translate3d(0,${(rect.top-innerHeight/2)*speed}px,0)`;
    });
  }
}

let scrollFrame=0;
addEventListener('scroll',()=>{if(scrollFrame)return;scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;updateScrollScenes()})},{passive:true});
addEventListener('resize',updateScrollScenes);
updateScrollScenes();

const flapTabs=[...document.querySelectorAll('.flap-tabs [role="tab"]')];
flapTabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>{
    flapTabs.forEach(item=>{
      const selected=item===tab;
      item.setAttribute('aria-selected',String(selected));
      item.tabIndex=selected?0:-1;
      const panel=document.getElementById(item.getAttribute('aria-controls'));
      if(panel)panel.hidden=!selected;
    });
  });
  tab.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;
    event.preventDefault();
    const direction=['ArrowRight','ArrowDown'].includes(event.key)?1:-1;
    const next=flapTabs[(index+direction+flapTabs.length)%flapTabs.length];
    next.focus();next.click();
  });
});
