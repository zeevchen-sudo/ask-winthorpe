const form=document.querySelector('#form'),input=document.querySelector('#question'),chat=document.querySelector('#chat'),send=document.querySelector('#send');
let history=[];
function add(role,text){const el=document.createElement('div');el.className=`message ${role}`;el.textContent=text;chat.appendChild(el);el.scrollIntoView({behavior:'smooth',block:'end'});return el}
async function ask(question){
  if(!question.trim())return;
  add('user',question); input.value=''; send.disabled=true;
  const waiting=add('assistant','Thinking…');
  try{
    const endpoint=window.ASK_WINTHORPE_API;
    if(!endpoint||endpoint.includes('YOUR-BACKEND'))throw new Error('Backend URL has not been configured yet.');
    const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question,history})});
    const data=await r.json(); if(!r.ok)throw new Error(data.error||'Request failed');
    waiting.textContent=data.answer;
    history.push({role:'user',content:question},{role:'assistant',content:data.answer});
    history=history.slice(-12);
  }catch(e){waiting.textContent=`Unable to answer right now. ${e.message}`}
  finally{send.disabled=false;input.focus()}
}
form.addEventListener('submit',e=>{e.preventDefault();ask(input.value)});
document.querySelectorAll('.starters button').forEach(b=>b.addEventListener('click',()=>ask(b.textContent)));
input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();form.requestSubmit()}});
