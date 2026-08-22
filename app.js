// SikOgami — 30 Levels • Single → Multi Paper • Zen
const LEVELS = [
  // WORLD 1: THE CALM SHORE — Single Sheet Beginner (1-6)
  {
    id:1, world:"WORLD 1 • THE CALM SHORE", title:"PAPER BOAT", subtitle:"Your first sail — single sheet masterclass", emoji:"⛵", color:"#A8D5BA",
    sheets:1, diff:"BEGINNER • 6 min • 1 PAPER", unlocks:"Unlocks Paper Cup", paperTip:"ONE paper only! 15×15cm Kami — light blue side up. Even a square from A4 works. No extra sheets needed.",
    steps:[
      {title:"Choose & Place", desc:"Take ONE square sheet (15×15cm). Place colored side UP on a flat table. Smooth with palm — breathe. This is your sea.", emoji:"📄", visual:"Single square, color up, flat"},
      {title:"Horizon Fold", desc:"Bottom edge to top edge, perfectly aligned. Crease firmly from center outward with nail. You now have a rectangle.", emoji:"—", visual:"Rectangle, crease on top"},
      {title:"Find the Center", desc:"Fold left to right, pinch center, unfold. This faint vertical line is your guide — don't crease hard.", emoji:"✚", visual:"Rectangle with light center crease"},
      {title:"Make the Triangle", desc:"Fold top-right corner down to center line, then top-left corner down. Edges must meet at center, like a house roof.", emoji:"🔺", visual:"Triangle on top of rectangle"},
      {title:"Fold the Hat Flaps", desc:"Front bottom flap folds UP over triangle. Flip over, back flap UP. You have a hat!", emoji:"👒", visual:"Paper hat with triangle top"},
      {title:"Tuck the Ears", desc:"Wrap left & right corners of flaps around behind triangle. Crease sharply. This locks the shape.", emoji:"📎", visual:"Corners tucked, neat triangle"},
      {title:"Open the Diamond", desc:"Insert thumbs inside, open gently, squash flat the other way — hat becomes a diamond. Align edges.", emoji:"♦️", visual:"Diamond / square, open pocket"},
      {title:"Pull the Boat", desc:"Hold top points of diamond, pull outward slowly. The center splits, hull forms. Crease bottom, shape sides. Your boat floats!", emoji:"⛵", visual:"Boat — hull open, points up"},
    ]
  },
  {
    id:2, world:"WORLD 1 • THE CALM SHORE", title:"PAPER CUP", subtitle:"Fold to drink — one paper, instant use", emoji:"🥤", color:"#FFE08A",
    sheets:1, diff:"BEGINNER • 5 min • 1 PAPER", unlocks:"Unlocks Tulip", paperTip:"ONE sheet! Thicker paper holds water longer. Use white or cream for zen look.",
    steps:[
      {title:"Triangle Fold", desc:"Square color up, fold diagonal bottom-right to top-left. Sharp crease, triangle point up.", emoji:"🔺", visual:"Large triangle, color out"},
      {title:"Right Wing", desc:"Take bottom-right corner, fold to left edge middle. Forms a small triangle wing.", emoji:"↗️", visual:"Wing folded to center line"},
      {title:"Left Wing", desc:"Bottom-left corner to right edge middle, overlapping. Tuck tip under to lock.", emoji:"↖️", visual:"Two wings overlapping, cup shape"},
      {title:"Fold the Rim", desc:"Top flaps fold down — front one down, back one down. Crease rim flat.", emoji:"🥤", visual:"Cup rim folded, pocket open"},
      {title:"Open & Test", desc:"Open from top, pinch bottom to form base. Pour water — it holds! One paper magic.", emoji:"💧", visual:"Open cup, holds shape"},
    ]
  },
  {
    id:3, world:"WORLD 1 • THE CALM SHORE", title:"TULIP BLOOM", subtitle:"Single bloom, single sheet", emoji:"🌷", color:"#FFB3C1",
    sheets:1, diff:"BEGINNER • 7 min • 1 PAPER", unlocks:"Unlocks Whale", paperTip:"ONE pink/red sheet for bloom. Extra green sheet later for stem (Level 13). Now just the bloom!",
    steps:[
      {title:"Waterbomb Base", desc:"Fold both diagonals, unfold. Fold in half, then collapse into small triangle (waterbomb).", emoji:"🔺", visual:"Small layered triangle"},
      {title:"Petals Up", desc:"Front: bottom corners up to top point. Back same. Now diamond shape with flaps.", emoji:"🌸", visual:"Diamond with two flaps front/back"},
      {title:"Tuck & Shape", desc:"Side corners tuck behind, crease vertical edges. Bottom has small hole.", emoji:"🫧", visual:"Tucked sides, neat bloom"},
      {title:"Bloom!", desc:"Blow gently into hole, cup shape inflates. Curl petals with pencil tip. One-paper tulip!", emoji:"🌷", visual:"Inflated tulip, petals curled"},
    ]
  },
  {
    id:4, world:"WORLD 1 • THE CALM SHORE", title:"GENTLE WHALE", subtitle:"Ocean friend — one soft fold", emoji:"🐋", color:"#7DD3C8",
    sheets:1, diff:"BEGINNER • 5 min • 1 PAPER", unlocks:"Unlocks Dog", paperTip:"ONE blue/grey sheet. Light blue captures ocean calm.",
    steps:[
      {title:"Kite Start", desc:"Square color up, fold diagonal, unfold. Fold two edges to center line — kite shape.", emoji:"🪁", visual:"Kite with point down"},
      {title:"Tail Pinch", desc:"Top point fold down slightly, then squash fold tail fins to sides.", emoji:"🐋", visual:"Tail forming, point tucked"},
      {title:"Body Curve", desc:"Fold in half lengthwise (mountain), then shape back with soft valley — no hard crease.", emoji:"〰️", visual:"Whale body curved"},
      {title:"Fin Pop", desc:"Small reverse fold for pectoral fin. Blow eye dot with pen. One-paper whale swims!", emoji:"🐋", visual:"Whale with fin, gentle shape"},
    ]
  },
  {
    id:5, world:"WORLD 1 • THE CALM SHORE", title:"DOG FACE", subtitle:"Loyal folds, one sheet", emoji:"🐶", color:"#D2B48C",
    sheets:1, diff:"BEGINNER • 4 min • 1 PAPER", unlocks:"Unlocks Heart", paperTip:"ONE white/brown sheet. Draw nose after — marker needed, not extra paper.",
    steps:[
      {title:"Triangle Down", desc:"Square color up, fold diagonal, point down. Triangle flat.", emoji:"🔻", visual:"Triangle point down"},
      {title:"Ears Flop", desc:"Left & right corners fold down diagonally — ears flop. Angle decides breed!", emoji:"🐶", visual:"Two ears hanging"},
      {title:"Muzzle", desc:"Top corner folds back behind, bottom tip folds up for chin. Hidden depth.", emoji:"👃", visual:"Muzzle with chin"},
      {title:"Face", desc:"Flip, draw soft eyes + nose with pen. One sheet, instant companion.", emoji:"🐶", visual:"Dog face, friendly"},
    ]
  },
  {
    id:6, world:"WORLD 1 • THE CALM SHORE", title:"HEART", subtitle:"Give it — one sheet love", emoji:"❤️", color:"#FF6B6B",
    sheets:1, diff:"BEGINNER • 6 min • 1 PAPER", unlocks:"Unlocks Forest World", paperTip:"ONE red/pink sheet. Thinner paper = softer heart curve.",
    steps:[
      {title:"Middle Crease", desc:"Square, fold in half, unfold vertical. Guide line saved.", emoji:"—", visual:"Vertical crease"},
      {title:"Top Points", desc:"Fold top corners down to center — heart top lobes forming.", emoji:"💗", visual:"Top lobes, flat top"},
      {title:"Side Tucks", desc:"Side edges fold to center, bottom point folds up behind. Round with fingers.", emoji:"❤️", visual:"Heart point tuck"},
      {title:"Soften", desc:"Small folds on top back to round lobes. Flip — perfect heart from one paper.", emoji:"❤️", visual:"Soft rounded heart"},
    ]
  },
  // WORLD 2: THE QUIET FOREST — Single Sheet Easy-Medium (7-12)
  {
    id:7, world:"WORLD 2 • THE QUIET FOREST", title:"BUTTERFLY", subtitle:"Wings spread — still one sheet", emoji:"🦋", color:"#C9A8FF",
    sheets:1, diff:"EASY • 7 min • 1 PAPER", unlocks:"Unlocks Fox", paperTip:"ONE vibrant duo-color sheet. Orange+Yellow pops beautifully.",
    steps:[
      {title:"Square to Kite", desc:"Fold kite base, then unfold side flaps — guideline creases set.", emoji:"🪁", visual:"Kite with guide creases"},
      {title:"Squash Wings", desc:"Lift top layers, squash flat — wings puff. Gentle, let paper breathe.", emoji:"🦋", visual:"Wings squashed, raised"},
      {title:"Body Fold", desc:"Fold in half mountain-wise, then shape wings with soft curves.", emoji:"✨", visual:"Half fold, wings angled"},
      {title:"Rest", desc:"Balance on fingertip — one-paper butterfly ready to land.", emoji:"🦋", visual:"Butterfly poised"},
    ]
  },
  {
    id:8, world:"WORLD 2 • THE QUIET FOREST", title:"FOX FACE", subtitle:"Sly & calm — one sheet", emoji:"🦊", color:"#FF9B6A",
    sheets:1, diff:"EASY • 5 min • 1 PAPER", unlocks:"Unlocks Frog", paperTip:"ONE orange + white sheet (dual color ideal).",
    steps:[
      {title:"Point Down", desc:"Triangle point down, color out.", emoji:"🔻", visual:"Triangle down"},
      {title:"Ears Up", desc:"Side corners up to top edge — sharp ears.", emoji:"🦊", visual:"Two pointed ears"},
      {title:"Nose", desc:"Top folds back, bottom up small — snout depth.", emoji:"👃", visual:"Snout crease"},
      {title:"Eyes", desc:"Flip, add closed zen eyes. One-sheet fox sleeps.", emoji:"🦊", visual:"Fox zen face"},
    ]
  },
  {
    id:9, world:"WORLD 2 • THE QUIET FOREST", title:"JUMPING FROG", subtitle:"It really jumps — one sheet spring", emoji:"🐸", color:"#7ED4C7",
    sheets:1, diff:"MEDIUM • 8 min • 1 PAPER", unlocks:"Unlocks Crane", paperTip:"ONE green sheet. Add eyes with pen after.",
    steps:[
      {title:"Waterbomb Base", desc:"Top half into waterbomb triangle, petal folds lock.", emoji:"🔷", visual:"Waterbomb top"},
      {title:"Leg Sets", desc:"Corners to center for front legs, then fold down for back legs.", emoji:"🐸", visual:"Four legs outlined"},
      {title:"Z-Spring", desc:"Fold body in half, then back legs down — Z-fold stores jump energy.", emoji:"↕️", visual:"Z spring fold"},
      {title:"Jump Test", desc:"Press back lightly, release — jumps! One paper physics.", emoji:"🐸", visual:"Frog leaps"},
    ]
  },
  {
    id:10, world:"WORLD 2 • THE QUIET FOREST", title:"CRANE", subtitle:"The sacred bird — one sheet legacy", emoji:"🕊️", color:"#F0E6D3",
    sheets:1, diff:"MEDIUM • 12 min • 1 PAPER", unlocks:"Unlocks 2-Paper World", paperTip:"ONE 15cm Kami. White or light pink is classic. Must be single sheet, no cuts!",
    steps:[
      {title:"Preliminary Base", desc:"Inside reverse folds to bird base — 4 flaps. Most important base, crease precisely.", emoji:"📄", visual:"Bird base, 4 flaps"},
      {title:"Narrow the Bird", desc:"Petal folds on both sides — shape narrows to diamond with long points.", emoji:"🕊️", visual:"Narrow diamond, long beak"},
      {title:"Wings & Tail", desc:"Inside reverse folds for head+tail, fold wings down horizontally.", emoji:"🪽", visual:"Head bent, wings spread"},
      {title:"Breathe & Pull", desc:"Hold tail, pull neck — wings flap! First crane from one paper, tradition lives.", emoji:"🕊️", visual:"Crane with spread wings"},
    ]
  },
  {
    id:11, world:"WORLD 2 • THE QUIET FOREST", title:"FISH", subtitle:"Swift swim — one sheet", emoji:"🐟", color:"#60A5FA",
    sheets:1, diff:"EASY • 5 min • 1 PAPER", unlocks:"Unlocks Penguin", paperTip:"ONE orange or silver sheet. One sheet glides like water.",
    steps:[
      {title:"Diagonal Set", desc:"Fold diagonal both ways, then kite folds to center.", emoji:"🐟", visual:"Kite + diagonals"},
      {title:"Tail Scissor", desc:"Cut? No! Just inside reverse for tail fins — still one sheet, no scissors.", emoji:"✂️", visual:"Tail fins split"},
      {title:"Body", desc:"Fold in half, squash head to shape mouth. Eye dot.", emoji:"🐟", visual:"Fish body side view"},
      {title:"Swim", desc:"Balance on edge — one-paper fish darts.", emoji:"🐟", visual:"Fish poised"},
    ]
  },
  {
    id:12, world:"WORLD 2 • THE QUIET FOREST", title:"PENGUIN", subtitle:"Waddle — one sheet tuxedo", emoji:"🐧", color:"#1A1A1A",
    sheets:1, diff:"MEDIUM • 7 min • 1 PAPER", unlocks:"Unlocks Bloom River", paperTip:"ONE black+white dual sheet or color black, keep belly white by folding.",
    steps:[
      {title:"Fish Base", desc:"Start from fish base, narrow to penguin silhouette.", emoji:"🐧", visual:"Fish base narrowed"},
      {title:"Beak & Feet", desc:"Reverse folds — beak point front, feet tiny tucks below.", emoji:"👣", visual:"Beak forward, feet"},
      {title:"Wings", desc:"Fold sides slightly back — wings hug body.", emoji:"🐧", visual:"Wings folded"},
      {title:"Waddle", desc:"Stand upright, tap — waddles. One sheet tuxedo.", emoji:"🐧", visual:"Penguin standing"},
    ]
  },
  // WORLD 3: THE BLOOM RIVER — 2 Sheets (13-18)
  {
    id:13, world:"WORLD 3 • THE BLOOM RIVER", title:"TULIP WITH STEM", subtitle:"Now 2 papers bloom", emoji:"🌷", color:"#FB7185",
    sheets:2, diff:"EASY • 10 min • 2 PAPERS", unlocks:"Unlocks Boat with Sail", paperTip:"2 PAPERS: Pink 15cm for bloom (Level 3 skill) + Green 15cm for stem/leaf. Two become one garden!",
    steps:[
      {title:"Bloom Again", desc:"Fold tulip bloom from pink (you know this — 4 steps). Set aside.", emoji:"🌷", visual:"Pink tulip ready"},
      {title:"Stem Roll", desc:"Green sheet diagonal roll to stem, triangle leaf fold, insert into bloom base.", emoji:"🌿", visual:"Green stem + leaf"},
      {title:"Combine", desc:"Insert stem tip into hole under bloom, twist gently. Two papers unite.", emoji:"🌷", visual:"Joined tulip+stem, stands"},
      {title:"Arrange", desc:"Curl leaf, angle bloom. First 2-paper craft! Photo both parts.", emoji:"✨", visual:"Full tulip with stem"},
    ]
  },
  {
    id:14, world:"WORLD 3 • THE BLOOM RIVER", title:"BOAT WITH SAIL", subtitle:"Harbor — 2 papers", emoji:"⛵", color:"#38BDF8",
    sheets:2, diff:"EASY • 9 min • 2 PAPERS", unlocks:"Unlocks Butterfly Garden", paperTip:"2 PAPERS: Blue for boat (Level 1) + White for sail. Classic harbor.",
    steps:[
      {title:"Boat Base", desc:"Fold boat from blue using 8-step method — your mastered boat.", emoji:"⛵", visual:"Blue boat ready"},
      {title:"Sail Triangle", desc:"White sheet: fold diagonal, then fold edge to make right-triangle sail with mast fold.", emoji:"⛵", visual:"Triangular sail"},
      {title:"Mast", desc:"Small tube roll from sail leftover, insert vertically into boat center crease.", emoji:"📎", visual:"Mast standing"},
      {title:"Harbor", desc:"Attach sail to mast, angle wind. Two-paper fleet sails.", emoji:"🌊", visual:"Boat + sail combined"},
    ]
  },
  {
    id:15, world:"WORLD 3 • THE BLOOM RIVER", title:"BUTTERFLY GARDEN", subtitle:"Pair dance — 2 papers", emoji:"🦋", color:"#C084FC",
    sheets:2, diff:"MEDIUM • 12 min • 2 PAPERS", unlocks:"Unlocks Fox Family", paperTip:"2 PAPERS: Two different colors for pair — orange + purple. Two butterflies, one garden.",
    steps:[
      {title:"Butterfly ×2", desc:"Fold two butterflies from Level 7, each different color. Mirror wings.", emoji:"🦋", visual:"Two butterflies separate"},
      {title:"Garden Base", desc:"Third? No! Use same two — arrange circling. No extra base, just composition.", emoji:"🌸", visual:"Two in flight pattern"},
      {title:"Pose", desc:"Bend wings opposite, one higher. They chase each other.", emoji:"💞", visual:"Paired dance"},
      {title:"Garden", desc:"Photo both together circling. Two papers, one moment.", emoji:"🦋", visual:"Garden pair"},
    ]
  },
  {
    id:16, world:"WORLD 3 • THE BLOOM RIVER", title:"FOX FAMILY", subtitle:"Parent + kit — 2 papers", emoji:"🦊", color:"#FB923C",
    sheets:2, diff:"EASY • 8 min • 2 PAPERS", unlocks:"Unlocks Frog Pond", paperTip:"2 PAPERS: Large orange 15cm for parent + Small 7.5cm for kit. Scale tells story.",
    steps:[
      {title:"Parent", desc:"Large fox from orange 15cm — full size, ears tall.", emoji:"🦊", visual:"Large fox face"},
      {title:"Kit", desc:"Small fox from 7.5cm — tiny, same folds, cuter ears.", emoji:"🦊", visual:"Small fox face"},
      {title:"Together", desc:"Place kit slightly in front of parent, angle together.", emoji:"👨‍👧", visual:"Two foxes aligned"},
      {title:"Story", desc:"Photo — family portrait. Two papers, one family.", emoji:"🏠", visual:"Family foxes"},
    ]
  },
  {
    id:17, world:"WORLD 3 • THE BLOOM RIVER", title:"FROG POND", subtitle:"Croak croak — 2 papers", emoji:"🐸", color:"#4ADE80",
    sheets:2, diff:"MEDIUM • 12 min • 2 PAPERS", unlocks:"Unlocks Crane Couple", paperTip:"2 PAPERS: Dark green + Light green frogs. Two jumpers race!",
    steps:[
      {title:"Frog ×2", desc:"Two jumping frogs, different greens. Spring folds crisp.", emoji:"🐸", visual:"Two frogs"},
      {title:"Lily Pad", desc:"Optional — but still 2 papers! Use frog leftover? No, keep 2 papers, pond is table.", emoji:"🍃", visual:"Pond = table"},
      {title:"Race", desc:"Position side by side, press rears, release — who jumps farther?", emoji:"🏁", visual:"Two frogs mid-jump"},
      {title:"Pond", desc:"Photo both. Two papers, pond chorus.", emoji:"🐸", visual:"Pond pair"},
    ]
  },
  {
    id:18, world:"WORLD 3 • THE BLOOM RIVER", title:"CRANE COUPLE", subtitle:"Love pair — 2 papers", emoji:"🕊️", color:"#FDE68A",
    sheets:2, diff:"MEDIUM • 15 min • 2 PAPERS", unlocks:"Unlocks Shadow Temple", paperTip:"2 PAPERS: Red + White cranes. Tradition: pair brings harmony.",
    steps:[
      {title:"Crane ×2", desc:"Two cranes from Level 10, mirrored neck bends.", emoji:"🕊️", visual:"Two cranes"},
      {title:"Hearts Between", desc:"Arrange beaks facing, wings touching — heart silhouette negative space.", emoji:"💕", visual:"Beaks forming heart"},
      {title:"Base", desc:"Place on single plate as shared pond — still 2 papers, one display.", emoji:"🍽️", visual:"Pair on plate"},
      {title:"Vow", desc:"Photo pair. Two papers, one promise.", emoji:"🕊️", visual:"Couple crane pose"},
    ]
  },
  // WORLD 4: THE SHADOW TEMPLE — Modular / Multi (19-24)
  {
    id:19, world:"WORLD 4 • THE SHADOW TEMPLE", title:"MODULAR CUBE", subtitle:"6 papers, one cube", emoji:"🧊", color:"#64748B",
    sheets:6, diff:"HARD • 20 min • 6 PAPERS", unlocks:"Unlocks Ninja Star", paperTip:"6 PAPERS: Same color or rainbow — 6 sheets for 6 faces. Modular magic begins.",
    steps:[
      {title:"Unit Fold ×6", desc:"Each sheet: squash to sonobe unit — 3 valley, tuck pocket. Repeat 6× identical.", emoji:"📦", visual:"Sonobe unit, pocket+flap"},
      {title:"Assemble Bottom", desc:"Interlock 4 units into ring — flaps into pockets, no glue.", emoji:"🔗", visual:"Ring of 4 linked"},
      {title:"Cap Top & Bottom", desc:"Add last 2 units as caps — weave flaps, cube locks.", emoji:"🧊", visual:"Closed cube"},
      {title:"Test", desc:"Toss gently — holds! First modular from 6 papers.", emoji:"✨", visual:"Cube in hand"},
    ]
  },
  {
    id:20, world:"WORLD 4 • THE SHADOW TEMPLE", title:"NINJA STAR", subtitle:"2 papers, sharp", emoji:"⭐", color:"#EF4444",
    sheets:2, diff:"MEDIUM • 10 min • 2 PAPERS", unlocks:"Unlocks Kusudama", paperTip:"2 PAPERS: Contrasting — black+red is sick. Two become one star.",
    steps:[
      {title:"Blades ×2", desc:"Each sheet: fold to parallelogram blade with pockets.", emoji:"⭐", visual:"Two blades"},
      {title:"Interlock", desc:"Slide together crosswise, tuck points into pockets, rotate lock.", emoji:"🔩", visual:"Cross interlock"},
      {title:"Points", desc:"Fold tips to sharpen, crease stars.", emoji:"⭐", visual:"8-point star sharp"},
      {title:"Throw", desc:"Spin between fingers — flies straight. 2-paper shuriken!", emoji:"🥷", visual:"Star spinning"},
    ]
  },
  {
    id:21, world:"WORLD 4 • THE SHADOW TEMPLE", title:"5-PETAL STAR", subtitle:"5 papers converge", emoji:"🌟", color:"#FACC15",
    sheets:5, diff:"HARD • 18 min • 5 PAPERS", unlocks:"Unlocks Samurai", paperTip:"5 PAPERS: Gold + white mix luxury. 5 points, 5 papers.",
    steps:[
      {title:"Point Unit ×5", desc:"Each sheet folded to isosceles point with locking tabs.", emoji:"🔺", visual:"Point unit"},
      {title:"Ring", desc:"Link 5 points tip-to-pocket into star ring.", emoji:"⭐", visual:"Ring of 5"},
      {title:"Center Lock", desc:"Weave inner flaps inward, star locks flat.", emoji:"🔒", visual:"Star flat, locked"},
      {title:"Shine", desc:"Display on wall — 5-paper constellation.", emoji:"🌟", visual:"Star displayed"},
    ]
  },
  {
    id:22, world:"WORLD 4 • THE SHADOW TEMPLE", title:"KUSUDAMA FLOWER", subtitle:"5 blooms → ball", emoji:"🌸", color:"#F9A8D4",
    sheets:5, diff:"HARD • 25 min • 5 PAPERS", unlocks:"Unlocks Boat Fleet", paperTip:"5 PAPERS: Pink gradation. Each flower 1 paper, glue dot connects center (optional).",
    steps:[
      {title:"Flower ×5", desc:"Each sheet: 5-petal flower (blintz folds + squash). Repeat 5×.", emoji:"🌸", visual:"Single 5-petal"},
      {title:"Glue Center", desc:"Dot glue or tuck to join flower centers — still paper-only.", emoji:"📎", visual:"Flowers clustered"},
      {title:"Ball Form", desc:"Join 5 flowers into cup, then close into ball — petals outward.", emoji:"🌺", visual:"Ball of flowers"},
      {title:"Hang", desc:"Thread through center, kusudama sways. 5-paper bouquet.", emoji:"🎐", visual:"Hanging ball"},
    ]
  },
  {
    id:23, world:"WORLD 4 • THE SHADOW TEMPLE", title:"SAMURAI HELMET", subtitle:"Helmet + sword — 2 papers", emoji:"⛩️", color:"#991B1B",
    sheets:2, diff:"MEDIUM • 12 min • 2 PAPERS", unlocks:"Unlocks Fleet", paperTip:"2 PAPERS: Grey for helmet + White for sword. Bushido set.",
    steps:[
      {title:"Helmet", desc:"Large sheet: samurai kabuto — crown, visor, side flaps (classic).", emoji:"⛩️", visual:"Kabuto helmet"},
      {title:"Sword", desc:"Small sheet: roll+fold katana with guard and hilt.", emoji:"⚔️", visual:"Paper sword"},
      {title:"Wield", desc:"Place sword beside helmet or tuck through side.", emoji:"🪖", visual:"Helmet + sword display"},
      {title:"Honor", desc:"Photo set — 2 papers, warrior spirit.", emoji:"🥷", visual:"Samurai set"},
    ]
  },
  {
    id:24, world:"WORLD 4 • THE SHADOW TEMPLE", title:"BOAT FLEET", subtitle:"3 boats armada", emoji:"⛵", color:"#0EA5E9",
    sheets:3, diff:"EASY • 15 min • 3 PAPERS", unlocks:"Unlocks Master Peak", paperTip:"3 PAPERS: Blue shades — navy, sky, white. Armada power.",
    steps:[
      {title:"Boats ×3", desc:"Three boats (Level 1 method) different sizes by trimming before fold.", emoji:"⛵", visual:"Three boats scaled"},
      {title:"Fleet Line", desc:"Arrange largest back, smallest front — perspective.", emoji:"🚢", visual:"Fleet in line"},
      {title:"Sail?", desc:"Add tiny sails from scraps if want, but keep 3 main papers focus.", emoji:"⛵", visual:"Fleet with/without sails"},
      {title:"Armada", desc:"Photo overhead — 3-paper harbor masters.", emoji:"🌊", visual:"Fleet overhead"},
    ]
  },
  // WORLD 5: THE MASTER'S PEAK — 25-30
  {
    id:25, world:"WORLD 5 • THE MASTER'S PEAK", title:"DRAGON", subtitle:"The king — single sheet legend", emoji:"🐉", color:"#7F1D1D",
    sheets:1, diff:"MASTER • 30 min • 1 PAPER", unlocks:"Unlocks Peacock", paperTip:"1 PAPER: Large 35cm, thin yet strong. Dragon is single-sheet ultimate test.",
    steps:[
      {title:"Frog Base → Bird", desc:"Start with frog base, transition to bird base with extra pleats — dragon spine.", emoji:"🐉", visual:"Elongated bird base"},
      {title:"Squash Head/Tail", desc:"Reverse folds for snout and tail, crimp middle for wings.", emoji:"🐲", visual:"Head point, tail long"},
      {title:"Wings", desc:"Petal folds spread wings, curl with pencil.", emoji:"🐉", visual:"Wings spread"},
      {title:"Roar", desc:"Shape legs, curl tail, dragon rears. Single-paper king!", emoji:"🐉", visual:"Dragon posed"},
    ]
  },
  {
    id:26, world:"WORLD 5 • THE MASTER'S PEAK", title:"PEACOCK", subtitle:"Fan tail — 2 papers", emoji:"🦚", color:"#0E7490",
    sheets:2, diff:"MASTER • 25 min • 2 PAPERS", unlocks:"Unlocks Elephant", paperTip:"2 PAPERS: Body (green) + Tail fan (blue/gold). Peacock needs tail volume.",
    steps:[
      {title:"Body", desc:"Bird base body, reverse folds for head and legs.", emoji:"🦚", visual:"Peacock body"},
      {title:"Tail Fan", desc:"Second sheet accordion fan, fold to attach behind — pleat density matters.", emoji:"🪭", visual:"Fan tail, pleated"},
      {title:"Join", desc:"Slit or tuck tail into body back pocket, fan spreads 180°.", emoji:"🔗", visual:"Tail attached, fanned"},
      {title:"Display", desc:"Tail fanned full, head high. 2-paper elegance.", emoji:"🦚", visual:"Peacock display"},
    ]
  },
  {
    id:27, world:"WORLD 5 • THE MASTER'S PEAK", title:"ELEPHANT", subtitle:"Gentle giant — single sheet", emoji:"🐘", color:"#78716C",
    sheets:1, diff:"MASTER • 28 min • 1 PAPER", unlocks:"Unlocks Armor", paperTip:"1 PAPER: Grey, large 30cm. Wrinkles add texture, embrace them.",
    steps:[
      {title:"Blintz + Fish", desc:"Blintz fold corners to center, then fish base elongation.", emoji:"🐘", visual:"Blintz fish hybrid"},
      {title:"Trunk & Ears", desc:"Inside reverse for trunk curl, squash folds for huge ears.", emoji:"👂", visual:"Trunk forward, ears flat"},
      {title:"Legs", desc:"Pleat folds for 4 legs, mountain fold body thick.", emoji:"🐾", visual:"Legs column"},
      {title:"Gentle", desc:"Curve trunk down, ears spread — one-paper giant walks.", emoji:"🐘", visual:"Elephant posed"},
    ]
  },
  {
    id:28, world:"WORLD 5 • THE MASTER'S PEAK", title:"SAMURAI ARMOR", subtitle:"3 papers valor", emoji:"🛡️", color:"#57534E",
    sheets:3, diff:"MASTER • 30 min • 3 PAPERS", unlocks:"Unlocks Lotus Garden", paperTip:"3 PAPERS: Helmet (grey) + Armor (black) + Sword (silver). Full bushido.",
    steps:[
      {title:"Kabuto", desc:"Helmet from Level 23, refined.", emoji:"⛩️", visual:"Kabuto"},
      {title:"Do Armor", desc:"Second sheet: chest plate with shoulder flaps, box pleats.", emoji:"🛡️", visual:"Chest plate"},
      {title:"Katana", desc:"Third sheet katana, crisp.", emoji:"⚔️", visual:"Sword"},
      {title:"Warrior", desc:"Stack: helmet atop armor, sword at side. 3-paper samurai.", emoji:"🥷", visual:"Full armor set"},
    ]
  },
  {
    id:29, world:"WORLD 5 • THE MASTER'S PEAK", title:"LOTUS GARDEN", subtitle:"6 flowers + pond", emoji:"🪷", color:"#EC4899",
    sheets:7, diff:"MASTER • 35 min • 7 PAPERS", unlocks:"Unlocks Final Castle", paperTip:"7 PAPERS: 6 for lotus blooms (pink/white) + 1 green for lily pads base. Garden needs family.",
    steps:[
      {title:"Lotus ×6", desc:"Each sheet: lotus with layered petals (squash + petal). Repeat 6× varied.", emoji:"🪷", visual:"Six lotus blooms"},
      {title:"Pond Base", desc:"Green sheet flat, pleat edges to suggest water rim.", emoji:"🍃", visual:"Green pond base"},
      {title:"Arrange Garden", desc:"Place 6 lotus on pond — 3 open, 3 bud. Overlap for depth.", emoji:"🌺", visual:"Garden arranged"},
      {title:"Serenity", desc:"Photo overhead — 7-paper paradise, zen achieved.", emoji:"🪷", visual:"Lotus garden zen"},
    ]
  },
  {
    id:30, world:"WORLD 5 • THE MASTER'S PEAK", title:"SIKOGAMI CASTLE", subtitle:"12 papers ultimate", emoji:"🏯", color:"#CA8A04",
    sheets:12, diff:"LEGEND • 60 min • 12 PAPERS", unlocks:"You are Master", paperTip:"12 PAPERS: The final — your curated box shines here. 12 sheets, no glue, modular keep.",
    steps:[
      {title:"Walls ×4", desc:"4 sheets: castle wall units with interlocking crenellations.", emoji:"🏯", visual:"Wall units x4"},
      {title:"Towers ×4", desc:"4 sheets: pagoda tower tops, tiered roofs.", emoji:"🗼", visual:"Towers"},
      {title:"Gates & Roofs ×4", desc:"4 sheets: gate, roof joins, courtyard base.", emoji:"⛩️", visual:"Gates/roofs"},
      {title:"Crown", desc:"Assemble: walls base, towers corners, roofs locked — no glue! Photo your 12-paper legend. MASTER!", emoji:"🏯", visual:"Full castle, majestic"},
    ]
  },
];

