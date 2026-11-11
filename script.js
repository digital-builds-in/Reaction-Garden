"use strict";
document.documentElement.classList.add("js");
/* ===== SCENE LIBRARY =====
   A scene is a set of keyframes. Nodes (atoms, text, chips, ring parts) keep their identity between frames and are tweened.
   p: {id:[x,y,opacity?,label?]}  absent = keep previous; b: bonds "a-b" | "a-b:2" | "a-b:3" | "a-b:d" (partial); a: curved electron-flow arrows [id,x1,y1,x2,y2,bend] */
const K={C:"#2b2b30",H:"#8b8574",O:"#dc2626",N:"#2563eb",Br:"#c2410c",I:"#7c3aed",F:"#0d9488",Cl:"#15803d",Na:"#b45309",M:"#475569",R:"#0f766e",Cr:"#a16207",P:"#9333ea",Ag:"#64748b",Pd:"#475569"};
const a=(l,c,r=15)=>({k:"a",l,c,r}),t=(l,s=11,c)=>({k:"t",l,s,c,r:0}),ch=(l,c)=>({k:"c",l,c,r:0}),HX={k:"h",r:27},CI={k:"k",r:0},SG={k:"s",r:0};
const F=(c,p,b=[],ar=[])=>({c,p,b,a:ar});
/* SN2 with backside attack, transition state and inversion (used only where SN2 really operates) */
function sn2(o){const u=d=>({h1:[165+d,40],h2:[149+d,124],h3:[181+d,124]});
return{n:{nu:a(o.nu,o.nc,17),c:a("C",K.C,16),lg:a(o.lg,K.Br,17),h1:a(o.s[0],K.H,12),h2:a(o.s[1],K.H,12),h3:a(o.s[2],K.H,13),ts:t("[ Nu···C···X ]‡",11)},
f:[F(o.c[0],{nu:[48,90],c:[165,90],lg:[262,90],...u(-16),ts:[165,168,0]},["c-lg","c-h1","c-h2","c-h3"],[["e1",62,74,148,78,-22],["e2",190,76,246,72,-18]]),
F(o.c[1],{nu:[100,90],lg:[230,90],...u(0),ts:[165,168,1]},["nu-c:d","c-lg:d","c-h1","c-h2","c-h3"]),
F(o.c[2],{nu:[112,90,1,o.nuo],lg:[268,90,1,o.lg+"⁻"],...u(16),ts:[165,168,0]},["nu-c","c-h1","c-h2","c-h3"])]}}
/* Electrophilic aromatic substitution: attack, sigma complex (non-aromatic cation), loss of H+ restores the ring */
function eas(o){const n={r:HX,rk:CI,rs:SG,E:ch(o.chip,o.chc),e:a(o.att,o.attc||K.R,o.ar||17),h:a("H",K.H,11)};
if(o.sub)n.x=a(o.sub,K.O,15);const sp=o.pos=="p"?[56,126]:[110,36],xb=o.sub?["r-x"]:[];
const f=[F(o.c[0],{r:[110,95],rk:[110,95,1],rs:[110,95,0],E:[236,38],e:[173,82,0],h:[151,46,0],...(o.sub?{x:sp}:{})},xb,[["e1",130,72,200,46,-20]]),
F(o.c[1],{rk:[110,95,0],rs:[110,95,1],E:[236,38,0],e:[173,82,1,o.att],h:[151,46,1]},[...xb,"r-e","r-h"]),
F(o.c[2],{rk:[110,95,1],rs:[110,95,0],h:[262,44,1,"H⁺"],...(o.att2?{e:[173,82,1,o.att2]}:{})},[...xb,"r-e"])];
if(o.post)f.push(F(o.post[1],{e:[173,82,1,o.post[0]]},[...xb,"r-e"]));return{n,f}}
/* Metal-mediated coupling (Wurtz, Wurtz-Fittig): pathway shown schematically, never as an aryl SN2 */
function coup(o){return{n:{x1:a("Br",K.Br,16),r1:a(o.l,o.lc,17),r2:a(o.r,K.R,17),x2:a("Br",K.Br,16),n1:a("Na",K.Na,15),n2:a("Na",K.Na,15)},
f:[F(o.c[0],{x1:[40,115],r1:[95,115],r2:[225,115],x2:[280,115],n1:[105,38],n2:[215,38]},["x1-r1","r2-x2"]),
F(o.c[1],{x1:[62,60],n1:[108,60],r1:[130,115,1,o.l+"·"],r2:[190,115,1,o.r+"·"],n2:[212,60],x2:[258,60]},["x1-n1","n2-x2"]),
F(o.c[2],{r1:[130,115,1,o.l],r2:[190,115,1,o.r]},["x1-n1","n2-x2","r1-r2"])]}}
const SC={
finkelstein:sn2({nu:"I⁻",nc:K.I,lg:"Br",nuo:"I",s:["H","H","CH₃"],c:["I⁻ approaches carbon from the side opposite Br (backside attack).","Transition state: carbon is partly bonded to both I and Br; the other three groups lie flat.","Br⁻ has left and the three groups have flipped (Walden inversion). NaBr is insoluble in dry acetone, so it precipitates and pulls the equilibrium towards R–I."]}),
williamson:sn2({nu:"RO⁻",nc:K.O,lg:"Br",nuo:"RO",s:["H","H","H"],c:["Alkoxide RO⁻ attacks a methyl/1° carbon from the back (SN2).","Transition state: partial C···O and C···Br bonds. Crowded 2°/3° carbons block this approach.","Br⁻ leaves and the ether R–O–CH₃ forms. With a 3° halide, RO⁻ acts as a base instead and gives an alkene (E2)."]}),
swarts:{n:{c:a("R",K.R,17),x:a("Br",K.Br,17),m:a("Ag",K.Ag,17),f:a("F⁻",K.F,16)},
f:[F("R–X meets a metal fluoride (AgF, Hg₂F₂, CoF₂ or SbF₃). The metal is halogen-hungry; F⁻ is the fluoride source.",{c:[120,90],x:[175,90],m:[250,55],f:[268,125]},["c-x"]),
F("The metal ion pulls on the halogen (C–X weakens) while fluoride is delivered to carbon. The exact pathway depends on the reagent and substrate, so this is a schematic.",{x:[190,90],m:[235,60],f:[70,90]},["c-x:d","m-x:d"]),
F("R–F forms and the metal halide (e.g. AgBr) separates. Freon-12 is made this way: SbF₃ with SbCl₅ catalyst exchanges Cl for F in CCl₄.",{c:[130,90],f:[80,90,1,"F"],x:[215,90],m:[255,90]},["c-f","x-m"])]},
wurtz:coup({l:"R",lc:K.R,r:"R",c:["Sodium transfers electrons to the C–X bonds of two R–X molecules in dry ether.","C–Br bonds break. Organosodium species (R–Na, a polar C–Na bond) and/or R· radicals form on the metal; a free R⁻ ion is not established.","The two R groups couple to give R–R and NaX. Smallest product is ethane, so methane cannot be made."]}),
wurtzfittig:coup({l:"Ph",lc:K.R,r:"R",c:["Na reacts with both aryl halide Ar–X and alkyl halide R–X in dry ether.","Both C–X bonds are cleaved by the metal (organosodium and/or radical species; the exact pathway is still debated). It is not an SN2 attack on the aromatic ring.","Ar and R couple to form Ar–R; Ar–Ar and R–R also form as by-products."]}),
aldol:{n:{c1:a("CH",K.C,16),o1:a("O",K.O,15),ca:a("CH₃",K.C,17),ha:a("H",K.H,11),oh:a("OH⁻",K.O,17),c2:a("CH",K.C,16),o2:a("O",K.O,15),cb:a("CH₃",K.C,17)},
f:[F("Step 1: OH⁻ removes an α-H from CH₃CHO (the CH₃ next to C=O).",{c1:[70,115],o1:[70,68],ca:[130,115],ha:[130,70],oh:[200,28],c2:[230,115],o2:[230,68],cb:[290,115]},["c1-ca","c1-o1:2","ca-ha","c2-o2:2","c2-cb"],[["e1",182,36,140,66,-14]]),
F("Enolate formed: the charge is shared between the α-carbon and oxygen (resonance). OH⁻ has become H₂O.",{ca:[130,115,1,"CH₂"],ha:[130,70,0],oh:[200,28,1,"H₂O"],o1:[70,68,1,"O⁻"]},["c1-ca:2","c1-o1","c2-o2:2","c2-cb"],[["e2",136,98,176,98,-24]]),
F("The α-carbon attacks the C=O carbon of a second aldehyde: a new C–C bond and an alkoxide. The first molecule is an aldehyde again.",{oh:[200,28,0],c2:[185,115],o2:[185,68,1,"O⁻"],cb:[245,115],ca:[130,115,1,"CH₂"],o1:[70,68,1,"O"]},["c1-ca","c1-o1:2","ca-c2","c2-o2","c2-cb"]),
F("The alkoxide takes H⁺ from water: 3-hydroxybutanal (CH₃CH(OH)CH₂CHO), an aldol. (Heat then removes H₂O to give but-2-enal.)",{o2:[185,68,1,"OH"],oh:[260,60,1,"OH⁻"],ca:[130,115,1,"CH₂"]},["c1-ca","c1-o1:2","ca-c2","c2-o2","c2-cb"])]},
cannizzaro:{n:{ra:a("R",K.R,15),ca:a("C",K.C,15),oa:a("O",K.O,14),ha:a("H",K.H,11),oh:a("OH⁻",K.O,16),rb:a("R",K.R,15),cb:a("C",K.C,15),ob:a("O",K.O,14),hb:a("H",K.H,11)},
f:[F("Two aldehyde molecules with no α-H (A on the left, B on the right) in conc. NaOH.",{ra:[40,100],ca:[95,100],oa:[95,52],ha:[95,148],oh:[30,25],rb:[290,100],cb:[235,100],ob:[235,52],hb:[235,148]},["ra-ca","ca-oa:2","ca-ha","rb-cb","cb-ob:2","cb-hb"],[["e1",44,36,86,90,18]]),
F("OH⁻ adds to the C=O carbon of A, giving a tetrahedral alkoxide.",{oh:[135,60,1,"OH"],oa:[95,52,1,"O⁻"]},["ra-ca","ca-oa","ca-oh","ca-ha","rb-cb","cb-ob:2","cb-hb"]),
F("Hydride transfer: A pushes out H⁻ (with its electron pair), which adds to the C=O carbon of B.",{ha:[165,148,1,"H⁻"],oa:[95,52,1,"O"]},["ra-ca","ca-oa:2","ca-oh","rb-cb","cb-ob:2","cb-hb"],[["e2",118,138,226,112,-30]]),
F("A has become a carboxylic acid (as RCOO⁻ in base: oxidised). B has become an alkoxide, then an alcohol (reduced): disproportionation.",{ha:[190,135,1,"H"],ob:[235,52,1,"O⁻"],oa:[95,52,1,"O"],oh:[135,60,1,"O⁻"]},["ra-ca","ca-oa:2","ca-oh","rb-cb","cb-ob","cb-hb","cb-ha"])]},
rosenmund:{n:{s:ch("Pd on BaSO₄ + poison",K.M),r:a("R",K.R,15),c:a("C",K.C,15),o:a("O",K.O,14),cl:a("Cl",K.Cl,15),h1:a("H",K.H,11),h2:a("H",K.H,11)},
f:[F("Acid chloride RCOCl and H₂ are adsorbed on a deliberately less active Pd catalyst (Pd/BaSO₄, treated with a poison such as quinoline–S).",{s:[160,160],r:[55,60],c:[110,60],o:[110,20],cl:[165,60],h1:[225,100],h2:[247,100]},["r-c","c-o:2","c-cl","h1-h2"]),
F("On the surface the C–Cl bond is cleaved and H–H is split (oxidative addition then hydrogen transfer).",{cl:[165,110],h1:[205,110],h2:[230,125]},["r-c","c-o:2","c-cl:d","h1-h2:d"]),
F("RCHO leaves and HCl forms. The moderated catalyst reduces RCHO to RCH₂OH only very slowly, so the product stops at the aldehyde.",{h1:[160,60],cl:[215,115],h2:[243,115]},["r-c","c-o:2","c-h1","cl-h2"])]},
stephen:{n:{r:a("R",K.R,16),c:a("C",K.C,16),n:a("N",K.N,16),hc:a("H",K.H,11),nh:a("H",K.H,11),o:a("O",K.O,16),sn:ch("SnCl₂ / HCl",K.Na),w:ch("H₃O⁺ / H₂O",K.N)},
f:[F("Nitrile R–C≡N in dry ether with SnCl₂ and HCl (a mild reducing system).",{r:[60,105],c:[130,105],n:[205,105],hc:[130,60,0],nh:[250,105,0],o:[205,105,0],sn:[230,40],w:[160,160,0]},["r-c","c-n:3"]),
F("Reduction adds 2 H (HCl first forms an imidoyl chloride, SnCl₂ supplies the electrons): the aldimine R–CH=NH, held as a tin complex. It stops here.",{hc:[130,60,1],nh:[250,105,1],n:[200,105],sn:[230,40,0]},["r-c","c-n:2","c-hc","n-nh"]),
F("Water (H₃O⁺) hydrolyses C=NH to C=O and releases NH₄⁺: aldehyde R–CHO.",{w:[160,160,1],n:[262,140,1,"NH₄⁺"],nh:[250,105,0],o:[205,105,1]},["r-c","c-o:2","c-hc"])]},
etard:{n:{r:HX,rk:CI,c:a("CH₃",K.C,17),cr:ch("CrO₂Cl₂ in CS₂",K.Cr),cx:ch("–O–CrCl₂(OH) ×2",K.Cr),w:ch("H₂O / H₃O⁺",K.N)},
f:[F("Toluene reacts with chromyl chloride in CS₂ (or CCl₄), a non-aqueous medium.",{r:[70,95],rk:[70,95,1],c:[140,95],cr:[235,38],cx:[240,95,0],w:[235,150,0]},["r-c"]),
F("The CH₃ group forms a brown organochromium adduct, the Etard complex, C₆H₅CH(OCrCl₂OH)₂. It can be isolated.",{cr:[235,38,0],cx:[240,95,1],c:[140,95,1,"CH"]},["r-c","c-cx"]),
F("Hydrolysis of the complex releases the aldehyde: benzaldehyde, C₆H₅CHO.",{cx:[240,95,0],w:[235,150,1],c:[140,95,1,"CHO"]},["r-c"])]},
clemmensen:{n:{r1:a("R",K.R,15),c:a("C",K.C,16),r2:a("R′",K.R,15),o:a("O",K.O,15),nn:a("N",K.N,15),nh:a("NH₂",K.N,17),hz:ch("N₂H₄",K.N),w:t("H₂O",12)},
f:[F("Ketone R₂C=O. Clemmensen: Zn(Hg)/conc. HCl reduces it on the metal surface (mechanism not fully settled). Wolff–Kishner route follows.",{r1:[70,118],c:[140,118],r2:[210,118],o:[140,75],nn:[140,75,0],nh:[140,32,0],hz:[240,38],w:[240,75,0]},["r1-c","c-r2","c-o:2"]),
F("Wolff–Kishner step 1: N₂H₄ condenses with C=O to form the hydrazone R₂C=N–NH₂ (H₂O lost).",{o:[140,75,0],nn:[140,75,1],nh:[140,32,1],hz:[240,38,0],w:[240,75,1]},["r1-c","c-r2","c-nn:2","nn-nh"]),
F("Step 2: KOH, ethylene glycol, heat: deprotonation, loss of N₂ and protonation convert C=N–NH₂ to CH₂. Result: R₂CH₂.",{nn:[225,40,1,"N₂↑"],nh:[140,32,0],w:[240,75,0],c:[140,118,1,"CH₂"]},["r1-c","c-r2"])]},
hvz:{n:{r:a("R",K.R,15),ca:a("CH₂",K.C,17),cc:a("C",K.C,15),o:a("O",K.O,15),x:a("OH",K.O,16),xb:a("Br",K.Br,16),bx:a("Br",K.Br,15),p:ch("red P + Br₂ → PBr₃",K.P)},
f:[F("Acid RCH₂COOH with red P and Br₂ (or Cl₂). P and X₂ form PX₃, which converts –COOH to the acyl halide –COX.",{r:[45,115],ca:[105,115],cc:[165,115],o:[165,65],x:[225,115],xb:[225,115,0],bx:[105,65,0],p:[235,32]},["r-ca","ca-cc","cc-o:2","cc-x"]),
F("The acyl halide enolises easily (C=C–OH), which the acid itself does not.",{x:[225,115,0],xb:[225,115,1],o:[165,65,1,"OH"],ca:[105,115,1,"CH"],p:[235,32,0]},["r-ca","ca-cc:2","cc-o","cc-xb"]),
F("Br₂ attacks the enol at the α-carbon: R–CHBr–COBr.",{bx:[105,65,1],o:[165,65,1,"O"],ca:[105,115,1,"CH"]},["r-ca","ca-cc","cc-o:2","cc-xb","ca-bx"]),
F("Water hydrolyses –COBr back to –COOH: the α-halo acid R–CHBr–COOH.",{x:[225,115,1],xb:[225,115,0]},["r-ca","ca-cc","cc-o:2","cc-x","ca-bx"])]},
fc:eas({chip:"R–C≡O⁺ AlCl₄⁻",chc:K.Na,att:"COR",sub:null,c:["Acylation shown: RCOCl + AlCl₃ → the acylium ion R–C≡O⁺ (resonance stabilised, does not rearrange). In alkylation the electrophile is the polarised R–Cl···AlCl₃ complex; a free carbocation is likely only for 3°.","The π electrons of benzene attack the electrophile, forming the sigma complex: a carbocation in which aromaticity is temporarily lost.","AlCl₄⁻ removes H⁺ (giving HCl + AlCl₃) and the aromatic ring is restored: C₆H₅COR."]}),
kolbeschmitt:eas({chip:"O=C=O (CO₂)",chc:K.M,att:"COO⁻",sub:"O⁻",pos:"o",c:["Sodium phenoxide (from phenol + NaOH) is dry-heated with CO₂ at about 400 K and 4–7 atm. The ring is strongly activated, especially at ortho.","The ortho carbon attacks the carbon of CO₂ (a weak electrophile) giving a sigma complex.","H⁺ shifts and aromaticity returns: sodium salicylate; acidification with H⁺ gives salicylic acid."]}),
reimer:eas({chip:":CCl₂",chc:K.Cl,att:"CCl₂⁻",att2:"CHCl₂",sub:"O⁻",pos:"o",ar:19,c:["Dichlorocarbene forms first: CHCl₃ + OH⁻ → ⁻CCl₃ + H₂O, then ⁻CCl₃ → :CCl₂ + Cl⁻. Phenoxide (in aq. NaOH, 340 K) attacks it at ortho.","The ortho carbon bonds to :CCl₂ (sigma complex).","The ring loses H⁺ and is aromatic again; the CCl₂⁻ group picks up a proton to become –CHCl₂.","Hydrolysis by aqueous alkali converts –CHCl₂ to –CHO: salicylaldehyde (after acidification)."],post:["CHO","Hydrolysis by aqueous alkali converts –CHCl₂ to –CHO: salicylaldehyde. (CCl₄ in place of CHCl₃ gives –COOH.)"]}),
gattermannkoch:eas({chip:"H–C≡O⁺",chc:K.M,att:"CHO",sub:null,c:["CO and HCl with AlCl₃ (CuCl co-catalyst, pressure) generate a formylating electrophile, often written H–C≡O⁺. This free ion has not been isolated; the active species may be a CO·HCl·AlCl₃ complex.","The ring attacks the formylating species (sigma complex).","H⁺ is lost and the ring is aromatic again: benzaldehyde (toluene gives mainly the para isomer)."]}),
diazocoupling:eas({chip:"Ar–N₂⁺",chc:K.N,att:"N=N–Ar",ar:22,sub:"O⁻",pos:"p",c:["Phenoxide (pH 9–10) is very electron-rich. The diazonium ion is a weak electrophile, so only strongly activated rings couple.","The para carbon attacks the terminal N of ArN₂⁺ (sigma complex stabilised by O⁻).","H⁺ is lost: the –N=N– azo link joins the two rings. Extended conjugation makes it a coloured azo dye."]}),
hoffmann:{n:{r:a("R",K.R,15),c:a("C",K.C,15),o:a("O",K.O,14),n:a("NH₂",K.N,17),br:a("Br",K.Br,15)},
f:[F("Primary amide RCONH₂ with Br₂ and NaOH.",{r:[60,100],c:[120,100],o:[120,52],n:[185,100],br:[250,100,0]},["r-c","c-o:2","c-n"]),
F("N is brominated, then deprotonated again: the bromoamide anion R–CO–N⁻–Br.",{n:[185,100,1,"N⁻"],br:[250,100,1]},["r-c","c-o:2","c-n","n-br"]),
F("R migrates from C to N while Br⁻ leaves (concerted rearrangement).",{r:[150,62],br:[285,40,1,"Br⁻"],n:[185,100,1,"N"]},["r-c:d","r-n:d","c-o:2","c-n"]),
F("The isocyanate R–N=C=O forms (R is now on N).",{r:[70,100],n:[135,100],c:[200,100],o:[262,100],br:[285,40,0]},["r-n","n-c:2","c-o:2"]),
F("OH⁻/H₂O add to the –N=C=O, giving a carbamate that loses CO₂ (as CO₃²⁻ in base): RNH₂ with one carbon fewer.",{r:[70,100],n:[135,100,1,"NH₂"],c:[215,100,1,"CO₃²⁻"],o:[262,100,0]},["r-n"])]},
gabriel:{n:{bz:ch("C₆H₄",K.M),c1:a("C",K.C,14),c2:a("C",K.C,14),o1:a("O",K.O,13),o2:a("O",K.O,13),n:a("N",K.N,16),hn:a("H",K.H,11),b:ch("KOH",K.N),rx:ch("R–X",K.R),r:a("R",K.R,16),x:t("X⁻",13)},
f:[F("Phthalimide: an N–H flanked by two C=O groups is unusually acidic. KOH (ethanolic) removes it.",{bz:[40,88],c1:[95,52],c2:[95,124],o1:[95,18],o2:[95,160],n:[145,88],hn:[190,88],b:[250,40],rx:[250,150,0],r:[225,88,0],x:[285,40,0]},["bz-c1","bz-c2","c1-o1:2","c2-o2:2","c1-n","c2-n","n-hn"]),
F("Potassium phthalimide: the N⁻ is a good nucleophile and, with no N–H left, can be alkylated only once.",{hn:[190,88,0],n:[145,88,1,"N⁻"],b:[250,40,0],rx:[250,150,1]},["bz-c1","bz-c2","c1-o1:2","c2-o2:2","c1-n","c2-n"]),
F("SN2 attack on a primary alkyl halide gives the N-alkylphthalimide. Aryl halides do not undergo this SN2, and 2°/3° halides mostly eliminate.",{rx:[250,150,0],n:[145,88,1,"N"],r:[215,88,1,"R"],x:[285,40,1]},["bz-c1","bz-c2","c1-o1:2","c2-o2:2","c1-n","c2-n","n-r"]),
F("Hydrolysis (aq. NaOH; or hydrazine) cleaves both C–N bonds: pure primary amine RNH₂ and phthalate.",{n:[195,88,1,"NH₂"],r:[250,88],c1:[95,52,1,"COO⁻"],c2:[95,124,1,"COO⁻"],o1:[95,18,0],o2:[95,160,0],x:[285,40,0]},["bz-c1","bz-c2","n-r"])]},
carbylamine:{n:{r:a("R",K.R,16),n:a("NH₂",K.N,17),c:a("C",K.C,15),cl1:a("Cl",K.Cl,14),cl2:a("Cl",K.Cl,14),cb:ch("CHCl₃ + KOH → :CCl₂",K.Cl)},
f:[F("Only primary amines RNH₂ react. KOH and CHCl₃ first make dichlorocarbene, :CCl₂.",{r:[55,100],n:[115,100],c:[175,100,0],cl1:[215,70,0],cl2:[215,130,0],cb:[235,38]},["r-n"]),
F("The N lone pair adds to the electron-poor carbene carbon: R–NH₂⁺–CCl₂⁻.",{n:[115,100,1,"NH₂⁺"],c:[175,100,1,"C⁻"],cl1:[215,70,1],cl2:[215,130,1],cb:[235,38,0]},["r-n","n-c","c-cl1","c-cl2"]),
F("Base removes the two N–H protons and Cl⁻ is lost twice: isocyanide R–N⁺≡C⁻ (foul smell). 2° and 3° amines lack two N–H and cannot do this.",{n:[115,100,1,"N⁺"],cl1:[215,60,0],cl2:[215,140,0]},["r-n","n-c:3"])]},
sandmeyer:{n:{r:HX,rk:CI,n2:a("N₂⁺",K.N,18),cu:ch("Cu(I)X",K.Cr),ra:t("Ar· (aryl radical)",11),x:a("X",K.Cl,15)},
f:[F("ArN₂⁺ X⁻ (made from ArNH₂ + NaNO₂ + HX at 273–278 K) meets Cu(I)X (Sandmeyer: CuCl, CuBr or CuCN). Gattermann uses Cu powder + HX.",{r:[70,95],rk:[70,95,1],n2:[135,95],cu:[240,40],ra:[70,150,0],x:[135,95,0]},["r-n2"],[["e1",242,52,160,88,-22]]),
F("Cu(I) donates one electron: C–N breaks, N₂ escapes and an aryl radical forms (the accepted radical mechanism).",{n2:[225,135,1,"N₂↑"],cu:[240,40,1,"Cu(II)X₂"],ra:[70,150,1]},[]),
F("The aryl radical takes X from Cu(II)X₂: Ar–X (Cl, Br or CN) and Cu(I) is regenerated.",{n2:[225,135,0],x:[135,95,1],cu:[240,40,1,"Cu(I)X"],ra:[70,150,0]},["r-x"])]},
kolbeelec:{n:{an:ch("Anode (+)",K.M),c1:ch("RCOO⁻",K.R),c2:ch("RCOO⁻",K.R),r1:a("R·",K.R,17),r2:a("R·",K.R,17),co1:t("CO₂↑",13),co2:t("CO₂↑",13)},
f:[F("Aqueous sodium carboxylate is electrolysed. At the anode each RCOO⁻ gives up one electron.",{an:[160,160],c1:[85,95],c2:[235,95],r1:[120,95,0],r2:[200,95,0],co1:[60,40,0],co2:[260,40,0]},[],[["e1",85,115,130,148,16],["e2",235,115,190,148,-16]]),
F("RCOO· loses CO₂ immediately, leaving alkyl radicals R· at the electrode.",{c1:[85,95,0],c2:[235,95,0],r1:[120,95,1],r2:[200,95,1],co1:[60,40,1],co2:[260,40,1]}),
F("Two R· radicals couple: R–R (e.g. 2 CH₃COONa → CH₃CH₃). At the cathode: 2H₂O + 2e⁻ → H₂ + 2OH⁻.",{r1:[132,95,1,"R"],r2:[188,95,1,"R"],co1:[60,40,0],co2:[260,40,0]},["r1-r2"])]},
fischer:{n:{r:a("R",K.R,15),c:a("C",K.C,15),o1:a("O",K.O,14),oh:a("OH",K.O,16),hp:ch("H⁺ (from H₂SO₄)",K.N),al:a("R′OH",K.O,19),w:t("H₂O",13)},
f:[F("Carboxylic acid with alcohol R′OH, conc. H₂SO₄ (catalyst and dehydrating agent), heat. H⁺ protonates the C=O oxygen, making carbon more electrophilic.",{r:[50,100],c:[110,100],o1:[110,52],oh:[170,100],hp:[220,35],al:[255,150],w:[250,100,0]},["r-c","c-o1:2","c-oh"],[["e1",126,56,218,48,20]]),
F("The alcohol oxygen adds to carbon: a tetrahedral intermediate (after proton transfers, one –OH is ready to leave as water).",{o1:[110,52,1,"OH"],al:[110,150,1,"OR′"],hp:[220,35,0]},["r-c","c-o1","c-oh","c-al"]),
F("H₂O leaves and C=O re-forms; loss of H⁺ gives the ester RCOOR′. All steps are reversible: excess alcohol or removing water drives it forward.",{o1:[110,52,1,"O"],oh:[235,100,1,"H₂O"],al:[170,100,1,"OR′"]},["r-c","c-o1:2","c-al"])]},
decarboxylation:{n:{r:a("R",K.R,16),c:a("C",K.C,15),o1:a("O",K.O,14),o2:a("O⁻",K.O,16),oh:ch("OH⁻ (soda lime)",K.Na)},
f:[F("Sodium carboxylate RCOONa is heated strongly with soda lime (NaOH + CaO).",{r:[60,100],c:[120,100],o1:[120,52],o2:[180,125],oh:[235,40]},["r-c","c-o1:2","c-o2"]),
F("OH⁻ attacks the carboxylate carbon and the C–R bond breaks, with its electron pair going to R (carbanion-like) which takes H⁺. The detailed solid-state mechanism is not simple.",{r:[45,100],oh:[205,36,1],c:[125,100]},["r-c:d","c-o1:2","c-o2","c-oh"]),
F("R–H escapes as a gas (one carbon fewer) and Na₂CO₃ remains. CaO keeps NaOH dry and protects the glass.",{r:[50,60,1,"R–H↑"],c:[170,100,1,"CO₃²⁻"],o1:[170,100,0],o2:[180,125,0],oh:[205,36,0]},[])]},
iodoform:{n:{me:a("CH₃",K.C,17),c:a("C",K.C,15),o:a("O",K.O,14),r:a("R",K.R,15),i:ch("I₂ + NaOH (NaOI)",K.I),oh:a("OH",K.O,15)},
f:[F("A methyl ketone R–CO–CH₃ (also CH₃CHO, or CH₃CH(OH)–R which NaOI first oxidises to a methyl ketone).",{me:[70,100],c:[130,100],o:[130,52],r:[190,100],i:[240,38],oh:[130,150,0]},["me-c","c-o:2","c-r"]),
F("In base all three α-H of CH₃ are replaced by I (enolate + I₂, three times): R–CO–CI₃.",{me:[70,100,1,"CI₃"],i:[240,38,0]},["me-c","c-o:2","c-r"]),
F("OH⁻ attacks the carbonyl carbon (tetrahedral intermediate).",{oh:[130,150,1],o:[130,52,1,"O⁻"]},["me-c","c-o","c-r","c-oh"]),
F("CI₃⁻ leaves and picks up H⁺: yellow CHI₃↓ (antiseptic smell). RCOO⁻ stays in solution.",{me:[55,60,1,"CHI₃↓"],oh:[130,150,1,"O"],o:[130,52,1,"O⁻"]},["c-o","c-r","c-oh:2"])]},
tollens:{n:{r:a("R",K.R,15),c:a("C",K.C,15),o:a("O",K.O,14),h:a("H",K.H,11),ag:ch("[Ag(NH₃)₂]⁺ / Cu²⁺, OH⁻",K.Ag),oh:a("O⁻",K.O,15),a1:a("Ag",K.Ag,13),a2:a("Ag",K.Ag,13)},
f:[F("An aldehyde R–CHO has a C–H on the carbonyl carbon. Mild oxidants: Tollens' [Ag(NH₃)₂]⁺ or Fehling's Cu²⁺ (tartrate complex), both in alkali.",{r:[60,100],c:[115,100],o:[115,52],h:[115,148],ag:[220,38],oh:[170,125,0],a1:[250,90,0],a2:[275,120,0]},["r-c","c-o:2","c-h"]),
F("In alkali, OH⁻ adds to the carbonyl carbon and the C–H electrons pass to the metal ion: the aldehyde is oxidised.",{h:[115,148,0],oh:[170,125,1,"OH"],ag:[220,38,1]},["r-c","c-o:2","c-oh"]),
F("Carboxylate RCOO⁻ forms. Tollens': Ag⁺ → Ag↓ (silver mirror). Fehling's: Cu²⁺ → red-brown Cu₂O↓ (aliphatic aldehydes only). Ketones do not react.",{oh:[170,125,1,"O⁻"],ag:[220,38,0],a1:[250,90,1],a2:[275,120,1]},["r-c","c-o:2","c-oh"])]},
lucas:{n:{c:a("C",K.C,16),r1:a("R",K.R,12),r2:a("R",K.R,12),r3:a("R",K.R,12),oh:a("OH",K.O,16),z:ch("conc. HCl + ZnCl₂",K.Cr),cl:a("Cl",K.Cl,16)},
f:[F("A 3° alcohol in Lucas reagent (conc. HCl + anhydrous ZnCl₂).",{c:[110,92],r1:[110,42],r2:[78,128],r3:[142,128],oh:[185,92],z:[235,38],cl:[170,92,0]},["c-r1","c-r2","c-r3","c-oh"]),
F("ZnCl₂/H⁺ coordinates to the oxygen: –OH becomes a good leaving group.",{oh:[200,92,1,"OH₂⁺"],z:[235,38,0]},["c-r1","c-r2","c-r3","c-oh:d"]),
F("Water leaves, giving a carbocation. This is easy for 3° (SN1), slower for 2°; a 1° alcohol cannot form a stable cation and is very slow in the cold.",{oh:[255,120,1,"H₂O"],c:[110,92,1,"C⁺"],r2:[72,115],r3:[148,115]},["c-r1","c-r2","c-r3"]),
F("Cl⁻ attacks the carbocation. Alkyl chloride is insoluble in the reagent: cloudy at once (3°), in about 5 min (2°), none at room temperature (1°).",{cl:[170,92,1],c:[110,92,1,"C"],oh:[255,120,0]},["c-r1","c-r2","c-r3","c-cl"])]},
hinsberg:{n:{a1:ch("R–NH₂ (1°)",K.N),a2:ch("R₂NH (2°)",K.N),a3:ch("R₃N (3°)",K.N),rg:t("+ C₆H₅SO₂Cl (Hinsberg's reagent)",11),p1:ch("ArSO₂NHR",K.R),p2:ch("ArSO₂NR₂",K.R),p3:ch("no reaction",K.M),s1:ch("dissolves",K.Cl),s2:ch("insoluble solid",K.Br),s3:ch("insoluble",K.M)},
f:[F("Three amine classes are treated with benzenesulphonyl chloride (a test-flow schematic, not an electron-pushing mechanism).",{a1:[55,34],a2:[160,34],a3:[265,34],rg:[160,68],p1:[55,95,0],p2:[160,95,0],p3:[265,95,0],s1:[55,150,0],s2:[160,150,0],s3:[265,150,0]}),
F("1° and 2° amines lose HCl and give sulphonamides. A 3° amine has no N–H to lose, so no sulphonamide forms.",{rg:[160,68,0],p1:[55,95,1],p2:[160,95,1],p3:[265,95,1]}),
F("Add aqueous NaOH. 1°: the leftover N–H is acidic, so the sodium salt dissolves. 2°: no N–H, insoluble. 3°: no reaction.",{s1:[55,150,1],s2:[160,150,1],s3:[265,150,1]})]},
cumene:{n:{r:HX,rk:CI,c:a("C",K.C,16),m1:a("CH₃",K.C,16),m2:a("CH₃",K.C,16),o2:ch("O₂ (air)",K.O),oo:ch("O–O–H",K.O),ph:ch("Phenol C₆H₅OH",K.R),ac:ch("Acetone CH₃COCH₃",K.Na),h3:ch("H₃O⁺",K.N)},
f:[F("Cumene (isopropylbenzene) has a weak tertiary benzylic C–H. Air oxidation is a radical chain that targets exactly that C–H.",{r:[60,100],rk:[60,100,1],c:[125,100],m1:[170,58],m2:[170,142],o2:[245,40],oo:[210,100,0],ph:[95,100,0],ac:[235,100,0],h3:[245,150,0]},["r-c","c-m1","c-m2"]),
F("Cumene hydroperoxide, PhC(CH₃)₂–O–O–H, forms.",{o2:[245,40,0],oo:[212,100,1]},["r-c","c-m1","c-m2","c-oo"]),
F("Acid-catalysed Hock rearrangement: the phenyl group shifts from carbon to oxygen (dashed bond) as H₂O leaves, so the carbon becomes a cation (oxocarbenium).",{h3:[245,150,1],r:[190,38],rk:[190,38],c:[125,100,1,"C⁺"],oo:[210,100,1],m1:[95,52],m2:[95,148]},["r-oo:d","c-oo","c-m1","c-m2"]),
F("Water adds and the intermediate splits into two useful products: phenol and acetone.",{h3:[245,150,0],r:[60,100,0],rk:[60,100,0],c:[125,100,0],m1:[170,58,0],m2:[170,142,0],oo:[210,100,0],ph:[95,100,1],ac:[235,100,1]},[])]},
balzschiemann:{n:{r:HX,rk:CI,n2:a("N₂⁺",K.N,18),bf:ch("BF₄⁻",K.F),ar:t("Ar⁺ (proposed)",11),f:a("F",K.F,15),b3:ch("BF₃",K.F)},
f:[F("Isolated, dry ArN₂⁺ BF₄⁻ (from ArN₂⁺Cl⁻ + HBF₄) is heated.",{r:[70,95],rk:[70,95,1],n2:[135,95],bf:[235,95],ar:[70,142,0],f:[135,95,0],b3:[235,150,0]},["r-n2"]),
F("N₂ leaves, giving a very reactive aryl cation next to BF₄⁻ (a proposed intermediate, never isolated).",{n2:[200,40,1,"N₂↑"],ar:[70,142,1]},[]),
F("F⁻ is transferred from BF₄⁻ to the ring: Ar–F + BF₃.",{n2:[200,40,0],bf:[235,95,0],f:[135,95,1],b3:[235,95,1],ar:[70,142,0]},["r-f"])]}};
/* ===== REACTION DATA (content only; no rendering logic) =====
   id stable key | g category | n name | eq [reactants, conditions, products] | bal balanced/net equation | ex worked example | why | f simple explanation
   c reagents & conditions | s mechanism steps (match scene frames) | r limitations | h memory hook | t exam trap | q/a typed self-test | ar assertion-reason | v scene key | kw search words */
