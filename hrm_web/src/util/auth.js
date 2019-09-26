import cookies from 'js-cookie'

var sessionKey = 'sessionId'

export function GetSession() {
  return cookies.get(sessionKey)
}

export function SetSession(sessionId) {
  return cookies.set(sessionKey, sessionId, {expires: 7})
}

export function RemoveSession() {
  return cookies.remove(sessionKey)
}
