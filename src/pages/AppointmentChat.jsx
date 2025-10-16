export const AppointmentChat = () => {
  const messages = [
    {
      id: 1,
      sender: "other",
      text: "Next to be, just a bit busy. How about you?",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "me",
      text: "I'm good, thanks. Anything exciting happening?",
      time: "10:31 AM",
    },
    {
      id: 3,
      sender: "other",
      text: "Not really, just the usual. Work and errands.",
      time: "10:32 AM",
    },
    {
      id: 4,
      sender: "me",
      text: "Remote like a typical day. Got any plain for the weekend?",
      time: "10:33 AM",
    },
    {
      id: 5,
      sender: "other",
      text: "Now yet, I'm hoping to relax and maybe come up on your reading. How about you?",
      time: "10:34 AM",
    },
    {
      id: 6,
      sender: "me",
      text: "I sight go hiking if the summer is nice. Otherwise, just taking it back.",
      time: "10:35 AM",
    },
    {
      id: 7,
      sender: "other",
      text: "Walking sounds fun. Move the weather cooperation for you!",
      time: "10:36 AM",
    },
    {
      id: 8,
      sender: "me",
      text: "Thanks! Plugers crossed. Enjoy your day!",
      time: "10:37 AM",
    },
    { id: 9, sender: "other", text: "You too, take care!", time: "10:38 AM" },
    { id: 10, sender: "me", text: "Sure Thanks", time: "10:39 AM" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md">
        {/* Chat Header */}
        <div className="bg-blue-500 text-white p-4 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center">
              <span className="font-semibold">U</span>
            </div>
            <div>
              <h2 className="font-semibold">Usuario</h2>
              <p className="text-blue-100 text-sm">En línea</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.sender === "me"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "me" ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600 transition-colors">
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
      </div>
    </div>
  );
};
