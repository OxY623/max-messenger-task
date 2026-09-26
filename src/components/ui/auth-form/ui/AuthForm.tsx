import { Button, Card, Form, Input } from "antd";

interface AuthFormProps {
  onSubmit: (values: { idInstance: string; apiTokenInstance: string }) => void;
}

export function AuthForm({ onSubmit }: AuthFormProps) {
  return (
    <Card title="MAX Messenger" style={{ width: 420 }}>
      <Form layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label="ID Instance"
          name="idInstance"
          rules={[
            {
              required: true,
              message: "Введите ID Instance",
            },
            {
              pattern: /^\d{5,12}$/,
              message: "ID Instance должен содержать 5–12 цифр",
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
              message: "Введите API Token",
            },
            {
              validator: async (_, value) => {
                if (!value || value.length < 30 || value.length > 60) {
                  return Promise.reject(
                    new Error("Токен должен быть 30–60 символов"),
                  );
                }
                if (!/^[a-zA-Z0-9]+$/.test(value)) {
                  return Promise.reject(
                    new Error("Токен может содержать только буквы и цифры"),
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Подключиться
        </Button>
      </Form>
    </Card>
  );
}
