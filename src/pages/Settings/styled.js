import styled from "styled-components";

export const Header = styled.h2`
  font-size: x-large;
  color: var(--red);
`;

export const Select = styled.select`
  background-color: var(--gray);
  padding: 1rem;
  border-radius: 2rem;
`;

export const Theme = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

export const Button = styled.button`
  padding: 0.5rem;
  background-color: var(--red);
  border: 2px solid black;
  border-radius: 2rem;
`;
