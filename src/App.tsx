import React, { useState, useRef, useCallback } from "react";

const GOOGLE_FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@300;400;500&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');`;

/* ─── FONTS ─────────────────────────────────────────────────────────────────── */


/* ─── PROFESSION CONFIG ──────────────────────────────────────────────────────── */
const PROFESSION_CONFIG = {
  executive:{accent:"#B8973A",sidebar:"#1C2B3A",sidebarText:"#E8DFC8",main:"#FFFFFF",mainText:"#0D1B2A",subAccent:"#D4AF54",fontDisplay:"'Cormorant Garamond',serif",fontBody:"'Outfit',sans-serif",specialSection:{label:"Board Memberships"},profileLabel:"EXECUTIVE PROFILE",expLabel:"CAREER HISTORY",skillsLabel:"CORE COMPETENCIES",placeholder:{name:"Alexandra Whitmore",title:"Chief Executive Officer",email:"a.whitmore@company.com",phone:"+1 (212) 555-0190",location:"New York, NY",linkedin:"linkedin.com/in/awhitmore",summary:"Visionary executive with 20+ years leading Fortune 500 organizations through transformational growth. Proven track record of scaling revenue from $200M to $2B+ while cultivating high-performance cultures and driving strategic innovation across global markets.",experiences:[{company:"Meridian Capital Group",title:"Chief Executive Officer",dates:"2018 — Present",desc:"Orchestrated a full organizational transformation resulting in 340% revenue growth. Oversaw 12,000-person workforce across 28 countries."},{company:"Apex Industries",title:"President & COO",dates:"2013 — 2018",desc:"Rebuilt operational infrastructure saving $80M annually. Drove P&L responsibility for $600M division."},{company:"Global Ventures LLC",title:"SVP Strategy",dates:"2008 — 2013",desc:"Designed and executed five-year strategic roadmap. Opened markets in Southeast Asia, generating $120M in new revenue streams."}],education:[{school:"Harvard Business School",degree:"MBA, General Management",year:"2005"},{school:"Yale University",degree:"BA, Economics & Political Science",year:"2001"}],skills:"P&L Management, M&A Strategy, Board Relations, Organizational Transformation, Global Expansion",special:"Board of Directors — Nexus Financial • Advisory Council — World Economic Forum"}},
  creative:{accent:"#C4552A",sidebar:"#2A1A12",sidebarText:"#F2E8DC",main:"#FFFDF9",mainText:"#1A0F08",subAccent:"#E07850",fontDisplay:"'Playfair Display',serif",fontBody:"'DM Sans',sans-serif",specialSection:{label:"Awards & Recognition"},profileLabel:"CREATIVE VISION",expLabel:"CREATIVE EXPERIENCE",skillsLabel:"CRAFT & TOOLS",placeholder:{name:"Soren Nakamura",title:"Creative Director",email:"soren@studio-nk.com",phone:"+1 (323) 555-0174",location:"Los Angeles, CA",linkedin:"linkedin.com/in/sorennk",summary:"Award-winning Creative Director with 15 years shaping brand narratives for global luxury and lifestyle clients. I work at the intersection of culture, craft, and commerce — building visual languages that resonate across generations.",experiences:[{company:"Studio Nakamura",title:"Founder & Creative Director",dates:"2016 — Present",desc:"Founded independent creative studio serving clients including Hermès, Apple, and Nike. Led campaigns reaching 200M+ impressions globally."},{company:"Pentagram",title:"Senior Designer",dates:"2012 — 2016",desc:"Worked across identity, editorial, and environmental design."},{company:"Wieden+Kennedy",title:"Art Director",dates:"2009 — 2012",desc:"Concepted and directed campaigns for Nike and Coca-Cola. Two campaigns won Cannes Lions Grand Prix."}],education:[{school:"Rhode Island School of Design",degree:"BFA, Graphic Design",year:"2009"},{school:"Tokyo University of the Arts",degree:"Exchange Program, Visual Art",year:"2008"}],skills:"Brand Identity, Art Direction, Figma, Photoshop, Illustrator, Motion Design, Photography",special:"Cannes Lions Grand Prix 2011, 2012 • D&AD Yellow Pencil 2015, 2018 • AIGA Fellow 2020"}},
  engineer:{accent:"#2A7AE2",sidebar:"#0F1923",sidebarText:"#C8DCF0",main:"#FFFFFF",mainText:"#0A1628",subAccent:"#4A9EF5",fontDisplay:"'Outfit',sans-serif",fontBody:"'DM Sans',sans-serif",specialSection:{label:"Tech Stack"},profileLabel:"ENGINEERING PROFILE",expLabel:"PROFESSIONAL EXPERIENCE",skillsLabel:"EXPERTISE",placeholder:{name:"Yuki Tanaka",title:"Senior Software Engineer",email:"yuki.tanaka@dev.io",phone:"+1 (415) 555-0183",location:"San Francisco, CA",linkedin:"linkedin.com/in/yukitanaka",summary:"Full-stack engineer with 10 years architecting scalable systems at the intersection of performance and elegance. Passionate about developer experience, distributed systems, and mentoring the next generation of engineers.",experiences:[{company:"Stripe",title:"Senior Software Engineer",dates:"2020 — Present",desc:"Lead engineer on the Payments Infrastructure team. Reduced P99 latency by 62% through distributed caching redesign."},{company:"Airbnb",title:"Software Engineer II",dates:"2016 — 2020",desc:"Built core components of the search ranking system serving 100M+ queries/day."},{company:"Dropbox",title:"Software Engineer",dates:"2013 — 2016",desc:"Developed sync engine optimizations reducing battery drain by 40% on mobile clients."}],education:[{school:"Stanford University",degree:"MS, Computer Science",year:"2013"},{school:"UC Berkeley",degree:"BS, EECS",year:"2011"}],skills:"TypeScript, Go, Rust, Python, React, GraphQL, PostgreSQL, Kubernetes",special:"TypeScript, Go, Rust, Python\nAWS, GCP, Kubernetes, Terraform\nOpen Source: graphql-tools (2.1k ★)"}},
  healthcare:{accent:"#2A8A6E",sidebar:"#112820",sidebarText:"#D0EDE4",main:"#FFFFFF",mainText:"#0A1E16",subAccent:"#40B890",fontDisplay:"'Outfit',sans-serif",fontBody:"'DM Sans',sans-serif",specialSection:{label:"Certifications & Licenses"},profileLabel:"CLINICAL PROFILE",expLabel:"CLINICAL EXPERIENCE",skillsLabel:"CLINICAL SKILLS",placeholder:{name:"Dr. Priya Mehta",title:"Attending Physician — Internal Medicine",email:"p.mehta@hospital.org",phone:"+1 (617) 555-0129",location:"Boston, MA",linkedin:"linkedin.com/in/drpriyamehta",summary:"Board-certified Internist with 12 years of clinical experience in complex inpatient and outpatient settings. Committed to evidence-based practice, patient-centered care, and advancing health equity.",experiences:[{company:"Massachusetts General Hospital",title:"Attending Physician",dates:"2017 — Present",desc:"Lead hospitalist managing complex inpatient cases. Reduced 30-day readmission rates by 22%."},{company:"Brigham & Women's Hospital",title:"Chief Resident",dates:"2015 — 2017",desc:"Selected as Chief Resident among 40 peers. Coordinated scheduling and quality improvement initiatives."},{company:"Harvard Medical School",title:"Internal Medicine Resident",dates:"2012 — 2015",desc:"Completed residency in Internal Medicine with distinction in clinical reasoning."}],education:[{school:"Harvard Medical School",degree:"MD, Medicine",year:"2012"},{school:"MIT",degree:"BS, Biology & Neuroscience",year:"2008"}],skills:"Inpatient Medicine, Diagnostic Reasoning, EHR (Epic), Point-of-Care Ultrasound",special:"MD License — Massachusetts #12345\nBoard Certified — ABIM\nBLS, ACLS, PALS Certified"}},
  academic:{accent:"#7A5AB8",sidebar:"#1A1428",sidebarText:"#DDD4F5",main:"#FFFFFF",mainText:"#100C1E",subAccent:"#9E7AE0",fontDisplay:"'Cormorant Garamond',serif",fontBody:"'DM Sans',sans-serif",specialSection:{label:"Publications & Grants"},profileLabel:"ACADEMIC PROFILE",expLabel:"ACADEMIC POSITIONS",skillsLabel:"RESEARCH AREAS",placeholder:{name:"Prof. Elena Vasquez",title:"Associate Professor of Cognitive Science",email:"e.vasquez@university.edu",phone:"+1 (617) 555-0142",location:"Cambridge, MA",linkedin:"scholar.google.com/vasquez",summary:"Cognitive neuroscientist investigating memory consolidation and neural plasticity. PI of the Memory & Cognition Lab at MIT. 80+ peer-reviewed publications, $4.2M in NIH funding.",experiences:[{company:"MIT — Brain & Cognitive Sciences",title:"Associate Professor",dates:"2019 — Present",desc:"Lead the Memory & Cognition Lab with 12 researchers. NIH R01 investigator."},{company:"Stanford University",title:"Assistant Professor",dates:"2014 — 2019",desc:"Built independent research program. Published 34 peer-reviewed articles."},{company:"Harvard University",title:"Postdoctoral Fellow",dates:"2011 — 2014",desc:"Developed novel fMRI paradigms for studying episodic memory."}],education:[{school:"Johns Hopkins University",degree:"PhD, Neuroscience",year:"2011"},{school:"University of Michigan",degree:"BS, Psychology & Biology",year:"2005"}],skills:"fMRI, EEG, Python, R, MATLAB, Statistical Modeling, Grant Writing",special:"NIH R01 — Memory Consolidation in Aging ($1.8M)\n82 peer-reviewed publications, h-index: 28"}},
  marketing:{accent:"#CC4488",sidebar:"#22101A",sidebarText:"#F5D4E4",main:"#FFFFFF",mainText:"#1A0810",subAccent:"#EE66AA",fontDisplay:"'Outfit',sans-serif",fontBody:"'DM Sans',sans-serif",specialSection:{label:"Key Achievements"},profileLabel:"MARKETING PROFILE",expLabel:"CAREER EXPERIENCE",skillsLabel:"CAPABILITIES",placeholder:{name:"Marcus Chen",title:"VP of Marketing & Growth",email:"marcus.chen@growthco.com",phone:"+1 (312) 555-0156",location:"Chicago, IL",linkedin:"linkedin.com/in/marcuschen",summary:"Results-driven marketing executive with 16 years building iconic consumer brands and high-velocity growth engines. Specializing in digital acquisition, brand strategy, and data-driven campaigns.",experiences:[{company:"Luminary Health",title:"VP Marketing & Growth",dates:"2020 — Present",desc:"Scaled monthly active users from 400K to 4.2M in 30 months."},{company:"Shopify",title:"Director, Demand Generation",dates:"2016 — 2020",desc:"Owned $45M performance marketing budget. Grew SMB merchant segment by 280%."},{company:"Ogilvy",title:"Senior Account Director",dates:"2010 — 2016",desc:"Led integrated campaigns for American Express, Dove, and IBM."}],education:[{school:"Northwestern — Kellogg",degree:"MBA, Marketing & Strategy",year:"2010"},{school:"University of Illinois",degree:"BS, Communications",year:"2008"}],skills:"Growth Strategy, Performance Marketing, Brand Building, SEO/SEM, A/B Testing, SQL",special:"Effie Gold Award 2014 — American Express\nForbes 40 Under 40 — Marketing 2019"}},
};

const CUSTOM_BASE = {accent:"#7A6EDD",sidebar:"#151220",sidebarText:"#DDD8F5",main:"#FFFFFF",mainText:"#110E1E",subAccent:"#9B8FEE",fontDisplay:"'Outfit',sans-serif",fontBody:"'DM Sans',sans-serif",specialSection:{label:"Highlights"},profileLabel:"PROFESSIONAL PROFILE",expLabel:"PROFESSIONAL EXPERIENCE",skillsLabel:"SKILLS"};

/* ─── TEMPLATES ─────────────────────────────────────────────────────────────── */
const TEMPLATE_GROUPS = [
  {label:"Standard", items:[{id:"classic",label:"Classic"},{id:"swiss",label:"Swiss"},{id:"corporate",label:"Corporate"}]},
  {label:"Bold",     items:[{id:"editorial",label:"Editorial"},{id:"execblack",label:"Exec Black"},{id:"techNeon",label:"Tech Neon"}]},
  {label:"Elegant",  items:[{id:"luxurySerif",label:"Luxury Serif"},{id:"minimal",label:"Minimal"},{id:"modernGrid",label:"Modern Grid"}]},
  {label:"Utility",  items:[{id:"compactATS",label:"Compact ATS"},{id:"startup",label:"Startup"},{id:"timeline",label:"Timeline"}]},
];

/* layouts that skip the sidebar entirely */
const FULL_WIDTH_TPLS = new Set(["compactATS","modernGrid","timeline"]);
/* layouts with top-banner header instead of sidebar header */
const BANNER_TPLS = new Set(["editorial","execblack","techNeon","luxurySerif"]);

