'use client'
import { useState, useRef } from 'react'

// ── THEME ────────────────────────────────────────────────────────────────────
const C = {
  bg:'#0d0d14', bg2:'#12121e', bg3:'#181828',
  card:'#15152a', card2:'#1c1c32',
  p:'#7c3aed', p2:'#6d28d9', pL:'#a78bfa', pF:'rgba(124,58,237,0.13)',
  border:'rgba(124,58,237,0.18)', border2:'rgba(255,255,255,0.06)',
  text:'#f0f0ff', text2:'#9090b8', text3:'#55557a',
  green:'#10b981', greenF:'rgba(16,185,129,0.1)', greenB:'rgba(16,185,129,0.25)',
  red:'#ef4444', redF:'rgba(239,68,68,0.1)',
  gold:'#f59e0b',
}

// ── CEE/IOE COMPLETE SYLLABUS NOTES ─────────────────────────────────────────
const NOTES = {
  Physics: {
    icon:'⚛️', color:C.pL, tag:'CEE + IOE',
    chapters: [
      { name:'Mechanics', formulas:[
        {l:'Newton\'s Laws',f:'F=ma | Action=Reaction | Inertia law'},
        {l:'Kinematics',f:'v=u+at | s=ut+½at² | v²=u²+2as'},
        {l:'Projectile Range',f:'R=u²sin2θ/g | Max R at θ=45° → R=u²/g'},
        {l:'Projectile Max Height',f:'H=u²sin²θ/2g'},
        {l:'Work & Energy',f:'W=Fs cosθ | KE=½mv² | PE=mgh'},
        {l:'Work-Energy Theorem',f:'W_net=ΔKE=½mv²-½mu²'},
        {l:'Power',f:'P=W/t=Fv'},
        {l:'Momentum & Impulse',f:'p=mv | J=Ft=Δp'},
        {l:'Conservation of Momentum',f:'m₁u₁+m₂u₂=m₁v₁+m₂v₂'},
        {l:'Elastic Collision',f:'e=1 | KE conserved | v₁=(m₁-m₂)u₁+2m₂u₂)/(m₁+m₂)'},
        {l:'Circular Motion',f:'a=v²/r=ω²r | F=mv²/r | v=rω | T=2π/ω'},
        {l:'Banking of Road',f:'tanθ=v²/rg | v_opt=√(rg tanθ)'},
        {l:'Gravitation',f:'F=Gm₁m₂/r² | G=6.67×10⁻¹¹ N·m²/kg²'},
        {l:'Gravitational Field',f:'g=GM/R² | g=9.8 m/s² on Earth'},
        {l:'Escape Velocity',f:'v_e=√(2gR)=11.2 km/s'},
        {l:'Orbital Velocity',f:'v_o=√(gR)=7.9 km/s'},
        {l:'Kepler\'s 3rd Law',f:'T²∝r³ | T²/r³=constant'},
      ]},
      { name:'Rotational Motion', formulas:[
        {l:'Torque',f:'τ=rF sinθ=Iα'},
        {l:'Moment of Inertia',f:'I=Σmr² | Ring=MR² | Disc=½MR² | Sphere=2/5 MR²'},
        {l:'Angular KE',f:'KE=½Iω²'},
        {l:'Angular Momentum',f:'L=Iω=mvr'},
        {l:'Parallel Axis Theorem',f:'I=I_cm+Md²'},
      ]},
      { name:'Elasticity & SHM', formulas:[
        {l:'Stress & Strain',f:'Stress=F/A | Strain=ΔL/L | Young\'s E=Stress/Strain'},
        {l:'SHM Displacement',f:'x=A sin(ωt+φ)'},
        {l:'SHM Velocity',f:'v=ω√(A²-x²) | v_max=ωA at x=0'},
        {l:'SHM Acceleration',f:'a=-ω²x | a_max=ω²A'},
        {l:'Simple Pendulum',f:'T=2π√(l/g) | f=1/(2π)√(g/l)'},
        {l:'Spring-Mass',f:'T=2π√(m/k) | k=spring constant'},
      ]},
      { name:'Fluid Mechanics', formulas:[
        {l:'Pressure',f:'P=F/A | P=ρgh | 1 atm=101325 Pa'},
        {l:'Archimedes Principle',f:'Buoyant force=weight of fluid displaced'},
        {l:'Continuity Equation',f:'A₁v₁=A₂v₂'},
        {l:'Bernoulli\'s Equation',f:'P+½ρv²+ρgh=constant'},
        {l:'Torricelli\'s Theorem',f:'v=√(2gh)'},
        {l:'Surface Tension',f:'T=F/L | Excess pressure in bubble=4T/r | drop=2T/r'},
        {l:'Viscosity',f:"Stoke's law: F=6πηrv | Terminal velocity: v_t=2r²(ρ-σ)g/9η"},
      ]},
      { name:'Thermodynamics', formulas:[
        {l:'Ideal Gas Law',f:'PV=nRT | R=8.314 J/mol·K | PV=NkT | k=1.38×10⁻²³'},
        {l:'1st Law of Thermodynamics',f:'ΔU=Q-W | Q=heat added | W=work done by gas'},
        {l:'Isothermal Process',f:'T=const | PV=const | W=nRT ln(V₂/V₁)'},
        {l:'Adiabatic Process',f:'Q=0 | PVᵞ=const | γ=Cp/Cv'},
        {l:'Isochoric Process',f:'V=const | W=0 | ΔU=Q'},
        {l:'Isobaric Process',f:'P=const | W=PΔV'},
        {l:'Carnot Efficiency',f:'η=1-T_c/T_h | maximum possible efficiency'},
        {l:'Specific Heat',f:'Q=mcΔT | c_water=4200 J/kg·K'},
        {l:'Latent Heat',f:'Q=mL | L_fusion(ice)=336 kJ/kg | L_vap(water)=2260 kJ/kg'},
      ]},
      { name:'Waves & Sound', formulas:[
        {l:'Wave Speed',f:'v=fλ | v_sound=332 m/s (0°C) | v=√(B/ρ)'},
        {l:'Intensity',f:'I=P/4πr² | I∝1/r²'},
        {l:'Decibel',f:'β=10 log(I/I₀) | I₀=10⁻¹² W/m²'},
        {l:'Doppler Effect',f:"f'=f(v±v_o)/(v∓v_s) | + for approach, - for recede"},
        {l:'Standing Waves (string)',f:'λ=2L/n | f_n=nv/2L | n=1,2,3...'},
        {l:'Open Pipe',f:'f_n=nv/2L | all harmonics present'},
        {l:'Closed Pipe',f:'f_n=(2n-1)v/4L | only odd harmonics'},
        {l:'Beats',f:'f_beat=|f₁-f₂|'},
      ]},
      { name:'Optics', formulas:[
        {l:'Reflection Laws',f:'i=r | angle of incidence = angle of reflection'},
        {l:'Mirror Formula',f:'1/f=1/v+1/u | f=R/2 | m=-v/u'},
        {l:'Refraction (Snell\'s Law)',f:'n₁sinθ₁=n₂sinθ₂ | n=c/v=sin i/sin r'},
        {l:'Critical Angle',f:'sin C=n₂/n₁=1/n (if n₂=air)'},
        {l:'Lens Formula',f:'1/f=1/v-1/u | m=v/u | P=1/f (dioptre)'},
        {l:'Lens Maker\'s Equation',f:'1/f=(n-1)(1/R₁-1/R₂)'},
        {l:'Combination of Lenses',f:'1/F=1/f₁+1/f₂ | P=P₁+P₂'},
        {l:'Prism Deviation',f:'δ=(n-1)A (small angle) | D_min when i=e'},
        {l:'Young\'s Double Slit',f:'β=λD/d | fringe width=λD/d'},
        {l:'Diffraction Grating',f:'d sinθ=nλ'},
      ]},
      { name:'Electricity & Magnetism', formulas:[
        {l:'Coulomb\'s Law',f:'F=kq₁q₂/r² | k=9×10⁹ N·m²/C²'},
        {l:'Electric Field',f:'E=F/q=kQ/r²'},
        {l:'Electric Potential',f:'V=kQ/r | E=-dV/dr'},
        {l:'Capacitance',f:'C=Q/V | parallel plate: C=ε₀A/d'},
        {l:'Energy in capacitor',f:'U=½CV²=Q²/2C'},
        {l:'Ohm\'s Law',f:'V=IR | R=ρL/A'},
        {l:'Power',f:'P=VI=I²R=V²/R'},
        {l:'Kirchhoff\'s Laws',f:'KCL: ΣI=0 at node | KVL: ΣV=0 in loop'},
        {l:'Series & Parallel R',f:'R_s=R₁+R₂ | 1/R_p=1/R₁+1/R₂'},
        {l:'Magnetic Force',f:'F=qvB sinθ | F=BIL sinθ'},
        {l:'Magnetic Field (wire)',f:'B=μ₀I/2πr | μ₀=4π×10⁻⁷ T·m/A'},
        {l:'Faraday\'s Law',f:'emf=-NΔΦ/Δt | Φ=BA cosθ'},
        {l:'Lenz\'s Law',f:'Induced current opposes change in flux'},
        {l:'Self Inductance',f:'emf=-L dI/dt | energy=½LI²'},
      ]},
      { name:'Modern Physics', formulas:[
        {l:'Photoelectric Effect',f:'KE_max=hf-φ | h=6.626×10⁻³⁴ J·s | eV_stop=KE_max'},
        {l:'Threshold Frequency',f:'f₀=φ/h | λ_max=hc/φ'},
        {l:'de Broglie Wavelength',f:'λ=h/mv=h/p'},
        {l:'Heisenberg Uncertainty',f:'ΔxΔp≥h/4π | ΔEΔt≥h/4π'},
        {l:'Bohr\'s Model',f:'r_n=0.529 n² Å | E_n=-13.6/n² eV'},
        {l:'Energy Levels',f:'ΔE=hf | E=hc/λ'},
        {l:'Mass-Energy',f:'E=mc² | c=3×10⁸ m/s'},
        {l:'Nuclear Radius',f:'R=R₀A^(1/3) | R₀=1.2×10⁻¹⁵ m'},
        {l:'Radioactive Decay',f:'N=N₀e^(-λt) | A=A₀e^(-λt) | t½=0.693/λ'},
        {l:'Binding Energy',f:'BE=(Zm_p+Nm_n-M)×931.5 MeV'},
      ]},
    ]
  },
  Chemistry: {
    icon:'🧪', color:'#34d399', tag:'CEE + IOE',
    chapters: [
      { name:'Atomic Structure', formulas:[
        {l:'Bohr\'s Postulates',f:'mvr=nh/2π | E_n=-13.6/n² eV | r_n=0.529n² Å'},
        {l:'Quantum Numbers',f:'n=shell | l=0 to n-1 | m_l=-l to +l | m_s=±½'},
        {l:'Electronic Config',f:'Aufbau: 1s²2s²2p⁶3s²3p⁶4s²3d¹⁰... | Hund\'s rule | Pauli exclusion'},
        {l:'Periodic Trends',f:'IE: → increases, ↓ decreases | Atomic radius: → decreases, ↓ increases'},
      ]},
      { name:'Chemical Bonding', formulas:[
        {l:'Electronegativity',f:'<0.4: nonpolar covalent | 0.4-1.7: polar covalent | >1.7: ionic'},
        {l:'Formal Charge',f:'FC=valence e⁻ - nonbonding e⁻ - ½ bonding e⁻'},
        {l:'VSEPR Shapes',f:'2: linear | 3: trigonal planar | 4: tetrahedral | 5: trigonal bipyramidal | 6: octahedral'},
        {l:'Hybridisation',f:'sp: 180° | sp²: 120° | sp³: 109.5° | sp³d: 90°,120° | sp³d²: 90°'},
        {l:'Bond Order',f:'BO=(bonding e⁻ - antibonding e⁻)/2 | higher BO=shorter, stronger bond'},
      ]},
      { name:'States of Matter', formulas:[
        {l:'Ideal Gas Law',f:'PV=nRT | R=0.0821 L·atm/mol·K=8.314 J/mol·K'},
        {l:'Combined Gas Law',f:'P₁V₁/T₁=P₂V₂/T₂'},
        {l:'Dalton\'s Law',f:'P_total=P₁+P₂+P₃+... | P_i=χ_i×P_total'},
        {l:'Graham\'s Law',f:'r₁/r₂=√(M₂/M₁) | lighter gas diffuses faster'},
        {l:'Van der Waals',f:'(P+an²/V²)(V-nb)=nRT'},
        {l:'Mole Fraction',f:'χ_A=n_A/n_total'},
      ]},
      { name:'Thermochemistry', formulas:[
        {l:'Enthalpy',f:'ΔH=H_products-H_reactants | exothermic: ΔH<0 | endothermic: ΔH>0'},
        {l:'Hess\'s Law',f:'ΔH_rxn=ΣΔH_f(products)-ΣΔH_f(reactants)'},
        {l:'Bond Enthalpy',f:'ΔH=ΣBE(bonds broken)-ΣBE(bonds formed)'},
        {l:'Gibbs Free Energy',f:'ΔG=ΔH-TΔS | spontaneous: ΔG<0 | equilibrium: ΔG=0'},
        {l:'Entropy',f:'ΔS>0: disorder increases | gas>liquid>solid'},
        {l:'Standard conditions',f:'25°C, 1 atm, 1M | ΔG°=-RT lnK=-nFE°'},
      ]},
      { name:'Chemical Equilibrium', formulas:[
        {l:'Equilibrium Constant',f:'K_c=[products]/[reactants] (concentration powers)'},
        {l:'K_p and K_c',f:'K_p=K_c(RT)^Δn | Δn=moles gas(products)-moles gas(reactants)'},
        {l:'Le Chatelier\'s Principle',f:'System shifts to oppose disturbance (conc, P, T)'},
        {l:'Solubility Product',f:'K_sp=[cation]^m[anion]^n'},
        {l:'Reaction Quotient',f:'Q<K: forward | Q>K: backward | Q=K: equilibrium'},
      ]},
      { name:'Acids, Bases & Salts', formulas:[
        {l:'pH Scale',f:'pH=-log[H⁺] | pOH=-log[OH⁻] | pH+pOH=14 at 25°C'},
        {l:'Strong Acid/Base',f:'HCl, HNO₃, H₂SO₄, HClO₄ | NaOH, KOH, Ca(OH)₂'},
        {l:'Weak Acid K_a',f:'K_a=[H⁺][A⁻]/[HA] | pK_a=-log K_a'},
        {l:'Henderson-Hasselbalch',f:'pH=pK_a+log([A⁻]/[HA]) | for buffer solutions'},
        {l:'K_w',f:'K_w=[H⁺][OH⁻]=10⁻¹⁴ | pK_w=14 | K_a×K_b=K_w'},
        {l:'Hydrolysis',f:'Salt of weak acid+strong base: basic | Salt of strong acid+weak base: acidic'},
      ]},
      { name:'Electrochemistry', formulas:[
        {l:'Faraday\'s 1st Law',f:'m=ZIt | Z=electrochemical equivalent=M/nF'},
        {l:'Faraday\'s 2nd Law',f:'m₁/m₂=E₁/E₂ (E=equivalent weight)'},
        {l:'Faraday Constant',f:'F=96500 C/mol | 1 mole e⁻=96500 C'},
        {l:'Cell EMF',f:'E°_cell=E°_cathode-E°_anode'},
        {l:'Nernst Equation',f:'E=E°-(RT/nF)ln Q=E°-(0.0592/n)log Q at 25°C'},
        {l:'ΔG and EMF',f:'ΔG°=-nFE° | ΔG°=-RT ln K'},
      ]},
      { name:'Organic Chemistry', formulas:[
        {l:'IUPAC Nomenclature',f:'Alkane: -ane | Alkene: -ene | Alkyne: -yne | Alcohol: -ol | Aldehyde: -al | Ketone: -one | Acid: -oic acid'},
        {l:'Isomerism',f:'Structural: chain, position, functional | Stereo: geometric (cis-trans), optical (enantiomers)'},
        {l:'Reactions - Alkanes',f:'Halogenation (hν): CH₄+Cl₂→CH₃Cl+HCl | Combustion: CH₄+2O₂→CO₂+2H₂O'},
        {l:'Reactions - Alkenes',f:'Hydrogenation: -CH=CH-+H₂→-CH₂-CH₂- | Halogenation: +X₂→dihalide | HX: Markovnikov'},
        {l:'Markovnikov\'s Rule',f:'H adds to C with more H | OR: negative part adds to more substituted C'},
        {l:'Alkynes',f:'+2H₂→alkane | +H₂O(H⁺/HgSO₄)→ketone/aldehyde (Markovnikov)'},
        {l:'Alcohol reactions',f:'Oxidation: 1°→aldehyde→acid | 2°→ketone | 3°→no reaction with K₂Cr₂O₇'},
        {l:'Aldehyde vs Ketone',f:'Aldehyde: Fehling\'s (red ppt), Tollens (silver mirror), Benedict\'s | Ketone: none'},
        {l:'Iodoform Test',f:'CH₃CO- or CH₃CHOH- + I₂/NaOH → CHI₃ (yellow ppt)'},
        {l:'Carboxylic Acids',f:'RCOOH+R\'OH⇌RCOOR\'+H₂O (esterification, H⁺ cat.)'},
        {l:'Amines',f:'1°: RNH₂ | 2°: R₂NH | 3°: R₃N | Basicity: 2°>1°>3°>NH₃ (aliphatic)'},
        {l:'Benzene reactions',f:'Electrophilic substitution: halogenation, nitration, sulfonation, Friedel-Crafts'},
        {l:'Nitration of benzene',f:'C₆H₆+HNO₃(H₂SO₄)→C₆H₅NO₂+H₂O'},
      ]},
    ]
  },
  Mathematics: {
    icon:'📐', color:'#f472b6', tag:'CEE + IOE',
    chapters: [
      { name:'Sets & Functions', formulas:[
        {l:'Set Operations',f:'A∪B | A∩B | A-B | A\' (complement)'},
        {l:'De Morgan\'s Laws',f:'(A∪B)\'=A\'∩B\' | (A∩B)\'=A\'∪B\''},
        {l:'Number of subsets',f:'2ⁿ for set with n elements'},
        {l:'Function types',f:'One-one (injective) | Onto (surjective) | Bijective | Composite: (fog)(x)=f(g(x))'},
      ]},
      { name:'Algebra', formulas:[
        {l:'Quadratic Formula',f:'x=(-b±√(b²-4ac))/2a'},
        {l:'Discriminant',f:'D=b²-4ac | D>0: 2 real | D=0: equal | D<0: complex roots'},
        {l:'Vieta\'s Formulas',f:'sum of roots=-b/a | product of roots=c/a'},
        {l:'AP',f:'a_n=a+(n-1)d | S_n=n/2(2a+(n-1)d) | S_n=n/2(a+l)'},
        {l:'GP',f:'a_n=arⁿ⁻¹ | S_n=a(rⁿ-1)/(r-1) | S∞=a/(1-r) for |r|<1'},
        {l:'HP',f:'a,b,c in HP if 1/a,1/b,1/c in AP'},
        {l:'AM-GM-HM',f:'AM≥GM≥HM | AM=(a+b)/2 | GM=√(ab) | HM=2ab/(a+b)'},
        {l:'Binomial Theorem',f:'(a+b)ⁿ=ΣC(n,r)aⁿ⁻ʳbʳ | T_(r+1)=C(n,r)aⁿ⁻ʳbʳ'},
        {l:'nCr & nPr',f:'C(n,r)=n!/r!(n-r)! | P(n,r)=n!/(n-r)!'},
        {l:'Partial Fractions',f:'px+q/(x-a)(x-b) = A/(x-a)+B/(x-b)'},
      ]},
      { name:'Trigonometry', formulas:[
        {l:'Fundamental Identities',f:'sin²θ+cos²θ=1 | 1+tan²θ=sec²θ | 1+cot²θ=csc²θ'},
        {l:'Compound Angles',f:'sin(A±B)=sinAcosB±cosAsinB | cos(A±B)=cosAcosB∓sinAsinB'},
        {l:'tan(A±B)',f:'tan(A±B)=(tanA±tanB)/(1∓tanAtanB)'},
        {l:'Double Angle',f:'sin2A=2sinAcosA | cos2A=cos²A-sin²A=1-2sin²A=2cos²A-1 | tan2A=2tanA/(1-tan²A)'},
        {l:'Half Angle',f:'sin(A/2)=±√((1-cosA)/2) | cos(A/2)=±√((1+cosA)/2)'},
        {l:'Product to Sum',f:'2sinAcosB=sin(A+B)+sin(A-B) | 2cosAcosB=cos(A-B)+cos(A+B)'},
        {l:'Sum to Product',f:'sinC+sinD=2sin((C+D)/2)cos((C-D)/2)'},
        {l:'Inverse Trig',f:'sin⁻¹x+cos⁻¹x=π/2 | tan⁻¹x+cot⁻¹x=π/2 | tan⁻¹x+tan⁻¹y=tan⁻¹((x+y)/(1-xy))'},
        {l:'Sine Rule',f:'a/sinA=b/sinB=c/sinC=2R'},
        {l:'Cosine Rule',f:'a²=b²+c²-2bc cosA'},
        {l:'Area of Triangle',f:'Area=½ab sinC=½bc sinA=½ca sinB'},
        {l:'Projection Formula',f:'a=b cosC+c cosB'},
      ]},
      { name:'Coordinate Geometry', formulas:[
        {l:'Distance & Section',f:'d=√((x₂-x₁)²+(y₂-y₁)²) | Section: ((mx₂+nx₁)/(m+n),(my₂+ny₁)/(m+n))'},
        {l:'Slope',f:'m=tanθ=(y₂-y₁)/(x₂-x₁) | parallel: m₁=m₂ | perpendicular: m₁m₂=-1'},
        {l:'Line equations',f:'y=mx+c | y-y₁=m(x-x₁) | x/a+y/b=1 | ax+by+c=0'},
        {l:'Distance from point to line',f:'d=|ax₁+by₁+c|/√(a²+b²)'},
        {l:'Angle between lines',f:'tanθ=|(m₁-m₂)/(1+m₁m₂)|'},
        {l:'Circle',f:'(x-h)²+(y-k)²=r² | general: x²+y²+2gx+2fy+c=0 | centre(-g,-f), r=√(g²+f²-c)'},
        {l:'Tangent to circle',f:'xx₁+yy₁=r² | T=0: xx₁+yy₁+g(x+x₁)+f(y+y₁)+c=0'},
        {l:'Parabola',f:'y²=4ax: focus(a,0), directrix x=-a | vertex(0,0) | axis: x-axis'},
        {l:'Ellipse',f:'x²/a²+y²/b²=1 | b²=a²(1-e²) | e<1 | foci(±ae,0)'},
        {l:'Hyperbola',f:'x²/a²-y²/b²=1 | b²=a²(e²-1) | e>1 | asymptotes: y=±(b/a)x'},
      ]},
      { name:'Limits & Continuity', formulas:[
        {l:'Standard Limits',f:'lim(x→0) sinx/x=1 | lim(x→0) tanx/x=1 | lim(x→0) (eˣ-1)/x=1 | lim(x→0) ln(1+x)/x=1'},
        {l:'L\'Hôpital\'s Rule',f:'lim f(x)/g(x)=lim f\'(x)/g\'(x) when 0/0 or ∞/∞'},
        {l:'Continuity',f:'f continuous at x=a if: f(a) exists | lim(x→a)f(x) exists | both equal'},
      ]},
      { name:'Differentiation', formulas:[
        {l:'Standard Derivatives',f:'d/dx(xⁿ)=nxⁿ⁻¹ | d/dx(sinx)=cosx | d/dx(cosx)=-sinx | d/dx(eˣ)=eˣ | d/dx(lnx)=1/x'},
        {l:'More Derivatives',f:'d/dx(aˣ)=aˣ ln a | d/dx(tanx)=sec²x | d/dx(sin⁻¹x)=1/√(1-x²)'},
        {l:'Rules',f:'(u+v)\'=u\'+v\' | (uv)\'=u\'v+uv\' | (u/v)\'=(u\'v-uv\')/v² | Chain: dy/dx=(dy/du)(du/dx)'},
        {l:'Implicit Diff',f:'d/dx(y²)=2y dy/dx | d/dx(y³)=3y² dy/dx'},
        {l:'Parametric',f:'dy/dx=(dy/dt)/(dx/dt)'},
        {l:'Applications',f:'Increasing: f\'(x)>0 | Decreasing: f\'(x)<0 | Max/Min: f\'(x)=0 | Inflection: f\'\'(x)=0'},
        {l:'Rolle\'s Theorem',f:'f(a)=f(b) → ∃c∈(a,b) where f\'(c)=0'},
        {l:'Mean Value Theorem',f:'f\'(c)=(f(b)-f(a))/(b-a)'},
      ]},
      { name:'Integration', formulas:[
        {l:'Standard Integrals',f:'∫xⁿdx=xⁿ⁺¹/(n+1)+C | ∫sinx dx=-cosx+C | ∫cosx dx=sinx+C | ∫eˣdx=eˣ+C | ∫1/x dx=ln|x|+C'},
        {l:'More Integrals',f:'∫sec²x dx=tanx+C | ∫1/√(1-x²)dx=sin⁻¹x+C | ∫1/(1+x²)dx=tan⁻¹x+C'},
        {l:'Integration by Parts',f:'∫u dv=uv-∫v du | ILATE: Inverse, Log, Algebraic, Trig, Exponential'},
        {l:'Substitution',f:'∫f(g(x))g\'(x)dx = ∫f(u)du where u=g(x)'},
        {l:'Definite Integral',f:'∫[a,b]f(x)dx=F(b)-F(a) | ∫[a,b]f(x)dx=-∫[b,a]f(x)dx'},
        {l:'Properties',f:'∫[0,a]f(x)dx=∫[0,a]f(a-x)dx | ∫[-a,a]f(x)dx=2∫[0,a]f(x)dx if f is even, 0 if odd'},
        {l:'Area between curves',f:'A=∫[a,b]|f(x)-g(x)|dx'},
      ]},
      { name:'Differential Equations', formulas:[
        {l:'Variable Separable',f:'dy/dx=f(x)g(y) → ∫dy/g(y)=∫f(x)dx'},
        {l:'Homogeneous',f:'dy/dx=f(y/x) → substitute v=y/x'},
        {l:'Linear 1st Order',f:'dy/dx+Py=Q | IF=e^∫P dx | y×IF=∫Q×IF dx'},
      ]},
      { name:'Matrices & Determinants', formulas:[
        {l:'Determinant 2×2',f:'|A|=ad-bc'},
        {l:'Determinant 3×3',f:'expand along any row or column (cofactor expansion)'},
        {l:'Properties of Det',f:'|AB|=|A||B| | |kA|=kⁿ|A| | det(Aᵀ)=det(A) | det(A⁻¹)=1/det(A)'},
        {l:'Inverse',f:'A⁻¹=adj(A)/|A| | AA⁻¹=I'},
        {l:'Cramer\'s Rule',f:'x=Dx/D | y=Dy/D | z=Dz/D'},
        {l:'Rank',f:'Rank = number of non-zero rows in row echelon form'},
      ]},
      { name:'Vectors', formulas:[
        {l:'Magnitude',f:'|a|=√(a₁²+a₂²+a₃²)'},
        {l:'Unit Vector',f:'â=a/|a| | i,j,k are unit vectors along x,y,z'},
        {l:'Dot Product',f:'a·b=|a||b|cosθ=a₁b₁+a₂b₂+a₃b₃ | if a·b=0: perpendicular'},
        {l:'Cross Product',f:'|a×b|=|a||b|sinθ | if a×b=0: parallel | a×b=-b×a'},
        {l:'Scalar Triple Product',f:'[a b c]=a·(b×c)=volume of parallelepiped | =0 if coplanar'},
        {l:'Section Formula',f:'r=(m·r₂+n·r₁)/(m+n)'},
      ]},
      { name:'Probability & Statistics', formulas:[
        {l:'Probability',f:'P(A)=n(A)/n(S) | 0≤P(A)≤1 | P(A\')+P(A)=1'},
        {l:'Addition Rule',f:'P(A∪B)=P(A)+P(B)-P(A∩B) | if mutually exclusive: P(A∪B)=P(A)+P(B)'},
        {l:'Multiplication Rule',f:'P(A∩B)=P(A)P(B|A) | if independent: P(A∩B)=P(A)P(B)'},
        {l:'Bayes Theorem',f:'P(A|B)=P(B|A)P(A)/P(B)'},
        {l:'Binomial Distribution',f:'P(X=r)=C(n,r)pʳqⁿ⁻ʳ | mean=np | variance=npq'},
        {l:'Mean & Variance',f:'mean=Σfx/Σf | variance=Σf(x-x̄)²/Σf | SD=√variance'},
      ]},
    ]
  },
  Biology: {
    icon:'🌿', color:'#4ade80', tag:'CEE only',
    chapters: [
      { name:'Cell Biology', formulas:[
        {l:'Cell Theory',f:'1. All living things made of cells 2. Cells from pre-existing cells 3. Cells=basic unit of life'},
        {l:'Prokaryote vs Eukaryote',f:'Prokaryote: no nucleus, 70S ribosomes | Eukaryote: nucleus, 80S ribosomes'},
        {l:'Cell Organelles',f:'Mitochondria: ATP (powerhouse) | Ribosome: protein synthesis | Lysosome: digestion | Golgi: packaging | ER: transport'},
        {l:'Cell membrane',f:'Fluid mosaic model | phospholipid bilayer | selective permeable'},
        {l:'Cell Division - Mitosis',f:'PMAT: Prophase→Metaphase→Anaphase→Telophase | result: 2 identical diploid cells'},
        {l:'Cell Division - Meiosis',f:'Meiosis I: homologs separate | Meiosis II: chromatids separate | result: 4 haploid cells'},
        {l:'Cell Cycle',f:'G1 (growth) → S (DNA replication) → G2 (prep) → M (mitosis) → Cytokinesis'},
        {l:'Crossing Over',f:'Occurs in pachytene of prophase I | increases genetic variation'},
      ]},
      { name:'Biomolecules', formulas:[
        {l:'Carbohydrates',f:'Monosaccharide: glucose C₆H₁₂O₆ | Disaccharide: sucrose | Polysaccharide: starch, cellulose, glycogen'},
        {l:'Proteins',f:'Amino acids joined by peptide bonds | Primary→Secondary→Tertiary→Quaternary structure'},
        {l:'Lipids',f:'Fats=glycerol+3 fatty acids | Phospholipids=glycerol+2FA+phosphate | Steroids: cholesterol'},
        {l:'Nucleic Acids',f:'DNA: deoxyribose, A-T G-C, double helix | RNA: ribose, A-U G-C, single stranded'},
        {l:'Enzymes',f:'Biological catalysts | protein in nature | active site | lock and key / induced fit model'},
        {l:'Enzyme Factors',f:'Optimum pH and temp | inhibitors: competitive and non-competitive'},
      ]},
      { name:'Genetics', formulas:[
        {l:'Mendel\'s Laws',f:'1. Segregation: alleles separate in gametes 2. Independent assortment: genes on diff chromosomes'},
        {l:'Monohybrid ratio',f:'Aa×Aa → 3:1 (phenotype) | 1:2:1 (genotype)'},
        {l:'Dihybrid ratio',f:'AaBb×AaBb → 9:3:3:1'},
        {l:'Testcross',f:'unknown×recessive (aa) | 1:1 if heterozygous | all dominant if homozygous'},
        {l:'Codominance',f:'Both alleles expressed | eg: AB blood group'},
        {l:'Incomplete dominance',f:'Intermediate phenotype | eg: RR(red)×WW(white)→RW(pink)'},
        {l:'Sex-linked traits',f:'X-linked recessive: males affected more | carrier females: X^A X^a'},
        {l:'Hardy-Weinberg',f:'p²+2pq+q²=1 | p+q=1 | conditions: large pop, random mating, no mutation/selection/migration'},
      ]},
      { name:'Molecular Biology', formulas:[
        {l:'DNA Structure',f:'Double helix | antiparallel strands | A-T (2H bonds) | G-C (3H bonds) | sugar-phosphate backbone'},
        {l:'DNA Replication',f:'Semi-conservative | helicase unwinds | DNA polymerase adds nucleotides 5\'→3\' | Okazaki fragments'},
        {l:'Transcription',f:'DNA→mRNA | RNA polymerase | promoter region | 5\'→3\' direction | mRNA processed (splicing)'},
        {l:'Translation',f:'mRNA→protein | ribosome | codon=3 bases=1 amino acid | AUG=start | UAA/UAG/UGA=stop'},
        {l:'Genetic Code',f:'64 codons | 61 code amino acids | 3 stop codons | degenerate (multiple codons for 1 AA)'},
        {l:'Mutation types',f:'Point: substitution/insertion/deletion | Chromosomal: deletion/duplication/inversion/translocation'},
      ]},
      { name:'Human Physiology', formulas:[
        {l:'Digestive System',f:'Mouth→Esophagus→Stomach→SI→LI→Rectum | amylase(mouth)→pepsin(stomach)→lipase,trypsin(SI)'},
        {l:'Circulatory System',f:'Heart: 4 chambers | SA node=pacemaker | BP: 120/80 mmHg | HR: 60-100 bpm'},
        {l:'Blood',f:'RBC: O₂ transport (Hb) | WBC: immunity | Platelets: clotting | Plasma: 55% of blood'},
        {l:'Blood Groups',f:'A: antigen A | B: antigen B | AB: both antigens (universal receiver) | O: no antigens (universal donor)'},
        {l:'Respiratory System',f:'Tidal vol: 500 mL | Vital cap: 4600 mL | Residual: 1200 mL | IRV: 3000 mL | ERV: 1000 mL'},
        {l:'Gas Exchange',f:'O₂: alveoli→blood→tissues | CO₂: tissues→blood→alveoli | Bohr effect: low pH→Hb releases O₂'},
        {l:'Excretory System',f:'Nephron=basic unit | Bowman\'s capsule: filtration | PCT: reabsorption | Loop of Henle: concentration | DCT: secretion'},
        {l:'Urine Formation',f:'Glomerular filtration → Tubular reabsorption → Tubular secretion | GFR=125 mL/min'},
        {l:'Nervous System',f:'CNS: brain+spinal cord | PNS: somatic+autonomic | Neuron: dendrite→cell body→axon'},
        {l:'Synapse',f:'Electrical or chemical | neurotransmitters: acetylcholine, dopamine, serotonin, norepinephrine'},
        {l:'Endocrine Glands',f:'Pituitary: master gland (GH,TSH,ACTH,FSH,LH) | Thyroid: thyroxine (metabolism) | Adrenal: cortisol,adrenaline'},
        {l:'Hormones',f:'Insulin: ↓blood glucose | Glucagon: ↑blood glucose | ADH: water reabsorption | Oxytocin: uterine contractions'},
        {l:'Reproductive System',f:'Spermatogenesis: testis | Oogenesis: ovary | Menstrual cycle: 28 days | Ovulation: day 14'},
      ]},
      { name:'Plant Biology', formulas:[
        {l:'Photosynthesis',f:'6CO₂+6H₂O+light→C₆H₁₂O₆+6O₂ | chlorophyll in chloroplasts | 2 stages: light+dark'},
        {l:'Light Reactions',f:'PS II (680nm): water splitting, ATP, O₂ | PS I (700nm): NADPH formation'},
        {l:'Calvin Cycle',f:'CO₂+RuBP(C5)→2PGA(C3) | RuBisCO enzyme | ATP+NADPH needed | G3P→glucose'},
        {l:'C3 vs C4 plants',f:'C3: first product=3-carbon (PGA) | C4: first product=4-carbon (OAA) | C4 more efficient in heat'},
        {l:'Transpiration',f:'Water loss via stomata | cohesion-tension theory | stomata: K⁺ enters guard cells→open'},
        {l:'Plant Hormones',f:'Auxin(IAA): elongation, phototropism | Gibberellin: stem elongation | Cytokinin: cell division | ABA: dormancy | Ethylene: fruit ripening'},
        {l:'Water Transport',f:'Root pressure + transpiration pull | xylem: dead cells | apoplast & symplast pathways'},
        {l:'Mineral Nutrition',f:'Macronutrients: N,P,K,Ca,Mg,S | Micronutrients: Fe,Mn,Cu,Zn,B | N-fixing bacteria: Rhizobium'},
      ]},
      { name:'Ecology', formulas:[
        {l:'Ecosystem components',f:'Biotic: producers, consumers, decomposers | Abiotic: temperature, water, soil, light'},
        {l:'Trophic levels',f:'Producer→Primary consumer→Secondary→Tertiary | 10% energy transfers (10% law)'},
        {l:'Food chain/web',f:'Grazing food chain: plant→herbivore→carnivore | Detritus: dead matter→decomposer'},
        {l:'Ecological Pyramids',f:'Energy pyramid: always upright | Biomass: mostly upright | Number: may be inverted'},
        {l:'Biogeochemical Cycles',f:'Carbon: photosynthesis+respiration+decomposition | Nitrogen: fixation→nitrification→denitrification'},
        {l:'Population',f:'Birth rate, death rate, immigration, emigration | J-curve (exponential) | S-curve (logistic) | K=carrying capacity'},
        {l:'Biodiversity',f:'Alpha: within habitat | Beta: between habitats | Gamma: regional | hotspots: >1500 endemic plant species'},
        {l:'Conservation',f:'In-situ: national park, wildlife sanctuary, biosphere reserve | Ex-situ: zoo, botanical garden, seed bank'},
      ]},
    ]
  },
}

