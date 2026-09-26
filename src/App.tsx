import "./App.css";
import { ChatLayout } from "./components/layout/chat-layout";
import { AuthForm } from "./components/ui/auth-form";
import { useChat } from "./hooks/useChat";
import type { IAuth, IData } from "./types";

const defaultAuth: IAuth = {
  idInstance: import.meta.env.VITE_ID_INSTANCE ?? "",
  apiTokenInstance: import.meta.env.VITE_API_TOKEN ?? "",
};

function App() {
  const [state, actions, contextHolder] = useChat(defaultAuth);

  const { connected, chatTitle, chatId, draft, messages, sending, auth } =
    state;
  const {
    handleAuthSubmit,
    handleSend,
    handleInputMessage,
    handleLogout,
    handleChangeChatId,
    clearMessages,
  } = actions;
  const data: IData = {
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
  };
  if (!connected) {
    return (
      <>
        {contextHolder}
        <div className="auth-screen">
          <AuthForm onSubmit={handleAuthSubmit} />
        </div>
      </>
    );
  }

  return (
    <>
      {contextHolder}
      <div className="app">
        <ChatLayout data={data} />
      </div>
    </>
  );
}

export default App;
