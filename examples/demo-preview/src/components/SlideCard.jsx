import { useRef } from 'react';
import ExportButton from './ExportButton';

const SlideCard = ({ children, filename, className = 'cws-screenshot' }) => {
  const ref = useRef(null);
  return (
    <div className="flex flex-col gap-3">
      <div ref={ref} className={className} data-export-filename={filename}>
        {children}
      </div>
      <ExportButton targetRef={ref} filename={filename} />
    </div>
  );
};

export default SlideCard;
