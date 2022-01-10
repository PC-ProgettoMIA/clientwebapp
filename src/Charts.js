import React, { Component } from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip,
} from 'recharts';
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import { ReactComponent as Co2SecondIcon } from "./svgIcon/co2.svg";
import { ReactComponent as PM25 } from "./svgIcon/air-quality.svg";
import { ReactComponent as Thermometer } from "./svgIcon/celsius.svg";
import { ReactComponent as PM1 } from "./svgIcon/air-pollution.svg";
import { ReactComponent as PM10 } from "./svgIcon/factory.svg";
import { ReactComponent as Uv } from "./svgIcon/rays.svg";
import { ReactComponent as Wind } from "./svgIcon/wind.svg";
import { ReactComponent as AtmosphericPressure } from "./svgIcon/atmospheric.svg";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Axios from "axios";
import { timestampToDate } from './timestampToDate';
import { Box, Button, Grid } from '@material-ui/core';

const drawerWidth = 240;

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
        "@media(min-width: 993px)": {
            margin: theme.spacing(1),
        },
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
    },
    toolbar: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: "5px",
        marginBottom: "5px",
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    chart: {
        marginTop: 75,
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    text: {
        width: "100%",
        marginLeft: "20%",
        marginRight: "20%"
    },

    graphs: {
        display: "flex",
        flexDirection: "row",

    },
    space: {
        marginRight: "10%"
    }

});

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            property: "",
            thingId: this.props.history.location.state?.thingId,
            temperatureData: [],
            humidityData: [],
            pressureData: [],
            co2Data: [],
            tvocData: [],
            pm1Data: [],
            pm25Data: [],
            pm10Data: [],
            windData: [],
            rainData: [],
            uvData: [],
            graph: <div></div>,

        };
        this.items = [
            {
                name: "Temperatura",
                api: "temperature",
                function: this.handleTemperature,
                icon: <Thermometer width={30} height={30} />,
            },
            {
                name: "Umidita'",
                api: "humidity",
                function: this.handleHumidity,
                icon: <CloudQueueIcon />,
            },
            {
                name: "Velocità del vento",
                api: "wind",
                function: this.handleWind,
                icon: <Wind width={30} height={30} />,
            },
            {
                name: "Co2",
                api: "co2",
                function: this.handleCo2,
                icon: <Co2SecondIcon width={30} height={30} />,
            },
            {
                name: "TVOC",
                api: "tvoc",
                function: this.handleTvoc,
                icon: <InvertColorsIcon />,
            },
            {
                name: "Raggi ultravioletti",
                api: "uv",
                function: this.handleUv,
                icon: <Uv width={30} height={30} />,
            },
            {
                name: "Pm  1.0",
                api: "qual",
                function: this.handlePm1_0,
                icon: <PM1 width={30} height={30} />,
            },
            {
                name: "Pm 2.5",
                api: "qual",
                function: this.handlePm2_5,
                icon: <PM25 width={30} height={30} />,
            },
            {
                name: "Pm 10",
                api: "qual",
                function: this.handlePm10,
                icon: <PM10 width={30} height={30} />,
            },
            {
                name: "Pressione atmosferica",
                api: "pressure",
                function: this.handlePressure,
                icon: <AtmosphericPressure width={30} height={30} />,
            },
        ];
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    }

    componentDidMount() {
        sessionStorage.setItem("page", "home");
    }

    handleDrawerOpen() {
        this.setState({ open: true });
    };

    handleDrawerClose() {
        this.setState({ open: false });
    };

    handleClickAway = () => {
        if (this.state.open) {
            this.handleDrawerClose();
        }
    };

    handleGraph = (sensorData) => {
        console.log(sensorData)
        if (sensorData === null || sensorData === [] || sensorData === {}) {
            this.setState({ graph: <div><h4>Non sono presenti dati per il sensore di {this.state.property}</h4></div> })
        } else {
            this.setState({
                graph:
                    <div>
                        <h4> Grafico della {this.state.property} contente le medie dell'ultima settimana</h4>
                        < AreaChart
                            width={730}
                            height={250}
                            data={sensorData}
                            margin={{
                                top: 30, right: 20, bottom: 20, left: 20,
                            }}
                        >
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Area type="monotone" dataKey="data" stroke="#8884d8" fill="#8884d8" />
                            <Tooltip />
                        </AreaChart >
                    </div >
            })
        }
    };

    handleTemperature = (e) => {
        e.preventDefault();
        this.setState({ property: "temperatura" });
        Axios.get(`http://137.204.107.148:3128/api/history/temperature/${this.state.thingId}`).then((res) => {
            const data = res.data.temperature;
            data.forEach((elem) => elem.date = timestampToDate(new Number(elem.timestamp)))
            this.setState({ temperatureData: data });
            this.handleGraph(this.state.temperatureData);
        });


    }

    handleHumidity = (e) => {
        e.preventDefault();
        this.setState({ property: "umidità" });
        Axios.get(`http://137.204.107.148:3128/api/history/humidity/${this.state.thingId}`).then((res) => {
            const data = res.data.humidity;
            data.forEach((elem) => elem.date = timestampToDate(new Number(elem.timestamp)))
            this.setState({ humidityData: data });
            this.handleGraph(this.state.humidityData);

        });

    }

    handlePressure = (e) => {
        e.preventDefault();
        this.setState({ property: "pressione atmosferica" });
        Axios.get(`http://137.204.107.148:3128/api/history/pressure/${this.state.thingId}`).then((res) => {
            const data = res.data.pressure;
            data.forEach((elem) => elem.date = timestampToDate(new Number(elem.timestamp)))
            this.setState({ pressureData: data });
            this.handleGraph(this.state.pressureData);

        });

    }

    handleCo2 = (e) => {
        e.preventDefault();
        this.setState({ property: "co2" });
        Axios.get(`http://137.204.107.148:3128/api/history/co2/${this.state.thingId}`).then((res) => {
            const data = res.data.co2
            data.forEach((elem) => elem.date = timestampToDate(new Number(elem.timestamp)))
            this.setState({ co2Data: data });
            this.handleGraph(this.state.co2Data);

        });
    }

    handleTvoc = (e) => {
        e.preventDefault();
        this.setState({ property: "tvoc" });
        Axios.get(`http://137.204.107.148:3128/api/history/tvoc/${this.state.thingId}`).then((res) => {
            const data = res.data.tvoc;
            data.forEach((elem) => elem.date = timestampToDate(new Number(elem.timestamp)))
            this.setState({ tvocData: data });
            this.handleGraph(this.state.tvocData);

        });
    }


    handlePm2_5 = (e) => {
        e.preventDefault();
        this.setState({ property: "pm 2.5" });
        Axios.get(`http://137.204.107.148:3128/api/history/pm2_5/${this.state.thingId}`).then((res) => {
            const data = res.data.pm2_5;
            data.forEach((elem) => elem.date = timestampToDate(new Number(elem.timestamp)))
            this.setState({ pm25Data: data });
            this.handleGraph(this.state.pm25Data);

        });
    }

    handlePm1_0 = (e) => {
        e.preventDefault();
        this.setState({ property: "pm 1.0" });
        Axios.get(`http://137.204.107.148:3128/api/history/pm1_0/${this.state.thingId}`).then((res) => {
            const data = res.data.pm1_0;
            data.forEach((elem) => elem.date = timestampToDate(new Number(elem.timestamp)))
            this.setState({ pm1Data: data });
            this.handleGraph(this.state.pm1Data);

        });
    }

    handlePm10 = (e) => {
        e.preventDefault();
        this.setState({ property: "pm 10" });
        Axios.get(`http://137.204.107.148:3128/api/history/pm10/${this.state.thingId}`).then((res) => {
            const data = res.data.pm10;
            data.forEach((elem) => elem.date = timestampToDate(new Number(elem.timestamp)))
            this.setState({ pm10Data: data });
            this.handleGraph(this.state.pm10Data);

        });

    }


    handleWind = (e) => {
        e.preventDefault();
        this.setState({ property: "vento" });
        Axios.get(`http://137.204.107.148:3128/api/history/wind/${this.state.thingId}`).then((res) => {
            const data = res.data.wind;
            data.forEach((elem) => elem.date = timestampToDate(new Number(elem.timestamp)))
            this.setState({ windData: data });
            this.handleGraph(this.state.windData);

        });
    }


    handleRain = (e) => {
        e.preventDefault();
        this.setState({ property: "pioggia" });
        Axios.get(`http://137.204.107.148:3128/api/history/rain/${this.state.thingId}`,).then((res) => {
            const data = res.data.rain;
            data.forEach((elem) => elem.date = timestampToDate(new Number(elem.timestamp)))
            this.setState({ rainData: data });
            this.handleGraph(this.state.rainData);

        });

    }

    handleUv = (e) => {
        e.preventDefault();
        this.setState({ property: "raggi ultravioletti" });
        Axios.get(`http://137.204.107.148:3128/api/history/uv/${this.state.thingId}`).then((res) => {
            const data = res.data.uv;
            data.forEach((elem) => elem.date = timestampToDate(new Number(elem.timestamp)))
            this.setState({ uvData: data });
            this.handleGraph(this.state.uvData);

        });

    }


    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                >
                    <Toolbar className={classes.toolbar}>

                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, this.state.open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            onClick={() => this.props.history.push("/")}
                        >
                            <ArrowBackIosIcon />
                        </IconButton>

                        <Typography variant="h6" noWrap>
                            Progetto MIA - Grafici
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={this.state.open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawetHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {this.items == null ? null : this.items.map((item) => {
                            return (
                                <ListItem button key={item.name} onClick={item.function}>
                                    <ListItemIcon >{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItem>
                            );
                        })}

                    </List>
                </Drawer>

                <main className={classes.content}>

                    <div className={classes.toolbar} />
                    <div className={classes.text}>
                        <p>Visualizza i grafici della casina! Cliccando sui bottoni a lato potrai vedere l'andamento settimanale delle proprietà.</p>
                    </div>

                    <div className={classes.graphs}>
                        <div display="flex" flexDirection="column">
                            {this.items == null ? null : this.items.map((item) => {
                                return (
                                    <div key={item.name}>
                                        <Button startIcon={item.icon} onClick={item.function}>{item.name}</Button>
                                    </div>

                                )

                            })}
                        </div>
                        <div className={classes.space}></div>
                        <div className={classes.chart}>
                            {this.state.graph}
                        </div>
                    </div>


                </main>
            </div >
        );
    }
}

export default withStyles(styles)(withRouter(Charts));