const TPL_VARS = {
  classic:    (cfg)=>({fd:cfg.fontDisplay,fb:cfg.fontBody,acc:cfg.accent,sbg:cfg.sidebar,stx:cfg.sidebarText,mbg:cfg.main,mtx:cfg.mainText,div:cfg.accent+"44",lbl:cfg.accent,name:cfg.mainText}),
  swiss:      ()=>({fd:"'DM Sans',sans-serif",fb:"'DM Sans',sans-serif",acc:"#111",sbg:"#E8E8E4",stx:"#111",mbg:"#fff",mtx:"#111",div:"#CCC",lbl:"#111",name:"#000"}),
  corporate:  (cfg)=>({fd:"'Outfit',sans-serif",fb:"'DM Sans',sans-serif",acc:"#2A5098",sbg:"#1A2744",stx:"#D8E4F8",mbg:"#fff",mtx:"#1A2744",div:"#2A509844",lbl:"#2A5098",name:"#1A2744"}),
  editorial:  (cfg)=>({fd:"'Playfair Display',serif",fb:"'DM Sans',sans-serif",acc:"#C0392B",sbg:"#1A1A1A",stx:"#F0EDE8",mbg:"#F7F4EF",mtx:"#1A1A1A",div:"#C0392B33",lbl:"#C0392B",name:"#1A1A1A"}),
  execblack:  (cfg)=>({fd:"'Cormorant Garamond',serif",fb:"'Outfit',sans-serif",acc:"#D4AF37",sbg:"#000",stx:"#D4AF37",mbg:"#0A0A0A",mtx:"#E8E0CC",div:"#D4AF3733",lbl:"#D4AF37",name:"#FFF"}),
  techNeon:   ()=>({fd:"'Space Grotesk',sans-serif",fb:"'IBM Plex Mono',monospace",acc:"#00FFB2",sbg:"#050A14",stx:"#7DFFD6",mbg:"#080E1C",mtx:"#C8E8FF",div:"#00FFB220",lbl:"#00FFB2",name:"#FFF"}),
  luxurySerif:(cfg)=>({fd:"'EB Garamond',serif",fb:"'Cormorant Garamond',serif",acc:"#8B6914",sbg:"#2C1810",stx:"#F5E8CC",mbg:"#FDFAF4",mtx:"#2C1810",div:"#8B691433",lbl:"#8B6914",name:"#2C1810"}),
  minimal:    ()=>({fd:"'DM Sans',sans-serif",fb:"'DM Sans',sans-serif",acc:"#999",sbg:"#FAFAFA",stx:"#333",mbg:"#FFF",mtx:"#222",div:"#E0E0E0",lbl:"#666",name:"#111"}),
  modernGrid: (cfg)=>({fd:"'Space Grotesk',sans-serif",fb:"'DM Sans',sans-serif",acc:cfg.accent,sbg:"#FFF",stx:"#111",mbg:"#FFF",mtx:"#111",div:cfg.accent+"22",lbl:cfg.accent,name:"#111"}),
  compactATS: ()=>({fd:"'DM Sans',sans-serif",fb:"'DM Sans',sans-serif",acc:"#1A3A8A",sbg:"#FFF",stx:"#111",mbg:"#FFF",mtx:"#111",div:"#999",lbl:"#1A3A8A",name:"#000"}),
  startup:    (cfg)=>({fd:"'Space Grotesk',sans-serif",fb:"'DM Sans',sans-serif",acc:"#6C5CE7",sbg:"#0F0F23",stx:"#E0E0FF",mbg:"#FFF",mtx:"#0F0F23",div:"#6C5CE733",lbl:"#6C5CE7",name:"#0F0F23"}),
  timeline:   (cfg)=>({fd:"'Outfit',sans-serif",fb:"'DM Sans',sans-serif",acc:cfg.accent,sbg:cfg.sidebar,stx:cfg.sidebarText,mbg:cfg.main,mtx:cfg.mainText,div:cfg.accent+"33",lbl:cfg.accent,name:cfg.mainText}),
};

const EXPORT_OVERRIDES = {
  dark: {sbg:"#0A0C10",stx:"#E0E4F0",mbg:"#111318",mtx:"#D0D4E0",div:"#FFFFFF22",name:"#FFF"},
  print:{sbg:"#F4F4F2",stx:"#222",mbg:"#FFF",mtx:"#111",div:"#CCC",lbl:"#444",name:"#000",acc:"#444"},
};

const getVars = (cfg, tpl, expMode) => {
  const fn = TPL_VARS[tpl] || TPL_VARS.classic;
  const v = fn(cfg);
  const over = expMode !== "color" ? EXPORT_OVERRIDES[expMode] : {};
  const merged = {...v, ...over};
  return {
    "--fd": merged.fd||cfg.fontDisplay, "--fb": merged.fb||cfg.fontBody,
    "--acc": merged.acc||merged.lbl||cfg.accent,
    "--sbg": merged.sbg, "--stx": merged.stx,
    "--mbg": merged.mbg, "--mtx": merged.mtx,
    "--div": merged.div, "--lbl": merged.lbl||merged.acc,
    "--name": merged.name,
  };
};

/* ─── HELPERS ───────────────────────────────────────────────────────────────── */
const mkId = () => Math.random().toString(36).slice(2,8);
const initials = (n="") => n.split(" ").map(w=>w[0]).filter(Boolean).join("").slice(0,2).toUpperCase();

const ICONS = ["◈","◉","◊","✦","◎","◆","◇","❖","◐","◑","⬡","⬢","✿","❋","✱","⊕","⊗","⊙","△","▲"];
const ACCENT_COLORS = [{v:"#7A6EDD"},{v:"#2A8A6E"},{v:"#C4552A"},{v:"#B8973A"},{v:"#2A7AE2"},{v:"#CC4488"},{v:"#5A7A9A"},{v:"#C87A20"}];

const mkForm = (profId) => {
  const p = PROFESSION_CONFIG[profId]?.placeholder;
  if (!p) return {name:"",title:"",email:"",phone:"",location:"",linkedin:"",summary:"",experiences:[{id:mkId(),company:"",title:"",dates:"",desc:""}],education:[{school:"",degree:"",year:""}],skills:"",special:"",languages:[{name:"English",level:100}],tools:[{name:"",level:80}],photo:null,showPhoto:false,secOrder:["profile","experience","special"],pages:[]};
  return {
    name:p.name,title:p.title,email:p.email,phone:p.phone,location:p.location,linkedin:p.linkedin,summary:p.summary,
    experiences:p.experiences.map(e=>({...e,id:mkId()})),
    education:p.education.map(e=>({...e})),
    skills:p.skills,special:p.special,
    languages:[{name:"English",level:100},{name:"Spanish",level:75}],
    tools:[{name:"Microsoft Office",level:90},{name:"Slack",level:80}],
    photo:null,showPhoto:false,
    secOrder:["profile","experience","special"],
    pages:[],
  };
};

/* ─── DRAG HOOK ─────────────────────────────────────────────────────────────── */
function useDrag(list, onChange) {
  const from = useRef(null);
  const [overIdx, setOverIdx] = useState(null);
  const start = (i) => { from.current = i; };
  const over  = (e, i) => {
    e.preventDefault();
    setOverIdx(i);
    if (from.current === null || from.current === i) return;
    const next = [...list];
    const [item] = next.splice(from.current, 1);
    next.splice(i, 0, item);
    from.current = i;
    onChange(next);
  };
  const end = () => { from.current = null; setOverIdx(null); };
  return { start, over, end, overIdx };
}

/* ─── RESUME LAYOUTS ────────────────────────────────────────────────────────── */

