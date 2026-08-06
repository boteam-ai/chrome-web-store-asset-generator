const TabBar = ({ tabs, activeTab, onChange }) => (
  <nav className="sticky top-0 z-50 flex flex-wrap gap-2 border-b border-white/10 bg-neutral-950/95 px-6 py-4 backdrop-blur">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        type="button"
        onClick={() => onChange(tab.id)}
        className={`rounded-md px-4 py-2 text-sm font-medium transition ${
          activeTab === tab.id
            ? 'bg-white text-black'
            : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
        }`}
      >
        {tab.label}
      </button>
    ))}
  </nav>
);

export default TabBar;
