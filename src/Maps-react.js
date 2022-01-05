import "./styles.css";

import React, { Component, useMemo } from "react";
import {
    AzureMap,
    AzureMapDataSourceProvider,
    AzureMapFeature,
    AzureMapLayerProvider,
    AzureMapsProvider,
    IAzureMapOptions,
    AzureMapPopup,
    IAzureMapFeature
} from "react-azure-maps";
import {
    AuthenticationType,
    data,
    MapMouseEvent,
    PopupOptions
} from "azure-maps-control";
import { key } from "./key";
import { carData } from "./data";
import { withRouter } from "react-router-dom"
import { withStyles } from "@material-ui/core";
import Axios from "axios";

const renderPoint = (data) => {
    return (
        <AzureMapFeature
            key={data.licensePlate}
            id={data.licensePlate}
            type="Point"
            // coordinate={data}
            coordinate={[data.position.longitude, data.position.latitude]}
            properties={{
                id: data.licensePlate,
                popUpProp: data
            }}
        />
    );
};


const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    popup: {
        padding: "8px 16px",
    },
});

function MemoizedMarkerRender(mapData) {

    return useMemo(() => mapData.map((el) => renderPoint(el)),
        [mapData]);
}

function Init() {
    useMemo(() => {
        return {
            authOptions: {
                authType: AuthenticationType.subscriptionKey,
                subscriptionKey: key
            },
            center: [7, 51],
            zoom: 5,
            view: "Auto"
        };
    }, []);
}
class Maps extends Component {
    state = {
        location: {
            lat: 0,
            lng: 0,
        },
        authOptions: {
            authType: AuthenticationType.subscriptionKey,
            subscriptionKey: key
        },
        center: [7, 51],
        zoom: 5,
        view: "Auto",
        positionData: [], //contains all informations about mia home
        popupOptions: {},
        popupProperties: {},
        mapData: [],
        // [latitude, longitude, thingId]: {},
    }

    /*componentDidMount() {
        Axios.get(`http://137.204.107.148:3128/api/all/things)}`, {
            headers: { "x-access-token": sessionStorage.getItem("accessToken") },
        }).then((res) => {
            const data = res.data;
            this.setState({ positionData: data }); // oppure si butta tutto dentro mapdata 
        });
    }*/


    render() {
        const { classes } = this.props;
        if (this.state.positionData == []) {
            this.setState({
                mapData: {}
            })
        } else {
            this.setState({
                mapData: {
                    
                }
            })
        };
        this.state = { popupOptions: {} };
        this.state = { popupProperties: {} };



        return (
            <>
                <div className="App">
                    <AzureMapsProvider>
                        <div style={{ height: "600px" }}>
                            <AzureMap options={this.state.authOptions, this.state.center, this.state.zoom, this.state.view}>
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
                                                    this.setState({
                                                        popupOptions: {
                                                            ...this.state.popupOptions,
                                                            position: new data.Position(
                                                                prop.data.geometry.coordinates[0],
                                                                prop.data.geometry.coordinates[1]
                                                            ),
                                                            pixelOffset: [0, -18]
                                                        }
                                                    });

                                                    if (prop.data.properties)
                                                        // Set popup properties from Feature Properties that are declared on create Feature
                                                        this.setState({
                                                            popupProperties: {
                                                                ...prop.data.properties.popUpProp
                                                            }
                                                        });
                                                }
                                            }
                                        }}
                                        type="SymbolLayer"
                                    />
                                </AzureMapDataSourceProvider>
                                <AzureMapPopup
                                    isVisible={true}
                                    options={this.state.popupOptions}
                                    popupContent={
                                        <div style={{ padding: "8px 16px" }}>
                                            <h3>{this.state.popupProperties.licensePlate}</h3>
                                            <p>{this.state.popupProperties.model}</p>
                                        </div>
                                    }
                                />
                            </AzureMap>
                        </div>
                    </AzureMapsProvider>
                </div>
            </>
        );
    };
}

export default withStyles(styles)(withRouter(Maps))
