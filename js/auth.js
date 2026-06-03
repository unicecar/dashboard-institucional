// ================================
//  SmartBook - auth.js universal
// ================================

// URL a donde redirige al expirar o no tener sesión
const LOGIN_PAGE = "index.html";

// Cargar datos desde localStorage o sessionStorage
function getAuthData() {
  const local = localStorage.getItem("smartbook_auth");
  const session = sessionStorage.getItem("smartbook_auth");

  return local ? JSON.parse(local) : session ? JSON.parse(session) : null;
}

// Guardamos auth globalmente
const authData = getAuthData();

// ================================
//  Validación de sesión
// ================================
(function validarSesion() {
  // No existe sesión → redirigir
  if (!authData || !authData.token) {
    window.location.href = LOGIN_PAGE;
    return;
  }

  // Validación de expiración
  const ahora = Date.now();
  const expira = Number(authData.expiracion || 0);

  if (ahora >= expira) {
    // Limpiar todo
    localStorage.removeItem("smartbook_auth");
    sessionStorage.removeItem("smartbook_auth");

    alert("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
    window.location.href = LOGIN_PAGE;
  }
})();

// ================================
//  Función para obtener el token
// ================================
function getAuthToken() {
  return authData?.token || null;
}

// ================================
//  Headers para peticiones API
// ================================
function authHeaders() {
  return {
    "Authorization": `Bearer ${getAuthToken()}`,
    "Content-Type": "application/json",
  };
}

// ================================
//  Función logout universal
// ================================
function logout() {
  localStorage.removeItem("smartbook_auth");
  sessionStorage.removeItem("smartbook_auth");
  window.location.href = LOGIN_PAGE;
}
