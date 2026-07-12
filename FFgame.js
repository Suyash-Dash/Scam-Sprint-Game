/* ============================================================
   Scam Sprint Ultimate Arcade V16.6 — FFgame.js
   Purpose: complete preserved game engine plus additive mobile, profile, save, demo,
   leaderboard, ready-gate, accessibility, and minigame reliability upgrades.
   ============================================================ */

(() => {
  "use strict";

  /* ============================================================
     01) Data, DOM Shortcuts, and Main State
     ============================================================ */
  const DATA = window.FF_SCAM_ARCADE_DATA;
  const ROUNDS = DATA.rounds;
  const BOSS_BANK = DATA.bossBank || [];
  const app = document.getElementById("app");

  const state = {
    playerMode: "family",
    deviceMode: "auto",
    difficulty: "medium",
    selected: [],
    idx: 0,
    current: null,
    score: 0,
    correct: 0,
    mistakes: 0,
    streak: 0,
    bestStreak: 0,
    trust: 100,
    fraudster: 28,
    answered: false,
    transitioning: false,
    timer: null,
    anim: null,
    timeLeft: 100,
    cleanup: [],
    powerups: { iris: 3, freeze: 1, shield: 1 },
    soundOn: localStorage.ffV10Sound !== "off",
    audio: null,
    step: 0,
    selectedSet: new Set(),
    starCount: 0,
    platform: null,
    boss: null,
    tiltX: 0,
    money: 0,
    lessons: [],
    practiceMode: false
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  /* ============================================================
     02) Utility Helpers
     ============================================================ */
  function esc(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function clamp(number, min, max) {
    return Math.max(min, Math.min(max, number));
  }

  function shuffle(items) {
    const output = [...items];
    for (let i = output.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [output[i], output[j]] = [output[j], output[i]];
    }
    return output;
  }

  function sample(items, count) {
    return shuffle(items).slice(0, Math.min(count, items.length));
  }

  function getBestScore() {
    return Number(localStorage.ffV10Best || 0);
  }

  function saveBestScore(score) {
    const best = Math.max(score, getBestScore());
    localStorage.ffV10Best = String(best);
    return best;
  }

  function addCleanup(fn) {
    state.cleanup.push(fn);
  }

  function on(target, type, handler, options) {
    if (!target) return;
    target.addEventListener(type, handler, options);
    addCleanup(() => target.removeEventListener(type, handler, options));
  }

  function clearLoops() {
    if (state.timer) clearInterval(state.timer);
    if (state.anim) cancelAnimationFrame(state.anim);
    state.timer = null;
    state.anim = null;
    state.cleanup.forEach((fn) => {
      try { fn(); } catch { /* ignore cleanup failures */ }
    });
    state.cleanup = [];
  }

  function render(html) {
    app.innerHTML = html;
    document.body.classList.toggle("senior-mode", state.playerMode === "senior");
    document.body.classList.toggle("touch-mode", state.deviceMode === "touch" || state.deviceMode === "motion" || (state.deviceMode === "auto" && matchMedia("(pointer: coarse)").matches));
    app.focus({ preventScroll: true });
  }

  function toast(message) {
    let stack = $(".toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "toast-stack";
      document.body.appendChild(stack);
    }
    const node = document.createElement("div");
    node.className = "toast";
    node.textContent = message;
    stack.appendChild(node);
    setTimeout(() => node.remove(), 2200);
  }

  function shake() {
    document.body.classList.add("shake");
    setTimeout(() => document.body.classList.remove("shake"), 260);
  }

  /* ============================================================
     03) Sound Effects — Web Audio, No External Files Needed
     ============================================================ */
  function ensureAudio() {
    if (!state.audio) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return null;
      state.audio = new AudioContext();
    }
    if (state.audio.state === "suspended") state.audio.resume();
    return state.audio;
  }

  function sfx(name) {
    if (!state.soundOn) return;
    const ctx = ensureAudio();
    if (!ctx) return;

    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.10, now + 0.01);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
    master.connect(ctx.destination);

    const tones = {
      click: [420, 0.06, "square"],
      correct: [740, 0.16, "sine", 920],
      wrong: [170, 0.22, "sawtooth", 120],
      power: [520, 0.18, "triangle", 760],
      jump: [360, 0.12, "square", 500],
      coin: [900, 0.15, "sine", 1200],
      boss: [90, 0.26, "sawtooth", 150],
      win: [660, 0.28, "triangle", 880],
      toggle: [520, 0.09, "sine"]
    };
    const [freq, dur, type, endFreq] = tones[name] || tones.click;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (endFreq) osc.frequency.exponentialRampToValueAtTime(endFreq, now + dur);
    osc.connect(master);
    osc.start(now);
    osc.stop(now + dur);
  }

  function toggleSound() {
    state.soundOn = !state.soundOn;
    localStorage.ffV10Sound = state.soundOn ? "on" : "off";
    ensureAudio();
    sfx("toggle");
    updateSoundButton();
    toast(state.soundOn ? "Sound effects on." : "Sound effects off.");
  }

  function updateSoundButton() {
    const button = $("#soundBtn");
    if (!button) return;
    button.textContent = state.soundOn ? "🔊" : "🔇";
    button.title = state.soundOn ? "Sound on" : "Sound off";
    button.classList.toggle("sound-on", state.soundOn);
    button.classList.toggle("sound-off", !state.soundOn);
  }

  /* ============================================================
     04) Shared UI Builders
     ============================================================ */
  function topbar() {
    return `
      <div class="topbar">
        <div class="topbar-left">
          <div class="logo-mark">FF</div>
          <div class="logo-copy">
            <strong>${esc(DATA.site.gameName)}</strong>
            <small>${esc(DATA.site.tagline)}</small>
          </div>
        </div>
        <div class="topbar-actions">
          <button class="icon-btn ${state.soundOn ? "sound-on" : "sound-off"}" id="soundBtn" title="Toggle sound">${state.soundOn ? "🔊" : "🔇"}</button>
          <button class="icon-btn" id="homeBtn" title="Home">⌂</button>
        </div>
      </div>
    `;
  }

  function wireTopbar() {
    on($("#homeBtn"), "click", showHome);
    on($("#soundBtn"), "click", toggleSound);
    updateSoundButton();
  }

  function meterRow(label, value, className, id = "") {
    return `
      <div class="bar-row">
        <label>${esc(label)}</label>
        <div class="meter ${className}">
          <span ${id ? `id="${id}"` : ""} style="width:${clamp(value, 0, 100)}%"></span>
        </div>
        <span class="bar-value">${Math.round(value)}%</span>
      </div>
    `;
  }

  function hud() {
    const progress = clamp(Math.round((state.idx / Math.max(1, state.selected.length)) * 100), 0, 100);
    return `
      <div class="hud">
        <div class="hud-bars">
          ${meterRow("Round Progress", progress, "meter-progress")}
          ${state.playerMode === "senior" ? "" : meterRow("Timer", state.timeLeft, "meter-time", "timeBar")}
          ${meterRow("Trust Shield", state.trust, "meter-good", "trustBar")}
          ${meterRow("Fraudster Pressure", state.fraudster, "meter-danger", "fraudBar")}
        </div>
        <div class="hud-stats">
          <div class="stat-pill">Score <strong>${state.score}</strong></div>
          <div class="stat-pill">Combo <strong>${state.streak}</strong></div>
          <div class="stat-pill">Mistakes <strong>${state.mistakes}</strong></div>
        </div>
      </div>
    `;
  }

  function updateBars() {
    if ($("#trustBar")) $("#trustBar").style.width = `${state.trust}%`;
    if ($("#fraudBar")) $("#fraudBar").style.width = `${state.fraudster}%`;
  }


  /* ============================================================
     04B) Context-Specific Iris Hints and Verification Reasoning
     ============================================================ */
  function reasonBank(round) {
    const category = String(round.category || "").toLowerCase();
    let correct = "Pressure, secrecy, links, codes, or payment requests require independent verification.";

    if (category.includes("bank")) correct = "Use the official bank app/site/number instead of a surprise link, caller, or code request.";
    else if (category.includes("voice") || category.includes("deepfake")) correct = "A familiar voice is not proof; verify through a saved number or another trusted contact.";
    else if (category.includes("business") || category.includes("gift card")) correct = "Money or gift-card requests need a normal approval workflow, not secrecy or urgency.";
    else if (category.includes("marketplace")) correct = "Marketplace money should wait until payment officially clears, with no off-platform refund pressure.";
    else if (category.includes("health") || category.includes("medicare")) correct = "Sensitive health, Medicare, or SSN requests should be checked through official sources.";
    else if (category.includes("university") || category.includes("student") || category.includes("school")) correct = "Use the official school portal instead of lookalike login or scholarship pages.";
    else if (category.includes("malware") || category.includes("streaming") || category.includes("tech support") || category.includes("remote")) correct = "Unexpected downloads, support tools, or antivirus-disabling requests can install malware.";
    else if (category.includes("romance")) correct = "Money, secrecy, travel fees, crypto, or gift cards are romance-scam warning signs.";
    else if (category.includes("package")) correct = "Tiny delivery fees through unknown links can steal card details.";
    else if (category.includes("charity")) correct = "Donate only after independent charity verification; avoid pressure and crypto-only pages.";
    else if (category.includes("rental")) correct = "No tour plus upfront payment is risky; verify the property and owner first.";
    else if (category.includes("qr")) correct = "Random QR stickers can lead to fake payment pages; use the official app or website.";
    else if (category.includes("government")) correct = "Government requests should be checked on official government sites, not urgent lookalike pages.";
    else if (category.includes("gaming")) correct = "Free reward links can steal game accounts; report the spammer instead of logging in.";

    const decoys = shuffle([
      "It looks professional, so the message is probably safe.",
      "The urgent deadline means you should act before checking.",
      "A logo or friendly design is enough proof.",
      "The safest move is to reply so the sender can explain.",
      "Small payments are always harmless.",
      "If the sender sounds confident, the request is probably real."
    ]).slice(0, 3);

    return shuffle([[correct, true], ...decoys.map((d) => [d, false])]);
  }

  function clueFromCorrectOption(round) {
    const correct = (round.options || []).find((option) => option[1]);
    if (!correct) return "Look for the option that verifies independently instead of reacting inside the suspicious message.";
    const label = String(correct[0]);
    if (/official|app|portal|known|saved|trusted|verify|separately|close|leave|deny|report|block|wait/i.test(label)) {
      return `The safe action is the one that uses independent verification: “${label}.”`;
    }
    return "The safe action avoids secrecy, surprise payments, code sharing, and unknown downloads.";
  }

  function getBossHint() {
    const phase = state.boss?.phase;
    if (!phase) return { title: "Iris Boss Hint", steps: ["Read the boss tactic first.", "The safe move usually verifies, denies, reports, deletes, or pays $0."] };
    if (phase.type === "choice") return { title: "Iris Boss Hint", steps: ["Pick the action that moves outside the scammer's channel.", "Avoid links, codes, gift cards, secrecy, and rushed payments."] };
    if (phase.type === "domain") return { title: "Iris Boss Hint", steps: ["Compare the whole domain, not just the first word.", "The correct one avoids extra words like verify, prize, reset, fast, or help."] };
    if (phase.type === "chat") return { title: "Iris Boss Hint", steps: ["Select the player who posted the suspicious link or code request.", "Then use report/mute, not add friend or open link."] };
    if (phase.type === "romance") return { title: "Iris Boss Hint", steps: ["Scam signs: quick love, money, crypto, travel fee, gift cards, secrecy, or refusing video calls.", "Looks OK only when there is no pressure, no money request, and respectful verification."] };
    if (phase.type === "file") return { title: "Iris Boss Hint", steps: ["Risky files often end in .exe, .scr, .zip, or macro-enabled files.", "Safe decoys are normal notes, images, or PDFs unless the task says otherwise."] };
    if (phase.type === "mfa") return { title: "Iris Boss Hint", steps: ["Approve MFA only when you personally started the login.", "Surprise prompts from another location should be denied."] };
    if (phase.type === "amount") return { title: "Iris Boss Hint", steps: ["Scammer-requested payments should be $0.", "Only independently verified, normal transactions should have a nonzero amount."] };
    if (phase.type === "flags") return { title: "Iris Boss Hint", steps: ["Choose only evidence, not decoration.", "Real red flags usually involve payment method, domain, secrecy, urgency, or credential requests."] };
    if (phase.type === "sequence") return { title: "Iris Boss Hint", steps: ["Build the safe response in order: pause, verify through a known channel, then report/block or document.", "Do not put payment, code sharing, or secrecy anywhere in the sequence."] };
    if (phase.type === "tokens") return { title: "Iris Boss Hint", steps: ["Select every real warning sign, then submit.", "Ignore neutral details like colors, icons, or normal photos."] };
    return { title: "Iris Boss Hint", steps: ["Verify independently and avoid pressure."] };
  }

  function getContextHint(round) {
    const type = round?.type;
    if (type === "bossRush") return getBossHint();
    if (type === "safeChoice" || type === "deepfakeCall") {
      return { title: `Iris Hint: ${round.title}`, steps: [clueFromCorrectOption(round), "Also choose the reason that explains the scam signal, not the reason that only mentions how the message looks."] };
    }
    if (type === "dangerWebsite") {
      return { title: `Iris Hint: ${round.title}`, steps: ["Check the URL, the requested data, and the pressure language.", clueFromCorrectOption(round)] };
    }
    if (type === "siteInspector") {
      return { title: "Iris Site Inspector Hint", steps: ["Click evidence-based red flags only.", "Look for the domain trick, urgency, unsafe payment, credential request, or missing real organization info."] };
    }
    if (type === "romanceSwipe") {
      return { title: "Iris Romance Hint", steps: ["Swipe scam for money, gift cards, crypto, secrecy, package forwarding, quick love, or refusing verification.", "Swipe OK only for respectful behavior with no money, no links, and normal public/video verification."] };
    }
    if (type === "marketplaceMatch") {
      return { title: "Iris Marketplace Hint", steps: ["Reject overpayment, off-platform links, fake shipping, urgent refunds, or payment-before-clearance pressure.", "Looks OK when the buyer stays on-platform and does not pressure you."] };
    }
    if (type === "attachmentFlash") {
      return { title: "Iris File Memory Hint", steps: ["During study time, memorize safe everyday files like PDF, PNG/JPG, or TXT.", "Avoid executable, script, macro, and surprise tool files when they flip over."] };
    }
    if (type === "fileDelete") {
      return { title: "Iris File Cleanup Hint", steps: ["Delete risky downloads only: .exe, .scr, suspicious .zip, fake bank login archives, or macro forms.", "Do not delete normal photos, notes, or meeting PDFs unless the prompt marks them risky."] };
    }
    if (type === "gameChatReport") {
      return { title: "Iris Game Chat Hint", steps: ["Select the player who posted the scam link, free reward, password/code request, or off-platform pressure.", "Use Mute + Report. Opening the link is the trap."] };
    }
    if (type === "platformHints") {
      return { title: "Iris Platform Hint", steps: ["Collect all three stars; the counter only increases when the character touches each star.", "Use ←/→ or A/D to move, Space/Jump to climb, and avoid scam spikes."] };
    }
    if (type === "popupPurge") {
      return { title: "Iris Pop-Up Hint", steps: ["Click only the real X in each pop-up title bar.", "Do not click Continue, Scan, Claim, or other action buttons inside the ad."] };
    }
    if (type === "passwordFill") {
      return { title: "Iris Password Hint", steps: ["Fill a password only on the exact official domain.", "Lookalike domains with verify, reset, prize, or extra words are traps."] };
    }
    if (type === "qrScan") {
      return { title: "Iris QR Hint", steps: ["Choose the QR result that leads to a known official destination.", "Random stickers, short links, and payment pages asking for bank login are risky."] };
    }
    if (type === "mfaShield") {
      return { title: "Iris MFA Hint", steps: ["Approve only the MFA prompt you personally started.", "Deny surprise prompts, unfamiliar locations, and repeated push spam."] };
    }
    if (type === "permissionToggle") {
      return { title: "Iris Permission Hint", steps: ["Turn on only permissions that match the app's purpose.", "Deny contacts, camera, location, or files when the app does not need them."] };
    }
    if (type === "moneyGuard") {
      return { title: "Iris Money Hint", steps: ["Scam pressure should usually receive $0.", "Use the + and - buttons to match only the verified safe amount."] };
    }
    return { title: "Iris Hint", steps: ["Pause, verify independently, and avoid pressure."] };
  }

  function showHintPanel(hint) {
    const host = $("#feedbackHost") || $("#microgame");
    if (!host) return;
    const old = $(".hint-panel", host);
    if (old) old.remove();
    host.insertAdjacentHTML("afterbegin", `
      <div class="hint-panel" role="status">
        <strong>🔍 ${esc(hint.title || "Iris Hint")}</strong>
        <ul>${(hint.steps || []).map((step) => `<li>${esc(step)}</li>`).join("")}</ul>
      </div>
    `);
  }

  function powerups() {
    return `
      <div class="powerup-row">
        <button class="powerup-btn" data-power="iris" ${state.powerups.iris <= 0 ? "disabled" : ""}>🔍 Iris Hint (${state.powerups.iris})</button>
        <button class="powerup-btn" data-power="freeze" ${state.powerups.freeze <= 0 || state.playerMode === "senior" ? "disabled" : ""}>🧊 Freeze (${state.powerups.freeze})</button>
        <button class="powerup-btn" data-power="shield" ${state.powerups.shield <= 0 ? "disabled" : ""}>🛡️ Shield (${state.powerups.shield})</button>
      </div>
    `;
  }

  function wirePowerups() {
    $$('[data-power]').forEach((button) => {
      on(button, "click", () => {
        const power = button.dataset.power;
        if (state.powerups[power] <= 0 || state.answered) return;
        sfx("power");

        if (power === "iris") {
          state.powerups.iris -= 1;
          showHintPanel(getContextHint(state.current));
          toast("Iris gave a challenge-specific clue.");
        }

        if (power === "freeze") {
          state.powerups.freeze -= 1;
          if (state.timer) clearInterval(state.timer);
          state.timer = null;
          toast("Timer frozen for this round.");
        }

        if (power === "shield") {
          state.powerups.shield -= 1;
          state.trust = clamp(state.trust + 18, 0, 100);
          updateBars();
          toast("Shield boosted your trust meter.");
        }

        const row = $(".powerup-row");
        if (row) {
          row.outerHTML = powerups();
          wirePowerups();
        }
      });
    });
  }

  /* ============================================================
     05) Home, How-To, Library, Setup Screens
     ============================================================ */
  function showHome() {
    clearLoops();
    render(`
      <section class="screen">
        ${topbar()}
        <div class="panel home-grid">
          <div>
            <span class="eyebrow">FraudFront awareness arcade</span>
            <h1><span class="home-title-accent">Scam Sprint</span><br>Microgames against The Fraudster.</h1>
            <p>A fast scam-safety arcade with sound effects, mock websites, marketplace choices, romance scam swipes, game chat reporting, file cleanup, QR checks, MFA prompts, permission toggles, and a randomized boss fight.</p>
            <p>Every run is randomized and mobile-friendly, with cleaner layouts and fixed movement minigames.</p>
            <div class="button-row">
              <button class="btn btn-primary" id="startBtn">Start Arcade Run</button>
              <button class="btn btn-secondary" id="howBtn">How to Play</button>
              <button class="btn btn-secondary" id="libraryBtn">View Full Library</button>
            </div>
            <div class="stats-strip">
              <div><strong>${DATA.site.totalPlayableRounds}</strong><span>playable rounds</span></div>
              <div><strong>${DATA.site.totalMechanics}</strong><span>mechanics</span></div>
              <div><strong>${DATA.site.arcadeRoundsBeforeBoss}</strong><span>random + boss</span></div>
              <div><strong>${getBestScore()}</strong><span>best score</span></div>
            </div>
          </div>
          <div class="fraudster-stage" aria-hidden="true">
            <div class="fraudster-face"><span class="eye"></span><span class="eye-right"></span><span class="mouth"></span></div>
            <div class="hero-card-label"><span class="chip chip-hot">Fraudster pressure rising</span><div class="meter meter-danger"><span style="width:72%"></span></div></div>
          </div>
        </div>
      </section>
    `);
    wireTopbar();
    on($("#startBtn"), "click", showSetup);
    on($("#howBtn"), "click", showHow);
    on($("#libraryBtn"), "click", showLibrary);
  }

  function showHow() {
    const mechanics = [
      "Safe choice", "Mock website escape", "Website red-flag inspector", "Romance swipe", "Marketplace match", "Attachment flash memory", "Risky file cleanup", "Game chat report", "Moving hint platformer", "Pop-up purge", "Password manager domain check", "QR lens", "MFA shield", "Permission toggles", "Money guard", "Deepfake verification", "Randomized boss fight"
    ];
    render(`
      <section class="screen">
        ${topbar()}
        <div class="panel">
          <span class="eyebrow">How to play</span>
          <h2>Every run randomly mixes fast scam-defense microgames before the boss.</h2>
          <p>Use the command banner at the top of each round. The buttons, keyboard, and mobile controls are all supported where needed.</p>
          <div class="library-grid">
            ${mechanics.map((m, i) => `<div class="library-card"><strong>${i + 1}. ${esc(m)}</strong><small>Built to be quick, educational, and harder to memorize.</small></div>`).join("")}
          </div>
          <div class="button-row"><button class="btn" id="backBtn">Back</button><button class="btn btn-primary" id="startBtn">Start</button></div>
        </div>
      </section>
    `);
    wireTopbar();
    on($("#motionEnableBtn"), "click", async () => {
      const enabled = await v16EnableMotionControls();
      if (enabled) {
        const motion = $('input[name="deviceMode"][value="motion"]');
        if (motion) motion.checked = true;
      }
    });
    on($("#motionCalibrateBtn"), "click", v16CalibrateTilt);
    on($("#backBtn"), "click", showHome);
    on($("#startBtn"), "click", showSetup);
  }

  function showLibrary() {
    const typeNames = {
      safeChoice: "Verification Decisions",
      dangerWebsite: "Mock Website Escapes",
      siteInspector: "Website Red-Flag Inspections",
      romanceSwipe: "Romance Swipe Scenarios",
      marketplaceMatch: "Marketplace Matchups",
      attachmentFlash: "Attachment Memory",
      fileDelete: "Risky File Cleanup",
      gameChatReport: "Game Chat Reporting",
      platformHints: "Movement Challenges",
      popupPurge: "Pop-Up Purge",
      passwordFill: "Password Manager Checks",
      qrScan: "QR Safety Lens",
      mfaShield: "MFA Decisions",
      permissionToggle: "Permission Audits",
      moneyGuard: "Money Guard",
      deepfakeCall: "Voice / Deepfake Verification",
      bossRush: "Final Boss"
    };
    const groups = ROUNDS.reduce((acc, round, index) => {
      const key = typeNames[round.type] || round.type;
      if (!acc[key]) acc[key] = [];
      acc[key].push({ round, index });
      return acc;
    }, {});

    render(`
      <section class="screen library-screen">
        ${topbar()}
        <div class="panel library-panel">
          <div class="library-hero">
            <div>
              <span class="eyebrow">Full game library</span>
              <h2>${ROUNDS.length} playable challenges, organized by mode.</h2>
              <p>Each card now has an Enter Challenge button, so the library is no longer just side-by-side blocks. Use it to test a single round or start a full randomized run.</p>
            </div>
            <div class="library-actions">
              <button class="btn" id="backBtn">Back</button>
              <button class="btn btn-primary" id="startBtn">Start Full Run</button>
            </div>
          </div>
          <div class="library-list">
            ${Object.entries(groups).map(([group, items]) => `
              <section class="library-section">
                <h3>${esc(group)}</h3>
                <div class="library-stack">
                  ${items.map(({ round, index }) => `
                    <article class="library-card library-row-card">
                      <div>
                        <strong>${index + 1}. ${esc(round.title)}</strong>
                        <small>${esc(round.category)} · ${esc(round.difficulty)} · ${esc(round.command)}<br>${esc(round.directions || "")}</small>
                      </div>
                      <button class="btn btn-secondary btn-small" data-practice-index="${index}">Enter Challenge</button>
                    </article>`).join("")}
                </div>
              </section>`).join("")}
          </div>
          <div class="button-row"><button class="btn" id="backBottomBtn">Back</button><button class="btn btn-primary" id="startBottomBtn">Start Full Run</button></div>
        </div>
      </section>
    `);
    wireTopbar();
    on($("#motionEnableBtn"), "click", async () => {
      const enabled = await v16EnableMotionControls();
      if (enabled) {
        const motion = $('input[name="deviceMode"][value="motion"]');
        if (motion) motion.checked = true;
      }
    });
    on($("#motionCalibrateBtn"), "click", v16CalibrateTilt);
    on($("#backBtn"), "click", showHome);
    on($("#backBottomBtn"), "click", showHome);
    on($("#startBtn"), "click", showSetup);
    on($("#startBottomBtn"), "click", showSetup);
    $$('[data-practice-index]').forEach((button) => on(button, "click", () => startPractice(Number(button.dataset.practiceIndex))));
  }

  function audienceCard(group, value, icon, title, copy) {
    return `<button class="choice-card ${state[group] === value ? "selected" : ""}" data-set="${group}" data-value="${value}"><span class="big">${icon}</span><strong>${esc(title)}</strong><small>${esc(copy)}</small></button>`;
  }

  function radio(group, value, label) {
    return `<label class="segment"><input type="radio" name="${group}" value="${value}" ${state[group] === value ? "checked" : ""}><span>${esc(label)}</span></label>`;
  }

  function showSetup() {
    render(`
      <section class="screen">
        ${topbar()}
        <div class="panel">
          <span class="eyebrow">Arcade settings</span>
          <h2>Choose audience, difficulty, controls, and sound.</h2>
          <p>Each run plays ${DATA.site.arcadeRoundsBeforeBoss} random rounds, then a stronger randomized boss fight.</p>
          <h3>Audience</h3>
          <div class="card-grid">
            ${audienceCard("playerMode", "family", "👪", "Family Mode", "For adult children/caregivers.")}
            ${audienceCard("playerMode", "self", "🛡️", "Self-Protection", "For anyone protecting themselves.")}
            ${audienceCard("playerMode", "senior", "🏛️", "Senior Center", "Larger text and relaxed pacing.")}
          </div>
          <h3>Difficulty</h3>
          <div class="segment-row">${radio("difficulty", "easy", "Easy")}${radio("difficulty", "medium", "Medium")}${radio("difficulty", "hard", "Hard")}</div>
          <h3>Controls</h3>
          <div class="segment-row">${radio("deviceMode", "auto", "Auto")}${radio("deviceMode", "desktop", "Computer")}${radio("deviceMode", "touch", "Mobile / Touch")}${radio("deviceMode", "motion", "Motion Tilt")}</div><div class="motion-control-help"><span>📐 Motion Tilt may ask for phone permission. Touch controls always remain available.</span><div class="motion-control-actions"><button class="btn btn-primary btn-small" id="motionEnableBtn" type="button">Enable Motion Tilt</button><button class="btn btn-secondary btn-small" id="motionCalibrateBtn" type="button">Calibrate Tilt</button></div></div>
          <div class="button-row"><button class="btn" id="backBtn">Back</button><button class="btn btn-primary" id="beginBtn">Begin Arcade Run</button></div>
        </div>
      </section>
    `);
    wireTopbar();
    $$('[data-set]').forEach((button) => on(button, "click", () => { state[button.dataset.set] = button.dataset.value; showSetup(); }));
    $$('input[type="radio"]').forEach((input) => on(input, "change", async () => {
      if (input.name === "deviceMode" && input.value === "motion") {
        const enabled = await v16EnableMotionControls();
        if (!enabled) {
          const touch = $('input[name="deviceMode"][value="touch"]');
          if (touch) touch.checked = true;
        }
      } else {
        state[input.name] = input.value;
      }
    }));
    on($("#motionEnableBtn"), "click", async () => {
      const enabled = await v16EnableMotionControls();
      if (enabled) {
        const motion = $('input[name="deviceMode"][value="motion"]');
        if (motion) motion.checked = true;
      }
    });
    on($("#motionCalibrateBtn"), "click", v16CalibrateTilt);
    on($("#backBtn"), "click", showHome);
    on($("#beginBtn"), "click", startGame);
  }

  /* ============================================================
     06) Run Selection, Round Rendering, Timer, Pass/Fail
     ============================================================ */
  function startGame() {
    clearLoops();
    ensureAudio();
    Object.assign(state, {
      selected: [], idx: 0, score: 0, correct: 0, mistakes: 0, streak: 0, bestStreak: 0,
      trust: 100, fraudster: 28, powerups: { iris: 3, freeze: 1, shield: 1 }, boss: null, lessons: [], practiceMode: false
    });

    const boss = ROUNDS.find((round) => round.type === "bossRush");
    const pool = ROUNDS.filter((round) => round.type !== "bossRush");
    const easy = pool.filter((round) => round.difficulty === "easy");
    const medium = pool.filter((round) => round.difficulty === "medium");
    const hard = pool.filter((round) => round.difficulty === "hard");

    let selectedPool;
    if (state.difficulty === "easy") {
      selectedPool = [...sample(easy, 11), ...sample(medium, 10), ...sample(hard, 3)];
    } else if (state.difficulty === "hard") {
      selectedPool = [...sample(easy, 2), ...sample(medium, 8), ...sample(hard, 14)];
    } else {
      selectedPool = [...sample(easy, 5), ...sample(medium, 13), ...sample(hard, 6)];
    }

    state.selected = shuffle(selectedPool).slice(0, DATA.site.arcadeRoundsBeforeBoss);
    if (boss) state.selected.push(boss);
    renderRound();
  }


  function startPractice(index) {
    clearLoops();
    ensureAudio();
    const round = ROUNDS[index];
    if (!round) return showLibrary();
    Object.assign(state, {
      selected: [round], idx: 0, score: 0, correct: 0, mistakes: 0, streak: 0, bestStreak: 0,
      trust: 100, fraudster: 28, powerups: { iris: 3, freeze: 1, shield: 1 }, boss: null, lessons: [], practiceMode: true
    });
    renderRound();
  }

  function resetMicroState() {
    state.step = 0;
    state.selectedSet = new Set();
    state.starCount = 0;
    state.platform = null;
    state.money = 0;
    if (state.current?.type !== "bossRush") state.boss = null;
  }

  function renderRound() {
    clearLoops();
    state.answered = false;
    state.transitioning = false;
    state.timeLeft = 100;
    state.current = state.selected[state.idx];
    resetMicroState();
    const round = state.current;

    render(`
      <section class="screen">
        ${topbar()}
        ${hud()}
        <div class="panel round-panel">
          <div>
            <div class="round-header"><span class="chip chip-hot">${esc(round.category)}</span><span class="chip chip-cool">${esc(round.type)}</span><span class="chip chip-gold">${esc(round.difficulty)}</span></div>
            <h2>${esc(round.title)}</h2>
            <div class="command-banner"><span>${esc(round.command)}</span><small>${esc(round.directions || "Follow the command before time runs out.")}</small></div>
            <div id="microgame" class="microgame-zone">${drawRound(round)}</div>
          </div>
          <div>${powerups()}<div id="feedbackHost"></div></div>
        </div>
      </section>
    `);

    wireTopbar();
    wirePowerups();
    wireRound(round);
    startTimer(round);
  }

  function secondsFor(round) {
    if (state.playerMode === "senior") return 999;
    let seconds = round.seconds || 12;
    if (state.difficulty === "easy") seconds *= 1.18;
    if (state.difficulty === "hard") seconds *= 0.90;
    if (round.type === "bossRush") seconds = Math.max(seconds, 70);
    return Math.max(7, Math.round(seconds));
  }

  function startTimer(round) {
    if (state.playerMode === "senior") return;
    const total = secondsFor(round);
    const start = Date.now();
    state.timer = setInterval(() => {
      if (state.answered) return;
      const elapsed = (Date.now() - start) / 1000;
      state.timeLeft = clamp(100 - (elapsed / total) * 100, 0, 100);
      const bar = $("#timeBar");
      if (bar) bar.style.width = `${state.timeLeft}%`;
      if (state.timeLeft <= 0) failRound("Time ran out.");
    }, 100);
  }

  function passRound(headline) {
    if (state.answered) return;
    state.answered = true;
    clearLoops();
    sfx(state.current?.type === "bossRush" ? "win" : "correct");
    const gain = 100 + (state.playerMode === "senior" ? 0 : Math.round(state.timeLeft / 4)) + clamp(state.streak * 5, 0, 45) + (state.difficulty === "hard" ? 40 : state.difficulty === "medium" ? 22 : 10);
    state.score += gain;
    state.correct += 1;
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    state.trust = clamp(state.trust + 4, 0, 100);
    state.fraudster = clamp(state.fraudster - 7, 0, 100);
    showFeedback(true, headline, state.current.lesson, `+${gain} points`);
  }

  function failRound(headline) {
    if (state.answered) return;
    state.answered = true;
    clearLoops();
    sfx("wrong");
    state.mistakes += 1;
    state.streak = 0;

    if (state.powerups.shield > 0) {
      state.powerups.shield -= 1;
      state.trust = clamp(state.trust - 5, 0, 100);
      toast("Scam Shield absorbed some damage.");
    } else {
      state.trust = clamp(state.trust - (state.difficulty === "hard" ? 20 : 14), 0, 100);
      state.fraudster = clamp(state.fraudster + 14, 0, 100);
    }

    shake();
    showFeedback(false, headline, state.current.lesson, "Trust shield damaged");
  }

  function minorPenalty(message) {
    sfx("wrong");
    state.trust = clamp(state.trust - 4, 0, 100);
    state.fraudster = clamp(state.fraudster + 3, 0, 100);
    updateBars();
    toast(message);
    shake();
    if (state.trust <= 0) failRound("Trust shield broke.");
  }

  function showFeedback(success, headline, lesson, line) {
    if (lesson && !state.lessons.includes(lesson)) state.lessons.push(lesson);
    updateBars();
    if (state.runMode === "versus") v16BroadcastMatchProgress(success);
    const host = $("#feedbackHost");
    if (!host) return;
    host.innerHTML = `
      <div class="feedback ${success ? "feedback-good" : "feedback-bad"}">
        <strong>${success ? "✅" : "⚠️"} ${esc(headline)}</strong>
        <p>${esc(lesson || "Pause, verify, and avoid pressure.")}</p>
        <p class="small">${esc(line)}</p>
        <div class="button-row" style="margin-top:0"><button class="btn ${success ? "btn-primary" : "btn-danger"}" id="nextRoundBtn">${state.idx >= state.selected.length - 1 || state.trust <= 0 ? "See Recap" : (state.practiceMode ? "Finish Practice" : "Next Random Microgame")}</button></div>
      </div>
    `;
    wireTopbar();
    on($("#nextRoundBtn"), "click", () => {
      if (state.transitioning) return;
      state.transitioning = true;
      $("#nextRoundBtn").disabled = true;
      nextRound();
    });
  }

  function nextRound() {
    if (state.trust <= 0) return showResults(true);
    state.idx += 1;
    if (state.idx >= state.selected.length) return showResults(false);
    renderRound();
  }

  /* ============================================================
     07) Minigame Dispatch
     ============================================================ */
  function drawRound(round) {
    const t = round.type;
    if (["safeChoice", "deepfakeCall"].includes(t)) return drawChoice(round);
    if (t === "dangerWebsite") return drawDangerWebsite(round);
    if (t === "siteInspector") return drawSiteInspector(round);
    if (t === "romanceSwipe") return drawSwipe(round, "romance");
    if (t === "marketplaceMatch") return drawSwipe(round, "marketplace");
    if (t === "attachmentFlash") return drawAttachmentFlash(round);
    if (t === "fileDelete") return drawFileDelete(round);
    if (t === "gameChatReport") return drawGameChat(round);
    if (t === "platformHints") return drawPlatformer(round);
    if (t === "popupPurge") return drawPopupPurge(round);
    if (t === "passwordFill") return drawPasswordFill(round);
    if (t === "qrScan") return drawQRScan(round);
    if (t === "mfaShield") return drawMFA(round);
    if (t === "permissionToggle") return drawPermissionToggle(round);
    if (t === "moneyGuard") return drawMoney(round);
    if (t === "bossRush") return drawBoss(round);
    return drawUniversalRound(round);
  }

  function wireRound(round) {
    const t = round.type;
    if (["safeChoice", "deepfakeCall"].includes(t)) return wireChoice(round);
    if (t === "dangerWebsite") return wireChoice(round);
    if (t === "siteInspector") return wireSiteInspector(round);
    if (t === "romanceSwipe") return wireSwipe(round, "romance");
    if (t === "marketplaceMatch") return wireSwipe(round, "marketplace");
    if (t === "attachmentFlash") return wireAttachmentFlash(round);
    if (t === "fileDelete") return wireFileDelete(round);
    if (t === "gameChatReport") return wireGameChat(round);
    if (t === "platformHints") return wirePlatformer(round);
    if (t === "popupPurge") return wirePopupPurge(round);
    if (t === "passwordFill") return wirePasswordFill(round);
    if (t === "qrScan") return wireQRScan(round);
    if (t === "mfaShield") return wireMFA(round);
    if (t === "permissionToggle") return wirePermissionToggle(round);
    if (t === "moneyGuard") return wireMoney(round);
    if (t === "bossRush") return wireBoss(round);
    return wireUniversalRound(round);
  }

  /* ============================================================
     08) Choice and Mock Website Rounds
     ============================================================ */
  function drawChoice(round) {
    const reasons = reasonBank(round);
    return `
      <div class="scenario-box">
        <div class="message-header"><span class="avatar">🛡️</span><span>${esc(round.category)}</span></div>
        <div class="scenario-text">${esc(round.scenario)}</div>
      </div>
      <div class="verify-grid">
        <div class="verify-column">
          <h3>1) Choose the safest action</h3>
          <div class="action-grid compact-actions">
            ${shuffle(round.options || []).map((option) => `<button class="action-btn" data-choice-action="true" data-correct="${option[1] ? "true" : "false"}">${esc(option[0])}</button>`).join("")}
          </div>
        </div>
        <div class="verify-column">
          <h3>2) Choose the reason</h3>
          <div class="reason-grid">
            ${reasons.map((reason) => `<button class="reason-btn" data-choice-reason="true" data-correct="${reason[1] ? "true" : "false"}">${esc(reason[0])}</button>`).join("")}
          </div>
        </div>
      </div>
      <button class="btn btn-primary verify-submit" id="submitChoice">Lock Safe Action + Reason</button>
    `;
  }

  function wireChoice() {
    let selectedAction = null;
    let selectedReason = null;

    $$('[data-choice-action], .action-btn:not([data-choice-reason])').forEach((button) => on(button, "click", () => {
      sfx("click");
      $$('[data-choice-action], .action-btn:not([data-choice-reason])').forEach((b) => b.classList.remove("selected"));
      button.classList.add("selected");
      selectedAction = button.dataset.correct === "true";
    }));

    $$('[data-choice-reason]').forEach((button) => on(button, "click", () => {
      sfx("click");
      $$('[data-choice-reason]').forEach((b) => b.classList.remove("selected"));
      button.classList.add("selected");
      selectedReason = button.dataset.correct === "true";
    }));

    on($("#submitChoice"), "click", () => {
      if (selectedAction === null || selectedReason === null) return toast("Choose both the action and the reason.");
      selectedAction && selectedReason ? passRound("Safe action and reason locked.") : failRound("The action or the reasoning was unsafe.");
    });
  }

  function drawDangerWebsite(round) {
    const reasons = reasonBank(round);
    return `
      <div class="mock-window browser-challenge">
        <div class="mock-title"><span>🌐 Browser</span><span>${esc(round.title)}</span></div>
        <div class="mock-body">
          <div class="url-bar">⚠️ ${esc(round.url)}</div>
          <div class="fake-site-hero">
            <h3>${esc(round.headline)}</h3>
            <p>${esc(round.body)}</p>
            <div class="danger-bar"><span style="width:76%"></span></div>
          </div>
          <div class="verify-grid">
            <div class="verify-column">
              <h3>1) Escape action</h3>
              <div class="action-grid compact-actions">
                ${shuffle(round.options || []).map((option) => `<button class="action-btn" data-choice-action="true" data-correct="${option[1] ? "true" : "false"}">${esc(option[0])}</button>`).join("")}
              </div>
            </div>
            <div class="verify-column">
              <h3>2) Why is it risky?</h3>
              <div class="reason-grid">
                ${reasons.map((reason) => `<button class="reason-btn" data-choice-reason="true" data-correct="${reason[1] ? "true" : "false"}">${esc(reason[0])}</button>`).join("")}
              </div>
            </div>
          </div>
          <button class="btn btn-primary verify-submit" id="submitChoice">Escape + Explain</button>
        </div>
      </div>
    `;
  }

  /* ============================================================
     09) Site Inspector / Red Flag Clicker
     ============================================================ */
  function drawSiteInspector(round) {
    return `
      <div class="site-inspector">
        <div class="mock-title"><span>🔎 Site Inspector</span><span>${esc(round.url)}</span></div>
        <div class="mock-body">
          <div class="url-bar">${esc(round.url)}</div>
          <div class="fake-site-hero"><h3>${esc(round.headline)}</h3><p>Select exactly ${round.needed || 3} red flags.</p></div>
          <div class="flag-grid">
            ${shuffle(round.flags || []).map((flag, index) => `<button class="flag-btn" data-index="${index}" data-correct="${flag[1] ? "true" : "false"}">${esc(flag[0])}</button>`).join("")}
          </div>
          <button class="btn btn-primary" id="finishFlags">Submit Red Flags</button>
        </div>
      </div>
    `;
  }

  function wireSiteInspector(round) {
    $$(".flag-btn").forEach((button) => on(button, "click", () => {
      sfx("click");
      button.classList.toggle("selected");
    }));
    on($("#finishFlags"), "click", () => {
      const chosen = $$(".flag-btn.selected");
      const correct = chosen.filter((b) => b.dataset.correct === "true").length;
      const wrong = chosen.filter((b) => b.dataset.correct !== "true").length;
      correct >= (round.needed || 3) && wrong === 0 ? passRound("Red flags found.") : failRound("Missed or selected the wrong flags.");
    });
  }

  /* ============================================================
     10) Romance and Marketplace Swipe
     ============================================================ */
  function drawSwipe(round, mode) {
    const profile = round.profiles[state.step] || round.profiles[0];
    const isRomance = mode === "romance";
    const name = profile[0];
    const text = profile[1];
    return `
      <div class="swipe-stage">
        <div class="${isRomance ? "profile-card" : "buyer-card"}">
          <div class="profile-top">
            <div class="profile-photo">${isRomance ? "💘" : "🛒"}</div>
            <div><h3>${esc(name)}</h3><p class="muted">Card ${state.step + 1} / ${round.profiles.length}</p></div>
          </div>
          <div class="scenario-text">${esc(text)}</div>
        </div>
        <p class="muted">Keyboard: ← scam / → okay. Mobile: use buttons.</p>
        <div class="swipe-controls">
          <button class="btn btn-danger swipe-btn" data-swipe="left">← Scam / Reject</button>
          <button class="btn btn-good swipe-btn" data-swipe="right">Looks OK →</button>
        </div>
      </div>
    `;
  }

  function wireSwipe(round, mode) {
    function answer(direction) {
      if (state.answered) return;
      const profile = round.profiles[state.step];
      const isScam = Boolean(profile[2]);
      const correct = isScam ? direction === "left" : direction === "right";
      if (!correct) return failRound(isScam ? "That card had scam pressure." : "That one looked safer.");
      sfx("coin");
      state.step += 1;
      if (state.step >= round.profiles.length) return passRound(mode === "romance" ? "Romance swipes cleared." : "Marketplace swipes cleared.");
      $("#microgame").innerHTML = drawSwipe(round, mode);
      wireSwipe(round, mode);
    }
    $$(".swipe-btn").forEach((button) => on(button, "click", () => answer(button.dataset.swipe)));
    on(document, "keydown", (e) => {
      if (e.key === "ArrowLeft") answer("left");
      if (e.key === "ArrowRight") answer("right");
    });
  }

  /* ============================================================
     11) Attachment Flash Memory
     ============================================================ */
  function fileIcon(name) {
    if (/\.(exe|scr|apk|dmg)$/i.test(name)) return "⚙️";
    if (/\.zip$/i.test(name)) return "🗜️";
    if (/\.(png|jpg|jpeg)$/i.test(name)) return "🖼️";
    if (/\.(xlsm|xlsx)$/i.test(name)) return "📊";
    if (/\.(docx|pdf|txt)$/i.test(name)) return "📄";
    return "📦";
  }

  function drawAttachmentFlash(round) {
    const flipped = state.step >= 1;
    return `
      <div class="study-banner">${flipped ? "Pick one safe file from memory." : "Study the files. They will flip over soon."}</div>
      <div class="file-grid">
        ${round.files.map((file, index) => `<button class="file-card" data-index="${index}" data-safe="${file[1] ? "true" : "false"}" ${flipped ? "" : "disabled"}><span class="file-icon">${fileIcon(file[0])}</span><strong>${flipped ? "File " + (index + 1) : esc(file[0])}</strong></button>`).join("")}
      </div>
    `;
  }

  function wireAttachmentFlash(round) {
    if (state.step === 0) {
      const timeout = setTimeout(() => {
        if (state.answered) return;
        state.step = 1;
        $("#microgame").innerHTML = drawAttachmentFlash(round);
        wireAttachmentFlash(round);
      }, 2300);
      addCleanup(() => clearTimeout(timeout));
      return;
    }
    $$(".file-card").forEach((card) => on(card, "click", () => {
      sfx("click");
      card.dataset.safe === "true" ? passRound("Safe file remembered.") : failRound("That file type was risky.");
    }));
  }

  /* ============================================================
     12) Select and Delete Risky Files
     ============================================================ */
  function drawFileDelete(round) {
    return `
      <div class="explorer-ui">
        <div class="sidebar"><h3>Downloads</h3><p class="muted">Select risky files, then delete.</p></div>
        <div class="mainarea">
          <div class="file-grid">
            ${shuffle(round.files || []).map((file) => `<button class="file-card" data-risky="${file[1] ? "true" : "false"}"><span class="file-icon">${fileIcon(file[0])}</span><strong>${esc(file[0])}</strong></button>`).join("")}
          </div>
          <button class="btn btn-danger" id="deleteSelected">Delete Selected</button>
        </div>
      </div>
    `;
  }

  function wireFileDelete() {
    $$(".file-card").forEach((card) => on(card, "click", () => {
      sfx("click");
      card.classList.toggle("selected");
    }));
    on($("#deleteSelected"), "click", () => {
      const cards = $$(".file-card");
      const risky = cards.filter((c) => c.dataset.risky === "true");
      const selected = cards.filter((c) => c.classList.contains("selected"));
      const allRisky = risky.every((c) => c.classList.contains("selected"));
      const noSafe = selected.every((c) => c.dataset.risky === "true");
      allRisky && noSafe ? passRound("Risky files deleted.") : failRound("Deletion choices were not safe.");
    });
  }

  /* ============================================================
     13) Game Chat Report — Randomized and Fully Clickable
     ============================================================ */
  function drawGameChat(round) {
    const players = shuffle([round.player, ...(round.decoys || [])]);
    const friendlyLines = shuffle([
      "Anyone want to play next round?",
      "Good game!",
      "I found the last checkpoint.",
      "Can someone help with the puzzle?",
      "Thanks for the invite!"
    ]).slice(0, 2);
    return `
      <div class="lobby-ui">
        <div class="sidebar">
          <h3>Players</h3>
          <div class="player-list">
            ${players.map((player) => `<button class="lobby-player" data-player="${esc(player)}" data-player-correct="${player === round.player ? "true" : "false"}">${esc(player)}</button>`).join("")}
          </div>
        </div>
        <div class="mainarea">
          <div class="chat-log">
            <div class="chat-line"><strong>${esc(round.player)}:</strong> ${esc(round.message)}</div>
            ${friendlyLines.map((line, i) => `<div class="chat-line"><strong>${esc((round.decoys || ["Player"])[i] || "Player")}: </strong>${esc(line)}</div>`).join("")}
          </div>
          <div class="player-menu" id="playerMenu">
            <strong id="menuTitle">Select suspicious player first.</strong>
            <div class="grid3">
              <button class="action-btn" data-menu-action="friend">Add Friend</button>
              <button class="action-btn" data-menu-action="report">Mute + Report</button>
              <button class="action-btn" data-menu-action="open">Open Link</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function wireGameChat(round) {
    let selectedPlayer = null;
    $$(".lobby-player").forEach((button) => on(button, "click", () => {
      sfx("click");
      $$(".lobby-player").forEach((b) => b.classList.remove("selected"));
      button.classList.add("selected");
      selectedPlayer = button.dataset.player;
      $("#playerMenu").classList.add("open");
      $("#menuTitle").textContent = `${selectedPlayer} options`;
      if (selectedPlayer !== round.player) minorPenalty("That player looks normal. Find the suspicious one.");
    }));
    $$('[data-menu-action]').forEach((button) => on(button, "click", () => {
      if (!selectedPlayer) return toast("Select the suspicious player first.");
      const action = button.dataset.menuAction;
      if (selectedPlayer === round.player && action === "report") return passRound("Scam chat reported.");
      if (action === "open") return failRound("Opened the scam link.");
      minorPenalty("Use Mute + Report on the suspicious player.");
    }));
  }

  /* ============================================================
     14) Moving Hint Platformer — Fixed Movement and Hint Count
     ============================================================ */
  function drawPlatformer() {
    return `
      <div class="platform-field" id="platformField" aria-label="Platformer play field">
        <div class="platform" style="left:4%; top:86%; width:22%;"></div>
        <div class="platform" style="left:20%; top:65%; width:20%;"></div>
        <div class="platform" style="left:41%; top:47%; width:20%;"></div>
        <div class="platform" style="left:62%; top:29%; width:20%;"></div>
        <div class="goal-star" data-star="1" style="left:24%; top:55%;">⭐</div>
        <div class="goal-star" data-star="2" style="left:48%; top:37%;">⭐</div>
        <div class="goal-star" data-star="3" style="left:72%; top:19%;">⭐</div>
        <div class="scam-spike" style="left:36%; top:78%;">🚩</div>
        <div class="scam-spike" style="left:57%; top:59%;">⚠️</div>
        <div class="jumper" id="jumper">🧍</div>
      </div>
      <p class="muted" id="starProgress">Hints collected: 0 / 3</p>
      <div class="control-pad">
        <button class="btn btn-secondary" id="leftBtn">←</button>
        <button class="btn btn-secondary" id="jumpBtn">Jump</button>
        <button class="btn btn-secondary" id="rightBtn">→</button>
      </div>
    `;
  }

  function wirePlatformer() {
    const field = $("#platformField");
    const jumper = $("#jumper");
    if (!field || !jumper) return;

    const keys = { left: false, right: false };
    state.platform = { x: 20, y: 0, vx: 0, vy: 0, grounded: false, invulnerable: 0 };

    function setupStart() {
      const firstPlatform = $(".platform", field);
      const top = firstPlatform ? firstPlatform.offsetTop : field.clientHeight - 70;
      state.platform.x = Math.max(16, field.clientWidth * 0.06);
      state.platform.y = Math.max(0, top - 50);
      updateJumper();
    }

    function updateJumper() {
      jumper.style.transform = `translate(${state.platform.x}px, ${state.platform.y}px)`;
    }

    function jump() {
      ensureAudio();
      if (state.platform.grounded) {
        sfx("jump");
        state.platform.vy = -12;
        state.platform.grounded = false;
      }
    }

    function setKey(key, value) {
      keys[key] = value;
    }

    on(document, "keydown", (e) => {
      const k = e.key.toLowerCase();
      if (k === "arrowleft" || k === "a") setKey("left", true);
      if (k === "arrowright" || k === "d") setKey("right", true);
      if (k === " " || k === "arrowup" || k === "w") { e.preventDefault(); jump(); }
    });
    on(document, "keyup", (e) => {
      const k = e.key.toLowerCase();
      if (k === "arrowleft" || k === "a") setKey("left", false);
      if (k === "arrowright" || k === "d") setKey("right", false);
    });

    function holdButton(button, key) {
      on(button, "pointerdown", (e) => { e.preventDefault(); ensureAudio(); setKey(key, true); });
      on(button, "pointerup", () => setKey(key, false));
      on(button, "pointercancel", () => setKey(key, false));
      on(button, "pointerleave", () => setKey(key, false));
    }
    holdButton($("#leftBtn"), "left");
    holdButton($("#rightBtn"), "right");
    on($("#jumpBtn"), "click", jump);
    on(window, "deviceorientation", (e) => { state.tiltX = v16TiltAxis(e); }, { passive: true });

    function rectsOverlap(a, b) {
      return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
    }

    function tick() {
      if (state.answered) return;
      const p = state.platform;
      const fieldW = field.clientWidth;
      const fieldH = field.clientHeight;
      const w = 48;
      const h = 48;

      if (keys.left) p.vx = -5;
      else if (keys.right) p.vx = 5;
      else p.vx *= 0.78;
      if (state.deviceMode === "motion") p.vx += clamp(state.tiltX, -18, 18) * 0.025;

      p.vy += 0.58;
      p.x += p.vx;
      p.y += p.vy;
      p.x = clamp(p.x, 0, Math.max(0, fieldW - w));
      p.grounded = false;

      $$(".platform", field).forEach((platform) => {
        const top = platform.offsetTop;
        const left = platform.offsetLeft;
        const right = left + platform.offsetWidth;
        const wasAbove = p.y + h - p.vy <= top + 8;
        const isFalling = p.vy >= 0;
        const horizontal = p.x + w > left && p.x < right;
        const vertical = p.y + h >= top && p.y + h <= top + 24;
        if (isFalling && wasAbove && horizontal && vertical) {
          p.y = top - h;
          p.vy = 0;
          p.grounded = true;
        }
      });

      if (p.y > fieldH - h) {
        p.y = fieldH - h;
        p.vy = 0;
        p.grounded = true;
      }

      updateJumper();
      const jr = jumper.getBoundingClientRect();

      $$(".goal-star", field).forEach((star) => {
        if (star.classList.contains("collected")) return;
        const sr = star.getBoundingClientRect();
        if (rectsOverlap(jr, sr)) {
          star.classList.add("collected");
          state.starCount += 1;
          sfx("coin");
          const progress = $("#starProgress");
          if (progress) progress.textContent = `Hints collected: ${state.starCount} / 3`;
        }
      });

      $$(".scam-spike", field).forEach((spike) => {
        const sr = spike.getBoundingClientRect();
        if (p.invulnerable <= 0 && rectsOverlap(jr, sr)) {
          p.invulnerable = 45;
          p.vx = -p.vx * 1.4;
          p.vy = -8;
          minorPenalty("You hit a scam trap. Keep moving toward safe hints.");
        }
      });
      p.invulnerable = Math.max(0, p.invulnerable - 1);

      if (state.starCount >= 3) return passRound("Collected all three safe hints.");
      state.anim = requestAnimationFrame(tick);
    }

    requestAnimationFrame(() => {
      setupStart();
      state.anim = requestAnimationFrame(tick);
    });
  }

  /* ============================================================
     15) Pop-Up Purge
     ============================================================ */
  function drawPopupPurge(round) {
    const positions = [
      [5, 8], [38, 10], [66, 12], [12, 42], [44, 38], [68, 48], [28, 68], [58, 70]
    ];
    return `
      <p class="muted">Close the real X buttons. Fake action buttons cause damage.</p>
      <div class="popup-field" id="popupField">
        ${Array.from({ length: round.popups || 5 }, (_, i) => {
          const pos = positions[i % positions.length];
          return `<div class="pop-ad" data-popup="${i}" style="left:${pos[0]}%;top:${pos[1]}%;">
            <div class="pop-title"><span>${i % 2 ? "Prize Alert" : "Security Warning"}</span><button class="pop-x" data-close="${i}">×</button></div>
            <div class="pop-body"><p>${i % 2 ? "Claim now before it expires." : "Call support immediately."}</p><button class="btn btn-danger" data-fake-pop="true">Continue</button></div>
          </div>`;
        }).join("")}
      </div>
    `;
  }

  function wirePopupPurge(round) {
    let closed = 0;
    $$(".pop-x").forEach((button) => on(button, "click", (e) => {
      e.stopPropagation();
      sfx("click");
      const pop = button.closest(".pop-ad");
      if (pop) {
        pop.remove();
        closed += 1;
        if (closed >= (round.popups || 5)) passRound("Pop-ups closed safely.");
      }
    }));
    $$('[data-fake-pop]').forEach((button) => on(button, "click", () => minorPenalty("That was a fake action button. Use the real X.")));
  }

  /* ============================================================
     16) Password, QR, MFA, Permissions, Money
     ============================================================ */
  function drawPasswordFill(round) {
    return `
      <div class="scenario-box"><div class="message-header"><span class="avatar">🔐</span><span>Password Manager</span></div><div class="scenario-text">Official saved login: ${esc(round.official)}</div></div>
      <div class="grid3">${shuffle(round.domains || []).map((domain) => `<button class="domain-card" data-official="${domain === round.official ? "true" : "false"}">🌐 ${esc(domain)}</button>`).join("")}</div>
    `;
  }

  function wirePasswordFill() {
    $$(".domain-card").forEach((button) => on(button, "click", () => {
      sfx("click");
      button.dataset.official === "true" ? passRound("Autofilled only the official domain.") : failRound("Autofilled a lookalike domain.");
    }));
  }

  function drawQRScan(round) {
    return `
      <div class="scenario-box"><div class="message-header"><span class="avatar">📷</span><span>QR Lens</span></div><div class="scenario-text">Choose the QR destination that fits the official context.</div></div>
      <div class="grid3">${shuffle(round.domains || []).map((domain) => `<button class="qr-card" data-official="${domain === round.official ? "true" : "false"}"><span class="big">▦</span>${esc(domain)}</button>`).join("")}</div>
    `;
  }

  function wireQRScan() {
    $$(".qr-card").forEach((button) => on(button, "click", () => {
      sfx("click");
      button.dataset.official === "true" ? passRound("Official QR chosen.") : failRound("That QR led to a suspicious destination.");
    }));
  }

  function drawMFA(round) {
    return `
      <div class="phone-frame">
        <div class="phone-screen">
          <div class="phone-top"><span>Security Prompt</span><span>2FA</span></div>
          <div class="phone-chat">
            <div class="bubble"><strong>Approve sign-in?</strong><br>${esc(round.scenario)}</div>
            <div class="grid2">
              <button class="btn btn-good" data-mfa="approve">Approve</button>
              <button class="btn btn-danger" data-mfa="deny">Deny</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function wireMFA(round) {
    $$('[data-mfa]').forEach((button) => on(button, "click", () => {
      const approve = button.dataset.mfa === "approve";
      approve === round.approve ? passRound(approve ? "Approved your own login." : "Denied the surprise login.") : failRound(approve ? "Approved a risky prompt." : "Denied your own prompt.");
    }));
  }

  function drawPermissionToggle(round) {
    return `
      <div class="scenario-box"><div class="message-header"><span class="avatar">⚙️</span><span>Permissions</span></div><div class="scenario-text">Toggle only the permissions this app really needs.</div></div>
      <div class="grid2">
        ${round.permissions.map((perm, index) => `<button class="permission-card" data-index="${index}" data-allow="${perm[1] ? "true" : "false"}"><span>${esc(perm[0])}</span><span class="toggle-switch"></span></button>`).join("")}
      </div>
      <button class="btn btn-primary" id="finishPermissions">Confirm Permissions</button>
    `;
  }

  function wirePermissionToggle(round) {
    $$(".permission-card").forEach((button) => on(button, "click", () => {
      sfx("click");
      button.classList.toggle("selected");
    }));
    on($("#finishPermissions"), "click", () => {
      const ok = $$(".permission-card").every((button) => button.classList.contains("selected") === (button.dataset.allow === "true"));
      ok ? passRound("Permissions minimized safely.") : failRound("Those permissions were not safe.");
    });
  }

  function drawMoney(round) {
    return `
      <div class="scenario-box"><div class="message-header"><span class="avatar">💸</span><span>Money Guard</span></div><div class="scenario-text">${esc(round.scenario)}</div></div>
      <div class="money-display" id="moneyDisplay">$0</div>
      <div class="money-controls">
        <button class="money-btn" data-delta="-10">-10</button>
        <button class="money-btn" data-delta="-1">-1</button>
        <button class="money-btn" data-delta="1">+1</button>
        <button class="money-btn" data-delta="10">+10</button>
        <button class="btn btn-primary" id="sendMoney">Send</button>
      </div>
    `;
  }

  function wireMoney(round, bossHandler = null) {
    function update() {
      const display = $("#moneyDisplay");
      if (display) display.textContent = `$${state.money}`;
    }
    $$('[data-delta]').forEach((button) => on(button, "click", () => {
      sfx("click");
      state.money = clamp(state.money + Number(button.dataset.delta), 0, 999);
      update();
    }));
    on($("#sendMoney"), "click", () => {
      const correct = state.money === round.targetAmount;
      if (bossHandler) return bossHandler(correct);
      correct ? passRound(`Correct safe amount: $${round.targetAmount}.`) : failRound(`Correct amount was $${round.targetAmount}.`);
    });
  }

  /* ============================================================
     17) Boss Fight — Randomized Multi-Phase Battle
     ============================================================ */
  function drawBoss() {
    return `
      <div class="boss-arena" id="bossCard">
        <aside class="boss-villain-panel">
          <div class="boss-avatar-large">😈</div>
          <div class="boss-speech">
            <strong>The Fraudster adapts.</strong>
            <p>Every phase changes tactic. Read the prompt, prove the reasoning, and counter safely.</p>
          </div>
          <div class="boss-threat-deck">
            <span>Phish</span><span>Voice</span><span>Files</span><span>MFA</span><span>Money</span><span>Domains</span>
          </div>
        </aside>
        <main class="boss-console">
          <div class="boss-status-grid">
            <div class="boss-health-row">
              <strong><span>Fraudster Boss HP</span><span id="bossHpText">100%</span></strong>
              <div class="meter meter-danger"><span id="bossHpBar" style="width:100%"></span></div>
            </div>
            <div class="boss-health-row">
              <strong><span>Counter Phases</span><span id="bossPhaseText">0 / 8</span></strong>
              <div class="meter meter-progress"><span id="bossPhaseBar" style="width:0%"></span></div>
            </div>
          </div>
          <div class="boss-phase-label" id="bossPhaseLabel">Incoming tactic...</div>
          <div class="boss-phase-host" id="bossPhaseHost"></div>
        </main>
      </div>
    `;
  }

  function wireBoss() {
    state.boss = {
      hp: 100,
      solved: 0,
      need: state.difficulty === "hard" ? 8 : state.difficulty === "easy" ? 6 : 7,
      used: [],
      phase: null,
      sequenceProgress: []
    };
    renderBossPhase();
  }

  function pickBossPhase() {
    const unused = BOSS_BANK.filter((_, i) => !state.boss.used.includes(i));
    const pool = unused.length ? unused : BOSS_BANK;
    const phase = shuffle(pool)[0];
    const index = BOSS_BANK.indexOf(phase);
    if (index >= 0) state.boss.used.push(index);
    return typeof structuredClone === "function" ? structuredClone(phase) : JSON.parse(JSON.stringify(phase));
  }

  function updateBossBars() {
    if ($("#bossHpText")) $("#bossHpText").textContent = `${Math.max(0, Math.round(state.boss.hp))}%`;
    if ($("#bossHpBar")) $("#bossHpBar").style.width = `${clamp(state.boss.hp, 0, 100)}%`;
    if ($("#bossPhaseText")) $("#bossPhaseText").textContent = `${state.boss.solved} / ${state.boss.need}`;
    if ($("#bossPhaseBar")) $("#bossPhaseBar").style.width = `${clamp((state.boss.solved / state.boss.need) * 100, 0, 100)}%`;
  }

  function renderBossPhase() {
    if (state.answered) return;
    state.boss.phase = pickBossPhase();
    state.boss.sequenceProgress = [];
    state.money = 0;
    updateBossBars();
    const phase = state.boss.phase;
    const host = $("#bossPhaseHost");
    const label = $("#bossPhaseLabel");
    if (label) label.textContent = `Phase ${state.boss.solved + 1}: ${phase.type.toUpperCase()} COUNTER`;
    if (!host) return;

    if (phase.type === "choice") {
      const reasons = reasonBank({ category: phase.category || "Boss Scam" });
      host.innerHTML = `
        <div class="boss-phase-card">
          <div class="scenario-box"><div class="message-header"><span class="avatar">😈</span><span>Boss Tactic</span></div><div class="scenario-text">${esc(phase.prompt)}</div></div>
          <div class="verify-grid">
            <div class="verify-column"><h3>Counter action</h3><div class="action-grid compact-actions">${shuffle(phase.options).map((o) => `<button class="boss-choice" data-boss-action="true" data-correct="${o[1] ? "true" : "false"}">${esc(o[0])}</button>`).join("")}</div></div>
            <div class="verify-column"><h3>Counter reason</h3><div class="reason-grid">${reasons.map((r) => `<button class="reason-btn" data-boss-reason="true" data-correct="${r[1] ? "true" : "false"}">${esc(r[0])}</button>`).join("")}</div></div>
          </div>
          <button class="btn btn-primary verify-submit" id="bossSubmitChoice">Counter Boss</button>
        </div>`;
      let action = null;
      let reason = null;
      $$('[data-boss-action]', host).forEach((button) => on(button, "click", () => { sfx("click"); $$('[data-boss-action]', host).forEach((b) => b.classList.remove("selected")); button.classList.add("selected"); action = button.dataset.correct === "true"; }));
      $$('[data-boss-reason]', host).forEach((button) => on(button, "click", () => { sfx("click"); $$('[data-boss-reason]', host).forEach((b) => b.classList.remove("selected")); button.classList.add("selected"); reason = button.dataset.correct === "true"; }));
      on($("#bossSubmitChoice"), "click", () => {
        if (action === null || reason === null) return toast("Choose a counter action and reason.");
        bossAnswer(action && reason);
      });
    }

    if (phase.type === "domain") {
      host.innerHTML = `
        <div class="boss-phase-card">
          <div class="scenario-box"><div class="message-header"><span class="avatar">🌐</span><span>Boss Domain Trick</span></div><div class="scenario-text">${esc(phase.prompt)}</div></div>
          <p class="muted">Pick the exact official domain. Similar-looking words are traps.</p>
          <div class="grid3">${shuffle(phase.options).map((domain) => `<button class="boss-choice domain-tile" data-correct="${domain === phase.answer ? "true" : "false"}">${esc(domain)}</button>`).join("")}</div>
        </div>`;
      $$(".boss-choice", host).forEach((button) => on(button, "click", () => bossAnswer(button.dataset.correct === "true")));
    }

    if (phase.type === "chat") {
      const decoys = shuffle(["PixelPat", "GardenMom", "StudyBuddy", "Runner42", "BlueRobot", "HomeworkHero"]).slice(0, 4);
      host.innerHTML = `
        <div class="boss-phase-card">
          <div class="lobby-ui boss-lobby">
            <div class="sidebar"><h3>Boss Lobby</h3><div class="player-list">${shuffle([phase.player, ...decoys]).map((p) => `<button class="lobby-player" data-correct="${p === phase.player ? "true" : "false"}">${esc(p)}</button>`).join("")}</div></div>
            <div class="mainarea"><div class="chat-log"><div class="chat-line"><strong>${esc(phase.player)}:</strong> ${esc(phase.message)}</div><div class="chat-line"><strong>GardenMom:</strong> Anyone want to play next round?</div><div class="chat-line"><strong>StudyBuddy:</strong> Please report weird links.</div></div><p class="muted">Select the scammer, then report. Wrong player costs trust.</p><button class="btn btn-primary" id="bossReport" disabled>Mute + Report Selected</button></div>
          </div>
        </div>`;
      let correctPlayer = false;
      $$(".lobby-player", host).forEach((button) => on(button, "click", () => {
        $$(".lobby-player", host).forEach((b) => b.classList.remove("selected"));
        button.classList.add("selected");
        correctPlayer = button.dataset.correct === "true";
        $("#bossReport").disabled = false;
        if (!correctPlayer) minorPenalty("Boss decoy clicked. Find the suspicious player.");
      }));
      on($("#bossReport"), "click", () => bossAnswer(correctPlayer));
    }

    if (phase.type === "romance") {
      host.innerHTML = `
        <div class="boss-phase-card">
          <div class="profile-card boss-profile">
            <div class="profile-top"><div class="profile-photo">💘</div><div><h3>${esc(phase.name)}</h3><p class="muted">Boss romance tactic</p></div></div>
            <div class="scenario-text">${esc(phase.bio)}</div>
          </div>
          <div class="swipe-controls"><button class="btn btn-danger" data-boss-swipe="left">← Scam / Block</button><button class="btn btn-good" data-boss-swipe="right">Looks OK →</button></div>
        </div>`;
      $$('[data-boss-swipe]', host).forEach((button) => on(button, "click", () => {
        const direction = button.dataset.bossSwipe;
        bossAnswer(phase.scam ? direction === "left" : direction === "right");
      }));
    }

    if (phase.type === "file") {
      host.innerHTML = `
        <div class="boss-phase-card">
          <p class="muted">Select only the risky boss files, then delete. Safe files are decoys.</p>
          <div class="file-grid boss-file-grid">${shuffle(phase.files).map((file) => `<button class="file-card" data-risky="${file[1] ? "true" : "false"}"><span class="file-icon">${fileIcon(file[0])}</span><strong>${esc(file[0])}</strong></button>`).join("")}</div>
          <button class="btn btn-danger" id="bossDelete">Delete Selected</button>
        </div>`;
      $$(".file-card", host).forEach((card) => on(card, "click", () => card.classList.toggle("selected")));
      on($("#bossDelete"), "click", () => {
        const cards = $$(".file-card", host);
        const risky = cards.filter((c) => c.dataset.risky === "true");
        const selected = cards.filter((c) => c.classList.contains("selected"));
        bossAnswer(risky.every((c) => c.classList.contains("selected")) && selected.every((c) => c.dataset.risky === "true"));
      });
    }

    if (phase.type === "mfa") {
      host.innerHTML = `
        <div class="boss-phase-card">
          <div class="phone-frame mini-phone"><div class="phone-screen"><div class="phone-top"><span>Security Prompt</span><span>🔐</span></div><div class="phone-chat"><div class="bubble">${esc(phase.prompt)}</div><p class="muted">Approve only if this was your own login.</p></div></div></div>
          <div class="grid2"><button class="btn btn-good" data-boss-mfa="approve">Approve</button><button class="btn btn-danger" data-boss-mfa="deny">Deny</button></div>
        </div>`;
      $$('[data-boss-mfa]', host).forEach((button) => on(button, "click", () => bossAnswer((button.dataset.bossMfa === "approve") === phase.approve)));
    }

    if (phase.type === "amount") {
      host.innerHTML = `
        <div class="boss-phase-card">
          <div class="scenario-box"><div class="message-header"><span class="avatar">💸</span><span>Boss Money Trick</span></div><div class="scenario-text">${esc(phase.prompt)}</div></div>
          <div class="money-display" id="moneyDisplay">$0</div>
          <div class="money-controls"><button class="money-btn" data-delta="-10">-10</button><button class="money-btn" data-delta="-1">-1</button><button class="money-btn" data-delta="1">+1</button><button class="money-btn" data-delta="10">+10</button><button class="btn btn-primary" id="sendMoney">Send</button></div>
        </div>`;
      wireMoney({ targetAmount: phase.answer }, (correct) => bossAnswer(correct));
    }

    if (phase.type === "flags") {
      host.innerHTML = `
        <div class="boss-phase-card">
          <div class="scenario-box"><div class="message-header"><span class="avatar">🔎</span><span>Boss Red Flags</span></div><div class="scenario-text">${esc(phase.prompt)}</div></div>
          <div class="flag-grid">${shuffle(phase.flags).map((flag) => `<button class="flag-btn" data-correct="${flag[1] ? "true" : "false"}">${esc(flag[0])}</button>`).join("")}</div>
          <button class="btn btn-primary" id="bossFlags">Submit Evidence</button>
        </div>`;
      $$(".flag-btn", host).forEach((button) => on(button, "click", () => button.classList.toggle("selected")));
      on($("#bossFlags"), "click", () => {
        const chosen = $$(".flag-btn.selected", host);
        const correct = chosen.filter((b) => b.dataset.correct === "true").length;
        const wrong = chosen.filter((b) => b.dataset.correct !== "true").length;
        const needed = (phase.flags || []).filter((f) => f[1]).length;
        bossAnswer(correct >= needed && wrong === 0);
      });
    }

    if (phase.type === "sequence") {
      const steps = shuffle(phase.steps || []);
      host.innerHTML = `
        <div class="boss-phase-card">
          <div class="scenario-box"><div class="message-header"><span class="avatar">🧭</span><span>Boss Verification Sequence</span></div><div class="scenario-text">${esc(phase.prompt)}</div></div>
          <p class="muted">Click the safe response steps in the correct order.</p>
          <div class="sequence-progress" id="sequenceProgress">Order: ${phase.answer.map(() => "▢").join(" ")}</div>
          <div class="grid2">${steps.map((step) => `<button class="boss-choice" data-sequence="${esc(step)}">${esc(step)}</button>`).join("")}</div>
          <button class="btn btn-primary" id="bossSequence">Submit Sequence</button>
        </div>`;
      $$("[data-sequence]", host).forEach((button) => on(button, "click", () => {
        if (button.classList.contains("selected")) return;
        sfx("click");
        button.classList.add("selected");
        state.boss.sequenceProgress.push(button.dataset.sequence);
        const prog = $("#sequenceProgress");
        if (prog) prog.textContent = `Order: ${state.boss.sequenceProgress.join(" → ")}`;
      }));
      on($("#bossSequence"), "click", () => {
        const actual = state.boss.sequenceProgress.join("|");
        const expected = (phase.answer || []).join("|");
        bossAnswer(actual === expected);
      });
    }

    if (phase.type === "tokens") {
      host.innerHTML = `
        <div class="boss-phase-card">
          <div class="scenario-box"><div class="message-header"><span class="avatar">🧩</span><span>Boss Evidence Tokens</span></div><div class="scenario-text">${esc(phase.prompt)}</div></div>
          <p class="muted">Select all real scam clues. Neutral details are decoys.</p>
          <div class="flag-grid">${shuffle(phase.tokens).map((token) => `<button class="flag-btn" data-correct="${token[1] ? "true" : "false"}">${esc(token[0])}</button>`).join("")}</div>
          <button class="btn btn-primary" id="bossTokens">Submit Tokens</button>
        </div>`;
      $$(".flag-btn", host).forEach((button) => on(button, "click", () => button.classList.toggle("selected")));
      on($("#bossTokens"), "click", () => {
        const chosen = $$(".flag-btn.selected", host);
        const correct = chosen.filter((b) => b.dataset.correct === "true").length;
        const wrong = chosen.filter((b) => b.dataset.correct !== "true").length;
        const needed = (phase.tokens || []).filter((f) => f[1]).length;
        bossAnswer(correct >= needed && wrong === 0);
      });
    }
  }

  function bossAnswer(correct) {
    if (state.answered || !state.boss) return;
    const phase = state.boss.phase;
    const card = $("#bossCard");

    if (correct) {
      sfx("boss");
      state.boss.solved += 1;
      state.boss.hp = clamp(state.boss.hp - Math.ceil(100 / state.boss.need), 0, 100);
      state.score += 80 + state.boss.solved * 10;
      state.fraudster = clamp(state.fraudster - 5, 0, 100);
      card?.classList.remove("boss-heal");
      card?.classList.add("boss-hit");
      toast(`Boss hit! ${phase.lesson || "Safe move."}`);
      updateBars();
      updateBossBars();
      if (state.boss.solved >= state.boss.need || state.boss.hp <= 0) return passRound("The Fraudster boss was defeated.");
      const timeout = setTimeout(() => {
        card?.classList.remove("boss-hit");
        renderBossPhase();
      }, 650);
      addCleanup(() => clearTimeout(timeout));
    } else {
      sfx("wrong");
      state.mistakes += 1;
      state.streak = 0;
      state.trust = clamp(state.trust - (state.powerups.shield > 0 ? 4 : 10), 0, 100);
      if (state.powerups.shield > 0) state.powerups.shield -= 1;
      state.fraudster = clamp(state.fraudster + 8, 0, 100);
      state.boss.hp = clamp(state.boss.hp + 8, 0, 100);
      card?.classList.remove("boss-hit");
      card?.classList.add("boss-heal");
      shake();
      toast(`Boss countered. ${phase.lesson || "Try the safer action."}`);
      updateBars();
      updateBossBars();
      if (state.trust <= 0) return failRound("The boss broke your trust shield.");
      const timeout = setTimeout(() => {
        card?.classList.remove("boss-heal");
        renderBossPhase();
      }, 800);
      addCleanup(() => clearTimeout(timeout));
    }
  }



  /* ============================================================
     17B) Universal Legacy + Experimental Round Adapter
     Purpose: keeps ALL older/current challenge data playable instead
     of showing unfinished/unknown layouts.
     ============================================================ */
  function normalizeLabel(item) {
    if (Array.isArray(item)) {
      const parts = item.filter((value) => typeof value === "string" || typeof value === "number").slice(0, 3);
      return parts.join(" — ");
    }
    return String(item);
  }

  function boolFromTuple(item, index = 1) {
    if (!Array.isArray(item)) return Boolean(item);
    return Boolean(item[index]);
  }

  function universalItems(round) {
    const sources = [
      ["flags", "Evidence"], ["permissions", "Permission"], ["extensions", "Extension"], ["clips", "Clipboard"],
      ["transactions", "Transaction"], ["items", "Item"], ["profiles", "Profile"], ["targets", "Target"],
      ["files", "File"], ["attachments", "Attachment"]
    ];
    for (const [key, label] of sources) {
      if (Array.isArray(round[key])) {
        return { key, label, list: round[key] };
      }
    }
    return null;
  }

  function universalCorrect(item, key, round) {
    if (!Array.isArray(item)) return false;
    if (key === "attachments") return Boolean(item[2]);
    if (key === "files") return item.length >= 3 ? Boolean(item[2]) : Boolean(item[1]);
    if (key === "targets") return Boolean(item[3]);
    if (key === "profiles") return Boolean(item[2]);
    if (key === "items") return Boolean(item[item.length - 1]);
    return Boolean(item[1]);
  }

  function drawUniversalRound(round) {
    // 1) Choice-based legacy rounds.
    if (Array.isArray(round.options)) {
      const reasons = reasonBank(round);
      return `
        <div class="scenario-box universal-brief">
          <div class="message-header"><span class="avatar">🧠</span><span>${esc(round.category || round.type)}</span></div>
          <div class="scenario-text">${esc(round.scenario || round.prompt || round.body || round.message || round.directions || round.title)}</div>
        </div>
        <div class="verify-grid">
          <div class="verify-column"><h3>1) Safe action</h3><div class="action-grid compact-actions">${shuffle(round.options).map((option) => `<button class="action-btn" data-universal-action="true" data-correct="${option[1] ? "true" : "false"}">${esc(option[0])}</button>`).join("")}</div></div>
          <div class="verify-column"><h3>2) Reason</h3><div class="reason-grid">${reasons.map((reason) => `<button class="reason-btn" data-universal-reason="true" data-correct="${reason[1] ? "true" : "false"}">${esc(reason[0])}</button>`).join("")}</div></div>
        </div>
        <button class="btn btn-primary verify-submit" id="universalSubmit">Lock Action + Reason</button>
      `;
    }

    // 2) Official-domain / network picking rounds.
    if (Array.isArray(round.domains) && round.official) {
      return `
        <div class="scenario-box universal-brief"><div class="message-header"><span class="avatar">🌐</span><span>Domain Duel</span></div><div class="scenario-text">${esc(round.scenario || round.directions || "Pick the exact official domain.")}</div></div>
        <div class="grid3">${shuffle(round.domains).map((domain) => `<button class="domain-card" data-universal-single="true" data-correct="${domain === round.official ? "true" : "false"}">🌐 ${esc(domain)}</button>`).join("")}</div>
      `;
    }
    if (Array.isArray(round.networks)) {
      return `
        <div class="scenario-box universal-brief"><div class="message-header"><span class="avatar">📶</span><span>Wi‑Fi Safety</span></div><div class="scenario-text">Choose the safest network, not the bait hotspot.</div></div>
        <div class="grid3">${shuffle(round.networks).map((net) => `<button class="domain-card" data-universal-single="true" data-correct="${net[1] ? "true" : "false"}">📶 ${esc(net[0])}</button>`).join("")}</div>
      `;
    }

    // 3) MFA / legit-or-scam binary rounds.
    if (typeof round.approve === "boolean") return drawMFA(round);
    if (typeof round.legit === "boolean") {
      return `
        <div class="scenario-box universal-brief"><div class="message-header"><span class="avatar">⚖️</span><span>Calibration</span></div><div class="scenario-text">${esc(round.scenario)}</div></div>
        <div class="grid2"><button class="action-btn" data-universal-single="true" data-correct="${round.legit ? "true" : "false"}">Looks Legit</button><button class="action-btn" data-universal-single="true" data-correct="${!round.legit ? "true" : "false"}">Scam / Unsafe</button></div>
      `;
    }

    // 4) Money amount rounds.
    if (typeof round.targetAmount === "number") return drawMoney(round);

    // 5) Text answer / safe word / refusal rounds.
    if (round.answer || round.word) {
      return `
        <div class="phone-frame"><div class="phone-screen"><div class="phone-top"><span>${esc(round.person || "Safety Check")}</span><span>${esc(round.category || "Response")}</span></div><div class="phone-chat"><div class="bubble">${esc(round.message || round.scenario || round.prompt || round.directions)}</div><input class="chat-input" id="universalText" placeholder="Type ${esc(round.answer || round.word)}" autocomplete="off" /><button class="btn btn-primary" id="universalTextSend">Send Safe Response</button></div></div></div>
      `;
    }

    // 6) Ordered sequence rounds.
    if (Array.isArray(round.steps)) {
      const answer = Array.isArray(round.answer) ? round.answer : round.steps;
      return `
        <div class="scenario-box universal-brief"><div class="message-header"><span class="avatar">🧭</span><span>Safety Sequence</span></div><div class="scenario-text">${esc(round.scenario || round.prompt || "Click the safe steps in order.")}</div></div>
        <div class="sequence-progress" id="universalSequenceProgress">Step 1 / ${answer.length}: choose ${esc(answer[0])}</div>
        <div class="grid3">${shuffle(round.steps).map((step) => `<button class="action-btn" data-universal-step="${esc(step)}">${esc(step)}</button>`).join("")}</div>
      `;
    }

    // 7) Multi-select evidence / delete / audit rounds.
    const pack = universalItems(round);
    if (pack) {
      const required = round.needed || pack.list.filter((item) => universalCorrect(item, pack.key, round)).length || 1;
      return `
        <div class="universal-console">
          <div class="scenario-box universal-brief"><div class="message-header"><span class="avatar">🧩</span><span>${esc(pack.label)} Challenge</span></div><div class="scenario-text">${esc(round.scenario || round.prompt || round.description || round.directions || "Select only the risky/correct items, then submit.")}</div></div>
          <p class="muted">Select exactly the safe/risky evidence for this prompt. Required: ${required}.</p>
          <div class="universal-grid">${shuffle(pack.list).map((item, index) => `<button class="universal-card" data-universal-multi="true" data-correct="${universalCorrect(item, pack.key, round) ? "true" : "false"}"><span>${esc(pack.label)} ${index + 1}</span><strong>${esc(normalizeLabel(item))}</strong></button>`).join("")}</div>
          <button class="btn btn-primary" id="universalMultiSubmit">Submit Selection</button>
        </div>
      `;
    }

    // 8) Single suspicious-file rounds.
    if (round.fileName) {
      const safeFiles = ["family_photo.jpg", "meeting_notes.pdf", "recipe.txt", "grandkids.png"];
      const files = shuffle([[round.fileName, true], ...sample(safeFiles, 3).map((name) => [name, false])]);
      return `
        <div class="explorer-ui"><div class="sidebar"><h3>Downloads</h3><p class="muted">Find the suspicious file and delete it without opening it.</p></div><div class="mainarea"><div class="file-grid">${files.map((file) => `<button class="file-card" data-universal-single="true" data-correct="${file[1] ? "true" : "false"}"><span class="file-icon">${fileIcon(file[0])}</span><strong>${esc(file[0])}</strong></button>`).join("")}</div></div></div>
      `;
    }

    // 9) Pop-up / download / movement-style legacy rounds are converted into a three-step action challenge.
    return `
      <div class="universal-console">
        <div class="scenario-box universal-brief"><div class="message-header"><span class="avatar">🎮</span><span>${esc(round.type)}</span></div><div class="scenario-text">${esc(round.scenario || round.body || round.description || round.directions || round.title)}</div></div>
        <div class="sequence-progress" id="universalSequenceProgress">Step 1 / 3: choose the safest first move.</div>
        <div class="grid3">
          <button class="action-btn" data-universal-step="Pause">Pause</button>
          <button class="action-btn" data-universal-step="Verify/report">Verify/report</button>
          <button class="action-btn" data-universal-step="Avoid unsafe action">Avoid unsafe action</button>
          <button class="action-btn" data-universal-step="Click bait">Click bait</button>
          <button class="action-btn" data-universal-step="Share code">Share code</button>
          <button class="action-btn" data-universal-step="Pay fast">Pay fast</button>
        </div>
      </div>
    `;
  }

  function wireUniversalRound(round) {
    // Choice + reason adapter.
    let selectedAction = null;
    let selectedReason = null;
    $$('[data-universal-action]').forEach((button) => on(button, "click", () => {
      sfx("click");
      $$('[data-universal-action]').forEach((b) => b.classList.remove("selected"));
      button.classList.add("selected");
      selectedAction = button.dataset.correct === "true";
    }));
    $$('[data-universal-reason]').forEach((button) => on(button, "click", () => {
      sfx("click");
      $$('[data-universal-reason]').forEach((b) => b.classList.remove("selected"));
      button.classList.add("selected");
      selectedReason = button.dataset.correct === "true";
    }));
    if ($("#universalSubmit")) on($("#universalSubmit"), "click", () => {
      if (selectedAction === null || selectedReason === null) return toast("Choose both an action and a reason.");
      selectedAction && selectedReason ? passRound("Legacy challenge cleared with reasoning.") : failRound("The action or reason was unsafe.");
    });

    // Single-choice adapter.
    $$('[data-universal-single]').forEach((button) => on(button, "click", () => {
      sfx("click");
      button.dataset.correct === "true" ? passRound("Correct safe choice.") : failRound("That choice was unsafe.");
    }));

    // Money/MFA specialized fallback.
    if (typeof round.targetAmount === "number") return wireMoney(round);
    if (typeof round.approve === "boolean") return wireMFA(round);

    // Text answer adapter.
    if ($("#universalTextSend")) on($("#universalTextSend"), "click", () => {
      const expected = String(round.answer || round.word || "").trim().toLowerCase();
      const typed = String($("#universalText")?.value || "").trim().toLowerCase();
      typed === expected ? passRound("Safe response sent.") : failRound(`Type exactly: ${round.answer || round.word}`);
    });

    // Multi-select adapter.
    $$('[data-universal-multi]').forEach((button) => on(button, "click", () => {
      sfx("click");
      button.classList.toggle("selected");
    }));
    if ($("#universalMultiSubmit")) on($("#universalMultiSubmit"), "click", () => {
      const cards = $$('[data-universal-multi]');
      const ok = cards.every((card) => card.classList.contains("selected") === (card.dataset.correct === "true"));
      ok ? passRound("Correct items selected.") : failRound("Selection included a decoy or missed real evidence.");
    });

    // Sequence adapter.
    let sequenceAnswer = Array.isArray(round.answer) ? round.answer : null;
    if (Array.isArray(round.steps)) sequenceAnswer = Array.isArray(round.answer) ? round.answer : round.steps;
    if (!sequenceAnswer && $$("[data-universal-step]").length) sequenceAnswer = ["Pause", "Verify/report", "Avoid unsafe action"];
    let stepIndex = 0;
    $$('[data-universal-step]').forEach((button) => on(button, "click", () => {
      sfx("click");
      const step = button.dataset.universalStep;
      if (step === sequenceAnswer[stepIndex]) {
        button.classList.add("correct");
        stepIndex += 1;
        const host = $("#universalSequenceProgress");
        if (host && stepIndex < sequenceAnswer.length) host.textContent = `Step ${stepIndex + 1} / ${sequenceAnswer.length}: choose ${sequenceAnswer[stepIndex]}`;
        if (stepIndex >= sequenceAnswer.length) return passRound("Safe sequence completed.");
      } else {
        failRound("Wrong step in the safety sequence.");
      }
    }));
  }




  /* ============================================================
     17C) V14 Full Legacy Restoration Layer
     Purpose: restores every older/current arcade mechanic as a real
     activity instead of falling back to MCQ/universal layouts.
     ============================================================ */
  function resetMicroState() {
    state.step = 0;
    state.selectedSet = new Set();
    state.starCount = 0;
    state.platform = null;
    state.money = 0;
    state.danger = 0;
    state.download = 0;
    state.mash = 0;
    state.hits = new Set();
    state.miss = 0;
    state.playerX = 50;
    state.good = 0;
    state.orderIndex = 0;
    state.dragGood = 0;
    state.dragBad = 0;
    if (state.current?.type !== "bossRush") state.boss = null;
  }

  function startGame() {
    clearLoops();
    ensureAudio();
    Object.assign(state, {
      selected: [], idx: 0, score: 0, correct: 0, mistakes: 0, streak: 0, bestStreak: 0,
      trust: 100, fraudster: 28, powerups: { iris: 3, freeze: 1, shield: 1 }, boss: null, lessons: [], practiceMode: false
    });

    const boss = ROUNDS.find((round) => round.type === "bossRush");
    const pool = ROUNDS.filter((round) => round.type !== "bossRush" && round.type !== "legacyBossRush");
    const chosen = [];
    const used = new Set();
    const buckets = [
      ["action", ["virusDownload", "rushStopDownload", "tabStopDownload", "popupPurge", "closeWindowX", "hintPlatformer", "platformHints", "fallingDodge", "shieldBlock", "spotlightSpy", "spywareMaze", "spamBlockHunt"], 6],
      ["files", ["attachmentFlash", "attachmentMemory", "fileDelete", "fileExplorerDelete", "downloadDelete", "taskbarFileDelete", "dragTrash", "giftCardShredder", "passwordVaultDrag"], 5],
      ["social", ["gameChatReport", "lobbyMute", "emailBlock", "smsBlock", "smsReport", "chatRefuse", "romanceSwipe", "marketplaceMatch", "swipeJudge", "socialFirewall"], 5],
      ["browser", ["dangerWebsite", "siteInspector", "freeSiteExit", "privacyExit", "passwordFill", "passwordManagerFill", "domainDuel", "qrScan", "qrLensFocus", "wifiHotspotChoice", "vpnTunnelSwitch"], 4],
      ["logic", ["deepfakeSpot", "bankStatementHunt", "shoppingCartAudit", "extensionAudit", "permissionsToggle", "permissionToggle", "privacyCleaner", "clipboardCleaner", "evidenceTokenSelect", "familyCallOrder", "sequenceBuilder", "firewallPatchGrid", "mfaApprovalGate", "mfaShield", "moneyCounter", "moneyGuard", "safeAmount", "categoryMatch", "sortBasket", "legitOrScamCalibration", "safeWordChallenge", "callInterrupt"], 4]
    ];

    function addFromTypes(types, count) {
      const candidates = pool.filter((round) => types.includes(round.type) && !used.has(round.id));
      const difficultyPreferred = candidates.filter((round) => {
        if (state.difficulty === "easy") return round.difficulty !== "hard";
        if (state.difficulty === "hard") return round.difficulty !== "easy" || Math.random() < 0.35;
        return true;
      });
      sample(difficultyPreferred.length ? difficultyPreferred : candidates, count).forEach((round) => {
        if (!used.has(round.id)) { chosen.push(round); used.add(round.id); }
      });
    }

    buckets.forEach(([, types, count]) => addFromTypes(types, count));
    const remaining = shuffle(pool.filter((round) => !used.has(round.id)));
    while (chosen.length < DATA.site.arcadeRoundsBeforeBoss && remaining.length) {
      const next = remaining.shift();
      chosen.push(next);
      used.add(next.id);
    }
    state.selected = shuffle(chosen).slice(0, DATA.site.arcadeRoundsBeforeBoss);
    if (boss) state.selected.push(boss);
    renderRound();
  }

  function typeDisplayName(type) {
    const names = {
      safeChoice: "Verification Decisions", safeChoicePlus: "Advanced Verification Decisions", codeShield: "2FA Code Shield", recoveryKeyPuzzle: "Recovery Key Protection", captchaTrap: "Fake Captcha Escapes", searchResultPick: "Search Result Minefields", wifiHotspotChoice: "Wi-Fi Choice", dangerWebsite: "Mock Website Escapes", siteInspector: "Website Red-Flag Inspector", freeSiteExit: "Fake Free-Site Exit", privacyExit: "Data-Grab Form Exit", domainDuel: "Domain Duel", vpnTunnelSwitch: "VPN Tunnel Routing", passwordFill: "Password Manager Checks", passwordManagerFill: "Legacy Password Manager", qrScan: "QR Safety Lens", qrLensFocus: "QR Lens Focus", romanceSwipe: "Mock Romance Swipes", marketplaceMatch: "Marketplace Swipes", swipeJudge: "Legacy Swipe Judge", attachmentFlash: "Attachment Flash", attachmentMemory: "Legacy Attachment Memory", fileDelete: "Risky File Cleanup", fileExplorerDelete: "File Explorer Cleanup", downloadDelete: "Download Delete", taskbarFileDelete: "Taskbar File Delete", dragTrash: "Drag Scams to Trash", giftCardShredder: "Gift Card Shredder", passwordVaultDrag: "Password Vault Drag", gameChatReport: "Game Chat Report", lobbyMute: "Lobby Mute/Report", emailBlock: "Email Block Sender", smsBlock: "SMS Block", smsReport: "SMS Report Spam", chatRefuse: "Typed Refusal", platformHints: "Moving Hint Platformer", hintPlatformer: "Legacy Moving Platformer", fallingDodge: "Falling Dodge", shieldBlock: "Shield Block", spotlightSpy: "Mouse Searchlight Spyware", spywareMaze: "Spyware Maze", popupPurge: "Pop-Up Purge", closeWindowX: "Find Real X", virusDownload: "Virus Download Mash", tabStopDownload: "Browser Tab Stop Download", rushStopDownload: "Rush Stop Download", spamBlockHunt: "Spam Block Hunt", deepfakeSpot: "Deepfake Clue Spotter", bankStatementHunt: "Bank Statement Hunt", shoppingCartAudit: "Shopping Cart Audit", extensionAudit: "Extension Audit", permissionsToggle: "Legacy Permissions Toggle", permissionToggle: "Permission Toggles", privacyCleaner: "Privacy Cleaner", clipboardCleaner: "Clipboard Cleaner", evidenceTokenSelect: "Evidence Token Select", familyCallOrder: "Family Call Order", sequenceBuilder: "Sequence Builder", firewallPatchGrid: "Firewall Patch Grid", mfaApprovalGate: "MFA Approval Gate", mfaShield: "MFA Shield", moneyCounter: "Money Counter", moneyGuard: "Money Guard", safeAmount: "Safe Amount", categoryMatch: "Category Match", sortBasket: "Sort Basket", socialFirewall: "Social Firewall", callInterrupt: "Call Interrupt", safeWordChallenge: "Safe Word Challenge", legitOrScamCalibration: "Legit or Scam Calibration", legacyBossRush: "Legacy Boss Rush", bossRush: "Final Boss"
    };
    return names[type] || type;
  }

  function showLibrary() {
    const groups = ROUNDS.reduce((acc, round, index) => {
      const key = typeDisplayName(round.type);
      if (!acc[key]) acc[key] = [];
      acc[key].push({ round, index });
      return acc;
    }, {});
    render(`
      <section class="screen library-screen">
        ${topbar()}
        <div class="panel library-panel">
          <div class="library-hero">
            <div>
              <span class="eyebrow">Full game library</span>
              <h2>${ROUNDS.length} playable challenges. Every legacy/current minigame is restored.</h2>
              <p>Each mode is stacked vertically with Enter Challenge buttons, so nothing is hidden in side-by-side overflow. Use this to test mouse searchlight, movement, virus delete, romance swipe, messages, browser, files, and the boss.</p>
            </div>
            <div class="library-actions"><button class="btn" id="backBtn">Back</button><button class="btn btn-primary" id="startBtn">Start Full Run</button></div>
          </div>
          <div class="library-list">
            ${Object.entries(groups).map(([group, items]) => `
              <section class="library-section">
                <h3>${esc(group)} <span class="muted">(${items.length})</span></h3>
                <div class="library-stack">
                  ${items.map(({ round, index }) => `
                    <article class="library-card library-row-card">
                      <div><strong>${index + 1}. ${esc(round.title)}</strong><small>${esc(round.category)} · ${esc(round.difficulty)} · ${esc(round.command)}<br>${esc(round.directions || "")}</small></div>
                      <button class="btn btn-secondary btn-small" data-practice-index="${index}">Enter Challenge</button>
                    </article>`).join("")}
                </div>
              </section>`).join("")}
          </div>
          <div class="button-row"><button class="btn" id="backBottomBtn">Back</button><button class="btn btn-primary" id="startBottomBtn">Start Full Run</button></div>
        </div>
      </section>
    `);
    wireTopbar();
    on($("#motionEnableBtn"), "click", async () => {
      const enabled = await v16EnableMotionControls();
      if (enabled) {
        const motion = $('input[name="deviceMode"][value="motion"]');
        if (motion) motion.checked = true;
      }
    });
    on($("#motionCalibrateBtn"), "click", v16CalibrateTilt);
    on($("#backBtn"), "click", showHome); on($("#backBottomBtn"), "click", showHome);
    on($("#startBtn"), "click", showSetup); on($("#startBottomBtn"), "click", showSetup);
    $$('[data-practice-index]').forEach((button) => on(button, "click", () => startPractice(Number(button.dataset.practiceIndex))));
  }

  function drawRound(round) {
    const t = round.type;
    if (["safeChoice", "safeChoicePlus", "codeShield", "recoveryKeyPuzzle", "captchaTrap", "searchResultPick", "wifiHotspotChoice", "deepfakeCall"].includes(t)) return drawChoiceV14(round);
    if (t === "dangerWebsite") return drawDangerWebsite(round);
    if (t === "siteInspector") return drawSiteInspector(round);
    if (t === "freeSiteExit" || t === "privacyExit") return drawExitSite(round);
    if (t === "domainDuel" || t === "passwordManagerFill" || t === "passwordFill") return drawDomainPick(round);
    if (t === "vpnTunnelSwitch") return drawVpnTunnel(round);
    if (t === "qrLensFocus") return drawQrLensFocus(round);
    if (t === "qrScan") return drawQRScan(round);
    if (t === "romanceSwipe" || t === "swipeJudge") return drawSwipe(round, "romance");
    if (t === "marketplaceMatch") return drawSwipe(round, "marketplace");
    if (t === "attachmentFlash") return drawAttachmentFlash(round);
    if (t === "attachmentMemory") return drawAttachmentMemory(round);
    if (t === "fileDelete") return drawFileDelete(round);
    if (t === "fileExplorerDelete") return drawFileExplorerDelete(round);
    if (t === "downloadDelete") return drawDownloadDelete(round);
    if (t === "taskbarFileDelete") return drawTaskbarFileDelete(round);
    if (t === "dragTrash") return drawDragTrash(round);
    if (t === "giftCardShredder") return drawGiftCardShredder(round);
    if (t === "passwordVaultDrag") return drawPasswordVault(round);
    if (t === "gameChatReport" || t === "lobbyMute") return drawLobbyV14(round);
    if (t === "emailBlock") return drawEmailBlock(round);
    if (t === "smsBlock" || t === "smsReport" || t === "smsReportSpam") return drawPhoneMenu(round, t === "smsBlock" ? "Block Contact" : "Report Spam");
    if (t === "chatRefuse") return drawChatRefuse(round);
    if (t === "platformHints" || t === "hintPlatformer") return drawPlatformer(round);
    if (t === "fallingDodge" || t === "shieldBlock") return drawFallingDodge(round, t === "shieldBlock");
    if (t === "spotlightSpy") return drawSpotlightSpy(round);
    if (t === "spywareMaze") return drawSpywareMaze(round);
    if (t === "popupPurge") return drawPopupPurge(round);
    if (t === "closeWindowX") return drawCloseWindowX(round);
    if (t === "virusDownload") return drawVirusDownload(round);
    if (t === "tabStopDownload") return drawTabStopDownload(round);
    if (t === "rushStopDownload") return drawRushStopDownload(round);
    if (t === "spamBlockHunt") return drawSpamBlockHunt(round);
    if (t === "inboxShooter" || t === "downloadShooter") return drawShooter(round);
    if (["deepfakeSpot", "bankStatementHunt", "shoppingCartAudit", "extensionAudit", "permissionsToggle", "privacyCleaner", "clipboardCleaner", "evidenceTokenSelect"].includes(t)) return drawSelectAudit(round);
    if (t === "socialFirewall") return drawSocialFirewall(round);
    if (t === "permissionToggle") return drawPermissionToggle(round);
    if (t === "familyCallOrder" || t === "sequenceBuilder") return drawOrder(round);
    if (t === "firewallPatchGrid") return drawFirewallPatchGrid(round);
    if (t === "mfaApprovalGate" || t === "mfaShield") return drawMFA(round);
    if (t === "moneyCounter" || t === "moneyGuard" || t === "safeAmount") return drawMoney(round);
    if (t === "categoryMatch") return drawCategoryMatch(round);
    if (t === "sortBasket") return drawSortBasket(round);
    if (t === "callInterrupt") return drawCallInterrupt(round);
    if (t === "safeWordChallenge") return drawSafeWordChallenge(round);
    if (t === "legitOrScamCalibration") return drawLegitOrScam(round);
    if (t === "legacyBossRush") return drawLegacyBoss(round);
    if (t === "bossRush") return drawBoss(round);
    return drawUniversalRound(round);
  }

  function wireRound(round) {
    const t = round.type;
    if (["safeChoice", "safeChoicePlus", "codeShield", "recoveryKeyPuzzle", "captchaTrap", "searchResultPick", "wifiHotspotChoice", "deepfakeCall"].includes(t)) return wireChoice();
    if (t === "dangerWebsite") return wireChoice();
    if (t === "siteInspector") return wireSiteInspector(round);
    if (t === "freeSiteExit" || t === "privacyExit") return wireExitSite();
    if (t === "domainDuel" || t === "passwordManagerFill" || t === "passwordFill") return wireDomainPick();
    if (t === "vpnTunnelSwitch") return wireVpnTunnel();
    if (t === "qrLensFocus") return wireQrLensFocus();
    if (t === "qrScan") return wireQRScan(round);
    if (t === "romanceSwipe" || t === "swipeJudge") return wireSwipe(round, "romance");
    if (t === "marketplaceMatch") return wireSwipe(round, "marketplace");
    if (t === "attachmentFlash") return wireAttachmentFlash(round);
    if (t === "attachmentMemory") return wireAttachmentMemory(round);
    if (t === "fileDelete") return wireFileDelete(round);
    if (t === "fileExplorerDelete") return wireFileExplorerDelete(round);
    if (t === "downloadDelete") return wireDownloadDelete(round);
    if (t === "taskbarFileDelete") return wireTaskbarFileDelete(round);
    if (t === "dragTrash") return wireDragTrash(round);
    if (t === "giftCardShredder") return wireGiftCardShredder(round);
    if (t === "passwordVaultDrag") return wirePasswordVault(round);
    if (t === "gameChatReport" || t === "lobbyMute") return wireLobbyV14(round);
    if (t === "emailBlock") return wireEmailBlock();
    if (t === "smsBlock" || t === "smsReport" || t === "smsReportSpam") return wirePhoneMenu();
    if (t === "chatRefuse") return wireChatRefuse(round);
    if (t === "platformHints" || t === "hintPlatformer") return wirePlatformer(round);
    if (t === "fallingDodge" || t === "shieldBlock") return wireFallingDodge(round, t === "shieldBlock");
    if (t === "spotlightSpy") return wireSpotlightSpy(round);
    if (t === "spywareMaze") return wireSpywareMaze(round);
    if (t === "popupPurge") return wirePopupPurge(round);
    if (t === "closeWindowX") return wireCloseWindowX();
    if (t === "virusDownload") return wireVirusDownload(round);
    if (t === "tabStopDownload") return wireTabStopDownload(round);
    if (t === "rushStopDownload") return wireRushStopDownload(round);
    if (t === "spamBlockHunt") return wireSpamBlockHunt(round);
    if (t === "inboxShooter" || t === "downloadShooter") return wireShooter(round);
    if (["deepfakeSpot", "bankStatementHunt", "shoppingCartAudit", "extensionAudit", "permissionsToggle", "privacyCleaner", "clipboardCleaner", "evidenceTokenSelect"].includes(t)) return wireSelectAudit(round);
    if (t === "socialFirewall") return wireSocialFirewall(round);
    if (t === "permissionToggle") return wirePermissionToggle(round);
    if (t === "familyCallOrder" || t === "sequenceBuilder") return wireOrder(round);
    if (t === "firewallPatchGrid") return wireFirewallPatchGrid(round);
    if (t === "mfaApprovalGate" || t === "mfaShield") return wireMFA(round);
    if (t === "moneyCounter" || t === "moneyGuard" || t === "safeAmount") return wireMoney(round);
    if (t === "categoryMatch") return wireCategoryMatch(round);
    if (t === "sortBasket") return wireSortBasket(round);
    if (t === "callInterrupt") return wireCallInterrupt(round);
    if (t === "safeWordChallenge") return wireSafeWordChallenge(round);
    if (t === "legitOrScamCalibration") return wireLegitOrScam(round);
    if (t === "legacyBossRush") return wireLegacyBoss(round);
    if (t === "bossRush") return wireBoss(round);
    return wireUniversalRound(round);
  }

  function drawChoiceV14(round) {
    const scenario = round.scenario || round.requester || round.prompt || round.message || round.body || round.directions || "Choose the safest action.";
    const options = round.options || round.networks || [["Safe option", true], ["Risky option", false]];
    const reasons = reasonBank(round);
    return `
      <div class="scenario-box">
        <div class="message-header"><span class="avatar">${round.code ? "🔢" : "🛡️"}</span><span>${esc(round.category)}</span></div>
        ${round.code ? `<div class="study-banner">Private code on your device: <strong>${esc(round.code)}</strong></div>` : ""}
        <div class="scenario-text">${esc(scenario)}</div>
      </div>
      <div class="verify-grid">
        <div class="verify-column"><h3>1) Choose the safest action</h3><div class="action-grid compact-actions">${shuffle(options).map((option) => `<button class="action-btn" data-choice-action="true" data-correct="${option[1] ? "true" : "false"}">${esc(option[0])}</button>`).join("")}</div></div>
        <div class="verify-column"><h3>2) Prove why</h3><div class="reason-grid">${reasons.map((reason) => `<button class="reason-btn" data-choice-reason="true" data-correct="${reason[1] ? "true" : "false"}">${esc(reason[0])}</button>`).join("")}</div></div>
      </div>
      <button class="btn btn-primary verify-submit" id="submitChoice">Lock Action + Reason</button>
    `;
  }

  function drawDomainPick(round) {
    return `<div class="pm-browser"><div class="scenario-box"><div class="message-header"><span class="avatar">🔐</span><span>Official destination</span></div><div class="scenario-text">${esc(round.scenario || round.directions || "Only trust the exact official domain.")}<br><strong>${esc(round.official || "")}</strong></div></div><div class="grid3">${shuffle(round.domains || []).map((d) => `<button class="domain-card" data-domain-ok="${d === round.official ? "true" : "false"}">🌐 ${esc(d)}</button>`).join("")}</div></div>`;
  }
  function wireDomainPick() { $$('[data-domain-ok]').forEach((b) => on(b, "click", () => b.dataset.domainOk === "true" ? passRound("Official domain chosen.") : failRound("That was a lookalike or unsafe domain."))); }

  function drawVpnTunnel(round) {
    const lanes = shuffle([[round.target || "Trusted VPN", true, "🛡️"], ["Free VPN Installer Ad", false, "🎁"], ["Open Public Wi‑Fi Login", false, "📶"], ["Unknown Proxy Pop-up", false, "⚠️"]]);
    return `<div class="scenario-box"><div class="message-header"><span class="avatar">🛜</span><span>VPN Tunnel</span></div><div class="scenario-text">${esc(round.scenario || round.directions)}</div></div><div class="choice-lanes">${lanes.map((l) => `<button class="action-btn" data-vpn-ok="${l[1] ? "true" : "false"}"><span class="big">${l[2]}</span>${esc(l[0])}</button>`).join("")}</div>`;
  }
  function wireVpnTunnel() { $$('[data-vpn-ok]').forEach((b) => on(b, "click", () => b.dataset.vpnOk === "true" ? passRound("Traffic routed through the trusted tunnel.") : failRound("That route exposed you to a trap."))); }

  function drawQrLensFocus(round) {
    const qs = shuffle([["Official posted meter QR", true], ["Sticker covering old QR", false], ["Prize fee QR", false], ["Random texted QR", false]]);
    return `<div class="scenario-box"><div class="message-header"><span class="avatar">▦</span><span>QR Lens Focus</span></div><div class="scenario-text">${esc(round.directions || "Scan only the official QR in the correct context.")}</div></div><div class="grid3">${qs.map((q) => `<button class="qr-tile" data-qr-ok="${q[1] ? "true" : "false"}"><strong>▦</strong><br>${esc(q[0])}</button>`).join("")}</div>`;
  }
  function wireQrLensFocus() { $$('[data-qr-ok]').forEach((b) => on(b, "click", () => b.dataset.qrOk === "true" ? passRound("Official QR scanned.") : failRound("That QR context was suspicious."))); }

  function drawExitSite(round) {
    return `<div class="mock-window fake-site-play"><button class="btn btn-primary safe-exit" id="safeExitBtn">Safe Exit ✕</button><div class="mock-title"><span>🌐 Suspicious Page</span><span>${esc(round.category)}</span></div><div class="mock-body"><div class="url-bar">not-secure-${esc(round.category || "site").toLowerCase().replaceAll(" ", "-")}.biz</div><div class="fake-site-hero"><h3>${esc(round.headline)}</h3><p>${esc(round.body)}</p></div><div class="grid3"><button class="fake-browser-tile" data-bait="true">Install required player</button><button class="fake-browser-tile" data-bait="true">Allow notifications</button><button class="fake-browser-tile" data-bait="true">Enter personal details</button></div></div></div>`;
  }
  function wireExitSite() { on($("#safeExitBtn"), "click", () => passRound("Exited without clicking bait.")); $$('[data-bait]').forEach((b) => on(b, "click", () => failRound("Clicked suspicious site bait."))); }

  function drawAttachmentMemory(round) {
    const flipped = state.step >= 1;
    return `<div class="study-banner">${flipped ? "Pick one safe attachment from memory." : "Study the attachments. They will flip over."}</div><div class="file-grid">${(round.attachments || []).map((f, i) => `<button class="file-card" data-attach-safe="${f[2] ? "true" : "false"}" ${flipped ? "" : "disabled"}><span class="file-icon">${esc(f[1] || fileIcon(f[0]))}</span><strong>${flipped ? "Attachment " + (i + 1) : esc(f[0])}</strong></button>`).join("")}</div>`;
  }
  function wireAttachmentMemory(round) {
    if (state.step === 0) { const timeout = setTimeout(() => { if (state.answered) return; state.step = 1; $("#microgame").innerHTML = drawAttachmentMemory(round); wireAttachmentMemory(round); }, round.revealMs || 2600); addCleanup(() => clearTimeout(timeout)); return; }
    $$('[data-attach-safe]').forEach((b) => on(b, "click", () => b.dataset.attachSafe === "true" ? passRound("Safe attachment remembered.") : failRound("That attachment was risky.")));
  }

  function drawFileExplorerDelete(round) {
    return `<div class="explorer-ui"><div class="sidebar"><h3>Downloads</h3><p class="muted">Select risky files and delete. Safe files are decoys.</p></div><div class="mainarea"><div class="file-grid">${(round.files || []).map((f, i) => `<button class="file-card" data-file-risky="${f[2] ? "true" : "false"}"><span class="file-icon">${esc(f[1] || fileIcon(f[0]))}</span><strong>${esc(f[0])}</strong></button>`).join("")}</div><button class="btn btn-danger" id="deleteExplorerFiles">Delete Selected</button></div></div>`;
  }
  function wireFileExplorerDelete(round) { $$('[data-file-risky]').forEach((b) => on(b, "click", () => b.classList.toggle("selected"))); on($("#deleteExplorerFiles"), "click", () => { const cards = $$('[data-file-risky]'); const ok = cards.every((c) => c.classList.contains("selected") === (c.dataset.fileRisky === "true")); ok ? passRound("Risky files deleted from File Explorer.") : failRound("File cleanup selected the wrong files."); }); }

  function drawDownloadDelete(round) {
    const files = shuffle([[round.fileName || "Unknown_File.exe", true], ["receipt.pdf", false], ["family_photo.jpg", false], ["meeting_notes.txt", false]]);
    return `<div class="mock-window"><div class="mock-title"><span>Downloads</span><span>⬇️</span></div><div class="mock-body"><p>${esc(round.description || round.directions)}</p><div class="file-grid">${files.map((f) => `<button class="file-card" data-download-risky="${f[1] ? "true" : "false"}"><span class="file-icon">${fileIcon(f[0])}</span><strong>${esc(f[0])}</strong></button>`).join("")}</div><button class="btn btn-danger" id="deleteDownloadFile">Delete Selected</button></div></div>`;
  }
  function wireDownloadDelete() { $$('[data-download-risky]').forEach((b) => on(b, "click", () => { $$('[data-download-risky]').forEach((x) => x.classList.remove("selected")); b.classList.add("selected"); })); on($("#deleteDownloadFile"), "click", () => { const s = $('[data-download-risky].selected'); if (!s) return toast("Select a file first."); s.dataset.downloadRisky === "true" ? passRound("Bad download deleted.") : failRound("That was a safe decoy file."); }); }

  function drawTaskbarFileDelete(round) {
    return `<div class="mock-window"><div class="mock-title"><span>Desktop</span><span>Suspicious download</span></div><div class="mock-body"><p>Unknown file detected: <strong>${esc(round.fileName)}</strong></p><div class="danger-bar"><span id="downloadBar" style="width:18%"></span></div><div class="taskbar"><button class="btn" id="startMenu">Start</button><button class="btn btn-primary" id="fileExplorerApp">File Explorer</button><button class="btn" id="browserApp">Browser</button></div><div id="taskbarPanel" class="desktop-panel">Open File Explorer, select the suspicious file, then delete it.</div></div></div>`;
  }
  function wireTaskbarFileDelete(round) {
    const grow = setInterval(() => { if (state.answered) return clearInterval(grow); state.download += 1.1; if ($("#downloadBar")) $("#downloadBar").style.width = `${clamp(18 + state.download, 0, 100)}%`; if (state.download >= 82) failRound("The suspicious file was opened automatically."); }, 180); addCleanup(() => clearInterval(grow));
    on($("#fileExplorerApp"), "click", () => { $("#taskbarPanel").innerHTML = `<h3>Downloads</h3><button class="file-card" id="taskbarFile"><span class="file-icon">${fileIcon(round.fileName)}</span><strong>${esc(round.fileName)}</strong></button><button class="btn btn-danger" id="taskbarDelete">Delete File</button>`; on($("#taskbarFile"), "click", () => $("#taskbarFile").classList.add("selected")); on($("#taskbarDelete"), "click", () => $("#taskbarFile").classList.contains("selected") ? passRound("Suspicious file deleted from File Explorer.") : toast("Select the suspicious file first.")); });
    on($("#browserApp"), "click", () => minorPenalty("Wrong app. File Explorer is needed.")); on($("#startMenu"), "click", () => minorPenalty("Use File Explorer directly."));
  }

  function drawDragTrash(round) {
    return `<div class="drag-trash-stage"><div><p class="arcade-note">Drag or click scam items into the trash. Do not trash safe items.</p><div class="drag-list">${(round.items || []).map((item, i) => `<button class="draggable-chip" draggable="true" data-drag-index="${i}" data-drag-risky="${item[1] ? "true" : "false"}">${esc(item[0])}</button>`).join("")}</div></div><div class="trash-bin" id="trashBin">🗑️<br>Trash Scam Items</div></div>`;
  }
  function wireDragTrash(round) {
    function mark(chip) { if (!chip || chip.classList.contains("selected")) return; chip.classList.add("selected"); chip.dataset.dragRisky === "true" ? state.dragGood++ : state.dragBad++; if (state.dragGood >= (round.needed || 1) && state.dragBad === 0) passRound("Scams moved to trash."); if (state.dragBad > 0) failRound("A safe item was trashed."); }
    $$('[data-drag-index]').forEach((chip) => { on(chip, "click", () => mark(chip)); on(chip, "dragstart", (e) => e.dataTransfer.setData("text/plain", chip.dataset.dragIndex)); });
    const bin = $("#trashBin"); on(bin, "dragover", (e) => { e.preventDefault(); bin.classList.add("drag-over"); }); on(bin, "dragleave", () => bin.classList.remove("drag-over")); on(bin, "drop", (e) => { e.preventDefault(); bin.classList.remove("drag-over"); mark($(`[data-drag-index="${e.dataTransfer.getData("text/plain")}"]`)); });
  }

  function drawGiftCardShredder(round) {
    return `<div class="gift-stage"><div class="scenario-box"><div class="message-header"><span class="avatar">🎁</span><span>Gift Card Code</span></div><p>${esc(round.scenario || round.directions)}</p><button class="draggable-chip" draggable="true" id="giftCode">CODE-8429-1137</button></div><div class="shredder-box" id="shredderBox">🧾✂️<br>Shred Code</div><div class="send-box" id="sendBox">📤<br>Send to Scammer</div></div>`;
  }
  function wireGiftCardShredder() {
    const code = $("#giftCode"); on(code, "dragstart", (e) => e.dataTransfer.setData("text/plain", "gift")); on(code, "click", () => toast("Drag the code to the shredder, not the send box."));
    [["#shredderBox", true], ["#sendBox", false]].forEach(([sel, ok]) => { const box = $(sel); on(box, "dragover", (e) => { e.preventDefault(); box.classList.add("drag-over"); }); on(box, "dragleave", () => box.classList.remove("drag-over")); on(box, "drop", (e) => { e.preventDefault(); ok ? passRound("Gift card code destroyed, not shared.") : failRound("Sent the gift card code to the scammer."); }); });
  }

  function drawPasswordVault(round) {
    return `<div class="vault-stage"><div class="scenario-box"><div class="message-header"><span class="avatar">🔐</span><span>Password Token</span></div><p>${esc(round.scenario || round.directions)}</p><button class="draggable-chip" draggable="true" id="passwordToken">•••••••• saved password</button></div><div class="vault-box" id="vaultBox">🔐<br>Password Vault</div><div class="fake-form-box" id="fakeFormBox">🚩<br>Fake Form</div></div>`;
  }
  function wirePasswordVault() { const token = $("#passwordToken"); on(token, "dragstart", (e) => e.dataTransfer.setData("text/plain", "pw")); [["#vaultBox", true], ["#fakeFormBox", false]].forEach(([sel, ok]) => { const box = $(sel); on(box, "dragover", (e) => { e.preventDefault(); box.classList.add("drag-over"); }); on(box, "dragleave", () => box.classList.remove("drag-over")); on(box, "drop", (e) => { e.preventDefault(); ok ? passRound("Password stayed in the vault.") : failRound("Password was dropped into a fake form."); }); }); }

  function drawLobbyV14(round) {
    const scamPlayer = round.player || round.spammer || "ScamBot99";
    const decoys = round.decoys || ["PixelPat", "GardenMom", "Runner42", "StudyBuddy"];
    const players = shuffle([scamPlayer, ...decoys]);
    const lines = shuffle(["Anyone want to play next round?", "Good game!", "Need one more player.", "I found the checkpoint."]).slice(0, 2);
    return `<div class="lobby-ui"><div class="sidebar"><h3>Players</h3><div class="player-list">${players.map((p) => `<button class="lobby-player" data-player="${esc(p)}">${esc(p)}</button>`).join("")}</div></div><div class="mainarea"><div class="chat-log"><div class="chat-line"><strong>${esc(scamPlayer)}:</strong> ${esc(round.message)}</div>${lines.map((l, i) => `<div class="chat-line"><strong>${esc(decoys[i] || "Player")}:</strong> ${esc(l)}</div>`).join("")}</div><div class="player-menu" id="playerMenu"><strong id="menuTitle">Select suspicious player first.</strong><div class="grid3"><button class="action-btn" data-menu-action="friend">Add Friend</button><button class="action-btn" data-menu-action="report">Mute + Report</button><button class="action-btn" data-menu-action="open">Open Link</button></div></div></div></div>`;
  }
  function wireLobbyV14(round) { const scamPlayer = round.player || round.spammer || "ScamBot99"; let selected = null; $$('.lobby-player').forEach((b) => on(b, "click", () => { selected = b.dataset.player; $$('.lobby-player').forEach((x) => x.classList.remove("selected")); b.classList.add("selected"); $("#playerMenu").classList.add("open"); $("#menuTitle").textContent = `${selected} options`; if (selected !== scamPlayer) minorPenalty("Wrong player — look for the scam message sender."); })); $$('[data-menu-action]').forEach((b) => on(b, "click", () => { if (!selected) return toast("Select a player first."); if (selected === scamPlayer && b.dataset.menuAction === "report") return passRound("Suspicious player muted and reported."); if (b.dataset.menuAction === "open") return failRound("Opened the scam link."); minorPenalty("Use Mute + Report on the suspicious player."); })); }

  function drawEmailBlock(round) { return `<div class="email-ui" style="display:grid;grid-template-columns:minmax(180px,230px) 1fr"><aside class="email-sidebar"><strong>Inbox</strong><p class="small muted">Security Alert<br>Receipt<br>Family Photos</p></aside><section class="email-content"><div class="message-header"><span class="avatar">✉️</span><span>${esc(round.sender || "Sender")} · ${esc(round.from || "unknown@example.com")}</span></div><div class="scenario-text">${esc(round.body || round.scenario || "")}</div><button class="btn" id="emailMenuBtn">⋯ Email Actions</button><div class="email-menu" id="emailMenu"><button class="action-btn" data-email-action="reply">Reply</button><button class="action-btn" data-email-action="open">Open Link</button><button class="action-btn" data-email-action="block">Block Sender</button><button class="action-btn" data-email-action="forward">Forward</button></div></section></div>`; }
  function wireEmailBlock() { on($("#emailMenuBtn"), "click", () => $("#emailMenu").classList.add("open")); $$('[data-email-action]').forEach((b) => on(b, "click", () => b.dataset.emailAction === "block" ? passRound("Sender blocked/reported.") : failRound("That email action increases risk."))); }

  function drawPhoneMenu(round, safeLabel) { return `<div class="phone-frame"><div class="phone-screen"><div class="phone-top"><span>${esc(round.sender || "Messages")}</span><button class="phone-btn" id="phoneMenu">⋯</button></div><div class="phone-chat"><div class="bubble">${esc(round.message || round.scenario || "")}</div></div><div class="phone-menu" id="phoneMenuPanel" hidden><button class="phone-btn" data-phone-action="reply">Reply</button><button class="phone-btn" data-phone-action="open">Open Link</button><button class="phone-btn" data-phone-action="safe">${esc(safeLabel)}</button><button class="phone-btn" data-phone-action="code">Send Code</button></div></div></div>`; }
  function wirePhoneMenu() { on($("#phoneMenu"), "click", () => $("#phoneMenuPanel").hidden = false); $$('[data-phone-action]').forEach((b) => on(b, "click", () => b.dataset.phoneAction === "safe" ? passRound("Message blocked/reported.") : failRound("That response engages the scam."))); }

  function drawChatRefuse(round) { return `<div class="phone-frame"><div class="phone-screen"><div class="phone-top"><span>${esc(round.person || "Chat")}</span><span>Safe Reply</span></div><div class="phone-chat"><div class="bubble">${esc(round.message)}</div><div class="chat-input-row"><input class="chat-input" id="refuseInput" placeholder="Type ${esc(round.answer || "REFUSE")}" /><button class="btn btn-primary" id="refuseSend">Send</button></div></div></div></div>`; }
  function wireChatRefuse(round) { const submit = () => String($("#refuseInput").value).trim().toLowerCase() === String(round.answer || "REFUSE").toLowerCase() ? passRound("Safe refusal sent.") : failRound(`Type exactly: ${round.answer || "REFUSE"}`); on($("#refuseSend"), "click", submit); on($("#refuseInput"), "keydown", (e) => { if (e.key === "Enter") submit(); }); }

  function drawFallingDodge(round, shieldMode) { return `<div class="fall-field" id="fallField"><div class="${shieldMode ? "shield-player" : "fall-player"}" id="fallPlayer">${shieldMode ? "🛡️" : "🧍"}</div></div><p class="muted" id="fallScore">${shieldMode ? "Block scam items only." : "Avoid scam items and collect safe habits."} Score: 0</p><div class="control-pad"><button class="btn" id="leftBtn">←</button><button class="btn" id="rightBtn">→</button></div>`; }
  function wireFallingDodge(round, shieldMode) {
    const field = $("#fallField"), player = $("#fallPlayer"); const keys = { left:false, right:false }; state.playerX = 50; state.good = 0;
    function updatePlayer() { player.style.left = `${state.playerX}%`; player.style.bottom = "18px"; }
    function moveBy(dx) { state.playerX = clamp(state.playerX + dx, 2, 92); updatePlayer(); }
    on(document, "keydown", (e) => { if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") keys.left=true; if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") keys.right=true; });
    on(document, "keyup", (e) => { if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") keys.left=false; if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") keys.right=false; });
    on($("#leftBtn"), "pointerdown", () => keys.left=true); on($("#leftBtn"), "pointerup", () => keys.left=false); on($("#rightBtn"), "pointerdown", () => keys.right=true); on($("#rightBtn"), "pointerup", () => keys.right=false);
    const items = shuffle(round.falling || []); let spawnIndex = 0;
    function spawn() { if (state.answered || spawnIndex >= items.length) return; const item = items[spawnIndex++]; const node = document.createElement("div"); node.className = `falling-item ${item[1] ? "scam" : "safe"}`; node.textContent = item[0]; node.dataset.scam = item[1] ? "true" : "false"; node.style.left = `${8 + Math.random()*78}%`; node.style.top = "-55px"; field.appendChild(node); }
    const spawnTimer = setInterval(spawn, 760); addCleanup(() => clearInterval(spawnTimer)); spawn();
    function overlap(a,b){return !(a.right<b.left||a.left>b.right||a.bottom<b.top||a.top>b.bottom);} function tick(){ if(state.answered)return; if(keys.left)moveBy(-1.4); if(keys.right)moveBy(1.4); updatePlayer(); const pr=player.getBoundingClientRect(); $$('.falling-item',field).forEach((node)=>{ node.style.top = `${node.offsetTop + 3.2}px`; const hit=overlap(pr,node.getBoundingClientRect()); if(hit){ const scam=node.dataset.scam==="true"; node.remove(); if(shieldMode){ scam ? (state.good++, sfx("coin")) : minorPenalty("Shield hit a safe item."); } else { scam ? minorPenalty("You touched a scam item.") : (state.good++, sfx("coin")); } if($("#fallScore")) $("#fallScore").textContent = `${shieldMode ? "Blocked scams" : "Safe habits"}: ${state.good}`; } else if(node.offsetTop > field.clientHeight + 20){ if(shieldMode && node.dataset.scam==="true") minorPenalty("Missed a scam item."); node.remove(); } }); if(state.good >= 3 || (spawnIndex >= items.length && $$('.falling-item',field).length===0 && state.good>=2)) return passRound(shieldMode ? "Scam items blocked." : "Safe movement cleared."); state.anim=requestAnimationFrame(tick); } state.anim=requestAnimationFrame(tick);
  }

  function drawSpotlightSpy() { return `<div class="spotlight-field" id="spotlightField"><div class="spyware-target" id="spywareTarget" style="left:${18 + Math.random()*62}%;top:${20 + Math.random()*58}%">🕵️</div><div class="spotlight-beam" id="spotlightBeam"></div></div><p class="muted">Move your mouse/finger as the searchlight. Click the hidden spyware when it is inside the light.</p>`; }
  function wireSpotlightSpy() { const field=$("#spotlightField"), beam=$("#spotlightBeam"), target=$("#spywareTarget"); function move(e){ const r=field.getBoundingClientRect(); const x=(e.clientX ?? e.touches?.[0]?.clientX) - r.left; const y=(e.clientY ?? e.touches?.[0]?.clientY) - r.top; beam.style.left=`${clamp(x,0,r.width)}px`; beam.style.top=`${clamp(y,0,r.height)}px`; } on(field,"pointermove",move); on(field,"pointerdown",move); on(target,"click",(e)=>{ e.stopPropagation(); passRound("Hidden spyware found."); }); on(field,"click",(e)=>{ if(e.target!==target) minorPenalty("Search carefully before clicking."); }); }

  function drawSpywareMaze() { return `<div class="maze-field" id="mazeField"><div class="maze-player" id="mazePlayer">🧍</div><div class="maze-goal" id="mazeGoal" style="left:84%;top:76%">🛡️</div><div class="maze-hazard" style="left:35%;top:28%">🕷️</div><div class="maze-hazard" style="left:56%;top:55%">⚠️</div><div class="maze-hazard" style="left:70%;top:24%">🧨</div></div><div class="control-pad"><button class="btn" id="leftBtn">←</button><button class="btn" id="upBtn">↑</button><button class="btn" id="downBtn">↓</button><button class="btn" id="rightBtn">→</button></div>`; }
  function wireSpywareMaze() { const field=$("#mazeField"), player=$("#mazePlayer"), goal=$("#mazeGoal"); const p={x:18,y:22}; const keys={}; function place(){ player.style.left=`${p.x}%`; player.style.top=`${p.y}%`; } function overlap(a,b){return !(a.right<b.left||a.left>b.right||a.bottom<b.top||a.top>b.bottom);} on(document,"keydown",e=>{keys[e.key]=true;}); on(document,"keyup",e=>{keys[e.key]=false;}); [["leftBtn","ArrowLeft"],["rightBtn","ArrowRight"],["upBtn","ArrowUp"],["downBtn","ArrowDown"]].forEach(([id,k])=>{on($("#"+id),"pointerdown",()=>keys[k]=true);on($("#"+id),"pointerup",()=>keys[k]=false);}); function tick(){ if(state.answered)return; if(keys.ArrowLeft||keys.a)p.x-=.65; if(keys.ArrowRight||keys.d)p.x+=.65; if(keys.ArrowUp||keys.w)p.y-=.65; if(keys.ArrowDown||keys.s)p.y+=.65; p.x=clamp(p.x,0,92); p.y=clamp(p.y,0,86); place(); const pr=player.getBoundingClientRect(); for(const hz of $$('.maze-hazard',field)){ if(overlap(pr,hz.getBoundingClientRect())) return failRound("Spyware caught you in the maze."); } if(overlap(pr,goal.getBoundingClientRect())) return passRound("Reached antivirus safely."); state.anim=requestAnimationFrame(tick); } place(); state.anim=requestAnimationFrame(tick); }

  function drawCloseWindowX(round) { return `<div class="popup-field"><div class="mock-window" style="position:absolute;left:8%;right:8%;top:12%;min-height:320px"><div class="mock-title"><span>${esc(round.headline || round.title)}</span><button class="x-target" id="realX">×</button></div><div class="mock-body"><h3>${esc(round.body || round.scenario || "")}</h3><div class="grid3"><button class="btn btn-danger" data-fake-x="true">Call Support</button><button class="btn" data-fake-x="true">Install Fix</button><button class="btn" data-fake-x="true">OK</button></div></div></div></div>`; }
  function wireCloseWindowX() { on($("#realX"), "click", () => passRound("Closed the fake warning.")); $$('[data-fake-x]').forEach((b) => on(b, "click", () => failRound("Clicked a fake action button."))); }

  function drawVirusDownload(round) { return `<div class="mock-window"><div class="mock-title"><span>${esc(round.popupTitle || "Unknown Download")}</span><span>⬇️</span></div><div class="mock-body"><h3>${esc(round.popupBody || "Suspicious download in progress.")}</h3><div class="danger-bar"><span id="downloadBar" style="width:0%"></span></div><button class="btn btn-danger" id="mashBtn">CANCEL / CLOSE FAST</button><div class="money-display" style="font-size:2rem"><span id="mashCount">0</span> / ${round.clicksNeeded || 15}</div><p class="muted">Click fast or press Space/Enter.</p></div></div>`; }
  function wireVirusDownload(round) { const grow=setInterval(()=>{ if(state.answered)return clearInterval(grow); state.download += round.downloadRate || 1.6; if($("#downloadBar")) $("#downloadBar").style.width=`${clamp(state.download,0,100)}%`; if(state.download>=100) failRound("Download reached 100%."); },150); addCleanup(()=>clearInterval(grow)); const mash=()=>{ if(state.answered)return; state.mash++; state.download=clamp(state.download-3.2,0,100); if($("#mashCount")) $("#mashCount").textContent=state.mash; sfx("click"); if(state.mash >= (round.clicksNeeded || 15)) passRound("Stopped the fake download."); }; on($("#mashBtn"),"click",mash); on(document,"keydown",(e)=>{ if(e.code==="Space"||e.key==="Enter"){e.preventDefault();mash();} }); }

  function drawTabStopDownload(round) { return `<div class="mock-window"><div class="mock-title"><span>Browser Tabs</span><span>⬇️ Active download</span></div><div class="mock-body"><p>${esc(round.scenario || round.directions)}</p><div class="danger-bar"><span id="downloadBar" style="width:5%"></span></div><div class="tab-grid">${["Video", "Article", "Downloads", "Chat"].map((t)=>`<button class="tab-card" data-tab="${t}">${t}</button>`).join("")}</div><div id="tabPanel" class="tab-panel">Choose a tab.</div></div></div>`; }
  function wireTabStopDownload() { const grow=setInterval(()=>{ if(state.answered)return clearInterval(grow); state.download+=2.1; if($("#downloadBar"))$("#downloadBar").style.width=`${clamp(state.download,0,100)}%`; if(state.download>=100)failRound("The unknown download finished."); },170); addCleanup(()=>clearInterval(grow)); $$('.tab-card').forEach((b)=>on(b,"click",()=>{ if(b.dataset.tab==="Downloads"){ $("#tabPanel").innerHTML='<h3>Downloads</h3><p>Unknown file downloading...</p><button class="btn btn-danger" id="stopDownload">STOP DOWNLOAD</button>'; on($("#stopDownload"),"click",()=>passRound("Download stopped.")); } else { $("#tabPanel").innerHTML='<p>This tab does not have the stop button.</p>'; minorPenalty("Wrong tab — keep looking."); } })); }

  function drawRushStopDownload(round) { return `<div class="rush-field" id="rushField"><div class="safe-exit"><button class="btn" id="closeRushPopup">Close Pop-up</button></div><div class="mock-body" style="padding-top:76px"><h3>${esc(round.scenario || round.directions)}</h3><div class="danger-bar"><span id="downloadBar" style="width:8%"></span></div><button class="rush-stop-button" id="rushStop" style="left:62%;top:62%">STOP DOWNLOAD</button></div></div>`; }
  function wireRushStopDownload() { const stop=$("#rushStop"); let unlocked=false; const grow=setInterval(()=>{ if(state.answered)return clearInterval(grow); state.download+=1.8; if($("#downloadBar"))$("#downloadBar").style.width=`${clamp(8+state.download,0,100)}%`; if(state.download>=92)failRound("Download completed before you stopped it."); },160); addCleanup(()=>clearInterval(grow)); const mover=setInterval(()=>{ if(!stop||state.answered)return; stop.style.left=`${12+Math.random()*68}%`; stop.style.top=`${24+Math.random()*58}%`; },850); addCleanup(()=>clearInterval(mover)); on($("#closeRushPopup"),"click",()=>{ unlocked=true; toast("Pop-up closed. Now stop the download."); }); on(stop,"click",()=> unlocked ? passRound("Pop-up closed and download stopped.") : minorPenalty("Close the blocking pop-up first.")); }

  function drawSpamBlockHunt(round) { const buttons=shuffle([["Block / Report",true],["Open prize link",false],["Add friend",false],["Claim reward",false],["Share code",false],["Reply",false]]); return `<div class="spam-field" id="spamField"><p class="arcade-note" style="padding:16px">${esc(round.scenario || round.directions)}</p>${buttons.map((b,i)=>`<button class="spam-button" data-spam-ok="${b[1] ? "true" : "false"}" style="left:${8+Math.random()*70}%;top:${18+Math.random()*66}%">${esc(b[0])}</button>`).join("")}</div>`; }
  function wireSpamBlockHunt() { $$('[data-spam-ok]').forEach((b)=>on(b,"click",()=> b.dataset.spamOk==="true" ? passRound("Found the real block/report button.") : minorPenalty("Wrong spam option."))); }

  function drawShooter(round) { const targets=shuffle((round.targets||[]).map((t,i)=>({label:t[0],sub:t[1],detail:t[2],bad:Boolean(t[3]),id:i}))); return `<div class="playfield">${targets.map((t)=>`<button class="email-target" style="left:${5+Math.random()*62}%;top:${6+Math.random()*66}%" data-id="${t.id}" data-bad="${t.bad ? "true" : "false"}"><strong>${esc(t.label)}</strong><small>${esc(t.sub || "")}<br>${esc(t.detail || "")}</small></button>`).join("")}</div>`; }
  function wireShooter(round) { const badIds=new Set((round.targets||[]).map((t,i)=>t[3]?String(i):null).filter(Boolean)); $$('.email-target').forEach((b)=>on(b,"click",()=>{ if(b.classList.contains("shot"))return; b.classList.add("shot"); if(b.dataset.bad==="true"){ b.classList.add("correct"); state.hits.add(b.dataset.id); sfx("coin"); } else { b.classList.add("wrong"); state.miss++; minorPenalty("That was a normal item."); } if(state.hits.size >= badIds.size) passRound(state.miss===0 ? "Perfect defense." : "Threats removed, with some decoy damage."); })); }

  function drawSelectAudit(round) {
    const pack = selectPack(round); const needed = round.needed || pack.items.filter((item) => pack.correct(item)).length || 1;
    return `<div class="scenario-box"><div class="message-header"><span class="avatar">🧩</span><span>${esc(pack.label)}</span></div><div class="scenario-text">${esc(round.scenario || round.prompt || round.description || round.directions)}</div></div><p class="muted">Select the risky/correct evidence. Needed: ${needed}.</p><div class="audit-grid">${pack.items.map((item, i)=>`<button class="audit-card" data-audit-ok="${pack.correct(item) ? "true" : "false"}"><strong>${esc(pack.label)} ${i+1}</strong><br>${esc(pack.render(item))}</button>`).join("")}</div><button class="btn btn-primary" id="auditSubmit">Submit Selection</button>`;
  }
  function selectPack(round){ if(round.flags)return{label:"Evidence",items:round.flags,correct:i=>Boolean(i[1]),render:i=>i[0]}; if(round.transactions)return{label:"Transaction",items:round.transactions,correct:i=>Boolean(i[2]),render:i=>`${i[0]} — ${i[1]}`}; if(round.extensions)return{label:"Extension",items:round.extensions,correct:i=>Boolean(i[1]),render:i=>i[0]}; if(round.permissions)return{label:"Permission",items:round.permissions,correct:i=>Boolean(i[1]),render:i=>i[0]}; if(round.clips)return{label:"Clipboard",items:round.clips,correct:i=>Boolean(i[1]),render:i=>i[0]}; return{label:"Item",items:round.items||[],correct:i=>Boolean(i[i.length-1]),render:i=>i.filter(x=>typeof x!=="boolean").join(" — ")}; }
  function wireSelectAudit() { $$('[data-audit-ok]').forEach((b)=>on(b,"click",()=>b.classList.toggle("selected"))); on($("#auditSubmit"),"click",()=>{ const ok=$$('[data-audit-ok]').every((b)=>b.classList.contains("selected")===(b.dataset.auditOk==="true")); ok?passRound("Correct evidence selected."):failRound("Selection included a decoy or missed evidence."); }); }

  function drawSocialFirewall(round) { return `<div class="scenario-box"><div class="message-header"><span class="avatar">👥</span><span>Social Firewall</span></div><div class="scenario-text">${esc(round.directions)}</div></div><div class="grid3">${(round.profiles||[]).map((p)=>`<button class="profile-mini-card" data-profile-fake="${p[1] ? "true" : "false"}">${esc(p[0])}</button>`).join("")}</div><button class="btn btn-primary" id="socialSubmit">Block Selected Fakes</button>`; }
  function wireSocialFirewall() { $$('[data-profile-fake]').forEach((b)=>on(b,"click",()=>b.classList.toggle("selected"))); on($("#socialSubmit"),"click",()=>{ const ok=$$('[data-profile-fake]').every((b)=>b.classList.contains("selected")===(b.dataset.profileFake==="true")); ok?passRound("Fake profiles blocked."):failRound("Social firewall selection was wrong."); }); }

  function drawOrder(round) { const answer = Array.isArray(round.answer) ? round.answer : round.steps; return `<div class="scenario-box"><div class="message-header"><span class="avatar">🧭</span><span>Safe Order</span></div><div class="scenario-text">${esc(round.scenario || round.directions)}</div></div><div class="order-progress" id="orderProgress">Step 1 / ${answer.length}: ${esc(answer[0])}</div><div class="order-list">${shuffle(round.steps || []).map((s)=>`<button class="order-pill" data-step="${esc(s)}">${esc(s)}</button>`).join("")}</div>`; }
  function wireOrder(round) { const answer = Array.isArray(round.answer) ? round.answer : round.steps; state.orderIndex=0; $$('[data-step]').forEach((b)=>on(b,"click",()=>{ const val=b.dataset.step; if(val===answer[state.orderIndex]){ b.classList.add("correct"); state.orderIndex++; if(state.orderIndex>=answer.length)return passRound("Safe order completed."); $("#orderProgress").textContent=`Step ${state.orderIndex+1} / ${answer.length}: ${answer[state.orderIndex]}`; } else failRound("Wrong order." ); })); }

  function drawFirewallPatchGrid() { const holes = new Set(sample([1,3,5,7,9,11,13,15,17,19,21,23],5)); return `<div class="scenario-box"><div class="message-header"><span class="avatar">🧱</span><span>Firewall Patch</span></div><div class="scenario-text">Patch all red holes. Do not click safe green tiles.</div></div><div class="firewall-grid">${Array.from({length:25},(_,i)=>`<button class="firewall-tile" data-hole="${holes.has(i)?"true":"false"}">${holes.has(i)?"🔴":"🟢"}</button>`).join("")}</div><button class="btn btn-primary" id="firewallDone">Confirm Firewall</button>`; }
  function wireFirewallPatchGrid() { $$('[data-hole]').forEach((tile)=>on(tile,"click",()=>{ if(tile.dataset.hole==="true"){ tile.classList.add("patched"); tile.textContent="🛡️"; } else minorPenalty("That tile was already safe."); })); on($("#firewallDone"),"click",()=>{ const holes=$$('[data-hole="true"]'); holes.every((h)=>h.classList.contains("patched"))?passRound("Firewall holes patched."):failRound("Some firewall holes were left open."); }); }

  function drawCategoryMatch(round) { return `<div class="scenario-box"><div class="message-header"><span class="avatar">🏷️</span><span>Category Match</span></div><div class="scenario-text">${esc(round.prompt)}</div></div><div class="grid2">${shuffle(round.choices||[]).map((c)=>`<button class="action-btn" data-category-choice="${esc(c)}">${esc(c)}</button>`).join("")}</div>`; }
  function wireCategoryMatch(round) { $$('[data-category-choice]').forEach((b)=>on(b,"click",()=>b.dataset.categoryChoice===round.answer?passRound("Scam category matched."):failRound("Wrong scam category."))); }

  function drawSortBasket(round) { const item=(round.items||[])[state.step] || (round.items||[])[0]; return `<div class="sort-board"><div class="sort-card"><div><span class="eyebrow">Item ${state.step+1} / ${(round.items||[]).length}</span><h3>${esc(item[0])}</h3></div></div><div class="grid2"><button class="sort-choice" data-sort="scam">🚩 Scam Signal</button><button class="sort-choice" data-sort="safe">✅ Safe Habit</button></div></div>`; }
  function wireSortBasket(round) { $$('[data-sort]').forEach((b)=>on(b,"click",()=>{ const item=round.items[state.step]; const isScam=Boolean(item[1]); const correct=(b.dataset.sort==="scam")===isScam; if(!correct)return failRound("Sorted into the wrong basket."); state.step++; if(state.step>=round.items.length)return passRound("All items sorted."); $("#microgame").innerHTML=drawSortBasket(round); wireSortBasket(round); })); }

  function drawCallInterrupt(round) { const dangerWords = ["taxes", "gift cards", "now", "do not", "secret", "code", "remote", "payment"]; const words=String(round.script||"").split(/\s+/).map((w)=>w.replace(/[.,!?:;]/g,"")); return `<div class="call-screen"><div class="call-card"><strong>☎️ Live suspicious call</strong><p>${esc(round.script)}</p></div><p class="muted">Tap at least 2 pressure words, then hang up and verify.</p><div class="call-script">${words.map((w,i)=>`<button class="call-token" data-pressure="${dangerWords.some(d=>w.toLowerCase().includes(d.split(" ")[0]))?"true":"false"}">${esc(w)}</button>`).join("")}</div><button class="btn btn-danger" id="hangupVerify">Hang Up + Verify</button></div>`; }
  function wireCallInterrupt() { $$('[data-pressure]').forEach((b)=>on(b,"click",()=>{ b.classList.toggle("selected"); if(b.dataset.pressure!=="true") minorPenalty("That word alone is not the main pressure clue."); })); on($("#hangupVerify"),"click",()=>{ const selected=$$('[data-pressure].selected'); const good=selected.filter((b)=>b.dataset.pressure==="true").length; const bad=selected.filter((b)=>b.dataset.pressure!=="true").length; good>=2 && bad<=1 ? passRound("Pressure detected, then call ended safely.") : failRound("Find the pressure/secrecy/money clues before hanging up."); }); }

  function drawSafeWordChallenge(round) { return `<div class="safe-word-card scenario-box"><strong>Scenario</strong><p>${esc(round.scenario)}</p><p class="muted">Family safe word hint: ${esc(String(round.word||"")[0])} _ _ _</p></div><div class="chat-input-row"><input id="safeWordInput" class="safe-word-input" placeholder="Type safe word"><button class="btn btn-primary" id="safeWordSubmit">Verify</button></div>`; }
  function wireSafeWordChallenge(round) { function submit(){ $("#safeWordInput").value.trim().toLowerCase()===String(round.word).toLowerCase()?passRound("Safe word verified."):failRound("Safe word did not match."); } on($("#safeWordSubmit"),"click",submit); on($("#safeWordInput"),"keydown",(e)=>{ if(e.key==="Enter")submit(); }); }

  function drawLegitOrScam(round) { return `<div class="calibration-card scenario-box"><strong>Context Check</strong><p>${esc(round.scenario)}</p></div><div class="choice-bins"><button class="bin-btn" data-calib="legit">✅ Trustworthy / Verified</button><button class="bin-btn" data-calib="scam">🚩 Scam / Suspicious</button></div>`; }
  function wireLegitOrScam(round) { $$('[data-calib]').forEach((b)=>on(b,"click",()=>{ const legit=b.dataset.calib==="legit"; legit===Boolean(round.legit)?passRound(legit?"Correct — verified context.":"Correct — suspicious context."):failRound("Context judgment was incorrect."); })); }

  function drawLegacyBoss(round) { state.legacyBossPhase = state.legacyBossPhase || 0; const phase=round.phases[state.legacyBossPhase] || round.phases[0]; const hp=Math.max(0,100-(state.legacyBossPhase/round.phases.length)*100); let body=""; if(phase.mini==="money") body=drawMoney({scenario:phase.prompt,targetAmount:phase.targetAmount}); else if(phase.mini==="tap") body=`<div class="scenario-box"><h3>${esc(phase.prompt)}</h3><p>${esc(phase.message)}</p></div><div class="collect-grid">${shuffle(phase.chips).map((c)=>`<button class="tile-btn" data-legacy-chip="${c[1]?"true":"false"}">${esc(c[0])}</button>`).join("")}</div><button class="btn btn-danger" id="legacyBossLock">Attack Boss</button>`; else body=`<div class="scenario-box"><h3>${esc(phase.prompt)}</h3></div><div class="action-grid">${shuffle(phase.options||[]).map((o)=>`<button class="action-btn" data-legacy-choice="${o[1]?"true":"false"}">${esc(o[0])}</button>`).join("")}</div>`; return `<div class="boss-arena"><aside class="boss-card"><div class="boss-avatar-large">👿</div><div class="meter meter-danger"><span style="width:${hp}%"></span></div><p class="muted">Legacy phase ${state.legacyBossPhase+1} / ${round.phases.length}</p></aside><main>${body}</main></div>`; }
  function wireLegacyBoss(round) { const phase=round.phases[state.legacyBossPhase||0]; function next(ok){ if(!ok)return failRound("The legacy boss healed from that move."); state.legacyBossPhase=(state.legacyBossPhase||0)+1; if(state.legacyBossPhase>=round.phases.length)return passRound("Legacy boss defeated."); $("#microgame").innerHTML=drawLegacyBoss(round); wireLegacyBoss(round); }
    if(phase.mini==="money") return wireMoney({targetAmount:phase.targetAmount}, next); if(phase.mini==="tap"){ $$('[data-legacy-chip]').forEach((b)=>on(b,"click",()=>b.classList.toggle("selected"))); on($("#legacyBossLock"),"click",()=>{ const selected=$$('[data-legacy-chip].selected'); const good=selected.filter((b)=>b.dataset.legacyChip==="true").length; const bad=selected.filter((b)=>b.dataset.legacyChip!=="true").length; next(good>=(phase.needed||3)&&bad===0); }); return; } $$('[data-legacy-choice]').forEach((b)=>on(b,"click",()=>next(b.dataset.legacyChoice==="true"))); }


  /* ============================================================
     17D) V14 Expansion Patch
     Purpose: keep V13 exactly as-is visually, then add more action
     minigames, randomized live game-room chat, and library filters.
     ============================================================ */

  function V14_overlap(a, b) {
    if (!a || !b) return false;
    return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
  }

  function V14_controlHints() {
    return `<div class="control-pad compact-pad"><button class="btn" id="v14LeftBtn">←</button><button class="btn" id="v14UpBtn">↑</button><button class="btn" id="v14DownBtn">↓</button><button class="btn" id="v14RightBtn">→</button></div>`;
  }

  function typeDisplayName(type) {
    const names = {
      safeChoice: "Verification Decisions", safeChoicePlus: "Advanced Verification Decisions", codeShield: "2FA Code Shield", recoveryKeyPuzzle: "Recovery Key Protection", captchaTrap: "Fake Captcha Escapes", searchResultPick: "Search Result Minefields", wifiHotspotChoice: "Wi-Fi Choice", dangerWebsite: "Mock Website Escapes", siteInspector: "Website Red-Flag Inspector", freeSiteExit: "Fake Free-Site Exit", privacyExit: "Data-Grab Form Exit", domainDuel: "Domain Duel", vpnTunnelSwitch: "VPN Tunnel Routing", passwordFill: "Password Manager Checks", passwordManagerFill: "Legacy Password Manager", qrScan: "QR Safety Lens", qrLensFocus: "QR Lens Focus", romanceSwipe: "Mock Romance Swipes", marketplaceMatch: "Marketplace Swipes", swipeJudge: "Legacy Swipe Judge", attachmentFlash: "Attachment Flash", attachmentMemory: "Legacy Attachment Memory", fileDelete: "Risky File Cleanup", fileExplorerDelete: "File Explorer Cleanup", downloadDelete: "Download Delete", taskbarFileDelete: "Taskbar File Delete", dragTrash: "Drag Scams to Trash", giftCardShredder: "Gift Card Shredder", passwordVaultDrag: "Password Vault Drag", gameChatReport: "Game Chat Report", lobbyMute: "Lobby Mute/Report", emailBlock: "Email Block Sender", smsBlock: "SMS Block", smsReport: "SMS Report Spam", chatRefuse: "Typed Refusal", platformHints: "Moving Hint Platformer", hintPlatformer: "Legacy Moving Platformer", fallingDodge: "Falling Dodge", shieldBlock: "Shield Block", spotlightSpy: "Mouse Searchlight Spyware", spywareMaze: "Spyware Maze", popupPurge: "Pop-Up Purge", closeWindowX: "Find Real X", virusDownload: "Virus Download Mash", tabStopDownload: "Browser Tab Stop Download", rushStopDownload: "Rush Stop Download", spamBlockHunt: "Spam Block Hunt", deepfakeSpot: "Deepfake Clue Spotter", bankStatementHunt: "Bank Statement Hunt", shoppingCartAudit: "Shopping Cart Audit", extensionAudit: "Extension Audit", permissionsToggle: "Legacy Permissions Toggle", permissionToggle: "Permission Toggles", privacyCleaner: "Privacy Cleaner", clipboardCleaner: "Clipboard Cleaner", evidenceTokenSelect: "Evidence Token Select", familyCallOrder: "Family Call Order", sequenceBuilder: "Sequence Builder", firewallPatchGrid: "Firewall Patch Grid", mfaApprovalGate: "MFA Approval Gate", mfaShield: "MFA Shield", moneyCounter: "Money Counter", moneyGuard: "Money Guard", safeAmount: "Safe Amount", categoryMatch: "Category Match", sortBasket: "Sort Basket", socialFirewall: "Social Firewall", callInterrupt: "Call Interrupt", safeWordChallenge: "Safe Word Challenge", legitOrScamCalibration: "Legit or Scam Calibration", legacyBossRush: "Legacy Boss Rush", bossRush: "Final Boss",
      shieldCursor: "Mouse Shield Defense", textDodge: "WASD Text Dodge", packetPaddle: "Firewall Paddle", phoneTapSequence: "Phone Report Path", browserPatchRun: "Browser Patch Run", romanceEvidenceChat: "Live Romance Evidence Chat", scamWhack: "Scam Whack", fakeAdClean: "Fake Ad Cleaner", linkBridge: "Safe Link Bridge"
    };
    return names[type] || String(type || "Challenge").replace(/([A-Z])/g, " $1").replace(/^./, (m) => m.toUpperCase());
  }

  function startGame() {
    clearLoops();
    ensureAudio();
    Object.assign(state, {
      selected: [], idx: 0, score: 0, correct: 0, mistakes: 0, streak: 0, bestStreak: 0,
      trust: 100, fraudster: 28, powerups: { iris: 3, freeze: 1, shield: 1 }, boss: null, lessons: [], practiceMode: false
    });

    const boss = ROUNDS.find((round) => round.type === "bossRush");
    const pool = ROUNDS.filter((round) => round.type !== "bossRush" && round.type !== "legacyBossRush");
    const chosen = [];
    const used = new Set();
    const buckets = [
      ["action", ["virusDownload", "rushStopDownload", "tabStopDownload", "popupPurge", "closeWindowX", "hintPlatformer", "platformHints", "fallingDodge", "shieldBlock", "spotlightSpy", "spywareMaze", "spamBlockHunt", "shieldCursor", "textDodge", "packetPaddle", "scamWhack", "fakeAdClean"], 9],
      ["files", ["attachmentFlash", "attachmentMemory", "fileDelete", "fileExplorerDelete", "downloadDelete", "taskbarFileDelete", "dragTrash", "giftCardShredder", "passwordVaultDrag"], 6],
      ["social", ["gameChatReport", "lobbyMute", "emailBlock", "smsBlock", "smsReport", "chatRefuse", "romanceSwipe", "marketplaceMatch", "swipeJudge", "socialFirewall", "romanceEvidenceChat", "phoneTapSequence"], 6],
      ["browser", ["dangerWebsite", "siteInspector", "freeSiteExit", "privacyExit", "passwordFill", "passwordManagerFill", "domainDuel", "qrScan", "qrLensFocus", "wifiHotspotChoice", "vpnTunnelSwitch", "browserPatchRun", "linkBridge"], 6],
      ["logic", ["deepfakeSpot", "bankStatementHunt", "shoppingCartAudit", "extensionAudit", "permissionsToggle", "permissionToggle", "privacyCleaner", "clipboardCleaner", "evidenceTokenSelect", "familyCallOrder", "sequenceBuilder", "firewallPatchGrid", "mfaApprovalGate", "mfaShield", "moneyCounter", "moneyGuard", "safeAmount", "categoryMatch", "sortBasket", "legitOrScamCalibration", "safeWordChallenge", "callInterrupt"], 5]
    ];

    function addFromTypes(types, count) {
      const candidates = pool.filter((round) => types.includes(round.type) && !used.has(round.id));
      const preferred = candidates.filter((round) => {
        if (state.difficulty === "easy") return round.difficulty !== "hard";
        if (state.difficulty === "hard") return round.difficulty !== "easy" || Math.random() < 0.35;
        return true;
      });
      sample(preferred.length ? preferred : candidates, count).forEach((round) => {
        if (!used.has(round.id)) { chosen.push(round); used.add(round.id); }
      });
    }

    buckets.forEach(([, types, count]) => addFromTypes(types, count));
    const remaining = shuffle(pool.filter((round) => !used.has(round.id)));
    while (chosen.length < DATA.site.arcadeRoundsBeforeBoss && remaining.length) {
      const next = remaining.shift();
      chosen.push(next);
      used.add(next.id);
    }
    state.selected = shuffle(chosen).slice(0, DATA.site.arcadeRoundsBeforeBoss);
    if (boss) state.selected.push(boss);
    renderRound();
  }

  function showLibrary() {
    const groups = ROUNDS.reduce((acc, round, index) => {
      const key = typeDisplayName(round.type);
      if (!acc[key]) acc[key] = [];
      acc[key].push({ round, index });
      return acc;
    }, {});
    const counts = ["easy", "medium", "hard"].reduce((acc, diff) => {
      acc[diff] = ROUNDS.filter((round) => String(round.difficulty).toLowerCase() === diff).length;
      return acc;
    }, {});
    render(`
      <section class="screen library-screen">
        ${topbar()}
        <div class="panel library-panel">
          <div class="library-hero">
            <div>
              <span class="eyebrow">Full game library</span>
              <h2>${ROUNDS.length} playable challenges. Every legacy/current minigame is restored, plus V14 action games.</h2>
              <p>Everything remains stacked and organized. Use the difficulty filter to test easy, medium, hard, or all challenges without changing the library layout.</p>
              <div class="library-filter-row" role="group" aria-label="Filter library by difficulty">
                <button class="filter-chip active" data-library-filter="all">All (${ROUNDS.length})</button>
                <button class="filter-chip" data-library-filter="easy">Easy (${counts.easy || 0})</button>
                <button class="filter-chip" data-library-filter="medium">Medium (${counts.medium || 0})</button>
                <button class="filter-chip" data-library-filter="hard">Hard (${counts.hard || 0})</button>
              </div>
              <p class="library-filter-status" id="libraryFilterStatus">Showing all challenges.</p>
            </div>
            <div class="library-actions"><button class="btn" id="backBtn">Back</button><button class="btn btn-primary" id="startBtn">Start Full Run</button></div>
          </div>
          <div class="library-list" id="libraryList">
            ${Object.entries(groups).map(([group, items]) => `
              <section class="library-section" data-library-section>
                <h3>${esc(group)} <span class="muted section-count">(${items.length})</span></h3>
                <div class="library-stack">
                  ${items.map(({ round, index }) => `
                    <article class="library-card library-row-card" data-library-card data-difficulty="${esc(String(round.difficulty || "medium").toLowerCase())}">
                      <div><strong>${index + 1}. ${esc(round.title)}</strong><small>${esc(round.category)} · ${esc(round.difficulty)} · ${esc(round.command)}<br>${esc(round.directions || "")}</small></div>
                      <button class="btn btn-secondary btn-small" data-practice-index="${index}">Enter Challenge</button>
                    </article>`).join("")}
                </div>
              </section>`).join("")}
          </div>
          <div class="button-row"><button class="btn" id="backBottomBtn">Back</button><button class="btn btn-primary" id="startBottomBtn">Start Full Run</button></div>
        </div>
      </section>
    `);
    wireTopbar();
    on($("#motionEnableBtn"), "click", async () => {
      const enabled = await v16EnableMotionControls();
      if (enabled) {
        const motion = $('input[name="deviceMode"][value="motion"]');
        if (motion) motion.checked = true;
      }
    });
    on($("#motionCalibrateBtn"), "click", v16CalibrateTilt);
    on($("#backBtn"), "click", showHome); on($("#backBottomBtn"), "click", showHome);
    on($("#startBtn"), "click", showSetup); on($("#startBottomBtn"), "click", showSetup);
    $$('[data-practice-index]').forEach((button) => on(button, "click", () => startPractice(Number(button.dataset.practiceIndex))));

    function applyLibraryFilter(filter) {
      let visible = 0;
      $$('[data-library-card]').forEach((card) => {
        const show = filter === "all" || card.dataset.difficulty === filter;
        card.hidden = !show;
        if (show) visible += 1;
      });
      $$('[data-library-section]').forEach((section) => {
        const shownCards = $$('[data-library-card]', section).filter((card) => !card.hidden);
        section.hidden = shownCards.length === 0;
        const count = $('.section-count', section);
        if (count) count.textContent = `(${shownCards.length})`;
      });
      $$('.filter-chip').forEach((chip) => chip.classList.toggle('active', chip.dataset.libraryFilter === filter));
      const label = filter === "all" ? "all challenges" : `${filter} challenges`;
      const status = $("#libraryFilterStatus");
      if (status) status.textContent = `Showing ${visible} ${label}.`;
    }
    $$('.filter-chip').forEach((chip) => on(chip, "click", () => applyLibraryFilter(chip.dataset.libraryFilter)));
  }

  function drawRound(round) {
    const t = round.type;
    if (t === "shieldCursor") return drawShieldCursor(round);
    if (t === "textDodge") return drawTextDodge(round);
    if (t === "packetPaddle") return drawPacketPaddle(round);
    if (t === "phoneTapSequence") return drawPhoneTapSequence(round);
    if (t === "browserPatchRun") return drawBrowserPatchRun(round);
    if (t === "romanceEvidenceChat") return drawRomanceEvidenceChat(round);
    if (t === "scamWhack") return drawScamWhack(round);
    if (t === "fakeAdClean") return drawFakeAdClean(round);
    if (t === "linkBridge") return drawLinkBridge(round);
    if (["safeChoice", "safeChoicePlus", "codeShield", "recoveryKeyPuzzle", "captchaTrap", "searchResultPick", "wifiHotspotChoice", "deepfakeCall"].includes(t)) return drawChoiceV14(round);
    if (t === "dangerWebsite") return drawDangerWebsite(round);
    if (t === "siteInspector") return drawSiteInspector(round);
    if (t === "freeSiteExit" || t === "privacyExit") return drawExitSite(round);
    if (t === "domainDuel" || t === "passwordManagerFill" || t === "passwordFill") return drawDomainPick(round);
    if (t === "vpnTunnelSwitch") return drawVpnTunnel(round);
    if (t === "qrLensFocus") return drawQrLensFocus(round);
    if (t === "qrScan") return drawQRScan(round);
    if (t === "romanceSwipe" || t === "swipeJudge") return drawSwipe(round, "romance");
    if (t === "marketplaceMatch") return drawSwipe(round, "marketplace");
    if (t === "attachmentFlash") return drawAttachmentFlash(round);
    if (t === "attachmentMemory") return drawAttachmentMemory(round);
    if (t === "fileDelete") return drawFileDelete(round);
    if (t === "fileExplorerDelete") return drawFileExplorerDelete(round);
    if (t === "downloadDelete") return drawDownloadDelete(round);
    if (t === "taskbarFileDelete") return drawTaskbarFileDelete(round);
    if (t === "dragTrash") return drawDragTrash(round);
    if (t === "giftCardShredder") return drawGiftCardShredder(round);
    if (t === "passwordVaultDrag") return drawPasswordVault(round);
    if (t === "gameChatReport" || t === "lobbyMute") return drawLobbyV13(round);
    if (t === "emailBlock") return drawEmailBlock(round);
    if (t === "smsBlock" || t === "smsReport" || t === "smsReportSpam") return drawPhoneMenu(round, t === "smsBlock" ? "Block Contact" : "Report Spam");
    if (t === "chatRefuse") return drawChatRefuse(round);
    if (t === "platformHints" || t === "hintPlatformer") return drawPlatformer(round);
    if (t === "fallingDodge" || t === "shieldBlock") return drawFallingDodge(round, t === "shieldBlock");
    if (t === "spotlightSpy") return drawSpotlightSpy(round);
    if (t === "spywareMaze") return drawSpywareMaze(round);
    if (t === "popupPurge") return drawPopupPurge(round);
    if (t === "closeWindowX") return drawCloseWindowX(round);
    if (t === "virusDownload") return drawVirusDownload(round);
    if (t === "tabStopDownload") return drawTabStopDownload(round);
    if (t === "rushStopDownload") return drawRushStopDownload(round);
    if (t === "spamBlockHunt") return drawSpamBlockHunt(round);
    if (t === "inboxShooter" || t === "downloadShooter") return drawShooter(round);
    if (["deepfakeSpot", "bankStatementHunt", "shoppingCartAudit", "extensionAudit", "permissionsToggle", "privacyCleaner", "clipboardCleaner", "evidenceTokenSelect"].includes(t)) return drawSelectAudit(round);
    if (t === "socialFirewall") return drawSocialFirewall(round);
    if (t === "permissionToggle") return drawPermissionToggle(round);
    if (t === "familyCallOrder" || t === "sequenceBuilder") return drawOrder(round);
    if (t === "firewallPatchGrid") return drawFirewallPatchGrid(round);
    if (t === "mfaApprovalGate" || t === "mfaShield") return drawMFA(round);
    if (t === "moneyCounter" || t === "moneyGuard" || t === "safeAmount") return drawMoney(round);
    if (t === "categoryMatch") return drawCategoryMatch(round);
    if (t === "sortBasket") return drawSortBasket(round);
    if (t === "callInterrupt") return drawCallInterrupt(round);
    if (t === "safeWordChallenge") return drawSafeWordChallenge(round);
    if (t === "legitOrScamCalibration") return drawLegitOrScam(round);
    if (t === "legacyBossRush") return drawLegacyBoss(round);
    if (t === "bossRush") return drawBoss(round);
    return drawUniversalRound(round);
  }

  function wireRound(round) {
    const t = round.type;
    if (t === "shieldCursor") return wireShieldCursor(round);
    if (t === "textDodge") return wireTextDodge(round);
    if (t === "packetPaddle") return wirePacketPaddle(round);
    if (t === "phoneTapSequence") return wirePhoneTapSequence(round);
    if (t === "browserPatchRun") return wireBrowserPatchRun(round);
    if (t === "romanceEvidenceChat") return wireRomanceEvidenceChat(round);
    if (t === "scamWhack") return wireScamWhack(round);
    if (t === "fakeAdClean") return wireFakeAdClean(round);
    if (t === "linkBridge") return wireLinkBridge(round);
    if (["safeChoice", "safeChoicePlus", "codeShield", "recoveryKeyPuzzle", "captchaTrap", "searchResultPick", "wifiHotspotChoice", "deepfakeCall"].includes(t)) return wireChoice();
    if (t === "dangerWebsite") return wireChoice();
    if (t === "siteInspector") return wireSiteInspector(round);
    if (t === "freeSiteExit" || t === "privacyExit") return wireExitSite();
    if (t === "domainDuel" || t === "passwordManagerFill" || t === "passwordFill") return wireDomainPick();
    if (t === "vpnTunnelSwitch") return wireVpnTunnel();
    if (t === "qrLensFocus") return wireQrLensFocus();
    if (t === "qrScan") return wireQRScan(round);
    if (t === "romanceSwipe" || t === "swipeJudge") return wireSwipe(round, "romance");
    if (t === "marketplaceMatch") return wireSwipe(round, "marketplace");
    if (t === "attachmentFlash") return wireAttachmentFlash(round);
    if (t === "attachmentMemory") return wireAttachmentMemory(round);
    if (t === "fileDelete") return wireFileDelete(round);
    if (t === "fileExplorerDelete") return wireFileExplorerDelete(round);
    if (t === "downloadDelete") return wireDownloadDelete(round);
    if (t === "taskbarFileDelete") return wireTaskbarFileDelete(round);
    if (t === "dragTrash") return wireDragTrash(round);
    if (t === "giftCardShredder") return wireGiftCardShredder(round);
    if (t === "passwordVaultDrag") return wirePasswordVault(round);
    if (t === "gameChatReport" || t === "lobbyMute") return wireLobbyV13(round);
    if (t === "emailBlock") return wireEmailBlock();
    if (t === "smsBlock" || t === "smsReport" || t === "smsReportSpam") return wirePhoneMenu();
    if (t === "chatRefuse") return wireChatRefuse(round);
    if (t === "platformHints" || t === "hintPlatformer") return wirePlatformer(round);
    if (t === "fallingDodge" || t === "shieldBlock") return wireFallingDodge(round, t === "shieldBlock");
    if (t === "spotlightSpy") return wireSpotlightSpy(round);
    if (t === "spywareMaze") return wireSpywareMaze(round);
    if (t === "popupPurge") return wirePopupPurge(round);
    if (t === "closeWindowX") return wireCloseWindowX();
    if (t === "virusDownload") return wireVirusDownload(round);
    if (t === "tabStopDownload") return wireTabStopDownload(round);
    if (t === "rushStopDownload") return wireRushStopDownload(round);
    if (t === "spamBlockHunt") return wireSpamBlockHunt(round);
    if (t === "inboxShooter" || t === "downloadShooter") return wireShooter(round);
    if (["deepfakeSpot", "bankStatementHunt", "shoppingCartAudit", "extensionAudit", "permissionsToggle", "privacyCleaner", "clipboardCleaner", "evidenceTokenSelect"].includes(t)) return wireSelectAudit(round);
    if (t === "socialFirewall") return wireSocialFirewall(round);
    if (t === "permissionToggle") return wirePermissionToggle(round);
    if (t === "familyCallOrder" || t === "sequenceBuilder") return wireOrder(round);
    if (t === "firewallPatchGrid") return wireFirewallPatchGrid(round);
    if (t === "mfaApprovalGate" || t === "mfaShield") return wireMFA(round);
    if (t === "moneyCounter" || t === "moneyGuard" || t === "safeAmount") return wireMoney(round);
    if (t === "categoryMatch") return wireCategoryMatch(round);
    if (t === "sortBasket") return wireSortBasket(round);
    if (t === "callInterrupt") return wireCallInterrupt(round);
    if (t === "safeWordChallenge") return wireSafeWordChallenge(round);
    if (t === "legitOrScamCalibration") return wireLegitOrScam(round);
    if (t === "legacyBossRush") return wireLegacyBoss(round);
    if (t === "bossRush") return wireBoss(round);
    return wireUniversalRound(round);
  }

  function drawLobbyV13(round) {
    const basePlayers = round.players || ["PixelPat", "GardenMom", "Runner42", "StudyBuddy", "NovaKid", "CraftyCat", "RapidFox", "ByteBuddy"];
    const roster = shuffle([...new Set(basePlayers.concat(round.player || [], round.spammer || []))]).slice(0, Math.min(8, Math.max(5, basePlayers.length)));
    const scamPlayer = roster[Math.floor(Math.random() * roster.length)] || "ScamBot99";
    const decoys = roster.filter((p) => p !== scamPlayer);
    const scamText = round.message || round.scenario || "FREE COINS! Visit game-prize-fast.net and log in!";
    const decoyLines = [
      "Anyone want to play next round?", "Good match, team!", "I found the safe route.", "Let’s use the normal game menu.", "Please don’t click random links.", "Can someone help with the puzzle?", "Official events are in the game news tab."
    ];
    const scamAdds = [
      scamText,
      "Hurry, the reward expires soon.",
      "Do not tell moderators or it will disappear.",
      "Use my link only, not the official site.",
      "Send your code and I can unlock it for you."
    ];
    const queue = [];
    for (let i = 0; i < 18; i += 1) {
      if (i % 3 === 1) queue.push({ from: scamPlayer, text: scamAdds[(i / 3 | 0) % scamAdds.length], scam: true });
      else queue.push({ from: decoys[i % Math.max(1, decoys.length)] || "Player", text: decoyLines[i % decoyLines.length], scam: false });
    }
    state.v14Lobby = { scamPlayer, queue, visibleScam: 0, selected: null, lineCount: 0 };
    return `
      <div class="lobby-ui live-lobby-ui">
        <div class="sidebar"><h3>Players</h3><p class="muted small">The scammer is randomized every time.</p><div class="player-list">${roster.map((p) => `<button class="lobby-player" data-player="${esc(p)}">${esc(p)}</button>`).join("")}</div></div>
        <div class="mainarea">
          <div class="live-chat-header"><strong>Live Game Room</strong><span id="liveChatStatus">New messages incoming…</span></div>
          <div class="chat-log live-chat-log" id="liveChatLog"><div class="chat-line system-line">Watch the chat. Pick the suspicious player, then Mute + Report.</div></div>
          <div class="player-menu" id="playerMenu"><strong id="menuTitle">Select a suspicious player first.</strong><div class="grid3"><button class="action-btn" data-menu-action="friend">Add Friend</button><button class="action-btn" data-menu-action="report">Mute + Report</button><button class="action-btn" data-menu-action="open">Open Link</button></div></div>
        </div>
      </div>`;
  }

  function wireLobbyV13(round) {
    const lobby = state.v14Lobby;
    const log = $("#liveChatLog");
    let idx = 0;
    function addLine() {
      if (state.answered || !log || !lobby) return;
      const fallback = idx % 2
        ? { from: lobby.scamPlayer, text: "Last chance. Use my link now before it disappears.", scam: true }
        : { from: "System", text: "Reminder: report suspicious links and never share login codes.", scam: false };
      const line = lobby.queue[idx] || fallback;
      idx += 1;
      lobby.lineCount += 1;
      if (line.scam) lobby.visibleScam += 1;
      const node = document.createElement("div");
      node.className = `chat-line ${line.scam ? "scam-chat-line" : ""}`;
      node.innerHTML = `<strong>${esc(line.from)}:</strong> ${esc(line.text)}`;
      log.appendChild(node);
      log.scrollTop = log.scrollHeight;
      const status = $("#liveChatStatus");
      if (status) status.textContent = `${lobby.lineCount} messages · ${lobby.visibleScam} red flag${lobby.visibleScam === 1 ? "" : "s"}`;
    }
    const firstDelay = setTimeout(addLine, 350);
    const chatTimer = setInterval(addLine, 1150);
    addCleanup(() => clearTimeout(firstDelay));
    addCleanup(() => clearInterval(chatTimer));

    $$('.lobby-player').forEach((button) => on(button, "click", () => {
      lobby.selected = button.dataset.player;
      $$('.lobby-player').forEach((x) => x.classList.remove("selected"));
      button.classList.add("selected");
      $("#playerMenu").classList.add("open");
      $("#menuTitle").textContent = `${lobby.selected} options`;
      sfx("click");
      if (lobby.selected !== lobby.scamPlayer) minorPenalty("That player has not posted the scam message. Watch the chat sender.");
    }));
    $$('[data-menu-action]').forEach((button) => on(button, "click", () => {
      if (!lobby.selected) return toast("Select a player first.");
      if (button.dataset.menuAction === "open") return failRound("Opened the scam link from game chat.");
      if (button.dataset.menuAction === "friend") return minorPenalty("Do not add the suspicious account. Use Mute + Report.");
      if (lobby.selected === lobby.scamPlayer && lobby.visibleScam >= 1) return passRound("Suspicious player muted and reported from the live chat.");
      if (lobby.selected === lobby.scamPlayer) return minorPenalty("Wait for at least one scam message, then report.");
      return minorPenalty("Wrong player — use Mute + Report on the scam sender.");
    }));
  }

  function drawShieldCursor(round) {
    return `<div class="v14-stage shield-cursor-stage" id="shieldStage"><div class="v14-stage-top"><strong>${esc(round.scenario || "Block scam pressure.")}</strong><span>Blocked <b id="shieldScore">0</b> / ${round.target || 5}</span></div><div class="cursor-shield" id="cursorShield">🛡️</div></div><p class="muted">Mouse/touch moves the shield. WASD or arrow keys also work. Block scam texts, but let safe verification pass.</p>${V14_controlHints()}`;
  }

  function wireShieldCursor(round) {
    const stage = $("#shieldStage"), shield = $("#cursorShield"), score = $("#shieldScore");
    const keys = {};
    let x = 50, y = 78, blocked = 0, spawnCount = 0;
    const target = round.target || 5;
    const scams = round.scamLabels || ["SEND CODE", "PAY NOW", "LOGIN FAST", "GIFT CARD"];
    const safes = round.safeLabels || ["Official app", "Saved number", "Report"];
    function placeShield() { shield.style.left = `${x}%`; shield.style.top = `${y}%`; }
    function pointer(e) { const r = stage.getBoundingClientRect(); x = clamp(((e.clientX - r.left) / r.width) * 100, 4, 96); y = clamp(((e.clientY - r.top) / r.height) * 100, 8, 92); placeShield(); }
    on(stage, "pointermove", pointer); on(stage, "pointerdown", pointer);
    on(document, "keydown", (e) => { keys[e.key.toLowerCase()] = true; });
    on(document, "keyup", (e) => { keys[e.key.toLowerCase()] = false; });
    [["v14LeftBtn", "arrowleft"], ["v14RightBtn", "arrowright"], ["v14UpBtn", "arrowup"], ["v14DownBtn", "arrowdown"]].forEach(([id, key]) => { on($("#" + id), "pointerdown", () => keys[key] = true); on($("#" + id), "pointerup", () => keys[key] = false); on($("#" + id), "pointerleave", () => keys[key] = false); });
    function spawn() {
      if (state.answered) return;
      const isScam = Math.random() < 0.72;
      const el = document.createElement("div");
      el.className = `fall-token ${isScam ? "scam" : "safe"}`;
      el.dataset.scam = isScam ? "true" : "false";
      el.dataset.y = "-8";
      el.dataset.speed = String((state.difficulty === "hard" ? 0.88 : 0.68) + Math.random() * 0.45);
      el.style.left = `${8 + Math.random() * 76}%`;
      el.textContent = isScam ? scams[spawnCount++ % scams.length] : safes[spawnCount++ % safes.length];
      stage.appendChild(el);
    }
    const spawner = setInterval(spawn, state.difficulty === "hard" ? 520 : 650); addCleanup(() => clearInterval(spawner));
    function tick() {
      if (state.answered) return;
      if (keys.arrowleft || keys.a) x -= 1.4; if (keys.arrowright || keys.d) x += 1.4; if (keys.arrowup || keys.w) y -= 1.1; if (keys.arrowdown || keys.s) y += 1.1;
      x = clamp(x, 4, 96); y = clamp(y, 8, 92); placeShield();
      const sr = shield.getBoundingClientRect();
      $$('.fall-token', stage).forEach((el) => {
        let yy = Number(el.dataset.y || 0) + Number(el.dataset.speed || 0.7); el.dataset.y = String(yy); el.style.top = `${yy}%`;
        if (V14_overlap(sr, el.getBoundingClientRect())) {
          if (el.dataset.scam === "true") { blocked += 1; if (score) score.textContent = blocked; sfx("coin"); el.remove(); if (blocked >= target) passRound("Shield blocked the scam pressure."); }
          else { el.remove(); minorPenalty("That was a safe verification item. Let safe items pass."); }
        } else if (yy > 100) {
          if (el.dataset.scam === "true") failRound("A scam text slipped past the shield."); else el.remove();
        }
      });
      state.anim = requestAnimationFrame(tick);
    }
    placeShield(); spawn(); state.anim = requestAnimationFrame(tick);
  }

  function drawTextDodge(round) {
    return `<div class="v14-stage dodge-stage" id="dodgeStage"><div class="v14-stage-top"><strong>${esc(round.scenario || "Dodge scam texts.")}</strong><span>Verify stars <b id="dodgeStars">0</b> / ${round.target || 3}</span></div><div class="dodge-player" id="dodgePlayer">🏃</div></div><p class="muted">Move left/right with A/D, arrow keys, or buttons. Avoid red scam texts and collect blue verification stars.</p><div class="control-pad compact-pad"><button class="btn" id="v14LeftBtn">←</button><button class="btn" id="v14RightBtn">→</button></div>`;
  }

  function wireTextDodge(round) {
    const stage = $("#dodgeStage"), player = $("#dodgePlayer"), starText = $("#dodgeStars");
    const keys = {}; let x = 50, collected = 0, made = 0; const target = round.target || 3; const labels = round.scamLabels || ["PAY NOW", "SEND CODE", "OPEN LINK", "GIFT CARD"];
    function place(){ player.style.left = `${x}%`; }
    on(document, "keydown", e => keys[e.key.toLowerCase()] = true); on(document, "keyup", e => keys[e.key.toLowerCase()] = false);
    on($("#v14LeftBtn"), "pointerdown", () => keys.arrowleft = true); on($("#v14LeftBtn"), "pointerup", () => keys.arrowleft = false); on($("#v14RightBtn"), "pointerdown", () => keys.arrowright = true); on($("#v14RightBtn"), "pointerup", () => keys.arrowright = false);
    function spawn(){ const isStar = made % 4 === 2; made += 1; const el=document.createElement("div"); el.className = `fall-token ${isStar ? "star" : "scam"}`; el.dataset.star = isStar ? "true" : "false"; el.dataset.y = "-8"; el.dataset.speed = String((state.difficulty === "hard" ? 0.95 : 0.72) + Math.random() * 0.35); el.style.left = `${8 + Math.random()*78}%`; el.textContent = isStar ? "⭐ VERIFY" : labels[made % labels.length]; stage.appendChild(el); }
    const spawner=setInterval(spawn, state.difficulty === "hard" ? 560 : 720); addCleanup(()=>clearInterval(spawner));
    function tick(){ if(state.answered)return; if(keys.arrowleft||keys.a)x-=1.8; if(keys.arrowright||keys.d)x+=1.8; x=clamp(x,4,96); place(); const pr=player.getBoundingClientRect(); $$('.fall-token',stage).forEach(el=>{ let y=Number(el.dataset.y||0)+Number(el.dataset.speed||.8); el.dataset.y=String(y); el.style.top=`${y}%`; if(V14_overlap(pr,el.getBoundingClientRect())){ if(el.dataset.star==="true"){ collected++; if(starText)starText.textContent=collected; sfx("coin"); el.remove(); if(collected>=target)passRound("Collected safe verification while avoiding scam texts."); } else failRound("Hit by a falling scam text."); } else if(y>104) el.remove(); }); state.anim=requestAnimationFrame(tick); }
    place(); spawn(); state.anim=requestAnimationFrame(tick);
  }

  function drawPacketPaddle(round) {
    return `<div class="v14-stage packet-stage" id="packetStage"><div class="v14-stage-top"><strong>${esc(round.scenario || "Block scam packets.")}</strong><span>Blocked <b id="packetScore">0</b> / ${round.target || 5}</span></div><div class="packet-paddle" id="packetPaddle">🧱 FIREWALL</div></div><p class="muted">Move mouse/touch or arrow keys. Block red scam packets. Let green safe packets pass.</p>`;
  }

  function wirePacketPaddle(round) {
    const stage=$("#packetStage"), paddle=$("#packetPaddle"), score=$("#packetScore"); let x=50, blocked=0, made=0; const target=round.target||5; const scams=round.scamLabels||["phish","malware","fake pay"]; const safes=round.safeLabels||["receipt","family","class note"];
    const keys={}; function place(){paddle.style.left=`${x}%`;}
    function pointer(e){const r=stage.getBoundingClientRect(); x=clamp(((e.clientX-r.left)/r.width)*100,7,93); place();}
    on(stage,"pointermove",pointer); on(stage,"pointerdown",pointer); on(document,"keydown",e=>keys[e.key.toLowerCase()]=true); on(document,"keyup",e=>keys[e.key.toLowerCase()]=false);
    function spawn(){const scam=Math.random()<.68; const el=document.createElement("div"); el.className=`packet-token ${scam?"scam":"safe"}`; el.dataset.scam=scam?"true":"false"; el.dataset.y="-7"; el.dataset.speed=String((state.difficulty==="hard"?.88:.66)+Math.random()*.36); el.style.left=`${8+Math.random()*78}%`; el.textContent=scam?scams[made++%scams.length]:safes[made++%safes.length]; stage.appendChild(el);}
    const spawner=setInterval(spawn,state.difficulty==="hard"?520:680); addCleanup(()=>clearInterval(spawner));
    function tick(){ if(state.answered)return; if(keys.arrowleft||keys.a)x-=1.7; if(keys.arrowright||keys.d)x+=1.7; x=clamp(x,7,93); place(); const pr=paddle.getBoundingClientRect(); $$('.packet-token',stage).forEach(el=>{let y=Number(el.dataset.y||0)+Number(el.dataset.speed||.7); el.dataset.y=String(y); el.style.top=`${y}%`; if(V14_overlap(pr,el.getBoundingClientRect())){ if(el.dataset.scam==="true"){blocked++; if(score)score.textContent=blocked; sfx("coin"); el.remove(); if(blocked>=target)passRound("Firewall blocked the scam packets.");} else {el.remove(); minorPenalty("Safe packet blocked. Let verified traffic pass.");} } else if(y>100){ if(el.dataset.scam==="true") failRound("A scam packet reached the device."); else el.remove(); }}); state.anim=requestAnimationFrame(tick); }
    place(); spawn(); state.anim=requestAnimationFrame(tick);
  }

  function drawPhoneTapSequence(round) {
    return `<div class="phone-frame phone-sequence"><div class="phone-screen"><div class="phone-top"><span>Messages</span><span>•••</span></div><div id="phoneSequenceBody" class="phone-chat"></div></div></div><p class="muted">This is not one click: follow the safe reporting path and avoid link/reply traps.</p>`;
  }

  function wirePhoneTapSequence(round) {
    const body=$("#phoneSequenceBody"); let step=0; const sender=round.sender||"Unknown"; const msg=round.message||round.scenario||"Suspicious message with a link.";
    function draw(){
      if(step===0) body.innerHTML=`<div class="sms-bubble incoming"><strong>${esc(sender)}</strong><br>${esc(msg)}</div><button class="phone-btn" data-phone-step="open">Open suspicious message</button><button class="phone-btn" data-phone-wrong="minor">Open family message</button>`;
      if(step===1) body.innerHTML=`<div class="sms-bubble incoming">${esc(msg)}</div><div class="grid2"><button class="phone-btn" data-phone-wrong="fail">Open link</button><button class="phone-btn" data-phone-wrong="minor">Reply STOP</button><button class="phone-btn" data-phone-step="options">Open sender options</button><button class="phone-btn" data-phone-wrong="minor">Save contact</button></div>`;
      if(step===2) body.innerHTML=`<div class="phone-menu"><button class="phone-btn" data-phone-step="report">Report / Block</button><button class="phone-btn" data-phone-wrong="minor">Add to favorites</button><button class="phone-btn" data-phone-wrong="fail">Copy scam link</button></div>`;
      if(step===3) body.innerHTML=`<h3>Confirm safety action?</h3><button class="btn btn-primary" data-phone-step="confirm">Confirm Report + Block</button><button class="btn" data-phone-wrong="minor">Cancel</button>`;
      $$('[data-phone-step]', body).forEach(b=>on(b,"click",()=>{step++; sfx("click"); if(step>=4)return passRound("Phone scam reported and blocked safely."); draw();}));
      $$('[data-phone-wrong]', body).forEach(b=>on(b,"click",()=> b.dataset.phoneWrong==="fail"?failRound("Unsafe phone action selected."):minorPenalty("That is not the safest reporting path.")));
    }
    draw();
  }

  function drawBrowserPatchRun(round) {
    return `<div class="mock-window browser-patch"><div class="mock-title"><span>🌐 Browser Rescue</span><span>Danger rising</span></div><div class="mock-body"><p>${esc(round.scenario||"Fix the browser safely.")}</p><div class="danger-bar"><span id="browserPatchBar" style="width:8%"></span></div><div id="browserPatchBody" class="browser-patch-body"></div></div></div>`;
  }

  function wireBrowserPatchRun() {
    const body=$("#browserPatchBody"); let step=0, danger=8;
    const grow=setInterval(()=>{ if(state.answered)return clearInterval(grow); danger+=1.6; const bar=$("#browserPatchBar"); if(bar)bar.style.width=`${clamp(danger,0,100)}%`; if(danger>=100)failRound("Browser danger reached 100%."); },220); addCleanup(()=>clearInterval(grow));
    function draw(){
      const screens=[
        `<div class="fake-alert-card"><strong>Pop-up blocking page</strong><div class="grid3"><button class="btn btn-primary" data-browser-safe>Close pop-up ✕</button><button class="btn btn-danger" data-browser-bait>Install Cleaner</button><button class="btn" data-browser-bait>Allow Notifications</button></div></div>`,
        `<div class="fake-alert-card"><strong>Unknown file downloading...</strong><div class="danger-bar"><span style="width:62%"></span></div><div class="grid2"><button class="btn btn-danger" data-browser-safe>Stop download</button><button class="btn" data-browser-bait>Open file</button></div></div>`,
        `<div class="fake-alert-card"><strong>Site permission detected: clipboard + notifications</strong><div class="grid2"><button class="btn btn-primary" data-browser-safe>Clear suspicious permission</button><button class="btn" data-browser-bait>Keep permissions</button></div></div>`
      ];
      body.innerHTML=screens[step]||`<div class="fake-alert-card"><strong>Browser cleaned.</strong></div>`;
      $$('[data-browser-safe]',body).forEach(b=>on(b,"click",()=>{ step++; sfx("coin"); danger=clamp(danger-18,0,100); if(step>=3)return passRound("Browser cleaned in the correct safety order."); draw(); }));
      $$('[data-browser-bait]',body).forEach(b=>on(b,"click",()=>failRound("Clicked browser bait instead of the safe fix.")));
    }
    draw();
  }

  function drawRomanceEvidenceChat(round) {
    return `<div class="romance-live"><div class="live-chat-header"><strong>💘 ${esc(round.profile||"New Match")}</strong><span>Evidence <b id="romanceEvidenceCount">0</b> / 3</span></div><div class="chat-log live-chat-log" id="romanceLiveLog"><div class="chat-line system-line">Read each message. Tap red-flag evidence chips, then report/block.</div></div><button class="btn btn-danger" id="romanceReportBtn">Report + Block Profile</button></div>`;
  }

  function wireRomanceEvidenceChat(round) {
    const log=$("#romanceLiveLog"), count=$("#romanceEvidenceCount"); let evidence=0, idx=0; const profile=round.profile||"Match"; const flags=round.flags||["money request","secrecy","urgent deadline"];
    const messages=[
      [profile, "I feel like we have known each other forever.", null],
      [profile, "Can you help with a small travel fee today?", flags[0]||"money request"],
      [profile, "Please keep this private from your family.", flags[1]||"secrecy"],
      ["You", "I would rather verify first.", null],
      [profile, "The deadline is in one hour, please hurry.", flags[2]||"urgent deadline"],
      [profile, "Message me on another app and do not report this.", flags[3]||"external app"]
    ];
    function addMsg(){ if(state.answered)return; const m=messages[idx%messages.length]; idx++; const node=document.createElement("div"); node.className=`chat-line ${m[2]?"scam-chat-line":""}`; node.innerHTML=`<strong>${esc(m[0])}:</strong> ${esc(m[1])} ${m[2]?`<button class="flag-chip" data-romance-flag="${esc(m[2])}">🚩 ${esc(m[2])}</button>`:""}`; log.appendChild(node); log.scrollTop=log.scrollHeight; $$('[data-romance-flag]',node).forEach(b=>on(b,"click",()=>{ if(b.classList.contains("selected"))return; b.classList.add("selected"); evidence++; if(count)count.textContent=evidence; sfx("coin"); if(evidence>=3)toast("Enough evidence. Report and block now."); })); }
    const timer=setInterval(addMsg,1000); addCleanup(()=>clearInterval(timer)); addMsg();
    on($("#romanceReportBtn"),"click",()=> evidence>=3?passRound("Romance scam evidence collected and profile reported."):minorPenalty("Collect at least 3 red flags first."));
  }

  function drawScamWhack(round) {
    return `<div class="v14-stage whack-stage" id="whackStage"><div class="v14-stage-top"><strong>${esc(round.scenario||"Whack scam popups only.")}</strong><span>Hits <b id="whackHits">0</b> / ${round.target||6}</span></div></div><p class="muted">Tap only red scam prompts. Safe reminders are decoys.</p>`;
  }

  function wireScamWhack(round) {
    const stage=$("#whackStage"), hitsEl=$("#whackHits"); let hits=0, made=0; const target=round.target||6; const scams=round.scamLabels||["PAY NOW","SEND CODE","FREE PRIZE"]; const safes=round.safeLabels||["Official app","Known friend"];
    function spawn(){ if(state.answered)return; const scam=Math.random()<.7; const b=document.createElement("button"); b.className=`whack-pop ${scam?"scam":"safe"}`; b.dataset.scam=scam?"true":"false"; b.style.left=`${8+Math.random()*76}%`; b.style.top=`${18+Math.random()*66}%`; b.textContent=scam?scams[made++%scams.length]:safes[made++%safes.length]; stage.appendChild(b); on(b,"click",()=>{ if(b.dataset.scam==="true"){hits++; if(hitsEl)hitsEl.textContent=hits; sfx("coin"); b.remove(); if(hits>=target)passRound("Scam popups cleared.");} else {b.remove(); minorPenalty("Safe reminder hit. Only whack scams.");} }); setTimeout(()=>b.remove(),1200); }
    const timer=setInterval(spawn,state.difficulty==="hard"?430:620); addCleanup(()=>clearInterval(timer)); spawn();
  }

  function drawFakeAdClean(round) {
    const ads = Array.from({length: state.difficulty === "hard" ? 7 : 5}, (_, i) => i);
    return `<div class="v14-stage ad-clean-stage" id="adCleanStage"><div class="v14-stage-top"><strong>${esc(round.scenario||"Clean fake ads.")}</strong><span>Closed <b id="adClosed">0</b> / ${ads.length}</span></div>${ads.map((i)=>`<div class="fake-ad-card" style="left:${8+Math.random()*68}%;top:${18+Math.random()*58}%"><button class="ad-real-x" data-ad-x>×</button><strong>${i%2?"Prize Alert":"Security Warning"}</strong><button class="ad-bait" data-ad-bait>Download / Allow</button></div>`).join("")}</div>`;
  }

  function wireFakeAdClean() {
    let closed=0; const total=$$('[data-ad-x]').length; const out=$("#adClosed");
    $$('[data-ad-x]').forEach(btn=>on(btn,"click",(e)=>{ e.stopPropagation(); const card=btn.closest('.fake-ad-card'); if(card)card.remove(); closed++; if(out)out.textContent=closed; sfx("coin"); if(closed>=total)passRound("Fake ads closed using real X buttons."); }));
    $$('[data-ad-bait]').forEach(btn=>on(btn,"click",()=>failRound("Clicked a fake ad button instead of closing it.")));
    const mover=setInterval(()=>{$$('.fake-ad-card').forEach(card=>{card.style.transform=`translate(${Math.random()*14-7}px, ${Math.random()*14-7}px)`;});},650); addCleanup(()=>clearInterval(mover));
  }

  function drawLinkBridge(round) {
    state.v14BridgeStep = 0;
    return `<div class="link-bridge" id="linkBridge"><div class="scenario-box"><div class="message-header"><span class="avatar">🌉</span><span>Safe Link Bridge</span></div><div class="scenario-text">${esc(round.scenario||"Choose safe domains to cross.")}</div></div><div class="bridge-progress" id="bridgeProgress">Bridge step 1 / 4</div><div class="grid3" id="bridgeChoices"></div></div>`;
  }

  function wireLinkBridge(round) {
    const safeDomains = new Set([round.official || "official-source.com", "real-company.com", "official-source.com"]);
    const domainPool = round.domains || ["official-source.com", "secure-login-fast.net", "real-company.com", "gift-claim-now.info", "account-verify.co"];
    let step = 0;
    function drawStep(){ const choices = shuffle(domainPool).slice(0,4); if(!choices.some(d=>safeDomains.has(d))) choices[0]=[...safeDomains][0]; $("#bridgeProgress").textContent=`Bridge step ${step+1} / 4`; $("#bridgeChoices").innerHTML=choices.map(d=>`<button class="bridge-tile" data-bridge-safe="${safeDomains.has(d)?"true":"false"}">🌐 ${esc(d)}</button>`).join(""); $$('[data-bridge-safe]').forEach(b=>on(b,"click",()=>{ if(b.dataset.bridgeSafe!=="true")return failRound("The bridge collapsed on a lookalike domain."); step++; sfx("coin"); if(step>=4)return passRound("Crossed using only safe/official domains."); drawStep(); })); }
    drawStep();
  }

  /* ============================================================
     18) Results Screen
     ============================================================ */
  function showResults(lost) {
    clearLoops();
    const best = saveBestScore(state.score);
    const grade = lost ? "Training Needed" : state.score > 2800 ? "FraudFront Defender" : state.score > 1900 ? "Scam Spotter" : "Safety Rookie";
    const recapLessons = state.lessons.slice(0, 6);
    const playbook = [
      ["Stop the pressure", "Do not click, pay, download, approve MFA, or share codes while someone is rushing you."],
      ["Verify independently", "Use a saved number, official app, typed website, known school/work portal, or trusted relative."],
      ["Protect credentials", "Never share passwords, one-time codes, SSN/Medicare details, bank login, or remote access."],
      ["Report and block", "Report scam accounts, texts, emails, game-chat users, and fake profiles instead of engaging."],
      ["Save evidence", "Keep screenshots, sender info, URLs, payment details, and times if money or sensitive data was involved."]
    ];
    render(`
      <section class="screen results-screen">
        ${topbar()}
        <div class="panel results-panel">
          <span class="eyebrow">Run recap</span>
          <h1>${lost ? "The Fraudster broke through." : "You defeated The Fraudster!"}</h1>
          <p>${esc(grade)} · The recap below turns the game into real-life steps for handling scams after you play.</p>
          <div class="result-grid">
            <div><strong>${state.score}</strong><span>score</span></div>
            <div><strong>${state.correct}</strong><span>rounds cleared</span></div>
            <div><strong>${state.bestStreak}</strong><span>best combo</span></div>
            <div><strong>${best}</strong><span>best score</span></div>
          </div>
          <section class="recap-section">
            <h2>What to do when a scam appears</h2>
            <div class="recap-grid">
              ${playbook.map((item, i) => `<article class="recap-card"><span>${i + 1}</span><strong>${esc(item[0])}</strong><p>${esc(item[1])}</p></article>`).join("")}
            </div>
          </section>
          <section class="recap-section">
            <h2>Lessons from this run</h2>
            <div class="lesson-list">
              ${(recapLessons.length ? recapLessons : ["Pause, verify independently, report/block suspicious accounts, and avoid pressure-driven decisions."]).map((lesson) => `<div class="lesson-row">✅ ${esc(lesson)}</div>`).join("")}
            </div>
          </section>
          <section class="recap-section action-plan">
            <h2>Real-world emergency plan</h2>
            <p><strong>If money or sensitive info was shared:</strong> contact the bank/payment app immediately, change passwords, enable MFA, document evidence, and report the account/message. If a device was controlled remotely, disconnect internet and get trusted technical help before logging into accounts.</p>
          </section>
          <div class="button-row"><button class="btn btn-primary" id="againBtn">Play Again</button><button class="btn" id="libraryAgainBtn">Open Library</button><button class="btn" id="homeAgainBtn">Home</button></div>
        </div>
      </section>
    `);
    wireTopbar();
    on($("#againBtn"), "click", startGame);
    on($("#libraryAgainBtn"), "click", showLibrary);
    on($("#homeAgainBtn"), "click", showHome);
  }



  /* ============================================================
     18A) V15 Additive Patch
     Purpose: keep the V14 layout/games exactly as-is, then add:
     - sharper scenario-specific Iris hints
     - practice-library return-to-home behavior
     - share/copy recap text after defeating The Fraudster
     - stronger medium/hard penalties and boss difficulty
     - star platformer Iris Hint rewards
     - no red game-chat highlight except Easy/Senior mode
     - dispatch support for new V15 action-game types
     ============================================================ */

  function v15RefreshPowerups() {
    const row = $(".powerup-row");
    if (!row) return;
    row.outerHTML = powerups();
    wirePowerups();
  }

  function v15ScenarioText(round) {
    return String(round?.scenario || round?.message || round?.body || round?.prompt || round?.profile || round?.title || "this challenge");
  }

  function v15SafeVerb(round) {
    const type = String(round?.type || "");
    if (/file|download|virus|ad|popup|browser/i.test(type)) return "stop or close the unsafe item instead of opening/installing it";
    if (/chat|sms|email|phone|romance|marketplace|swipe/i.test(type)) return "report/block or verify independently before engaging";
    if (/domain|link|qr|website|password/i.test(type)) return "choose the exact official destination, not a lookalike";
    if (/platform|dodge|shield|paddle|whack|maze|rain/i.test(type)) return "move toward verification and away from pressure tokens";
    if (/mfa|code/i.test(type)) return "deny surprise prompts and never share codes";
    if (/money|amount/i.test(type)) return "send $0 unless the transaction is independently verified";
    return "pause, verify outside the message, and avoid pressure";
  }

  function v15EvidenceHint(round) {
    const bits = [];
    const hay = `${round?.category || ""} ${v15ScenarioText(round)} ${round?.command || ""}`.toLowerCase();
    if (/bank|account|login|password|portal|credential/.test(hay)) bits.push("credential theft or lookalike login");
    if (/code|mfa|2fa|otp/.test(hay)) bits.push("one-time code / MFA theft");
    if (/money|fee|refund|overpay|gift|crypto|wire|deposit|payment/.test(hay)) bits.push("unsafe payment pressure");
    if (/secret|private|do not tell|secrecy/.test(hay)) bits.push("secrecy pressure");
    if (/urgent|today|midnight|expires|deadline|hurry|now/.test(hay)) bits.push("urgency pressure");
    if (/download|install|remote|cleaner|exe|scr|macro|xlsm/.test(hay)) bits.push("malware or remote-access risk");
    if (/romance|love|travel|video/.test(hay)) bits.push("romance trust-building plus verification avoidance");
    if (/game|coins|skins|robux|nitro|reward/.test(hay)) bits.push("game reward/account-stealing bait");
    if (/qr|parking|sticker|domain|link|url/.test(hay)) bits.push("unsafe domain/QR destination");
    return bits.length ? bits.slice(0, 3).join(", ") : "pressure, identity, payment, link, or permission clues";
  }

  function getContextHint(round) {
    const type = round?.type;
    if (type === "bossRush") return getBossHint();

    const scenario = v15ScenarioText(round);
    const evidence = v15EvidenceHint(round);
    const safeMove = v15SafeVerb(round);

    if (["safeChoice", "safeChoicePlus", "codeShield", "recoveryKeyPuzzle", "captchaTrap", "searchResultPick", "wifiHotspotChoice", "deepfakeCall"].includes(type)) {
      const correct = (round.options || []).find((option) => option[1]);
      return { title: `Iris Hint: ${round.title}`, steps: [`This exact prompt is about: ${scenario}`, `Key clue to focus on: ${evidence}.`, correct ? `Choose the option closest to: “${correct[0]}.”` : `Safe move: ${safeMove}.`] };
    }

    if (["dangerWebsite", "siteInspector", "freeSiteExit", "privacyExit", "browserPatchRun", "browserRedirectMaze", "linkBridge", "domainDuel", "passwordFill", "passwordManagerFill", "qrScan", "qrLensFocus"].includes(type)) {
      return { title: `Iris Browser Hint: ${round.title}`, steps: [`Scenario: ${scenario}`, `Inspect the full URL/domain and requested data. Evidence clue: ${evidence}.`, `Safe move: ${safeMove}.`] };
    }

    if (["gameChatReport", "lobbyMute"].includes(type)) {
      return { title: "Iris Game Room Hint", steps: [`Watch for the player posting: ${round.message || "links, codes, free prizes, or off-platform instructions"}.`, "The scammer is randomized, so use the chat sender name, not the first name in the roster.", "After at least one scam message appears, select that sender and use Mute + Report."] };
    }

    if (["romanceSwipe", "romanceEvidenceChat", "swipeJudge"].includes(type)) {
      return { title: "Iris Romance Hint", steps: [`Profile/context: ${scenario}`, `Evidence to collect: ${evidence}.`, "Block/report when there is money, gift cards, crypto, secrecy, fast love, refusal to verify, or moving off-platform."] };
    }

    if (["platformHints", "hintPlatformer", "starBridgeRun"].includes(type)) {
      const count = round.targetStars || (round.stars ? round.stars.length : 3);
      return { title: "Iris Platform Hint", steps: [`Collect all ${count} stars. Every star gives +1 Iris Hint as a reward.`, "Use A/D or ←/→ to move, Space/W/↑ to jump, and use the on-screen buttons on mobile.", `This level's real-life lesson: ${round.lesson || "move toward verification and away from pressure."}`] };
    }

    if (["shieldCursor", "messageShieldRun"].includes(type)) {
      return { title: "Iris Shield Hint", steps: [`Block scam tokens connected to: ${scenario}`, "Let safe verification tokens pass. Blocking safe items costs trust.", `Key clue: ${evidence}.`] };
    }

    if (["textDodge", "scamRainDodge", "fallingDodge", "shieldBlock"].includes(type)) {
      return { title: "Iris Dodge Hint", steps: ["Move left/right constantly. Red pressure text is danger; verification stars are safe.", `Watch for: ${evidence}.`, "On keyboard use A/D or arrows. On mobile use the on-screen arrows."] };
    }

    if (["virusDownload", "rushStopDownload", "tabStopDownload", "popupPurge", "closeWindowX", "fakeAdClean", "scamWhack"].includes(type)) {
      return { title: "Iris Pop-Up/Malware Hint", steps: [`Threat: ${scenario}`, "Real safety actions close, cancel, stop download, or report. Fake buttons say allow, install, claim, continue, scan, or call.", `Key clue: ${evidence}.`] };
    }

    if (["attachmentFlash", "attachmentMemory", "fileDelete", "fileExplorerDelete", "downloadDelete", "taskbarFileDelete", "dragTrash", "giftCardShredder", "passwordVaultDrag"].includes(type)) {
      return { title: "Iris File Hint", steps: ["Treat .exe, .scr, macro files, fake login archives, and surprise tools as risky.", "Do not delete/open normal photos, notes, or known PDFs unless the prompt marks them risky.", `This scenario clue is: ${evidence}.`] };
    }

    if (["phoneTapSequence", "smsBlock", "smsReport", "smsReportSpam", "emailBlock", "chatRefuse"].includes(type)) {
      return { title: "Iris Message Hint", steps: [`Message context: ${scenario}`, "The safe path is usually options/menu → report/block, not reply, open link, save contact, or copy link.", `Evidence clue: ${evidence}.`] };
    }

    if (["packetPaddle", "vpnTunnelSwitch", "firewallPatchGrid", "socialFirewall"].includes(type)) {
      return { title: "Iris Firewall Hint", steps: ["Block scam traffic but let normal/verified traffic pass.", `Scenario clue: ${evidence}.`, "If the label asks for codes, payment, downloads, or secret action, block it."] };
    }

    if (["mfaApprovalGate", "mfaShield"].includes(type)) return { title: "Iris MFA Hint", steps: [`Prompt: ${scenario}`, "Approve only if you personally started the login at that moment.", "Surprise MFA prompts should be denied, then passwords/sessions should be reviewed."] };
    if (["moneyCounter", "moneyGuard", "safeAmount"].includes(type)) return { title: "Iris Money Hint", steps: [`Payment context: ${scenario}`, "Scammer-requested money, refunds, gift cards, crypto, or deposits should usually be $0.", "Only independently verified, normal transactions should use a real amount."] };

    return { title: `Iris Hint: ${round?.title || "Challenge"}`, steps: [`Scenario: ${scenario}`, `Key clue: ${evidence}.`, `Safe move: ${safeMove}.`] };
  }

  function failRound(headline) {
    if (state.answered) return;
    state.answered = true;
    clearLoops();
    sfx("wrong");
    state.mistakes += 1;
    state.streak = 0;

    const difficultyDamage = state.difficulty === "hard"
      ? { trust: 28, fraud: 24, shieldTrust: 12 }
      : state.difficulty === "medium"
        ? { trust: 19, fraud: 18, shieldTrust: 8 }
        : { trust: 12, fraud: 12, shieldTrust: 5 };

    if (state.powerups.shield > 0) {
      state.powerups.shield -= 1;
      state.trust = clamp(state.trust - difficultyDamage.shieldTrust, 0, 100);
      state.fraudster = clamp(state.fraudster + Math.ceil(difficultyDamage.fraud / 2), 0, 100);
      toast("Shield absorbed some damage, but mistakes still hurt on this difficulty.");
      v15RefreshPowerups();
    } else {
      state.trust = clamp(state.trust - difficultyDamage.trust, 0, 100);
      state.fraudster = clamp(state.fraudster + difficultyDamage.fraud, 0, 100);
    }

    shake();
    showFeedback(false, headline, state.current?.lesson, state.difficulty === "hard" ? "Hard mode penalty: trust dropped sharply." : state.difficulty === "medium" ? "Medium mode penalty: trust dropped." : "Trust shield damaged.");
  }

  function minorPenalty(message) {
    sfx("wrong");
    const loss = state.difficulty === "hard" ? 10 : state.difficulty === "medium" ? 7 : 4;
    const fraudGain = state.difficulty === "hard" ? 8 : state.difficulty === "medium" ? 5 : 3;
    state.trust = clamp(state.trust - loss, 0, 100);
    state.fraudster = clamp(state.fraudster + fraudGain, 0, 100);
    updateBars();
    toast(message);
    shake();
    if (state.trust <= 0) failRound("Trust shield broke.");
  }

  function showFeedback(success, headline, lesson, line) {
    if (lesson && !state.lessons.includes(lesson)) state.lessons.push(lesson);
    updateBars();
    const host = $("#feedbackHost");
    if (!host) return;
    const isPracticeDone = state.practiceMode;
    const lastRound = state.idx >= state.selected.length - 1 || state.trust <= 0;
    const buttonText = isPracticeDone ? "Return Home" : (lastRound ? "See Recap" : "Next Random Microgame");
    host.innerHTML = `
      <div class="feedback ${success ? "feedback-good" : "feedback-bad"}">
        <strong>${success ? "✅" : "⚠️"} ${esc(headline)}</strong>
        <p>${esc(lesson || "Pause, verify independently, and avoid pressure.")}</p>
        <p class="small">${esc(line)}</p>
        <div class="button-row" style="margin-top:0"><button class="btn ${success ? "btn-primary" : "btn-danger"}" id="nextRoundBtn">${buttonText}</button></div>
      </div>
    `;
    wireTopbar();
    on($("#nextRoundBtn"), "click", () => {
      if (state.transitioning) return;
      state.transitioning = true;
      $("#nextRoundBtn").disabled = true;
      nextRound();
    });
  }

  function nextRound() {
    if (state.practiceMode) return showHome();
    if (state.trust <= 0) return showResults(true);
    state.idx += 1;
    if (state.idx >= state.selected.length) return showResults(false);
    renderRound();
  }

  function drawPlatformer(round = {}) {
    const platforms = round.platforms || [[4,86,22],[20,65,20],[41,47,20],[62,29,20]];
    const stars = round.stars || [[24,55],[48,37],[72,19]];
    const hazards = round.hazards || [[36,78,"🚩"],[57,59,"⚠️"]];
    const target = round.targetStars || stars.length || 3;
    return `
      <div class="platform-field" id="platformField" aria-label="Platformer play field">
        ${platforms.map((p) => `<div class="platform" style="left:${p[0]}%; top:${p[1]}%; width:${p[2]}%;"></div>`).join("")}
        ${stars.map((s, i) => `<div class="goal-star" data-star="${i + 1}" style="left:${s[0]}%; top:${s[1]}%;">⭐</div>`).join("")}
        ${hazards.map((h) => `<div class="scam-spike" style="left:${h[0]}%; top:${h[1]}%;">${esc(h[2] || "🚩")}</div>`).join("")}
        <div class="jumper" id="jumper">🧍</div>
      </div>
      <p class="muted" id="starProgress">Stars collected: 0 / ${target} · Iris Hint rewards earned: 0</p>
      <div class="platform-reward-note">⭐ Each star adds +1 Iris Hint. Collect all stars to clear the level.</div>
      <div class="control-pad">
        <button class="btn btn-secondary" id="leftBtn">←</button>
        <button class="btn btn-secondary" id="jumpBtn">Jump</button>
        <button class="btn btn-secondary" id="rightBtn">→</button>
      </div>
    `;
  }

  function wirePlatformer(round = {}) {
    const field = $("#platformField");
    const jumper = $("#jumper");
    if (!field || !jumper) return;

    const target = round.targetStars || $$(".goal-star", field).length || 3;
    const keys = { left: false, right: false };
    state.platform = { x: 20, y: 0, vx: 0, vy: 0, grounded: false, invulnerable: 0 };
    let hintsEarned = 0;

    function setupStart() {
      const firstPlatform = $(".platform", field);
      const top = firstPlatform ? firstPlatform.offsetTop : field.clientHeight - 70;
      state.platform.x = Math.max(16, field.clientWidth * 0.06);
      state.platform.y = Math.max(0, top - 52);
      updateJumper();
    }

    function updateJumper() {
      jumper.style.transform = `translate(${state.platform.x}px, ${state.platform.y}px)`;
    }

    function jump() {
      ensureAudio();
      if (state.platform.grounded) {
        sfx("jump");
        state.platform.vy = -12.5;
        state.platform.grounded = false;
      }
    }

    function setKey(key, value) { keys[key] = value; }

    on(document, "keydown", (e) => {
      const k = e.key.toLowerCase();
      if (k === "arrowleft" || k === "a") setKey("left", true);
      if (k === "arrowright" || k === "d") setKey("right", true);
      if (k === " " || k === "arrowup" || k === "w") { e.preventDefault(); jump(); }
    });
    on(document, "keyup", (e) => {
      const k = e.key.toLowerCase();
      if (k === "arrowleft" || k === "a") setKey("left", false);
      if (k === "arrowright" || k === "d") setKey("right", false);
    });

    function holdButton(button, key) {
      on(button, "pointerdown", (e) => { e.preventDefault(); ensureAudio(); setKey(key, true); });
      on(button, "pointerup", () => setKey(key, false));
      on(button, "pointercancel", () => setKey(key, false));
      on(button, "pointerleave", () => setKey(key, false));
    }
    holdButton($("#leftBtn"), "left");
    holdButton($("#rightBtn"), "right");
    on($("#jumpBtn"), "click", jump);
    on(window, "deviceorientation", (e) => { state.tiltX = v16TiltAxis(e); }, { passive: true });

    function tick() {
      if (state.answered) return;
      const p = state.platform;
      const fieldW = field.clientWidth;
      const fieldH = field.clientHeight;
      const w = 48;
      const h = 48;

      if (keys.left) p.vx = -5.2;
      else if (keys.right) p.vx = 5.2;
      else p.vx *= 0.78;
      if (state.deviceMode === "motion") p.vx += clamp(state.tiltX, -18, 18) * 0.025;

      p.vy += 0.58;
      p.x += p.vx;
      p.y += p.vy;
      p.x = clamp(p.x, 0, Math.max(0, fieldW - w));
      p.grounded = false;

      $$(".platform", field).forEach((platform) => {
        const top = platform.offsetTop;
        const left = platform.offsetLeft;
        const right = left + platform.offsetWidth;
        const wasAbove = p.y + h - p.vy <= top + 8;
        const isFalling = p.vy >= 0;
        const horizontal = p.x + w > left && p.x < right;
        const vertical = p.y + h >= top && p.y + h <= top + 24;
        if (isFalling && wasAbove && horizontal && vertical) {
          p.y = top - h;
          p.vy = 0;
          p.grounded = true;
        }
      });

      if (p.y > fieldH - h) {
        p.y = fieldH - h;
        p.vy = 0;
        p.grounded = true;
      }

      updateJumper();
      const jr = jumper.getBoundingClientRect();

      $$(".goal-star", field).forEach((star) => {
        if (star.classList.contains("collected")) return;
        if (V14_overlap(jr, star.getBoundingClientRect())) {
          star.classList.add("collected");
          state.starCount += 1;
          state.powerups.iris += 1;
          hintsEarned += 1;
          sfx("coin");
          const progress = $("#starProgress");
          if (progress) progress.textContent = `Stars collected: ${state.starCount} / ${target} · Iris Hint rewards earned: ${hintsEarned}`;
          v15RefreshPowerups();
          toast("+1 Iris Hint earned from the star.");
        }
      });

      $$(".scam-spike", field).forEach((spike) => {
        if (p.invulnerable <= 0 && V14_overlap(jr, spike.getBoundingClientRect())) {
          p.invulnerable = 45;
          p.vx = -p.vx * 1.4;
          p.vy = -8;
          minorPenalty("You hit a scam trap. Keep moving toward safe hints.");
        }
      });
      p.invulnerable = Math.max(0, p.invulnerable - 1);

      if (state.starCount >= target) return passRound("Collected every Iris star and cleared the platform route.");
      state.anim = requestAnimationFrame(tick);
    }

    requestAnimationFrame(() => {
      setupStart();
      state.anim = requestAnimationFrame(tick);
    });
  }

  function drawLobbyV13(round) {
    const basePlayers = round.players || ["PixelPat", "GardenMom", "Runner42", "StudyBuddy", "NovaKid", "CraftyCat", "RapidFox", "ByteBuddy"];
    const roster = shuffle([...new Set(basePlayers.concat(round.player || [], round.spammer || []))]).slice(0, Math.min(8, Math.max(5, basePlayers.length)));
    const scamPlayer = roster[Math.floor(Math.random() * roster.length)] || "ScamBot99";
    const decoys = roster.filter((p) => p !== scamPlayer);
    const scamText = round.message || round.scenario || "FREE COINS! Visit game-prize-fast.net and log in!";
    const decoyLines = [
      "Anyone want to play next round?", "Good match, team!", "I found the safe route.", "Let’s use the normal game menu.", "Please don’t click random links.", "Can someone help with the puzzle?", "Official events are in the game news tab."
    ];
    const scamAdds = [
      scamText,
      "Hurry, the reward expires soon.",
      "Do not tell moderators or it will disappear.",
      "Use my link only, not the official site.",
      "Send your code and I can unlock it for you."
    ];
    const queue = [];
    for (let i = 0; i < 20; i += 1) {
      if (i % 3 === 1) queue.push({ from: scamPlayer, text: scamAdds[(i / 3 | 0) % scamAdds.length], scam: true });
      else queue.push({ from: decoys[i % Math.max(1, decoys.length)] || "Player", text: decoyLines[i % decoyLines.length], scam: false });
    }
    state.v14Lobby = { scamPlayer, queue, visibleScam: 0, selected: null, lineCount: 0 };
    const assisted = state.playerMode === "senior" || state.difficulty === "easy";
    return `
      <div class="lobby-ui live-lobby-ui">
        <div class="sidebar"><h3>Players</h3><p class="muted small">The scammer is randomized every time.</p><div class="player-list">${roster.map((p) => `<button class="lobby-player" data-player="${esc(p)}">${esc(p)}</button>`).join("")}</div></div>
        <div class="mainarea">
          <div class="live-chat-header"><strong>Live Game Room</strong><span id="liveChatStatus">New messages incoming…</span></div>
          <div class="chat-log live-chat-log" id="liveChatLog"><div class="chat-line system-line">Watch the chat. Pick the suspicious player, then Mute + Report. ${assisted ? "Easy/Senior assist: scam messages are highlighted." : "No red highlight in this mode — use the sender and message clues."}</div></div>
          <div class="player-menu" id="playerMenu"><strong id="menuTitle">Select a suspicious player first.</strong><div class="grid3"><button class="action-btn" data-menu-action="friend">Add Friend</button><button class="action-btn" data-menu-action="report">Mute + Report</button><button class="action-btn" data-menu-action="open">Open Link</button></div></div>
        </div>
      </div>`;
  }

  function wireLobbyV13(round) {
    const lobby = state.v14Lobby;
    const log = $("#liveChatLog");
    let idx = 0;
    const highlightScams = state.playerMode === "senior" || state.difficulty === "easy";
    function addLine() {
      if (state.answered || !log || !lobby) return;
      const fallback = idx % 2
        ? { from: lobby.scamPlayer, text: "Last chance. Use my link now before it disappears.", scam: true }
        : { from: "System", text: "Reminder: report suspicious links and never share login codes.", scam: false };
      const line = lobby.queue[idx] || fallback;
      idx += 1;
      lobby.lineCount += 1;
      if (line.scam) lobby.visibleScam += 1;
      const node = document.createElement("div");
      node.className = `chat-line ${line.scam && highlightScams ? "scam-chat-line" : ""}`;
      node.innerHTML = `<strong>${esc(line.from)}:</strong> ${esc(line.text)}`;
      log.appendChild(node);
      log.scrollTop = log.scrollHeight;
      const status = $("#liveChatStatus");
      if (status) status.textContent = `${lobby.lineCount} messages · ${lobby.visibleScam} suspicious clue${lobby.visibleScam === 1 ? "" : "s"}`;
    }
    const firstDelay = setTimeout(addLine, 350);
    const chatTimer = setInterval(addLine, 1050);
    addCleanup(() => clearTimeout(firstDelay));
    addCleanup(() => clearInterval(chatTimer));

    $$('.lobby-player').forEach((button) => on(button, "click", () => {
      lobby.selected = button.dataset.player;
      $$('.lobby-player').forEach((x) => x.classList.remove("selected"));
      button.classList.add("selected");
      $("#playerMenu").classList.add("open");
      $("#menuTitle").textContent = `${lobby.selected} options`;
      sfx("click");
      if (lobby.selected !== lobby.scamPlayer) minorPenalty("That player has not posted the scam message. Watch the chat sender.");
    }));
    $$('[data-menu-action]').forEach((button) => on(button, "click", () => {
      if (!lobby.selected) return toast("Select a player first.");
      if (button.dataset.menuAction === "open") return failRound("Opened the scam link from game chat.");
      if (button.dataset.menuAction === "friend") return minorPenalty("Do not add the suspicious account. Use Mute + Report.");
      if (lobby.selected === lobby.scamPlayer && lobby.visibleScam >= 1) return passRound("Suspicious player muted and reported from the live chat.");
      if (lobby.selected === lobby.scamPlayer) return minorPenalty("Wait for at least one scam message, then report.");
      return minorPenalty("Wrong player — use Mute + Report on the scam sender.");
    }));
  }

  function wireBoss() {
    state.boss = {
      hp: 100,
      solved: 0,
      need: state.difficulty === "hard" ? 10 : state.difficulty === "easy" ? 6 : 8,
      used: [],
      phase: null,
      sequenceProgress: []
    };
    renderBossPhase();
  }

  function bossAnswer(correct) {
    if (state.answered || !state.boss) return;
    const phase = state.boss.phase;
    const card = $("#bossCard");

    if (correct) {
      sfx("boss");
      state.boss.solved += 1;
      state.boss.hp = clamp(state.boss.hp - Math.ceil(100 / state.boss.need), 0, 100);
      state.score += 95 + state.boss.solved * 14;
      state.fraudster = clamp(state.fraudster - 6, 0, 100);
      card?.classList.remove("boss-heal");
      card?.classList.add("boss-hit");
      toast(`Boss hit! ${phase.lesson || "Safe move."}`);
      updateBars();
      updateBossBars();
      if (state.boss.solved >= state.boss.need || state.boss.hp <= 0) return passRound("The Fraudster boss was defeated.");
      const timeout = setTimeout(() => { card?.classList.remove("boss-hit"); renderBossPhase(); }, 620);
      addCleanup(() => clearTimeout(timeout));
    } else {
      sfx("wrong");
      state.mistakes += 1;
      state.streak = 0;
      const penalty = state.difficulty === "hard"
        ? { trust: 18, shield: 8, fraud: 14, heal: 14 }
        : state.difficulty === "medium"
          ? { trust: 13, shield: 6, fraud: 10, heal: 10 }
          : { trust: 8, shield: 4, fraud: 7, heal: 8 };
      if (state.powerups.shield > 0) { state.powerups.shield -= 1; state.trust = clamp(state.trust - penalty.shield, 0, 100); v15RefreshPowerups(); }
      else state.trust = clamp(state.trust - penalty.trust, 0, 100);
      state.fraudster = clamp(state.fraudster + penalty.fraud, 0, 100);
      state.boss.hp = clamp(state.boss.hp + penalty.heal, 0, 100);
      card?.classList.remove("boss-hit");
      card?.classList.add("boss-heal");
      shake();
      toast(`Boss countered hard. ${phase.lesson || "Try the safer action."}`);
      updateBars();
      updateBossBars();
      if (state.trust <= 0) return failRound("The boss broke your trust shield.");
      const timeout = setTimeout(() => { card?.classList.remove("boss-heal"); renderBossPhase(); }, 760);
      addCleanup(() => clearTimeout(timeout));
    }
  }

  function typeDisplayName(type) {
    const names = {
      safeChoice: "Verification Decisions", safeChoicePlus: "Advanced Verification Decisions", codeShield: "2FA Code Shield", recoveryKeyPuzzle: "Recovery Key Protection", captchaTrap: "Fake Captcha Escapes", searchResultPick: "Search Result Minefields", wifiHotspotChoice: "Wi-Fi Choice", dangerWebsite: "Mock Website Escapes", siteInspector: "Website Red-Flag Inspector", freeSiteExit: "Fake Free-Site Exit", privacyExit: "Data-Grab Form Exit", domainDuel: "Domain Duel", vpnTunnelSwitch: "VPN Tunnel Routing", passwordFill: "Password Manager Checks", passwordManagerFill: "Legacy Password Manager", qrScan: "QR Safety Lens", qrLensFocus: "QR Lens Focus", romanceSwipe: "Mock Romance Swipes", marketplaceMatch: "Marketplace Swipes", swipeJudge: "Legacy Swipe Judge", attachmentFlash: "Attachment Flash", attachmentMemory: "Legacy Attachment Memory", fileDelete: "Risky File Cleanup", fileExplorerDelete: "File Explorer Cleanup", downloadDelete: "Download Delete", taskbarFileDelete: "Taskbar File Delete", dragTrash: "Drag Scams to Trash", giftCardShredder: "Gift Card Shredder", passwordVaultDrag: "Password Vault Drag", gameChatReport: "Game Chat Report", lobbyMute: "Lobby Mute/Report", emailBlock: "Email Block Sender", smsBlock: "SMS Block", smsReport: "SMS Report Spam", chatRefuse: "Typed Refusal", platformHints: "Moving Hint Platformer", hintPlatformer: "Legacy Moving Platformer", starBridgeRun: "Star Bridge Platformer", fallingDodge: "Falling Dodge", shieldBlock: "Shield Block", spotlightSpy: "Mouse Searchlight Spyware", spywareMaze: "Spyware Maze", popupPurge: "Pop-Up Purge", closeWindowX: "Find Real X", virusDownload: "Virus Download Mash", tabStopDownload: "Browser Tab Stop Download", rushStopDownload: "Rush Stop Download", spamBlockHunt: "Spam Block Hunt", deepfakeSpot: "Deepfake Clue Spotter", bankStatementHunt: "Bank Statement Hunt", shoppingCartAudit: "Shopping Cart Audit", extensionAudit: "Extension Audit", permissionsToggle: "Legacy Permissions Toggle", permissionToggle: "Permission Toggles", privacyCleaner: "Privacy Cleaner", clipboardCleaner: "Clipboard Cleaner", evidenceTokenSelect: "Evidence Token Select", familyCallOrder: "Family Call Order", sequenceBuilder: "Sequence Builder", firewallPatchGrid: "Firewall Patch Grid", mfaApprovalGate: "MFA Approval Gate", mfaShield: "MFA Shield", moneyCounter: "Money Counter", moneyGuard: "Money Guard", safeAmount: "Safe Amount", categoryMatch: "Category Match", sortBasket: "Sort Basket", socialFirewall: "Social Firewall", callInterrupt: "Call Interrupt", safeWordChallenge: "Safe Word Challenge", legitOrScamCalibration: "Legit or Scam Calibration", legacyBossRush: "Legacy Boss Rush", bossRush: "Final Boss", shieldCursor: "Mouse Shield Defense", messageShieldRun: "Mouse Shield Defense", textDodge: "WASD Text Dodge", scamRainDodge: "Scam Text Rain Dodge", packetPaddle: "Firewall Paddle", phoneTapSequence: "Phone Report Path", browserPatchRun: "Browser Patch Run", browserRedirectMaze: "Browser Redirect Maze", romanceEvidenceChat: "Live Romance Evidence Chat", scamWhack: "Scam Whack", fakeAdClean: "Fake Ad Cleaner", linkBridge: "Safe Link Bridge"
    };
    return names[type] || String(type || "Challenge").replace(/([A-Z])/g, " $1").replace(/^./, (m) => m.toUpperCase());
  }

  function startGame() {
    clearLoops();
    ensureAudio();
    Object.assign(state, {
      selected: [], idx: 0, score: 0, correct: 0, mistakes: 0, streak: 0, bestStreak: 0,
      trust: 100, fraudster: 28, powerups: { iris: 3, freeze: 1, shield: 1 }, boss: null, lessons: [], practiceMode: false
    });

    const boss = ROUNDS.find((round) => round.type === "bossRush");
    const pool = ROUNDS.filter((round) => round.type !== "bossRush" && round.type !== "legacyBossRush");
    const chosen = [];
    const used = new Set();
    const buckets = [
      ["action", ["virusDownload", "rushStopDownload", "tabStopDownload", "popupPurge", "closeWindowX", "hintPlatformer", "platformHints", "starBridgeRun", "fallingDodge", "shieldBlock", "spotlightSpy", "spywareMaze", "spamBlockHunt", "shieldCursor", "messageShieldRun", "textDodge", "scamRainDodge", "packetPaddle", "scamWhack", "fakeAdClean"], 10],
      ["files", ["attachmentFlash", "attachmentMemory", "fileDelete", "fileExplorerDelete", "downloadDelete", "taskbarFileDelete", "dragTrash", "giftCardShredder", "passwordVaultDrag"], 6],
      ["social", ["gameChatReport", "lobbyMute", "emailBlock", "smsBlock", "smsReport", "chatRefuse", "romanceSwipe", "marketplaceMatch", "swipeJudge", "socialFirewall", "romanceEvidenceChat", "phoneTapSequence"], 7],
      ["browser", ["dangerWebsite", "siteInspector", "freeSiteExit", "privacyExit", "passwordFill", "passwordManagerFill", "domainDuel", "qrScan", "qrLensFocus", "wifiHotspotChoice", "vpnTunnelSwitch", "browserPatchRun", "browserRedirectMaze", "linkBridge"], 6],
      ["logic", ["deepfakeSpot", "bankStatementHunt", "shoppingCartAudit", "extensionAudit", "permissionsToggle", "permissionToggle", "privacyCleaner", "clipboardCleaner", "evidenceTokenSelect", "familyCallOrder", "sequenceBuilder", "firewallPatchGrid", "mfaApprovalGate", "mfaShield", "moneyCounter", "moneyGuard", "safeAmount", "categoryMatch", "sortBasket", "legitOrScamCalibration", "safeWordChallenge", "callInterrupt"], 5]
    ];

    function addFromTypes(types, count) {
      const candidates = pool.filter((round) => types.includes(round.type) && !used.has(round.id));
      const preferred = candidates.filter((round) => {
        if (state.difficulty === "easy") return round.difficulty !== "hard";
        if (state.difficulty === "hard") return round.difficulty !== "easy" || Math.random() < 0.30;
        return true;
      });
      sample(preferred.length ? preferred : candidates, count).forEach((round) => {
        if (!used.has(round.id)) { chosen.push(round); used.add(round.id); }
      });
    }

    buckets.forEach(([, types, count]) => addFromTypes(types, count));
    const remaining = shuffle(pool.filter((round) => !used.has(round.id)));
    while (chosen.length < DATA.site.arcadeRoundsBeforeBoss && remaining.length) {
      const next = remaining.shift();
      chosen.push(next);
      used.add(next.id);
    }
    state.selected = shuffle(chosen).slice(0, DATA.site.arcadeRoundsBeforeBoss);
    if (boss) state.selected.push(boss);
    renderRound();
  }

  function drawRound(round) {
    const t = round.type;
    if (t === "shieldCursor" || t === "messageShieldRun") return drawShieldCursor(round);
    if (t === "textDodge" || t === "scamRainDodge") return drawTextDodge(round);
    if (t === "packetPaddle") return drawPacketPaddle(round);
    if (t === "phoneTapSequence") return drawPhoneTapSequence(round);
    if (t === "browserPatchRun") return drawBrowserPatchRun(round);
    if (t === "browserRedirectMaze") return drawLinkBridge(round);
    if (t === "romanceEvidenceChat") return drawRomanceEvidenceChat(round);
    if (t === "scamWhack") return drawScamWhack(round);
    if (t === "fakeAdClean") return drawFakeAdClean(round);
    if (t === "linkBridge") return drawLinkBridge(round);
    if (["safeChoice", "safeChoicePlus", "codeShield", "recoveryKeyPuzzle", "captchaTrap", "searchResultPick", "wifiHotspotChoice", "deepfakeCall"].includes(t)) return drawChoiceV14(round);
    if (t === "dangerWebsite") return drawDangerWebsite(round);
    if (t === "siteInspector") return drawSiteInspector(round);
    if (t === "freeSiteExit" || t === "privacyExit") return drawExitSite(round);
    if (t === "domainDuel" || t === "passwordManagerFill" || t === "passwordFill") return drawDomainPick(round);
    if (t === "vpnTunnelSwitch") return drawVpnTunnel(round);
    if (t === "qrLensFocus") return drawQrLensFocus(round);
    if (t === "qrScan") return drawQRScan(round);
    if (t === "romanceSwipe" || t === "swipeJudge") return drawSwipe(round, "romance");
    if (t === "marketplaceMatch") return drawSwipe(round, "marketplace");
    if (t === "attachmentFlash") return drawAttachmentFlash(round);
    if (t === "attachmentMemory") return drawAttachmentMemory(round);
    if (t === "fileDelete") return drawFileDelete(round);
    if (t === "fileExplorerDelete") return drawFileExplorerDelete(round);
    if (t === "downloadDelete") return drawDownloadDelete(round);
    if (t === "taskbarFileDelete") return drawTaskbarFileDelete(round);
    if (t === "dragTrash") return drawDragTrash(round);
    if (t === "giftCardShredder") return drawGiftCardShredder(round);
    if (t === "passwordVaultDrag") return drawPasswordVault(round);
    if (t === "gameChatReport" || t === "lobbyMute") return drawLobbyV13(round);
    if (t === "emailBlock") return drawEmailBlock(round);
    if (t === "smsBlock" || t === "smsReport" || t === "smsReportSpam") return drawPhoneMenu(round, t === "smsBlock" ? "Block Contact" : "Report Spam");
    if (t === "chatRefuse") return drawChatRefuse(round);
    if (t === "platformHints" || t === "hintPlatformer" || t === "starBridgeRun") return drawPlatformer(round);
    if (t === "fallingDodge" || t === "shieldBlock") return drawFallingDodge(round, t === "shieldBlock");
    if (t === "spotlightSpy") return drawSpotlightSpy(round);
    if (t === "spywareMaze") return drawSpywareMaze(round);
    if (t === "popupPurge") return drawPopupPurge(round);
    if (t === "closeWindowX") return drawCloseWindowX(round);
    if (t === "virusDownload") return drawVirusDownload(round);
    if (t === "tabStopDownload") return drawTabStopDownload(round);
    if (t === "rushStopDownload") return drawRushStopDownload(round);
    if (t === "spamBlockHunt") return drawSpamBlockHunt(round);
    if (t === "inboxShooter" || t === "downloadShooter") return drawShooter(round);
    if (["deepfakeSpot", "bankStatementHunt", "shoppingCartAudit", "extensionAudit", "permissionsToggle", "privacyCleaner", "clipboardCleaner", "evidenceTokenSelect"].includes(t)) return drawSelectAudit(round);
    if (t === "socialFirewall") return drawSocialFirewall(round);
    if (t === "permissionToggle") return drawPermissionToggle(round);
    if (t === "familyCallOrder" || t === "sequenceBuilder") return drawOrder(round);
    if (t === "firewallPatchGrid") return drawFirewallPatchGrid(round);
    if (t === "mfaApprovalGate" || t === "mfaShield") return drawMFA(round);
    if (t === "moneyCounter" || t === "moneyGuard" || t === "safeAmount") return drawMoney(round);
    if (t === "categoryMatch") return drawCategoryMatch(round);
    if (t === "sortBasket") return drawSortBasket(round);
    if (t === "callInterrupt") return drawCallInterrupt(round);
    if (t === "safeWordChallenge") return drawSafeWordChallenge(round);
    if (t === "legitOrScamCalibration") return drawLegitOrScam(round);
    if (t === "legacyBossRush") return drawLegacyBoss(round);
    if (t === "bossRush") return drawBoss(round);
    return drawUniversalRound(round);
  }

  function wireRound(round) {
    const t = round.type;
    if (t === "shieldCursor" || t === "messageShieldRun") return wireShieldCursor(round);
    if (t === "textDodge" || t === "scamRainDodge") return wireTextDodge(round);
    if (t === "packetPaddle") return wirePacketPaddle(round);
    if (t === "phoneTapSequence") return wirePhoneTapSequence(round);
    if (t === "browserPatchRun") return wireBrowserPatchRun(round);
    if (t === "browserRedirectMaze") return wireLinkBridge(round);
    if (t === "romanceEvidenceChat") return wireRomanceEvidenceChat(round);
    if (t === "scamWhack") return wireScamWhack(round);
    if (t === "fakeAdClean") return wireFakeAdClean(round);
    if (t === "linkBridge") return wireLinkBridge(round);
    if (["safeChoice", "safeChoicePlus", "codeShield", "recoveryKeyPuzzle", "captchaTrap", "searchResultPick", "wifiHotspotChoice", "deepfakeCall"].includes(t)) return wireChoice();
    if (t === "dangerWebsite") return wireChoice();
    if (t === "siteInspector") return wireSiteInspector(round);
    if (t === "freeSiteExit" || t === "privacyExit") return wireExitSite();
    if (t === "domainDuel" || t === "passwordManagerFill" || t === "passwordFill") return wireDomainPick();
    if (t === "vpnTunnelSwitch") return wireVpnTunnel();
    if (t === "qrLensFocus") return wireQrLensFocus();
    if (t === "qrScan") return wireQRScan(round);
    if (t === "romanceSwipe" || t === "swipeJudge") return wireSwipe(round, "romance");
    if (t === "marketplaceMatch") return wireSwipe(round, "marketplace");
    if (t === "attachmentFlash") return wireAttachmentFlash(round);
    if (t === "attachmentMemory") return wireAttachmentMemory(round);
    if (t === "fileDelete") return wireFileDelete(round);
    if (t === "fileExplorerDelete") return wireFileExplorerDelete(round);
    if (t === "downloadDelete") return wireDownloadDelete(round);
    if (t === "taskbarFileDelete") return wireTaskbarFileDelete(round);
    if (t === "dragTrash") return wireDragTrash(round);
    if (t === "giftCardShredder") return wireGiftCardShredder(round);
    if (t === "passwordVaultDrag") return wirePasswordVault(round);
    if (t === "gameChatReport" || t === "lobbyMute") return wireLobbyV13(round);
    if (t === "emailBlock") return wireEmailBlock();
    if (t === "smsBlock" || t === "smsReport" || t === "smsReportSpam") return wirePhoneMenu();
    if (t === "chatRefuse") return wireChatRefuse(round);
    if (t === "platformHints" || t === "hintPlatformer" || t === "starBridgeRun") return wirePlatformer(round);
    if (t === "fallingDodge" || t === "shieldBlock") return wireFallingDodge(round, t === "shieldBlock");
    if (t === "spotlightSpy") return wireSpotlightSpy(round);
    if (t === "spywareMaze") return wireSpywareMaze(round);
    if (t === "popupPurge") return wirePopupPurge(round);
    if (t === "closeWindowX") return wireCloseWindowX();
    if (t === "virusDownload") return wireVirusDownload(round);
    if (t === "tabStopDownload") return wireTabStopDownload(round);
    if (t === "rushStopDownload") return wireRushStopDownload(round);
    if (t === "spamBlockHunt") return wireSpamBlockHunt(round);
    if (t === "inboxShooter" || t === "downloadShooter") return wireShooter(round);
    if (["deepfakeSpot", "bankStatementHunt", "shoppingCartAudit", "extensionAudit", "permissionsToggle", "privacyCleaner", "clipboardCleaner", "evidenceTokenSelect"].includes(t)) return wireSelectAudit(round);
    if (t === "socialFirewall") return wireSocialFirewall(round);
    if (t === "permissionToggle") return wirePermissionToggle(round);
    if (t === "familyCallOrder" || t === "sequenceBuilder") return wireOrder(round);
    if (t === "firewallPatchGrid") return wireFirewallPatchGrid(round);
    if (t === "mfaApprovalGate" || t === "mfaShield") return wireMFA(round);
    if (t === "moneyCounter" || t === "moneyGuard" || t === "safeAmount") return wireMoney(round);
    if (t === "categoryMatch") return wireCategoryMatch(round);
    if (t === "sortBasket") return wireSortBasket(round);
    if (t === "callInterrupt") return wireCallInterrupt(round);
    if (t === "safeWordChallenge") return wireSafeWordChallenge(round);
    if (t === "legitOrScamCalibration") return wireLegitOrScam(round);
    if (t === "legacyBossRush") return wireLegacyBoss(round);
    if (t === "bossRush") return wireBoss(round);
    return wireUniversalRound(round);
  }

  function showResults(lost) {
    clearLoops();
    const best = saveBestScore(state.score);
    const grade = lost ? "Training Needed" : state.score > 3600 ? "FraudFront Champion" : state.score > 2600 ? "FraudFront Defender" : state.score > 1900 ? "Scam Spotter" : "Safety Rookie";
    const recapLessons = state.lessons.slice(0, 6);
    const shareText = `I got ${state.score} points and defeated The Fraudster in Scam Sprint. Can you defeat The Fraudster? #FraudFront #ScamSprint`;
    const playbook = [
      ["Stop the pressure", "Do not click, pay, download, approve MFA, or share codes while someone is rushing you."],
      ["Verify independently", "Use a saved number, official app, typed website, known school/work portal, or trusted relative."],
      ["Protect credentials", "Never share passwords, one-time codes, SSN/Medicare details, bank login, or remote access."],
      ["Report and block", "Report scam accounts, texts, emails, game-chat users, and fake profiles instead of engaging."],
      ["Save evidence", "Keep screenshots, sender info, URLs, payment details, and times if money or sensitive data was involved."]
    ];
    render(`
      <section class="screen results-screen">
        ${topbar()}
        <div class="panel results-panel">
          <span class="eyebrow">Run recap</span>
          <h1>${lost ? "The Fraudster broke through." : "You defeated The Fraudster!"}</h1>
          <p>${esc(grade)} · The recap below turns the game into real-life steps for handling scams after you play.</p>
          <div class="result-grid">
            <div><strong>${state.score}</strong><span>score</span></div>
            <div><strong>${state.correct}</strong><span>rounds cleared</span></div>
            <div><strong>${state.bestStreak}</strong><span>best combo</span></div>
            <div><strong>${best}</strong><span>best score</span></div>
          </div>
          ${lost ? "" : `<section class="recap-section share-card"><h2>Share your win</h2><p>Copy this message after defeating The Fraudster:</p><textarea id="shareText" class="share-text" readonly>${esc(shareText)}</textarea><div class="button-row"><button class="btn btn-primary" id="copyShareBtn">Copy Share Text</button></div></section>`}
          <section class="recap-section">
            <h2>What to do when a scam appears</h2>
            <div class="recap-grid">
              ${playbook.map((item, i) => `<article class="recap-card"><span>${i + 1}</span><strong>${esc(item[0])}</strong><p>${esc(item[1])}</p></article>`).join("")}
            </div>
          </section>
          <section class="recap-section">
            <h2>Lessons from this run</h2>
            <div class="lesson-list">
              ${(recapLessons.length ? recapLessons : ["Pause, verify independently, report/block suspicious accounts, and avoid pressure-driven decisions."]).map((lesson) => `<div class="lesson-row">✅ ${esc(lesson)}</div>`).join("")}
            </div>
          </section>
          <section class="recap-section action-plan">
            <h2>Real-world emergency plan</h2>
            <p><strong>If money or sensitive info was shared:</strong> contact the bank/payment app immediately, change passwords, enable MFA, document evidence, and report the account/message. If a device was controlled remotely, disconnect internet and get trusted technical help before logging into accounts.</p>
          </section>
          <div class="button-row"><button class="btn btn-primary" id="againBtn">Play Again</button><button class="btn" id="libraryAgainBtn">Open Library</button><button class="btn" id="homeAgainBtn">Home</button></div>
        </div>
      </section>
    `);
    wireTopbar();
    on($("#againBtn"), "click", startGame);
    on($("#libraryAgainBtn"), "click", showLibrary);
    on($("#homeAgainBtn"), "click", showHome);
    on($("#copyShareBtn"), "click", async () => {
      const box = $("#shareText");
      const value = box ? box.value : shareText;
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        if (box) { box.focus(); box.select(); document.execCommand("copy"); }
      }
      toast("Share text copied.");
    });
  }



  /* ============================================================
     18B) V16 Full-Game Additive Upgrade
     Purpose: preserve all existing rounds and mechanics while adding:
     - responsive mobile/touch/orientation runtime support
     - aligned HUD percentages and meters
     - private local player profiles and saved run progress
     - local leaderboard plus optional worldwide Supabase leaderboard
     - five-random-game Demo Mode
     - ready gates for action games so timers/hazards never start early
     - tap alternatives for drag-only minigames
     ============================================================ */

  DATA.site.version = "16.5";

  const V16_STORAGE = {
    profiles: "ffV16Profiles",
    activeProfile: "ffV16ActiveProfile",
    history: "ffV16ScoreHistory"
  };

  const V16_ACTION_TYPES = new Set([
    "shieldCursor", "messageShieldRun", "textDodge", "scamRainDodge", "packetPaddle",
    "phoneTapSequence", "browserPatchRun", "browserRedirectMaze", "romanceEvidenceChat",
    "scamWhack", "fakeAdClean", "linkBridge", "platformHints", "hintPlatformer",
    "starBridgeRun", "fallingDodge", "shieldBlock", "spotlightSpy", "spywareMaze",
    "popupPurge", "closeWindowX", "virusDownload", "tabStopDownload",
    "rushStopDownload", "spamBlockHunt", "inboxShooter", "downloadShooter",
    "dragTrash", "giftCardShredder", "passwordVaultDrag", "taskbarFileDelete"
  ]);

  const V16_MOBILE_EXTRA_TIME_TYPES = new Set([
    ...V16_ACTION_TYPES,
    "siteInspector", "attachmentFlash", "attachmentMemory", "fileDelete",
    "fileExplorerDelete", "downloadDelete", "gameChatReport", "lobbyMute",
    "permissionToggle", "permissionsToggle", "familyCallOrder", "sequenceBuilder"
  ]);

  function v16NowIso() {
    return new Date().toISOString();
  }

  function v16Uuid() {
    if (crypto?.randomUUID) return crypto.randomUUID();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      const value = Math.random() * 16 | 0;
      const result = char === "x" ? value : (value & 0x3 | 0x8);
      return result.toString(16);
    });
  }

  function v16ReadJson(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "");
      return value ?? fallback;
    } catch {
      return fallback;
    }
  }

  function v16WriteJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      toast("Browser storage is unavailable. Progress could not be saved.");
      return false;
    }
  }

  function v16SanitizeUsername(value) {
    return String(value || "")
      .replace(/[^\p{L}\p{N} _-]/gu, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 18);
  }

  function v16GetProfiles() {
    const profiles = v16ReadJson(V16_STORAGE.profiles, []);
    return Array.isArray(profiles) ? profiles : [];
  }

  function v16SaveProfiles(profiles) {
    return v16WriteJson(V16_STORAGE.profiles, profiles);
  }

  function v16CreateDefaultProfile() {
    const oldBest = Number(localStorage.ffV10Best || 0);
    const profile = {
      id: v16Uuid(),
      username: "Player 1",
      globalShare: false,
      bestScore: oldBest,
      totalScore: oldBest,
      runs: oldBest > 0 ? 1 : 0,
      wins: 0,
      demoRuns: 0,
      lastScore: oldBest,
      lastPlayedAt: null,
      progress: null,
      createdAt: v16NowIso()
    };
    v16SaveProfiles([profile]);
    localStorage.setItem(V16_STORAGE.activeProfile, profile.id);
    return profile;
  }

  function v16EnsureProfile() {
    const profiles = v16GetProfiles();
    if (!profiles.length) return v16CreateDefaultProfile();
    const activeId = localStorage.getItem(V16_STORAGE.activeProfile);
    const active = profiles.find((profile) => profile.id === activeId) || profiles[0];
    if (active.id !== activeId) localStorage.setItem(V16_STORAGE.activeProfile, active.id);
    return active;
  }

  function v16GetActiveProfile() {
    return v16EnsureProfile();
  }

  function v16UpdateProfile(profileId, updates) {
    const profiles = v16GetProfiles();
    const index = profiles.findIndex((profile) => profile.id === profileId);
    if (index < 0) return null;
    profiles[index] = { ...profiles[index], ...updates };
    v16SaveProfiles(profiles);
    return profiles[index];
  }

  function v16SetActiveProfile(profileId) {
    const profile = v16GetProfiles().find((item) => item.id === profileId);
    if (!profile) return false;
    localStorage.setItem(V16_STORAGE.activeProfile, profileId);
    return true;
  }

  function v16CreateProfile(username) {
    const clean = v16SanitizeUsername(username);
    if (clean.length < 2) return { ok: false, error: "Use a nickname with at least 2 characters." };
    const profiles = v16GetProfiles();
    if (profiles.some((profile) => profile.username.toLowerCase() === clean.toLowerCase())) {
      return { ok: false, error: "That nickname already exists on this device." };
    }
    const profile = {
      id: v16Uuid(),
      username: clean,
      globalShare: false,
      bestScore: 0,
      totalScore: 0,
      runs: 0,
      wins: 0,
      demoRuns: 0,
      lastScore: 0,
      lastPlayedAt: null,
      progress: null,
      createdAt: v16NowIso()
    };
    profiles.push(profile);
    v16SaveProfiles(profiles);
    v16SetActiveProfile(profile.id);
    return { ok: true, profile };
  }

  function v16DeleteProfile(profileId) {
    const profiles = v16GetProfiles();
    if (profiles.length <= 1) return false;
    const next = profiles.filter((profile) => profile.id !== profileId);
    if (next.length === profiles.length) return false;
    v16SaveProfiles(next);
    if (localStorage.getItem(V16_STORAGE.activeProfile) === profileId) {
      localStorage.setItem(V16_STORAGE.activeProfile, next[0].id);
    }
    return true;
  }

  function v16GetLocalLeaderboard() {
    return v16GetProfiles()
      .map((profile) => ({
        username: profile.username,
        score: Number(profile.bestScore || 0),
        wins: Number(profile.wins || 0),
        runs: Number(profile.runs || 0),
        lastPlayedAt: profile.lastPlayedAt
      }))
      .sort((a, b) => b.score - a.score || b.wins - a.wins || a.username.localeCompare(b.username));
  }

  function v16RecordResult(lost) {
    if (state.resultRecorded) return v16GetActiveProfile();
    state.resultRecorded = true;
    const profile = v16GetActiveProfile();
    const isDemo = state.runMode === "demo";
    const isPractice = state.runMode === "practice" || state.practiceMode;
    if (isPractice) return profile;

    const updated = v16UpdateProfile(profile.id, {
      bestScore: isDemo
        ? Number(profile.bestScore || 0)
        : Math.max(Number(profile.bestScore || 0), Number(state.score || 0)),
      demoBestScore: isDemo
        ? Math.max(Number(profile.demoBestScore || 0), Number(state.score || 0))
        : Number(profile.demoBestScore || 0),
      totalScore: Number(profile.totalScore || 0) + Number(state.score || 0),
      runs: Number(profile.runs || 0) + (isDemo ? 0 : 1),
      demoRuns: Number(profile.demoRuns || 0) + (isDemo ? 1 : 0),
      wins: Number(profile.wins || 0) + (!lost && !isDemo ? 1 : 0),
      lastScore: Number(state.score || 0),
      lastPlayedAt: v16NowIso(),
      progress: null
    });

    localStorage.ffV10Best = String(Math.max(Number(localStorage.ffV10Best || 0), Number(state.score || 0)));

    const history = v16ReadJson(V16_STORAGE.history, []);
    history.unshift({
      id: v16Uuid(),
      profileId: profile.id,
      username: profile.username,
      score: Number(state.score || 0),
      correct: Number(state.correct || 0),
      bestStreak: Number(state.bestStreak || 0),
      lost: Boolean(lost),
      mode: state.runMode || "full",
      playedAt: v16NowIso()
    });
    v16WriteJson(V16_STORAGE.history, history.slice(0, 100));

    if (!lost && !isDemo && updated?.globalShare) {
      v16SubmitGlobalScore(updated).catch(() => { /* status is shown in leaderboard */ });
    }
    return updated || profile;
  }

  function v16SaveProgressSnapshot() {
    const profile = v16GetActiveProfile();
    if (!profile || state.practiceMode || state.runMode === "practice" || !state.selected?.length || state.resultRecorded) return;
    const selectedIds = state.selected.map((round) => round?.id).filter(Boolean);
    if (!selectedIds.length) return;
    v16UpdateProfile(profile.id, {
      progress: {
        version: DATA.site.version,
        runMode: state.runMode || "full",
        selectedIds,
        idx: clamp(Number(state.idx || 0), 0, selectedIds.length - 1),
        score: Number(state.score || 0),
        correct: Number(state.correct || 0),
        mistakes: Number(state.mistakes || 0),
        streak: Number(state.streak || 0),
        bestStreak: Number(state.bestStreak || 0),
        trust: Number(state.trust ?? 100),
        fraudster: Number(state.fraudster ?? 28),
        powerups: { ...state.powerups },
        lessons: [...(state.lessons || [])],
        playerMode: state.playerMode,
        deviceMode: state.deviceMode,
        difficulty: state.difficulty,
        savedAt: v16NowIso()
      }
    });
  }

  function v16ClearProgress() {
    const profile = v16GetActiveProfile();
    if (profile?.progress) v16UpdateProfile(profile.id, { progress: null });
  }

  function v16ResumeProgress() {
    const profile = v16GetActiveProfile();
    const progress = profile?.progress;
    if (!progress || !Array.isArray(progress.selectedIds)) return showHome();

    const selected = progress.selectedIds
      .map((id) => ROUNDS.find((round) => round.id === id))
      .filter(Boolean);

    if (!selected.length || selected.length !== progress.selectedIds.length) {
      v16ClearProgress();
      toast("The saved run could not be restored after the game update.");
      return showHome();
    }

    clearLoops();
    ensureAudio();
    Object.assign(state, {
      selected,
      idx: clamp(Number(progress.idx || 0), 0, selected.length - 1),
      score: Number(progress.score || 0),
      correct: Number(progress.correct || 0),
      mistakes: Number(progress.mistakes || 0),
      streak: Number(progress.streak || 0),
      bestStreak: Number(progress.bestStreak || 0),
      trust: clamp(Number(progress.trust ?? 100), 0, 100),
      fraudster: clamp(Number(progress.fraudster ?? 28), 0, 100),
      powerups: { iris: 3, freeze: 1, shield: 1, ...(progress.powerups || {}) },
      boss: null,
      lessons: Array.isArray(progress.lessons) ? progress.lessons : [],
      practiceMode: false,
      runMode: progress.runMode || "full",
      resultRecorded: false,
      playerMode: progress.playerMode || state.playerMode,
      deviceMode: progress.deviceMode || state.deviceMode,
      difficulty: progress.difficulty || state.difficulty
    });
    renderRound();
    toast(`Resumed ${profile.username}'s saved ${state.runMode === "demo" ? "demo" : "arcade"} run.`);
  }

  function v16GetGlobalConfig() {
    const config = window.FF_LEADERBOARD_CONFIG || {};
    return {
      supabaseUrl: String(config.supabaseUrl || "").replace(/\/+$/, ""),
      anonKey: String(config.anonKey || ""),
      submitRpc: String(config.submitRpc || "submit_score"),
      readRpc: String(config.readRpc || "get_leaderboard")
    };
  }

  function v16GlobalConfigured() {
    const config = v16GetGlobalConfig();
    return Boolean(config.supabaseUrl && config.anonKey);
  }

  async function v16Rpc(rpcName, payload) {
    const config = v16GetGlobalConfig();
    if (!v16GlobalConfigured()) throw new Error("Worldwide leaderboard is not configured.");
    const response = await fetch(`${config.supabaseUrl}/rest/v1/rpc/${encodeURIComponent(rpcName)}`, {
      method: "POST",
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${config.anonKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload || {})
    });
    if (!response.ok) {
      const detail = await response.text();
      throw new Error(detail || `Leaderboard request failed (${response.status}).`);
    }
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  async function v16FetchGlobalLeaderboard(limit = 25) {
    const config = v16GetGlobalConfig();
    const rows = await v16Rpc(config.readRpc, { p_limit: clamp(Number(limit || 25), 1, 100) });
    return Array.isArray(rows) ? rows : [];
  }

  async function v16SubmitGlobalScore(profile) {
    if (!profile?.globalShare || !v16GlobalConfigured() || state.runMode !== "full") return false;
    const config = v16GetGlobalConfig();
    await v16Rpc(config.submitRpc, {
      p_player_id: profile.id,
      p_username: profile.username,
      p_score: clamp(Number(state.score || 0), 0, 20000),
      p_best_streak: clamp(Number(state.bestStreak || 0), 0, 100),
      p_won: true
    });
    return true;
  }

  function v16LeaderboardRows(rows, emptyText) {
    if (!rows.length) return `<div class="leaderboard-empty">${esc(emptyText)}</div>`;
    return `
      <div class="leaderboard-table" role="table" aria-label="Leaderboard">
        <div class="leaderboard-row leaderboard-head" role="row">
          <span>Rank</span><span>Player</span><span>Score</span><span>Wins</span>
        </div>
        ${rows.map((row, index) => {
          const rank = Math.max(1, Number(row.rank_position || row.rank || (index + 1)));
          const rankLabel = rank <= 3 ? ["🥇", "🥈", "🥉"][rank - 1] : rank;
          return `
          <div class="leaderboard-row" role="row">
            <span class="rank-medal">${rankLabel}</span>
            <strong>${esc(row.username || "Player")}</strong>
            <span>${Number(row.score || 0).toLocaleString()}</span>
            <span>${Number(row.wins || 0).toLocaleString()}</span>
          </div>
        `;
        }).join("")}
      </div>
    `;
  }

  function v16HomeLeaderboardPreview() {
    const rows = v16GetLocalLeaderboard().slice(0, 3);
    return rows.length
      ? rows.map((row, index) => `<div class="mini-rank"><span>${index + 1}</span><strong>${esc(row.username)}</strong><b>${Number(row.score || 0).toLocaleString()}</b></div>`).join("")
      : `<p class="muted">Finish a run to create the first score.</p>`;
  }

  function v16UpdateViewport() {
    const height = window.visualViewport?.height || window.innerHeight;
    document.documentElement.style.setProperty("--ff-app-height", `${Math.round(height)}px`);
    document.body.classList.toggle("is-landscape", window.innerWidth > window.innerHeight);
    document.body.classList.toggle("is-mobile-layout", window.innerWidth <= 760 || matchMedia("(pointer: coarse)").matches);
  }

  function v16InstallRuntimeOnce() {
    if (window.__ffV16RuntimeInstalled) return;
    window.__ffV16RuntimeInstalled = true;
    v16EnsureProfile();
    v16UpdateViewport();
    window.addEventListener("resize", v16UpdateViewport, { passive: true });
    window.addEventListener("orientationchange", () => setTimeout(v16UpdateViewport, 120), { passive: true });
    window.visualViewport?.addEventListener("resize", v16UpdateViewport, { passive: true });
    window.addEventListener("beforeunload", v16SaveProgressSnapshot);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") v16SaveProgressSnapshot();
    });
  }

  function v16NewRunState(mode) {
    Object.assign(state, {
      selected: [],
      idx: 0,
      current: null,
      score: 0,
      correct: 0,
      mistakes: 0,
      streak: 0,
      bestStreak: 0,
      trust: 100,
      fraudster: 28,
      powerups: { iris: 3, freeze: 1, shield: 1 },
      boss: null,
      lessons: [],
      practiceMode: mode === "practice",
      runMode: mode,
      resultRecorded: false,
      roundStarted: false
    });
  }

  function v16DifficultyFilter(rounds) {
    const preferred = rounds.filter((round) => {
      if (state.difficulty === "easy") return round.difficulty !== "hard";
      if (state.difficulty === "hard") return round.difficulty !== "easy" || Math.random() < 0.30;
      return true;
    });
    return preferred.length ? preferred : rounds;
  }

  function meterRow(label, value, className, id = "") {
    const safeValue = clamp(Number(value || 0), 0, 100);
    return `
      <div class="bar-row" data-meter-row="${esc(id || label)}">
        <label>${esc(label)}</label>
        <div class="meter ${className}" role="progressbar" aria-label="${esc(label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(safeValue)}">
          <span ${id ? `id="${id}"` : ""} style="width:${safeValue}%"></span>
        </div>
        <span class="bar-value" data-meter-value="${esc(id || label)}">${Math.round(safeValue)}%</span>
      </div>
    `;
  }

  function hud() {
    const progress = clamp(Math.round((state.idx / Math.max(1, state.selected.length)) * 100), 0, 100);
    return `
      <div class="hud">
        <div class="hud-bars">
          ${meterRow("Round Progress", progress, "meter-progress", "progressBar")}
          ${state.playerMode === "senior" ? "" : meterRow("Timer", state.timeLeft, "meter-time", "timeBar")}
          ${meterRow("Trust Shield", state.trust, "meter-good", "trustBar")}
          ${meterRow("Fraudster Pressure", state.fraudster, "meter-danger", "fraudBar")}
        </div>
        <div class="hud-stats">
          <div class="stat-pill">Score <strong>${state.score}</strong></div>
          <div class="stat-pill">Combo <strong>${state.streak}</strong></div>
          <div class="stat-pill">Mistakes <strong>${state.mistakes}</strong></div>
        </div>
      </div>
    `;
  }

  function v16SetMeter(id, value) {
    const safeValue = clamp(Number(value || 0), 0, 100);
    const bar = $(`#${id}`);
    if (bar) {
      bar.style.width = `${safeValue}%`;
      const meter = bar.closest(".meter");
      if (meter) meter.setAttribute("aria-valuenow", String(Math.round(safeValue)));
    }
    const valueNode = $(`[data-meter-value="${id}"]`);
    if (valueNode) valueNode.textContent = `${Math.round(safeValue)}%`;
  }

  function updateBars() {
    v16SetMeter("trustBar", state.trust);
    v16SetMeter("fraudBar", state.fraudster);
    v16SetMeter("timeBar", state.timeLeft);
    const progress = clamp(Math.round((state.idx / Math.max(1, state.selected.length)) * 100), 0, 100);
    v16SetMeter("progressBar", progress);
    const statValues = $$(".hud-stats .stat-pill strong");
    if (statValues[0]) statValues[0].textContent = String(state.score);
    if (statValues[1]) statValues[1].textContent = String(state.streak);
    if (statValues[2]) statValues[2].textContent = String(state.mistakes);
  }

  function secondsFor(round) {
    if (state.playerMode === "senior") return 999;
    let seconds = Number(round.seconds || 12);
    if (state.difficulty === "easy") seconds *= 1.18;
    if (state.difficulty === "hard") seconds *= 0.90;
    if (round.type === "bossRush") seconds = Math.max(seconds, 70);
    const isTouch = state.deviceMode === "touch" || state.deviceMode === "motion" ||
      (state.deviceMode === "auto" && matchMedia("(pointer: coarse)").matches);
    if (isTouch && V16_MOBILE_EXTRA_TIME_TYPES.has(round.type)) seconds += 4;
    return Math.max(8, Math.round(seconds));
  }

  function startTimer(round) {
    if (state.playerMode === "senior") return;
    const total = secondsFor(round);
    const start = performance.now();
    state.timer = setInterval(() => {
      if (state.answered || !state.roundStarted) return;
      const elapsed = (performance.now() - start) / 1000;
      state.timeLeft = clamp(100 - (elapsed / total) * 100, 0, 100);
      v16SetMeter("timeBar", state.timeLeft);
      if (state.timeLeft <= 0) failRound("Time ran out.");
    }, 100);
  }

  function showHome() {
    clearLoops();
    v16InstallRuntimeOnce();
    document.body.classList.remove("game-active");
    const profile = v16GetActiveProfile();
    const progress = profile.progress;
    const globalStatus = v16GlobalConfigured() ? "Worldwide board connected" : "Worldwide board ready to connect";
    render(`
      <section class="screen">
        ${topbar()}
        <div class="panel home-grid">
          <div>
            <div class="home-profile-line">
              <span class="eyebrow">FraudFront awareness arcade</span>
              <button class="profile-chip" id="profileBtn" title="Manage player profiles">👤 ${esc(profile.username)}</button>
            </div>
            <h1><span class="home-title-accent">Scam Sprint</span><br>Microgames against The Fraudster.</h1>
            <p>A fast scam-safety arcade with sound effects, mock websites, marketplace choices, romance scam swipes, game chat reporting, file cleanup, QR checks, MFA prompts, permission toggles, movement challenges, and a randomized boss fight.</p>
            <p>All ${DATA.site.totalPlayableRounds} games remain intact. Mobile play now includes touch controls, rotation-ready layouts, aligned HUD meters, saved profiles, progress recovery, and action-game ready screens.</p>
            <div class="button-row home-actions">
              <button class="btn btn-primary" id="startBtn">Start Arcade Run</button>
              <button class="btn btn-demo" id="demoBtn">Play 5-Game Demo</button>
              ${progress ? `<button class="btn btn-good" id="resumeBtn">Continue Saved ${progress.runMode === "demo" ? "Demo" : "Run"}</button>` : ""}
              <button class="btn btn-secondary" id="leaderboardBtn">🏆 Leaderboard</button>
              <button class="btn btn-secondary" id="howBtn">How to Play</button>
              <button class="btn btn-secondary" id="libraryBtn">View Full Library</button>
            </div>
            <section class="demo-explainer">
              <div>
                <strong>Demo Mode</strong>
                <p>Five random games—one action, browser, social, file, and logic challenge. No boss fight. It teaches the controls and saves demo progress separately.</p>
              </div>
              <button class="btn btn-secondary btn-small" id="demoHowBtn">How Demo Works</button>
            </section>
            <div class="stats-strip">
              <div><strong>${DATA.site.totalPlayableRounds}</strong><span>playable rounds</span></div>
              <div><strong>${DATA.site.totalMechanics}</strong><span>mechanics</span></div>
              <div><strong>${DATA.site.arcadeRoundsBeforeBoss}</strong><span>random + boss</span></div>
              <div><strong>${Number(profile.bestScore || 0).toLocaleString()}</strong><span>${esc(profile.username)} best</span></div>
            </div>
          </div>
          <div class="home-side-stack">
            <div class="fraudster-stage" aria-hidden="true">
              <div class="fraudster-face"><span class="eye"></span><span class="eye-right"></span><span class="mouth"></span></div>
              <div class="hero-card-label"><span class="chip chip-hot">Fraudster pressure rising</span><div class="meter meter-danger"><span style="width:72%"></span></div></div>
            </div>
            <section class="home-leaderboard-card">
              <div class="leaderboard-card-head"><strong>🏆 Top Players</strong><span>${esc(globalStatus)}</span></div>
              <div class="mini-ranks">${v16HomeLeaderboardPreview()}</div>
              <button class="btn btn-secondary" id="leaderboardSideBtn">Open Full Leaderboard</button>
            </section>
          </div>
        </div>
      </section>
    `);
    wireTopbar();
    on($("#startBtn"), "click", showSetup);
    on($("#demoBtn"), "click", showDemoMode);
    on($("#demoHowBtn"), "click", showDemoMode);
    on($("#resumeBtn"), "click", v16ResumeProgress);
    on($("#profileBtn"), "click", showProfileManager);
    on($("#leaderboardBtn"), "click", showLeaderboard);
    on($("#leaderboardSideBtn"), "click", showLeaderboard);
    on($("#howBtn"), "click", showHow);
    on($("#libraryBtn"), "click", showLibrary);
  }

  function showDemoMode() {
    render(`
      <section class="screen">
        ${topbar()}
        <div class="panel demo-mode-panel">
          <span class="eyebrow">Five-game guided sampler</span>
          <h2>Demo Mode teaches the game without changing the full arcade.</h2>
          <div class="demo-steps">
            <article><span>1</span><strong>Five random games</strong><p>One game is selected from five different families so the demo feels varied every time.</p></article>
            <article><span>2</span><strong>Ready screens</strong><p>Moving hazards and timers wait until you press Start Game—especially helpful on phones.</p></article>
            <article><span>3</span><strong>No final boss</strong><p>The demo ends with a score recap and a button to begin the complete 34-round-plus-boss arcade.</p></article>
            <article><span>4</span><strong>Progress saved</strong><p>Closing the tab or rotating the phone will not erase the current demo checkpoint.</p></article>
          </div>
          <h3>Demo difficulty</h3>
          <div class="segment-row">${radio("difficulty", "easy", "Easy")}${radio("difficulty", "medium", "Medium")}${radio("difficulty", "hard", "Hard")}</div>
          <h3>Controls</h3>
          <div class="segment-row">${radio("deviceMode", "auto", "Auto")}${radio("deviceMode", "desktop", "Computer")}${radio("deviceMode", "touch", "Mobile / Touch")}${radio("deviceMode", "motion", "Motion Tilt")}</div><div class="motion-control-help"><span>📐 Motion Tilt may ask for phone permission. Touch controls always remain available.</span><div class="motion-control-actions"><button class="btn btn-primary btn-small" id="motionEnableBtn" type="button">Enable Motion Tilt</button><button class="btn btn-secondary btn-small" id="motionCalibrateBtn" type="button">Calibrate Tilt</button></div></div>
          <div class="button-row"><button class="btn" id="backBtn">Back</button><button class="btn btn-demo" id="beginDemoBtn">Start 5-Game Demo</button></div>
        </div>
      </section>
    `);
    wireTopbar();
    $$('input[type="radio"]').forEach((input) => on(input, "change", async () => {
      if (input.name === "deviceMode" && input.value === "motion") {
        const enabled = await v16EnableMotionControls();
        if (!enabled) {
          const touch = $('input[name="deviceMode"][value="touch"]');
          if (touch) touch.checked = true;
        }
      } else {
        state[input.name] = input.value;
      }
    }));
    on($("#motionEnableBtn"), "click", async () => {
      const enabled = await v16EnableMotionControls();
      if (enabled) {
        const motion = $('input[name="deviceMode"][value="motion"]');
        if (motion) motion.checked = true;
      }
    });
    on($("#motionCalibrateBtn"), "click", v16CalibrateTilt);
    on($("#backBtn"), "click", showHome);
    on($("#motionEnableBtn"), "click", async () => {
      const enabled = await v16EnableMotionControls();
      if (enabled) {
        const motion = $('input[name="deviceMode"][value="motion"]');
        if (motion) motion.checked = true;
      }
    });
    on($("#motionCalibrateBtn"), "click", v16CalibrateTilt);
    on($("#beginDemoBtn"), "click", startDemo);
  }

  function showProfileManager() {
    const profiles = v16GetProfiles();
    const active = v16GetActiveProfile();
    render(`
      <section class="screen">
        ${topbar()}
        <div class="panel profile-panel">
          <span class="eyebrow">Private player profiles</span>
          <h2>Save separate progress and scores on this device.</h2>
          <p>Nicknames are stored in this browser only. A nickname is sent to the worldwide leaderboard only when that profile explicitly enables global score sharing. Use an alias—not a legal name.</p>
          <form class="profile-create" id="profileCreateForm">
            <label for="newProfileName">Create another player</label>
            <div class="profile-create-row">
              <input id="newProfileName" maxlength="18" autocomplete="off" placeholder="Nickname or gamer tag" />
              <button class="btn btn-primary" type="submit">Create Profile</button>
            </div>
            <p class="form-error" id="profileError" role="alert"></p>
          </form>
          <div class="profile-list">
            ${profiles.map((profile) => `
              <article class="profile-card ${profile.id === active.id ? "active" : ""}">
                <div class="profile-avatar">${esc(profile.username.slice(0, 1).toUpperCase())}</div>
                <div class="profile-copy">
                  <strong>${esc(profile.username)} ${profile.id === active.id ? `<span class="active-badge">Active</span>` : ""}</strong>
                  <span>Best ${Number(profile.bestScore || 0).toLocaleString()} · ${Number(profile.wins || 0)} wins · ${Number(profile.demoRuns || 0)} demos</span>
                  <label class="privacy-toggle">
                    <input type="checkbox" data-global-share="${profile.id}" ${profile.globalShare ? "checked" : ""} ${v16GlobalConfigured() ? "" : "disabled"}>
                    <span>Share this alias and completed full-run high scores worldwide</span>
                  </label>
                </div>
                <div class="profile-actions">
                  ${profile.id === active.id ? "" : `<button class="btn btn-secondary btn-small" data-use-profile="${profile.id}">Use</button>`}
                  <button class="btn btn-secondary btn-small" data-rename-profile="${profile.id}">Rename</button>
                  ${profiles.length > 1 ? `<button class="btn btn-danger btn-small" data-delete-profile="${profile.id}">Delete</button>` : ""}
                </div>
              </article>
            `).join("")}
          </div>
          <div class="privacy-note">
            <strong>${v16GlobalConfigured() ? "🌎 Worldwide leaderboard is connected." : "🔒 Worldwide leaderboard is not connected yet."}</strong>
            <p>${v16GlobalConfigured() ? "Only the enabled alias, score, streak, and win count are submitted." : "Local profiles, progress, and the on-device leaderboard already work. Add the free Supabase URL and anonymous key in FFindex.html to activate worldwide scores."}</p>
          </div>
          <div class="button-row"><button class="btn" id="backBtn">Back Home</button><button class="btn btn-primary" id="leaderboardBtn">Open Leaderboard</button></div>
        </div>
      </section>
    `);
    wireTopbar();
    on($("#motionEnableBtn"), "click", async () => {
      const enabled = await v16EnableMotionControls();
      if (enabled) {
        const motion = $('input[name="deviceMode"][value="motion"]');
        if (motion) motion.checked = true;
      }
    });
    on($("#motionCalibrateBtn"), "click", v16CalibrateTilt);
    on($("#backBtn"), "click", showHome);
    on($("#leaderboardBtn"), "click", showLeaderboard);
    on($("#profileCreateForm"), "submit", (event) => {
      event.preventDefault();
      const result = v16CreateProfile($("#newProfileName")?.value);
      if (!result.ok) {
        $("#profileError").textContent = result.error;
        return;
      }
      showProfileManager();
      toast(`Profile ${result.profile.username} created.`);
    });
    $$("[data-use-profile]").forEach((button) => on(button, "click", () => {
      v16SetActiveProfile(button.dataset.useProfile);
      showProfileManager();
      toast("Active player changed.");
    }));
    $$("[data-global-share]").forEach((input) => on(input, "change", () => {
      v16UpdateProfile(input.dataset.globalShare, { globalShare: input.checked });
      toast(input.checked ? "Worldwide score sharing enabled for this alias." : "Worldwide score sharing disabled.");
    }));
    $$("[data-rename-profile]").forEach((button) => on(button, "click", () => {
      const profile = v16GetProfiles().find((item) => item.id === button.dataset.renameProfile);
      if (!profile) return;
      const proposed = window.prompt("Enter a new nickname (2–18 characters):", profile.username);
      if (proposed === null) return;
      const clean = v16SanitizeUsername(proposed);
      const duplicate = v16GetProfiles().some((item) => item.id !== profile.id && item.username.toLowerCase() === clean.toLowerCase());
      if (clean.length < 2 || duplicate) return toast(duplicate ? "That nickname is already used." : "Nickname must have at least 2 characters.");
      v16UpdateProfile(profile.id, { username: clean });
      showProfileManager();
      toast("Nickname updated.");
    }));
    $$("[data-delete-profile]").forEach((button) => on(button, "click", () => {
      const profile = v16GetProfiles().find((item) => item.id === button.dataset.deleteProfile);
      if (!profile) return;
      if (!window.confirm(`Delete ${profile.username}'s local profile and saved progress?`)) return;
      if (v16DeleteProfile(profile.id)) {
        showProfileManager();
        toast("Local profile deleted.");
      }
    }));
  }

  async function v16HydrateGlobalLeaderboard() {
    const host = $("#globalLeaderboardHost");
    if (!host) return;
    if (!v16GlobalConfigured()) {
      host.innerHTML = `
        <div class="leaderboard-empty">
          <strong>Worldwide scores are ready but not connected.</strong>
          <p>Local multiplayer profiles and scores work now. Paste the Supabase project URL and anonymous key into the configuration block in FFindex.html to activate worldwide rankings.</p>
        </div>`;
      return;
    }
    host.innerHTML = `<div class="leaderboard-loading">Loading worldwide scores…</div>`;
    try {
      const rows = await v16FetchGlobalLeaderboard(50);
      if (!$("#globalLeaderboardHost")) return;
      host.innerHTML = v16LeaderboardRows(rows.map((row) => ({
        rank_position: row.rank_position,
        username: row.username,
        score: row.score,
        wins: row.wins
      })), "No worldwide scores have been submitted yet.");
    } catch (error) {
      if (!$("#globalLeaderboardHost")) return;
      host.innerHTML = `<div class="leaderboard-empty"><strong>Worldwide board could not load.</strong><p>${esc(error.message || "Check the leaderboard configuration.")}</p></div>`;
    }
  }

  function showLeaderboard() {
    const localRows = v16GetLocalLeaderboard();
    const active = v16GetActiveProfile();
    render(`
      <section class="screen">
        ${topbar()}
        <div class="panel leaderboard-panel">
          <div class="leaderboard-hero">
            <div>
              <span class="eyebrow">Player rankings</span>
              <h2>Local players and worldwide defenders.</h2>
              <p>${esc(active.username)} is the active player. Local rankings stay in this browser. Worldwide rankings contain only opted-in aliases and completed full-run scores.</p>
            </div>
            <div class="leaderboard-actions"><button class="btn" id="backBtn">Back Home</button><button class="btn btn-secondary" id="profilesBtn">Player Profiles</button></div>
          </div>
          <div class="leaderboard-columns">
            <section class="leaderboard-board">
              <div class="leaderboard-title"><strong>💾 This Device</strong><span>${localRows.length} player${localRows.length === 1 ? "" : "s"}</span></div>
              ${v16LeaderboardRows(localRows, "Create a player profile and finish a run.")}
            </section>
            <section class="leaderboard-board">
              <div class="leaderboard-title"><strong>🌎 Worldwide</strong><span>${v16GlobalConfigured() ? "Connected" : "Setup required"}</span></div>
              <div id="globalLeaderboardHost"></div>
            </section>
          </div>
          <div class="privacy-note compact">
            <strong>Privacy design</strong>
            <p>No email, password, location, contacts, or legal name is required. Local profiles remain on the device. Global sharing is off by default and sends only the chosen alias and game statistics.</p>
          </div>
        </div>
      </section>
    `);
    wireTopbar();
    on($("#motionEnableBtn"), "click", async () => {
      const enabled = await v16EnableMotionControls();
      if (enabled) {
        const motion = $('input[name="deviceMode"][value="motion"]');
        if (motion) motion.checked = true;
      }
    });
    on($("#motionCalibrateBtn"), "click", v16CalibrateTilt);
    on($("#backBtn"), "click", showHome);
    on($("#profilesBtn"), "click", showProfileManager);
    v16HydrateGlobalLeaderboard();
  }

  function startGame() {
    if (!v16IsProfileUnlocked(v16GetActiveProfile().id)) return v16RequireUnlocked(startGame);
    clearLoops();
    ensureAudio();
    v16NewRunState("full");

    const boss = ROUNDS.find((round) => round.type === "bossRush");
    const pool = ROUNDS.filter((round) => round.type !== "bossRush" && round.type !== "legacyBossRush");
    const chosen = [];
    const used = new Set();
    const buckets = [
      ["action", ["virusDownload", "rushStopDownload", "tabStopDownload", "popupPurge", "closeWindowX", "hintPlatformer", "platformHints", "starBridgeRun", "fallingDodge", "shieldBlock", "spotlightSpy", "spywareMaze", "spamBlockHunt", "shieldCursor", "messageShieldRun", "textDodge", "scamRainDodge", "packetPaddle", "scamWhack", "fakeAdClean"], 10],
      ["files", ["attachmentFlash", "attachmentMemory", "fileDelete", "fileExplorerDelete", "downloadDelete", "taskbarFileDelete", "dragTrash", "giftCardShredder", "passwordVaultDrag"], 6],
      ["social", ["gameChatReport", "lobbyMute", "emailBlock", "smsBlock", "smsReport", "chatRefuse", "romanceSwipe", "marketplaceMatch", "swipeJudge", "socialFirewall", "romanceEvidenceChat", "phoneTapSequence"], 7],
      ["browser", ["dangerWebsite", "siteInspector", "freeSiteExit", "privacyExit", "passwordFill", "passwordManagerFill", "domainDuel", "qrScan", "qrLensFocus", "wifiHotspotChoice", "vpnTunnelSwitch", "browserPatchRun", "browserRedirectMaze", "linkBridge"], 6],
      ["logic", ["deepfakeSpot", "bankStatementHunt", "shoppingCartAudit", "extensionAudit", "permissionsToggle", "permissionToggle", "privacyCleaner", "clipboardCleaner", "evidenceTokenSelect", "familyCallOrder", "sequenceBuilder", "firewallPatchGrid", "mfaApprovalGate", "mfaShield", "moneyCounter", "moneyGuard", "safeAmount", "categoryMatch", "sortBasket", "legitOrScamCalibration", "safeWordChallenge", "callInterrupt"], 5]
    ];

    function addFromTypes(types, count) {
      const candidates = pool.filter((round) => types.includes(round.type) && !used.has(round.id));
      sample(v16DifficultyFilter(candidates), count).forEach((round) => {
        if (!used.has(round.id)) {
          chosen.push(round);
          used.add(round.id);
        }
      });
    }

    buckets.forEach(([, types, count]) => addFromTypes(types, count));
    const remaining = shuffle(pool.filter((round) => !used.has(round.id)));
    while (chosen.length < DATA.site.arcadeRoundsBeforeBoss && remaining.length) {
      const next = remaining.shift();
      chosen.push(next);
      used.add(next.id);
    }
    state.selected = shuffle(chosen).slice(0, DATA.site.arcadeRoundsBeforeBoss);
    if (boss) state.selected.push(boss);
    v16SaveProgressSnapshot();
    renderRound();
  }

  function startDemo() {
    if (!v16IsProfileUnlocked(v16GetActiveProfile().id)) return v16RequireUnlocked(startDemo);
    clearLoops();
    ensureAudio();
    v16NewRunState("demo");
    const pool = ROUNDS.filter((round) => !["bossRush", "legacyBossRush"].includes(round.type));
    const demoBuckets = [
      ["shieldCursor", "messageShieldRun", "textDodge", "scamRainDodge", "packetPaddle", "platformHints", "hintPlatformer", "starBridgeRun", "scamWhack", "fakeAdClean"],
      ["dangerWebsite", "siteInspector", "freeSiteExit", "privacyExit", "passwordFill", "domainDuel", "qrScan", "qrLensFocus", "browserPatchRun", "linkBridge"],
      ["gameChatReport", "lobbyMute", "emailBlock", "smsBlock", "smsReport", "chatRefuse", "romanceSwipe", "marketplaceMatch", "romanceEvidenceChat", "phoneTapSequence"],
      ["attachmentFlash", "attachmentMemory", "fileDelete", "fileExplorerDelete", "downloadDelete", "dragTrash", "giftCardShredder", "passwordVaultDrag"],
      ["safeChoice", "deepfakeCall", "deepfakeSpot", "bankStatementHunt", "permissionsToggle", "permissionToggle", "familyCallOrder", "mfaShield", "moneyGuard", "categoryMatch", "safeWordChallenge"]
    ];
    const chosen = [];
    const used = new Set();
    demoBuckets.forEach((types) => {
      const candidates = v16DifficultyFilter(pool.filter((round) => types.includes(round.type) && !used.has(round.id)));
      const round = sample(candidates, 1)[0];
      if (round) {
        chosen.push(round);
        used.add(round.id);
      }
    });
    while (chosen.length < 5) {
      const next = sample(v16DifficultyFilter(pool.filter((round) => !used.has(round.id))), 1)[0];
      if (!next) break;
      chosen.push(next);
      used.add(next.id);
    }
    state.selected = shuffle(chosen).slice(0, 5);
    v16SaveProgressSnapshot();
    renderRound();
  }

  function startPractice(index) {
    if (!v16IsProfileUnlocked(v16GetActiveProfile().id)) return v16RequireUnlocked(() => startPractice(index));
    clearLoops();
    ensureAudio();
    const round = ROUNDS[index];
    if (!round) return showLibrary();
    v16NewRunState("practice");
    state.selected = [round];
    state.practiceMode = true;
    renderRound();
  }

  function v16ControlGuide(round) {
    const type = String(round?.type || "");
    const movement = new Set(["platformHints", "hintPlatformer", "starBridgeRun", "fallingDodge", "textDodge", "scamRainDodge", "spywareMaze", "browserRedirectMaze", "linkBridge"]);
    const tapAction = new Set(["scamWhack", "fakeAdClean", "popupPurge", "closeWindowX", "phoneTapSequence", "spamBlockHunt", "inboxShooter", "downloadShooter", "shieldCursor", "messageShieldRun"]);
    const dragAction = new Set(["dragTrash", "giftCardShredder", "passwordVaultDrag", "taskbarFileDelete"]);
    if (movement.has(type)) return ["Move with arrows, WASD, phone tilt, or the on-screen controls.", "Use Jump/Space only when the game shows a jump action."];
    if (tapAction.has(type)) return ["Tap or click only the safe target shown by the command.", "Do not press browser-style decoy buttons inside scam content."];
    if (dragAction.has(type)) return ["Drag with a mouse, or tap the item and then tap its destination on a phone.", "The round waits for your deliberate choice and will not begin early."];
    if (type === "packetPaddle" || type === "shieldBlock") return ["Move the shield or paddle with arrows, touch buttons, or tilt.", "Keep the safe object protected until the target is complete."];
    return ["Use the large on-screen controls shown after Start Game.", "Keyboard, mouse, and touchscreen alternatives remain available."];
  }

  function v16ActionReadyCard(round) {
    const guides = v16ControlGuide(round);
    return `
      <div class="game-ready-overlay" id="gameReadyOverlay" role="dialog" aria-label="Game ready">
        <div class="game-ready-card">
          <span class="ready-pulse">READY</span>
          <strong>${esc(round.command || "Complete the challenge")}</strong>
          <p>${esc(round.directions || "Use the controls shown in the game.")}</p>
          <div class="ready-control-summary">
            <span>👆 Touch</span><span>⌨️ Keyboard</span><span>🖱️ Mouse</span>
          </div>
          <div class="ready-control-details"><span>${esc(guides[0])}</span><span>${esc(guides[1])}</span></div>
          <button class="btn btn-primary" id="readyStartBtn">Start Game</button>
          <small>Timers and moving hazards begin only after this button.</small>
        </div>
      </div>
    `;
  }

  function renderRound() {
    clearLoops();
    document.body.classList.add("game-active");
    state.answered = false;
    state.transitioning = false;
    state.roundStarted = false;
    state.timeLeft = 100;
    state.current = state.selected[state.idx];
    resetMicroState();
    const round = state.current;
    if (!round) return showResults(false);
    v16SaveProgressSnapshot();

    const needsReadyGate = V16_ACTION_TYPES.has(round.type);
    render(`
      <section class="screen">
        ${topbar()}
        ${hud()}
        <div class="panel round-panel">
          <div>
            <div class="round-header"><span class="chip chip-hot">${esc(round.category)}</span><span class="chip chip-cool">${esc(round.type)}</span><span class="chip chip-gold">${esc(round.difficulty)}</span><span class="chip">${state.runMode === "demo" ? `Demo ${state.idx + 1}/5` : state.runMode === "practice" ? "Practice" : `Round ${state.idx + 1}/${state.selected.length}`}</span></div>
            <h2>${esc(round.title)}</h2>
            <div class="command-banner"><span>${esc(round.command)}</span><small>${esc(round.directions || "Follow the command before time runs out.")}</small></div>
            <div id="microgame" class="microgame-zone ${needsReadyGate ? "has-ready-gate" : ""}">
              ${drawRound(round)}
              ${needsReadyGate ? v16ActionReadyCard(round) : ""}
            </div>
          </div>
          <div>${powerups()}<div id="feedbackHost"></div></div>
        </div>
      </section>
    `);

    wireTopbar();
    wirePowerups();

    const startCurrentRound = () => {
      if (state.roundStarted || state.answered) return;
      state.roundStarted = true;
      $("#gameReadyOverlay")?.remove();
      v15RefreshPowerups();
      wireRound(round);
      startTimer(round);
      toast("Game started.");
    };

    if (needsReadyGate) {
      $$("[data-power]").forEach((button) => { button.disabled = true; });
      on($("#readyStartBtn"), "click", startCurrentRound);
      on(document, "keydown", (event) => {
        if (!state.roundStarted && (event.key === "Enter" || event.code === "Space")) {
          event.preventDefault();
          startCurrentRound();
        }
      });
    } else {
      state.roundStarted = true;
      wireRound(round);
      startTimer(round);
    }

    requestAnimationFrame(v16UpdateViewport);
  }

  function showFeedback(success, headline, lesson, line) {
    if (lesson && !state.lessons.includes(lesson)) state.lessons.push(lesson);
    updateBars();
    const host = $("#feedbackHost");
    if (!host) return;
    const isPracticeDone = state.practiceMode || state.runMode === "practice";
    const lastRound = state.idx >= state.selected.length - 1 || state.trust <= 0;
    const buttonText = isPracticeDone
      ? "Return Home"
      : lastRound
        ? (state.runMode === "demo" ? "See Demo Results" : "See Recap")
        : (state.runMode === "demo" ? "Next Demo Game" : "Next Random Microgame");
    host.innerHTML = `
      <div class="feedback ${success ? "feedback-good" : "feedback-bad"}">
        <strong>${success ? "✅" : "⚠️"} ${esc(headline)}</strong>
        <p>${esc(lesson || "Pause, verify independently, and avoid pressure.")}</p>
        <p class="small">${esc(line)}</p>
        <div class="button-row" style="margin-top:0"><button class="btn ${success ? "btn-primary" : "btn-danger"}" id="nextRoundBtn">${buttonText}</button></div>
      </div>
    `;
    wireTopbar();
    on($("#nextRoundBtn"), "click", () => {
      if (state.transitioning) return;
      state.transitioning = true;
      $("#nextRoundBtn").disabled = true;
      nextRound();
    });
  }

  function nextRound() {
    if (state.practiceMode || state.runMode === "practice") return showHome();
    if (state.trust <= 0) return showResults(true);
    state.idx += 1;
    if (state.idx >= state.selected.length) return showResults(false);
    v16SaveProgressSnapshot();
    renderRound();
  }

  function drawGiftCardShredder(round) {
    return `<div class="gift-stage tap-drag-stage"><div class="scenario-box"><div class="message-header"><span class="avatar">🎁</span><span>Gift Card Code</span></div><p>${esc(round.scenario || round.directions)}</p><button class="draggable-chip" draggable="true" id="giftCode">CODE-8429-1137</button><p class="tap-drag-help">Drag on computer, or tap the code and then tap a destination on mobile.</p></div><button class="shredder-box tap-drop-target" id="shredderBox">🧾✂️<br>Shred Code</button><button class="send-box tap-drop-target" id="sendBox">📤<br>Send to Scammer</button></div>`;
  }

  function wireGiftCardShredder() {
    const code = $("#giftCode");
    let selected = false;
    function chooseCode() {
      selected = true;
      code?.classList.add("selected");
      toast("Code selected. Tap the shredder.");
    }
    on(code, "click", chooseCode);
    on(code, "dragstart", (event) => event.dataTransfer.setData("text/plain", "gift"));
    [["#shredderBox", true], ["#sendBox", false]].forEach(([selector, ok]) => {
      const box = $(selector);
      const finish = () => {
        if (!selected) return toast("Select the gift card code first.");
        ok ? passRound("Gift card code destroyed, not shared.") : failRound("Sent the gift card code to the scammer.");
      };
      on(box, "click", finish);
      on(box, "dragover", (event) => { event.preventDefault(); box.classList.add("drag-over"); });
      on(box, "dragleave", () => box.classList.remove("drag-over"));
      on(box, "drop", (event) => {
        event.preventDefault();
        selected = true;
        box.classList.remove("drag-over");
        finish();
      });
    });
  }

  function drawPasswordVault(round) {
    return `<div class="vault-stage tap-drag-stage"><div class="scenario-box"><div class="message-header"><span class="avatar">🔐</span><span>Password Token</span></div><p>${esc(round.scenario || round.directions)}</p><button class="draggable-chip" draggable="true" id="passwordToken">•••••••• saved password</button><p class="tap-drag-help">Drag on computer, or tap the token and then tap a destination on mobile.</p></div><button class="vault-box tap-drop-target" id="vaultBox">🔐<br>Password Vault</button><button class="fake-form-box tap-drop-target" id="fakeFormBox">🚩<br>Fake Form</button></div>`;
  }

  function wirePasswordVault() {
    const token = $("#passwordToken");
    let selected = false;
    function chooseToken() {
      selected = true;
      token?.classList.add("selected");
      toast("Password selected. Tap the safe vault.");
    }
    on(token, "click", chooseToken);
    on(token, "dragstart", (event) => event.dataTransfer.setData("text/plain", "pw"));
    [["#vaultBox", true], ["#fakeFormBox", false]].forEach(([selector, ok]) => {
      const box = $(selector);
      const finish = () => {
        if (!selected) return toast("Select the password token first.");
        ok ? passRound("Password stayed in the vault.") : failRound("Password was placed into a fake form.");
      };
      on(box, "click", finish);
      on(box, "dragover", (event) => { event.preventDefault(); box.classList.add("drag-over"); });
      on(box, "dragleave", () => box.classList.remove("drag-over"));
      on(box, "drop", (event) => {
        event.preventDefault();
        selected = true;
        box.classList.remove("drag-over");
        finish();
      });
    });
  }

  function wireTextDodge(round) {
    const stage = $("#dodgeStage");
    const player = $("#dodgePlayer");
    const starText = $("#dodgeStars");
    const keys = {};
    let x = 50;
    let collected = 0;
    let made = 0;
    let safeFrames = 80;
    const target = round.target || 3;
    const labels = round.scamLabels || ["PAY NOW", "SEND CODE", "OPEN LINK", "GIFT CARD"];

    function place() { player.style.left = `${x}%`; }
    function release() { keys.arrowleft = false; keys.arrowright = false; }

    on(document, "keydown", (event) => { keys[event.key.toLowerCase()] = true; });
    on(document, "keyup", (event) => { keys[event.key.toLowerCase()] = false; });
    on(window, "pointerup", release);
    on(window, "pointercancel", release);
    [["v14LeftBtn", "arrowleft"], ["v14RightBtn", "arrowright"]].forEach(([id, key]) => {
      const button = $(`#${id}`);
      on(button, "pointerdown", (event) => { event.preventDefault(); keys[key] = true; });
      on(button, "pointerup", release);
      on(button, "pointercancel", release);
      on(button, "pointerleave", release);
    });

    function spawn() {
      if (state.answered) return;
      const isStar = made % 4 === 2;
      made += 1;
      const element = document.createElement("div");
      element.className = `fall-token ${isStar ? "star" : "scam"}`;
      element.dataset.star = isStar ? "true" : "false";
      element.dataset.y = "-10";
      element.dataset.speed = String((state.difficulty === "hard" ? 0.82 : 0.64) + Math.random() * 0.28);
      element.style.left = `${8 + Math.random() * 78}%`;
      element.textContent = isStar ? "⭐ VERIFY" : labels[made % labels.length];
      stage.appendChild(element);
    }

    const spawner = setInterval(spawn, state.difficulty === "hard" ? 650 : 780);
    addCleanup(() => clearInterval(spawner));

    function tick() {
      if (state.answered) return;
      if (keys.arrowleft || keys.a) x -= 1.75;
      if (keys.arrowright || keys.d) x += 1.75;
      x = clamp(x, 4, 96);
      place();
      const playerRect = player.getBoundingClientRect();
      $$(".fall-token", stage).forEach((element) => {
        const y = Number(element.dataset.y || 0) + Number(element.dataset.speed || 0.7);
        element.dataset.y = String(y);
        element.style.top = `${y}%`;
        if (safeFrames <= 0 && V14_overlap(playerRect, element.getBoundingClientRect())) {
          if (element.dataset.star === "true") {
            collected += 1;
            if (starText) starText.textContent = collected;
            sfx("coin");
            element.remove();
            if (collected >= target) passRound("Collected safe verification while avoiding scam texts.");
          } else {
            failRound("Hit by a falling scam text.");
          }
        } else if (y > 104) {
          element.remove();
        }
      });
      safeFrames = Math.max(0, safeFrames - 1);
      state.anim = requestAnimationFrame(tick);
    }

    place();
    setTimeout(spawn, 250);
    state.anim = requestAnimationFrame(tick);
  }

  function wireSpywareMaze() {
    const field = $("#mazeField");
    const player = $("#mazePlayer");
    const goal = $("#mazeGoal");
    const position = { x: 18, y: 22 };
    const keys = {};
    let safeFrames = 70;

    function place() {
      player.style.left = `${position.x}%`;
      player.style.top = `${position.y}%`;
    }
    function release() {
      keys.ArrowLeft = keys.ArrowRight = keys.ArrowUp = keys.ArrowDown = false;
    }

    on(document, "keydown", (event) => { keys[event.key] = true; keys[event.key.toLowerCase()] = true; });
    on(document, "keyup", (event) => { keys[event.key] = false; keys[event.key.toLowerCase()] = false; });
    on(window, "pointerup", release);
    on(window, "pointercancel", release);
    [["leftBtn", "ArrowLeft"], ["rightBtn", "ArrowRight"], ["upBtn", "ArrowUp"], ["downBtn", "ArrowDown"]].forEach(([id, key]) => {
      const button = $(`#${id}`);
      on(button, "pointerdown", (event) => { event.preventDefault(); keys[key] = true; });
      on(button, "pointerup", release);
      on(button, "pointercancel", release);
      on(button, "pointerleave", release);
    });

    function tick() {
      if (state.answered) return;
      if (keys.ArrowLeft || keys.a) position.x -= 0.62;
      if (keys.ArrowRight || keys.d) position.x += 0.62;
      if (keys.ArrowUp || keys.w) position.y -= 0.62;
      if (keys.ArrowDown || keys.s) position.y += 0.62;
      position.x = clamp(position.x, 0, 92);
      position.y = clamp(position.y, 0, 86);
      place();

      const playerRect = player.getBoundingClientRect();
      if (safeFrames <= 0) {
        for (const hazard of $$(".maze-hazard", field)) {
          if (V14_overlap(playerRect, hazard.getBoundingClientRect())) return failRound("Spyware caught you in the maze.");
        }
      }
      if (V14_overlap(playerRect, goal.getBoundingClientRect())) return passRound("Reached antivirus safely.");
      safeFrames = Math.max(0, safeFrames - 1);
      state.anim = requestAnimationFrame(tick);
    }

    place();
    state.anim = requestAnimationFrame(tick);
  }

  function showResults(lost) {
    clearLoops();
    document.body.classList.remove("game-active");
    if (state.runMode === "versus") return v16ShowVersusResults(lost);
    v16ClearProgress();
    const profile = v16RecordResult(lost);
    const isDemo = state.runMode === "demo";
    const best = Number((isDemo ? profile?.demoBestScore : profile?.bestScore) || state.score || 0);
    const grade = lost
      ? "Training Needed"
      : isDemo
        ? "Demo Complete"
        : state.score > 3600
          ? "FraudFront Champion"
          : state.score > 2600
            ? "FraudFront Defender"
            : state.score > 1900
              ? "Scam Spotter"
              : "Safety Rookie";
    const recapLessons = state.lessons.slice(0, 6);
    const shareText = isDemo
      ? `I completed the 5-game Scam Sprint demo with ${state.score} points. Can you beat my score? #FraudFront #ScamSprint`
      : `I got ${state.score} points and defeated The Fraudster in Scam Sprint. Can you defeat The Fraudster? #FraudFront #ScamSprint`;
    const playbook = [
      ["Stop the pressure", "Do not click, pay, download, approve MFA, or share codes while someone is rushing you."],
      ["Verify independently", "Use a saved number, official app, typed website, known school/work portal, or trusted relative."],
      ["Protect credentials", "Never share passwords, one-time codes, SSN/Medicare details, bank login, or remote access."],
      ["Report and block", "Report scam accounts, texts, emails, game-chat users, and fake profiles instead of engaging."],
      ["Save evidence", "Keep screenshots, sender info, URLs, payment details, and times if money or sensitive data was involved."]
    ];
    const localTop = v16GetLocalLeaderboard().slice(0, 5);

    render(`
      <section class="screen results-screen">
        ${topbar()}
        <div class="panel results-panel">
          <span class="eyebrow">${isDemo ? "Demo recap" : "Run recap"} · ${esc(profile?.username || "Player")}</span>
          <h1>${lost ? "The Fraudster broke through." : isDemo ? "Five-game demo complete!" : "You defeated The Fraudster!"}</h1>
          <p>${esc(grade)} · Your player profile, best score, and completed-run statistics were saved locally.</p>
          <div class="result-grid">
            <div><strong>${state.score}</strong><span>score</span></div>
            <div><strong>${state.correct}</strong><span>rounds cleared</span></div>
            <div><strong>${state.bestStreak}</strong><span>best combo</span></div>
            <div><strong>${best}</strong><span>${esc(profile?.username || "player")} best</span></div>
          </div>
          <section class="recap-section result-leaderboard-preview">
            <div class="leaderboard-title"><strong>🏆 This-device standings</strong><button class="btn btn-secondary btn-small" id="resultLeaderboardBtn">Full Leaderboard</button></div>
            ${v16LeaderboardRows(localTop, "Finish a run to create the first score.")}
            ${profile?.globalShare && v16GlobalConfigured() && V16_ONLINE.user && !lost && !isDemo ? `<p class="global-submit-note">🌎 This completed full-run score was submitted to the worldwide leaderboard.</p>` : ""}
          </section>
          ${!lost ? `<section class="recap-section share-card"><h2>Share your result</h2><p>Copy this message:</p><textarea id="shareText" class="share-text" readonly>${esc(shareText)}</textarea><div class="button-row"><button class="btn btn-primary" id="copyShareBtn">Copy Share Text</button></div></section>` : ""}
          <section class="recap-section">
            <h2>What to do when a scam appears</h2>
            <div class="recap-grid">
              ${playbook.map((item, index) => `<article class="recap-card"><span>${index + 1}</span><strong>${esc(item[0])}</strong><p>${esc(item[1])}</p></article>`).join("")}
            </div>
          </section>
          <section class="recap-section">
            <h2>Lessons from this ${isDemo ? "demo" : "run"}</h2>
            <div class="lesson-list">
              ${(recapLessons.length ? recapLessons : ["Pause, verify independently, report/block suspicious accounts, and avoid pressure-driven decisions."]).map((lesson) => `<div class="lesson-row">✅ ${esc(lesson)}</div>`).join("")}
            </div>
          </section>
          <section class="recap-section action-plan">
            <h2>Real-world emergency plan</h2>
            <p><strong>If money or sensitive info was shared:</strong> contact the bank/payment app immediately, change passwords, enable MFA, document evidence, and report the account/message. If a device was controlled remotely, disconnect internet and get trusted technical help before logging into accounts.</p>
          </section>
          <div class="button-row">
            ${isDemo ? `<button class="btn btn-primary" id="fullRunBtn">Start Full Arcade</button><button class="btn btn-demo" id="againBtn">Play Another Demo</button>` : `<button class="btn btn-primary" id="againBtn">Play Again</button>`}
            <button class="btn" id="libraryAgainBtn">Open Library</button>
            <button class="btn" id="homeAgainBtn">Home</button>
          </div>
        </div>
      </section>
    `);
    wireTopbar();
    on($("#againBtn"), "click", isDemo ? startDemo : startGame);
    on($("#fullRunBtn"), "click", showSetup);
    on($("#libraryAgainBtn"), "click", showLibrary);
    on($("#homeAgainBtn"), "click", showHome);
    on($("#resultLeaderboardBtn"), "click", showLeaderboard);
    on($("#copyShareBtn"), "click", async () => {
      const box = $("#shareText");
      const value = box ? box.value : shareText;
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        if (box) {
          box.focus();
          box.select();
          document.execCommand("copy");
        }
      }
      toast("Share text copied.");
    });
  }


  /* ============================================================
     18C) V16.1 FOUNDATION RETAINED IN V16.2
          Account Security, Worldwide Scores, Motion, and Legacy 1v1 VS
     IMPORTANT: This entire V16.1 foundation remains in the file.
     V16.2 adds no-email anonymous online play and room-code multiplayer
     later in section 18D without removing the previous implementation.
     ============================================================ */

  const V16_PASSWORD_ITERATIONS = 210000;
  const V16_PASSWORD_MIN_LENGTH = 10;
  const V16_SECURITY = {
    unlockedProfiles: new Set(),
    pendingAction: null,
    selectedAccountTab: "profiles",
    accountMessage: ""
  };

  const V16_ONLINE = {
    client: null,
    session: null,
    user: null,
    authSubscription: null,
    lobbyChannel: null,
    lobbyPlayers: new Map(),
    incomingChallenge: null,
    outgoingChallenge: null,
    match: null,
    lobbyStatus: "offline"
  };

  function v16BytesToBase64(bytes) {
    let binary = "";
    const array = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
    for (let i = 0; i < array.length; i += 1) binary += String.fromCharCode(array[i]);
    return btoa(binary);
  }

  function v16Base64ToBytes(value) {
    const binary = atob(String(value || ""));
    return Uint8Array.from(binary, (char) => char.charCodeAt(0));
  }

  function v16ConstantTimeEqual(a, b) {
    const left = String(a || "");
    const right = String(b || "");
    let mismatch = left.length ^ right.length;
    const length = Math.max(left.length, right.length);
    for (let i = 0; i < length; i += 1) mismatch |= (left.charCodeAt(i) || 0) ^ (right.charCodeAt(i) || 0);
    return mismatch === 0;
  }

  function v16PasswordReport(password, username = "") {
    const value = String(password || "");
    const lower = value.toLowerCase();
    const usernameParts = String(username || "").toLowerCase().split(/[ _-]+/).filter((part) => part.length >= 3);
    const common = ["password", "password1", "qwerty", "letmein", "welcome", "123456", "fraudfront", "scamsprint"];
    const checks = [
      { key: "length", label: `At least ${V16_PASSWORD_MIN_LENGTH} characters`, ok: value.length >= V16_PASSWORD_MIN_LENGTH },
      { key: "upper", label: "One uppercase letter", ok: /[A-Z]/.test(value) },
      { key: "lower", label: "One lowercase letter", ok: /[a-z]/.test(value) },
      { key: "number", label: "One number", ok: /\d/.test(value) },
      { key: "symbol", label: "One symbol", ok: /[^A-Za-z0-9\s]/.test(value) },
      { key: "personal", label: "Does not contain the username", ok: !usernameParts.some((part) => lower.includes(part)) },
      { key: "common", label: "Not a common password", ok: !common.some((item) => lower.includes(item)) }
    ];
    const passed = checks.filter((check) => check.ok).length;
    const score = Math.round((passed / checks.length) * 100);
    return {
      ok: checks.every((check) => check.ok),
      checks,
      score,
      label: score >= 100 ? "Strong" : score >= 72 ? "Almost strong" : score >= 45 ? "Needs improvement" : "Weak"
    };
  }

  async function v16DerivePasswordHash(password, saltBase64, iterations = V16_PASSWORD_ITERATIONS) {
    if (!window.crypto?.subtle) throw new Error("Secure password protection requires a modern browser with Web Crypto.");
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", encoder.encode(String(password)), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits({
      name: "PBKDF2",
      hash: "SHA-256",
      salt: v16Base64ToBytes(saltBase64),
      iterations
    }, key, 256);
    return v16BytesToBase64(new Uint8Array(bits));
  }

  async function v16BuildPasswordRecord(password) {
    const salt = new Uint8Array(16);
    crypto.getRandomValues(salt);
    const saltBase64 = v16BytesToBase64(salt);
    const hash = await v16DerivePasswordHash(password, saltBase64, V16_PASSWORD_ITERATIONS);
    return {
      algorithm: "PBKDF2-SHA-256",
      iterations: V16_PASSWORD_ITERATIONS,
      salt: saltBase64,
      hash,
      createdAt: v16NowIso(),
      changedAt: v16NowIso()
    };
  }

  function v16ProfileHasPassword(profile) {
    return Boolean(profile?.password?.salt && profile?.password?.hash);
  }

  function v16IsProfileUnlocked(profileId) {
    return V16_SECURITY.unlockedProfiles.has(String(profileId || ""));
  }

  function v16PasswordLockSeconds(profile) {
    const lockedUntil = Number(profile?.security?.lockedUntil || 0);
    return Math.max(0, Math.ceil((lockedUntil - Date.now()) / 1000));
  }

  async function v16VerifyProfilePassword(profile, password) {
    if (!profile || !v16ProfileHasPassword(profile)) return false;
    const lockSeconds = v16PasswordLockSeconds(profile);
    if (lockSeconds > 0) throw new Error(`Too many attempts. Try again in ${lockSeconds} seconds.`);
    const expected = await v16DerivePasswordHash(password, profile.password.salt, Number(profile.password.iterations || V16_PASSWORD_ITERATIONS));
    const ok = v16ConstantTimeEqual(expected, profile.password.hash);
    if (ok) {
      v16UpdateProfile(profile.id, { security: { failedAttempts: 0, lockedUntil: 0, lastUnlockedAt: v16NowIso() } });
      return true;
    }
    const attempts = Number(profile.security?.failedAttempts || 0) + 1;
    const lockedUntil = attempts >= 5 ? Date.now() + Math.min(120000, 30000 * Math.max(1, attempts - 4)) : 0;
    v16UpdateProfile(profile.id, { security: { failedAttempts: attempts, lockedUntil, lastFailedAt: v16NowIso() } });
    throw new Error(lockedUntil ? "Too many incorrect attempts. This profile is temporarily locked for 30 seconds." : `Incorrect password. ${Math.max(0, 5 - attempts)} attempt${5 - attempts === 1 ? "" : "s"} before a temporary lock.`);
  }

  async function v16SetProfilePassword(profileId, password) {
    const profile = v16GetProfiles().find((item) => item.id === profileId);
    if (!profile) throw new Error("Profile not found.");
    const report = v16PasswordReport(password, profile.username);
    if (!report.ok) throw new Error("The password does not yet meet every safety requirement.");
    const record = await v16BuildPasswordRecord(password);
    const updated = v16UpdateProfile(profile.id, {
      password: record,
      security: { failedAttempts: 0, lockedUntil: 0, lastUnlockedAt: v16NowIso() }
    });
    V16_SECURITY.unlockedProfiles.add(profile.id);
    return updated;
  }

  async function v16CreateProfile(username, password) {
    const clean = v16SanitizeUsername(username);
    if (clean.length < 2) return { ok: false, error: "Use a nickname with at least 2 characters." };
    const profiles = v16GetProfiles();
    if (profiles.some((profile) => profile.username.toLowerCase() === clean.toLowerCase())) {
      return { ok: false, error: "That nickname already exists on this device." };
    }
    const report = v16PasswordReport(password, clean);
    if (!report.ok) return { ok: false, error: "Create a stronger password that completes every requirement." };
    const passwordRecord = await v16BuildPasswordRecord(password);
    const profile = {
      id: v16Uuid(),
      username: clean,
      globalShare: false,
      bestScore: 0,
      totalScore: 0,
      runs: 0,
      wins: 0,
      demoRuns: 0,
      vsWins: 0,
      vsLosses: 0,
      vsTies: 0,
      lastScore: 0,
      lastPlayedAt: null,
      progress: null,
      password: passwordRecord,
      security: { failedAttempts: 0, lockedUntil: 0, lastUnlockedAt: v16NowIso() },
      createdAt: v16NowIso()
    };
    profiles.push(profile);
    v16SaveProfiles(profiles);
    localStorage.setItem(V16_STORAGE.activeProfile, profile.id);
    V16_SECURITY.unlockedProfiles.add(profile.id);
    return { ok: true, profile };
  }

  function v16LockProfile(profileId) {
    V16_SECURITY.unlockedProfiles.delete(String(profileId || ""));
  }

  function v16RunPendingAction() {
    const action = V16_SECURITY.pendingAction;
    V16_SECURITY.pendingAction = null;
    if (typeof action === "function") action();
  }

  function v16RequireUnlocked(action) {
    const profile = v16GetActiveProfile();
    if (!v16ProfileHasPassword(profile)) {
      V16_SECURITY.pendingAction = action;
      V16_SECURITY.accountMessage = "Set a strong password before using this profile.";
      return showProfileManager("security");
    }
    if (v16IsProfileUnlocked(profile.id)) return action();
    V16_SECURITY.pendingAction = action;
    showProfileAction("use", profile.id, true);
  }

  function v16PasswordChecklistHtml(username, inputId) {
    const initial = v16PasswordReport("", username);
    return `
      <div class="password-strength" data-password-strength-for="${esc(inputId)}">
        <div class="password-meter"><span style="width:0%"></span></div>
        <strong class="password-strength-label">Password strength: ${initial.label}</strong>
        <div class="password-check-grid">
          ${initial.checks.map((check) => `<span data-password-check="${check.key}">○ ${esc(check.label)}</span>`).join("")}
        </div>
      </div>`;
  }

  function v16WirePasswordStrength(input, usernameProvider) {
    if (!input) return;
    const host = $(`[data-password-strength-for="${input.id}"]`);
    if (!host) return;
    const update = () => {
      const username = typeof usernameProvider === "function" ? usernameProvider() : usernameProvider;
      const report = v16PasswordReport(input.value, username || "");
      const meter = $(".password-meter span", host);
      const label = $(".password-strength-label", host);
      if (meter) meter.style.width = `${report.score}%`;
      if (label) label.textContent = `Password strength: ${report.label}`;
      report.checks.forEach((check) => {
        const node = $(`[data-password-check="${check.key}"]`, host);
        if (node) {
          node.classList.toggle("passed", check.ok);
          node.textContent = `${check.ok ? "✓" : "○"} ${check.label}`;
        }
      });
    };
    on(input, "input", update);
    update();
  }

  function v16WirePasswordReveal() {
    $$('[data-toggle-password]').forEach((button) => on(button, "click", () => {
      const input = $(`#${button.dataset.togglePassword}`);
      if (!input) return;
      input.type = input.type === "password" ? "text" : "password";
      button.textContent = input.type === "password" ? "Show" : "Hide";
    }));
  }

  function v16MaskedEmail(value) {
    const email = String(value || "");
    const [name, domain] = email.split("@");
    if (!domain) return "Private email";
    return `${name.slice(0, 2)}${"•".repeat(Math.max(2, name.length - 2))}@${domain}`;
  }

  function v16GetGlobalConfig() {
    const config = window.FF_ONLINE_CONFIG || window.FF_LEADERBOARD_CONFIG || {};
    return {
      supabaseUrl: String(config.supabaseUrl || "").replace(/\/+$/, ""),
      anonKey: String(config.anonKey || ""),
      submitRpc: String(config.submitRpc || "submit_score"),
      readRpc: String(config.readRpc || "get_leaderboard"),
      profileRpc: String(config.profileRpc || "upsert_ff_profile"),
      matchRpc: String(config.matchRpc || "submit_match_result"),
      lobbyChannel: String(config.lobbyChannel || "ff-global-lobby"),
      createRoomRpc: String(config.createRoomRpc || "ff_create_room"),
      joinRoomRpc: String(config.joinRoomRpc || "ff_join_room"),
      startRoomRpc: String(config.startRoomRpc || "ff_start_room"),
      updateRoomRpc: String(config.updateRoomRpc || "ff_update_room_progress"),
      heartbeatRoomRpc: String(config.heartbeatRoomRpc || "ff_room_heartbeat"),
      leaveRoomRpc: String(config.leaveRoomRpc || "ff_leave_room")
    };
  }

  function v16GlobalConfigured() {
    const config = v16GetGlobalConfig();
    return Boolean(config.supabaseUrl && config.anonKey);
  }

  function v16SupabaseClient() {
    if (V16_ONLINE.client) return V16_ONLINE.client;
    if (!v16GlobalConfigured() || !window.supabase?.createClient) return null;
    const config = v16GetGlobalConfig();
    V16_ONLINE.client = window.supabase.createClient(config.supabaseUrl, config.anonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
      realtime: { params: { eventsPerSecond: 8 } }
    });
    return V16_ONLINE.client;
  }

  async function v16RefreshCloudSession() {
    const client = v16SupabaseClient();
    if (!client) {
      V16_ONLINE.session = null;
      V16_ONLINE.user = null;
      return null;
    }
    const { data, error } = await client.auth.getSession();
    if (error) throw error;
    V16_ONLINE.session = data.session || null;
    V16_ONLINE.user = data.session?.user || null;
    return V16_ONLINE.session;
  }

  function v16InstallAuthListener() {
    const client = v16SupabaseClient();
    if (!client || V16_ONLINE.authSubscription) return;
    const result = client.auth.onAuthStateChange((_event, session) => {
      V16_ONLINE.session = session || null;
      V16_ONLINE.user = session?.user || null;
      if (!session) v16DisconnectLobby();
    });
    V16_ONLINE.authSubscription = result?.data?.subscription || true;
    v16RefreshCloudSession().catch(() => { /* account screen reports connection errors */ });
  }

  async function v16CloudUpsertAlias(username) {
    const client = v16SupabaseClient();
    if (!client || !V16_ONLINE.user) throw new Error("Connect the unlocked profile to Online Play first.");
    const config = v16GetGlobalConfig();
    const { error } = await client.rpc(config.profileRpc, { p_username: v16SanitizeUsername(username) });
    if (error) throw error;
  }

  /* ============================================================
     V16.1 LEGACY EMAIL AUTH — RETAINED, BUT NO LONGER SHOWN OR WIRED
     ------------------------------------------------------------
     These three functions are intentionally preserved so previous code
     is not deleted. V16.2 uses v162EnsureAnonymousOnlineSession instead.
     ============================================================ */
  async function v16CloudSignUp(email, password, username) {
    const client = v16SupabaseClient();
    if (!client) throw new Error("Worldwide services are not configured yet.");
    const clean = v16SanitizeUsername(username);
    const report = v16PasswordReport(password, clean);
    if (!report.ok) throw new Error("Use a strong password that completes every requirement.");
    const { data, error } = await client.auth.signUp({
      email: String(email || "").trim(),
      password,
      options: { data: { username: clean } }
    });
    if (error) throw error;
    V16_ONLINE.session = data.session || null;
    V16_ONLINE.user = data.user || null;
    if (data.session) await v16CloudUpsertAlias(clean);
    const active = v16GetActiveProfile();
    v16UpdateProfile(active.id, {
      cloudUserId: data.user?.id || null,
      cloudEmailMasked: v16MaskedEmail(email),
      globalShare: Boolean(data.session)
    });
    return { needsConfirmation: !data.session, user: data.user };
  }

  async function v16CloudSignIn(email, password) {
    const client = v16SupabaseClient();
    if (!client) throw new Error("Worldwide services are not configured yet.");
    const { data, error } = await client.auth.signInWithPassword({ email: String(email || "").trim(), password });
    if (error) throw error;
    V16_ONLINE.session = data.session;
    V16_ONLINE.user = data.user;
    const active = v16GetActiveProfile();
    await v16CloudUpsertAlias(active.username);
    v16UpdateProfile(active.id, {
      cloudUserId: data.user.id,
      cloudEmailMasked: v16MaskedEmail(email),
      globalShare: true
    });
    return data;
  }

  async function v16CloudSignOut() {
    const client = v16SupabaseClient();
    if (client) await client.auth.signOut();
    V16_ONLINE.session = null;
    V16_ONLINE.user = null;
    v16DisconnectLobby();
  }

  async function v16CloudResetPassword(email) {
    const client = v16SupabaseClient();
    if (!client) throw new Error("Worldwide services are not configured yet.");
    const address = String(email || "").trim();
    if (!address || !address.includes("@")) throw new Error("Enter the worldwide account email first.");
    const redirectTo = location.protocol === "http:" || location.protocol === "https:" ? `${location.origin}${location.pathname}` : undefined;
    const options = redirectTo ? { redirectTo } : undefined;
    const { error } = await client.auth.resetPasswordForEmail(address, options);
    if (error) throw error;
    return true;
  }

  async function v16FetchGlobalLeaderboard(limit = 50) {
    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    if (!client) throw new Error("Worldwide leaderboard is not configured.");
    const { data, error } = await client.rpc(config.readRpc, { p_limit: clamp(Number(limit || 50), 1, 100) });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  }

  async function v16SubmitGlobalScore(profile) {
    if (!profile?.globalShare || !v16GlobalConfigured() || state.runMode !== "full") return false;
    await v16RefreshCloudSession();
    if (!V16_ONLINE.user) return false;
    await v16CloudUpsertAlias(profile.username);
    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    const { error } = await client.rpc(config.submitRpc, {
      p_username: profile.username,
      p_score: clamp(Number(state.score || 0), 0, 50000),
      p_best_streak: clamp(Number(state.bestStreak || 0), 0, 100),
      p_won: true
    });
    if (error) throw error;
    return true;
  }

  async function v16SubmitMatchResult(match) {
    if (!match || !V16_ONLINE.user || !v16GlobalConfigured() || match.submitted) return;
    match.submitted = true;
    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    const result = Number(match.localScore || 0) === Number(match.opponentScore || 0)
      ? "tie"
      : Number(match.localScore || 0) > Number(match.opponentScore || 0) ? "win" : "loss";
    const { error } = await client.rpc(config.matchRpc, {
      p_match_id: match.matchId,
      p_username: v16GetActiveProfile().username,
      p_opponent: match.opponentUsername,
      p_score: Number(match.localScore || 0),
      p_opponent_score: Number(match.opponentScore || 0),
      p_result: result
    });
    if (error) match.submitted = false;
  }

  function v16InstallRuntimeOnce() {
    if (window.__ffV16RuntimeInstalled) return;
    window.__ffV16RuntimeInstalled = true;
    v16EnsureProfile();
    v16UpdateViewport();
    v16InstallAuthListener();
    window.addEventListener("resize", v16UpdateViewport, { passive: true });
    window.addEventListener("orientationchange", () => setTimeout(v16UpdateViewport, 120), { passive: true });
    window.screen?.orientation?.addEventListener?.("change", () => setTimeout(v16UpdateViewport, 100));
    window.visualViewport?.addEventListener("resize", v16UpdateViewport, { passive: true });
    window.addEventListener("beforeunload", v16SaveProgressSnapshot);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") v16SaveProgressSnapshot();
    });
  }

  function v16TiltAxis(event) {
    const angle = Number(screen.orientation?.angle ?? window.orientation ?? 0);
    let axis = Number(event.gamma || 0);
    if (angle === 90) axis = -Number(event.beta || 0);
    if (angle === -90 || angle === 270) axis = Number(event.beta || 0);
    const baseline = Number(state.tiltBaseline || 0);
    return clamp(axis - baseline, -35, 35);
  }

  async function v16EnableMotionControls() {
    try {
      if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission !== "granted") throw new Error("Motion permission was not granted.");
      }
      state.deviceMode = "motion";
      state.tiltBaseline = 0;
      localStorage.setItem("ffV16MotionEnabled", "yes");
      toast("Motion Tilt enabled. Hold the phone naturally, then use Calibrate Tilt if needed.");
      return true;
    } catch (error) {
      state.deviceMode = "touch";
      toast(error.message || "Motion Tilt is unavailable. Touch controls remain enabled.");
      return false;
    }
  }

  function v16CalibrateTilt() {
    state.tiltBaseline = Number(state.tiltX || 0) + Number(state.tiltBaseline || 0);
    state.tiltX = 0;
    toast("Tilt center calibrated.");
  }

  function v16AccountNav(activeTab) {
    const tabs = [
      ["profiles", "👥", "Profiles"],
      ["security", "🔐", "Password & Security"],
      ["cloud", "🌎", "Worldwide Account"],
      ["danger", "⚙️", "Rename or Delete"]
    ];
    return `<nav class="account-nav" aria-label="Account settings sections">
      ${tabs.map(([key, icon, label]) => `<button class="account-nav-btn ${activeTab === key ? "active" : ""}" data-account-tab="${key}"><span>${icon}</span><strong>${label}</strong></button>`).join("")}
    </nav>`;
  }

  function v16ProfileCardsHtml(profiles, active) {
    return `<div class="account-profile-grid">
      ${profiles.map((profile) => {
        const protectedProfile = v16ProfileHasPassword(profile);
        const unlocked = v16IsProfileUnlocked(profile.id);
        return `<article class="account-profile-card ${profile.id === active.id ? "active" : ""}">
          <div class="profile-avatar">${esc(profile.username.slice(0, 1).toUpperCase())}</div>
          <div class="profile-copy">
            <div class="account-profile-title"><strong>${esc(profile.username)}</strong>${profile.id === active.id ? `<span class="active-badge">Active</span>` : ""}</div>
            <span>Best ${Number(profile.bestScore || 0).toLocaleString()} · ${Number(profile.wins || 0)} arcade wins · ${Number(profile.vsWins || 0)} VS wins</span>
            <div class="security-status-row"><span class="status-dot ${protectedProfile ? "good" : "warn"}"></span>${protectedProfile ? (unlocked ? "Password protected · unlocked this session" : "Password protected · locked") : "Password setup required"}</div>
          </div>
          <div class="profile-actions">
            <button class="btn ${profile.id === active.id && unlocked ? "btn-good" : "btn-primary"} btn-small" data-profile-use="${profile.id}">${profile.id === active.id && unlocked ? "Unlocked" : protectedProfile ? "Unlock & Use" : "Set Password"}</button>
            <button class="btn btn-secondary btn-small" data-profile-manage="${profile.id}">Manage</button>
          </div>
        </article>`;
      }).join("")}
    </div>`;
  }

  function v16AccountSectionHtml(tab, profiles, active) {
    if (tab === "profiles") {
      return `
        <section class="account-section">
          <div class="account-section-head"><div><span class="eyebrow">Player access</span><h2>Choose or create a protected player.</h2><p>Each profile has separate progress, scores, settings, and a password. Passwords are salted and hashed locally; readable passwords are never saved.</p></div></div>
          ${v16ProfileCardsHtml(profiles, active)}
          <form class="account-form account-create-form" id="profileCreateForm">
            <div class="form-heading"><span>＋</span><div><strong>Create a new profile</strong><p>Use a nickname—not a legal name.</p></div></div>
            <div class="form-grid two-column">
              <label><span>Username</span><input id="newProfileName" maxlength="18" autocomplete="nickname" placeholder="Gamer tag" required></label>
              <label><span>Password</span><div class="password-input-wrap"><input id="newProfilePassword" type="password" autocomplete="new-password" placeholder="Strong password" required><button type="button" data-toggle-password="newProfilePassword">Show</button></div></label>
              <label><span>Confirm password</span><div class="password-input-wrap"><input id="newProfileConfirm" type="password" autocomplete="new-password" placeholder="Repeat password" required><button type="button" data-toggle-password="newProfileConfirm">Show</button></div></label>
            </div>
            ${v16PasswordChecklistHtml("", "newProfilePassword")}
            <p class="form-error" id="profileError" role="alert"></p>
            <button class="btn btn-primary account-submit" type="submit">Create Protected Profile</button>
          </form>
        </section>`;
    }
    if (tab === "security") {
      const hasPassword = v16ProfileHasPassword(active);
      return `
        <section class="account-section">
          <div class="account-section-head"><div><span class="eyebrow">Password & security</span><h2>Protect ${esc(active.username)}.</h2><p>The password unlocks play, profile switching, renaming, password changes, and deletion. Five failed attempts trigger a temporary lock.</p></div><div class="account-security-badge ${hasPassword ? "secure" : "attention"}">${hasPassword ? "🔐 Protected" : "⚠️ Setup required"}</div></div>
          ${V16_SECURITY.accountMessage ? `<div class="account-alert">${esc(V16_SECURITY.accountMessage)}</div>` : ""}
          ${!hasPassword ? `
            <form class="account-form" id="setPasswordForm">
              <div class="form-heading"><span>🔑</span><div><strong>Set the first password</strong><p>Required before this profile can start or resume a game.</p></div></div>
              <label><span>New password</span><div class="password-input-wrap"><input id="setPassword" type="password" autocomplete="new-password" required><button type="button" data-toggle-password="setPassword">Show</button></div></label>
              <label><span>Confirm password</span><div class="password-input-wrap"><input id="setPasswordConfirm" type="password" autocomplete="new-password" required><button type="button" data-toggle-password="setPasswordConfirm">Show</button></div></label>
              ${v16PasswordChecklistHtml(active.username, "setPassword")}
              <p class="form-error" id="securityError" role="alert"></p>
              <button class="btn btn-primary account-submit" type="submit">Save Password & Unlock</button>
            </form>` : `
            <div class="security-overview-grid">
              <article><span>🔒</span><strong>${v16IsProfileUnlocked(active.id) ? "Unlocked now" : "Locked now"}</strong><p>Unlocking lasts only until this page is reloaded or you press Lock Now.</p><button class="btn btn-secondary" id="lockProfileBtn" ${v16IsProfileUnlocked(active.id) ? "" : "disabled"}>Lock Now</button></article>
              <article><span>🧠</span><strong>PBKDF2-SHA-256</strong><p>The saved verifier uses a random salt and ${V16_PASSWORD_ITERATIONS.toLocaleString()} derivation rounds.</p></article>
              <article><span>🛑</span><strong>Attempt protection</strong><p>Repeated failures temporarily lock password verification.</p></article>
            </div>
            <button class="btn btn-primary" id="changePasswordBtn">Change Password</button><div class="privacy-note compact"><strong>Local password recovery</strong><p>The local password is never stored in readable form and cannot be emailed back. Keep it somewhere safe. Online play uses the already-unlocked local profile and does not ask for an email. If browser storage is cleared, an anonymous online identity cannot be recovered.</p></div>`}
        </section>`;
    }
    if (tab === "cloud") {
      const configured = v16GlobalConfigured();
      const signedIn = Boolean(V16_ONLINE.user);
      return `
        <section class="account-section">
          <div class="account-section-head"><div><span class="eyebrow">Worldwide account</span><h2>Persistent scores and Global VS.</h2><p>Your email is used only for private authentication. Other players see only your chosen username, score, VS status, and match result.</p></div><div class="account-security-badge ${signedIn ? "secure" : configured ? "attention" : "offline"}">${signedIn ? "🌎 Online" : configured ? "Sign in needed" : "Setup needed"}</div></div>
          ${!configured ? `
            <div class="cloud-setup-card"><strong>Connect the free Supabase backend first.</strong><p>Paste the project URL and public anonymous key into FFindex.html, run the included SQL once, and host the four files. Local profiles still work without it.</p><button class="btn btn-secondary" id="openSetupHelpBtn">View Setup Checklist</button></div>` : signedIn ? `
            <div class="cloud-account-card">
              <div class="cloud-avatar">🌎</div><div><strong>${esc(active.username)}</strong><p>${esc(active.cloudEmailMasked || v16MaskedEmail(V16_ONLINE.user.email))}</p><span>Cloud ID connected · email hidden from players</span></div>
            </div>
            <form class="account-form" id="cloudAliasForm"><label><span>Worldwide username</span><input id="cloudAlias" maxlength="18" value="${esc(active.username)}" required></label><p class="form-error" id="cloudAliasError"></p><button class="btn btn-primary" type="submit">Save Worldwide Username</button></form>
            <label class="privacy-toggle global-share-large"><input id="globalShareToggle" type="checkbox" ${active.globalShare ? "checked" : ""}><span><strong>Publish completed full-run scores</strong><small>Only username, best score, streak, wins, and VS results are shared.</small></span></label>
            <div class="button-row"><button class="btn btn-primary" id="openMultiplayerBtn">Enter Global VS Lobby</button><button class="btn btn-secondary" id="cloudSignOutBtn">Sign Out Worldwide</button></div>` : `
            <div class="cloud-auth-columns">
              <form class="account-form" id="cloudSignInForm">
                <div class="form-heading"><span>🔓</span><div><strong>Sign in</strong><p>Use an existing worldwide account.</p></div></div>
                <label><span>Email</span><input id="cloudSignInEmail" type="email" autocomplete="email" required></label>
                <label><span>Password</span><div class="password-input-wrap"><input id="cloudSignInPassword" type="password" autocomplete="current-password" required><button type="button" data-toggle-password="cloudSignInPassword">Show</button></div></label>
                <p class="form-error" id="cloudSignInError"></p><div class="button-row compact-form-actions"><button class="btn btn-primary" type="submit">Sign In</button><button class="btn btn-secondary" type="button" id="cloudResetBtn">Send Password Reset Email</button></div>
              </form>
              <form class="account-form" id="cloudSignUpForm">
                <div class="form-heading"><span>✨</span><div><strong>Create worldwide account</strong><p>Use ${esc(active.username)} publicly; your email stays private.</p></div></div>
                <label><span>Email</span><input id="cloudSignUpEmail" type="email" autocomplete="email" required></label>
                <label><span>Password</span><div class="password-input-wrap"><input id="cloudSignUpPassword" type="password" autocomplete="new-password" required><button type="button" data-toggle-password="cloudSignUpPassword">Show</button></div></label>
                ${v16PasswordChecklistHtml(active.username, "cloudSignUpPassword")}
                <p class="form-error" id="cloudSignUpError"></p><button class="btn btn-good" type="submit">Create Worldwide Account</button>
              </form>
            </div>`}
        </section>`;
    }
    return `
      <section class="account-section danger-section">
        <div class="account-section-head"><div><span class="eyebrow">Sensitive account actions</span><h2>Rename or delete ${esc(active.username)}.</h2><p>Both actions require the current password. Deleting removes local scores and saved progress from this browser; it does not automatically erase an existing cloud login.</p></div></div>
        <div class="danger-grid">
          <article><span>✏️</span><strong>Rename profile</strong><p>Change the local and worldwide display name after password verification.</p><button class="btn btn-secondary" id="renameAccountBtn">Rename with Password</button></article>
          <article class="danger-card"><span>🗑️</span><strong>Delete profile</strong><p>Permanently remove this profile from this device. At least one local profile must remain.</p><button class="btn btn-danger" id="deleteAccountBtn" ${profiles.length <= 1 ? "disabled" : ""}>Delete with Password</button></article>
        </div>
      </section>`;
  }

  function showProfileManager(tab = "profiles") {
    v16InstallRuntimeOnce();
    V16_SECURITY.selectedAccountTab = tab;
    const profiles = v16GetProfiles();
    const active = v16GetActiveProfile();
    render(`
      <section class="screen account-screen">
        ${topbar()}
        <div class="panel account-settings-panel">
          <header class="account-hero">
            <div><span class="eyebrow">Account Settings</span><h1>Player accounts made clear and secure.</h1><p>Manage profiles, passwords, worldwide rankings, and multiplayer from one large, easy-to-navigate screen.</p></div>
            <button class="btn btn-secondary" id="accountHomeBtn">Back Home</button>
          </header>
          <div class="account-layout">
            ${v16AccountNav(tab)}
            <main class="account-content">${v16AccountSectionHtml(tab, profiles, active)}</main>
          </div>
        </div>
      </section>`);
    wireTopbar();
    v16WirePasswordReveal();
    $$('[data-account-tab]').forEach((button) => on(button, "click", () => showProfileManager(button.dataset.accountTab)));
    on($("#accountHomeBtn"), "click", showHome);

    if (tab === "profiles") {
      v16WirePasswordStrength($("#newProfilePassword"), () => $("#newProfileName")?.value || "");
      on($("#profileCreateForm"), "submit", async (event) => {
        event.preventDefault();
        const errorNode = $("#profileError");
        const password = $("#newProfilePassword")?.value || "";
        if (password !== ($("#newProfileConfirm")?.value || "")) {
          errorNode.textContent = "The two passwords do not match.";
          return;
        }
        try {
          const result = await v16CreateProfile($("#newProfileName")?.value, password);
          if (!result.ok) throw new Error(result.error);
          V16_SECURITY.accountMessage = "";
          showProfileManager("profiles");
          toast(`${result.profile.username} was created and unlocked.`);
        } catch (error) {
          errorNode.textContent = error.message || "Profile could not be created.";
        }
      });
      $$('[data-profile-use]').forEach((button) => on(button, "click", () => {
        const profile = v16GetProfiles().find((item) => item.id === button.dataset.profileUse);
        if (!profile) return;
        if (!v16ProfileHasPassword(profile)) {
          localStorage.setItem(V16_STORAGE.activeProfile, profile.id);
          V16_SECURITY.accountMessage = "Set a strong password before using this profile.";
          return showProfileManager("security");
        }
        if (profile.id === active.id && v16IsProfileUnlocked(profile.id)) return toast("This profile is already active and unlocked.");
        showProfileAction("use", profile.id);
      }));
      $$('[data-profile-manage]').forEach((button) => on(button, "click", () => {
        localStorage.setItem(V16_STORAGE.activeProfile, button.dataset.profileManage);
        showProfileManager("security");
      }));
    }

    if (tab === "security") {
      if (!v16ProfileHasPassword(active)) {
        v16WirePasswordStrength($("#setPassword"), active.username);
        on($("#setPasswordForm"), "submit", async (event) => {
          event.preventDefault();
          const errorNode = $("#securityError");
          const password = $("#setPassword")?.value || "";
          if (password !== ($("#setPasswordConfirm")?.value || "")) return errorNode.textContent = "The two passwords do not match.";
          try {
            await v16SetProfilePassword(active.id, password);
            V16_SECURITY.accountMessage = "";
            toast("Password saved securely. Profile unlocked.");
            if (V16_SECURITY.pendingAction) return v16RunPendingAction();
            showProfileManager("security");
          } catch (error) {
            errorNode.textContent = error.message || "Password could not be saved.";
          }
        });
      } else {
        on($("#lockProfileBtn"), "click", () => { v16LockProfile(active.id); showProfileManager("security"); toast("Profile locked."); });
        on($("#changePasswordBtn"), "click", () => showProfileAction("change", active.id));
      }
    }

    if (tab === "cloud") {
      on($("#openSetupHelpBtn"), "click", showOnlineSetupHelp);
      v16WirePasswordStrength($("#cloudSignUpPassword"), active.username);
      on($("#cloudSignInForm"), "submit", async (event) => {
        event.preventDefault();
        const errorNode = $("#cloudSignInError");
        try {
          await v16CloudSignIn($("#cloudSignInEmail")?.value, $("#cloudSignInPassword")?.value);
          toast("Worldwide account connected.");
          showProfileManager("cloud");
        } catch (error) { errorNode.textContent = error.message || "Sign-in failed."; }
      });
      on($("#cloudResetBtn"), "click", async () => {
        const errorNode = $("#cloudSignInError");
        try {
          await v16CloudResetPassword($("#cloudSignInEmail")?.value);
          errorNode.classList.add("success-message");
          errorNode.textContent = "Password reset email sent. Check the inbox and spam folder.";
        } catch (error) {
          errorNode.classList.remove("success-message");
          errorNode.textContent = error.message || "Reset email could not be sent.";
        }
      });
      on($("#cloudSignUpForm"), "submit", async (event) => {
        event.preventDefault();
        const errorNode = $("#cloudSignUpError");
        try {
          const result = await v16CloudSignUp($("#cloudSignUpEmail")?.value, $("#cloudSignUpPassword")?.value, active.username);
          if (result.needsConfirmation) {
            errorNode.classList.add("success-message");
            errorNode.textContent = "Account created. Check your email confirmation, then return and sign in.";
          } else {
            toast("Worldwide account created and connected.");
            showProfileManager("cloud");
          }
        } catch (error) { errorNode.textContent = error.message || "Account creation failed."; }
      });
      on($("#cloudAliasForm"), "submit", async (event) => {
        event.preventDefault();
        const errorNode = $("#cloudAliasError");
        const clean = v16SanitizeUsername($("#cloudAlias")?.value);
        if (clean.length < 2) return errorNode.textContent = "Use at least 2 characters.";
        try {
          await v16CloudUpsertAlias(clean);
          v16UpdateProfile(active.id, { username: clean });
          toast("Worldwide username updated.");
          showProfileManager("cloud");
        } catch (error) { errorNode.textContent = error.message || "Username could not be saved."; }
      });
      on($("#globalShareToggle"), "change", async (event) => {
        const enabled = event.target.checked;
        v16UpdateProfile(active.id, { globalShare: enabled });
        if (!enabled) {
          toast("Worldwide score publishing disabled. Existing published records remain in the public rankings.");
          return;
        }
        try {
          if (Number(active.bestScore || 0) > 0) {
            const score = await v163PublishSavedBest(active);
            toast(`Worldwide publishing enabled. ${score.toLocaleString()} points synchronized.`);
          } else {
            toast("Worldwide publishing enabled. Finish a scored run to receive a rank.");
          }
          showProfileManager("cloud");
        } catch (error) {
          const errorNode = $("#globalSyncError");
          if (errorNode) errorNode.textContent = v162FriendlyOnlineError(error);
          else toast(v162FriendlyOnlineError(error));
        }
      });
      on($("#publishBestNowBtn"), "click", async () => {
        const button = $("#publishBestNowBtn");
        const errorNode = $("#globalSyncError");
        if (button) button.disabled = true;
        if (errorNode) errorNode.textContent = "Publishing saved best…";
        try {
          const score = await v163PublishSavedBest(active);
          toast(`${score.toLocaleString()} points published worldwide.`);
          showProfileManager("cloud");
        } catch (error) {
          if (button) button.disabled = false;
          if (errorNode) errorNode.textContent = v162FriendlyOnlineError(error);
        }
      });
      on($("#openMultiplayerBtn"), "click", () => v16RequireUnlocked(showMultiplayerLobby));
      on($("#cloudSignOutBtn"), "click", async () => { await v16CloudSignOut(); showProfileManager("cloud"); toast("Signed out of worldwide play."); });
    }

    if (tab === "danger") {
      on($("#renameAccountBtn"), "click", () => showProfileAction("rename", active.id));
      on($("#deleteAccountBtn"), "click", () => showProfileAction("delete", active.id));
    }
  }

  function showProfileAction(action, profileId, returnToPending = false) {
    const profile = v16GetProfiles().find((item) => item.id === profileId);
    if (!profile) return showProfileManager();
    const copy = {
      use: ["Unlock Profile", `Enter ${profile.username}'s password to use this profile.`],
      rename: ["Rename Profile", "Verify the current password, then choose a new username."],
      delete: ["Delete Profile", "Verify the password and type the username to confirm permanent local deletion."],
      change: ["Change Password", "Verify the current password, then create a new strong password."]
    }[action] || ["Verify Password", "Enter the current password."];
    render(`
      <section class="screen profile-action-screen">${topbar()}<div class="panel profile-action-panel">
        <span class="eyebrow">Protected action</span><h2>${esc(copy[0])}</h2><p>${esc(copy[1])}</p>
        <form class="account-form" id="profileActionForm">
          <div class="profile-action-identity"><div class="profile-avatar">${esc(profile.username.slice(0,1).toUpperCase())}</div><div><strong>${esc(profile.username)}</strong><span>Password-protected local profile</span></div></div>
          <label><span>Current password</span><div class="password-input-wrap"><input id="actionPassword" type="password" autocomplete="current-password" autofocus required><button type="button" data-toggle-password="actionPassword">Show</button></div></label>
          ${action === "rename" ? `<label><span>New username</span><input id="actionNewName" maxlength="18" value="${esc(profile.username)}" required></label>` : ""}
          ${action === "delete" ? `<label><span>Type “${esc(profile.username)}” to confirm</span><input id="actionDeleteConfirm" autocomplete="off" required></label>` : ""}
          ${action === "change" ? `<label><span>New password</span><div class="password-input-wrap"><input id="actionNewPassword" type="password" autocomplete="new-password" required><button type="button" data-toggle-password="actionNewPassword">Show</button></div></label><label><span>Confirm new password</span><div class="password-input-wrap"><input id="actionNewPasswordConfirm" type="password" autocomplete="new-password" required><button type="button" data-toggle-password="actionNewPasswordConfirm">Show</button></div></label>${v16PasswordChecklistHtml(profile.username, "actionNewPassword")}` : ""}
          <p class="form-error" id="actionError" role="alert"></p>
          <div class="button-row"><button type="button" class="btn" id="cancelActionBtn">Cancel</button><button type="submit" class="btn ${action === "delete" ? "btn-danger" : "btn-primary"}">${esc(copy[0])}</button></div>
        </form>
      </div></section>`);
    wireTopbar();
    v16WirePasswordReveal();
    if (action === "change") v16WirePasswordStrength($("#actionNewPassword"), profile.username);
    on($("#cancelActionBtn"), "click", () => returnToPending ? showHome() : showProfileManager(action === "use" ? "profiles" : action === "change" ? "security" : "danger"));
    on($("#profileActionForm"), "submit", async (event) => {
      event.preventDefault();
      const errorNode = $("#actionError");
      try {
        await v16VerifyProfilePassword(profile, $("#actionPassword")?.value || "");
        V16_SECURITY.unlockedProfiles.add(profile.id);
        if (action === "use") {
          localStorage.setItem(V16_STORAGE.activeProfile, profile.id);
          toast(`${profile.username} is unlocked.`);
          if (V16_SECURITY.pendingAction) return v16RunPendingAction();
          return showHome();
        }
        if (action === "rename") {
          const clean = v16SanitizeUsername($("#actionNewName")?.value);
          const duplicate = v16GetProfiles().some((item) => item.id !== profile.id && item.username.toLowerCase() === clean.toLowerCase());
          if (clean.length < 2 || duplicate) throw new Error(duplicate ? "That username is already used on this device." : "Use at least 2 characters.");
          v16UpdateProfile(profile.id, { username: clean });
          if (V16_ONLINE.user && profile.id === v16GetActiveProfile().id) await v16CloudUpsertAlias(clean).catch(() => {});
          toast("Profile renamed.");
          return showProfileManager("danger");
        }
        if (action === "delete") {
          if (($("#actionDeleteConfirm")?.value || "") !== profile.username) throw new Error("The confirmation username does not match.");
          if (!v16DeleteProfile(profile.id)) throw new Error("At least one local profile must remain.");
          V16_SECURITY.unlockedProfiles.delete(profile.id);
          toast("Local profile deleted.");
          return showProfileManager("profiles");
        }
        if (action === "change") {
          const next = $("#actionNewPassword")?.value || "";
          if (next !== ($("#actionNewPasswordConfirm")?.value || "")) throw new Error("The new passwords do not match.");
          await v16SetProfilePassword(profile.id, next);
          toast("Password changed and profile unlocked.");
          return showProfileManager("security");
        }
      } catch (error) { errorNode.textContent = error.message || "Password verification failed."; }
    });
  }

  function showOnlineSetupHelp() {
    render(`
      <section class="screen">${topbar()}<div class="panel online-setup-panel">
        <span class="eyebrow">Free worldwide setup</span><h1>Connect Supabase once, then scores and VS work globally.</h1>
        <div class="setup-checklist">
          <article><span>1</span><div><strong>Create a free Supabase project</strong><p>The free plan is enough for development and a modest pilot.</p></div></article>
          <article><span>2</span><div><strong>Run the included SQL</strong><p>Open SQL Editor, paste the Global Setup SQL from the code portal, and run it once.</p></div></article>
          <article><span>3</span><div><strong>Paste two public values</strong><p>Put the Project URL and public anonymous key in FFindex.html. Never use the service-role key in browser code.</p></div></article>
          <article><span>4</span><div><strong>Host the four files</strong><p>Use GitHub Pages, Netlify, Cloudflare Pages, or another HTTPS host. Every player must open the same deployed site.</p></div></article>
          <article><span>5</span><div><strong>Test two browsers or devices</strong><p>Create a room in one browser, join with the six-character code in another browser, and start when at least two players appear.</p></div></article>
        </div>
        <div class="privacy-note"><strong>What becomes public?</strong><p>Only the chosen profile name, score, room status, and match progress are public. No email is requested, and local password hashes never leave the browser.</p></div>
        <div class="button-row"><button class="btn" id="setupBackBtn">Back to Account Settings</button></div>
      </div></section>`);
    wireTopbar();
    on($("#setupBackBtn"), "click", () => showProfileManager("cloud"));
  }

  function showHow() {
    const sections = [
      ["🎮", "Choose a mode", "Full Arcade plays 34 randomized rounds plus the boss. Demo teaches five varied games. Practice opens one library challenge. Online Rooms let 2–8 players enter one short code and race through the same rounds."],
      ["⚡", "Read the command first", "Every microgame begins with a command and a short instruction. Action games remain paused behind a READY screen until you press Start Game."],
      ["🛡️", "Protect Trust", "Correct decisions raise score and combos. Unsafe choices reduce the Trust Shield and increase Fraudster Pressure. If Trust reaches zero, the run ends."],
      ["⌨️", "Computer controls", "Use the mouse or trackpad for choices. Movement games support arrow keys or WASD; Space or the shown action button handles jumps and actions."],
      ["📱", "Phone and tablet controls", "Tap large controls, swipe only when instructed, and rotate freely between portrait and landscape. Drag games also include tap-then-tap alternatives."],
      ["📐", "Motion Tilt", "Choose Motion Tilt from settings, grant motion permission, hold the phone naturally, and press Calibrate Tilt. Touch buttons remain available as a backup."],
      ["🔍", "Use powerups", "Iris gives a challenge-specific clue, Freeze stops the current timer, and Shield restores Trust. Powerups are limited, so save them for difficult rounds."],
      ["🏆", "Scores and accounts", "Local results save to the protected profile. Online Play connects that unlocked profile anonymously, can publish opted-in scores, and supports live room standings for 2–8 players."],
      ["🔐", "Privacy and safety", "Use a gamer tag rather than a legal name. Local passwords are salted and hashed. Online Play creates a hidden anonymous Supabase identity, so the game never asks for an email or phone number."]
    ];
    render(`
      <section class="screen">${topbar()}<div class="panel how-panel">
        <header class="how-hero"><div><span class="eyebrow">Complete player guide</span><h1>How Scam Sprint actually works.</h1><p>This guide separates modes, controls, scoring, powerups, accounts, and privacy so players do not have to guess.</p></div><button class="btn btn-primary" id="howStartBtn">Choose a Game Mode</button></header>
        <div class="how-grid">${sections.map(([icon,title,copy],index)=>`<article class="how-card"><span class="how-number">${index+1}</span><div class="how-icon">${icon}</div><strong>${esc(title)}</strong><p>${esc(copy)}</p></article>`).join("")}</div>
        <section class="control-reference"><h2>Fast control reference</h2><div><span>Mouse / Tap</span><b>Select, close, report, verify</b></div><div><span>← → or A D</span><b>Move sideways</b></div><div><span>↑ ↓ or W S</span><b>Move in mazes</b></div><div><span>Space / Jump</span><b>Jump or confirm action</b></div><div><span>Phone Tilt</span><b>Optional steering after permission</b></div></section>
        <div class="button-row"><button class="btn" id="howBackBtn">Back Home</button><button class="btn btn-demo" id="howDemoBtn">Try 5-Game Demo</button><button class="btn btn-secondary" id="howVsBtn">Open Global VS</button></div>
      </div></section>`);
    wireTopbar();
    on($("#howBackBtn"), "click", showHome);
    on($("#howStartBtn"), "click", () => v16RequireUnlocked(showSetup));
    on($("#howDemoBtn"), "click", () => v16RequireUnlocked(showDemoMode));
    on($("#howVsBtn"), "click", () => v16RequireUnlocked(showMultiplayerLobby));
  }

  function showHome() {
    clearLoops();
    v16InstallRuntimeOnce();
    document.body.classList.remove("game-active");
    const profile = v16GetActiveProfile();
    const progress = profile.progress;
    const protectedProfile = v16ProfileHasPassword(profile);
    const unlocked = v16IsProfileUnlocked(profile.id);
    const globalStatus = v16GlobalConfigured() ? (V16_ONLINE.user ? "No-email Online Play connected" : "Online Play ready to connect") : "Online setup available";
    render(`
      <section class="screen">${topbar()}<div class="panel home-grid">
        <div>
          <div class="home-profile-line"><span class="eyebrow">FraudFront awareness arcade</span><button class="profile-chip account-chip-large" id="profileBtn" title="Open Account Settings">${unlocked ? "🔓" : "🔒"} ${esc(profile.username)} · Account Settings</button></div>
          <h1><span class="home-title-accent">Scam Sprint</span><br>Microgames against The Fraudster.</h1>
          <p>A fast scam-safety arcade with mock websites, social engineering, file cleanup, movement challenges, touch controls, motion tilt, randomized bosses, protected profiles, worldwide scores, and optional no-email multiplayer rooms.</p>
          <p>All ${DATA.site.totalPlayableRounds} games remain intact. V16.2 keeps V16.1 and adds no-email online rooms around the existing game rather than replacing it.</p>
          ${!protectedProfile ? `<div class="home-security-alert"><strong>🔐 Password setup required</strong><span>Protect ${esc(profile.username)} before starting or resuming a game.</span><button class="btn btn-primary btn-small" id="secureProfileBtn">Secure Profile</button></div>` : `<div class="home-security-status ${unlocked ? "unlocked" : "locked"}"><strong>${unlocked ? "🔓 Profile unlocked for this session" : "🔒 Profile locked"}</strong><span>${unlocked ? "Games and saved progress are ready." : "Starting a game will ask for the password."}</span></div>`}
          <div class="home-mode-grid">
            <button class="home-mode-card primary" id="startBtn"><span>🎮</span><strong>Full Arcade</strong><small>${DATA.site.arcadeRoundsBeforeBoss} random games + boss</small></button>
            <button class="home-mode-card demo" id="demoBtn"><span>⚡</span><strong>5-Game Demo</strong><small>Quick guided sampler</small></button>
            <button class="home-mode-card versus" id="multiplayerBtn"><span>🌎</span><strong>Online Rooms</strong><small>Create or join with a 6-character code</small></button>
            ${progress ? `<button class="home-mode-card resume" id="resumeBtn"><span>▶</span><strong>Resume</strong><small>Continue saved ${progress.runMode === "demo" ? "demo" : "arcade"}</small></button>` : `<button class="home-mode-card library" id="libraryBtn"><span>🗂️</span><strong>Game Library</strong><small>Browse all ${DATA.site.totalPlayableRounds}</small></button>`}
          </div>
          <div class="button-row home-secondary-actions"><button class="btn btn-secondary" id="accountBtn">⚙️ Account Settings</button><button class="btn btn-secondary" id="leaderboardBtn">🏆 Leaderboards</button><button class="btn btn-secondary" id="howBtn">❓ How to Play</button>${progress ? `<button class="btn btn-secondary" id="libraryBtn">🗂️ Full Library</button>` : ""}</div>
          <div class="stats-strip"><div><strong>${DATA.site.totalPlayableRounds}</strong><span>playable rounds</span></div><div><strong>${DATA.site.totalMechanics}</strong><span>mechanics</span></div><div><strong>${Number(profile.bestScore||0).toLocaleString()}</strong><span>best score</span></div><div><strong>${Number(profile.vsWins||0)}</strong><span>VS wins</span></div></div>
        </div>
        <div class="home-side-stack">
          <div class="fraudster-stage" aria-hidden="true"><div class="fraudster-face"><span class="eye"></span><span class="eye-right"></span><span class="mouth"></span></div><div class="hero-card-label"><span class="chip chip-hot">Fraudster pressure rising</span><div class="meter meter-danger"><span style="width:72%"></span></div></div></div>
          <section class="home-leaderboard-card"><div class="leaderboard-card-head"><strong>🏆 Worldwide Top Players</strong><span>${esc(globalStatus)}</span></div><div class="mini-ranks" id="homeGlobalPreview">${v16HomeLeaderboardPreview()}</div><button class="btn btn-secondary" id="leaderboardSideBtn">Open Full Leaderboards</button></section>
        </div>
      </div></section>`);
    wireTopbar();
    on($("#secureProfileBtn"), "click", () => showProfileManager("security"));
    on($("#profileBtn"), "click", () => showProfileManager("profiles"));
    on($("#accountBtn"), "click", () => showProfileManager("profiles"));
    on($("#startBtn"), "click", () => v16RequireUnlocked(showSetup));
    on($("#demoBtn"), "click", () => v16RequireUnlocked(showDemoMode));
    on($("#multiplayerBtn"), "click", () => v16RequireUnlocked(showMultiplayerLobby));
    on($("#resumeBtn"), "click", () => v16RequireUnlocked(v16ResumeProgress));
    on($("#leaderboardBtn"), "click", showLeaderboard);
    on($("#leaderboardSideBtn"), "click", showLeaderboard);
    on($("#howBtn"), "click", showHow);
    on($("#libraryBtn"), "click", showLibrary);
    v16HydrateHomeGlobalPreview();
  }

  async function v16HydrateHomeGlobalPreview() {
    const host = $("#homeGlobalPreview");
    if (!host || !v16GlobalConfigured()) return;
    try {
      const rows = await v16FetchGlobalLeaderboard(3);
      if (!$("#homeGlobalPreview")) return;
      host.innerHTML = rows.length ? rows.map((row,index)=>`<div class="mini-rank"><span>${Number(row.rank_position || index + 1)}</span><strong>${esc(row.username)}</strong><b>${Number(row.score||0).toLocaleString()}</b></div>`).join("") : `<p class="muted">No published worldwide scores yet.</p>`;
    } catch { /* local preview remains available */ }
  }

  function showLeaderboard() {
    const localRows = v16GetLocalLeaderboard();
    const active = v16GetActiveProfile();
    render(`
      <section class="screen">${topbar()}<div class="panel leaderboard-panel">
        <div class="leaderboard-hero"><div><span class="eyebrow">Persistent rankings</span><h1>Local and worldwide defenders.</h1><p>Local scores stay on this browser. Worldwide scores remain in the connected database and can be seen by players on other devices.</p></div><div class="leaderboard-actions"><button class="btn" id="backBtn">Back Home</button><button class="btn btn-secondary" id="profilesBtn">Account Settings</button><button class="btn btn-primary" id="versusBtn">Global VS Lobby</button></div></div>
        <div class="leaderboard-columns"><section class="leaderboard-board"><div class="leaderboard-title"><strong>💾 This Device</strong><span>${localRows.length} protected profile${localRows.length===1?"":"s"}</span></div>${v16LeaderboardRows(localRows,"Finish a run to create the first score.")}</section><section class="leaderboard-board"><div class="leaderboard-title"><strong>🌎 Worldwide</strong><span>${v16GlobalConfigured()?"Persistent database":"Setup required"}</span></div><div id="globalLeaderboardHost"></div></section></div>
        <div class="privacy-note compact"><strong>Worldwide rankings are canonical</strong><p>Only players with a published score appear worldwide. Rank is calculated in the shared Supabase database, so every browser receives the same order. “This Device” remains intentionally different because it contains only profiles stored in that browser.</p></div>
      </div></section>`);
    wireTopbar();
    on($("#motionEnableBtn"), "click", async () => {
      const enabled = await v16EnableMotionControls();
      if (enabled) {
        const motion = $('input[name="deviceMode"][value="motion"]');
        if (motion) motion.checked = true;
      }
    });
    on($("#motionCalibrateBtn"), "click", v16CalibrateTilt);
    on($("#backBtn"), "click", showHome);
    on($("#profilesBtn"), "click", () => showProfileManager("profiles"));
    on($("#versusBtn"), "click", () => v16RequireUnlocked(showMultiplayerLobby));
    v16HydrateGlobalLeaderboard();
  }

  function v161LegacyHud() {
    const progress = clamp(Math.round((state.idx / Math.max(1, state.selected.length)) * 100), 0, 100);
    const match = V16_ONLINE.match;
    const versus = state.runMode === "versus" && match ? `
      <div class="versus-hud" id="versusHud">
        <div><span>You · ${esc(v16GetActiveProfile().username)}</span><strong id="vsYourScore">${Number(state.score||0).toLocaleString()}</strong></div>
        <span class="versus-badge">LIVE VS</span>
        <div><span>${esc(match.opponentUsername || "Opponent")}</span><strong id="vsOpponentScore">${Number(match.opponentScore||0).toLocaleString()}</strong><small id="vsOpponentRound">Round ${Number(match.opponentRound||0)}/${state.selected.length}</small></div>
      </div>` : "";
    return `
      ${versus}
      <div class="hud">
        <div class="hud-bars">${meterRow("Round Progress",progress,"meter-progress","progressBar")}${state.playerMode==="senior"?"":meterRow("Timer",state.timeLeft,"meter-time","timeBar")}${meterRow("Trust Shield",state.trust,"meter-good","trustBar")}${meterRow("Fraudster Pressure",state.fraudster,"meter-danger","fraudBar")}</div>
        <div class="hud-stats"><div class="stat-pill">Score <strong>${state.score}</strong></div><div class="stat-pill">Combo <strong>${state.streak}</strong></div><div class="stat-pill">Mistakes <strong>${state.mistakes}</strong></div></div>
      </div>`;
  }

  function v161LegacyUpdateVersusHud() {
    const match = V16_ONLINE.match;
    if (!match) return;
    const yourScore = $("#vsYourScore");
    const opponentScore = $("#vsOpponentScore");
    const opponentRound = $("#vsOpponentRound");
    if (yourScore) yourScore.textContent = Number(state.score || 0).toLocaleString();
    if (opponentScore) opponentScore.textContent = Number(match.opponentScore || 0).toLocaleString();
    if (opponentRound) opponentRound.textContent = `${match.opponentFinished ? "Finished" : "Round"} ${Number(match.opponentRound || 0)}/${state.selected.length}`;
  }

  function v16SelectVersusRounds() {
    const allowed = new Set(["safeChoice","dangerWebsite","siteInspector","romanceSwipe","marketplaceMatch","deepfakeCall","deepfakeSpot","gameChatReport","lobbyMute","qrScan","mfaShield","permissionToggle","permissionsToggle","moneyGuard","categoryMatch","safeWordChallenge","familyCallOrder"]);
    const pool = ROUNDS.filter((round) => allowed.has(round.type) && !["bossRush","legacyBossRush"].includes(round.type));
    const buckets = [
      ["safeChoice","deepfakeCall","deepfakeSpot"],
      ["dangerWebsite","siteInspector","qrScan"],
      ["romanceSwipe","marketplaceMatch","gameChatReport","lobbyMute"],
      ["mfaShield","permissionToggle","permissionsToggle"],
      ["moneyGuard","categoryMatch","safeWordChallenge","familyCallOrder"]
    ];
    const ids = [];
    const used = new Set();
    buckets.forEach((types) => {
      const choice = sample(pool.filter((round) => types.includes(round.type) && !used.has(round.id)),1)[0];
      if (choice) { ids.push(choice.id); used.add(choice.id); }
    });
    while (ids.length < 5) {
      const choice = sample(pool.filter((round) => !used.has(round.id)),1)[0];
      if (!choice) break;
      ids.push(choice.id); used.add(choice.id);
    }
    return ids.slice(0,5);
  }

  function v16DisconnectLobby() {
    const client = V16_ONLINE.client;
    if (client && V16_ONLINE.lobbyChannel) client.removeChannel(V16_ONLINE.lobbyChannel).catch?.(()=>{});
    V16_ONLINE.lobbyChannel = null;
    V16_ONLINE.lobbyPlayers.clear();
    V16_ONLINE.lobbyStatus = "offline";
  }

  function v16LobbyPresencePlayers() {
    const channel = V16_ONLINE.lobbyChannel;
    if (!channel) return [];
    const stateMap = channel.presenceState() || {};
    const rows = [];
    Object.values(stateMap).forEach((entries) => {
      (Array.isArray(entries) ? entries : []).forEach((entry) => {
        if (entry?.user_id) rows.push(entry);
      });
    });
    const unique = new Map();
    rows.forEach((row) => unique.set(row.user_id, row));
    return [...unique.values()];
  }

  function v16RenderLobbyPlayers() {
    const host = $("#activePlayersHost");
    const count = $("#activePlayerCount");
    if (!host) return;
    const me = V16_ONLINE.user?.id;
    const players = v16LobbyPresencePlayers().filter((player) => player.user_id !== me);
    if (count) count.textContent = String(players.length + (me ? 1 : 0));
    host.innerHTML = players.length ? players.map((player) => `
      <article class="online-player-card ${player.status === "in_match" ? "busy" : ""}">
        <div class="online-dot"></div><div><strong>${esc(player.username || "Player")}</strong><span>${player.status === "in_match" ? "In a match" : "Available now"} · Best ${Number(player.best_score||0).toLocaleString()}</span></div>
        <button class="btn btn-primary btn-small" data-challenge-player="${esc(player.user_id)}" data-challenge-name="${esc(player.username||"Player")}" ${player.status === "in_match" ? "disabled" : ""}>Challenge</button>
      </article>`).join("") : `<div class="lobby-empty"><strong>No other available players yet.</strong><p>Keep this lobby open. Another signed-in browser using the same deployed game will appear here automatically.</p></div>`;
    $$('[data-challenge-player]').forEach((button) => on(button,"click",()=>v16ChallengePlayer(button.dataset.challengePlayer,button.dataset.challengeName)));
  }

  function v16RenderChallengePanel() {
    const host = $("#challengeHost");
    if (!host) return;
    if (V16_ONLINE.incomingChallenge) {
      const item = V16_ONLINE.incomingChallenge;
      host.innerHTML = `<div class="incoming-challenge"><span>⚔️</span><div><strong>${esc(item.fromUsername)} challenged you!</strong><p>Five identical randomized rounds. Highest score wins.</p></div><button class="btn btn-good" id="acceptChallengeBtn">Accept</button><button class="btn btn-danger" id="declineChallengeBtn">Decline</button></div>`;
      on($("#acceptChallengeBtn"),"click",()=>v16RespondChallenge(true));
      on($("#declineChallengeBtn"),"click",()=>v16RespondChallenge(false));
      return;
    }
    if (V16_ONLINE.outgoingChallenge) {
      host.innerHTML = `<div class="outgoing-challenge"><span>⏳</span><div><strong>Challenge sent to ${esc(V16_ONLINE.outgoingChallenge.toUsername)}</strong><p>Waiting for a response…</p></div><button class="btn btn-secondary" id="cancelChallengeBtn">Cancel</button></div>`;
      on($("#cancelChallengeBtn"),"click",()=>{V16_ONLINE.outgoingChallenge=null;v16RenderChallengePanel();});
      return;
    }
    host.innerHTML = `<div class="challenge-tip"><strong>Choose an available player.</strong><span>Both players receive the same five round IDs and live score updates.</span></div>`;
  }

  async function v16ConnectLobby() {
    const client = v16SupabaseClient();
    if (!client || !V16_ONLINE.user) return;
    if (V16_ONLINE.lobbyChannel) {
      v16RenderLobbyPlayers();
      return;
    }
    const config = v16GetGlobalConfig();
    const profile = v16GetActiveProfile();
    const channel = client.channel(config.lobbyChannel, { config: { presence: { key: V16_ONLINE.user.id }, broadcast: { self: true } } });
    V16_ONLINE.lobbyChannel = channel;
    channel.on("presence", { event: "sync" }, v16RenderLobbyPlayers)
      .on("presence", { event: "join" }, v16RenderLobbyPlayers)
      .on("presence", { event: "leave" }, v16RenderLobbyPlayers)
      .on("broadcast", { event: "challenge" }, ({ payload }) => {
        if (payload?.toUserId !== V16_ONLINE.user?.id || payload?.fromUserId === V16_ONLINE.user?.id) return;
        if (V16_ONLINE.match) return;
        V16_ONLINE.incomingChallenge = payload;
        v16RenderChallengePanel();
        sfx("boss");
        toast(`${payload.fromUsername} challenged you to Global VS.`);
      })
      .on("broadcast", { event: "challenge_response" }, ({ payload }) => {
        if (payload?.toUserId !== V16_ONLINE.user?.id) return;
        if (!V16_ONLINE.outgoingChallenge || payload.challengeId !== V16_ONLINE.outgoingChallenge.challengeId) return;
        V16_ONLINE.outgoingChallenge = null;
        if (payload.accepted) v16BeginVersusMatch(payload);
        else { toast(`${payload.fromUsername} declined the challenge.`); v16RenderChallengePanel(); }
      });
    channel.subscribe(async (status) => {
      V16_ONLINE.lobbyStatus = status;
      const statusNode = $("#lobbyConnectionStatus");
      if (statusNode) statusNode.textContent = status === "SUBSCRIBED" ? "Connected live" : status;
      if (status === "SUBSCRIBED") {
        await channel.track({
          user_id: V16_ONLINE.user.id,
          username: profile.username,
          best_score: Number(profile.bestScore || 0),
          status: "available",
          online_at: v16NowIso()
        });
        v16RenderLobbyPlayers();
      }
    });
  }

  async function v16ChallengePlayer(userId, username) {
    if (!V16_ONLINE.lobbyChannel || V16_ONLINE.outgoingChallenge) return;
    const profile = v16GetActiveProfile();
    const payload = {
      challengeId: v16Uuid(),
      fromUserId: V16_ONLINE.user.id,
      fromUsername: profile.username,
      toUserId: userId,
      toUsername: username,
      roundIds: v16SelectVersusRounds(),
      createdAt: Date.now()
    };
    V16_ONLINE.outgoingChallenge = payload;
    v16RenderChallengePanel();
    await V16_ONLINE.lobbyChannel.send({ type: "broadcast", event: "challenge", payload });
  }

  async function v16RespondChallenge(accepted) {
    const challenge = V16_ONLINE.incomingChallenge;
    if (!challenge || !V16_ONLINE.lobbyChannel) return;
    V16_ONLINE.incomingChallenge = null;
    const response = {
      ...challenge,
      accepted,
      fromUserId: V16_ONLINE.user.id,
      fromUsername: v16GetActiveProfile().username,
      toUserId: challenge.fromUserId,
      toUsername: challenge.fromUsername,
      opponentUserId: challenge.fromUserId,
      opponentUsername: challenge.fromUsername,
      startAt: Date.now() + 5000
    };
    await V16_ONLINE.lobbyChannel.send({ type: "broadcast", event: "challenge_response", payload: response });
    if (accepted) v16BeginVersusMatch({ ...response, opponentUserId: challenge.fromUserId, opponentUsername: challenge.fromUsername });
    else { toast("Challenge declined."); v16RenderChallengePanel(); }
  }

  async function v161LegacyShowMultiplayerLobby() {
    v16InstallRuntimeOnce();
    if (!v16GlobalConfigured()) return showOnlineSetupHelp();
    try { await v16RefreshCloudSession(); } catch { /* handled below */ }
    if (!V16_ONLINE.user) {
      V16_SECURITY.accountMessage = "Sign in to a worldwide account before entering Global VS.";
      return showProfileManager("cloud");
    }
    render(`
      <section class="screen multiplayer-screen">${topbar()}<div class="panel multiplayer-panel">
        <header class="multiplayer-hero"><div><span class="eyebrow">Live worldwide competition</span><h1>Global VS Lobby</h1><p>See signed-in players who are online now, challenge one, and race through the same five randomized Scam Sprint rounds.</p></div><div class="lobby-status-card"><span class="online-dot"></span><strong id="lobbyConnectionStatus">Connecting…</strong><small><b id="activePlayerCount">1</b> active player(s)</small></div></header>
        <div id="challengeHost" class="challenge-host"></div>
        <div class="multiplayer-layout"><section class="active-player-board"><div class="leaderboard-title"><strong>🟢 Active Players</strong><span>Username shown publicly while this lobby is open</span></div><div id="activePlayersHost" class="online-player-list"><div class="leaderboard-loading">Connecting to live presence…</div></div></section><aside class="versus-rules"><h2>How VS works</h2><ol><li>Challenge an available username.</li><li>Both players receive the same five round IDs.</li><li>Scores and round progress update live.</li><li>The highest final score wins; ties are recorded.</li><li>Leaving the lobby removes your online presence.</li></ol><div class="privacy-note"><strong>Public during lobby</strong><p>Username, availability, best score, current round, and match score. Email and passwords remain private.</p></div></aside></div>
        <div class="button-row"><button class="btn" id="leaveLobbyBtn">Leave Lobby</button><button class="btn btn-secondary" id="lobbyLeaderboardBtn">Worldwide Leaderboard</button><button class="btn btn-secondary" id="lobbyAccountBtn">Account Settings</button></div>
      </div></section>`);
    wireTopbar();
    v16RenderChallengePanel();
    on($("#leaveLobbyBtn"),"click",()=>{v16DisconnectLobby();showHome();});
    on($("#lobbyLeaderboardBtn"),"click",()=>{v16DisconnectLobby();showLeaderboard();});
    on($("#lobbyAccountBtn"),"click",()=>{v16DisconnectLobby();showProfileManager("cloud");});
    on($("#homeBtn"),"click",v16DisconnectLobby);
    v16ConnectLobby();
  }

  function v16BeginVersusMatch(payload) {
    const currentUserId = V16_ONLINE.user?.id;
    const currentIsSender = payload.fromUserId === currentUserId;
    const opponentUserId = currentIsSender ? payload.toUserId : payload.fromUserId;
    const opponentUsername = currentIsSender ? payload.toUsername : payload.fromUsername;
    const match = {
      matchId: payload.challengeId,
      roundIds: payload.roundIds || v16SelectVersusRounds(),
      opponentUserId,
      opponentUsername,
      startAt: Number(payload.startAt || Date.now() + 4000),
      opponentScore: 0,
      opponentRound: 0,
      opponentFinished: false,
      localFinished: false,
      localScore: 0,
      channel: null,
      submitted: false,
      localRecorded: false
    };
    V16_ONLINE.match = match;
    V16_ONLINE.lobbyChannel?.track({ user_id: V16_ONLINE.user.id, username: v16GetActiveProfile().username, best_score: Number(v16GetActiveProfile().bestScore||0), status: "in_match", online_at: v16NowIso() });
    v16ConnectMatchChannel(match);
  }

  function v16ConnectMatchChannel(match) {
    const client = v16SupabaseClient();
    if (!client) return;
    const channel = client.channel(`ff-match-${match.matchId}`, { config: { presence: { key: V16_ONLINE.user.id }, broadcast: { self: false } } });
    match.channel = channel;
    channel.on("broadcast", { event: "progress" }, ({ payload }) => {
      if (payload?.userId === V16_ONLINE.user?.id) return;
      match.opponentScore = Number(payload.score || 0);
      match.opponentRound = Number(payload.round || 0);
      v16UpdateVersusHud();
    }).on("broadcast", { event: "finish" }, ({ payload }) => {
      if (payload?.userId === V16_ONLINE.user?.id) return;
      match.opponentScore = Number(payload.score || 0);
      match.opponentRound = match.roundIds.length;
      match.opponentFinished = true;
      v16UpdateVersusHud();
      v16FinalizeVersusOutcome();
    }).on("presence", { event: "leave" }, () => {
      const node = $("#versusWaitingText");
      if (node && !match.opponentFinished) node.textContent = "Opponent disconnected. You may return to the lobby.";
    });
    channel.subscribe(async (status) => {
      if (status !== "SUBSCRIBED") return;
      await channel.track({ user_id: V16_ONLINE.user.id, username: v16GetActiveProfile().username, ready: true });
      v16ShowVersusCountdown(match);
    });
  }

  function v16ShowVersusCountdown(match) {
    render(`
      <section class="screen versus-countdown-screen">${topbar()}<div class="panel versus-countdown-panel">
        <span class="eyebrow">Global VS match found</span><div class="versus-faceoff"><article><div class="profile-avatar">${esc(v16GetActiveProfile().username.slice(0,1).toUpperCase())}</div><strong>${esc(v16GetActiveProfile().username)}</strong><span>You</span></article><b>VS</b><article><div class="profile-avatar">${esc((match.opponentUsername||"O").slice(0,1).toUpperCase())}</div><strong>${esc(match.opponentUsername)}</strong><span>Worldwide opponent</span></article></div>
        <h1 id="versusCountdown">Get Ready</h1><p>Five matching rounds. Score quickly and accurately.</p><div class="versus-round-preview">${match.roundIds.map((id,index)=>{const round=ROUNDS.find((item)=>item.id===id);return `<span>${index+1}. ${esc(round?.category||"Challenge")}</span>`;}).join("")}</div>
      </div></section>`);
    wireTopbar();
    const node = $("#versusCountdown");
    let interval = null;
    let launched = false;
    const update = () => {
      const seconds = Math.max(0, Math.ceil((match.startAt - Date.now()) / 1000));
      if (node) node.textContent = seconds > 0 ? String(seconds) : "GO!";
      if (seconds <= 0 && !launched) {
        launched = true;
        if (interval) clearInterval(interval);
        setTimeout(v16StartVersusRun, 350);
      }
    };
    interval = setInterval(update, 250);
    update();
  }

  function v16StartVersusRun() {
    const match = V16_ONLINE.match;
    if (!match) return showMultiplayerLobby();
    const selected = match.roundIds.map((id)=>ROUNDS.find((round)=>round.id===id)).filter(Boolean);
    if (selected.length !== match.roundIds.length) return toast("This match could not load all shared rounds.");
    clearLoops();
    ensureAudio();
    v16NewRunState("versus");
    state.selected = selected;
    state.multiplayer = match;
    state.playerMode = "self";
    renderRound();
  }

  function v161LegacyBroadcastMatchProgress(success) {
    const match = V16_ONLINE.match;
    if (!match?.channel) return;
    match.localScore = Number(state.score || 0);
    match.channel.send({ type: "broadcast", event: "progress", payload: { userId: V16_ONLINE.user?.id, username: v16GetActiveProfile().username, score: match.localScore, round: state.idx + 1, success: Boolean(success), sentAt: Date.now() } }).catch?.(()=>{});
    v16UpdateVersusHud();
  }

  function v161LegacyShowVersusResults(lost) {
    const match = V16_ONLINE.match;
    if (!match) return showHome();
    match.localFinished = true;
    match.localScore = Number(state.score || 0);
    if (!match.localRecorded) {
      match.localRecorded = true;
      const profile = v16GetActiveProfile();
      const preliminary = match.opponentFinished ? (match.localScore === match.opponentScore ? "tie" : match.localScore > match.opponentScore ? "win" : "loss") : null;
      match.preliminaryResultRecorded = Boolean(preliminary);
      v16UpdateProfile(profile.id, {
        totalScore: Number(profile.totalScore || 0) + match.localScore,
        lastScore: match.localScore,
        lastPlayedAt: v16NowIso(),
        vsWins: Number(profile.vsWins || 0) + (preliminary === "win" ? 1 : 0),
        vsLosses: Number(profile.vsLosses || 0) + (preliminary === "loss" ? 1 : 0),
        vsTies: Number(profile.vsTies || 0) + (preliminary === "tie" ? 1 : 0)
      });
    }
    match.channel?.send({ type: "broadcast", event: "finish", payload: { userId: V16_ONLINE.user?.id, username: v16GetActiveProfile().username, score: match.localScore, round: match.roundIds.length, lost: Boolean(lost), sentAt: Date.now() } }).catch?.(()=>{});
    render(`
      <section class="screen versus-results-screen">${topbar()}<div class="panel versus-results-panel">
        <span class="eyebrow">Global VS results</span><h1 id="versusResultTitle">${match.opponentFinished ? "Final scores are in." : "You finished—waiting for your opponent."}</h1><p id="versusWaitingText">${match.opponentFinished ? "The higher score wins." : "Live opponent progress will update below."}</p>
        <div class="versus-scoreboard"><article><span>You</span><strong>${Number(match.localScore).toLocaleString()}</strong><b>${esc(v16GetActiveProfile().username)}</b></article><div class="versus-divider">VS</div><article><span>${match.opponentFinished ? "Finished" : "Playing"}</span><strong id="finalOpponentScore">${Number(match.opponentScore||0).toLocaleString()}</strong><b>${esc(match.opponentUsername)}</b></article></div>
        <div class="versus-outcome" id="versusOutcome"><div class="leaderboard-loading">${match.opponentFinished ? "Calculating result…" : "Waiting for opponent finish event…"}</div></div>
        <div class="button-row"><button class="btn btn-primary" id="returnLobbyBtn">Return to Global VS Lobby</button><button class="btn" id="versusHomeBtn">Home</button></div>
      </div></section>`);
    wireTopbar();
    on($("#returnLobbyBtn"),"click",()=>{v16ExitMatch();showMultiplayerLobby();});
    on($("#versusHomeBtn"),"click",()=>{v16ExitMatch();showHome();});
    v16FinalizeVersusOutcome();
  }

  function v16FinalizeVersusOutcome() {
    const match = V16_ONLINE.match;
    const host = $("#versusOutcome");
    if (!match || !host || !match.localFinished) return;
    const scoreNode = $("#finalOpponentScore");
    if (scoreNode) scoreNode.textContent = Number(match.opponentScore || 0).toLocaleString();
    if (!match.opponentFinished) return;
    const result = match.localScore === match.opponentScore ? "tie" : match.localScore > match.opponentScore ? "win" : "loss";
    const profile = v16GetActiveProfile();
    if (!match.resultApplied) {
      match.resultApplied = true;
      const prior = match.localRecorded ? { vsWins:Number(profile.vsWins||0),vsLosses:Number(profile.vsLosses||0),vsTies:Number(profile.vsTies||0) } : null;
      if (prior && !match.preliminaryResultRecorded) {
        // The opponent finished after this player; apply the result now exactly once.
        v16UpdateProfile(profile.id, {
          vsWins: Number(profile.vsWins || 0) + (result === "win" ? 1 : 0),
          vsLosses: Number(profile.vsLosses || 0) + (result === "loss" ? 1 : 0),
          vsTies: Number(profile.vsTies || 0) + (result === "tie" ? 1 : 0)
        });
      }
      v16SubmitMatchResult(match).catch(()=>{});
    }
    const title = $("#versusResultTitle");
    const wait = $("#versusWaitingText");
    if (title) title.textContent = result === "win" ? "You won the Global VS match!" : result === "loss" ? `${match.opponentUsername} won this match.` : "Global VS ended in a tie!";
    if (wait) wait.textContent = "Both final scores were received live.";
    host.innerHTML = `<div class="outcome-card ${result}"><span>${result === "win" ? "🏆" : result === "loss" ? "🛡️" : "🤝"}</span><strong>${result === "win" ? "Victory" : result === "loss" ? "Rematch Ready" : "Tie Game"}</strong><p>${Number(match.localScore).toLocaleString()} – ${Number(match.opponentScore).toLocaleString()}</p></div>`;
  }

  function v161LegacyExitMatch() {
    const client = V16_ONLINE.client;
    const match = V16_ONLINE.match;
    if (client && match?.channel) client.removeChannel(match.channel).catch?.(()=>{});
    V16_ONLINE.match = null;
    state.multiplayer = null;
    V16_ONLINE.lobbyChannel?.track({ user_id: V16_ONLINE.user?.id, username: v16GetActiveProfile().username, best_score: Number(v16GetActiveProfile().bestScore||0), status: "available", online_at: v16NowIso() });
  }




  /* ============================================================
     18D) V16.2 NO-EMAIL ONLINE PLAY + ROOM-CODE MULTIPLAYER
     ------------------------------------------------------------
     WHAT CHANGED:
     1) The old V16.1 email forms remain above as legacy code, but are
        no longer displayed or wired to the player interface.
     2) The unlocked local profile name is the public online username.
     3) Supabase Anonymous Auth creates a hidden authenticated identity.
     4) Players create/join 2–8 player rooms using a six-character code.
     5) Every room receives the same round IDs and synchronized start.
     6) Scores and round progress are stored and refreshed live.

     PRIVACY:
     - No email or phone number is requested by this V16.2 interface.
     - The existing local password still protects profile access.
     - Anonymous online sessions persist in this browser's storage.
     - Clearing browser storage loses that anonymous online identity.

     FREE BACKEND REQUIREMENTS:
     - Supabase > Authentication > User Signups:
         Allow new users to sign up = ON
         Allow anonymous sign-ins = ON
     - Run the V16.2 GLOBAL_SETUP.sql once.
     ============================================================ */

  V16_ONLINE.room = null;
  V16_ONLINE.roomChannel = null;
  V16_ONLINE.roomRefreshTimer = null;
  V16_ONLINE.roomHeartbeatTimer = null;

  function v162FriendlyOnlineError(error) {
    const message = String(error?.message || error || "Online Play could not connect.");
    if (/signup|signups|disabled|anonymous provider|anonymous sign/i.test(message)) {
      return "Supabase blocked the guest connection. Turn ON both ‘Allow new users to sign up’ and ‘Allow anonymous sign-ins’, press Save changes, then try again.";
    }
    if (/failed to fetch|network|load failed/i.test(message)) {
      return "The browser could not reach Supabase. Check the Project URL, public key, internet connection, and HTTPS hosting.";
    }
    if (/duplicate key|unique.*username|already exists/i.test(message)) {
      return "That public username is already connected to another online identity. Use Rename or Delete to choose a slightly different gamer tag.";
    }
    return message;
  }

  async function v162EnsureAnonymousOnlineSession() {
    const client = v16SupabaseClient();
    if (!client) throw new Error("Online Play is not configured. Add the Supabase Project URL and public publishable key in FFindex.html.");

    const profile = v16GetActiveProfile();
    if (!profile) throw new Error("Choose a Scam Sprint profile first.");
    if (!v16ProfileHasPassword(profile) || !v16IsProfileUnlocked(profile.id)) {
      throw new Error("Unlock the protected profile before connecting to Online Play.");
    }

    const { data: sessionData, error: sessionError } = await client.auth.getSession();
    if (sessionError) throw sessionError;

    if (sessionData?.session?.user) {
      V16_ONLINE.session = sessionData.session;
      V16_ONLINE.user = sessionData.session.user;
      await v16CloudUpsertAlias(profile.username);
      v16UpdateProfile(profile.id, {
        cloudUserId: V16_ONLINE.user.id,
        cloudEmailMasked: null,
        onlineAuthMode: V16_ONLINE.user.is_anonymous ? "anonymous" : "existing",
        globalShare: Boolean(profile.globalShare)
      });
      return sessionData.session;
    }

    const { data, error } = await client.auth.signInAnonymously({
      options: {
        data: {
          username: profile.username,
          display_name: profile.username,
          game: "Scam Sprint",
          auth_mode: "profile-name-only"
        }
      }
    });

    if (error) throw new Error(v162FriendlyOnlineError(error));
    if (!data?.session || !data?.user) throw new Error("Supabase did not return an anonymous session.");

    V16_ONLINE.session = data.session;
    V16_ONLINE.user = data.user;
    await v16CloudUpsertAlias(profile.username);
    v16UpdateProfile(profile.id, {
      cloudUserId: data.user.id,
      cloudEmailMasked: null,
      onlineAuthMode: "anonymous",
      globalShare: Boolean(profile.globalShare)
    });
    return data.session;
  }

  /* ============================================================
     V16.3 WORLDWIDE RANKING CONSISTENCY FIX
     ------------------------------------------------------------
     - Connecting creates an alias row, but that zero-score placeholder
       is no longer displayed by the SQL leaderboard.
     - Enabling publishing immediately synchronizes the profile's saved
       local best score without falsely adding another win.
     - The database now calculates canonical tied ranks.
     ============================================================ */
  async function v163PublishSavedBest(profile = v16GetActiveProfile()) {
    if (!profile) throw new Error("Choose a profile first.");
    await v162EnsureAnonymousOnlineSession();

    const bestScore = clamp(Number(profile.bestScore || 0), 0, 50000);
    const bestStreak = clamp(Number(profile.bestStreak || 0), 0, 100);
    if (bestScore <= 0) {
      throw new Error("Finish at least one scored run before publishing a worldwide rank.");
    }

    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    await v16CloudUpsertAlias(profile.username);
    const { error } = await client.rpc(config.submitRpc, {
      p_username: profile.username,
      p_score: bestScore,
      p_best_streak: bestStreak,
      /* Existing saved best is a synchronization, not a new victory. */
      p_won: false
    });
    if (error) throw error;

    v16UpdateProfile(profile.id, {
      globalShare: true,
      lastGlobalSyncScore: bestScore,
      lastGlobalSyncAt: v16NowIso()
    });
    return bestScore;
  }

  /* ============================================================
     V16.2 Account Navigation Override
     The V16.1 Account Settings layout is preserved; only the cloud tab
     is relabeled and its contents are replaced with no-email controls.
     ============================================================ */
  function v16AccountNav(activeTab) {
    const tabs = [
      ["profiles", "👥", "Profiles"],
      ["security", "🔐", "Password & Security"],
      ["cloud", "🌎", "Online Play"],
      ["danger", "⚙️", "Rename or Delete"]
    ];
    return `<nav class="account-nav" aria-label="Account settings sections">
      ${tabs.map(([key, icon, label]) => `<button class="account-nav-btn ${activeTab === key ? "active" : ""}" data-account-tab="${key}"><span>${icon}</span><strong>${label}</strong></button>`).join("")}
    </nav>`;
  }

  function v162OnlineAccountSection(active) {
    const configured = v16GlobalConfigured();
    const signedIn = Boolean(V16_ONLINE.user);
    const unlocked = v16IsProfileUnlocked(active.id);
    const shortId = V16_ONLINE.user?.id ? `${V16_ONLINE.user.id.slice(0, 6)}…${V16_ONLINE.user.id.slice(-4)}` : "Not connected";

    return `
      <section class="account-section online-play-section">
        <div class="account-section-head">
          <div>
            <span class="eyebrow">No-email Online Play</span>
            <h2>Play worldwide as ${esc(active.username)}.</h2>
            <p>Your existing protected profile name is your public gamer tag. No email, phone number, legal name, or second password is requested.</p>
          </div>
          <div class="account-security-badge ${signedIn ? "secure" : configured ? "attention" : "offline"}">${signedIn ? "🌎 Connected" : configured ? "Ready to connect" : "Setup needed"}</div>
        </div>

        ${!configured ? `
          <div class="cloud-setup-card">
            <strong>Connect the free Supabase backend first.</strong>
            <p>Add the Project URL and public publishable key to FFindex.html, enable anonymous sign-ins, and run the included V16.2 SQL. Local play remains available without it.</p>
            <button class="btn btn-secondary" id="openSetupHelpBtn">View Free Setup Checklist</button>
          </div>` : signedIn ? `
          <div class="online-connected-card">
            <div class="cloud-avatar">🌎</div>
            <div class="online-connected-copy">
              <strong>${esc(active.username)}</strong>
              <p>Connected privately through a hidden Supabase identity.</p>
              <span>Online ID ${esc(shortId)} · No email collected</span>
            </div>
            <span class="online-ready-pill">Ready</span>
          </div>

          <div class="online-action-grid">
            <article>
              <span>🎮</span><strong>Multiplayer Rooms</strong>
              <p>Create a short code or join friends. Two to eight people receive the same rounds and live standings.</p>
              <button class="btn btn-primary" id="openMultiplayerBtn">Create or Join a Room</button>
            </article>
            <article>
              <span>🏆</span><strong>Worldwide Scores</strong>
              <p>Choose whether completed full-arcade scores from this profile may appear publicly.</p>
              <div class="global-sync-summary"><span>Saved local best</span><strong>${Number(active.bestScore || 0).toLocaleString()}</strong><small>${active.lastGlobalSyncScore ? `Last worldwide sync: ${Number(active.lastGlobalSyncScore).toLocaleString()}` : "Not published yet"}</small></div>
              <label class="privacy-toggle global-share-large"><input id="globalShareToggle" type="checkbox" ${active.globalShare ? "checked" : ""}><span><strong>Publish completed full-run scores</strong><small>Shares gamer tag and game statistics only.</small></span></label>
              <button class="btn btn-good" id="publishBestNowBtn" ${Number(active.bestScore || 0) > 0 ? "" : "disabled"}>Publish My Current Best Now</button>
              <p class="form-error" id="globalSyncError" role="alert"></p>
            </article>
          </div>

          <div class="privacy-note compact">
            <strong>Your local password remains the only password you enter.</strong>
            <p>It protects this profile on this device. Supabase authentication is automatic and invisible after the profile is unlocked.</p>
          </div>
          <div class="button-row"><button class="btn btn-secondary" id="cloudSignOutBtn">Disconnect Online Play on This Browser</button></div>` : `
          <div class="online-simple-connect">
            <div class="online-connect-identity">
              <div class="profile-avatar">${esc(active.username.slice(0, 1).toUpperCase())}</div>
              <div><span>Playing online as</span><strong>${esc(active.username)}</strong><small>${unlocked ? "Profile is unlocked and ready." : "Unlock this profile first."}</small></div>
            </div>
            <div class="online-no-email-list">
              <span>✓ No email</span><span>✓ No phone number</span><span>✓ No second password</span><span>✓ Uses your existing gamer tag</span>
            </div>
            <button class="btn btn-good online-connect-button" id="anonymousConnectBtn" ${unlocked ? "" : "disabled"}>Connect ${esc(active.username)} for Online Play</button>
            <p class="form-error" id="anonymousConnectError" role="alert"></p>
          </div>
          <div class="privacy-note compact"><strong>Browser-based identity</strong><p>The hidden anonymous session persists in this browser. Clearing browser data or signing out creates a new online identity next time; no-email recovery is not possible through Supabase.</p></div>`}
      </section>`;
  }

  const v161AccountSectionHtml = v16AccountSectionHtml;
  v16AccountSectionHtml = function v162AccountSectionHtml(tab, profiles, active) {
    if (tab === "cloud") return v162OnlineAccountSection(active);
    return v161AccountSectionHtml(tab, profiles, active);
  };

  async function v162ConnectFromAccountButton(button) {
    const errorNode = $("#anonymousConnectError");
    if (button) button.disabled = true;
    if (errorNode) errorNode.textContent = "Connecting securely…";
    try {
      await v162EnsureAnonymousOnlineSession();
      toast(`Online Play connected as ${v16GetActiveProfile().username}.`);
      showProfileManager("cloud");
    } catch (error) {
      if (button) button.disabled = false;
      if (errorNode) errorNode.textContent = v162FriendlyOnlineError(error);
      else toast(v162FriendlyOnlineError(error));
    }
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest?.("#anonymousConnectBtn");
    if (!button) return;
    event.preventDefault();
    v16RequireUnlocked(() => v162ConnectFromAccountButton(button));
  });

  /* ============================================================
     V16.2 Free Setup Help Override
     ============================================================ */
  function showOnlineSetupHelp() {
    render(`
      <section class="screen">${topbar()}<div class="panel setup-help-panel">
        <span class="eyebrow">Free Supabase setup</span>
        <h1>No email is required for players.</h1>
        <p>The game uses each unlocked Scam Sprint profile name and silently creates a hidden anonymous Supabase session.</p>
        <div class="setup-steps">
          <article><span>1</span><div><strong>Enable both signup switches</strong><p>Supabase → Authentication → User Signups: turn ON “Allow new users to sign up” and “Allow anonymous sign-ins,” then press Save changes.</p></div></article>
          <article><span>2</span><div><strong>Run the V16.2 SQL once</strong><p>Open SQL Editor, paste GLOBAL_SETUP.sql from this package, and run it. It keeps the leaderboard and adds short-code rooms.</p></div></article>
          <article><span>3</span><div><strong>Paste two public values</strong><p>Put the Project URL and public publishable/anonymous key in FFindex.html. Never use a secret or service-role key.</p></div></article>
          <article><span>4</span><div><strong>Host the four files over HTTPS</strong><p>Use a free static host such as Cloudflare Pages, GitHub Pages, or Netlify. Every player opens the same deployed website.</p></div></article>
          <article><span>5</span><div><strong>Test room codes</strong><p>Create a room in one browser, join the six-character code from an Incognito window or phone, and start after two players appear.</p></div></article>
        </div>
        <div class="privacy-note"><strong>What becomes public?</strong><p>Only the chosen gamer tag, score, room status, and match progress. No email is requested, and local password hashes remain on the device.</p></div>
        <div class="button-row"><button class="btn" id="setupBackBtn">Back to Online Play</button></div>
      </div></section>`);
    wireTopbar();
    on($("#setupBackBtn"), "click", () => showProfileManager("cloud"));
  }

  /* ============================================================
     V16.2 Room Data Helpers
     ============================================================ */
  function v162CleanRoomCode(value) {
    return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
  }

  function v162RoomPlayersSorted(players = V16_ONLINE.room?.players || []) {
    return [...players].sort((a, b) => Number(b.score || 0) - Number(a.score || 0) || Number(b.current_round || 0) - Number(a.current_round || 0) || String(a.username).localeCompare(String(b.username)));
  }

  function v162CurrentRoomPlayer() {
    return (V16_ONLINE.room?.players || []).find((player) => player.user_id === V16_ONLINE.user?.id) || null;
  }

  function v162RoomIsHost() {
    return Boolean(V16_ONLINE.room?.row?.host_user_id && V16_ONLINE.room.row.host_user_id === V16_ONLINE.user?.id);
  }

  function v162ClearRoomTimers() {
    if (V16_ONLINE.roomRefreshTimer) clearTimeout(V16_ONLINE.roomRefreshTimer);
    if (V16_ONLINE.roomHeartbeatTimer) clearInterval(V16_ONLINE.roomHeartbeatTimer);
    V16_ONLINE.roomRefreshTimer = null;
    V16_ONLINE.roomHeartbeatTimer = null;
  }

  function v162DisconnectRoomChannel() {
    v162ClearRoomTimers();
    const client = V16_ONLINE.client;
    if (client && V16_ONLINE.roomChannel) client.removeChannel(V16_ONLINE.roomChannel).catch?.(() => {});
    V16_ONLINE.roomChannel = null;
  }

  function v162ResetRoomLocalState() {
    v162DisconnectRoomChannel();
    V16_ONLINE.room = null;
    if (V16_ONLINE.match?.roomMode) V16_ONLINE.match = null;
    state.multiplayer = null;
  }

  function v162ScheduleRoomRefresh(delay = 100) {
    if (!V16_ONLINE.room?.id) return;
    if (V16_ONLINE.roomRefreshTimer) clearTimeout(V16_ONLINE.roomRefreshTimer);
    V16_ONLINE.roomRefreshTimer = setTimeout(() => {
      V16_ONLINE.roomRefreshTimer = null;
      v162FetchRoomState().catch((error) => console.warn("Room refresh failed:", error));
    }, delay);
  }

  async function v162FetchRoomState() {
    const client = v16SupabaseClient();
    const room = V16_ONLINE.room;
    if (!client || !room?.id) return null;

    const [roomResponse, playersResponse] = await Promise.all([
      client.from("ff_rooms").select("id,code,host_user_id,status,max_players,round_count,round_ids,current_round,starts_at,created_at,expires_at,finished_at,settings").eq("id", room.id).single(),
      client.from("ff_room_players").select("room_id,user_id,username,is_host,score,current_round,finished,joined_at,last_seen,left_at").eq("room_id", room.id).order("score", { ascending: false }).order("joined_at", { ascending: true })
    ]);

    if (roomResponse.error) throw roomResponse.error;
    if (playersResponse.error) throw playersResponse.error;

    room.row = roomResponse.data;
    room.code = roomResponse.data.code;
    room.players = Array.isArray(playersResponse.data) ? playersResponse.data : [];

    v162RenderRoomLobby();
    v16UpdateVersusHud();
    v162RenderRoomResults();

    if (room.row.status === "playing" && Array.isArray(room.row.round_ids) && room.row.round_ids.length && !room.matchStarted) {
      room.matchStarted = true;
      v162BeginRoomMatch(room.row);
    }

    if (room.row.status === "cancelled") {
      toast("The host closed this room.");
      v162ResetRoomLocalState();
      showMultiplayerLobby();
    }

    return room;
  }

  async function v162SubscribeToRoom() {
    const client = v16SupabaseClient();
    const room = V16_ONLINE.room;
    if (!client || !room?.id || !V16_ONLINE.user) return;

    v162DisconnectRoomChannel();
    const channel = client.channel(`ff-room-${room.id}-${V16_ONLINE.user.id}`);
    V16_ONLINE.roomChannel = channel;

    channel
      .on("postgres_changes", { event: "*", schema: "public", table: "ff_rooms", filter: `id=eq.${room.id}` }, () => v162ScheduleRoomRefresh())
      .on("postgres_changes", { event: "*", schema: "public", table: "ff_room_players", filter: `room_id=eq.${room.id}` }, () => v162ScheduleRoomRefresh());

    channel.subscribe((status) => {
      const statusNode = $("#roomRealtimeStatus");
      if (statusNode) statusNode.textContent = status === "SUBSCRIBED" ? "Live updates connected" : status;
      if (status === "SUBSCRIBED") v162ScheduleRoomRefresh(0);
    });

    const config = v16GetGlobalConfig();
    V16_ONLINE.roomHeartbeatTimer = setInterval(() => {
      if (!V16_ONLINE.room?.id) return;
      client.rpc(config.heartbeatRoomRpc, { p_room_id: V16_ONLINE.room.id }).catch?.(() => {});
    }, 30000);
  }

  async function v162CreateRoom(maxPlayers, roundCount) {
    await v162EnsureAnonymousOnlineSession();
    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    const profile = v16GetActiveProfile();
    const { data, error } = await client.rpc(config.createRoomRpc, {
      p_username: profile.username,
      p_max_players: clamp(Number(maxPlayers || 8), 2, 8),
      p_round_count: clamp(Number(roundCount || 5), 3, 10)
    });
    if (error) throw new Error(v162FriendlyOnlineError(error));
    V16_ONLINE.room = { id: data.room_id, code: data.room_code, row: null, players: [], matchStarted: false };
    await v162SubscribeToRoom();
    await v162FetchRoomState();
    return V16_ONLINE.room;
  }

  async function v162JoinRoom(code) {
    await v162EnsureAnonymousOnlineSession();
    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    const profile = v16GetActiveProfile();
    const cleanCode = v162CleanRoomCode(code);
    if (cleanCode.length !== 6) throw new Error("Enter the complete six-character room code.");
    const { data, error } = await client.rpc(config.joinRoomRpc, {
      p_code: cleanCode,
      p_username: profile.username
    });
    if (error) throw new Error(v162FriendlyOnlineError(error));
    V16_ONLINE.room = { id: data.room_id, code: data.room_code, row: null, players: [], matchStarted: false };
    await v162SubscribeToRoom();
    await v162FetchRoomState();
    return V16_ONLINE.room;
  }

  async function v162LeaveRoom({ callServer = true, goHome = false } = {}) {
    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    const roomId = V16_ONLINE.room?.id;
    if (callServer && client && roomId && V16_ONLINE.user) {
      try { await client.rpc(config.leaveRoomRpc, { p_room_id: roomId }); } catch { /* local cleanup still runs */ }
    }
    v162ResetRoomLocalState();
    if (goHome) showHome();
  }

  /* ============================================================
     V16.2 Room Hub — Overrides the old open 1v1 challenge lobby
     The V16.1 lobby code remains above under v161Legacy... names.
     ============================================================ */
  async function showMultiplayerLobby() {
    v16InstallRuntimeOnce();
    if (!v16GlobalConfigured()) return showOnlineSetupHelp();

    try {
      await v162EnsureAnonymousOnlineSession();
    } catch (error) {
      V16_SECURITY.accountMessage = v162FriendlyOnlineError(error);
      return showProfileManager("cloud");
    }

    if (V16_ONLINE.room?.id) {
      await v162FetchRoomState().catch(() => {});
      return v162ShowRoomLobby();
    }

    const profile = v16GetActiveProfile();
    render(`
      <section class="screen multiplayer-screen">${topbar()}<div class="panel multiplayer-panel room-hub-panel">
        <header class="multiplayer-hero">
          <div><span class="eyebrow">No-email multiplayer</span><h1>Create or join a room.</h1><p>Play as ${esc(profile.username)}. Share one short code, wait for friends, then everyone races through the same Scam Sprint games.</p></div>
          <div class="lobby-status-card"><span class="online-dot"></span><strong>Connected privately</strong><small>No email required</small></div>
        </header>

        <div class="room-choice-grid">
          <form class="room-choice-card create-room-card" id="createRoomForm">
            <span class="room-choice-icon">＋</span><h2>Create a Room</h2><p>Become the host and receive a six-character invitation code.</p>
            <label><span>Maximum players</span><select id="roomMaxPlayers"><option value="4">4 players</option><option value="6">6 players</option><option value="8" selected>8 players</option></select></label>
            <label><span>Number of rounds</span><select id="roomRoundCount"><option value="3">3 rounds</option><option value="5" selected>5 rounds</option><option value="7">7 rounds</option><option value="10">10 rounds</option></select></label>
            <button class="btn btn-primary" type="submit">Create Private Room</button>
            <p class="form-error" id="createRoomError"></p>
          </form>

          <form class="room-choice-card join-room-card" id="joinRoomForm">
            <span class="room-choice-icon">🔗</span><h2>Join With Code</h2><p>Ask the host for the six-character code shown in their waiting room.</p>
            <label><span>Room code</span><input class="room-code-input" id="joinRoomCode" inputmode="text" maxlength="6" autocomplete="off" autocapitalize="characters" placeholder="ABC234" required></label>
            <button class="btn btn-good" type="submit">Join Room</button>
            <p class="form-error" id="joinRoomError"></p>
          </form>
        </div>

        <section class="room-how-card"><h2>How room multiplayer works</h2><div class="room-how-grid"><span><b>1</b>Create or enter a code</span><span><b>2</b>See everyone in the lobby</span><span><b>3</b>Host starts the countdown</span><span><b>4</b>Live standings rank every player</span></div></section>
        <div class="button-row"><button class="btn" id="roomHubHomeBtn">Back Home</button><button class="btn btn-secondary" id="roomHubLeaderboardBtn">Worldwide Leaderboard</button><button class="btn btn-secondary" id="roomHubAccountBtn">Online Play Settings</button></div>
      </div></section>`);

    wireTopbar();
    const codeInput = $("#joinRoomCode");
    on(codeInput, "input", () => { codeInput.value = v162CleanRoomCode(codeInput.value); });
    on($("#createRoomForm"), "submit", async (event) => {
      event.preventDefault();
      const errorNode = $("#createRoomError");
      const submit = $("button[type='submit']", event.currentTarget);
      submit.disabled = true;
      errorNode.textContent = "Creating room…";
      try {
        await v162CreateRoom($("#roomMaxPlayers").value, $("#roomRoundCount").value);
        v162ShowRoomLobby();
      } catch (error) {
        submit.disabled = false;
        errorNode.textContent = v162FriendlyOnlineError(error);
      }
    });
    on($("#joinRoomForm"), "submit", async (event) => {
      event.preventDefault();
      const errorNode = $("#joinRoomError");
      const submit = $("button[type='submit']", event.currentTarget);
      submit.disabled = true;
      errorNode.textContent = "Joining room…";
      try {
        await v162JoinRoom($("#joinRoomCode").value);
        v162ShowRoomLobby();
      } catch (error) {
        submit.disabled = false;
        errorNode.textContent = v162FriendlyOnlineError(error);
      }
    });
    on($("#roomHubHomeBtn"), "click", showHome);
    on($("#roomHubLeaderboardBtn"), "click", showLeaderboard);
    on($("#roomHubAccountBtn"), "click", () => showProfileManager("cloud"));
  }

  function v162ShowRoomLobby() {
    const room = V16_ONLINE.room;
    if (!room?.id) return showMultiplayerLobby();
    const row = room.row || {};
    render(`
      <section class="screen multiplayer-screen">${topbar()}<div class="panel multiplayer-panel room-lobby-panel">
        <header class="room-lobby-hero">
          <div><span class="eyebrow">Private multiplayer room</span><h1>Waiting for players.</h1><p>Share the code below. The host starts when everyone is ready.</p></div>
          <div class="room-code-card"><span>ROOM CODE</span><strong id="roomCodeText">${esc(room.code || "------")}</strong><button class="btn btn-primary btn-small" id="copyRoomCodeBtn">Copy Code</button></div>
        </header>

        <div class="room-lobby-status"><span class="online-dot"></span><strong id="roomRealtimeStatus">Connecting live updates…</strong><span id="roomPlayerCount">0 / ${Number(row.max_players || 8)} players</span></div>

        <div class="room-lobby-layout">
          <section class="room-player-board"><div class="leaderboard-title"><strong>👥 Players</strong><span>Gamer tags only</span></div><div id="roomLobbyPlayers" class="room-player-list"><div class="leaderboard-loading">Loading players…</div></div></section>
          <aside class="room-host-panel" id="roomHostPanel"><div class="leaderboard-loading">Loading host controls…</div></aside>
        </div>

        <div class="button-row"><button class="btn btn-danger" id="leaveRoomBtn">Leave Room</button><button class="btn btn-secondary" id="roomLobbyLeaderboardBtn">Worldwide Leaderboard</button></div>
      </div></section>`);
    wireTopbar();
    on($("#copyRoomCodeBtn"), "click", async () => {
      try { await navigator.clipboard.writeText(room.code); toast(`Room code ${room.code} copied.`); }
      catch { toast(`Room code: ${room.code}`); }
    });
    on($("#leaveRoomBtn"), "click", async () => { await v162LeaveRoom(); showMultiplayerLobby(); });
    on($("#roomLobbyLeaderboardBtn"), "click", showLeaderboard);
    on($("#homeBtn"), "click", () => v162LeaveRoom({ callServer: true }));
    v162RenderRoomLobby();
    v162ScheduleRoomRefresh(0);
  }

  function v162RenderRoomLobby() {
    const room = V16_ONLINE.room;
    const host = $("#roomLobbyPlayers");
    const controls = $("#roomHostPanel");
    if (!room || !host || !controls) return;
    const row = room.row || {};
    const activePlayers = (room.players || []).filter((player) => !player.left_at);
    const count = $("#roomPlayerCount");
    if (count) count.textContent = `${activePlayers.length} / ${Number(row.max_players || 8)} players`;
    const codeText = $("#roomCodeText");
    if (codeText) codeText.textContent = room.code || "------";

    host.innerHTML = activePlayers.length ? activePlayers.map((player, index) => {
      const recentlySeen = Date.now() - new Date(player.last_seen || player.joined_at || 0).getTime() < 70000;
      return `<article class="room-player-card ${player.user_id === V16_ONLINE.user?.id ? "you" : ""}">
        <div class="room-player-rank">${index + 1}</div><div class="profile-avatar">${esc(String(player.username || "P").slice(0,1).toUpperCase())}</div>
        <div><strong>${esc(player.username || "Player")}${player.user_id === V16_ONLINE.user?.id ? " · You" : ""}</strong><span>${player.is_host ? "Host" : "Player"} · ${recentlySeen ? "Connected" : "Reconnecting"}</span></div>
        <span class="room-ready-status">${row.status === "waiting" ? "Ready" : `Round ${Number(player.current_round || 0)}`}</span>
      </article>`;
    }).join("") : `<div class="lobby-empty"><strong>No players loaded yet.</strong><p>Realtime may still be connecting.</p></div>`;

    const isHost = v162RoomIsHost();
    if (row.status === "waiting") {
      controls.innerHTML = isHost ? `
        <span class="eyebrow">Host controls</span><h2>Start together</h2><p>Everyone receives ${Number(row.round_count || 5)} identical randomized rounds. A five-second synchronized countdown begins after Start.</p>
        <div class="room-setting-summary"><span>👥 Up to ${Number(row.max_players || 8)}</span><span>🎮 ${Number(row.round_count || 5)} rounds</span></div>
        <button class="btn btn-good room-start-button" id="startRoomMatchBtn" ${activePlayers.length < 2 ? "disabled" : ""}>Start Match for ${activePlayers.length} Players</button>
        ${activePlayers.length < 2 ? `<p class="small muted">At least two players are required.</p>` : ""}` : `
        <span class="eyebrow">Waiting for host</span><h2>${esc(activePlayers.find((player) => player.is_host)?.username || "The host")} controls the start.</h2><p>Keep this screen open. The game will automatically show the synchronized countdown.</p>
        <div class="room-setting-summary"><span>👥 ${activePlayers.length} joined</span><span>🎮 ${Number(row.round_count || 5)} rounds</span></div>`;
      on($("#startRoomMatchBtn"), "click", v162StartRoomMatch);
    } else if (row.status === "playing") {
      controls.innerHTML = `<span class="eyebrow">Match starting</span><h2>Shared rounds are ready.</h2><p>The synchronized countdown will open automatically.</p>`;
    } else {
      controls.innerHTML = `<span class="eyebrow">Room complete</span><h2>This room has finished.</h2><p>You may review results or return to the room hub.</p>`;
    }
  }

  function v162SelectRoomRounds(count = 5) {
    const target = clamp(Number(count || 5), 3, 10);
    const firstFive = v16SelectVersusRounds();
    if (target <= firstFive.length) return firstFive.slice(0, target);
    const used = new Set(firstFive);
    const allowed = new Set(["safeChoice","dangerWebsite","siteInspector","romanceSwipe","marketplaceMatch","deepfakeCall","deepfakeSpot","gameChatReport","lobbyMute","qrScan","mfaShield","permissionToggle","permissionsToggle","moneyGuard","categoryMatch","safeWordChallenge","familyCallOrder","attachmentFlash","fileDelete","popupPurge","spamBlockHunt"]);
    const pool = shuffle(ROUNDS.filter((round) => allowed.has(round.type) && !used.has(round.id)));
    for (const round of pool) {
      if (firstFive.length >= target) break;
      firstFive.push(round.id);
      used.add(round.id);
    }
    return firstFive.slice(0, target);
  }

  async function v162StartRoomMatch() {
    const room = V16_ONLINE.room;
    if (!room?.row || !v162RoomIsHost()) return;
    const button = $("#startRoomMatchBtn");
    if (button) { button.disabled = true; button.textContent = "Starting…"; }
    try {
      const client = v16SupabaseClient();
      const config = v16GetGlobalConfig();
      const roundIds = v162SelectRoomRounds(room.row.round_count);
      const { error } = await client.rpc(config.startRoomRpc, { p_room_id: room.id, p_round_ids: roundIds });
      if (error) throw error;
      await v162FetchRoomState();
    } catch (error) {
      if (button) { button.disabled = false; button.textContent = "Start Match"; }
      toast(v162FriendlyOnlineError(error));
    }
  }

  function v162BeginRoomMatch(roomRow) {
    const players = (V16_ONLINE.room?.players || []).filter((player) => !player.left_at);
    const match = {
      roomMode: true,
      roomId: roomRow.id,
      roomCode: roomRow.code,
      matchId: roomRow.id,
      roundIds: [...(roomRow.round_ids || [])],
      startAt: new Date(roomRow.starts_at || Date.now() + 4000).getTime(),
      players,
      localFinished: false,
      localScore: Number(v162CurrentRoomPlayer()?.score || 0),
      resultApplied: false
    };
    V16_ONLINE.match = match;
    v162ShowRoomCountdown(match);
  }

  function v162ShowRoomCountdown(match) {
    const players = v162RoomPlayersSorted(match.players || []);
    render(`
      <section class="screen versus-countdown-screen">${topbar()}<div class="panel versus-countdown-panel room-countdown-panel">
        <span class="eyebrow">Room ${esc(match.roomCode)} · ${players.length} players</span>
        <h1 id="versusCountdown">Get Ready</h1><p>Everyone receives the same ${match.roundIds.length} rounds. Fast, safe, accurate decisions win.</p>
        <div class="room-countdown-players">${players.map((player) => `<span>${player.user_id === V16_ONLINE.user?.id ? "⭐ " : ""}${esc(player.username)}</span>`).join("")}</div>
        <div class="versus-round-preview">${match.roundIds.map((id, index) => { const round = ROUNDS.find((item) => item.id === id); return `<span>${index + 1}. ${esc(round?.category || "Challenge")}</span>`; }).join("")}</div>
      </div></section>`);
    wireTopbar();
    const node = $("#versusCountdown");
    let launched = false;
    const interval = setInterval(() => {
      const seconds = Math.max(0, Math.ceil((match.startAt - Date.now()) / 1000));
      if (node) node.textContent = seconds > 0 ? String(seconds) : "GO!";
      if (seconds <= 0 && !launched) {
        launched = true;
        clearInterval(interval);
        setTimeout(v162StartRoomRun, 300);
      }
    }, 200);
    addCleanup(() => clearInterval(interval));
  }

  function v162StartRoomRun() {
    const match = V16_ONLINE.match;
    if (!match?.roomMode) return showMultiplayerLobby();
    const selected = match.roundIds.map((id) => ROUNDS.find((round) => round.id === id)).filter(Boolean);
    if (selected.length !== match.roundIds.length) {
      toast("This room could not load every shared round.");
      return showMultiplayerLobby();
    }
    clearLoops();
    ensureAudio();
    v16NewRunState("versus");
    state.selected = selected;
    state.multiplayer = match;
    state.playerMode = "self";
    renderRound();
  }

  /* ============================================================
     V16.2 HUD Wrapper
     Keeps the original V16.1 HUD for solo and legacy 1v1 play,
     while showing a compact multi-player standings strip in rooms.
     ============================================================ */
  function hud() {
    const match = V16_ONLINE.match;
    if (!(state.runMode === "versus" && match?.roomMode)) return v161LegacyHud();
    const progress = clamp(Math.round((state.idx / Math.max(1, state.selected.length)) * 100), 0, 100);
    const players = v162RoomPlayersSorted(V16_ONLINE.room?.players || match.players || []);
    const top = players.slice(0, 5);
    const standings = `<div class="room-versus-hud" id="versusHud"><div class="room-hud-title"><span>ROOM ${esc(match.roomCode)}</span><strong>LIVE STANDINGS</strong><small>${players.length} players</small></div><div class="room-hud-ranks" id="roomHudRanks">${top.map((player, index) => `<div class="${player.user_id === V16_ONLINE.user?.id ? "you" : ""}"><b>${index + 1}</b><span>${esc(player.username)}</span><strong>${Number(player.user_id === V16_ONLINE.user?.id ? state.score : player.score || 0).toLocaleString()}</strong><small>R${Number(player.user_id === V16_ONLINE.user?.id ? state.idx + 1 : player.current_round || 0)}/${state.selected.length}</small></div>`).join("")}</div></div>`;
    return `${standings}<div class="hud"><div class="hud-bars">${meterRow("Round Progress", progress, "meter-progress", "progressBar")}${state.playerMode === "senior" ? "" : meterRow("Timer", state.timeLeft, "meter-time", "timeBar")}${meterRow("Trust Shield", state.trust, "meter-good", "trustBar")}${meterRow("Fraudster Pressure", state.fraudster, "meter-danger", "fraudBar")}</div><div class="hud-stats"><div class="stat-pill">Score <strong>${state.score}</strong></div><div class="stat-pill">Combo <strong>${state.streak}</strong></div><div class="stat-pill">Mistakes <strong>${state.mistakes}</strong></div></div></div>`;
  }

  function v16UpdateVersusHud() {
    const match = V16_ONLINE.match;
    if (!match?.roomMode) return v161LegacyUpdateVersusHud();
    match.players = V16_ONLINE.room?.players || match.players || [];
    const host = $("#roomHudRanks");
    if (!host) return;
    const players = v162RoomPlayersSorted(match.players).slice(0, 5);
    host.innerHTML = players.map((player, index) => `<div class="${player.user_id === V16_ONLINE.user?.id ? "you" : ""}"><b>${index + 1}</b><span>${esc(player.username)}</span><strong>${Number(player.user_id === V16_ONLINE.user?.id ? state.score : player.score || 0).toLocaleString()}</strong><small>R${Number(player.user_id === V16_ONLINE.user?.id ? Math.min(state.idx + 1, state.selected.length) : player.current_round || 0)}/${state.selected.length}</small></div>`).join("");
  }

  function v16BroadcastMatchProgress(success) {
    const match = V16_ONLINE.match;
    if (!match?.roomMode) return v161LegacyBroadcastMatchProgress(success);
    match.localScore = Number(state.score || 0);
    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    if (!client || !match.roomId) return;
    client.rpc(config.updateRoomRpc, {
      p_room_id: match.roomId,
      p_score: match.localScore,
      p_current_round: Math.min(state.idx + 1, state.selected.length),
      p_finished: false
    }).then(({ error }) => {
      if (error) console.warn("Room progress update failed:", error);
      v162ScheduleRoomRefresh(0);
    }).catch(() => {});
    v16UpdateVersusHud();
  }

  async function v162ShowRoomResults(lost) {
    const match = V16_ONLINE.match;
    if (!match?.roomMode) return showHome();
    match.localFinished = true;
    match.localScore = Number(state.score || 0);
    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    try {
      const { error } = await client.rpc(config.updateRoomRpc, {
        p_room_id: match.roomId,
        p_score: match.localScore,
        p_current_round: match.roundIds.length,
        p_finished: true
      });
      if (error) throw error;
    } catch (error) {
      console.warn("Final room score update failed:", error);
    }

    render(`
      <section class="screen versus-results-screen">${topbar()}<div class="panel versus-results-panel room-results-panel">
        <span class="eyebrow">Room ${esc(match.roomCode)} results</span><h1 id="roomResultTitle">Your run is complete.</h1><p id="roomResultStatus">Waiting for the live standings…</p>
        <div class="room-final-self"><span>Your score</span><strong>${match.localScore.toLocaleString()}</strong><b>${esc(v16GetActiveProfile().username)}</b></div>
        <div class="room-final-standings" id="roomFinalStandings"><div class="leaderboard-loading">Loading room standings…</div></div>
        <div class="button-row"><button class="btn btn-primary" id="returnRoomHubBtn">Leave Room & Return to Room Hub</button><button class="btn" id="roomResultsHomeBtn">Home</button></div>
      </div></section>`);
    wireTopbar();
    on($("#returnRoomHubBtn"), "click", async () => { await v162LeaveRoom(); showMultiplayerLobby(); });
    on($("#roomResultsHomeBtn"), "click", async () => { await v162LeaveRoom(); showHome(); });
    await v162FetchRoomState().catch(() => {});
    v162RenderRoomResults();
  }

  function v162RenderRoomResults() {
    const host = $("#roomFinalStandings");
    const match = V16_ONLINE.match;
    if (!host || !match?.roomMode) return;
    const players = v162RoomPlayersSorted(V16_ONLINE.room?.players || match.players || []);
    const active = players.filter((player) => !player.left_at || player.finished);
    const allFinished = active.length > 0 && active.every((player) => player.finished || player.left_at);
    const meIndex = active.findIndex((player) => player.user_id === V16_ONLINE.user?.id);
    const me = meIndex >= 0 ? active[meIndex] : null;

    host.innerHTML = active.map((player, index) => `<article class="room-final-row ${player.user_id === V16_ONLINE.user?.id ? "you" : ""}"><span class="room-final-rank">${index === 0 ? "🏆" : `#${index + 1}`}</span><div><strong>${esc(player.username)}${player.user_id === V16_ONLINE.user?.id ? " · You" : ""}</strong><small>${player.finished ? "Finished" : player.left_at ? "Left room" : `Round ${Number(player.current_round || 0)}/${match.roundIds.length}`}</small></div><b>${Number(player.score || 0).toLocaleString()}</b></article>`).join("");

    const title = $("#roomResultTitle");
    const status = $("#roomResultStatus");
    if (allFinished) {
      if (title) title.textContent = meIndex === 0 ? "You won the room!" : `You finished #${meIndex + 1}.`;
      if (status) status.textContent = "All final scores were saved to the room standings.";
      if (!match.resultApplied && me) {
        match.resultApplied = true;
        const profile = v16GetActiveProfile();
        v16UpdateProfile(profile.id, {
          totalScore: Number(profile.totalScore || 0) + Number(me.score || 0),
          lastScore: Number(me.score || 0),
          lastPlayedAt: v16NowIso(),
          vsWins: Number(profile.vsWins || 0) + (meIndex === 0 ? 1 : 0),
          vsLosses: Number(profile.vsLosses || 0) + (meIndex > 0 ? 1 : 0)
        });
      }
    } else {
      if (title) title.textContent = "You finished—others are still playing.";
      if (status) status.textContent = "Scores and round progress update automatically.";
    }
  }

  function v16ShowVersusResults(lost) {
    if (V16_ONLINE.match?.roomMode) return v162ShowRoomResults(lost);
    return v161LegacyShowVersusResults(lost);
  }

  function v16ExitMatch() {
    if (!V16_ONLINE.match?.roomMode) return v161LegacyExitMatch();
    V16_ONLINE.match = null;
    state.multiplayer = null;
  }



  /* ============================================================
     18E) V16.4 POLISH + ACCESSIBILITY + EXPANDED MULTIPLAYER
     ------------------------------------------------------------
     ADDITIVE UPDATE — the complete V16.3 engine remains above.

     V16.4 adds:
     - Responsive phone/computer minigame layouts
     - Reliable universal touch + tilt controls for movement games
     - Cleaner player-facing copy (technical setup notes stay in SETUP_GUIDE.txt)
     - Truly randomized game-chat scam-message position
     - 18-round Arcade + boss and a separate Endless mode
     - Separate Regular and Endless local/worldwide leaderboards
     - Host-selectable online reading pace and live-score visibility
     - Live room scores, safe spectator progress, and a waiting minigame
     - Preset-only reactions (no free-text chat)
     - Username safety filtering in browser and database
     - Solo Quick Match, private 2v2 rooms, and 2v2 matchmaking
     - One-tap Easy View for seniors and players who prefer larger UI
     ============================================================ */

  const V164_REGULAR_ROUNDS = 18;
  const V164_ENDLESS_BATCH = 8;
  const V164_ALLOWED_REACTIONS = new Map([
    ["gg", "GG"], ["lol", "LOL"], ["think", "🤔"], ["laugh", "😂"],
    ["wow", "😮"], ["clap", "👏"], ["fire", "🔥"], ["shield", "🛡️"]
  ]);
  const V164_MOVEMENT_TYPES = new Set([
    "platformHints", "hintPlatformer", "starBridgeRun", "fallingDodge",
    "textDodge", "scamRainDodge", "spywareMaze", "browserRedirectMaze",
    "linkBridge", "packetPaddle", "shieldBlock", "shieldCursor",
    "messageShieldRun", "inboxShooter", "downloadShooter", "scamWhack",
    "fakeAdClean", "virusDownload", "rushStopDownload", "tabStopDownload"
  ]);
  const V164_VERTICAL_MOVEMENT_TYPES = new Set([
    "spywareMaze", "browserRedirectMaze", "platformHints", "hintPlatformer",
    "starBridgeRun", "linkBridge"
  ]);
  const V164_NAME_BLOCKLIST = [
    "fuck", "shit", "bitch", "cunt", "dick", "pussy", "asshole", "nigger",
    "nigga", "faggot", "retard", "whore", "slut", "kike", "chink", "spic",
    "rape", "porn", "nazi", "hitler", "kkk", "suicide", "kill yourself",
    "kys", "admin", "moderator", "fraudfront official", "scam sprint official"
  ];

  const v163Topbar = topbar;
  const v163WireTopbar = wireTopbar;
  const v163GetProfiles = v16GetProfiles;
  const v163CreateProfile = v16CreateProfile;
  const v163SanitizeUsername = v16SanitizeUsername;
  const v163CloudUpsertAlias = v16CloudUpsertAlias;
  const v163GetGlobalConfig = v16GetGlobalConfig;
  const v163FetchGlobalLeaderboard = v16FetchGlobalLeaderboard;
  const v163SecondsFor = secondsFor;
  const v163RenderRound = renderRound;
  const v163ShowResults = showResults;
  const v163RecordResult = v16RecordResult;
  const v163DrawSwipe = drawSwipe;
  const v163WireSwipe = wireSwipe;
  const v163DrawLobbyV13 = drawLobbyV13;
  const v163WireLobbyV13 = wireLobbyV13;
  const v163AccountNav = v16AccountNav;
  const v163AccountSectionHtml = v16AccountSectionHtml;
  const v163ShowOnlineSetupHelp = showOnlineSetupHelp;
  const v163ClearRoomTimers = v162ClearRoomTimers;
  const v163DisconnectRoomChannel = v162DisconnectRoomChannel;
  const v163StartRoomMatch = v162StartRoomMatch;
  const v163BeginRoomMatch = v162BeginRoomMatch;
  const v163ShowRoomResults = v162ShowRoomResults;
  const v163RenderRoomResults = v162RenderRoomResults;
  const v163ExitMatch = v16ExitMatch;

  /* ============================================================
     V16.4A) Persistent Accessibility Preferences
     ============================================================ */
  const V164_ACCESS_KEY = "ffV164Accessibility";

  function v164AccessibilitySettings() {
    return {
      easyView: false,
      reducedMotion: false,
      highContrast: false,
      ...(v16ReadJson(V164_ACCESS_KEY, {}) || {})
    };
  }

  function v164ApplyAccessibility() {
    const settings = v164AccessibilitySettings();
    document.body.classList.toggle("easy-view", Boolean(settings.easyView));
    document.body.classList.toggle("reduced-motion", Boolean(settings.reducedMotion));
    document.body.classList.toggle("high-contrast", Boolean(settings.highContrast));
    const button = $("#accessibilityBtn");
    if (button) {
      button.classList.toggle("active", Boolean(settings.easyView));
      button.setAttribute("aria-pressed", settings.easyView ? "true" : "false");
      button.title = settings.easyView ? "Turn Easy View off" : "Turn Easy View on";
    }
  }

  function v164ToggleEasyView() {
    const settings = v164AccessibilitySettings();
    settings.easyView = !settings.easyView;
    if (settings.easyView) settings.reducedMotion = true;
    v16WriteJson(V164_ACCESS_KEY, settings);
    v164ApplyAccessibility();
    toast(settings.easyView ? "Easy View on: larger text, larger buttons, and calmer motion." : "Easy View off.");
  }

  topbar = function v164Override_topbar() {
    return `
      <div class="topbar">
        <div class="topbar-left">
          <div class="logo-mark">FF</div>
          <div class="logo-copy"><strong>${esc(DATA.site.gameName)}</strong><small>${esc(DATA.site.tagline)}</small></div>
        </div>
        <div class="topbar-actions">
          <button class="icon-btn accessibility-btn" id="accessibilityBtn" type="button" aria-pressed="false" title="Toggle Easy View">A+</button>
          <button class="icon-btn ${state.soundOn ? "sound-on" : "sound-off"}" id="soundBtn" title="Toggle sound">${state.soundOn ? "🔊" : "🔇"}</button>
          <button class="icon-btn" id="homeBtn" title="Home">⌂</button>
        </div>
      </div>`;
  }

  wireTopbar = function v164Override_wireTopbar() {
    on($("#homeBtn"), "click", showHome);
    on($("#soundBtn"), "click", toggleSound);
    on($("#accessibilityBtn"), "click", v164ToggleEasyView);
    updateSoundButton();
    v164ApplyAccessibility();
  }

  /* ============================================================
     V16.4B) Profile Defaults + Safe Username Filtering
     ============================================================ */
  function v164ProfileWithDefaults(profile) {
    return {
      ...profile,
      regularBestScore: Number(profile.regularBestScore ?? profile.bestScore ?? 0),
      regularWins: Number(profile.regularWins ?? profile.wins ?? 0),
      regularRuns: Number(profile.regularRuns ?? profile.runs ?? 0),
      endlessBestScore: Number(profile.endlessBestScore || 0),
      endlessBestRounds: Number(profile.endlessBestRounds || 0),
      endlessRuns: Number(profile.endlessRuns || 0)
    };
  }

  v16GetProfiles = function v164Override_v16GetProfiles() {
    const original = v163GetProfiles();
    let changed = false;
    const upgraded = original.map((profile) => {
      const next = v164ProfileWithDefaults(profile);
      if (JSON.stringify(next) !== JSON.stringify(profile)) changed = true;
      return next;
    });
    if (changed) v16SaveProfiles(upgraded);
    return upgraded;
  }

  function v164NameFingerprint(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[0]/g, "o").replace(/[1!|]/g, "i").replace(/[3]/g, "e")
      .replace(/[4@]/g, "a").replace(/[5$]/g, "s").replace(/[7+]/g, "t")
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function v164UsernameIssue(value) {
    const clean = v163SanitizeUsername(value);
    if (clean.length < 2) return "Use a gamer tag with at least 2 characters.";
    if (clean.length > 18) return "Gamer tags may use at most 18 characters.";
    const fingerprint = v164NameFingerprint(clean);
    const collapsed = fingerprint.replace(/\s+/g, "");
    const blocked = V164_NAME_BLOCKLIST.some((term) => {
      const needle = v164NameFingerprint(term);
      return fingerprint.includes(needle) || collapsed.includes(needle.replace(/\s+/g, ""));
    });
    if (blocked) return "Choose a respectful gamer tag without profanity, slurs, threats, or staff impersonation.";
    if (/^(player|guest|user)\s*\d*$/i.test(clean)) return "Choose a more distinctive gamer tag.";
    return "";
  }

  v16SanitizeUsername = function v164Override_v16SanitizeUsername(value) {
    const clean = v163SanitizeUsername(value);
    return v164UsernameIssue(clean) ? "" : clean;
  }

  v16CreateProfile = async function v164Override_v16CreateProfile(username, password) {
    const clean = v163SanitizeUsername(username);
    const issue = v164UsernameIssue(clean);
    if (issue) return { ok: false, error: issue };
    return v163CreateProfile(clean, password);
  }

  v16CloudUpsertAlias = async function v164Override_v16CloudUpsertAlias(username) {
    const clean = v163SanitizeUsername(username);
    const issue = v164UsernameIssue(clean);
    if (issue) throw new Error(issue);
    return v163CloudUpsertAlias(clean);
  }

  /* ============================================================
     V16.4C) Expanded Supabase Configuration
     ============================================================ */
  v16GetGlobalConfig = function v164Override_v16GetGlobalConfig() {
    const base = v163GetGlobalConfig();
    const config = window.FF_ONLINE_CONFIG || window.FF_LEADERBOARD_CONFIG || {};
    return {
      ...base,
      submitModeRpc: String(config.submitModeRpc || "submit_mode_score"),
      readModeRpc: String(config.readModeRpc || "get_mode_leaderboard"),
      createRoomV164Rpc: String(config.createRoomV164Rpc || "ff_create_room_v164"),
      joinRoomV164Rpc: String(config.joinRoomV164Rpc || "ff_join_room_v164"),
      setTeamRpc: String(config.setTeamRpc || "ff_set_room_team"),
      matchmakingJoinRpc: String(config.matchmakingJoinRpc || "ff_matchmaking_join"),
      matchmakingStatusRpc: String(config.matchmakingStatusRpc || "ff_matchmaking_status"),
      matchmakingCancelRpc: String(config.matchmakingCancelRpc || "ff_matchmaking_cancel")
    };
  }

  async function v164FetchModeLeaderboard(mode = "regular", limit = 50) {
    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    if (!client) throw new Error("Worldwide rankings are unavailable right now.");
    const { data, error } = await client.rpc(config.readModeRpc, {
      p_mode: mode === "endless" ? "endless" : "regular",
      p_limit: clamp(Number(limit || 50), 1, 100)
    });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  }

  async function v164SubmitModeScore(profile, mode, score, rounds, won) {
    if (!profile?.globalShare || !v16GlobalConfigured() || !V16_ONLINE.user) return false;
    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    const { error } = await client.rpc(config.submitModeRpc, {
      p_username: profile.username,
      p_mode: mode === "endless" ? "endless" : "regular",
      p_score: clamp(Number(score || 0), 0, 1000000),
      p_best_streak: clamp(Number(state.bestStreak || 0), 0, 10000),
      p_rounds: clamp(Number(rounds || 0), 0, 100000),
      p_won: Boolean(won)
    });
    if (error) throw error;
    return true;
  }

  /* V16.4 overrides the V16.3 “publish saved best” helper so both
     solo boards sync immediately without mixing Demo or online scores. */
  v163PublishSavedBest = async function v164PublishSavedBest(profile = v16GetActiveProfile()) {
    await v162EnsureAnonymousOnlineSession();
    await v16CloudUpsertAlias(profile.username);
    const publishable = { ...profile, globalShare: true };
    const regularScore = Number(profile.regularBestScore ?? profile.bestScore ?? 0);
    const endlessScore = Number(profile.endlessBestScore || 0);
    if (regularScore > 0) {
      await v164SubmitModeScore(
        publishable,
        "regular",
        regularScore,
        Number(profile.regularRuns || profile.runs || 0),
        Number(profile.regularWins ?? profile.wins ?? 0) > 0
      );
    }
    if (endlessScore > 0) {
      await v164SubmitModeScore(
        publishable,
        "endless",
        endlessScore,
        Number(profile.endlessBestRounds || 0),
        false
      );
    }
    v16UpdateProfile(profile.id, {
      lastGlobalSyncScore: regularScore,
      lastEndlessGlobalSyncScore: endlessScore,
      lastGlobalSyncAt: v16NowIso()
    });
    return Math.max(regularScore, endlessScore);
  };

  /* ============================================================
     V16.4D) Cleaner Home + 18-Round Arcade + Endless Mode
     ============================================================ */
  function v164ModeBest(profile, mode) {
    return mode === "endless" ? Number(profile.endlessBestScore || 0) : Number(profile.regularBestScore ?? profile.bestScore ?? 0);
  }

  showHome = function v164Override_showHome() {
    clearLoops();
    v16InstallRuntimeOnce();
    v164ApplyAccessibility();
    document.body.classList.remove("game-active");
    const profile = v16GetActiveProfile();
    const progress = profile.progress;
    const protectedProfile = v16ProfileHasPassword(profile);
    const unlocked = v16IsProfileUnlocked(profile.id);
    render(`
      <section class="screen v164-home-screen">${topbar()}<div class="panel v164-home-panel">
        <header class="v164-home-hero">
          <div>
            <span class="eyebrow">FraudFront awareness arcade</span>
            <h1><span class="home-title-accent">Scam Sprint</span><br>Learn fast. Spot scams. Protect people.</h1>
            <p>Choose a focused arcade run, survive Endless Mode, practice any of 657 games, or compete online with friends and worldwide players.</p>
          </div>
          <button class="profile-chip account-chip-large" id="profileBtn">${unlocked ? "🔓" : "🔒"} ${esc(profile.username)}</button>
        </header>

        ${!protectedProfile ? `<div class="home-security-alert"><strong>🔐 Protect this profile first</strong><span>Create one password before saving progress or playing online.</span><button class="btn btn-primary btn-small" id="secureProfileBtn">Set Password</button></div>` : ""}

        <div class="v164-mode-grid">
          <button class="home-mode-card primary" id="startBtn"><span>🎮</span><strong>Arcade Run</strong><small>${V164_REGULAR_ROUNDS} varied rounds + final boss</small></button>
          <button class="home-mode-card endless" id="endlessBtn"><span>♾️</span><strong>Endless Mode</strong><small>Keep playing until Trust reaches zero</small></button>
          <button class="home-mode-card versus" id="multiplayerBtn"><span>🌎</span><strong>Online Play</strong><small>Room codes, Quick Match, and 2v2 teams</small></button>
          <button class="home-mode-card demo" id="demoBtn"><span>⚡</span><strong>5-Game Demo</strong><small>A short guided sampler</small></button>
        </div>

        ${progress ? `<button class="v164-resume-bar" id="resumeBtn"><span>▶</span><div><strong>Continue saved ${progress.runMode === "endless" ? "Endless run" : progress.runMode === "demo" ? "Demo" : "Arcade run"}</strong><small>Saved ${progress.savedAt ? new Date(progress.savedAt).toLocaleString() : "recently"}</small></div></button>` : ""}

        <div class="v164-home-tools">
          <button class="btn btn-secondary" id="libraryBtn">🗂️ Game Library</button>
          <button class="btn btn-secondary" id="leaderboardBtn">🏆 Leaderboards</button>
          <button class="btn btn-secondary" id="howBtn">❓ How to Play</button>
          <button class="btn btn-secondary" id="accountBtn">⚙️ Account Settings</button>
        </div>

        <div class="v164-home-stats">
          <div><strong>${DATA.site.totalPlayableRounds}</strong><span>games preserved</span></div>
          <div><strong>${Number(profile.regularBestScore || 0).toLocaleString()}</strong><span>Arcade best</span></div>
          <div><strong>${Number(profile.endlessBestScore || 0).toLocaleString()}</strong><span>Endless best</span></div>
          <div><strong>${Number(profile.vsWins || 0)}</strong><span>online wins</span></div>
        </div>
      </div></section>`);
    wireTopbar();
    on($("#secureProfileBtn"), "click", () => showProfileManager("security"));
    on($("#profileBtn"), "click", () => showProfileManager("profiles"));
    on($("#accountBtn"), "click", () => showProfileManager("profiles"));
    on($("#startBtn"), "click", () => v16RequireUnlocked(showSetup));
    on($("#endlessBtn"), "click", () => v16RequireUnlocked(showEndlessSetup));
    on($("#multiplayerBtn"), "click", () => v16RequireUnlocked(showMultiplayerLobby));
    on($("#demoBtn"), "click", () => v16RequireUnlocked(showDemoMode));
    on($("#resumeBtn"), "click", () => v16RequireUnlocked(v16ResumeProgress));
    on($("#libraryBtn"), "click", showLibrary);
    on($("#leaderboardBtn"), "click", () => showLeaderboard("regular"));
    on($("#howBtn"), "click", showHow);
  }

  function v164SetupBody(mode) {
    const endless = mode === "endless";
    return `
      <section class="screen">${topbar()}<div class="panel v164-setup-panel">
        <header class="v164-setup-head"><div><span class="eyebrow">${endless ? "Endless Mode" : "Arcade Run"}</span><h1>${endless ? "How long can you protect Trust?" : `${V164_REGULAR_ROUNDS} rounds. One final boss.`}</h1><p>${endless ? "Rounds continue without a boss until Trust reaches zero. Your score and rounds survived have their own leaderboard." : "A shorter, balanced run designed to finish in one sitting."}</p></div></header>
        <h3>Choose your play style</h3>
        <div class="card-grid v164-audience-grid">
          ${audienceCard("playerMode", "family", "👪", "Family Mode", "Balanced text and pacing.")}
          ${audienceCard("playerMode", "self", "🛡️", "Self-Protection", "Fast personal practice.")}
          ${audienceCard("playerMode", "senior", "🏛️", "Senior-Friendly", "Larger text, larger controls, and no countdown timer.")}
        </div>
        <div class="v164-settings-grid">
          <section><h3>Difficulty</h3><div class="segment-row">${radio("difficulty", "easy", "Relaxed")}${radio("difficulty", "medium", "Standard")}${radio("difficulty", "hard", "Challenge")}</div></section>
          <section><h3>Controls</h3><div class="segment-row">${radio("deviceMode", "auto", "Auto")}${radio("deviceMode", "desktop", "Computer")}${radio("deviceMode", "touch", "Touch")}${radio("deviceMode", "motion", "Phone Tilt")}</div></section>
        </div>
        <div class="motion-control-help"><span>📱 Touch buttons always work. Phone Tilt is optional and can be enabled during movement games.</span><div class="motion-control-actions"><button class="btn btn-primary btn-small" id="motionEnableBtn" type="button">Enable Phone Tilt</button><button class="btn btn-secondary btn-small" id="motionCalibrateBtn" type="button">Calibrate</button></div></div>
        <div class="button-row"><button class="btn" id="backBtn">Back</button><button class="btn btn-primary" id="beginBtn">${endless ? "Start Endless Mode" : "Start Arcade Run"}</button></div>
      </div></section>`;
  }

  function v164WireSetup(mode) {
    wireTopbar();
    $$('[data-set]').forEach((button) => on(button, "click", () => {
      state[button.dataset.set] = button.dataset.value;
      if (state.playerMode === "senior") state.difficulty = "easy";
      mode === "endless" ? showEndlessSetup() : showSetup();
    }));
    $$('input[type="radio"]').forEach((input) => on(input, "change", async () => {
      if (input.name === "deviceMode" && input.value === "motion") {
        const enabled = await v16EnableMotionControls();
        state.deviceMode = enabled ? "motion" : "touch";
      } else state[input.name] = input.value;
    }));
    on($("#motionEnableBtn"), "click", async () => {
      if (await v16EnableMotionControls()) { state.deviceMode = "motion"; toast("Phone Tilt enabled."); }
    });
    on($("#motionCalibrateBtn"), "click", v16CalibrateTilt);
    on($("#backBtn"), "click", showHome);
    on($("#beginBtn"), "click", mode === "endless" ? startEndless : startGame);
  }

  showSetup = function v164Override_showSetup() { render(v164SetupBody("regular")); v164WireSetup("regular"); }
  function showEndlessSetup() { render(v164SetupBody("endless")); v164WireSetup("endless"); }

  function v164RoundPool() {
    return ROUNDS.filter((round) => !["bossRush", "legacyBossRush"].includes(round.type));
  }

  function v164BalancedRounds(target) {
    const pool = v164RoundPool();
    const groups = [
      [["virusDownload","rushStopDownload","tabStopDownload","popupPurge","closeWindowX","platformHints","hintPlatformer","starBridgeRun","fallingDodge","shieldBlock","spotlightSpy","spywareMaze","spamBlockHunt","shieldCursor","messageShieldRun","textDodge","scamRainDodge","packetPaddle","scamWhack","fakeAdClean"], 5],
      [["attachmentFlash","attachmentMemory","fileDelete","fileExplorerDelete","downloadDelete","taskbarFileDelete","dragTrash","giftCardShredder","passwordVaultDrag"], 3],
      [["gameChatReport","lobbyMute","emailBlock","smsBlock","smsReport","chatRefuse","romanceSwipe","marketplaceMatch","swipeJudge","socialFirewall","romanceEvidenceChat","phoneTapSequence"], 3],
      [["dangerWebsite","siteInspector","freeSiteExit","privacyExit","passwordFill","passwordManagerFill","domainDuel","qrScan","qrLensFocus","wifiHotspotChoice","vpnTunnelSwitch","browserPatchRun","browserRedirectMaze","linkBridge"], 3],
      [["safeChoice","deepfakeCall","deepfakeSpot","bankStatementHunt","shoppingCartAudit","extensionAudit","permissionsToggle","permissionToggle","privacyCleaner","clipboardCleaner","familyCallOrder","sequenceBuilder","firewallPatchGrid","mfaApprovalGate","mfaShield","moneyGuard","categoryMatch","sortBasket","safeWordChallenge","callInterrupt"], 4]
    ];
    const chosen = [];
    const used = new Set();
    groups.forEach(([types, count]) => {
      sample(v16DifficultyFilter(pool.filter((round) => types.includes(round.type) && !used.has(round.id))), count).forEach((round) => {
        chosen.push(round); used.add(round.id);
      });
    });
    const remaining = shuffle(v16DifficultyFilter(pool.filter((round) => !used.has(round.id))));
    while (chosen.length < target && remaining.length) chosen.push(remaining.shift());
    return shuffle(chosen).slice(0, target);
  }

  startGame = function v164Override_startGame() {
    if (!v16IsProfileUnlocked(v16GetActiveProfile().id)) return v16RequireUnlocked(startGame);
    clearLoops(); ensureAudio(); v16NewRunState("full");
    state.selected = v164BalancedRounds(V164_REGULAR_ROUNDS);
    const boss = ROUNDS.find((round) => round.type === "bossRush");
    if (boss) state.selected.push(boss);
    v16SaveProgressSnapshot();
    renderRound();
  }

  function v164AppendEndlessBatch() {
    const recent = new Set(state.selected.slice(-30).map((round) => round.id));
    let candidates = shuffle(v16DifficultyFilter(v164RoundPool().filter((round) => !recent.has(round.id))));
    if (candidates.length < V164_ENDLESS_BATCH) candidates = shuffle(v16DifficultyFilter(v164RoundPool()));
    state.selected.push(...candidates.slice(0, V164_ENDLESS_BATCH));
  }

  function startEndless() {
    if (!v16IsProfileUnlocked(v16GetActiveProfile().id)) return v16RequireUnlocked(startEndless);
    clearLoops(); ensureAudio(); v16NewRunState("endless");
    state.selected = [];
    v164AppendEndlessBatch();
    v16SaveProgressSnapshot();
    renderRound();
  }

  nextRound = function v164Override_nextRound() {
    if (state.practiceMode || state.runMode === "practice") return showHome();
    if (state.trust <= 0) return showResults(true);
    state.idx += 1;
    if (state.runMode === "endless") {
      if (state.idx >= state.selected.length - 2) v164AppendEndlessBatch();
      v16SaveProgressSnapshot();
      return renderRound();
    }
    if (state.idx >= state.selected.length) return showResults(false);
    v16SaveProgressSnapshot();
    renderRound();
  }

  /* ============================================================
     V16.4E) Separate Result Recording + Leaderboards
     ============================================================ */
  v16RecordResult = function v164Override_v16RecordResult(lost) {
    if (state.resultRecorded) return v16GetActiveProfile();
    state.resultRecorded = true;
    const profile = v16GetActiveProfile();
    const mode = state.runMode || "full";
    const isDemo = mode === "demo";
    const isPractice = mode === "practice" || state.practiceMode;
    const isVersus = mode === "versus";
    if (isPractice || isVersus) return profile;
    const score = Number(state.score || 0);
    const rounds = Number(state.correct || 0) + Number(state.mistakes || 0);
    const updates = {
      totalScore: Number(profile.totalScore || 0) + score,
      lastScore: score,
      lastPlayedAt: v16NowIso(),
      progress: null
    };
    if (isDemo) {
      updates.demoBestScore = Math.max(Number(profile.demoBestScore || 0), score);
      updates.demoRuns = Number(profile.demoRuns || 0) + 1;
    } else if (mode === "endless") {
      updates.endlessBestScore = Math.max(Number(profile.endlessBestScore || 0), score);
      updates.endlessBestRounds = Math.max(Number(profile.endlessBestRounds || 0), rounds);
      updates.endlessRuns = Number(profile.endlessRuns || 0) + 1;
    } else {
      updates.regularBestScore = Math.max(Number(profile.regularBestScore ?? profile.bestScore ?? 0), score);
      updates.regularWins = Number(profile.regularWins ?? profile.wins ?? 0) + (!lost ? 1 : 0);
      updates.regularRuns = Number(profile.regularRuns ?? profile.runs ?? 0) + 1;
      updates.bestScore = updates.regularBestScore;
      updates.wins = updates.regularWins;
      updates.runs = updates.regularRuns;
    }
    const updated = v16UpdateProfile(profile.id, updates) || profile;
    localStorage.ffV10Best = String(Math.max(Number(localStorage.ffV10Best || 0), Number(updated.regularBestScore || 0)));
    const history = v16ReadJson(V16_STORAGE.history, []);
    history.unshift({ id: v16Uuid(), profileId: profile.id, username: profile.username, score, correct: state.correct, bestStreak: state.bestStreak, lost: Boolean(lost), mode, rounds, playedAt: v16NowIso() });
    v16WriteJson(V16_STORAGE.history, history.slice(0, 150));
    if (!isDemo && updated.globalShare && V16_ONLINE.user) {
      v164SubmitModeScore(updated, mode === "endless" ? "endless" : "regular", score, rounds, !lost).catch((error) => console.warn("Mode score publish failed:", error));
    }
    return updated;
  }

  function v164LocalLeaderboard(mode) {
    return v16GetProfiles().map((profile) => mode === "endless" ? {
      username: profile.username,
      score: Number(profile.endlessBestScore || 0),
      wins: 0,
      rounds: Number(profile.endlessBestRounds || 0)
    } : {
      username: profile.username,
      score: Number(profile.regularBestScore ?? profile.bestScore ?? 0),
      wins: Number(profile.regularWins ?? profile.wins ?? 0),
      rounds: 0
    }).filter((row) => row.score > 0 || row.wins > 0 || row.rounds > 0)
      .sort((a, b) => b.score - a.score || b.rounds - a.rounds || b.wins - a.wins || a.username.localeCompare(b.username))
      .map((row, index) => ({ ...row, rank_position: index + 1 }));
  }

  function v164LeaderboardRows(rows, mode) {
    if (!rows.length) return `<div class="leaderboard-empty">No ${mode === "endless" ? "Endless" : "Arcade"} scores yet.</div>`;
    return `<div class="leaderboard-table v164-leaderboard-table" role="table">
      <div class="leaderboard-row leaderboard-head"><span>Rank</span><span>Player</span><span>Score</span><span>${mode === "endless" ? "Rounds" : "Wins"}</span></div>
      ${rows.map((row, index) => {
        const rank = Number(row.rank_position || index + 1);
        const medal = rank <= 3 ? ["🥇","🥈","🥉"][rank - 1] : `#${rank}`;
        return `<div class="leaderboard-row"><span class="rank-medal">${medal}</span><strong>${esc(row.username)}</strong><span>${Number(row.score || 0).toLocaleString()}</span><span>${Number(mode === "endless" ? row.rounds || 0 : row.wins || 0).toLocaleString()}</span></div>`;
      }).join("")}</div>`;
  }

  async function v164HydrateModeBoard(mode) {
    const host = $("#v164GlobalBoard");
    if (!host) return;
    if (!v16GlobalConfigured()) { host.innerHTML = `<div class="leaderboard-empty">Worldwide rankings are currently unavailable.</div>`; return; }
    host.innerHTML = `<div class="leaderboard-loading">Loading worldwide ${mode === "endless" ? "Endless" : "Arcade"} scores…</div>`;
    try {
      const rows = await v164FetchModeLeaderboard(mode, 50);
      if ($("#v164GlobalBoard")) host.innerHTML = v164LeaderboardRows(rows, mode);
    } catch (error) {
      host.innerHTML = `<div class="leaderboard-empty"><strong>Could not load rankings.</strong><p>${esc(error.message || "Try again shortly.")}</p></div>`;
    }
  }

  showLeaderboard = function v164Override_showLeaderboard(mode = "regular") {
    const selectedMode = mode === "endless" ? "endless" : "regular";
    const localRows = v164LocalLeaderboard(selectedMode);
    render(`<section class="screen">${topbar()}<div class="panel leaderboard-panel v164-leaderboard-panel">
      <header class="leaderboard-hero"><div><span class="eyebrow">Scored solo gameplay only</span><h1>${selectedMode === "endless" ? "Endless Mode rankings" : "Arcade Run rankings"}</h1><p>Demo and online-room scores are not mixed into these boards.</p></div><div class="leaderboard-actions"><button class="btn" id="backBtn">Back Home</button><button class="btn btn-secondary" id="profilesBtn">Accounts</button></div></header>
      <div class="v164-board-tabs"><button class="btn ${selectedMode === "regular" ? "btn-primary" : "btn-secondary"}" id="regularBoardBtn">🎮 Arcade + Boss</button><button class="btn ${selectedMode === "endless" ? "btn-primary" : "btn-secondary"}" id="endlessBoardBtn">♾️ Endless</button></div>
      <div class="leaderboard-columns">
        <section class="leaderboard-board"><div class="leaderboard-title"><strong>💾 This Device</strong><span>${localRows.length} ranked</span></div>${v164LeaderboardRows(localRows, selectedMode)}</section>
        <section class="leaderboard-board"><div class="leaderboard-title"><strong>🌎 Worldwide</strong><span>Persistent database</span></div><div id="v164GlobalBoard"></div></section>
      </div>
      <div class="privacy-note compact"><strong>Fair separation</strong><p>Arcade ranks use completed Arcade Runs. Endless ranks use survival scores and rounds cleared. Demo and online multiplayer remain separate.</p></div>
    </div></section>`);
    wireTopbar();
    on($("#backBtn"), "click", showHome);
    on($("#profilesBtn"), "click", () => showProfileManager("profiles"));
    on($("#regularBoardBtn"), "click", () => showLeaderboard("regular"));
    on($("#endlessBoardBtn"), "click", () => showLeaderboard("endless"));
    v164HydrateModeBoard(selectedMode);
  }

  showResults = function v164Override_showResults(lost) {
    const endless = state.runMode === "endless";
    v163ShowResults(endless ? true : lost);
    if (!endless) return;
    const title = $(".results-panel h1");
    const subtitle = $(".results-panel > p");
    if (title) title.textContent = "Endless run complete!";
    if (subtitle) subtitle.textContent = `You survived ${Number(state.correct + state.mistakes)} rounds. Endless score and survival progress were saved separately.`;
    const eyebrow = $(".results-panel .eyebrow");
    if (eyebrow) eyebrow.textContent = `Endless recap · ${v16GetActiveProfile().username}`;
    const preview = $(".result-leaderboard-preview");
    if (preview) preview.innerHTML = `<div class="leaderboard-title"><strong>♾️ Endless standings on this device</strong><button class="btn btn-secondary btn-small" id="resultLeaderboardBtnV164">Full Endless Board</button></div>${v164LeaderboardRows(v164LocalLeaderboard("endless").slice(0,5), "endless")}`;
    const again = $("#againBtn");
    if (again) {
      again.textContent = "Play Endless Again";
      again.addEventListener("click", (event) => { event.preventDefault(); event.stopImmediatePropagation(); startEndless(); }, { capture: true });
    }
    on($("#resultLeaderboardBtnV164"), "click", () => showLeaderboard("endless"));
  }

  /* ============================================================
     V16.4F) Slower Online Reading Pace
     ============================================================ */
  secondsFor = function v164Override_secondsFor(round) {
    let seconds = v163SecondsFor(round);
    if (state.runMode === "versus" && V16_ONLINE.match?.roomMode) {
      const pace = V16_ONLINE.match.timerMode || V16_ONLINE.room?.row?.settings?.timer_mode || "relaxed";
      const multiplier = pace === "no_rush" ? 2.15 : pace === "standard" ? 1.35 : pace === "challenge" ? 1.0 : 1.7;
      seconds = Math.round(seconds * multiplier);
    }
    return seconds;
  }

  /* ============================================================
     V16.4G) Responsive Swipe Cards + Real Touch Swiping
     ============================================================ */
  drawSwipe = function v164Override_drawSwipe(round, mode) {
    const profile = round.profiles[state.step] || round.profiles[0];
    const isRomance = mode === "romance";
    return `<div class="swipe-stage v164-swipe-stage">
      <div class="v164-swipe-progress"><span>${state.step + 1} of ${round.profiles.length}</span><div><i style="width:${((state.step + 1) / round.profiles.length) * 100}%"></i></div></div>
      <article class="${isRomance ? "profile-card" : "buyer-card"} v164-swipe-card" id="v164SwipeCard">
        <div class="profile-top"><div class="profile-photo">${isRomance ? "💘" : "🛒"}</div><div><h3>${esc(profile[0])}</h3><p class="muted">Read the whole message before deciding.</p></div></div>
        <div class="scenario-text v164-swipe-copy">${esc(profile[1])}</div>
        <div class="v164-swipe-hints"><span>← Scam</span><span>Safer →</span></div>
      </article>
      <div class="swipe-controls"><button class="btn btn-danger swipe-btn" data-swipe="left">← Scam / Reject</button><button class="btn btn-good swipe-btn" data-swipe="right">Looks OK →</button></div>
      <p class="v164-control-note">Tap a button, use ←/→, or swipe the card.</p>
    </div>`;
  }

  wireSwipe = function v164Override_wireSwipe(round, mode) {
    let startX = null;
    let deltaX = 0;
    function answer(direction) {
      if (state.answered) return;
      const profile = round.profiles[state.step];
      const isScam = Boolean(profile[2]);
      const correct = isScam ? direction === "left" : direction === "right";
      if (!correct) return failRound(isScam ? "That card contained scam pressure." : "That interaction was safer.");
      sfx("coin");
      state.step += 1;
      if (state.step >= round.profiles.length) return passRound(mode === "romance" ? "Romance swipes cleared." : "Marketplace swipes cleared.");
      $("#microgame").innerHTML = drawSwipe(round, mode);
      wireSwipe(round, mode);
    }
    $$(".swipe-btn").forEach((button) => on(button, "click", () => answer(button.dataset.swipe)));
    on(document, "keydown", (event) => { if (event.key === "ArrowLeft") answer("left"); if (event.key === "ArrowRight") answer("right"); });
    const card = $("#v164SwipeCard");
    on(card, "pointerdown", (event) => { startX = event.clientX; deltaX = 0; card.setPointerCapture?.(event.pointerId); });
    on(card, "pointermove", (event) => {
      if (startX === null) return;
      deltaX = event.clientX - startX;
      card.style.transform = `translateX(${clamp(deltaX, -90, 90)}px) rotate(${clamp(deltaX / 18, -5, 5)}deg)`;
    });
    on(card, "pointerup", () => {
      card.style.transform = "";
      if (Math.abs(deltaX) >= 55) answer(deltaX < 0 ? "left" : "right");
      startX = null; deltaX = 0;
    });
    on(card, "pointercancel", () => { card.style.transform = ""; startX = null; deltaX = 0; });
  }

  /* ============================================================
     V16.4H) Game-Chat Culprit Appears at a Random Message Position
     ============================================================ */
  drawLobbyV13 = function v164Override_drawLobbyV13(round) {
    const seedPlayers = round.players || ["PixelPat", "GardenMom", "Runner42", "StudyBuddy", "NovaKid", "CraftyCat", "RapidFox", "ByteBuddy"];
    const roster = shuffle([...new Set(seedPlayers.concat(round.player || [], round.spammer || []))]).slice(0, Math.min(8, Math.max(6, seedPlayers.length)));
    const scamPlayer = roster[Math.floor(Math.random() * roster.length)] || "ScamBot99";
    const decoys = roster.filter((name) => name !== scamPlayer);
    const firstScamIndex = Math.floor(Math.random() * 6); // first, second, third, fourth, fifth, or sixth message
    const scamLines = shuffle([
      round.message || round.scenario || "FREE COINS! Use my link and log in now!",
      "Hurry—this reward expires soon.",
      "Do not tell moderators or the offer disappears.",
      "Send your login code and I can unlock the prize."
    ]);
    const safeLines = shuffle([
      "Anyone want to play the next round?", "Good game!", "I found the checkpoint.",
      "Use the official game menu for events.", "Please do not click random links.",
      "Can someone help with the puzzle?", "Thanks for the invite!"
    ]);
    const queue = [];
    for (let index = 0; index < 22; index += 1) {
      const scamTurn = index === firstScamIndex || (index > firstScamIndex && (index - firstScamIndex) % 4 === 0);
      queue.push(scamTurn
        ? { from: scamPlayer, text: scamLines[index % scamLines.length], scam: true }
        : { from: decoys[index % Math.max(1, decoys.length)] || "Player", text: safeLines[index % safeLines.length], scam: false });
    }
    state.v14Lobby = { scamPlayer, queue, visibleScam: 0, selected: null, lineCount: 0, firstScamIndex };
    const assisted = state.playerMode === "senior" || state.difficulty === "easy";
    return `<div class="lobby-ui live-lobby-ui v164-chat-report">
      <aside class="sidebar"><h3>Players</h3><p class="muted small">The suspicious sender and message position change every game.</p><div class="player-list">${roster.map((name) => `<button class="lobby-player" data-player="${esc(name)}">${esc(name)}</button>`).join("")}</div></aside>
      <div class="mainarea"><div class="live-chat-header"><strong>Live Game Room</strong><span id="liveChatStatus">Messages incoming…</span></div><div class="chat-log live-chat-log" id="liveChatLog"><div class="chat-line system-line">Watch the sender names. ${assisted ? "Suspicious messages are highlighted in this mode." : "Use message clues—there is no highlight."}</div></div><div class="player-menu" id="playerMenu"><strong id="menuTitle">Select a suspicious player first.</strong><div class="grid3"><button class="action-btn" data-menu-action="friend">Add Friend</button><button class="action-btn" data-menu-action="report">Mute + Report</button><button class="action-btn" data-menu-action="open">Open Link</button></div></div></div>
    </div>`;
  }

  wireLobbyV13 = function v164Override_wireLobbyV13(round) {
    const lobby = state.v14Lobby;
    const log = $("#liveChatLog");
    let index = 0;
    const highlight = state.playerMode === "senior" || state.difficulty === "easy";
    function addLine() {
      if (state.answered || !log || !lobby) return;
      const line = lobby.queue[index++] || { from: lobby.scamPlayer, text: "Use my link now!", scam: true };
      lobby.lineCount += 1;
      if (line.scam) lobby.visibleScam += 1;
      const node = document.createElement("div");
      node.className = `chat-line ${line.scam && highlight ? "scam-chat-line" : ""}`;
      node.innerHTML = `<strong>${esc(line.from)}:</strong> ${esc(line.text)}`;
      log.appendChild(node); log.scrollTop = log.scrollHeight;
      const status = $("#liveChatStatus");
      if (status) status.textContent = `${lobby.lineCount} messages received`;
    }
    const first = setTimeout(addLine, 250);
    const timer = setInterval(addLine, state.playerMode === "senior" ? 1150 : 850);
    addCleanup(() => clearTimeout(first)); addCleanup(() => clearInterval(timer));
    $$(".lobby-player").forEach((button) => on(button, "click", () => {
      lobby.selected = button.dataset.player;
      $$(".lobby-player").forEach((node) => node.classList.remove("selected"));
      button.classList.add("selected"); $("#playerMenu")?.classList.add("open");
      if ($("#menuTitle")) $("#menuTitle").textContent = `${lobby.selected} options`;
      if (lobby.selected !== lobby.scamPlayer) minorPenalty("That player has not posted the scam message. Keep watching the sender names.");
    }));
    $$('[data-menu-action]').forEach((button) => on(button, "click", () => {
      if (!lobby.selected) return toast("Select a player first.");
      if (button.dataset.menuAction === "open") return failRound("Opened the scam link from game chat.");
      if (lobby.selected === lobby.scamPlayer && button.dataset.menuAction === "report") return passRound("Suspicious game-chat account muted and reported.");
      minorPenalty("Choose Mute + Report for the suspicious sender.");
    }));
  }

  drawGameChat = function v164Override_drawGameChat(round) { return drawLobbyV13(round); }
  wireGameChat = function v164Override_wireGameChat(round) { return wireLobbyV13(round); }

  /* ============================================================
     V16.4I) Universal Touch + Tilt Controller for Moving Games
     ============================================================ */
  function v164DispatchKey(type, key, code = key) {
    document.dispatchEvent(new KeyboardEvent(type, { key, code, bubbles: true, cancelable: true }));
  }

  function v164UniversalController(round) {
    if (!V164_MOVEMENT_TYPES.has(round.type)) return "";
    const vertical = V164_VERTICAL_MOVEMENT_TYPES.has(round.type);
    return `<div class="v164-mobile-controller" id="v164MobileController" aria-label="Touch movement controls">
      <div class="v164-controller-label"><span>Touch Controls</span><button type="button" id="v164TiltBtn">📐 Tilt</button></div>
      <div class="v164-control-pad">
        ${vertical ? `<button data-v164-key="ArrowUp" aria-label="Move up">▲</button>` : ""}
        <button data-v164-key="ArrowLeft" aria-label="Move left">◀</button>
        <button data-v164-key="Space" data-v164-code="Space" class="action" aria-label="Action or jump">●</button>
        <button data-v164-key="ArrowRight" aria-label="Move right">▶</button>
        ${vertical ? `<button data-v164-key="ArrowDown" aria-label="Move down">▼</button>` : ""}
      </div>
      <small id="v164TiltStatus">Tap controls always work.</small>
    </div>`;
  }

  function v164WireUniversalController(round) {
    const controller = $("#v164MobileController");
    if (!controller) return;
    $$('[data-v164-key]', controller).forEach((button) => {
      const key = button.dataset.v164Key;
      const code = button.dataset.v164Code || key;
      const down = (event) => { event.preventDefault(); button.classList.add("pressed"); v164DispatchKey("keydown", key, code); };
      const up = (event) => { event.preventDefault(); button.classList.remove("pressed"); v164DispatchKey("keyup", key, code); };
      on(button, "pointerdown", down); on(button, "pointerup", up); on(button, "pointercancel", up); on(button, "pointerleave", up);
    });
    on($("#v164TiltBtn"), "click", async () => {
      const ok = await v16EnableMotionControls();
      if (ok) { state.deviceMode = "motion"; v164StartTiltBridge(round); if ($("#v164TiltStatus")) $("#v164TiltStatus").textContent = "Tilt active. Hold your phone naturally."; }
    });
    if (state.deviceMode === "motion") v164StartTiltBridge(round);
  }

  function v164StartTiltBridge(round) {
    let horizontal = "";
    let vertical = "";
    function release(axisKey) { if (axisKey) v164DispatchKey("keyup", axisKey); }
    function setAxis(current, next) {
      if (current === next) return current;
      release(current);
      if (next) v164DispatchKey("keydown", next);
      return next;
    }
    function frame() {
      if (state.answered || state.deviceMode !== "motion" || !state.roundStarted) { release(horizontal); release(vertical); return; }
      const x = Number(state.tiltX || 0);
      const y = Number(state.tiltY || 0);
      horizontal = setAxis(horizontal, x < -3.5 ? "ArrowLeft" : x > 3.5 ? "ArrowRight" : "");
      if (V164_VERTICAL_MOVEMENT_TYPES.has(round.type)) vertical = setAxis(vertical, y < -5 ? "ArrowUp" : y > 5 ? "ArrowDown" : "");
      state.v164TiltAnim = requestAnimationFrame(frame);
    }
    if (state.v164TiltAnim) cancelAnimationFrame(state.v164TiltAnim);
    state.v164TiltAnim = requestAnimationFrame(frame);
    addCleanup(() => { if (state.v164TiltAnim) cancelAnimationFrame(state.v164TiltAnim); release(horizontal); release(vertical); });
  }

  function v164InstallOrientationTracking() {
    if (window.__ffV164OrientationInstalled) return;
    window.__ffV164OrientationInstalled = true;
    window.addEventListener("deviceorientation", (event) => {
      const angle = Number(screen.orientation?.angle || window.orientation || 0);
      let x = Number(event.gamma || 0);
      let y = Number(event.beta || 0) - 45;
      if (angle === 90) { const oldX = x; x = y; y = -oldX; }
      if (angle === 270 || angle === -90) { const oldX = x; x = -y; y = oldX; }
      state.tiltX = clamp(x - Number(state.tiltBaseline || 0), -30, 30);
      state.tiltY = clamp(y - Number(state.tiltBaselineY || 0), -30, 30);
    }, { passive: true });
  }

  function v164EnhanceRenderedRound() {
    const round = state.current;
    if (!round) return;
    const zone = $("#microgame");
    const panel = $(".round-panel");
    if (zone) { zone.classList.add("v164-responsive-microgame"); zone.dataset.roundType = round.type; }
    if (panel) panel.classList.add("v164-responsive-round-panel");
    if (V164_MOVEMENT_TYPES.has(round.type) && !$("#v164MobileController")) {
      zone?.insertAdjacentHTML("afterend", v164UniversalController(round));
      v164WireUniversalController(round);
    }
    const roundChip = $(".round-header .chip:last-child");
    if (roundChip && state.runMode === "endless") roundChip.textContent = `Endless Round ${state.idx + 1}`;
    v164InstallOrientationTracking();
    v164ApplyAccessibility();
  }

  renderRound = function v164Override_renderRound() {
    v163RenderRound();
    requestAnimationFrame(v164EnhanceRenderedRound);
  }

  /* ============================================================
     V16.4J) Simpler Player-Facing Account Copy
     ============================================================ */
  v16AccountNav = function v164Override_v16AccountNav(activeTab) {
    const tabs = [["profiles","👥","Profiles"],["security","🔐","Password"],["cloud","🌎","Online Play"],["danger","⚙️","Rename or Delete"]];
    return `<nav class="account-nav" aria-label="Account settings">${tabs.map(([key,icon,label]) => `<button class="account-nav-btn ${activeTab === key ? "active" : ""}" data-account-tab="${key}"><span>${icon}</span><strong>${label}</strong></button>`).join("")}</nav>`;
  }

  function v164SecuritySection(active) {
    const hasPassword = v16ProfileHasPassword(active);
    return `<section class="account-section"><div class="account-section-head"><div><span class="eyebrow">Profile password</span><h2>Keep ${esc(active.username)} private.</h2><p>This one password unlocks the profile and protects renaming, deletion, and saved progress.</p></div><div class="account-security-badge ${hasPassword ? "secure" : "attention"}">${hasPassword ? "🔐 Protected" : "Setup required"}</div></div>
      ${!hasPassword ? `<form class="account-form" id="setPasswordForm"><div class="form-heading"><span>🔑</span><div><strong>Create a password</strong><p>Use something memorable that other people cannot guess.</p></div></div><label><span>New password</span><div class="password-input-wrap"><input id="setPassword" type="password" autocomplete="new-password" required><button type="button" data-toggle-password="setPassword">Show</button></div></label><label><span>Confirm password</span><div class="password-input-wrap"><input id="setPasswordConfirm" type="password" autocomplete="new-password" required><button type="button" data-toggle-password="setPasswordConfirm">Show</button></div></label>${v16PasswordChecklistHtml(active.username, "setPassword")}<p class="form-error" id="securityError"></p><button class="btn btn-primary account-submit" type="submit">Save Password</button></form>` : `<div class="security-overview-grid"><article><span>${v16IsProfileUnlocked(active.id) ? "🔓" : "🔒"}</span><strong>${v16IsProfileUnlocked(active.id) ? "Unlocked now" : "Locked now"}</strong><p>Lock the profile before handing the device to someone else.</p><button class="btn btn-secondary" id="lockProfileBtn" ${v16IsProfileUnlocked(active.id) ? "" : "disabled"}>Lock Now</button></article><article><span>🛡️</span><strong>Protected actions</strong><p>The password is required to rename, delete, or change this profile.</p></article></div><button class="btn btn-primary" id="changePasswordBtn">Change Password</button><div class="privacy-note compact"><strong>Remember your password</strong><p>There is no email recovery because the game does not collect personal contact information.</p></div>`}
    </section>`;
  }

  function v164OnlineSection(active) {
    const configured = v16GlobalConfigured();
    const connected = Boolean(V16_ONLINE.user);
    const unlocked = v16IsProfileUnlocked(active.id);
    return `<section class="account-section"><div class="account-section-head"><div><span class="eyebrow">Online Play</span><h2>Rooms, teams, and worldwide rankings.</h2><p>Other players see only your gamer tag and game progress.</p></div><div class="account-security-badge ${connected ? "secure" : configured ? "attention" : "offline"}">${connected ? "🌎 Connected" : configured ? "Ready" : "Unavailable"}</div></div>
      ${!configured ? `<div class="cloud-setup-card"><strong>Online Play is not available on this copy of the game.</strong><p>Local Arcade, Endless, Demo, profiles, and saved progress still work normally.</p></div>` : connected ? `<div class="cloud-account-card"><div class="cloud-avatar">🌎</div><div><strong>${esc(active.username)}</strong><p>Ready for room codes, Quick Match, teams, and rankings.</p></div><span class="online-ready-pill">Online</span></div><div class="online-action-grid"><article><span>🎮</span><strong>Play Online</strong><p>Create a private room, join a code, or search for players.</p><button class="btn btn-primary" id="openMultiplayerBtn">Open Online Play</button></article><article><span>🏆</span><strong>Publish Solo Scores</strong><p>Arcade and Endless leaderboards remain separate.</p><label class="privacy-toggle global-share-large"><input id="globalShareToggle" type="checkbox" ${active.globalShare ? "checked" : ""}><span><strong>Publish my solo best scores</strong><small>Online-room and Demo scores are excluded.</small></span></label><button class="btn btn-good" id="publishBestNowBtn" ${Math.max(active.regularBestScore || 0, active.endlessBestScore || 0) > 0 ? "" : "disabled"}>Sync My Saved Best Scores</button><p class="form-error" id="globalSyncError"></p></article></div><div class="button-row"><button class="btn btn-secondary" id="cloudSignOutBtn">Disconnect on This Browser</button></div>` : `<div class="online-simple-connect"><div class="online-connect-identity"><div class="profile-avatar">${esc(active.username.slice(0,1).toUpperCase())}</div><div><span>Play online as</span><strong>${esc(active.username)}</strong><small>${unlocked ? "Your profile is ready." : "Unlock this profile first."}</small></div></div><button class="btn btn-good online-connect-button" id="anonymousConnectBtn" ${unlocked ? "" : "disabled"}>Connect to Online Play</button><p class="form-error" id="anonymousConnectError"></p></div>`}
    </section>`;
  }

  v16AccountSectionHtml = function v164Override_v16AccountSectionHtml(tab, profiles, active) {
    if (tab === "security") return v164SecuritySection(active);
    if (tab === "cloud") return v164OnlineSection(active);
    return v163AccountSectionHtml(tab, profiles, active);
  }

  showOnlineSetupHelp = function v164Override_showOnlineSetupHelp() {
    render(`<section class="screen">${topbar()}<div class="panel setup-help-panel"><span class="eyebrow">Online Play</span><h1>Online Play is not available yet.</h1><p>You can still use every local game mode, profile, password, saved run, and device leaderboard.</p><div class="button-row"><button class="btn btn-primary" id="setupBackBtn">Back</button></div></div></section>`);
    wireTopbar(); on($("#setupBackBtn"), "click", () => showProfileManager("cloud"));
  }

  /* ============================================================
     V16.4K) Reactions, Live Room Updates, Team Assignment
     ============================================================ */
  function v164ReactionDock() {
    return `<div class="v164-reaction-dock" aria-label="Preset reactions"><span>Quick reactions</span>${[...V164_ALLOWED_REACTIONS].map(([key,label]) => `<button type="button" data-v164-reaction="${key}">${label}</button>`).join("")}</div>`;
  }

  function v164ShowReaction(payload) {
    if (!payload || !V164_ALLOWED_REACTIONS.has(payload.key)) return;
    let host = $("#v164ReactionStream");
    if (!host) { host = document.createElement("div"); host.id = "v164ReactionStream"; host.className = "v164-reaction-stream"; document.body.appendChild(host); }
    const node = document.createElement("div");
    node.className = "v164-floating-reaction";
    node.innerHTML = `<strong>${esc(payload.username || "Player")}</strong><span>${esc(V164_ALLOWED_REACTIONS.get(payload.key))}</span>`;
    host.appendChild(node);
    setTimeout(() => node.remove(), 3200);
  }

  async function v164SendReaction(key) {
    if (!V164_ALLOWED_REACTIONS.has(key) || !V16_ONLINE.roomChannel) return;
    const now = Date.now();
    if (now - Number(V16_ONLINE.lastReactionAt || 0) < 1500) return toast("Please wait before sending another reaction.");
    V16_ONLINE.lastReactionAt = now;
    const payload = { key, username: v16GetActiveProfile().username, userId: V16_ONLINE.user?.id, sentAt: now };
    v164ShowReaction(payload);
    await V16_ONLINE.roomChannel.send({ type: "broadcast", event: "reaction", payload }).catch?.(() => {});
  }

  function v164WireReactionDock(root = document) {
    $$('[data-v164-reaction]', root).forEach((button) => on(button, "click", () => v164SendReaction(button.dataset.v164Reaction)));
  }

  v162ClearRoomTimers = function v164Override_v162ClearRoomTimers() {
    v163ClearRoomTimers();
    if (V16_ONLINE.roomLivePoll) clearInterval(V16_ONLINE.roomLivePoll);
    if (V16_ONLINE.matchmakingPoll) clearInterval(V16_ONLINE.matchmakingPoll);
    V16_ONLINE.roomLivePoll = null;
    V16_ONLINE.matchmakingPoll = null;
  }

  v162DisconnectRoomChannel = function v164Override_v162DisconnectRoomChannel() {
    v162ClearRoomTimers();
    const client = V16_ONLINE.client;
    if (client && V16_ONLINE.roomChannel) client.removeChannel(V16_ONLINE.roomChannel).catch?.(() => {});
    V16_ONLINE.roomChannel = null;
  }

  v162FetchRoomState = async function v164Override_v162FetchRoomState() {
    const client = v16SupabaseClient();
    const room = V16_ONLINE.room;
    if (!client || !room?.id) return null;
    const [roomResponse, playersResponse] = await Promise.all([
      client.from("ff_rooms").select("id,code,host_user_id,status,max_players,round_count,round_ids,current_round,starts_at,created_at,expires_at,finished_at,settings").eq("id", room.id).single(),
      client.from("ff_room_players").select("room_id,user_id,username,is_host,team_no,score,current_round,finished,joined_at,last_seen,left_at").eq("room_id", room.id).order("score", { ascending: false }).order("joined_at", { ascending: true })
    ]);
    if (roomResponse.error) throw roomResponse.error;
    if (playersResponse.error) throw playersResponse.error;
    room.row = roomResponse.data; room.code = roomResponse.data.code; room.players = playersResponse.data || [];
    v162RenderRoomLobby(); v16UpdateVersusHud(); v162RenderRoomResults(); v164RenderSpectatorPanel();
    if (room.row.status === "playing" && room.row.round_ids?.length && !room.matchStarted) { room.matchStarted = true; v162BeginRoomMatch(room.row); }
    if (room.row.status === "cancelled") { toast("The host closed this room."); v162ResetRoomLocalState(); showMultiplayerLobby(); }
    return room;
  }

  v162SubscribeToRoom = async function v164Override_v162SubscribeToRoom() {
    const client = v16SupabaseClient();
    const room = V16_ONLINE.room;
    if (!client || !room?.id || !V16_ONLINE.user) return;
    v162DisconnectRoomChannel();
    const channel = client.channel(`ff-room-live-${room.id}`, { config: { broadcast: { self: false } } });
    V16_ONLINE.roomChannel = channel;
    channel
      .on("postgres_changes", { event: "*", schema: "public", table: "ff_rooms", filter: `id=eq.${room.id}` }, () => v162ScheduleRoomRefresh(40))
      .on("postgres_changes", { event: "*", schema: "public", table: "ff_room_players", filter: `room_id=eq.${room.id}` }, () => v162ScheduleRoomRefresh(40))
      .on("broadcast", { event: "reaction" }, ({ payload }) => v164ShowReaction(payload))
      .on("broadcast", { event: "progress" }, ({ payload }) => {
        if (!payload?.userId || payload.userId === V16_ONLINE.user?.id) return;
        const player = (V16_ONLINE.room?.players || []).find((item) => item.user_id === payload.userId);
        if (player) { player.score = Number(payload.score || 0); player.current_round = Number(payload.round || 0); player.finished = Boolean(payload.finished); }
        v16UpdateVersusHud(); v164RenderSpectatorPanel();
      });
    channel.subscribe((status) => { const node = $("#roomRealtimeStatus"); if (node) node.textContent = status === "SUBSCRIBED" ? "Live updates connected" : status; if (status === "SUBSCRIBED") v162ScheduleRoomRefresh(0); });
    const config = v16GetGlobalConfig();
    V16_ONLINE.roomHeartbeatTimer = setInterval(() => client.rpc(config.heartbeatRoomRpc, { p_room_id: room.id }).catch?.(() => {}), 30000);
    V16_ONLINE.roomLivePoll = setInterval(() => v162FetchRoomState().catch(() => {}), 2500);
  }

  async function v164CreateRoom(options) {
    await v162EnsureAnonymousOnlineSession();
    const client = v16SupabaseClient(); const config = v16GetGlobalConfig(); const profile = v16GetActiveProfile();
    const { data, error } = await client.rpc(config.createRoomV164Rpc, {
      p_username: profile.username,
      p_max_players: options.mode === "team_2v2" ? 4 : clamp(Number(options.maxPlayers || 8), 2, 8),
      p_round_count: clamp(Number(options.roundCount || 5), 3, 10),
      p_mode: options.mode || "solo",
      p_timer_mode: options.timerMode || "relaxed",
      p_score_visibility: options.scoreVisibility || "live"
    });
    if (error) throw new Error(v162FriendlyOnlineError(error));
    V16_ONLINE.room = { id: data.room_id, code: data.room_code, row: null, players: [], matchStarted: false };
    await v162SubscribeToRoom(); await v162FetchRoomState(); return V16_ONLINE.room;
  }

  v162JoinRoom = async function v164Override_v162JoinRoom(code) {
    await v162EnsureAnonymousOnlineSession();
    const client = v16SupabaseClient(); const config = v16GetGlobalConfig(); const profile = v16GetActiveProfile(); const cleanCode = v162CleanRoomCode(code);
    if (cleanCode.length !== 6) throw new Error("Enter the complete six-character room code.");
    const { data, error } = await client.rpc(config.joinRoomV164Rpc, { p_code: cleanCode, p_username: profile.username });
    if (error) throw new Error(v162FriendlyOnlineError(error));
    V16_ONLINE.room = { id: data.room_id, code: data.room_code, row: null, players: [], matchStarted: false };
    await v162SubscribeToRoom(); await v162FetchRoomState(); return V16_ONLINE.room;
  }

  async function v164SetTeam(teamNo) {
    const client = v16SupabaseClient(); const config = v16GetGlobalConfig(); const room = V16_ONLINE.room;
    if (!client || !room?.id) return;
    const { error } = await client.rpc(config.setTeamRpc, { p_room_id: room.id, p_team_no: Number(teamNo) });
    if (error) return toast(v162FriendlyOnlineError(error));
    await v162FetchRoomState();
  }

  /* ============================================================
     V16.4L) Private Rooms + Solo/Team Matchmaking UI
     ============================================================ */
  showMultiplayerLobby = async function v164Override_showMultiplayerLobby() {
    v16InstallRuntimeOnce();
    if (!v16GlobalConfigured()) return showOnlineSetupHelp();
    try { await v162EnsureAnonymousOnlineSession(); } catch (error) { V16_SECURITY.accountMessage = v162FriendlyOnlineError(error); return showProfileManager("cloud"); }
    if (V16_ONLINE.room?.id) { await v162FetchRoomState().catch(() => {}); return v162ShowRoomLobby(); }
    const profile = v16GetActiveProfile();
    render(`<section class="screen multiplayer-screen">${topbar()}<div class="panel multiplayer-panel v164-online-hub">
      <header class="multiplayer-hero"><div><span class="eyebrow">Online Play</span><h1>Private rooms or Quick Match.</h1><p>Play as ${esc(profile.username)}. There is no free-text chat—only safe preset reactions.</p></div><div class="lobby-status-card"><span class="online-dot"></span><strong>Online</strong><small>Gamer tag only</small></div></header>
      <div class="v164-online-sections">
        <section class="v164-online-section"><div class="v164-section-title"><span>🔗</span><div><h2>Private Room</h2><p>Share a six-character code with people you know.</p></div></div>
          <div class="room-choice-grid">
            <form class="room-choice-card" id="createRoomForm"><h3>Create</h3><label><span>Game type</span><select id="roomMode"><option value="solo">Individual race</option><option value="team_2v2">2v2 teams</option></select></label><label><span>Maximum players</span><select id="roomMaxPlayers"><option value="2">2</option><option value="4" selected>4</option><option value="6">6</option><option value="8">8</option></select></label><label><span>Rounds</span><select id="roomRoundCount"><option value="3">3</option><option value="5" selected>5</option><option value="7">7</option><option value="10">10</option></select></label><label><span>Reading pace</span><select id="roomTimerMode"><option value="relaxed" selected>Relaxed</option><option value="standard">Standard</option><option value="no_rush">No Rush</option><option value="challenge">Challenge</option></select></label><label><span>Score display</span><select id="roomScoreVisibility"><option value="live" selected>Live scores</option><option value="round">Update after each round</option><option value="final">Hidden until the end</option></select></label><button class="btn btn-primary" type="submit">Create Room</button><p class="form-error" id="createRoomError"></p></form>
            <form class="room-choice-card" id="joinRoomForm"><h3>Join</h3><label><span>Room code</span><input class="room-code-input" id="joinRoomCode" maxlength="6" autocomplete="off" autocapitalize="characters" placeholder="ABC234" required></label><button class="btn btn-good" type="submit">Join Room</button><p class="form-error" id="joinRoomError"></p></form>
          </div>
        </section>
        <section class="v164-online-section"><div class="v164-section-title"><span>🔎</span><div><h2>Search for Players</h2><p>No code needed. Keep this page open while the game finds enough players.</p></div></div><div class="v164-match-search-grid"><button class="v164-search-card" data-match-search="solo"><span>⚔️</span><strong>Quick Solo Match</strong><small>Find one opponent automatically</small></button><button class="v164-search-card" data-match-search="team_2v2"><span>🤝</span><strong>2v2 Team Search</strong><small>Find a teammate and two opponents</small></button></div></section>
      </div>
      <div class="button-row"><button class="btn" id="roomHubHomeBtn">Back Home</button><button class="btn btn-secondary" id="roomHubLeaderboardBtn">Leaderboards</button></div>
    </div></section>`);
    wireTopbar();
    on($("#roomMode"), "change", (event) => { const max = $("#roomMaxPlayers"); if (event.target.value === "team_2v2") { max.value = "4"; max.disabled = true; } else max.disabled = false; });
    on($("#joinRoomCode"), "input", (event) => { event.target.value = v162CleanRoomCode(event.target.value); });
    on($("#createRoomForm"), "submit", async (event) => { event.preventDefault(); const error = $("#createRoomError"); const button = $("button[type='submit']", event.currentTarget); button.disabled = true; error.textContent = "Creating room…"; try { await v164CreateRoom({ mode: $("#roomMode").value, maxPlayers: $("#roomMaxPlayers").value, roundCount: $("#roomRoundCount").value, timerMode: $("#roomTimerMode").value, scoreVisibility: $("#roomScoreVisibility").value }); v162ShowRoomLobby(); } catch (err) { button.disabled = false; error.textContent = v162FriendlyOnlineError(err); } });
    on($("#joinRoomForm"), "submit", async (event) => { event.preventDefault(); const error = $("#joinRoomError"); const button = $("button[type='submit']", event.currentTarget); button.disabled = true; error.textContent = "Joining…"; try { await v162JoinRoom($("#joinRoomCode").value); v162ShowRoomLobby(); } catch (err) { button.disabled = false; error.textContent = v162FriendlyOnlineError(err); } });
    $$('[data-match-search]').forEach((button) => on(button, "click", () => v164StartMatchmaking(button.dataset.matchSearch)));
    on($("#roomHubHomeBtn"), "click", showHome); on($("#roomHubLeaderboardBtn"), "click", () => showLeaderboard("regular"));
  }

  async function v164StartMatchmaking(mode) {
    try {
      await v162EnsureAnonymousOnlineSession();
      const client = v16SupabaseClient(); const config = v16GetGlobalConfig();
      const { data, error } = await client.rpc(config.matchmakingJoinRpc, { p_username: v16GetActiveProfile().username, p_mode: mode, p_timer_mode: "relaxed" });
      if (error) throw error;
      if (data?.room_id) return v164EnterMatchedRoom(data.room_id, data.room_code);
      v164ShowMatchmakingWait(mode);
    } catch (error) { toast(v162FriendlyOnlineError(error)); }
  }

  function v164ShowMatchmakingWait(mode) {
    render(`<section class="screen">${topbar()}<div class="panel v164-matchmaking-panel"><div class="v164-search-spinner">🔎</div><span class="eyebrow">Searching worldwide</span><h1>${mode === "team_2v2" ? "Finding four players for 2v2…" : "Finding an opponent…"}</h1><p>Keep this page open. The match will appear automatically.</p><div class="v164-search-status" id="v164SearchStatus">Looking for compatible players…</div><button class="btn btn-danger" id="cancelSearchBtn">Cancel Search</button></div></section>`);
    wireTopbar();
    const check = async () => {
      const client = v16SupabaseClient(); const config = v16GetGlobalConfig();
      const { data, error } = await client.rpc(config.matchmakingStatusRpc, {});
      if (error) return;
      if (data?.room_id) { clearInterval(V16_ONLINE.matchmakingPoll); V16_ONLINE.matchmakingPoll = null; await v164EnterMatchedRoom(data.room_id, data.room_code); }
      else if ($("#v164SearchStatus")) $("#v164SearchStatus").textContent = `Waiting players: ${Number(data?.waiting_count || 1)} · ${mode === "team_2v2" ? "4 needed" : "2 needed"}`;
    };
    V16_ONLINE.matchmakingPoll = setInterval(check, 1800); check();
    on($("#cancelSearchBtn"), "click", async () => { const client = v16SupabaseClient(); const config = v16GetGlobalConfig(); await client.rpc(config.matchmakingCancelRpc, {}).catch?.(() => {}); if (V16_ONLINE.matchmakingPoll) clearInterval(V16_ONLINE.matchmakingPoll); V16_ONLINE.matchmakingPoll = null; showMultiplayerLobby(); });
  }

  async function v164EnterMatchedRoom(roomId, roomCode) {
    V16_ONLINE.room = { id: roomId, code: roomCode, row: null, players: [], matchStarted: false };
    await v162SubscribeToRoom(); await v162FetchRoomState(); v162ShowRoomLobby();
  }

  v162ShowRoomLobby = function v164Override_v162ShowRoomLobby() {
    const room = V16_ONLINE.room;
    if (!room?.id) return showMultiplayerLobby();
    render(`<section class="screen multiplayer-screen">${topbar()}<div class="panel multiplayer-panel room-lobby-panel"><header class="room-lobby-hero"><div><span class="eyebrow">Online waiting room</span><h1 id="v164RoomTitle">Waiting for players.</h1><p id="v164RoomSubtitle">Share the code or wait for matchmaking to complete.</p></div><div class="room-code-card"><span>ROOM CODE</span><strong id="roomCodeText">${esc(room.code || "------")}</strong><button class="btn btn-primary btn-small" id="copyRoomCodeBtn">Copy</button></div></header><div class="room-lobby-status"><span class="online-dot"></span><strong id="roomRealtimeStatus">Connecting live updates…</strong><span id="roomPlayerCount">0 players</span></div><div class="room-lobby-layout"><section class="room-player-board"><div class="leaderboard-title"><strong>👥 Players</strong><span id="v164RoomModeLabel">Individual race</span></div><div id="roomLobbyPlayers" class="room-player-list"></div></section><aside class="room-host-panel" id="roomHostPanel"></aside></div>${v164ReactionDock()}<div class="button-row"><button class="btn btn-danger" id="leaveRoomBtn">Leave Room</button><button class="btn btn-secondary" id="roomLobbyLeaderboardBtn">Leaderboards</button></div></div></section>`);
    wireTopbar(); v164WireReactionDock();
    on($("#copyRoomCodeBtn"), "click", async () => { try { await navigator.clipboard.writeText(room.code); toast("Room code copied."); } catch { toast(`Room code: ${room.code}`); } });
    on($("#leaveRoomBtn"), "click", async () => { await v162LeaveRoom(); showMultiplayerLobby(); });
    on($("#roomLobbyLeaderboardBtn"), "click", () => showLeaderboard("regular"));
    on($("#homeBtn"), "click", () => v162LeaveRoom({ callServer: true }));
    v162RenderRoomLobby(); v162ScheduleRoomRefresh(0);
  }

  function v164TeamTotals(players) {
    return [1,2].map((team) => ({ team, score: players.filter((p) => Number(p.team_no) === team).reduce((sum,p) => sum + Number(p.score || 0), 0), players: players.filter((p) => Number(p.team_no) === team) }));
  }

  v162RenderRoomLobby = function v164Override_v162RenderRoomLobby() {
    const room = V16_ONLINE.room; const host = $("#roomLobbyPlayers"); const controls = $("#roomHostPanel");
    if (!room || !host || !controls) return;
    const row = room.row || {}; const settings = row.settings || {}; const teamMode = settings.mode === "team_2v2"; const activePlayers = (room.players || []).filter((p) => !p.left_at);
    if ($("#roomPlayerCount")) $("#roomPlayerCount").textContent = `${activePlayers.length} / ${Number(row.max_players || (teamMode ? 4 : 8))} players`;
    if ($("#roomCodeText")) $("#roomCodeText").textContent = room.code || "------";
    if ($("#v164RoomModeLabel")) $("#v164RoomModeLabel").textContent = teamMode ? "2v2 teams" : "Individual race";
    host.innerHTML = activePlayers.length ? activePlayers.map((player,index) => `<article class="room-player-card ${player.user_id === V16_ONLINE.user?.id ? "you" : ""}"><div class="room-player-rank">${index+1}</div><div class="profile-avatar">${esc(String(player.username||"P").slice(0,1).toUpperCase())}</div><div><strong>${esc(player.username)}${player.user_id === V16_ONLINE.user?.id ? " · You" : ""}</strong><span>${player.is_host ? "Host" : "Player"}${teamMode ? ` · Team ${Number(player.team_no || 1)}` : ""}</span></div><span class="room-ready-status">${row.status === "waiting" ? "Ready" : `Round ${Number(player.current_round || 0)}`}</span></article>`).join("") : `<div class="lobby-empty">Waiting for players…</div>`;
    const isHost = v162RoomIsHost();
    if (row.status === "waiting") {
      const teamControls = teamMode ? `<div class="v164-team-picker"><strong>Choose your team</strong><div><button class="btn btn-secondary btn-small" data-v164-team="1">Team 1</button><button class="btn btn-secondary btn-small" data-v164-team="2">Team 2</button></div></div>` : "";
      controls.innerHTML = `${teamControls}<span class="eyebrow">${isHost ? "Host controls" : "Waiting room"}</span><h2>${teamMode ? "Build two balanced teams." : "Start when everyone is ready."}</h2><div class="room-setting-summary"><span>⏱️ ${esc(String(settings.timer_mode || "relaxed").replace("_"," "))}</span><span>🏆 ${esc(String(settings.score_visibility || "live"))} scores</span><span>🎮 ${Number(row.round_count || 5)} rounds</span></div>${isHost ? `<button class="btn btn-good room-start-button" id="startRoomMatchBtn" ${activePlayers.length < 2 || (teamMode && activePlayers.length < 4) ? "disabled" : ""}>Start Match</button><p class="small muted">${teamMode ? "Four players are required for 2v2." : "At least two players are required."}</p>` : `<p>The host will start the synchronized countdown.</p>`}`;
      $$('[data-v164-team]').forEach((button) => on(button, "click", () => v164SetTeam(button.dataset.v164Team)));
      on($("#startRoomMatchBtn"), "click", v162StartRoomMatch);
      if (settings.matchmaking && isHost && activePlayers.length >= (teamMode ? 4 : 2) && !room.autoStarting) {
        room.autoStarting = true; setTimeout(() => { if (V16_ONLINE.room?.row?.status === "waiting") v162StartRoomMatch(); }, 4000);
      }
    } else controls.innerHTML = `<span class="eyebrow">${row.status === "playing" ? "Match active" : "Room complete"}</span><h2>${row.status === "playing" ? "Everyone is playing the same rounds." : "Final standings are ready."}</h2>`;
  }

  v162BeginRoomMatch = function v164Override_v162BeginRoomMatch(roomRow) {
    const settings = roomRow.settings || {};
    const players = (V16_ONLINE.room?.players || []).filter((player) => !player.left_at);
    V16_ONLINE.match = { roomMode: true, roomId: roomRow.id, roomCode: roomRow.code, matchId: roomRow.id, roundIds: [...(roomRow.round_ids || [])], startAt: new Date(roomRow.starts_at || Date.now() + 4000).getTime(), players, localFinished: false, localScore: Number(v162CurrentRoomPlayer()?.score || 0), resultApplied: false, timerMode: settings.timer_mode || "relaxed", scoreVisibility: settings.score_visibility || "live", teamMode: settings.mode === "team_2v2" };
    v162ShowRoomCountdown(V16_ONLINE.match);
  }

  /* ============================================================
     V16.4M) Live Scores + Preset Reactions During Matches
     ============================================================ */
  function v164ScoresVisible(match, player) {
    if (player.user_id === V16_ONLINE.user?.id) return true;
    if (match.scoreVisibility === "final") return Boolean(player.finished);
    return true;
  }

  hud = function v164Override_hud() {
    const match = V16_ONLINE.match;
    if (!(state.runMode === "versus" && match?.roomMode)) return v161LegacyHud();
    const progress = clamp(Math.round((state.idx / Math.max(1,state.selected.length))*100),0,100);
    const players = v162RoomPlayersSorted(V16_ONLINE.room?.players || match.players || []);
    const teamSummary = match.teamMode ? `<div class="v164-team-score-strip">${v164TeamTotals(players).map((team) => `<div><span>TEAM ${team.team}</span><strong>${team.score.toLocaleString()}</strong><small>${team.players.map((p)=>esc(p.username)).join(" + ") || "Waiting"}</small></div>`).join("")}</div>` : "";
    return `<div class="room-versus-hud" id="versusHud"><div class="room-hud-title"><span>ROOM ${esc(match.roomCode)}</span><strong>${match.teamMode ? "LIVE TEAM RACE" : "LIVE STANDINGS"}</strong><small>${players.length} players</small></div>${teamSummary}<div class="room-hud-ranks" id="roomHudRanks">${players.slice(0,8).map((player,index) => `<div class="${player.user_id === V16_ONLINE.user?.id ? "you" : ""}"><b>${index+1}</b><span>${esc(player.username)}</span><strong>${v164ScoresVisible(match,player) ? Number(player.user_id === V16_ONLINE.user?.id ? state.score : player.score || 0).toLocaleString() : "?"}</strong><small>R${Number(player.user_id === V16_ONLINE.user?.id ? state.idx+1 : player.current_round || 0)}/${state.selected.length}</small></div>`).join("")}</div>${v164ReactionDock()}</div><div class="hud"><div class="hud-bars">${meterRow("Round Progress",progress,"meter-progress","progressBar")}${state.playerMode === "senior" ? "" : meterRow("Timer",state.timeLeft,"meter-time","timeBar")}${meterRow("Trust Shield",state.trust,"meter-good","trustBar")}${meterRow("Fraudster Pressure",state.fraudster,"meter-danger","fraudBar")}</div><div class="hud-stats"><div class="stat-pill">Score <strong>${state.score}</strong></div><div class="stat-pill">Combo <strong>${state.streak}</strong></div><div class="stat-pill">Mistakes <strong>${state.mistakes}</strong></div></div></div>`;
  }

  v16UpdateVersusHud = function v164Override_v16UpdateVersusHud() {
    const match = V16_ONLINE.match;
    if (!match?.roomMode) return v161LegacyUpdateVersusHud();
    match.players = V16_ONLINE.room?.players || match.players || [];
    const host = $("#roomHudRanks"); if (!host) return;
    const players = v162RoomPlayersSorted(match.players).slice(0,8);
    host.innerHTML = players.map((player,index) => `<div class="${player.user_id === V16_ONLINE.user?.id ? "you" : ""}"><b>${index+1}</b><span>${esc(player.username)}</span><strong>${v164ScoresVisible(match,player) ? Number(player.user_id === V16_ONLINE.user?.id ? state.score : player.score || 0).toLocaleString() : "?"}</strong><small>R${Number(player.user_id === V16_ONLINE.user?.id ? Math.min(state.idx+1,state.selected.length) : player.current_round || 0)}/${state.selected.length}</small></div>`).join("");
    const teamStrip = $(".v164-team-score-strip");
    if (teamStrip && match.teamMode) teamStrip.innerHTML = v164TeamTotals(players).map((team) => `<div><span>TEAM ${team.team}</span><strong>${team.score.toLocaleString()}</strong><small>${team.players.map((p)=>esc(p.username)).join(" + ") || "Waiting"}</small></div>`).join("");
    v164WireReactionDock($("#versusHud") || document);
  }

  v16BroadcastMatchProgress = function v164Override_v16BroadcastMatchProgress(success) {
    const match = V16_ONLINE.match;
    if (!match?.roomMode) return v161LegacyBroadcastMatchProgress(success);
    match.localScore = Number(state.score || 0);
    const client = v16SupabaseClient(); const config = v16GetGlobalConfig();
    if (!client || !match.roomId) return;
    const round = Math.min(state.idx + 1, state.selected.length);
    client.rpc(config.updateRoomRpc, { p_room_id: match.roomId, p_score: match.localScore, p_current_round: round, p_finished: false }).catch?.(() => {});
    V16_ONLINE.roomChannel?.send({ type: "broadcast", event: "progress", payload: { userId: V16_ONLINE.user?.id, score: match.localScore, round, finished: false } }).catch?.(() => {});
    const me = (V16_ONLINE.room?.players || []).find((p) => p.user_id === V16_ONLINE.user?.id); if (me) { me.score = match.localScore; me.current_round = round; }
    v16UpdateVersusHud();
  }

  /* ============================================================
     V16.4N) Safe Spectator Dashboard + Waiting Microgame
     ============================================================ */
  function v164SpectatorOptions(players) {
    return players.filter((p) => p.user_id !== V16_ONLINE.user?.id && !p.finished && !p.left_at);
  }

  function v164RenderSpectatorPanel() {
    const host = $("#v164SpectatorPanel"); const match = V16_ONLINE.match;
    if (!host || !match?.roomMode) return;
    const players = v162RoomPlayersSorted(V16_ONLINE.room?.players || match.players || []);
    const active = v164SpectatorOptions(players);
    if (!active.length) { host.innerHTML = `<strong>Everyone has finished.</strong>`; return; }
    const selectedId = V16_ONLINE.spectatingUserId && active.some((p)=>p.user_id === V16_ONLINE.spectatingUserId) ? V16_ONLINE.spectatingUserId : active[0].user_id;
    V16_ONLINE.spectatingUserId = selectedId;
    const player = active.find((p)=>p.user_id === selectedId);
    const roundIndex = clamp(Number(player.current_round || 0), 0, match.roundIds.length - 1);
    const round = ROUNDS.find((item) => item.id === match.roundIds[roundIndex]);
    host.innerHTML = `<div class="v164-spectator-tabs">${active.map((p) => `<button class="${p.user_id === selectedId ? "active" : ""}" data-v164-spectate="${esc(p.user_id)}">${esc(p.username)}</button>`).join("")}</div><div class="v164-spectator-card"><div><span>Watching progress—not their screen</span><strong>${esc(player.username)}</strong><p>${esc(round?.category || "Challenge")} · ${esc(round?.title || "Loading next round")}</p></div><div class="v164-spectator-progress"><b>${Number(player.current_round || 0)} / ${match.roundIds.length}</b><div><i style="width:${(Number(player.current_round || 0)/match.roundIds.length)*100}%"></i></div><small>${match.scoreVisibility === "final" ? "Score hidden until finish" : `${Number(player.score || 0).toLocaleString()} points`}</small></div></div>`;
    $$('[data-v164-spectate]', host).forEach((button) => on(button, "click", () => { V16_ONLINE.spectatingUserId = button.dataset.v164Spectate; v164RenderSpectatorPanel(); }));
  }

  function v164StartWaitingGame() {
    const field = $("#v164WaitingField"); const scoreNode = $("#v164WaitingScore");
    if (!field) return;
    let points = 0;
    function spawn() {
      if (!$("#v164WaitingField") || state.runMode === "versus" && !V16_ONLINE.match?.localFinished) return;
      const target = document.createElement("button");
      const safe = Math.random() > 0.35;
      target.className = `v164-wait-target ${safe ? "safe" : "scam"}`;
      target.textContent = safe ? "🛡️" : "🕵️";
      target.style.left = `${5 + Math.random()*86}%`; target.style.top = `${8 + Math.random()*72}%`;
      target.addEventListener("click", () => { points += safe ? 1 : -1; if (scoreNode) scoreNode.textContent = String(points); target.remove(); });
      field.appendChild(target); setTimeout(() => target.remove(), 1500); setTimeout(spawn, 650);
    }
    spawn();
  }

  v162ShowRoomResults = async function v164Override_v162ShowRoomResults(lost) {
    const match = V16_ONLINE.match;
    if (!match?.roomMode) return showHome();
    match.localFinished = true; match.localScore = Number(state.score || 0);
    const client = v16SupabaseClient(); const config = v16GetGlobalConfig();
    await client.rpc(config.updateRoomRpc, { p_room_id: match.roomId, p_score: match.localScore, p_current_round: match.roundIds.length, p_finished: true }).catch?.(() => {});
    V16_ONLINE.roomChannel?.send({ type: "broadcast", event: "progress", payload: { userId: V16_ONLINE.user?.id, score: match.localScore, round: match.roundIds.length, finished: true } }).catch?.(() => {});
    render(`<section class="screen versus-results-screen">${topbar()}<div class="panel versus-results-panel room-results-panel v164-waiting-results"><span class="eyebrow">Room ${esc(match.roomCode)}</span><h1 id="roomResultTitle">Your run is complete.</h1><p id="roomResultStatus">Live standings continue while other players finish.</p><div class="room-final-self"><span>Your score</span><strong>${match.localScore.toLocaleString()}</strong><b>${esc(v16GetActiveProfile().username)}</b></div><div class="v164-wait-grid"><section><h2>Live standings</h2><div class="room-final-standings" id="roomFinalStandings"></div></section><section><h2>Follow another player</h2><div id="v164SpectatorPanel"></div><p class="small muted">This shows only round metadata and progress—not video, camera, taps, or private screen content.</p></section><section><h2>While you wait</h2><p>Tap shields and avoid fraudsters. This waiting score is just for fun.</p><div class="v164-wait-score">Waiting score: <strong id="v164WaitingScore">0</strong></div><div class="v164-waiting-field" id="v164WaitingField"></div></section></div>${v164ReactionDock()}<div class="button-row"><button class="btn btn-primary" id="returnRoomHubBtn">Leave Room</button><button class="btn" id="roomResultsHomeBtn">Home</button></div></div></section>`);
    wireTopbar(); v164WireReactionDock();
    on($("#returnRoomHubBtn"), "click", async () => { await v162LeaveRoom(); showMultiplayerLobby(); });
    on($("#roomResultsHomeBtn"), "click", async () => { await v162LeaveRoom(); showHome(); });
    await v162FetchRoomState().catch(() => {}); v162RenderRoomResults(); v164RenderSpectatorPanel(); v164StartWaitingGame();
  }

  v162RenderRoomResults = function v164Override_v162RenderRoomResults() {
    const host = $("#roomFinalStandings"); const match = V16_ONLINE.match;
    if (!host || !match?.roomMode) return;
    const players = v162RoomPlayersSorted(V16_ONLINE.room?.players || match.players || []).filter((p) => !p.left_at || p.finished);
    const allFinished = players.length > 0 && players.every((p) => p.finished || p.left_at);
    const meIndex = players.findIndex((p) => p.user_id === V16_ONLINE.user?.id);
    host.innerHTML = players.map((player,index) => `<article class="room-final-row ${player.user_id === V16_ONLINE.user?.id ? "you" : ""}"><span class="room-final-rank">${index===0 ? "🏆" : `#${index+1}`}</span><div><strong>${esc(player.username)}${match.teamMode ? ` · Team ${Number(player.team_no||1)}` : ""}</strong><small>${player.finished ? "Finished" : `Round ${Number(player.current_round||0)}/${match.roundIds.length}`}</small></div><b>${match.scoreVisibility === "final" && !player.finished ? "?" : Number(player.score||0).toLocaleString()}</b></article>`).join("");
    const title = $("#roomResultTitle"); const status = $("#roomResultStatus");
    if (allFinished) {
      if (match.teamMode) {
        const totals = v164TeamTotals(players).sort((a,b)=>b.score-a.score); const myTeam = Number(players.find((p)=>p.user_id===V16_ONLINE.user?.id)?.team_no||1); const won = totals[0]?.team === myTeam && totals[0]?.score !== totals[1]?.score;
        if (title) title.textContent = won ? `Team ${myTeam} wins!` : totals[0]?.score === totals[1]?.score ? "Team match tied!" : `Team ${totals[0]?.team} wins.`;
      } else if (title) title.textContent = meIndex === 0 ? "You won the room!" : `You finished #${meIndex + 1}.`;
      if (status) status.textContent = "All players finished. Final standings are locked.";
    } else { if (title) title.textContent = "You finished—others are still playing."; if (status) status.textContent = "Choose a player to follow or play the waiting minigame."; }
    v164RenderSpectatorPanel();
  }

  v16ExitMatch = function v164Override_v16ExitMatch() {
    if (!V16_ONLINE.match?.roomMode) return v163ExitMatch();
    V16_ONLINE.match = null; state.multiplayer = null; V16_ONLINE.spectatingUserId = null;
  }

  /* ============================================================
     V16.4O) Updated How-to-Play Copy
     ============================================================ */
  showHow = function v164Override_showHow() {
    const sections = [
      ["🎮","Arcade Run",`${V164_REGULAR_ROUNDS} varied rounds lead to one final boss. This mode has its own leaderboard.`],
      ["♾️","Endless Mode","Rounds continue until Trust reaches zero. Endless scores and rounds survived are ranked separately."],
      ["📱","Phone controls","Every movement game includes large touch controls. Optional Phone Tilt can steer supported games after permission."],
      ["🌎","Online rooms","Create a six-character room, join a code, or search for players. Hosts choose reading pace and score visibility."],
      ["🤝","2v2 teams","Create a private 2v2 room or use Team Search. Team totals combine both teammates’ scores."],
      ["💬","Safe reactions","Online play has preset reactions only. There is no free-text chat."],
      ["👀","Finish early","Follow another player’s round progress or use the waiting minigame. The game never shares their actual screen."],
      ["🏛️","Senior-Friendly play","Choose Senior-Friendly or tap A+ for larger text, larger buttons, calmer motion, and relaxed pacing."],
      ["🔐","Profiles","Your local profile password protects saves and account changes. Other players see only the gamer tag."]
    ];
    render(`<section class="screen">${topbar()}<div class="panel how-panel"><header class="how-hero"><div><span class="eyebrow">Player guide</span><h1>Pick a mode and start safely.</h1><p>Everything important is explained here without setup or developer notes.</p></div><button class="btn btn-primary" id="howStartBtn">Choose Arcade Settings</button></header><div class="how-grid">${sections.map(([icon,title,copy],index)=>`<article class="how-card"><span class="how-number">${index+1}</span><div class="how-icon">${icon}</div><strong>${esc(title)}</strong><p>${esc(copy)}</p></article>`).join("")}</div><div class="button-row"><button class="btn" id="howBackBtn">Back Home</button><button class="btn btn-demo" id="howDemoBtn">Try Demo</button><button class="btn btn-secondary" id="howVsBtn">Online Play</button></div></div></section>`);
    wireTopbar(); on($("#howBackBtn"),"click",showHome); on($("#howStartBtn"),"click",()=>v16RequireUnlocked(showSetup)); on($("#howDemoBtn"),"click",()=>v16RequireUnlocked(showDemoMode)); on($("#howVsBtn"),"click",()=>v16RequireUnlocked(showMultiplayerLobby));
  }

  /* Install V16.4 runtime helpers before the first V16.4 screen. */
  v164InstallOrientationTracking();
  v164ApplyAccessibility();




  /* ============================================================
     18E) V16.5 LIVE-ROOM RELIABILITY + REMATCH + COMPUTER PLAYERS
     This section is additive. V16.4 remains above and is preserved.
     ============================================================ */

  const V165_CLOUD_SESSION_KEY = "ffV165CloudSession";
  const V165_RESULT_SECONDS = 90;
  const V165_SEARCH_SECONDS = 24;
  const V165_REACTION_LIFETIME = 3800;
  const V165_BOT_NAMES = ["Nova", "Pixel", "Cipher", "Orbit", "Echo", "Byte", "Iris Bot", "Shield"];

  const v164GetGlobalConfigV165 = v16GetGlobalConfig;
  const v164FetchRoomStateV165 = v162FetchRoomState;
  const v164SubscribeRoomV165 = v162SubscribeToRoom;
  const v164LeaveRoomV165 = v162LeaveRoom;
  const v164RenderRoomLobbyV165 = v162RenderRoomLobby;
  const v164ShowRoomLobbyV165 = v162ShowRoomLobby;
  const v164BeginRoomMatchV165 = v162BeginRoomMatch;
  const v164ShowRoomResultsV165 = v162ShowRoomResults;
  const v164RenderRoomResultsV165 = v162RenderRoomResults;
  const v164BroadcastProgressV165 = v16BroadcastMatchProgress;
  const v164HudV165 = hud;
  const v164UpdateHudV165 = v16UpdateVersusHud;
  const v164ShowHomeV165 = showHome;
  const v164AccountSectionV165 = v16AccountSectionHtml;
  const v164UpdateProfileV165 = v16UpdateProfile;
  const v164RenderRoundV165 = renderRound;
  const v164StartMatchmakingV165 = v164StartMatchmaking;
  const v164EnterMatchedRoomV165 = v164EnterMatchedRoom;
  const v164ClearRoomTimersV165 = v162ClearRoomTimers;
  const v164StartRoomMatchV165 = v162StartRoomMatch;
  const v164SfxV165 = sfx;

  /* ------------------------------------------------------------
     V16.5A) Expanded RPC configuration
     ------------------------------------------------------------ */
  v16GetGlobalConfig = function v165Override_v16GetGlobalConfig() {
    const base = v164GetGlobalConfigV165();
    const config = window.FF_ONLINE_CONFIG || window.FF_LEADERBOARD_CONFIG || {};
    return {
      ...base,
      startRoomV165Rpc: String(config.startRoomV165Rpc || "ff_start_room_v165"),
      updateRoomV165Rpc: String(config.updateRoomV165Rpc || "ff_update_room_progress_v165"),
      sendReactionRpc: String(config.sendReactionRpc || "ff_send_room_reaction"),
      rematchVoteRpc: String(config.rematchVoteRpc || "ff_vote_room_rematch"),
      rematchStatusRpc: String(config.rematchStatusRpc || "ff_room_rematch_status"),
      prepareRematchRpc: String(config.prepareRematchRpc || "ff_prepare_room_rematch"),
      matchmakingJoinV165Rpc: String(config.matchmakingJoinV165Rpc || "ff_matchmaking_join_v165"),
      matchmakingCancelV165Rpc: String(config.matchmakingCancelV165Rpc || "ff_matchmaking_cancel_v165"),
      extendSearchRpc: String(config.extendSearchRpc || "ff_extend_matchmaking_room"),
      fillBotsRpc: String(config.fillBotsRpc || "ff_fill_room_with_bots"),
      updateBotRpc: String(config.updateBotRpc || "ff_update_room_bot"),
      cloudCreateRpc: String(config.cloudCreateRpc || "ff_cloud_account_create"),
      cloudLoginRpc: String(config.cloudLoginRpc || "ff_cloud_account_login"),
      cloudSaveRpc: String(config.cloudSaveRpc || "ff_cloud_account_save"),
      cloudLogoutRpc: String(config.cloudLogoutRpc || "ff_cloud_account_logout")
    };
  };

  /* ------------------------------------------------------------
     V16.5B) Distinct sound effects, especially reactions
     ------------------------------------------------------------ */
  function v165Tone(frequency, endFrequency, duration = .22, type = "sine", volume = .09) {
    if (!state.soundOn) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
    gain.connect(ctx.destination);
    const oscillator = ctx.createOscillator();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, endFrequency), now + duration);
    oscillator.connect(gain);
    oscillator.start(now);
    oscillator.stop(now + duration + .02);
  }

  function v165ReactionSfx(key, incoming = false) {
    const tones = {
      gg: [660, 990, "triangle"], lol: [520, 760, "square"], think: [310, 270, "sine"],
      laugh: [740, 1080, "sine"], wow: [390, 880, "sawtooth"], clap: [880, 620, "square"],
      fire: [250, 720, "sawtooth"], shield: [460, 920, "triangle"]
    };
    const [start, end, type] = tones[key] || [520, 760, "sine"];
    v165Tone(incoming ? start * .88 : start, incoming ? end * .92 : end, .25, type, incoming ? .075 : .10);
  }

  sfx = function v165Override_sfx(name) {
    if (String(name).startsWith("reaction:")) {
      const [, key, direction] = String(name).split(":");
      return v165ReactionSfx(key, direction === "incoming");
    }
    if (name === "rematch") return v165Tone(430, 980, .34, "triangle", .11);
    if (name === "matchFound") return v165Tone(540, 1240, .42, "sine", .11);
    if (name === "botJoin") return v165Tone(280, 610, .28, "square", .08);
    return v164SfxV165(name);
  };

  /* ------------------------------------------------------------
     V16.5C) Reactions delivered through Broadcast + database fallback
     ------------------------------------------------------------ */
  function v165ReactionStream() {
    let host = $("#v165ReactionStream");
    if (!host) {
      host = document.createElement("div");
      host.id = "v165ReactionStream";
      host.className = "v165-reaction-stream";
      document.body.appendChild(host);
    }
    return host;
  }

  function v165ShowReaction(payload, incoming = true) {
    if (!payload || !V164_ALLOWED_REACTIONS.has(payload.key)) return;
    V16_ONLINE.seenReactionIds ||= new Set();
    if (payload.id && V16_ONLINE.seenReactionIds.has(String(payload.id))) return;
    if (payload.id) V16_ONLINE.seenReactionIds.add(String(payload.id));
    const node = document.createElement("div");
    node.className = "v165-floating-reaction";
    node.innerHTML = `<strong>${esc(payload.username || "Player")}</strong><span>${esc(V164_ALLOWED_REACTIONS.get(payload.key))}</span>`;
    v165ReactionStream().appendChild(node);
    sfx(`reaction:${payload.key}:${incoming ? "incoming" : "outgoing"}`);
    setTimeout(() => node.remove(), V165_REACTION_LIFETIME);
  }

  v164ShowReaction = v165ShowReaction;

  v164SendReaction = async function v165Override_v164SendReaction(key) {
    if (!V164_ALLOWED_REACTIONS.has(key) || !V16_ONLINE.room?.id) return;
    const now = Date.now();
    if (now - Number(V16_ONLINE.lastReactionAt || 0) < 1200) return toast("Please wait before sending another reaction.");
    V16_ONLINE.lastReactionAt = now;
    const payload = { key, username: v16GetActiveProfile().username, userId: V16_ONLINE.user?.id, sentAt: now };
    v165ShowReaction(payload, false);
    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    if (client) {
      const { data } = await client.rpc(config.sendReactionRpc, { p_room_id: V16_ONLINE.room.id, p_reaction_key: key }).catch(() => ({ data: null }));
      if (data?.id) V16_ONLINE.seenReactionIds?.add(String(data.id));
    }
    await V16_ONLINE.roomChannel?.send({ type: "broadcast", event: "reaction_v165", payload }).catch?.(() => {});
  };

  v164WireReactionDock = function v165Override_v164WireReactionDock(root = document) {
    $$('[data-v164-reaction]', root).forEach((button) => on(button, "click", () => v164SendReaction(button.dataset.v164Reaction)));
  };

  function v165ProcessReactionRows(rows = []) {
    [...rows].reverse().forEach((row) => {
      if (row.user_id === V16_ONLINE.user?.id) {
        if (row.id) (V16_ONLINE.seenReactionIds ||= new Set()).add(String(row.id));
        return;
      }
      v165ShowReaction({ id: row.id, key: row.reaction_key, username: row.username, userId: row.user_id }, true);
    });
  }

  /* ------------------------------------------------------------
     V16.5D) One canonical live room state: humans, computers, reactions
     ------------------------------------------------------------ */
  function v165BotAsPlayer(bot) {
    return {
      ...bot,
      user_id: `bot:${bot.bot_id}`,
      is_bot: true,
      is_host: false,
      left_at: null,
      last_seen: bot.updated_at || bot.joined_at
    };
  }

  function v165Contestants() {
    const humans = (V16_ONLINE.room?.players || []).filter((player) => !player.left_at).map((player) => ({ ...player, is_bot: false }));
    const bots = (V16_ONLINE.room?.bots || []).map(v165BotAsPlayer);
    return v162RoomPlayersSorted([...humans, ...bots]);
  }

  function v165ContestantFinished(player) {
    return Boolean(player.finished || player.left_at);
  }

  function v165EveryoneFinished() {
    const players = v165Contestants();
    return players.length > 0 && players.every(v165ContestantFinished);
  }

  v162FetchRoomState = async function v165Override_v162FetchRoomState() {
    const client = v16SupabaseClient();
    const room = V16_ONLINE.room;
    if (!client || !room?.id) return null;
    const [roomResponse, playersResponse, botsResponse, reactionsResponse] = await Promise.all([
      client.from("ff_rooms").select("id,code,host_user_id,status,max_players,round_count,round_ids,current_round,starts_at,created_at,expires_at,finished_at,settings").eq("id", room.id).single(),
      client.from("ff_room_players").select("room_id,user_id,username,is_host,team_no,score,current_round,finished,joined_at,last_seen,left_at").eq("room_id", room.id).order("score", { ascending: false }).order("joined_at", { ascending: true }),
      client.from("ff_room_bots").select("room_id,bot_id,username,team_no,score,current_round,finished,skill_seed,joined_at,updated_at").eq("room_id", room.id).order("score", { ascending: false }),
      client.from("ff_room_reactions").select("id,room_id,user_id,username,reaction_key,created_at").eq("room_id", room.id).order("created_at", { ascending: false }).limit(16)
    ]);
    if (roomResponse.error) throw roomResponse.error;
    if (playersResponse.error) throw playersResponse.error;
    room.row = roomResponse.data;
    room.code = roomResponse.data.code;
    room.players = playersResponse.data || [];
    room.bots = botsResponse.error ? [] : (botsResponse.data || []);
    if (!reactionsResponse.error) v165ProcessReactionRows(reactionsResponse.data || []);
    if (V16_ONLINE.match?.roomMode) V16_ONLINE.match.players = v165Contestants();
    v162RenderRoomLobby();
    v16UpdateVersusHud();
    v162RenderRoomResults();
    v164RenderSpectatorPanel();
    if (room.row.status === "playing" && room.row.round_ids?.length && (!room.matchStarted || V16_ONLINE.match?.roomGeneration !== Number(room.row.settings?.rematch_generation || 0))) {
      room.matchStarted = true;
      v162BeginRoomMatch(room.row);
    }
    if (room.row.status === "cancelled") {
      toast("The room closed.");
      v162ResetRoomLocalState();
      showMultiplayerLobby();
    }
    return room;
  };

  v162SubscribeToRoom = async function v165Override_v162SubscribeToRoom() {
    const client = v16SupabaseClient();
    const room = V16_ONLINE.room;
    if (!client || !room?.id || !V16_ONLINE.user) return;
    v162DisconnectRoomChannel();
    const channel = client.channel(`ff-room-v165-${room.id}`);
    V16_ONLINE.roomChannel = channel;
    const refresh = () => v162ScheduleRoomRefresh(15);
    channel
      .on("postgres_changes", { event: "*", schema: "public", table: "ff_rooms", filter: `id=eq.${room.id}` }, refresh)
      .on("postgres_changes", { event: "*", schema: "public", table: "ff_room_players", filter: `room_id=eq.${room.id}` }, refresh)
      .on("postgres_changes", { event: "*", schema: "public", table: "ff_room_bots", filter: `room_id=eq.${room.id}` }, refresh)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "ff_room_reactions", filter: `room_id=eq.${room.id}` }, ({ new: row }) => v165ProcessReactionRows([row]))
      .on("postgres_changes", { event: "*", schema: "public", table: "ff_room_rematch_votes", filter: `room_id=eq.${room.id}` }, () => { refresh(); v165RefreshRematchStatus(); })
      .on("broadcast", { event: "reaction" }, ({ payload }) => v165ShowReaction(payload, true))
      .on("broadcast", { event: "reaction_v165" }, ({ payload }) => v165ShowReaction(payload, true))
      .on("broadcast", { event: "progress" }, ({ payload }) => {
        if (!payload?.userId || payload.userId === V16_ONLINE.user?.id) return;
        const player = (V16_ONLINE.room?.players || []).find((item) => item.user_id === payload.userId);
        if (player) {
          player.score = Math.max(Number(player.score || 0), Number(payload.score || 0));
          player.current_round = Math.max(Number(player.current_round || 0), Number(payload.round || 0));
          player.finished = Boolean(player.finished || payload.finished);
        }
        v16UpdateVersusHud();
        v162RenderRoomResults();
      });
    channel.subscribe((status) => {
      const node = $("#roomRealtimeStatus");
      if (node) node.textContent = status === "SUBSCRIBED" ? "Live updates connected" : status;
      if (status === "SUBSCRIBED") v162ScheduleRoomRefresh(0);
    });
    const config = v16GetGlobalConfig();
    V16_ONLINE.roomHeartbeatTimer = setInterval(() => client.rpc(config.heartbeatRoomRpc, { p_room_id: room.id }).catch?.(() => {}), 30000);
    V16_ONLINE.roomLivePoll = setInterval(() => v162FetchRoomState().catch(() => {}), 900);
  };

  /* ------------------------------------------------------------
     V16.5E) Reliable live score/progress writes
     ------------------------------------------------------------ */
  async function v165PushProgress(finished = false) {
    const match = V16_ONLINE.match;
    if (!match?.roomMode || !match.roomId) return;
    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    if (!client) return;
    match.localScore = Number(state.score || match.localScore || 0);
    const round = finished ? match.roundIds.length : Math.min(state.idx + 1, match.roundIds.length);
    const me = (V16_ONLINE.room?.players || []).find((p) => p.user_id === V16_ONLINE.user?.id);
    if (me) { me.score = match.localScore; me.current_round = round; me.finished = finished; }
    v16UpdateVersusHud();
    const payload = { p_room_id: match.roomId, p_score: match.localScore, p_current_round: round, p_finished: finished };
    const { error } = await client.rpc(config.updateRoomV165Rpc, payload).catch((error) => ({ error }));
    if (error) console.warn("Live room progress update failed:", error);
    await V16_ONLINE.roomChannel?.send({ type: "broadcast", event: "progress", payload: { userId: V16_ONLINE.user?.id, score: match.localScore, round, finished } }).catch?.(() => {});
    v162ScheduleRoomRefresh(0);
  }

  v16BroadcastMatchProgress = function v165Override_v16BroadcastMatchProgress(success) {
    if (!V16_ONLINE.match?.roomMode) return v164BroadcastProgressV165(success);
    clearTimeout(V16_ONLINE.progressPushTimer);
    V16_ONLINE.progressPushTimer = setTimeout(() => v165PushProgress(false), 40);
  };

  /* ------------------------------------------------------------
     V16.5F) Live scoreboard showing human/computer and progression
     ------------------------------------------------------------ */
  function v165StandingsRows(players, totalRounds) {
    return `<div class="v165-live-board">${players.map((player, index) => {
      const round = clamp(Number(player.user_id === V16_ONLINE.user?.id && !player.is_bot ? state.idx + 1 : player.current_round || 0), 0, totalRounds);
      const score = Number(player.user_id === V16_ONLINE.user?.id && !player.is_bot ? state.score : player.score || 0);
      return `<div class="v165-live-row ${player.user_id === V16_ONLINE.user?.id ? "you" : ""}"><b>${index + 1}</b><span class="identity"><strong>${esc(player.username)}${player.user_id === V16_ONLINE.user?.id ? " · You" : ""}</strong><small>${player.is_bot ? "Computer player" : player.is_host ? "Human · Host" : "Human player"}${V16_ONLINE.match?.teamMode ? ` · Team ${Number(player.team_no || 1)}` : ""}</small></span><span class="v165-kind-pill ${player.is_bot ? "computer" : ""}">${player.is_bot ? "CPU" : "Human"}</span><span class="v165-progress-mini"><strong>${score.toLocaleString()}</strong><div><i style="width:${totalRounds ? (round / totalRounds) * 100 : 0}%"></i></div><small>R${round}/${totalRounds}</small></span></div>`;
    }).join("")}</div>`;
  }

  hud = function v165Override_hud() {
    const match = V16_ONLINE.match;
    if (!(state.runMode === "versus" && match?.roomMode)) return v164HudV165();
    const progress = clamp(Math.round((state.idx / Math.max(1, state.selected.length)) * 100), 0, 100);
    const players = v165Contestants();
    return `<div class="room-versus-hud" id="versusHud"><div class="room-hud-title"><span>ROOM ${esc(match.roomCode)}</span><strong>${match.teamMode ? "LIVE TEAM RACE" : "LIVE STANDINGS"}</strong><small>${players.length} competitors</small></div><div id="roomHudRanks">${v165StandingsRows(players, state.selected.length)}</div>${v164ReactionDock()}</div><div class="hud"><div class="hud-bars">${meterRow("Round Progress", progress, "meter-progress", "progressBar")}${state.playerMode === "senior" ? "" : meterRow("Timer", state.timeLeft, "meter-time", "timeBar")}${meterRow("Trust Shield", state.trust, "meter-good", "trustBar")}${meterRow("Fraudster Pressure", state.fraudster, "meter-danger", "fraudBar")}</div><div class="hud-stats"><div class="stat-pill">Score <strong>${state.score}</strong></div><div class="stat-pill">Combo <strong>${state.streak}</strong></div><div class="stat-pill">Mistakes <strong>${state.mistakes}</strong></div></div></div>`;
  };

  v16UpdateVersusHud = function v165Override_v16UpdateVersusHud() {
    const match = V16_ONLINE.match;
    if (!match?.roomMode) return v164UpdateHudV165();
    match.players = v165Contestants();
    const host = $("#roomHudRanks");
    if (host) host.innerHTML = v165StandingsRows(match.players, Math.max(1, state.selected.length || match.roundIds.length));
    v164WireReactionDock($("#versusHud") || document);
  };

  /* ------------------------------------------------------------
     V16.5G) Human-like computer competitors
     ------------------------------------------------------------ */
  function v165IsHost() { return v162RoomIsHost(); }

  async function v165FillWithBots(format) {
    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    const roomId = V16_ONLINE.room?.id;
    if (!client || !roomId) return;
    const { error } = await client.rpc(config.fillBotsRpc, { p_room_id: roomId, p_format: format });
    if (error) return toast(v162FriendlyOnlineError(error));
    sfx("botJoin");
    await v162FetchRoomState();
    if (v165IsHost()) setTimeout(() => v162StartRoomMatch(), 450);
  }

  function v165StartBotSimulation(match) {
    if (!v165IsHost() || V16_ONLINE.botSimulation || !(V16_ONLINE.room?.bots || []).length) return;
    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    const startAt = match.startAt;
    const timerFactor = match.timerMode === "no_rush" ? 1.42 : match.timerMode === "relaxed" ? 1.2 : match.timerMode === "challenge" ? .82 : 1;
    const duration = Math.max(18000, match.roundIds.length * 7200 * timerFactor);
    const interval = setInterval(async () => {
      if (!V16_ONLINE.match?.roomMode || V16_ONLINE.match.roomId !== match.roomId) return clearInterval(interval);
      const elapsed = Math.max(0, Date.now() - startAt);
      for (const bot of V16_ONLINE.room?.bots || []) {
        if (bot.finished) continue;
        const personality = .84 + ((Number(bot.skill_seed || 1) % 29) / 100);
        const noisy = clamp((elapsed / duration) * personality + (Math.sin(elapsed / 3200 + Number(bot.skill_seed || 0)) * .025), 0, 1);
        const round = Math.min(match.roundIds.length, Math.floor(noisy * (match.roundIds.length + .8)));
        const mistakes = Math.floor((1 - personality) * round * 2.2) + (Math.random() < .16 ? 1 : 0);
        const score = Math.max(0, Math.floor(round * (640 + personality * 260) - mistakes * 135 + Math.random() * 90));
        const finished = round >= match.roundIds.length;
        bot.current_round = round; bot.score = Math.max(Number(bot.score || 0), score); bot.finished = finished;
        client.rpc(config.updateBotRpc, { p_room_id: match.roomId, p_bot_id: bot.bot_id, p_score: bot.score, p_current_round: round, p_finished: finished }).catch?.(() => {});
      }
      v16UpdateVersusHud();
      v162RenderRoomResults();
      if (v165EveryoneFinished()) clearInterval(interval);
    }, 1250);
    V16_ONLINE.botSimulation = interval;
  }

  v162BeginRoomMatch = function v165Override_v162BeginRoomMatch(roomRow) {
    v164BeginRoomMatchV165(roomRow);
    if (V16_ONLINE.match) {
      V16_ONLINE.match.roomGeneration = Number(roomRow.settings?.rematch_generation || 0);
      V16_ONLINE.match.players = v165Contestants();
      setTimeout(() => v165StartBotSimulation(V16_ONLINE.match), Math.max(0, V16_ONLINE.match.startAt - Date.now()) + 250);
    }
  };

  /* ------------------------------------------------------------
     V16.5H) Open matchmaking countdown, clean cancellation, fallback
     ------------------------------------------------------------ */
  function v165RemoveChoiceOverlay() { $("#v165ChoiceOverlay")?.remove(); }

  function v165ShowSearchChoice() {
    if ($("#v165ChoiceOverlay") || !V16_ONLINE.room?.id) return;
    const mode = V16_ONLINE.room.row?.settings?.mode || "solo";
    const overlay = document.createElement("div");
    overlay.id = "v165ChoiceOverlay";
    overlay.className = "v165-choice-overlay";
    overlay.innerHTML = `<div class="v165-choice-dialog"><span class="eyebrow">Still searching</span><h2>What would you like to do?</h2><p>No suitable players joined before the search timer ended.</p><div class="v165-choice-grid"><button id="v165KeepSearching"><span>🔎</span><strong>Keep Searching</strong><small>Open another countdown</small></button><button id="v165GoHome"><span>⌂</span><strong>Go Home</strong><small>Leave the online room</small></button><button id="v165PlayComputers"><span>🤖</span><strong>Play vs Computers</strong><small>Start without waiting</small></button></div></div>`;
    document.body.appendChild(overlay);
    on($("#v165KeepSearching"), "click", async () => {
      const client = v16SupabaseClient(); const config = v16GetGlobalConfig();
      await client.rpc(config.extendSearchRpc, { p_room_id: V16_ONLINE.room.id, p_seconds: V165_SEARCH_SECONDS }).catch?.(() => {});
      v165RemoveChoiceOverlay(); v162ScheduleRoomRefresh(0);
    });
    on($("#v165GoHome"), "click", async () => { v165RemoveChoiceOverlay(); await v162LeaveRoom(); showHome(); });
    on($("#v165PlayComputers"), "click", () => {
      if (mode === "team_2v2") return v165FillWithBots("team_2v2").then(v165RemoveChoiceOverlay);
      overlay.querySelector(".v165-choice-dialog").innerHTML = `<span class="eyebrow">Computer match</span><h2>Choose the format.</h2><p>Computer players make occasional mistakes and react like competitors.</p><div class="v165-choice-grid"><button id="v165BotsFfa"><span>⚔️</span><strong>Free-for-All</strong><small>Everyone competes individually</small></button><button id="v165BotsTeams"><span>🤝</span><strong>2 vs 2</strong><small>Team scores are combined</small></button><button id="v165BotsBack"><span>←</span><strong>Back</strong><small>Return to choices</small></button></div>`;
      on($("#v165BotsFfa"), "click", () => v165FillWithBots("solo").then(v165RemoveChoiceOverlay));
      on($("#v165BotsTeams"), "click", () => v165FillWithBots("team_2v2").then(v165RemoveChoiceOverlay));
      on($("#v165BotsBack"), "click", () => { v165RemoveChoiceOverlay(); v165ShowSearchChoice(); });
    });
  }

  function v165StartLobbyDeadlineTimer() {
    clearInterval(V16_ONLINE.searchDeadlineTimer);
    const room = V16_ONLINE.room;
    const settings = room?.row?.settings || {};
    if (!settings.matchmaking || room.row.status !== "waiting") return;
    const deadline = new Date(settings.matchmaking_deadline || Date.now() + V165_SEARCH_SECONDS * 1000).getTime();
    const host = $("#roomHostPanel");
    if (host && !$("#v165SearchCountdown")) host.insertAdjacentHTML("afterbegin", `<div class="v165-search-countdown" id="v165SearchCountdown"><span>Open lobby search</span><strong id="v165SearchSeconds">--</strong><small>Players may join until the timer ends.</small></div>`);
    const tick = () => {
      const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      if ($("#v165SearchSeconds")) $("#v165SearchSeconds").textContent = `${left}s`;
      if (left > 0) return;
      clearInterval(V16_ONLINE.searchDeadlineTimer); V16_ONLINE.searchDeadlineTimer = null;
      const contestants = v165Contestants();
      const team = settings.mode === "team_2v2";
      const enough = team ? contestants.length >= 4 : contestants.length >= 2;
      if (enough && v165IsHost()) v162StartRoomMatch(); else v165ShowSearchChoice();
    };
    tick(); V16_ONLINE.searchDeadlineTimer = setInterval(tick, 250);
  }

  v164StartMatchmaking = async function v165Override_v164StartMatchmaking(mode) {
    try {
      await v162EnsureAnonymousOnlineSession();
      V16_ONLINE.matchmakingCancelled = false;
      V16_ONLINE.matchmakingToken = Number(V16_ONLINE.matchmakingToken || 0) + 1;
      const token = V16_ONLINE.matchmakingToken;
      const client = v16SupabaseClient(); const config = v16GetGlobalConfig();
      const { data, error } = await client.rpc(config.matchmakingJoinV165Rpc, { p_username: v16GetActiveProfile().username, p_mode: mode, p_timer_mode: "relaxed" });
      if (error) throw error;
      if (V16_ONLINE.matchmakingCancelled || token !== V16_ONLINE.matchmakingToken) return;
      if (data?.room_id) {
        sfx("matchFound");
        await v164EnterMatchedRoomV165(data.room_id, data.room_code);
      }
    } catch (error) { toast(v162FriendlyOnlineError(error)); }
  };

  v162LeaveRoom = async function v165Override_v162LeaveRoom(options = {}) {
    const room = V16_ONLINE.room;
    const matchmaking = Boolean(room?.row?.settings?.matchmaking && room?.row?.status === "waiting");
    V16_ONLINE.matchmakingCancelled = true;
    V16_ONLINE.matchmakingToken = Number(V16_ONLINE.matchmakingToken || 0) + 1;
    clearInterval(V16_ONLINE.searchDeadlineTimer); V16_ONLINE.searchDeadlineTimer = null;
    v165RemoveChoiceOverlay();
    if (matchmaking && room?.id) {
      const client = v16SupabaseClient(); const config = v16GetGlobalConfig();
      await client?.rpc(config.matchmakingCancelV165Rpc, { p_room_id: room.id }).catch?.(() => {});
      v162ResetRoomLocalState();
      if (options.goHome) showHome();
      return;
    }
    return v164LeaveRoomV165(options);
  };

  v162ClearRoomTimers = function v165Override_v162ClearRoomTimers() {
    v164ClearRoomTimersV165();
    clearInterval(V16_ONLINE.searchDeadlineTimer);
    clearInterval(V16_ONLINE.resultCloseTimer);
    clearInterval(V16_ONLINE.botSimulation);
    clearTimeout(V16_ONLINE.progressPushTimer);
    V16_ONLINE.searchDeadlineTimer = null;
    V16_ONLINE.resultCloseTimer = null;
    V16_ONLINE.botSimulation = null;
    V16_ONLINE.progressPushTimer = null;
  };

  v162StartRoomMatch = async function v165Override_v162StartRoomMatch() {
    const room = V16_ONLINE.room;
    if (!room?.row || !v165IsHost()) return;
    const button = $("#startRoomMatchBtn");
    if (button) { button.disabled = true; button.textContent = "Starting…"; }
    try {
      const client = v16SupabaseClient(); const config = v16GetGlobalConfig();
      const roundIds = v162SelectRoomRounds(room.row.round_count);
      const { error } = await client.rpc(config.startRoomV165Rpc, { p_room_id: room.id, p_round_ids: roundIds });
      if (error) throw error;
      V16_ONLINE.room.matchStarted = false;
      await v162FetchRoomState();
    } catch (error) {
      if (button) { button.disabled = false; button.textContent = "Start Match"; }
      toast(v162FriendlyOnlineError(error));
    }
  };

  /* ------------------------------------------------------------
     V16.5I) Enhanced room lobby with humans/computers and search timer
     ------------------------------------------------------------ */
  v162RenderRoomLobby = function v165Override_v162RenderRoomLobby() {
    const room = V16_ONLINE.room; const host = $("#roomLobbyPlayers"); const controls = $("#roomHostPanel");
    if (!room || !host || !controls) return;
    const row = room.row || {}; const settings = row.settings || {}; const teamMode = settings.mode === "team_2v2";
    const contestants = v165Contestants();
    if ($("#roomPlayerCount")) $("#roomPlayerCount").textContent = `${contestants.length} / ${Number(row.max_players || (teamMode ? 4 : 8))} competitors`;
    if ($("#roomCodeText")) $("#roomCodeText").textContent = room.code || "------";
    if ($("#v164RoomModeLabel")) $("#v164RoomModeLabel").textContent = teamMode ? "2v2 teams" : "Individual race";
    host.innerHTML = contestants.length ? contestants.map((player,index) => `<article class="room-player-card ${player.user_id === V16_ONLINE.user?.id ? "you" : ""}"><div class="room-player-rank">${index+1}</div><div class="profile-avatar">${player.is_bot ? "🤖" : esc(String(player.username||"P").slice(0,1).toUpperCase())}</div><div><strong>${esc(player.username)}${player.user_id === V16_ONLINE.user?.id ? " · You" : ""}</strong><span>${player.is_bot ? "Computer" : player.is_host ? "Human · Host" : "Human"}${teamMode ? ` · Team ${Number(player.team_no || 1)}` : ""}</span></div><span class="room-ready-status">${row.status === "waiting" ? "Ready" : player.finished ? "Finished" : `Round ${Number(player.current_round || 0)}`}</span></article>`).join("") : `<div class="lobby-empty">Waiting for competitors…</div>`;
    const isHost = v165IsHost();
    if (row.status === "waiting") {
      const teamControls = teamMode ? `<div class="v164-team-picker"><strong>Choose your team</strong><div><button class="btn btn-secondary btn-small" data-v164-team="1">Team 1</button><button class="btn btn-secondary btn-small" data-v164-team="2">Team 2</button></div></div>` : "";
      const enough = teamMode ? contestants.length >= 4 : contestants.length >= 2;
      controls.innerHTML = `${teamControls}<span class="eyebrow">${settings.matchmaking ? "Open matchmaking lobby" : isHost ? "Host controls" : "Waiting room"}</span><h2>${teamMode ? "Build two balanced teams." : "More players can join before the start."}</h2><div class="room-setting-summary"><span>⏱️ ${esc(String(settings.timer_mode || "relaxed").replace("_"," "))}</span><span>🏆 ${esc(String(settings.score_visibility || "live"))} scores</span><span>🎮 ${Number(row.round_count || 5)} rounds</span></div>${isHost ? `<button class="btn btn-good room-start-button" id="startRoomMatchBtn" ${enough ? "" : "disabled"}>Start Match</button><p class="small muted">${enough ? "You may start now." : teamMode ? "Four competitors are needed, or add computer players after the search timer." : "At least two competitors are needed."}</p>` : `<p>The host controls the synchronized start.</p>`}`;
      $$('[data-v164-team]').forEach((button) => on(button, "click", () => v164SetTeam(button.dataset.v164Team)));
      on($("#startRoomMatchBtn"), "click", v162StartRoomMatch);
      v165StartLobbyDeadlineTimer();
    } else {
      controls.innerHTML = `<span class="eyebrow">${row.status === "playing" ? "Match active" : "Room complete"}</span><h2>${row.status === "playing" ? "Scores and progress update live." : "Final standings are ready."}</h2>${v165StandingsRows(contestants, Number(row.round_count || 5))}`;
    }
  };

  /* ------------------------------------------------------------
     V16.5J) Correct final state, rematch votes, and auto-close
     ------------------------------------------------------------ */
  async function v165RefreshRematchStatus() {
    const roomId = V16_ONLINE.room?.id;
    const host = $("#v165RematchPanel");
    if (!roomId || !host) return;
    const client = v16SupabaseClient(); const config = v16GetGlobalConfig();
    const { data, error } = await client.rpc(config.rematchStatusRpc, { p_room_id: roomId }).catch((error) => ({ error }));
    if (error || !data) return;
    V16_ONLINE.rematchStatus = data;
    const votes = Number(data.votes || 0), needed = Number(data.needed || 0);
    const percent = needed ? (votes / needed) * 100 : 0;
    const count = $("#v165RematchCount"); if (count) count.textContent = `${votes}/${needed}`;
    const meter = $("#v165RematchMeter"); if (meter) meter.style.width = `${percent}%`;
    const button = $("#v165RematchBtn"); if (button) { button.disabled = Boolean(data.you_voted); button.textContent = data.you_voted ? "Rematch Vote Sent" : "Vote for Rematch"; }
    if (data.all_voted && v165IsHost() && !V16_ONLINE.preparingRematch) {
      V16_ONLINE.preparingRematch = true;
      const roundIds = v162SelectRoomRounds(V16_ONLINE.room.row.round_count);
      const { error: rematchError } = await client.rpc(config.prepareRematchRpc, { p_room_id: roomId, p_round_ids: roundIds });
      if (!rematchError) { sfx("rematch"); V16_ONLINE.room.matchStarted = false; await v162FetchRoomState(); }
      V16_ONLINE.preparingRematch = false;
    }
  }

  async function v165VoteRematch() {
    const client = v16SupabaseClient(); const config = v16GetGlobalConfig(); const roomId = V16_ONLINE.room?.id;
    if (!client || !roomId) return;
    const { error } = await client.rpc(config.rematchVoteRpc, { p_room_id: roomId });
    if (error) return toast(v162FriendlyOnlineError(error));
    sfx("rematch"); await v165RefreshRematchStatus();
  }

  function v165StartResultCloseCountdown() {
    clearInterval(V16_ONLINE.resultCloseTimer);
    V16_ONLINE.resultCloseAt ||= Date.now() + V165_RESULT_SECONDS * 1000;
    const tick = async () => {
      const left = Math.max(0, Math.ceil((V16_ONLINE.resultCloseAt - Date.now()) / 1000));
      const node = $("#v165RoomCloseSeconds"); if (node) node.textContent = `${left}s`;
      if (left > 0) return;
      clearInterval(V16_ONLINE.resultCloseTimer); V16_ONLINE.resultCloseTimer = null;
      await v162LeaveRoom(); showHome();
    };
    tick(); V16_ONLINE.resultCloseTimer = setInterval(tick, 500);
  }

  v162ShowRoomResults = async function v165Override_v162ShowRoomResults(lost) {
    const match = V16_ONLINE.match;
    if (!match?.roomMode) return showHome();
    match.localFinished = true; match.localScore = Number(state.score || 0);
    await v165PushProgress(true);
    V16_ONLINE.resultCloseAt = Date.now() + V165_RESULT_SECONDS * 1000;
    render(`<section class="screen versus-results-screen">${topbar()}<div class="panel versus-results-panel room-results-panel v164-waiting-results"><span class="eyebrow">Room ${esc(match.roomCode)}</span><h1 id="roomResultTitle">Your run is complete.</h1><p id="roomResultStatus">Updating final standings…</p><div class="room-final-self"><span>Your score</span><strong>${match.localScore.toLocaleString()}</strong><b>${esc(v16GetActiveProfile().username)}</b></div><div class="v164-wait-grid"><section><h2>Live standings</h2><div class="room-final-standings" id="roomFinalStandings"></div></section><section><h2>Follow progress</h2><div id="v164SpectatorPanel"></div><p class="small muted">Only score and round progress are shown.</p></section><section><h2>While you wait</h2><p>Tap shields and avoid fraudsters.</p><div class="v164-wait-score">Waiting score: <strong id="v164WaitingScore">0</strong></div><div class="v164-waiting-field" id="v164WaitingField"></div></section></div>${v164ReactionDock()}<div class="v165-rematch-panel" id="v165RematchPanel"><div><strong>Play this room again?</strong><p><span id="v165RematchCount">0/0</span> players want a rematch.</p><div class="v165-rematch-meter"><i id="v165RematchMeter" style="width:0%"></i></div></div><button class="btn btn-good" id="v165RematchBtn">Vote for Rematch</button></div><p class="v165-room-close-countdown">Room closes automatically in <span id="v165RoomCloseSeconds">${V165_RESULT_SECONDS}s</span>.</p><div class="button-row"><button class="btn btn-primary" id="returnRoomHubBtn">Leave Room</button><button class="btn" id="roomResultsHomeBtn">Home</button></div></div></section>`);
    wireTopbar(); v164WireReactionDock();
    on($("#v165RematchBtn"), "click", v165VoteRematch);
    on($("#returnRoomHubBtn"), "click", async () => { await v162LeaveRoom(); showMultiplayerLobby(); });
    on($("#roomResultsHomeBtn"), "click", async () => { await v162LeaveRoom(); showHome(); });
    await v162FetchRoomState().catch(() => {});
    v162RenderRoomResults(); v164RenderSpectatorPanel(); v164StartWaitingGame(); v165RefreshRematchStatus(); v165StartResultCloseCountdown();
  };

  v162RenderRoomResults = function v165Override_v162RenderRoomResults() {
    const host = $("#roomFinalStandings"); const match = V16_ONLINE.match;
    if (!host || !match?.roomMode) return;
    const players = v165Contestants();
    const allFinished = v165EveryoneFinished() || V16_ONLINE.room?.row?.status === "finished";
    const meIndex = players.findIndex((p) => p.user_id === V16_ONLINE.user?.id);
    host.innerHTML = players.map((player,index) => `<article class="room-final-row ${player.user_id === V16_ONLINE.user?.id ? "you" : ""}"><span class="room-final-rank">${index===0 ? "🏆" : `#${index+1}`}</span><div><strong>${esc(player.username)}${player.is_bot ? " · Computer" : player.user_id === V16_ONLINE.user?.id ? " · You" : " · Human"}${match.teamMode ? ` · Team ${Number(player.team_no||1)}` : ""}</strong><small>${player.finished ? "Finished" : `Round ${Number(player.current_round||0)}/${match.roundIds.length}`}</small></div><b>${Number(player.score||0).toLocaleString()}</b></article>`).join("");
    const title = $("#roomResultTitle"), status = $("#roomResultStatus");
    if (allFinished) {
      if (match.teamMode) {
        const totals = v164TeamTotals(players).sort((a,b)=>b.score-a.score); const myTeam = Number(players.find((p)=>p.user_id===V16_ONLINE.user?.id)?.team_no||1);
        if (title) title.textContent = totals[0]?.score === totals[1]?.score ? "Team match tied!" : totals[0]?.team === myTeam ? `Team ${myTeam} wins!` : `Team ${totals[0]?.team} wins.`;
      } else if (title) title.textContent = meIndex === 0 ? "You won the room!" : `You finished #${Math.max(1, meIndex + 1)}.`;
      if (status) status.textContent = "Everyone finished. Final standings are locked.";
    } else {
      if (title) title.textContent = "You finished—some competitors are still playing.";
      if (status) status.textContent = "Live standings and progress will update here.";
    }
    v164RenderSpectatorPanel(); v165RefreshRematchStatus();
  };

  /* ------------------------------------------------------------
     V16.5K) Restored Fraudster home visual + leaderboard preview
     ------------------------------------------------------------ */
  async function v165PopulateHomeLeaderboard() {
    const host = $("#v165HomeRanks"); if (!host) return;
    let rows = v16GetProfiles().map((profile) => ({ username: profile.username, score: Number(profile.regularBestScore ?? profile.bestScore ?? 0) })).filter((row)=>row.score>0).sort((a,b)=>b.score-a.score).slice(0,3);
    if (v16GlobalConfigured()) {
      try { const globalRows = await v164FetchModeLeaderboard("regular", 3); if (globalRows.length) rows = globalRows.map((row)=>({ username:row.username, score:Number(row.score||0) })); } catch { /* local preview remains */ }
    }
    host.innerHTML = rows.length ? rows.map((row,index)=>`<div class="v165-home-rank"><span>${["🥇","🥈","🥉"][index]||`#${index+1}`}</span><strong>${esc(row.username)}</strong><b>${row.score.toLocaleString()}</b></div>`).join("") : `<p class="muted">Complete an Arcade run to appear here.</p>`;
  }

  showHome = function v165Override_showHome() {
    v164ShowHomeV165();
    const modeGrid = $(".v164-mode-grid");
    if (modeGrid && !$("#v165HomeShowcase")) modeGrid.insertAdjacentHTML("beforebegin", `<div class="v165-home-showcase" id="v165HomeShowcase"><section class="v165-fraudster-card"><div class="fraudster-face"><span class="eye"></span><span class="eye-right"></span><span class="mouth"></span></div><div class="v165-pressure-copy"><strong>Fraudster pressure</strong><div class="meter meter-danger"><span style="width:72%"></span></div><small>Build Trust before the pressure wins.</small></div></section><section class="v165-home-leaderboard"><header><div><span class="eyebrow">Leaderboard preview</span><strong>Top Arcade scores</strong></div><button class="btn btn-secondary btn-small" id="v165AllRanksBtn">View All</button></header><div id="v165HomeRanks"><p class="muted">Loading scores…</p></div></section></div>`);
    on($("#v165AllRanksBtn"), "click", () => showLeaderboard("regular"));
    v165PopulateHomeLeaderboard();
  };

  /* ------------------------------------------------------------
     V16.5L) Username + password cloud sign-in across devices
     No email is collected. Password recovery is not available.
     ------------------------------------------------------------ */
  function v165CloudSession() { return v16ReadJson(V165_CLOUD_SESSION_KEY, null); }
  function v165SetCloudSession(value) { if (value) v16WriteJson(V165_CLOUD_SESSION_KEY, value); else localStorage.removeItem(V165_CLOUD_SESSION_KEY); }

  function v165ProfileSnapshot(profile) {
    const allowed = ["username","globalShare","bestScore","regularBestScore","regularWins","regularRuns","endlessBestScore","endlessBestRounds","endlessRuns","totalScore","runs","wins","demoRuns","vsWins","vsLosses","vsTies","lastScore","lastPlayedAt","progress","createdAt"];
    return Object.fromEntries(allowed.map((key)=>[key, profile?.[key]]).filter(([,value])=>value !== undefined));
  }

  async function v165CloudSaveNow(silent = false) {
    const session = v165CloudSession(); const profile = v16GetActiveProfile();
    if (!session?.token || !profile) return false;
    const client = v16SupabaseClient(); const config = v16GetGlobalConfig();
    const { error } = await client.rpc(config.cloudSaveRpc, { p_session_token: session.token, p_profile_data: v165ProfileSnapshot(profile) });
    if (error) { if (!silent) toast(v162FriendlyOnlineError(error)); return false; }
    v165SetCloudSession({ ...session, username: profile.username, savedAt: v16NowIso() });
    if (!silent) toast("Profile backup saved.");
    return true;
  }

  function v165ScheduleCloudSave() {
    if (!v165CloudSession()?.token) return;
    clearTimeout(V16_ONLINE.cloudSaveTimer);
    V16_ONLINE.cloudSaveTimer = setTimeout(() => v165CloudSaveNow(true), 1800);
  }

  v16UpdateProfile = function v165Override_v16UpdateProfile(profileId, updates) {
    const result = v164UpdateProfileV165(profileId, updates);
    if (result?.id === v16GetActiveProfile()?.id) v165ScheduleCloudSave();
    return result;
  };

  async function v165RestoreCloudProfile(data, password) {
    const snapshot = data?.profile_data || {};
    const username = v163SanitizeUsername(data?.username || snapshot.username || "Player");
    const issue = v164UsernameIssue(username); if (issue) throw new Error(issue);
    const profiles = v16GetProfiles();
    let index = profiles.findIndex((profile)=>profile.username.toLowerCase() === username.toLowerCase());
    const passwordRecord = await v16BuildPasswordRecord(password);
    const restored = { ...(index >= 0 ? profiles[index] : {}), ...snapshot, id: index >= 0 ? profiles[index].id : v16Uuid(), username, password: passwordRecord, security:{ failedAttempts:0, lockedUntil:0, lastUnlockedAt:v16NowIso() }, cloudAccount:true };
    if (index >= 0) profiles[index] = restored; else { profiles.push(restored); index = profiles.length - 1; }
    v16SaveProfiles(profiles); localStorage.setItem(V16_STORAGE.activeProfile, restored.id); V16_SECURITY.unlockedProfiles.add(restored.id);
    return restored;
  }

  async function v165CloudCreate(username, password) {
    const report = v16PasswordReport(password, username); if (!report.ok) throw new Error("Use a stronger password that completes every requirement.");
    const client = v16SupabaseClient(); const config = v16GetGlobalConfig(); const profile = v16GetActiveProfile();
    const { data, error } = await client.rpc(config.cloudCreateRpc, { p_username: username, p_password: password, p_profile_data: v165ProfileSnapshot(profile) });
    if (error) throw error;
    v165SetCloudSession({ token:data.session_token, username:data.username, savedAt:v16NowIso() });
    v16UpdateProfile(profile.id,{ cloudAccount:true });
    return data;
  }

  async function v165CloudLogin(username, password) {
    const client = v16SupabaseClient(); const config = v16GetGlobalConfig();
    const { data, error } = await client.rpc(config.cloudLoginRpc, { p_username: username, p_password: password });
    if (error) throw error;
    await v165RestoreCloudProfile(data, password);
    v165SetCloudSession({ token:data.session_token, username:data.username, savedAt:v16NowIso() });
    return data;
  }

  function v165CloudAccountHtml(active) {
    const session = v165CloudSession();
    if (session?.token) return `<div class="v165-cloud-signin"><div class="v165-cloud-status"><span>☁️</span><div><strong>Signed in as ${esc(session.username || active.username)}</strong><p>Your scores, settings, and resumable solo progress can be restored on another device.</p></div></div><div class="button-row"><button class="btn btn-good" id="v165CloudSaveBtn">Back Up Now</button><button class="btn btn-secondary" id="v165CloudSignOutBtn">Sign Out of Cloud Backup</button></div><p class="form-error" id="v165CloudError"></p></div>`;
    return `<div class="v165-cloud-signin"><span class="eyebrow">Cross-device sign-in</span><h3>Use a gamer tag and password—no email.</h3><p>Create a cloud backup or sign in on another computer. Forgotten passwords cannot be recovered because no email is collected.</p><div class="v165-cloud-signin-grid"><label><span>Gamer tag</span><input id="v165CloudUsername" maxlength="18" value="${esc(active.username)}" autocomplete="username"></label><label><span>Password</span><div class="password-input-wrap"><input id="v165CloudPassword" type="password" autocomplete="current-password"><button type="button" data-toggle-password="v165CloudPassword">Show</button></div></label></div>${v16PasswordChecklistHtml(active.username,"v165CloudPassword")}<div class="button-row"><button class="btn btn-good" id="v165CloudCreateBtn">Create Cloud Backup</button><button class="btn btn-primary" id="v165CloudLoginBtn">Sign In & Restore</button></div><p class="form-error" id="v165CloudError"></p></div>`;
  }

  v16AccountSectionHtml = function v165Override_v16AccountSectionHtml(tab, profiles, active) {
    const html = v164AccountSectionV165(tab, profiles, active);
    if (tab !== "cloud") return html;
    return html.replace(/<\/section>\s*$/, `${v165CloudAccountHtml(active)}</section>`);
  };

  document.addEventListener("click", async (event) => {
    const target = event.target.closest("#v165CloudCreateBtn,#v165CloudLoginBtn,#v165CloudSaveBtn,#v165CloudSignOutBtn");
    if (!target) return;
    event.preventDefault();
    const errorNode = $("#v165CloudError");
    try {
      if (target.id === "v165CloudSaveBtn") await v165CloudSaveNow();
      if (target.id === "v165CloudSignOutBtn") {
        const session = v165CloudSession(); const client = v16SupabaseClient(); const config = v16GetGlobalConfig();
        if (session?.token) await client.rpc(config.cloudLogoutRpc,{ p_session_token:session.token }).catch?.(()=>{});
        v165SetCloudSession(null); showProfileManager("backup");
      }
      if (target.id === "v165CloudCreateBtn" || target.id === "v165CloudLoginBtn") {
        const username = $("#v165CloudUsername")?.value || ""; const password = $("#v165CloudPassword")?.value || "";
        target.disabled = true;
        if (target.id === "v165CloudCreateBtn") await v165CloudCreate(username,password); else await v165CloudLogin(username,password);
        showProfileManager("backup");
      }
    } catch (error) { if (errorNode) errorNode.textContent = v162FriendlyOnlineError(error); target.disabled = false; }
  });

  /* ------------------------------------------------------------
     V16.5M) Defensive minigame layout/input repair
     ------------------------------------------------------------ */
  function v165RepairRoundLayout() {
    const zone = $("#microgame"); if (!zone) return;
    zone.classList.add("v165-round-safe-area");
    zone.querySelectorAll("[style*='width']").forEach((node) => { if (node instanceof HTMLElement && node.scrollWidth > zone.clientWidth * 1.08) node.style.maxWidth = "100%"; });
    zone.querySelectorAll("button").forEach((button) => { button.style.touchAction ||= "manipulation"; });
  }

  renderRound = function v165Override_renderRound() {
    v164RenderRoundV165();
    requestAnimationFrame(v165RepairRoundLayout);
  };

  /* Install current cloud-password strength helper whenever the account page renders. */
  const v164ShowProfileManagerV165 = showProfileManager;
  showProfileManager = function v165Override_showProfileManager(tab = "profiles") {
    v164ShowProfileManagerV165(tab);
    requestAnimationFrame(() => {
      const input = $("#v165CloudPassword"); if (input) v16WirePasswordStrength(input, () => $("#v165CloudUsername")?.value || "");
      v16WirePasswordReveal();
    });
  };

  /* V16.5 starts from the preserved V16.4 home after all overrides install. */




  /* ============================================================
     18F) V16.6 STABILITY + 60-SECOND SEARCH + TEAM UX
     ------------------------------------------------------------
     ADDITIVE UPDATE — every V16.5 system remains above.

     V16.6 fixes:
     - 2v2/bot recap freezes
     - unreliable A+ state
     - reaction cooldown toast spam
     - search-reset and empty-room races
     - stable live score rows and combined team totals
     - separate cloud sign-in Account Settings tab
     - 60-second matchmaking windows
     - team highlighting and cleaner layouts
     - late match-found confirmation
     - human replacement of waiting computer slots (with V16.6 SQL)
     ============================================================ */

  const V166_SEARCH_SECONDS = 60;
  const V166_CHOICE_CLOSE_SECONDS = 30;
  const V166_LATE_MATCH_SECONDS = 15;
  const V166_BOT_GRACE_SECONDS = 10;
  const V166_REACTION_COOLDOWN = 1500;

  /* Display the current additive engine version without editing the preserved level bank. */
  if (DATA?.site) DATA.site.version = "16.6";

  const v165RenderCoreV166 = render;
  const v165SfxCoreV166 = sfx;
  const v165AccountSectionCoreV166 = v16AccountSectionHtml;
  const v165AccountNavCoreV166 = v16AccountNav;
  const v165SubscribeRoomCoreV166 = v162SubscribeToRoom;
  const v165LeaveRoomCoreV166 = v162LeaveRoom;
  const v165ProfileSnapshotCoreV166 = v165ProfileSnapshot;
  const v165RestoreCloudProfileCoreV166 = v165RestoreCloudProfile;

  /* ------------------------------------------------------------
     V16.6A) A+ / Easy View always applies after every render
     ------------------------------------------------------------ */
  v164ToggleEasyView = function v166ToggleEasyView() {
    const settings = v164AccessibilitySettings();
    settings.easyView = !Boolean(settings.easyView);
    settings.reducedMotion = Boolean(settings.easyView);
    v16WriteJson(V164_ACCESS_KEY, settings);
    v164ApplyAccessibility();
    sfx(settings.easyView ? "accessOn" : "accessOff");
    toast(settings.easyView ? "Easy View is on." : "Easy View is off.");
  };

  render = function v166Override_render(html) {
    v165RenderCoreV166(html);
    requestAnimationFrame(() => {
      v164ApplyAccessibility();
      document.documentElement.style.setProperty("--v166-vh", `${window.innerHeight * .01}px`);
    });
  };

  wireTopbar = function v166Override_wireTopbar() {
    on($("#homeBtn"), "click", showHome);
    on($("#soundBtn"), "click", toggleSound);
    const accessButton = $("#accessibilityBtn");
    if (accessButton) {
      accessButton.dataset.v166Wired = "1";
      on(accessButton, "click", v164ToggleEasyView);
    }
    updateSoundButton();
    v164ApplyAccessibility();
  };

  if (!window.__ffV166AccessFallback) {
    window.__ffV166AccessFallback = true;
    document.addEventListener("click", (event) => {
      const button = event.target.closest("#accessibilityBtn");
      if (!button || button.dataset.v166Wired === "1") return;
      event.preventDefault();
      v164ToggleEasyView();
    });
    window.addEventListener("resize", () => v164ApplyAccessibility(), { passive: true });
  }

  /* ------------------------------------------------------------
     V16.6B) Additional game and interface sounds
     ------------------------------------------------------------ */
  function v166Chord(notes, spacing = 65, duration = .2, type = "sine", volume = .075) {
    notes.forEach((note, index) => setTimeout(() => v165Tone(note[0], note[1] ?? note[0], duration, type, volume), index * spacing));
  }

  sfx = function v166Override_sfx(name) {
    if (name === "accessOn") return v166Chord([[420,620],[620,880]], 70, .2, "triangle", .08);
    if (name === "accessOff") return v166Chord([[650,480]], 0, .2, "sine", .06);
    if (name === "countdown") return v165Tone(520, 560, .12, "square", .055);
    if (name === "countdownFinal") return v165Tone(720, 1080, .22, "triangle", .09);
    if (name === "searchReset") return v166Chord([[360,520],[520,720]], 75, .2, "sine", .08);
    if (name === "teamPick") return v166Chord([[430,650],[650,820]], 55, .18, "triangle", .075);
    if (name === "scoreTick") return v165Tone(760, 850, .10, "sine", .035);
    if (name === "roomFinish") return v166Chord([[520,760],[660,940],[820,1160]], 75, .24, "triangle", .09);
    if (name === "recapOpen") return v166Chord([[390,620],[620,880]], 80, .22, "sine", .08);
    if (name === "modalOpen") return v165Tone(300, 520, .22, "triangle", .065);
    if (name === "cloudLogin") return v166Chord([[440,660],[660,990]], 80, .24, "sine", .08);
    if (name === "roomJoin") return v166Chord([[380,570],[570,820]], 65, .2, "triangle", .075);
    if (name === "roomLeave") return v165Tone(520, 250, .24, "sine", .06);
    return v165SfxCoreV166(name);
  };

  /* ------------------------------------------------------------
     V16.6C) Cloud sign-in gets its own Account Settings option
     ------------------------------------------------------------ */
  v16AccountNav = function v166Override_v16AccountNav(activeTab) {
    const tabs = [
      ["profiles", "👥", "Profiles"],
      ["security", "🔐", "Password"],
      ["cloud", "🌎", "Online Play"],
      ["backup", "☁️", "Sign In & Backup"],
      ["danger", "⚙️", "Rename or Delete"]
    ];
    return `<nav class="account-nav" aria-label="Account settings">${tabs.map(([key, icon, label]) => `<button class="account-nav-btn ${activeTab === key ? "active" : ""}" data-account-tab="${key}"><span>${icon}</span><strong>${label}</strong></button>`).join("")}</nav>`;
  };

  v16AccountSectionHtml = function v166Override_v16AccountSectionHtml(tab, profiles, active) {
    if (tab === "backup") {
      return `<section class="account-section v166-cloud-account-section"><div class="account-section-head"><div><span class="eyebrow">Sign In & Backup</span><h2>Continue on another device.</h2><p>Use only your gamer tag and password. No email is collected.</p></div><div class="account-security-badge ${v165CloudSession()?.token ? "secure" : "attention"}">${v165CloudSession()?.token ? "☁️ Backed up" : "Optional"}</div></div>${v165CloudAccountHtml(active)}</section>`;
    }
    if (tab === "cloud") return v164AccountSectionV165(tab, profiles, active);
    return v165AccountSectionCoreV166(tab, profiles, active);
  };

  /* Save accessibility, sound, selected difficulty, and device preferences too. */
  v165ProfileSnapshot = function v166Override_v165ProfileSnapshot(profile) {
    return {
      ...v165ProfileSnapshotCoreV166(profile),
      _v166Settings: {
        accessibility: v164AccessibilitySettings(),
        soundOn: Boolean(state.soundOn),
        playerMode: state.playerMode,
        deviceMode: state.deviceMode,
        difficulty: state.difficulty
      }
    };
  };

  v165RestoreCloudProfile = async function v166Override_v165RestoreCloudProfile(data, password) {
    const restored = await v165RestoreCloudProfileCoreV166(data, password);
    const settings = data?.profile_data?._v166Settings;
    if (settings?.accessibility) v16WriteJson(V164_ACCESS_KEY, settings.accessibility);
    if (typeof settings?.soundOn === "boolean") {
      state.soundOn = settings.soundOn;
      localStorage.ffV10Sound = state.soundOn ? "on" : "off";
    }
    if (["family", "senior"].includes(settings?.playerMode)) state.playerMode = settings.playerMode;
    if (["auto", "touch", "motion", "keyboard"].includes(settings?.deviceMode)) state.deviceMode = settings.deviceMode;
    if (["easy", "medium", "hard"].includes(settings?.difficulty)) state.difficulty = settings.difficulty;
    v164ApplyAccessibility();
    sfx("cloudLogin");
    return restored;
  };

  /* ------------------------------------------------------------
     V16.6D) Reactions: one cooldown message, no toast spam
     ------------------------------------------------------------ */
  v164ReactionDock = function v166Override_v164ReactionDock() {
    return `<div class="v164-reaction-dock" aria-label="Preset reactions"><span>Quick reactions</span>${[...V164_ALLOWED_REACTIONS].map(([key,label]) => `<button type="button" data-v164-reaction="${key}">${label}</button>`).join("")}<small class="v166-reaction-status" id="v166ReactionStatus" aria-live="polite"></small></div>`;
  };

  function v166SetReactionCooldown(until) {
    clearInterval(V16_ONLINE.reactionUiTimer);
    const update = () => {
      const remaining = Math.max(0, until - Date.now());
      const docks = $$(".v164-reaction-dock");
      docks.forEach((dock) => dock.classList.toggle("reaction-cooling", remaining > 0));
      $$('[data-v164-reaction]').forEach((button) => { button.disabled = remaining > 0; });
      $$("#v166ReactionStatus").forEach((node) => { node.textContent = remaining > 0 ? `Ready in ${(remaining / 1000).toFixed(1)}s` : "Ready"; });
      if (remaining <= 0) {
        clearInterval(V16_ONLINE.reactionUiTimer);
        V16_ONLINE.reactionUiTimer = null;
      }
    };
    update();
    V16_ONLINE.reactionUiTimer = setInterval(update, 100);
  }

  v164SendReaction = async function v166Override_v164SendReaction(key) {
    if (!V164_ALLOWED_REACTIONS.has(key) || !V16_ONLINE.room?.id) return;
    const now = Date.now();
    const nextAllowed = Number(V16_ONLINE.lastReactionAt || 0) + V166_REACTION_COOLDOWN;
    if (now < nextAllowed) {
      v166SetReactionCooldown(nextAllowed);
      return;
    }

    V16_ONLINE.lastReactionAt = now;
    const localPayload = {
      id: `local:${V16_ONLINE.user?.id || "player"}:${now}`,
      key,
      username: v16GetActiveProfile().username,
      userId: V16_ONLINE.user?.id,
      sentAt: now
    };
    v165ShowReaction(localPayload, false);
    v166SetReactionCooldown(now + V166_REACTION_COOLDOWN);

    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    let remotePayload = { ...localPayload };
    try {
      if (client) {
        const { data, error } = await client.rpc(config.sendReactionRpc, {
          p_room_id: V16_ONLINE.room.id,
          p_reaction_key: key
        });
        if (!error && data?.id) {
          remotePayload.id = String(data.id);
          (V16_ONLINE.seenReactionIds ||= new Set()).add(String(data.id));
        }
      }
      await V16_ONLINE.roomChannel?.send({
        type: "broadcast",
        event: "reaction_v165",
        payload: remotePayload
      }).catch?.(() => {});
    } catch (error) {
      console.warn("Reaction delivery fallback:", error);
    }
  };

  /* ------------------------------------------------------------
     V16.6E) Stable live standings and combined 2v2 scores
     ------------------------------------------------------------ */
  function v166StableOrder(players) {
    V16_ONLINE.stableParticipantOrder ||= new Map();
    const order = V16_ONLINE.stableParticipantOrder;
    players.forEach((player) => {
      const key = String(player.user_id);
      if (!order.has(key)) order.set(key, order.size);
    });
    return [...players].sort((a, b) => {
      if (V16_ONLINE.match?.teamMode) {
        const teamDiff = Number(a.team_no || 1) - Number(b.team_no || 1);
        if (teamDiff) return teamDiff;
      }
      return Number(order.get(String(a.user_id)) || 0) - Number(order.get(String(b.user_id)) || 0);
    });
  }

  function v166RankMap(players) {
    const ranked = [...players].sort((a,b) => Number(b.score || 0) - Number(a.score || 0) || Number(b.current_round || 0) - Number(a.current_round || 0));
    return new Map(ranked.map((player, index) => [String(player.user_id), index + 1]));
  }

  function v166TeamSummary(players) {
    if (!V16_ONLINE.match?.teamMode) return "";
    const totals = v164TeamTotals(players);
    return `<div class="v166-team-scoreboard">${totals.map((entry) => `<div class="v166-team-total team-${entry.team === 1 ? "one" : "two"}"><i class="v166-team-dot"></i><strong>Team ${entry.team}</strong><b>${Number(entry.score || 0).toLocaleString()}</b></div>`).join("")}</div>`;
  }

  v165StandingsRows = function v166Override_v165StandingsRows(players, totalRounds) {
    const stable = v166StableOrder(players);
    const ranks = v166RankMap(players);
    return `${v166TeamSummary(players)}<div class="v165-live-board">${stable.map((player) => {
      const isMe = player.user_id === V16_ONLINE.user?.id && !player.is_bot;
      const round = clamp(Number(isMe ? state.idx + 1 : player.current_round || 0), 0, totalRounds);
      const score = Number(isMe ? state.score : player.score || 0);
      const teamClass = V16_ONLINE.match?.teamMode ? `team-${Number(player.team_no || 1) === 1 ? "one" : "two"}` : "";
      return `<div class="v165-live-row ${isMe ? "you" : ""} ${teamClass}" data-v166-player="${esc(String(player.user_id))}"><b class="v166-rank-badge">#${ranks.get(String(player.user_id)) || 1}</b><span class="identity"><strong>${esc(player.username)}${isMe ? " · You" : ""}</strong><small>${player.is_bot ? "Computer" : player.is_host ? "Human · Host" : "Human"}${V16_ONLINE.match?.teamMode ? ` · Team ${Number(player.team_no || 1)}` : ""}</small></span><span class="v165-kind-pill ${player.is_bot ? "computer" : ""}">${player.is_bot ? "CPU" : "Human"}</span><span class="v166-score-cell"><strong>${score.toLocaleString()}</strong><small>R${round}/${totalRounds}</small><div class="v165-progress-mini"><div><i style="width:${totalRounds ? (round / totalRounds) * 100 : 0}%"></i></div></div></span></div>`;
    }).join("")}</div>`;
  };

  v16UpdateVersusHud = function v166Override_v16UpdateVersusHud() {
    const match = V16_ONLINE.match;
    if (!match?.roomMode) return v164UpdateHudV165();
    match.players = v165Contestants();
    const host = $("#roomHudRanks");
    if (!host) return;
    const html = v165StandingsRows(match.players, Math.max(1, state.selected.length || match.roundIds.length));
    if (host.dataset.v166Fingerprint !== html) {
      host.dataset.v166Fingerprint = html;
      host.innerHTML = html;
      v164WireReactionDock($("#versusHud") || document);
    }
  };

  /* Slow the database fallback poll slightly; Realtime remains immediate. */
  v162SubscribeToRoom = async function v166Override_v162SubscribeToRoom() {
    await v165SubscribeRoomCoreV166();
    clearInterval(V16_ONLINE.roomLivePoll);
    V16_ONLINE.roomLivePoll = setInterval(() => v162FetchRoomState().catch(() => {}), 1500);
  };

  /* ------------------------------------------------------------
     V16.6F) Team selection highlighting and lobby decoration
     ------------------------------------------------------------ */
  const v165SetTeamCoreV166 = v164SetTeam;
  v164SetTeam = async function v166Override_v164SetTeam(teamNo) {
    sfx("teamPick");
    await v165SetTeamCoreV166(teamNo);
  };

  function v166DecorateRoomLobby() {
    const contestants = v165Contestants();
    const cards = $$("#roomLobbyPlayers .room-player-card");
    cards.forEach((card, index) => {
      const player = contestants[index];
      if (!player) return;
      card.classList.toggle("team-one", Number(player.team_no || 1) === 1);
      card.classList.toggle("team-two", Number(player.team_no || 1) === 2);
    });
    const me = contestants.find((player) => player.user_id === V16_ONLINE.user?.id);
    $$('[data-v164-team]').forEach((button) => {
      const selected = Number(button.dataset.v164Team) === Number(me?.team_no || 1);
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", selected ? "true" : "false");
    });
  }

  const v165RenderRoomLobbyCoreV166 = v162RenderRoomLobby;
  v162RenderRoomLobby = function v166Override_v162RenderRoomLobby() {
    v165RenderRoomLobbyCoreV166();
    v166DecorateRoomLobby();
    v166RenderBotGraceBanner();
  };

  /* ------------------------------------------------------------
     V16.6G) 60-second search windows and reliable Search Again
     ------------------------------------------------------------ */
  function v166RemoveChoiceOverlay() {
    clearInterval(V16_ONLINE.choiceCloseTimer);
    V16_ONLINE.choiceCloseTimer = null;
    $("#v166ChoiceOverlay")?.remove();
    $("#v165ChoiceOverlay")?.remove();
  }

  function v166SetLocalDeadline(seconds = V166_SEARCH_SECONDS) {
    const deadline = new Date(Date.now() + seconds * 1000).toISOString();
    if (V16_ONLINE.room?.row) {
      V16_ONLINE.room.row.settings ||= {};
      V16_ONLINE.room.row.settings.matchmaking_deadline = deadline;
    }
    return deadline;
  }

  function v166StartChoiceAutoClose() {
    let left = V166_CHOICE_CLOSE_SECONDS;
    const tick = async () => {
      const node = $("#v166ChoiceAutoClose");
      if (node) node.textContent = String(left);
      if (left-- > 0) return;
      clearInterval(V16_ONLINE.choiceCloseTimer);
      V16_ONLINE.choiceCloseTimer = null;
      v166RemoveChoiceOverlay();
      await v162LeaveRoom({ goHome: true });
      showHome();
    };
    tick();
    V16_ONLINE.choiceCloseTimer = setInterval(tick, 1000);
  }

  v165ShowSearchChoice = function v166Override_v165ShowSearchChoice() {
    if ($("#v166ChoiceOverlay") || !V16_ONLINE.room?.id) return;
    sfx("modalOpen");
    const mode = V16_ONLINE.room.row?.settings?.mode || "solo";
    const contestants = v165Contestants();
    const overlay = document.createElement("div");
    overlay.id = "v166ChoiceOverlay";
    overlay.className = "v166-choice-overlay";
    overlay.innerHTML = `<div class="v166-choice-dialog"><span class="eyebrow">Search complete</span><h2>What would you like to do?</h2><p>${contestants.length > 1 ? `${contestants.length} competitors are currently in this lobby.` : "No suitable opponent joined before the timer ended."}</p><div class="v166-choice-grid"><button class="v166-choice-card" id="v166KeepSearching"><span>🔎</span><strong>Keep Searching</strong><small>Restart a full 60-second search</small></button><button class="v166-choice-card danger" id="v166GoHome"><span>⌂</span><strong>Go Home</strong><small>Close your search and leave safely</small></button><button class="v166-choice-card" id="v166PlayComputers"><span>🤖</span><strong>Play vs Computers</strong><small>Fill missing positions and begin</small></button></div><div class="v166-modal-countdown">This room closes in <span id="v166ChoiceAutoClose">${V166_CHOICE_CLOSE_SECONDS}</span>s if no option is chosen.</div></div>`;
    document.body.appendChild(overlay);

    on($("#v166KeepSearching"), "click", async () => {
      const button = $("#v166KeepSearching");
      if (button) { button.disabled = true; button.querySelector("strong").textContent = "Restarting…"; }
      const client = v16SupabaseClient();
      const config = v16GetGlobalConfig();
      const deadline = v166SetLocalDeadline(V166_SEARCH_SECONDS);
      const { error } = await client.rpc(config.extendSearchRpc, {
        p_room_id: V16_ONLINE.room.id,
        p_seconds: V166_SEARCH_SECONDS
      }).catch((error) => ({ error }));
      if (error) {
        if (button) { button.disabled = false; button.querySelector("strong").textContent = "Keep Searching"; }
        return toast(v162FriendlyOnlineError(error));
      }
      V16_ONLINE.room.row.settings.matchmaking_deadline = deadline;
      sfx("searchReset");
      v166RemoveChoiceOverlay();
      await v162FetchRoomState().catch(() => {});
      v165StartLobbyDeadlineTimer();
    });

    on($("#v166GoHome"), "click", async () => {
      v166RemoveChoiceOverlay();
      sfx("roomLeave");
      await v162LeaveRoom({ goHome: true });
      showHome();
    });

    on($("#v166PlayComputers"), "click", () => {
      if (mode === "team_2v2") {
        v166RemoveChoiceOverlay();
        return v165FillWithBots("team_2v2");
      }
      const dialog = overlay.querySelector(".v166-choice-dialog");
      dialog.innerHTML = `<span class="eyebrow">Computer match</span><h2>Choose the format.</h2><p>Computer competitors make occasional mistakes and remain challenging.</p><div class="v166-choice-grid"><button class="v166-choice-card" id="v166BotsFfa"><span>⚔️</span><strong>Free-for-All</strong><small>Individual scores decide the winner</small></button><button class="v166-choice-card" id="v166BotsTeams"><span>🤝</span><strong>2 vs 2</strong><small>Each teammate's score adds to the team total</small></button><button class="v166-choice-card" id="v166BotsBack"><span>←</span><strong>Back</strong><small>Return to the previous choices</small></button></div>`;
      on($("#v166BotsFfa"), "click", () => { v166RemoveChoiceOverlay(); v165FillWithBots("solo"); });
      on($("#v166BotsTeams"), "click", () => { v166RemoveChoiceOverlay(); v165FillWithBots("team_2v2"); });
      on($("#v166BotsBack"), "click", () => { v166RemoveChoiceOverlay(); v165ShowSearchChoice(); });
    });

    v166StartChoiceAutoClose();
  };

  v165StartLobbyDeadlineTimer = function v166Override_v165StartLobbyDeadlineTimer() {
    clearInterval(V16_ONLINE.searchDeadlineTimer);
    const room = V16_ONLINE.room;
    if (!room?.row || room.row.status !== "waiting") return;
    const settings = room.row.settings || {};
    if (!settings.matchmaking && !settings.open_join) return;

    const host = $("#roomHostPanel");
    if (host && !$("#v166SearchCountdown")) {
      host.insertAdjacentHTML("afterbegin", `<div class="v166-search-countdown" id="v166SearchCountdown"><span><strong>Open lobby</strong><small>Players may join before the search ends.</small></span><strong id="v166SearchSeconds">60s</strong><div class="meter meter-time"><span id="v166SearchMeter" style="width:100%"></span></div></div>`);
    }

    let lastSecond = null;
    const tick = () => {
      const currentSettings = V16_ONLINE.room?.row?.settings || {};
      const raw = currentSettings.matchmaking_deadline;
      const deadline = raw ? new Date(raw).getTime() : Date.now() + V166_SEARCH_SECONDS * 1000;
      const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      if ($("#v166SearchSeconds")) $("#v166SearchSeconds").textContent = `${left}s`;
      if ($("#v166SearchMeter")) $("#v166SearchMeter").style.width = `${clamp((left / V166_SEARCH_SECONDS) * 100, 0, 100)}%`;
      if (left <= 3 && left > 0 && left !== lastSecond) sfx(left === 1 ? "countdownFinal" : "countdown");
      lastSecond = left;
      if (left > 0) return;

      clearInterval(V16_ONLINE.searchDeadlineTimer);
      V16_ONLINE.searchDeadlineTimer = null;
      const contestants = v165Contestants();
      const team = currentSettings.mode === "team_2v2";
      const enough = team ? contestants.length >= 4 : contestants.length >= 2;
      if (enough && v165IsHost()) v162StartRoomMatch();
      else v165ShowSearchChoice();
    };
    tick();
    V16_ONLINE.searchDeadlineTimer = setInterval(tick, 250);
  };

  /* ------------------------------------------------------------
     V16.6H) Late match-found race: ask before returning to a room
     ------------------------------------------------------------ */
  async function v166DeclineLateMatch(data) {
    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    if (data?.room_id) await client?.rpc(config.matchmakingCancelV165Rpc, { p_room_id: data.room_id }).catch?.(() => {});
  }

  function v166ShowLateMatchFound(data) {
    $("#v166LateMatchOverlay")?.remove();
    sfx("matchFound");
    const overlay = document.createElement("div");
    overlay.id = "v166LateMatchOverlay";
    overlay.className = "v166-choice-overlay";
    overlay.innerHTML = `<div class="v166-choice-dialog"><span class="eyebrow">Match found</span><h2>A room became available.</h2><p>You left just as another player joined. Rejoin now or decline safely.</p><div class="v166-choice-grid"><button class="v166-choice-card" id="v166JoinLateMatch"><span>🎮</span><strong>Join Match</strong><small>Return to room ${esc(data.room_code || "")}</small></button><button class="v166-choice-card danger" id="v166DeclineLateMatch"><span>✕</span><strong>Decline</strong><small>Leave this room and stay home</small></button></div><div class="v166-modal-countdown">Auto-declining in <span id="v166LateSeconds">${V166_LATE_MATCH_SECONDS}</span>s.</div></div>`;
    document.body.appendChild(overlay);
    let left = V166_LATE_MATCH_SECONDS;
    clearInterval(V16_ONLINE.lateMatchTimer);
    const decline = async () => {
      clearInterval(V16_ONLINE.lateMatchTimer);
      V16_ONLINE.lateMatchTimer = null;
      overlay.remove();
      await v166DeclineLateMatch(data);
    };
    on($("#v166JoinLateMatch"), "click", async () => {
      clearInterval(V16_ONLINE.lateMatchTimer);
      overlay.remove();
      V16_ONLINE.matchmakingCancelled = false;
      await v164EnterMatchedRoomV165(data.room_id, data.room_code);
    });
    on($("#v166DeclineLateMatch"), "click", decline);
    const tick = () => {
      const node = $("#v166LateSeconds");
      if (node) node.textContent = String(left);
      if (left-- <= 0) decline();
    };
    tick();
    V16_ONLINE.lateMatchTimer = setInterval(tick, 1000);
  }

  v164StartMatchmaking = async function v166Override_v164StartMatchmaking(mode) {
    try {
      await v162EnsureAnonymousOnlineSession();
      V16_ONLINE.matchmakingCancelled = false;
      V16_ONLINE.matchmakingToken = Number(V16_ONLINE.matchmakingToken || 0) + 1;
      const token = V16_ONLINE.matchmakingToken;
      const client = v16SupabaseClient();
      const config = v16GetGlobalConfig();
      const { data, error } = await client.rpc(config.matchmakingJoinV165Rpc, {
        p_username: v16GetActiveProfile().username,
        p_mode: mode,
        p_timer_mode: "relaxed"
      });
      if (error) throw error;
      if (!data?.room_id) return;
      if (V16_ONLINE.matchmakingCancelled || token !== V16_ONLINE.matchmakingToken) {
        return v166ShowLateMatchFound(data);
      }
      sfx("roomJoin");
      await v164EnterMatchedRoomV165(data.room_id, data.room_code);
    } catch (error) {
      toast(v162FriendlyOnlineError(error));
    }
  };

  v162LeaveRoom = async function v166Override_v162LeaveRoom(options = {}) {
    v166RemoveChoiceOverlay();
    clearInterval(V16_ONLINE.lateMatchTimer);
    V16_ONLINE.lateMatchTimer = null;
    $("#v166LateMatchOverlay")?.remove();
    return v165LeaveRoomCoreV166(options);
  };

  /* ------------------------------------------------------------
     V16.6I) Computer fill grace period and smoother bot progress
     ------------------------------------------------------------ */
  function v166RenderBotGraceBanner() {
    const host = $("#roomHostPanel");
    const deadline = Number(V16_ONLINE.botGraceDeadline || 0);
    if (!host || deadline <= Date.now() || V16_ONLINE.room?.row?.status !== "waiting") return;
    let banner = $("#v166BotStartBanner");
    if (!banner) {
      host.insertAdjacentHTML("afterbegin", `<div class="v166-bot-start-banner" id="v166BotStartBanner"><div><strong>Computer positions are ready.</strong><p>Humans may still join and replace waiting computer slots.</p></div><b id="v166BotStartSeconds">${V166_BOT_GRACE_SECONDS}s</b></div>`);
    }
  }

  function v166StartBotGraceCountdown() {
    clearInterval(V16_ONLINE.botGraceTimer);
    V16_ONLINE.botGraceDeadline = Date.now() + V166_BOT_GRACE_SECONDS * 1000;
    const tick = async () => {
      const left = Math.max(0, Math.ceil((V16_ONLINE.botGraceDeadline - Date.now()) / 1000));
      const node = $("#v166BotStartSeconds");
      if (node) node.textContent = `${left}s`;
      v166RenderBotGraceBanner();
      if (left > 0) return;
      clearInterval(V16_ONLINE.botGraceTimer);
      V16_ONLINE.botGraceTimer = null;
      V16_ONLINE.botGraceDeadline = 0;
      if (v165IsHost() && V16_ONLINE.room?.row?.status === "waiting") await v162StartRoomMatch();
    };
    tick();
    V16_ONLINE.botGraceTimer = setInterval(tick, 250);
  }

  v165FillWithBots = async function v166Override_v165FillWithBots(format) {
    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    const roomId = V16_ONLINE.room?.id;
    if (!client || !roomId) return;
    const { error } = await client.rpc(config.fillBotsRpc, { p_room_id: roomId, p_format: format });
    if (error) return toast(v162FriendlyOnlineError(error));
    /* Keep the lobby open briefly so a late human can replace a waiting bot. */
    await client.rpc(config.extendSearchRpc, { p_room_id: roomId, p_seconds: 30 }).catch?.(() => {});
    if (V16_ONLINE.room?.row) {
      V16_ONLINE.room.row.settings ||= {};
      V16_ONLINE.room.row.settings.matchmaking_deadline = new Date(Date.now() + 30000).toISOString();
    }
    sfx("botJoin");
    await v162FetchRoomState();
    if (v165IsHost()) v166StartBotGraceCountdown();
  };

  v165StartBotSimulation = function v166Override_v165StartBotSimulation(match) {
    if (!v165IsHost() || V16_ONLINE.botSimulation || !(V16_ONLINE.room?.bots || []).length) return;
    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    const startAt = match.startAt;
    const timerFactor = match.timerMode === "no_rush" ? 1.38 : match.timerMode === "relaxed" ? 1.18 : match.timerMode === "challenge" ? .86 : 1;
    const duration = Math.max(20000, match.roundIds.length * 7600 * timerFactor);
    const interval = setInterval(async () => {
      if (!V16_ONLINE.match?.roomMode || V16_ONLINE.match.roomId !== match.roomId) {
        clearInterval(interval);
        V16_ONLINE.botSimulation = null;
        return;
      }
      const elapsed = Math.max(0, Date.now() - startAt);
      for (const bot of V16_ONLINE.room?.bots || []) {
        if (bot.finished) continue;
        const personality = .82 + ((Number(bot.skill_seed || 1) % 31) / 100);
        const wave = Math.sin(elapsed / 4200 + Number(bot.skill_seed || 0)) * .018;
        const progress = clamp((elapsed / duration) * personality + wave, 0, 1);
        const round = Math.min(match.roundIds.length, Math.floor(progress * (match.roundIds.length + .65)));
        const mistakeRate = .08 + (1 - personality) * .34;
        const estimatedMistakes = Math.floor(round * mistakeRate) + ((Number(bot.skill_seed || 0) + round) % 7 === 0 ? 1 : 0);
        const targetScore = Math.max(0, Math.floor(round * (700 + personality * 230) - estimatedMistakes * 145));
        const score = Math.max(Number(bot.score || 0), Math.min(targetScore, Number(bot.score || 0) + 1250));
        const finished = round >= match.roundIds.length;
        bot.current_round = Math.max(Number(bot.current_round || 0), round);
        bot.score = score;
        bot.finished = finished;
        client.rpc(config.updateBotRpc, {
          p_room_id: match.roomId,
          p_bot_id: bot.bot_id,
          p_score: score,
          p_current_round: bot.current_round,
          p_finished: finished
        }).catch?.(() => {});
      }
      v16UpdateVersusHud();
      v162RenderRoomResults();
      if (v165EveryoneFinished()) {
        clearInterval(interval);
        V16_ONLINE.botSimulation = null;
      }
    }, 1800);
    V16_ONLINE.botSimulation = interval;
  };

  /* ------------------------------------------------------------
     V16.6J) Immediate, non-blocking room recap — fixes 2v2 freeze
     ------------------------------------------------------------ */
  function v166ResultScreenHtml(match) {
    return `<section class="screen versus-results-screen">${topbar()}<div class="panel versus-results-panel room-results-panel v164-waiting-results v166-recap-safe"><span class="eyebrow">Room ${esc(match.roomCode)}</span><h1 id="roomResultTitle">Your run is complete.</h1><p id="roomResultStatus" class="v166-results-status waiting">Updating final standings…</p><div class="room-final-self"><span>Your score</span><strong>${Number(match.localScore || 0).toLocaleString()}</strong><b>${esc(v16GetActiveProfile().username)}</b></div><div id="v166ResultsTeamSummary" class="v166-results-team-summary"></div><div class="v164-wait-grid"><section><h2>Live standings</h2><div class="room-final-standings" id="roomFinalStandings"></div></section><section><h2>Follow progress</h2><div id="v164SpectatorPanel"></div><p class="small muted">Only score and round progress are shown.</p></section><section id="v166WaitSection"><h2 id="v166WaitTitle">While you wait</h2><p id="v166WaitCopy">Tap shields and avoid fraudsters.</p><div class="v164-wait-score">Waiting score: <strong id="v164WaitingScore">0</strong></div><div class="v164-waiting-field" id="v164WaitingField"></div></section></div>${v164ReactionDock()}<div class="v165-rematch-panel" id="v165RematchPanel"><div><strong>Play this room again?</strong><p><span id="v165RematchCount">0/0</span> players want a rematch.</p><div class="v165-rematch-meter"><i id="v165RematchMeter" style="width:0%"></i></div></div><button class="btn btn-good" id="v165RematchBtn">Vote for Rematch</button></div><p class="v165-room-close-countdown">Room closes automatically in <span id="v165RoomCloseSeconds">${V165_RESULT_SECONDS}s</span>.</p><div class="button-row"><button class="btn btn-primary" id="returnRoomHubBtn">Leave Room</button><button class="btn" id="roomResultsHomeBtn">Home</button></div></div></section>`;
  }

  v162ShowRoomResults = async function v166Override_v162ShowRoomResults() {
    const match = V16_ONLINE.match;
    if (!match?.roomMode) return showHome();
    if ($("#roomFinalStandings")) return;

    clearLoops();
    state.transitioning = false;
    match.localFinished = true;
    match.localScore = Number(state.score || match.localScore || 0);
    V16_ONLINE.resultCloseAt = Date.now() + V165_RESULT_SECONDS * 1000;
    render(v166ResultScreenHtml(match));
    wireTopbar();
    v164WireReactionDock();
    sfx("recapOpen");

    on($("#v165RematchBtn"), "click", v165VoteRematch);
    on($("#returnRoomHubBtn"), "click", async () => { await v162LeaveRoom(); showMultiplayerLobby(); });
    on($("#roomResultsHomeBtn"), "click", async () => { await v162LeaveRoom(); showHome(); });

    v162RenderRoomResults();
    v164RenderSpectatorPanel();
    v164StartWaitingGame();
    v165RefreshRematchStatus();
    v165StartResultCloseCountdown();

    /* Network synchronization runs after the recap is already visible. */
    Promise.race([
      v165PushProgress(true),
      new Promise((resolve) => setTimeout(resolve, 2500))
    ]).catch((error) => console.warn("Final score sync continued in background:", error));

    v162FetchRoomState().catch(() => {});
  };

  v162RenderRoomResults = function v166Override_v162RenderRoomResults() {
    const host = $("#roomFinalStandings");
    const match = V16_ONLINE.match;
    if (!host || !match?.roomMode) return;
    const players = v165Contestants();
    const finalOrder = [...players].sort((a,b) => Number(b.score || 0) - Number(a.score || 0) || Number(b.current_round || 0) - Number(a.current_round || 0));
    const allFinished = v165EveryoneFinished() || V16_ONLINE.room?.row?.status === "finished";
    const meIndex = finalOrder.findIndex((player) => player.user_id === V16_ONLINE.user?.id);

    host.innerHTML = finalOrder.map((player,index) => {
      const teamClass = match.teamMode ? `team-${Number(player.team_no || 1) === 1 ? "one" : "two"}` : "";
      return `<article class="room-final-row ${player.user_id === V16_ONLINE.user?.id ? "you" : ""} ${teamClass}"><span class="room-final-rank">${index === 0 ? "🏆" : `#${index + 1}`}</span><div><strong>${esc(player.username)}${player.is_bot ? " · Computer" : player.user_id === V16_ONLINE.user?.id ? " · You" : " · Human"}${match.teamMode ? ` · Team ${Number(player.team_no || 1)}` : ""}</strong><small>${player.finished ? "Finished" : `Round ${Number(player.current_round || 0)}/${match.roundIds.length}`}</small></div><b>${Number(player.score || 0).toLocaleString()}</b></article>`;
    }).join("");

    const teamHost = $("#v166ResultsTeamSummary");
    if (teamHost) teamHost.innerHTML = match.teamMode ? v166TeamSummary(players) : "";
    const title = $("#roomResultTitle");
    const status = $("#roomResultStatus");

    if (allFinished) {
      if (!match.finalSoundPlayed) { match.finalSoundPlayed = true; sfx("roomFinish"); }
      if (match.teamMode) {
        const totals = v164TeamTotals(players).sort((a,b) => b.score - a.score);
        const myTeam = Number(players.find((player) => player.user_id === V16_ONLINE.user?.id)?.team_no || 1);
        if (title) title.textContent = totals[0]?.score === totals[1]?.score ? "Team match tied!" : totals[0]?.team === myTeam ? `Team ${myTeam} wins!` : `Team ${totals[0]?.team} wins.`;
      } else if (title) {
        title.textContent = meIndex === 0 ? "You won the room!" : `You finished #${Math.max(1, meIndex + 1)}.`;
      }
      if (status) {
        status.textContent = "Everyone finished. Final standings are locked.";
        status.className = "v166-results-status complete";
      }
      const waitSection = $("#v166WaitSection");
      if (waitSection && !waitSection.classList.contains("v166-wait-complete")) {
        waitSection.className = "v166-wait-complete";
        waitSection.innerHTML = `<h2>Match complete</h2><p>Review the final scores, send a preset reaction, or vote for a rematch.</p>`;
      }
    } else {
      if (title) title.textContent = "You finished—some competitors are still playing.";
      if (status) {
        status.textContent = "Live standings and progress update automatically.";
        status.className = "v166-results-status waiting";
      }
    }
    v164RenderSpectatorPanel();
    v165RefreshRematchStatus();
  };

  /* ------------------------------------------------------------
     V16.6K) Defensive cleanup for timers and overlays
     ------------------------------------------------------------ */
  const v165ClearRoomTimersCoreV166 = v162ClearRoomTimers;
  v162ClearRoomTimers = function v166Override_v162ClearRoomTimers() {
    v165ClearRoomTimersCoreV166();
    ["reactionUiTimer","choiceCloseTimer","lateMatchTimer","botGraceTimer"].forEach((key) => {
      clearInterval(V16_ONLINE[key]);
      V16_ONLINE[key] = null;
    });
    V16_ONLINE.botGraceDeadline = 0;
    v166RemoveChoiceOverlay();
    $("#v166LateMatchOverlay")?.remove();
  };

  /* ------------------------------------------------------------
     V16.6L) Final home-showcase spacing repair
     ------------------------------------------------------------ */
  const v165ShowHomeCoreV166 = showHome;
  showHome = function v166Override_showHome() {
    v165ShowHomeCoreV166();
    requestAnimationFrame(() => {
      v164ApplyAccessibility();
      const face = $("#v165HomeShowcase .fraudster-face");
      if (face) face.setAttribute("aria-label", "The Fraudster pressure character");
    });
  };




  /* ============================================================
     18G) V16.7 CLOUD + SEARCH + COMPUTER MATCH STABILITY
     ------------------------------------------------------------
     ADDITIVE UPDATE — all V16.6 code remains above.

     V16.7 repairs:
     - Supabase pgcrypto/gen_salt cloud-account failure
     - cloud password Show button and form layout
     - Search Again overlay/timer race
     - stale zero-value live scores
     - combined team totals that temporarily fall to zero
     - computer competitors that never advance or finish
     - single-human computer result/rematch behavior
     - saved-run scope (Arcade and Endless only)
     ============================================================ */

  const V167_SEARCH_SECONDS = 60;
  const V167_SINGLE_HUMAN_HOME_SECONDS = 9;

  /* ------------------------------------------------------------
     V16.7A) Expanded configuration
     ------------------------------------------------------------ */
  const v166GetGlobalConfigCoreV167 = v16GetGlobalConfig;
  v16GetGlobalConfig = function v167Override_v16GetGlobalConfig() {
    const base = v166GetGlobalConfigCoreV167();
    const config = window.FF_ONLINE_CONFIG || window.FF_LEADERBOARD_CONFIG || {};
    return {
      ...base,
      syncBotsV167Rpc: String(config.syncBotsV167Rpc || "ff_sync_room_bots_v167")
    };
  };

  function v167PromiseTimeout(promise, milliseconds, message) {
    let timer;
    return Promise.race([
      Promise.resolve(promise).finally(() => clearTimeout(timer)),
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(message || "The request took too long. Please try again.")), milliseconds);
      })
    ]);
  }

  /* ------------------------------------------------------------
     V16.7B) Cloud form and reliable Show / Hide button
     ------------------------------------------------------------ */
  v165CloudAccountHtml = function v167Override_v165CloudAccountHtml(active) {
    const session = v165CloudSession();
    if (session?.token) {
      return `<div class="v167-cloud-shell"><div class="v167-cloud-heading"><div><span class="eyebrow">Cloud backup connected</span><h3>Signed in as ${esc(session.username || active.username)}</h3><p>Your solo scores, settings, and resumable Arcade or Endless run can be restored on another device.</p></div><span class="account-security-badge secure">Protected</span></div><div class="v167-cloud-actions"><button class="btn btn-good" id="v165CloudSaveBtn">Back Up Now</button><button class="btn btn-secondary" id="v165CloudSignOutBtn">Sign Out</button></div><p class="v167-cloud-error" id="v165CloudError"></p></div>`;
    }

    return `<div class="v167-cloud-shell"><div class="v167-cloud-heading"><div><span class="eyebrow">Cross-device sign-in</span><h3>Use your gamer tag and password.</h3><p>No email is collected. Create a backup here, then use the same gamer tag and password on another device.</p></div><span class="account-security-badge attention">Optional</span></div><div class="v167-cloud-form"><label><span>Gamer tag</span><input id="v165CloudUsername" maxlength="18" value="${esc(active.username)}" autocomplete="username"></label><label><span>Password</span><div class="password-input-wrap"><input id="v165CloudPassword" type="password" autocomplete="current-password"><button type="button" class="btn btn-secondary" data-v167-password="v165CloudPassword" aria-label="Show password">Show</button></div></label></div>${v16PasswordChecklistHtml(active.username,"v165CloudPassword")}<div class="v167-cloud-actions"><button class="btn btn-good" id="v165CloudCreateBtn">Create Cloud Backup</button><button class="btn btn-primary" id="v165CloudLoginBtn">Sign In & Restore</button></div><div class="v167-cloud-help"><strong>Important:</strong> without email, a forgotten cloud password cannot be reset.</div><p class="v167-cloud-error" id="v165CloudError"></p></div>`;
  };

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-v167-password]");
    if (!button) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const input = document.getElementById(button.dataset.v167Password);
    if (!input) return;
    const revealing = input.type === "password";
    input.type = revealing ? "text" : "password";
    button.textContent = revealing ? "Hide" : "Show";
    button.setAttribute("aria-label", revealing ? "Hide password" : "Show password");
    input.focus({ preventScroll: true });
  }, true);

  /* Friendly message for people who have not run the V16.7 SQL yet. */
  const v162FriendlyOnlineErrorCoreV167 = v162FriendlyOnlineError;
  v162FriendlyOnlineError = function v167Override_v162FriendlyOnlineError(error) {
    const raw = String(error?.message || error || "");
    if (/gen_salt|crypt\(/i.test(raw)) {
      return "Cloud password setup needs the V16.7 GLOBAL_SETUP.sql. Run the complete SQL once, then try again.";
    }
    return v162FriendlyOnlineErrorCoreV167(error);
  };

  /* ------------------------------------------------------------
     V16.7C) Saved runs belong only to Arcade and Endless
     ------------------------------------------------------------ */
  function v167ProgressAllowed(progressOrMode) {
    const mode = typeof progressOrMode === "string" ? progressOrMode : progressOrMode?.runMode;
    return mode === "full" || mode === "arcade" || mode === "regular" || mode === "endless";
  }

  const v166SaveProgressCoreV167 = v16SaveProgressSnapshot;
  v16SaveProgressSnapshot = function v167Override_v16SaveProgressSnapshot() {
    if (!v167ProgressAllowed(state.runMode || "full")) return;
    return v166SaveProgressCoreV167();
  };

  const v166ProfileSnapshotCoreV167 = v165ProfileSnapshot;
  v165ProfileSnapshot = function v167Override_v165ProfileSnapshot(profile) {
    const snapshot = v166ProfileSnapshotCoreV167(profile);
    if (snapshot.progress && !v167ProgressAllowed(snapshot.progress)) delete snapshot.progress;
    return snapshot;
  };

  const v166RestoreCloudCoreV167 = v165RestoreCloudProfile;
  v165RestoreCloudProfile = async function v167Override_v165RestoreCloudProfile(data, password) {
    const clean = { ...(data || {}), profile_data: { ...(data?.profile_data || {}) } };
    if (clean.profile_data.progress && !v167ProgressAllowed(clean.profile_data.progress)) {
      delete clean.profile_data.progress;
    }
    return v166RestoreCloudCoreV167(clean, password);
  };

  function v167RemoveInvalidSavedRun() {
    const profile = v16GetActiveProfile();
    if (profile?.progress && !v167ProgressAllowed(profile.progress)) {
      v16UpdateProfile(profile.id, { progress: null });
    }
  }

  /* ------------------------------------------------------------
     V16.7D) Monotonic score cache — scores/rounds never jump to zero
     ------------------------------------------------------------ */
  function v167ScoreCacheKey() {
    const roomId = V16_ONLINE.room?.id || "none";
    const generation = Number(V16_ONLINE.room?.row?.settings?.rematch_generation || 0);
    return `${roomId}:${generation}`;
  }

  function v167PrepareScoreCache() {
    const key = v167ScoreCacheKey();
    if (V16_ONLINE.v167ScoreCacheKey !== key) {
      V16_ONLINE.v167ScoreCacheKey = key;
      V16_ONLINE.v167ScoreCache = new Map();
    }
    return (V16_ONLINE.v167ScoreCache ||= new Map());
  }

  function v167ApplyScoreFloor(player) {
    const cache = v167PrepareScoreCache();
    const key = String(player.user_id);
    const previous = cache.get(key) || { score: 0, round: 0, finished: false };
    const isMe = !player.is_bot && player.user_id === V16_ONLINE.user?.id;
    const next = {
      score: Math.max(previous.score, Number(player.score || 0), isMe ? Number(state.score || 0) : 0),
      round: Math.max(previous.round, Number(player.current_round || 0), isMe && state.runMode === "versus" ? Number(state.idx + 1) : 0),
      finished: Boolean(previous.finished || player.finished)
    };
    cache.set(key, next);
    return { ...player, score: next.score, current_round: next.round, finished: next.finished };
  }

  const v166ContestantsCoreV167 = v165Contestants;
  v165Contestants = function v167Override_v165Contestants() {
    return v166ContestantsCoreV167().map(v167ApplyScoreFloor);
  };

  function v167TeamSummary(players) {
    if (!V16_ONLINE.match?.teamMode) return "";
    const totals = [1, 2].map((team) => ({
      team,
      score: players.filter((player) => Number(player.team_no || 1) === team)
        .reduce((sum, player) => sum + Number(player.score || 0), 0)
    }));
    return `<div class="v167-team-totals">${totals.map((entry) => `<div class="v167-team-total team-${entry.team === 1 ? "one" : "two"}"><i></i><strong>Team ${entry.team}</strong><b>${entry.score.toLocaleString()}</b></div>`).join("")}</div>`;
  }

  /* Replace the V16.6 team summary helper so every screen uses the
     same monotonic individual scores and combined totals. */
  v166TeamSummary = function v167Override_v166TeamSummary(players) {
    return v167TeamSummary((players || []).map(v167ApplyScoreFloor));
  };

  const v166StandingsRowsCoreV167 = v165StandingsRows;
  v165StandingsRows = function v167Override_v165StandingsRows(players, totalRounds) {
    const stablePlayers = players.map(v167ApplyScoreFloor);
    const existing = v166StandingsRowsCoreV167(stablePlayers, totalRounds);
    if (!V16_ONLINE.match?.teamMode) return existing;
    return existing.replace(/^<div class="v166-team-scoreboard">[\s\S]*?<\/div><div class="v165-live-board">/, `${v167TeamSummary(stablePlayers)}<div class="v165-live-board">`);
  };

  /* ------------------------------------------------------------
     V16.7E) Server-authoritative computer progression
     ------------------------------------------------------------ */
  async function v167SyncComputers() {
    const roomId = V16_ONLINE.room?.id;
    if (!roomId || !(V16_ONLINE.room?.bots || []).length) return null;
    const client = v16SupabaseClient();
    if (!client) return null;
    const config = v16GetGlobalConfig();
    const { data, error } = await client.rpc(config.syncBotsV167Rpc, { p_room_id: roomId }).catch((error) => ({ data: null, error }));
    if (error) console.warn("Computer progress sync failed:", error);
    return data;
  }

  const v166FetchRoomCoreV167 = v162FetchRoomState;
  v162FetchRoomState = async function v167Override_v162FetchRoomState() {
    if (V16_ONLINE.room?.row?.status === "playing" && (V16_ONLINE.room?.bots || []).length) {
      await v167SyncComputers();
    }
    const room = await v166FetchRoomCoreV167();
    if (room?.players) room.players = room.players.map(v167ApplyScoreFloor);
    if (room?.bots) room.bots = room.bots.map((bot) => {
      const normalized = v165BotAsPlayer(bot);
      const floored = v167ApplyScoreFloor(normalized);
      return { ...bot, score: floored.score, current_round: floored.current_round, finished: floored.finished };
    });
    if (V16_ONLINE.match?.roomMode) V16_ONLINE.match.players = v165Contestants();
    v16UpdateVersusHud();
    v162RenderRoomResults();
    return room;
  };

  v165StartBotSimulation = function v167Override_v165StartBotSimulation(match) {
    if (!match?.roomMode || !(V16_ONLINE.room?.bots || []).length) return;
    clearInterval(V16_ONLINE.botSimulation);
    const tick = async () => {
      if (!V16_ONLINE.match?.roomMode || V16_ONLINE.match.roomId !== match.roomId) {
        clearInterval(V16_ONLINE.botSimulation);
        V16_ONLINE.botSimulation = null;
        return;
      }
      await v167SyncComputers();
      await v166FetchRoomCoreV167().catch(() => {});
      if (V16_ONLINE.room?.row?.status === "finished" || v165EveryoneFinished()) {
        clearInterval(V16_ONLINE.botSimulation);
        V16_ONLINE.botSimulation = null;
      }
    };
    tick();
    V16_ONLINE.botSimulation = setInterval(tick, 1100);
  };

  const v166BeginRoomCoreV167 = v162BeginRoomMatch;
  v162BeginRoomMatch = function v167Override_v162BeginRoomMatch(roomRow) {
    V16_ONLINE.v167ScoreCacheKey = null;
    V16_ONLINE.v167ScoreCache = new Map();
    v166BeginRoomCoreV167(roomRow);
    setTimeout(() => {
      if (V16_ONLINE.match?.roomMode && (V16_ONLINE.room?.bots || []).length) {
        v165StartBotSimulation(V16_ONLINE.match);
      }
    }, Math.max(0, Number(V16_ONLINE.match?.startAt || Date.now()) - Date.now()) + 300);
  };

  /* Push the local score periodically as a fallback to per-round writes. */
  function v167StartLocalProgressHeartbeat() {
    clearInterval(V16_ONLINE.v167ProgressHeartbeat);
    V16_ONLINE.v167ProgressHeartbeat = setInterval(() => {
      if (state.runMode === "versus" && V16_ONLINE.match?.roomMode && !V16_ONLINE.match.localFinished) {
        v165PushProgress(false).catch(() => {});
      }
    }, 1800);
  }

  const v166ShowCountdownCoreV167 = v162ShowRoomCountdown;
  v162ShowRoomCountdown = function v167Override_v162ShowRoomCountdown(match) {
    v166ShowCountdownCoreV167(match);
    v167StartLocalProgressHeartbeat();
  };

  /* ------------------------------------------------------------
     V16.7F) Reliable 60-second Search Again
     ------------------------------------------------------------ */
  function v167RemoveSearchOverlay() {
    clearInterval(V16_ONLINE.choiceCloseTimer);
    V16_ONLINE.choiceCloseTimer = null;
    $("#v167SearchOverlay")?.remove();
    v166RemoveChoiceOverlay();
  }

  async function v167RestartSearch(button, statusNode) {
    clearInterval(V16_ONLINE.choiceCloseTimer);
    V16_ONLINE.choiceCloseTimer = null;
    if (button) button.disabled = true;
    if (statusNode) statusNode.textContent = "Restarting the full 60-second search…";

    const roomId = V16_ONLINE.room?.id;
    if (!roomId) throw new Error("This waiting room is no longer available.");
    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    const deadline = v166SetLocalDeadline(V167_SEARCH_SECONDS);

    const request = client.rpc(config.extendSearchRpc, {
      p_room_id: roomId,
      p_seconds: V167_SEARCH_SECONDS
    });
    const { error } = await v167PromiseTimeout(request, 9000, "Search restart timed out. Please try again.");
    if (error) throw error;

    if (V16_ONLINE.room?.row) {
      V16_ONLINE.room.row.status = "waiting";
      V16_ONLINE.room.row.settings ||= {};
      V16_ONLINE.room.row.settings.matchmaking = true;
      V16_ONLINE.room.row.settings.matchmaking_deadline = deadline;
    }

    sfx("searchReset");
    v167RemoveSearchOverlay();
    await v162FetchRoomState().catch(() => {});
    v162ShowRoomLobby();
    requestAnimationFrame(() => v165StartLobbyDeadlineTimer());
  }

  v165ShowSearchChoice = function v167Override_v165ShowSearchChoice() {
    if ($("#v167SearchOverlay") || !V16_ONLINE.room?.id) return;
    const mode = V16_ONLINE.room.row?.settings?.mode || "solo";
    const contestants = v165Contestants();
    const overlay = document.createElement("div");
    overlay.id = "v167SearchOverlay";
    overlay.className = "v167-search-overlay";
    overlay.innerHTML = `<div class="v167-search-dialog"><span class="eyebrow">Search complete</span><h2>What would you like to do?</h2><p>${contestants.length > 1 ? `${contestants.length} competitors are still in this waiting room.` : "No suitable opponent joined before the timer ended."}</p><div class="v167-search-options"><button class="v167-search-card" id="v167KeepSearching"><span>🔎</span><strong>Keep Searching</strong><small>Restart a complete 60-second search</small></button><button class="v167-search-card danger" id="v167GoHome"><span>⌂</span><strong>Go Home</strong><small>Close this search safely</small></button><button class="v167-search-card" id="v167PlayComputers"><span>🤖</span><strong>Play vs Computers</strong><small>Fill the missing competitor positions</small></button></div><p class="v167-search-status" id="v167SearchStatus"></p><div class="v167-auto-close">Room closes in <span id="v167AutoClose">30</span>s if no option is selected.</div></div>`;
    document.body.appendChild(overlay);

    on($("#v167KeepSearching"), "click", async () => {
      try {
        await v167RestartSearch($("#v167KeepSearching"), $("#v167SearchStatus"));
      } catch (error) {
        const button = $("#v167KeepSearching");
        if (button) button.disabled = false;
        const node = $("#v167SearchStatus");
        if (node) node.textContent = v162FriendlyOnlineError(error);
      }
    });

    on($("#v167GoHome"), "click", async () => {
      v167RemoveSearchOverlay();
      await v162LeaveRoom({ goHome: true });
      showHome();
    });

    on($("#v167PlayComputers"), "click", () => {
      if (mode === "team_2v2") {
        v167RemoveSearchOverlay();
        return v165FillWithBots("team_2v2");
      }
      const dialog = overlay.querySelector(".v167-search-dialog");
      dialog.innerHTML = `<span class="eyebrow">Computer match</span><h2>Choose a format.</h2><p>Computer competitors make realistic mistakes and appear in the same live standings.</p><div class="v167-search-options"><button class="v167-search-card" id="v167BotsSolo"><span>⚔️</span><strong>Free-for-All</strong><small>Each competitor has an individual score</small></button><button class="v167-search-card" id="v167BotsTeams"><span>🤝</span><strong>2 vs 2</strong><small>Both teammate scores combine</small></button><button class="v167-search-card danger" id="v167BotsBack"><span>←</span><strong>Back</strong><small>Return to the previous choices</small></button></div>`;
      on($("#v167BotsSolo"), "click", () => { v167RemoveSearchOverlay(); v165FillWithBots("solo"); });
      on($("#v167BotsTeams"), "click", () => { v167RemoveSearchOverlay(); v165FillWithBots("team_2v2"); });
      on($("#v167BotsBack"), "click", () => { v167RemoveSearchOverlay(); v165ShowSearchChoice(); });
    });

    let left = 30;
    const tick = async () => {
      const node = $("#v167AutoClose");
      if (node) node.textContent = String(left);
      if (left-- > 0) return;
      v167RemoveSearchOverlay();
      await v162LeaveRoom({ goHome: true });
      showHome();
    };
    tick();
    V16_ONLINE.choiceCloseTimer = setInterval(tick, 1000);
  };

  /* Replace the narrow countdown with a responsive 60-second card. */
  const v166LobbyTimerCoreV167 = v165StartLobbyDeadlineTimer;
  v165StartLobbyDeadlineTimer = function v167Override_v165StartLobbyDeadlineTimer() {
    v166LobbyTimerCoreV167();
    requestAnimationFrame(() => {
      const old = $("#v166SearchCountdown") || $("#v165SearchCountdown");
      if (!old || old.classList.contains("v167-lobby-countdown")) return;
      old.className = "v167-lobby-countdown";
      const seconds = old.querySelector("#v166SearchSeconds,#v165SearchSeconds");
      if (seconds) seconds.textContent = seconds.textContent || "60s";
    });
  };

  /* ------------------------------------------------------------
     V16.7G) Computer-only result flow and final winner
     ------------------------------------------------------------ */
  function v167HumanContestants() {
    return v165Contestants().filter((player) => !player.is_bot && !player.left_at);
  }

  function v167SingleHumanRoom() {
    return v167HumanContestants().length <= 1 && v165Contestants().some((player) => player.is_bot);
  }

  async function v167FinalizeComputersNow() {
    if (!v167SingleHumanRoom()) return;
    await v165PushProgress(true).catch(() => {});
    await v167SyncComputers();
    await v162FetchRoomState().catch(() => {});
  }

  const v166ShowResultsCoreV167 = v162ShowRoomResults;
  v162ShowRoomResults = async function v167Override_v162ShowRoomResults(lost) {
    clearInterval(V16_ONLINE.v167ProgressHeartbeat);
    V16_ONLINE.v167ProgressHeartbeat = null;
    await v166ShowResultsCoreV167(lost);
    if (v167SingleHumanRoom()) {
      await v167FinalizeComputersNow();
      v162RenderRoomResults();
    }
  };

  const v166RenderResultsCoreV167 = v162RenderRoomResults;
  v162RenderRoomResults = function v167Override_v162RenderRoomResults() {
    v166RenderResultsCoreV167();
    if (!$("#roomFinalStandings") || !V16_ONLINE.match?.roomMode) return;

    const players = v165Contestants();
    const allFinished = players.length > 0 && players.every((player) => player.finished || player.left_at) || V16_ONLINE.room?.row?.status === "finished";
    const singleHuman = v167SingleHumanRoom();

    const teamHost = $("#v166ResultsTeamSummary");
    if (teamHost && V16_ONLINE.match.teamMode) teamHost.innerHTML = v167TeamSummary(players);

    if (singleHuman) {
      $("#v165RematchPanel")?.classList.add("v167-hidden");
      const closeText = document.querySelector(".v165-room-close-countdown");
      if (closeText) closeText.innerHTML = allFinished
        ? `Returning home in <span id="v165RoomCloseSeconds">${V167_SINGLE_HUMAN_HOME_SECONDS}s</span>.`
        : "Computer results are being finalized…";

      if (allFinished && !V16_ONLINE.v167SoloHomeTimer) {
        let left = V167_SINGLE_HUMAN_HOME_SECONDS;
        clearInterval(V16_ONLINE.resultCloseTimer);
        V16_ONLINE.resultCloseTimer = null;
        V16_ONLINE.v167SoloHomeTimer = setInterval(async () => {
          const node = $("#v165RoomCloseSeconds");
          if (node) node.textContent = `${Math.max(0,left)}s`;
          if (left-- > 0) return;
          clearInterval(V16_ONLINE.v167SoloHomeTimer);
          V16_ONLINE.v167SoloHomeTimer = null;
          await v162LeaveRoom({ goHome: true });
          showHome();
        }, 1000);
      }
    }
  };

  /* ------------------------------------------------------------
     V16.7H) Lobby decoration and cleanup
     ------------------------------------------------------------ */
  const v166RenderLobbyCoreV167 = v162RenderRoomLobby;
  v162RenderRoomLobby = function v167Override_v162RenderRoomLobby() {
    v166RenderLobbyCoreV167();
    const controls = $("#roomHostPanel");
    if (controls) controls.classList.add("v167-host-stack");
    if (V16_ONLINE.room?.row?.settings?.matchmaking && V16_ONLINE.room.row.status === "waiting") {
      v165StartLobbyDeadlineTimer();
    }
  };

  const v166ClearRoomTimersCoreV167 = v162ClearRoomTimers;
  v162ClearRoomTimers = function v167Override_v162ClearRoomTimers() {
    v166ClearRoomTimersCoreV167();
    clearInterval(V16_ONLINE.v167ProgressHeartbeat);
    clearInterval(V16_ONLINE.v167SoloHomeTimer);
    V16_ONLINE.v167ProgressHeartbeat = null;
    V16_ONLINE.v167SoloHomeTimer = null;
    v167RemoveSearchOverlay();
  };

  /* Keep only valid solo progress before showing the home screen. */
  const v166ShowHomeCoreV167 = showHome;
  showHome = function v167Override_showHome() {
    v167RemoveInvalidSavedRun();
    v166ShowHomeCoreV167();
  };



  /* ============================================================
     20) V16.8 ONLINE ROOM STATE + RESULT FINALIZATION
     ------------------------------------------------------------
     ADDITIVE FIXES:
     - Search choices can never appear during an active match.
     - Only the waiting-room host sees the expired-search choices.
     - Explicit and stale departures update every browser quickly.
     - One remaining human wins immediately after another human leaves.
     - Computer results are advanced and returned by one server snapshot.
     - Old room responses cannot pull a player out of a solo game.
     - Previous-room recovery is offered instead of forced automatically.
     ============================================================ */

  const V168_PREVIOUS_ROOM_KEY = "ffV168PreviousRoom";
  const V168_HEARTBEAT_MS = 8000;
  const V168_POLL_MS = 1200;

  const v167GetGlobalConfigCoreV168 = v16GetGlobalConfig;
  v16GetGlobalConfig = function v168Override_v16GetGlobalConfig() {
    const config = v167GetGlobalConfigCoreV168();
    return {
      ...config,
      roomSnapshotV168Rpc: String(config.roomSnapshotV168Rpc || "ff_room_snapshot_v168"),
      leaveRoomV168Rpc: String(config.leaveRoomV168Rpc || "ff_leave_room_v168"),
      recentRoomV168Rpc: String(config.recentRoomV168Rpc || "ff_find_recent_room_v168"),
      rejoinRoomV168Rpc: String(config.rejoinRoomV168Rpc || "ff_rejoin_room_v168")
    };
  };

  function v168OnlineSurfaceVisible() {
    return Boolean(
      document.querySelector(
        ".multiplayer-screen, .versus-results-screen, .room-versus-hud, .room-lobby-panel"
      ) || state.runMode === "versus"
    );
  }

  function v168RoomEpoch() {
    return Number(V16_ONLINE.v168RoomEpoch || 0);
  }

  function v168AdvanceRoomEpoch() {
    V16_ONLINE.v168RoomEpoch = v168RoomEpoch() + 1;
    return V16_ONLINE.v168RoomEpoch;
  }

  function v168ClearSearchState() {
    clearInterval(V16_ONLINE.searchDeadlineTimer);
    clearInterval(V16_ONLINE.choiceCloseTimer);
    V16_ONLINE.searchDeadlineTimer = null;
    V16_ONLINE.choiceCloseTimer = null;
    $("#v167SearchOverlay")?.remove();
    $("#v166SearchOverlay")?.remove();
    $("#v165ChoiceOverlay")?.remove();
    $("#v165SearchCountdown")?.remove();
    $("#v166SearchCountdown")?.remove();
    try { v166RemoveChoiceOverlay(); } catch { /* older overlay may not exist */ }
  }

  function v168RememberRoom(room = V16_ONLINE.room) {
    if (!room?.id) return;
    try {
      localStorage.setItem(
        V168_PREVIOUS_ROOM_KEY,
        JSON.stringify({
          id: room.id,
          code: room.code || room.row?.code || "",
          status: room.row?.status || "waiting",
          savedAt: Date.now()
        })
      );
    } catch { /* local storage may be unavailable */ }
  }

  function v168ForgetRoom() {
    try { localStorage.removeItem(V168_PREVIOUS_ROOM_KEY); } catch { /* ignore */ }
  }

  function v168NormalizeSnapshot(data) {
    if (!data || typeof data !== "object") return null;
    return {
      room: data.room || null,
      players: Array.isArray(data.players) ? data.players : [],
      bots: Array.isArray(data.bots) ? data.bots : [],
      activeHumans: Number(data.active_humans || 0),
      totalHumans: Number(data.total_humans || 0)
    };
  }

  function v168FriendlyWinner(players, roomRow) {
    const settings = roomRow?.settings || {};
    const teamWinner = Number(settings.winner_team || 0);
    if (teamWinner === 1 || teamWinner === 2) {
      return {
        title: `Team ${teamWinner} wins!`,
        subtitle: settings.ended_reason === "last_human_standing"
          ? "The other human competitor left the match."
          : "Final team scores are locked."
      };
    }

    const storedName = String(settings.winner_name || "").trim();
    const storedUserId = String(settings.winner_user_id || "");
    const meWon = storedUserId && storedUserId === String(V16_ONLINE.user?.id || "");
    if (storedName) {
      return {
        title: meWon ? "You win!" : `${storedName} wins!`,
        subtitle: settings.ended_reason === "last_human_standing"
          ? "The other human competitor left, so the remaining player wins."
          : "Final standings are locked."
      };
    }

    const ranked = [...players].sort(
      (a, b) => Number(b.score || 0) - Number(a.score || 0) ||
        Number(b.current_round || 0) - Number(a.current_round || 0) ||
        String(a.username || "").localeCompare(String(b.username || ""))
    );
    const winner = ranked[0];
    if (!winner) return { title: "Match complete.", subtitle: "Final standings are locked." };
    const isMe = winner.user_id === V16_ONLINE.user?.id;
    return {
      title: isMe ? "You win!" : `${winner.username} wins!`,
      subtitle: "Final standings are locked."
    };
  }

  /* ------------------------------------------------------------
     V16.8A) One server snapshot owns room membership, bots, and finish state
     ------------------------------------------------------------ */
  const v167FetchRoomFallbackV168 = v162FetchRoomState;
  v162FetchRoomState = async function v168Override_v162FetchRoomState() {
    const client = v16SupabaseClient();
    const room = V16_ONLINE.room;
    if (!client || !room?.id) return null;

    const roomId = room.id;
    const epoch = v168RoomEpoch();
    const config = v16GetGlobalConfig();
    const [{ data, error }, reactionsResponse] = await Promise.all([
      client.rpc(config.roomSnapshotV168Rpc, { p_room_id: roomId }).catch((caught) => ({ data: null, error: caught })),
      Promise.resolve(
        client.from("ff_room_reactions")
          .select("id,room_id,user_id,username,reaction_key,created_at")
          .eq("room_id", roomId)
          .order("created_at", { ascending: false })
          .limit(16)
      ).catch((caught) => ({ data: null, error: caught }))
    ]);

    if (error) {
      const message = String(error?.message || error || "");
      if (/room_snapshot_v168|does not exist|could not find/i.test(message)) {
        return v167FetchRoomFallbackV168();
      }
      throw error;
    }

    if (epoch !== v168RoomEpoch() || V16_ONLINE.room?.id !== roomId) return null;

    const snapshot = v168NormalizeSnapshot(data);
    if (!snapshot?.room) return null;

    room.row = snapshot.room;
    room.code = snapshot.room.code;
    room.players = snapshot.players;
    room.bots = snapshot.bots;
    room.activeHumans = snapshot.activeHumans;
    room.totalHumans = snapshot.totalHumans;
    if (snapshot.rematch) v169ApplyRematchStatus(snapshot.rematch);
    v168RememberRoom(room);

    if (!reactionsResponse?.error && Array.isArray(reactionsResponse?.data)) {
      v165ProcessReactionRows(reactionsResponse.data);
    }

    if (V16_ONLINE.match?.roomMode && V16_ONLINE.match.roomId === roomId) {
      V16_ONLINE.match.players = v165Contestants();
    }

    const status = room.row.status;
    if (status !== "waiting") v168ClearSearchState();

    if (status === "playing" && room.row.round_ids?.length) {
      const generation = Number(room.row.settings?.rematch_generation || 0);
      if (!room.matchStarted || V16_ONLINE.match?.roomGeneration !== generation) {
        room.matchStarted = true;
        v162BeginRoomMatch(room.row);
      }
    }

    if (status === "finished" && state.runMode === "versus" && V16_ONLINE.match?.roomMode) {
      if (!V16_ONLINE.match.localFinished && !V16_ONLINE.v168OpeningResults) {
        V16_ONLINE.v168OpeningResults = true;
        V16_ONLINE.match.localFinished = true;
        V16_ONLINE.match.localScore = Number(state.score || V16_ONLINE.match.localScore || 0);
        clearLoops();
        setTimeout(async () => {
          try { await v162ShowRoomResults(false); }
          finally { V16_ONLINE.v168OpeningResults = false; }
        }, 0);
      }
    }

    if (status === "cancelled") {
      v168ClearSearchState();
      const shouldNavigate = v168OnlineSurfaceVisible();
      v162ResetRoomLocalState();
      v168ForgetRoom();
      if (shouldNavigate) showMultiplayerLobby();
      return null;
    }

    if (!v168OnlineSurfaceVisible()) return room;

    v162RenderRoomLobby();
    v16UpdateVersusHud();
    v162RenderRoomResults();
    v164RenderSpectatorPanel();
    return room;
  };

  /* ------------------------------------------------------------
     V16.8B) Faster presence and stale-player updates
     ------------------------------------------------------------ */
  const v167SubscribeCoreV168 = v162SubscribeToRoom;
  v162SubscribeToRoom = async function v168Override_v162SubscribeToRoom() {
    await v167SubscribeCoreV168();
    const roomId = V16_ONLINE.room?.id;
    const client = v16SupabaseClient();
    if (!roomId || !client) return;

    clearInterval(V16_ONLINE.roomHeartbeatTimer);
    clearInterval(V16_ONLINE.roomLivePoll);

    const heartbeat = () => {
      if (V16_ONLINE.room?.id !== roomId) return;
      client.rpc(v16GetGlobalConfig().heartbeatRoomRpc, { p_room_id: roomId }).catch?.(() => {});
    };

    heartbeat();
    V16_ONLINE.roomHeartbeatTimer = setInterval(heartbeat, V168_HEARTBEAT_MS);
    V16_ONLINE.roomLivePoll = setInterval(() => {
      if (V16_ONLINE.room?.id === roomId) v162FetchRoomState().catch(() => {});
    }, V168_POLL_MS);
  };

  /* ------------------------------------------------------------
     V16.8C) Search popups belong only to a waiting-room host
     ------------------------------------------------------------ */
  const v167SearchChoiceCoreV168 = v165ShowSearchChoice;
  v165ShowSearchChoice = function v168Override_v165ShowSearchChoice() {
    const room = V16_ONLINE.room;
    const actualLobby = Boolean($("#roomHostPanel") && $("#roomLobbyPlayers"));
    if (
      !room?.id ||
      room.row?.status !== "waiting" ||
      room.matchStarted ||
      state.runMode === "versus" ||
      V16_ONLINE.match?.roomMode ||
      !actualLobby
    ) {
      v168ClearSearchState();
      return;
    }

    if (!v162RoomIsHost()) {
      const status = $("#roomRealtimeStatus");
      if (status) status.textContent = "Waiting for the host to continue the search.";
      return;
    }

    return v167SearchChoiceCoreV168();
  };

  const v167LobbyDeadlineCoreV168 = v165StartLobbyDeadlineTimer;
  v165StartLobbyDeadlineTimer = function v168Override_v165StartLobbyDeadlineTimer() {
    const room = V16_ONLINE.room;
    if (
      !room?.row ||
      room.row.status !== "waiting" ||
      room.matchStarted ||
      state.runMode === "versus" ||
      !$("#roomHostPanel")
    ) {
      clearInterval(V16_ONLINE.searchDeadlineTimer);
      V16_ONLINE.searchDeadlineTimer = null;
      return;
    }
    return v167LobbyDeadlineCoreV168();
  };

  const v167BeginRoomMatchCoreV168 = v162BeginRoomMatch;
  v162BeginRoomMatch = function v168Override_v162BeginRoomMatch(roomRow) {
    v168ClearSearchState();
    return v167BeginRoomMatchCoreV168(roomRow);
  };

  /* ------------------------------------------------------------
     V16.8D) Explicit leave and stale response protection
     ------------------------------------------------------------ */
  const v167ResetRoomCoreV168 = v162ResetRoomLocalState;
  v162ResetRoomLocalState = function v168Override_v162ResetRoomLocalState() {
    v168AdvanceRoomEpoch();
    return v167ResetRoomCoreV168();
  };

  v162LeaveRoom = async function v168Override_v162LeaveRoom(options = {}) {
    const roomId = V16_ONLINE.room?.id;
    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();

    v168ClearSearchState();
    V16_ONLINE.matchmakingCancelled = true;
    V16_ONLINE.matchmakingToken = Number(V16_ONLINE.matchmakingToken || 0) + 1;
    v168AdvanceRoomEpoch();

    if (roomId && client && options.callServer !== false) {
      await client.rpc(config.leaveRoomV168Rpc, { p_room_id: roomId }).catch(() => null);
    }

    v168ForgetRoom();
    v167ResetRoomCoreV168();
    if (options.goHome) showHome();
  };

  /* ------------------------------------------------------------
     V16.8E) Previous room is offered, never forced
     ------------------------------------------------------------ */
  function v168RemovePreviousRoomPrompt() {
    $("#v168PreviousRoomOverlay")?.remove();
  }

  async function v168OfferPreviousRoom() {
    if ($("#v168PreviousRoomOverlay") || V16_ONLINE.room?.id || !v16GetGlobalConfig().enabled) return;
    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    if (!client || !V16_ONLINE.user) return;

    const { data, error } = await client
      .rpc(config.recentRoomV168Rpc)
      .catch((caught) => ({ data: null, error: caught }));
    if (error || !data?.room_id || !["waiting", "playing"].includes(data.status)) return;

    const overlay = document.createElement("div");
    overlay.id = "v168PreviousRoomOverlay";
    overlay.className = "v168-room-recovery-overlay";
    overlay.innerHTML = `<div class="v168-room-recovery-card"><span class="eyebrow">Previous online room</span><h2>Would you like to return?</h2><div class="v168-room-recovery-stats"><div><span>Room</span><strong>${esc(data.room_code || "------")}</strong></div><div><span>Status</span><strong>${esc(data.status)}</strong></div><div><span>Humans</span><strong>${Number(data.active_humans || 0)}</strong></div><div><span>Computers</span><strong>${Number(data.active_bots || 0)}</strong></div></div><p>Your previous room is still available. You will never be pulled back automatically.</p><div class="v168-room-recovery-actions"><button class="btn btn-good" id="v168RejoinPrevious">Rejoin Previous Room</button><button class="btn btn-primary" id="v168FindNewRoom">Find a New Solo Match</button><button class="btn btn-secondary" id="v168DismissPrevious">Not Now</button></div><p class="form-error" id="v168RecoveryError"></p></div>`;
    document.body.appendChild(overlay);

    on($("#v168DismissPrevious"), "click", v168RemovePreviousRoomPrompt);
    on($("#v168RejoinPrevious"), "click", async () => {
      const button = $("#v168RejoinPrevious");
      const errorNode = $("#v168RecoveryError");
      button.disabled = true;
      try {
        const profile = v16GetActiveProfile();
        const response = await client.rpc(config.rejoinRoomV168Rpc, {
          p_room_id: data.room_id,
          p_username: profile.username
        });
        if (response.error) throw response.error;
        v168RemovePreviousRoomPrompt();
        V16_ONLINE.room = {
          id: response.data.room_id,
          code: response.data.room_code,
          row: null,
          players: [],
          bots: [],
          matchStarted: false
        };
        v168AdvanceRoomEpoch();
        await v162SubscribeToRoom();
        await v162FetchRoomState();
        if (V16_ONLINE.room?.row?.status === "waiting") v162ShowRoomLobby();
      } catch (error) {
        button.disabled = false;
        errorNode.textContent = v162FriendlyOnlineError(error);
      }
    });

    on($("#v168FindNewRoom"), "click", async () => {
      const button = $("#v168FindNewRoom");
      button.disabled = true;
      await client.rpc(config.leaveRoomV168Rpc, { p_room_id: data.room_id }).catch(() => null);
      v168RemovePreviousRoomPrompt();
      v168ForgetRoom();
      v164StartMatchmaking("solo");
    });
  }

  const v167ShowMultiplayerCoreV168 = showMultiplayerLobby;
  showMultiplayerLobby = function v168Override_showMultiplayerLobby() {
    /* Never let an old in-memory room skip the choice prompt. */
    if (V16_ONLINE.room?.id && state.runMode !== "versus") {
      v168RememberRoom();
      v168AdvanceRoomEpoch();
      v167ResetRoomCoreV168();
    }
    v167ShowMultiplayerCoreV168();
    setTimeout(() => v168OfferPreviousRoom().catch(() => {}), 80);
  };

  /* ------------------------------------------------------------
     V16.8F) Final winner/place always replaces the waiting message
     ------------------------------------------------------------ */
  const v167RenderRoomResultsCoreV168 = v162RenderRoomResults;
  v162RenderRoomResults = function v168Override_v162RenderRoomResults() {
    v167RenderRoomResultsCoreV168();
    if (!$("#roomFinalStandings") || !V16_ONLINE.match?.roomMode) return;

    const roomRow = V16_ONLINE.room?.row;
    const players = v165Contestants();
    if (roomRow?.status !== "finished") return;

    const result = v168FriendlyWinner(players, roomRow);
    const title = $("#roomResultTitle");
    const status = $("#roomResultStatus");
    if (title) title.textContent = result.title;
    if (status) {
      status.textContent = result.subtitle;
      status.classList.remove("waiting");
      status.classList.add("complete");
    }

    const ranked = [...players].sort(
      (a, b) => Number(b.score || 0) - Number(a.score || 0) ||
        Number(b.current_round || 0) - Number(a.current_round || 0)
    );
    const myPlace = ranked.findIndex((player) => player.user_id === V16_ONLINE.user?.id) + 1;
    if (myPlace > 0 && status) status.textContent += ` You placed #${myPlace} of ${ranked.length}.`;

    const follow = $("#v164SpectatorPanel");
    if (follow) follow.innerHTML = `<strong>Match complete.</strong><p>Every active competitor has a final result.</p>`;
    const waitSection = $("#v166WaitSection");
    if (waitSection) waitSection.classList.add("v168-finished-hidden");
    document.querySelectorAll(".v167-solo-bot-note").forEach((node) => node.remove());
  };

  /* ------------------------------------------------------------
     V16.8G) Home/solo navigation cannot be hijacked by old room requests
     ------------------------------------------------------------ */
  const v167ShowHomeCoreV168 = showHome;
  showHome = function v168Override_showHome() {
    v168ClearSearchState();
    v168AdvanceRoomEpoch();
    v168RemovePreviousRoomPrompt();
    v167ShowHomeCoreV168();
  };




  /* ============================================================
     21) V16.9 NATIVE RPC PROMISES + LIVE SCORE/REMATCH CONSISTENCY
     ------------------------------------------------------------
     ADDITIVE UPDATE — all V16.8 code remains above.

     Fixes:
     - Supabase PostgREST builders are PromiseLike but do not always expose
       `.catch()`. Every RPC is normalized to a real native Promise.
     - Quick Solo Match and 2v2 no longer fail with
       "client.rpc(...).catch is not a function".
     - Score writes return and apply one canonical server snapshot.
     - Stale score/round broadcasts cannot replace newer values with zero.
     - Rematch voting is atomic and server-started after every active human
       votes; every results screen receives the same votes/needed values.
     - Romance/marketplace cards receive a dedicated one-column layout in CSS.
     ============================================================ */

  /* ------------------------------------------------------------
     V16.9A) Normalize Supabase RPC results into native Promises
     ------------------------------------------------------------ */
  const v168SupabaseClientCoreV169 = v16SupabaseClient;

  function v169NativePromise(value) {
    return Promise.resolve(value);
  }

  function v169NormalizeSupabaseClient(client) {
    if (!client || client.__ffV169NativeRpc) return client;
    const originalRpc = client.rpc.bind(client);
    client.rpc = (...args) => v169NativePromise(originalRpc(...args));
    Object.defineProperty(client, "__ffV169NativeRpc", {
      value: true,
      configurable: false,
      enumerable: false,
      writable: false
    });
    return client;
  }

  v16SupabaseClient = function v169Override_v16SupabaseClient() {
    return v169NormalizeSupabaseClient(v168SupabaseClientCoreV169());
  };

  /* ------------------------------------------------------------
     V16.9B) New canonical snapshot/progress/rematch RPC names
     ------------------------------------------------------------ */
  const v168GetGlobalConfigCoreV169 = v16GetGlobalConfig;
  v16GetGlobalConfig = function v169Override_v16GetGlobalConfig() {
    const base = v168GetGlobalConfigCoreV169();
    const config = window.FF_ONLINE_CONFIG || window.FF_LEADERBOARD_CONFIG || {};
    return {
      ...base,
      /* Existing V16.8 fetch code reads roomSnapshotV168Rpc, so point that
         key at the compatible V16.9 superset response. */
      roomSnapshotV168Rpc: String(config.roomSnapshotV169Rpc || "ff_room_snapshot_v169"),
      roomSnapshotV169Rpc: String(config.roomSnapshotV169Rpc || "ff_room_snapshot_v169"),
      updateRoomV169Rpc: String(config.updateRoomV169Rpc || "ff_update_room_progress_v169"),
      rematchVoteV169Rpc: String(config.rematchVoteV169Rpc || "ff_vote_room_rematch_v169")
    };
  };

  /* ------------------------------------------------------------
     V16.9C) Canonical snapshot application shared by writes/polls
     ------------------------------------------------------------ */
  function v169ApplyRematchStatus(data) {
    if (!data || typeof data !== "object") return;
    V16_ONLINE.rematchStatus = data;

    const votes = Math.max(0, Number(data.votes || 0));
    const needed = Math.max(0, Number(data.needed || 0));
    const percent = needed > 0 ? clamp((votes / needed) * 100, 0, 100) : 0;
    const count = $("#v165RematchCount");
    const meter = $("#v165RematchMeter");
    const button = $("#v165RematchBtn");
    const panel = $("#v165RematchPanel");

    if (count) count.textContent = `${votes}/${needed}`;
    if (meter) meter.style.width = `${percent}%`;
    if (button) {
      button.disabled = Boolean(data.you_voted || data.started || needed < 2);
      button.textContent = data.started
        ? "Rematch Starting…"
        : data.you_voted
          ? "Rematch Vote Sent"
          : needed < 2
            ? "Another Human Is Needed"
            : "Vote for Rematch";
    }
    if (panel) panel.classList.toggle("v169-rematch-starting", Boolean(data.started));
  }

  function v169ApplySnapshotData(data) {
    const snapshot = v168NormalizeSnapshot(data);
    const room = V16_ONLINE.room;
    if (!snapshot?.room || !room?.id || snapshot.room.id !== room.id) return null;

    room.row = snapshot.room;
    room.code = snapshot.room.code;
    room.players = snapshot.players;
    room.bots = snapshot.bots;
    room.activeHumans = snapshot.activeHumans;
    room.totalHumans = snapshot.totalHumans;

    if (data.rematch) v169ApplyRematchStatus(data.rematch);
    if (V16_ONLINE.match?.roomMode && V16_ONLINE.match.roomId === room.id) {
      V16_ONLINE.match.players = v165Contestants();
    }

    v16UpdateVersusHud();
    v162RenderRoomResults();
    v164RenderSpectatorPanel();
    return room;
  }

  /* Preserve the V16.8 normalizer and carry the V16.9 rematch block. */
  const v168NormalizeSnapshotCoreV169 = v168NormalizeSnapshot;
  v168NormalizeSnapshot = function v169Override_v168NormalizeSnapshot(data) {
    const snapshot = v168NormalizeSnapshotCoreV169(data);
    if (snapshot) snapshot.rematch = data?.rematch || null;
    return snapshot;
  };

  /* Apply the cached rematch state after every results redraw. */
  const v168RenderRoomResultsCoreV169 = v162RenderRoomResults;
  v162RenderRoomResults = function v169Override_v162RenderRoomResults() {
    v168RenderRoomResultsCoreV169();
    if (V16_ONLINE.rematchStatus) v169ApplyRematchStatus(V16_ONLINE.rematchStatus);
  };

  /* ------------------------------------------------------------
     V16.9D) Score writes execute, remain monotonic, and return snapshot
     ------------------------------------------------------------ */
  v165PushProgress = async function v169Override_v165PushProgress(finished = false) {
    const match = V16_ONLINE.match;
    if (!match?.roomMode || !match.roomId) return null;

    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    if (!client) return null;

    match.localScore = Math.max(Number(match.localScore || 0), Number(state.score || 0));
    const round = finished
      ? match.roundIds.length
      : Math.min(Math.max(0, Number(state.idx + 1)), match.roundIds.length);

    const me = (V16_ONLINE.room?.players || []).find(
      (player) => player.user_id === V16_ONLINE.user?.id
    );
    if (me) {
      me.score = Math.max(Number(me.score || 0), match.localScore);
      me.current_round = Math.max(Number(me.current_round || 0), round);
      me.finished = Boolean(me.finished || finished);
    }

    v16UpdateVersusHud();

    const { data, error } = await client.rpc(config.updateRoomV169Rpc, {
      p_room_id: match.roomId,
      p_score: match.localScore,
      p_current_round: round,
      p_finished: Boolean(finished)
    });

    if (error) {
      console.warn("V16.9 live room progress update failed:", error);
      return null;
    }

    if (data) v169ApplySnapshotData(data);

    await Promise.resolve(
      V16_ONLINE.roomChannel?.send({
        type: "broadcast",
        event: "progress",
        payload: {
          userId: V16_ONLINE.user?.id,
          score: match.localScore,
          round,
          finished: Boolean(finished)
        }
      })
    ).catch(() => {});

    return data;
  };

  /* ------------------------------------------------------------
     V16.9E) Atomic rematch vote + shared _/_ status on every screen
     ------------------------------------------------------------ */
  v165RefreshRematchStatus = async function v169Override_v165RefreshRematchStatus() {
    const roomId = V16_ONLINE.room?.id;
    if (!roomId || !$("#v165RematchPanel")) return;

    try {
      const client = v16SupabaseClient();
      const config = v16GetGlobalConfig();
      const { data, error } = await client.rpc(config.roomSnapshotV169Rpc, {
        p_room_id: roomId
      });
      if (error) throw error;
      if (data) {
        v169ApplySnapshotData(data);
        if (data.rematch) v169ApplyRematchStatus(data.rematch);
      }
    } catch (error) {
      console.warn("V16.9 rematch status refresh failed:", error);
    }
  };

  v165VoteRematch = async function v169Override_v165VoteRematch() {
    const roomId = V16_ONLINE.room?.id;
    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    const button = $("#v165RematchBtn");
    if (!roomId || !client || button?.disabled) return;

    if (button) {
      button.disabled = true;
      button.textContent = "Sending Vote…";
    }

    try {
      const roundCount = Number(V16_ONLINE.room?.row?.round_count || 5);
      const roundIds = v162SelectRoomRounds(roundCount);
      const { data, error } = await client.rpc(config.rematchVoteV169Rpc, {
        p_room_id: roomId,
        p_round_ids: roundIds
      });
      if (error) throw error;

      sfx("rematch");
      if (data) v169ApplyRematchStatus(data);

      if (data?.started) {
        V16_ONLINE.room.matchStarted = false;
        V16_ONLINE.resultCloseAt = null;
        clearInterval(V16_ONLINE.resultCloseTimer);
        V16_ONLINE.resultCloseTimer = null;
        await v162FetchRoomState();
      }
    } catch (error) {
      if (button) button.disabled = false;
      toast(v162FriendlyOnlineError(error));
      await v165RefreshRematchStatus();
    }
  };

  /* ------------------------------------------------------------
     V16.9F) User-facing online errors never expose builder internals
     ------------------------------------------------------------ */
  const v168FriendlyOnlineErrorCoreV169 = v162FriendlyOnlineError;
  v162FriendlyOnlineError = function v169Override_v162FriendlyOnlineError(error) {
    const raw = String(error?.message || error || "");
    if (/\.catch is not a function|client\.rpc/i.test(raw)) {
      return "Online Play could not start because an older cached game script is still loaded. Refresh the page and try again.";
    }
    return v168FriendlyOnlineErrorCoreV169(error);
  };




  /* ============================================================
     22) V16.10 FAIR COMPUTERS + REMATCH/PRESENCE/COUNTDOWN RELIABILITY
     ------------------------------------------------------------
     ADDITIVE UPDATE — every V16.9 system remains above.

     Fixes:
     - Computer scores use the fair V16.10 server model instead of the
       earlier overpowered scoring curve.
     - Rematch votes count only active human browsers and refresh on every
       results screen even when Realtime briefly misses an event.
     - Room membership is refreshed when the tab becomes visible/focused.
     - Result-room countdowns use one stable deadline and always return home.
     ============================================================ */

  const V170_RESULT_SECONDS = 90;
  const V170_SINGLE_HUMAN_SECONDS = 12;
  const V170_REMATCH_POLL_MS = 1200;

  /* ------------------------------------------------------------
     V16.10A) Point every existing caller at the V16.10 server RPCs
     ------------------------------------------------------------ */
  const v169GetGlobalConfigCoreV170 = v16GetGlobalConfig;
  v16GetGlobalConfig = function v170Override_v16GetGlobalConfig() {
    const base = v169GetGlobalConfigCoreV170();
    const config = window.FF_ONLINE_CONFIG || window.FF_LEADERBOARD_CONFIG || {};
    const snapshotRpc = String(config.roomSnapshotV170Rpc || "ff_room_snapshot_v170");
    const progressRpc = String(config.updateRoomV170Rpc || "ff_update_room_progress_v170");
    const rematchRpc = String(config.rematchVoteV170Rpc || "ff_vote_room_rematch_v170");
    const botRpc = String(config.syncBotsV170Rpc || "ff_sync_room_bots_v170");
    return {
      ...base,
      roomSnapshotV168Rpc: snapshotRpc,
      roomSnapshotV169Rpc: snapshotRpc,
      roomSnapshotV170Rpc: snapshotRpc,
      updateRoomV169Rpc: progressRpc,
      updateRoomV170Rpc: progressRpc,
      rematchVoteV169Rpc: rematchRpc,
      rematchVoteV170Rpc: rematchRpc,
      syncBotsV167Rpc: botRpc,
      syncBotsV170Rpc: botRpc
    };
  };

  /* ------------------------------------------------------------
     V16.10B) Rematch status never remains stuck on one browser
     ------------------------------------------------------------ */
  const v169ApplyRematchStatusCoreV170 = v169ApplyRematchStatus;
  v169ApplyRematchStatus = function v170Override_v169ApplyRematchStatus(data) {
    v169ApplyRematchStatusCoreV170(data);
    if (!data || typeof data !== "object") return;

    const votes = Math.max(0, Number(data.votes || 0));
    const needed = Math.max(0, Number(data.needed || 0));
    const panel = $("#v165RematchPanel");
    const copy = panel?.querySelector("p");
    if (copy) {
      copy.innerHTML = needed < 2
        ? `<span id="v165RematchCount">${votes}/${needed}</span> active human players. Another human is needed for a rematch.`
        : `<span id="v165RematchCount">${votes}/${needed}</span> active human players voted for a rematch.`;
    }

    if (data.started) {
      v170StopResultCountdown();
      v170StopRematchPoll();
    } else if (data.all_voted) {
      setTimeout(() => v170AttemptAutomaticRematchStart(data), 80 + Math.floor(Math.random() * 160));
    }
  };

  async function v170AttemptAutomaticRematchStart(data) {
    if (!data?.all_voted || data?.started || Number(data.needed || 0) < 2) return;
    if (V16_ONLINE.v170AutoStartingRematch || V16_ONLINE.room?.row?.status !== "finished") return;
    V16_ONLINE.v170AutoStartingRematch = true;
    try {
      const client = v16SupabaseClient();
      const config = v16GetGlobalConfig();
      const roundCount = Number(V16_ONLINE.room?.row?.round_count || 5);
      const roundIds = v162SelectRoomRounds(roundCount);
      const { data: result, error } = await client.rpc(config.rematchVoteV170Rpc, {
        p_room_id: V16_ONLINE.room.id,
        p_round_ids: roundIds
      });
      if (!error && result) v169ApplyRematchStatus(result);
      await v162FetchRoomState().catch(() => {});
    } catch { /* another browser may have started it first */ }
    finally { V16_ONLINE.v170AutoStartingRematch = false; }
  }

  function v170StopRematchPoll() {
    clearInterval(V16_ONLINE.v170RematchPoll);
    V16_ONLINE.v170RematchPoll = null;
  }

  function v170StartRematchPoll() {
    v170StopRematchPoll();
    if (!V16_ONLINE.room?.id || !$("#v165RematchPanel")) return;
    const tick = async () => {
      if (!V16_ONLINE.room?.id || !$("#v165RematchPanel")) {
        v170StopRematchPoll();
        return;
      }
      if (V16_ONLINE.room?.row?.status === "playing") {
        v170StopRematchPoll();
        return;
      }
      await v165RefreshRematchStatus().catch(() => {});
    };
    tick();
    V16_ONLINE.v170RematchPoll = setInterval(tick, V170_REMATCH_POLL_MS);
  }

  const v169VoteRematchCoreV170 = v165VoteRematch;
  v165VoteRematch = async function v170Override_v165VoteRematch() {
    const button = $("#v165RematchBtn");
    const before = V16_ONLINE.rematchStatus || {};
    if (before.you_voted || before.started) return;
    if (button) {
      button.disabled = true;
      button.textContent = "Sending Vote…";
    }
    await v169VoteRematchCoreV170();
    await v165RefreshRematchStatus().catch(() => {});
    v170StartRematchPoll();
  };

  /* ------------------------------------------------------------
     V16.10C) One durable result deadline that survives redraws
     ------------------------------------------------------------ */
  function v170StopResultCountdown() {
    clearInterval(V16_ONLINE.resultCloseTimer);
    clearTimeout(V16_ONLINE.v170ResultCloseTimeout);
    V16_ONLINE.resultCloseTimer = null;
    V16_ONLINE.v170ResultCloseTimeout = null;
    V16_ONLINE.v170ClosingResults = false;
  }

  function v170ResultDeadline() {
    const serverValue = V16_ONLINE.room?.row?.settings?.result_close_at;
    const serverTime = serverValue ? Date.parse(serverValue) : NaN;
    const singleHuman = typeof v167SingleHumanRoom === "function" && v167SingleHumanRoom();
    const existing = Number(V16_ONLINE.resultCloseAt || 0);
    if (existing > Date.now()) {
      if (singleHuman) return Number.isFinite(serverTime) ? Math.min(existing, serverTime) : existing;
      return Number.isFinite(serverTime) ? serverTime : existing;
    }
    const localDuration = (singleHuman ? V170_SINGLE_HUMAN_SECONDS : V170_RESULT_SECONDS) * 1000;
    const localTime = Date.now() + localDuration;
    return Number.isFinite(serverTime)
      ? (singleHuman ? Math.min(serverTime, localTime) : serverTime)
      : localTime;
  }

  async function v170CloseResultsAndGoHome() {
    if (V16_ONLINE.v170ClosingResults) return;
    V16_ONLINE.v170ClosingResults = true;
    v170StopRematchPoll();
    clearInterval(V16_ONLINE.resultCloseTimer);
    V16_ONLINE.resultCloseTimer = null;

    try {
      await Promise.race([
        Promise.resolve(v162LeaveRoom({ goHome: true })),
        new Promise((resolve) => setTimeout(resolve, 2500))
      ]);
    } catch { /* local navigation still completes */ }

    if (V16_ONLINE.room?.id) v162ResetRoomLocalState();
    showHome();
  }

  v165StartResultCloseCountdown = function v170Override_v165StartResultCloseCountdown() {
    const room = V16_ONLINE.room;
    if (!room?.id || room.row?.status === "playing") {
      v170StopResultCountdown();
      return;
    }

    clearInterval(V16_ONLINE.v167SoloHomeTimer);
    V16_ONLINE.v167SoloHomeTimer = null;
    clearInterval(V16_ONLINE.resultCloseTimer);
    clearTimeout(V16_ONLINE.v170ResultCloseTimeout);

    V16_ONLINE.resultCloseAt = v170ResultDeadline();

    const tick = () => {
      if (V16_ONLINE.room?.row?.status === "playing") {
        v170StopResultCountdown();
        return;
      }
      const milliseconds = Math.max(0, V16_ONLINE.resultCloseAt - Date.now());
      const left = Math.ceil(milliseconds / 1000);
      document.querySelectorAll("#v165RoomCloseSeconds").forEach((node) => {
        node.textContent = `${left}`;
      });
      if (milliseconds <= 0) v170CloseResultsAndGoHome();
    };

    tick();
    V16_ONLINE.resultCloseTimer = setInterval(tick, 250);
    V16_ONLINE.v170ResultCloseTimeout = setTimeout(
      () => v170CloseResultsAndGoHome(),
      Math.max(0, V16_ONLINE.resultCloseAt - Date.now()) + 350
    );
  };

  /* Results redraws and room snapshots cannot accidentally stop the timers. */
  const v169RenderRoomResultsCoreV170 = v162RenderRoomResults;
  v162RenderRoomResults = function v170Override_v162RenderRoomResults() {
    v169RenderRoomResultsCoreV170();
    const isResults = Boolean($("#roomFinalStandings"));
    if (!isResults) return;
    if (V16_ONLINE.room?.row?.status === "playing") {
      v170StopResultCountdown();
      v170StopRematchPoll();
      return;
    }
    v165StartResultCloseCountdown();
    v170StartRematchPoll();
  };

  const v169ShowRoomResultsCoreV170 = v162ShowRoomResults;
  v162ShowRoomResults = async function v170Override_v162ShowRoomResults(lost) {
    await v169ShowRoomResultsCoreV170(lost);
    v165StartResultCloseCountdown();
    v170StartRematchPoll();
  };

  const v168BeginRoomMatchCoreV170 = v162BeginRoomMatch;
  v162BeginRoomMatch = function v170Override_v162BeginRoomMatch(roomRow) {
    v170StopResultCountdown();
    v170StopRematchPoll();
    V16_ONLINE.resultCloseAt = null;
    return v168BeginRoomMatchCoreV170(roomRow);
  };

  /* ------------------------------------------------------------
     V16.10D) Presence refreshes immediately when a player returns
     ------------------------------------------------------------ */
  function v170RefreshPresenceNow() {
    if (!V16_ONLINE.room?.id || document.hidden) return;
    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    if (!client) return;
    client.rpc(config.heartbeatRoomRpc, { p_room_id: V16_ONLINE.room.id }).catch(() => {});
    v162FetchRoomState().catch(() => {});
  }

  if (!V16_ONLINE.v170PresenceEventsInstalled) {
    V16_ONLINE.v170PresenceEventsInstalled = true;
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) v170RefreshPresenceNow();
    });
    window.addEventListener("focus", v170RefreshPresenceNow);
    window.addEventListener("online", v170RefreshPresenceNow);
  }

  const v168ClearRoomTimersCoreV170 = v162ClearRoomTimers;
  v162ClearRoomTimers = function v170Override_v162ClearRoomTimers() {
    v170StopResultCountdown();
    v170StopRematchPoll();
    return v168ClearRoomTimersCoreV170();
  };

  const v168ShowHomeCoreV170 = showHome;
  showHome = function v170Override_showHome() {
    v170StopResultCountdown();
    v170StopRematchPoll();
    return v168ShowHomeCoreV170();
  };


  /* ============================================================
     23) V16.11 SERVER-AUTHORITATIVE REMATCH + FINAL WINNER
     ------------------------------------------------------------
     ADDITIVE UPDATE — every V16.10 feature remains above.

     Fixes:
     - The rematch button, Leave Room button, and Home button use one
       capture-phase action router so a redraw cannot detach them.
     - Rematch votes are idempotent and synchronized as votes/active humans.
     - The last required vote starts one atomic rematch in the same room.
     - Every result screen polls the same server snapshot and automatically
       enters the rematch countdown when the room restarts.
     - Solo results always name the winning username.
     - 2v2 results always name the Green Team or Red Team from canonical
       server totals.
     ============================================================ */

  const V171_REMATCH_POLL_MS = 750;
  const V171_ACTION_TIMEOUT_MS = 1800;

  /* ------------------------------------------------------------
     V16.11A) Point every room caller at the V16.11 canonical RPCs
     ------------------------------------------------------------ */
  const v170GetGlobalConfigCoreV171 = v16GetGlobalConfig;
  v16GetGlobalConfig = function v171Override_v16GetGlobalConfig() {
    const base = v170GetGlobalConfigCoreV171();
    const config = window.FF_ONLINE_CONFIG || window.FF_LEADERBOARD_CONFIG || {};
    const snapshotRpc = String(config.roomSnapshotV171Rpc || "ff_room_snapshot_v171");
    const progressRpc = String(config.updateRoomV171Rpc || "ff_update_room_progress_v171");
    const rematchRpc = String(config.rematchVoteV171Rpc || "ff_vote_room_rematch_v171");
    return {
      ...base,
      roomSnapshotV168Rpc: snapshotRpc,
      roomSnapshotV169Rpc: snapshotRpc,
      roomSnapshotV170Rpc: snapshotRpc,
      roomSnapshotV171Rpc: snapshotRpc,
      updateRoomV169Rpc: progressRpc,
      updateRoomV170Rpc: progressRpc,
      updateRoomV171Rpc: progressRpc,
      rematchVoteV169Rpc: rematchRpc,
      rematchVoteV170Rpc: rematchRpc,
      rematchVoteV171Rpc: rematchRpc
    };
  };

  /* ------------------------------------------------------------
     V16.11B) Final winner copy uses canonical server winner data
     ------------------------------------------------------------ */
  const v168FriendlyWinnerCoreV171 = v168FriendlyWinner;
  v168FriendlyWinner = function v171Override_v168FriendlyWinner(players, roomRow) {
    const settings = roomRow?.settings || {};
    const teamMode = String(settings.mode || "") === "team_2v2";
    const tied = Boolean(settings.winner_tie);

    if (teamMode) {
      if (tied) {
        return {
          title: "Green Team and Red Team tied!",
          subtitle: "Both teams finished with the same combined score.",
          winnerClass: "winner-tie"
        };
      }
      const team = Number(settings.winner_team || 0);
      if (team === 1 || team === 2) {
        const colorName = team === 1 ? "Green Team" : "Red Team";
        return {
          title: `${colorName} wins!`,
          subtitle: `The ${colorName} earned the highest combined real-time score.`,
          winnerClass: team === 1 ? "winner-green" : "winner-red"
        };
      }
    }

    if (tied) {
      return {
        title: "The match ended in a tie!",
        subtitle: "The top players finished with the same score.",
        winnerClass: "winner-tie"
      };
    }

    const storedName = String(settings.winner_name || "").trim();
    if (storedName) {
      const isMe = String(settings.winner_user_id || "") === String(V16_ONLINE.user?.id || "");
      return {
        title: `${storedName} wins!`,
        subtitle: isMe
          ? `${storedName} is your gamer tag—you won this room.`
          : "The winner is based on the final synchronized room score.",
        winnerClass: "winner-solo"
      };
    }

    const fallback = v168FriendlyWinnerCoreV171(players, roomRow);
    if (fallback?.title === "You win!") {
      const me = players.find((player) => player.user_id === V16_ONLINE.user?.id);
      return {
        ...fallback,
        title: `${me?.username || v16GetActiveProfile()?.username || "Player"} wins!`,
        winnerClass: "winner-solo"
      };
    }
    return { ...fallback, winnerClass: "winner-solo" };
  };

  function v171RenderCanonicalWinner() {
    if (!$("#roomFinalStandings") || V16_ONLINE.room?.row?.status !== "finished") return;
    const result = v168FriendlyWinner(v165Contestants(), V16_ONLINE.room.row);
    const title = $("#roomResultTitle");
    const status = $("#roomResultStatus");
    const panel = $(".room-results-panel");

    if (title) title.textContent = result.title;
    if (status) {
      status.textContent = result.subtitle;
      status.classList.remove("waiting");
      status.classList.add("complete");
    }
    if (panel) {
      panel.classList.remove("winner-green", "winner-red", "winner-solo", "winner-tie");
      if (result.winnerClass) panel.classList.add(result.winnerClass);
    }
  }

  /* ------------------------------------------------------------
     V16.11C) One reliable rematch status refresh for every screen
     ------------------------------------------------------------ */
  function v171StopRematchPoll() {
    clearInterval(V16_ONLINE.v171RematchPoll);
    V16_ONLINE.v171RematchPoll = null;
  }

  async function v171ApplySnapshotAndMaybeRestart(data) {
    if (!data || !V16_ONLINE.room?.id) return null;
    const room = v169ApplySnapshotData(data);
    if (!room) return null;

    const generation = Number(room.row?.settings?.rematch_generation || 0);
    const currentGeneration = Number(V16_ONLINE.match?.roomGeneration || 0);
    if (room.row?.status === "playing" && generation > currentGeneration) {
      v171StopRematchPoll();
      v170StopResultCountdown();
      V16_ONLINE.resultCloseAt = null;
      V16_ONLINE.room.matchStarted = false;
      if (V16_ONLINE.match) {
        V16_ONLINE.match.localFinished = false;
        V16_ONLINE.match.localScore = 0;
      }
      await v162FetchRoomState();
    } else {
      v171RenderCanonicalWinner();
    }
    return room;
  }

  async function v171RefreshRematchStatus() {
    const roomId = V16_ONLINE.room?.id;
    if (!roomId || !$("#v165RematchPanel")) return null;
    if (V16_ONLINE.v171RematchRefreshPromise) return V16_ONLINE.v171RematchRefreshPromise;

    V16_ONLINE.v171RematchRefreshPromise = (async () => {
      const client = v16SupabaseClient();
      const config = v16GetGlobalConfig();
      if (!client) return null;
      const { data, error } = await client.rpc(config.roomSnapshotV171Rpc, {
        p_room_id: roomId
      });
      if (error) throw error;
      if (data) await v171ApplySnapshotAndMaybeRestart(data);
      return data;
    })();

    try {
      return await V16_ONLINE.v171RematchRefreshPromise;
    } catch (error) {
      console.warn("V16.11 rematch refresh failed:", error);
      return null;
    } finally {
      V16_ONLINE.v171RematchRefreshPromise = null;
    }
  }

  function v171StartRematchPoll() {
    if (V16_ONLINE.v171RematchPoll) return;
    if (!V16_ONLINE.room?.id || !$("#v165RematchPanel")) return;

    const tick = async () => {
      if (!V16_ONLINE.room?.id || !$("#v165RematchPanel")) {
        v171StopRematchPoll();
        return;
      }
      await v171RefreshRematchStatus();
    };

    tick();
    V16_ONLINE.v171RematchPoll = setInterval(tick, V171_REMATCH_POLL_MS);
  }

  /* Replace every earlier rematch refresh entry point. */
  v165RefreshRematchStatus = v171RefreshRematchStatus;
  v170StartRematchPoll = v171StartRematchPoll;
  v170StopRematchPoll = v171StopRematchPoll;

  /* ------------------------------------------------------------
     V16.11D) Idempotent vote that starts the same-room rematch
     ------------------------------------------------------------ */
  async function v171VoteRematchReliable() {
    const room = V16_ONLINE.room;
    const button = $("#v165RematchBtn");
    if (!room?.id || V16_ONLINE.v171VotePending) return;

    V16_ONLINE.v171VotePending = true;
    if (button) {
      button.disabled = true;
      button.textContent = "Sending Rematch Vote…";
    }

    try {
      const client = v16SupabaseClient();
      const config = v16GetGlobalConfig();
      if (!client) throw new Error("Online Play is not connected.");

      const roundCount = Number(room.row?.round_count || V16_ONLINE.match?.roundIds?.length || 5);
      const roundIds = v162SelectRoomRounds(roundCount);
      const { data, error } = await client.rpc(config.rematchVoteV171Rpc, {
        p_room_id: room.id,
        p_round_ids: roundIds
      });
      if (error) throw error;

      sfx("rematch");
      if (data) await v171ApplySnapshotAndMaybeRestart(data);
      v171StartRematchPoll();
    } catch (error) {
      toast(v162FriendlyOnlineError(error));
      if (button) {
        button.disabled = false;
        button.textContent = "Vote for Rematch";
      }
      await v171RefreshRematchStatus();
    } finally {
      V16_ONLINE.v171VotePending = false;
    }
  }

  v165VoteRematch = v171VoteRematchReliable;

  /* ------------------------------------------------------------
     V16.11E) Result buttons survive redraws and always navigate
     ------------------------------------------------------------ */
  async function v171LeaveResults(destination) {
    if (V16_ONLINE.v171LeavingResults) return;
    V16_ONLINE.v171LeavingResults = true;

    const roomId = V16_ONLINE.room?.id;
    const client = v16SupabaseClient();
    const config = v16GetGlobalConfig();
    v171StopRematchPoll();
    v170StopResultCountdown();

    try {
      if (roomId && client) {
        await Promise.race([
          client.rpc(config.leaveRoomV168Rpc, { p_room_id: roomId }),
          new Promise((resolve) => setTimeout(resolve, V171_ACTION_TIMEOUT_MS))
        ]);
      }
    } catch {
      /* Local navigation must still succeed if the network is slow. */
    }

    try { v168ForgetRoom(); } catch { /* optional helper */ }
    v162ResetRoomLocalState();
    V16_ONLINE.v171LeavingResults = false;

    if (destination === "hub") showMultiplayerLobby();
    else showHome();
  }

  if (!V16_ONLINE.v171ResultActionRouterInstalled) {
    V16_ONLINE.v171ResultActionRouterInstalled = true;
    document.addEventListener("click", (event) => {
      const button = event.target.closest?.("#v165RematchBtn,#returnRoomHubBtn,#roomResultsHomeBtn");
      if (!button || !$("#roomFinalStandings")) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      if (button.id === "v165RematchBtn") {
        v171VoteRematchReliable();
      } else if (button.id === "returnRoomHubBtn") {
        v171LeaveResults("hub");
      } else {
        v171LeaveResults("home");
      }
    }, true);
  }

  /* ------------------------------------------------------------
     V16.11F) Reapply winner/rematch behavior after every redraw
     ------------------------------------------------------------ */
  const v170RenderRoomResultsCoreV171 = v162RenderRoomResults;
  v162RenderRoomResults = function v171Override_v162RenderRoomResults() {
    v170RenderRoomResultsCoreV171();
    if (!$("#roomFinalStandings")) return;
    v171RenderCanonicalWinner();
    if (V16_ONLINE.rematchStatus) v169ApplyRematchStatus(V16_ONLINE.rematchStatus);
    v171StartRematchPoll();
  };

  const v170ShowRoomResultsCoreV171 = v162ShowRoomResults;
  v162ShowRoomResults = async function v171Override_v162ShowRoomResults(lost) {
    await v170ShowRoomResultsCoreV171(lost);
    v171RenderCanonicalWinner();
    v171StartRematchPoll();
  };

  const v170ClearRoomTimersCoreV171 = v162ClearRoomTimers;
  v162ClearRoomTimers = function v171Override_v162ClearRoomTimers() {
    v171StopRematchPoll();
    return v170ClearRoomTimersCoreV171();
  };

  /* ============================================================
     19) Start the App
     ============================================================ */
  showHome();
})();
