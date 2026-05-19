'use client'
import { useState, useRef } from 'react'
import styles from './page.module.css'

const MCQ_BANK = {
  Physics: {
    easy: [
      { q: "A body moving with uniform velocity has net force equal to:", o: ["Zero", "ma", "mg", "F"], a: 0, e: "Newton's 1st law: no net force = no acceleration = constant velocity." },
      { q: "SI unit of work is:", o: ["Watt", "Newton", "Joule", "Pascal"], a: 2, e: "Work = Force × displacement. Unit = Joule (J) = N·m." },
      { q: "Which of the following is a scalar quantity?", o: ["Force", "Velocity", "Speed", "Acceleration"], a: 2, e: "Speed has magnitude only, no direction — it's a scalar." },
    ],
    medium: [
      { q: "A projectile fired at 45° with speed u. Maximum range is:", o: ["u²/g", "u²/2g", "2u²/g", "u/2g"], a: 0, e: "R = u²sin2θ/g. At 45°, sin90°=1, so R = u²/g." },
      { q: "Escape velocity from Earth's surface is approximately:", o: ["7.9 km/s", "11.2 km/s", "3.0 km/s", "9.8 km/s"], a: 1, e: "ve = √(2gR) ≈ 11.2 km/s for Earth." },
      { q: "If momentum is doubled, kinetic energy becomes:", o: ["Same", "Double", "4 times", "Half"], a: 2, e: "KE = p²/2m. If p→2p, KE→4p²/2m = 4 times." },
    ],
    hard: [
      { q: "Masses m and 2m on Atwood's machine. Acceleration of system:", o: ["g/3", "g/2", "2g/3", "g"], a: 0, e: "a = (2m−m)g/(2m+m) = mg/3m = g/3." },
      { q: "Wave: f=500Hz, v=350m/s. Phase diff between 2 points 0.35m apart:", o: ["π rad", "π/2 rad", "2π rad", "π/4 rad"], a: 0, e: "λ=v/f=0.7m. Δφ=(2π/0.7)×0.35=π rad." },
    ]
  },
  Chemistry: {
    easy: [
      { q: "Atomic number of Carbon is:", o: ["6", "12", "8", "14"], a: 0, e: "Carbon has 6 protons → atomic number = 6." },
      { q: "Which is an alkali metal?", o: ["Ca", "Mg", "Na", "Al"], a: 2, e: "Na (Sodium) is Group 1 — the alkali metals." },
      { q: "pH of pure water at 25°C is:", o: ["0", "7", "14", "1"], a: 1, e: "Pure water has [H⁺]=[OH⁻]=10⁻⁷, so pH = 7." },
    ],
    medium: [
      { q: "IUPAC name of CH₃CHO:", o: ["Methanal", "Ethanal", "Propanone", "Ethanol"], a: 1, e: "2-carbon aldehyde → ethanal (acetaldehyde)." },
      { q: "Which bond has highest bond energy?", o: ["C–C", "C=C", "C≡C", "C–H"], a: 2, e: "Triple bond energy ~839 kJ/mol — strongest of these." },
      { q: "Hybridisation of carbon in CH₄:", o: ["sp", "sp²", "sp³", "sp³d"], a: 2, e: "4 single bonds around C → sp³ hybridisation, tetrahedral shape." },
    ],
    hard: [
      { q: "N₂+3H₂→2NH₃, ΔH=−92kJ. Heat per mole of NH₃:", o: ["92 kJ", "46 kJ", "184 kJ", "23 kJ"], a: 1, e: "2 mol NH₃ for 92 kJ → per mole = 46 kJ." },
      { q: "Buffer: 0.1M CH₃COOH + 0.1M CH₃COONa, pKa=4.74. pH=?", o: ["4.74", "3.74", "5.74", "7.00"], a: 0, e: "Henderson-Hasselbalch: pH=pKa+log([A⁻]/[HA])=4.74+log(1)=4.74." },
    ]
  },
  Mathematics: {
    easy: [
      { q: "Derivative of sin x is:", o: ["cos x", "−cos x", "−sin x", "tan x"], a: 0, e: "d/dx(sin x) = cos x — fundamental differentiation rule." },
      { q: "log₁₀(1000) =", o: ["2", "3", "4", "10"], a: 1, e: "log₁₀(10³) = 3." },
      { q: "The value of sin 30° is:", o: ["1", "√3/2", "1/2", "1/√2"], a: 2, e: "sin 30° = 1/2 — a standard trigonometric value." },
    ],
    medium: [
      { q: "Area enclosed by y=x² and y=x:", o: ["1/6", "1/3", "1/2", "1/4"], a: 0, e: "∫₀¹(x−x²)dx = [x²/2−x³/3]₀¹ = 1/2−1/3 = 1/6." },
      { q: "For 3×3 matrix A with |A|=5, |3A|=", o: ["15", "45", "135", "5"], a: 2, e: "|kA|=kⁿ|A|. |3A|=27×5=135." },
      { q: "The derivative of ln(x) is:", o: ["1/x", "x", "eˣ", "1/x²"], a: 0, e: "d/dx(ln x) = 1/x for x > 0." },
    ],
    hard: [
      { q: "Number of solutions of 2sinx=|x| in [−2π,2π]:", o: ["2", "4", "6", "3"], a: 1, e: "Graphically the curves intersect at exactly 4 points." },
      { q: "lim(x→0) (eˣ−1−x)/x² =", o: ["0", "1/2", "1", "∞"], a: 1, e: "Apply L'Hôpital twice: lim eˣ/2 = 1/2 as x→0." },
    ]
  },
  Biology: {
    easy: [
      { q: "'Powerhouse of the cell' refers to:", o: ["Nucleus", "Ribosome", "Mitochondria", "Golgi body"], a: 2, e: "Mitochondria produce ATP via cellular respiration." },
      { q: "DNA stands for:", o: ["Deoxyribonucleic Acid", "Diribonucleic Acid", "Deoxyribose Acid", "None"], a: 0, e: "DNA = Deoxyribonucleic Acid, the genetic material." },
      { q: "Normal human chromosome number is:", o: ["23", "44", "46", "48"], a: 2, e: "Humans have 46 chromosomes (23 pairs) in somatic cells." },
    ],
    medium: [
      { q: "Universal blood donor group:", o: ["A", "B", "AB", "O"], a: 3, e: "Blood group O (Rh−) has no A/B antigens — can donate to all." },
      { q: "Glycolysis occurs in the:", o: ["Mitochondria", "Nucleus", "Cytoplasm", "Ribosome"], a: 2, e: "Glycolysis occurs in the cytoplasm, producing 2 pyruvate + net 2 ATP." },
      { q: "Which organelle is called 'suicidal bag'?", o: ["Mitochondria", "Ribosome", "Lysosome", "Golgi body"], a: 2, e: "Lysosomes contain digestive enzymes — can lyse the cell itself." },
    ],
    hard: [
      { q: "Crossing over during meiosis I occurs at:", o: ["Leptotene", "Zygotene", "Pachytene", "Diplotene"], a: 2, e: "Chiasmata (crossing over) form at pachytene when homologs are fully synapsed." },
      { q: "Testcross of dominant phenotype gives 1:1 ratio. Its genotype:", o: ["AA", "Aa", "aa", "Cannot determine"], a: 1, e: "Aa × aa → Aa:aa = 1:1. If AA, all offspring would show dominant phenotype only." },
    ]
  }
}

