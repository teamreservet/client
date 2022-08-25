import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

import chat_bot from '../../assets/chat_bot.png';

import './chat-bot.styles.scss';

const steps = [
  {
    id: '1',
    message: 'What is your name?',
    trigger: '2'
  },
  {
    id: '2',
    user: true,
    trigger: '3'
  },
  {
    id: '3',
    message: 'Hi user, nice to meet you!',
    trigger: '4'
  },
  {
    id: '4',
    options: [
      { value: 1, label: 'How can I pay on the website?', trigger: '5' },
      {
        value: 2,
        label:
          'Which documents are needed at the time of booking and checking of tickets?',
        trigger: '6'
      },
      {
        value: 3,
        label:
          'My transaction got canceled during the booking of the ticket now what?',
        trigger: '7'
      }
    ]
  },
  {
    id: '5',
    message:
      'Hi user, you can easily pay on website using credit/debit card of any bank, or else UPI payments can used.',
    trigger: '4'
  },
  {
    id: '6',
    message:
      'Hi user,at the time of ticket booking you just need any of the ID Proofs such as Adhar Card,Passport,etc',
    trigger: '4'
  },
  {
    id: '7',
    message:
      'Hi user,if the amount has been deduced from your end and the ticket has not been booked then money will be refunded in next 2-3 working days',
    trigger: '4'
  }
];

// Creating our own theme
const theme = {
  background: '#ffff',
  headerBgColor: '#ffff',
  headerFontSize: '20px',
  botBubbleColor: '#296dff',
  headerFontColor: 'black',
  botFontColor: 'black',
  userBubbleColor: '#29cdff',
  userFontColor: 'black'
};

// Set some properties of the bot
const config = {
  botAvatar: chat_bot,
  floating: true
};

const Chatbot = () => {
  return (
    <div className='chatbot'>
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle='Reservet Chat support'
          steps={steps}
          {...config}
        />
      </ThemeProvider>
    </div>
  );
};

export default Chatbot;
