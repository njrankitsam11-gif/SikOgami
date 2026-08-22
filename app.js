// SikOgami App — Levels, Scan, Garden, Zen
const LEVELS = [
  {
    id:1, world:"WORLD 1 • THE CALM SHORE", title:"PAPER BOAT", subtitle:"Float your first fold", emoji:"⛵", color:"#A8D5BA",
    diff:"BEGINNER • 2 min", unlocks:"Unlocks Pastel Pack", paperTip:"Use light blue or white. Any paper works, even newspaper floats!",
    steps:[
      {title:"Start with square", desc:"Place paper colored side up. Smooth it gently — this is your ocean.", emoji:"📄", visual:"Square paper, flat & calm"},
      {title:"Fold in half", desc:"Bring bottom to top. Crease firmly from center outwards.", emoji:"📄", visual:"Rectangle — crease at top"},
      {title:"Fold the corners", desc:"Fold top corners to center line. Like making a paper hat.", emoji:"🔺", visual:"Triangle with flaps below"},
      {title:"Tuck & shape", desc:"Fold flaps up, tuck corners, open and flatten. Gently pull — your boat appears!", emoji:"⛵", visual:"Boat — open the hull"},
    ]
  },
  {
    id:2, world:"WORLD 1 • THE CALM SHORE", title:"PAPER PLANE", subtitle:"The classic flyer", emoji:"✈️", color:"#FFE08A",
    diff:"BEGINNER • 3 min", unlocks:"Unlocks +50 XP", paperTip:"White or pale yellow flies best visually. Thin paper = longer flight!",
    steps:[
      {title:"Center crease", desc:"Fold in half lengthwise, unfold. Keep the center line visible.", emoji:"📄", visual:"Vertical center crease"},
      {title:"Nose fold", desc:"Fold top corners to center. Sharp nose = stable flight.", emoji:"〽️", visual:"Triangle nose"},
      {title:"Wings down", desc:"Fold top edges to center again. Feel the symmetry.", emoji:"✈️", visual:"Sleek jet shape"},
      {title:"Fold & fly", desc:"Fold in half outward, then create wings. Ready to launch!", emoji:"🛫", visual:"Plane — ready to soar"},
    ]
  },
  {
    id:3, world:"WORLD 1 • THE CALM SHORE", title:"TULIP", subtitle:"Bloom in your hands", emoji:"🌷", color:"#FFB3C1",
    diff:"BEGINNER • 4 min", unlocks:"Unlocks Garden Bloom", paperTip:"Pink, red or yellow makes it pop. Use green for stem (separate paper)!",
    steps:[
      {title:"Triangle base", desc:"Fold square diagonally both ways, then collapse into triangle.", emoji:"🔺", visual:"Triangle base"},
      {title:"Petal folds", desc:"Fold bottom corners up to top point. Crease softly.", emoji:"🌸", visual:"Diamond with petals"},
      {title:"Shape bloom", desc:"Tuck side corners behind. Gently open the bottom — blow to bloom!", emoji:"🌷", visual:"Tulip cup — inflate"},
      {title:"Add stem", desc:"Roll green paper for stem and leaf. Insert. Breathe in the bloom.", emoji:"🌷", visual:"Tulip with stem"},
    ]
  },
  {
    id:4, world:"WORLD 2 • THE QUIET FOREST", title:"BUTTERFLY", subtitle:"Wings of calm", emoji:"🦋", color:"#C9A8FF",
    diff:"EASY-MEDIUM • 6 min", unlocks:"Unlocks Washi Set 15% off", paperTip:"Vibrant duo-color paper looks stunning. Try orange + yellow!",
    steps:[
      {title:"Preliminary base", desc:"Fold into kite shape. This base holds the wings.", emoji:"🪁", visual:"Kite base"},
      {title:"Wing creases", desc:"Fold top layer corners to center, then unfold — these guide wing folds.", emoji:"🦋", visual:"Wing guidelines"},
      {title:"Squash wings", desc:"Lift and squash — wings puff out. Be gentle, let paper breathe.", emoji:"🫧", visual:"3D wings emerging"},
      {title:"Final shape", desc:"Fold in half, then shape wings with soft curves. Your butterfly is ready to rest on your finger.", emoji:"🦋", visual:"Butterfly — wings open"},
    ]
  },
  {
    id:5, world:"WORLD 2 • THE QUIET FOREST", title:"FOX FACE", subtitle:"Clever & cute", emoji:"🦊", color:"#FF9B6A",
    diff:"EASY-MEDIUM • 5 min", unlocks:"Unlocks Forest Sounds", paperTip:"Orange/brown paper is perfect. White tip? Use dual-color!",
    steps:[
      {title:"Triangle fold", desc:"Fold square diagonally, colored side out. Point faces down.", emoji:"🔺", visual:"Triangle point down"},
      {title:"Ears up", desc:"Fold side corners up diagonally — these become ears. Don't overlap.", emoji:"🦊", visual:"Two ears poking up"},
      {title:"Nose & chin", desc:"Fold top corner back, bottom up slightly. Hidden folds create depth.", emoji:"👃", visual:"Snout forming"},
      {title:"Eyes closed", desc:"Flip over. Draw or imagine calm closed eyes. Fox is sleeping peacefully.", emoji:"🦊", visual:"Fox face — zen fox"},
    ]
  },
  {
    id:6, world:"WORLD 2 • THE QUIET FOREST", title:"JUMPING FROG", subtitle:"It really jumps!", emoji:"🐸", color:"#7ED4C7",
    diff:"MEDIUM • 8 min", unlocks:"Unlocks Dragon Temple (World 3)", paperTip:"Green paper = real frog. Add googly eyes for extra sick vibes!",
    steps:[
      {title:"Frog base", desc:"Fold top into triangle, then petal folds. This spring base stores energy.", emoji:"🔷", visual:"Waterbomb base"},
      {title:"Leg folds", desc:"Fold corners to center for front legs, then fold up for back legs.", emoji:"🐸", visual:"Legs forming"},
      {title:"Spring fold", desc:"Fold in half, then fold back legs down. This is the jump mechanism.", emoji:"↕️", visual:"Z-fold spring"},
      {title:"Jump!", desc:"Press the back gently and release — it jumps! Test on your desk. Pure joy.", emoji:"🐸", visual:"Frog — press to jump"},
    ]
  },
];