const G=[["🔄","Swap the halogen","same carbon, new halogen"],["🧱","Join the pieces","snap two fragments into one"],["⚗️","Carbonyl tricks","C=O is the hotspot"],["🌸","Phenol & benzene","the ring has feelings too"],["💎","Amines & diazonium","nitrogen steals the show"],["🕵️","Lab detectives","colour, smell, precipitate"]];
const R=[
{id:"finkelstein",g:0,e:"🔁",n:"Finkelstein",v:"finkelstein",kw:"halogen exchange alkyl iodide sodium iodide acetone sn2 precipitate",eq:["R–X + NaI","dry acetone","R–I + NaX↓"],ex:"CH₃CH₂Br + NaI → CH₃CH₂I + NaBr↓ (dry acetone)",
why:"NaI dissolves in acetone but NaCl and NaBr do not. Removing NaX as a solid keeps shifting the reversible exchange towards R–I (Le Chatelier's principle).",
f:"Picture Br holding the carbon's hand. Iodide walks up with a better offer and taps in from the <b>opposite side</b>, so Br gets nudged out. The trick: acetone <i>welcomes</i> NaI but <i>rejects</i> NaBr. As NaBr drops out as a solid it is removed from the solution, so the balance keeps tipping towards the iodide product. 🚪",
c:["X = Cl or Br; reagent NaI","Solvent: dry acetone","Mechanism: S<sub>N</sub>2"],s:["<b>Approach 🚗</b> I⁻ attacks carbon from the back, directly opposite Br.","<b>Transition state ⚖️</b> Carbon is half-bonded to both I and Br while the other three groups flatten like an umbrella in the wind.","<b>Flip ☂️</b> Br⁻ leaves and the umbrella snaps inside-out (Walden inversion). NaBr precipitates, so the equilibrium shifts to the product side."],
r:["Works best with 1° halides (S<sub>N</sub>2); 3° halides react poorly","It is an equilibrium: precipitation, not irreversibility, drives it","Acetone must be <b>dry</b>"],
h:"Fin<b>K</b>elstein hides an <b>I</b>: the new halogen is Iodine, and NaX sinks out.",t:"Never say the reaction is 'irreversible'. NaX precipitation only shifts the equilibrium; wet acetone dissolves NaX and ruins it.",
q:"Why dry acetone?",a:"Water dissolves NaBr and NaCl, so nothing precipitates, the equilibrium is not shifted forward, and the reaction can run backwards.",
ar:["Finkelstein reaction can convert an alkyl chloride into an alkyl iodide.", "Iodide is a better leaving group than chloride.", "B"]},
{id:"swarts",g:0,e:"⚡",n:"Swarts",v:"swarts",kw:"alkyl fluoride silver fluoride antimony trifluoride freon chlorofluorocarbon",eq:["R–X + AgF (or Hg₂F₂, CoF₂, SbF₃)","heat","R–F + AgX↓"],
ex:"CH₃Br + AgF → CH₃F + AgBr↓. Freon-12: 3CCl₄ + 2SbF₃ → 3CCl₂F₂ + 2SbCl₃ (SbCl₅ catalyst)",
why:"F₂ is too violent, so a metal fluoride (AgF, Hg₂F₂, CoF₂ or SbF₃) is used to swap F for Cl/Br while a stable metal halide forms.",
f:"Getting fluorine onto carbon is awkward: F₂ is far too violent. So we hire a <b>metal fluoride</b> (AgF, Hg₂F₂, CoF₂, SbF₃). The metal helps pull the old halogen off while fluorine goes onto carbon. Same swap as Finkelstein, different guest. 🧲",
c:["R–Cl or R–Br + AgF, Hg₂F₂, CoF₂ or SbF₃","Heat","SbF₃ with SbCl₅ catalyst for freons"],s:["<b>Meet 🧲</b> The metal fluoride contacts R–X; the metal ion (Ag⁺, Sb³⁺ …) interacts with the halogen.","<b>Exchange ➡️</b> C–X weakens and F is delivered to carbon. The exact path depends on reagent and substrate (this is a schematic, not one universal S<sub>N</sub>2).","<b>Lock 🔒</b> The metal halide forms, leaving the strong C–F bond."],
r:["No single mechanism fits every substrate and reagent","Gives alkyl fluorides and freons (CCl₂F₂)","Different from Finkelstein: Swarts makes R–F, Finkelstein makes R–I"],
h:"<b>S</b>warts = <b>F</b>luorine: AgF, Hg₂F₂, CoF₂, SbF₃ are the fluorinators.",t:"Do not swap Swarts (R–F) with Finkelstein (R–I). Also do not quote a single S<sub>N</sub>2 path for every Swarts reagent.",
q:"Why not just use F₂?",a:"Direct fluorination is violently exothermic and wrecks the carbon chain; Swarts is a gentle exchange.",
ar:["Freon-12 (CCl₂F₂) can be made from CCl₄ and SbF₃.","SbF₃ is a metal fluoride that exchanges Cl for F in the Swarts reaction.","A"]},
{id:"wurtz",g:1,e:"🔗",n:"Wurtz",v:"wurtz",kw:"alkane coupling sodium dry ether alkyl halide",eq:["2R–X + 2Na","dry ether","R–R + 2NaX"],ex:"2CH₃Br + 2Na → CH₃–CH₃ + 2NaBr",
why:"Sodium is a strong reducing metal. It cleaves two C–X bonds and the two carbon groups join, forming a new C–C bond and 2 NaX.",
f:"Sodium loves giving electrons away. On the metal surface it breaks C–Br bonds, forming organosodium species (R–Na with a polar C–Na bond) and/or R· radicals. These then meet another R–X and two R groups click together like LEGO. 🧩 (A completely free R⁻ ion is not proven.)",
c:["Na metal","Dry ether (Na reacts with water)","Alkyl halides, preferably 1°"],s:["<b>Donate ⚡</b> Na gives electrons to the C–X bonds: R–Na-type and/or radical species form.","<b>Couple 🎯</b> Two R groups meet on the surface (textbooks draw R–Na attacking R–X in an S<sub>N</sub>2 manner; radical steps also contribute).","<b>Click 🔗</b> A new C–C bond forms and NaX drops out. The chain doubles."],
r:["Same halide → alkane with twice the carbons (even number)","Mixed halides → mixture of 3 alkanes","Cannot make methane; 3° halides mostly give alkenes"],
h:"Wire two R groups together with Na: R–X → R–R.",t:"Cannot make methane. Mixed halides give 3 alkanes, so use one halide. Do not write a free R⁻ as the proven intermediate.",
q:"Why can Wurtz not make methane?",a:"It joins two R groups, so the smallest product is ethane (R = CH₃).",
ar:["The Wurtz reaction with two different alkyl halides gives a poor yield of any one alkane.", "Sodium is a strong reducing agent.", "B"]},
{id:"williamson",g:1,e:"🌉",n:"Williamson Ether",v:"williamson",kw:"ether alkoxide sn2 elimination tert-butyl methyl ether",eq:["R–ONa + R′–X","heat","R–O–R′ + NaX"],ex:"CH₃CH₂ONa + CH₃CH₂Br → CH₃CH₂OCH₂CH₃ + NaBr",
why:"Alkoxide is a strong nucleophile. On an unhindered carbon it does S<sub>N</sub>2 and bridges two groups with oxygen. On a crowded carbon it acts as a base instead.",
f:"Alkoxide (RO⁻) is an oxygen with extra electrons and nowhere to put them. It spots a carbon wearing a leaving halide, swings in from behind, and oxygen becomes a <b>bridge</b> between two carbon groups: an ether. 🌉",
c:["Alkoxide (R–OH + Na)","Methyl or 1° alkyl halide","Mechanism: S<sub>N</sub>2"],s:["<b>Charge up 🔋</b> R–OH + Na → R–O⁻Na⁺ (and ½H₂ bubbles off).","<b>Swing in 🎯</b> RO⁻ attacks the carbon of R′–X from the back (S<sub>N</sub>2). This works only if that carbon is not crowded.","<b>Bridge 🌉</b> X⁻ leaves, and O now links R and R′."],
r:["Methyl and 1° halides are preferred: easy backside attack","2° gives a mixture; 3° halide → alkene (E2), since RO⁻ is a strong base","Put the bulky group on the alkoxide, not the halide"],
h:"Oxygen is the <b>bridge</b>: alkoxide + <b>1°</b> halide.",t:"A 3° halide gives an alkene, so put the bulky group on the alkoxide. Aryl halides do not react by S<sub>N</sub>2, so they are not used as the electrophile.",
q:"How do you make tert-butyl methyl ether?",a:"Use t-BuONa + CH₃Br. The reverse (NaOCH₃ + t-BuBr) gives an alkene by elimination.",
ar:["Sodium methoxide with tert-butyl bromide is a poor route to tert-butyl methyl ether.","A tertiary halide mainly undergoes elimination with a strongly basic alkoxide.","A"]},
{id:"aldol",g:2,e:"🏗️",n:"Aldol",v:"aldol",kw:"aldehyde enolate crotonaldehyde hydroxybutanal condensation alpha hydrogen",eq:["2 CH₃CHO","dil. NaOH","CH₃CH(OH)CH₂CHO"],ex:"CH₃CH(OH)CH₂CHO →(heat, –H₂O) CH₃CH=CHCHO (aldol condensation)",
why:"The α-H next to C=O is acidic because the enolate is resonance-stabilised. The enolate carbon is a nucleophile that adds to a second C=O.",
f:"The carbon next to C=O (the <b>α-carbon</b>) has an H that is easy to steal. Base steals it, leaving an <b>enolate</b>. Its carbon attacks a second aldehyde's slightly positive C=O carbon and builds a brand-new C–C bond. The product holds an <b>ald</b>ehyde and an alcoh<b>ol</b>: an aldol! 🏗️",
c:["Dilute NaOH, cold","At least one α-H","Heat → loses H₂O (condensation)"],s:["<b>Steal 🥷</b> OH⁻ removes an α-H.","<b>Enolate ✨</b> The resonance-stabilised enolate forms.","<b>Attack 🎯</b> The α-carbon bonds to the C=O carbon of a second aldehyde, giving an alkoxide.","<b>Grab H 💧</b> The alkoxide takes H⁺ from water: β-hydroxy aldehyde."],
r:["Needs at least one α-H","Dilute base: aldol; heat: loses H₂O to give C=C","HCHO and PhCHO have no α-H: no self-aldol"],
h:"<b>Ald</b>ehyde + alcoh<b>ol</b> = aldol. Heat it and it loses H₂O.",t:"No α-H (HCHO, PhCHO) means no aldol; Cannizzaro takes over in conc. base.",
q:"Why can benzaldehyde not do aldol?",a:"It has no α-hydrogen, so no enolate can form.",
ar:["Acetaldehyde undergoes aldol addition in dilute NaOH.", "On heating, the aldol product loses water to give an α,β-unsaturated aldehyde.", "B"]},
{id:"cannizzaro",g:2,e:"⚖️",n:"Cannizzaro",v:"cannizzaro",kw:"disproportionation hydride transfer formaldehyde benzaldehyde no alpha hydrogen",eq:["2 HCHO","conc. NaOH","CH₃OH + HCOONa"],bal:"2 HCHO + NaOH → CH₃OH + HCOONa",ex:"2 C₆H₅CHO + NaOH → C₆H₅CH₂OH + C₆H₅COONa",
why:"With no α-H there is no enolate. Strong base adds to C=O and the adduct passes H⁻ to another aldehyde: one molecule is oxidised, the other reduced.",
f:"Aldehydes with no α-H cannot make an enolate, so in strong base they trade roles: one molecule <b>gives away</b> a hydride (H⁻), the other <b>takes</b> it. The giver becomes an acid salt (oxidised), the taker becomes an alcohol (reduced). Same molecule, opposite jobs: a self-redox! 🎭",
c:["Concentrated NaOH or KOH","Aldehyde without α-H","Product pair: alcohol + carboxylate"],s:["<b>Start 🧪</b> Two aldehydes (no α-H) in conc. base.","<b>Attack 🎯</b> OH⁻ adds to the C=O carbon, forming a tetrahedral alkoxide.","<b>Hydride hop 🐸</b> That intermediate pushes out H⁻, which lands on the C=O carbon of a second aldehyde.","<b>Roles split 🎭</b> The donor ends as RCOO⁻ (oxidised); the acceptor as an alkoxide, then an alcohol."],
r:["Only aldehydes with <b>no α-H</b> (HCHO, ArCHO)","Concentrated NaOH/KOH","Crossed Cannizzaro: HCHO is oxidised (it is the better hydride donor)"],
h:"A 'cannibal' aldehyde: one molecule feeds its H⁻ to the other, so half becomes acid and half alcohol.",t:"Needs conc. base and no α-H. Dilute base with an α-H gives aldol.",
q:"Products of 2 HCHO + NaOH?",a:"CH₃OH (reduced) + HCOONa (oxidised).",
ar:["Formaldehyde undergoes the Cannizzaro reaction in conc. NaOH.","Formaldehyde contains no α-hydrogen.","A"]},
{id:"wurtz-fittig",g:1,e:"🧬",n:"Wurtz–Fittig",v:"wurtzfittig",kw:"alkylbenzene aryl halide alkyl halide sodium toluene biphenyl fittig",eq:["Ar–X + R–X + 2Na","dry ether","Ar–R + 2NaX"],ex:"C₆H₅Br + CH₃Br + 2Na → C₆H₅CH₃ + 2NaBr",
why:"Sodium cleaves both C–X bonds and the aryl and alkyl groups couple, giving an alkylbenzene. It is metal-mediated; the exact path is debated.",
f:"Wurtz's trick, but with one aryl partner and one alkyl partner. Na turns each halide into a reactive metal-bound (organosodium or radical) piece, and the aryl and alkyl pieces join to give an alkylbenzene. Expect Ar–Ar and R–R as side products. 🧬",
c:["Na metal","Dry ether","Aryl halide + alkyl halide"],s:["<b>Donate ⚡</b> Na reacts with Ar–X and R–X.","<b>Cleave ✂️</b> Both C–X bonds break (organosodium and/or radical species). This is not an S<sub>N</sub>2 attack on the aromatic ring.","<b>Join 🔗</b> Ar–R forms and NaX drops out."],
r:["Mechanism is metal-mediated and still debated","By-products: Ar–Ar (Fittig) and R–R","Aryl halides do not undergo classical backside S<sub>N</sub>2"],
h:"Wurtz + Fittig = <b>Ar</b>yl + <b>R</b>: an alkylbenzene.",t:"Fittig alone joins Ar–Ar (biphenyl). Do not mix the two up, and do not draw an aryl carbanion doing S<sub>N</sub>2 on a ring.",
q:"Bromobenzene + CH₃Br + Na gives?",a:"Toluene (C₆H₅–CH₃).",
ar:["Wurtz–Fittig reaction can give biphenyl and alkanes as by-products.","Aryl and alkyl halides can each couple with themselves in the presence of sodium.","A"]},
{id:"rosenmund",g:2,e:"🛑",n:"Rosenmund",v:"rosenmund",kw:"acid chloride aldehyde palladium barium sulphate poisoned catalyst hydrogenation benzoyl chloride",eq:["RCOCl + H₂","Pd/BaSO₄ (partly poisoned)","RCHO + HCl"],ex:"C₆H₅COCl + H₂ → C₆H₅CHO + HCl",
why:"Acid chlorides hydrogenolyse easily. A less active Pd catalyst reduces RCOCl to RCHO but is too weak to hydrogenate RCHO further.",
f:"Left alone, Pd would take the acid chloride all the way to an alcohol. We <b>tame the catalyst</b> (Pd on BaSO₄, plus a poison such as quinoline–sulphur) so it is active enough for C–Cl but too sluggish to reduce the aldehyde. 🛑",
c:["H₂ gas","Pd on BaSO₄","Poison: quinoline–S (or thiourea)"],s:["<b>Adsorb 🧲</b> RCOCl and H₂ stick to the catalyst surface.","<b>Swap 🔁</b> C–Cl is cleaved and H is delivered to the acyl carbon.","<b>Release ✋</b> RCHO and HCl leave. The moderated catalyst reduces RCHO to RCH₂OH only very slowly."],
r:["Catalyst activity is moderated, not switched off","HCHO cannot be made (HCOCl is unstable)","Works best for aromatic acid chlorides (benzoyl chloride → benzaldehyde)","Starting material is an acid chloride, not an acid"],
h:"<b>RO</b>senmund = <b>R</b>educe, <b>O</b>nly to the aldehyde: RCOCl → RCHO with a poisoned Pd brake.",t:"Poison it or you get RCH₂OH. It is Pd/BaSO₄, not plain Pd/C.",
q:"Why poison the catalyst?",a:"Otherwise the aldehyde over-reduces to a primary alcohol.",
ar:["Rosenmund reduction gives aldehydes and not primary alcohols.","The Pd/BaSO₄ catalyst is deliberately made less active (partially poisoned).","A"]},
{id:"stephen",g:2,e:"🪄",n:"Stephen",v:"stephen",kw:"nitrile aldehyde tin chloride imine reduction",eq:["R–C≡N","SnCl₂ + HCl, then H₃O⁺","R–CHO"],bal:"R–C≡N + 2[H] → R–CH=NH, then R–CH=NH + H₂O → R–CHO + NH₃ (as NH₄⁺ in the acid)",ex:"CH₃CN → CH₃CHO; C₆H₅CN → C₆H₅CHO",
why:"SnCl₂/HCl is a mild reducing system that adds two H and stops at the aldimine. Water then replaces C=NH by C=O.",
f:"SnCl₂/HCl is a gentle reducer: it adds H to the nitrile and stops at an <b>imine</b> (held as a tin complex). Water then swaps C=NH for C=O. 🪄",
c:["SnCl₂ + HCl (dry ether, HCl gas)","Then H₃O⁺ hydrolysis","Same carbon count as the nitrile"],s:["<b>Start 🧪</b> R–C≡N with SnCl₂/HCl.","<b>Reduce ➕</b> RCN + 2[H] → RCH=NH; mild conditions stop here.","<b>Hydrolyse 💧</b> H₃O⁺ turns C=NH into C=O and NH₄⁺ leaves."],
r:["Nitrile → aldehyde (same carbon count)","Best for aromatic and simple aliphatic nitriles","Stops at the imine because SnCl₂ is mild"],
h:"<b>S</b>tephen uses <b>Sn</b>Cl₂: R–CN → R–CHO.",t:"Three routes to aldehydes: Rosenmund (RCOCl), Stephen (RCN), Etard (toluene). LiAlH₄ would go to the amine.",
q:"Why not LiAlH₄?",a:"It would reduce all the way to an amine.",
ar:["Stephen reduction of RCN with SnCl₂/HCl followed by hydrolysis gives an aldehyde.","The reduction stops at the aldimine stage, which hydrolyses to R–CHO.","A"]},
{id:"etard",g:2,e:"🔆",n:"Etard",v:"etard",kw:"toluene benzaldehyde chromyl chloride carbon disulphide oxidation",eq:["C₆H₅CH₃","CrO₂Cl₂ in CS₂, then H₃O⁺","C₆H₅CHO"],bal:"C₆H₅CH₃ + 2 CrO₂Cl₂ → C₆H₅CH(OCrCl₂OH)₂ (Etard complex); H₃O⁺ → C₆H₅CHO",ex:"Toluene + CrO₂Cl₂ → C₆H₅CHO",
why:"Chromyl chloride oxidises the side-chain CH₃ in a non-aqueous solvent and forms an isolable brown complex. Hydrolysis of the complex releases the aldehyde.",
f:"Chromyl chloride oxidises the –CH₃ on the ring and forms a brown <b>organochromium complex</b> (the Etard complex). It is hydrolysed in a separate step, and only then is the aldehyde released. 🔆",
c:["CrO₂Cl₂ (chromyl chloride)","Solvent: CS₂ (or CCl₄)","Then H₃O⁺ hydrolysis"],s:["<b>Start 🧪</b> Toluene + CrO₂Cl₂ in CS₂.","<b>Complex 🟤</b> The side chain forms the Etard complex, C₆H₅CH(OCrCl₂OH)₂.","<b>Release 💧</b> Hydrolysis breaks the complex to give benzaldehyde."],
r:["Toluene → benzaldehyde (side-chain oxidation)","Non-aqueous solvent; complex is hydrolysed afterwards","Use only as a controlled route: KMnO₄ takes toluene to benzoic acid"],
h:"Etard: chromyl chloride makes a brown complex; water frees the CHO.",t:"Etard stops at CHO in practice. KMnO₄ would push toluene on to benzoic acid.",
q:"Why does Etard give an aldehyde and not benzoic acid?",a:"The aldehyde is held in the chromium complex and is released only on hydrolysis, so it is not over-oxidised.",
ar:["Toluene is converted to benzaldehyde by chromyl chloride in CS₂ followed by hydrolysis.","Benzoic acid is the main product of the Etard reaction.","C"]},
{id:"clemmensen-wolff-kishner",g:2,e:"🧹",n:"Clemmensen & Wolff–Kishner",v:"clemmensen",kw:"reduction carbonyl to methylene zinc amalgam hydrazine ketone alkane",eq:["R₂C=O","Zn–Hg/conc. HCl or N₂H₄/KOH","R₂CH₂"],bal:"Clemmensen: R₂C=O + 4[H] → R₂CH₂ + H₂O. Wolff–Kishner: R₂C=O + N₂H₄ → R₂C=N–NH₂ → R₂CH₂ + N₂",ex:"CH₃COCH₃ → CH₃CH₂CH₃; C₆H₅COCH₃ → C₆H₅CH₂CH₃",
why:"Both remove the carbonyl oxygen entirely and leave CH₂. One works in acid, the other in base, so you choose by what else is in the molecule.",
f:"Two ways to <b>sweep the oxygen off</b> a carbonyl and leave CH₂. One uses acid, the other base, so you pick by what your molecule can survive. 🧹",
c:["Clemmensen: Zn–Hg, conc. HCl (acidic)","Wolff–Kishner: N₂H₄, then KOH, ethylene glycol, heat (basic)","Works for aldehydes and ketones"],s:["<b>Start 🧪</b> R₂C=O. Clemmensen reduces it on a zinc surface (its mechanism is not fully settled).","<b>Hydrazone 🧫</b> Wolff–Kishner: C=O + N₂H₄ → R₂C=N–NH₂ (–H₂O).","<b>N₂ leaves 🔥</b> KOH, heat: loss of N₂ and protonation give R₂CH₂."],
r:["C=O becomes CH₂, not CH–OH","Acid-sensitive molecule → Wolff–Kishner; base-sensitive → Clemmensen","Clemmensen is the textbook route for aryl ketones"],
h:"<b>C</b>lemmensen = <b>C</b>onc. HCl (acid). Wolff–<b>K</b>ishner = <b>K</b>OH (base).",t:"Both give CH₂, not CH–OH. Choose by what the molecule survives, not by the carbonyl type.",
q:"Which route for an acid-sensitive molecule?",a:"Wolff–Kishner, since it runs in base.",
ar:["Clemmensen reduction uses zinc amalgam and conc. HCl.", "Wolff–Kishner reduction uses hydrazine and KOH.", "B"]},
{id:"hvz",g:2,e:"🎈",n:"Hell–Volhard–Zelinsky",v:"hvz",kw:"alpha halogenation carboxylic acid red phosphorus bromine chloroacetic acid",eq:["RCH₂COOH + X₂","red P (cat.), then H₂O","RCH(X)COOH + HX"],ex:"CH₃COOH + Cl₂ → ClCH₂COOH + HCl (red P)",
why:"The acid itself enolises poorly. Red P and X₂ form PX₃, which converts it to an acyl halide that enolises easily, so X₂ adds at the α-carbon.",
f:"Acids are hard to halogenate at the α-carbon. Red P makes an <b>acyl halide</b>, which enolises easily. X₂ hits the α-carbon, and water turns it back into the acid. 🎈",
c:["Cl₂ or Br₂","Red phosphorus (or PX₃)","Needs an α-H"],s:["<b>Activate ⚙️</b> RCH₂COOH + PX₃ → RCH₂COX.","<b>Enolise 🔀</b> The acyl halide forms an enol.","<b>Halogenate 🎯</b> X₂ reacts at the α-carbon: RCHXCOX.","<b>Hydrolyse 💧</b> H₂O gives RCHXCOOH."],
r:["Needs an α-H","Halogen goes only to the α-carbon","Cl₂ or Br₂ with red P"],
h:"<b>H</b>alogen goes to <b>α</b>: Red P + X₂ on an acid.",t:"X lands on the α-carbon, not the COOH carbon, and needs an α-H.",
q:"Which carbon gets the halogen?",a:"The α-carbon, next to COOH.",
ar:["Acetic acid with Cl₂ and red P gives chloroacetic acid.","The halogen replaces the hydrogen of the –COOH group.","C"]},
{id:"friedel-crafts",g:3,e:"🔥",n:"Friedel–Crafts",v:"fc",kw:"alkylation acylation aluminium chloride benzene acetophenone electrophilic aromatic substitution acylium",eq:["C₆H₆ + R–Cl (or RCOCl)","anhyd. AlCl₃","C₆H₅R (or C₆H₅COR) + HCl"],bal:"C₆H₆ + RCl → C₆H₅R + HCl; C₆H₆ + RCOCl → C₆H₅COR + HCl",ex:"C₆H₆ + CH₃COCl → C₆H₅COCH₃ + HCl (acetophenone)",
why:"AlCl₃ makes a strong electrophile. The electron-rich ring attacks it, then loses H⁺ to regain aromaticity: electrophilic aromatic substitution.",
f:"Benzene's ring is electron-rich but lazy. AlCl₃ helps pull Cl off the reagent, making a hungry electrophile. The ring donates two electrons, then ejects H⁺ to stay aromatic. 🔥",
c:["Alkylation: R–Cl + AlCl₃","Acylation: RCOCl + AlCl₃ (acylium ion RCO⁺)","Anhydrous conditions"],s:["<b>Make the electrophile ⚙️</b> Alkylation: a polarised R–Cl···AlCl₃ complex (a free R⁺ mainly for 3°). Acylation: acylium ion RC≡O⁺.","<b>Ring attacks 🎯</b> π electrons bond to the electrophile: sigma complex.","<b>Restore 💍</b> H⁺ leaves and aromaticity returns."],
r:["Alkylation can rearrange and over-alkylate; acylation does neither","Fails on strongly deactivated rings (nitrobenzene) and aniline (N binds AlCl₃)","AlCl₃ must be anhydrous"],
h:"Alkylation = R–Cl. Acylation = RCOCl. Both need AlCl₃.",t:"Do not say a free carbocation always forms. Acylation does not rearrange; alkylation can.",
q:"Why does acylation not rearrange?",a:"The acylium ion (RCO⁺) is resonance-stabilised.",
ar:["Benzene reacts with acetyl chloride and anhydrous AlCl₃ to give acetophenone.", "The electrophile in this reaction is the acetate ion.", "C"]},
{id:"kolbe-schmitt",g:3,e:"🧂",n:"Kolbe–Schmitt",old:"Kolbe's",v:"kolbeschmitt",kw:"salicylic acid phenoxide carbon dioxide aspirin carboxylation",eq:["C₆H₅ONa + CO₂","400 K, 4–7 atm, then H⁺","o-HOC₆H₄COOH"],ex:"C₆H₅ONa + CO₂ → o-HOC₆H₄COONa; H⁺ → salicylic acid",
why:"Phenoxide is much more electron-rich than phenol, so even weakly electrophilic CO₂ is attacked at ortho.",
f:"Phenoxide's ring is extra electron-rich, especially at the <b>ortho</b> position. Even weak CO₂ gets attacked there. Acid then gives salicylic acid, the parent of aspirin. 💊",
c:["Sodium phenoxide (phenol + NaOH)","CO₂, 400 K, 4–7 atm","Then H⁺"],s:["<b>Make phenoxide 🔋</b> Phenol + NaOH → C₆H₅O⁻Na⁺.","<b>Attack 🎯</b> The ortho carbon bonds to CO₂.","<b>Acidify 🧪</b> H⁺ gives salicylic acid."],
r:["Phenoxide carboxylation, not electrolysis","Salicylic acid + (CH₃CO)₂O → aspirin","Ortho product is the textbook one"],
h:"Kolbe–Schmitt: phenoxide + CO₂ → <b>ortho</b> acid (salicylic).",t:"Kolbe–Schmitt (phenoxide, salicylic acid) is not Kolbe electrolysis (carboxylate, alkane).",
q:"Why use phenoxide, not phenol?",a:"Phenoxide is far more electron-rich, so weak CO₂ can be attacked.",
ar:["Phenol reacts with CO₂ directly under neutral conditions to give salicylic acid.", "The phenoxide ion is more reactive than phenol towards electrophiles.", "D"]},
{id:"reimer-tiemann",g:3,e:"🌀",n:"Reimer–Tiemann",v:"reimer",kw:"salicylaldehyde phenol chloroform dichlorocarbene formylation",eq:["C₆H₅OH + CHCl₃","aq. NaOH, 340 K","o-HOC₆H₄CHO"],bal:"C₆H₅OH + CHCl₃ + 4NaOH → NaOC₆H₄CHO + 3NaCl + 3H₂O (then H⁺ gives salicylaldehyde)",ex:"Phenol + CHCl₃ + aq. NaOH → salicylaldehyde",
why:"Base converts CHCl₃ into the electrophile :CCl₂. Phenoxide attacks it at ortho and hydrolysis turns –CHCl₂ into –CHO.",
f:"In base, chloroform loses H⁺ then Cl⁻, forming <b>dichlorocarbene (:CCl₂)</b>, a neutral but electron-hungry species. The phenoxide ring attacks it at the ortho spot, and hydrolysis turns –CHCl₂ into –CHO. 🌀",
c:["CHCl₃ + aq. NaOH","340 K","Then H⁺"],s:["<b>Carbene birth 👶</b> CHCl₃ + OH⁻ → ⁻CCl₃ → :CCl₂ + Cl⁻.","<b>Ring attacks 🎯</b> The ortho carbon bonds to :CCl₂.","<b>Restore 💍</b> Aromaticity returns: –CHCl₂.","<b>Hydrolyse 💧</b> –CHCl₂ → –CHO: salicylaldehyde."],
r:["Mainly ortho (some para); ortho is favoured partly by ion-pairing/chelation of the phenoxide O⁻ with Na⁺","Electrophile = :CCl₂","With CCl₄ the product has –COOH (salicylic acid)"],
h:"Chloroform → :CCl₂ → <b>CHO</b> at ortho.",t:"CHCl₃ gives –CHO; CCl₄ gives –COOH.",
q:"Which species attacks the ring?",a:"Dichlorocarbene, :CCl₂.",
ar:["The Reimer–Tiemann reaction is carried out in strongly acidic medium.", "Dichlorocarbene is generated from chloroform in the presence of a strong base.", "D"]},
{id:"gattermann-koch",g:3,e:"💨",n:"Gattermann–Koch",v:"gattermannkoch",kw:"formylation benzaldehyde carbon monoxide hydrochloric acid aluminium chloride copper chloride",eq:["C₆H₆ + CO + HCl","anhyd. AlCl₃ / CuCl","C₆H₅CHO"],bal:"C₆H₆ + CO → C₆H₅CHO (HCl, AlCl₃ and CuCl act as catalysts)",ex:"C₆H₆ + CO + HCl → C₆H₅CHO; toluene → p-CH₃C₆H₄CHO",
why:"CO with HCl and AlCl₃ forms a formylating electrophile that the ring attacks, so a –CHO group is added by electrophilic substitution.",
f:"CO and HCl team up with AlCl₃ (and CuCl) to make a <b>formylating electrophile</b>, often drawn as H–C≡O⁺, though that free ion has not been isolated. Benzene's ring attacks it, so it is a Friedel–Crafts-type reaction that adds a CHO. 💨",
c:["CO + HCl","Anhydrous AlCl₃ with CuCl","Elevated pressure"],s:["<b>Build the electrophile ⚙️</b> CO + HCl + AlCl₃/CuCl → a formylating species (H–C≡O⁺ is a convenient drawing).","<b>Ring attacks 🎯</b> π electrons bond to it.","<b>Restore 💍</b> H⁺ leaves; benzaldehyde forms."],
r:["Benzene or alkylbenzenes → aromatic aldehydes","Not suitable for phenols and many deactivated rings","Free HCO⁺ is a model, not an isolated species"],
h:"CO + HCl acts like 'fake HCHO': it adds a CHO.",t:"Gattermann–Koch (CO/HCl) is not Gattermann (diazonium + Cu).",
q:"What kind of species attacks the ring?",a:"A formylating electrophile (often written as the formyl cation, HCO⁺).",
ar:["Gattermann–Koch reaction can be used to prepare benzaldehyde from benzene.", "The reagent HCOCl is a stable liquid that can be stored and added directly.", "C"]},
{id:"hoffmann-bromamide",g:4,e:"📉",n:"Hoffmann Bromamide",v:"hoffmann",kw:"degradation amide primary amine isocyanate rearrangement bromine sodium hydroxide one carbon less",eq:["RCONH₂ + Br₂ + 4NaOH","heat","RNH₂ + Na₂CO₃ + 2NaBr + 2H₂O"],ex:"CH₃CH₂CONH₂ → CH₃CH₂NH₂ (propanamide → ethanamine)",
why:"Br₂/NaOH sets up a rearrangement in which R moves from C to N, making an isocyanate that is hydrolysed. The carbonyl carbon is lost as carbonate.",
f:"The amide loses its C=O carbon, so the amine has <b>one carbon fewer</b>. Br₂/NaOH sets up a rearrangement where R slides from carbon to nitrogen, making an isocyanate. Water then cuts out CO₂. 📉",
c:["Br₂ + NaOH (aq)","Warm","Primary amide"],s:["<b>Start 🧪</b> RCONH₂ + Br₂/NaOH.","<b>Brominate 🔁</b> RCONHBr → RCON⁻Br.","<b>Slide 🛷</b> R migrates from C to N as Br⁻ leaves.","<b>Isocyanate 🔗</b> R–N=C=O.","<b>Hydrolyse 💧</b> OH⁻/H₂O → RNH₂ + CO₃²⁻."],
r:["Amine has 1 carbon less than the amide","Gives 1° amines only","Migrating group keeps its configuration"],
h:"The R group <b>hops</b> from C to N, so the amine is <b>one carbon shorter</b>.",t:"Count carbons: amide with n C gives amine with n–1 C.",
q:"Product from propanamide?",a:"Ethanamine (C₂H₅NH₂).",
ar:["Hoffmann bromamide reaction of propanamide gives propanamine.", "The amine formed has one carbon atom fewer than the amide.", "D"]},
{id:"gabriel",g:4,e:"🔐",n:"Gabriel Phthalimide",v:"gabriel",kw:"primary amine phthalimide potassium alkyl halide hydrazine",eq:["Phthalimide + KOH, then R–X","then NaOH(aq)","R–NH₂"],ex:"Phthalimide + CH₃CH₂Br → CH₃CH₂NH₂",
why:"Phthalimide has one acidic N–H, so its anion can be alkylated only once. Hydrolysis then frees the pure primary amine.",
f:"Ammonia over-reacts into a messy mix of amines. Phthalimide is ammonia with <b>two bodyguards</b> on N, so it can be alkylated only once. Then the guards are removed. 🔐",
c:["Phthalimide + KOH (ethanolic)","Primary alkyl halide R–X","Then NaOH(aq) or hydrazine"],s:["<b>Spot the acid H 🔎</b> The N–H sits between two C=O groups, so it is unusually acidic.","<b>Deprotonate 🔋</b> KOH removes it: potassium phthalimide, with a nucleophilic N⁻.","<b>Alkylate 🎯</b> N⁻ attacks R–X (S<sub>N</sub>2).","<b>Free it 🗝️</b> N-alkylphthalimide + NaOH(aq) → RNH₂ + phthalate."],
r:["Pure 1° aliphatic amines only","Best with 1° alkyl halides; 2°/3° eliminate","Aryl halides do not react (no S<sub>N</sub>2), so no aromatic amines"],
h:"The phthalimide <b>guards</b> N so it reacts only once: pure 1° amine.",t:"Only 1° aliphatic amines. No aniline, since aryl halides will not do S<sub>N</sub>2.",
q:"Why can aniline not be made this way?",a:"Aryl halides do not undergo S<sub>N</sub>2, so N cannot attach to the ring.",
ar:["Aniline cannot be prepared by Gabriel phthalimide synthesis.","Aryl halides do not undergo nucleophilic substitution with the phthalimide anion.","A"]},
{id:"carbylamine",g:4,e:"🤢",n:"Carbylamine",v:"carbylamine",kw:"isocyanide primary amine test chloroform potassium hydroxide foul smell isonitrile",eq:["R–NH₂ + CHCl₃ + 3KOH","heat","R–NC + 3KCl + 3H₂O"],ex:"C₆H₅NH₂ → C₆H₅NC (phenyl isocyanide)",
why:"Only a primary amine has the two N–H bonds needed to lose two HCl after adding to dichlorocarbene, ending as an isocyanide.",
f:"Only <b>primary</b> amines have two N–H to give up. They catch :CCl₂ from CHCl₃ + KOH and become an <b>isocyanide</b>, which stinks. A smell test for 1° amines! 🤢",
c:["CHCl₃ + alcoholic KOH","Warm","Primary amine (aliphatic or aromatic)"],s:["<b>Carbene 👶</b> CHCl₃ + KOH → :CCl₂.","<b>Attack 🎯</b> RNH₂ bonds to :CCl₂ through N.","<b>Eliminate ✂️</b> Two HCl leave, giving R–N⁺≡C⁻."],
r:["A test for 1° amines only","2° and 3° amines do not respond","Product is an isocyanide (R–NC), not a nitrile"],
h:"<b>Carbyl</b>amine = <b>stink</b>: 1° amine + CHCl₃ + KOH gives a foul isocyanide.",t:"Only 1° amines respond. The product is R–NC (isocyanide), not R–CN.",
q:"Why only 1° amines?",a:"They have two N–H bonds to lose; 2° and 3° amines do not.",
ar:["Dimethylamine gives a positive carbylamine test.","Only primary amines have two N–H bonds available to lose as HCl.","D"]},
{id:"sandmeyer-gattermann",g:4,e:"🎭",n:"Sandmeyer & Gattermann",v:"sandmeyer",kw:"diazonium chloride bromide cyanide copper halogen replacement aryl",eq:["ArN₂⁺Cl⁻","CuCl / CuBr / CuCN","Ar–Cl / Ar–Br / Ar–CN + N₂↑"],ex:"C₆H₅N₂⁺Cl⁻ + Cu₂Br₂/HBr → C₆H₅Br + N₂. Gattermann: Cu powder + HBr also gives C₆H₅Br",
why:"A diazonium group leaves as N₂, an excellent leaving group. Copper delivers the new group to the ring.",
f:"A diazonium group is a superb leaving group: N₂ just bubbles away. That frees the ring for a new partner (Cl, Br or CN) delivered by copper. 🎭",
c:["Diazotisation: ArNH₂ + NaNO₂ + HX, 273–278 K","Sandmeyer: Cu(I) salts (CuCl, CuBr, CuCN)","Gattermann: Cu powder + HCl/HBr"],s:["<b>Make it 🧪</b> ArN₂⁺X⁻ is made at 273–278 K.","<b>Electron hop 🔄</b> Cu(I) gives an electron: N₂ leaves, an aryl radical forms.","<b>Capture 💨</b> Ar· takes X from Cu(II)X₂ → Ar–X."],
r:["Sandmeyer: Cu(I) salts; Gattermann: Cu powder + HX (lower yield)","Keep diazotisation at 273–278 K","ArI: KI (no copper); ArF: HBF₄ (Balz–Schiemann); ArH: H₃PO₂"],
h:"<b>S</b>andmeyer = Cu(I) <b>s</b>alts. <b>G</b>attermann = Cu <b>g</b>round-up powder.",t:"Gattermann here (Cu + HX on diazonium) is not Gattermann–Koch (CO + HCl on benzene).",
q:"Why keep diazotisation at 273–278 K?",a:"Above that, the diazonium salt decomposes to phenol and N₂.",
ar:["Fluorobenzene is not made from a diazonium salt by the Sandmeyer reaction.","Aryl fluorides are made through the diazonium fluoroborate (Balz–Schiemann reaction).","B"]},
{id:"diazo-coupling",g:4,e:"🌈",n:"Diazo Coupling",v:"diazocoupling",kw:"azo dye phenol aniline diazonium electrophilic substitution para",eq:["ArN₂⁺ + Ar′–OH / Ar′–NH₂","pH 9–10 (phenol), 4–5 (amine)","Ar–N=N–Ar′ (azo dye)"],ex:"C₆H₅N₂⁺Cl⁻ + C₆H₅OH → p-HOC₆H₄–N=N–C₆H₅ (orange); with aniline → p-aminoazobenzene (yellow)",
why:"The diazonium ion is a weak electrophile and attacks strongly activated rings. The new –N=N– link extends conjugation, so the product is coloured.",
f:"The diazonium ion is a weak electrophile. An electron-rich ring (phenoxide or aniline) attacks it at the <b>para</b> position, and the new –N=N– link makes a coloured <b>azo dye</b>. 🌈",
c:["Phenol: mildly alkaline (pH 9–10)","Aromatic amine: mildly acidic (pH 4–5)","Cold (273–278 K)"],s:["<b>Activate 🔋</b> Phenoxide (or aniline) is very electron-rich.","<b>Attack 🎯</b> The para carbon bonds to the terminal N of ArN₂⁺.","<b>Colour on 🎨</b> –N=N– joins both rings: an azo dye."],
r:["pH control is essential (too acidic: amine protonated; too alkaline: diazonium converts)","Couples at para; ortho if para is blocked","Needs a strongly activated ring"],
h:"The <b>–N=N–</b> bridge joins two rings, and colour appears.",t:"Wrong pH kills it: phenol needs mild base, amine needs mild acid.",
q:"What makes the product coloured?",a:"Extended conjugation across the –N=N– azo link.",
ar:["Benzenediazonium chloride couples with phenol in mildly alkaline medium.","In alkaline medium phenol is converted into the more reactive phenoxide ion.","A"]},
{id:"kolbe-electrolysis",g:1,e:"⚡",n:"Kolbe Electrolysis",v:"kolbeelec",kw:"electrolysis sodium acetate ethane anode radicals alkane",eq:["2 RCOO⁻Na⁺ + 2H₂O","electrolysis","R–R + 2CO₂ + H₂ + 2NaOH"],ex:"2 CH₃COONa → CH₃CH₃ (ethane) at the anode",
why:"At the anode carboxylate loses an electron and CO₂, leaving R· radicals that couple. Water is reduced at the cathode.",
f:"Current strips an electron from each carboxylate. CO₂ drops off and two <b>R· radicals</b> pair up at the anode. It is Wurtz's twin, powered by electricity instead of sodium. ⚡",
c:["Concentrated aqueous RCOONa","Electrolysis","Anode: R–R + CO₂; cathode: H₂ + NaOH"],s:["<b>Oxidise 🔋</b> RCOO⁻ → RCOO· + e⁻ at the anode.","<b>Drop CO₂ 💨</b> RCOO· → R· + CO₂.","<b>Pair up 🔗</b> 2R· → R–R. At the cathode 2H₂O + 2e⁻ → H₂ + 2OH⁻."],
r:["Net anodic decarboxylative coupling","Even-carbon alkanes (R–R)","Mixed carboxylates give mixtures"],
h:"The electric Wurtz: carboxylate loses CO₂ and two R groups pair up.",t:"It makes alkanes; Kolbe–Schmitt makes salicylic acid.",
q:"Product from sodium propanoate?",a:"Butane (C₂H₅–C₂H₅).",
ar:["Electrolysis of aqueous sodium acetate gives ethane at the anode.", "Hydrogen gas is liberated at the cathode.", "B"]},
{id:"fischer",g:2,e:"🍎",n:"Fischer Esterification",v:"fischer",kw:"ester acid alcohol sulphuric acid equilibrium ethyl acetate",eq:["RCOOH + R′OH","conc. H₂SO₄, heat","RCOOR′ + H₂O"],ex:"CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O",
why:"H⁺ makes the carbonyl carbon more electrophilic so the alcohol can add. Every step is reversible, so the system settles at an equilibrium.",
f:"Acid and alcohol join and drop a water molecule. H⁺ makes the C=O carbon more positive so the alcohol's O can attack. The acid gives the <b>OH</b>, the alcohol gives the <b>H</b>. It is reversible, so we push it forward. 🍎",
c:["Conc. H₂SO₄ (catalyst, removes water)","Heat","Excess alcohol or remove water"],s:["<b>Activate ⚙️</b> H⁺ protonates C=O.","<b>Attack 🎯</b> R′OH adds to that carbon (tetrahedral intermediate).","<b>Lose water 💧</b> H₂O leaves and H⁺ is released: the ester forms."],
r:["Reversible equilibrium","Excess of one reactant or water removal raises the yield","Tertiary alcohols tend to eliminate"],
h:"<b>A</b>cid gives <b>OH</b>, <b>A</b>lcohol gives <b>H</b>. That pair leaves as water.",t:"Reversible: use excess alcohol or remove water, and do not call it a one-way reaction.",
q:"How do you get more ester?",a:"Use excess alcohol or remove water as it forms (Le Chatelier).",
ar:["Fischer esterification is catalysed by a strong acid such as conc. H₂SO₄.", "The acid makes the alcohol a stronger nucleophile by deprotonating it.", "C"]},
{id:"decarboxylation",g:2,e:"🧯",n:"Decarboxylation",v:"decarboxylation",kw:"soda lime sodium acetate methane alkane one carbon less",eq:["RCOONa + NaOH","CaO (soda lime), heat","R–H + Na₂CO₃"],ex:"CH₃COONa + NaOH → CH₄ + Na₂CO₃",
why:"Strong heating with base removes the carboxyl carbon as carbonate, leaving R–H. CaO keeps the mixture dry.",
f:"Heating a sodium carboxylate with <b>soda lime</b> (NaOH + CaO) snaps the carboxyl group off as carbonate. The alkane left has <b>one carbon fewer</b>. CaO keeps the mixture dry and spares the glass. 🧯",
c:["Soda lime = NaOH + CaO","Strong heating","Gives alkane + Na₂CO₃"],s:["<b>Mix 🥣</b> RCOONa with soda lime.","<b>Heat 🔥</b> OH⁻ attacks; the C–R bond breaks.","<b>Release 💨</b> R–H escapes as gas; Na₂CO₃ stays behind."],
r:["Alkane has 1 carbon less","Detailed solid-state mechanism is not simple","Soda lime = NaOH + CaO"],
h:"Soda lime pulls COO off: <b>one carbon less</b>, just like Hoffmann.",t:"Soda lime is NaOH + CaO, not slaked lime.",
q:"Sodium benzoate + soda lime gives?",a:"Benzene (C₆H₆).",
ar:["Sodium acetate heated with soda lime gives methane.", "Soda lime is a mixture of NaOH and CaO.", "B"]},
{id:"iodoform",g:5,e:"💛",n:"Iodoform Test",v:"iodoform",kw:"yellow precipitate CHI3 methyl ketone ethanol acetone haloform",eq:["R–CO–CH₃ + 3I₂ + 4NaOH","warm","RCOONa + CHI₃↓ + 3NaI + 3H₂O"],ex:"CH₃COCH₃ → CHI₃ (yellow) + CH₃COONa",
why:"In base I replaces all three α-H of a methyl ketone; the CI₃ group then leaves as CI₃⁻ and becomes CHI₃, a yellow solid.",
f:"In base, iodine replaces all three H of a CH₃ next to C=O. The –CI₃ group then leaves as <b>CHI₃</b>, a yellow solid with an antiseptic smell. 💛",
c:["I₂ + NaOH (forms NaOI), warm","Positive: CH₃CO–R or CH₃CH(OH)–R","Yellow CHI₃ precipitate"],s:["<b>Start 🧪</b> A CH₃CO– group (or an alcohol oxidised to it).","<b>Iodinate 🔁</b> All three α-H are replaced by I.","<b>Attack ➖</b> OH⁻ adds to C=O.","<b>Cleave ✂️</b> CI₃⁻ leaves: yellow CHI₃↓ and RCOO⁻."],
r:["Positive: CH₃CO– or CH₃CH(OH)– (ethanol, acetaldehyde, acetone, propan-2-ol)","Negative: methanol, HCHO, propan-1-ol, acetic acid","Needs I₂/NaOH and gentle warming"],
h:"Yellow + hospital smell = CHI₃. 'Ethanol yes, methanol no.'",t:"Methanol and HCHO fail. Ethanol passes because it oxidises to CH₃CHO.",
q:"Why does ethanol pass but propan-1-ol fail?",a:"I₂/NaOH oxidises ethanol to CH₃CHO, which has CH₃CO–. Propan-1-ol gives CH₃CH₂CHO, which does not.",
ar:["Ethanol does not give a positive iodoform test.", "Ethanol is oxidised by NaOI to acetaldehyde, which contains the CH₃CO– group.", "D"]},
{id:"tollens-fehling",g:5,e:"🪞",n:"Tollens' & Fehling's",v:"tollens",kw:"silver mirror aldehyde copper oxide red precipitate benzaldehyde ketone",eq:["RCHO","[Ag(NH₃)₂]⁺ or Cu²⁺, OH⁻","RCOO⁻ + Ag↓ or Cu₂O↓"],bal:"Tollens': RCHO + 2[Ag(NH₃)₂]⁺ + 3OH⁻ → RCOO⁻ + 2Ag↓ + 4NH₃ + 2H₂O. Fehling's: RCHO + 2Cu²⁺ + 5OH⁻ → RCOO⁻ + Cu₂O↓ + 3H₂O",ex:"CH₃CHO + 2[Ag(NH₃)₂]⁺ + 3OH⁻ → CH₃COO⁻ + 2Ag↓ + 4NH₃ + 2H₂O",
why:"Aldehydes are easily oxidised, so they reduce a mild oxidant and leave a visible trail: silver or red Cu₂O. Ketones are not oxidised this easily.",
f:"Aldehydes are easy to oxidise, so they <b>reduce</b> a mild oxidant and leave a visible trail: a silver mirror or red Cu₂O. Ketones resist oxidation and stay silent. 🪞",
c:["Tollens': [Ag(NH₃)₂]⁺ in NH₃","Fehling's: Cu²⁺ (tartrate complex) in NaOH","Warm"],s:["<b>Start 🧪</b> RCHO meets the mild oxidant.","<b>Oxidise 🔋</b> RCHO → RCOO⁻.","<b>Look 👀</b> Ag⁺ → Ag mirror, or Cu²⁺ → red-brown Cu₂O."],
r:["Ketones: no reaction","Benzaldehyde: Tollens' ✓, Fehling's ✗","Fehling's works for aliphatic aldehydes"],
h:"<b>T</b>ollens = <b>T</b>all mirror 🪞. <b>F</b>ehling = <b>F</b>ire-red Cu₂O 🔴.",t:"Ketones fail both. Benzaldehyde fails Fehling's but passes Tollens'.",
q:"Which test separates benzaldehyde from acetaldehyde?",a:"Fehling's: acetaldehyde gives red Cu₂O, benzaldehyde does not.",
ar:["Benzaldehyde gives a silver mirror with Tollens' reagent but no red precipitate with Fehling's solution.","Aromatic aldehydes are not oxidised by the mild Fehling's reagent.","A"]},
{id:"lucas",g:5,e:"⏱️",n:"Lucas Test",v:"lucas",kw:"alcohol turbidity zinc chloride hydrochloric acid tertiary secondary primary carbocation",eq:["R–OH","conc. HCl + ZnCl₂","R–Cl (turbid)"],ex:"(CH₃)₃C–OH → (CH₃)₃C–Cl: cloudy at once",
why:"ZnCl₂ helps OH leave and the more stable the carbocation, the faster the reaction. The insoluble alkyl chloride makes the mixture cloudy.",
f:"ZnCl₂ helps OH leave and HCl supplies Cl⁻. The more stable the carbocation, the faster the reaction, so <b>3° is fastest</b>. The insoluble alkyl chloride turns the mixture cloudy. ⏱️",
c:["Lucas reagent: conc. HCl + anhydrous ZnCl₂","Room temperature","Alcohol soluble in the reagent"],s:["<b>Start 🧪</b> 3° alcohol in Lucas reagent.","<b>Activate ⚙️</b> ZnCl₂/H⁺ makes –OH a good leaving group.","<b>Leave 🚪</b> H₂O departs, giving a carbocation (S<sub>N</sub>1-like; 2° slower).","<b>Cloud ☁️</b> Cl⁻ attacks; oily R–Cl turns it turbid."],
r:["3° at once, 2° in about 5 min, 1° none at room temperature","Alcohol must dissolve in the reagent (low carbon count)","Allylic and benzylic alcohols react like 3°"],
h:"<b>3°</b> is instant, <b>2°</b> takes minutes, <b>1°</b> never in the cold.",t:"The three classes do not share one mechanism: 3° is S<sub>N</sub>1-like, 2° intermediate, 1° very slow.",
q:"Which alcohol turns turbid first?",a:"The tertiary one, because its carbocation is the most stable.",
ar:["Tertiary alcohols turn the Lucas reagent turbid immediately.","Tertiary alcohols give the most stable carbocation.","A"]},
{id:"hinsberg",g:5,e:"🕵️",n:"Hinsberg Test",v:"hinsberg",kw:"amine primary secondary tertiary benzenesulphonyl chloride sulphonamide alkali soluble",eq:["1° / 2° / 3° amine","C₆H₅SO₂Cl, then NaOH(aq)","sulphonamide (or none)"],ex:"C₆H₅NH₂ + C₆H₅SO₂Cl → C₆H₅SO₂NHC₆H₅, soluble in alkali",
why:"The reagent sorts amines by N–H count. A 1° sulphonamide keeps one acidic N–H, 2° keeps none, 3° cannot form one.",
f:"Benzenesulphonyl chloride sorts amines by their <b>N–H count</b>. A 1° product keeps one acidic N–H and dissolves in alkali. A 2° product has none left and stays solid. A 3° amine has no N–H to lose, so no sulphonamide forms. 🕵️",
c:["Hinsberg's reagent: C₆H₅SO₂Cl","Then aqueous NaOH","Observe solubility"],s:["<b>Add reagent 🧪</b> Amine + C₆H₅SO₂Cl.","<b>React 🔁</b> 1° and 2° lose HCl; 3° does not form a sulphonamide.","<b>Read 👀</b> NaOH: 1° dissolves, 2° insoluble, 3° no reaction."],
r:["1° dissolves, 2° does not, 3° no reaction","The 1° sulphonamide dissolves because its N–H is acidic","Reagent is C₆H₅SO₂Cl (not benzoyl chloride)"],
h:"1° <b>dissolves</b>, 2° <b>stays solid</b>, 3° <b>ghosts</b> you.",t:"Hinsberg's reagent is C₆H₅SO₂Cl, not benzoyl chloride.",
q:"A product dissolves in NaOH. Which amine class?",a:"Primary: its sulphonamide keeps an acidic N–H.",
ar:["The sulphonamide from a primary amine dissolves in aqueous NaOH.","It has an acidic N–H hydrogen, which forms a soluble sodium salt.","A"]},
{id:"cumene",g:3,e:"🏭",n:"Cumene Process",v:"cumene",kw:"phenol acetone industrial isopropylbenzene hydroperoxide propene hock rearrangement",eq:["C₆H₅CH(CH₃)₂ (cumene)","1) O₂ (air)  2) H₃O⁺","C₆H₅OH + CH₃COCH₃"],ex:"Benzene + propene (H₃PO₄) → cumene → (O₂, then H₃O⁺) phenol + acetone",
why:"Cumene's tertiary benzylic C–H is weak, so air oxidises it to a hydroperoxide. Acid then rearranges it and splits it into phenol and acetone.",
f:"Factories make phenol from cheap benzene and propene. Air oxidises cumene's weak benzylic C–H to a <b>hydroperoxide</b>. Acid then makes the phenyl group slide onto oxygen and the molecule splits into <b>two useful products</b>: phenol and acetone. 🏭",
c:["Step 1: benzene + propene, acid catalyst (e.g. H₃PO₄) → cumene","Step 2: O₂ (air), roughly 360–390 K → cumene hydroperoxide","Step 3: dilute acid (H₃O⁺), warm → phenol + acetone"],s:["<b>Oxidise 💨</b> O₂ attacks the benzylic C–H (radical chain).","<b>Hydroperoxide 🧪</b> Cumene hydroperoxide forms.","<b>Rearrange 🔀</b> H₃O⁺: phenyl migrates C → O (Hock rearrangement).","<b>Split ✂️</b> Hydrolysis gives phenol + acetone."],
r:["Cumene = isopropylbenzene (propene gives a 2° carbocation)","Two products: phenol + acetone","Minor by-products: acetophenone, α-methylstyrene, 2-phenylpropan-2-ol"],
h:"One stone, two birds: cumene → <b>phenol + acetone</b>.",t:"Cumene is isopropylbenzene (via a 2° carbocation), not propylbenzene.",
q:"Why is cumene isopropyl, not propyl?",a:"Propene + H⁺ forms the more stable 2° carbocation, (CH₃)₂CH⁺, which attacks the ring.",
ar:["The cumene process gives phenol and acetone.","Propene adds to benzene to give n-propylbenzene, which is then oxidised.","C"]},
{id:"balz-schiemann",g:4,e:"🛡️",n:"Balz–Schiemann",v:"balzschiemann",kw:"aryl fluoride fluorobenzene fluoroborate tetrafluoroborate diazonium thermal decomposition",eq:["ArN₂⁺Cl⁻","HBF₄, then heat","Ar–F + BF₃ + N₂↑"],ex:"C₆H₅N₂⁺BF₄⁻ → C₆H₅F + BF₃ + N₂",
why:"Copper-based exchange does not give Ar–F. The stable, isolable diazonium fluoroborate decomposes on heating, losing N₂ and handing F to the ring.",
f:"Copper-based exchange does not give Ar–F, so Sandmeyer is no use here. Instead HBF₄ turns the diazonium into a stable, insoluble <b>fluoroborate</b> salt. Heating it makes N₂ leave and F jump across from BF₄⁻. 🛡️",
c:["Diazotise at 273–278 K (NaNO₂/HCl)","HBF₄ (or NaBF₄) → ArN₂⁺BF₄⁻↓","Heat the dry salt"],s:["<b>Swap anion 🔁</b> ArN₂⁺Cl⁻ + HBF₄ → ArN₂⁺BF₄⁻↓ + HCl.","<b>Heat 🔥</b> N₂ leaves (aryl cation-like intermediate).","<b>F jumps 🦘</b> F from BF₄⁻ bonds to the ring, leaving BF₃."],
r:["Makes Ar–F","Heat the isolated fluoroborate salt","The aryl cation is a proposed, not isolated, intermediate"],
h:"<b>B</b>F₄⁻ is the <b>B</b>ringer of <b>F</b>: HBF₄ then heat gives Ar–F.",t:"Sandmeyer cannot make Ar–F. ArI needs just KI (no copper).",
q:"Why not Sandmeyer for fluorobenzene?",a:"Copper-based exchange does not give Ar–F, so use HBF₄ and heat instead.",
ar:["Aryl fluorides are prepared by heating aryldiazonium fluoroborates.","BF₄⁻ acts as the source of fluoride, giving BF₃ and N₂ as by-products.","A"]}];
R.sort((x,y)=>x.g-y.g);
/* ===== UTILITIES ===== */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],p2=n=>String(n).padStart(2,"0");
/* safe rich text: only <b> <i> <sub> <sup> from our own data are turned into elements; everything else stays text (no innerHTML anywhere) */
function rich(el,s){const st=[el];String(s).split(/(<\/?(?:b|i|sub|sup)>)/).forEach(p=>{const m=/^<(\/?)(b|i|sub|sup)>$/.exec(p);if(!m){if(p)st[st.length-1].appendChild(document.createTextNode(p));return}if(m[1]){if(st.length>1)st.pop()}else{const e=document.createElement(m[2]);st[st.length-1].appendChild(e);st.push(e)}});return el}
const plain=s=>String(s).replace(/<[^>]+>/g,"");
function h(tag,props,...kids){const e=document.createElement(tag);if(props)for(const k in props){const v=props[k];if(v==null||v===false)continue;if(k=="class")e.className=v;else if(k=="rich")rich(e,v);else if(k=="text")e.textContent=v;else if(k=="style")e.style.cssText=v;else if(k.slice(0,2)=="on")e.addEventListener(k.slice(2),v);else e.setAttribute(k,v===true?"":v)}kids.flat().forEach(c=>{if(c==null||c===false)return;e.append(c.nodeType?c:document.createTextNode(c))});return e}
const RM=window.matchMedia?matchMedia("(prefers-reduced-motion: reduce)"):{matches:false};
const live=$("#live");let liveT=0;const say=m=>{live.textContent=m+(liveT++%2?"\u00A0":"")};
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const SUBS="₀₁₂₃₄₅₆₇₈₉⁺⁻",SUBR="0123456789+-";
const norm=s=>plain(s).toLowerCase().replace(/[₀-₉⁺⁻]/g,c=>SUBR[SUBS.indexOf(c)]||"").replace(/[²³]/g,c=>c=="²"?"2":"3").replace(/[–—‑−′]/g,"-").replace(/[^a-z0-9+\-\s]/g," ").replace(/\s+/g," ").trim();

