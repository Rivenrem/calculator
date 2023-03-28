import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 3rem;
`;

export const Header = styled.h2`
  font-size: x-large;
  color: var(--red);
`;

export const Select = styled.select`
  padding: 1rem;
  border-radius: 2rem;
  background-color: var(--gray);
`;

export const Theme = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const Button = styled.button`
  padding: 0.5rem;
  border: 2px solid black;
  border-radius: 2rem;
  background-color: var(--red);
  :active {
    background-color: color: var(--black);
  }
`;
