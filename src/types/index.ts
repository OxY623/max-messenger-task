export interface GreenApiAuth {
  idInstance?: string;
  apiTokenInstance?: string;
}

export interface Message {
  id: string;
  text: string;
  fromMe: boolean;
  timestamp: number;
}

export interface IncomingNotification {
  receiptId: number | string;
  body: {
    typeWebhook: string;
    idMessage: string;
    timestamp: number;
    senderData: {
      chatId: string;
      chatName?: string;
      sender: string;
      senderName?: string;
      senderPhoneNumber?: string;
    };
    messageData: {
      typeMessage: string;
      textMessageData?: {
        textMessage: string;
      };
    };
  };
}

export type CheckAccountResponse = {
  exist: boolean;
  chatId: string;
  fromCache: boolean;
};

export type IData = {
  auth: GreenApiAuth;
  chatId: string;
  isCheckingChatId: boolean;
  handleCheckChatId: () => Promise<void>;
  handleChangeChatId: (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => void;
  clearMessages: () => void;
  chatTitle: string;
  handleLogout: () => void;
  messages: Message[];
  draft: string;
  sending: boolean;
  handleInputMessage: (mess: string) => void;
  handleSend: () => Promise<void>;
};
