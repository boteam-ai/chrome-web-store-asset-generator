import html2canvas from 'html2canvas';

const ExportButton = ({ targetRef, filename, label = 'Export PNG' }) => {
  const handleExport = async () => {
    if (!targetRef.current) return;
    const el = targetRef.current;
    const canvas = await html2canvas(el, {
      scale: 1,
      useCORS: true,
      backgroundColor: null,
      width: el.offsetWidth,
      height: el.offsetHeight,
    });
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      className="self-start rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
    >
      {label}
    </button>
  );
};

export default ExportButton;
