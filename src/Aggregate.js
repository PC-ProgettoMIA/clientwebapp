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

    tableContainer: {
        marginBottom: "3%"
    }

});

class Homepage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            area_properties: this.props.history.location.state?.area_properties,
            schools: this.props.history.location.state?.schools,
        };
    }

    componentDidMount() {
        console.log(this.state)
        sessionStorage.setItem("page", "home");
    }

    render() {
        console.log(this.state);
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
                            Progetto MIA - Dati Aggregati
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.imgDiv}>
                    {this.images}
                </div>
                <div>
                    <p>Le casine presenti in quest'area geografica appartegono a:</p>
                    <ul>
                        {this.state.schools.map((s) => <li key={this.state.schools.indexOf(s)}>{s.name}</li>)}
                    </ul>

                </div>
                {this.state.area_properties == null ? null :
                    <div className={classes.tableContainer}>
                        <table>
                            <tbody>
                                <tr className={classes.table}>
                                    <th className={classes.tableHeader}>Nome del sensore</th>
                                    <th className={classes.tableHeader}>Unità di misura</th>
                                    <th className={classes.tableHeader}>Valori attuali aggregati</th>


                                </tr>
                                <tr className={classes.table}>
                                    <td>Temperatura - Si7021</td>
                                    <td>°C - gradi Celsius</td>
                                    <td>{this.state.area_properties.avgtemp.toString().substring(0, 5)}</td>
                                </tr>
                                <tr className={classes.table}>
                                    <td>Umidita' - Si7021</td>
                                    <td>% - precentuale</td>
                                    <td>{this.state.area_properties.avghum.toString().substring(0, 5)}</td>
                                </tr>
                                <tr className={classes.table}>
                                    <td>Pressione atmosferica - BMP280</td>
                                    <td>hPa - ettopascal</td>
                                    <td>{this.state.area_properties.avgpress.toString().substring(0, 6)}</td>
                                </tr>
                                <tr className={classes.table}>
                                    <td>CO2 - SGP30</td>
                                    <td>ppm - parti per milione</td>
                                    <td>{this.state.area_properties.avgco2}</td>
                                </tr>
                                <tr className={classes.table}>
                                    <td>TVOC - SGP30</td>
                                    <td>ppb - parti per miliardo</td>
                                    <td>{this.state.area_properties.avgtvoc.toString().substring(0, 5)}</td>
                                </tr>
                                <tr className={classes.table}>
                                    <td>PM 1.0 - PMS5003 </td>
                                    <td>μg/m^3 - microgammi al metro cubo</td>
                                    <td>{this.state.area_properties.avgpm1_0.toString().substring(0, 5)}</td>
                                </tr>
                                <tr className={classes.table}>
                                    <td>PM 2.5 - PMS5003 </td>
                                    <td>μg/m^3 - microgammi al metro cubo</td>
                                    <td>{this.state.area_properties.avgpm2_5.toString().substring(0, 5)}</td>
                                </tr>
                                <tr className={classes.table}>
                                    <td>PM 10 - PMS5003 </td>
                                    <td>μg/m^3 - microgammi al metro cubo</td>
                                    <td>{this.state.area_properties.avgpm10.toString().substring(0, 5)}</td>
                                </tr>
                                <tr className={classes.table}>
                                    <td>Vento - Anemometro </td>
                                    <td>m/s - metri al secondo</td>
                                    <td>{this.state.area_properties.avgwind}</td>
                                </tr>
                                <tr className={classes.table}>
                                    <td>Raggi UV - Sensore raggi UV</td>
                                    <td>nm - nanometri</td>
                                    <td>{this.state.area_properties.avguv.toString().substring(0, 5)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>}
            </div >
        );
    }
}
export default withStyles(styles)(withRouter(Homepage));