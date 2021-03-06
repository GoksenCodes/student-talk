import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Message from "../components/Message";
import axios from "axios";
import useSlackApi from "../lib/useSlackApi";

export default function ConversationThread() {
  const { channel = "" } = useParams();
  const history = useSlackApi("conversations.list?exclude_archived=true");

  // const [history, setHistory] = useState({ status: "loading" });

  // useEffect(() => {
  //   async function fetchData() {
  //     setHistory({ status: "loading" });
  //     try {
  //       const res = await axios.get(
  //         "https://slack.com/api/conversations.history?channel=" +
  //           encodeURIComponent(channel) +
  //           "&token=" +
  //           process.env.REACT_APP_SLACK_TOKEN
  //       );
  //       if (!res.data.ok) {
  //         // it turns out that Slack gives back errors
  //         //  with a 200 status code, so this is necessary
  //         throw new Error(res.data.error);
  //       }
  //       setHistory({ status: "success", data: res.data });
  //     } catch (error) {
  //       setHistory({ status: "error", error });
  //     }
  //   }

  //   fetchData();
  // }, [setHistory, channel]);
  // //we've added the channel variable (the route parameter) to the dependency list of the effect hook. This is because we want the effect to re-run every time it changes

  return (
    <Container>
      <p>Channel: #{channel}</p>
      {history.status === "loading" && <p>Loading...</p>}
      {history.status === "success" &&
        history.data.messages.map(message => {
          return (
            <Message
              text={message.text}
              sender="(Unknown)"
              sentAt={message.ts}
            />
          );
        })}
    </Container>
  );
}

const Container = styled.div`
  flex: 1 0 auto;
  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