const NOTES = {
  Physics: {
    color: '#003893', emoji: '⚛️', sub: 'Mechanics · Waves · Modern Physics',
    sections: [
      { h: 'Mechanics', items: [{ l: 'Newton 2nd law', f: 'F = ma' }, { l: 'Kinematics', f: 'v=u+at | s=ut+½at² | v²=u²+2as' }, { l: 'Work-energy theorem', f: 'W = ½mv² − ½mu²' }, { l: 'Circular acceleration', f: 'a = v²/r = ω²r' }] },
      { h: 'Waves & Sound', items: [{ l: 'Wave speed', f: 'v = fλ' }, { l: 'Doppler effect', f: "f' = f(v±vo)/(v∓vs)" }] },
      { h: 'Modern Physics', items: [{ l: 'Photoelectric effect', f: 'KEmax = hf − φ' }, { l: 'de Broglie wavelength', f: 'λ = h/mv' }, { l: 'Mass-energy equivalence', f: 'E = mc²' }] }
    ]
  },
  Chemistry: {
    color: '#16a34a', emoji: '🧪', sub: 'Organic · Inorganic · Physical',
    sections: [
      { h: 'Atomic Structure', items: [{ l: 'Bohr radius n=1', f: 'r₁ = 0.529 Å' }, { l: 'Energy nth orbit', f: 'En = −13.6/n² eV' }] },
      { h: 'Thermodynamics', items: [{ l: 'Gibbs free energy', f: 'ΔG = ΔH − TΔS' }, { l: 'Spontaneous when', f: 'ΔG < 0' }] },
      { h: 'Organic', items: [{ l: "Markovnikov's rule", f: 'H adds to C with more H atoms' }, { l: 'SN1 vs SN2', f: '3° → SN1 (carbocation) | 1° → SN2 (backside attack)' }] }
    ]
  },
  Mathematics: {
    color: '#C8102E', emoji: '📐', sub: 'Calculus · Algebra · Trigonometry',
    sections: [
      { h: 'Calculus', items: [{ l: 'Power rule', f: 'd/dx(xⁿ) = nxⁿ⁻¹' }, { l: 'Chain rule', f: "[f(g(x))]' = f'(g(x))·g'(x)" }, { l: 'Integration by parts', f: '∫u dv = uv − ∫v du' }] },
      { h: 'Trigonometry', items: [{ l: 'Pythagorean identity', f: 'sin²θ + cos²θ = 1' }, { l: 'Double angle', f: 'sin2θ=2sinθcosθ | cos2θ=cos²θ−sin²θ' }] },
      { h: 'Matrices', items: [{ l: '2×2 determinant', f: '|A| = ad − bc' }, { l: "Cramer's rule", f: 'x = Dx/D | y = Dy/D' }] }
    ]
  },
  Biology: {
    color: '#d97706', emoji: '🌿', sub: 'Cell Biology · Genetics · Physiology',
    sections: [
      { h: 'Cell Biology', items: [{ l: 'Mitosis stages', f: 'PMAT: Prophase→Metaphase→Anaphase→Telophase' }, { l: 'ATP from glycolysis', f: 'Net 2 ATP per glucose' }] },
      { h: 'Genetics', items: [{ l: 'Hardy-Weinberg', f: 'p²+2pq+q²=1 | p+q=1' }, { l: "Mendel's law", f: 'Alleles separate during gamete formation' }] },
      { h: 'Human Physiology', items: [{ l: 'Normal BP', f: '120/80 mmHg' }, { l: 'Normal heart rate', f: '60–100 bpm' }, { l: 'Tidal volume', f: '~500 mL/breath' }] }
    ]
  }
}

