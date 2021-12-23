import React, { Component } from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import {
    AreaChart, Area, XAxis, YAxis,
    CartesianGrid, Tooltip
} from 'recharts';
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    chart:{
        marginTop: 75,
    },
});


const rangeData = [
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
];

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            property: "Temperatura"
        };
    }
    handleDrawerOpen = () => {
        this.setState.open = true;
    };

    handleDrawerClose = () => {
        this.setState.open = false;
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <h1> prova </h1>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: this.state.open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Progetto MIA - Grafici
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: this.state.open.open,
                        [classes.drawerClose]: !this.state.open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>

                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {['Temperatura', 'Umidità', 'Velocità del vento', 'Co2', 'TVOC', 'Raggi ultravioletti', 'Pm 1', 'Pm 2.5', 'Pm 10', 'Pressione atmosferica'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index == 0 ? <Thermometer width={30} height={30}/> : index == 1 ? <CloudQueueIcon/> : index == 2 ? <Wind width={30} height={30}/> : index==3  ? <Co2SecondIcon width={30} height={30}/> :  index==4  ? <InvertColorsIcon/> : index == 5 ? <Uv width={30} height={30}/> : index==6  ? <PM1 width={30} height={30}/> : index==7 ? <PM25 width={30} height={30}/> : index==8 ? <PM10 width={30} height={30}/>: <AtmosphericPressure width={30} height={30}/>}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <div className={classes.chart}>
                        <h4>Grafico della {this.state.property} contente le medie dell'ultima settimana</h4>
                    <AreaChart
                        width={730}
                        height={250}
                        data={rangeData}
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
