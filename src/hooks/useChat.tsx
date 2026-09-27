import { message } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  checkAccount,
  deleteNotification,
  receiveNotification,
  sendMessage,
} from "../services/green-services";
import type { GreenApiAuth, Message } from "../types";
import { getChatPhoneNumber, isValidChatId } from "../utils/isValidData";

export interface ChatState {
  connected: boolean;
  chatId: string;
  isCheckingChatId: boolean;
  draft: string;
  messages: Message[];
  sending: boolean;
  chatTitle: string;
  auth: GreenApiAuth;
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
  handleCheckChatId: () => Promise<void>;
  handleInputMessage: (mess: string) => void;
  clearMessages: () => void;
}

export function useChat(
  defaultAuth: GreenApiAuth,
): [ChatState, ChatActions, React.JSX.Element] {
  const [messageApi, contextHolder] = message.useMessage();

  const [auth, setAuth] = useState<GreenApiAuth>(defaultAuth);
  const [connected, setConnected] = useState(
    Boolean(defaultAuth.idInstance && defaultAuth.apiTokenInstance),
  );
  const [chatId, setChatId] = useState("");
  const chatIdRef = useRef("");
  const [isCheckingChatId, setIsCheckingChatId] = useState(false);
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
          if (stopped) break;

          const notification = await receiveNotification(auth);

          if (!notification) {
            await new Promise((r) => setTimeout(r, 1000));
            continue;
          }

          if (notification.receiptId !== undefined) {
            await deleteNotification(notification.receiptId, auth);
          }
        } catch (error: unknown) {
          messageApi.error(
            "Ошибка при получении уведомлений. Проверьте подключение к сети.",
          );
          console.error("Receive error:", error);
          const response =
            typeof error === "object" && error !== null && "response" in error
              ? error.response
              : undefined;
          const isNetworkError = !response;
          const status =
            typeof response === "object" &&
            response !== null &&
            "status" in response
              ? response.status
              : undefined;

          if (status === 401 || status === 403) {
            setConnected(false);
            messageApi.error(
              "Ошибка авторизации. Проверьте idInstance и apiTokenInstance.",
            );
            // console.error(
            //   "Ошибка авторизации. Проверьте idInstance и apiTokenInstance.",
            // );
            if (!stopped) {
              stopped = true;
            }
            break;
          }

          await new Promise((r) => setTimeout(r, isNetworkError ? 3000 : 1000));
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
      chatIdRef.current = "";
      setChatId("");
      setChatTitle("Чат");
      messageApi.success("Подключение успешно настроено");
    },
    [messageApi],
  );

  const handleSend = useCallback(async () => {
    const text = draft.trim();
    if (!text) {
      messageApi.error("Введите текст сообщения");
      return;
    }
    if (!isValidChatId(chatId)) {
      messageApi.error("Введите корректный Chat ID");
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
    chatIdRef.current = "";
    setChatId("");
    setChatTitle("Чат");
  }, []);

  const handleChangeChatId = useCallback(
    (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      const nextChatId = e.target.value.trim();
      if (nextChatId !== chatIdRef.current) {
        chatIdRef.current = nextChatId;
        setMessages([]);
        setChatTitle("Чат");
      }
      setChatId(nextChatId);
    },
    [],
  );

  const handleCheckChatId = useCallback(async () => {
    const phoneNumber = getChatPhoneNumber(chatId);
    if (!phoneNumber) {
      messageApi.error("Проверка доступна только для личных чатов @c.us");
      return;
    }

    try {
      setIsCheckingChatId(true);
      const result = await checkAccount(phoneNumber, auth);
      if (result.exist === true) {
        messageApi.success("Аккаунт MAX найден");
      } else if (result.exist === false) {
        messageApi.error("Аккаунт MAX не найден");
      } else {
        messageApi.error("Не удалось определить статус аккаунта");
      }
    } catch (error) {
      console.error("Account check error:", error);
      messageApi.error("Не удалось проверить номер");
    } finally {
      setIsCheckingChatId(false);
    }
  }, [chatId, auth, messageApi]);

  const handleInputMessage = useCallback((mess: string) => setDraft(mess), []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const state: ChatState = {
    connected,
    chatId,
    isCheckingChatId,
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
    handleCheckChatId,
    clearMessages,
    handleChangeChatId,
    handleInputMessage,
  };

  return [state, actions, contextHolder];
}
