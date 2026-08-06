import { useState } from 'react';
import TabBar from './components/TabBar';
import SlideCard from './components/SlideCard';
import SlideRenderer from './components/SlideRenderer';
import PromoTiles from './components/PromoTiles';
import { productMeta } from './productMeta';
import { themes } from './themes';

const TABS = [
  { id: 'a', label: 'Style A: Clean Minimal' },
  { id: 'b', label: 'Style B: Neon Tech' },
  { id: 'c', label: 'Style C: Warm Editorial' },
  { id: 'd', label: 'Style D: Bold Contrast' },
  { id: 'promo', label: 'Promo Tiles (440×280)' },
];

const StylePanel = ({ theme }) => (
  <div className="flex flex-col gap-10 p-8">
    {productMeta.slides.map((slide) => (
      <SlideCard
        key={`${theme.id}-${slide.id}`}
        filename={`style-${theme.id}-slide-${slide.id}-1280x800.png`}
      >
        <SlideRenderer slide={slide} theme={theme} meta={productMeta} />
      </SlideCard>
    ))}
  </div>
);

const StoreAssetsPreview = () => {
  const [activeTab, setActiveTab] = useState('a');
  const activeTheme = themes.find((t) => t.id === activeTab);

  return (
    <div className="min-h-screen bg-neutral-950">
      <header className="border-b border-white/10 px-6 py-6">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1">CWS asset preview</p>
        <h1 className="text-2xl font-semibold text-white">{productMeta.name}</h1>
        <p className="text-white/50 text-sm mt-1">
          Skill demo — 8 slides × 4 styles + 3 promo tiles · depicts this skill&apos;s workflow
        </p>
      </header>
      <TabBar tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      <main>
        {activeTab === 'promo' ? (
          <PromoTiles />
        ) : (
          activeTheme && <StylePanel theme={activeTheme} />
        )}
      </main>
    </div>
  );
};

export default StoreAssetsPreview;
