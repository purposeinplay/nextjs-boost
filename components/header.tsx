import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Root = styled.div``;

const Navigation = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
`;

const NavigationItem = styled.li`
  padding: 5px;
`;

const Header = () => (
  <Root>
    <Navigation>
      <NavigationItem>
        <Link href="/">
          <a>Home</a>
        </Link>
      </NavigationItem>

      <NavigationItem>
        <Link href="/about">
          <a>About</a>
        </Link>
      </NavigationItem>
    </Navigation>
  </Root>
);

export default Header;
