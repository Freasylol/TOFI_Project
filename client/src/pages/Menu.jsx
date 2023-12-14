import React from 'react';
import { Button, Typography, Box, makeStyles, Grid} from '@material-ui/core';
import { BrowserRouter as Router, NavLink, Switch, Route } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(1)
    },
    mainFeaturePost: {
        position: 'relative',
        color: theme.palette.common.white,
        margin: theme.spacing(4),

        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    mainFeaturePostContent: {
        position: 'relative',
        padding: theme.spacing(6),
        marginTop: theme.spacing(8),

        display: 'flex',
        flexDirection: 'column',
    },
}))

const Menu = () => {
    const classes = useStyles();

    return (
        <main>
            <Grid container direction="column" md={3}>
                <div className={classes.mainFeaturePostContent}>
                        <NavLink to="/">
                            <Button>
                                Main
                            </Button>
                        </NavLink>

                        <NavLink to="/admin">
                            <Button>
                                Admin
                            </Button>
                        </NavLink>  
                </div>      
            </Grid>
        </main>
    )
}

export default Menu;
    