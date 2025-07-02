
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";
import chatimg from "../../../../assets/images/avathar.png";

type Props = {
  userId: string;
};

export const ChatWindow: React.FC<Props> = ({ userId }) => {
  const { data: users } = useSelector((state: RootState) => state.complaints);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return <div className="h-full flex items-center justify-center">Select a user</div>;
  }

  return (
    <div className="flex flex-col h-full bg-[url('/assets/whatsapp-bg.png')] bg-cover">
      {/* Header */}
      <div className="flex items-center p-5 pb-3 border-b dark:bg-gray-900 bg-white/90">
        <img src={chatimg || user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3 border" />
        <span className="font-semibold dark:text-gray-300 text-lg">{user.name || "Anonimus"}</span>
      </div>

      {/* Complaint message */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-center mb-2">
          <span className="bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded-full text-xs font-bold text-gray-500">
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-start mb-3">
          <img src={chatimg || user.avatar} alt={user.name} className="w-8 h-8 rounded-full mr-3 self-start" />
          <div>
            <div
              className="rounded-xl dark:bg-gray-900 dark:border-gray-700 border bg-white px-5 py-3 shadow max-w-xs
              transition duration-200 hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="text-gray-700 dark:text-gray-300 text-sm">
                {user.complaints || "No complaint message"}
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-1 ml-1">
              {new Date(user.createdAt).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
