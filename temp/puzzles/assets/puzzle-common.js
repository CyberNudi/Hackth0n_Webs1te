// Common helpers shared across puzzle pages.

//資料夾網址資訊
const PUZZLE_CONFIG = {
  1: "1lw_hfqBiwkp7Hm9kSeCE2A_9eZvk4nh7",
  2: "1N3rSYD2XceD72Me9Z8MFOsalNan-v_Pl",
  3: "1Hx0EcUp_ngjOsY65X9IvY_CpRoc0-Ers",
  4: "1btsLuEhax3qZeZudrXuIHFl1cmw17R4s",
  5: "1ZWLIy1xqTvCW0mvXQOA6q45fFqzf11ow",
  6: "1AOluloVVuyFTHtfyYscKamyy2JI9BiRm",
  7: "1AOluloVVuyFTHtfyYscKamyy2JI9BiRm",//沒有這關
  8: "115m9lX3RkeWegkQgJNFJo2UUFAcpX09If",
  9: "1WGvu_u5tPRdTbPtU_loJJnM_9nH9myPQ",
  10: "1lGor2q4xjmsPrr3sZZb_2H1TOwanSzfP",
  11: "1Xso2I8J1okFQ80puLXTWott2Ah36AINO",
  12: "17-BVeJFVqKSm7igrdakVRcs_bCntk1Qb",
  13: "1mM_-2K3yXNGUgkKEqGd0EU4bncJzUKB9",
  14: "11vtzN9uPoY0gqz6GlUFnXJ5ZKh4dKyRz",
  15: "1lSN0y8D-quXm1GiVCIwU4-L4RhzscR-",
  16: "1X1TefpVfbixYfcCIbjv0KocKk16ywDJc"
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

// 定義下載功能，但不自動執行
const GAS_DOWNLOAD_URL = "https://script.google.com/macros/s/AKfycbw4nER0Cqjbsd7VkaIR1ymdG-0ubALRK9C4kr4JogW60BqtazLBuAPTkFplPeXH3_DL/exec";
function enableDownload(levelCode) {
    const folderId = PUZZLE_CONFIG[levelCode];
    const downloadBtn = document.getElementById("downloadBtn");
    if (downloadBtn && folderId) { // 解鎖按鈕
        downloadBtn.style.display = "inline-block";
        downloadBtn.disabled = false;
        downloadBtn.style.opacity = "1";
        downloadBtn.style.pointerEvents = "auto";
        downloadBtn.style.cursor = "pointer";
        downloadBtn.textContent = "Download Puzzle";

        downloadBtn.onclick = () => {
            window.open(`${GAS_DOWNLOAD_URL}?id=${folderId}`, '_blank');
        };
    }
}