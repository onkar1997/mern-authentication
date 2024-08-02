import {Navbar, Nav, Container, NavDropdown, Badge} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SiConsul } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import {toast} from 'react-toastify';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { removeCredentials } from '../slices/authSlice';

const Header = () => {

  const {userInfo} = useSelector((state) => state.auth);

  const [logout, {isLoading}] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async (e) => {
    e.preventDefault();

    try {
      await logout().unwrap();
      dispatch(removeCredentials());
      navigate('/');
    }
    catch(err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <Navbar variant='dark' bg='dark' expand='lg' collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand><SiConsul /> MERN AUTH</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <FaUser /> Register
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <LuLogIn /> Login
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
              
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header