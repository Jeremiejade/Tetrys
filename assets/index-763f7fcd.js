(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();const C=document.getElementById("grid");function ee({x:e,y:t}){const n=[];C.innerHTML="";for(let i=0;i<t;i++){n[i]=[];for(let s=0;s<e;s++)n[i][s]="empty",te(`col_${s}`,`row_${i}`)}return ne(),n}function te(e,t){const n=document.createElement("div");n.classList.add(e,t,"square"),C.appendChild(n)}function ne(){const e=document.getElementById("preview");for(let t=0;t<4;t++){const n=document.createElement("div");n.classList.add("pixel",`pixel_${t}`),e.appendChild(n)}}let H,k=0;function se(e){return H=(e-k)/1e3,k=e,Math.round(1/H)}function K(e){let t=e.length,n;for(;t!==0;)n=Math.floor(Math.random()*t),t--,[e[t],e[n]]=[e[n],e[t]];return e[0]}const d={s:"DOWN",q:"LEFT",d:"RIGHT"},y={" ":"TURN_LEFT",e:"TURN_RIGHT"},x={Escape:"PAUSE"},T={0:"DOWN",1:"RIGHT",2:"LEFT"},q={4:"TURN_LEFT",5:"TURN_RIGHT"},O={9:"PAUSE"};let o=[];const S={state:null},I={state:null};function ie(){o=[],S.state=null,I.state=null}window.addEventListener("keydown",({key:e})=>{const t=d[e];t&&!o.includes(t)&&o.push(t);const n=y[e];n&&(S.state=n);const i=x[e];i&&(I.state=i)});window.addEventListener("keyup",({key:e})=>{const t=d[e];t&&o.includes(t)&&(o=o.filter(n=>n!==t))});let P={4:!1,5:!1};window.addEventListener("gamepadconnected",e=>{console.log({a:"Gamepad connected at index %d: %s. %d buttons, %d axes.",b:e.gamepad.index,c:e.gamepad.id,d:e.gamepad.buttons.length,f:e.gamepad.axes.length}),Y()});function ae(e){return typeof e=="object"?e.pressed:e===1}function B(e){return e.toFixed(1)}function Y(e){const t=navigator.getGamepads();if(!t)return;const n=t[0];for(let l=0;l<20;l++){let E=null;const g=ae(n.buttons[l]);T[l]&&(E=T[l],g&&!o.includes(E)?o.push(E):!g&&o.includes(E)&&(o=o.filter(J=>J!==E))),q[l]&&(g&&!P[l]?(S.state=q[l],P[l]=!0):!g&&P[l]&&(P[l]=!1)),O[l]&&g&&(I.state=O[l])}const i=B(n.axes[0]),s=B(n.axes[1]),a=T[2],r=T[1],p=T[0];i>.3&&!o.includes(r)?o.push(r):o.includes(r)&&(o=o.filter(l=>l!==r)),i<-.3&&!o.includes(a)?o.push(a):o.includes(a)&&(o=o.filter(l=>l!==a)),s>.5&&!o.includes(p)?o.push(p):o.includes(p)&&(o=o.filter(l=>l!==p)),requestAnimationFrame(Y)}const oe=class{constructor(e,t){this.active=!0,this.y=2,this.x=4,this.name=e,this.shape=t,this.currentIndexShape=0}get position(){return this.currentShape.map(e=>({x:this.x+e.x,y:this.y+e.y}))}get currentShape(){return this.shape[this.currentIndexShape]}get nextShapePosition(){return this.shape[this.nextIndexShape()].map(e=>({x:this.x+e.x,y:this.y+e.y}))}get previousShapePosition(){return this.shape[this.previousIndexShape()].map(e=>({x:this.x+e.x,y:this.y+e.y}))}rotateToRight(){this.currentIndexShape=this.nextIndexShape()}rotateToLeft(){this.currentIndexShape=this.previousIndexShape()}left(){this.x--}right(){this.x++}down(){this.y++}nextIndexShape(){return this.currentIndexShape===this.shape.length-1?0:this.currentIndexShape+1}previousIndexShape(){return this.currentIndexShape===0?this.shape.length-1:this.currentIndexShape-1}freeze(){this.active=!1}},G=[{name:"sq",shapes:[[{x:0,y:0},{x:1,y:0},{x:0,y:-1},{x:1,y:-1}]]},{name:"s",shapes:[[{x:0,y:0},{x:-1,y:0},{x:0,y:-1},{x:1,y:-1}],[{x:1,y:0},{x:1,y:-1},{x:0,y:-1},{x:0,y:-2}]]},{name:"z",shapes:[[{x:0,y:0},{x:1,y:0},{x:0,y:-1},{x:-1,y:-1}],[{x:-1,y:0},{x:-1,y:-1},{x:0,y:-1},{x:0,y:-2}]]},{name:"l",shapes:[[{x:0,y:0},{x:1,y:0},{x:0,y:-1},{x:0,y:-2}],[{x:-1,y:0},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1}],[{x:0,y:0},{x:0,y:-1},{x:0,y:-2},{x:-1,y:-2}],[{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:1,y:-2}]]},{name:"lr",shapes:[[{x:0,y:0},{x:-1,y:0},{x:0,y:-1},{x:0,y:-2}],[{x:-1,y:-2},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1}],[{x:0,y:0},{x:0,y:-1},{x:0,y:-2},{x:1,y:-2}],[{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:1,y:0}]]},{name:"t",shapes:[[{x:0,y:0},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1}],[{x:0,y:0},{x:0,y:-1},{x:0,y:-2},{x:-1,y:-1}],[{x:0,y:-2},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1}],[{x:0,y:0},{x:0,y:-1},{x:0,y:-2},{x:1,y:-1}]]},{name:"b",shapes:[[{x:0,y:0},{x:0,y:-1},{x:0,y:-2},{x:0,y:-3}],[{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1}]]}],z=G.map(e=>e.name);function le(e,t){for(const n of e)for(let i=0;i<t;i++)document.querySelector(`.row_${n}.col_${i}`).classList.add("delete");return re(800)}function re(e){return new Promise(t=>setTimeout(t,e))}const $=Object.values(y),F=Object.values(d);function A(e,t){const n=document.getElementById("menu");n.classList.add("display"),n.innerHTML=`  <h1>
    <span class="t">T</span>
    <span class="e">e</span>
    <span class="tt">t</span>
    <span class="r">r</span>
    <span class="y">y</span>
    <span class="s">s</span>
  </h1>`,t&&(n.innerHTML+=`<h2>GAME OVER</h2>
<div>
<p>Score: ${t.score}</p>
<p>Time: ${t.time}</p>
</div>
`),n.innerHTML+=`<ul>
    <li>
        <button id="new-game">NEW GAME</button>
    </li>
    <li>
        <button id="option">Controls</button>
    </li>
</ul>`,document.getElementById("new-game").addEventListener("click",()=>{n.classList.remove("display"),e()}),document.getElementById("option").addEventListener("click",()=>{j(n,e,t)})}function ce(e=null){const t=document.getElementById("menu");if(t.classList.add("display"),t.innerHTML=`  <h1>
    <span class="t">T</span>
    <span class="e">e</span>
    <span class="tt">t</span>
    <span class="r">r</span>
    <span class="y">y</span>
    <span class="s">s</span>
  </h1>
    <h2>PAUSE</h2>`,v(t,"Resume game","resume",()=>{t.classList.remove("display"),e()}),v(t,"Restart","valid-control",()=>{t.classList.remove("display"),e("restart")}),!e)return new Promise(n=>{e=n})}function ue(e,t,n){e.innerHTML=`
  <h1>
    <span class="t">T</span>
    <span class="e">e</span>
    <span class="tt">t</span>
    <span class="r">r</span>
    <span class="y">Y</span>
    <span class="s">s</span>
  <h1>
  <h2>Control</h2>
  <nav></nav>
   <div class="gamepad-key"><p>DOWN:</p><p>Axe Y -</p></div>
  <div class="gamepad-key"><p>LEFT:</p><p>Axe Y +</p></div>
  <div class="gamepad-key"><p>RIGHT:</p><p>Axe Y -</p></div>
  <div class="gamepad-key"><p>TURN_LEFT:</p><p>Button left</p></div>
  <div class="gamepad-key"><p>TURN_RIGHT:</p><p>Button right</p></div>
  <div class="gamepad-key"><p>PAUSE:</p><p>Start</p></div>
  `;const i=e.querySelector("nav");v(i,"Keyboard","keyboard-button",()=>{j(e,t,n)});const s=document.createElement("p");s.innerText="controller",i.appendChild(s),v(e,"Ok","valid-control",()=>{A(t,n)})}function j(e,t,n){e.innerHTML=`
  <h1>
    <span class="t">T</span>
    <span class="e">e</span>
    <span class="tt">t</span>
    <span class="r">r</span>
    <span class="y">Y</span>
    <span class="s">s</span>
  <h1>
  <h2>Control</h2>
  <nav><p>KeyBoard</p></nav>
  `,v(e.querySelector("nav"),"gamepad","gamepad-button",()=>{e.querySelectorAll(".key-input").forEach(s=>{const a=s.dataset.name,r=s.dataset.key;$.includes(a)?y[r]=a:F.includes(a)?d[r]=a:x[r]=a}),ue(e,t,n)});for(const i in d)e.appendChild(_(d[i],i,e)),delete d[i];for(const i in y)e.appendChild(_(y[i],i,e)),delete y[i];for(const i in x)e.appendChild(_(x[i],i,e)),delete x[i];v(e,"Ok","valid-control",()=>{e.querySelectorAll(".key-input").forEach(s=>{const a=s.dataset.name,r=s.dataset.key;$.includes(a)?y[r]=a:F.includes(a)?d[r]=a:x[r]=a}),A(t,n)})}function _(e,t,n){let i=!1;const s=document.createElement("div");return s.classList.add("key-input"),s.dataset.key=t,s.dataset.name=e,s.setAttribute("tabIndex","0"),s.innerHTML=`<p>${e} :</p><p>${U(t)}</p>`,s.addEventListener("click",()=>{i=M(s,!0)}),s.addEventListener("focusout",()=>{i=M(s,!1)}),window.addEventListener("keydown",({key:a})=>{if(i){const r=n.querySelectorAll(".key-input"),p=[];if(r.forEach(l=>p.push(l.dataset.key)),p.includes(a))return;s.dataset.key=a,s.innerHTML=`<p>${e} :</p><p>${U(a)}</p>`,i=M(s,!1)}}),s}function M(e,t){return t?(e.classList.add("edition"),t):(e.classList.remove("edition"),t)}function U(e){return e===" "?"SPACE":e}function v(e,t,n,i){const s=document.createElement("button");s.innerText=t,s.id=n,s.addEventListener("click",i),e.appendChild(s)}const R=["empty","piece","freezePiece","delete"],w={x:10,y:20},de=10,V=5;let f=null,u=null,m=null,L=null,c=null;const h={state:!1,time:0};function N(){f=0,m=ee(w),L=K(G),u=null,c={speed:40,level:0,score:0,time:0,totalLine:0,nextLevelLine:10},ie(),window.requestAnimationFrame(W)}A(N);async function W(e){if((!u||!u.active)&&(u=pe()),c.time++,f++,xe(c.level,c.time,c.score),fe(m),ye(u.position,u.name),he(L.name),S.state=ve(u,S.state),console.log(se(e)),f%V===0&&Le(u,o,f),f%c.speed===0&&Q(u,f),!b(u,0,1)&&h.state&&(f-h.time+1)%c.speed===0){if(Ee(m,u)==="GAME_OVER")return A(N,c),console.log("GAME_OVER");m=await Te(m)}if(I.state&&(I.state=null,await ce()==="restart")){N();return}window.requestAnimationFrame(W)}function pe(){const e=new oe(L.name,L.shapes);return L=X(L),e}function X(e){let t=K(G);return t.name===e.name&&(t=X(e)),t}function fe(e){for(let t=0;t<e.length;t++){const n=e[t];for(let i=0;i<n.length;i++){const s=n[i],a=document.querySelector(`.row_${t}.col_${i}`);a.classList.remove(...R),a.classList.remove(...z),a.classList.add(...s.split(","))}}}function ye(e,t){e.forEach(({x:n,y:i})=>{if(i>=0){const s=document.querySelector(`.row_${i}.col_${n}`);s.classList.remove(...R),s.classList.add(R[1]),me(s,t)}})}function he(e){const t=document.getElementById("preview");t.className=e}function xe(e,t,n){const i=document.getElementById("level");i.innerHTML=`<p>Level ${e}</p><p>TIME: </br>${Math.round(t/60)}s</p><p>SCORE: </br>${n}</p>`}function me(e,t){e.classList.remove(...z),e.classList.add(t)}function Le(e,t,n){t.includes("LEFT")&&b(e,-1)&&e.left(),t.includes("RIGHT")&&b(e,1)&&e.right(),t.includes("DOWN")&&Q(u,n)}function ve(e,t){return t==="TURN_LEFT"&&D(e,"LEFT")&&e.rotateToLeft(),t==="TURN_RIGHT"&&D(e,"RIGHT")&&e.rotateToRight(),null}function Q(e,t){b(e,0,1)?(e.down(),h.state=!1):h.state||(h.state=!0,h.time=t)}function b(e,t,n=0){const i=e.position.map(({x:s,y:a})=>({x:s+t,y:a+n}));return Z(i)}function D(e,t){let n=null;return t==="LEFT"?n=e.previousShapePosition:n=e.nextShapePosition,Z(n)}function Z(e){let t=!0;return e.forEach(({x:n,y:i})=>{i>=0&&(ge(n,i)||m[i][n]!=="empty")&&(t=!1)}),t}function Ee(e,t){let n="ok";for(const{x:i,y:s}of t.position)s<0?n="GAME_OVER":e[s][i]=`freezePiece,${t.name}`;return t.freeze(),h.state=!1,n}function ge(e,t){return e<0||e>w.x||t>w.y-1}async function Te(e){const t=[];e=e.filter((i,s)=>(i.every(a=>a.includes("freezePiece"))&&t.push(s),!i.every(a=>a.includes("freezePiece"))));const n=t.length;for(let i=0;i<n;i++){const s=[];for(let a=0;a<w.x;a++)s[a]="empty";e.unshift(s)}return n&&(await le(t,w.x),c.score+=n*100*2**n,c.totalLine+=n,c.totalLine>c.nextLevelLine&&Se()),e}function Se(){c.level++,c.nextLevelLine+=de,c.speed>V&&(c.speed-=5)}