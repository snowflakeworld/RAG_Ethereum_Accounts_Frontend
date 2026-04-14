import { useState, useCallback } from "react";
import { generateAnswer } from "../apis";

type UserType = "user" | "rag";

type Message = {
  text: string;
  sender: UserType;
};

export const Main: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = useCallback(async () => {
    if (isLoading || !input.trim()) return;

    try {
      const newMessages = [
        { text: input, sender: "user" as UserType },
        ...messages,
      ];
      setMessages(newMessages);
      setIsLoading(true);
      setInput("");
      const response = await generateAnswer({ prompt: input });
      setMessages([
        { text: response.data.message, sender: "rag" as UserType },
        ...newMessages,
      ]);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, input, messages]);

  return (
    <main
      className="flex flex-col flex-1"
      style={{ maxHeight: "calc(100vh - 65px)" }}
    >
      <div className="container h-full">
        <div className="flex flex-1 flex-col-reverse overflow-y-auto no-scrollbar p-4 gap-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <span
                className={`p-2 md:p-4 rounded-lg max-w-xs md:max-w-2xl lg:max-w-3xl inline-block whitespace-pre-wrap break-words text-lg ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-100"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <div className="flex p-4 space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 p-4 rounded-lg bg-gray-800 text-white focus:outline-none"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSendMessage}
            className="p-4 bg-blue-500 text-white rounded-lg min-w-20 flex justify-center items-center"
          >
            {isLoading ? (
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </main>
  );
};
