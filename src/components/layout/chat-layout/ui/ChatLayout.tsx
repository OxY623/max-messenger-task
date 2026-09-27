import { Button } from "antd";
import { useState } from "react";
import type { IData } from "../../../../types";
import {
  getChatPhoneNumber,
  isValidChatId,
} from "../../../../utils/isValidData";
import { ChatIdControl } from "../../../ui/chat-id-control";
import { MessageInput } from "../../../ui/message-input";
import { MessageList } from "../../../ui/message-list";
import { MessageSearch } from "../../../ui/message-search";

type Props = {
  data: IData;
};

const ChatLayout = ({ data }: Props) => {
  const {
    auth,
    chatId,
    isCheckingChatId,
    handleCheckChatId,
    handleChangeChatId,
    clearMessages,
    chatTitle,
    handleLogout,
    messages,
    draft,
    sending,
    handleInputMessage,
    handleSend,
  } = data;
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedSearchQuery = searchQuery.trim().toLocaleLowerCase();
  const filteredMessages = messages.filter((message) =>
    message.text.toLocaleLowerCase().includes(normalizedSearchQuery),
  );

  return (
    <div className="chat-layout">
      <aside className="sidebar">
        <div className="sidebar__title">MAX Messenger</div>

        <div className="sidebar__section">
          <label className="sidebar__label">ID Instance</label>
          <div className="sidebar__value">{auth.idInstance}</div>
        </div>

        <ChatIdControl
          chatId={chatId}
          isValid={isValidChatId(chatId)}
          canCheck={Boolean(getChatPhoneNumber(chatId))}
          checking={isCheckingChatId}
          onChange={handleChangeChatId}
          onCheck={handleCheckChatId}
        />

        <Button
          type="primary"
          block
          onClick={clearMessages}
          className="sidebar__clear"
        >
          Очистить чат
        </Button>
      </aside>

      <main className="chat">
        <header className="chat-header">
          <div className="chat-header__info">
            <strong>{chatTitle}</strong>
            <small>{chatId || "Укажите chatId для отправки"}</small>
          </div>
          <Button onClick={handleLogout}>Сменить аккаунт</Button>
        </header>

        <MessageSearch value={searchQuery} onChange={setSearchQuery} />
        <MessageList
          messages={filteredMessages}
          emptyMessage={
            normalizedSearchQuery
              ? "Совпадений не найдено"
              : "Сообщений пока нет"
          }
        />

        <MessageInput
          value={draft}
          loading={sending}
          onChange={(mess: string) => handleInputMessage(mess)}
          onSend={handleSend}
        />
      </main>
    </div>
  );
};

export default ChatLayout;