/* ===== PROGRESS STORE (stable ids, validated, migrated; old keys are never erased by updates) =====
   v2 record per reaction id: r read-ts, pr practice attempts, ok correct apply answers, w wrong answers, rb recall bits (1 product,2 reagents,4 name,8 exception,16 typed test), rc recalled-ts, m mastered-ts */
const KEY="rg2",WEEK=6048e5,ID=new Set(R.map(r=>r.id)),BYID=Object.fromEntries(R.map(r=>[r.id,r]));
const LEG={};R.forEach(r=>{LEG[r.n]=r.id;if(r.old)LEG[r.old]=r.id});
const mem={};
const rd=k=>{try{const v=localStorage.getItem(k);return v==null?(mem[k]??null):JSON.parse(v)}catch(e){return mem[k]??null}};
const wr=(k,v)=>{mem[k]=v;try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const num=v=>typeof v=="number"&&isFinite(v)&&v>=0?v:0;
const blank=()=>({r:0,pr:0,ok:0,w:0,rb:0,rc:0,m:0});
function clean(o){const S={v:2,p:{},miss:{}};if(!o||typeof o!="object"||Array.isArray(o))return S;
const p=o.p&&typeof o.p=="object"&&!Array.isArray(o.p)?o.p:{};
Object.keys(p).forEach(id=>{const x=p[id];if(!ID.has(id)||!x||typeof x!="object")return;S.p[id]={r:num(x.r),pr:num(x.pr),ok:num(x.ok),w:num(x.w),rb:num(x.rb)|0,rc:num(x.rc),m:num(x.m)}});
const ms=o.miss&&typeof o.miss=="object"&&!Array.isArray(o.miss)?o.miss:{};
Object.keys(ms).forEach(k=>{const id=k.split("|")[0];if(ID.has(id)&&/^(product|reagent|name|ar)$/.test(k.split("|")[1]||""))S.miss[k]=num(ms[k])});return S}
function migrate(){const old=rd("rg"),rec=rd("rg.rec"),S=clean(null),now=Date.now();
const take=(src,fn)=>{if(!src||typeof src!="object"||Array.isArray(src))return;Object.keys(src).forEach(n=>{const id=LEG[n];if(id)fn(id,src[n])})};
take(rec,id=>{const x=S.p[id]||(S.p[id]=blank());x.r=x.r||now;x.pr=Math.max(1,x.pr);x.rb|=16;x.rc=x.rc||now});
take(old,(id,v)=>{const x=S.p[id]||(S.p[id]=blank()),t=num(v)||now;x.r=x.r||t;x.pr=Math.max(1,x.pr);x.rb|=16;x.rc=x.rc||t;x.m=t});return S}
let S;{const raw=rd(KEY);S=raw?clean(raw):migrate();wr(KEY,S)}
const save=()=>wr(KEY,S);
const P=id=>S.p[id]||(S.p[id]=blank());
const isDue=v=>v>0&&Date.now()-v>WEEK;
const stOf=id=>{const x=S.p[id]||blank();return{read:x.r>0,prac:x.pr>0,rec:x.rc>0,mas:x.m>0,due:isDue(x.m),weak:x.w>x.ok||Object.keys(S.miss).some(k=>k.split("|")[0]==id)}};
const canMaster=id=>{const x=P(id);return x.rc>0&&x.ok>0};
function record(id,type,good){const x=P(id);x.pr++;if(good){x.ok++;delete S.miss[id+"|"+type]}else{x.w++;S.miss[id+"|"+type]=Date.now()}save()}

/* ===== VISUALISATION ENGINE: 2D SVG keyframes, no permanent loop (rAF only while playing/stepping) ===== */
const ease=f=>f*f*(3-2*f);
const vizSet=new Set();
function mkViz(host,sc,ui){
const NS="http://www.w3.org/2000/svg",Fr=sc.f,N=Fr.length,ids=Object.keys(sc.n),uid="mk"+Math.random().toString(36).slice(2,8);
const E=(tag,at,par)=>{const e=document.createElementNS(NS,tag);for(const k in at)e.setAttribute(k,at[k]);if(par)par.appendChild(e);return e};
const svg=E("svg",{viewBox:"0 0 320 180",role:"img","aria-label":ui.label,focusable:"false"},host);
const mk=E("marker",{id:uid,viewBox:"0 0 10 10",refX:"8",refY:"5",markerWidth:"7",markerHeight:"7",orient:"auto-start-reverse"},E("defs",{},svg));E("path",{d:"M0 0L10 5L0 10z",class:"mkp"},mk);
const gB=E("g",{},svg),gN=E("g",{},svg),gA=E("g",{},svg);
/* resolve carried-over state for every frame */
const stt=[];let prev={};
Fr.forEach(fr=>{const cur={};ids.forEach(id=>{const pe=fr.p[id],pv=prev[id]||[0,0,0,sc.n[id].l];cur[id]=pe?[pe[0],pe[1],pe[2]===undefined?1:pe[2],pe[3]!==undefined?pe[3]:pv[3]]:pv.slice()});stt.push(cur);prev=cur});
ids.forEach(id=>{for(let k=0;k<N-1;k++)if(stt[k][id][2]==0&&stt[k+1][id][2]>0){stt[k][id][0]=stt[k+1][id][0];stt[k][id][1]=stt[k+1][id][1]}});
const NE={};
ids.forEach(id=>{const d=sc.n[id],g=E("g",{opacity:0},gN),o={g,d,l:null};const tx=(a)=>E("text",Object.assign({"text-anchor":"middle","dominant-baseline":"central"},a),g);
if(d.k=="a"){E("circle",{r:d.r,fill:d.c,stroke:"rgba(0,0,0,.35)","stroke-width":1.5},g);o.t=tx({fill:"#fff"})}
else if(d.k=="t")o.t=tx({fill:d.c||"var(--ink)","font-size":d.s});
else if(d.k=="c"){o.rc=E("rect",{height:24,y:-12,rx:12,fill:d.c},g);o.t=tx({fill:"#fff","font-size":11})}
else if(d.k=="h")E("polygon",{points:[0,1,2,3,4,5].map(i=>{const a=(-90+60*i)*Math.PI/180;return(27*Math.cos(a)).toFixed(1)+","+(27*Math.sin(a)).toFixed(1)}).join(" "),fill:"none",stroke:"var(--ink)","stroke-width":2.5,"stroke-linejoin":"round"},g);
else if(d.k=="k")E("circle",{r:15,fill:"none",stroke:"var(--ink)","stroke-width":2},g);
else{E("path",{d:"M15 0A15 15 0 1 1 7.5 -13",fill:"none",stroke:"var(--ink)","stroke-width":2,"stroke-dasharray":"4 3"},g);tx({fill:"var(--teal)","font-size":15}).textContent="+"}
NE[id]=o});
const setLabel=(o,l)=>{if(!o.t||o.d.k=="s"||o.l===l)return;o.l=l;o.t.textContent=l;const n=l.length;
if(o.d.k=="a")o.t.setAttribute("font-size",n<=2?13:n==3?11.5:n==4?10.5:9.5);else if(o.d.k=="c"){const w=n*6.4+20;o.rc.setAttribute("x",-w/2);o.rc.setAttribute("width",w)}};
const BK=new Map();Fr.forEach(fr=>fr.b.forEach(s=>{if(BK.has(s))return;const m=/^([^-]+)-([^:]+)(?::(.+))?$/.exec(s),o=m[3]||"1",n=o=="2"?2:o=="3"?3:1,g=E("g",{opacity:0,stroke:"var(--ink)","stroke-width":2.4,"stroke-linecap":"round"},gB);
if(o=="d")g.setAttribute("stroke-dasharray","5 5");BK.set(s,{a:m[1],b:m[2],n,g,L:[...Array(n)].map(()=>E("line",{},g)),has:Fr.map(f=>f.b.includes(s)?1:0)})}));
const AK=new Map();Fr.forEach((fr,i)=>fr.a.forEach(r=>{if(!AK.has(r[0]))AK.set(r[0],{at:Array(N).fill(null),p:E("path",{fill:"none",stroke:"var(--arw)","stroke-width":2.4,"stroke-linecap":"round","marker-end":"url(#"+uid+")",opacity:0},gA)});AK.get(r[0]).at[i]=r.slice(1)}));
let pos=0,idx=-1,raf=0;
function draw(t){const i0=Math.min(N-1,Math.floor(t+1e-9)),i1=Math.min(N-1,i0+1),f=ease(Math.max(0,Math.min(1,t-i0))),cur={};
ids.forEach(id=>{const a=stt[i0][id],b=stt[i1][id],o=NE[id],x=a[0]+(b[0]-a[0])*f,y=a[1]+(b[1]-a[1])*f,op=a[2]+(b[2]-a[2])*f;cur[id]=[x,y,op,o.d.r];
o.g.setAttribute("transform","translate("+x.toFixed(1)+" "+y.toFixed(1)+")");o.g.setAttribute("opacity",op.toFixed(2));setLabel(o,f<.5?a[3]:b[3])});
BK.forEach(B=>{const A=cur[B.a],C=cur[B.b],o=(B.has[i0]+(B.has[i1]-B.has[i0])*f)*Math.min(A[2],C[2]);
const dx=C[0]-A[0],dy=C[1]-A[1],L=Math.hypot(dx,dy),ra=A[3]+1.5,rb=C[3]+1.5;if(o<.02||L<ra+rb+2){B.g.setAttribute("opacity",0);return}
const ux=dx/L,uy=dy/L;B.g.setAttribute("opacity",o.toFixed(2));B.L.forEach((ln,k)=>{const off=(k-(B.n-1)/2)*(B.n==3?4.6:6.4);
ln.setAttribute("x1",(A[0]+ux*ra-uy*off).toFixed(1));ln.setAttribute("y1",(A[1]+uy*ra+ux*off).toFixed(1));ln.setAttribute("x2",(C[0]-ux*rb-uy*off).toFixed(1));ln.setAttribute("y2",(C[1]-uy*rb+ux*off).toFixed(1))})});
AK.forEach(Ar=>{const p0=Ar.at[i0],p1=Ar.at[i1],o=(p0?1-f:0)+(p1?f:0);if(o<.02){Ar.p.setAttribute("opacity",0);return}
const g=p0&&p1?p0.map((v,k)=>v+(p1[k]-v)*f):(p0||p1),mx=(g[0]+g[2])/2,my=(g[1]+g[3])/2,dx=g[2]-g[0],dy=g[3]-g[1],L=Math.hypot(dx,dy)||1;
Ar.p.setAttribute("d","M"+g[0].toFixed(1)+" "+g[1].toFixed(1)+"Q"+(mx-dy/L*g[4]).toFixed(1)+" "+(my+dx/L*g[4]).toFixed(1)+" "+g[2].toFixed(1)+" "+g[3].toFixed(1));Ar.p.setAttribute("opacity",o.toFixed(2))})}
function step(){const k=Math.min(N-1,Math.round(pos));if(k!==idx){idx=k;ui.cap.textContent=Fr[k].c;ui.onStep(k,N)}}
function setPos(v){pos=Math.max(0,Math.min(N-1,v));draw(pos);ui.slider.value=Math.round(pos/(N-1)*1000);ui.slider.setAttribute("aria-valuetext","Step "+(Math.min(N-1,Math.round(pos))+1)+" of "+N);step()}
function stop(){if(raf){cancelAnimationFrame(raf);raf=0}ui.play.textContent="▶ Play";ui.play.setAttribute("aria-label","Play mechanism animation")}
function go(target,ms,isPlay){stop();if(RM.matches||Math.abs(target-pos)<1e-3){setPos(target);return}
const s=performance.now(),p0=pos;if(isPlay){ui.play.textContent="⏸ Pause";ui.play.setAttribute("aria-label","Pause mechanism animation")}
const fn=n=>{const k=Math.min(1,(n-s)/ms);setPos(p0+(target-p0)*k);if(k<1)raf=requestAnimationFrame(fn);else{raf=0;stop()}};raf=requestAnimationFrame(fn)}
const api={
toggle(){if(raf){stop();return}if(pos>=N-1-1e-3){setPos(0);if(RM.matches)return}if(RM.matches){setPos(Math.min(N-1,Math.floor(pos+1e-6)+1));return}go(N-1,(N-1-pos)*1500,true)},
next(){go(Math.min(N-1,Math.floor(pos+1e-6)+1),700)},prev(){go(Math.max(0,Math.ceil(pos-1e-6)-1),700)},
reset(){stop();setPos(0)},scrub(v){stop();setPos(v/1000*(N-1))},pause:stop,
destroy(){stop();vizSet.delete(api);svg.remove()}};
setPos(0);vizSet.add(api);api.N=N;return api}
document.addEventListener("visibilitychange",()=>{if(document.hidden)vizSet.forEach(v=>v.pause())});
const vio="IntersectionObserver"in window?new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting&&e.target._v)e.target._v.pause()})):null;
/* ===== BALANCED / NET EQUATIONS added where the headline equation is a summary ===== */
const BAL={"kolbe-schmitt":"C₆H₅ONa + CO₂ → o-HOC₆H₄COONa; then o-HOC₆H₄COONa + H⁺ → o-HOC₆H₄COOH + Na⁺","gabriel":"C₆H₄(CO)₂NH + KOH → C₆H₄(CO)₂NK + H₂O; C₆H₄(CO)₂NK + RX → C₆H₄(CO)₂NR + KX; C₆H₄(CO)₂NR + 2NaOH → C₆H₄(COONa)₂ + RNH₂","sandmeyer-gattermann":"ArN₂⁺Cl⁻ → Ar–Cl + N₂ (Cu₂Cl₂ catalyst). Likewise Ar–Br with Cu₂Br₂/HBr, Ar–CN with CuCN/KCN","diazo-coupling":"ArN₂⁺ + Ar′OH → Ar–N=N–Ar′OH + H⁺","lucas":"R–OH + HCl → R–Cl + H₂O (ZnCl₂ catalyst)","hinsberg":"R–NH₂ + C₆H₅SO₂Cl → C₆H₅SO₂NHR + HCl; C₆H₅SO₂NHR + NaOH → C₆H₅SO₂N⁻(Na⁺)R + H₂O","cumene":"C₆H₅CH(CH₃)₂ + O₂ → C₆H₅C(CH₃)₂OOH; C₆H₅C(CH₃)₂OOH → (H⁺) C₆H₅OH + CH₃COCH₃","balz-schiemann":"ArN₂⁺BF₄⁻ → Ar–F + BF₃ + N₂"};
R.forEach(r=>{if(!r.bal)r.bal=BAL[r.id]||(plain(r.eq[0])+" → "+plain(r.eq[2]))});

