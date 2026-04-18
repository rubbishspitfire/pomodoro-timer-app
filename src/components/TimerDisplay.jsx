function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function TimerDisplay({ timeLeft, sessionLabel, isRunning }) {
  return (
    <section
      className="timer-display"
      aria-label="Pomodoro timer"
      aria-live="polite"
    >
      <div className="timer-session-badge">{sessionLabel}</div>
      <div className="timer-time">{formatTime(timeLeft)}</div>
      <p className="timer-status">
        {isRunning ? "Timer is running" : "Timer is paused"}
      </p>
    </section>
  );
}