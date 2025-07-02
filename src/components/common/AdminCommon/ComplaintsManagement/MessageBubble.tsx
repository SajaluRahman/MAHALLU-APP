// MessageBubble.tsx
import React from "react";
import chatimg from "../../../../assets/images/avathar.png";

export type Message = {
  id: string;
  text: string;
  time: string;
};

export type User = {
  name: string;
  avatar?: string;
};

type Props = {
  message: Message;
  user: User;
};

export const MessageBubble: React.FC<Props> = ({ message, user }) => (
  <div className="flex items-end mb-3 group">
    <img src={chatimg || user.avatar} alt={user.name} className="w-8 h-8 rounded-full mr-3 self-start" />
    <div>
      <div
        className="rounded-xl dark:bg-gray-900 dark:border-gray-700 border bg-white px-5 py-3 shadow max-w-xs
        transition duration-200 group-hover:scale-[1.02] group-hover:shadow-lg"
      >
        <div className="text-gray-700 dark:text-gray-300 text-sm">{message.text}</div>
      </div>
      <div className="text-xs text-gray-400 mt-1 ml-1">{message.time}</div>
    </div>
  </div>
);

export default MessageBubble;