/* ===== QUESTION ENGINE (used by the Apply tab and all practice modes) ===== */
const TYPE={product:"Product prediction",reagent:"Reagent identification",name:"Name the reaction",ar:"Assertion–Reason"},LET="ABCD";
const ARX=["Both A and R are true, and R is the correct explanation of A.","Both A and R are true, but R is not the correct explanation of A.","A is true but R is false.","A is false but R is true."];
/* reactions whose headline products could look alike are never used as each other's distractors */
const GRP=[["rosenmund","stephen","etard","gattermann-koch"],["friedel-crafts","wurtz-fittig"],["hoffmann-bromamide","gabriel"],["wurtz","kolbe-electrolysis"]];
const sim=(a,b)=>GRP.some(g=>g.includes(a)&&g.includes(b));
const sq=s=>norm(s).replace(/[^a-z0-9]/g,"");
const reagentOK=r=>plain(r.eq[1]).length>6;
const typesFor=r=>["product",reagentOK(r)?"reagent":null,"name","ar"].filter(Boolean);
function mkQ(r,type){
if(type=="ar"){const[a,rr,k]=r.ar,i=LET.indexOf(k);return{rid:r.id,type,stem:["Assertion (A): "+a,"Reason (R): "+rr],opts:ARX,ans:i,exp:"Answer "+k+": "+ARX[i]+" "+plain(r.why)}}
const oth=R.filter(x=>x.id!=r.id&&!sim(x.id,r.id));let stem,right,get;
if(type=="product"){stem=["Predict the product(s).","Reactants: "+plain(r.eq[0]),"Conditions: "+plain(r.eq[1])];right=plain(r.eq[2]);get=x=>plain(x.eq[2])}
else if(type=="reagent"){stem=["Which reagent / conditions bring about this change?",plain(r.eq[0])+"  →  "+plain(r.eq[2])];right=plain(r.eq[1]);get=x=>plain(x.eq[1])}
else{stem=["Name this reaction.",plain(r.eq[0])+"  —["+plain(r.eq[1])+"]→  "+plain(r.eq[2])];right=r.n;get=x=>x.n}
const sr=sq(right),pool=[...new Set(oth.map(get))].filter(x=>{const s=sq(x);return x!==right&&!s.includes(sr)&&!sr.includes(s)});
const opts=shuffle([right,...shuffle(pool).slice(0,3)]);
return{rid:r.id,type,stem,opts,ans:opts.indexOf(right),exp:"Answer: "+right+". "+plain(r.why)}}
function renderQ(q,o){const box=h("div",{class:"rc"}),fb=h("p",{class:"fb","aria-live":"polite"}),ops=h("div",{class:"opts",role:"group","aria-label":"Answer options"});let done=false;
box.append(h("p",{class:"q",text:BYID[q.rid].n+" · "+TYPE[q.type]}));q.stem.forEach(s=>box.append(h("p",{text:s})));
q.opts.forEach((t,i)=>ops.append(h("button",{type:"button",class:"opt",text:(q.type=="ar"?LET[i]+". ":"")+t,onclick:()=>{if(done)return;done=true;const ok=i==q.ans;record(q.rid,q.type,ok);
$$("button",ops).forEach((x,j)=>{x.disabled=true;if(o.feedback){if(j==q.ans)x.classList.add("good");else if(j==i)x.classList.add("bad")}else if(j==i)x.classList.add("good")});
if(o.feedback){fb.className="fb "+(ok?"ok":"no");fb.textContent=(ok?"✅ Correct. ":"❌ Not quite. ")+q.exp}else fb.textContent="Answer recorded.";
refresh();if(o.onAnswer)o.onAnswer(ok,i)}})));
box.append(ops,fb);return box}

