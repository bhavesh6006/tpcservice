import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import {
    Button,
    Grid,
    Box,
    CircularProgress,
    TextField,
    Container,
    Typography,
    Link,
    Paper
} from '@material-ui/core';
import _ from 'lodash';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Logo from '../../assets/logo.png';
import MarutiLogo from '../../assets/maruti.png';
import BlueDartLogo from '../../assets/bluedart.jpg';

import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import PublicIcon from '@material-ui/icons/Public';
import MoneyIcon from '@material-ui/icons/Money';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

import TPCDetails from '../../JSONFiles/tpc.json';
import MarutiDetails from '../../JSONFiles/maruti.json';
import BlueDartDetails from '../../JSONFiles/blueDart.json';

const style = {
    img: {
        width: "100%",
        height: "100px"
    },
    greenIcon: {
        color: 'green',
        marginLeft: "5px"
    },
    redIcon: {
        color: 'red',
        marginLeft: "5px"
    },
    paper: {
        padding: "15px"
    }
};

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showLoader: true,
            TPCTotalAmount: 0,
            MarutiTotalAmount: 0,
            BlueDartTotalAmount: 0,
            TPCBalanceAmount: 0,
            MarutiBalanceAmount: 0,
            BlueDartBalanceAmount: 0
        }
    }

    async componentDidMount() {
        await this.fetchAllAmounts();
    }

    fetchAllAmounts = async () => {
        let {
            TPCTotalAmount,
            MarutiTotalAmount,
            BlueDartTotalAmount,
            TPCBalanceAmount,
            MarutiBalanceAmount,
            BlueDartBalanceAmount
        } = _.cloneDeep(this.state);

        const TPC_Data = TPCDetails.details;
        const Maruti_Data = MarutiDetails.details;
        const BlueDart_Data = BlueDartDetails.details;

        const filteredTPCList = _.filter(TPC_Data, { isAmomuntDispatchPassed: false });
        const filteredMarutiList = _.filter(Maruti_Data, { isAmomuntDispatchPassed: false });
        const filteredBlueDartList = _.filter(BlueDart_Data, { isAmomuntDispatchPassed: false });

        _.each(TPC_Data, function(data) { TPCTotalAmount += data.amount; });
        _.each(Maruti_Data, function(data) { MarutiTotalAmount += data.amount; });
        _.each(BlueDart_Data, function(data) { BlueDartTotalAmount += data.amount; });

        _.each(filteredTPCList, function(data) { TPCBalanceAmount += data.amount; });
        _.each(filteredMarutiList, function(data) { MarutiBalanceAmount += data.amount; });
        _.each(filteredBlueDartList, function(data) { BlueDartBalanceAmount += data.amount; });

        await this.setState({
            TPCTotalAmount,
            MarutiTotalAmount,
            BlueDartTotalAmount,
            TPCBalanceAmount,
            MarutiBalanceAmount,
            BlueDartBalanceAmount,
            showLoader: false,

            showBookingDetails: false,
            selectedCourier: null
        })
    }

    showBookingDetails = async (selectedCourier) => {
        await this.setState({ 
            showBookingDetails: true,
            selectedCourier: selectedCourier
        });
    }

    handleBack = () => {
        this.setState({ showBookingDetails: false, selectedCourier: null });
    }

    getCourierName = (selectedCourier) => {
        let courierName = '';

        switch(selectedCourier) {
            case 1:
                courierName = 'PROFESSIONAL COURIERS';
                break;
            case 2:
                courierName = 'MARUTI COURIERS';
                break;
            case 3:
                courierName = 'BLUE DART COURIERS';
                break;
            default:
                break;
        }

        return courierName;
    }

    fetchAllBookingDetailsTemplate = (selectedCourier, classes) => {
        let details = [];

        switch(selectedCourier) {
            case 1:
                details = TPCDetails.details;
                break;
            case 2:
                details = MarutiDetails.details;
                break;
            case 3:
                details = BlueDartDetails.details;
                break;
            default:
                break;
        }

        if (details.length === 0) {
            return (
                <Grid item xs={12}>
                    <Card className='courier-details-wrapper'>
                        <CardActionArea className='card-content'>
                            <CardContent>
                                <Typography variant='h5' align='center' color='primary'>
                                    NO DATA FOUND FOR SELECTED COURIER SERVICE
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            )
        }

        return (
            <Grid container spacing={2}>
                {
                    details.map((row, index) => (
                        <Grid item xs={12} md={4} key={`courier-details-${index}`}>
                            <Card className='courier-details-wrapper'>
                                <CardActionArea className='card-content'>
                                    <CardContent style={{ padding: "10px" }}>
                                        <Typography variant='subtitle1' className='row-details'>
                                            <EventAvailableIcon /> <span className='details-value'>{row.bookingDate}</span>
                                        </Typography>

                                        <Typography variant='subtitle1' className='row-details'>
                                            <TrackChangesIcon /> <span className='details-value'>{row.trackingNumber}</span>
                                        </Typography>

                                        <Typography variant='subtitle1' className='row-details'>
                                            <PublicIcon /> <span className='details-value'>{row.destination}</span>
                                        </Typography>

                                        <Typography variant='subtitle1' className='row-details'>
                                            <MoneyIcon /> <span className='details-value'>{row.amount}</span>
                                        </Typography>
                                        
                                        <Typography variant='subtitle1' className='row-details'>
                                            <AccountBalanceWalletIcon />
                                            {
                                                (row.isAmomuntDispatchPassed) ? (
                                                    <DoneIcon className={classes.greenIcon} />
                                                ) : (
                                                    <ClearIcon className={classes.redIcon} />
                                                )
                                            }
                                            <span className='details-value'>
                                                {
                                                    row.isAmomuntDispatchPassed ? (
                                                        <React.Fragment>
                                                            ({row.amountDispatchDate})
                                                        </React.Fragment>
                                                    ) : ""
                                                }
                                            </span>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))
                }                
            </Grid>
        )
    }

    render() {
        const { classes } = this.props;
        const { 
            showLoader,
            TPCTotalAmount,
            MarutiTotalAmount,
            BlueDartTotalAmount,
            TPCBalanceAmount,
            MarutiBalanceAmount,
            BlueDartBalanceAmount,
            showBookingDetails,
            selectedCourier
        } = this.state;

        if (showLoader) {
            return (
                <Grid container>
                    <div className='CustLodder circular-loader'>
                        <Box className='CustLodder' padding={1}>
                            <Box className={classes.textAlignCenter}>
                                <CircularProgress size={40} />
                            </Box>
                        </Box>
                    </div>
                </Grid>
            )
        }

        if (showBookingDetails) {
            return (
                <Grid container className="" spacing={2}>
                    <Grid item xs={12} className='page-back-row'>
                        <Paper className={classes.paper}>
                            <div onClick={() => this.handleBack()} className='page-back--link'>
                                <ArrowBackIosOutlinedIcon fontSize='small' color='primary' />
                                <Typography color='primary' variant='body1' color='primary'>
                                    {this.getCourierName(selectedCourier)} DETAILS
                                </Typography>
                            </div>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        { this.fetchAllBookingDetailsTemplate(selectedCourier, classes) }
                    </Grid>
                </Grid>
            )
        }

        return (
            <Grid container className="" spacing={2}>
                <Grid item xs={12} md={4} sm={6}>
                    <Card className='courier-list-wrapper'>
                        <CardActionArea className='card-content'>
                            <CardContent>
                                <img src={Logo} alt='' className={classes.img} />
                            </CardContent>
                        </CardActionArea>
                        <CardActions className='card-action'>
                            <div>
                                <Typography variant='subtitle1' color='primary' className="amount-text">
                                    Total: ₹ {TPCTotalAmount}
                                </Typography>

                                <Typography variant='subtitle1' color='primary' className="amount-text">
                                    Balance: ₹ {TPCBalanceAmount}
                                </Typography>
                            </div>

                            <div>
                                <Button
                                    variant='outlined'
                                    onClick={() => this.showBookingDetails(1)}
                                    color='primary'
                                >
                                    Details
                                </Button>
                            </div>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4} sm={6}>
                    <Card className='courier-list-wrapper'>
                        <CardActionArea className='card-content'>
                            <CardContent>
                                <img src={MarutiLogo} alt='' className={classes.img} />
                            </CardContent>
                        </CardActionArea>
                        <CardActions className='card-action'>                            
                            <div>
                                <Typography variant='subtitle1' color='primary' className="amount-text">
                                    Total: ₹ {MarutiTotalAmount}
                                </Typography>

                                <Typography variant='subtitle1' color='primary' className="amount-text">
                                    Balance: ₹ {MarutiBalanceAmount}
                                </Typography>
                            </div>

                            <div>
                                <Button
                                    variant='outlined'
                                    onClick={() => this.showBookingDetails(2)}
                                    color='primary'
                                >
                                    Details
                                </Button>
                            </div>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4} sm={6}>
                    <Card className='courier-list-wrapper'>
                        <CardActionArea className='card-content'>
                            <CardContent>
                                <img src={BlueDartLogo} alt='' className={classes.img} />
                            </CardContent>
                        </CardActionArea>
                        <CardActions className='card-action'>                            
                            <div>
                                <Typography variant='subtitle1' color='primary' className="amount-text">
                                    Total: ₹ {BlueDartTotalAmount}
                                </Typography>

                                <Typography variant='subtitle1' color='primary' className="amount-text">
                                    Balance: ₹ {BlueDartBalanceAmount}
                                </Typography>
                            </div>

                            <div>
                                <Button
                                    variant='outlined'
                                    onClick={() => this.showBookingDetails(3)}
                                    color='primary'
                                >
                                    Details
                                </Button>
                            </div>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}

export default withRouter(withStyles(style)(Dashboard));