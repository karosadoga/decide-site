// Reemplaza href="#" en los botones CTA con tu URL de Calendly o agenda

export default function Home() {
  return (
    <>
      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-gray-900">Decide</span>
          <a
            href="#agendar"
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Agendar diagnóstico
          </a>
        </div>
      </header>

      <main>
        {/* ── HERO ───────────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen bg-[#0C0D0F] flex items-center overflow-hidden pt-16">
          {/* Abstract wave SVG — fondo derecho */}
          <div className="absolute inset-0 pointer-events-none select-none">
            <svg
              className="absolute right-0 top-0 h-full w-1/2 opacity-[0.12]"
              viewBox="0 0 600 800"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M150,60 C280,-20 480,160 620,60 L620,800 L150,800 Z" fill="white" opacity="0.06" />
              <path d="M-20,220 C180,80 380,380 620,220 L620,800 L-20,800 Z" fill="white" opacity="0.05" />
              <path d="M60,420 C220,240 480,520 620,380 L620,800 L60,800 Z" fill="white" opacity="0.04" />
              <path
                d="M20,180 C160,120 320,280 520,180 C680,80 700,320 820,220"
                stroke="white" strokeWidth="0.6" fill="none" opacity="0.35"
              />
              <path
                d="M-40,340 C180,220 400,440 620,320 C780,200 820,440 940,320"
                stroke="white" strokeWidth="0.6" fill="none" opacity="0.22"
              />
              <path
                d="M40,520 C200,380 440,600 640,460"
                stroke="white" strokeWidth="0.5" fill="none" opacity="0.15"
              />
              <rect x="390" y="120" width="0.6" height="280" fill="white" opacity="0.28" />
              <rect x="430" y="180" width="0.6" height="180" fill="white" opacity="0.18" />
            </svg>
          </div>

          <div className="relative max-w-6xl mx-auto px-6 py-28 lg:py-36">
            <div className="max-w-3xl">
              <h1 className="text-6xl lg:text-8xl font-black text-white tracking-tight leading-[0.95] mb-7">
                La estrategia<br />no falla.
              </h1>
              <p className="text-2xl lg:text-3xl font-semibold text-gray-200 mb-6 leading-snug">
                Falla el sistema que toma decisiones.
              </p>
              <p className="text-lg text-gray-400 max-w-xl mb-10 leading-relaxed">
                El problema no está en las personas ni en la ejecución. Está en la
                arquitectura invisible que determina quién decide qué, cuándo y con
                qué autoridad.
              </p>
              <a
                href="#agendar"
                className="inline-flex items-center gap-2 bg-white text-gray-900 text-base font-semibold px-7 py-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Agenda tu sesión de diagnóstico
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <p className="mt-4 text-sm text-gray-500">
                Primera sesión sin compromiso · Sin propuesta de venta
              </p>
            </div>
          </div>
        </section>

        {/* ── DOLOR / RECONOCIMIENTO ─────────────────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-2xl mb-14">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                El problema no está donde la empresa cree.
              </h2>
              <p className="text-lg text-gray-500">
                La mayoría de las organizaciones intervienen síntomas. Nosotros
                intervenimos la raíz.
              </p>
            </div>

            <div className="divide-y divide-gray-100">
              {[
                'Las decisiones importantes tardan semanas en cerrarse',
                'Las reuniones terminan sin resoluciones claras',
                'El mismo problema reaparece una y otra vez',
                'El liderazgo absorbe decisiones que no le corresponden',
                'Nadie sabe con certeza quién decide qué',
              ].map((item) => (
                <div key={item} className="flex items-center gap-5 py-5">
                  <svg
                    className="w-4 h-4 text-gray-400 flex-shrink-0"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-lg text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-14 border-l-4 border-gray-900 pl-6">
              <p className="text-2xl font-semibold text-gray-900">
                Estos no son problemas de personas.
                <br />Son problemas de estructura.
              </p>
              <p className="mt-2 text-lg text-gray-500">Y la estructura puede medirse.</p>
            </div>
          </div>
        </section>

        {/* ── TRES PATRONES ─────────────────────────────────────────────────── */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-2xl mb-14">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Tres patrones que frenan a las organizaciones que crecen.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                    </svg>
                  ),
                  title: 'Sobrecarga de validación',
                  body: 'Decisiones que requieren múltiples aprobaciones innecesarias antes de ejecutarse.',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  ),
                  title: 'Escalamiento indebido',
                  body: 'El liderazgo absorbe decisiones que no le corresponden, bloqueando su agenda y la operación.',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: 'Ambigüedad en la responsabilidad',
                  body: 'Sin claridad de quién decide qué, nadie decide bien. La responsabilidad se diluye.',
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-8 border border-gray-200">
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg text-gray-700 mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COSTO ECONÓMICO (dark) ─────────────────────────────────────────── */}
        <section className="py-24 bg-[#111827]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-2xl mb-14">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Esto no es operativo.<br />Es económico.
              </h2>
              <p className="text-lg text-gray-400">
                Cada decisión mal tomada tiene un costo real. Cada hora perdida en
                validaciones innecesarias es capacidad que no se usa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
              {[
                {
                  title: 'Capacidad operativa',
                  body: 'Tu equipo trabaja al máximo pero produce por debajo de su potencial real.',
                },
                {
                  title: 'Costo oculto',
                  body: 'El retrabajo, las reuniones sin cierre y las validaciones tienen un precio que nadie contabiliza.',
                },
                {
                  title: 'Escalabilidad',
                  body: 'Un sistema de decisiones roto no escala. Crece el caos, no la empresa.',
                },
              ].map((item) => (
                <div key={item.title} className="bg-white/5 rounded-xl p-7 border border-white/10">
                  <h3 className="text-base font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-12">
              <h3 className="text-xl font-semibold text-white mb-6">
                ¿Cuánto cuesta una decisión mal tomada?
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                {[
                  'Horas de reunión sin resolución',
                  'Retrabajo por falta de claridad',
                  'Oportunidades que no se ejecutan',
                  'Talento que se desgasta en fricción',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── METODOLOGÍA ───────────────────────────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
                Cómo trabajamos
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Las empresas miden resultados.
                <br />Nosotros medimos cómo se toman las
                <br />decisiones que los generan.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  ),
                  title: 'Trazabilidad de decisiones',
                  body: 'Documentamos el recorrido real de cada decisión dentro de la organización.',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: 'Medición de tiempos',
                  body: 'Cuantificamos cuánto tarda cada tipo de decisión y dónde se detiene.',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  title: 'Nodos de concentración',
                  body: 'Identificamos quién concentra decisiones que no debería concentrar.',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ),
                  title: 'Retrabajo',
                  body: 'Medimos cuánto trabajo se repite por falta de claridad en el sistema.',
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-5">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg text-gray-700">
                    {item.icon}
                  </div>
                  <div>
                    <div className="w-full h-px bg-gray-200 mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENTREGABLES ───────────────────────────────────────────────────── */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-2xl mb-14">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Qué entregamos.</h2>
              <p className="text-lg text-gray-500">
                Todo lo que necesitas para entender, intervenir y rediseñar cómo
                decide tu organización.
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              {[
                { num: '01', title: 'Mapa del sistema', body: 'La arquitectura real de decisiones de tu organización.' },
                { num: '02', title: 'Cuellos de botella', body: 'Los puntos exactos donde el sistema se detiene o se rompe.' },
                { num: '03', title: 'Riesgos humanos', body: 'Las personas y roles que concentran demasiado o demasiado poco.' },
                { num: '04', title: 'Indicadores', body: 'Métricas concretas para monitorear el sistema en el tiempo.' },
                { num: '05', title: 'Base de rediseño', body: 'El punto de partida para intervenir con evidencia, no con intuición.' },
              ].map((item) => (
                <div key={item.num} className="flex items-baseline gap-8 py-6">
                  <span className="text-xs font-mono text-gray-400 flex-shrink-0 w-8 pt-0.5">
                    {item.num}
                  </span>
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-10">
                    <h3 className="font-semibold text-gray-900 sm:min-w-[200px]">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESULTADOS ────────────────────────────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-2xl mb-14">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Qué cambia cuando el sistema se corrige.
              </h2>
              <p className="text-lg text-gray-500">
                El resultado no es un reporte. Es una organización que decide mejor.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Menos fricción', body: 'Las decisiones fluyen sin obstáculos innecesarios.' },
                { title: 'Más velocidad', body: 'El tiempo entre decisión y ejecución se reduce significativamente.' },
                { title: 'Menos retrabajo', body: 'Cada tarea se hace una vez, bien, con claridad desde el inicio.' },
                { title: 'Mejor distribución', body: 'Las decisiones llegan a quien debe tomarlas, no a quien puede tomarlas.' },
                { title: 'Más control', body: 'El liderazgo recupera visibilidad sin necesidad de microgestionar.' },
              ].map((item) => (
                <div key={item.title} className="border-l-2 border-gray-900 pl-6 py-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PARA QUIÉN ────────────────────────────────────────────────────── */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-2xl mb-14">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Para quién es esto.</h2>
              <p className="text-lg text-gray-500">
                Este diagnóstico está diseñado para quienes tienen la autoridad y la
                necesidad de intervenir el sistema.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-xl p-8 text-white">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-6">Perfiles</p>
                <ul className="space-y-4">
                  {['Dueños de empresa', 'CEOs', 'CFOs y directores'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-200">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">Situaciones</p>
                <ul className="space-y-4">
                  {[
                    'Crecimiento desordenado',
                    'Centralización excesiva',
                    'Falta de cierre en decisiones',
                    'Problemas de escala',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-700">
                      <svg
                        className="w-4 h-4 text-gray-400 flex-shrink-0"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL (dark) ──────────────────────────────────────────────── */}
        <section id="agendar" className="py-32 bg-[#0C0D0F] relative overflow-hidden">
          {/* Sutil wave de fondo */}
          <div className="absolute inset-0 pointer-events-none select-none">
            <svg
              className="absolute right-0 bottom-0 w-1/2 h-full opacity-[0.07]"
              viewBox="0 0 600 700" fill="none" xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M0,200 C200,80 400,320 620,180 L620,700 L0,700 Z" fill="white" />
              <path d="M0,380 C180,220 420,500 620,340 L620,700 L0,700 Z" fill="white" opacity="0.6" />
            </svg>
          </div>

          <div className="relative max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
              El sistema puede medirse.
              <br />Puede entenderse.
              <br />Puede rediseñarse.
            </h2>
            <p className="text-lg text-gray-400 max-w-xl mx-auto mb-3">
              Si tu organización pierde velocidad o control, el problema no es solo
              operativo. Es estructural.
            </p>
            <p className="text-base text-gray-500 mb-10">
              La primera conversación es un diagnóstico real.
              <br />Sin compromiso. Sin propuesta de venta.
            </p>
            {/* Reemplaza href="#" con tu URL de Calendly o agenda */}
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white text-gray-900 text-base font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Agenda tu sesión de diagnóstico
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-[#0C0D0F] border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-semibold text-gray-600">Decide</span>
          <span className="text-gray-600 text-sm">Arquitectura de decisiones organizacionales</span>
          <span className="text-gray-600 text-sm">© 2025</span>
        </div>
      </footer>
    </>
  )
}
