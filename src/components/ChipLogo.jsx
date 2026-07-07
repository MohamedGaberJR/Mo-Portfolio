import './ChipLogo.css';

export default function ChipLogo({ className = '', size = 'default', ledActive = false }) {
  return (
    <div className={`chip-logo ${size !== 'default' ? `chip-logo--${size}` : ''} ${className}`.trim()}>
      <div className={`chip-package ${ledActive ? 'chip-package--active' : ''}`}>
        <span className="chip-pin pin-left-1" />
        <span className="chip-pin pin-left-2" />
        <span className="chip-pin pin-left-3" />
        <span className="chip-pin pin-right-1" />
        <span className="chip-pin pin-right-2" />
        <span className="chip-pin pin-right-3" />
        <span className="chip-led" />
        <div className="chip-die">MMG</div>
      </div>
    </div>
  );
}