/* ===== PROGRESS HEADER / COUNTS ===== */
const bar=$("#pgb i"),pgb=$("#pgb"),cnt=$("#cnt"),stats=$("#stats"),cards=[],secs=[];
function totals(){const c={read:0,prac:0,rec:0,mas:0};R.forEach(r=>{const s=stOf(r.id);if(s.read)c.read++;if(s.prac)c.prac++;if(s.rec)c.rec++;if(s.mas)c.mas++});return c}
function refresh(){const c=totals(),n=R.length,pc=c.mas/n*100;bar.style.width=pc+"%";pgb.setAttribute("aria-valuenow",Math.round(pc));
cnt.textContent=c.mas+"/"+n+" mastered "+(c.mas==n?"🎉":"🌱");
stats.replaceChildren(...[["Read",c.read],["Practised",c.prac],["Recalled",c.rec],["Mastered",c.mas]].map(a=>h("span",null,a[0]+" ",h("b",{text:a[1]+"/"+n}))));
cards.forEach(cd=>cd.upd());secs.forEach(s=>{const m=R.filter(r=>r.g==s.g);s.el.textContent=m.filter(r=>stOf(r.id).mas).length+"/"+m.length+" mastered"})}

/* ===== CARD ===== */
const STOP=new Set("the and for with that this are was not has have its into from but can they them then than which when what why how any use used uses via you your".split(" "));
const toks=s=>{const o=new Map();norm(s).split(/[^a-z0-9]+/).forEach(w=>{if(w.length>1&&!STOP.has(w)){const k=w.slice(0,5);if(!o.has(k))o.set(k,w)}});return o};
const RP=[{bit:1,q:"Predict the products",show:r=>["Reactants: "+r.eq[0],"Conditions: "+r.eq[1]],ans:r=>r.eq[2]},
{bit:2,q:"Recall the reagents and conditions",show:r=>["Reactants: "+r.eq[0],"Products: "+r.eq[2]],ans:r=>r.eq[1]+"  ·  "+r.c[0]},
{bit:8,q:"State an important limitation or exception",show:r=>["Think about the "+r.n+" reaction."],ans:r=>r.r[0]}];
function buildCard(r,j){
const id=r.id,pid="c-"+id;let viz=null,tabs=[],pan=[],applyDone=false,steps;
const dots=h("span",{class:"dots",role:"img"}),dm=h("p",{class:"dmsg","aria-live":"polite"}),done=h("button",{type:"button",class:"done","aria-pressed":"false"});
const eq=h("div",{class:"eq"},rich(h("span"),r.eq[0]),h("span",{class:"ar"},h("i",{rich:r.eq[1]}),h("b",{"aria-hidden":"true"})),rich(h("span"),r.eq[2]));
const sum=h("summary",null,h("div",{class:"n"},h("span",{text:"REACTION "+p2(j+1)+" / "+p2(R.length)}),dots),h("div",{class:"top"},h("h3",{text:r.n}),h("span",{class:"em","aria-hidden":"true",text:r.e})),eq,
h("div",{class:"qrv"},h("p",{rich:"🧠 "+r.h}),h("p",{class:"t",rich:"⚠️ "+r.t}),h("p",{rich:"🧪 "+r.eq[1]})),h("span",{class:"hand tap","aria-hidden":"true",text:"tap to learn 👆"}));
/* A · Understand */
const pU=h("div",{class:"pn pu"},h("div",{class:"note"},h("h4",{text:"🧒 Explain it like I'm 12"}),h("p",{rich:r.f})),
h("div",null,h("h4",{text:"🤔 Why it happens"}),h("p",{rich:r.why})),
h("div",null,h("h4",{text:"🧪 Reagents & conditions"}),h("ul",{class:"tags"},r.c.map(x=>h("li",{rich:x})))),
h("div",null,h("h4",{text:"⚖️ Balanced / net equation"}),h("p",{class:"bal",rich:r.bal})),
h("div",null,h("h4",{text:"📌 Worked example"}),h("p",{class:"ex",rich:r.ex})));
/* B · Visualise (engine is created lazily on first view) */
const host=h("div",{class:"sc"}),cap=h("div",{class:"cap","aria-live":"polite"}),sl=h("input",{type:"range",min:0,max:1000,value:0,"aria-label":"Mechanism progress slider"});
const bPrev=h("button",{type:"button","aria-label":"Previous step",text:"◀ Back"}),bPlay=h("button",{type:"button","aria-label":"Play mechanism animation",text:"▶ Play"}),bNext=h("button",{type:"button","aria-label":"Next step",text:"Next ▶"}),bReset=h("button",{type:"button","aria-label":"Reset mechanism to the start",text:"↺ Reset"});
steps=h("ol",{class:"st"},r.s.map(x=>h("li",{rich:x})));
const pV=h("div",{class:"pn pv"},h("div",null,h("h4",{text:"🔬 What really happens (2D mechanism)"}),host,h("div",{class:"ctl"},bPrev,bPlay,bNext,bReset,sl),cap,
h("p",{class:"scn",text:"Gold curved arrows = electron movement · dashed lines = partial bonds · · = radical · schematic, not to scale"})),h("div",null,h("h4",{text:"Step by step"}),steps));
function initViz(){if(viz)return;const sc=SC[r.v];if(!sc){cap.textContent="No visualisation available.";return}
viz=mkViz(host,sc,{label:r.n+" mechanism diagram. Use the buttons and slider below to step through it.",slider:sl,play:bPlay,cap,onStep:(k)=>{pV.classList.add("viz-on");const c=Math.min(k,steps.children.length-1);[...steps.children].forEach((li,i)=>{li.classList.toggle("cur",i==c);if(i==c)li.setAttribute("aria-current","step");else li.removeAttribute("aria-current")})}});
host._v=viz;if(vio)vio.observe(host);bPlay.onclick=()=>viz.toggle();bNext.onclick=()=>viz.next();bPrev.onclick=()=>viz.prev();bReset.onclick=()=>viz.reset();sl.oninput=()=>viz.scrub(+sl.value)}
/* C · Recall: hook, limitations, trap, recall prompts, typed self-test */
const rcBox=RP.map(p=>{const rev=h("div",{class:"rev",hidden:true}),msg=h("p",{class:"fb","aria-live":"polite"}),got=h("button",{type:"button",class:"btn",text:"✓ I got it"}),miss=h("button",{type:"button",class:"btn",text:"✗ Not yet"}),show=h("button",{type:"button",class:"btn",text:"Show answer"});
const row=h("div",{class:"row",hidden:true},got,miss);rich(rev,p.ans(r));
show.onclick=()=>{rev.hidden=false;row.hidden=false;show.hidden=true};
const fin=ok=>{const x=P(id);x.pr++;if(ok){x.rb|=p.bit;if((x.rb&3)==3&&!x.rc){x.rc=Date.now();say(r.n+": recalled. Now answer an Apply question to unlock mastery.")}}else x.w++;save();got.disabled=miss.disabled=true;msg.className="fb "+(ok?"ok":"no");msg.textContent=ok?"Logged as recalled.":"Logged for revision.";refresh()};
got.onclick=()=>fin(true);miss.onclick=()=>fin(false);
return h("div",{class:"rc"},h("p",{class:"q",text:"🧠 "+p.q}),...p.show(r).map(s=>h("p",{rich:s})),show,rev,row,msg)});
const key=toks(r.a),inp=h("input",{type:"text",autocomplete:"off",autocapitalize:"off",spellcheck:"false","aria-label":"Your answer",placeholder:"Type your answer…"}),fb=h("p",{class:"fb","aria-live":"polite"}),ans=h("p",{class:"ex",hidden:true,rich:r.a});
const say2=(t,c)=>{fb.textContent=t;fb.className="fb"+(c?" "+c:"")};
const check=()=>{const mine=toks(inp.value);if(!mine.size){say2("Type your best guess first. 🙂");return}const miss=[...key.keys()].filter(x=>!mine.has(x)),hit=key.size-miss.length;
if(hit>=Math.max(1,Math.ceil(key.size*.4))){ans.hidden=false;const x=P(id);x.pr++;x.rb|=16;if(!x.rc){x.rc=Date.now();say(r.n+": recalled.")}save();say2("✅ Correct! Compare it with the full answer below.","ok");refresh()}
else say2("Not quite yet: you covered "+hit+" of "+key.size+" key ideas. Hint: think about “"+key.get(miss[0])+"”. Edit your answer and try again.","no")};
inp.onkeydown=e=>{if(e.key=="Enter"){e.preventDefault();check()}};
const pR=h("div",{class:"pn pr"},h("div",{class:"hook"},h("h4",{text:"🧠 Memory hook"}),h("p",{rich:r.h})),h("div",{class:"lim"},h("h4",{text:"🚧 Important limitations"}),h("ul",{class:"tags"},r.r.map(x=>h("li",{rich:x})))),h("div",{class:"trap"},h("h4",{text:"⚠️ Common exam trap"}),h("p",{rich:r.t})),
h("div",null,h("h4",{text:"Recall practice (answers stay hidden until you ask)"}),h("div",{class:"opts"},rcBox)),
h("div",null,h("h4",{text:"🎯 Self-test"}),h("p",{class:"q",rich:r.q}),h("div",{class:"qa"},inp,h("button",{type:"button",class:"btn",text:"Check",onclick:check}),h("button",{type:"button",class:"btn",text:"Show answer",onclick:()=>{ans.hidden=false;say2(P(id).rc?"Answer shown.":"Answer shown. Now try writing it from memory to count as recalled.")}}),fb),ans));
/* D · Apply */
const aBox=h("div",{class:"opts"});
const fillApply=()=>{applyDone=true;const t2=reagentOK(r)?"reagent":"name";aBox.replaceChildren(...["product",t2,"ar"].map(t=>renderQ(mkQ(r,t),{feedback:true})))};
const pA=h("div",{class:"pn pa"},h("h4",{text:"📝 Try it, CBSE style"}),h("p",{class:"ex",text:"CBSE-style questions on this reaction. Answers are revealed only after you choose."}),aBox,h("button",{type:"button",class:"btn",text:"🔄 New question set",onclick:fillApply}));
pan=[pU,pV,pR,pA];
const names=["💡 Understand","🔬 Visualise","🧠 Recall","📝 Apply"];
function selTab(i,focus){tabs.forEach((b,k)=>{b.setAttribute("aria-selected",k==i);b.tabIndex=k==i?0:-1;pan[k].hidden=k!=i});if(i!=1&&viz)viz.pause();if(i==1)initViz();if(i==3&&!applyDone)fillApply();if(focus)tabs[i].focus()}
tabs=names.map((n,i)=>h("button",{type:"button",role:"tab",id:pid+"-t"+i,"aria-controls":pid+"-p"+i,text:n,onclick:()=>selTab(i),onkeydown:e=>{const k=e.key;let t=-1;if(k=="ArrowRight")t=(i+1)%4;else if(k=="ArrowLeft")t=(i+3)%4;else if(k=="Home")t=0;else if(k=="End")t=3;if(t>=0){e.preventDefault();selTab(t,true)}}}));
pan.forEach((p,i)=>{p.id=pid+"-p"+i;p.setAttribute("role","tabpanel");p.setAttribute("aria-labelledby",pid+"-t"+i)});
const tl=h("div",{class:"tabs",role:"tablist","aria-label":r.n+" learning stages"},tabs);
const el=h("details",{class:"rx","data-id":id},sum,tl,h("div",{class:"bd"},...pan,dm,done));
done.onclick=()=>{const x=P(id);if(x.m){if(isDue(x.m)){x.m=Date.now();say(r.n+" revision renewed.")}else{x.m=0;say(r.n+" no longer mastered.")}}
else if(!canMaster(id)){dm.textContent="To master "+r.n+": "+(x.rc?"✓":"✗")+" recall it (product and reagent prompts, or the typed self-test) · "+(x.ok?"✓":"✗")+" answer one Apply question correctly.";selTab(x.rc?3:2,true);save();refresh();return}
else{x.m=Date.now();dm.textContent="";say(r.n+" marked as mastered.")}save();refresh()};
el.addEventListener("toggle",()=>{if(el.open){const x=P(id);if(!x.r){x.r=Date.now();save();refresh()}}else if(viz)viz.pause()});
selTab(0);
const idx=norm([r.n,r.eq.join(" "),r.ex,r.why,r.kw,r.c.join(" "),G[r.g][1]].join(" "));
const upd=()=>{const s=stOf(id),b=[s.read,s.prac,s.rec,s.mas];dots.textContent=b.map(v=>v?"●":"○").join("");
dots.setAttribute("aria-label","Progress: "+["read","practised","recalled","mastered"].map((n,i)=>(b[i]?"":"not ")+n).join(", "));dots.title="Read · Practised · Recalled · Mastered";
done.textContent=s.mas?(s.due?"🔁 Revision due · tap to renew":"🌟 Mastered! · tap to undo"):"Mark as mastered";done.style.background=s.mas?"var(--sun)":"";done.setAttribute("aria-pressed",s.mas);if(s.mas)dm.textContent=""};
return{r,el,idx,upd,selTab}}

