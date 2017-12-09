import {h, Component} from 'preact';
import {Link} from 'preact-router/match';
import styled from 'styled-components';
import style from './style';

const Head = styled.header `
width: 100%;
height: 56px;
padding: 0;
background: none;
z-index: 50;
`;

const Wrapper = styled.div `
	max-width: 900px;
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const Title = styled.h1 `
float: left;
margin: 0;
font-size: 24px;
line-height: 56px;
font-weight: 400;
color: #444;
`;

const Nav = styled.nav `
font-size: 100%;
`;

const NavItem = styled(Link)`
font-family: sans-serif;
display: inline-block;
height: 56px;
line-height: 56px;
padding: 0 15px;
min-width: 50px;
text-align: center;
background: rgba(255,255,255,0);
text-decoration: none;
color: #444;
will-change: background-color;
`;





export default class Header extends Component {
  render() {
    return (
      <Head>
        <Wrapper>
          <Title>Book.</Title>
          <Nav>
            <NavItem activeClassName={style.active} href="/">Home</NavItem>
            <NavItem activeClassName={style.active} href="/profile">Me</NavItem>
            <NavItem activeClassName={style.active} href="/profile/john">John</NavItem>
          </Nav>
        </Wrapper>
      </Head>
    );
  }
}
