import { Avatar } from "antd";
import type { Message } from "../../../../types/";

interface MessageListProps {
  messages: Message[];
  emptyMessage?: string;
}

export function MessageList({
  messages,
  emptyMessage = "Сообщений пока нет",
}: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="message-list message-list--empty">{emptyMessage}</div>
    );
  }

  return (
    <div className="message-list">
      {messages.map((message) => (
        <div
          key={message.id}
          className={
            message.fromMe
              ? "message message--outgoing"
              : "message message--incoming"
          }
        >
          {!message.fromMe && <Avatar>M</Avatar>}

          <div className="message__bubble">
            {message.text}

            <span className="message__time">
              {new Date(message.timestamp * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
