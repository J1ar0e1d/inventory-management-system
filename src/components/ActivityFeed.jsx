import React from "react";
import styled from "styled-components";
import { useInventory } from "../store/InventoryContext";

const FeedContainer = styled.div`
  background: #02008cff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  max-height: 300px;
  overflow-y: auto;
`;

const Entry = styled.div`
  margin-bottom: 0.8rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #eee;
  font-size: 0.9rem;

  strong {
    color: #035a99ff;
  }

  span {
    display: block;
    font-size: 0.75rem;
    color: gray;
  }
`;

export default function ActivityFeed() {
  const { activityLog } = useInventory();

  if (!activityLog || activityLog.length === 0) {
    return <p>No recent activity.</p>;
  }

  return (
    <FeedContainer>
      {activityLog.map((entry) => (
        <Entry key={entry.id}>
          <div>
            <strong>{entry.message}</strong>
          </div>
          <span>{entry.timestamp}</span>
        </Entry>
      ))}
    </FeedContainer>
  );
}
