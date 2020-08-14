import React, { Component } from 'react'
import { CovidServices } from '../../services/CovidServices';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import 'leaflet-draw/dist/leaflet.draw.css';
// import 'leaflet-draw/dist/leaflet.draw.js';
import './WorldMapCoverComponent.css'
import TitleIconComponent from '../title-icon-component/TitleIconComponent';

export default class WorldMapCoverComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listAllLatLongs: []
        }
    }
    componentDidMount() {
        this.map = L.map('map', {
            center: [50, 10],
            zoom: 3,
            minZoom: 2,
            maxZoom: 18,
            zoomControl: false,
            attributionControl: false,
            scrollwheel: false,
            legends: true,
            infoControl: false,
            worldCopyJump: true,
            inertia: false,
        });

        CovidServices.listAllLatLongs()
            .then((result) => {
                this.setState({
                    ...this.state,
                    listAllLatLongs: result.data.ref_country_codes
                })
            }).catch((err) => {

            });
    }

    componentDidUpdate() {
        this.preparingGeoJson(this.props.summaryDataCountries)
    }

    preparingGeoJson(summaryDataCountries) {
        let geojson = {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': []
            }
        }
        for (let i = 0; i < summaryDataCountries.length; i++) {
            for (let j = 0; j < this.state.listAllLatLongs.length; j++) {
                if (this.state.listAllLatLongs[j].alpha2 === summaryDataCountries[i].CountryCode) {
                    geojson.data.features.push(
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [
                                    this.state.listAllLatLongs[j].longitude,
                                    this.state.listAllLatLongs[j].latitude
                                ]
                            },
                            'properties': summaryDataCountries[i]
                        }
                    )
                }
            }
        }
        this.createMap(geojson);
    }


    createMap(geoClusterPoints) {
        // https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}
        /* We are loading the map here whether or not load has loaded */

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
            // attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            // subdomains: 'abcd',
            minZoom: 0,
            maxZoom: 20,
            // ext: 'png'
        }).addTo(this.map);

        let geojsonMarkerOptions = {
            radius: 5,
            fillColor: "#a50404",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };

        L.geoJSON(geoClusterPoints.data, {
            pointToLayer: (feature, latlng) => {
                let circlmarker = L.circleMarker(latlng, geojsonMarkerOptions);
                return circlmarker;
            },
            onEachFeature: (feature, layer) => {
                layer.on({
                    'click': (e) => {
                        L.popup()
                            .setLatLng([e.latlng.lat, e.latlng.lng])
                            .setContent(
                                `
                            <b class="tooltipArean"> ${feature.properties.Country}</b>
                            <div class="tooltipArean">New Confirmed: <b>${feature.properties.NewConfirmed}</b></div>
                            <div class="tooltipArean">New Deaths: <b>${feature.properties.NewDeaths}</b></div>
                            <div class="tooltipArean">New Recovered: <b>${feature.properties.NewRecovered}</b></div>
                            <div class="tooltipArean">Total Confirmed: <b>${feature.properties.TotalConfirmed}</b></div>
                            <div class="tooltipArean">Total Deaths: <b>${feature.properties.TotalDeaths}</b></div>
                            <div class="tooltipArean">Total Recovered: <b>${feature.properties.TotalRecovered}</b></div>
                            `)
                            .openOn(this.map);
                    }
                });
            }
        }).addTo(this.map);
    }


    render() {
        return (
            <div className="wmcc1">
                <TitleIconComponent icon={'map'} title="Track through Map" />
                <div className="main_lastUpdt">
                    Click on the dots to get an overview
                </div>
                <div id="map"></div>
            </div>
        )
    }
}
