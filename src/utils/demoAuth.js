const PROFILE_KEY = 'digital-store-profile'
const ACCOUNT_KEY = 'digital-store-account'
const SESSION_KEY = 'digital-store-session'
const SESSION_EVENT = 'digital-store-session-change'

function notifySessionChange() {
  window.dispatchEvent(new Event(SESSION_EVENT))
}

export function getDemoSessionSnapshot() {
  try {
    return sessionStorage.getItem(SESSION_KEY)
  } catch {
    return null
  }
}

export function subscribeDemoSession(callback) {
  window.addEventListener(SESSION_EVENT, callback)
  window.addEventListener('storage', callback)

  return () => {
    window.removeEventListener(SESSION_EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}

function readValue(key) {
  try {
    return JSON.parse(sessionStorage.getItem(key) || 'null')
  } catch {
    return null
  }
}

function toHex(bytes) {
  return Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, '0')
  ).join('')
}

async function passwordHash(password, salt) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )

  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    key,
    256
  )

  return toHex(new Uint8Array(bits))
}

export async function registerDemoAccount(profile, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const hash = await passwordHash(password, salt)

  sessionStorage.setItem(
    ACCOUNT_KEY,
    JSON.stringify({
      email: profile.email.trim().toLowerCase(),
      salt: Array.from(salt),
      hash,
    })
  )

  sessionStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
  sessionStorage.removeItem(SESSION_KEY)

  notifySessionChange()
}

export async function loginDemoAccount(email, password) {
  const account = readValue(ACCOUNT_KEY)
  const profile = readValue(PROFILE_KEY)
  const normalizedEmail = email.trim().toLowerCase()

  if (
    !account ||
    typeof profile?.email !== 'string' ||
    account.email !== normalizedEmail ||
    profile.email.trim().toLowerCase() !== normalizedEmail ||
    !Array.isArray(account.salt)
  ) {
    return false
  }

  const hash = await passwordHash(
    password,
    new Uint8Array(account.salt)
  )

  if (hash !== account.hash) {
    return false
  }

  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      fullName: profile.fullName,
      email: profile.email,
    })
  )

  notifySessionChange()
  return true
}

export function readDemoSession(
  snapshot = getDemoSessionSnapshot()
) {
  try {
    const session = JSON.parse(snapshot || 'null')

    return (
      typeof session?.fullName === 'string' &&
      typeof session?.email === 'string'
    )
      ? session
      : null
  } catch {
    return null
  }
}

export function logoutDemoAccount() {
  sessionStorage.removeItem(SESSION_KEY)
  notifySessionChange()
}

export function updateDemoProfile(updates) {
  const profile = readValue(PROFILE_KEY)
  const session = readDemoSession()

  if (
    !session ||
    typeof profile?.email !== 'string' ||
    profile.email.trim().toLowerCase() !==
      session.email.trim().toLowerCase()
  ) {
    throw new Error('Entre novamente para editar seus dados.')
  }

  const fields = [
    'fullName',
    'cpf',
    'phone',
    'address',
    'neighborhood',
    'city',
    'postalCode',
    'complement',
  ]

  const updated = { ...profile }

  fields.forEach((name) => {
    updated[name] = String(
      updates[name] ?? profile[name] ?? ''
    ).trim()
  })

  if (
    fields.some(
      (name) => name !== 'complement' && !updated[name]
    )
  ) {
    throw new Error('Preencha todos os campos obrigatórios.')
  }

  if (updated.fullName.length < 3) {
    throw new Error(
      'Informe um nome com pelo menos três caracteres.'
    )
  }

  sessionStorage.setItem(
    PROFILE_KEY,
    JSON.stringify(updated)
  )

  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      ...session,
      fullName: updated.fullName,
    })
  )

  notifySessionChange()
  return updated
}