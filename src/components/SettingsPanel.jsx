import { useEffect, useState } from "react";

export default function SettingsPanel({ settings, onSettingsChange }) {
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalSettings((prev) => ({
      ...prev,
      [name]: Math.max(1, Number(value)),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSettingsChange(localSettings);
  };

  return (
    <section className="settings-panel" aria-labelledby="settings-heading">
      <h2 id="settings-heading">Timer Settings</h2>

      <form className="settings-form" onSubmit={handleSubmit}>
        <label>
          Work Minutes
          <input
            type="number"
            name="workMinutes"
            min="1"
            value={localSettings.workMinutes}
            onChange={handleChange}
          />
        </label>

        <label>
          Short Break Minutes
          <input
            type="number"
            name="shortBreakMinutes"
            min="1"
            value={localSettings.shortBreakMinutes}
            onChange={handleChange}
          />
        </label>

        <label>
          Long Break Minutes
          <input
            type="number"
            name="longBreakMinutes"
            min="1"
            value={localSettings.longBreakMinutes}
            onChange={handleChange}
          />
        </label>

        <label>
          Sessions Before Long Break
          <input
            type="number"
            name="sessionsBeforeLongBreak"
            min="1"
            value={localSettings.sessionsBeforeLongBreak}
            onChange={handleChange}
          />
        </label>

        <button className="save-btn" type="submit">
          Save Settings
        </button>
      </form>
    </section>
  );
}