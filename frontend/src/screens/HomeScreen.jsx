import {Container, Card, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

const HomeScreen = () => {

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Container className='text-center'>
        <Card className='py-3'>
            <Card.Body>
                <Card.Title><h2>MERN AUTHENTICATION</h2></Card.Title>
                <Card.Text>
                  An authentication web application using mern stack and redux toolkit.
                </Card.Text>
                <LinkContainer to='/register'>
                  <Button variant="danger" className='me-3'>Register</Button>
                </LinkContainer>
                <LinkContainer to='/login'>
                  <Button variant="success" disabled={userInfo ? true : false}>Login</Button>
                </LinkContainer>
            </Card.Body>
        </Card>
    </Container>
  )
}

export default HomeScreen