// ——— AUTH SYSTEM (localStorage, admin unlock) ———
function getUsers(){ return JSON.parse(localStorage.getItem('sikogami_users')||'[]'); }
function setUsers(u){ localStorage.setItem('sikogami_users', JSON.stringify(u)); }
function getCurrentUser(){ try{return JSON.parse(localStorage.getItem('sikogami_currentUser')||'null')}catch{return null} }
function setCurrentUser(u){ if(u) localStorage.setItem('sikogami_currentUser', JSON.stringify(u)); else localStorage.removeItem('sikogami_currentUser'); }
function isAdmin(){ const u=getCurrentUser(); return !!(u && (u.isAdmin || u.email==='admin@sikogami.com')); }
function ensureDefaultAdmin(){
  let users=getUsers();
  if(!users.find(x=>x.email==='admin@sikogami.com')){
    users.push({name:'Admin', email:'admin@sikogami.com', password:'admin123', isAdmin:true});
    setUsers(users);
  }
}
ensureDefaultAdmin();

let currentLevel = null;
let currentStep = 0;
let progress = JSON.parse(localStorage.getItem('sikogami_progress') || '[]');

function saveProgress() {
  localStorage.setItem('sikogami_progress', JSON.stringify(progress));
  updateProgressUI();
  renderGarden();
  syncProgressToNeon();
}
function setSyncStatus(text, colorClass){
  const el=document.getElementById('syncStatus');
  if(!el) return;
  el.textContent=text;
  el.className='text-[10px] px-2 py-0.5 font-mono border '+colorClass;
}
async function syncProgressToNeon(){
  const u=getCurrentUser();
  if(!u || !u.email) { setSyncStatus('○ Offline • local only','bg-white/10 border-white/20 text-paper/70'); return; }
  setSyncStatus('◍ Syncing...','bg-sage/20 border-sage text-sage');
  try{
    const r=await fetch('/api/progress',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({email:u.email, progress})
    });
    const j=await r.json();
    if(j.ok) setSyncStatus(`☁️ Neon synced • ${progress.length}/30`,'bg-[#22c55e]/20 border-[#22c55e] text-[#86efac]');
    else setSyncStatus('⚠︎ Sync failed','bg-sick/20 border-sick text-white');
  }catch(e){ setSyncStatus('○ Offline • local only','bg-white/10 border-white/20 text-paper/70'); }
}
async function loadProgressFromNeon(){
  const u=getCurrentUser();
  if(!u || !u.email) { setSyncStatus('○ Offline • local only','bg-white/10 border-white/20 text-paper/70'); return; }
  setSyncStatus('◍ Syncing...','bg-sage/20 border-sage text-sage');
  try{
    const r=await fetch(`/api/progress?email=${encodeURIComponent(u.email)}`);
    const j=await r.json();
    if(j.ok){
      if(Array.isArray(j.progress) && j.progress.length){
        const merged = Array.from(new Set([...progress, ...j.progress])).sort((a,b)=>a-b);
        if(j.progress.length > progress.length){
          progress = j.progress.sort((a,b)=>a-b);
          localStorage.setItem('sikogami_progress', JSON.stringify(progress));
          updateProgressUI(); renderGarden(); renderLevels();
          toast(`☁️ Synced ${progress.length} levels from Neon`);
        } else if (merged.length > j.progress.length){
          progress = merged;
          localStorage.setItem('sikogami_progress', JSON.stringify(progress));
          await syncProgressToNeon();
          setSyncStatus(`☁️ Neon synced • ${progress.length}/30`,'bg-[#22c55e]/20 border-[#22c55e] text-[#86efac]'); return;
        }
      }
      setSyncStatus(`☁️ Neon synced • ${progress.length}/30`,'bg-[#22c55e]/20 border-[#22c55e] text-[#86efac]');
    } else setSyncStatus('⚠︎ Sync failed','bg-sick/20 border-sick text-white');
  }catch(e){ setSyncStatus('○ Offline • local only','bg-white/10 border-white/20 text-paper/70'); }
}
async function syncSingleLevel(levelId){
  const u=getCurrentUser();
  if(!u || !u.email) return;
  try{
    await fetch('/api/progress',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({email:u.email, levelId})
    });
  }catch(e){}
}

