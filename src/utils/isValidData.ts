export function isValidIdInstance(value: string): boolean {
  return /^\d{5,12}$/.test(value.trim());
}

export function isValidApiToken(value: string): boolean {
  return /^[a-zA-Z0-9]{30,60}$/.test(value.trim());
}
