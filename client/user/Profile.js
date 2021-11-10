import React, { useEffect, useState } from 'react';
import auth from '../auth/auth-helper'
import { read } from './api-user';
import { Redirect } from 'react-router';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles ,Paper, Typography } from '@material-ui/core';
import { Edit, Person } from '@material-ui/icons';
import DeleteUser from './DeleteUser';

export default function Profile({ match }) {
    const [user, setUser] = useState({});
    const [redirectToSignin, setRedirectToSignin] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const jwt = auth.isAuthenticated();
        read(
            {userID: match.params.userID},
            {t: jwt.token},
            signal
        ).then((data) => {
            if (data && data.error) {
                setRedirectToSignin(true);
            } else {
                setUser(data);
            }
        });
        return function cleanup() {
            abortController.abort();
        }
    }, [match.params.userID]);

    if (redirectToSignin) {
        return <Redirect to='/signin'/>
    }

    const useStyles = makeStyles(theme => ({
        root: {},
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
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                Profile
            </Typography>
            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Person/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={user.email}/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText primary={`Joined: ${new Date(user.created).toDateString()}`}/>
                </ListItem>
            </List>
            {
            auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id && (
                <ListItemSecondaryAction>
                    <Link to={`/user/edit/${user._id}`}>
                        <IconButton aria-label="Edit" color="primary">
                            <Edit/>
                        </IconButton>
                    </Link>
                    <DeleteUser userID={user._id}/>
                </ListItemSecondaryAction>)
            }
        </Paper>
    );
}