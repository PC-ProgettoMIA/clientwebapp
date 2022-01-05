import React, { Component } from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import {
    AreaChart, Area, XAxis, YAxis,
    CartesianGrid, Tooltip
} from 'recharts';
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
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
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Axios from "axios";

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
});

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            property: "Temperatura",
            thingId: this.props.history.location.state?.thingId,

            rangeData: [
                {
                    "day": "05-01",
                    "temperature": [
                        -1,
                        10
                    ]
                },
                {
                    "day": "05-02",
                    "temperature": [
                        2,
                        15
                    ]
                },
                {
                    "day": "05-03",
                    "temperature": [
                        3,
                        12
                    ]
                },
                {
                    "day": "05-04",
                    "temperature": [
                        4,
                        12
                    ]
                },
                {
                    "day": "05-05",
                    "temperature": [
                        12,
                        16
                    ]
                },
                {
                    "day": "05-06",
                    "temperature": [
                        5,
                        16
                    ]
                },
                {
                    "day": "05-07",
                    "temperature": [
                        3,
                        12
                    ]
                },
                {
                    "day": "05-08",
                    "temperature": [
                        0,
                        8
                    ]
                },
                {
                    "day": "05-09",
                    "temperature": [
                        -3,
                        5
                    ]
                }
            ],
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

        };
        this.items = [
            {
                name: "Temperatura",
                function: console.log("temp"),
                icon: <Thermometer width={30} height={30} />,
            },
            {
                name: "Umidita'",
                function: console.log("hum"),
                icon: <CloudQueueIcon />,
            },
            {
                name: "Velocità del vento",
                function: console.log("wind"),
                icon: <Wind width={30} height={30} />,
            },
            {
                name: "Co2",
                function: console.log("co2"),
                icon: <Co2SecondIcon width={30} height={30} />,
            },
            {
                name: "TVOC",
                function: console.log("tvoc"),
                icon: <InvertColorsIcon />,
            },
            {
                name: "Raggi ultravioletti",
                function: console.log("uv"),
                icon: <Uv width={30} height={30} />,
            },
            {
                name: "Pm 1",
                function: console.log("pm1"),
                icon: <PM1 width={30} height={30} />,
            },
            {
                name: "Pm 2.5",
                function: console.log("pm25"),
                icon: <PM25 width={30} height={30} />,
            },
            {
                name: "Pm 10",
                function: console.log("pm10"),
                icon: <PM10 width={30} height={30} />,
            },
            {
                name: "Pressione atmosferica",
                function: console.log("press"),
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

    handleGraph = () => {
        console.log("prova");
    };

    handleTemperature = () => {
        Axios.get(`http://137.204.107.148:3128/api/history/temperature/:${this.state.thingId}`).then((res) => {
            const data = res.data;
            this.setState({ temperatureData: data });
        });

        this.handleGraph();
    }

    handleHumidity = () => {
        Axios.get(`http://137.204.107.148:3128/api/history/humidity/:${this.state.thingId}`).then((res) => {
            const data = res.data;
            this.setState({ humidityData: data });
        });

        this.handleGraph();
    }

    handlePressure = ()=> {
        
        Axios.get(`http://137.204.107.148:3128/api/history/pressure/:${this.state.thingId}`).then((res) => {
            const data = res.data;
            this.setState({ pressureData: data });
        });

        this.handleGraph();
    }

    handleCo2= () => {
        Axios.get(`http://137.204.107.148:3128/api/history/co2/:${this.state.thingId}`).then((res) => {
             const data = res.data;
             this.setState({ co2Data: data });
         });
        this.handleGraph();
    }

    handleTvoc = () => {
        Axios.get(`http://137.204.107.148:3128/api/history/tvoc/:${this.state.thingId}`).then((res) => {
            const data = res.data;
            this.setState({ tvocData: data });
        });
        this.handleGraph();
    }


    handlePm2_5 = () => {
        Axios.get(`http://137.204.107.148:3128/api/history/pm2_5/:${this.state.thingId}`).then((res) => {
            const data = res.data;
            this.setState({ pm25Data: data });
        });
        this.handleGraph();
    }


    
    handlePm1_0 = () => {
        Axios.get(`http://137.204.107.148:3128/api/history/pm1_0/:${this.state.thingId}`).then((res) => {
            const data = res.data;
            this.setState({ pm1Data: data });
        });
        this.handleGraph();
    }

    handlePm10 = () => {     
        Axios.get(`http://137.204.107.148:3128/api/history/pm10/:${this.state.thingId}`).then((res) => {
            const data = res.data;
            this.setState({ pm10Data: data });
        });

        this.handleGraph();
    }


    handleWind = () => {     
        Axios.get(`http://137.204.107.148:3128/api/history/wind/:${this.state.thingId}`).then((res) => {
            const data = res.data;
            this.setState({ windData: data });
        });


        this.handleGraph();
    }
    
    
    handleRain() {    
        Axios.get(`http://137.204.107.148:3128/api/history/rain/:${this.state.thingId}`,).then((res) => {
            const data = res.data;
            this.setState({ rainData: data });
        });

        this.handleGraph();
    }
    
    handleUv() {    
        Axios.get(`http://137.204.107.148:3128/api/history/uv/:${this.state.thingId}`).then((res) => {
            const data = res.data;
            this.setState({ uvData: data });
        });

        this.handleGraph();
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
                    <div className={classes.chart}>
                        <h4>Grafico della {this.state.property} contente le medie dell'ultima settimana</h4>
                        <AreaChart
                            width={730}
                            height={250}
                            data={this.state.rangeData}
                            margin={{
                                top: 30, right: 20, bottom: 20, left: 20,
                            }}
                        >
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Area dataKey="temperature" stroke="#8884d8" fill="#8884d8" />
                            <Tooltip />
                        </AreaChart>
                    </div>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(Charts));