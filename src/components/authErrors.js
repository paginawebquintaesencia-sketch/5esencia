// Mensajes de autenticación para errores comunes (neutral, sin proveedor específico)
export function mapAuthError(error) {
  const code = error?.code || '';
  const message = (error?.message || '').toLowerCase();
  if (message.includes('invalid login credentials')) {
    return 'Correo o contraseña incorrectos.';
  }
  if (message.includes('not confirmed')) {
    return 'Tu correo no está confirmado. Revisa tu bandeja y confirma.';
  }
  switch (code) {
    case 'email_exists':
      return 'Ese correo ya está registrado.';
    case 'invalid_email':
      return 'El correo electrónico no es válido.';
    case 'weak_password':
      return 'La contraseña es muy débil (mínimo 6 caracteres).';
    case 'network_error':
      return 'Fallo de red. Verifica tu conexión o bloqueadores.';
    case 'too_many_requests':
      return 'Demasiados intentos. Intenta de nuevo más tarde.';
    case 'user_not_found':
      return 'No existe una cuenta con ese correo.';
    case 'invalid_credentials':
      return 'Contraseña incorrecta.';
    default:
      return error?.message || 'Ocurrió un error de autenticación.';
  }
}