function isUnlocked(id) {
  if (isAdmin()) return true; // admin sees all
  if (id===1) return true;
  return progress.includes(id-1);
}
function isCompleted(id) { return progress.includes(id); }

const TOTAL = LEVELS.length;

// ——— SVG GENERATOR — SHAPE-ACCURATE MORPH ———
function getStepSvg(type){
  const paper="#FFF8E7", paperBack="#F0E6D3", stroke="#0A0A0A", red="#FF3B30", blue="#1E40AF", sage="#A8D5BA", shadow="rgba(0,0,0,0.08)";
  const base = (shapePath, lines) => `<svg viewBox="0 0 100 100" class="w-full h-full"><rect x="0" y="0" width="100" height="100" rx="2" fill="${paper}" opacity="0.15"/><g filter="url(#sh)">${shapePath}</g>${lines || ""}<defs><filter id="sh"><feDropShadow dx="0" dy="1" stdDeviation="0.8" flood-opacity="0.12"/></filter></defs></svg>`;
  const sq = `<rect x="12" y="12" width="76" height="76" rx="1.2" fill="${paper}" stroke="${stroke}" stroke-width="1.1"/>`;
  const maps = {
    "paper-flat": base(sq, `<line x1="12" y1="88" x2="88" y2="88" stroke="${stroke}" stroke-width="0.3" opacity="0.2"/>`),
    "valley-h": base(`<rect x="12" y="38" width="76" height="38" rx="1" fill="${paper}" stroke="${stroke}" stroke-width="1.2"/><rect x="12" y="38" width="76" height="38" rx="1" fill="${paperBack}" opacity="0.5"/><line x1="12" y1="38" x2="88" y2="38" stroke="${red}" stroke-width="1.5" stroke-dasharray="5 3"/>`, `<path d="M50 55 L50 68 M45 63 L50 68 L55 63" stroke="${red}" stroke-width="1" fill="none"/>`),
    "valley-h-flap": base(`<path d="M12 28 L88 28 L70 50 L12 50 Z" fill="${paper}" stroke="${stroke}" stroke-width="1.1"/><path d="M12 50 L88 50 L88 62 L12 62 Z" fill="white" stroke="${red}" stroke-dasharray="5 3" stroke-width="1"/>`, `<line x1="12" y1="50" x2="88" y2="50" stroke="${red}" stroke-width="1.4" stroke-dasharray="5 3"/>`),
    "valley-h-unfold": base(sq, `<line x1="12" y1="50" x2="88" y2="50" stroke="${red}" stroke-width="1" stroke-dasharray="2 3" opacity="0.6"/><text x="50" y="85" text-anchor="middle" font-family="monospace" font-size="4.5" fill="#888">CREASE → UNFOLD</text>`),
    "valley-v": base(`<line x1="50" y1="12" x2="50" y2="88" stroke="${red}" stroke-width="1.5" stroke-dasharray="5 3"/>` + sq, ""),
    "valley-v-unfold": base(sq, `<line x1="50" y1="12" x2="50" y2="88" stroke="${red}" stroke-width="1" stroke-dasharray="2 3" opacity="0.6"/>`),
    "valley-diag": base(`<polygon points="12,88 88,88 88,12" fill="${paper}" stroke="${stroke}" stroke-width="1.1"/><line x1="12" y1="88" x2="88" y2="12" stroke="${red}" stroke-width="1.5" stroke-dasharray="5 3"/>`),
    "valley-diag-unfold": base(sq, `<line x1="12" y1="88" x2="88" y2="12" stroke="${red}" stroke-width="1" stroke-dasharray="2 3" opacity="0.6"/>`),
    "valley-diag-right": base(`<path d="M12 12 L88 12 L88 88 L12 88 Z M88 12 L50 38 L70 50 L88 12" fill="${paper}" stroke="${stroke}" stroke-width="1"/><path d="M88 12 L50 38" stroke="${red}" stroke-width="1.4" stroke-dasharray="5 3"/>`, `<path d="M70 30 L75 25" stroke="${red}" fill="none"/>`),
    "valley-diag-left": base(`<path d="M12 12 L88 12 L88 88 L12 88 Z M12 12 L50 38 L30 50 L12 12" fill="${paper}" stroke="${stroke}" stroke-width="1"/><path d="M12 12 L50 38" stroke="${red}" stroke-width="1.4" stroke-dasharray="5 3"/>`),
    "mountain-h": base(`<rect x="12" y="12" width="76" height="76" rx="1.2" fill="${paper}" stroke="${stroke}" stroke-width="1.1"/><line x1="12" y1="50" x2="88" y2="50" stroke="${blue}" stroke-width="1.5" stroke-dasharray="2 4"/><path d="M50 38 L50 28 M45 33 L50 28 L55 33" stroke="${blue}" fill="none"/>`, ""),
    "turn-over": base(`<path d="M15 45 Q50 20 85 45 Q50 70 15 45" fill="${paper}" stroke="${stroke}" stroke-width="1.1" opacity="0.9"/><path d="M30 50 A20 20 0 0 1 70 50" stroke="${stroke}" stroke-width="1.1" fill="none" stroke-dasharray="4 2"/><text x="50" y="78" text-anchor="middle" font-size="5.5" font-family="monospace" fill="${stroke}">TURN OVER ↺</text>`),
    "tuck-corners": base(`<path d="M12 28 L88 28 L70 50 L30 50 Z" fill="${paper}" stroke="${stroke}" stroke-width="1.1"/><path d="M12 50 L30 50 L30 64 L12 64" fill="white" stroke="${blue}" stroke-dasharray="4 2"/><path d="M70 50 L88 50 L88 64 L70 64" fill="white" stroke="${blue}" stroke-dasharray="4 2"/>`),
    "squash-diamond": base(`<polygon points="50,12 88,50 50,88 12,50" fill="${paper}" stroke="${stroke}" stroke-width="1.2"/><polygon points="50,12 88,50 50,50 50,12" fill="${paperBack}" opacity="0.6"/><line x1="50" y1="12" x2="50" y2="88" stroke="${red}" stroke-dasharray="5 3"/><line x1="12" y1="50" x2="88" y2="50" stroke="${red}" stroke-dasharray="5 3"/>`),
    "petal-curl": base(`<path d="M30 60 Q50 30 70 60 L65 70 L35 70 Z" fill="${paper}" stroke="${stroke}" stroke-width="1.1"/><path d="M30 60 Q50 30 70 60" stroke="${red}" fill="none" stroke-dasharray="5 3"/>`),
    "inside-reverse": base(`<path d="M12 12 L88 12 L50 50 L12 12" fill="${paper}" stroke="${stroke}"/><path d="M50 12 L50 50" stroke="${blue}" stroke-dasharray="2 4"/><path d="M50 50 L30 70" stroke="${red}" stroke-dasharray="5 3"/>`),
    "petal-fold": base(`<polygon points="50,12 88,50 50,88 12,50" fill="${paper}" stroke="${stroke}"/><line x1="50" y1="30" x2="50" y2="70" stroke="${red}" stroke-dasharray="5 3"/><path d="M50 30 L65 45 L50 60" fill="white" opacity="0.7" stroke="${red}" stroke-dasharray="4 2"/>`),
    "open-boat": base(`<path d="M18 62 L50 28 L82 62 L72 76 L28 76 Z" fill="${paper}" stroke="${stroke}" stroke-width="1.2"/><path d="M28 76 L72 76" stroke="${stroke}" stroke-width="0.8" opacity="0.4"/><line x1="28" y1="76" x2="72" y2="76" stroke="${red}" stroke-dasharray="4 2"/><path d="M50 28 L50 76" stroke="${stroke}" stroke-width="0.6" opacity="0.15"/>`),
    "open-cup": base(`<path d="M30 28 L70 28 L64 74 L36 74 Z" fill="${paper}" stroke="${stroke}" stroke-width="1.2"/><path d="M36 74 L64 74" stroke="${stroke}" stroke-width="1" opacity="0.3"/>`),
    "whale-final": base(`<path d="M15 55 Q50 35 85 55 Q70 70 50 68 Q30 70 15 55" fill="${paper}" stroke="${stroke}" stroke-width="1.1"/><ellipse cx="68" cy="52" rx="6" ry="4" fill="${paperBack}" stroke="${stroke}" stroke-width="0.6"/><circle cx="70" cy="50" r="1.3" fill="${stroke}"/>`),
    "dog-final": base(`<path d="M50 18 L18 48 L28 70 L72 70 L82 48 Z" fill="${paper}" stroke="${stroke}" stroke-width="1.1"/><path d="M18 48 L35 35 L28 48" fill="${paperBack}"/><path d="M82 48 L65 35 L72 48" fill="${paperBack}"/><circle cx="40" cy="52" r="1.5" fill="${stroke}"/><circle cx="60" cy="52" r="1.5" fill="${stroke}"/><ellipse cx="50" cy="60" rx="3" ry="2" fill="${stroke}"/>`),
    "heart-final": base(`<path d="M50 76 L22 46 A13 13 0 0 1 50 30 A13 13 0 0 1 78 46 Z" fill="#FF6B6B" stroke="${stroke}" stroke-width="1.1"/>`),
    "butterfly-final": base(`<path d="M50 30 Q30 45 20 55 Q30 65 50 50 M50 30 Q70 45 80 55 Q70 65 50 50" fill="${paper}" stroke="${stroke}" stroke-width="1.1"/><line x1="50" y1="30" x2="50" y2="55" stroke="${stroke}" stroke-width="0.8"/>`),
    "crane-final": base(`<path d="M35 65 L50 30 L65 65 M50 30 L35 45 M50 30 L65 45 M35 65 Q50 75 65 65" fill="${paper}" stroke="${stroke}" stroke-width="1.1"/><path d="M50 30 L48 22" stroke="${stroke}" stroke-width="0.9"/>`),
    "frog-final": base(`<ellipse cx="50" cy="60" rx="22" ry="14" fill="${paper}" stroke="${stroke}"/><ellipse cx="35" cy="70" rx="7" ry="9" fill="${paper}" stroke="${stroke}"/><ellipse cx="65" cy="70" rx="7" ry="9" fill="${paper}" stroke="${stroke}"/><circle cx="42" cy="50" r="2" fill="${stroke}"/><circle cx="58" cy="50" r="2" fill="${stroke}"/>`),
    "tulip-final": base(`<path d="M50 30 Q35 45 38 60 Q50 70 62 60 Q65 45 50 30" fill="#FF6B6B" stroke="${stroke}" stroke-width="1"/><path d="M50 70 L50 85" stroke="#22c55e" stroke-width="1.5"/>`),
    "fox-final": base(`<path d="M50 22 L20 50 L28 72 L72 72 L80 50 Z" fill="#FB923C" stroke="${stroke}" stroke-width="1.1"/><polygon points="20,50 30,35 28,50" fill="white" stroke="${stroke}"/><polygon points="80,50 70,35 72,50" fill="white" stroke="${stroke}"/><ellipse cx="50" cy="62" rx="3" ry="2.5" fill="white" stroke="${stroke}"/>`),
    "fish-final": base(`<path d="M15 50 Q30 30 50 50 Q30 70 15 50 M70 40 Q60 50 70 60" fill="${paper}" stroke="${stroke}" stroke-width="1.1"/><circle cx="35" cy="48" r="1.5" fill="${stroke}"/>`),
    "penguin-final": base(`<ellipse cx="50" cy="55" rx="18" ry="24" fill="${stroke}" stroke="${stroke}"/><ellipse cx="50" cy="65" rx="10" ry="12" fill="white"/><polygon points="50,45 46,50 54,50" fill="#FFB000" stroke="${stroke}"/>`),
    "cube-final": base(`<path d="M30 30 L60 30 L75 45 L75 70 L45 70 L30 55 Z" fill="${paper}" stroke="${stroke}" stroke-width="1.1"/><path d="M30 30 L45 45 L75 45 L60 30" fill="${paperBack}" stroke="${stroke}"/><path d="M45 45 L45 70" stroke="${stroke}" opacity="0.5"/>`),
    "star-final": base(`<path d="M50 12 L61 40 L88 40 L66 56 L74 84 L50 68 L26 84 L34 56 L12 40 L39 40 Z" fill="#FACC15" stroke="${stroke}" stroke-width="1"/>`),
    "dragon-final": base(`<path d="M20 50 Q35 30 50 50 Q65 70 85 50 L80 45 Q65 60 50 40 Q35 60 20 50" fill="${paper}" stroke="${stroke}" stroke-width="1.1"/><path d="M85 50 L90 42 L84 48" fill="none" stroke="${stroke}"/>`),
    "castle-final": base(`<rect x="25" y="50" width="50" height="25" fill="${paper}" stroke="${stroke}"/><rect x="30" y="35" width="12" height="15" fill="${paperBack}" stroke="${stroke}"/><rect x="58" y="35" width="12" height="15" fill="${paperBack}" stroke="${stroke}"/><path d="M25 50 L75 50 L70 45 L30 45 Z" fill="${stroke}" opacity="0.2"/>`),
    "default": base(sq, "")
  };
  const inner = maps[type] || maps["default"];
  return `<svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}


// Deepen shallow levels 4→8 via micro-steps (keeps L1 10 as is)
function getDetailedSteps(level){
  if(level.steps.length >= 8) return level.steps; // already deep (L1-L6)
  // Level-specific accurate morph sequences (shape-accurate)
  const map = {
    "PAPER BOAT": ["paper-flat","valley-h","valley-v-unfold","valley-diag-right","valley-diag-left","valley-h-flap","turn-over","tuck-corners","squash-diamond","open-boat"],
    "PAPER CUP": ["paper-flat","valley-diag","valley-v-unfold","valley-diag-right","valley-diag-left","valley-h-flap","turn-over","open-cup"],
    "TULIP BLOOM": ["paper-flat","valley-diag-unfold","valley-h-unfold","squash-diamond","valley-diag-right","turn-over","tuck-corners","tulip-final"],
    "GENTLE WHALE": ["paper-flat","valley-diag-unfold","valley-diag-right","valley-diag-left","tuck-corners","mountain-h","inside-reverse","whale-final"],
    "DOG FACE": ["paper-flat","valley-diag","valley-v-unfold","valley-diag-left","valley-diag-right","mountain-h","valley-h-flap","dog-final"],
    "HEART": ["paper-flat","valley-v-unfold","valley-diag-right","valley-v","turn-over","petal-curl","open-boat","heart-final"],
    "BUTTERFLY": ["paper-flat","valley-v-unfold","squash-diamond","squash-diamond","valley-h-unfold","mountain-h","petal-curl","butterfly-final"],
    "FOX FACE": ["paper-flat","valley-v-unfold","valley-diag-left","valley-diag-right","mountain-h","valley-h-flap","turn-over","fox-final"],
    "JUMPING FROG": ["paper-flat","squash-diamond","valley-diag-unfold","valley-diag-right","valley-diag-left","mountain-h","valley-h-flap","frog-final"],
    "TULIP WITH STEM": ["paper-flat","valley-diag-unfold","squash-diamond","valley-diag-right","turn-over","tuck-corners","valley-diag-right","tulip-final"],
    "BOAT WITH SAIL": ["paper-flat","valley-h","valley-v-unfold","valley-diag-right","valley-diag-left","turn-over","tuck-corners","open-boat"],
    "BUTTERFLY GARDEN": ["paper-flat","valley-v-unfold","squash-diamond","squash-diamond","mountain-h","petal-curl","turn-over","butterfly-final"],
    "FOX FAMILY": ["paper-flat","valley-diag","valley-v-unfold","valley-diag-left","valley-diag-right","mountain-h","turn-over","fox-final"],
    "FROG POND": ["paper-flat","squash-diamond","valley-diag-right","valley-diag-left","mountain-h","valley-h-flap","turn-over","frog-final"],
    "CRANE COUPLE": ["paper-flat","valley-v-unfold","petal-fold","turn-over","inside-reverse","inside-reverse","valley-h-flap","crane-final"],
    "NINJA STAR": ["paper-flat","valley-diag","tuck-corners","valley-h","turn-over","tuck-corners","valley-diag-right","star-final"],
    "KUSUDAMA FLOWER": ["paper-flat","squash-diamond","valley-diag-right","valley-diag-left","petal-curl","turn-over","tuck-corners","tulip-final"],
    "SAMURAI HELMET": ["paper-flat","valley-h","valley-diag-right","valley-diag-left","tuck-corners","mountain-h","turn-over","castle-final"],
    "BOAT FLEET": ["paper-flat","valley-h","valley-v-unfold","valley-diag-right","turn-over","tuck-corners","squash-diamond","open-boat"],
    "PEACOCK": ["paper-flat","squash-diamond","petal-fold","inside-reverse","mountain-h","petal-curl","turn-over","butterfly-final"],
    "ELEPHANT": ["paper-flat","squash-diamond","valley-diag-right","valley-diag-left","mountain-h","inside-reverse","petal-curl","whale-final"],
    "SAMURAI ARMOR": ["paper-flat","valley-h","tuck-corners","squash-diamond","turn-over","petal-curl","inside-reverse","castle-final"],
    "LOTUS GARDEN": ["paper-flat","valley-diag-unfold","squash-diamond","petal-curl","turn-over","tuck-corners","petal-curl","tulip-final"],
    "CRANE": ["paper-flat","valley-v-unfold","petal-fold","turn-over","inside-reverse","inside-reverse","valley-h-flap","crane-final"],
    "FISH": ["paper-flat","valley-diag-unfold","valley-diag-right","valley-diag-left","turn-over","inside-reverse","petal-curl","fish-final"],
    "PENGUIN": ["paper-flat","squash-diamond","valley-diag-right","valley-diag-left","mountain-h","tuck-corners","petal-curl","penguin-final"],
    "MODULAR CUBE": ["paper-flat","valley-diag","tuck-corners","squash-diamond","valley-h","turn-over","tuck-corners","cube-final"],
    "5-PETAL STAR": ["paper-flat","valley-h-unfold","valley-v-unfold","squash-diamond","petal-curl","turn-over","tuck-corners","star-final"],
    "DRAGON": ["paper-flat","squash-diamond","petal-fold","inside-reverse","mountain-h","tuck-corners","petal-curl","dragon-final"],
    "SIKOGAMI CASTLE": ["paper-flat","valley-h","valley-v","squash-diamond","tuck-corners","turn-over","petal-curl","castle-final"],
  };
  const seq = map[level.title];
  if(seq){
    const orig = level.steps;
    const expanded = seq.map((svgType, i) => {
      const base = orig[Math.min(i, orig.length-1)];
      const isFinal = i===seq.length-1;
      return {
        title: isFinal? `Final ${level.title} — Morph Complete` : base.title + (i>0? ` • Step ${i+1}`: ""),
        desc: isFinal? `Morph complete! ${level.emoji} Your ${level.title.toLowerCase()} now stands as ${level.sheets} paper(s) united. Compare silhouette to photo for scan.` : base.desc,
        emoji: isFinal? level.emoji : base.emoji,
        visual: isFinal? `${level.title} final silhouette` : base.visual,
        svgType: svgType
      };
    });
    return expanded;
  }
  // Generic fallback 4→8 with shape morphed finals
  const orig = level.steps;
  const expanded = [];
  const genericSeq = ["paper-flat","valley-h-unfold","valley-v-unfold","squash-diamond","valley-diag-right","turn-over","petal-curl", level.emoji==="🏯"?"castle-final": level.emoji==="🐉"?"dragon-final": level.emoji==="🌟"?"star-final": level.emoji==="🧊"?"cube-final": "open-boat"];
  orig.forEach((s, idx) => {
    const svg = s.svgType || genericSeq[Math.min(idx, genericSeq.length-1)];
    expanded.push({...s, svgType: svg});
    if(idx < orig.length -1){
      if(idx===0) expanded.push({title:"Crease & Guide", desc:"Crease firmly, then UNFOLD. Guide stays faint.", emoji:"✚", visual:"Unfold", svgType:"valley-h-unfold"});
      else if(idx===1) expanded.push({title:"Mirror Check", desc:"Mirror opposite side, check alignment.", emoji:"↔️", visual:"Mirror", svgType:"valley-diag-left"});
      else if(idx===2) expanded.push({title:"Turn Over", desc:"Flip ↺, continue on back.", emoji:"↺", visual:"Turn", svgType:"turn-over"});
    }
  });
  while(expanded.length < 8) expanded.push({title:"Refine Shape", desc:`Soften & shape toward final ${level.emoji}`, emoji:level.emoji, visual:"Refine", svgType: genericSeq[6]});
  return expanded.slice(0,8);
}


function updateProgressUI() {
  const count = progress.length;
  document.getElementById('gardenCount').textContent = `${count}/${TOTAL}`;
  const pt = document.getElementById('progressText');
  if (pt) pt.textContent = count;
  const bar = document.getElementById('progressBar');
  if (bar) bar.style.width = (count/TOTAL*100)+'%';
}

function renderLevels() {
  const c = document.getElementById('levelsContainer');
  c.innerHTML = '';
  let lastWorld = '';
  LEVELS.forEach((lvl, idx) => {
    if (lvl.world !== lastWorld) {
      lastWorld = lvl.world;
      const wh = document.createElement('div');
      wh.className = 'sticky top-[64px] z-10 bg-paper/80 backdrop-blur border-y-2 border-ink py-2 px-3 flex justify-between items-center mt-8 first:mt-0';
      wh.innerHTML = `<span class="font-black text-xs tracking-[0.2em]">${lvl.world}</span><span class="text-[11px] font-mono bg-ink text-paper px-2 py-1">${lvl.sheets===1?'● 1 PAPER':'● '+lvl.sheets+' PAPERS'}</span>`;
      c.appendChild(wh);
    }
    const unlocked = isUnlocked(lvl.id);
    const completed = isCompleted(lvl.id);
    const side = idx % 2 === 0 ? 'lg:mr-auto lg:pr-12' : 'lg:ml-auto lg:pl-12 lg:text-right lg:items-end';
    const card = document.createElement('div');
    card.className = `level-card relative border-2 border-ink bg-white p-5 lg:w-[560px] ${side} ${unlocked ? 'cursor-pointer' : 'locked'} flex flex-col`;
    card.onclick = () => unlocked && openModal(lvl.id);
    const status = completed ? `<span class="bg-[#22c55e] text-white px-2 py-1 text-[10px] font-mono">✓ COMPLETED</span>` : unlocked ? `<span class="bg-sick text-white px-2 py-1 text-[10px] font-mono">● UNLOCKED</span>` : `<span class="bg-ink text-paper px-2 py-1 text-[10px] font-mono">🔒 LOCKED</span>`;
    const sheetBadge = lvl.sheets===1 ? `<span class="text-[10px] font-mono bg-sage text-ink px-2 py-0.5 border border-ink">1 SHEET</span>` : `<span class="text-[10px] font-mono bg-[#FFE08A] text-ink px-2 py-0.5 border border-ink">${lvl.sheets} SHEETS</span>`;
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
            <div class="mt-2 flex gap-1 flex-wrap ${idx%2===1?'justify-end':''}">${sheetBadge} <span class="text-[11px] font-mono bg-sand inline-block px-2 py-1 border border-ink/10">${lvl.unlocks}</span></div>
          </div>
        </div>
        <div class="hidden md:block">${status}</div>
      </div>
      <div class="md:hidden mt-3">${status}</div>
      <div class="mt-4 flex items-center justify-between border-t-2 border-dashed border-ink/10 pt-3">
        <div class="text-[11px] font-mono text-ink/50">${completed ? 'Beautiful — single/multi mastery ✨' : unlocked ? `Tap to fold • ${lvl.sheets} paper${lvl.sheets>1?'s':''} needed` : `Complete Level ${lvl.id-1} to unlock`}</div>
        ${btn}
      </div>
    `;
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

let gardenOpen = false;
let gardenFilter = 'all';
function toggleGarden(){
  gardenOpen = !gardenOpen;
  const col=document.getElementById('gardenCollapsible');
  const icon=document.getElementById('gardenToggleIcon');
  const summary=document.getElementById('gardenSummary');
  if(!col||!icon) return;
  if(gardenOpen){ col.classList.remove('hidden'); icon.innerHTML='▲ COLLAPSE <span class="text-[10px]">⌃</span>'; if(summary) summary.textContent='tap to collapse'; }
  else { col.classList.add('hidden'); icon.innerHTML='▼ EXPAND <span class="text-[10px]">⌄</span>'; if(summary) summary.textContent=`${progress.length}/30 collected → tap to expand`; }
}
function setGardenFilter(f){
  gardenFilter=f;
  document.querySelectorAll('.garden-filter').forEach(b=>{
    const isActive=b.dataset.filter===f;
    b.className=isActive
      ? 'garden-filter active bg-paper text-ink px-3 py-1.5 text-[11px] font-mono tracking-widest border-2 border-paper'
      : 'garden-filter bg-transparent text-paper border border-paper/20 px-3 py-1.5 text-[11px] font-mono tracking-widest hover:bg-white/10';
  });
  renderGarden();
}
function renderGarden() {
  const grid = document.getElementById('gardenGrid');
  const empty = document.getElementById('emptyGarden');
  const summary=document.getElementById('gardenSummary');
  if (!grid || !empty) return;
  if(summary) summary.textContent = `${progress.length}/30 collected → ${gardenOpen?'tap to collapse':'tap to expand'}`;
  // stats
  const sc=document.getElementById('statCollected'); if(sc) sc.textContent=`${progress.length}/30`;
  const sw=document.getElementById('statWorlds'); if(sw){
    const worlds=new Set(LEVELS.filter(l=>progress.includes(l.id)).map(l=>l.world)).size;
    sw.textContent=`${worlds|| (progress.length?1:0)}/5`;
  }
  const sp=document.getElementById('statPapers'); if(sp){
    const totalPapers=LEVELS.filter(l=>progress.includes(l.id)).reduce((a,l)=>a+l.sheets,0);
    sp.textContent= totalPapers || progress.length;
  }
  // filter
  let list=LEVELS;
  if(gardenFilter==='collected') list=LEVELS.filter(l=>isCompleted(l.id));
  else if(gardenFilter==='locked') list=LEVELS.filter(l=>!isCompleted(l.id));
  else if(gardenFilter==='single') list=LEVELS.filter(l=>l.sheets===1);
  else if(gardenFilter==='multi') list=LEVELS.filter(l=>l.sheets>1);

  grid.innerHTML = '';
  if (list.length===0) {
    empty.classList.remove('hidden'); empty.style.display='block'; grid.style.display='none';
    empty.innerHTML=`No ${gardenFilter} items — try <b>ALL</b> filter`;
    return;
  }
  if (progress.length===0 && !gardenOpen && gardenFilter==='all') {
    empty.style.display='none'; grid.style.display='none';
    if(gardenOpen){ empty.classList.remove('hidden'); empty.style.display='block'; grid.style.display='none'; }
    return;
  }
  if (progress.length===0 && gardenFilter==='all') { empty.classList.remove('hidden'); empty.style.display='block'; grid.style.display='none'; empty.innerHTML='Your garden is empty. Fold your first boat to plant a seed 🌱 — try filter <b>ALL</b>'; return; }
  // has items to show (filtered)
  empty.classList.add('hidden'); empty.style.display='none'; grid.style.display='flex';
  list.forEach(lvl => {
    const done = isCompleted(lvl.id);
    const div = document.createElement('div');
    div.className = `shrink-0 snap-start border-2 ${done ? 'border-paper bg-white/10 hover:bg-white/15' : 'border-dashed border-paper/20 bg-transparent opacity-60'} w-[118px] p-3 flex flex-col items-center gap-1.5 text-center ${done?'cursor-pointer transition':''}`;
    div.onclick = () => done ? openModal(lvl.id) : (!isUnlocked(lvl.id) ? toast(`🔒 Complete Level ${lvl.id-1} first`) : openModal(lvl.id));
    const worldShort=lvl.world.split('•')[0].trim();
    div.innerHTML = `
      <div class="text-[8px] font-mono tracking-widest ${done?'text-sage':'text-paper/40'}">${worldShort}</div>
      <div class="w-14 h-14 ${done ? 'bg-white text-ink shadow-sm' : 'bg-paper/5 text-paper/50'} border-2 ${done?'border-paper':'border-paper/20'} flex items-center justify-center text-2xl ${done ? '' : 'grayscale'}">${done ? lvl.emoji : '?'}</div>
      <div class="font-black text-[10px] tracking-widest leading-none">${lvl.title}</div>
      <div class="text-[8px] font-mono ${done ? 'text-sage' : 'text-paper/50'}">${done ? 'COLLECTED' : isUnlocked(lvl.id)?'UNLOCKED':'LOCKED'} • ${lvl.sheets} PAPER</div>
      ${done ? '<div class="text-[7px] font-mono bg-[#22c55e] text-white px-1.5 py-0.5">✓ IN GARDEN</div>' : `<div class="text-[7px] font-mono border border-paper/20 px-1.5 py-0.5 ${isUnlocked(lvl.id)?'text-paper/70':'text-paper/30'}">${isUnlocked(lvl.id)?'TAP TO FOLD →':'LOCKED'}</div>`}
    `;
    grid.appendChild(div);
  });
}

// Modal
function openModal(id) {
  currentLevel = LEVELS.find(l=>l.id===id);
  currentLevel._detailed = getDetailedSteps(currentLevel);
  currentStep = 0;
  document.getElementById('foldModal').classList.remove('hidden');
  document.getElementById('modalLevelBadge').textContent = currentLevel.id;
  document.getElementById('modalTitle').textContent = currentLevel.title;
  document.getElementById('modalWorld').textContent = currentLevel.world + ` • ${currentLevel.sheets} PAPER${currentLevel.sheets>1?'S':''}`;
  document.getElementById('paperTip').textContent = currentLevel.paperTip;
  document.getElementById('stepTotal').textContent = currentLevel._detailed.length;
  document.getElementById('scanIdle').classList.remove('hidden');
  document.getElementById('scanChecking').classList.add('hidden');
  document.getElementById('scanPreview').classList.add('hidden');
  const sl = document.getElementById('sheetLabel');
  if (sl) sl.textContent = `${currentLevel.sheets} SHEET${currentLevel.sheets>1?'S':''}`;
  document.body.style.overflow='hidden';
  renderStep();
}
function closeModal() {
  document.getElementById('foldModal').classList.add('hidden');
  document.body.style.overflow='';
}
function renderStep() {
  const steps = currentLevel._detailed || currentLevel.steps;
  const step = steps[currentStep];
  document.getElementById('stepNum').textContent = currentStep+1;
  document.getElementById('stepEmoji').textContent = step.emoji;
  document.getElementById('stepEmoji').style.transform = `rotate(${currentStep*2}deg)`;
  document.getElementById('stepVisual').textContent = step.visual;
  const svgContainer=document.getElementById('stepSvg'); if(svgContainer) svgContainer.innerHTML=getStepSvg(step.svgType||'paper-flat');
  const svgHintEl=document.getElementById('svgHint'); if(svgHintEl){ const tt=step.svgType||''; svgHintEl.textContent = tt.includes('turn')? '↺ TURN OVER — flip': tt.includes('unfold')? 'CREASE WELL, THEN UNFOLD': tt.includes('mountain')? 'MOUNTAIN (blue) — behind': tt.includes('valley')? 'VALLEY (red) — forward': 'FOLLOW RED/BLUE DOTTED LINES'; }
  const lbl=document.getElementById('stepSvgLabel'); if(lbl){ lbl.textContent = (step.svgType||'VALLEY').replace('-',' ').toUpperCase(); }
  document.getElementById('stepTitle').textContent = step.title;
  document.getElementById('stepDesc').textContent = step.desc;
  document.getElementById('prevBtn').style.visibility = currentStep===0 ? 'hidden' : 'visible';
  document.getElementById('nextBtn').textContent = currentStep===currentLevel.steps.length-1 ? 'READY TO SCAN ↓' : 'NEXT →';
  const dots = document.getElementById('stepDots');
  dots.innerHTML = '';
  const allSteps = currentLevel._detailed || currentLevel.steps;
  allSteps.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = `w-6 h-1.5 ${i===currentStep ? 'bg-ink' : i<currentStep ? 'bg-sage' : 'bg-ink/10'}`;
    dots.appendChild(d);
  });
  // progress hint
  const hint = document.getElementById('stepHint');
  if (hint) hint.textContent = `${currentLevel.sheets} paper${currentLevel.sheets>1?'s':''} • Step ${currentStep+1}/${currentLevel.steps.length}`;
}
function nextStep() {
  const steps = currentLevel._detailed || currentLevel.steps;
  if (currentStep < steps.length-1) { currentStep++; renderStep(); }
  else {
    toast('Now fold it IRL and scan! 📸');
    document.querySelector('#foldModal .grid')?.scrollIntoView({behavior:'smooth'});
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
    lastScanBase64 = reader.result;
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
    showScanResultAI({ pass: true, score: 88, feedback: "AI hiccup — but your fold looks wonderful! Zen pass granted ✨", mode: 'offline-fallback' });
  }
}

