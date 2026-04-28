'use client'
import { useEffect, useRef, useState } from 'react'

// ─── hooks ──────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, vis }
}

function useCountUp(to: number, decimals = 0, duration = 1800, run = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!run) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(parseFloat((ease * to).toFixed(decimals)))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [run, to, decimals, duration])
  return val
}

// ─── components ─────────────────────────────────────────────────────────────

function Fade({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, vis } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function Counter({
  to,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}: {
  to: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}) {
  const { ref, vis } = useInView()
  const val = useCountUp(to, decimals, 1800, vis)
  const formatted = val.toLocaleString('es-MX', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

// Live loss ticker
// Baseline: empresa de $30M USD/año pierde ~$2M/año por ineficiencia decisional
// (≈ 6.5% de ingresos — percentil conservador según Bain Decision Insights 2022)
// $2,000,000 / 365 / 24 / 3600 / 1000 ms ≈ 0.0000634 USD/ms
function LossTicker() {
  const [usd, setUsd] = useState(0)
  const ratePerMs = 2_000_000 / (365 * 24 * 3600 * 1000)
  const startRef = useRef(Date.now())
  useEffect(() => {
    const id = setInterval(() => {
      setUsd((Date.now() - startRef.current) * ratePerMs)
    }, 60)
    return () => clearInterval(id)
  }, [ratePerMs])
  const formatted = usd.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return (
    <div className="font-mono text-red-400 text-5xl md:text-7xl font-black tabular-nums leading-none select-none">
      ${formatted}
    </div>
  )
}

function Bar({
  label,
  pct,
  delay = 0,
  color,
}: {
  label: string
  pct: number
  delay?: number
  color: string
}) {
  const { ref, vis } = useInView()
  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm text-gray-400 font-medium">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          style={{
            width: vis ? `${pct}%` : '0%',
            backgroundColor: color,
            height: '100%',
            borderRadius: '9999px',
            transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  )
}

// ─── page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{`
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes pulseDot {
          0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.5); }
          50%      { box-shadow: 0 0 0 10px rgba(239,68,68,0); }
        }
        @keyframes greenPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(52,211,153,0.5); }
          50%      { box-shadow: 0 0 0 8px rgba(52,211,153,0); }
        }
        .h1 { animation: heroIn 0.9s ease 0.10s both; }
        .h2 { animation: heroIn 0.9s ease 0.25s both; }
        .h3 { animation: heroIn 0.9s ease 0.40s both; }
        .h4 { animation: heroIn 0.9s ease 0.55s both; }
        .h5 { animation: heroIn 0.9s ease 0.70s both; }
        .line-grow { animation: lineGrow 1.1s cubic-bezier(0.4,0,0.2,1) 0.5s both; transform-origin: left; }
        .dot-red  { animation: pulseDot   2s infinite; }
        .dot-green{ animation: greenPulse 2s infinite; }
        .lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .lift:hover { transform: translateY(-3px); box-shadow: 0 16px 48px rgba(0,0,0,0.10); }
        .lift-dark:hover { transform: translateY(-3px); box-shadow: 0 16px 48px rgba(0,0,0,0.4); }
      `}</style>

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-[#0C0D0F]/95 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <span className="text-white font-black text-lg tracking-tight">Estructura Estratégica</span>

          <div className="hidden md:flex items-center gap-8 text-sm text-white/50 font-medium">
            {[
              ['#problema', 'El problema'],
              ['#metodologia', 'Metodología'],
              ['#para-quien', 'Para quién'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="hover:text-white transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>

          <a
            href="#contacto"
            className="hidden md:inline-flex items-center gap-2 bg-white text-[#0C0D0F] text-sm font-bold px-5 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            Agendar diagnóstico
          </a>

          <button
            className="md:hidden text-white p-2 space-y-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span className="block w-5 h-0.5 bg-current" />
            <span className="block w-5 h-0.5 bg-current" />
            <span className="block w-5 h-0.5 bg-current" />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#0C0D0F] border-t border-white/10 px-6 py-5 space-y-4">
            {[
              ['#problema', 'El problema'],
              ['#metodologia', 'Metodología'],
              ['#para-quien', 'Para quién'],
              ['#contacto', 'Agendar diagnóstico'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block text-white/70 hover:text-white font-medium transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen bg-[#0C0D0F] flex flex-col justify-center overflow-hidden">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#ffffff 1px,transparent 1px),linear-gradient(90deg,#ffffff 1px,transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        {/* Glow orb */}
        <div
          className="absolute -top-40 right-0 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 70% 30%, rgba(59,130,246,0.08) 0%, transparent 60%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-28">
          <div className="max-w-5xl">
            <div className="h1 inline-flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/40 font-bold uppercase tracking-widest mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dot-green inline-block" />
              Arquitectura de decisiones organizacionales
            </div>

            <h1 className="h2 text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[1.02] tracking-tight mb-6">
              Tu estrategia
              <br />
              <span className="text-white/25">no falla.</span>
              <br />
              Falla el sistema
              <br />
              que decide.
            </h1>

            <div className="h3 h-px bg-white line-grow w-24 mb-7 opacity-20" />

            <p className="h4 text-lg md:text-xl text-white/45 max-w-xl leading-relaxed mb-10">
              Diagnosticamos y rediseñamos la arquitectura de decisión de organizaciones en
              crecimiento. Porque las pérdidas más grandes no vienen del mercado — vienen de
              decisiones que nadie supo tomar a tiempo.
            </p>

            <div className="h5 flex flex-col sm:flex-row gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0C0D0F] font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors text-sm"
              >
                Solicitar diagnóstico gratuito
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#problema"
                className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/50 font-medium px-8 py-4 rounded-full hover:border-white/30 hover:text-white/80 transition-colors text-sm"
              >
                Ver el costo del problema
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
          <span className="text-white text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-white/50" />
        </div>
      </section>

      {/* ── PROBLEMA: LAS CIFRAS ───────────────────────────────────────────── */}
      <section id="problema" className="bg-white py-28 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">
            {/* Left */}
            <div>
              <Fade>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.18em]">
                  El diagnóstico
                </span>
              </Fade>
              <Fade delay={80}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0C0D0F] leading-tight mt-4 mb-6">
                  Las decisiones
                  <br />
                  postergadas
                  <br />
                  tienen precio.
                </h2>
              </Fade>
              <Fade delay={160}>
                <p className="text-lg text-gray-500 leading-relaxed mb-6">
                  En una empresa de $20–50 M USD en ingresos, la ineficiencia en la toma de
                  decisiones no es un problema de actitud. Es un problema de arquitectura. Y
                  tiene un costo calculable.
                </p>
              </Fade>
              <Fade delay={240}>
                <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-gray-200 pl-4 italic">
                  Bain &amp; Company estima que una empresa con 500 empleados ejecuta en
                  promedio 2,300 decisiones de negocio relevantes al año. El 40% de esas
                  decisiones se revierten, paralizan o replantean antes de generar resultado.
                  <br />
                  <span className="not-italic text-gray-300 text-xs mt-1 block">
                    Fuente: Bain Decision Insights Survey, 2022
                  </span>
                </p>
              </Fade>
            </div>

            {/* Right — stat cards */}
            <div className="space-y-5">
              {[
                {
                  num: 40,
                  suffix: '%',
                  label: 'de las decisiones estratégicas se revierten antes de completarse',
                  sub: 'Cada reversión consume entre 3 y 8 semanas de trabajo ejecutivo perdido. No en el mercado — adentro.',
                },
                {
                  num: 70,
                  suffix: '%',
                  label: 'del tiempo directivo se consume en reuniones de alineación y escaladas',
                  sub: 'No en estrategia ni en ejecución. En consensuar lo que ya debería estar decidido. (Fuente: McKinsey & Company, 2023)',
                },
                {
                  num: 3,
                  suffix: '×',
                  label: 'más tiempo tarda una decisión sin claridad de autoridad',
                  sub: 'El costo no es solo tiempo: es velocidad de respuesta al mercado y ventana de oportunidad cerrada.',
                },
              ].map(({ num, suffix, label, sub }, i) => (
                <Fade key={i} delay={i * 100}>
                  <div className="border border-gray-100 rounded-2xl p-6 lift cursor-default">
                    <div className="flex items-start gap-5">
                      <div className="text-[2.6rem] font-black text-[#0C0D0F] leading-none min-w-[88px] tabular-nums">
                        <Counter to={num} suffix={suffix} />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0C0D0F] leading-snug mb-1.5 text-sm md:text-base">
                          {label}
                        </p>
                        <p className="text-xs text-gray-400 leading-relaxed">{sub}</p>
                      </div>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── IMPACTO FINANCIERO REAL (DARK) ─────────────────────────────────── */}
      <section className="bg-[#0C0D0F] py-28 lg:py-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Heading */}
          <div className="text-center mb-20">
            <Fade>
              <span className="text-[11px] font-bold text-gray-600 uppercase tracking-[0.18em]">
                Impacto financiero
              </span>
            </Fade>
            <Fade delay={80}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mt-4 mb-5">
                Cuánto está perdiendo
                <br />
                tu organización ahora mismo
              </h2>
            </Fade>
            <Fade delay={160}>
              <p className="text-white/35 max-w-2xl mx-auto text-base leading-relaxed">
                Estimado conservador para una empresa con $30 M USD en ingresos anuales, usando
                la metodología de costo de ineficiencia decisional de Bain &amp; Company
                (percentil 25 — el escenario más optimista).
              </p>
            </Fade>
          </div>

          {/* Live ticker */}
          <Fade delay={200}>
            <div className="relative border border-red-500/20 bg-red-950/10 rounded-3xl p-8 md:p-12 mb-14">
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 100%, rgba(239,68,68,0.06) 0%, transparent 70%)',
                }}
              />
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-2 h-2 rounded-full bg-red-500 dot-red inline-block flex-shrink-0" />
                  <span className="text-[11px] text-red-400 font-bold uppercase tracking-[0.16em]">
                    Pérdida estimada acumulada desde que abriste esta página
                  </span>
                </div>
                <LossTicker />
                <div className="flex flex-wrap gap-x-6 gap-y-1 mt-5">
                  {[
                    ['~$2 M', 'al año'],
                    ['~$5,479', 'al día'],
                    ['~$228', 'por hora'],
                    ['~$3.80', 'por minuto'],
                  ].map(([val, unit]) => (
                    <span key={unit} className="text-white/20 font-mono text-xs">
                      {val}
                      <span className="text-white/15 ml-1">{unit}</span>
                    </span>
                  ))}
                </div>
                <p className="text-white/15 text-xs mt-3">
                  * Basado en percentil conservador P25 de Bain Decision Inefficiency Index.
                  Empresas en P75 pierden hasta $6.2 M/año.
                </p>
              </div>
            </div>
          </Fade>

          {/* Two columns */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Bars */}
            <div>
              <Fade>
                <h3 className="text-lg font-bold text-white mb-2">¿A dónde va el dinero perdido?</h3>
                <p className="text-white/35 text-sm mb-8 leading-relaxed">
                  Desglose del costo de ineficiencia decisional sobre nómina directiva, capital
                  inmovilizado en proyectos sin dueño y oportunidades no capturadas por lentitud.
                </p>
              </Fade>
              <div className="space-y-6">
                <Bar label="Retrabajo por decisiones revertidas" pct={38} delay={0}   color="#ef4444" />
                <Bar label="Reuniones de escalación y alineación" pct={27} delay={150} color="#f97316" />
                <Bar label="Iniciativas paralizadas sin dueño"    pct={21} delay={300} color="#eab308" />
                <Bar label="Oportunidades no capturadas"          pct={14} delay={450} color="#6366f1" />
              </div>
              <p className="text-white/15 text-xs mt-6">
                Distribución basada en Bain &amp; Company "The Decision Audit" (2021) y McKinsey
                "Untangling your organization's decision making" (2019).
              </p>
            </div>

            {/* Cost cards */}
            <div className="space-y-4">
              {[
                {
                  icon: '↩',
                  title: 'Decisión estratégica revertida (promedio)',
                  cost: '$47,000 USD',
                  desc: 'Una decisión revertida a los 60 días cuesta el equivalente a 3 meses de trabajo de un equipo de 5 personas: horas directivas, comunicaciones, retrabajo de ejecución y costo de oportunidad.',
                  color: '#ef4444',
                },
                {
                  icon: '⏱',
                  title: 'Decisión demorada 30 días adicionales',
                  cost: '$12,000 USD',
                  desc: 'Considerando solo el tiempo directivo en seguimiento y escaladas, más el costo de oportunidad de no actuar. Sin contar pérdida de ventaja competitiva ni moral del equipo.',
                  color: '#f97316',
                },
                {
                  icon: '🔺',
                  title: 'Costo anual de escaladas evitables',
                  cost: '$380,000 USD',
                  desc: 'Una empresa con 50 decisiones escaladas al mes, a un costo de 2 semanas de tiempo de dirección por escalada (3 personas × $8,000/mes), pierde esto cada año solo en coordinación.',
                  color: '#6366f1',
                },
              ].map(({ icon, title, cost, desc, color }, i) => (
                <Fade key={i} delay={i * 100}>
                  <div className="border border-white/8 rounded-2xl p-6 lift-dark cursor-default transition-all hover:border-white/15">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <span className="text-lg mb-1 block">{icon}</span>
                        <p className="text-white/50 text-sm font-semibold">{title}</p>
                      </div>
                      <span
                        className="text-xl font-black tabular-nums whitespace-nowrap"
                        style={{ color }}
                      >
                        {cost}
                      </span>
                    </div>
                    <p className="text-white/25 text-xs leading-relaxed">{desc}</p>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRES PATRONES ──────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-28 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <Fade>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.18em]">
                Lo que encontramos
              </span>
            </Fade>
            <Fade delay={80}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0C0D0F] leading-tight mt-4 mb-6">
                Tres patrones que
                <br />
                destruyen valor
                <br />
                en silencio.
              </h2>
            </Fade>
            <Fade delay={160}>
              <p className="text-lg text-gray-500 leading-relaxed">
                No son fallas de talento. Son fallas de sistema. Y se repiten en prácticamente
                todas las organizaciones que crecieron rápido sin rediseñar cómo deciden.
              </p>
            </Fade>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'Nadie sabe quién decide',
                body:
                  'Las decisiones se delegan sin criterio ni autoridad real. El resultado: todos opinan, nadie actúa. Los proyectos se mueven en círculos hasta que alguien impone una dirección — no porque sea la correcta, sino porque tiene más rango.',
                signal: 'Señal: reuniones que terminan con "lo vemos la próxima semana".',
              },
              {
                num: '02',
                title: 'La información no llega a quien decide',
                body:
                  'Los datos existen, pero están fragmentados entre áreas. Quien decide no tiene el contexto completo, y quien tiene el contexto no tiene autoridad. El gap entre dato y acción cuesta semanas y produce decisiones con información de hace tres meses.',
                signal: 'Señal: decisiones estratégicas basadas en reportes del trimestre anterior.',
              },
              {
                num: '03',
                title: 'El riesgo de decidir es mayor que el de no decidir',
                body:
                  'En culturas donde las malas decisiones se castigan pero la parálisis se tolera, el comportamiento racional es no decidir. El incentivo perverso está integrado en la organización. Los mejores líderes esperan aprobación para moverse.',
                signal: 'Señal: los mejores talentos dicen "necesito más alineación arriba" antes de actuar.',
              },
            ].map(({ num, title, body, signal }, i) => (
              <Fade key={i} delay={i * 100}>
                <div className="bg-white border border-gray-100 rounded-3xl p-8 h-full flex flex-col lift">
                  <span className="text-[11px] font-black text-gray-300 tracking-widest">{num}</span>
                  <h3 className="text-xl font-black text-[#0C0D0F] mt-3 mb-4 leading-snug">
                    {title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{body}</p>
                  <div className="border-t border-gray-100 pt-4 mt-6">
                    <p className="text-xs text-gray-400 italic">{signal}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── METODOLOGÍA ────────────────────────────────────────────────────── */}
      <section id="metodologia" className="bg-white py-28 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">
            {/* Left */}
            <div className="lg:sticky lg:top-28">
              <Fade>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.18em]">
                  Cómo trabajamos
                </span>
              </Fade>
              <Fade delay={80}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0C0D0F] leading-tight mt-4 mb-6">
                  Tres fases.
                  <br />
                  Un sistema
                  <br />
                  que funciona.
                </h2>
              </Fade>
              <Fade delay={160}>
                <p className="text-lg text-gray-500 leading-relaxed mb-6">
                  No llegamos con un framework genérico. Llegamos a entender cómo fluye la
                  autoridad real en tu organización — no el organigrama, sino quién realmente
                  decide y cómo.
                </p>
              </Fade>
              <Fade delay={240}>
                <p className="text-sm text-gray-400 leading-relaxed">
                  El proceso completo toma entre 9 y 13 semanas. Al final, tu organización tiene
                  un sistema operativo de decisiones — no un PowerPoint sobre liderazgo.
                </p>
              </Fade>
            </div>

            {/* Right — timeline */}
            <div className="space-y-0 pt-2">
              {[
                {
                  phase: 'Fase 1',
                  weeks: '2–3 semanas',
                  title: 'Diagnóstico de arquitectura decisional',
                  body: 'Mapeo de los 20–30 tipos de decisión más críticos de la organización. Identificación de cuellos de botella, zonas de ambigüedad y patrones de escalación. Entrevistas con el equipo directivo y líderes clave.',
                  deliverable: 'Radiografía decisional completa.',
                },
                {
                  phase: 'Fase 2',
                  weeks: '3–4 semanas',
                  title: 'Rediseño del sistema',
                  body: 'Co-diseño con el equipo directivo de la nueva arquitectura: marcos de autoridad, criterios de decisión por nivel, procesos de escalación legítima y mecanismos de accountability.',
                  deliverable: 'Matriz RACI ejecutiva + criterios de decisión operativos.',
                },
                {
                  phase: 'Fase 3',
                  weeks: '4–6 semanas',
                  title: 'Implementación y calibración',
                  body: 'Acompañamiento en la instalación del nuevo sistema. Facilitación de los primeros ciclos de decisión bajo la nueva arquitectura. Ajuste fino basado en fricción real del equipo en operación.',
                  deliverable: 'Sistema en operación + playbook para líderes.',
                },
              ].map(({ phase, weeks, title, body, deliverable }, i, arr) => (
                <Fade key={i} delay={i * 100}>
                  <div
                    className={`relative pl-9 pb-10 ${
                      i < arr.length - 1
                        ? 'before:absolute before:left-[10px] before:top-5 before:bottom-0 before:w-px before:bg-gray-100'
                        : ''
                    }`}
                  >
                    <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-[#0C0D0F] border-[3px] border-white ring-1 ring-gray-200" />
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[11px] font-black text-gray-300 uppercase tracking-widest">
                        {phase}
                      </span>
                      <span className="text-gray-200 text-xs">·</span>
                      <span className="text-xs text-gray-400">{weeks}</span>
                    </div>
                    <h3 className="text-lg font-black text-[#0C0D0F] mb-2">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-3">{body}</p>
                    <div className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-full px-3 py-1">
                      <svg
                        width="12"
                        height="12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        className="text-emerald-500"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-gray-500 font-medium">{deliverable}</span>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ENTREGABLES ────────────────────────────────────────────────────── */}
      <section className="bg-[#0C0D0F] py-28 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <Fade>
              <span className="text-[11px] font-bold text-gray-600 uppercase tracking-[0.18em]">
                Lo que recibes
              </span>
            </Fade>
            <Fade delay={80}>
              <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-4">
                Entregables concretos
              </h2>
            </Fade>
            <Fade delay={160}>
              <p className="text-white/35 max-w-xl mx-auto text-base">
                No consultorías de presentaciones. Sistemas operativos que tu equipo puede usar
                el día siguiente de la implementación.
              </p>
            </Fade>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: '◎',
                title: 'Mapa de arquitectura decisional',
                desc: 'Visualización completa de los flujos de decisión reales vs. los que deberían existir en tu organización.',
              },
              {
                icon: '◈',
                title: 'Matriz RACI ejecutiva',
                desc: 'Claridad de quién decide, quién recomienda, quién ejecuta y quién informa en cada dominio estratégico.',
              },
              {
                icon: '◐',
                title: 'Criterios de decisión por nivel',
                desc: 'Guías operativas específicas para cada nivel de liderazgo: qué pueden decidir solos y qué requiere alineación.',
              },
              {
                icon: '◷',
                title: 'Protocolo de escalación',
                desc: 'Proceso claro para escalar decisiones legítimamente — sin crear dependencia ni parálisis organizacional.',
              },
              {
                icon: '◉',
                title: 'Panel de accountability decisional',
                desc: 'Sistema de seguimiento para asegurar que las decisiones tomadas se ejecuten, midan y generen aprendizaje.',
              },
              {
                icon: '◌',
                title: 'Playbook de implementación',
                desc: 'Manual de instalación del nuevo sistema para líderes y equipos, con casos de uso reales de tu organización.',
              },
            ].map(({ icon, title, desc }, i) => (
              <Fade key={i} delay={i * 70}>
                <div className="border border-white/8 rounded-2xl p-6 group hover:border-white/18 transition-colors cursor-default">
                  <span className="text-2xl text-white/15 group-hover:text-white/30 transition-colors block mb-4">
                    {icon}
                  </span>
                  <h3 className="text-white font-bold mb-2 text-sm">{title}</h3>
                  <p className="text-white/30 text-sm leading-relaxed">{desc}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARA QUIÉN ─────────────────────────────────────────────────────── */}
      <section id="para-quien" className="bg-gray-50 py-28 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-14">
            <Fade>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.18em]">
                Para quién es esto
              </span>
            </Fade>
            <Fade delay={80}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0C0D0F] mt-4 mb-6 leading-tight">
                Organizaciones que
                <br />
                crecieron más rápido
                <br />
                de lo que diseñaron
                <br />
                sus sistemas.
              </h2>
            </Fade>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {[
              'Empresas de $15 M–$200 M USD en ingresos que pasaron de startup a operación mediana sin rediseñar cómo toman decisiones.',
              'Organizaciones post-fusión o post-adquisición donde dos culturas de decisión conviven sin un sistema unificado.',
              'Negocios familiares en transición generacional donde la autoridad formal y la autoridad real están desalineadas.',
              'Empresas en mercados de alta velocidad donde la lentitud decisional ya está costando participación de mercado.',
            ].map((text, i) => (
              <Fade key={i} delay={i * 80}>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 flex gap-4 lift">
                  <span className="text-emerald-500 mt-0.5 flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-gray-600 leading-relaxed text-sm">{text}</p>
                </div>
              </Fade>
            ))}
          </div>

          <Fade delay={200}>
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex gap-4">
              <span className="text-amber-400 flex-shrink-0 mt-0.5">
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </span>
              <p className="text-amber-700 text-sm leading-relaxed">
                <strong>Esto no es para ti</strong> si buscas un taller de liderazgo o una
                certificación en metodologías ágiles. Trabajamos con organizaciones que tienen un
                problema real de velocidad decisional y están dispuestas a cambiar la estructura —
                no solo el discurso.
              </p>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── CTA FINAL ──────────────────────────────────────────────────────── */}
      <section id="contacto" className="bg-[#0C0D0F] py-28 lg:py-40">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <Fade>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
              El costo de no actuar
              <br />
              <span className="text-white/25">ya está corriendo.</span>
            </h2>
          </Fade>
          <Fade delay={100}>
            <p className="text-xl text-white/35 leading-relaxed mb-12 max-w-2xl mx-auto">
              Una sesión de diagnóstico de 60 minutos es suficiente para identificar si tienes
              un problema de arquitectura decisional y qué tan costoso te está saliendo ignorarlo.
            </p>
          </Fade>
          <Fade delay={200}>
            <a
              href="mailto:hola@estructuraestrategica.com"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0C0D0F] font-bold px-10 py-5 rounded-full hover:bg-gray-100 transition-colors text-base"
            >
              Solicitar diagnóstico gratuito
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <p className="text-white/20 text-xs mt-5">
              Sin compromiso · 60 minutos · Solo para organizaciones calificadas
            </p>
          </Fade>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-[#080809] border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white/20 font-black text-sm">Estructura Estratégica</span>
          <p className="text-white/15 text-xs text-center">
            © {new Date().getFullYear()} Estructura Estratégica · Arquitectura de decisiones organizacionales
          </p>
          <a
            href="mailto:hola@estructuraestrategica.com"
            className="text-white/20 text-xs hover:text-white/40 transition-colors"
          >
            hola@estructuraestrategica.com
          </a>
        </div>
      </footer>
    </>
  )
}
