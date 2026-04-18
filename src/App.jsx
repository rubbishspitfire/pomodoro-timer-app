import { useEffect, useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import TimerDisplay from "./components/TimerDisplay";
import ControlButtons from "./components/ControlButtons";
import SessionInfo from "./components/SessionInfo";
import SettingsPanel from "./components/SettingsPanel";

const DEFAULT_SETTINGS = {
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  sessionsBeforeLongBreak: 4,
};

const SESSION_LABELS = {
  work: "Work",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};

function getStoredSettings() {
  const saved = localStorage.getItem("pomodoro-settings");
  if (!saved) return DEFAULT_SETTINGS;

  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function getSessionDuration(sessionType, settings) {
  if (sessionType === "work") return settings.workMinutes * 60;
  if (sessionType === "shortBreak") return settings.shortBreakMinutes * 60;
  return settings.longBreakMinutes * 60;
}

export default function App() {
  const [settings, setSettings] = useState(getStoredSettings);
  const [sessionType, setSessionType] = useState("work");
  const [timeLeft, setTimeLeft] = useState(
    DEFAULT_SETTINGS.workMinutes * 60
  );
  const [isRunning, setIsRunning] = useState(false);
  const [completedWorkSessions, setCompletedWorkSessions] = useState(0);
  const audioContextRef = useRef(null);

  const sessionLabel = useMemo(
    () => SESSION_LABELS[sessionType],
    [sessionType]
  );

  useEffect(() => {
    localStorage.setItem("pomodoro-settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    setTimeLeft(getSessionDuration(sessionType, settings));
  }, [settings, sessionType]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSessionComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, sessionType, settings]);

  const playNotification = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new window.AudioContext();
      }

      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.4);
    } catch (error) {
      console.error("Audio notification failed:", error);
    }
  };

  const handleSessionComplete = () => {
    playNotification();

    if (sessionType === "work") {
      const newCompleted = completedWorkSessions + 1;
      setCompletedWorkSessions(newCompleted);

      const shouldTakeLongBreak =
        newCompleted % settings.sessionsBeforeLongBreak === 0;

      const nextSession = shouldTakeLongBreak ? "longBreak" : "shortBreak";
      setSessionType(nextSession);
      setTimeLeft(getSessionDuration(nextSession, settings));
    } else {
      setSessionType("work");
      setTimeLeft(getSessionDuration("work", settings));
    }

    setIsRunning(false);
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setSessionType("work");
    setTimeLeft(getSessionDuration("work", settings));
    setCompletedWorkSessions(0);
  };

  const handleSkip = () => {
    setIsRunning(false);
    handleSessionComplete();
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
  };

  return (
    <div className="app-shell">
      <main className="app-card">
        <Header />
        <SessionInfo
          sessionLabel={sessionLabel}
          completedWorkSessions={completedWorkSessions}
        />
        <TimerDisplay
          timeLeft={timeLeft}
          sessionLabel={sessionLabel}
          isRunning={isRunning}
        />
        <ControlButtons
          isRunning={isRunning}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
          onSkip={handleSkip}
        />
        <SettingsPanel
          settings={settings}
          onSettingsChange={handleSettingsChange}
        />
      </main>
    </div>
  );
}