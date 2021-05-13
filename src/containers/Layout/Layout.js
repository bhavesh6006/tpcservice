import React, { Component } from 'react'
import Header from './Header';
import Footer from './Footer';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';

const style = {
    'maincontainerwrapper': {
        marginTop: '64px'
    }
};

class Layout extends Component { 
    render() {
        const { classes } = this.props;

        return(
            <React.Fragment>
                <Header
                    {...this.props}
                    history={this.props.history} 
                />
                <div className={classes.maincontainerwrapper}>
                    {
                        this.props.children
                    }
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}

export default withRouter(withStyles(style)(Layout));