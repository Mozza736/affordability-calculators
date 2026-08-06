const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
$('#menu').onclick=()=>$('#mobileNav').classList.toggle('open');$$('#mobileNav a').forEach(a=>a.onclick=()=>$('#mobileNav').classList.remove('open'));
$$('.faqBtn').forEach(b=>b.onclick=()=>b.parentElement.classList.toggle('open'));
let step=0;const answers={};function showStep(){ $$('.q').forEach((q,i)=>q.classList.toggle('active',i===step));$('#progress').style.width=((step+1)/3*100)+'%';$('#back').style.visibility=step===0?'hidden':'visible';$('#next').textContent=step===2?'See result':'Next';}
$$('.choice').forEach(b=>b.onclick=()=>{const q=b.closest('.q');$$('.choice',q).forEach(x=>x.classList.remove('selected'));b.classList.add('selected');answers[q.dataset.q]=b.dataset.value});
$('#back').onclick=()=>{if(step>0){step--;showStep()}};$('#next').onclick=()=>{if(!answers[String(step)]){showToast('Choose one option first');return}if(step<2){step++;showStep();return}$$('.q').forEach(q=>q.classList.remove('active'));$('#checkActions').style.display='none';$('#progress').style.width='100%';const high=['high','veryhigh'].includes(answers['1']);const score=high?'Strong fit':'Good fit';$('#fitScore').textContent=score;$('#fitText').textContent=high?'A clearer website could pay for itself with a single suitable customer. The private-concept approach is especially sensible here.':'The project may still make sense, but scope and price need to stay disciplined so the website earns its keep.';$('#fitList').innerHTML='<li>Recommended starting point: '+(high?'Current Business':'Current One')+'</li><li>Primary focus: '+({credibility:'credibility and trust',leads:'enquiry generation',launch:'launching the new offer',search:'search visibility'}[answers['2']])+'</li><li>Next step: review the current website and agree whether a concept is worthwhile</li>';$('#fitResult').classList.add('show')};showStep();
function showToast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
$('#enquiryForm').onsubmit=async e=>{
  e.preventDefault();
  const form=e.currentTarget, button=$('#submitButton');
  button.disabled=true;button.textContent='Sending…';
  $('#success').classList.remove('show');
  try{
    const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}});
    const data=await response.json().catch(()=>({}));
    if(!response.ok||!data.ok) throw new Error(data.message||'The message could not be sent.');
    $('#successTitle').textContent='Request received.';
    $('#successText').textContent='Thanks — Dave will reply shortly.';
    $('#success').classList.add('show');form.reset();showToast('Request sent');
  }catch(error){
    $('#successTitle').textContent='The form did not send.';
    $('#successText').innerHTML='Please email <a href="mailto:dave@madecurrent.co.uk"><b>dave@madecurrent.co.uk</b></a> instead.';
    $('#success').classList.add('show');showToast('Please use the email link');
  }finally{button.disabled=false;button.textContent='Send my redesign request →';}
};
