export function isValidIdInstance(value: string): boolean {
  return /^\d{5,12}$/.test(value.trim());
}

export function isValidApiToken(value: string): boolean {
  return /^[a-zA-Z0-9]{30,60}$/.test(value.trim());
}

export function isValidChatId(value: string): boolean {
  return /^(?:\d{5,15}@c\.us|\d{5,25}(?:-\d{5,25})?@g\.us)$/.test(value.trim());
}

export function getChatPhoneNumber(value: string): string | undefined {
  const chatId = value.trim();
  return /^\d{5,15}@c\.us$/.test(chatId)
    ? chatId.slice(0, -"@c.us".length)
    : undefined;
}
