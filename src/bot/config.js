import { createChatBotMessage } from 'react-chatbot-kit';

const botName = 'Nishant BOT';

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#d10000',
    },
    chatButton: {
      backgroundColor: '#8f1b1b',
    },
  },
};

export default config;