/* shared sidebar contents */
function Sidebar({form, cfg, tpl, hideAvatar=false}) {
  const showBars = !["swiss","minimal","compactATS"].includes(tpl);
  return (
    <>
      <div className="sb-accent-bar"/>
      {!hideAvatar && (
        <div style={{padding:"24px 18px 16px",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",borderBottom:"1px solid rgba(255,255,255,.06)",marginBottom:16}}>
          <div style={{width:68,height:68,borderRadius:"50%",border:"2px solid var(--acc)",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0}}>
            {form.showPhoto && form.photo
              ? <img src={form.photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"}}/>
              : <span style={{fontFamily:"var(--fd)",fontSize:22,fontWeight:600,color:"var(--acc)"}}>{initials(form.name)}</span>}
          </div>
        </div>
      )}
      <SbSection title="Contact">
        {form.email    && <Contact icon="✉" text={form.email}/>}
        {form.phone    && <Contact icon="✆" text={form.phone}/>}
        {form.location && <Contact icon="◎" text={form.location}/>}
        {form.linkedin && <Contact icon="⟁" text={form.linkedin} small/>}
      </SbSection>
      <SbSection title="Education">
        {form.education.map((e,i)=>(
          <div key={i} style={{marginBottom:9}}>
            <div style={{fontSize:10.5,fontWeight:500,color:"var(--stx)",fontFamily:"var(--fb)",marginBottom:2}}>{e.school}</div>
            <div style={{fontSize:9.5,color:"var(--stx)",opacity:.6,lineHeight:1.4,fontFamily:"var(--fb)"}}>{e.degree}</div>
            {e.year&&<div style={{fontSize:9,color:"var(--acc)",letterSpacing:".06em",marginTop:2,fontFamily:"var(--fb)"}}>{e.year}</div>}
          </div>
        ))}
      </SbSection>
      <SbSection title={cfg.skillsLabel}>
        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
          {form.skills.split(",").map((s,i)=>s.trim()&&<span key={i} style={{fontSize:9,padding:"2px 7px",background:"rgba(255,255,255,.07)",borderRadius:3,color:"var(--stx)",opacity:.85,fontFamily:"var(--fb)"}}>{s.trim()}</span>)}
        </div>
      </SbSection>
      {form.languages.some(l=>l.name.trim())&&(
        <SbSection title="Languages">
          {form.languages.filter(l=>l.name.trim()).map((l,i)=>(
            <BarRow key={i} label={l.name} pct={l.level} showBar={showBars}/>
          ))}
        </SbSection>
      )}
      {form.tools.some(t=>t.name.trim())&&(
        <SbSection title="Tools">
          {form.tools.filter(t=>t.name.trim()).map((t,i)=>(
            <BarRow key={i} label={t.name} pct={t.level} showBar={showBars}/>
          ))}
        </SbSection>
      )}
    </>
  );
}

const SbSection = ({title,children})=>(
  <div style={{padding:"0 18px 22px"}}>
    <div style={{fontSize:8,letterSpacing:".18em",textTransform:"uppercase",color:"var(--acc)",marginBottom:8,fontFamily:"var(--fb)",opacity:.9}}>{title}</div>
    {children}
  </div>
);

const Contact = ({icon,text,small=false})=>(
  <div style={{display:"flex",alignItems:"flex-start",gap:6,marginBottom:5,fontSize:small?9.5:10.5,color:"var(--stx)",opacity:.75,fontFamily:"var(--fb)",lineHeight:1.4}}>
    <i style={{fontStyle:"normal",color:"var(--acc)",fontSize:11,flexShrink:0,marginTop:1}}>{icon}</i>
    <span style={{wordBreak:"break-all"}}>{text}</span>
  </div>
);

const BarRow = ({label,pct,showBar})=>(
  <div style={{marginBottom:8}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
      <span style={{fontSize:10.5,color:"var(--stx)",opacity:.85,fontFamily:"var(--fb)"}}>{label}</span>
      <span style={{fontSize:8.5,color:"var(--acc)",opacity:.8,fontFamily:"var(--fb)"}}>{pct}%</span>
    </div>
    {showBar&&<div style={{height:2.5,background:"rgba(255,255,255,.08)",borderRadius:2,overflow:"hidden"}}>
      <div style={{height:"100%",width:`${pct}%`,background:"var(--acc)",borderRadius:2,opacity:.8}}/>
    </div>}
  </div>
);

const SectionTitle = ({children,style={}})=>(
  <div style={{fontSize:8.5,letterSpacing:".2em",textTransform:"uppercase",color:"var(--lbl)",marginBottom:16,fontFamily:"var(--fb)",...style}}>
    {children}
    <div style={{width:20,height:1,background:"var(--div)",marginTop:5}}/>
  </div>
);

const MainSection = ({children,style={}})=>(
  <div style={{padding:"26px 34px",borderBottom:"1px solid var(--div)",...style}}>{children}</div>
);

const ExpItem = ({exp})=>(
  <div style={{marginBottom:22}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:2}}>
      <span style={{fontFamily:"var(--fd)",fontSize:13.5,fontWeight:600,color:"var(--mtx)"}}>{exp.title}</span>
      <span style={{fontSize:9.5,color:"var(--lbl)",letterSpacing:".05em",whiteSpace:"nowrap",fontFamily:"var(--fb)"}}>{exp.dates}</span>
    </div>
    <div style={{fontSize:10,color:"var(--mtx)",opacity:.5,textTransform:"uppercase",letterSpacing:".08em",marginBottom:5,fontFamily:"var(--fb)"}}>{exp.company}</div>
    {exp.desc&&<div style={{fontSize:11.5,lineHeight:1.85,color:"var(--mtx)",opacity:.78,fontFamily:"var(--fb)"}}>{exp.desc}</div>}
  </div>
);

/* ── CLASSIC / CORPORATE / SWISS / LUXURY / MINIMAL / STARTUP / TIMELINE ── */
function LayoutSidebar({form, cfg, tpl, secOrder}) {
  const SECTION_LABELS = {profile:cfg.profileLabel, experience:cfg.expLabel, special:cfg.specialSection?.label||"Highlights"};
  return (
    <div style={{display:"flex",width:"100%",minHeight:"297mm",background:"var(--mbg)",alignItems:"stretch"}}>
      {/* Sidebar */}
      <div style={{width:232,minWidth:232,background:"var(--sbg)",color:"var(--stx)",display:"flex",flexDirection:"column",minHeight:"297mm"}}>
        <Sidebar form={form} cfg={cfg} tpl={tpl}/>
      </div>
      {/* Main */}
      <div style={{flex:1,display:"flex",flexDirection:"column",background:"var(--mbg)",minHeight:"297mm"}}>
        <div style={{height:5,background:"var(--acc)",opacity:.22}}/>
        <div style={{padding:"36px 34px 28px",borderBottom:"1px solid var(--div)"}}>
          <div style={{fontFamily:"var(--fd)",fontSize:26,fontWeight:600,color:"var(--name)",lineHeight:1.1,marginBottom:5}}><span className="resume-name-el">{form.name||"Your Name"}</span></div>
          <div style={{fontSize:10.5,color:"var(--lbl)",letterSpacing:".14em",textTransform:"uppercase",opacity:.9,fontFamily:"var(--fb)"}}>{form.title||"Your Title"}</div>
        </div>
        {secOrder.map(sec=>{
          if(sec==="profile"&&form.summary) return (
            <MainSection key="profile"><SectionTitle>{SECTION_LABELS.profile}</SectionTitle>
              <div style={{fontSize:12,lineHeight:2,color:"var(--mtx)",opacity:.85,fontFamily:"var(--fb)"}}>{form.summary}</div>
            </MainSection>
          );
          if(sec==="experience") return (
            <MainSection key="exp"><SectionTitle>{SECTION_LABELS.experience}</SectionTitle>
              {form.experiences.filter(e=>e.company||e.title).map((e,i)=><ExpItem key={e.id||i} exp={e}/>)}
            </MainSection>
          );
          if(sec==="special"&&form.special) return (
            <MainSection key="special"><SectionTitle>{SECTION_LABELS.special}</SectionTitle>
              <div style={{fontSize:11,lineHeight:1.9,color:"var(--mtx)",opacity:.78,fontFamily:"var(--fb)",whiteSpace:"pre-line"}}>{form.special}</div>
            </MainSection>
          );
          return null;
        })}
      </div>
    </div>
  );
}

/* ── EDITORIAL / EXECBLACK / TECH NEON — top banner, sidebar below ── */
function LayoutBanner({form, cfg, tpl, secOrder}) {
  const isNeon = tpl==="techNeon";
  const SECTION_LABELS = {profile:cfg.profileLabel, experience:cfg.expLabel, special:cfg.specialSection?.label||"Highlights"};
  return (
    <div style={{display:"flex",flexDirection:"column",width:"100%",background:"var(--mbg)"}}>
      {/* Banner header */}
      <div style={{background:"var(--sbg)",padding:"28px 36px 24px",borderBottom:"3px solid var(--acc)"}}>
        {isNeon&&<div style={{fontSize:8,letterSpacing:".3em",textTransform:"uppercase",color:"var(--acc)",marginBottom:8,fontFamily:"var(--fb)"}}>&gt; RÉSUMÉ_INIT</div>}
        <div style={{display:"flex",alignItems:"center",gap:20,marginBottom:8}}>
          {form.showPhoto&&form.photo&&(
            <div style={{width:72,height:72,borderRadius:"50%",border:"2px solid var(--acc)",overflow:"hidden",flexShrink:0}}>
              <img src={form.photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            </div>
          )}
          <div>
            <div style={{fontFamily:"var(--fd)",fontSize:36,fontWeight:700,color:"var(--stx)",lineHeight:1,marginBottom:6,letterSpacing:isNeon?"-.02em":"0"}}>{form.name||"Your Name"}</div>
            <div style={{fontSize:11,color:"var(--acc)",letterSpacing:".18em",textTransform:"uppercase",fontFamily:"var(--fb)"}}>{form.title||"Your Title"}</div>
          </div>
        </div>
        <div style={{display:"flex",gap:20,flexWrap:"wrap",marginTop:10}}>
          {[form.email,form.phone,form.location,form.linkedin].filter(Boolean).map((v,i)=>(
            <span key={i} style={{fontSize:10,color:"var(--stx)",opacity:.7,fontFamily:"var(--fb)"}}>{v}</span>
          ))}
        </div>
      </div>
      {/* 2-col body */}
      <div style={{display:"flex",flex:1}}>
        {/* Slim sidebar */}
        <div style={{width:200,background:isNeon?"#080E1C":"var(--sbg)",borderRight:"1px solid var(--div)",padding:"20px 0"}}>
          <SbSection title="Education">
            {form.education.map((e,i)=>(
              <div key={i} style={{marginBottom:9}}>
                <div style={{fontSize:10,fontWeight:500,color:"var(--stx)",fontFamily:"var(--fb)",marginBottom:2}}>{e.school}</div>
                <div style={{fontSize:9,color:"var(--stx)",opacity:.55,lineHeight:1.4,fontFamily:"var(--fb)"}}>{e.degree}</div>
                {e.year&&<div style={{fontSize:8.5,color:"var(--acc)",marginTop:2,fontFamily:"var(--fb)"}}>{e.year}</div>}
              </div>
            ))}
          </SbSection>
          <SbSection title={cfg.skillsLabel}>
            {form.skills.split(",").map((s,i)=>s.trim()&&(
              <div key={i} style={{fontSize:9.5,color:"var(--stx)",opacity:.75,marginBottom:4,fontFamily:"var(--fb)",display:"flex",alignItems:"center",gap:5}}>
                <span style={{color:"var(--acc)",fontSize:8}}>▸</span>{s.trim()}
              </div>
            ))}
          </SbSection>
          {form.languages.some(l=>l.name.trim())&&(
            <SbSection title="Languages">
              {form.languages.filter(l=>l.name.trim()).map((l,i)=><BarRow key={i} label={l.name} pct={l.level} showBar={true}/>)}
            </SbSection>
          )}
          {form.tools.some(t=>t.name.trim())&&(
            <SbSection title="Tools">
              {form.tools.filter(t=>t.name.trim()).map((t,i)=><BarRow key={i} label={t.name} pct={t.level} showBar={true}/>)}
            </SbSection>
          )}
        </div>
        {/* Main content */}
        <div style={{flex:1,background:"var(--mbg)"}}>
          {secOrder.map(sec=>{
            if(sec==="profile"&&form.summary) return (
              <MainSection key="profile"><SectionTitle>{SECTION_LABELS.profile}</SectionTitle>
                <div style={{fontSize:11.5,lineHeight:1.8,color:"var(--mtx)",opacity:.85,fontFamily:"var(--fb)"}}>{form.summary}</div>
              </MainSection>
            );
            if(sec==="experience") return (
              <MainSection key="exp"><SectionTitle>{SECTION_LABELS.experience}</SectionTitle>
                {form.experiences.filter(e=>e.company||e.title).map((e,i)=><ExpItem key={e.id||i} exp={e}/>)}
              </MainSection>
            );
            if(sec==="special"&&form.special) return (
              <MainSection key="special"><SectionTitle>{SECTION_LABELS.special}</SectionTitle>
                <div style={{fontSize:11,lineHeight:1.9,color:"var(--mtx)",opacity:.78,fontFamily:"var(--fb)",whiteSpace:"pre-line"}}>{form.special}</div>
              </MainSection>
            );
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

/* ── COMPACT ATS — no sidebar, plain single column ── */
function LayoutATS({form, cfg}) {
  return (
    <div style={{width:"100%",background:"var(--mbg)",padding:"28px 40px",fontFamily:"var(--fb)"}}>
      <div style={{borderBottom:"2px solid var(--lbl)",paddingBottom:12,marginBottom:16}}>
        <div style={{fontFamily:"var(--fd)",fontSize:22,fontWeight:700,color:"var(--name)",marginBottom:4}}>{form.name||"Your Name"}</div>
        <div style={{fontSize:11,color:"var(--lbl)",letterSpacing:".1em",textTransform:"uppercase",marginBottom:8}}>{form.title}</div>
        <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
          {[form.email,form.phone,form.location,form.linkedin].filter(Boolean).map((v,i)=>(
            <span key={i} style={{fontSize:10,color:"var(--mtx)",opacity:.65}}>{v}</span>
          ))}
        </div>
      </div>
      {form.summary&&<>
        <AtsSection title={cfg.profileLabel}/>
        <p style={{fontSize:11,lineHeight:1.75,color:"var(--mtx)",marginBottom:14}}>{form.summary}</p>
      </>}
      <AtsSection title={cfg.expLabel}/>
      {form.experiences.filter(e=>e.company||e.title).map((e,i)=>(
        <div key={e.id||i} style={{marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <strong style={{fontSize:11.5,color:"var(--mtx)"}}>{e.title}</strong>
            <span style={{fontSize:10,color:"var(--lbl)"}}>{e.dates}</span>
          </div>
          <div style={{fontSize:10.5,color:"var(--mtx)",opacity:.55,textTransform:"uppercase",letterSpacing:".06em",marginBottom:3}}>{e.company}</div>
          {e.desc&&<div style={{fontSize:10.5,lineHeight:1.65,color:"var(--mtx)",opacity:.8}}>{e.desc}</div>}
        </div>
      ))}
      <AtsSection title="Education"/>
      {form.education.map((e,i)=>(
        <div key={i} style={{marginBottom:8,display:"flex",justifyContent:"space-between"}}>
          <div>
            <div style={{fontSize:11.5,color:"var(--mtx)",fontWeight:500}}>{e.school}</div>
            <div style={{fontSize:10.5,color:"var(--mtx)",opacity:.6}}>{e.degree}</div>
          </div>
          <span style={{fontSize:10,color:"var(--lbl)"}}>{e.year}</span>
        </div>
      ))}
      <AtsSection title={cfg.skillsLabel}/>
      <div style={{fontSize:11,color:"var(--mtx)",lineHeight:1.8}}>{form.skills}</div>
      {form.languages.some(l=>l.name.trim())&&<>
        <AtsSection title="Languages"/>
        <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
          {form.languages.filter(l=>l.name.trim()).map((l,i)=>(
            <span key={i} style={{fontSize:10.5,color:"var(--mtx)"}}>{l.name} <span style={{color:"var(--lbl)",fontSize:9}}>({l.level}%)</span></span>
          ))}
        </div>
      </>}
      {form.special&&<>
        <AtsSection title={cfg.specialSection?.label||"Highlights"}/>
        <div style={{fontSize:11,lineHeight:1.8,color:"var(--mtx)",whiteSpace:"pre-line"}}>{form.special}</div>
      </>}
    </div>
  );
}

const AtsSection = ({title})=>(
  <div style={{fontSize:10,fontWeight:700,letterSpacing:".16em",textTransform:"uppercase",color:"var(--lbl)",borderTop:"1px solid var(--div)",paddingTop:8,marginTop:10,marginBottom:8,fontFamily:"var(--fb)"}}>{title}</div>
);

/* ── MODERN GRID — 2-col no sidebar, grid layout ── */
function LayoutGrid({form, cfg, secOrder}) {
  return (
    <div style={{width:"100%",background:"var(--mbg)",fontFamily:"var(--fb)"}}>
      {/* Accent strip */}
      <div style={{height:8,background:`linear-gradient(90deg, var(--acc), var(--acc)88)`}}/>
      {/* Header */}
      <div style={{padding:"24px 32px 16px",borderBottom:"1px solid var(--div)",display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
        <div>
          <div style={{fontFamily:"var(--fd)",fontSize:28,fontWeight:700,color:"var(--name)",lineHeight:1,marginBottom:6}}>{form.name||"Your Name"}</div>
          <div style={{fontSize:11,color:"var(--lbl)",letterSpacing:".16em",textTransform:"uppercase"}}>{form.title}</div>
        </div>
        <div style={{textAlign:"right",display:"flex",alignItems:"center",gap:14}}>
          <div>
            {[form.email,form.phone].filter(Boolean).map((v,i)=><div key={i} style={{fontSize:10,color:"var(--mtx)",opacity:.6,marginBottom:2}}>{v}</div>)}
            {[form.location,form.linkedin].filter(Boolean).map((v,i)=><div key={i} style={{fontSize:10,color:"var(--mtx)",opacity:.6,marginBottom:2}}>{v}</div>)}
          </div>
          {form.showPhoto&&form.photo&&(
            <div style={{width:64,height:64,borderRadius:"50%",border:"2px solid var(--acc)",overflow:"hidden",flexShrink:0}}>
              <img src={form.photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            </div>
          )}
        </div>
      </div>
      {/* 2-col body */}
      <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:0,minHeight:900}}>
        {/* Left col */}
        <div style={{borderRight:"1px solid var(--div)"}}>
          {form.summary&&<div style={{padding:"18px 24px",borderBottom:"1px solid var(--div)"}}>
            <SectionTitle>{cfg.profileLabel}</SectionTitle>
            <div style={{fontSize:11.5,lineHeight:1.8,color:"var(--mtx)",opacity:.85}}>{form.summary}</div>
          </div>}
          <div style={{padding:"18px 24px"}}>
            <SectionTitle>{cfg.expLabel}</SectionTitle>
            {form.experiences.filter(e=>e.company||e.title).map((e,i)=><ExpItem key={e.id||i} exp={e}/>)}
          </div>
        </div>
        {/* Right col */}
        <div style={{padding:"18px 20px"}}>
          <SectionTitle>Education</SectionTitle>
          {form.education.map((e,i)=>(
            <div key={i} style={{marginBottom:12}}>
              <div style={{fontSize:11,fontWeight:500,color:"var(--mtx)",marginBottom:2}}>{e.school}</div>
              <div style={{fontSize:10,color:"var(--mtx)",opacity:.55,lineHeight:1.4}}>{e.degree}</div>
              {e.year&&<div style={{fontSize:9.5,color:"var(--acc)",marginTop:2}}>{e.year}</div>}
            </div>
          ))}
          <SectionTitle style={{marginTop:14}}>{cfg.skillsLabel}</SectionTitle>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:14}}>
            {form.skills.split(",").map((s,i)=>s.trim()&&<span key={i} style={{fontSize:9.5,padding:"3px 8px",background:"var(--acc)18",border:"1px solid var(--acc)44",borderRadius:3,color:"var(--mtx)",opacity:.9}}>{s.trim()}</span>)}
          </div>
          {form.languages.some(l=>l.name.trim())&&<>
            <SectionTitle>Languages</SectionTitle>
            {form.languages.filter(l=>l.name.trim()).map((l,i)=><BarRow key={i} label={l.name} pct={l.level} showBar={true}/>)}
          </>}
          {form.tools.some(t=>t.name.trim())&&<>
            <SectionTitle style={{marginTop:10}}>Tools</SectionTitle>
            {form.tools.filter(t=>t.name.trim()).map((t,i)=><BarRow key={i} label={t.name} pct={t.level} showBar={true}/>)}
          </>}
          {form.special&&<>
            <SectionTitle style={{marginTop:10}}>{cfg.specialSection?.label}</SectionTitle>
            <div style={{fontSize:10.5,lineHeight:1.8,color:"var(--mtx)",opacity:.78,whiteSpace:"pre-line"}}>{form.special}</div>
          </>}
        </div>
      </div>
    </div>
  );
}

/* ── TIMELINE — left accent line with dots ── */
function LayoutTimeline({form, cfg, secOrder}) {
  return (
    <div style={{width:"100%",background:"var(--mbg)",fontFamily:"var(--fb)"}}>
      <div style={{display:"flex"}}>
        {/* Sidebar */}
        <div style={{width:210,background:"var(--sbg)",flexShrink:0}}>
          <div style={{height:5,background:"var(--acc)"}}/>
          <div style={{padding:"24px 18px 0",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",borderBottom:"1px solid rgba(255,255,255,.06)",marginBottom:16,paddingBottom:16}}>
            <div style={{width:64,height:64,borderRadius:"50%",border:"2px solid var(--acc)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--fd)",fontSize:22,fontWeight:600,color:"var(--acc)",marginBottom:10,overflow:"hidden",flexShrink:0}}>
              {form.showPhoto&&form.photo?<img src={form.photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"}}/>:initials(form.name)}
            </div>
          </div>
          <Sidebar form={form} cfg={cfg} tpl="timeline" hideAvatar={true}/>
        </div>
        {/* Timeline main */}
        <div style={{flex:1}}>
          <div style={{height:5,background:"var(--acc)",opacity:.2}}/>
          <div style={{padding:"24px 28px 18px",borderBottom:"1px solid var(--div)"}}>
            <div style={{fontFamily:"var(--fd)",fontSize:24,fontWeight:700,color:"var(--name)",lineHeight:1.1,marginBottom:4}}>{form.name||"Your Name"}</div>
            <div style={{fontSize:10.5,color:"var(--lbl)",letterSpacing:".14em",textTransform:"uppercase"}}>{form.title}</div>
          </div>
          {form.summary&&<div style={{padding:"16px 28px",borderBottom:"1px solid var(--div)"}}>
            <SectionTitle>{cfg.profileLabel}</SectionTitle>
            <div style={{fontSize:11.5,lineHeight:1.8,color:"var(--mtx)",opacity:.85}}>{form.summary}</div>
          </div>}
          <div style={{padding:"16px 28px"}}>
            <SectionTitle>{cfg.expLabel}</SectionTitle>
            {form.experiences.filter(e=>e.company||e.title).map((e,i,arr)=>(
              <div key={e.id||i} style={{display:"flex",gap:0,marginBottom:16,position:"relative"}}>
                {/* Timeline spine */}
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:24,flexShrink:0,marginRight:14}}>
                  <div style={{width:10,height:10,borderRadius:"50%",background:"var(--acc)",flexShrink:0,marginTop:4,zIndex:1}}/>
                  {i<arr.length-1&&<div style={{width:2,flex:1,background:"var(--div)",marginTop:3}}/>}
                </div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:2}}>
                    <span style={{fontFamily:"var(--fd)",fontSize:13,fontWeight:600,color:"var(--mtx)"}}>{e.title}</span>
                    <span style={{fontSize:9,color:"var(--lbl)",letterSpacing:".05em",whiteSpace:"nowrap"}}>{e.dates}</span>
                  </div>
                  <div style={{fontSize:9.5,color:"var(--mtx)",opacity:.5,textTransform:"uppercase",letterSpacing:".07em",marginBottom:4}}>{e.company}</div>
                  {e.desc&&<div style={{fontSize:10.5,lineHeight:1.65,color:"var(--mtx)",opacity:.75}}>{e.desc}</div>}
                </div>
              </div>
            ))}
          </div>
          {form.special&&<div style={{padding:"0 28px 16px"}}>
            <SectionTitle>{cfg.specialSection?.label}</SectionTitle>
            <div style={{fontSize:11,lineHeight:1.85,color:"var(--mtx)",opacity:.78,whiteSpace:"pre-line"}}>{form.special}</div>
          </div>}
        </div>
      </div>
    </div>
  );
}

/* ─── PAGE 2+ LAYOUT ────────────────────────────────────────────────────────── */
function ExtraPage({page, index, cfg, tpl, cssVars, onUpdate, onDelete}) {
  const isSidebar = !FULL_WIDTH_TPLS.has(tpl) && !BANNER_TPLS.has(tpl);
  return (
    <div style={{width:794,background:"var(--mbg)",boxShadow:"0 20px 80px rgba(0,0,0,.65)",marginTop:16,position:"relative",overflow:"hidden",...cssVars,"--fd":cssVars["--fd"],"--fb":cssVars["--fb"]}}>
      {/* page label */}
      <div style={{position:"absolute",top:8,right:10,fontSize:9,letterSpacing:".12em",textTransform:"uppercase",color:"var(--lbl)",opacity:.4,fontFamily:"var(--fb)"}}>Page {index+2}</div>
      {/* delete button */}
      <button onClick={onDelete} style={{position:"absolute",top:6,left:10,background:"none",border:"none",color:"var(--lbl)",opacity:.3,cursor:"pointer",fontSize:13,lineHeight:1,padding:4,transition:"opacity .15s"}}
        onMouseEnter={e=>(e.currentTarget as HTMLElement).style.opacity=".8"} onMouseLeave={e=>(e.currentTarget as HTMLElement).style.opacity=".3"}>×</button>

      <div style={{display:"flex",width:"100%",minHeight:400}}>
        {/* sidebar strip if layout has one */}
        {isSidebar && (
          <div style={{width:232,minWidth:232,background:"var(--sbg)",padding:"32px 0 24px"}}>
            <div style={{height:3,background:"var(--acc)",width:"100%",marginBottom:20}}/>
            {/* free-form sidebar notes */}
            <div style={{padding:"0 18px"}}>
              <div style={{fontSize:8,letterSpacing:".16em",textTransform:"uppercase",color:"var(--acc)",marginBottom:6,fontFamily:"var(--fb)"}}>Additional Info</div>
              <textarea
                value={page.sideNote||""}
                onChange={e=>onUpdate({...page, sideNote:e.target.value})}
                placeholder="Optional: certifications, awards, languages..."
                style={{width:"100%",background:"transparent",border:"1px solid rgba(255,255,255,.1)",borderRadius:4,padding:"6px 8px",fontSize:10,color:"var(--stx)",fontFamily:"var(--fb)",resize:"none",outline:"none",minHeight:120,lineHeight:1.6,opacity:.8}}
              />
            </div>
          </div>
        )}
        {/* main content */}
        <div style={{flex:1,padding:"28px 30px"}}>
          {/* section title */}
          <input
            value={page.title||""}
            onChange={e=>onUpdate({...page, title:e.target.value})}
            placeholder="Section title (e.g. Additional Experience, Projects, Publications…)"
            style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid var(--div)",marginBottom:16,paddingBottom:6,fontSize:8.5,letterSpacing:".18em",textTransform:"uppercase",color:"var(--lbl)",fontFamily:"var(--fb)",outline:"none"}}
          />
          {/* experience entries for this page */}
          {(page.experiences||[]).map((exp,i)=>(
            <div key={exp.id||i} style={{marginBottom:18,paddingBottom:18,borderBottom:"1px solid var(--div)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6,gap:8}}>
                <div style={{flex:1}}>
                  <input value={exp.title||""} onChange={e=>{const exps=[...page.experiences];exps[i]={...exps[i],title:e.target.value};onUpdate({...page,experiences:exps});}}
                    placeholder="Role / Project title"
                    style={{width:"100%",background:"transparent",border:"none",borderBottom:"1px solid var(--div)",paddingBottom:3,fontSize:13,fontFamily:"var(--fd)",fontWeight:600,color:"var(--mtx)",outline:"none",marginBottom:4}}/>
                  <input value={exp.company||""} onChange={e=>{const exps=[...page.experiences];exps[i]={...exps[i],company:e.target.value};onUpdate({...page,experiences:exps});}}
                    placeholder="Company / Organization"
                    style={{width:"100%",background:"transparent",border:"none",fontSize:10,color:"var(--mtx)",opacity:.5,textTransform:"uppercase",letterSpacing:".07em",fontFamily:"var(--fb)",outline:"none"}}/>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                  <input value={exp.dates||""} onChange={e=>{const exps=[...page.experiences];exps[i]={...exps[i],dates:e.target.value};onUpdate({...page,experiences:exps});}}
                    placeholder="Dates"
                    style={{background:"transparent",border:"none",fontSize:9.5,color:"var(--lbl)",fontFamily:"var(--fb)",outline:"none",textAlign:"right",width:100}}/>
                  {(page.experiences||[]).length>1&&<button onClick={()=>{const exps=page.experiences.filter((_,x)=>x!==i);onUpdate({...page,experiences:exps});}}
                    style={{background:"none",border:"none",color:"var(--lbl)",opacity:.4,cursor:"pointer",fontSize:14,lineHeight:1,padding:0}}>×</button>}
                </div>
              </div>
              <textarea value={exp.desc||""} onChange={e=>{const exps=[...page.experiences];exps[i]={...exps[i],desc:e.target.value};onUpdate({...page,experiences:exps});}}
                placeholder="Description…"
                style={{width:"100%",background:"transparent",border:"1px solid rgba(128,128,128,.12)",borderRadius:4,padding:"6px 8px",fontSize:11,lineHeight:1.7,color:"var(--mtx)",opacity:.8,fontFamily:"var(--fb)",resize:"none",outline:"none",minHeight:64}}/>
            </div>
          ))}
          {/* add entry button */}
          <button onClick={()=>onUpdate({...page,experiences:[...(page.experiences||[]),{id:mkId(),title:"",company:"",dates:"",desc:""}]})}
            style={{background:"transparent",border:"1px dashed var(--div)",borderRadius:6,padding:"7px 14px",fontSize:10.5,color:"var(--lbl)",opacity:.6,cursor:"pointer",fontFamily:"var(--fb)",transition:"opacity .15s",marginTop:4}}
            onMouseEnter={e=>(e.currentTarget as HTMLElement).style.opacity="1"} onMouseLeave={e=>(e.currentTarget as HTMLElement).style.opacity=".6"}>
            + Add Entry
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── RESUME ROUTER ─────────────────────────────────────────────────────────── */
function ResumeDoc({form, cfg, tpl, expMode, cssVars, docRef}) {
  const so = form.secOrder || ["profile","experience","special"];
  const props = {form, cfg, tpl, secOrder:so};
  let inner;
  if (tpl==="compactATS")                       inner = <LayoutATS {...props}/>;
  else if (tpl==="modernGrid")                  inner = <LayoutGrid {...props}/>;
  else if (tpl==="timeline")                    inner = <LayoutTimeline {...props}/>;
  else if (BANNER_TPLS.has(tpl))               inner = <LayoutBanner {...props}/>;
  else                                           inner = <LayoutSidebar {...props}/>;

  return (
    <div ref={docRef} className={`r-doc ${expMode==="dark"?"r-doc-dark":""}`} style={cssVars}>
      {inner}
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────────── */
function ResumeBuilder() {
  const [profession,  setProfession]   = useState("executive");
  const [template,    setTemplate]     = useState("classic");
  const [exportMode,  setExportMode]   = useState("color");
  const [form,        setForm]         = useState(()=>mkForm("executive"));
  const [tab,         setTab]          = useState("personal");
  const [customProfs, setCustomProfs]  = useState([]);
  const [profModal,   setProfModal]    = useState(false);
  const [newLabel,    setNewLabel]     = useState("");
  const [newIcon,     setNewIcon]      = useState("◇");
  const [newAccentC,  setNewAccentC]   = useState("#7A6EDD");

  const photoRef   = useRef(null);
  const resumeRef  = useRef(null);

  const allCfgs = {...PROFESSION_CONFIG};
  customProfs.forEach(cp=>{ allCfgs[cp.id]=cp.config; });
  const cfg      = allCfgs[profession] || CUSTOM_BASE;
  const cssVars  = getVars(cfg, template, exportMode);

  /* ── profession ── */
  const switchProf = (id) => { setProfession(id); setForm(mkForm(id)); };
  const addProf = () => {
    if (!newLabel.trim()) return;
    const id = "cp_"+Date.now();
    const config = {...CUSTOM_BASE, accent:newAccentC, subAccent:newAccentC+"CC", profileLabel:newLabel.toUpperCase().slice(0,20)+" PROFILE"};
    setCustomProfs(p=>[...p,{id,label:newLabel.trim(),icon:newIcon,config}]);
    setProfession(id); setForm(mkForm(id));
    setNewLabel(""); setNewIcon("◇"); setNewAccentC("#7A6EDD"); setProfModal(false);
  };
  const removeProf = (id) => { setCustomProfs(p=>p.filter(c=>c.id!==id)); if(profession===id) switchProf("executive"); };

  /* ── form ── */
  const upd = (k,v) => setForm(f=>({...f,[k]:v}));

  const updExp = (i,k,v) => { const a=[...form.experiences]; a[i]={...a[i],[k]:v}; upd("experiences",a); };
  const addExp = () => { if(form.experiences.length<6) upd("experiences",[...form.experiences,{id:mkId(),company:"",title:"",dates:"",desc:""}]); };
  const delExp = (i) => upd("experiences",form.experiences.filter((_,x)=>x!==i));

  const updEdu = (i,k,v) => { const a=[...form.education]; a[i]={...a[i],[k]:v}; upd("education",a); };

  const updLang = (i,k,v) => { const a=[...form.languages]; a[i]={...a[i],[k]:v}; upd("languages",a); };
  const addLang = () => { if(form.languages.length<6) upd("languages",[...form.languages,{name:"",level:80}]); };
  const delLang = (i) => upd("languages",form.languages.filter((_,x)=>x!==i));

  const updTool = (i,k,v) => { const a=[...form.tools]; a[i]={...a[i],[k]:v}; upd("tools",a); };
  const addTool = () => { if(form.tools.length<8) upd("tools",[...form.tools,{name:"",level:80}]); };
  const delTool = (i) => upd("tools",form.tools.filter((_,x)=>x!==i));

  /* ── photo ── */
  const loadPhoto = (file) => {
    if (!file?.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => upd("photo", e.target.result);
    reader.readAsDataURL(file);
  };

  /* ── PDF export ── */
  const exportHTML = () => {
    if (!resumeRef.current) return;
    const root = resumeRef.current;

    const rootStyle = getComputedStyle(root);
    const VAR_NAMES = ["--fd","--fb","--acc","--sbg","--stx","--mbg","--mtx","--div","--lbl","--name"];
    const varMap = {};
    VAR_NAMES.forEach(function(v) { varMap[v] = rootStyle.getPropertyValue(v).trim(); });

    const resolveStyle = function(styleStr) {
      if (!styleStr) return styleStr;
      let result = styleStr;
      Object.keys(varMap).forEach(function(key) {
        result = result.split("var(" + key + ")").join(varMap[key] || "");
        result = result.split("var(" + key + " )").join(varMap[key] || "");
      });
      return result;
    };

    const clone = root.cloneNode(true);
    const allEls = [clone].concat(Array.from(clone.querySelectorAll("*")));
    allEls.forEach(function(el) {
      const styleAttr = el.getAttribute("style");
      if (styleAttr) el.setAttribute("style", resolveStyle(styleAttr));
    });

    const rootVarsCss = VAR_NAMES.map(function(v) { return v + ":" + varMap[v]; }).join(";");
    clone.setAttribute("style", (clone.getAttribute("style") || "") + ";" + rootVarsCss);

    const FONTS = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@300;400;500&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap";

    const fullHTML = "<!DOCTYPE html><html><head><meta charset=\"utf-8\"/><title>Resume</title>"
      + "<link rel=\"stylesheet\" href=\"" + FONTS + "\"/>"
      + "<style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}"
      + "html,body{margin:0;padding:0;width:100%;height:100%;background:white;}"
      + "body{display:block;}"
      + ".r-doc{width:100%!important;min-height:297mm;}"
      + "@page{size:A4 portrait;margin:0;}"
      + ".sb-top{padding:24px 18px 16px;display:flex;flex-direction:column;align-items:center;text-align:center;border-bottom:1px solid rgba(255,255,255,.06);margin-bottom:16px;}"
      + ".sb-avatar{width:68px;height:68px;border-radius:50%;border:2px solid;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;}"
      + ".sb-initials{font-size:22px;font-weight:600;}"
      + ".resume-name-el{display:inline;}"
      + "@media print{*{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}}"
      + "</style></head><body>"
      + clone.outerHTML
      + "<scr" + "ipt>document.fonts.ready.then(function(){setTimeout(function(){window.print();},600);});</scr" + "ipt>"
      + "</body></html>";

    const blob = new Blob([fullHTML], { type: "text/html;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "resume.html";
    a.click();
    URL.revokeObjectURL(url);
  };
  /* ── drag & drop ── */
  const setExps = useCallback(exps=>upd("experiences",exps),[]);
  const setSecs = useCallback(secs=>upd("secOrder",secs),[]);
  const expDrag = useDrag(form.experiences, setExps);
  const secDrag = useDrag(form.secOrder||[], setSecs);

  const addPage   = () => upd("pages",[...(form.pages||[]),{id:mkId(),title:"Additional Experience",experiences:[{id:mkId(),title:"",company:"",dates:"",desc:""}],sideNote:""}]);
  const updatePage= (i,val) => { const p=[...(form.pages||[])]; p[i]=val; upd("pages",p); };
  const deletePage= (i) => upd("pages",(form.pages||[]).filter((_,x)=>x!==i));

  const allProfs = [...Object.entries(PROFESSION_CONFIG).map(([id])=>({id,label:PROFESSIONS_LABEL[id],icon:PROFESSIONS_ICON[id]})), ...customProfs.map(cp=>({id:cp.id,label:cp.label,icon:cp.icon,custom:true}))];
  const SEC_NAMES = {profile:cfg.profileLabel, experience:cfg.expLabel, special:cfg.specialSection?.label||"Highlights"};

  return (
    <>
      <style>{`
        ${GOOGLE_FONTS}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body{background:#0A0C14!important;font-family:'DM Sans',sans-serif!important;margin:0!important;padding:0!important;color:#fff!important;}
        .shell{display:flex;flex-direction:column;background:#0A0C14!important;}

        /* panel */
        .panel{width:100%;background:#10121C!important;border-bottom:1px solid #1C1F30!important;display:flex;flex-direction:column;}
        .ph{padding:16px 20px 12px;border-bottom:1px solid #181A28!important;background:#0D0F18!important;}
        .ph-title{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;color:#F0EAD6;letter-spacing:.02em;}
        .ph-sub{font-size:10.5px;color:#3A3E58;margin-top:1px;}

        /* profession grid */
        .prof-grid{display:flex;flex-wrap:wrap;gap:5px;padding:10px 20px;border-bottom:1px solid #181A28!important;background:#10121C!important;}
        .ppill{display:flex;align-items:center;gap:5px;padding:6px 10px;background:#161826;border:1px solid #232538;border-radius:7px;cursor:pointer;transition:all .15s;font-size:10.5px;color:#5A5E78;font-family:'DM Sans',sans-serif;position:relative;white-space:nowrap;}
        .ppill:hover{background:#1C1F34;border-color:#323555;color:#9A9EC0;}
        .ppill.on{background:#18203A;border-color:var(--pc,#4A6EDD);color:#D8DCFF;}
        .ppill-icon{font-size:12px;opacity:.75;flex-shrink:0;}
        .ppill-x{position:absolute;top:-5px;right:-5px;width:15px;height:15px;border-radius:50%;background:#3A1010;border:1px solid #5A2020;color:#AA3333;font-size:9px;line-height:13px;text-align:center;cursor:pointer;display:none;z-index:5;}
        .ppill:hover .ppill-x{display:block;}
        .ppill-x:hover{background:#5A1010;color:#FF6666;}
        .add-prof{display:flex;align-items:center;justify-content:center;gap:5px;padding:7px 8px;background:transparent;border:1px dashed #222438;border-radius:7px;cursor:pointer;font-size:10.5px;color:#323555;transition:all .15s;font-family:'DM Sans',sans-serif;}
        .add-prof:hover{border-color:#4A6EDD;color:#7A8EDD;background:#161826;}

        /* templates */
        .tpl-wrap{padding:8px 20px 10px;border-bottom:1px solid #181A28!important;background:#10121C!important;}
        .tpl-hed{font-size:8.5px;letter-spacing:.14em;text-transform:uppercase;color:#2E3248;font-family:'DM Sans',sans-serif;margin-bottom:7px;}
        .tpl-grp{margin-bottom:7px;}
        .tpl-glabel{font-size:7.5px;letter-spacing:.12em;text-transform:uppercase;color:#252840;font-family:'DM Sans',sans-serif;margin-bottom:4px;}
        .tpl-row{display:flex;flex-wrap:wrap;gap:3px;}
        .tbtn{padding:3px 8px;background:#161826;border:1px solid #222438;border-radius:4px;cursor:pointer;font-size:9.5px;color:#484C68;font-family:'DM Sans',sans-serif;transition:all .13s;white-space:nowrap;}
        .tbtn:hover{border-color:#32355A;color:#8A8EB8;}
        .tbtn.on{background:#18203A;border-color:#4A6EDD;color:#B0B8F8;}

        /* export */
        .exp-row{display:flex;gap:4px;padding:7px 20px;border-bottom:1px solid #181A28!important;background:#10121C!important;}
        .ebtn{flex:1;padding:5px 4px;background:#161826;border:1px solid #222438;border-radius:4px;cursor:pointer;font-size:9px;color:#484C68;font-family:'DM Sans',sans-serif;transition:all .13s;letter-spacing:.04em;text-transform:uppercase;}
        .ebtn:hover{color:#8A8EB8;border-color:#32355A;}
        .ebtn.on{background:#18203A;border-color:#4A6EDD;color:#B0B8F8;}

        /* tabs */
        .ftabs{display:flex;border-bottom:1px solid #181A28!important;padding:0 20px;overflow-x:auto;scrollbar-width:none;flex-shrink:0;background:#10121C!important;}
        .ftabs::-webkit-scrollbar{display:none;}
        .ftab{padding:8px 9px;font-size:9.5px;color:#32354E!important;cursor:pointer;border-bottom:2px solid transparent;white-space:nowrap;font-family:'DM Sans',sans-serif;letter-spacing:.05em;text-transform:uppercase;transition:all .13s;background:transparent!important;}
        .ftab:hover{color:#6A6E8A;}
        .ftab.on{color:#9AA0CC!important;border-bottom-color:#4A6EDD!important;background:transparent!important;}

        /* form */
        .fscroll{padding:14px 20px 16px;background:#10121C!important;}
        .fscroll::-webkit-scrollbar{width:3px;}
        .fscroll::-webkit-scrollbar-thumb{background:#1C2030;border-radius:2px;}
        .fg{margin-bottom:13px;}
        .flabel{display:block;font-size:9.5px;color:#40445E;letter-spacing:.08em;text-transform:uppercase;margin-bottom:4px;font-family:'DM Sans',sans-serif;}
        .fi{width:100%;background:#161826;border:1px solid #222438;border-radius:5px;padding:7px 10px;font-size:12px;color:#A8ACCB;font-family:'DM Sans',sans-serif;transition:border-color .13s;outline:none;}
        .fi:focus{border-color:#4A6EDD;}
        .fi::placeholder{color:#282A40;}
        textarea.fi{resize:vertical;min-height:68px;line-height:1.5;}
        .frow{display:grid;grid-template-columns:1fr 1fr;gap:8px;}

        /* cards */
        .card{background:#161826;border:1px solid #222438;border-radius:7px;padding:11px;margin-bottom:9px;}
        .card.drag-over{border-color:#4A6EDD;background:#181E38;}
        .card-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;}
        .card-num{font-size:9px;color:#4A6EDD;text-transform:uppercase;letter-spacing:.1em;}
        .dhandle{font-size:11px;color:#252840;cursor:grab;user-select:none;margin-right:4px;}
        .dhandle:active{cursor:grabbing;}
        .rmbtn{background:none;border:none;color:#3A1A1A;cursor:pointer;font-size:14px;line-height:1;padding:0;transition:color .13s;}
        .rmbtn:hover{color:#CC3333;}
        .addbtn{width:100%;padding:8px;background:transparent;border:1px dashed #222438;border-radius:7px;color:#333558;font-size:11px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .13s;margin-top:2px;}
        .addbtn:hover{border-color:#4A6EDD;color:#7A8EDD;}

        /* photo */
        .photo-trow{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}
        .toggle{position:relative;width:32px;height:17px;cursor:pointer;display:inline-block;}
        .toggle input{opacity:0;width:0;height:0;}
        .ttrack{position:absolute;inset:0;background:#1A1D2C;border-radius:10px;transition:.2s;}
        .toggle input:checked+.ttrack{background:#2A4EBB;}
        .tthumb{position:absolute;top:2px;left:2px;width:13px;height:13px;background:#fff;border-radius:50%;transition:.2s;pointer-events:none;}
        .toggle input:checked~.tthumb{left:17px;}
        .pdrop{border:1px dashed #222438;border-radius:7px;padding:14px;text-align:center;cursor:pointer;transition:all .15s;background:#0E1020;}
        .pdrop:hover{border-color:#4A6EDD;background:#12183A;}
        .pdrop-txt{font-size:10px;color:#32354E;font-family:'DM Sans',sans-serif;margin-top:5px;}
        .ppreview{position:relative;display:inline-block;}
        .pimg{width:68px;height:68px;border-radius:50%;object-fit:cover;border:2px solid #4A6EDD;display:block;}
        .pclear{position:absolute;top:-4px;right:-4px;width:15px;height:15px;background:#3A1010;border:1px solid #5A2020;border-radius:50%;color:#CC3333;font-size:9px;line-height:13px;text-align:center;cursor:pointer;}

        /* slider */
        .sbadge{font-size:10px;color:#4A6EDD;font-weight:600;background:#161826;border:1px solid #1E2660;border-radius:3px;padding:1px 6px;}
        .strk{position:relative;height:5px;background:#0C0F1E;border-radius:3px;border:1px solid #1C1F30;margin-bottom:4px;}
        .sfill{position:absolute;top:0;left:0;height:100%;background:linear-gradient(90deg,#2A4EBB,#4A9EF5);border-radius:3px;pointer-events:none;transition:width .07s;}
        .sinput{position:absolute;top:50%;left:0;width:100%;transform:translateY(-50%);height:100%;opacity:0;cursor:pointer;margin:0;}
        .slabels{display:flex;justify-content:space-between;font-size:8px;color:#28294A;font-family:'DM Sans',sans-serif;}

        /* section order */
        .sec-list{display:flex;flex-direction:column;gap:4px;margin-bottom:12px;}
        .sec-item{display:flex;align-items:center;gap:7px;padding:7px 9px;background:#161826;border:1px solid #222438;border-radius:5px;cursor:grab;font-size:11px;color:#7A7EA0;font-family:'DM Sans',sans-serif;transition:all .13s;}
        .sec-item:active{cursor:grabbing;}
        .sec-item.drag-over{border-color:#4A6EDD;}
        .sec-info{font-size:9.5px;color:#2A2E48;margin-top:8px;line-height:1.5;}

        /* print bar */
        .pbar{padding:11px 20px;border-top:1px solid #181A28!important;background:#0D0F18!important;}
        .pbtn{width:100%;padding:10px;background:linear-gradient(135deg,#2A4EBB,#1A3A9E);border:none;border-radius:7px;color:#E0E8FF;font-size:12px;font-family:'DM Sans',sans-serif;cursor:pointer;letter-spacing:.04em;transition:all .17s;}
        .pbtn:hover{background:linear-gradient(135deg,#3A5ECC,#2A4ABA);transform:translateY(-1px);}

        /* preview panel */
        .preview{background:#07080E;padding:24px 16px 48px;overflow-x:auto;overflow-y:visible;display:flex;justify-content:flex-start;}
        .preview::-webkit-scrollbar{width:4px;}
        .preview::-webkit-scrollbar-thumb{background:#14162A;border-radius:2px;}

        /* resume doc */
        .r-scale{width:100%;display:flex;justify-content:center;overflow:hidden;}
        .r-doc{width:794px;flex-shrink:0;background:var(--mbg);box-shadow:0 20px 80px rgba(0,0,0,.65);overflow:visible;transition:all .35s;transform-origin:top center;}
        .sb-top{padding:24px 18px 16px;display:flex;flex-direction:column;align-items:center;text-align:center;border-bottom:1px solid rgba(255,255,255,.06);margin-bottom:16px;}
        .sb-avatar{width:68px;height:68px;border-radius:50%;border:2px solid var(--acc);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;}
        .sb-initials{font-family:var(--fd);font-size:22px;font-weight:600;color:var(--acc);}
        .r-doc-dark{box-shadow:0 20px 80px rgba(0,0,0,.85),0 0 0 1px rgba(255,255,255,.04);}

        /* modal */
        .moverlay{position:fixed;inset:0;background:rgba(0,0,0,.8);display:flex;align-items:center;justify-content:center;z-index:999;backdrop-filter:blur(5px);}
        .mbox{background:#12141E;border:1px solid #222438;border-radius:12px;padding:22px;width:360px;max-width:92vw;box-shadow:0 24px 80px rgba(0,0,0,.75);}
        .mtitle{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:600;color:#F0EAD6;margin-bottom:3px;}
        .msub{font-size:10.5px;color:#3A3E58;margin-bottom:16px;}
        .mlabel{display:block;font-size:9.5px;color:#40445E;letter-spacing:.08em;text-transform:uppercase;margin-bottom:4px;font-family:'DM Sans',sans-serif;}
        .minput{width:100%;background:#161826;border:1px solid #222438;border-radius:5px;padding:7px 10px;font-size:12px;color:#A8ACCB;font-family:'DM Sans',sans-serif;outline:none;margin-bottom:13px;transition:border-color .13s;}
        .minput:focus{border-color:#4A6EDD;}
        .minput::placeholder{color:#282A40;}
        .ipick{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:13px;}
        .iopt{width:28px;height:28px;display:flex;align-items:center;justify-content:center;background:#161826;border:1px solid #222438;border-radius:4px;cursor:pointer;font-size:13px;color:#6A6E90;transition:all .13s;}
        .iopt:hover{border-color:#4A6EDD;color:#B0B8F8;}
        .iopt.on{background:#18203A;border-color:#4A6EDD;color:#B0B8F8;}
        .cpick{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;}
        .copt{width:22px;height:22px;border-radius:50%;cursor:pointer;border:2px solid transparent;transition:all .13s;}
        .copt:hover{transform:scale(1.2);}
        .copt.on{border-color:#FFF;box-shadow:0 0 0 2px rgba(255,255,255,.2);}
        .macts{display:flex;gap:6px;}
        .mcancel{flex:1;padding:8px;background:transparent;border:1px solid #222438;border-radius:6px;color:#3A3E58;font-size:11.5px;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all .13s;}
        .mcancel:hover{border-color:#3A3D55;color:#6A6E8A;}
        .mconfirm{flex:2;padding:8px;background:linear-gradient(135deg,#2A4EBB,#1A3A9E);border:none;border-radius:6px;color:#E0E8FF;font-size:11.5px;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all .13s;}
        .mconfirm:hover{background:linear-gradient(135deg,#3A5ECC,#2A4ABA);}
        .mconfirm:disabled{opacity:.3;cursor:not-allowed;}

        @media print {
          body{background:white!important;}
          .panel,.moverlay{display:none!important;}
          .preview{padding:0!important;background:white!important;overflow:visible!important;}
          .r-doc{width:100%!important;box-shadow:none!important;min-height:100vh!important;}
          .shell{height:auto!important;}
        }
      `}</style>

      {/* MODAL */}
      {profModal&&(
        <div className="moverlay" onClick={e=>e.target===e.currentTarget&&setProfModal(false)}>
          <div className="mbox">
            <div className="mtitle">Add Your Profession</div>
            <div className="msub">Create a custom template for your field</div>
            <label className="mlabel">Profession Name</label>
            <input className="minput" placeholder="e.g. UX Designer, Lawyer, Chef…"
              value={newLabel} onChange={e=>setNewLabel(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&newLabel.trim()&&addProf()} autoFocus/>
            <label className="mlabel">Icon</label>
            <div className="ipick">
              {ICONS.map(ic=><button key={ic} className={`iopt ${newIcon===ic?"on":""}`} onClick={()=>setNewIcon(ic)}>{ic}</button>)}
            </div>
            <label className="mlabel">Accent Color</label>
            <div className="cpick">
              {ACCENT_COLORS.map(c=><div key={c.v} className={`copt ${newAccentC===c.v?"on":""}`} style={{background:c.v}} onClick={()=>setNewAccentC(c.v)}/>)}
            </div>
            <div className="macts">
              <button className="mcancel" onClick={()=>setProfModal(false)}>Cancel</button>
              <button className="mconfirm" onClick={addProf} disabled={!newLabel.trim()}>Create Profession</button>
            </div>
          </div>
        </div>
      )}

      <div className="shell">
        {/* ─── LEFT PANEL ─── */}
        <aside className="panel">
          <div className="ph">
            <div className="ph-title">Resume Builder</div>
            <div className="ph-sub">Professional · Print-Ready · Tailored</div>
          </div>

          {/* Profession grid */}
          <div className="prof-grid">
            {allProfs.map(p=>(
              <button key={p.id} className={`ppill ${profession===p.id?"on":""}`}
                style={{"--pc":allCfgs[p.id]?.accent||"#4A6EDD"} as React.CSSProperties}
                onClick={()=>switchProf(p.id)}>
                <span className="ppill-icon">{p.icon}</span>
                {p.label}
                {"custom" in p && p.custom&&<span className="ppill-x" onClick={e=>{e.stopPropagation();removeProf(p.id);}}>×</span>}
              </button>
            ))}
            <button className="add-prof" onClick={()=>setProfModal(true)}>
              <span style={{fontSize:14,lineHeight:1}}>+</span> Add Profession
            </button>
          </div>

          {/* Template picker */}
          <div className="tpl-wrap">
            <div className="tpl-hed">Template</div>
            {TEMPLATE_GROUPS.map(g=>(
              <div className="tpl-grp" key={g.label}>
                <div className="tpl-glabel">{g.label}</div>
                <div className="tpl-row">
                  {g.items.map(t=>(
                    <button key={t.id} className={`tbtn ${template===t.id?"on":""}`} onClick={()=>setTemplate(t.id)}>{t.label}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Export mode */}
          <div className="exp-row">
            {[{id:"color",l:"🎨 Color"},{id:"dark",l:"🌙 Dark"},{id:"print",l:"🖨 Print/ATS"}].map(m=>(
              <button key={m.id} className={`ebtn ${exportMode===m.id?"on":""}`} onClick={()=>setExportMode(m.id)}>{m.l}</button>
            ))}
          </div>

          {/* Tabs */}
          <div className="ftabs">
            {["personal","experience","education","skills","languages","tools","layout"].map(t=>(
              <button key={t} className={`ftab ${tab===t?"on":""}`} onClick={()=>setTab(t)}>{t}</button>
            ))}
          </div>

          {/* Form scroll */}
          <div className="fscroll">

            {/* PERSONAL */}
            {tab==="personal"&&<>
              <div className="fg">
                <div className="photo-trow">
                  <span className="flabel" style={{margin:0}}>Profile Photo</span>
                  <label className="toggle">
                    <input type="checkbox" checked={form.showPhoto} onChange={e=>{upd("showPhoto",e.target.checked);}}/>
                    <span className="ttrack"/>
                    <span className="tthumb"/>
                  </label>
                </div>
                {form.showPhoto&&(form.photo?(
                  <div style={{display:"flex",justifyContent:"center",marginBottom:10}}>
                    <div className="ppreview">
                      <img className="pimg" src={form.photo} alt=""/>
                      <span className="pclear" onClick={()=>upd("photo",null)}>×</span>
                    </div>
                  </div>
                ):(
                  <div className="pdrop" onDrop={e=>{e.preventDefault();loadPhoto(e.dataTransfer.files[0]);}}
                    onDragOver={e=>e.preventDefault()} onClick={()=>photoRef.current?.click()}>
                    <div style={{fontSize:20,opacity:.25}}>⬆</div>
                    <div className="pdrop-txt">Drop or click to upload a photo</div>
                    <input ref={photoRef} type="file" accept="image/*" style={{display:"none"}}
                      onChange={e=>loadPhoto(e.target.files[0])}/>
                  </div>
                ))}
              </div>
              <div className="fg"><label className="flabel">Full Name</label>
                <input className="fi" value={form.name} onChange={e=>upd("name",e.target.value)} placeholder="Your full name"/></div>
              <div className="fg"><label className="flabel">Job Title</label>
                <input className="fi" value={form.title} onChange={e=>upd("title",e.target.value)} placeholder="Your title"/></div>
              <div className="frow">
                <div className="fg"><label className="flabel">Email</label><input className="fi" value={form.email} onChange={e=>upd("email",e.target.value)} placeholder="email@example.com"/></div>
                <div className="fg"><label className="flabel">Phone</label><input className="fi" value={form.phone} onChange={e=>upd("phone",e.target.value)} placeholder="+1 (555) 000-0000"/></div>
              </div>
              <div className="frow">
                <div className="fg"><label className="flabel">Location</label><input className="fi" value={form.location} onChange={e=>upd("location",e.target.value)} placeholder="City, State"/></div>
                <div className="fg"><label className="flabel">LinkedIn</label><input className="fi" value={form.linkedin} onChange={e=>upd("linkedin",e.target.value)} placeholder="linkedin.com/in/..."/></div>
              </div>
              <div className="fg"><label className="flabel">Summary</label>
                <textarea className="fi" rows={5} value={form.summary} onChange={e=>upd("summary",e.target.value)} placeholder="Brief professional summary…"/></div>
            </>}

            {/* EXPERIENCE */}
            {tab==="experience"&&<>
              <div className="flabel" style={{marginBottom:6,opacity:.5}}>⠿ Drag to reorder</div>
              {form.experiences.map((exp,i)=>(
                <div key={exp.id||i} className={`card ${expDrag.overIdx===i?"drag-over":""}`}
                  draggable onDragStart={()=>expDrag.start(i)} onDragOver={e=>expDrag.over(e,i)} onDragEnd={expDrag.end}>
                  <div className="card-hd">
                    <span style={{display:"flex",alignItems:"center",gap:3}}>
                      <span className="dhandle">⠿</span>
                      <span className="card-num">Position {i+1}</span>
                    </span>
                    {form.experiences.length>1&&<button className="rmbtn" onClick={()=>delExp(i)}>×</button>}
                  </div>
                  <div className="fg"><label className="flabel">Company</label><input className="fi" value={exp.company} onChange={e=>updExp(i,"company",e.target.value)}/></div>
                  <div className="frow">
                    <div className="fg"><label className="flabel">Title</label><input className="fi" value={exp.title} onChange={e=>updExp(i,"title",e.target.value)}/></div>
                    <div className="fg"><label className="flabel">Dates</label><input className="fi" value={exp.dates} onChange={e=>updExp(i,"dates",e.target.value)}/></div>
                  </div>
                  <div className="fg"><label className="flabel">Description</label>
                    <textarea className="fi" rows={3} value={exp.desc} onChange={e=>updExp(i,"desc",e.target.value)}/></div>
                </div>
              ))}
              {form.experiences.length<6&&<button className="addbtn" onClick={addExp}>+ Add Position</button>}
            </>}

            {/* EDUCATION */}
            {tab==="education"&&form.education.map((edu,i)=>(
              <div className="card" key={i}>
                <div className="card-hd"><span className="card-num">Education {i+1}</span></div>
                <div className="fg"><label className="flabel">School</label><input className="fi" value={edu.school} onChange={e=>updEdu(i,"school",e.target.value)}/></div>
                <div className="frow">
                  <div className="fg"><label className="flabel">Degree</label><input className="fi" value={edu.degree} onChange={e=>updEdu(i,"degree",e.target.value)}/></div>
                  <div className="fg"><label className="flabel">Year</label><input className="fi" value={edu.year} onChange={e=>updEdu(i,"year",e.target.value)}/></div>
                </div>
              </div>
            ))}

            {/* SKILLS */}
            {tab==="skills"&&<>
              <div className="fg"><label className="flabel">{cfg.skillsLabel}</label>
                <textarea className="fi" rows={3} value={form.skills} onChange={e=>upd("skills",e.target.value)} placeholder="Comma-separated skills"/></div>
              <div className="fg"><label className="flabel">{cfg.specialSection?.label||"Highlights"}</label>
                <textarea className="fi" rows={4} value={form.special} onChange={e=>upd("special",e.target.value)}/></div>
            </>}

            {/* LANGUAGES */}
            {tab==="languages"&&<>
              <div className="flabel" style={{marginBottom:8}}>Languages & Fluency</div>
              {form.languages.map((l,i)=>(
                <div className="card" key={i} style={{marginBottom:8}}>
                  <div className="card-hd">
                    <span className="card-num">Language {i+1}</span>
                    {form.languages.length>1&&<button className="rmbtn" onClick={()=>delLang(i)}>×</button>}
                  </div>
                  <div className="fg"><label className="flabel">Name</label>
                    <input className="fi" value={l.name} onChange={e=>updLang(i,"name",e.target.value)} placeholder="e.g. English, Spanish…"/></div>
                  <SliderField label="Fluency" val={l.level} onChange={v=>updLang(i,"level",v)}
                    marks={["Beginner","Conversational","Fluent","Native"]}/>
                </div>
              ))}
              {form.languages.length<6&&<button className="addbtn" onClick={addLang}>+ Add Language</button>}
            </>}

            {/* TOOLS */}
            {tab==="tools"&&<>
              <div className="flabel" style={{marginBottom:8}}>Tools & Experience</div>
              {form.tools.map((t,i)=>(
                <div className="card" key={i} style={{marginBottom:8}}>
                  <div className="card-hd">
                    <span className="card-num">Tool {i+1}</span>
                    {form.tools.length>1&&<button className="rmbtn" onClick={()=>delTool(i)}>×</button>}
                  </div>
                  <div className="fg"><label className="flabel">Tool / Software</label>
                    <input className="fi" value={t.name} onChange={e=>updTool(i,"name",e.target.value)} placeholder="e.g. Figma, Photoshop, Excel…"/></div>
                  <SliderField label="Experience" val={t.level} onChange={v=>updTool(i,"level",v)}
                    marks={["Beginner","Intermediate","Advanced","Expert"]}/>
                </div>
              ))}
              {form.tools.length<8&&<button className="addbtn" onClick={addTool}>+ Add Tool</button>}
            </>}

            {/* LAYOUT */}
            {tab==="layout"&&<>
              <div className="flabel" style={{marginBottom:6}}>Section Order</div>
              <div className="sec-list">
                {(form.secOrder||[]).map((sec,i)=>(
                  <div key={sec} className={`sec-item ${secDrag.overIdx===i?"drag-over":""}`}
                    draggable onDragStart={()=>secDrag.start(i)} onDragOver={e=>secDrag.over(e,i)} onDragEnd={secDrag.end}>
                    <span style={{opacity:.35,fontSize:12}}>⠿</span>
                    {SEC_NAMES[sec]||sec}
                  </div>
                ))}
              </div>
              <div className="sec-info">
                Drag sections to reorder them in the resume preview. Changes apply instantly.
              </div>
            </>}

          </div>{/* /fscroll */}

          <div className="pbar">
            <button className="pbtn" onClick={exportHTML}>
              ⬇ &nbsp;Download Resume
            </button>
          </div>
        </aside>

        {/* ─── PREVIEW ─── */}
        <div className="preview">
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:16,paddingBottom:32,margin:"0 auto"}}>
            <ResumeDoc form={form} cfg={cfg} tpl={template} expMode={exportMode} cssVars={cssVars} docRef={resumeRef}/>
            {(form.pages||[]).map((page,i)=>(
              <ExtraPage key={page.id||i} page={page} index={i} cfg={cfg} tpl={template} cssVars={cssVars}
                onUpdate={val=>updatePage(i,val)} onDelete={()=>deletePage(i)}/>
            ))}
            <button onClick={addPage}
              style={{marginTop:4,marginBottom:8,padding:"10px 32px",background:"transparent",border:"1px dashed #2A2D3E",borderRadius:8,color:"#3A4060",fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",letterSpacing:".06em",transition:"all .16s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#4A6EDD";e.currentTarget.style.color="#8A9EDD";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#2A2D3E";e.currentTarget.style.color="#3A4060";}}>
              + Add Page
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── SLIDER FIELD ─────────────────────────────────────────────────────────── */
function SliderField({label, val, onChange, marks}) {
  return (
    <div className="fg">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
        <label className="flabel" style={{margin:0}}>{label} Level</label>
        <span className="sbadge">{val}%</span>
      </div>
      <div className="strk">
        <div className="sfill" style={{width:`${val}%`}}/>
        <input type="range" className="sinput" min={10} max={100} step={5}
          value={val} onChange={e=>onChange(Number(e.target.value))}/>
      </div>
      <div className="slabels">{marks.map(m=><span key={m}>{m}</span>)}</div>
    </div>
  );
}

/* ─── PROFESSION LABELS / ICONS (needed for allProfs array) ──────────────────*/
const PROFESSIONS_LABEL = {executive:"CEO / Executive",creative:"Creative Director",engineer:"Software Engineer",healthcare:"Healthcare",academic:"Academic",marketing:"Marketing & Sales"};
const PROFESSIONS_ICON  = {executive:"◈",creative:"◉",engineer:"◊",healthcare:"✦",academic:"◎",marketing:"◆"};



const TEMPLATES = [
  { id:"classic",    label:"Classic",       desc:"Timeless sidebar elegance" },
  { id:"executive",  label:"Executive",     desc:"Gold-accented authority"   },
  { id:"creative",   label:"Creative",      desc:"Editorial bold header"     },
  { id:"minimal",    label:"Minimal",       desc:"Clean Swiss precision"     },
  { id:"corporate",  label:"Corporate",     desc:"Navy professional"         },
  { id:"luxurySerif",label:"Luxury Serif",  desc:"Warm refined serif"        },
  { id:"techNeon",   label:"Tech Neon",     desc:"Dark code aesthetic"       },
  { id:"startup",    label:"Startup",       desc:"Purple modern energy"      },
];

const TONES = ["Professional","Confident","Creative","Conversational","Formal"];

const TPL_STYLES = {
  classic:    { bg:"#FFFDF9", sidebar:"#1C2B3A", sidebarText:"#E8DFC8", acc:"#B8973A", fd:"'Cormorant Garamond',serif", fb:"'Outfit',sans-serif", headerBg:"#FFFDF9", headerText:"#0D1B2A" },
  executive:  { bg:"#FFFFFF", sidebar:"#0A0A0A", sidebarText:"#D4AF37", acc:"#D4AF37", fd:"'Cormorant Garamond',serif", fb:"'Outfit',sans-serif", headerBg:"#0A0A0A", headerText:"#D4AF37" },
  creative:   { bg:"#F7F4EF", sidebar:"#1A1A1A", sidebarText:"#F0EDE8", acc:"#C0392B", fd:"'Playfair Display',serif",    fb:"'DM Sans',sans-serif",    headerBg:"#1A1A1A", headerText:"#FFFFFF" },
  minimal:    { bg:"#FFFFFF", sidebar:"#FAFAFA",  sidebarText:"#333333", acc:"#999999", fd:"'DM Sans',sans-serif",         fb:"'DM Sans',sans-serif",    headerBg:"#FAFAFA",  headerText:"#111111" },
  corporate:  { bg:"#FFFFFF", sidebar:"#1A2744",  sidebarText:"#D8E4F8", acc:"#2A5098", fd:"'Outfit',sans-serif",          fb:"'DM Sans',sans-serif",    headerBg:"#1A2744",  headerText:"#FFFFFF" },
  luxurySerif:{ bg:"#FDFAF4", sidebar:"#2C1810",  sidebarText:"#F5E8CC", acc:"#8B6914", fd:"'EB Garamond',serif",          fb:"'Cormorant Garamond',serif",headerBg:"#2C1810",headerText:"#F5E8CC"},
  techNeon:   { bg:"#080E1C", sidebar:"#050A14",  sidebarText:"#7DFFD6", acc:"#00FFB2", fd:"'Space Grotesk',sans-serif",   fb:"'Space Grotesk',sans-serif",headerBg:"#050A14",headerText:"#00FFB2"},
  startup:    { bg:"#FFFFFF", sidebar:"#0F0F23",  sidebarText:"#E0E0FF", acc:"#6C5CE7", fd:"'Space Grotesk',sans-serif",   fb:"'DM Sans',sans-serif",    headerBg:"#0F0F23",  headerText:"#E0E0FF" },
};

const today = new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});

function CoverLetterBuilder() {
  const [template, setTemplate] = useState("classic");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const letterRef = useRef(null);

  const [form, setForm] = useState({
    name:"Alexandra Whitmore", jobTitle:"Chief Executive Officer",
    company:"Meridian Capital Group", industry:"Executive Leadership",
    email:"a.whitmore@company.com", phone:"+1 (212) 555-0190",
    location:"New York, NY", linkedin:"linkedin.com/in/awhitmore",
    hiringManager:"Hiring Manager",
    keyPoints:"20+ years leading Fortune 500 companies, scaled revenue from $200M to $2B+, led 12,000-person workforce across 28 countries",
    tone:"Professional",
    letterBody:`Dear Hiring Manager,\n\nI am writing to express my strong interest in the Chief Executive Officer position at Meridian Capital Group. With over two decades of experience leading Fortune 500 organizations through transformational growth, I am confident in my ability to drive meaningful results for your company.\n\nThroughout my career, I have demonstrated a proven track record of scaling organizations from $200M to over $2B in revenue while cultivating high-performance cultures. My experience leading a 12,000-person workforce across 28 countries has equipped me with the strategic vision and operational excellence needed to excel in this role.\n\nI am particularly drawn to Meridian Capital Group's commitment to innovation and global expansion. I believe my expertise in M&A strategy, P&L management, and board relations aligns perfectly with your organizational goals.\n\nI would welcome the opportunity to discuss how my experience can contribute to Meridian Capital Group's continued success. Thank you for your consideration.\n\nSincerely,\nAlexandra Whitmore`,
  });

  const upd = (k,v) => setForm(f=>({...f,[k]:v}));
  const s = TPL_STYLES[template];

  const generateLetter = async () => {
    if (!form.name || !form.jobTitle || !form.company) {
      setError("Please fill in your name, job title, and company first.");
      return;
    }
    setGenerating(true);
    setError("");
    try {
      const prompt = `Write a compelling, ${form.tone.toLowerCase()} cover letter for ${form.name} applying for the position of ${form.jobTitle} at ${form.company} in the ${form.industry} industry.

Key points to highlight: ${form.keyPoints}

Requirements:
- Address it to "${form.hiringManager}"
- 3-4 paragraphs, professional and engaging
- Highlight the key points naturally, don't just list them
- End with a strong call to action
- Sign off with the applicant's name: ${form.name}
- Do NOT include the date, address headers, or subject line — just the letter body starting with "Dear ${form.hiringManager},"
- Tone: ${form.tone}
- Keep it under 350 words`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          messages:[{role:"user",content:prompt}],
        }),
      });
      const data = await response.json();
      if (data.content && data.content[0]?.text) {
        upd("letterBody", data.content[0].text.trim());
      } else {
        setError("Generation failed. Please try again.");
      }
    } catch(e) {
      setError("Connection error. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const exportHTML = () => {
    if (!letterRef.current) return;
    const root = letterRef.current;
    const rootStyle = getComputedStyle(root);
    const varMap = {};
    ["--acc","--fd","--fb","--sbg","--stx","--mbg"].forEach(function(v){
      varMap[v] = rootStyle.getPropertyValue(v).trim();
    });
    const resolveStyle = function(styleStr) {
      if (!styleStr) return styleStr;
      let result = styleStr;
      Object.keys(varMap).forEach(function(key){
        result = result.split("var("+key+")").join(varMap[key]||"");
        result = result.split("var("+key+" )").join(varMap[key]||"");
      });
      return result;
    };
    const clone = root.cloneNode(true);
    const allEls = [clone].concat(Array.from(clone.querySelectorAll("*")));
    allEls.forEach(function(el){
      const sa = el.getAttribute("style");
      if (sa) el.setAttribute("style", resolveStyle(sa));
    });
    const FONTS = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap";
    const fullHTML = "<!DOCTYPE html><html><head><meta charset=\"utf-8\"/><title>Cover Letter</title>"
      + "<link rel=\"stylesheet\" href=\"" + FONTS + "\"/>"
      + "<style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}"
      + "html,body{margin:0;padding:0;background:white;width:100%;}"
      + ".cl-doc{width:100%!important;min-height:297mm;}"
      + "@page{size:A4 portrait;margin:0;}"
      + "@media print{*{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}}"
      + "</style></head><body>"
      + clone.outerHTML
      + "<scr"+"ipt>document.fonts.ready.then(function(){setTimeout(function(){window.print();},600);});<\/script>"
      + "</body></html>";
    const blob = new Blob([fullHTML],{type:"text/html;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "cover-letter.html"; a.click();
    URL.revokeObjectURL(url);
  };

  const isSidebar = !["minimal","corporate"].includes(template);

  return (
    <>
      <style>{`
        ${GOOGLE_FONTS}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body{background:#0A0C14;font-family:'DM Sans',sans-serif;}

        .shell{display:flex;flex-direction:column;background:#0A0C14;}

        /* Panel */
        .panel{width:100%;background:#10121C;border-bottom:1px solid #1C1F30;display:flex;flex-direction:column;}
        .ph{padding:16px 22px 12px;border-bottom:1px solid #181A28;background:#0D0F18;display:flex;align-items:center;justify-content:space-between;}
        .ph-left h1{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;color:#F0EAD6;letter-spacing:.02em;}
        .ph-left p{font-size:10.5px;color:#3A3E58;margin-top:1px;}
        .gen-btn{padding:10px 20px;background:linear-gradient(135deg,#B8973A,#8B6914);border:none;border-radius:7px;color:#0D0E14;font-size:12px;font-family:'DM Sans',sans-serif;font-weight:600;cursor:pointer;letter-spacing:.04em;transition:all .18s;white-space:nowrap;}
        .gen-btn:hover{transform:translateY(-1px);filter:brightness(1.1);}
        .gen-btn:disabled{opacity:.5;cursor:wait;transform:none;}

        /* Template strip */
        .tpl-strip{display:flex;gap:6px;padding:10px 22px;border-bottom:1px solid #181A28;overflow-x:auto;scrollbar-width:none;}
        .tpl-strip::-webkit-scrollbar{display:none;}
        .tcard{flex-shrink:0;padding:6px 12px;background:#161826;border:1px solid #222438;border-radius:6px;cursor:pointer;transition:all .14s;text-align:center;}
        .tcard:hover{border-color:#32355A;}
        .tcard.on{background:#18203A;border-color:#B8973A;}
        .tcard-name{font-size:11px;color:#8A8EAA;font-family:'DM Sans',sans-serif;display:block;}
        .tcard.on .tcard-name{color:#D4AF37;}
        .tcard-desc{font-size:9px;color:#3A3E58;font-family:'DM Sans',sans-serif;display:block;margin-top:1px;}

        /* Form area */
        .form-body{display:grid;grid-template-columns:1fr 1fr;gap:0;border-bottom:1px solid #181A28;}
        .form-col{padding:16px 22px;}
        .form-col+.form-col{border-left:1px solid #181A28;}
        .section-label{font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:#B8973A;font-family:'DM Sans',sans-serif;margin-bottom:10px;display:block;}
        .fg{margin-bottom:11px;}
        .flabel{display:block;font-size:9.5px;color:#40445E;letter-spacing:.07em;text-transform:uppercase;margin-bottom:3px;font-family:'DM Sans',sans-serif;}
        .fi{width:100%;background:#161826;border:1px solid #222438;border-radius:5px;padding:6px 10px;font-size:12px;color:#A8ACCB;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .13s;}
        .fi:focus{border-color:#B8973A;}
        .fi::placeholder{color:#282A40;}
        textarea.fi{resize:vertical;min-height:60px;line-height:1.5;}
        .frow{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
        .tone-row{display:flex;gap:5px;flex-wrap:wrap;}
        .tone-btn{padding:4px 10px;background:#161826;border:1px solid #222438;border-radius:4px;cursor:pointer;font-size:10px;color:#4A4E68;font-family:'DM Sans',sans-serif;transition:all .13s;}
        .tone-btn:hover{color:#8A8EAA;border-color:#32355A;}
        .tone-btn.on{background:#18203A;border-color:#B8973A;color:#D4AF37;}

        /* Letter body editor */
        .letter-edit-wrap{padding:0 22px 16px;}
        .letter-textarea{width:100%;background:#0E1020;border:1px solid #222438;border-radius:6px;padding:14px 16px;font-size:12.5px;color:#C8CCDA;font-family:'DM Sans',sans-serif;line-height:1.8;resize:vertical;min-height:180px;outline:none;transition:border-color .13s;}
        .letter-textarea:focus{border-color:#B8973A;}

        /* Error */
        .err-bar{background:#2A1010;border:1px solid #5A2020;border-radius:6px;padding:8px 14px;margin:0 22px 10px;font-size:11px;color:#DD6666;font-family:'DM Sans',sans-serif;}

        /* Print bar */
        .pbar{padding:11px 22px;border-top:1px solid #181A28;background:#0D0F18;display:flex;gap:8px;align-items:center;}
        .pbtn{flex:1;padding:10px;background:linear-gradient(135deg,#2A4EBB,#1A3A9E);border:none;border-radius:7px;color:#E0E8FF;font-size:12px;font-family:'DM Sans',sans-serif;cursor:pointer;letter-spacing:.04em;transition:all .17s;}
        .pbtn:hover{background:linear-gradient(135deg,#3A5ECC,#2A4ABA);transform:translateY(-1px);}
        .pinfo{font-size:10px;color:#3A3E58;font-family:'DM Sans',sans-serif;}

        /* Preview */
        .preview{background:#07080E;padding:28px 16px 48px;display:flex;justify-content:flex-start;overflow-x:auto;}

        /* Cover letter doc */
        .cl-doc{width:794px;flex-shrink:0;background:white;box-shadow:0 20px 80px rgba(0,0,0,.7);overflow:visible;}

        @media print{
          body{background:white!important;}
          .panel{display:none!important;}
          .preview{padding:0!important;background:white!important;}
          .cl-doc{width:100%!important;box-shadow:none!important;}
          .shell{height:auto!important;}
        }
      `}</style>

      <div className="shell">
        <aside className="panel">
          {/* Header */}
          <div className="ph">
            <div className="ph-left">
              <h1>Cover Letter Builder</h1>
              <p>Professional · AI-Powered · Instant Export</p>
            </div>
            <button className="gen-btn" onClick={generateLetter} disabled={generating}>
              {generating ? "✦ Writing your letter…" : "✦ Generate with AI"}
            </button>
          </div>

          {/* Template picker */}
          <div className="tpl-strip">
            {TEMPLATES.map(t=>(
              <div key={t.id} className={`tcard ${template===t.id?"on":""}`} onClick={()=>setTemplate(t.id)}>
                <span className="tcard-name">{t.label}</span>
                <span className="tcard-desc">{t.desc}</span>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="form-body">
            {/* Col 1 — Your info */}
            <div className="form-col">
              <span className="section-label">Your Information</span>
              <div className="fg"><label className="flabel">Full Name</label>
                <input className="fi" value={form.name} onChange={e=>upd("name",e.target.value)} placeholder="Your full name"/></div>
              <div className="frow">
                <div className="fg"><label className="flabel">Email</label>
                  <input className="fi" value={form.email} onChange={e=>upd("email",e.target.value)} placeholder="email@example.com"/></div>
                <div className="fg"><label className="flabel">Phone</label>
                  <input className="fi" value={form.phone} onChange={e=>upd("phone",e.target.value)} placeholder="+1 (555) 000-0000"/></div>
              </div>
              <div className="frow">
                <div className="fg"><label className="flabel">Location</label>
                  <input className="fi" value={form.location} onChange={e=>upd("location",e.target.value)} placeholder="City, State"/></div>
                <div className="fg"><label className="flabel">LinkedIn</label>
                  <input className="fi" value={form.linkedin} onChange={e=>upd("linkedin",e.target.value)} placeholder="linkedin.com/in/..."/></div>
              </div>
              <div className="fg"><label className="flabel">Tone</label>
                <div className="tone-row">
                  {TONES.map(t=>(
                    <button key={t} className={`tone-btn ${form.tone===t?"on":""}`} onClick={()=>upd("tone",t)}>{t}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Col 2 — Job info */}
            <div className="form-col">
              <span className="section-label">Job & AI Settings</span>
              <div className="frow">
                <div className="fg"><label className="flabel">Your Job Title</label>
                  <input className="fi" value={form.jobTitle} onChange={e=>upd("jobTitle",e.target.value)} placeholder="e.g. Software Engineer"/></div>
                <div className="fg"><label className="flabel">Industry</label>
                  <input className="fi" value={form.industry} onChange={e=>upd("industry",e.target.value)} placeholder="e.g. Technology"/></div>
              </div>
              <div className="frow">
                <div className="fg"><label className="flabel">Target Company</label>
                  <input className="fi" value={form.company} onChange={e=>upd("company",e.target.value)} placeholder="Company name"/></div>
                <div className="fg"><label className="flabel">Hiring Manager</label>
                  <input className="fi" value={form.hiringManager} onChange={e=>upd("hiringManager",e.target.value)} placeholder="Name or 'Hiring Manager'"/></div>
              </div>
              <div className="fg"><label className="flabel">Key Points to Highlight</label>
                <textarea className="fi" rows={3} value={form.keyPoints} onChange={e=>upd("keyPoints",e.target.value)}
                  placeholder="Your top achievements, skills, or experiences to include in the letter…"/></div>
            </div>
          </div>

          {/* Error */}
          {error&&<div className="err-bar">{error}</div>}

          {/* Letter body editor */}
          <div className="letter-edit-wrap">
            <label className="flabel" style={{marginBottom:6,display:"block"}}>Letter Body — Edit freely after generation</label>
            <textarea className="letter-textarea" rows={8} value={form.letterBody}
              onChange={e=>upd("letterBody",e.target.value)}
              placeholder="Click 'Generate with AI' to write your letter, or type it manually here…"/>
          </div>

          {/* Print bar */}
          <div className="pbar">
            <button className="pbtn" onClick={exportHTML}>⬇ &nbsp;Download Cover Letter</button>
            <span className="pinfo">Opens in browser → Print → Save as PDF · Enable background graphics</span>
          </div>
        </aside>

        {/* Preview */}
        <div className="preview">
          <CoverLetterDoc form={form} tpl={template} s={s} docRef={letterRef}/>
        </div>
      </div>
    </>
  );
}

function CoverLetterDoc({form, tpl, s, docRef}) {
  const isSidebar = !["minimal","corporate"].includes(tpl);
  const isNeon = tpl==="techNeon";
  const bodyLines = (form.letterBody||"").split("\n");

  const cssVars = {
    "--acc":s.acc, "--fd":s.fd, "--fb":s.fb,
    "--sbg":s.sidebar, "--stx":s.sidebarText,
    "--mbg":s.bg,
  };

  return (
    <div ref={docRef} className="cl-doc" style={{...cssVars, background:s.bg, display:"flex", minHeight:794, fontFamily:s.fb}}>
      {/* SIDEBAR */}
      {isSidebar&&(
        <div style={{width:210,minWidth:210,background:s.sidebar,color:s.sidebarText,display:"flex",flexDirection:"column",minHeight:794}}>
          {/* Accent bar */}
          <div style={{height:4,background:s.acc,width:"100%"}}/>

          {/* Identity block */}
          <div style={{padding:"28px 20px 22px",borderBottom:`1px solid ${s.acc}22`,marginBottom:16,textAlign:"center"}}>
            {isNeon&&<div style={{fontSize:9,letterSpacing:".3em",color:s.acc,marginBottom:8,fontFamily:s.fd}}>COVER_LETTER.doc</div>}
            <div style={{width:64,height:64,borderRadius:"50%",border:`2px solid ${s.acc}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:s.fd,fontSize:20,fontWeight:600,color:s.acc,margin:"0 auto 12px"}}>
              {(form.name||"AB").split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()}
            </div>
            <div style={{fontFamily:s.fd,fontSize:14,fontWeight:600,color:s.sidebarText,marginBottom:4}}>{form.name||"Your Name"}</div>
            <div style={{fontSize:10,color:s.acc,letterSpacing:".1em",textTransform:"uppercase"}}>{form.jobTitle||"Your Title"}</div>
          </div>

          {/* Contact */}
          <div style={{padding:"0 18px 18px"}}>
            <div style={{fontSize:8,letterSpacing:".18em",textTransform:"uppercase",color:s.acc,marginBottom:10,fontFamily:s.fb}}>Contact</div>
            {form.email&&<div style={{fontSize:10.5,color:s.sidebarText,opacity:.8,marginBottom:6,fontFamily:s.fb,wordBreak:"break-all"}}>{form.email}</div>}
            {form.phone&&<div style={{fontSize:10.5,color:s.sidebarText,opacity:.8,marginBottom:6,fontFamily:s.fb}}>{form.phone}</div>}
            {form.location&&<div style={{fontSize:10.5,color:s.sidebarText,opacity:.8,marginBottom:6,fontFamily:s.fb}}>{form.location}</div>}
            {form.linkedin&&<div style={{fontSize:10,color:s.acc,opacity:.85,marginBottom:6,fontFamily:s.fb,wordBreak:"break-all"}}>{form.linkedin}</div>}
          </div>

          {/* Date */}
          <div style={{padding:"0 18px 18px",marginTop:"auto"}}>
            <div style={{fontSize:8,letterSpacing:".18em",textTransform:"uppercase",color:s.acc,marginBottom:8,fontFamily:s.fb}}>Date</div>
            <div style={{fontSize:10.5,color:s.sidebarText,opacity:.7,fontFamily:s.fb}}>{today}</div>
          </div>
        </div>
      )}

      {/* MAIN */}
      <div style={{flex:1,display:"flex",flexDirection:"column",background:s.bg,minHeight:794}}>

        {/* Header bar for non-sidebar layouts */}
        {!isSidebar&&(
          <div style={{background:s.headerBg,padding:"32px 40px 24px",borderBottom:`2px solid ${s.acc}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
              <div>
                <div style={{fontFamily:s.fd,fontSize:26,fontWeight:700,color:s.headerText,marginBottom:4}}>{form.name||"Your Name"}</div>
                <div style={{fontSize:11,color:s.acc,letterSpacing:".14em",textTransform:"uppercase",fontFamily:s.fb}}>{form.jobTitle||"Your Title"}</div>
              </div>
              <div style={{textAlign:"right"}}>
                {form.email&&<div style={{fontSize:10.5,color:s.headerText==="#FFFFFF"?"rgba(255,255,255,.7)":"rgba(0,0,0,.5)",marginBottom:2,fontFamily:s.fb}}>{form.email}</div>}
                {form.phone&&<div style={{fontSize:10.5,color:s.headerText==="#FFFFFF"?"rgba(255,255,255,.7)":"rgba(0,0,0,.5)",marginBottom:2,fontFamily:s.fb}}>{form.phone}</div>}
                {form.location&&<div style={{fontSize:10.5,color:s.headerText==="#FFFFFF"?"rgba(255,255,255,.7)":"rgba(0,0,0,.5)",fontFamily:s.fb}}>{form.location}</div>}
              </div>
            </div>
          </div>
        )}

        {/* Accent line */}
        {isSidebar&&<div style={{height:4,background:s.acc,opacity:.2}}/>}

        {/* Letter content */}
        <div style={{padding:"32px 40px",flex:1}}>
          {/* Date for sidebar layouts */}
          {!isSidebar&&(
            <div style={{fontSize:12,color:s.acc,marginBottom:20,fontFamily:s.fb}}>{today}</div>
          )}

          {/* Recipient */}
          <div style={{marginBottom:24}}>
            <div style={{fontFamily:s.fb,fontSize:12,color:s.bg===s.sidebar?"rgba(255,255,255,.6)":(tpl==="techNeon"?"#7DFFD6":"rgba(0,0,0,.5)"),marginBottom:2}}>{form.hiringManager||"Hiring Manager"}</div>
            <div style={{fontFamily:s.fb,fontSize:12,fontWeight:500,color:tpl==="techNeon"?"#C8E8FF":s.bg==="0A0A0A"?"#E8E0CC":"#111",marginBottom:2}}>{form.company||"Company Name"}</div>
          </div>

          {/* Letter body */}
          <div style={{fontFamily:s.fb,fontSize:12.5,lineHeight:1.85,color:tpl==="techNeon"?"#C8E8FF":tpl==="execblack"?"#E8E0CC":"#222"}}>
            {bodyLines.map((line,i)=>(
              <p key={i} style={{marginBottom: line.trim()==="" ? 14 : 0, minHeight: line.trim()===""?14:undefined}}>
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Footer accent */}
        <div style={{height:4,background:s.acc,opacity:.15,marginTop:"auto"}}/>
      </div>
    </div>
  );
}


/* ─── LANDING PAGE ─────────────────────────────────────────────────────────── */
function LandingPage({onSelect}) {
  return (
    <>
      <style>{`
        ${GOOGLE_FONTS}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body{background:#0A0C14;font-family:'DM Sans',sans-serif;min-height:100vh;}
        .land{min-height:100vh;background:#0A0C14;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 20px;}
        .land-badge{font-size:11px;letter-spacing:.2em;color:#B8973A;text-transform:uppercase;margin-bottom:20px;font-family:'DM Sans',sans-serif;}
        .land-title{font-family:'Cormorant Garamond',serif;font-size:clamp(36px,6vw,64px);font-weight:600;color:#FFFFFF;text-align:center;line-height:1.1;margin-bottom:12px;}
        .land-title span{color:#B8973A;}
        .land-sub{font-size:16px;color:#5A5E78;text-align:center;margin-bottom:48px;font-family:'DM Sans',sans-serif;max-width:480px;}
        .land-cards{display:flex;gap:20px;flex-wrap:wrap;justify-content:center;margin-bottom:48px;}
        .tool-card{width:300px;background:#13151F;border:1px solid #1E2130;border-radius:14px;padding:28px;cursor:pointer;transition:all .22s;position:relative;overflow:hidden;}
        .tool-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#B8973A11,transparent);opacity:0;transition:opacity .22s;}
        .tool-card:hover{border-color:#B8973A;transform:translateY(-4px);box-shadow:0 20px 60px rgba(184,151,58,.15);}
        .tool-card:hover::before{opacity:1;}
        .tool-icon{font-size:32px;margin-bottom:16px;display:block;}
        .tool-name{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;color:#F0EAD6;margin-bottom:6px;}
        .tool-desc{font-size:13px;color:#4A4E68;font-family:'DM Sans',sans-serif;line-height:1.6;margin-bottom:18px;}
        .tool-features{display:flex;flex-direction:column;gap:5px;margin-bottom:20px;}
        .tool-feat{font-size:11px;color:#6A6E8A;font-family:'DM Sans',sans-serif;display:flex;align-items:center;gap:6px;}
        .tool-feat::before{content:'✦';color:#B8973A;font-size:9px;flex-shrink:0;}
        .tool-btn{width:100%;padding:10px;background:linear-gradient(135deg,#B8973A,#8B6914);border:none;border-radius:7px;color:#0D0E14;font-size:13px;font-family:'DM Sans',sans-serif;font-weight:600;cursor:pointer;letter-spacing:.04em;transition:all .16s;}
        .tool-btn:hover{filter:brightness(1.1);}
        .land-divider{width:1px;height:60px;background:linear-gradient(to bottom,transparent,#B8973A55,transparent);margin:0 10px;}
        .land-footer{font-size:11px;color:#2A2E48;font-family:'DM Sans',sans-serif;text-align:center;letter-spacing:.08em;}
        .land-line{width:60px;height:1px;background:#B8973A33;margin:0 auto 16px;}
      `}</style>
      <div className="land">
        <div className="land-badge">✦ Career Suite Pro ✦</div>
        <h1 className="land-title">Land Your<br/><span>Dream Job</span></h1>
        <p className="land-sub">Two professional tools to craft your perfect application — powered by AI, designed to impress.</p>

        <div className="land-cards">
          <div className="tool-card" onClick={()=>onSelect("resume")}>
            <span className="tool-icon">◈</span>
            <div className="tool-name">Resume Builder</div>
            <div className="tool-desc">Build a stunning, ATS-friendly resume in minutes with 12 premium templates tailored to your profession.</div>
            <div className="tool-features">
              <div className="tool-feat">12 Premium Templates</div>
              <div className="tool-feat">6 Professions + Custom</div>
              <div className="tool-feat">Photo, Languages & Tools</div>
              <div className="tool-feat">3 Export Modes · ATS Friendly</div>
            </div>
            <button className="tool-btn">Open Resume Builder →</button>
          </div>

          <div style={{display:"flex",alignItems:"center"}}>
            <div className="land-divider"/>
          </div>

          <div className="tool-card" onClick={()=>onSelect("cover")}>
            <span className="tool-icon">✦</span>
            <div className="tool-name">Cover Letter Builder</div>
            <div className="tool-desc">Write compelling cover letters in seconds with AI assistance — personalized to the job and company.</div>
            <div className="tool-features">
              <div className="tool-feat">AI-Powered Generation</div>
              <div className="tool-feat">8 Matching Templates</div>
              <div className="tool-feat">5 Tones to Choose From</div>
              <div className="tool-feat">Instant PDF Export</div>
            </div>
            <button className="tool-btn">Open Cover Letter Builder →</button>
          </div>
        </div>

        <div className="land-line"/>
        <div className="land-footer">PROFESSIONAL · PRINT-READY · TAILORED · AI-POWERED</div>
      </div>
    </>
  );
}

/* ─── MAIN APP ──────────────────────────────────────────────────────────────── */
export default function App() {
  const [screen, setScreen] = useState("landing"); // landing | resume | cover

  if (screen === "resume") {
    return (
      <>
        <style>{`
          .back-bar{padding:10px 20px;background:#0D0F18;border-bottom:1px solid #181A28;display:flex;align-items:center;gap:10px;}
          .back-btn{background:none;border:1px solid #252840;border-radius:5px;color:#6A6E8A;font-size:11px;font-family:'DM Sans',sans-serif;padding:5px 12px;cursor:pointer;transition:all .14s;letter-spacing:.04em;}
          .back-btn:hover{border-color:#B8973A;color:#B8973A;}
          .suite-label{font-size:10px;color:#3A3E58;font-family:'DM Sans',sans-serif;letter-spacing:.1em;}
        `}</style>
        <div className="back-bar">
          <button className="back-btn" onClick={()=>setScreen("landing")}>← Suite Home</button>
          <span className="suite-label">CAREER SUITE PRO · RESUME BUILDER</span>
        </div>
        <ResumeBuilder/>
      </>
    );
  }

  if (screen === "cover") {
    return (
      <>
        <style>{`
          .back-bar{padding:10px 20px;background:#0D0F18;border-bottom:1px solid #181A28;display:flex;align-items:center;gap:10px;}
          .back-btn{background:none;border:1px solid #252840;border-radius:5px;color:#6A6E8A;font-size:11px;font-family:'DM Sans',sans-serif;padding:5px 12px;cursor:pointer;transition:all .14s;letter-spacing:.04em;}
          .back-btn:hover{border-color:#B8973A;color:#B8973A;}
          .suite-label{font-size:10px;color:#3A3E58;font-family:'DM Sans',sans-serif;letter-spacing:.1em;}
        `}</style>
        <div className="back-bar">
          <button className="back-btn" onClick={()=>setScreen("landing")}>← Suite Home</button>
          <span className="suite-label">CAREER SUITE PRO · COVER LETTER BUILDER</span>
        </div>
        <CoverLetterBuilder/>
      </>
    );
  }

  return <LandingPage onSelect={setScreen}/>;
}
