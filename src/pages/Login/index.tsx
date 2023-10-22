import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
  Spinner
} from 'reactstrap';
import askloraLogoUrl from '../../assets/asklora_logo.svg';
import { loginAction } from '../../redux/action/userAction';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { InputField } from '../../types/user_types';
import './styles.scss';

const Login: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.user);
  const [email, setEmail] = useState<InputField>({
    value: '',
    error: ''
  });
  const [password, setPassword] = useState<InputField>({
    value: '',
    error: ''
  });
  const [visible, setVisible] = useState<boolean>(false);

  const handleLogin = async e => {
    e.preventDefault();
    const user = {
      email: email.value,
      password: password.value
    };
    const response: any = await dispatch(loginAction(user));
    if (response?.type == 'login/fulfilled') {
      navigate(`/`);
    }
  };
  const isFormValid = () => (email.value && password.value ? true : false);
  return (
    <Container id='login'>
      <Row className='form-container'>
        <img
          src={askloraLogoUrl}
          height={200}
          alt='asklora logo'
          className='mb-1 align-self-center'
        />
        <Col sm={7} md={7} lg={4} xl={4} xxl={3}>
          <Form onSubmit={e => handleLogin(e)}>
            <FormGroup>
              <Label>Email</Label>
              <Input
                id='email'
                name='email'
                placeholder='Input email'
                type='email'
                value={email.value}
                onChange={e => setEmail({ ...email, value: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <InputGroup>
                <Input
                  id='password'
                  name='password'
                  placeholder='Input password'
                  type={visible ? 'text' : 'password'}
                  className='input-password'
                  value={password.value}
                  onChange={e =>
                    setPassword({ ...password, value: e.target.value })
                  }
                />
                <InputGroupText
                  className='input-group-password'
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? (
                    <AiOutlineEye size={20} />
                  ) : (
                    <AiOutlineEyeInvisible size={20} />
                  )}
                </InputGroupText>
              </InputGroup>
              {error.source === 'login/rejected' && (
                <p className='error-message pt-3'>{error.message}</p>
              )}
              <div className='d-grid pt-5'>
                <Button
                  className='btn-custom'
                  type='submit'
                  disabled={
                    (loading.source === 'login/pending' && loading.status) ||
                    !isFormValid()
                  }
                  onClick={e => handleLogin(e)}
                >
                  {loading.source === 'login/pending' && loading.status ? (
                    <Spinner size='sm'>Loading...</Spinner>
                  ) : (
                    'Login'
                  )}
                </Button>
              </div>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <p
        style={{
          color: 'grey',
          textAlign: 'center',
          fontSize: '12px',
          marginTop: '40px'
        }}
      >
        Version {process.env.REACT_APP_VERSION} {process.env.REACT_APP_ENV}
      </p>
    </Container>
  );
};

export default Login;