/* ===== PAGE BUILD ===== */
const colsEl=$("#cols");
G.forEach((g,gi)=>{const gp=h("p",{class:"gp"}),cg=h("div",{class:"cg"}),sec=h("section",{class:"col","data-g":gi,"aria-labelledby":"gh"+gi},h("div",{class:"gh"},h("span",{class:"ge","aria-hidden":"true",text:g[0]}),h("div",{class:"gt"},h("h2",{id:"gh"+gi,text:g[1]}),h("p",{class:"hand",text:g[2]})),gp),cg);
R.forEach((r,j)=>{if(r.g==gi){const cd=buildCard(r,j);cards.push(cd);cg.append(cd.el)}});secs.push({g:gi,el:gp});colsEl.append(sec)});
/* filters: category, progress status, search (all combine) */
let FL={cat:-1,stat:"all",q:""};
function applyFilter(announce){const words=norm(FL.q).split(" ").filter(Boolean);let shown=0;
cards.forEach(cd=>{const r=cd.r,s=stOf(r.id);let ok=(FL.cat<0||r.g==FL.cat)&&(FL.stat=="all"||(FL.stat=="un"&&!s.mas)||(FL.stat=="mas"&&s.mas)||(FL.stat=="weak"&&s.weak)||(FL.stat=="due"&&s.due));
if(ok&&words.length)ok=words.every(w=>cd.idx.includes(w));cd.el.hidden=!ok;if(ok)shown++;else if(cd.el.open)cd.el.open=false});
$$(".col").forEach(c=>c.hidden=!$$(".rx",c).some(x=>!x.hidden));$("#empty").hidden=shown>0;if(announce)say(shown+" of "+R.length+" reactions shown")}
const chipSet=(box,labels,get,set)=>{box.replaceChildren(...labels.map((t,i)=>h("button",{type:"button",class:get(i)?"on":"","aria-pressed":get(i),text:t,onclick:()=>{set(i);$$("button",box).forEach((b,k)=>{b.classList.toggle("on",get(k));b.setAttribute("aria-pressed",get(k))});applyFilter(true)}})))};
chipSet($("#catc"),["All ✨",...G.map(g=>g[0]+" "+g[1])],i=>FL.cat==i-1,i=>FL.cat=i-1);
const SF=["all","un","mas","weak","due"];chipSet($("#stc"),["All","Not mastered","Mastered","Needs work","Revision due"],i=>FL.stat==SF[i],i=>FL.stat=SF[i]);
let qt=0;$("#q").addEventListener("input",e=>{FL.q=e.target.value;clearTimeout(qt);qt=setTimeout(()=>applyFilter(true),220)});

