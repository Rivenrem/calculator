import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0.5rem 2rem 0.5rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CalcContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
