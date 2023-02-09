import React, { useState } from 'react';
import {
  TextField,
  Button,
  makeStyles,
  Theme,
  createStyles,
  Container,
  Typography
} from '@material-ui/core';
import { useNavigate, useLocation } from 'react-router-dom';
import './Auth.css'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    button: {
      margin: theme.spacing(1),
     
    },
  })
);

const Auth = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    React.useEffect(() => {
      const user = localStorage.getItem('user');
      if (!user && location.pathname === '/second-page') {
        setError('Please enter your details on the first page before accessing the second page');
        navigate('/first-page');
      }
    }, [location, navigate]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!name || !phone || !email) {
        setError('All fields are required');
        return;
      }
      setError('');
      const user = { name, phone, email };
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/second-page');
    };
    
  return (
    <Container className={classes.container}>
      <Typography variant="h5">
        User Form
      </Typography>
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
      <form className='form' onSubmit={handleSubmit}>
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          value={name}
          onChange={(event) => setName(event.target.value)}
          margin="normal"
          required
        />
        <TextField
          id="phone"
          label="Phone Number"
          className={classes.textField}
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          margin="normal"
          required
        />
        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
    </Container>
  )
}

export default Auth
