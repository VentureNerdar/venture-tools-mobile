import{bd as t,p as a}from"./DTWorSuP.js";const d=t(e=>{if((localStorage.getItem("Bearer")||"")&&e.path!=="/home")return a("/dashboard",{replace:!0})});export{d as default};
