// Game 1 - Classic
let startTime, timeout;
function startClassic(){
  const box = document.getElementById("classic-box");
  box.style.background = "red";
  const delay = Math.random()*2000 + 1000;
  timeout = setTimeout(()=>{
    box.style.background = "green";
    startTime = Date.now();
  }, delay);
}

function clickClassic(){
  const box = document.getElementById("classic-box");
  if(box.style.background !== "green"){
    alert("Too soon!");
    clearTimeout(timeout);
    return;
  }
  const reaction = Date.now()-startTime;
  alert(`Your reaction: ${reaction} ms`);
  saveScore("classic", reaction);
  box.style.background = "#333";
}

// Game 2 - Audio Reflex
let audioTimeout;
function startAudioReflex(){
  const reactBtn = document.getElementById("react-btn");
  reactBtn.disabled = true;
  const audio = document.getElementById("audio-tone");
  const delay = Math.random()*3000+1000;
  audioTimeout = setTimeout(()=>{
    audio.play();
    reactBtn.disabled = false;
    startTime = Date.now();
  }, delay);
}

function clickAudioReflex(){
  const reaction = Date.now()-startTime;
  alert(`Your reaction: ${reaction} ms`);
  saveScore("audio", reaction);
  document.getElementById("react-btn").disabled = true;
}

// ---------- Sequence Master ----------
let sequence=[], userSequence=[], seqTimeout;
function startSequence(){
  sequence=[];
  userSequence=[];
  for(let i=0;i<5;i++){
    sequence.push(Math.floor(Math.random()*4));
  }
  flashSequence(0);
}
function flashSequence(i){
  if(i>=sequence.length) return;
  const btns=document.getElementsByClassName("seq-btn");
  btns[sequence[i]].classList.add("active");
  setTimeout(()=>{
    btns[sequence[i]].classList.remove("active");
    setTimeout(()=>flashSequence(i+1),300);
  },600);
}
function userClick(idx){
  userSequence.push(idx);
  const currentStep=userSequence.length-1;
  if(userSequence[currentStep]!==sequence[currentStep]){
    alert("Wrong sequence!");
    return;
  }
  if(userSequence.length===sequence.length){
    alert("Perfect! Sequence completed.");
    saveScore("sequence", 0);
  }
}

// ---------- Target Practice ----------
let targetInterval;
function startTargetPractice(){
  const area=document.getElementById("target-area");
  area.innerHTML="";
  let clicks=0;
  const startTime=Date.now();
  targetInterval=setInterval(()=>{
    const target=document.createElement("div");
    target.classList.add("target");
    target.style.top=Math.random()*300+"px";
    target.style.left=Math.random()*300+"px";
    target.onclick=function(){
      clicks++;
      target.remove();
    }
    area.appendChild(target);
  },800);
  setTimeout(()=>{
    clearInterval(targetInterval);
    const endTime=Date.now();
    const time=(endTime-startTime)/clicks;
    alert(`Average reaction time: ${Math.round(time)} ms`);
    saveScore("target", Math.round(time));
  },10000); // 10 sec game
}

// ---------- Flicker Test ----------
let flickerInterval;
function startFlicker(){
  const area=document.getElementById("flicker-area");
  const btn=document.getElementById("flicker-btn");
  btn.disabled=false;
  flickerInterval=setInterval(()=>{
    area.style.backgroundColor=area.style.backgroundColor==="white"?"black":"white";
  },100);
}
function stopFlicker(){
  clearInterval(flickerInterval);
  const btn=document.getElementById("flicker-btn");
  btn.disabled=true;
  alert("Good reaction!");
  saveScore("flicker", 0);
}
