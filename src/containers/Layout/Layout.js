import React, { Component } from 'react'
import Header from './Header';
import Footer from './Footer';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import _ from 'lodash';
import TPCDetails from '../../JSONFiles/tpc.json';
import MarutiDetails from '../../JSONFiles/maruti.json';
import BlueDartDetails from '../../JSONFiles/blueDart.json';

const style = {
    'maincontainerwrapper': {
        marginTop: '64px',
        marginBottom: '64px'
    }
};

class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalBalance: 0
        }
    }

    async componentDidMount() {
        await this.fetchTotalBalance();
    }

    fetchTotalBalance = async () => {
        let { totalBalance } = _.cloneDeep(this.state);
        const TPC_Data = TPCDetails.details;
        const Maruti_Data = MarutiDetails.details;
        const BlueDart_Data = BlueDartDetails.details;

        const filteredTPCList = _.filter(TPC_Data, { isAmomuntDispatchPassed: false });
        const filteredMarutiList = _.filter(Maruti_Data, { isAmomuntDispatchPassed: false });
        const filteredBlueDartList = _.filter(BlueDart_Data, { isAmomuntDispatchPassed: false });

        _.each(filteredTPCList, function(data) { totalBalance += data.amount; });
        _.each(filteredMarutiList, function(data) { totalBalance += data.amount; });
        _.each(filteredBlueDartList, function(data) { totalBalance += data.amount; });

        await this.setState({ totalBalance });
    }

    render() {
        const { classes } = this.props;
        const { totalBalance } = _.cloneDeep(this.state);

        return(
            <React.Fragment>
                <Header
                    {...this.props}
                    history={this.props.history}
                    totalBalance={totalBalance}
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