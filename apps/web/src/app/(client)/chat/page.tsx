import { ChatInterface } from "@/components/chat/chat-interface";

export const metadata = {
  title: "AI Assistant - Support Forge",
  description: "Get instant help from the Support Forge AI assistant",
};

export default function ChatPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <ChatInterface />
    </div>
  );
}