let currentLevel = null;
let currentStep = 0;
let progress = JSON.parse(localStorage.getItem('sikogami_progress') || '[]'); // array of completed ids

function saveProgress() {
  localStorage.setItem('sikogami_progress', JSON.stringify(progress));
  updateProgressUI();
  renderGarden();
}

function isUnlocked(id) {
  if (id===1) return true;
  return progress.includes(id-1);
}
function isCompleted(id) { return progress.includes(id); }

function updateProgressUI() {
  const count = progress.length;
  document.getElementById('gardenCount').textContent = `${count}/6`;
  document.getElementById('progressText').textContent = count;
  document.getElementById('progressBar').style.width = (count/6*100)+'%';
}

function renderLevels() {
  const c = document.getElementById('levelsContainer');
  c.innerHTML = '';
  LEVELS.forEach((lvl, idx) => {
    const unlocked = isUnlocked(lvl.id);
    const completed = isCompleted(lvl.id);
    const side = idx % 2 === 0 ? 'lg:mr-auto lg:pr-12' : 'lg:ml-auto lg:pl-12 lg:text-right lg:items-end';
    const card = document.createElement('div');
    card.className = `level-card relative border-2 border-ink bg-white p-5 lg:w-[560px] ${side} ${unlocked ? 'cursor-pointer' : 'locked'} flex flex-col`;
    card.onclick = () => unlocked && openModal(lvl.id);
    // ribbon
    const status = completed ? `<span class="bg-[#22c55e] text-white px-2 py-1 text-[10px] font-mono">✓ COMPLETED</span>` : unlocked ? `<span class="bg-sick text-white px-2 py-1 text-[10px] font-mono">● UNLOCKED</span>` : `<span class="bg-ink text-paper px-2 py-1 text-[10px] font-mono">🔒 LOCKED</span>`;
    const btn = completed ? `<button class="border-2 border-ink px-4 py-2 font-mono text-xs tracking-widest bg-sage">VIEW AGAIN →</button>` : unlocked ? `<button class="bg-ink text-paper px-5 py-2.5 font-black text-xs tracking-widest hover:bg-sick transition">FOLD NOW →</button>` : `<button class="bg-ink/10 text-ink/40 px-5 py-2.5 font-mono text-xs">LOCKED</button>`;

    card.innerHTML = `
      <div class="absolute -top-3 -left-3 w-8 h-8 bg-ink text-paper flex items-center justify-center font-black text-sm rotate-3">${lvl.id}</div>
      <div class="flex items-start justify-between gap-4">
        <div class="flex gap-4 items-start ${idx%2===1 ? 'lg:flex-row-reverse' : ''}">
          <div class="w-[72px] h-[72px] shrink-0 border-2 border-ink flex items-center justify-center text-[36px] bg-cream" style="background:${lvl.color}20">${lvl.emoji}</div>
          <div class="${idx%2===1 ? 'lg:text-right' : ''}">
            <div class="text-[10px] font-mono tracking-[0.15em] text-ink/60">${lvl.world}</div>
            <div class="font-black text-[22px] leading-none tracking-tight">${lvl.title}</div>
            <div class="text-xs text-ink/60 mt-1">${lvl.subtitle} • ${lvl.diff}</div>
            <div class="mt-2 text-[11px] font-mono bg-sand inline-block px-2 py-1 border border-ink/10">${lvl.unlocks}</div>
          </div>
        </div>
        <div class="hidden md:block">${status}</div>
      </div>
      <div class="md:hidden mt-3">${status}</div>
      <div class="mt-4 flex items-center justify-between border-t-2 border-dashed border-ink/10 pt-3">
        <div class="text-[11px] font-mono text-ink/50">${completed ? 'You folded this beautifully ✨' : unlocked ? 'Tap to start folding' : `Complete Level ${lvl.id-1} to unlock`}</div>
        ${btn}
      </div>
    `;
    // dot on central line
    const dot = document.createElement('div');
    dot.className = 'hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-paper border-2 border-ink rounded-full';
    dot.style.zIndex = '1';
    if (completed) dot.style.background = '#22c55e';
    else if (unlocked) dot.style.background = '#FF3B30';
    const wrapper = document.createElement('div');
    wrapper.className = 'relative';
    wrapper.appendChild(card);
    wrapper.appendChild(dot);
    c.appendChild(wrapper);
  });
}

