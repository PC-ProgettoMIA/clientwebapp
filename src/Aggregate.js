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
import { timestampToDateTime } from "./timestampToDate";

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

    table: {
        textAlign: "center",
        marginBottom: "100px"
    },

    tableHeader: {
        padding: 20
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
        position: 'relative',
        left: (window.innerWidth / 2) - 10,
        paddingTop: "30px",
    },

});

class Homepage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            thingId: this.props.history.location.state?.thingId,
            school: this.props.history.location.state?.school,
            area_properties: this.props.history.location.state?.area_properties,

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
        console.log(this.state)
        sessionStorage.setItem("page", "home");

        Axios.get(`http://137.204.107.148:3128/api/ditto/${this.state.thingId}`).then((res) => {
            const data = res.data;
            this.setState({ thingInfo: data });
        });


        Axios.get(`http://137.204.107.148:3128/api/daily/${this.state.thingId}`).then((res) => {
            const data = res.data;
            this.setState({ dailyInfo: data });
        });


        Axios.get(`http://137.204.107.148:3128/api/weekly/${this.state.thingId}`).then((res) => {
            const data = res.data;
            this.setState({ weeklyInfo: data });
        });


        Axios.get(`http://137.204.107.148:3128/api/monthly/${this.state.thingId}`).then((res) => {
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
                            Progetto MIA - Casina di {this.state.school}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.imgDiv}>
                    {this.images}
                </div>
                {this.state.thingInfo.features == null ||
                    this.state.dailyInfo.properties == null ||
                    this.state.weeklyInfo.properties == null ||
                    this.state.monthlyInfo.properties == null ? null :
                    <div>
                        <table>
                            <tbody>
                                <tr className={classes.table}>
                                    <th className={classes.tableHeader}>Nome del sensore</th>
                                    <th className={classes.tableHeader}>Unità di misura</th>
                                    <th className={classes.tableHeader}>Valori attuali aggregati</th>


                                </tr>
                                <tr className={classes.table}>
                                    <td>Temperatura - {this.state.thingInfo.features.measurements.properties.temperature.sensor}</td>
                                    <td>°C - gradi Celsius</td>
                                    <td>{this.state.thingInfo.features.measurements.properties.temperature.data.toString().substring(0, 5)}</td>
                                    <td>{this.state.dailyInfo.properties.avgtemp.toString().substring(0, 5)}</td>
                                    <td>{this.state.weeklyInfo.properties.avgtemp.toString().substring(0, 5)}</td>
                                    <td>{this.state.monthlyInfo.properties.avgtemp.toString().substring(0, 5)}</td>
                                    <td>{timestampToDateTime(this.state.thingInfo.features.measurements.properties.temperature.timestamp)}</td>

                                </tr>
                                <tr className={classes.table}>
                                    <td>Umidita' - {this.state.thingInfo.features.measurements.properties.humidity.sensor}</td>
                                    <td>% - precentuale</td>
                                    <td>{this.state.thingInfo.features.measurements.properties.humidity.data.toString().substring(0, 5)}</td>
                                    <td>{this.state.dailyInfo.properties.avghum.toString().substring(0, 5)}</td>
                                    <td>{this.state.weeklyInfo.properties.avghum.toString().substring(0, 5)}</td>
                                    <td>{this.state.monthlyInfo.properties.avghum.toString().substring(0, 5)}</td>
                                    <td>{timestampToDateTime(this.state.thingInfo.features.measurements.properties.humidity.timestamp)}</td>

                                </tr>
                                <tr className={classes.table}>
                                    <td>Pressione atmosferica - {this.state.thingInfo.features.measurements.properties.pressure.sensor}</td>
                                    <td>hPa - ettopascal</td>
                                    <td>{this.state.thingInfo.features.measurements.properties.pressure.data.toString().substring(0, 6)}</td>
                                    <td>{this.state.dailyInfo.properties.avgpress.toString().substring(0, 6)}</td>
                                    <td>{this.state.weeklyInfo.properties.avgpress.toString().substring(0, 6)}</td>
                                    <td>{this.state.monthlyInfo.properties.avgpress.toString().substring(0, 6)}</td>
                                    <td>{timestampToDateTime(this.state.thingInfo.features.measurements.properties.pressure.timestamp)}</td>

                                </tr>
                                <tr className={classes.table}>
                                    <td>CO2 - {this.state.thingInfo.features.measurements.properties.co2.sensor}</td>
                                    <td>ppm - parti per milione</td>
                                    <td>{this.state.thingInfo.features.measurements.properties.co2.data}</td>
                                    <td>{this.state.dailyInfo.properties.avgco2}</td>
                                    <td>{this.state.weeklyInfo.properties.avgco2}</td>
                                    <td>{this.state.monthlyInfo.properties.avgco2}</td>
                                    <td>{timestampToDateTime(this.state.thingInfo.features.measurements.properties.co2.timestamp)}</td>

                                </tr>
                                <tr className={classes.table}>
                                    <td>TVOC - {this.state.thingInfo.features.measurements.properties.tvoc.sensor}</td>
                                    <td>ppb - parti per miliardo</td>
                                    <td>{this.state.thingInfo.features.measurements.properties.tvoc.data.toString().substring(0, 5)}</td>
                                    <td>{this.state.dailyInfo.properties.avgtvoc.toString().substring(0, 5)}</td>
                                    <td>{this.state.weeklyInfo.properties.avgtvoc.toString().substring(0, 5)}</td>
                                    <td>{this.state.monthlyInfo.properties.avgtvoc.toString().substring(0, 5)}</td>
                                    <td>{timestampToDateTime(this.state.thingInfo.features.measurements.properties.tvoc.timestamp)}</td>

                                </tr>
                                <tr className={classes.table}>
                                    <td>PM 1.0 - {this.state.thingInfo.features.measurements.properties.quality.sensor}</td>
                                    <td>μg/m^3 - microgammi al metro cubo</td>
                                    <td>{this.state.thingInfo.features.measurements.properties.quality.data[0].pm1_0_std.toString().substring(0, 5)}</td>
                                    <td>{this.state.dailyInfo.properties.avgpm1_0.toString().substring(0, 5)}</td>
                                    <td>{this.state.weeklyInfo.properties.avgpm1_0.toString().substring(0, 5)}</td>
                                    <td>{this.state.monthlyInfo.properties.avgpm1_0.toString().substring(0, 5)}</td>
                                    <td>{timestampToDateTime(this.state.thingInfo.features.measurements.properties.quality.timestamp)}</td>

                                </tr>
                                <tr className={classes.table}>
                                    <td>PM 2.5 - {this.state.thingInfo.features.measurements.properties.quality.sensor}</td>
                                    <td>μg/m^3 - microgammi al metro cubo</td>
                                    <td>{this.state.thingInfo.features.measurements.properties.quality.data[1].pm2_5_std.toString().substring(0, 5)}</td>
                                    <td>{this.state.dailyInfo.properties.avgpm2_5.toString().substring(0, 5)}</td>
                                    <td>{this.state.weeklyInfo.properties.avgpm2_5.toString().substring(0, 5)}</td>
                                    <td>{this.state.monthlyInfo.properties.avgpm2_5.toString().substring(0, 5)}</td>
                                    <td>{timestampToDateTime(this.state.thingInfo.features.measurements.properties.quality.timestamp)}</td>

                                </tr>
                                <tr className={classes.table}>
                                    <td>PM 10 - {this.state.thingInfo.features.measurements.properties.quality.sensor}</td>
                                    <td>μg/m^3 - microgammi al metro cubo</td>
                                    <td>{this.state.thingInfo.features.measurements.properties.quality.data[2].pm10_std.toString().substring(0, 5)}</td>
                                    <td>{this.state.dailyInfo.properties.avgpm10.toString().substring(0, 5)}</td>
                                    <td>{this.state.weeklyInfo.properties.avgpm10.toString().substring(0, 5)}</td>
                                    <td>{this.state.monthlyInfo.properties.avgpm10.toString().substring(0, 5)}</td>
                                    <td>{timestampToDateTime(this.state.thingInfo.features.measurements.properties.quality.timestamp)}</td>

                                </tr>
                                <tr className={classes.table}>
                                    <td>Vento - {this.state.thingInfo.features.measurements.properties.wind.sensor}</td>
                                    <td>m/s - metri al secondo</td>
                                    <td>{this.state.thingInfo.features.measurements.properties.wind.data}</td>
                                    <td>{this.state.dailyInfo.properties.avgwind.toString().substring(0, 5)}</td>
                                    <td>{this.state.weeklyInfo.properties.avgwind.toString().substring(0, 5)}</td>
                                    <td>{this.state.monthlyInfo.properties.avgwind.toString().substring(0, 5)}</td>
                                    <td>{timestampToDateTime(this.state.thingInfo.features.measurements.properties.wind.timestamp)}</td>

                                </tr>
                                <tr className={classes.table}>
                                    <td>Raggi UV - {this.state.thingInfo.features.measurements.properties.uv.sensor}</td>
                                    <td>nm - nanometri</td>
                                    <td>{this.state.thingInfo.features.measurements.properties.uv.data.toString().substring(0, 5)}</td>
                                    <td>{this.state.dailyInfo.properties.avguv.toString().substring(0, 5)}</td>
                                    <td>{this.state.weeklyInfo.properties.avguv.toString().substring(0, 5)}</td>
                                    <td>{this.state.monthlyInfo.properties.avguv.toString().substring(0, 5)}</td>
                                    <td>{timestampToDateTime(this.state.thingInfo.features.measurements.properties.uv.timestamp)}</td>

                                </tr>
                                <tr className={classes.table}>
                                    <td>Pioggia - {this.state.thingInfo.features.measurements.properties.rain.sensor}</td>
                                    <td>presenza di pioggia</td>
                                    {this.state.thingInfo.features.measurements.properties.rain.data ? <td>Sta piovendo</td> : <td>Non sta piovendo</td>}
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>{timestampToDateTime(this.state.thingInfo.features.measurements.properties.rain.timestamp)}</td>

                                </tr>

                            </tbody>
                        </table>
                    </div>}
                < div className={classes.divChart}>
                    <Button className={classes.chartBtn} variant="contained" color="primary" onClick={this.handleClick}>Visualizza Grafici</Button>
                </div>
            </div >
        );
    }
}
export default withStyles(styles)(withRouter(Homepage));