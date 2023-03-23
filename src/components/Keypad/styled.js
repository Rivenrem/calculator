import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 5rem);
  grid-template-rows: repeat(6, 5rem);
  gap: 0.5rem;
  padding: 1rem;
  background-color: var(--dark-blue);
  max-width: 28rem;
  border-radius: 4rem;
`;

export const ButtonStyled = styled.button`
  background-color: var(--blue);
  border-radius: 10rem;
  font-size: x-large;
  :active {
    background-color: var(--red);
  }

  &.operands {
    background-color: var(--brown);
    :active {
      background-color: var(--red);
    }
  }
  &.red {
    background-color: var(--red);
  }
  &.equal {
    grid-column: span 2;
  }
`;
