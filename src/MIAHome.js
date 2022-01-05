import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
    },
    contentDiv: {
        marginTop: theme.spacing(13),
        "@media(min-width: 993px)": {
            marginTop: theme.spacing(16),
        },
    },
    title: {
        textAlign: "center",
        fontWeight: "600 !important",
        color: theme.palette.primary.main,
    },
    avatar: {
        margin: theme.spacing(2),
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    imgDiv: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px 0px",
        "@media(min-width: 993px)": {
            margin: "30px",
        },
    },
    img: {
        width: "70%",
        "@media(min-width: 993px)": {
            width: "40%",
        },
    },
    backButton: {
        left: 20,
    },
    nextButton: {
        right: 20,
    },

    content: {
        margin: "20px",
        "@media(min-width: 993px)": {
            margin: "20px 80px 20px 80px",
        },
    },

    divider: {
        width: "100%",
        marginBottom: 20,
    },

    info: {
        fontWeight: "600 !important",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    divChart: {
        position: 'absolute',
        right: 100,
        bottom: 50
    }
});

class Homepage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            thingId: this.props.history.location.state?.thingId,
            thingInfo: {},
            dailyInfo: {},
            weeklyInfo: {},
            monthlyInfo: {},
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.history.push({
            pathname: "/chart",
            state: { thingId: this.state.thingId },
        });
    };

    componentDidMount() {
        sessionStorage.setItem("page", "home");

        Axios.get(`http://137.204.107.148:3128/api/ditto/:${this.state.thingId}`).then((res) => {
             const data = res.data;
             this.setState({ thingInfo: data });
         });
 
 
         Axios.get(`http://137.204.107.148:3128/api/daily/:${this.state.thingId}`).then((res) => {
             const data = res.data;
             this.setState({ dailyInfo: data });
         });
 
 
         Axios.get(`http://137.204.107.148:3128/api/weekly/:${this.state.thingId}`).then((res) => {
             const data = res.data;
             this.setState({ weeklyInfo: data });
         });
 
 
         Axios.get(`http://137.204.107.148:3128/api/monthly/:${this.state.thingId}`).then((res) => {
             const data = res.data;
             this.setState({ monthlyInfo: data });
         });

    }

    render() {
        const { classes } = this.props;
        this.images = <img className={classes.img} alt="casetta progetto MIA" src="/casetta.png"></img>;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            onClick={() => this.props.history.goBack()}
                        >
                            <ArrowBackIosIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Progetto MIA - Casina di {this.state.thingId}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.imgDiv}>
                    {this.images}
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Nome del sensore</th>
                                <th>Valore attuale</th>
                                <th>Valore medio giornaliero</th>
                                <th>Valore medio settimanale</th>
                                <th>Valore medio mensile</th>
                            </tr>
                            <tr>
                                <td>Temperatura - {this.state.thingInfo.features.measurements.properties.temperature.sensor}</td>
                                <td>{this.state.thingInfo.features.measurements.properties.temperature.data}</td>
                                <td>{this.state.dailyInfo.features.measurements.properties.temperature.data}</td>
                                <td>{this.state.weeklyInfo.features.measurements.properties.temperature.data}</td>
                                <td>{this.state.monthlyInfo.features.measurements.properties.temperature.data}</td>
                            </tr>
                            <tr>
                                <td>Umidita' - {this.state.thingInfo.features.measurements.properties.humidity.sensor}</td>
                                <td>{this.state.thingInfo.features.measurements.properties.humidity.data}</td>
                                <td>{this.state.dailyInfo.features.measurements.properties.humidity.data}</td>
                                <td>{this.state.weeklyInfo.features.measurements.properties.humidity.data}</td>
                                <td>{this.state.monthlyInfo.features.measurements.properties.humidity.data}</td>
                            </tr>
                            <tr>
                                <td>CO2 - {this.state.thingInfo.features.measurements.properties.co2.sensor}</td>
                                <td>{this.state.thingInfo.features.measurements.properties.co2.data}</td>
                                <td>{this.state.dailyInfo.features.measurements.properties.co2.data}</td>
                                <td>{this.state.weeklyInfo.features.measurements.properties.co2.data}</td>
                                <td>{this.state.monthlyInfo.features.measurements.properties.co2.data}</td>
                            </tr>
                            <tr>
                                <td>TVOC - {this.state.thingInfo.features.measurements.properties.tvoc.sensor}</td>
                                <td>{this.state.thingInfo.features.measurements.properties.tvoc.data}</td>
                                <td>{this.state.dailyInfo.features.measurements.properties.tvoc.data}</td>
                                <td>{this.state.weeklyInfo.features.measurements.properties.tvoc.data}</td>
                                <td>{this.state.monthlyInfo.features.measurements.properties.tvoc.data}</td>
                            </tr>
                            <tr>
                                <td>PM 1.0 - {this.state.thingInfo.features.measurements.properties.quality.sensor}</td>
                                <td>{this.state.thingInfo.features.measurements.properties.quality.data.pm1_0_std}</td>
                                <td>{this.state.dailyInfo.features.measurements.properties.quality.data.pm1_0_std}</td>
                                <td>{this.state.weeklyInfo.features.measurements.properties.quality.data.pm1_0_std}</td>
                                <td>{this.state.monthlyInfo.features.measurements.properties.quality.data.pm1_0_std}</td>
                            </tr>
                            <tr>
                                <td>PM 2.5 - {this.state.thingInfo.features.measurements.properties.quality.sensor}</td>
                                <td>{this.state.thingInfo.features.measurements.properties.quality.data.pm2_5_std}</td>
                                <td>{this.state.dailyInfo.features.measurements.properties.quality.data.pm2_5_std}</td>
                                <td>{this.state.weeklyInfo.features.measurements.properties.quality.data.pm2_5_std}</td>
                                <td>{this.state.monthlyInfo.features.measurements.properties.quality.data.pm2_5_std}</td>
                            </tr>
                            <tr>
                                <td>PM 10 - {this.state.thingInfo.features.measurements.properties.quality.sensor}</td>
                                <td>{this.state.thingInfo.features.measurements.properties.quality.data.pm10_std}</td>
                                <td>{this.state.dailyInfo.features.measurements.properties.quality.data.pm10_std}</td>
                                <td>{this.state.weeklyInfo.features.measurements.properties.quality.data.pm10_std}</td>
                                <td>{this.state.monthlyInfo.features.measurements.properties.quality.data.pm10_std}</td>
                            </tr>
                            <tr>
                                <td>Vento - {this.state.thingInfo.features.measurements.properties.wind.sensor}</td>
                                <td>{this.state.thingInfo.features.measurements.properties.wind.data}</td>
                                <td>{this.state.dailyInfo.features.measurements.properties.wind.data}</td>
                                <td>{this.state.weeklyInfo.features.measurements.properties.wind.data}</td>
                                <td>{this.state.monthlyInfo.features.measurements.properties.wind.data}</td>
                            </tr>
                            <tr>
                                <td>Raggi UV - {this.state.thingInfo.features.measurements.properties.uv.sensor}</td>
                                <td>{this.state.thingInfo.features.measurements.properties.uv.data}</td>
                                <td>{this.state.dailyInfo.features.measurements.properties.uv.data}</td>
                                <td>{this.state.weeklyInfo.features.measurements.properties.uv.data}</td>
                                <td>{this.state.monthlyInfo.features.measurements.properties.uv.data}</td>
                            </tr>
                            <tr>
                                <td>Pioggia - {this.state.thingInfo.features.measurements.properties.rain.sensor}</td>
                                <td>{this.state.thingInfo.features.measurements.properties.rain.data}</td>
                                <td>/</td>
                                <td>/</td>
                                <td>/</td>
                            </tr>
                            <tr>
                                <td>Pressione atmosferica - {this.state.thingInfo.features.measurements.properties.pressure.sensor}</td>
                                <td>{this.state.thingInfo.features.measurements.properties.pressure.data}</td>
                                <td>/</td>
                                <td>/</td>
                                <td>/</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={classes.divChart}>
                    <Button variant="contained" color="primary" onClick={this.handleClick}>Visualizza Grafici</Button>
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(withRouter(Homepage));