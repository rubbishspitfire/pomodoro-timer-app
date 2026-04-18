export default function SessionInfo({ sessionLabel, completedWorkSessions }) {
  return (
    <section className="session-info" aria-label="Session information">
      <div className="info-card">
        <span className="info-label">Current Session</span>
        <strong>{sessionLabel}</strong>
      </div>
      <div className="info-card">
        <span className="info-label">Completed Work Sessions</span>
        <strong>{completedWorkSessions}</strong>
      </div>
    </section>
  );
}