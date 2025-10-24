import { useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client/react";

import { RUN_AGENT } from "../services/services";
import { useForm } from "react-hook-form";

export const AppointmentChat = () => {
  const getLocalTime = () => {
    return new Date().toLocaleTimeString("es-CO", {
      hour12: true,
      timeStyle: "short",
    });
  };
  console.log("🎉 localTime", getLocalTime());

  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "system",
      text: "Hola. ¿En qué puedo ayudarte hoy? Puedo crear, reprogramar o cancelar citas",
      time: getLocalTime(),
    },
  ]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const [runAgent] = useMutation(RUN_AGENT);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSend = async (data) => {
    console.log("🎉 input", data.message);
    if (data.message == "") return;
    const newMessage = {
      sender: "user",
      text: data.message,
      time: getLocalTime(),
    };
    console.log("🎉 newMessage", newMessage);
    console.log("🎉 newMessage.text", newMessage.text);
    setMessages((prev) => [...prev, newMessage]);
    reset();
    console.log("🎉 messages", messages);
    try {
      const result = await runAgent({
        variables: { newMessage: newMessage.text },
      });
      console.log("result", result);
      const parseResult = JSON.parse(result.data.runAgent);
      console.log("🎉 parseResult", parseResult);
      const responseMessage = {
        sender: "system",
        text: parseResult.message,
        time: getLocalTime(),
      };
      console.log("🎉 responseMessage", responseMessage);
      setMessages((prev) => [...prev, responseMessage]);
    } catch (error) {
      console.log(`❌ Error runing agent: ${error}`);
    }
  };

  return (
    <div className="bg-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md">
        {/* Chat Header */}
        <div className="bg-blue-500 text-white p-4 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center">
              <span className="font-semibold">U</span>
            </div>
            <div>
              <h2 className="font-semibold">PeluBot</h2>
              <p className="text-blue-100 text-sm">En línea</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex white-space: pre-line ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "user"
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  {message.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSubmit(handleSend)}>
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("message", { required: true })}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