const MCQ_BANK = {
  Physics:{
    easy:[
      {q:"SI unit of force is:",o:["Joule","Newton","Watt","Pascal"],a:1,e:"F=ma, SI unit = Newton (N) = kg·m/s²"},
      {q:"A body moving with uniform velocity has net force:",o:["Zero","ma","mg","Non-zero"],a:0,e:"Newton's 1st law: no net force = no acceleration = constant velocity."},
      {q:"Energy stored in a capacitor:",o:["CV","½CV²","CV²","2CV"],a:1,e:"Energy = ½CV² = Q²/2C"},
    ],
    medium:[
      {q:"Escape velocity from Earth:",o:["7.9 km/s","11.2 km/s","3.0 km/s","9.8 km/s"],a:1,e:"v_e=√(2gR)≈11.2 km/s"},
      {q:"Projectile at 45°, max range:",o:["u²/g","u²/2g","2u²/g","u/2g"],a:0,e:"R=u²sin2θ/g, at 45° sin90°=1, R=u²/g"},
      {q:"If momentum doubled, KE becomes:",o:["Same","Double","4 times","Half"],a:2,e:"KE=p²/2m, if p→2p then KE→4 times"},
    ],
    hard:[
      {q:"Masses m and 2m on Atwood's machine. Acceleration:",o:["g/3","g/2","2g/3","g"],a:0,e:"a=(2m-m)g/(2m+m)=g/3"},
      {q:"Time period of satellite near Earth's surface:",o:["84 min","24 hr","90 min","60 min"],a:0,e:"T=2π√(R/g)≈84 minutes"},
    ]
  },
  Chemistry:{
    easy:[
      {q:"pH of 0.01 M HCl:",o:["1","2","3","0"],a:1,e:"HCl is strong acid, [H⁺]=0.01=10⁻², pH=-log(10⁻²)=2"},
      {q:"Which is a noble gas?",o:["Cl","Ne","Na","N"],a:1,e:"Ne (Neon) is in Group 18 — noble gases"},
      {q:"Hybridisation of carbon in ethylene (C₂H₄):",o:["sp","sp²","sp³","sp³d"],a:1,e:"Double bond → sp² hybridisation → trigonal planar, 120°"},
    ],
    medium:[
      {q:"IUPAC name of CH₃CHO:",o:["Methanal","Ethanal","Propanone","Ethanol"],a:1,e:"2-carbon aldehyde → ethanal"},
      {q:"Buffer solution: 0.1M CH₃COOH + 0.1M CH₃COONa, pKa=4.74:",o:["4.74","3.74","5.74","7.00"],a:0,e:"pH=pKa+log([A-]/[HA])=4.74+log(1)=4.74"},
      {q:"Reaction that shows Markovnikov's rule:",o:["Alkane+Cl₂","Alkene+HBr","Alkyne+H₂","Benzene+Br₂"],a:1,e:"HBr adds to alkene: H goes to C with more H atoms"},
    ],
    hard:[
      {q:"For N₂+3H₂→2NH₃, ΔH=−92kJ. Heat per mole NH₃:",o:["92 kJ","46 kJ","184 kJ","23 kJ"],a:1,e:"2 mol NH₃ gives 92 kJ → per mole = 46 kJ"},
      {q:"E°cell for Zn|Zn²⁺||Cu²⁺|Cu (E°Zn=-0.76V, E°Cu=+0.34V):",o:["1.10 V","0.42 V","-1.10 V","0.76 V"],a:0,e:"E°cell=E°cathode-E°anode=0.34-(-0.76)=1.10 V"},
    ]
  },
  Mathematics:{
    easy:[
      {q:"Derivative of sin x:",o:["cos x","−cos x","−sin x","tan x"],a:0,e:"d/dx(sin x)=cos x — fundamental rule"},
      {q:"∫cos x dx =",o:["sin x + C","−sin x + C","tan x + C","cos x + C"],a:0,e:"∫cos x dx = sin x + C"},
      {q:"log₁₀(1000) =",o:["2","3","4","10"],a:1,e:"log₁₀(10³)=3"},
    ],
    medium:[
      {q:"Area enclosed by y=x² and y=x:",o:["1/6","1/3","1/2","1/4"],a:0,e:"∫₀¹(x-x²)dx=1/2-1/3=1/6"},
      {q:"Sum of infinite GP: 1+1/2+1/4+...:",o:["1","2","3","∞"],a:1,e:"S∞=a/(1-r)=1/(1-½)=2"},
      {q:"Roots of x²-5x+6=0:",o:["2,3","1,6","-2,-3","2,-3"],a:0,e:"(x-2)(x-3)=0 → x=2 or x=3"},
    ],
    hard:[
      {q:"lim(x→0) (eˣ-1-x)/x²:",o:["0","1/2","1","∞"],a:1,e:"L'Hôpital twice: lim eˣ/2=1/2 as x→0"},
      {q:"∫[0,π/2] sin²x dx =",o:["π/4","π/2","1/2","π"],a:0,e:"Using cos2x formula: ∫½(1-cos2x)dx=[x/2-sin2x/4]₀^(π/2)=π/4"},
    ]
  },
  Biology:{
    easy:[
      {q:"Powerhouse of the cell:",o:["Nucleus","Ribosome","Mitochondria","Golgi"],a:2,e:"Mitochondria produce ATP via cellular respiration"},
      {q:"Normal human chromosome number:",o:["23","44","46","48"],a:2,e:"46 chromosomes (23 pairs) in somatic cells"},
      {q:"Which blood group is universal donor?",o:["A","B","AB","O"],a:3,e:"Blood group O (Rh-) has no A/B antigens"},
    ],
    medium:[
      {q:"Crossing over occurs during:",o:["Leptotene","Zygotene","Pachytene","Diplotene"],a:2,e:"Pachytene of prophase I — homologs fully synapsed"},
      {q:"First product of Calvin cycle:",o:["PEP","OAA","PGA","NADPH"],a:2,e:"CO₂+RuBP → 2 PGA (3-carbon) catalyzed by RuBisCO"},
      {q:"Hormone that lowers blood glucose:",o:["Glucagon","Insulin","Cortisol","Adrenaline"],a:1,e:"Insulin from beta cells of islets of Langerhans"},
    ],
    hard:[
      {q:"AaBbCc × AaBbCc — number of phenotypic classes:",o:["8","27","64","4"],a:0,e:"Each gene has 2 phenotypic classes, 3 genes = 2³=8"},
      {q:"Which is NOT a function of nephron PCT?",o:["Na⁺ reabsorption","Glucose reabsorption","H⁺ secretion","Urea concentration"],a:3,e:"Urea concentration occurs mainly in loop of Henle and collecting duct"},
    ]
  }
}

