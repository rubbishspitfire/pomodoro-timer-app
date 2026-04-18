# Pomodoro Timer

A Pomodoro Timer web application built with React, following the specifications from roadmap.sh.

This app helps users improve focus and productivity by organizing work into timed intervals with scheduled breaks.

🔗 Project Source: https://roadmap.sh/projects/pomodoro-timer
🔗 Live Demo: https://rubbishspitfire.github.io/pomodoro-timer-app/

---

## Features

* Start, pause, and resume the timer
* Reset the timer at any time
* Configurable timer durations:

  * Work session (default: 25 minutes)
  * Short break (default: 5 minutes)
  * Long break (default: 15 minutes)
* Automatic session switching:

  * Work → Short Break
  * Long break after multiple work sessions
* Displays current session type:

  * Work
  * Short Break
  * Long Break
* Tracks completed work sessions
* Audio notification when a session ends
* Responsive design (mobile and desktop)
* Accessible UI with keyboard support and ARIA labels

---

## Tech Stack

* React (Hooks)
* Vite
* JavaScript (ES6+)
* CSS
* localStorage
* Web Audio API

---

## Getting Started

### Clone the repository

```bash id="q4klaz"
git clone https://github.com/rubbishspitfire/pomodoro-timer-app
cd pomodoro-timer-app
```

### Install dependencies

```bash id="3yjscc"
npm install
```

### Run the app

```bash id="yywn8n"
npm run dev
```

### Build for production

```bash id="9jrg7u"
npm run build
```

---

## Project Structure

```id="v62htc"
src/
  components/
    Header.jsx
    TimerDisplay.jsx
    ControlButtons.jsx
    SessionInfo.jsx
    SettingsPanel.jsx
  App.jsx
  main.jsx
  index.css
```

---

## How It Works

The application follows the Pomodoro technique:

1. User starts a work session
2. After completion:

   * A short break begins
3. After a set number of work sessions:

   * A long break begins
4. The cycle repeats automatically

All timer logic and session transitions are handled using React state and effects.

---

## Future Improvements

* Add dark/light theme toggle
* Add task tracking per session
* Add browser notifications
* Add session history analytics

---

## Author

Patience Condell
https://github.com/rubbishspitfire
