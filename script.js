const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
window.addEventListener("load",()=>setTimeout(()=>{$("#loader").style.opacity="0";setTimeout(()=>$("#loader").remove(),700)},900));
function startWorld(){document.querySelector("#story").scrollIntoView({behavior:"smooth"});confettiHearts(28)}
function confettiHearts(n=20){for(let i=0;i<n;i++){let x=document.createElement("span");x.textContent=Math.random()>.25?"♥":"✦";x.style.left=(5+Math.random()*90)+"vw";x.style.top=(70+Math.random()*25)+"vh";x.style.fontSize=(10+Math.random()*24)+"px";x.style.color=["#f3b8c8","#fff","#ffd9e3","#c86f86"][Math.floor(Math.random()*4)];x.style.animationDuration=(2.5+Math.random()*3)+"s";$("#floating").appendChild(x);setTimeout(()=>x.remove(),6000)}}
setInterval(()=>{if(Math.random()>.35){let x=document.createElement("span");x.className="tiny";x.textContent=Math.random()>.2?"♡":"✦";x.style.left=Math.random()*100+"vw";x.style.top="100vh";x.style.color="#d98fa2";$("#floating").appendChild(x);setTimeout(()=>x.remove(),5000)}},650);

$$(".polaroid").forEach(p=>p.onclick=()=>openModal(`<div class="modal-box"><img src="${p.dataset.img}"><h3>${p.querySelector("b").textContent}</h3><p>${p.dataset.text}</p></div>`));
$$(".envelope").forEach(e=>e.onclick=()=>openModal(`<div class="modal-box" style="text-align:center"><div style="font-size:70px;color:#c86f86">♡</div><h3>${e.dataset.title}</h3><p>${e.dataset.body}</p></div>`));
$$(".gift").forEach(g=>g.onclick=()=>{if(g.classList.contains("locked")){const pw=prompt("Küçük bir ipucu: bizim için özel bir tarih. ♡");if(pw===null)return;if(!pw.includes("0912")){toast("Hmm... olmadı. İpucunu düşün ♡");return}}openModal(`<div class="modal-box" style="text-align:center"><div style="font-size:80px">🎀</div><h3>Sürpriz!</h3><p>${g.dataset.msg}</p></div>`);confettiHearts(35)});
function openModal(html){$("#modal").innerHTML=`<button class="close" onclick="closeModal()">×</button>${html}`;$("#modal").classList.add("show");document.body.style.overflow="hidden"}
function closeModal(){$("#modal").classList.remove("show");document.body.style.overflow=""}
$("#modal").onclick=e=>{if(e.target.id==="modal")closeModal()};

const qs=[
 {q:"En sevdiğim yemek?",a:["Bicepss","İskender","Manti","Yağlama"],c:0},
 {q:"Seni ne kadar çok seviyorum?",a:["Evum","Çok","Henil","Evren kadaar"],c:0},
 {q:"Benim için en güzel hediye hangisi?",a:["Pahalı bir şey","Birlikte zaman geçirmek","Sadece çikolata","Çiçek"],c:1},
 {q:"Birlikte yapmayı en çok istediğim şeylerden biri?",a:["Yurt dışına çikmak","Ders çalışmak","Evlenmek","Sadece uyumak"],c:0},
 {q:"Son soru... Boyu kaç? :)",a:["160","158","156","Bu soru ne"],c:1}
];
let qi=0,score=0;
function renderQuiz(){let q=qs[qi];if(!q){$("#qCount").textContent="DONE ♡";$("#progress").style.width="100%";$("#quizArea").innerHTML=`<div class="score-big">${score}/${qs.length}</div><h3 style="font-family:'Playfair Display';font-size:38px;margin:10px 0 15px">${score>=4?"Tamam tamam, beni bayağı iyi tanıyorsun. ♡":"Puan önemli değil. Doğum günü çocuğu olduğun için geçtin. ♡"}</h3><p style="line-height:1.6;color:#977d86">Asıl sınavın ödülü finalde.</p>`;return}$("#qCount").textContent=`0${qi+1} / 05`;$("#progress").style.width=((qi+1)/5*100)+"%";$("#quizArea").innerHTML=`<div class="question">${q.q}</div><div class="answers">${q.a.map((x,i)=>`<button class="answer" data-i="${i}">${x}</button>`).join("")}</div>`;$$(".answer").forEach(b=>b.onclick=()=>{let ok=+b.dataset.i===q.c;$$(".answer").forEach(x=>x.disabled=true);b.classList.add(ok?"correct":"wrong");if(!ok)$$(".answer")[q.c].classList.add("correct");if(ok){score++;confettiHearts(12)}setTimeout(()=>{qi++;renderQuiz()},700)})}
renderQuiz();

function toast(t){let x=$("#toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),2200)}
function finalSurprise(){confettiHearts(70);$("#finalMessage").innerHTML=`<div class="final-message">İyi ki varsın. Seni çok seviyorum ömrüümmm. ♡</div>`;for(let i=0;i<10;i++)setTimeout(()=>confettiHearts(10),i*180)}

const music = new Audio("sounds/Apocalypse - Cigarettes After Sex.mp3");
music.loop = true;

$("#blowStart").addEventListener("click", event => {
  const gate = $("#birthdayGate");
  if (gate.classList.contains("is-blown")) return;
  event.currentTarget.disabled = true;
  gate.classList.add("is-blown");
  confettiHearts(36);
  setTimeout(() => {
    gate.remove();
    $(".start-btn").focus({preventScroll:true});
  }, 1800);
});

$("#musicBtn").onclick = async () => {
  try {
    await music.play();
    toast("Şarkı çalınıyor... ♡");
  } catch (error) {
    toast("Ses çalınamadı. Dosya yolunu kontrol et.");
    console.error(error);
  }
};
