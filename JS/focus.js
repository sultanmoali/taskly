const MODES = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 };
let mode = "focus";
let left = MODES.focus;
let timer = null;
let endAt = 0;

const timeEl = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const tabs = document.querySelectorAll(".mode-tabs button");

function show() {
    const m = String(Math.floor(left / 60)).padStart(2, "0");
    const s = String(left % 60).padStart(2, "0");
    timeEl.textContent = m + ":" + s;
    document.title = m + ":" + s + " | Pomodoro";
}

function beep() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        osc.frequency.value = 880;
        osc.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
    } catch (e) {}
}

function tick() {
    left = Math.max(0, Math.round((endAt - Date.now()) / 1000));
    show();
    if (left === 0) {
        stop();
        beep();
    }
}

function start() {
    if (timer || left === 0) return;
    endAt = Date.now() + left * 1000; 
    timer = setInterval(tick, 250);
    startBtn.textContent = "Pause";
}

function stop() {
    clearInterval(timer);
    timer = null;
    startBtn.textContent = "Start";
}

function setMode(newMode) {
    mode = newMode;
    stop();
    left = MODES[mode];
    show();
    tabs.forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
}

startBtn.addEventListener("click", () => (timer ? stop() : start()));
resetBtn.addEventListener("click", () => setMode(mode));
tabs.forEach(b => b.addEventListener("click", () => setMode(b.dataset.mode)));

show();