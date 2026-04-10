<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Troon Golf × BevSpot — Training Center</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #F4F6F9;
    --surface: #FFFFFF;
    --surface-raised: #EEF1F6;
    --border: #D8DDE6;
    --text: #1A2332;
    --text-muted: #5F6D7E;
    --bevspot-blue: #2B6CB0;
    --bevspot-blue-light: #3B82C4;
    --bevspot-blue-glow: rgba(43, 108, 176, 0.1);
    --troon-green: #2D5A27;
    --green: #16A34A;
    --red: #DC2626;
    --radius: 12px;
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; overflow-x: hidden; }
  .container { max-width: 840px; margin: 0 auto; padding: 0 24px; }

  header { padding: 40px 0 36px; text-align: center; background: linear-gradient(180deg, #FFFFFF 0%, var(--bg) 100%); }
  .logos { display: flex; align-items: center; justify-content: center; gap: 24px; margin-bottom: 28px; flex-wrap: wrap; }
  .logo-bevspot img { height: 34px; display: block; }
  .logo-divider { width: 1px; height: 36px; background: var(--border); }
  .logo-troon img { height: 44px; display: block; }
  .header-badge { display: inline-block; padding: 5px 14px; background: var(--troon-green); color: #fff; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; border-radius: 100px; margin-bottom: 18px; }
  h1 { font-family: 'Fraunces', serif; font-size: clamp(26px, 5vw, 40px); font-weight: 800; line-height: 1.2; margin-bottom: 12px; color: var(--text); }
  header .container > p { color: var(--text-muted); font-size: 15px; max-width: 500px; margin: 0 auto; line-height: 1.6; }

  .search-section { padding: 24px 0 16px; position: sticky; top: 0; z-index: 100; background: var(--bg); }
  .search-section::after { content: ''; position: absolute; bottom: -16px; left: 0; right: 0; height: 16px; background: linear-gradient(var(--bg), transparent); pointer-events: none; }
  .search-box { position: relative; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border-radius: var(--radius); }
  .mic-btn { position: absolute; right: 56px; bottom: 10px; width: 40px; height: 40px; border: none; border-radius: 10px; background: transparent; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
  .mic-btn:hover { color: var(--bevspot-blue); background: var(--bevspot-blue-glow); }
  .mic-btn.listening { color: #fff; background: var(--red); animation: micPulse 1.5s infinite; }
  @keyframes micPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.3); } 50% { box-shadow: 0 0 0 8px rgba(220,38,38,0); } }
  .mic-btn svg { width: 20px; height: 20px; }
  .search-box textarea { width: 100%; padding: 18px 100px 18px 22px; background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius); color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 16px; line-height: 1.5; resize: none; outline: none; transition: border-color 0.25s, box-shadow 0.25s; overflow: hidden; min-height: 58px; max-height: 160px; }
  .search-box textarea::placeholder { color: var(--text-muted); }
  .search-box textarea:focus { border-color: var(--bevspot-blue); box-shadow: 0 0 0 4px var(--bevspot-blue-glow), 0 4px 20px rgba(0,0,0,0.06); }
  .search-btn { position: absolute; right: 10px; bottom: 10px; width: 40px; height: 40px; border: none; border-radius: 10px; background: var(--bevspot-blue); color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.15s, background 0.15s; }
  .search-btn:hover { transform: scale(1.06); background: var(--bevspot-blue-light); }
  .search-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .search-btn svg { width: 20px; height: 20px; }

  .quick-questions { display: flex; flex-wrap: wrap; gap: 8px; padding: 14px 0 0; justify-content: center; }
  .quick-q { padding: 7px 14px; background: var(--surface); border: 1px solid var(--border); border-radius: 100px; color: var(--text-muted); font-size: 13px; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
  .quick-q:hover { border-color: var(--bevspot-blue); color: var(--bevspot-blue); background: var(--bevspot-blue-glow); }

  .answer-section { padding: 20px 0 80px; min-height: 200px; }
  .answer-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; animation: slideUp 0.35s ease; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
  @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  .answer-header { display: flex; align-items: center; gap: 10px; padding: 16px 22px; border-bottom: 1px solid var(--border); font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; font-weight: 600; background: var(--surface-raised); }
  .answer-header .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--bevspot-blue); }
  .answer-body { padding: 24px; line-height: 1.75; font-size: 15px; }
  .answer-body h3 { font-family: 'Fraunces', serif; font-size: 17px; font-weight: 700; margin: 22px 0 8px; color: var(--troon-green); }
  .answer-body h3:first-child { margin-top: 0; }
  .answer-body p { margin-bottom: 12px; }
  .answer-body ol, .answer-body ul { padding-left: 20px; margin-bottom: 12px; }
  .answer-body li { margin-bottom: 6px; }
  .answer-body strong { color: var(--bevspot-blue); font-weight: 600; }
  .answer-body code { background: var(--surface-raised); padding: 2px 7px; border-radius: 5px; font-size: 13px; color: var(--troon-green); }
  .answer-body em { color: var(--text-muted); font-style: italic; }
  .source-tag { display: inline-block; padding: 4px 12px; background: var(--surface-raised); border: 1px solid var(--border); border-radius: 6px; font-size: 12px; color: var(--text-muted); margin-top: 16px; margin-right: 6px; }

  .loading { display: flex; align-items: center; gap: 12px; padding: 24px; color: var(--text-muted); font-size: 14px; }
  .loading-dots { display: flex; gap: 5px; }
  .loading-dots span { width: 6px; height: 6px; border-radius: 50%; background: var(--bevspot-blue); animation: pulse 1.2s infinite; }
  .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
  .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes pulse { 0%, 80%, 100% { opacity: 0.25; transform: scale(0.8); } 40% { opacity: 1; transform: scale(1); } }

  .topics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; padding: 24px 0; }
  .topic-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; cursor: pointer; transition: all 0.25s; box-shadow: 0 1px 4px rgba(0,0,0,0.03); }
  .topic-card:hover { border-color: var(--bevspot-blue); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
  .topic-card .topic-icon { font-size: 24px; margin-bottom: 10px; }
  .topic-card h3 { font-family: 'Fraunces', serif; font-size: 15px; font-weight: 700; margin-bottom: 6px; color: var(--text); }
  .topic-card p { color: var(--text-muted); font-size: 13px; line-height: 1.5; }

  footer { text-align: center; padding: 20px 0 40px; color: var(--text-muted); font-size: 12px; }
  footer span { color: var(--troon-green); font-weight: 600; }

  @media (max-width: 600px) {
    header { padding: 30px 0 24px; }
    .search-section { padding: 16px 0 10px; }
    .topics-grid { grid-template-columns: 1fr; }
    .logos { gap: 16px; }
  }
</style>
</head>
<body>
<header>
  <div class="container">
    <div class="logos">
      <div class="logo-bevspot"><img src="https://bevspot.com/wp-content/uploads/2020/03/Logo.png" alt="BevSpot Logo"></div>
      <div class="logo-divider"></div>
      <div class="logo-troon"><img src="https://www.troon.com/wp-content/uploads/2023/08/Troon-Full-Color.png" alt="Troon Golf Logo" onerror="this.onerror=null;this.style.display='none';this.parentElement.innerHTML='<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 200 56&quot; width=&quot;120&quot; height=&quot;34&quot;><rect x=&quot;4&quot; y=&quot;4&quot; width=&quot;192&quot; height=&quot;48&quot; rx=&quot;6&quot; fill=&quot;none&quot; stroke=&quot;%232D5A27&quot; stroke-width=&quot;4&quot;/><text x=&quot;100&quot; y=&quot;37&quot; font-family=&quot;serif&quot; font-size=&quot;28&quot; font-weight=&quot;bold&quot; fill=&quot;%232D5A27&quot; text-anchor=&quot;middle&quot;>TROON</text></svg>';"></div>
    </div>
    <div class="header-badge">Training Center</div>
    <h1>What do you need help with?</h1>
    <p>Your guide to mastering BevSpot — ask any question about inventory, COGS, sales variance, or profit analysis.</p>
  </div>
</header>

<div class="container">
  <div class="search-section">
    <div class="search-box">
      <textarea id="questionInput" rows="1" placeholder="e.g. How do I fix a $0 cost item in my inventory?"></textarea>
      <button class="mic-btn" id="micBtn" onclick="toggleMic()" title="Speak your question">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
      </button>
      <button class="search-btn" id="askBtn" onclick="askQuestion()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
    </div>
    <div class="quick-questions">
      <button class="quick-q" onclick="fillQuestion(this)">How do I fix $0 cost items?</button>
      <button class="quick-q" onclick="fillQuestion(this)">What causes high usage errors?</button>
      <button class="quick-q" onclick="fillQuestion(this)">How do I map sales items?</button>
      <button class="quick-q" onclick="fillQuestion(this)">What does a red flag mean?</button>
      <button class="quick-q" onclick="fillQuestion(this)">How do I run a sales variance report?</button>
    </div>
  </div>

  <div class="answer-section" id="answerSection">
    <div class="topics-grid" id="topicsGrid">
      <div class="topic-card" onclick="fillQuestion(this)" data-q="How do I identify and fix non-categorized items?">
        <div class="topic-icon">🏷️</div>
        <h3>Item Categorization</h3>
        <p>Fix miscategorized items so your category totals are accurate.</p>
      </div>
      <div class="topic-card" onclick="fillQuestion(this)" data-q="How do I find and correct $0 cost items in inventory?">
        <div class="topic-icon">💲</div>
        <h3>$0 Cost Items</h3>
        <p>Find items with missing costs that deflate your inventory value.</p>
      </div>
      <div class="topic-card" onclick="fillQuestion(this)" data-q="How do I identify erroneous high usage in BevSpot?">
        <div class="topic-icon">📊</div>
        <h3>Usage Errors</h3>
        <p>Spot miscounts and delivery errors that distort usage data.</p>
      </div>
      <div class="topic-card" onclick="fillQuestion(this)" data-q="How do I use the COGS report and fix flagged items?">
        <div class="topic-icon">📋</div>
        <h3>COGS Report</h3>
        <p>Review cost of goods sold and resolve flagged item discrepancies.</p>
      </div>
      <div class="topic-card" onclick="fillQuestion(this)" data-q="How do I run and analyze a sales variance report?">
        <div class="topic-icon">📈</div>
        <h3>Sales Variance</h3>
        <p>Run reports, map POS items, and investigate variance thresholds.</p>
      </div>
      <div class="topic-card" onclick="fillQuestion(this)" data-q="How do I use the profit report to improve menu performance?">
        <div class="topic-icon">💰</div>
        <h3>Profit Analysis</h3>
        <p>Identify top performers and optimize your menu for profitability.</p>
      </div>
    </div>
  </div>

  <footer>An educational resource for <span>Troon Golf</span> — powered by BevSpot</footer>
</div>

<script>
const textarea = document.getElementById('questionInput');
const askBtn = document.getElementById('askBtn');
const micBtn = document.getElementById('micBtn');

// ── Speech Recognition ──
let recognition = null;
let isListening = false;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = 0; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    textarea.value = transcript;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 160) + 'px';

    if (event.results[0].isFinal) {
      stopMic();
      askQuestion();
    }
  };

  recognition.onerror = () => { stopMic(); };
  recognition.onend = () => { stopMic(); };
} else {
  micBtn.style.display = 'none';
}

