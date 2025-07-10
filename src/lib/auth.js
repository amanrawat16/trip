export function validateSession(token) {
  if (!token) return false;
  
  return token === 'valid-session-token';
}

export function getServerSession(req) {
  try {
    const token = req.cookies.sessionToken;
    return validateSession(token);
  } catch (error) {
    return false;
  }
}

export function getClientSession() {
  if (typeof window === 'undefined') return false;
  
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('sessionToken='))
      ?.split('=')[1];
    
    return validateSession(token);
  } catch (error) {
    return false;
  }
}

export function createSession(res) {
  const token = 'valid-session-token';
  
  res.setHeader('Set-Cookie', `sessionToken=${token}; HttpOnly; Path=/; Max-Age=3600`);
  return token;
}

export function clearSession(res) {
  res.setHeader('Set-Cookie', 'sessionToken=; HttpOnly; Path=/; Max-Age=0');
} 