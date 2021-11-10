import React, { useState } from 'react';
import { Redirect } from 'react-router';
import auth from '../auth/auth-helper';
import { update } from './api-user';
import { Card, CardActions, CardContent, Dialog, DialogTitle, ListItemSecondaryAction, makeStyles, TextField, Typography } from '@material-ui/core';

export default function EditProfile({ match }) {
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: '',
        redirectToProfile: false,
        userID: ''
    });

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value});
    }

    const clickSubmit = () => {
        const jwt = auth.isAuthenticated()
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }
        update(
            {userID: match.params.userID },
            { t: jwt.token },
            user).then((data) => {
            if (data && data.error) {
              setValues({...values, error: data.error})
            } else {
              setValues({...values, userID: data._id, redirectToProfile: true})
            }
        });
        if (values.redirectToProfile) {
            return (<Redirect to={`/user/${values.userID}`}/>);
        }
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
                        Edit Profile
                    </Typography>
                    <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal"/>
                    <br/>
                    <TextField id="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/>
                    <br/>
                    <TextField id="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>
                    <br/>
                </CardContent>
                <CardActions>
                    <Button clor="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
                </CardActions>
            </Card>
        </div>
    )
}