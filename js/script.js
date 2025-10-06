// Authentication
function loginUser() {
  const username = document.getElementById("username").value.trim();
  if(username.length < 3) {
    alert("Username must be at least 3 characters");
    return;
  }
  localStorage.setItem("username", username);
  window.location.href = "games.html";
}

// Display username on games page
document.addEventListener("DOMContentLoaded", () => {
  const playerNameEl = document.getElementById("player-name");
  if(playerNameEl){
    const username = localStorage.getItem("username");
    if(!username){
      window.location.href = "login.html";
      return;
    }
    playerNameEl.textContent = username;
  }

  // Populate leaderboard preview
  const preview = document.getElementById("leaderboard-preview");
  if(preview){
    const scores = JSON.parse(localStorage.getItem("scores")||"[]");
    scores.sort((a,b)=>a.time-b.time);
    scores.slice(0,5).forEach((s,i)=>{
      preview.innerHTML += `<tr>
        <td>${i+1}</td>
        <td>${s.username}</td>
        <td>${s.time}</td>
      </tr>`;
    });
  }
});

// Save score
function saveScore(game, time){
  const username = localStorage.getItem("username");
  const scores = JSON.parse(localStorage.getItem("scores")||"[]");
  scores.push({username, game, time, date: new Date().toLocaleString()});
  localStorage.setItem("scores", JSON.stringify(scores));
}
