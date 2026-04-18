export default function ControlButtons({
  isRunning,
  onStart,
  onPause,
  onReset,
  onSkip,
}) {
  return (
    <section className="controls" aria-label="Timer controls">
      {!isRunning ? (
        <button className="primary-btn" onClick={onStart} aria-label="Start or resume timer">
          Start
        </button>
      ) : (
        <button className="primary-btn" onClick={onPause} aria-label="Pause timer">
          Pause
        </button>
      )}

      <button className="secondary-btn" onClick={onReset} aria-label="Reset timer">
        Reset
      </button>

      <button className="secondary-btn" onClick={onSkip} aria-label="Skip current session">
        Skip
      </button>
    </section>
  );
}