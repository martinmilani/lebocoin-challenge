import api from "../../api";

import ConversationClientPage from "./client";

type Props = {
  params: {
    conversation: number;
  };
};

const ConversationPage = async ({params: {conversation}}: Props) => {
  const messages = await api.messages.list(conversation);
  const user = await api.user.fetch();

  return <ConversationClientPage conversation={conversation} messages={messages} user={user} />;
};

export default ConversationPage;
