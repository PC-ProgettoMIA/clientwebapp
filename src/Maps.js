import "./styles.css";

import React, { Component, useMemo, useState, setState } from "react";
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
    MapMouseEvent,
    PopupOptions
} from "azure-maps-control";
import { key } from "./key";
import { withRouter } from "react-router-dom"
import Axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

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

const MarkersExample = () => {
    let history = useHistory();
    const [mapData, setMapData] = useState([
            {
                "thingId": "house01",
                "position": {
                    "latitude": 45.516,
                    "longitude": -122.636
                }
            },
            {
                "thingId": "house02",
                "position": {
                    "latitude": 44.133331,
                    "longitude": 12.233333
                }
            },
            {
                "thingId": "house03",
                "position": {
                    "latitude": 44.233334,
                    "longitude": 12.050000
                }
            }
        ]);
    const [popupOptions, setPopupOptions] = useState({});
    const [popupProperties, setPopupProperties] = useState({});
    const positionData = []; //contains all informations about mia home
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
        () => mapData.map((el) => renderPoint(el)),
        [mapData]
    );

    /*"Access-Control-Allow-Origin", "*"*/
    Axios.get(`http://137.204.107.148:3128/api/all/things`).then((res) => {
        const data = res.data;
        console.log(data);
        positionData= setState(data);
        console.log("yle");
        console.log(positionData)
        if(positionData!={} || positionData!= null){
            //mapData= setState(positionData);
        }
    });

    function handleClick(name) {
        history.push({
            pathname: "/home",
            state: { thingId: name }
        });
    };
    return (
        <>
            <div style={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit">
                            Progetto MIA - Mappa
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
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
                                        mapData.map((elem, i) => {
                                            if (elem.position.latitude.toFixed(1) === e.position[1].toFixed(1) && elem.position.longitude.toFixed(1) === e.position[0].toFixed(1)) {
                                                handleClick(elem.thingId);
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
                                    <h3>{popupProperties.thingId}</h3>
                                    <p>{popupProperties.school}</p>
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
    render() {
        return (
            <div className="App">
                <MarkersExample />
            </div>
        );
    }
}

export default (withRouter(Maps))
