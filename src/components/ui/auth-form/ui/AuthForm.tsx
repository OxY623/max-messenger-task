import { Button, Card, Form, Input } from 'antd';

interface AuthFormProps {
  onSubmit: (values: {
    idInstance: string;
    apiTokenInstance: string;
  }) => void;
}

export function AuthForm({ onSubmit }: AuthFormProps) {
  return (
    <Card
      title="MAX Messenger"
      style={{ width: 420 }}
    >
      <Form
        layout="vertical"
        onFinish={onSubmit}
      >
        <Form.Item
          label="ID Instance"
          name="idInstance"
          rules={[
            {
              required: true,
              message: 'Введите ID Instance',
            },
          ]}
        >
          <Input placeholder="3100000000" />
        </Form.Item>

        <Form.Item
          label="API Token"
          name="apiTokenInstance"
          rules={[
            {
              required: true,
              message: 'Введите API Token',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
        >
          Подключиться
        </Button>
      </Form>
    </Card>
  );
}