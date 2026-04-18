# Pomodoro Timer

A simple Pomodoro Timer built with React to help users stay focused and manage work sessions using timed intervals.

## Features

* Start, pause, and reset the timer
* Automatic switching between work and break sessions
* Configurable timer durations
* Tracks completed work sessions
* Audio alert when a session ends
* Responsive design for mobile and desktop

## Tech Stack

* React
* Vite
* JavaScript (ES6+)
* CSS
* localStorage

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rubbishspitfire/pomodoro-timer-app
cd pomodoro-timer-app

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

## Live Demo

https://rubbishspitfire.github.io/pomodoro-timer-app/

## Project Structure

```
src/
  components/
  App.jsx
  main.jsx
  index.css
```

## How It Works

The timer alternates between:

* Work sessions (default: 25 minutes)
* Short breaks (default: 5 minutes)
* Long breaks after several sessions

The app automatically switches between sessions and keeps track of progress.

## Author

Patience Condell
https://github.com/rubbishspitfire
