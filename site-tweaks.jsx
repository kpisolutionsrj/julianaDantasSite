// Tweaks panel for Site Juliana Dantas A
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroLayout": "right",
  "density": "spacious",
  "color": "#6B3D4E"
}/*EDITMODE-END*/;

function SiteTweaks() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  const COLOR_MAP = {
    '#6B3D4E': 'wine',
    '#5C6B4E': 'sage',
    '#B05A3C': 'terracotta',
    '#2D3142': 'midnight',
  };

  // Apply to body data-attrs
  React.useEffect(() => {
    document.body.setAttribute('data-hero', t.heroLayout);
    document.body.setAttribute('data-density', t.density);
    document.body.setAttribute('data-color', COLOR_MAP[t.color] || 'wine');
  }, [t.heroLayout, t.density, t.color]);

  const { TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakColor } = window;

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Hero">
        <TweakSelect
          label="Layout da foto"
          value={t.heroLayout}
          options={[
            { value: 'right', label: 'Foto à direita' },
            { value: 'left',  label: 'Foto à esquerda' },
            { value: 'full',  label: 'Foto full-bleed' },
          ]}
          onChange={v => setTweak('heroLayout', v)}
        />
      </TweakSection>
      <TweakSection label="Densidade">
        <TweakRadio
          label="Espaçamento das seções"
          value={t.density}
          options={[
            { value: 'compact', label: 'Compacto' },
            { value: 'spacious', label: 'Espaçoso' },
          ]}
          onChange={v => setTweak('density', v)}
        />
      </TweakSection>
      <TweakSection label="Paleta de destaque">
        <TweakColor
          label="Cor de marca"
          value={t.color}
          options={['#6B3D4E', '#5C6B4E', '#B05A3C', '#2D3142']}
          onChange={v => setTweak('color', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<SiteTweaks />);
