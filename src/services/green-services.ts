import axios from "axios";
import type { IncomingNotification } from "../types/";

// docs
// GET url = "{{apiUrl}}/waInstance{{idInstance}}/receiveNotification/{{apiTokenInstance}}"
// DELETE url = "{{apiUrl}}/waInstance{{idInstance}}/deleteNotification/{{apiTokenInstance}}/{{receiptId}}"
const API_URL = import.meta.env.VITE_GREEN_API_URL;
const DEFAULT_ID_INSTANCE = import.meta.env.VITE_ID_INSTANCE;
const DEFAULT_API_TOKEN = import.meta.env.VITE_API_TOKEN;

export interface GreenApiAuth {
  idInstance?: string;
  apiTokenInstance?: string;
}

function getAuthConfig(auth?: GreenApiAuth) {
  const idInstance = auth?.idInstance ?? DEFAULT_ID_INSTANCE;
  const apiTokenInstance = auth?.apiTokenInstance ?? DEFAULT_API_TOKEN;

  if (!idInstance || !apiTokenInstance) {
    throw new Error("Green API credentials are not configured");
  }

  const greenApi = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    greenApi,
    instancePath: `waInstance${idInstance}`,
    apiTokenInstance,
  };
}

export async function sendMessage(
  chatId: string,
  message: string,
  auth?: GreenApiAuth,
) {
  const { greenApi, instancePath, apiTokenInstance } = getAuthConfig(auth);

  const response = await greenApi.post(
    `/${instancePath}/sendMessage/${apiTokenInstance}`,
    {
      chatId,
      message,
    },
  );

  return response.data;
}

export async function checkAccount(phoneNumber: string, auth?: GreenApiAuth) {
  const { greenApi, instancePath, apiTokenInstance } = getAuthConfig(auth);

  const response = await greenApi.post(
    `/${instancePath}/checkAccount/${apiTokenInstance}`,
    {
      phoneNumber: Number(phoneNumber),
    },
  );

  return response.data;
}

export async function receiveNotification(auth?: GreenApiAuth) {
  const { greenApi, instancePath, apiTokenInstance } = getAuthConfig(auth);

  const response = await greenApi.get<IncomingNotification>(
    `/${instancePath}/receiveNotification/${apiTokenInstance}`,
    {
      params: {
        receiveTimeout: 10,
      },
    },
  );

  return response.data;
}

export async function deleteNotification(
  receiptId: number | string,
  auth?: GreenApiAuth,
) {
  const { greenApi, instancePath, apiTokenInstance } = getAuthConfig(auth);

  const response = await greenApi.delete(
    `/${instancePath}/deleteNotification/${apiTokenInstance}/${receiptId}`,
  );

  return response.data;
}
