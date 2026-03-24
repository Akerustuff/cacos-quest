// Navegación y arranque de la app                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  function navigate(screen) {                                                                                                                                                                                                                                         
    // Ocultar todas las pantallas
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));

    // Mostrar la pantalla pedida
    document.getElementById('screen-' + screen).classList.remove('hidden');
  }

  function selectPlayer(playerId) {
    Players.select(playerId);
    updatePlayerName();
    navigate('menu');
  }

  function changePlayer() {
    Players.logout();
    navigate('player');
  }

  function updatePlayerName() {
    const player = Players.get();
    document.getElementById('player-name').textContent = player.emoji + ' ' + player.name;
  }

  // Arranque: se ejecuta cuando carga la app
  window.onload = function () {
    const hasSession = Players.loadSession();

    if (hasSession) {
      updatePlayerName();
      navigate('menu');
    } else {
      navigate('player');
    }
  };