function toggleMic() {
  if (isListening) { stopMic(); } else { startMic(); }
}

function startMic() {
  if (!recognition) return;
  isListening = true;
  micBtn.classList.add('listening');
  textarea.placeholder = 'Listening...';
  textarea.value = '';
  recognition.start();
}

function stopMic() {
  if (!recognition) return;
  isListening = false;
  micBtn.classList.remove('listening');
  textarea.placeholder = 'e.g. How do I fix a $0 cost item in my inventory?';
  try { recognition.stop(); } catch(e) {}
}

textarea.addEventListener('input', () => {
  textarea.style.height = 'auto';
  textarea.style.height = Math.min(textarea.scrollHeight, 160) + 'px';
});

textarea.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); askQuestion(); }
});

function fillQuestion(el) {
  const q = el.dataset?.q || el.textContent;
  textarea.value = q;
  textarea.style.height = 'auto';
  textarea.style.height = Math.min(textarea.scrollHeight, 160) + 'px';
  askQuestion();
}

async function askQuestion() {
  const question = textarea.value.trim();
  if (!question) return;

  askBtn.disabled = true;
  const section = document.getElementById('answerSection');
  const grid = document.getElementById('topicsGrid');
  if (grid) grid.style.display = 'none';

  section.innerHTML = '<div class="answer-card"><div class="answer-header"><span class="dot"></span> Finding your answer</div><div class="loading"><div class="loading-dots"><span></span><span></span><span></span></div>Searching the BevSpot guides...</div></div>';

  try {
    const response = await fetch('/.netlify/functions/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error);

    const answer = data.answer || 'No answer was returned. Please try again.';
    const sources = [];
    const lower = answer.toLowerCase();
    if (lower.includes('inventory') || lower.includes('cogs') || lower.includes('usage') || lower.includes('flag') || lower.includes('categoriz')) sources.push('Inventory & COGS Auditing Guide');
    if (lower.includes('variance') || lower.includes('mapping') || lower.includes('profit') || lower.includes('pos') || lower.includes('sales')) sources.push('Sales Variance Analysis Guide');
    const sourceTags = sources.map(s => '<span class="source-tag">📄 ' + s + '</span>').join(' ');

    section.innerHTML = '<div class="answer-card"><div class="answer-header"><span class="dot"></span> Answer</div><div class="answer-body">' + answer + (sourceTags ? '<div style="margin-top:18px">' + sourceTags + '</div>' : '') + '</div></div>';
  } catch (err) {
    section.innerHTML = '<div class="answer-card"><div class="answer-header"><span class="dot" style="background:var(--red)"></span> Error</div><div class="answer-body"><p>Sorry, something went wrong while fetching your answer. Please try again.</p><p><em>' + err.message + '</em></p></div></div>';
  }
  askBtn.disabled = false;
}
</script>
</body>
</html>
