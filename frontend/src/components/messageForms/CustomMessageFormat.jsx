import { MessageForm } from 'chat-engine';

function CustomMessageForm(props) {
  return (
    <MessageForm
      {...props}
      attachments={false}
    />
  );
}
