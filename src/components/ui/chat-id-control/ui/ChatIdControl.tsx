import { Button, Input } from "antd";

interface ChatIdControlProps {
  chatId: string;
  isValid: boolean;
  canCheck: boolean;
  checking: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => void;
  onCheck: () => void;
}

export function ChatIdControl({
  chatId,
  isValid,
  canCheck,
  checking,
  onChange,
  onCheck,
}: ChatIdControlProps) {
  return (
    <div className="sidebar__section">
      <label className="sidebar__label" htmlFor="chat-id">
        Chat ID
      </label>
      <Input
        id="chat-id"
        status={chatId && !isValid ? "error" : undefined}
        value={chatId}
        onChange={onChange}
        placeholder="380123456789@c.us"
        aria-describedby="chat-id-hint"
      />
      <small id="chat-id-hint" className="chat-id-control__hint">
        {chatId && !isValid
          ? "Формат: номер@c.us или ID группы@g.us"
          : isValid && !canCheck
            ? "Проверка аккаунта доступна для личных чатов @c.us"
            : "Номер@c.us или ID группы@g.us"}
      </small>
      <Button
        block
        disabled={!isValid || !canCheck}
        loading={checking}
        onClick={onCheck}
        className="chat-id-control__check"
      >
        Проверить номер
      </Button>
    </div>
  );
}
