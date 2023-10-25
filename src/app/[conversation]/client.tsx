"use client";
import type {Message} from "../../types/message";

import useSWR from "swr";
import {useState} from "react";

type Props = {
  user: number;
  messages: Message[];
  conversation: number;
};

const fetcher = (url: RequestInfo | URL, options: RequestInit) =>
  fetch(url, options).then((res) => res.json());

const ConversationClientPage = ({messages: initialMessages, user, conversation}: Props) => {
  const [message, setMessage] = useState<string>("");
  const {data: messages} = useSWR(`http://localhost:3005/messages/${conversation}`, fetcher, {
    refreshInterval: 5000,
    fallbackData: initialMessages,
  });

  async function handleSubmit() {
    await fetch(`http://localhost:3005/messages/${conversation}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: message,
        authorId: user,
        conversationId: conversation,
        timestamp: 0,
      }),
    });
  }

  return (
    <form
      style={{height: "100vh", display: "flex", flexDirection: "column", padding: "5%"}}
      onSubmit={handleSubmit}
    >
      <ul style={{display: "flex", flex: 1, flexDirection: "column", gap: 24}}>
        {messages.map(({id, body, authorId}) => {
          const isSender = user === authorId;

          return (
            <li
              key={id}
              style={{
                alignSelf: isSender ? "flex-end" : "flex-start",
                padding: 12,
                width: "fit-content",
                maxWidth: "80%",
                borderRadius: 20,
                backgroundColor: isSender ? "dodgerblue" : "gainsboro",
                color: isSender ? "white" : "black",
              }}
            >
              {body}
            </li>
          );
        })}
      </ul>
      <div style={{display: "flex", height: 50, gap: 8}}>
        <input
          autoFocus
          style={{flex: 1, padding: "0 10px", borderRadius: 12, border: "1px solid gainsboro"}}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          style={{
            minWidth: 120,
            borderRadius: 12,
            border: "none",
            backgroundColor: "dodgerblue",
            color: "white",
            fontWeight: "bold",
          }}
          type="submit"
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default ConversationClientPage;
