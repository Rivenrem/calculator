import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 4.5rem);
  grid-template-rows: repeat(6, 4.5rem);
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 4rem;
  background-color: var(--dark-blue);
`;

export const ButtonStyled = styled.button`
  font-size: x-large;
  border-radius: 10rem;
  background-color: var(--blue);
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
