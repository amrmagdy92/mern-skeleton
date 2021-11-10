import React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import userAPI from './api-user';
import { Paper, List, ListItem, ListItemAvatar, Avatar, Typography, Link, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    }
}));

export default function Users() {

    const classes = useStyles();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        userAPI.list(signal).then((data) => {
            if (data && data.error) {
                console.error(data.error);
            } else {
                setUsers(data);
            }
        });
        return function cleanup() {
            abortController.abort()
        }
    }, []);

    const [users, setUsers] = useState([]);

    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                All Users
            </Typography>
            <List dense>
                {users.map((item, i) => {
                    return (
                        <Link to={`/user/${item._id}`} key={i}>
                            <ListItem button>
                                <ListItemAvatar>
                                    <Avatar>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.name}/>
                                <ListItemSecondaryAction>
                                    <IconButton>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Link>
                    )
                })}
            </List>
        </Paper>
    )
}