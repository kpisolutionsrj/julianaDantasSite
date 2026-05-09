// Wireframes for Juliana Dantas — Nutricionista
// 3 low-fi variations on a design canvas
// Sketchy / handwritten vibe, structure-focused

const { useState, useEffect } = React;

// ───────── Sketchy primitives ─────────

const stroke = { color: '#1a1a1a', width: 1.5 };

function Box({ w, h, label, sub, dashed, fill = 'transparent', children, style }) {
  return (
    <div style={{
      width: w, height: h,
      border: `${stroke.width}px ${dashed ? 'dashed' : 'solid'} ${stroke.color}`,
      borderRadius: 2,
      background: fill,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: "'Patrick Hand', 'Kalam', cursive",
      color: '#1a1a1a',
      textAlign: 'center',
      padding: 8,
      boxSizing: 'border-box',
      position: 'relative',
      ...style,
    }}>
      {label && <div style={{ fontSize: 16, fontWeight: 600 }}>{label}</div>}
      {sub && <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>{sub}</div>}
      {children}
    </div>
  );
}

function PhotoBox({ w, h, label = 'foto', children, style, tilt = 0 }) {
  return (
    <div style={{
      width: w, height: h,
      border: `${stroke.width}px solid ${stroke.color}`,
      background: '#ECE6DD',
      backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 6px, rgba(0,0,0,0.04) 6px 7px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: "'Caveat', cursive",
      fontSize: 22,
      color: '#1a1a1a',
      position: 'relative',
      transform: tilt ? `rotate(${tilt}deg)` : undefined,
      ...style,
    }}>
      {/* X marks like architectural placeholder */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="#1a1a1a" strokeWidth="1" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="#1a1a1a" strokeWidth="1" />
      </svg>
      <div style={{ position: 'relative', background: '#ECE6DD', padding: '2px 10px' }}>{label}</div>
      {children}
    </div>
  );
}

function TextLines({ lines = 3, width = '100%', short = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} style={{
          height: 6,
          background: '#1a1a1a',
          opacity: 0.55,
          width: i === lines - 1 && short ? '55%' : (i % 2 ? '92%' : '100%'),
          borderRadius: 2,
        }} />
      ))}
    </div>
  );
}

function Pill({ children, dark }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '6px 14px',
      border: `${stroke.width}px solid ${stroke.color}`,
      borderRadius: 999,
      fontFamily: "'Patrick Hand', cursive",
      fontSize: 14,
      background: dark ? '#1a1a1a' : 'transparent',
      color: dark ? '#fff' : '#1a1a1a',
    }}>{children}</div>
  );
}

function Annotation({ children, style, color = '#6B3D4E' }) {
  return (
    <div style={{
      fontFamily: "'Caveat', cursive",
      fontSize: 18,
      color,
      ...style,
    }}>{children}</div>
  );
}

function SectionLabel({ n, name }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      fontFamily: "'Caveat', cursive",
      fontSize: 22, color: '#6B3D4E',
      marginBottom: 8,
    }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 28, height: 28, borderRadius: 999,
        border: '1.5px solid #6B3D4E',
        fontSize: 14, fontFamily: "'Patrick Hand', cursive",
      }}>{n}</span>
      <span>{name}</span>
    </div>
  );
}

// ───────── Reusable block templates ─────────

function NavBar({ variant = 'a', density }) {
  const items = ['início', 'sobre', 'áreas', 'minha história', 'contato'];
  const py = density === 'compact' ? 10 : 18;
  if (variant === 'a') {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `${py}px 56px`,
        borderBottom: '1.5px solid #1a1a1a',
        fontFamily: "'Patrick Hand', cursive",
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Box w={36} h={36} label="JD" />
          <div style={{ fontSize: 14, letterSpacing: 4 }}>JULIANA DANTAS</div>
        </div>
        <div style={{ display: 'flex', gap: 28, fontSize: 14 }}>
          {items.map(i => <span key={i}>{i}</span>)}
        </div>
        <Pill dark>agendar consulta →</Pill>
      </div>
    );
  }
  if (variant === 'b') {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: `${py}px 56px`,
        borderBottom: '1.5px solid #1a1a1a',
        gap: 36,
        fontFamily: "'Patrick Hand', cursive",
        fontSize: 14, letterSpacing: 1,
        position: 'relative',
      }}>
        {items.slice(0, 2).map(i => <span key={i}>{i}</span>)}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Box w={44} h={44} label="JD" />
          <div style={{ fontSize: 9, letterSpacing: 3 }}>NUTRICIONISTA</div>
        </div>
        {items.slice(2, 4).map(i => <span key={i}>{i}</span>)}
        <Pill dark>WhatsApp</Pill>
      </div>
    );
  }
  // c — minimal side nav indicator at top
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: `${py}px 56px`,
      fontFamily: "'Patrick Hand', cursive",
    }}>
      <div style={{ fontSize: 14, letterSpacing: 4 }}>JULIANA DANTAS · NUTRICIONISTA</div>
      <div style={{ display: 'flex', gap: 20, fontSize: 13, alignItems: 'center' }}>
        <span>menu</span>
        <div style={{ width: 24, height: 1.5, background: '#1a1a1a' }} />
        <Pill>agendar</Pill>
      </div>
    </div>
  );
}

