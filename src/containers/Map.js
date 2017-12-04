/* eslint-disable no-underscore-dangle */
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

const BASEMAPS = L.tileLayer(
    '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, ' +
        'GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
        subdomains: ['server', 'services'],
        label: 'ESRI Topo'
    }
);

function initMap() {
    const map = L.map('Map', {
        layers: [BASEMAPS],
        center: [44.564055739510955, -123.26248168945314],
        maxZoom: 18,
        zoom: 14,
        zoomControl: false,
        preferCanvas: true
    });

    return map;
}

export default initMap;
