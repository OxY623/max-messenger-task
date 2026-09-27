import { Input } from "antd";

interface MessageSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function MessageSearch({ value, onChange }: MessageSearchProps) {
  return (
    <div className="message-search">
      <Input.Search
        allowClear
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Поиск по сообщениям"
      />
    </div>
  );
}
