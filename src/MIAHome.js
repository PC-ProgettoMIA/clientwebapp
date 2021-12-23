import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";

const styles = (theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
});

class Homepage extends Component {
    constructor(props) {
        super(props);
        sessionStorage.setItem("page", "home");
        this.state = {
            index: 0,
        };
    }

    render() {
        const { classes } = this.props;
        this.images = <img className={classes.img} alt="" src="/casetta.png"></img>;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <div className={classes.contentDiv}>
                    <Typography variant="h6" className={classes.title}>
                        Casina di Viale della Resistenza, Cesena (FC)
                    </Typography>
                </div>
                <div className={classes.imgDiv}>
                {this.images}
                </div>
                <div>
                    <table>
                        <tr>
                            <th>Sensore</th>
                            <th>Valore attuale</th>
                            <th>Valore medio mattutino (00-12)</th>
                            <th>Valore medio pomeridiano (12-20)</th>
                            <th>Valore medio notturno (20-24)</th>
                            <th>Valore medio giornaliero</th>
                            <th>Valore medio settimanale</th>
                        </tr>
                        <tr>
                            <td>Temperatura</td>
                            <td>8.5°C</td>
                            <td>2°C</td>
                            <td>10°C</td>
                            <td>5°C</td>
                            <td>8°C</td>
                            <td>9.3°C</td>
                        </tr>
                        <tr>
                            <td>Umidità</td>
                            <td>25%</td>
                            <td>18%</td>
                            <td>30%</td>
                            <td>10%</td>
                            <td>22%</td>
                            <td>27%</td>
                        </tr>
                        <tr>
                            <td>CO2</td>
                            <td>513</td>
                            <td>480</td>
                            <td>600</td>
                            <td>390</td>
                            <td>520</td>
                            <td>500</td>
                        </tr>
                        <tr>
                            <td>TVOC</td>
                            <td>112</td>
                            <td>100</td>
                            <td>200</td>
                            <td>190</td>
                            <td>175</td>
                            <td>160</td>
                        </tr>
                        <tr>
                            <td>PM 1.0</td>
                            <td>6.0 g/m^3</td>
                            <td>4.0 g/m^3</td>
                            <td>8.0 g/m^3</td>
                            <td>6.0 g/m^3</td>
                            <td>5.5 g/m^3</td>
                            <td>5.0 g/m^3</td>
                        </tr>
                        <tr>
                            <td>PM 2.5</td>
                            <td>9.0 g/m^3</td>
                            <td>8.5 g/m^3</td>
                            <td>10.0 g/m^3</td>
                            <td>11.0 g/m^3</td>
                            <td>10.5 g/m^3</td>
                            <td>9.8 g/m^3</td>
                        </tr>
                        <tr>
                            <td>PM 10</td>
                            <td>11.0 g/m^3</td>
                            <td>9.9 g/m^3</td>
                            <td>12.0 g/m^3</td>
                            <td>10.7 g/m^3</td>
                            <td>10.0 g/m^3</td>
                            <td>11.0 g/m^3</td>
                        </tr>
                        <tr>
                            <td>Vento</td>
                            <td>40 km/h</td>
                            <td>55 km/h</td>
                            <td>60 km/h</td>
                            <td>49 km/h</td>
                            <td>50 km/h</td>
                            <td>45 km/h</td>
                        </tr>
                        <tr>
                            <td>Raggi UV</td>
                            <td>285 nm</td>
                            <td>280 nm</td>
                            <td>320 nm</td>
                            <td>300 nm</td>
                            <td>290 nm</td>
                            <td>289 nm</td>
                        </tr>
                        <tr>
                            <td>Pioggia</td>
                            <td>false</td>
                            <td>/</td>
                            <td>/</td>
                            <td>/</td>
                            <td>/</td>
                            <td>/</td>
                        </tr>
                        <tr>
                            <td>Pressione Atmosferica</td>
                            <td>1022.643</td>
                            <td>/</td>
                            <td>/</td>
                            <td>/</td>
                            <td>/</td>
                            <td>/</td>
                        </tr>
                    </table>

                </div>
            </div>
        );
    }
}
export default withStyles(styles)((Homepage));
