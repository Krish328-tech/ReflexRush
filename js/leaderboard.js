document.addEventListener("DOMContentLoaded",()=>{
  const table = document.getElementById("leaderboard-body");
  if(!table) return;
  const scores = JSON.parse(localStorage.getItem("scores")||"[]");
  scores.sort((a,b)=>a.time-b.time);
  scores.slice(0,100).forEach((s,i)=>{
    table.innerHTML += `<tr ${s.username===localStorage.getItem("username")?"class='highlight'":""}>
      <td>${i+1}</td>
      <td>${s.username}</td>
      <td>${s.time}</td>
      <td>${s.date}</td>
    </tr>`;
  });
});
