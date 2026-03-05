// Common helpers shared across puzzle pages.

//資料夾網址資訊
const PUZZLE_CONFIG = {
  1: "1lw_hfqBiwkp7Hm9kSeCE2A_9eZvk4nh7",
  2: "資料夾ID_2",
  3: "資料夾ID_3"
};


function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    username: params.get("username") || "",
    token: params.get("token") || ""
  };
}

async function authorizePage({ username, token, authApi, supabaseKey, puzzleCode }) {
  if (!username || !token) return false;
  try {
    const res = await fetch(authApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({
        username,
        token,
        puzzle_code: puzzleCode
      })
    });
    const data = await res.json();
    return data.ok === true;
  } catch {
    return false;
  }
}

function generateToken(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let t = "";
  for (let i = 0; i < length; i++) {
    t += chars[Math.floor(Math.random() * chars.length)];
  }
  return t;
}

//控制下載
const GAS_DOWNLOAD_URL = "https://script.google.com/macros/s/AKfycbw4nER0Cqjbsd7VkaIR1ymdG-0ubALRK9C4kr4JogW60BqtazLBuAPTkFplPeXH3_DL/exec";
window.onload = function() {
    const folderId = PUZZLE_CONFIG[PUZZLE_CODE];
    if (!folderId) return;

    const downloadBtn = document.getElementById("downloadBtn");
    if (downloadBtn) {
        downloadBtn.onclick = () => {
            window.open(`${GAS_DOWNLOAD_URL}?id=${folderId}`, '_blank');
        };
    }
};