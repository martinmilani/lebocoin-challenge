import Link from "next/link";

import api from "../api";

const HomePage = async () => {
  const user = await api.user.fetch();
  const conversations = await api.conversation.list(user);

  return (
    <main>
      <ul style={{display: "flex", flexDirection: "column", gap: 24, padding: "5%"}}>
        {conversations.map(
          ({id, senderId, recipientNickname, senderNickname, lastMessageTimestamp}) => (
            <li
              key={id}
              style={{
                display: "flex",
                flexDirection: "row",
                padding: 12,
                border: "1px solid gainsboro",
                borderRadius: 12,
              }}
            >
              <div
                style={{height: 50, width: 50, backgroundColor: "gainsboro", borderRadius: 50}}
              />
              <div style={{marginLeft: 12}}>
                <Link href={`/${id}`} style={{fontSize: 20, fontWeight: "bold"}}>
                  {user === senderId ? recipientNickname : senderNickname}
                </Link>
                <p suppressHydrationWarning={true}>
                  {new Date(Date.now() - lastMessageTimestamp).toLocaleString("es-AR", {
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </li>
          ),
        )}
      </ul>
    </main>
  );
};

export default HomePage;