function renderGarden() {
  const grid = document.getElementById('gardenGrid');
  const empty = document.getElementById('emptyGarden');
  grid.innerHTML = '';
  if (progress.length===0) { empty.style.display='block'; grid.style.display='none'; return; }
  empty.style.display='none'; grid.style.display='grid';
  LEVELS.forEach(lvl => {
    const done = isCompleted(lvl.id);
    const div = document.createElement('div');
    div.className = `border-2 ${done ? 'border-paper bg-white/10' : 'border-dashed border-paper/20 bg-transparent'} p-4 flex flex-col items-center gap-2 text-center`;
    div.innerHTML = `
      <div class="w-16 h-16 ${done ? 'bg-white' : 'bg-paper/5'} border border-paper/20 flex items-center justify-center text-3xl ${done ? '' : 'grayscale opacity-30'}">${done ? lvl.emoji : '?'}</div>
      <div class="font-black text-xs tracking-widest">${lvl.title}</div>
      <div class="text-[10px] font-mono ${done ? 'text-sage' : 'text-paper/40'}">${done ? 'COLLECTED' : 'NOT YET'}</div>
    `;
    grid.appendChild(div);
  });
}

// Modal
function openModal(id) {
  currentLevel = LEVELS.find(l=>l.id===id);
  currentStep = 0;
  document.getElementById('foldModal').classList.remove('hidden');
  document.getElementById('modalLevelBadge').textContent = currentLevel.id;
  document.getElementById('modalTitle').textContent = currentLevel.title;
  document.getElementById('modalWorld').textContent = currentLevel.world;
  document.getElementById('paperTip').textContent = currentLevel.paperTip;
  document.getElementById('stepTotal').textContent = currentLevel.steps.length;
  document.getElementById('scanIdle').classList.remove('hidden');
  document.getElementById('scanChecking').classList.add('hidden');
  document.getElementById('scanPreview').classList.add('hidden');
  document.body.style.overflow='hidden';
  renderStep();
}
function closeModal() {
  document.getElementById('foldModal').classList.add('hidden');
  document.body.style.overflow='';
}
function renderStep() {
  const step = currentLevel.steps[currentStep];
  document.getElementById('stepNum').textContent = currentStep+1;
  document.getElementById('stepEmoji').textContent = step.emoji;
  document.getElementById('stepEmoji').style.transform = `rotate(${currentStep*3}deg)`;
  document.getElementById('stepVisual').textContent = step.visual;
  document.getElementById('stepTitle').textContent = step.title;
  document.getElementById('stepDesc').textContent = step.desc;
  document.getElementById('prevBtn').style.visibility = currentStep===0 ? 'hidden' : 'visible';
  document.getElementById('nextBtn').textContent = currentStep===currentLevel.steps.length-1 ? 'READY TO SCAN ↓' : 'NEXT →';
  // dots
  const dots = document.getElementById('stepDots');
  dots.innerHTML = '';
  currentLevel.steps.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = `w-8 h-1.5 ${i===currentStep ? 'bg-ink' : i<currentStep ? 'bg-sage' : 'bg-ink/10'}`;
    dots.appendChild(d);
  });
}
function nextStep() {
  if (currentStep < currentLevel.steps.length-1) { currentStep++; renderStep(); }
  else {
    // scroll to scan section on mobile
    document.querySelector('#foldModal .grid').scrollIntoView({behavior:'smooth'});
    toast('Now fold it IRL and scan! 📸');
  }
}
function prevStep() { if (currentStep>0){ currentStep--; renderStep(); } }