/* ===== MODES ===== */
const cvb=$("#cv"),LBL="Product hidden. Activate to reveal.";
const cvSpans=()=>$$(".rx .eq span:last-child");
cvb.onclick=()=>{const on=document.body.classList.toggle("cov");cvb.classList.toggle("on",on);cvb.setAttribute("aria-pressed",on);
cvSpans().forEach(s=>{if(on){s.tabIndex=0;s.setAttribute("role","button");s.setAttribute("aria-label",LBL)}else{s.removeAttribute("tabindex");s.removeAttribute("role");s.removeAttribute("aria-label")}});
if(!on)$$(".rx.shown").forEach(x=>x.classList.remove("shown"));say(on?"Cover mode on: products are hidden":"Cover mode off")};
const tog=t=>{const sh=t.closest(".rx").classList.toggle("shown");if(sh)t.removeAttribute("aria-label");else t.setAttribute("aria-label",LBL)};
colsEl.addEventListener("click",e=>{const t=e.target.closest&&e.target.closest(".eq span:last-child");if(t&&document.body.classList.contains("cov")){e.preventDefault();tog(t)}});
colsEl.addEventListener("keydown",e=>{const t=e.target.closest&&e.target.closest(".eq span:last-child");if(t&&document.body.classList.contains("cov")&&(e.key=="Enter"||e.key==" ")){e.preventDefault();tog(t)}});
colsEl.addEventListener("keyup",e=>{const t=e.target.closest&&e.target.closest(".eq span:last-child");if(t&&document.body.classList.contains("cov")&&e.key==" ")e.preventDefault()});
const qrb=$("#qr");qrb.onclick=()=>{const on=document.body.classList.toggle("qr");qrb.classList.toggle("on",on);qrb.setAttribute("aria-pressed",on);say(on?"Quick revision on: hook, trap and conditions shown on every card":"Quick revision off")};

