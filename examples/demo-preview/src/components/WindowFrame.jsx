const WindowFrame = ({ theme, children, className = '', tilt = false }) => (
  <div
    className={`${theme.window} ${tilt ? 'rotate-2 scale-[0.98]' : ''} ${className}`}
    style={tilt ? { transform: 'perspective(1200px) rotateY(-4deg) rotateZ(1.5deg)' } : undefined}
  >
    <div className={theme.windowBar}>
      <span className={`${theme.dot} bg-red-500/80`} />
      <span className={`${theme.dot} bg-yellow-500/80`} />
      <span className={`${theme.dot} bg-green-500/80`} />
    </div>
    <div className={theme.imageWrap}>{children}</div>
  </div>
);

export default WindowFrame;
