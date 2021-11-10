import React from 'react';
import auth from './auth-helper';
import { Redirect } from 'react-router';
import { useState } from 'react';
import { makeStyles ,Card, CardContent, Typography, TextField, CardActions, Button } from '@material-ui/core';

export default function signin(props) {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        redirectToReferrer: false
    });

    const handleChange = name => event => {
        setValues({...values, [email]: event.target.value, [password]: event.target.value});
    }

    const clickSubmit = () => {
        const user = {
            email: values.email || undefined,
            password: values.password || undefined
        }

        signin(user).then((data) => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                auth.authenticate(data, () => {
                    setValues({...values, error: '', redirectToReferrer: true});
                });
            }
        });
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

    const {from} = props.location.state || {
        from: {
            pathname: '/'
        }
    }

    const {redirectToReferrer} = values;
    if (redirectToReferrer) {
        return (<Redirect to={from}/>)
    }

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>
                        Signin
                    </Typography>
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
        </div>
    )
}