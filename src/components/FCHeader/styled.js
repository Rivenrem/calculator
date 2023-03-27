import { NavLink as ActiveLink } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--gray);
  padding: 1rem;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: var(--red);
`;

export const Navigation = styled.nav`
  display: flex;
  gap: 1rem;
`;

export const Link = styled(ActiveLink)`
  color: var(--black);
  &.active {
    color: var(--red);
    text-decoration: underline;
  }
`;
