import { Button, Input } from "antd";
import type { IData } from "../../../../types";
import { MessageInput } from "../../../features/message-input";
import { MessageList } from "../../../ui/message-list";

type Props = {
  data: IData;
};

const ChatLayout = ({ data }: Props) => {
  const {
    auth,
    chatId,
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
  return (
    <div className="chat-layout">
      <aside className="sidebar">
        <div className="sidebar__title">MAX Messenger</div>

        <div className="sidebar__section">
          <label className="sidebar__label">ID Instance</label>
          <div className="sidebar__value">{auth.idInstance}</div>
        </div>

        <div className="sidebar__section">
          <label className="sidebar__label">Chat ID</label>
          <Input
            value={chatId}
            onChange={(e) => handleChangeChatId(e)}
            placeholder="380123456789@c.us"
          />
        </div>

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

        <MessageList messages={messages} />

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