function cleanText(t){
  return t.replace(/\$\$([\s\S]*?)\$\$/g,'$1').replace(/\$(.*?)\$/g,'$1')
    .replace(/\\\((.*?)\\\)/g,'$1').replace(/\\\[([\s\S]*?)\\\]/g,'$1')
    .replace(/\*\*(.*?)\*\*/g,'$1').replace(/\*(.*?)\*/g,'$1').replace(/#{1,4} /g,'')
}

function SolutionCards({text}){
  const clean=cleanText(text)
  const blocks=clean.split(/---+/).map(b=>b.trim()).filter(Boolean)
  return(
    <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
      {blocks.map((block,i)=>{
        const lines=block.split('\n').map(l=>l.trim()).filter(Boolean)
        const header=lines.find(l=>/^Q\d+/i.test(l))||lines[0]
        const ansLine=lines.find(l=>/^answer[\:\s]/i.test(l))
        const topicLine=lines.find(l=>/^topic[\:\s]/i.test(l))
        const solLines=lines.filter(l=>l!==header&&!/^(answer|topic)[\:\s]/i.test(l))
        const ans=ansLine?ansLine.replace(/^answer[\:\s]*/i,'').trim():null
        const topic=topicLine?topicLine.replace(/^topic[\:\s]*/i,'').trim():null
        return(
          <div key={i} style={{borderRadius:'12px',overflow:'hidden',border:'1px solid rgba(124,58,237,0.25)'}}>
            <div style={{background:'linear-gradient(135deg,#6d28d9,#4c1d95)',padding:'11px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'6px'}}>
              <span style={{color:'#fff',fontWeight:600,fontSize:'0.88rem'}}>{header}</span>
              {topic&&<span style={{background:'rgba(255,255,255,0.15)',color:'rgba(255,255,255,0.85)',fontSize:'0.7rem',padding:'2px 10px',borderRadius:'20px'}}>{topic}</span>}
            </div>
            <div style={{background:'#15152a',padding:'14px 16px',display:'flex',flexDirection:'column',gap:'10px'}}>
              {ans&&<div style={{background:'rgba(16,185,129,0.1)',border:'1px solid rgba(16,185,129,0.25)',borderRadius:'8px',padding:'10px 14px'}}>
                <div style={{fontSize:'0.65rem',fontWeight:700,color:'#10b981',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:'4px'}}>✅ Correct Answer</div>
                <div style={{fontSize:'0.9rem',color:'#a7f3d0',fontWeight:500}}>{ans}</div>
              </div>}
              {solLines.length>0&&<div style={{borderLeft:'2.5px solid #7c3aed',paddingLeft:'12px'}}>
                <div style={{fontSize:'0.65rem',fontWeight:700,color:'#a78bfa',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:'8px'}}>Solution</div>
                {solLines.map((line,j)=><div key={j} style={{fontSize:'0.85rem',color:'#9090b8',lineHeight:1.85,padding:'1px 0'}}>{line}</div>)}
              </div>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Home(){
  const[authed,setAuthed]=useState(false)
  const[code,setCode]=useState('')
  const[authErr,setAuthErr]=useState('')
  const[authLoading,setAuthLoading]=useState(false)
  const[tab,setTab]=useState('dashboard')
  const[imgB64,setImgB64]=useState(null)
  const[imgSrc,setImgSrc]=useState(null)
  const[solverSubj,setSolverSubj]=useState('auto')
  const[solving,setSolving]=useState(false)
  const[solverResult,setSolverResult]=useState(null)
  const[solverErr,setSolverErr]=useState(null)
  const fileRef=useRef()
  const[mcqSubj,setMcqSubj]=useState('Physics')
  const[mcqDiff,setMcqDiff]=useState('medium')
  const[curQ,setCurQ]=useState(null)
  const[chosen,setChosen]=useState(null)
  const[score,setScore]=useState(0)
  const[total,setTotal]=useState(0)
  const[openNote,setOpenNote]=useState(null)
  const[openChapter,setOpenChapter]=useState(null)

  async function handleAuth(e){
    e.preventDefault();setAuthLoading(true);setAuthErr('')
    try{
      const res=await fetch('/api/auth',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code})})
      const data=await res.json()
      if(data.ok)setAuthed(true)
      else setAuthErr(data.message||'Wrong code')
    }catch{setAuthErr('Network error.')}
    setAuthLoading(false)
  }

  function handleFile(file){
    if(!file)return
    const reader=new FileReader()
    reader.onload=ev=>{setImgSrc(ev.target.result);setImgB64(ev.target.result.split(',')[1]);setSolverResult(null);setSolverErr(null)}
    reader.readAsDataURL(file)
  }

  async function handleSolve(){
    if(!imgB64)return
    setSolving(true);setSolverResult(null);setSolverErr(null)
    try{
      const res=await fetch('/api/solve',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({image:imgB64,subject:solverSubj})})
      const data=await res.json()
      if(data.error)setSolverErr(data.error)
      else setSolverResult(data.result)
    }catch{setSolverErr('Network error.')}
    setSolving(false)
  }

  function genQ(){
    const pool=MCQ_BANK[mcqSubj][mcqDiff]
    setCurQ(pool[Math.floor(Math.random()*pool.length)])
    setChosen(null);setTotal(t=>t+1)
  }
  function pick(i){
    if(chosen!==null)return
    setChosen(i);if(i===curQ.a)setScore(s=>s+1)
  }

  const SUBJECTS=['auto','Physics','Chemistry','Mathematics','Biology']

  const btn=(id,icon,label)=>(
    <button key={id} onClick={()=>setTab(id)} style={{
      flex:1,padding:'10px 4px',border:'none',borderRadius:'10px',cursor:'pointer',
      background:tab===id?'rgba(124,58,237,0.2)':'transparent',
      color:tab===id?'#a78bfa':'#55557a',
      display:'flex',flexDirection:'column',alignItems:'center',gap:'3px',
      transition:'all 0.15s',minWidth:'60px'
    }}>
      <span style={{fontSize:'1.2rem'}}>{icon}</span>
      <span style={{fontSize:'0.65rem',fontWeight:tab===id?600:400}}>{label}</span>
    </button>
  )

  if(!authed) return(
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.2) 0%, #0d0d14 65%)',padding:'1.5rem'}}>
      <div style={{width:'100%',maxWidth:'340px'}}>
        <div style={{width:'52px',height:'52px',background:'rgba(124,58,237,0.15)',border:'1px solid rgba(124,58,237,0.3)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.5rem',marginBottom:'1.25rem'}}>⚡</div>
        <div style={{fontWeight:800,fontSize:'2rem',letterSpacing:'-0.04em',marginBottom:'4px'}}>dhakal<span style={{color:'#7c3aed'}}>.io</span></div>
        <div style={{fontSize:'0.7rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'#55557a',marginBottom:'2.5rem'}}>CEE · IOE Entrance Prep</div>
        <form onSubmit={handleAuth}>
          <input style={{width:'100%',padding:'13px 16px',background:'#15152a',border:'1px solid rgba(124,58,237,0.2)',borderRadius:'10px',color:'#f0f0ff',fontSize:'0.95rem',outline:'none',marginBottom:'10px',display:'block'}}
            type="password" placeholder="Enter access code" value={code} onChange={e=>setCode(e.target.value)} autoComplete="off"/>
          <button style={{width:'100%',padding:'13px',background:'linear-gradient(135deg,#7c3aed,#6d28d9)',color:'#fff',border:'none',borderRadius:'10px',fontSize:'0.95rem',fontWeight:600,cursor:'pointer'}}
            type="submit" disabled={authLoading}>{authLoading?'Checking...':'Continue →'}</button>
          {authErr&&<p style={{fontSize:'0.78rem',color:'#ef4444',marginTop:'8px'}}>{authErr}</p>}
        </form>
        <p style={{marginTop:'2rem',fontSize:'0.7rem',color:'#55557a',textAlign:'center'}}>DM @dhakalbytes on Instagram to get your code</p>
      </div>
    </div>
  )

  return(
    <div style={{minHeight:'100vh',background:'#0d0d14',color:'#f0f0ff',paddingBottom:'80px'}}>

      {/* HEADER */}
      <div style={{background:'#12121e',borderBottom:'1px solid rgba(255,255,255,0.05)',padding:'0 1.25rem',height:'52px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:50}}>
        <div style={{fontWeight:800,fontSize:'1.2rem',letterSpacing:'-0.03em'}}>dhakal<span style={{color:'#7c3aed'}}>.io</span></div>
        <button onClick={()=>setAuthed(false)} style={{padding:'5px 12px',borderRadius:'8px',border:'1px solid rgba(255,255,255,0.08)',background:'transparent',color:'#55557a',fontSize:'0.75rem',cursor:'pointer'}}>Exit</button>
      </div>

      {/* HERO */}
      <div style={{background:'linear-gradient(135deg,#181828 0%,#1a0a35 100%)',padding:'1.5rem 1.25rem',borderBottom:'1px solid rgba(124,58,237,0.15)'}}>
        <div style={{fontSize:'0.65rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'#a78bfa',opacity:0.7,marginBottom:'5px'}}>
          {{dashboard:'Your prep dashboard',solver:'AI-powered exam prep',mcq:'Practice questions',notes:'CEE/IOE syllabus'}[tab]}
        </div>
        <div style={{fontSize:'clamp(1.3rem,4vw,1.7rem)',fontWeight:700,color:'#fff',letterSpacing:'-0.02em'}}>
          {{dashboard:'Welcome back 👋',solver:'AI Question Solver',mcq:'MCQ Practice',notes:'Formula Notes'}[tab]}
        </div>
        <div style={{fontSize:'0.8rem',color:'#9090b8',marginTop:'4px'}}>
          {{dashboard:'Nepal CEE & IOE entrance prep platform',solver:'Upload any screenshot — instant solutions',mcq:'CEE-level questions with explanations',notes:'Complete NEB + CEE + IOE syllabus'}[tab]}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{padding:'1.25rem',maxWidth:'780px',margin:'0 auto'}}>

        {/* DASHBOARD */}
        {tab==='dashboard'&&(
          <div>
            {/* Stats */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'10px',marginBottom:'1.25rem'}}>
              {[['📸','Solver','AI solver'],['✏️','MCQs done',`${total} total`],['📖','Subjects','4 subjects']].map(([icon,title,sub],i)=>(
                <div key={i} style={{background:'#15152a',border:'1px solid rgba(124,58,237,0.15)',borderRadius:'12px',padding:'14px 10px',textAlign:'center'}}>
                  <div style={{fontSize:'1.4rem',marginBottom:'4px'}}>{icon}</div>
                  <div style={{fontSize:'0.75rem',fontWeight:600,color:'#f0f0ff'}}>{title}</div>
                  <div style={{fontSize:'0.65rem',color:'#55557a',marginTop:'2px'}}>{sub}</div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div style={{fontSize:'0.68rem',textTransform:'uppercase',letterSpacing:'0.1em',color:'#55557a',fontWeight:600,marginBottom:'10px'}}>Quick Access</div>
            <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
              {[
                {icon:'📸',title:'AI Question Solver',sub:'Upload exam screenshot → instant step-by-step solutions',tab:'solver',color:'#7c3aed'},
                {icon:'✏️',title:'MCQ Practice',sub:'CEE-level questions with detailed explanations & score tracking',tab:'mcq',color:'#10b981'},
                {icon:'📖',title:'Formula Notes',sub:'Complete NEB + CEE + IOE syllabus — Physics, Chem, Maths, Bio',tab:'notes',color:'#f472b6'},
              ].map((item,i)=>(
                <div key={i} onClick={()=>setTab(item.tab)} style={{background:'#15152a',border:'1px solid rgba(255,255,255,0.06)',borderRadius:'12px',padding:'14px 16px',cursor:'pointer',display:'flex',alignItems:'center',gap:'14px'}}>
                  <div style={{width:'44px',height:'44px',borderRadius:'10px',background:`${item.color}20`,border:`1px solid ${item.color}40`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.3rem',flexShrink:0}}>{item.icon}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:'0.88rem',fontWeight:600,color:'#f0f0ff',marginBottom:'2px'}}>{item.title}</div>
                    <div style={{fontSize:'0.75rem',color:'#55557a',lineHeight:1.4}}>{item.sub}</div>
                  </div>
                  <span style={{color:'#55557a',fontSize:'1rem',flexShrink:0}}>›</span>
                </div>
              ))}
            </div>

            {/* Score if any */}
            {total>0&&(
              <div style={{marginTop:'1.25rem',background:'#15152a',border:'1px solid rgba(124,58,237,0.15)',borderRadius:'12px',padding:'14px 16px'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
                  <span style={{fontSize:'0.78rem',color:'#9090b8'}}>MCQ Score this session</span>
                  <span style={{fontWeight:700,color:'#a78bfa'}}>{score}/{total} ({Math.round(score/total*100)}%)</span>
                </div>
                <div style={{height:'4px',background:'#1c1c32',borderRadius:'2px'}}>
                  <div style={{height:'100%',background:'linear-gradient(90deg,#7c3aed,#a78bfa)',borderRadius:'2px',width:`${Math.round(score/total*100)}%`,transition:'width 0.4s'}}/>
                </div>
              </div>
            )}

            <div style={{marginTop:'1.5rem',textAlign:'center',fontSize:'0.7rem',color:'#55557a'}}>
              © 2026 Shirish S. Dhakal · <span style={{color:'#7c3aed'}}>dhakal.io</span> · All rights reserved
            </div>
          </div>
        )}

        {/* SOLVER */}
        {tab==='solver'&&(
          <div>
            {!imgSrc?(
              <div onClick={()=>fileRef.current.click()} style={{border:'1.5px dashed rgba(124,58,237,0.3)',borderRadius:'14px',padding:'2.5rem 1.5rem',textAlign:'center',cursor:'pointer',background:'rgba(124,58,237,0.06)',marginBottom:'1rem'}}>
                <input ref={fileRef} type="file" accept="image/*" style={{display:'none'}} onChange={e=>handleFile(e.target.files[0])}/>
                <div style={{fontSize:'2rem',marginBottom:'8px'}}>📸</div>
                <div style={{fontSize:'0.9rem',fontWeight:500,color:'#a78bfa',marginBottom:'3px'}}>Drop screenshot or tap to upload</div>
                <div style={{fontSize:'0.75rem',color:'#55557a'}}>Past papers, model sets, textbook photos</div>
              </div>
            ):(
              <div style={{position:'relative',marginBottom:'1rem'}}>
                <img src={imgSrc} alt="Preview" style={{width:'100%',maxHeight:'240px',objectFit:'contain',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.06)',background:'#15152a',display:'block'}}/>
                <button onClick={()=>{setImgSrc(null);setImgB64(null);setSolverResult(null)}} style={{position:'absolute',top:'8px',right:'8px',padding:'4px 10px',borderRadius:'6px',background:'rgba(0,0,0,0.7)',color:'#fff',border:'none',fontSize:'0.72rem',cursor:'pointer'}}>✕ Remove</button>
              </div>
            )}
            <div style={{display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'1rem'}}>
              {SUBJECTS.map(s=>(
                <button key={s} onClick={()=>setSolverSubj(s)} style={{padding:'5px 13px',borderRadius:'20px',border:`1px solid ${solverSubj===s?'#7c3aed':'rgba(124,58,237,0.18)'}`,background:solverSubj===s?'rgba(124,58,237,0.15)':'transparent',color:solverSubj===s?'#a78bfa':'#9090b8',fontSize:'0.78rem',cursor:'pointer',fontWeight:solverSubj===s?600:400}}>
                  {s==='auto'?'Auto-detect':s}
                </button>
              ))}
            </div>
            <button disabled={!imgB64||solving} onClick={handleSolve} style={{width:'100%',padding:'13px',background:imgB64&&!solving?'linear-gradient(135deg,#7c3aed,#6d28d9)':'#1c1c32',color:imgB64&&!solving?'#fff':'#55557a',border:'none',borderRadius:'10px',fontSize:'0.9rem',fontWeight:600,cursor:imgB64&&!solving?'pointer':'not-allowed',letterSpacing:'0.02em'}}>
              {solving?'⏳ Solving...':'Solve Questions'}
            </button>
            {solverErr&&<div style={{marginTop:'1rem',padding:'10px 14px',background:'rgba(239,68,68,0.1)',border:'1px solid #ef4444',borderRadius:'8px',fontSize:'0.82rem',color:'#ef4444'}}>{solverErr}</div>}
            {solverResult&&(
              <div style={{marginTop:'1.25rem',background:'#15152a',border:'1px solid rgba(124,58,237,0.2)',borderRadius:'12px',overflow:'hidden'}}>
                <div style={{background:'linear-gradient(135deg,#7c3aed,#6d28d9)',padding:'9px 16px',fontSize:'0.72rem',letterSpacing:'0.07em',textTransform:'uppercase',color:'rgba(255,255,255,0.8)',fontWeight:500}}>✦ Solutions — dhakal.io</div>
                <div style={{padding:'1.25rem 1rem'}}><SolutionCards text={solverResult}/></div>
              </div>
            )}
          </div>
        )}

        {/* MCQ */}
        {tab==='mcq'&&(
          <div>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'1.25rem'}}>
              <select value={mcqSubj} onChange={e=>setMcqSubj(e.target.value)} style={{flex:1,minWidth:'120px',padding:'9px 12px',border:'1px solid rgba(124,58,237,0.2)',borderRadius:'8px',background:'#15152a',color:'#f0f0ff',fontSize:'0.82rem',outline:'none'}}>
                {Object.keys(MCQ_BANK).map(s=><option key={s}>{s}</option>)}
              </select>
              <select value={mcqDiff} onChange={e=>setMcqDiff(e.target.value)} style={{flex:1,minWidth:'120px',padding:'9px 12px',border:'1px solid rgba(124,58,237,0.2)',borderRadius:'8px',background:'#15152a',color:'#f0f0ff',fontSize:'0.82rem',outline:'none'}}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard — CEE level</option>
              </select>
              <button onClick={genQ} style={{padding:'9px 18px',background:'linear-gradient(135deg,#7c3aed,#6d28d9)',color:'#fff',border:'none',borderRadius:'8px',fontSize:'0.82rem',fontWeight:600,cursor:'pointer',whiteSpace:'nowrap'}}>Generate →</button>
            </div>

            {total>0&&(
              <div style={{background:'#15152a',border:'1px solid rgba(255,255,255,0.06)',borderRadius:'10px',padding:'12px 16px',marginBottom:'1.25rem'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
                  <span style={{fontSize:'0.75rem',color:'#9090b8'}}>Score</span>
                  <span style={{fontWeight:700,color:'#a78bfa',fontSize:'1rem'}}>{score} / {total}</span>
                </div>
                <div style={{height:'4px',background:'#1c1c32',borderRadius:'2px'}}>
                  <div style={{height:'100%',background:'linear-gradient(90deg,#7c3aed,#a78bfa)',borderRadius:'2px',width:`${Math.round((score/total)*100)}%`,transition:'width 0.4s'}}/>
                </div>
              </div>
            )}

            {!curQ&&<p style={{fontSize:'0.84rem',color:'#55557a'}}>Pick subject + difficulty and hit Generate to start.</p>}
            {curQ&&(
              <div style={{background:'#15152a',border:'1px solid rgba(124,58,237,0.2)',borderRadius:'14px',padding:'1.5rem'}}>
                <div style={{display:'flex',gap:'6px',marginBottom:'1rem'}}>
                  <span style={{fontSize:'0.68rem',padding:'2px 10px',borderRadius:'20px',background:'rgba(124,58,237,0.15)',color:'#a78bfa',fontWeight:500}}>{mcqSubj}</span>
                  <span style={{fontSize:'0.68rem',padding:'2px 10px',borderRadius:'20px',background:'rgba(239,68,68,0.1)',color:'#ef4444',fontWeight:500}}>{mcqDiff}</span>
                </div>
                <div style={{fontSize:'1rem',fontWeight:500,color:'#f0f0ff',lineHeight:1.5,marginBottom:'1.25rem'}}>{curQ.q}</div>
                <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                  {curQ.o.map((o,i)=>(
                    <button key={i} onClick={()=>pick(i)} disabled={chosen!==null}
                      style={{padding:'11px 14px',border:`1px solid ${chosen!==null?(i===curQ.a?'rgba(16,185,129,0.5)':i===chosen?'rgba(239,68,68,0.5)':'rgba(255,255,255,0.06)'):'rgba(124,58,237,0.18)'}`,borderRadius:'9px',fontSize:'0.85rem',color:chosen!==null?(i===curQ.a?'#a7f3d0':i===chosen?'#fca5a5':'#9090b8'):'#f0f0ff',cursor:chosen===null?'pointer':'default',background:chosen!==null?(i===curQ.a?'rgba(16,185,129,0.1)':i===chosen?'rgba(239,68,68,0.1)':'transparent'):'transparent',textAlign:'left',width:'100%',transition:'all 0.15s'}}>
                      {'ABCD'[i]}) {o}
                    </button>
                  ))}
                </div>
                {chosen!==null&&(
                  <>
                    <div style={{marginTop:'1rem',padding:'10px 14px',background:'#181828',borderLeft:'2.5px solid #7c3aed',borderRadius:'0 8px 8px 0',fontSize:'0.82rem',color:'#9090b8',lineHeight:1.75}}>{curQ.e}</div>
                    <button onClick={genQ} style={{marginTop:'12px',padding:'8px 18px',border:'1px solid rgba(124,58,237,0.3)',borderRadius:'8px',background:'transparent',fontSize:'0.82rem',color:'#a78bfa',cursor:'pointer'}}>Next question →</button>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* NOTES */}
        {tab==='notes'&&(
          <div>
            {!openNote?(
              <>
                <div style={{fontSize:'0.68rem',textTransform:'uppercase',letterSpacing:'0.1em',color:'#55557a',fontWeight:600,marginBottom:'10px'}}>Select Subject</div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'10px'}}>
                  {Object.entries(NOTES).map(([name,n])=>(
                    <div key={name} onClick={()=>{setOpenNote(name);setOpenChapter(null)}} style={{background:'#15152a',border:'1px solid rgba(255,255,255,0.06)',borderRadius:'14px',padding:'1.25rem',cursor:'pointer',position:'relative',overflow:'hidden'}}>
                      <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:`linear-gradient(90deg,${n.color},transparent)`}}/>
                      <div style={{fontSize:'1.5rem',marginBottom:'8px'}}>{n.icon}</div>
                      <div style={{fontWeight:600,fontSize:'0.95rem',marginBottom:'3px'}}>{name}</div>
                      <div style={{fontSize:'0.68rem',color:'#55557a'}}>{n.chapters.length} chapters</div>
                      <div style={{marginTop:'6px',display:'inline-block',fontSize:'0.62rem',padding:'2px 8px',borderRadius:'10px',background:`${n.color}20`,color:n.color}}>{n.tag}</div>
                    </div>
                  ))}
                </div>
              </>
            ):!openChapter?(
              <>
                <button onClick={()=>setOpenNote(null)} style={{display:'inline-flex',alignItems:'center',gap:'5px',fontSize:'0.8rem',color:'#a78bfa',cursor:'pointer',background:'none',border:'none',marginBottom:'1rem'}}>← All Subjects</button>
                <div style={{fontWeight:700,fontSize:'1.2rem',marginBottom:'4px'}}>{NOTES[openNote].icon} {openNote}</div>
                <div style={{fontSize:'0.72rem',color:'#55557a',marginBottom:'1.25rem'}}>{NOTES[openNote].chapters.length} chapters · {NOTES[openNote].tag}</div>
                <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                  {NOTES[openNote].chapters.map((ch,i)=>(
                    <div key={i} onClick={()=>setOpenChapter(i)} style={{background:'#15152a',border:'1px solid rgba(255,255,255,0.06)',borderRadius:'12px',padding:'13px 16px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <div>
                        <div style={{fontSize:'0.88rem',fontWeight:500}}>{ch.name}</div>
                        <div style={{fontSize:'0.72rem',color:'#55557a',marginTop:'2px'}}>{ch.formulas.length} formulas</div>
                      </div>
                      <span style={{color:'#55557a'}}>›</span>
                    </div>
                  ))}
                </div>
              </>
            ):(
              <>
                <button onClick={()=>setOpenChapter(null)} style={{display:'inline-flex',alignItems:'center',gap:'5px',fontSize:'0.8rem',color:'#a78bfa',cursor:'pointer',background:'none',border:'none',marginBottom:'1rem'}}>← {openNote}</button>
                <div style={{fontWeight:700,fontSize:'1.1rem',marginBottom:'1.25rem'}}>{NOTES[openNote].chapters[openChapter].name}</div>
                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                  {NOTES[openNote].chapters[openChapter].formulas.map((f,i)=>(
                    <div key={i} style={{background:'#15152a',border:'1px solid rgba(255,255,255,0.05)',borderRadius:'10px',padding:'12px 14px'}}>
                      <div style={{fontSize:'0.72rem',color:'#55557a',marginBottom:'5px',textTransform:'uppercase',letterSpacing:'0.06em',fontWeight:500}}>{f.l}</div>
                      <div style={{fontFamily:'monospace',fontSize:'0.85rem',background:'#181828',border:'1px solid rgba(124,58,237,0.15)',borderRadius:'7px',padding:'8px 12px',color:'#a78bfa',lineHeight:1.6}}>{f.f}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#12121e',borderTop:'1px solid rgba(255,255,255,0.06)',display:'flex',padding:'6px 8px',zIndex:50,justifyContent:'space-around'}}>
        {[['dashboard','⚡','Home'],['solver','📸','Solver'],['mcq','✏️','MCQ'],['notes','📖','Notes']].map(([id,icon,label])=>
          btn(id,icon,label)
        )}
      </div>
    </div>
  )
}