// ───────── Variation A: Editorial Classic, photo-right hero ─────────

function VariationA({ density = 'spacious' }) {
  const gap = density === 'compact' ? 48 : 96;
  const sectionPad = density === 'compact' ? '56px 56px' : '96px 56px';
  return (
    <div style={{ width: 1440, background: '#FBF8F4', color: '#1a1a1a' }}>
      <NavBar variant="a" density={density} />

      {/* HERO */}
      <div style={{ display: 'flex', padding: sectionPad, gap: 64, alignItems: 'center' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <SectionLabel n="01" name="hero" />
          <Annotation>"sua saúde, com cuidado e ciência"</Annotation>
          <div style={{
            fontFamily: "'Caveat', cursive", fontSize: 72, lineHeight: 1, color: '#1a1a1a',
          }}>
            Nutrição<br />que<br /><em style={{ color: '#6B3D4E' }}>transforma.</em>
          </div>
          <TextLines lines={3} short />
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <Pill dark>agendar consulta</Pill>
            <Pill>conhecer abordagem ↓</Pill>
          </div>
          <Annotation style={{ marginTop: 20 }} color="#888">↳ CTA principal: WhatsApp</Annotation>
        </div>
        <PhotoBox w={520} h={680} label="foto principal" >
          <div style={{ position: 'absolute', bottom: 12, fontSize: 14 }}>retrato Juliana, fundo neutro</div>
        </PhotoBox>
      </div>

      {/* TICKER / VALUES */}
      <div style={{
        borderTop: '1.5px solid #1a1a1a', borderBottom: '1.5px solid #1a1a1a',
        padding: '18px 56px',
        display: 'flex', justifyContent: 'space-between',
        fontFamily: "'Patrick Hand', cursive", fontSize: 14, letterSpacing: 2,
      }}>
        <span>CRN ATIVO</span><span>·</span>
        <span>CIÊNCIA + ACOLHIMENTO</span><span>·</span>
        <span>ATENDIMENTO ONLINE & PRESENCIAL</span><span>·</span>
        <span>+5 ANOS DE PRÁTICA</span>
      </div>

      {/* SOBRE */}
      <div style={{ padding: sectionPad, display: 'flex', gap: 64 }}>
        <div style={{ flex: 0.8, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PhotoBox w={420} h={520} label="foto sobre" />
          <Annotation color="#888">foto mais íntima — bastidor / consultório</Annotation>
        </div>
        <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionLabel n="02" name="sobre mim" />
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: 48, lineHeight: 1.05 }}>
            Oi, eu sou a <span style={{ color: '#6B3D4E' }}>Juliana</span>.
          </div>
          <TextLines lines={6} />
          <TextLines lines={3} short />
          <div style={{ display: 'flex', gap: 14, marginTop: 12 }}>
            <Pill>formação</Pill>
            <Pill>especializações</Pill>
            <Pill>filosofia</Pill>
          </div>
        </div>
      </div>

      {/* ESPECIALIDADES */}
      <div style={{ padding: sectionPad, background: '#F0EAE4' }}>
        <SectionLabel n="03" name="áreas de atuação" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: 56, lineHeight: 1 }}>
            Como posso<br />te ajudar
          </div>
          <Annotation color="#888" style={{ maxWidth: 280 }}>5 áreas — cards iguais, ícone fino + título + descrição curta</Annotation>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          {[
            'Emagrecimento\nsaudável',
            'Hipertrofia',
            'Performance\nesportiva',
            'Saúde da\nmulher',
            'Comportamento\nalimentar',
          ].map((t, i) => (
            <div key={i} style={{
              border: '1.5px solid #1a1a1a', padding: 20, minHeight: 220,
              display: 'flex', flexDirection: 'column', gap: 10, background: '#fff',
            }}>
              <Box w={40} h={40} label="ico" sub="" style={{ borderStyle: 'dashed' }} />
              <div style={{ fontFamily: "'Caveat', cursive", fontSize: 24, whiteSpace: 'pre-line', lineHeight: 1.1 }}>{t}</div>
              <TextLines lines={3} short />
              <div style={{ marginTop: 'auto', fontFamily: "'Patrick Hand', cursive", fontSize: 13 }}>saiba mais →</div>
            </div>
          ))}
        </div>
      </div>

      {/* DIFERENCIAIS */}
      <div style={{ padding: sectionPad, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
        <div>
          <SectionLabel n="04" name="diferenciais" />
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: 56, lineHeight: 1 }}>
            Por que comigo
          </div>
          <Annotation color="#888" style={{ marginTop: 12 }}>3-4 pontos. Lista numerada com tipografia grande.</Annotation>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {['Acompanhamento próximo', 'Plano realista, sem dietas mágicas', 'Olhar de atleta + nutricionista', 'Ciência atualizada'].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 18, paddingBottom: 18, borderBottom: '1px solid #1a1a1a' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, color: '#6B3D4E', minWidth: 50 }}>0{i+1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Caveat', cursive", fontSize: 28 }}>{t}</div>
                <div style={{ marginTop: 6 }}><TextLines lines={2} short /></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MINHA HISTÓRIA / GALERIA atleta */}
      <div style={{ padding: sectionPad, background: '#1a1a1a', color: '#fff' }}>
        <div style={{ color: '#fff' }}>
          <Annotation color="#B5A090" style={{ fontSize: 22 }}>↳ 05 — minha história</Annotation>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 16 }}>
            <div style={{ fontFamily: "'Caveat', cursive", fontSize: 64, color: '#fff', lineHeight: 1 }}>
              Atleta antes de<br />nutricionista.
            </div>
            <Annotation color="#B5A090" style={{ maxWidth: 320 }}>seção atleta sutil — corrida, jiu-jitsu. mostra que ela vive o que prega.</Annotation>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 32 }}>
          <PhotoBox w="100%" h={280} label="corrida" style={{ background: '#2a2a2a', color: '#fff', borderColor: '#fff' }} />
          <PhotoBox w="100%" h={280} label="jiu-jitsu" style={{ background: '#2a2a2a', color: '#fff', borderColor: '#fff' }} />
          <PhotoBox w="100%" h={280} label="treino" style={{ background: '#2a2a2a', color: '#fff', borderColor: '#fff' }} />
          <PhotoBox w="100%" h={280} label="palco" style={{ background: '#2a2a2a', color: '#fff', borderColor: '#fff' }} />
        </div>
      </div>

      {/* DEPOIMENTOS */}
      <div style={{ padding: sectionPad }}>
        <SectionLabel n="06" name="depoimentos" />
        <div style={{ fontFamily: "'Caveat', cursive", fontSize: 56, marginBottom: 32 }}>
          Pacientes que me<br/>contam suas histórias
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ border: '1.5px solid #1a1a1a', padding: 24, minHeight: 240 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 60, color: '#6B3D4E', lineHeight: 0.6 }}>"</div>
              <TextLines lines={5} short />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 18 }}>
                <Box w={40} h={40} label="" style={{ borderRadius: 999 }} />
                <div>
                  <div style={{ fontFamily: "'Caveat', cursive", fontSize: 18 }}>Nome paciente</div>
                  <div style={{ fontSize: 11, opacity: 0.6, fontFamily: "'Patrick Hand', cursive" }}>perfil curto</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Annotation color="#888" style={{ marginTop: 16 }}>↳ carrossel com setas no desktop</Annotation>
      </div>

      {/* GALERIA */}
      <div style={{ padding: sectionPad, background: '#F0EAE4' }}>
        <SectionLabel n="07" name="galeria" />
        <div style={{ fontFamily: "'Caveat', cursive", fontSize: 48, marginBottom: 24 }}>Bastidores</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
          {Array.from({length:6}).map((_,i)=>(
            <PhotoBox key={i} w="100%" h={200} label={`foto ${i+1}`} />
          ))}
        </div>
      </div>

      {/* INSTAGRAM / REDES */}
      <div style={{ padding: sectionPad, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <SectionLabel n="08" name="redes sociais" />
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: 56 }}>@julianadantas.nutri</div>
          <Annotation color="#888" style={{ marginTop: 8 }}>botão pra seguir + grid de últimos 4 posts</Annotation>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {Array.from({length:4}).map((_,i)=>(
            <PhotoBox key={i} w={140} h={140} label={`post ${i+1}`} />
          ))}
        </div>
      </div>

      {/* FOOTER / CTA FINAL */}
      <div style={{ padding: sectionPad, background: '#1a1a1a', color: '#fff', textAlign: 'center' }}>
        <Annotation color="#B5A090">↳ CTA final + footer</Annotation>
        <div style={{ fontFamily: "'Caveat', cursive", fontSize: 88, color: '#fff', lineHeight: 1, margin: '24px 0' }}>
          Bora começar?
        </div>
        <Pill dark><span style={{ color:'#fff' }}>agendar pelo WhatsApp →</span></Pill>
        <div style={{ marginTop: 56, display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #fff3', paddingTop: 24, fontFamily: "'Patrick Hand', cursive", fontSize: 13 }}>
          <span>JULIANA DANTAS · CRN xxxxx</span>
          <span>contato@julianadantas.com.br</span>
          <span>@julianadantas.nutri</span>
        </div>
      </div>
    </div>
  );
}

