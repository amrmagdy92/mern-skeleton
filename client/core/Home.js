import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import profilePicture from '../assets/images/profile.jpeg';

const useStyles = makeStyles(theme => ({
    card: {
        width: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    media: {
        minHeight: 400
    }
}));

export default function Home() {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <Typography variant="h6" className={classes.title}>
                Home Page
            </Typography>
            <CardMedia className={classes.media} image={profilePicture} title="Profile Picture"/>
            <CardContent>
                <Typography variant="body2" component="p">
                    Welcome to MERN Skeleton Home Page.
                </Typography>
            </CardContent>
        </Card>
    )
}