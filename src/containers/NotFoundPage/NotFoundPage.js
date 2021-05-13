import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import PageNotFound from '../../assets/404.svg';
import Container from '@material-ui/core/Container';


const NotFoundPage = () => {
    return (
        <Container maxWidth="md" className='page-error_wrapper'>
            <Grid item className='page-error_grid'>
                <Grid item className='page-error_content'>
                    <h2 className='page-error_heading'>Page Not Found</h2>
                    <Typography variant='subtitle1' className='page-error_message'>
                        We can't find the page that you are looking for :(
                    </Typography>
                </Grid>

                <Grid item className='page-error-grid'>
                    <img src={PageNotFound} alt={PageNotFound} className='page-error-grid__img' />
                </Grid>
            </Grid>
        </Container>
    );
};

export default NotFoundPage;
