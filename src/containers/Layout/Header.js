import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {
    Grid,
    Typography
} from '@material-ui/core';
import Logo from '../../assets/logo.png';

const useStyles = makeStyles((theme) => ({
    img: {
        height: '3.25rem',
        paddingTop: '5px',
    },
    header: {
        backgroundColor: '#fff',
        boxShadow: '0 1px 15px 1px rgba(69, 65, 78, 0.1)',
        zIndex: theme.zIndex.drawer + 1
    },
    root: {
        display: 'flex',
    }
}));

export default function Header(props) {
    const classes = useStyles();
    const { totalBalance } = props;

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.header}>
                <Toolbar className='header'>
                    <Grid className='header-wrapper' item xs={6}>
                        <img src={Logo} alt='' className={classes.img} />
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant='subtitle1' color='primary' className="amount-text" align='right'>
                            Balance: ₹ {totalBalance}
                        </Typography>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}