// Scan handling — REAL AI via /api/verify
let lastScanBase64 = null;
let lastPreviewUrl = null;

function handleScan(e) {
  const file = e.target.files[0];
  if (!file) return;
  const previewUrl = URL.createObjectURL(file);
  const reader = new FileReader();
  reader.onload = () => {
    lastScanBase64 = reader.result; // data:image/...
    lastPreviewUrl = previewUrl;
    startRealScan(reader.result, previewUrl);
  };
  reader.readAsDataURL(file);
}

async function startRealScan(base64, previewUrl) {
  document.getElementById('scanIdle').classList.add('hidden');
  document.getElementById('scanChecking').classList.remove('hidden');
  document.getElementById('scanPreview').classList.remove('hidden');
  document.getElementById('previewImg').src = previewUrl;
  // show checking, hide result until API returns
  document.getElementById('scanResult').classList.add('hidden');

  try {
    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64, levelId: currentLevel.id, levelTitle: currentLevel.title })
    });
    const data = await res.json();
    document.getElementById('scanChecking').classList.add('hidden');
    showScanResultAI(data);
  } catch (err) {
    console.error(err);
    document.getElementById('scanChecking').classList.add('hidden');
    // fallback pass so user not blocked
    showScanResultAI({ pass: true, score: 88, feedback: "AI hiccup — but your fold looks wonderful! Zen pass granted ✨", mode: 'offline-fallback' });
  }
}

