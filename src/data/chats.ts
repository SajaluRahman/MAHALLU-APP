export type Message = {
  id: string;
  userId: string;
  text: string;
  time: string;
  date: string;
  fromMe?: boolean;
};

export type ChatPreview = {
  userId: string;
  lastMessageTime: string;
  unreadCount: number;
  previewText: string;
  dateLabel: string;
};

export const chatPreviews: ChatPreview[] = [
  { userId: "1", lastMessageTime: "1:35 AM", unreadCount: 2, previewText: "HAMDAN SAD", dateLabel: "" },
  { userId: "2", lastMessageTime: "2:51 PM", unreadCount: 1, previewText: "ASHIQUE NS", dateLabel: "" },
  { userId: "4", lastMessageTime: "YESTERDAY", unreadCount: 3, previewText: "RASHID", dateLabel: "YESTERDAY" },
  { userId: "5", lastMessageTime: "YESTERDAY", unreadCount: 2, previewText: "SAJINA", dateLabel: "YESTERDAY" },
  { userId: "3", lastMessageTime: "24-04-2025", unreadCount: 2, previewText: "KADHAR", dateLabel: "24-04-2025" }
];

export const messages: Message[] = [
  // HAMDAN SAD
  {
    id: "m1",
    userId: "1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "2:34 PM",
    date: "YESTERDAY"
  },
  {
    id: "m2",
    userId: "1",
    text: "Hi, I have a complaint about the payment process.",
    time: "2:36 PM",
    date: "YESTERDAY"
  },
  {
    id: "m3",
    userId: "1",
    text: "Sure, can you provide more details?",
    time: "2:37 PM",
    date: "YESTERDAY",
    fromMe: true
  },
  {
    id: "m4",
    userId: "1",
    text: "The payment failed but the amount was debited.",
    time: "2:39 PM",
    date: "YESTERDAY"
  },
  {
    id: "m5",
    userId: "1",
    text: "We're checking this for you.",
    time: "2:40 PM",
    date: "YESTERDAY",
    fromMe: true
  },
  {
    id: "m6",
    userId: "1",
    text: "Thank you.",
    time: "1:35 AM",
    date: "TODAY"
  },

  // ASHIQUE NS
  {
    id: "m7",
    userId: "2",
    text: "The app is not loading my recent transactions.",
    time: "2:51 PM",
    date: "YESTERDAY"
  },
  {
    id: "m8",
    userId: "2",
    text: "Can you please check your internet connection?",
    time: "2:53 PM",
    date: "YESTERDAY",
    fromMe: true
  },
  {
    id: "m9",
    userId: "2",
    text: "It works now, thanks!",
    time: "3:00 PM",
    date: "YESTERDAY"
  },

  // RASHID (random)
  {
    id: "m10",
    userId: "4",
    text: "I want to update my profile picture but I can't find the option.",
    time: "3:15 PM",
    date: "YESTERDAY"
  },
  {
    id: "m11",
    userId: "4",
    text: "Please go to Settings > Profile to update your picture.",
    time: "3:20 PM",
    date: "YESTERDAY",
    fromMe: true
  },
  {
    id: "m12",
    userId: "4",
    text: "Got it, thank you!",
    time: "3:25 PM",
    date: "YESTERDAY"
  },

  // SAJINA (random)
  {
    id: "m13",
    userId: "5",
    text: "My account is locked after too many login attempts.",
    time: "10:10 AM",
    date: "YESTERDAY"
  },
  {
    id: "m14",
    userId: "5",
    text: "We have reset your account. Please try logging in again.",
    time: "10:20 AM",
    date: "YESTERDAY",
    fromMe: true
  },
  {
    id: "m15",
    userId: "5",
    text: "It works now, thank you so much.",
    time: "10:30 AM",
    date: "YESTERDAY"
  },

  // KADHAR (random)
  {
    id: "m16",
    userId: "3",
    text: "When will the next bill be generated?",
    time: "09:00 AM",
    date: "24-04-2025"
  },
  {
    id: "m17",
    userId: "3",
    text: "The next bill will be generated on the 1st of next month.",
    time: "09:05 AM",
    date: "24-04-2025",
    fromMe: true
  }
];