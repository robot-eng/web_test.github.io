import React from 'react';
import Lobby from './components/Lobby';
import Game from './components/Game';
import { useFirebaseGame } from './hooks/useFirebaseGame';
import { ErrorBoundary } from './ErrorBoundary';

function AppContent() {
  const gameHook = useFirebaseGame();

  if (!gameHook.roomData) {
    return (
      <Lobby
        onCreateRoom={gameHook.createRoom}
        onJoinRoom={gameHook.joinRoom}
      />
    );
  }

  return <Game gameHook={gameHook} />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}