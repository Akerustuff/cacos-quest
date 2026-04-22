// js/auth.js
// Autenticación con Google

const auth = firebase.auth();
const proveedorGoogle = new firebase.auth.GoogleAuthProvider();

function loginConGoogle() {
  auth.signInWithPopup(proveedorGoogle).catch(function(err) {
    console.warn('[Auth] Error al iniciar sesión:', err);
  });
}

function cerrarSesion() {
  Players.logout();
  auth.signOut();
}

// Escuchar cambios de estado de autenticación
auth.onAuthStateChanged(function(usuario) {
  if (usuario) {
    inicializarFirebase();
    const hasSession = Players.loadSession();
    if (hasSession) {
      updatePlayerName();
      navigate('missions');
    } else {
      navigate('player');
    }
  } else {
    navigate('login');
  }
});
