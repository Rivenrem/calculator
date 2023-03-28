import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 18rem;
  height: 0rem;
  border-radius: 4rem;
  overflow: hidden;
  transition: height 0.5s ease-in-out;
  color: var(--black);
  background-color: var(--gray);

  &.open {
    padding: 1rem;
    height: 39rem;
  }
`;

export const HistoryItem = styled.div`
  padding: 0.5rem;
`;