/* dialog helpers */
const dlg=$("#dlg"),dtt=$("#dt"),dbody=$("#dbody");let opener=null;
function openDlg(title,btn){opener=btn||document.activeElement;dtt.textContent=title;dbody.replaceChildren();if(dlg.showModal){if(!dlg.open)dlg.showModal()}else dlg.setAttribute("open","");return dbody}
function closeDlg(){if(dlg.close)dlg.close();else dlg.removeAttribute("open");if(opener&&opener.focus)opener.focus()}
$("#dx").onclick=closeDlg;dlg.addEventListener("click",e=>{if(e.target==dlg)closeDlg()});dlg.addEventListener("cancel",()=>{if(opener&&opener.focus)setTimeout(()=>opener.focus(),0)});

/* practice runner: random (endless), mixed (10, instant feedback), exam (10, feedback at the end), mistakes (revision of missed questions) */
const poolR=()=>{const v=cards.filter(c=>!c.el.hidden).map(c=>c.r);return v.length?v:R};
const pick=a=>a[Math.floor(Math.random()*a.length)];
function runPractice(mode,btn){
const titles={random:"🎲 Random practice",mixed:"🧪 Mixed quiz",exam:"📝 Exam practice",miss:"🔁 Revise my mistakes"},body=openDlg(titles[mode],btn),pool=poolR();
const scope=mode=="miss"?"your previously missed questions":pool.length==R.length?"all "+R.length+" reactions":pool.length+" reactions in the current filter";
let list=[],i=0,score=0,log=[];
const mk=(r,t)=>mkQ(r,t);
if(mode=="miss"){list=shuffle(Object.keys(S.miss)).slice(0,10).map(k=>{const[a,b]=k.split("|");return mk(BYID[a],b)})}
else if(mode!="random"){const rs=shuffle(pool),cnt=Math.min(10,Math.max(1,pool.length*2));for(let k=0;k<cnt;k++){const r=rs[k%rs.length],ts=mode=="exam"?(k%3==0?["ar"]:k%3==1?["product"]:[reagentOK(r)?"reagent":"product"]):typesFor(r);list.push(mk(r,pick(ts)))}}
let total=mode=="random"?Infinity:list.length;
function show(){body.replaceChildren();
if(mode=="miss"&&!list.length){body.append(h("p",{text:"No missed questions to revise. Nice! 🌟"}));return}
if(i>=total){finish();return}
const q=mode=="random"?(()=>{const r=pick(pool);return mk(r,pick(typesFor(r)))})():list[i];
if(total!=Infinity)body.append(h("div",{class:"pbar","aria-hidden":"true"},h("i",{style:"width:"+(i/total*100)+"%"})));
body.append(h("p",{class:"dmsg",text:"Question "+(i+1)+(total==Infinity?"":" of "+total)+" · "+scope+(mode=="exam"?" · answers are shown at the end":"")}));
const nxt=h("button",{type:"button",class:"btn",text:i+1>=total?"See results ▶":"Next question ▶",hidden:true,onclick:()=>{i++;show();dbody.scrollTop=0}});
body.append(renderQ(q,{feedback:mode!="exam",onAnswer:(ok,pk)=>{if(ok)score++;log.push({q,ok,pk});nxt.hidden=false;nxt.focus();if(mode=="random"){nxt.textContent="Next question ▶"}}}),nxt);
if(mode=="random")body.append(h("button",{type:"button",class:"btn",text:"Finish",onclick:finish}))}
function finish(){body.replaceChildren();const n=log.length;body.append(h("h3",{text:"Score: "+score+" / "+n}),h("p",{text:n?(score==n?"Perfect! 🌟":score/n>=.7?"Good work. Revise the missed ones below. 💪":"Keep going: your missed questions are saved under 'Revise my mistakes'."):"No questions answered."}));
const wrong=log.filter(l=>!l.ok);if(wrong.length){body.append(h("h4",{text:"Review"}));wrong.forEach(l=>body.append(h("div",{class:"rc"},h("p",{class:"q",text:BYID[l.q.rid].n+" · "+TYPE[l.q.type]}),h("p",{text:l.q.stem.join(" ")}),h("p",{class:"fb no",text:"Your answer: "+l.q.opts[l.pk]}),h("p",{class:"fb ok",text:"Correct: "+l.q.opts[l.q.ans]+" — "+l.q.exp}))))}
body.append(h("div",{class:"row"},h("button",{type:"button",class:"btn",text:"Practise again",onclick:()=>runPractice(mode,btn)}),h("button",{type:"button",class:"btn",text:"Close",onclick:closeDlg})))}
show()}
$$("[data-mode]").forEach(b=>b.onclick=()=>runPractice(b.dataset.mode,b));

/* progress dialog: totals, per-category, weak topics, revise mistakes, reset */
function jumpTo(id){closeDlg();FL={cat:-1,stat:"all",q:""};$("#q").value="";chipSet($("#catc"),["All ✨",...G.map(g=>g[0]+" "+g[1])],i=>FL.cat==i-1,i=>FL.cat=i-1);chipSet($("#stc"),["All","Not mastered","Mastered","Needs work","Revision due"],i=>FL.stat==SF[i],i=>FL.stat=SF[i]);applyFilter();
const cd=cards.find(c=>c.r.id==id);if(cd){cd.el.open=true;cd.el.scrollIntoView({behavior:RM.matches?"auto":"smooth",block:"start"});cd.el.querySelector("summary").focus({preventScroll:true})}}
$("#prg").onclick=e=>{const body=openDlg("📊 Your progress",e.currentTarget),c=totals(),n=R.length;
body.append(h("p",{text:"Read "+c.read+" · Practised "+c.prac+" · Recalled "+c.rec+" · Mastered "+c.mas+" (of "+n+" reactions). Opening a card only counts as 'read'; mastery needs recall plus a correct Apply answer."}),h("div",{class:"pbar",role:"progressbar","aria-label":"Mastered","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Math.round(c.mas/n*100)},h("i",{style:"width:"+(c.mas/n*100)+"%"})));
body.append(h("h4",{text:"By category"}));const tb=h("div",{class:"tbl"});
const cat=G.map((g,gi)=>{const m=R.filter(r=>r.g==gi);let ok=0,w=0,mas=0,rd=0;m.forEach(r=>{const x=S.p[r.id]||blank();ok+=x.ok;w+=x.w;if(x.m)mas++;if(x.r)rd++});return{g,gi,m,ok,w,mas,rd,acc:ok+w?ok/(ok+w):null}});
cat.forEach(k=>tb.append(h("div",{class:"tr"},h("div",{class:"lab"},h("span",{text:k.g[0]+" "+k.g[1]}),h("span",{text:k.mas+"/"+k.m.length+" mastered · "+k.rd+" read"+(k.acc==null?"":" · "+Math.round(k.acc*100)+"% correct")})),h("div",{class:"pbar","aria-hidden":"true"},h("i",{style:"width:"+(k.mas/k.m.length*100)+"%"})))));body.append(tb);
body.append(h("h4",{text:"Weak topics"}));const att=cat.filter(k=>k.acc!=null).sort((a,b)=>a.acc-b.acc);
const wr2=R.map(r=>({r,s:(S.p[r.id]||blank()),m:Object.keys(S.miss).filter(k=>k.split("|")[0]==r.id).length})).filter(o=>o.s.w>o.s.ok||o.m).sort((a,b)=>(b.s.w-b.s.ok+b.m)-(a.s.w-a.s.ok+a.m)).slice(0,6);
if(!att.length)body.append(h("p",{text:"Answer some Apply or practice questions and your weak topics will appear here."}));
else{body.append(h("p",{text:"Lowest accuracy first: "+att.slice(0,3).map(k=>k.g[1]+" ("+Math.round(k.acc*100)+"%)").join(", ")+"."}));
if(wr2.length)body.append(h("ul",{class:"wk"},wr2.map(o=>h("li",null,h("button",{type:"button",class:"btn",text:o.r.n+" →",onclick:()=>jumpTo(o.r.id)})))))}
const nm=Object.keys(S.miss).length;
body.append(h("div",{class:"row"},h("button",{type:"button",class:"btn",text:"🔁 Revise my mistakes ("+nm+")",onclick:()=>{if(!nm){say("No missed questions yet");return}runPractice("miss",e.currentTarget)}})));
const cf=h("div",{hidden:true},h("p",{class:"fb no",text:"This erases all your saved progress on this device. This cannot be undone."}),h("div",{class:"row"},h("button",{type:"button",class:"btn",text:"Yes, reset everything",onclick:()=>{S=clean(null);save();["rg","rg.rec"].forEach(k=>{delete mem[k];try{localStorage.removeItem(k)}catch(_){}});cards.forEach(cd=>cd.el.classList.remove("shown"));refresh();applyFilter();closeDlg();say("Progress reset")}}),h("button",{type:"button",class:"btn",text:"Cancel",onclick:()=>{cf.hidden=true;rb.hidden=false;rb.focus()}})));

const bx=h("div",{class:"row"}),fi=h("input",{type:"file",accept:".json,application/json",hidden:true,"aria-label":"Choose a backup file"});
bx.append(h("button",{type:"button",class:"btn",text:"📥 Export backup",onclick:()=>{try{const u=URL.createObjectURL(new Blob([JSON.stringify(S)],{type:"application/json"})),a=h("a",{href:u,download:"reaction-garden-progress-"+new Date().toISOString().slice(0,10)+".json"});document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),2000);say("Progress exported.")}catch(_){say("Export is not available in this viewer.")}}}),
h("button",{type:"button",class:"btn",text:"📤 Restore backup",onclick:()=>fi.click()}),fi);
fi.onchange=()=>{const f=fi.files&&fi.files[0];if(!f)return;if(f.size>2e5){say("That file is too large to be a backup.");return}const rd2=new FileReader();rd2.onload=()=>{try{S=clean(JSON.parse(rd2.result));save();refresh();applyFilter();closeDlg();say("Progress restored.")}catch(_){say("Invalid backup file.")}};rd2.readAsText(f)};
body.append(bx);
const rb=h("button",{type:"button",class:"btn",text:"🗑 Reset progress",onclick:()=>{cf.hidden=false;rb.hidden=true}});body.append(rb,cf)};

/* misc wiring */
window.addEventListener("storage",e=>{if(e.key==KEY){S=clean(rd(KEY));refresh()}});
const io="IntersectionObserver"in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.1}):null;
cards.forEach(cd=>io?io.observe(cd.el):cd.el.classList.add("in"));
if(RM.addEventListener)RM.addEventListener("change",()=>vizSet.forEach(v=>v.pause()));
refresh();applyFilter();

/* ===== SHELL: scroll progress, back-to-top, tools drawer, loading page ===== */
(function(){const boot=$("#boot"),sb=$("#sbar i"),up=$("#totop"),tools=$("#tools"),mq=matchMedia("(min-width:900px)");
let tk=0;const upd=()=>{tk=0;const d=document.documentElement,m=d.scrollHeight-innerHeight,y=scrollY||d.scrollTop||0;sb.style.transform="scaleX("+(m>0?Math.min(1,y/m):0).toFixed(4)+")";up.hidden=y<610};
addEventListener("scroll",()=>{if(!tk)tk=requestAnimationFrame(upd)},{passive:true});addEventListener("resize",upd);upd();
up.onclick=()=>scrollTo({top:0,behavior:RM.matches?"auto":"smooth"});
const syncTools=()=>{if(mq.matches)tools.open=true};syncTools();if(mq.addEventListener)mq.addEventListener("change",syncTools);
const t0=performance.now(),MIN=987;let gone=false;
const hide=()=>{if(gone)return;gone=true;setTimeout(()=>{document.documentElement.classList.add("ready");boot.classList.add("out");boot.setAttribute("aria-hidden","true");setTimeout(()=>{boot.hidden=true},RM.matches?0:377)},Math.max(0,MIN-(performance.now()-t0)))};
const fontsP=document.fonts&&document.fonts.ready?Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,1500))]):Promise.resolve();
const go=()=>fontsP.then(hide,hide);
if(document.readyState=="complete")go();else addEventListener("load",go);setTimeout(hide,4000)})();