// ───────── Variation B: Magazine Split, photo-left full-bleed hero ─────────

function VariationB({ density = 'spacious' }) {
  const sectionPad = density === 'compact' ? '56px 64px' : '112px 80px';
  return (
    <div style={{ width: 1440, background: '#F0EAE4', color: '#1a1a1a' }}>
      <NavBar variant="b" density={density} />

      {/* HERO — split full-bleed */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 720 }}>
        <PhotoBox w="100%" h="100%" label="foto full-bleed" style={{ borderTop: 'none', borderLeft: 'none', borderBottom: 'none' }}>
          <div style={{ position: 'absolute', bottom: 24, left: 24, fontFamily: "'Caveat', cursive", fontSize: 18, background: 'rgba(255,255,255,0.8)', padding: '4px 12px' }}>
            retrato editorial · vertical
          </div>
        </PhotoBox>
        <div style={{ padding: '80px 64px', display: 'flex', flexDirection: 'column', gap: 24, justifyContent: 'center' }}>
          <SectionLabel n="01" name="hero" />
          <Annotation style={{ fontSize: 22 }}>tagline pequena, sussurrada</Annotation>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 96, lineHeight: 0.95, fontWeight: 300, letterSpacing: '0.02em' }}>
            NUTRIÇÃO<br/>
            <em style={{ color: '#6B3D4E', fontWeight: 400 }}>que cabe</em><br/>
            NA SUA VIDA
          </div>
          <div style={{ width: 80, height: 1.5, background: '#1a1a1a' }} />
          <TextLines lines={4} short />
          <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
            <Pill dark>agendar consulta</Pill>
            <Pill>baixar guia gratuito</Pill>
          </div>
        </div>
      </div>

      {/* INTRO QUOTE */}
      <div style={{ padding: '80px 80px', textAlign: 'center', borderTop: '1.5px solid #1a1a1a', borderBottom: '1.5px solid #1a1a1a' }}>
        <Annotation style={{ fontSize: 22 }}>"</Annotation>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 40, lineHeight: 1.3, fontWeight: 300, maxWidth: 1000, margin: '0 auto' }}>
          Acredito numa nutrição que respeita seu corpo, sua rotina e seus prazeres — porque comer bem não pode ser sofrimento.
        </div>
        <Annotation style={{ marginTop: 12 }}>— Juliana</Annotation>
      </div>

      {/* SOBRE — texto dominante */}
      <div style={{ padding: sectionPad, display: 'grid', gridTemplateColumns: '0.4fr 1fr', gap: 48 }}>
        <div>
          <SectionLabel n="02" name="sobre" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 56, lineHeight: 1.05, fontWeight: 300 }}>
            Sou nutricionista, mas antes disso<br/>
            sou <em style={{ color: '#6B3D4E' }}>uma mulher</em> que aprendeu na pele<br/>
            o que é cuidar de si.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <TextLines lines={6} />
            <TextLines lines={6} />
          </div>
          <div style={{ display: 'flex', gap: 20, marginTop: 8 }}>
            <PhotoBox w={180} h={240} label="foto" tilt={-2} />
            <PhotoBox w={180} h={240} label="foto" tilt={1.5} />
            <div style={{ alignSelf: 'flex-end' }}>
              <Annotation color="#888">2 polaroids inclinadas — toque editorial</Annotation>
            </div>
          </div>
        </div>
      </div>

      {/* ESPECIALIDADES — lista vertical numerada, magazine */}
      <div style={{ padding: sectionPad, background: '#1a1a1a', color: '#fff' }}>
        <Annotation color="#B5A090">↳ 03 — áreas de atuação</Annotation>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 96, fontWeight: 300, color: '#fff', lineHeight: 1, margin: '24px 0 48px' }}>
          5 frentes.<br/><em style={{ color: '#B5A090' }}>uma abordagem.</em>
        </div>
        {['Emagrecimento saudável','Hipertrofia','Performance esportiva','Saúde da mulher e estética','Comportamento alimentar'].map((t,i)=>(
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 2fr 80px', gap: 32, padding: '32px 0', borderTop: '1px solid #fff4', alignItems: 'center' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, color: '#B5A090', fontStyle: 'italic' }}>0{i+1}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 300, color: '#fff' }}>{t}</div>
            <div style={{ color: '#fff', opacity: 0.7 }}><TextLines lines={2} short /></div>
            <div style={{ textAlign: 'right', fontFamily: "'Patrick Hand', cursive", color: '#B5A090' }}>→</div>
          </div>
        ))}
      </div>

      {/* DIFERENCIAIS — coluna única, alinhada à direita */}
      <div style={{ padding: sectionPad }}>
        <SectionLabel n="04" name="diferenciais" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32, marginTop: 32 }}>
          {['ciência aplicada','plano sob medida','acompanhamento real'].map((t,i)=>(
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Box w={56} h={56} label="ico" style={{ borderStyle: 'dashed' }} />
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 400 }}>{t}</div>
              <TextLines lines={4} short />
            </div>
          ))}
        </div>
      </div>

      {/* MINHA HISTÓRIA — galeria atleta editorial */}
      <div style={{ padding: sectionPad, background: '#DDD8D0' }}>
        <Annotation>↳ 05 — minha história (atleta)</Annotation>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48, marginTop: 16, alignItems: 'center' }}>
          <PhotoBox w="100%" h={520} label="foto destaque atleta" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 56, fontWeight: 300, lineHeight: 1.05 }}>
              <em style={{ color: '#6B3D4E' }}>Corro,</em><br/>
              treino,<br/>
              compito.
            </div>
            <TextLines lines={6} />
            <Annotation color="#888">A história de atleta dela é diferencial — não é foco do site mas dá credibilidade.</Annotation>
            <div style={{ display: 'flex', gap: 8 }}>
              <PhotoBox w={120} h={120} label="" />
              <PhotoBox w={120} h={120} label="" />
              <PhotoBox w={120} h={120} label="" />
            </div>
          </div>
        </div>
      </div>

      {/* DEPOIMENTOS — citação editorial grande */}
      <div style={{ padding: sectionPad }}>
        <SectionLabel n="06" name="depoimentos" />
        <div style={{ display: 'grid', gridTemplateColumns: '0.6fr 1.4fr', gap: 64, alignItems: 'flex-start', marginTop: 32 }}>
          <PhotoBox w="100%" h={440} label="foto paciente" />
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 200, color: '#6B3D4E', lineHeight: 0.5, height: 80 }}>"</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontStyle: 'italic', fontWeight: 300, lineHeight: 1.3 }}>
              [citação grande do paciente — 2 a 3 linhas — destacando transformação]
            </div>
            <div style={{ marginTop: 24, fontFamily: "'Patrick Hand', cursive", fontSize: 16 }}>
              — Nome, profissão · acompanhamento de X meses
            </div>
            <div style={{ marginTop: 32, display: 'flex', gap: 8, alignItems: 'center' }}>
              {[1,2,3,4].map(i=>(
                <div key={i} style={{ width: 8, height: 8, borderRadius: 999, background: i===1?'#6B3D4E':'#1a1a1a3a' }}/>
              ))}
              <span style={{ marginLeft: 16, fontFamily: "'Patrick Hand', cursive" }}>← →</span>
            </div>
          </div>
        </div>
      </div>

      {/* GALERIA mosaic */}
      <div style={{ padding: sectionPad, background: '#F0EAE4' }}>
        <SectionLabel n="07" name="galeria" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: 180, gap: 8, marginTop: 24 }}>
          <PhotoBox w="100%" h="100%" style={{ gridRow: 'span 2' }} label="vertical" />
          <PhotoBox w="100%" h="100%" label="" />
          <PhotoBox w="100%" h="100%" label="" />
          <PhotoBox w="100%" h="100%" style={{ gridRow: 'span 2' }} label="vertical" />
          <PhotoBox w="100%" h="100%" style={{ gridColumn: 'span 2' }} label="wide" />
        </div>
      </div>

      {/* INSTAGRAM */}
      <div style={{ padding: sectionPad, textAlign: 'center' }}>
        <Annotation>↳ 08 — instagram</Annotation>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 64, fontWeight: 300, margin: '16px 0' }}>
          siga o dia a dia
        </div>
        <div style={{ fontFamily: "'Patrick Hand', cursive", fontSize: 22, marginBottom: 24 }}>@julianadantas.nutri</div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          {Array.from({length:5}).map((_,i)=>(
            <PhotoBox key={i} w={180} h={180} label={`post ${i+1}`} />
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: sectionPad, background: '#6B3D4E', color: '#fff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48 }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, color: '#fff', letterSpacing: '0.1em' }}>JULIANA DANTAS</div>
            <Annotation color="#F0EAE4" style={{ fontSize: 14 }}>NUTRICIONISTA · CRN xxxxx</Annotation>
            <div style={{ marginTop: 16, color: '#F0EAE4' }}><TextLines lines={2} short /></div>
          </div>
          <div style={{ color: '#F0EAE4' }}>
            <div style={{ fontFamily: "'Patrick Hand', cursive", fontSize: 12, letterSpacing: 2 }}>NAVEGAÇÃO</div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6, fontFamily: "'Patrick Hand', cursive" }}>
              <span>início</span><span>sobre</span><span>áreas</span><span>contato</span>
            </div>
          </div>
          <div style={{ color: '#F0EAE4' }}>
            <div style={{ fontFamily: "'Patrick Hand', cursive", fontSize: 12, letterSpacing: 2 }}>CONTATO</div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6, fontFamily: "'Patrick Hand', cursive" }}>
              <span>WhatsApp</span><span>e-mail</span><span>endereço</span>
            </div>
          </div>
          <div style={{ color: '#F0EAE4' }}>
            <div style={{ fontFamily: "'Patrick Hand', cursive", fontSize: 12, letterSpacing: 2 }}>REDES</div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6, fontFamily: "'Patrick Hand', cursive" }}>
              <span>instagram</span><span>tiktok</span><span>youtube</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────── Variation C: Centered Minimal, photo-center badge hero ─────────

