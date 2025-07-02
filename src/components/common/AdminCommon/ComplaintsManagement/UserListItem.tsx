
import chatimg from "../../../../assets/images/avathar.png";

export type User = {
  id: string;
  name: string;
  avatar?: string;
};

export type ChatPreview = {
  userId: string;
  unreadCount: number;
  lastMessageTime: string;
};

type Props = {
  user: User ;
  chat: ChatPreview;
  selected: boolean;
  onClick: () => void;
};

export const UserListItem: React.FC<Props> = ({ user, chat, selected, onClick }) => (
  <button
    className={`flex items-center px-4 py-3 rounded-xl shadow dark:bg-gray-900 bg-white transition w-full mb-4
      ${selected ? "ring-2 ring-teal-400" : ""}
      hover:bg-gray-100 hover:shadow-lg hover:scale-[1.02] duration-200`}
    onClick={onClick}
  >
    <img src={chatimg || user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3 border" />
    <div className="flex-1 text-left">
      <div className="font-medium dark:text-gray-300 text-base">{user.name}</div>
      <div className="text-xs text-gray-400">{chat.lastMessageTime}</div>
    </div>
    <div className="flex flex-col items-center gap-2 ml-2">
      <span className="text-xs bg-teal-500 text-white rounded-full px-2 py-0.5 font-semibold">
        {chat.unreadCount}
      </span>
    </div>
  </button>
);

export default UserListItem;