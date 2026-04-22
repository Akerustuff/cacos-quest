// Navegación y arranque de la app
  const PANTALLAS_CON_NAV = ['missions', 'provisions', 'presupuesto', 'battlepass', 'cycles'];
  const NAV_IDS = {
    missions: 'nav-missions',
    provisions: 'nav-provisions',
    presupuesto: 'nav-presupuesto',
    battlepass: 'nav-battlepass',
    cycles: 'nav-cycles'
  };

  function navigate(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById('screen-' + screen).classList.remove('hidden');

    // Bottom nav
    const nav = document.getElementById('bottom-nav');
    if (PANTALLAS_CON_NAV.includes(screen)) {
      nav.classList.remove('hidden');
      document.querySelectorAll('.bottom-nav-item').forEach(i => i.classList.remove('active'));
      const itemActivo = document.getElementById(NAV_IDS[screen]);
      if (itemActivo) itemActivo.classList.add('active');
    } else {
      nav.classList.add('hidden');
    }

    if (screen === 'missions') cambiarTab('diarias');
    if (screen === 'cycles') renderizarCiclos();
    if (screen === 'provisions') { categoriasAbiertas.clear(); renderizarProvisiones(); }
    if (screen === 'battlepass') renderizarBattlepass();
    if (screen === 'registro') cambiarTabRegistro('completadas');
    if (screen === 'presupuesto') renderizarPresupuesto();
    if (screen === 'presupuestos-historicos') renderizarPresupuestosHistoricos();
  }

  function selectPlayer(playerId) {
    Players.select(playerId);
    updatePlayerName();
    navigate('missions');
  }

  function changePlayer() {
    Players.logout();
    navigate('player');
  }

  function updatePlayerName() {
    const player = Players.get();
    document.querySelectorAll('.menu-jugador-btn').forEach(function(btn) {
      btn.textContent = player.emoji + ' ' + player.name;
    });
  }

  function toggleSubmenuRegistros(e) {
    e.stopPropagation();
    document.querySelectorAll('#submenu-registros').forEach(s => s.classList.toggle('visible'));
  }

  function toggleMenuJugador() {
    const pantallaVisible = document.querySelector('.screen:not(.hidden)');
    const dropdown = pantallaVisible ? pantallaVisible.querySelector('.menu-jugador-dropdown') : null;
    if (dropdown) dropdown.classList.toggle('visible');
  }

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.menu-jugador-wrap')) {
      document.querySelectorAll('.menu-jugador-dropdown').forEach(function(d) {
        d.classList.remove('visible');
      });
    }
  });

  // Arranque: se ejecuta cuando carga la app
  // La navegación inicial la maneja auth.js después de verificar el login
  window.onload = function () {
    verificarCambioMes();
    const pantallasConFooter = ['screen-login', 'screen-player', 'screen-registro', 'screen-configuracion', 'screen-presupuestos-historicos', 'screen-cycles', 'screen-loading'];
    document.querySelectorAll('.screen').forEach(function(screen) {
      if (!pantallasConFooter.includes(screen.id)) return;
      const footer = document.createElement('div');
      footer.className = 'footer-global';
      footer.textContent = 'Hecho por el 🐻 con amor ♥️';
      screen.appendChild(footer);
    });
  };