function VariationC({ density = 'spacious' }) {
  const sectionPad = density === 'compact' ? '64px 80px' : '128px 96px';
  return (
    <div style={{ width: 1440, background: '#FFFFFF', color: '#1a1a1a' }}>
      <NavBar variant="c" density={density} />

      {/* HERO — centralizado */}
      <div style={{ padding: '80px 96px 120px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <SectionLabel n="01" name="hero" />
        <Annotation style={{ fontSize: 18 }}>NUTRICIONISTA · CRN xxxxx</Annotation>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 120, fontWeight: 300, lineHeight: 0.95, letterSpacing: '0.02em', maxWidth: 1100 }}>
          Comer bem é<br/><em style={{ color: '#6B3D4E', fontWeight: 400 }}>cuidar</em> de si.
        </div>
        <div style={{ position: 'relative', margin: '32px 0' }}>
          <PhotoBox w={420} h={420} label="foto circular / badge" style={{ borderRadius: 999 }}>
            <Annotation color="#888" style={{ fontSize: 14, marginTop: 8 }}>retrato cropado, fundo neutro</Annotation>
          </PhotoBox>
          {/* decorative ring */}
          <svg width="500" height="500" style={{ position: 'absolute', top: -40, left: -40, pointerEvents: 'none' }}>
            <circle cx="250" cy="250" r="240" fill="none" stroke="#6B3D4E" strokeWidth="1" strokeDasharray="3 6" />
          </svg>
        </div>
        <TextLines lines={2} short width={520} />
        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <Pill dark>agendar pelo WhatsApp</Pill>
          <Pill>conhecer o trabalho</Pill>
        </div>
      </div>

      {/* MARQUEE / TICKER */}
      <div style={{
        borderTop: '1.5px solid #1a1a1a', borderBottom: '1.5px solid #1a1a1a',
        padding: '14px 0', overflow: 'hidden', whiteSpace: 'nowrap',
        fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 28, letterSpacing: 4,
      }}>
        <span style={{ marginRight: 60 }}>EMAGRECIMENTO</span>·
        <span style={{ margin: '0 60px' }}>HIPERTROFIA</span>·
        <span style={{ margin: '0 60px' }}>PERFORMANCE</span>·
        <span style={{ margin: '0 60px' }}>SAÚDE DA MULHER</span>·
        <span style={{ margin: '0 60px' }}>COMPORTAMENTO ALIMENTAR</span>·
        <span style={{ margin: '0 60px' }}>EMAGRECIMENTO</span>
      </div>

      {/* SOBRE */}
      <div style={{ padding: sectionPad, textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
        <SectionLabel n="02" name="sobre" />
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 64, fontWeight: 300, lineHeight: 1.1, marginTop: 16 }}>
          Sou a Juliana —<br/>e <em style={{ color: '#6B3D4E' }}>te entendo</em>.
        </div>
        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          <TextLines lines={4} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 48 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 56, color: '#6B3D4E' }}>+5</div>
            <Annotation>anos de prática</Annotation>
          </div>
          <div style={{ width: 1, background: '#1a1a1a' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 56, color: '#6B3D4E' }}>500+</div>
            <Annotation>pacientes atendidos</Annotation>
          </div>
          <div style={{ width: 1, background: '#1a1a1a' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 56, color: '#6B3D4E' }}>3</div>
            <Annotation>especializações</Annotation>
          </div>
        </div>
      </div>

      {/* ESPECIALIDADES — accordion-style cards stacked */}
      <div style={{ padding: sectionPad, background: '#F0EAE4' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <SectionLabel n="03" name="áreas de atuação" />
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 64, fontWeight: 300 }}>
            o que ofereço
          </div>
        </div>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
          {['Emagrecimento saudável','Hipertrofia','Performance esportiva','Saúde da mulher e estética','Comportamento alimentar'].map((t,i)=>(
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '32px 0', borderTop: '1.5px solid #1a1a1a', borderBottom: i===4?'1.5px solid #1a1a1a':'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontStyle: 'italic', color: '#6B3D4E' }}>0{i+1}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300 }}>{t}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <Annotation color="#888" style={{ fontSize: 16 }}>clique para expandir</Annotation>
                <div style={{ width: 32, height: 32, border: '1.5px solid #1a1a1a', borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>+</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DIFERENCIAIS — manifesto centralizado */}
      <div style={{ padding: sectionPad, textAlign: 'center', maxWidth: 1000, margin: '0 auto' }}>
        <SectionLabel n="04" name="diferenciais" />
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 56, fontWeight: 300, lineHeight: 1.2, marginTop: 16 }}>
          Sem dietas mágicas.<br/>
          Sem promessas vazias.<br/>
          <em style={{ color: '#6B3D4E' }}>Só ciência e cuidado.</em>
        </div>
        <Annotation color="#888" style={{ marginTop: 24 }}>manifesto curto — 3 linhas, alta tipografia</Annotation>
      </div>

      {/* MINHA HISTÓRIA — strip horizontal */}
      <div style={{ padding: '64px 0', background: '#1a1a1a', color: '#fff' }}>
        <div style={{ padding: '0 96px', marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Annotation color="#B5A090" style={{ fontSize: 22 }}>↳ 05 — minha história (atleta)</Annotation>
          <Annotation color="#B5A090">strip horizontal scroll →</Annotation>
        </div>
        <div style={{ display: 'flex', gap: 8, padding: '0 96px', overflowX: 'auto' }}>
          {['corrida na orla','jiu-jitsu kimono','medalha competição','treino academia','triathlon','consultório'].map((t,i)=>(
            <PhotoBox key={i} w={320} h={420} label={t} style={{ flexShrink: 0, background:'#2a2a2a', color:'#fff', borderColor:'#fff' }} />
          ))}
        </div>
      </div>

      {/* DEPOIMENTOS — 3 cards minimalistas */}
      <div style={{ padding: sectionPad }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <SectionLabel n="06" name="depoimentos" />
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 56, fontWeight: 300 }}>
            quem viveu, conta.
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ padding: 32, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <Box w={80} h={80} label="foto" style={{ borderRadius: 999 }} />
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 22, lineHeight: 1.4 }}>
                "[depoimento curto e impactante, 1-2 linhas]"
              </div>
              <div style={{ fontFamily: "'Patrick Hand', cursive", fontSize: 14, color: '#6B3D4E' }}>— Nome paciente</div>
            </div>
          ))}
        </div>
      </div>

      {/* GALERIA */}
      <div style={{ padding: sectionPad, background: '#F0EAE4' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <SectionLabel n="07" name="galeria" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {Array.from({length:6}).map((_,i)=>(
            <PhotoBox key={i} w="100%" h={280} label={`foto ${i+1}`} />
          ))}
        </div>
      </div>

      {/* CTA FINAL */}
      <div style={{ padding: sectionPad, textAlign: 'center', background: '#6B3D4E', color: '#fff' }}>
        <Annotation color="#F0EAE4">↳ CTA final</Annotation>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 96, fontWeight: 300, color: '#fff', lineHeight: 1, margin: '24px 0 32px' }}>
          vamos começar?
        </div>
        <div style={{ color: '#F0EAE4', maxWidth: 600, margin: '0 auto 32px' }}><TextLines lines={2} short /></div>
        <Pill><span>agendar pelo WhatsApp</span></Pill>
        <div style={{ marginTop: 80, display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #ffffff33', paddingTop: 24, fontFamily: "'Patrick Hand', cursive", fontSize: 13, color: '#F0EAE4' }}>
          <span>JULIANA DANTAS · NUTRICIONISTA</span>
          <span>@julianadantas.nutri</span>
          <span>contato@julianadantas.com.br</span>
        </div>
      </div>
    </div>
  );
}

