import { message } from "antd";
import { useCallback, useEffect, useState } from "react";
import {
  deleteNotification,
  receiveNotification,
  sendMessage,
} from "../services/green-services";
import type { IAuth, Message } from "../types";

export interface ChatState {
  connected: boolean;
  chatId: string;
  draft: string;
  messages: Message[];
  sending: boolean;
  chatTitle: string;
  auth: IAuth;
}

export interface ChatActions {
  handleAuthSubmit: (data: {
    idInstance: string;
    apiTokenInstance: string;
  }) => void;
  handleSend: () => Promise<void>;
  handleLogout: () => void;
  handleChangeChatId: (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => void;
  handleInputMessage: (mess: string) => void;
  clearMessages: () => void;
}

export function useChat(
  defaultAuth: IAuth,
): [ChatState, ChatActions, React.JSX.Element] {
  const [messageApi, contextHolder] = message.useMessage();

  const [auth, setAuth] = useState<IAuth>(defaultAuth);
  const [connected, setConnected] = useState(
    Boolean(defaultAuth.idInstance && defaultAuth.apiTokenInstance),
  );
  const [chatId, setChatId] = useState("");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [sending, setSending] = useState(false);
  const [chatTitle, setChatTitle] = useState("Чат");

  useEffect(() => {
    if (!connected) return;

    let stopped = false;

    const pollNotifications = async () => {
      while (!stopped) {
        try {
          const notification = await receiveNotification(auth);

          if (!notification) continue;

          const body = notification.body;

          if (
            body.typeWebhook === "incomingMessageReceived" &&
            body.messageData.typeMessage === "textMessage"
          ) {
            const text = body.messageData.textMessageData?.textMessage;

            if (text) {
              setChatId((current) => current || body.senderData.chatId);
              setChatTitle(
                body.senderData.chatName ||
                  body.senderData.senderName ||
                  body.senderData.chatId ||
                  "Чат",
              );
              setMessages((prev) => [
                ...prev,
                {
                  id: body.idMessage,
                  text,
                  fromMe: false,
                  timestamp: body.timestamp,
                },
              ]);
            }
          }

          if (notification.receiptId !== undefined) {
            await deleteNotification(notification.receiptId, auth);
          }
        } catch (error) {
          console.error("Receive error:", error);
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      }
    };

    void pollNotifications();

    return () => {
      stopped = true;
    };
  }, [auth, connected]);

  const handleAuthSubmit = useCallback(
    ({
      idInstance,
      apiTokenInstance,
    }: {
      idInstance: string;
      apiTokenInstance: string;
    }) => {
      setAuth({ idInstance, apiTokenInstance });
      setConnected(Boolean(idInstance && apiTokenInstance));
      setMessages([]);
      setDraft("");
      setChatId("");
      setChatTitle("Чат");
      messageApi.success("Подключение успешно настроено");
    },
    [messageApi],
  );

  const handleSend = useCallback(async () => {
    const text = draft.trim();
    if (!text || !chatId) {
      messageApi.error("Введите ID чата и текст сообщения");
      return;
    }

    try {
      setSending(true);
      await sendMessage(chatId, text, auth);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text,
          fromMe: true,
          timestamp: Math.floor(Date.now() / 1000),
        },
      ]);
      setDraft("");
    } catch (error) {
      console.error(error);
      messageApi.error("Не удалось отправить сообщение");
    } finally {
      setSending(false);
    }
  }, [draft, chatId, auth, messageApi]);

  const handleLogout = useCallback(() => {
    setConnected(false);
    setMessages([]);
    setDraft("");
    setChatId("");
    setChatTitle("Чат");
  }, []);

  const handleChangeChatId = useCallback(
    (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) =>
      setChatId(e.target.value),
    [],
  );

  const handleInputMessage = useCallback((mess: string) => setDraft(mess), []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const state: ChatState = {
    connected,
    chatId,
    draft,
    messages,
    sending,
    chatTitle,
    auth,
  };

  const actions: ChatActions = {
    handleAuthSubmit,
    handleSend,
    handleLogout,
    clearMessages,
    handleChangeChatId,
    handleInputMessage,
  };

  return [state, actions, contextHolder];
}
