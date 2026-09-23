import axios from "axios";
import type { IncomingNotification } from "../types/";
// docs
// GET url = "{{apiUrl}}/waInstance{{idInstance}}/receiveNotification/{{apiTokenInstance}}"
// DELETE url = "{{apiUrl}}/waInstance{{idInstance}}/deleteNotification/{{apiTokenInstance}}/{{receiptId}}"
const API_URL = import.meta.env.VITE_GREEN_API_URL;
const ID_INSTANCE = import.meta.env.VITE_ID_INSTANCE;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const greenApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const instancePath = `waInstance${ID_INSTANCE}`;

export async function sendMessage(chatId: string, message: string) {
  const response = await greenApi.post(
    `/${instancePath}/sendMessage/${API_TOKEN}`,
    {
      chatId,
      message,
    },
  );

  return response.data;
}

export async function checkAccount(phoneNumber: string) {
  const response = await greenApi.post(
    `/${instancePath}/checkAccount/${API_TOKEN}`,
    {
      phoneNumber: Number(phoneNumber),
    },
  );

  return response.data;
}

export async function receiveNotification() {
  const response = await greenApi.get<IncomingNotification>(
    `/${instancePath}/receiveNotification/${API_TOKEN}`,
    {
      params: {
        receiveTimeout: 10,
      },
    },
  );

  return response.data;
}

export async function deleteNotification(receiptId: number) {
  const response = await greenApi.delete(
    `/${instancePath}/deleteNotification/${API_TOKEN}/${receiptId}`,
  );

  return response.data;
}
