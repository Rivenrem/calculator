import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 5rem);
  grid-template-rows: repeat(6, 5rem);
  gap: 0.5rem;
  padding: 1rem;
  background-color: #1a1a2e;
  max-width: 28rem;
  border-radius: 4rem;
`;

export const ButtonStyled = styled.button`
  background-color: #4b72a1;
  border-radius: 10rem;
  font-size: x-large;
  :active {
    background-color: #e94560;
  }

  &.operands {
    background-color: #9f9090;
    :active {
      background-color: #e94560;
    }
  }
  &.red {
    background-color: #e94560;
  }
  &.equal {
    grid-column: span 2;
  }
`;
