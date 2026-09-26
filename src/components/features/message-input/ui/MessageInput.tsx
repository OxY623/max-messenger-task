import { Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';

interface MessageInputProps {
  value: string;
  loading?: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
}

export function MessageInput({
  value,
  loading,
  onChange,
  onSend,
}: MessageInputProps) {
  return (
    <div className="message-input">
      <Input.TextArea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        onPressEnter={(event) => {
          if (!event.shiftKey) {
            event.preventDefault();
            onSend();
          }
        }}
        placeholder="Напишите сообщение..."
        autoSize={{
          minRows: 1,
          maxRows: 5,
        }}
      />

      <Button
        type="primary"
        icon={<SendOutlined />}
        loading={loading}
        onClick={onSend}
      />
    </div>
  );
}