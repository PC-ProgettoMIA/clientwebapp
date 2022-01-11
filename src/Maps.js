import "./styles.css";

import React, { Component, useMemo, useState } from "react";
import {
    AzureMap,
    AzureMapDataSourceProvider,
    AzureMapFeature,
    AzureMapLayerProvider,
    AzureMapsProvider,
    AzureMapPopup,
} from "react-azure-maps";
import {
    AuthenticationType,
    data,
} from "azure-maps-control";
import { key } from "./key";
import { withRouter } from "react-router-dom"
import Axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { Button, Container, TextField } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

const renderPoint = (data) => {
    return (
        <AzureMapFeature
            key={data.thingId} //cambiare con thingId
            id={data.thingId}
            type="Point"
            coordinate={[data.position.longitude, data.position.latitude]} // da cambiare con le info del dt
            properties={{
                id: data.thingId,
                popUpProp: data
            }}
        />
    );
};

const MarkersExample = (things) => {
    let history = useHistory();

    const [popupOptions, setPopupOptions] = useState({});
    const [popupProperties, setPopupProperties] = useState({});

    const option = useMemo(() => {
        return {
            authOptions: {
                authType: AuthenticationType.subscriptionKey,
                subscriptionKey: key
            },
            center: [12, 42],
            zoom: 5,
            view: "Auto"
        };
    }, []);


    const memoizedMarkerRender = useMemo(
        () => things.things.map((el) => renderPoint(el)),
        [things]
    );

    function handleClick(name, schoolname) {
        history.push({
            pathname: "/home",
            state: { thingId: name, school: schoolname }
        });
    };



    return (
        <>

            <AzureMapsProvider>
                <div style={{ height: window.innerHeight }}>
                    <AzureMap options={option}>
                        <AzureMapDataSourceProvider
                            id={"MultiplePoint AzureMapDataSourceProvider"}
                        >
                            <AzureMapLayerProvider
                                id={"MultiplePoint AzureMapLayerProvider"}
                                options={{
                                    iconOptions: {
                                        image: "pin-red"
                                    }
                                }}
                                events={{
                                    mousemove: (e) => {
                                        if (e.shapes && e.shapes.length > 0) {
                                            const prop = e.shapes[0];

                                            // Set popup options
                                            setPopupOptions({
                                                ...popupOptions,
                                                position: new data.Position(
                                                    prop.data.geometry.coordinates[0],
                                                    prop.data.geometry.coordinates[1]
                                                ),
                                                pixelOffset: [0, -18]
                                            });

                                            if (prop.data.properties)
                                                // Set popup properties from Feature Properties that are declared on create Feature
                                                setPopupProperties({
                                                    ...prop.data.properties.popUpProp
                                                });
                                        }
                                    },
                                    click: (e) => {
                                        things.things.forEach((elem, i) => {
                                            if (elem.position.latitude.toFixed(1) === e.position[1].toFixed(1) && elem.position.longitude.toFixed(1) === e.position[0].toFixed(1)) {
                                                handleClick(elem.thingId, elem.school);
                                            }
                                        })
                                    }

                                }}
                                type="SymbolLayer"

                            />
                            {memoizedMarkerRender}
                        </AzureMapDataSourceProvider>
                        <AzureMapPopup
                            isVisible={true}
                            options={popupOptions}
                            popupContent={
                                <div style={{ padding: "8px 16px" }}>

                                    <h3>{popupProperties.school}</h3>
                                </div> // Inject your JSX
                            }
                        />
                    </AzureMap>
                </div>
            </AzureMapsProvider>
        </>
    );
};


class Maps extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            notPresent: false,
        }

        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(e) {
        e.preventDefault()
        if (isNaN(this.state.lat1) || isNaN(this.state.lat2) || isNaN(this.state.lon1) || isNaN(this.state.lon2)) {
            this.setState({ visible: true });
            this.setState({ notPresent: false });
        }
        else if (this.state.lat1 > 90 || this.state.lat1 < -90 || this.state.lat2 > 90 || this.state.lat2 < -90 || this.state.lon1 > 180 || this.state.lon1 < -180 || this.state.lon2 > 180 || this.state.lon2 < -180) {
            this.setState({ visible: true });
            this.setState({ notPresent: false });
        } else {
            this.setState({ visible: false });
            this.setState({ notPresent: false });
            Axios.get(`http://137.204.107.148:3128/api/spatial`, {
                params: {
                    latitude1: this.state.lat1,
                    longitude1: this.state.lon1,
                    latitude2: this.state.lat2,
                    longitude2: this.state.lon2,

                }
            }).then((res) => {
                const data = res.data;

                if (data.schools.length === 0) {
                    this.setState({ notPresent: true });
                }
                else {
                    this.setState({ notPresent: false });

                    this.props.history.push({
                        pathname: "/aggregate",
                        state: { area_properties: data.area_properties, schools: data.schools }
                    });
                }


            });
        }
    }

    componentDidMount() {
        Axios.get(`http://137.204.107.148:3128/api/all/things`).then((res) => {
            const data = res.data;
            this.setState({ things: data.items });

        });
    }

    render() {
        return (
            <div className="App">
                <div style={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="h6" color="inherit">
                                Progetto MIA - Mappa
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className="mia">
                    <div className="mia-text">Il progetto MIA è un progetto finanziato dalla regione che coinvolge diversi
                        enti.
                        L'obiettivo specifico del progetto è quello di sostenere i ragazzi di scuole di diverso ordine e grado ed i relativi docenti ad un lavoro di gruppo interdisciplinare orientato all'utilizzo ed all'auto-costruzione di misuratori di inquinamento replicabili,
                        in modo da organizzare future misurazioni della qualità dell'aria sul nostro territorio.</div></div>
                <Container className="map-container">
                    <h3>Cerca la tua casina!</h3>
                    <p>Inserendo quattro coordinate GPS nelle aree di testo sotto, potrai vedere i dati aggregati di quell'area geografica!</p>
                    <div className="input">
                        <TextField className="gps" label="Latitudine 1" variant="outlined" onChange={(e) => this.setState({ lat1: e.target.value })}></TextField>
                        <TextField className="gps" label="Latitudine 2" variant="outlined" onChange={(e) => this.setState({ lat2: e.target.value })}></TextField>
                        <TextField className="gps" label="Longitudine 1" variant="outlined" onChange={(e) => this.setState({ lon1: e.target.value })}></TextField>
                        <TextField className="gps" label="Longitudine 2" variant="outlined" onChange={(e) => this.setState({ lon2: e.target.value })}></TextField>
                        <Button variant="contained" onClick={this.handleClick}>Cerca!</Button>
                    </div>
                    {this.state.visible ? <Alert severity='error'>Attezione dati errati!! La latitudine deve essere compresa tra 90 e -90 mentre la longitudine tra 180 e -180.</Alert> : <></>}
                    {this.state.notPresent ? <Alert severity='error'>Nessuna casina presente in quel territorio!</Alert> : <></>}

                    <p>Altrimenti cliccando su una casina nella mappa sotto potrai vedere i suoi dati!</p>

                    <MarkersExample className="map" things={this.state == null ? [] : this.state.things == null ? [] : this.state.things} />

                </Container>

            </div>
        );
    }
}

export default (withRouter(Maps))