// ───────── Tweaks ─────────

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroLayout": "default",
  "density": "spacious"
}/*EDITMODE-END*/;

function App() {
  const { t, setTweak, TweaksPanel, TweakSection, TweakRadio } = window;
  const [tweaks, setTweaks_] = useState(TWEAK_DEFAULTS);
  const setT = (key, val) => {
    if (typeof key === 'object') {
      setTweaks_(prev => ({ ...prev, ...key }));
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: key }, '*');
    } else {
      setTweaks_(prev => ({ ...prev, [key]: val }));
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: val } }, '*');
    }
  };

  return (
    <>
      <window.DesignCanvas
        title="Juliana Dantas — Wireframes"
        subtitle="3 variações de layout · low-fi · estrutura primeiro"
        bg="#EDE7DF"
      >
        <window.DCSection id="variations" title="Variações de layout" subtitle="Cada uma propõe uma estrutura e tom diferente. Foque (botão de tela cheia) para revisar a fundo.">
          <window.DCArtboard id="va" label="A · Editorial Clássico — foto à direita, asymmetric" width={1440} height={5400}>
            <VariationA density={tweaks.density} />
          </window.DCArtboard>
          <window.DCArtboard id="vb" label="B · Magazine Split — foto full-bleed à esquerda" width={1440} height={6000}>
            <VariationB density={tweaks.density} />
          </window.DCArtboard>
          <window.DCArtboard id="vc" label="C · Minimal Centralizado — foto badge no centro" width={1440} height={5800}>
            <VariationC density={tweaks.density} />
          </window.DCArtboard>
        </window.DCSection>
      </window.DesignCanvas>

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Densidade">
          <window.TweakRadio
            label="Espaçamento"
            value={tweaks.density}
            options={[
              { value: 'compact', label: 'Compacto' },
              { value: 'spacious', label: 'Espaçoso' },
            ]}
            onChange={v => setT('density', v)}
          />
        </window.TweakSection>
        <window.TweakSection label="Notas">
          <div style={{ fontFamily: "'Patrick Hand', cursive", fontSize: 13, color: '#555', lineHeight: 1.5 }}>
            Hero layout varia por artboard:<br/>
            A · foto à direita<br/>
            B · split full-bleed<br/>
            C · centralizado / badge<br/>
            <br/>
            Após escolher uma direção, posso evoluir para hi-fi com as fotos reais.
          </div>
        </window.TweakSection>
      </window.TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
