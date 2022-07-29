import { FormEvent, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { sendMessageInChat } from "../../helpers/messages";

function MessageForm({ chatId }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessageInChat(message, chatId);
    setMessage("");
  };

  return (
    <form
      className='flex items-center pt-4 border-t-2 border-text border-opacity-10'
      onSubmit={handleSubmit}
    >
      <textarea
        className='p-2 flex-1 bg-transparent placeholder:text-sm placeholder:italic text-base'
        name='message'
        placeholder='Start typing...'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button
        type='submit'
        className='p-3 rounded-full bg-primary text-light ml-4'
      >
        <FaPaperPlane />
      </button>
    </form>
  );
}

export default MessageForm;
