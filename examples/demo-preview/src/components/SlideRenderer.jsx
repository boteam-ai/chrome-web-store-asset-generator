import WindowFrame from './WindowFrame';

const ScreenshotImg = ({ src, alt, className = 'w-full h-auto block' }) => (
  <img src={src} alt={alt} className={className} crossOrigin="anonymous" />
);

const HeroSlide = ({ slide, theme }) => (
  <div className={`cws-screenshot ${theme.canvas} flex flex-col items-center px-16 pt-14`}>
    <div className={`${theme.flare} top-32 left-1/2 -translate-x-1/2`} />
    <p className={`${theme.kicker} mb-4 relative z-10`}>{slide.kicker}</p>
    <h2 className={`${theme.heading} text-center mb-4 relative z-10`}>{slide.headline}</h2>
    <p className={`${theme.subline} text-center mb-10 relative z-10`}>{slide.subline}</p>
    <div className="relative z-10 w-[880px]">
      <WindowFrame theme={theme}>
        <ScreenshotImg src={slide.image} alt={slide.headline} />
      </WindowFrame>
    </div>
  </div>
);

const WorkflowSlide = ({ slide, theme }) => (
  <div className={`cws-screenshot ${theme.canvas} flex items-center px-16 gap-10`}>
    <div className={`${theme.flare} -left-20 top-20`} />
    <div className="w-[42%] relative z-10">
      <p className={`${theme.kicker} mb-3`}>{slide.kicker}</p>
      <h2 className={`${theme.heading} text-4xl mb-4`}>{slide.headline}</h2>
      <p className={`${theme.subline} text-lg mb-8`}>{slide.subline}</p>
      <div className="flex flex-wrap gap-2">
        {slide.pills.map((pill) => (
          <span key={pill} className={theme.pill}>
            {pill}
          </span>
        ))}
      </div>
    </div>
    <div className="flex-1 relative z-10">
      <WindowFrame theme={theme} tilt>
        <ScreenshotImg src={slide.image} alt={slide.headline} />
      </WindowFrame>
    </div>
  </div>
);

const FeatureSlide = ({ slide, theme }) => (
  <div className={`cws-screenshot ${theme.canvas} flex flex-col items-center justify-center px-16`}>
    <div className={`${theme.flare} top-16 right-24`} />
    <div className="relative z-10 text-center mb-8">
      <p className={`${theme.kicker} mb-2`}>{slide.kicker}</p>
      <h2 className={`${theme.heading} text-4xl mb-2`}>{slide.headline}</h2>
      <p className={`${theme.subline} mx-auto text-lg`}>{slide.subline}</p>
    </div>
    <div className="relative z-10 w-[920px]">
      <div
        className="absolute inset-0 pointer-events-none rounded-xl z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)',
        }}
      />
      <WindowFrame theme={theme} className="scale-105 origin-center">
        <ScreenshotImg src={slide.image} alt={slide.headline} />
      </WindowFrame>
    </div>
  </div>
);

const ChecklistSlide = ({ slide, theme }) => (
  <div className={`cws-screenshot ${theme.canvas} flex flex-col px-14 pt-12`}>
    <div className={`${theme.flare} top-10 left-1/3`} />
    <div className="relative z-10 text-center mb-8">
      <p className={`${theme.kicker} mb-2`}>{slide.kicker}</p>
      <h2 className={`${theme.heading} text-4xl mb-2`}>{slide.headline}</h2>
      <p className={`${theme.subline} mx-auto text-lg mb-4`}>{slide.subline}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {slide.pills.map((pill) => (
          <span key={pill} className={theme.pill}>
            {pill}
          </span>
        ))}
      </div>
    </div>
    <div className="relative z-10 flex gap-5 flex-1 pb-10">
      {slide.images.map((item) => (
        <div key={item.label} className="flex-1 flex flex-col gap-2">
          <span className={`${theme.badge} self-center`}>{item.label}</span>
          <WindowFrame theme={theme} className="flex-1">
            <ScreenshotImg src={item.src} alt={item.label} />
          </WindowFrame>
        </div>
      ))}
    </div>
  </div>
);

const TrustSlide = ({ slide, theme, meta }) => {
  const shots = slide.images ?? (slide.image ? [{ src: slide.image, label: 'Settings' }] : []);

  return (
    <div className={`cws-screenshot ${theme.canvas} flex items-center px-14 gap-10`}>
      <div className={`${theme.flare} bottom-10 left-10`} />
      <div className="w-[40%] relative z-10 flex flex-col items-start gap-5">
        <img src={meta.iconSrc} alt="" className="w-20 h-20 rounded-2xl shadow-lg" />
        <div>
          <p className={`${theme.kicker} mb-2`}>{slide.kicker}</p>
          <h2 className={`${theme.heading} text-4xl mb-3`}>{slide.headline}</h2>
          <p className={`${theme.subline} text-lg`}>{slide.subline}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {meta.trust.badges.map((badge) => (
            <span key={badge} className={theme.badge}>
              {badge}
            </span>
          ))}
        </div>
        <span className={theme.badge}>{meta.trust.privacy}</span>
        <div className="flex items-center gap-2">
          {'★★★★★'.split('').map((star, i) => (
            <span key={i} className={theme.id === 'c' ? 'text-amber-600' : 'text-amber-400'}>
              {star}
            </span>
          ))}
          <span className={`${theme.subtext} text-sm ml-1`}>{meta.trust.rating}</span>
        </div>
        <button type="button" className={theme.cta}>
          {slide.cta}
        </button>
      </div>
      <div className="flex-1 relative z-10 flex flex-col gap-3">
        {shots.map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <span className={`${theme.badge} self-start text-xs`}>{item.label}</span>
            <WindowFrame theme={theme}>
              <ScreenshotImg src={item.src} alt={item.label} />
            </WindowFrame>
          </div>
        ))}
      </div>
    </div>
  );
};

const SlideRenderer = ({ slide, theme, meta }) => {
  switch (slide.type) {
    case 'hero':
      return <HeroSlide slide={slide} theme={theme} />;
    case 'workflow':
      return <WorkflowSlide slide={slide} theme={theme} />;
    case 'feature':
      return <FeatureSlide slide={slide} theme={theme} />;
    case 'checklist':
      return <ChecklistSlide slide={slide} theme={theme} />;
    case 'trust':
      return <TrustSlide slide={slide} theme={theme} meta={meta} />;
    default:
      return null;
  }
};

export default SlideRenderer;
