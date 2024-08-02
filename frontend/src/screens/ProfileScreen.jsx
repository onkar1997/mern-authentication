import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { setCredentials } from '../slices/authSlice';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const ProfileScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    const [updateUser, {isLoading}] = useUpdateUserMutation();

    useEffect(() => {
        if(userInfo) {
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    }, [setName, setEmail])

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if(password !== confirmPassword) {
            toast.error("Passwords do not match !")
        }
        else {
            try {
                const res = await updateUser({ 
                    _id: userInfo._id,
                    name, 
                    email, 
                    password 
                }).unwrap();
                dispatch(setCredentials({...res}));
                navigate('/');
                toast.success("User Profile updated successfully.")
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

  return (
    <FormContainer>
        <h2>Update Profile</h2>
        <hr />

        <Form onSubmit={submitHandler}>
            <Form.Group className='my-2'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            {isLoading && <Loader />}

            <Button className='my-2' type='submit' variant='primary'>Update</Button>
            <LinkContainer to='/' className='w-0 ms-2'>
                <Button variant="secondary">Back</Button>
            </LinkContainer>
            
        </Form>
    </FormContainer>
  )
}

export default ProfileScreen;