function cleanText(t) {
  return t
    .replace(/\$\$([\s\S]*?)\$\$/g, '$1')
    .replace(/\$(.*?)\$/g, '$1')
    .replace(/\\\((.*?)\\\)/g, '$1')
    .replace(/\\\[([\s\S]*?)\\\]/g, '$1')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#{1,4} /g, '')
}

function SolutionCards({ text }) {
  const clean = cleanText(text)
  const lines = clean.split('\n').map(l => l.trim()).filter(Boolean)
  const cards = []
  let current = null

  for (const line of lines) {
    if (/^Q\d+[\.\:\)]/i.test(line)) {
      if (current) cards.push(current)
      current = { header: line, answer: null, topic: null, body: [] }
    } else if (current) {
      if (/^(answer|ans|correct option|correct answer)[\:\s]/i.test(line)) {
        current.answer = line.replace(/^(answer|ans|correct option|correct answer)[\:\s]*/i, '').trim()
      } else if (/^(topic|chapter|subject)[\:\s]/i.test(line)) {
        current.topic = line.replace(/^(topic|chapter|subject)[\:\s]*/i, '').trim()
      } else {
        current.body.push(line)
      }
    } else {
      cards.push({ header: null, body: [line] })
    }
  }
  if (current) cards.push(current)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {cards.map((card, i) => {
        if (!card.header) {
          return (
            <p key={i} style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.8 }}>
              {card.body.join(' ')}
            </p>
          )
        }
        return (
          <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0,56,147,0.15)' }}>
            {/* Header */}
            <div style={{ background: '#003893', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{card.header}</span>
              {card.topic && (
                <span style={{ background: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.9)', fontSize: '0.7rem', padding: '2px 10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                  {card.topic}
                </span>
              )}
            </div>
            {/* Body */}
            <div style={{ background: '#f8f9ff', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Answer box */}
              {card.answer && (
                <div style={{ background: '#ecfdf5', border: '1px solid #6ee7b7', borderRadius: '8px', padding: '10px 14px' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '4px' }}>
                    ✅ Correct Answer
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#064e3b', fontWeight: 500 }}>{card.answer}</div>
                </div>
              )}
              {/* Solution steps */}
              {card.body.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#003893', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>
                    Solution
                  </div>
                  {card.body.map((line, j) => (
                    <div key={j} style={{ fontSize: '0.87rem', color: '#222', lineHeight: 1.85, padding: '2px 0' }}>
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Home() {
  const [authed, setAuthed] = useState(false)
  const [code, setCode] = useState('')
  const [authErr, setAuthErr] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [tab, setTab] = useState('solver')

  const [imgB64, setImgB64] = useState(null)
  const [imgSrc, setImgSrc] = useState(null)
  const [solverSubj, setSolverSubj] = useState('auto')
  const [solving, setSolving] = useState(false)
  const [solverResult, setSolverResult] = useState(null)
  const [solverErr, setSolverErr] = useState(null)
  const fileRef = useRef()

  const [mcqSubj, setMcqSubj] = useState('Physics')
  const [mcqDiff, setMcqDiff] = useState('medium')
  const [curQ, setCurQ] = useState(null)
  const [chosen, setChosen] = useState(null)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [openNote, setOpenNote] = useState(null)

  async function handleAuth(e) {
    e.preventDefault()
    setAuthLoading(true)
    setAuthErr('')
    try {
      const res = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }) })
      const data = await res.json()
      if (data.ok) setAuthed(true)
      else setAuthErr(data.message || 'Wrong code')
    } catch { setAuthErr('Network error. Try again.') }
    setAuthLoading(false)
  }

  function handleFile(file) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      setImgSrc(ev.target.result)
      setImgB64(ev.target.result.split(',')[1])
      setSolverResult(null)
      setSolverErr(null)
    }
    reader.readAsDataURL(file)
  }

  async function handleSolve() {
    if (!imgB64) return
    setSolving(true)
    setSolverResult(null)
    setSolverErr(null)
    try {
      const res = await fetch('/api/solve', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: imgB64, subject: solverSubj }) })
      const data = await res.json()
      if (data.error) setSolverErr(data.error)
      else setSolverResult(data.result)
    } catch { setSolverErr('Network error. Try again.') }
    setSolving(false)
  }

  function genQ() {
    const pool = MCQ_BANK[mcqSubj][mcqDiff]
    setCurQ(pool[Math.floor(Math.random() * pool.length)])
    setChosen(null)
    setTotal(t => t + 1)
  }

  function pick(i) {
    if (chosen !== null) return
    setChosen(i)
    if (i === curQ.a) setScore(s => s + 1)
  }

  const SUBJECTS = ['auto', 'Physics', 'Chemistry', 'Mathematics', 'Biology', 'English']
  const heroText = {
    solver: ['AI Question Solver', 'Upload any exam screenshot — get instant step-by-step solutions'],
    mcq: ['MCQ Practice', 'CEE-level questions with explanations and score tracking'],
    notes: ['Formula Notes', 'Key formulas and concepts across all subjects']
  }

  if (!authed) return (
    <div className={styles.lock}>
      <div className={styles.lockCard}>
        <div className={styles.wordmark}>dhakal<span>.io</span></div>
        <div className={styles.lockSub}>CEE · IOE Entrance Prep</div>
        <form onSubmit={handleAuth}>
          <input className={styles.lockInput} type="password" placeholder="Enter access code" value={code} onChange={e => setCode(e.target.value)} autoComplete="off" />
          <button className={styles.lockBtn} type="submit" disabled={authLoading}>{authLoading ? 'Checking...' : 'Continue →'}</button>
          {authErr && <p className={styles.lockErr}>{authErr}</p>}
        </form>
        <p className={styles.lockHint}>DM @dhakalbytes on Instagram to get your code</p>
      </div>
    </div>
  )

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.wordmark}>dhakal<span>.io</span></div>
        <nav className={styles.nav}>
          {['solver', 'mcq', 'notes'].map(t => (
            <button key={t} className={`${styles.navBtn} ${tab === t ? styles.navOn : ''}`} onClick={() => setTab(t)}>
              {t === 'solver' ? 'Solver' : t === 'mcq' ? 'MCQ Practice' : 'Notes'}
            </button>
          ))}
        </nav>
        <button className={styles.exitBtn} onClick={() => setAuthed(false)}>Exit</button>
      </header>

      <div className={styles.hero}>
        <div className={styles.heroEye}>AI-powered exam prep</div>
        <div className={styles.heroTitle}>{heroText[tab][0]}</div>
        <div className={styles.heroSub}>{heroText[tab][1]}</div>
      </div>

      <main className={styles.main}>

        {tab === 'solver' && (
          <div className={styles.panel}>
            {!imgSrc ? (
              <div className={styles.drop} onClick={() => fileRef.current.click()}>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
                <div className={styles.dropIcon}>📸</div>
                <div className={styles.dropTitle}>Drop screenshot or tap to upload</div>
                <div className={styles.dropHint}>Past papers, model sets, textbook photos</div>
              </div>
            ) : (
              <div className={styles.previewWrap}>
                <img src={imgSrc} alt="Preview" className={styles.preview} />
                <button className={styles.clearBtn} onClick={() => { setImgSrc(null); setImgB64(null); setSolverResult(null) }}>✕ Remove</button>
              </div>
            )}
            <div className={styles.pills}>
              {SUBJECTS.map(s => (
                <button key={s} className={`${styles.pill} ${solverSubj === s ? styles.pillOn : ''}`} onClick={() => setSolverSubj(s)}>
                  {s === 'auto' ? 'Auto-detect' : s}
                </button>
              ))}
            </div>
            <button className={styles.cta} disabled={!imgB64 || solving} onClick={handleSolve}>
              {solving ? '⏳ Solving...' : 'Solve Questions'}
            </button>
            {solverErr && <div className={styles.errBox}>{solverErr}</div>}
            {solverResult && (
              <div className={styles.resultBox}>
                <div className={styles.resultBar}>✦ Solutions — dhakal.io</div>
                <div className={styles.resultBody}>
                  <SolutionCards text={solverResult} />
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'mcq' && (
          <div className={styles.panel}>
            <div className={styles.mcqTop}>
              <select value={mcqSubj} onChange={e => setMcqSubj(e.target.value)} className={styles.sel}>
                {Object.keys(MCQ_BANK).map(s => <option key={s}>{s}</option>)}
              </select>
              <select value={mcqDiff} onChange={e => setMcqDiff(e.target.value)} className={styles.sel}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard — CEE level</option>
              </select>
              <button className={styles.genBtn} onClick={genQ}>Generate →</button>
            </div>
            {total > 0 && (
              <div className={styles.scoreBar}>
                <div className={styles.scoreRow}>
                  <span className={styles.scoreLabel}>Score</span>
                  <span className={styles.scoreNum}>{score} / {total}</span>
                </div>
                <div className={styles.scoreTrack}>
                  <div className={styles.scoreFill} style={{ width: `${Math.round((score / total) * 100)}%` }} />
                </div>
              </div>
            )}
            {!curQ && <p className={styles.placeholder}>Pick a subject and difficulty, then hit Generate to start.</p>}
            {curQ && (
              <div className={styles.qCard}>
                <div className={styles.qBadges}>
                  <span className={styles.qBadgeS}>{mcqSubj}</span>
                  <span className={styles.qBadgeD}>{mcqDiff}</span>
                </div>
                <div className={styles.qText}>{curQ.q}</div>
                <div className={styles.opts}>
                  {curQ.o.map((o, i) => (
                    <button key={i}
                      className={`${styles.opt} ${chosen !== null ? (i === curQ.a ? styles.optOk : i === chosen ? styles.optNo : '') : ''}`}
                      onClick={() => pick(i)} disabled={chosen !== null}>
                      {'ABCD'[i]}) {o}
                    </button>
                  ))}
                </div>
                {chosen !== null && (
                  <>
                    <div className={styles.exp}>{curQ.e}</div>
                    <button className={styles.nxtBtn} onClick={genQ}>Next question →</button>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {tab === 'notes' && (
          <div className={styles.panel}>
            {!openNote ? (
              <div className={styles.notesGrid}>
                {Object.entries(NOTES).map(([name, n]) => (
                  <div key={name} className={styles.noteTile} onClick={() => setOpenNote(name)} style={{ '--nc': n.color }}>
                    <div className={styles.noteIcon}>{n.emoji}</div>
                    <div className={styles.noteTitle}>{name}</div>
                    <div className={styles.noteSub}>{n.sub}</div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <button className={styles.back} onClick={() => setOpenNote(null)}>← All subjects</button>
                <div className={styles.noteDetail}>
                  <div className={styles.noteDetailTitle} style={{ color: NOTES[openNote].color }}>{openNote} formulas</div>
                  {NOTES[openNote].sections.map(sec => (
                    <div key={sec.h}>
                      <div className={styles.secTitle}>{sec.h}</div>
                      {sec.items.map(it => (
                        <div key={it.l} className={styles.fRow}>
                          <div className={styles.fLabel}>{it.l}</div>
                          <div className={styles.fBox}>{it.f}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

      </main>
      <footer className={styles.footer}>
        © 2026 Shirish S. Dhakal · <strong>dhakal.io</strong> · Nepal CEE &amp; IOE Entrance · All rights reserved
      </footer>
    </div>
  )
}
