import React, { useState } from 'react';
import create from './api-user';
import { Button, CardActions, makeStyles, Card, CardContent, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Link } from '@material-ui/core';

export default function Signup() {
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: ''
    });

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value});
    }

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }

        create(user).then((data) => {
            if (data.error) setValues({...values, error: data.error});
            setValues({...values, error: '', open:true});
        })
    }

    const useStyles = makeStyles(theme => ({
        card: {
            width: 600,
            margin: 'auto',
            marginTop: theme.spacing(5),
            justifyContent: 'center'
        },
        title: {
            padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
            color: theme.palette.openTitle
        },
        textField: {
            color: theme.palette.text,
            width: '100%'
        }
    }));

    const classes = useStyles();

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>
                        Sign Up
                    </Typography>
                    <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal"/>
                    <br/>
                    <TextField id="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/>
                    <br/>
                    <TextField id="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>
                    <br/>
                    {
                        values.error && (<Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>error</Icon>
                        {values.error}</Typography>)
                    }
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
                </CardActions>
            </Card>
            <Dialog open={values.open} disableBackdropClick={true}>
                <DialogTitle>New Account</DialogTitle>
                <DialogContent>
                    <DialogContentText>New account was created successfully</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to="/signin">
                        <Button color="primary" autoFocus="autoFocus" variant="contained">
                            Sign In
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    ) 
}