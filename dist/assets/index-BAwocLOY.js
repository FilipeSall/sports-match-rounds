(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function d(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=d(t);fetch(t.href,r)}})();const v="https://sevn-pleno-esportes.deno.dev/",g=async()=>{try{const e=await fetch(v);if(!e.ok)throw new Error("Response Error");return await e.json()}catch(e){console.error(`Fetch Error: ${e}`);return}},$=(e,n,d,o)=>{e&&(d.disabled=n===1,o.disabled=n===e.length)},f=(e,n,d,o,t,r)=>{if(!e)return;const i=e[n-1];d.innerHTML=`Rodada ${i.round}`,o.innerHTML="",i.games.forEach(s=>{const p=document.createElement("div");p.classList.add("game");const _=`<img src="./src/assets/${s.team_home_id}.png" alt="${s.team_home_name} shield">`,y=`<img src="./src/assets/${s.team_away_id}.png" alt="${s.team_away_name} shield">`;p.innerHTML=`
            <div class="team">
                ${_} 
                <span class="team__name">${s.team_home_name}</span> 
                <span class="score">${s.team_home_score}</span>
            </div>
            <div class="vs">X</div>
            <div class="team">
                <span class="score">${s.team_away_score}</span>
                <span class="team__name">${s.team_away_name}</span> 
                ${y} 
            </div>
        `,o.appendChild(p)}),$(e,n,t,r)},l=document.querySelector(".games__display"),h=document.querySelector(".content__panel-header__round"),u=document.getElementById("prev-round"),m=document.getElementById("next-round");let c=1,a;const E=()=>{c<((a==null?void 0:a.length)||1)&&(c++,f(a,c,h,l,u,m))},w=()=>{c>1&&(c--,f(a,c,h,l,u,m))},L=async()=>{try{const e=await g();e?(a=e,f(a,c,h,l,u,m)):l.textContent="No data available."}catch(e){console.error(`Error ao buscar os dados: ${e}`)}};m.addEventListener("click",E);u.addEventListener("click",w);L();
