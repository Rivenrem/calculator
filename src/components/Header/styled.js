import { NavLink as ActiveLink } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.header`
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #afafb3;
  padding: 1rem;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #e94560;
`;

export const Navigation = styled.nav`
  display: flex;
  gap: 1rem;
`;

export const Link = styled(ActiveLink)`
  color: #1a1a2e;
  &.active {
    color: #e94560;
    text-decoration: underline;
  }
`;