async function mockScanSuccess() {
  const sample = 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80';
  try {
    document.getElementById('scanIdle').classList.add('hidden');
    document.getElementById('scanChecking').classList.remove('hidden');
    document.getElementById('scanPreview').classList.remove('hidden');
    document.getElementById('previewImg').src = sample;
    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: sample, levelId: currentLevel.id, levelTitle: currentLevel.title })
    });
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
        <div class="text-[11px] font-mono mt-2 bg-white/20 px-2 py-1">Expected: ${data.expected || currentLevel.title} • ${currentLevel.sheets} paper${currentLevel.sheets>1?'s':''}</div>
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
function showScanResult(pass){
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
  const isMax = currentLevel.id === TOTAL;
  toast(`Level ${currentLevel.id} completed! ${isMax ? 'YOU ARE A MASTER 🏯' : 'Level '+(currentLevel.id+1)+' unlocked 🔓'}`);
  if (!isMax) {
    setTimeout(()=> document.getElementById('levels').scrollIntoView({behavior:'smooth'}), 600);
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

// ——— AUTH UI LOGIC ———
function renderAuthArea(){
  const area=document.getElementById('authArea');
  if(!area) return;
  const u=getCurrentUser();
  if(u){
    const adminTag = isAdmin() ? '<span class="bg-sick text-white text-[9px] font-mono px-1.5 py-0.5 ml-1">ADMIN</span>' : '';
    const name = u.name || u.email.split('@')[0];
    area.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="hidden md:flex flex-col text-right leading-none">
          <span class="text-xs font-black tracking-tight flex items-center justify-end">${name.toUpperCase()}${adminTag}</span>
          <span class="text-[10px] font-mono text-ink/60">${isAdmin()? 'ALL 30 UNLOCKED 🔓' : u.email}</span>
        </div>
        <div class="w-9 h-9 bg-ink text-paper flex items-center justify-center font-black text-xs border-2 border-ink">${name[0].toUpperCase()}</div>
        <button onclick="handleLogout()" class="hidden md:inline-flex border-2 border-ink px-3 py-2 font-mono text-[11px] tracking-widest hover:bg-ink hover:text-paper transition">LOGOUT</button>
        <button onclick="handleLogout()" class="md:hidden w-9 h-9 border-2 border-ink flex items-center justify-center">⎋</button>
      </div>`;
  } else {
    area.innerHTML = `<button onclick="openAuth('login')" class="bg-sick text-white px-5 py-2.5 font-black text-xs tracking-widest hover:bg-ink transition flex items-center gap-2">LOGIN <span class="hidden md:inline">/ SIGN UP</span></button>`;
  }
}
function openAuth(tab='login'){ document.getElementById('authModal').classList.remove('hidden'); document.body.style.overflow='hidden'; switchAuth(tab); }
function closeAuth(){ document.getElementById('authModal').classList.add('hidden'); document.body.style.overflow=''; }
function switchAuth(tab){
  ['login','signup','forgot'].forEach(t=>{
    const form=document.getElementById('form-'+t);
    const btn=document.getElementById('tab-'+t);
    if(t===tab){ form.classList.remove('hidden'); btn.className='flex-1 py-3 font-black text-xs tracking-widest bg-ink text-paper border-r-2 border-ink'; }
    else { form.classList.add('hidden'); btn.className='flex-1 py-3 font-mono text-xs tracking-widest bg-paper hover:bg-sand transition border-r-2 border-ink/10'; }
  });
}
function showErr(id,msg){
  const el=document.getElementById(id);
  el.textContent=msg; el.classList.remove('hidden');
  setTimeout(()=>el.classList.add('hidden'),4000);
}
async function handleSignup(e){
  e.preventDefault();
  const name=document.getElementById('signupName').value.trim();
  const email=document.getElementById('signupEmail').value.trim().toLowerCase();
  const p=document.getElementById('signupPass').value;
  const p2=document.getElementById('signupPass2').value;
  if(p!==p2) return showErr('signupErr','Passwords do not match');
  // try Neon first
  try{
    const r=await fetch('/api/auth/signup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,password:p})});
    const j=await r.json();
    if(r.ok && j.ok){
      if(j.fallback){
        // no DB yet -> local fallback
        let users=getUsers();
        if(users.find(u=>u.email===email)) return showErr('signupErr','Email already exists — try Login');
        const user={name,email,password:p,isAdmin:email==='admin@sikogami.com'};
        users.push(user); setUsers(users); setCurrentUser(user);
      } else {
        setCurrentUser(j.user);
        // mirror to local for offline
        let users=getUsers();
        if(!users.find(u=>u.email===email)) { users.push({name,email,password:p,isAdmin:j.user.isAdmin}); setUsers(users); }
      }
      renderAuthArea(); renderLevels(); closeAuth();
      // sync any local progress to new account
      await syncProgressToNeon();
      toast(`Welcome ${name}! ${isAdmin()? '🔓 ADMIN — all levels unlocked + saved to Neon!': 'Account created — saved to Neon ✓'}`);
      return;
    } else {
      return showErr('signupErr', j.error || 'Signup failed');
    }
  }catch(err){
    // offline fallback
    let users=getUsers();
    if(users.find(u=>u.email===email)) return showErr('signupErr','Email already exists — try Login');
    const user={name,email,password:p,isAdmin:email==='admin@sikogami.com'};
    users.push(user); setUsers(users); setCurrentUser(user);
    renderAuthArea(); renderLevels(); closeAuth();
    toast(`Welcome ${name}! (offline mode)`);
  }
}
async function handleLogin(e){
  e.preventDefault();
  const email=document.getElementById('loginEmail').value.trim().toLowerCase();
  const p=document.getElementById('loginPass').value;
  try{
    const r=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password:p})});
    const j=await r.json();
    if(r.ok && j.ok){
      if(j.fallback){
        const users=getUsers();
        const u=users.find(x=>x.email===email && x.password===p);
        if(!u) return showErr('loginErr','Wrong email or password (offline)');
        setCurrentUser(u);
      } else {
        setCurrentUser(j.user);
      }
      renderAuthArea(); closeAuth();
      await loadProgressFromNeon();
      renderLevels();
      toast(`Welcome back ${getCurrentUser().name}! ${isAdmin()? '🔓 ADMIN — all 30 unlocked': 'Let\'s fold!'}`);
      return;
    } else {
      return showErr('loginErr', j.error || 'Login failed');
    }
  }catch(err){
    const users=getUsers();
    const u=users.find(x=>x.email===email && x.password===p);
    if(!u) return showErr('loginErr','Wrong email or password');
    setCurrentUser(u); renderAuthArea(); renderLevels(); closeAuth();
    toast(`Welcome back ${u.name}! (offline)`);
  }
}
async function handleForgot(e){
  e.preventDefault();
  const email=document.getElementById('forgotEmail').value.trim().toLowerCase();
  const np=document.getElementById('forgotPass').value;
  const el=document.getElementById('forgotErr');
  try{
    const r=await fetch('/api/auth/forgot',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,newPassword:np})});
    const j=await r.json();
    if(r.ok && j.ok){
      if(j.fallback){
        // local fallback
        let users=getUsers();
        const idx=users.findIndex(u=>u.email===email);
        if(idx===-1){ el.className='text-xs font-mono p-2 border bg-sick/10 border-sick text-sick'; el.textContent='No account with that email (offline)'; el.classList.remove('hidden'); return; }
        users[idx].password=np; setUsers(users);
        const cur=getCurrentUser(); if(cur && cur.email===email) setCurrentUser(users[idx]);
      }
      el.className='text-xs font-mono p-2 border bg-[#22c55e]/10 border-[#22c55e] text-[#166534]'; el.textContent=j.fallback?'✓ Password reset (offline) — now login':'✓ Password reset in Neon! Now login.'; el.classList.remove('hidden');
      setTimeout(()=> switchAuth('login'),1500);
      toast('Password reset ✓');
      return;
    } else {
      el.className='text-xs font-mono p-2 border bg-sick/10 border-sick text-sick'; el.textContent=j.error||'Reset failed'; el.classList.remove('hidden'); return;
    }
  }catch(err){
    let users=getUsers();
    const idx=users.findIndex(u=>u.email===email);
    if(idx===-1){ el.className='text-xs font-mono p-2 border bg-sick/10 border-sick text-sick'; el.textContent='No account with that email'; el.classList.remove('hidden'); return; }
    users[idx].password=np; setUsers(users);
    const cur=getCurrentUser(); if(cur && cur.email===email) setCurrentUser(users[idx]);
    el.className='text-xs font-mono p-2 border bg-[#22c55e]/10 border-[#22c55e] text-[#166534]'; el.textContent='✓ Password reset! (offline) Now login.'; el.classList.remove('hidden');
    setTimeout(()=> switchAuth('login'),1500);
    toast('Password reset ✓');
  }
}
function handleLogout(){
  setCurrentUser(null);
  renderAuthArea(); renderLevels();
  toast('Logged out — see you soon!');
}

// Utils
function toast(msg) {
  const t=document.getElementById('toast');
  t.textContent=msg; t.style.transform='translate(-50%, 0)';
  setTimeout(()=> t.style.transform='translate(-50%, 150%)', 3000);
}
function scrollToLevels(){ document.getElementById('levels').scrollIntoView({behavior:'smooth'}); }
function scrollToGarden(){ document.getElementById('garden').scrollIntoView({behavior:'smooth'}); }

// Theme
function toggleTheme(){
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('sikogami_theme', isDark?'dark':'light');
  updateThemeIcon();
}
function updateThemeIcon(){
  const btn = document.getElementById('themeBtn');
  if (!btn) return;
  const isDark = document.documentElement.classList.contains('dark');
  btn.textContent = isDark ? '☀️' : '🌙';
  btn.title = isDark ? 'Light mode' : 'Dark mode';
}

// Zen — improved immersive breathing + timer + dark fix
let zenInterval=null, zenTimerInterval=null, zenPlaying=true, breathIn=true, zenSeconds=0, zenCount=1, zenPattern='4-6';
const zenQuotes=["Paper remembers every gentle fold.","Breathe in the crease, out the calm.","One fold at a time, no rush.","Your garden grows with each breath.","Inhale paper, exhale stress."];
function toggleZen(){
  const z=document.getElementById('zenOverlay');
  const isHidden=z.classList.contains('hidden');
  if(isHidden){
    z.classList.remove('hidden');
    document.body.style.overflow='hidden';
    const btn=document.getElementById('zenBtn'); if(btn) btn.textContent='● ZEN MODE';
    zenSeconds=0; zenCount=1; breathIn=true; zenPlaying=true;
    const pb=document.getElementById('zenPlayBtn'); if(pb) pb.textContent='⏸︎ PAUSE';
    startBreathing(); startZenTimer();
    const q=document.getElementById('zenQuote'); if(q) q.textContent='"'+zenQuotes[Math.floor(Math.random()*zenQuotes.length)]+'"';
  } else {
    z.classList.add('hidden');
    document.body.style.overflow='';
    const btn=document.getElementById('zenBtn'); if(btn) btn.textContent='○ ZEN MODE';
    stopBreathing(); stopZenTimer();
  }
}
function getZenTimings(){
  if(zenPattern==='4-4') return {in:4, out:4};
  if(zenPattern==='4-7-8') return {in:4, hold:7, out:8};
  return {in:4, out:6}; // default 4-6
}
function startBreathing(){
  const el=document.getElementById('breathingPaper');
  const txt=document.getElementById('breathText');
  const cnt=document.getElementById('breathCount');
  if(!el||!txt) return;
  el.classList.add('breathing');
  const timings=getZenTimings();
  const update=()=>{
    if(!zenPlaying) return;
    breathIn=!breathIn;
    if(breathIn){ zenCount++; if(cnt) cnt.textContent=zenCount+' • Cycle'; }
    const label=breathIn? `INHALE • ${timings.in}s` : `EXHALE • ${timings.out}s`;
    txt.textContent=label;
    el.textContent=breathIn? '📄' : '🦢';
    el.style.transform= breathIn ? 'scale(1.18)' : 'scale(1)';
    const q=document.getElementById('zenQuote');
    if(zenCount%4===0 && q) q.textContent='"'+zenQuotes[Math.floor(Math.random()*zenQuotes.length)]+'"';
  };
  // initial
  txt.textContent=`INHALE • ${timings.in}s`;
  if(cnt) cnt.textContent=zenCount+' • Cycle';
  el.textContent='📄';
  const total= timings.hold ? timings.in+timings.hold+timings.out : timings.in+timings.out;
  zenInterval=setInterval(update, total*1000/2); // half cycle (in/out)
}
function stopBreathing(){
  clearInterval(zenInterval); zenInterval=null;
  const el=document.getElementById('breathingPaper');
  if(el) { el.classList.remove('breathing'); el.style.transform=''; }
}
function startZenTimer(){
  const el=document.getElementById('zenTimer');
  zenTimerInterval=setInterval(()=>{
    if(!zenPlaying) return;
    zenSeconds++;
    if(el){
      const m=String(Math.floor(zenSeconds/60)).padStart(2,'0');
      const s=String(zenSeconds%60).padStart(2,'0');
      el.textContent=`${m}:${s}`;
    }
  },1000);
}
function stopZenTimer(){ clearInterval(zenTimerInterval); zenTimerInterval=null; }
function toggleZenPlay(){
  zenPlaying=!zenPlaying;
  const b=document.getElementById('zenPlayBtn');
  if(b) b.textContent= zenPlaying? '⏸︎ PAUSE' : '▶ RESUME';
  const el=document.getElementById('breathingPaper');
  if(el) el.style.opacity= zenPlaying? '1' : '0.6';
}
function zenReset(){
  zenSeconds=0; zenCount=1; breathIn=true;
  const t=document.getElementById('zenTimer'); if(t) t.textContent='00:00';
  const c=document.getElementById('breathCount'); if(c) c.textContent='1 • Cycle';
  const txt=document.getElementById('breathText'); if(txt) txt.textContent='INHALE • 4s';
  const el=document.getElementById('breathingPaper'); if(el){ el.textContent='📄'; el.style.transform='scale(1)'; }
}
function zenChangePattern(v){ zenPattern=v; stopBreathing(); zenCount=1; breathIn=true; if(!document.getElementById('zenOverlay').classList.contains('hidden')) startBreathing(); toast('Pattern: '+v); }
let zenSound=false;
function toggleZenSound(){
  zenSound=!zenSound;
  const b=document.getElementById('zenSoundBtn');
  if(b) b.textContent= zenSound? '🔊' : '🔇';
  toast(zenSound? 'Ambient sound on (mock) — add real audio later' : 'Sound off');
}

document.addEventListener('DOMContentLoaded', async ()=>{
  updateProgressUI(); renderLevels(); renderGarden(); updateThemeIcon(); renderAuthArea();
  if(getCurrentUser()) await loadProgressFromNeon();
  setInterval(()=>{
    const h=document.getElementById('heroOrigami');
    if(h) h.style.transform=`rotate(${Math.sin(Date.now()/800)*3}deg)`;
  },50);
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
  // close auth when clicking outside? already handled via overlay
});

document.addEventListener('keydown', e=>{
  if(e.key==='Escape') { closeModal(); closeAuth(); const z=document.getElementById('zenOverlay'); if(!z.classList.contains('hidden')) toggleZen(); }
});