// keep old mock but now it also hits API with a sample (so you can test without paper)
async function mockScanSuccess() {
  const sample = 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80';
  // fetch image to base64, then verify, fallback to direct pass if fetch fails
  try {
    document.getElementById('scanIdle').classList.add('hidden');
    document.getElementById('scanChecking').classList.remove('hidden');
    document.getElementById('scanPreview').classList.remove('hidden');
    document.getElementById('previewImg').src = sample;
    // try to convert sample to base64 via canvas trick? simpler: just call API with mock flag
    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: sample, levelId: currentLevel.id, levelTitle: currentLevel.title })
    });
    // sample URL is not base64; API will fallback to mock mode
    const data = await res.json().catch(()=> ({pass:true, score:93, feedback:"Mock demo — beautiful fold! (add GEMINI_API_KEY for real AI)", mode:'mock'}));
    document.getElementById('scanChecking').classList.add('hidden');
    showScanResultAI(data);
  } catch {
    document.getElementById('scanChecking').classList.add('hidden');
    showScanResultAI({ pass: true, score: 94, feedback: "Demo mode — Mock pass! Your paper would ace this. ✨", mode: 'mock' });
  }
}

function showScanResultAI(data) {
  const el = document.getElementById('scanResult');
  el.classList.remove('hidden');
  const pass = data.pass;
  const score = data.score ?? (pass ? 92 : 54);
  const feedback = data.feedback || '';
  const modeBadge = data.mode === 'gemini' ? '✦ GEMINI AI' : data.mode === 'mock' ? '◈ MOCK MODE' : '◈ ' + (data.mode||'AI').toUpperCase();

  if (pass) {
    const already = isCompleted(currentLevel.id);
    el.innerHTML = `
      <div class="bg-[#22c55e] text-white p-4 border-2 border-ink">
        <div class="flex justify-between items-center">
          <div class="font-black flex items-center gap-2">✓ ${score}% MATCH</div>
          <span class="text-[10px] font-mono bg-white text-ink px-1.5 py-0.5">${modeBadge}</span>
        </div>
        <div class="text-sm mt-2 leading-tight">${feedback}</div>
        <div class="text-[11px] font-mono mt-2 bg-white/20 px-2 py-1">Expected: ${data.expected || currentLevel.title}</div>
        <button onclick="completeLevel()" class="mt-3 w-full bg-white text-ink py-2.5 font-black text-xs tracking-widest border-2 border-ink">${already ? 'AWESOME →' : 'CLAIM LEVEL UP →'}</button>
      </div>
    `;
    if (!already) confetti();
  } else {
    el.innerHTML = `
      <div class="bg-sick text-white p-4 border-2 border-ink">
        <div class="flex justify-between items-center">
          <div class="font-black">${score}% MATCH — KEEP GOING</div>
          <span class="text-[10px] font-mono bg-white text-sick px-1.5 py-0.5">${modeBadge}</span>
        </div>
        <div class="text-sm mt-2 leading-tight">${feedback}</div>
        <div class="flex gap-2 mt-3">
          <button onclick="resetScan()" class="flex-1 bg-white text-ink py-2 font-mono text-xs border-2 border-ink">RETRY SCAN</button>
          <button onclick="showScanResultAI({pass:true, score:75, feedback:'Zen override — effort is enough. Claiming level for you 💚', mode:'zen-override'})" class="flex-1 bg-ink text-white py-2 font-mono text-xs">PASS ANYWAY →</button>
        </div>
      </div>
    `;
  }
}
function showScanResult(pass){ // backwards compat shim
  showScanResultAI({pass, score: pass?92:54, feedback: pass?"Amazing fold!":"Try sharper creases", mode:'legacy'});
}
function resetScan() {
  document.getElementById('scanPreview').classList.add('hidden');
  document.getElementById('scanResult').classList.add('hidden');
  document.getElementById('scanIdle').classList.remove('hidden');
}
function completeLevel() {
  if (!progress.includes(currentLevel.id)) {
    progress.push(currentLevel.id);
    progress.sort((a,b)=>a-b);
    saveProgress();
    renderLevels();
  }
  closeModal();
  toast(`Level ${currentLevel.id} completed! ${currentLevel.id<6 ? 'Level '+(currentLevel.id+1)+' unlocked 🔓' : 'You are a master! 🏆'}`);
  if (currentLevel.id < 6) {
    setTimeout(()=> {
      const next = document.getElementById('levels');
      next.scrollIntoView({behavior:'smooth'});
    }, 600);
  } else {
    scrollToGarden();
  }
}
function confetti() {
  for(let i=0;i<18;i++){
    const d=document.createElement('div');
    d.textContent=['🎉','✨','📄','⛵','🦋'][Math.floor(Math.random()*5)];
    d.style.position='fixed'; d.style.left=Math.random()*100+'vw'; d.style.top='-20px';
    d.style.fontSize='20px'; d.style.zIndex='200'; d.style.pointerEvents='none';
    d.style.animation=`fall ${1+Math.random()}s linear forwards`;
    document.body.appendChild(d);
    setTimeout(()=>d.remove(),2000);
  }
  const style=document.createElement('style');
  style.textContent="@keyframes fall{to{transform:translateY(100vh) rotate(720deg);}}";
  document.head.appendChild(style);
}

