import { useRef } from 'react';
import ExportButton from './ExportButton';
import { productMeta, promoMeta } from '../productMeta';
import { themeA, themeB, themeC } from '../themes';

const PromoTileCard = ({ children, filename }) => {
  const ref = useRef(null);
  return (
    <div className="flex flex-col gap-3">
      <div ref={ref} className="cws-promo-tile" data-export-filename={filename}>
        {children}
      </div>
      <ExportButton targetRef={ref} filename={filename} />
    </div>
  );
};

const PromoTile01 = ({ meta, theme = themeA }) => (
  <div className={`h-full ${theme.canvas} flex flex-col items-center justify-center px-6 text-center`}>
    <div className={`${theme.flare} w-40 h-40 top-4`} />
    <img src={meta.iconSrc} alt="" className="w-24 h-24 rounded-2xl mb-4 relative z-10 shadow-xl" />
    <h3 className={`${theme.heading} text-2xl mb-2 relative z-10`}>{meta.name}</h3>
    <p className={`${theme.subline} text-sm relative z-10 leading-snug`}>{meta.tagline}</p>
  </div>
);

const PromoTile02 = ({ meta, theme = themeB }) => (
  <div className={`h-full ${theme.canvas} flex overflow-hidden`}>
    <div className="w-[52%] flex flex-col justify-center pl-6 pr-2 relative z-10">
      <img src={meta.iconSrc} alt="" className="w-10 h-10 rounded-lg mb-3" />
      <h3 className={`${theme.heading} text-xl mb-1 leading-tight`}>{meta.name}</h3>
      <p className={`${theme.subtext} text-xs leading-snug`}>{meta.tagline}</p>
    </div>
    <div className="absolute right-[-12%] top-[-8%] w-[62%] h-[116%]">
      <div className={`${theme.window} h-full shadow-2xl`}>
        <div className={theme.windowBar}>
          <span className={`${theme.dot} bg-red-500/80`} />
          <span className={`${theme.dot} bg-yellow-500/80`} />
          <span className={`${theme.dot} bg-green-500/80`} />
        </div>
        <div className={`${theme.imageWrap} h-[calc(100%-36px)] overflow-hidden`}>
          <img
            src={promoMeta.screenshotHero}
            alt=""
            className="w-full h-full object-cover object-left-top"
            crossOrigin="anonymous"
          />
        </div>
      </div>
    </div>
  </div>
);

const PromoTile03 = ({ meta, theme = themeC }) => (
  <div className={`h-full ${theme.canvas} flex flex-col px-5 py-4 justify-between`}>
    <div className="flex items-center gap-2">
      <img src={meta.iconSrc} alt="" className="w-9 h-9 rounded-lg" />
      <span className={`${theme.heading} text-lg`}>{meta.name}</span>
    </div>
    <div>
      <h3 className={`${theme.heading} text-2xl leading-tight mb-1`}>Draft. Optimize. Send.</h3>
      <p className={`${theme.subtext} text-xs`}>Engage + Create on X</p>
    </div>
    <div className="flex flex-wrap gap-1.5">
      {meta.trust.badges.map((badge) => (
        <span key={badge} className={`${theme.pill} text-[10px] px-2 py-0.5`}>
          {badge}
        </span>
      ))}
    </div>
  </div>
);

const PromoTiles = () => (
  <div className="flex flex-wrap gap-8 p-8">
    <div>
      <p className="text-white/50 text-sm mb-3 uppercase tracking-wider">Option 1 — Logo focus</p>
      <PromoTileCard filename="promo-tile-01-440x280.png">
        <PromoTile01 meta={productMeta} theme={themeA} />
      </PromoTileCard>
    </div>
    <div>
      <p className="text-white/50 text-sm mb-3 uppercase tracking-wider">Option 2 — UI banner</p>
      <PromoTileCard filename="promo-tile-02-440x280.png">
        <PromoTile02 meta={productMeta} theme={themeB} />
      </PromoTileCard>
    </div>
    <div>
      <p className="text-white/50 text-sm mb-3 uppercase tracking-wider">Option 3 — Trust badges</p>
      <PromoTileCard filename="promo-tile-03-440x280.png">
        <PromoTile03 meta={productMeta} theme={themeC} />
      </PromoTileCard>
    </div>
  </div>
);

export default PromoTiles;
