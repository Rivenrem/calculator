import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin-left: 2rem;
  width: 18rem;
  background-color: var(--gray);
  color: var(--black);
  border-radius: 4rem;
  height: 3rem;
  overflow: hidden;
  transition: height 0.5s ease-in-out;

  &.open {
    height: 36rem;
  }
  @media (max-width: 768px) {
    margin: 2rem 0 2rem 0;
  }
`;

export const HistoryItem = styled.div`
  padding: 1rem;
`;
