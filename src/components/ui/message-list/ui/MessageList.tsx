import { Avatar } from "antd";
import type { Message } from "../../../../types/";

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
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