// Utils
function toast(msg) {
  const t=document.getElementById('toast');
  t.textContent=msg; t.style.transform='translate(-50%, 0)';
  setTimeout(()=> t.style.transform='translate(-50%, 150%)', 3000);
}
function scrollToLevels(){ document.getElementById('levels').scrollIntoView({behavior:'smooth'}); }
function scrollToGarden(){ document.getElementById('garden').scrollIntoView({behavior:'smooth'}); }

// Zen
let zenInterval=null; let breathIn=true;
function toggleZen(){
  const z=document.getElementById('zenOverlay');
  const isHidden=z.classList.contains('hidden');
  if(isHidden){
    z.classList.remove('hidden');
    document.body.style.overflow='hidden';
    document.getElementById('zenBtn').textContent='● ZEN MODE';
    startBreathing();
  } else {
    z.classList.add('hidden');
    document.body.style.overflow='';
    document.getElementById('zenBtn').textContent='○ ZEN MODE';
    stopBreathing();
  }
}
function startBreathing(){
  const el=document.getElementById('breathingPaper');
  const txt=document.getElementById('breathText');
  el.classList.add('breathing');
  zenInterval=setInterval(()=>{
    breathIn=!breathIn;
    txt.textContent= breathIn ? 'INHALE • 4s' : 'EXHALE • 6s';
    el.textContent= breathIn ? '📄' : '🦢';
  },4000);
}
function stopBreathing(){
  clearInterval(zenInterval);
  document.getElementById('breathingPaper').classList.remove('breathing');
}

// Drag & drop for scan
document.addEventListener('DOMContentLoaded', ()=>{
  updateProgressUI(); renderLevels(); renderGarden();
  // hero origami wiggle
  setInterval(()=>{
    const h=document.getElementById('heroOrigami');
    if(h) h.style.transform=`rotate(${Math.sin(Date.now()/800)*3}deg)`;
  },50);
  // drag drop
  setTimeout(()=>{
    const dropZone = document.querySelector('#scanIdle > div');
    if(!dropZone) return;
    dropZone.addEventListener('dragover', e=>{ e.preventDefault(); dropZone.style.borderColor='#FF3B30'; });
    dropZone.addEventListener('dragleave', ()=> dropZone.style.borderColor='');
    dropZone.addEventListener('drop', e=>{
      e.preventDefault();
      const file=e.dataTransfer.files[0];
      if(file){
        const previewUrl = URL.createObjectURL(file);
        const reader = new FileReader();
        reader.onload = () => startRealScan(reader.result, previewUrl);
        reader.readAsDataURL(file);
      }
    });
  },500);
});

// Keyboard
document.addEventListener('keydown', e=>{
  if(e.key==='Escape') { closeModal(); const z=document.getElementById('zenOverlay'); if(!z.classList.contains('hidden')) toggleZen(); }
});
