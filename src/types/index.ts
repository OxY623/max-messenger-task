

export interface Message {
  id: string;
  text: string;
  fromMe: boolean;
  timestamp: number;
}
// текст сообщения const mess = messageData.textMessageData.textMessage
export interface IncomingNotification {
  receiptId: number;
  body: {
    typeWebhook: string;
    idMessage: string;
    timestamp: number;
    senderData: {
      chatId: string;
      chatName: string;
      sender: string;
      senderName: string;
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
