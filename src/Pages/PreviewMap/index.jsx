import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";
import { useEffect, useRef } from 'react';
import {
    MapContainer,
    TileLayer
} from 'react-leaflet';
import { useLocation } from 'react-router-dom';
import '../../App.css';

export default function PreviewMap() {
    const mapRef = useRef(null)
    const location = useLocation()

    useEffect(() => {
        chargeTile(location.state.imageData)
        // eslint-disable-next-line
    }, [])

    async function chargeTile(file) {
        var reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = async function () {
            var arrayBuffer = reader.result
            parseGeoraster(arrayBuffer).then(georaster => {
                // console.log("georaster:", georaster);
                var layer = new GeoRasterLayer({
                    georaster: georaster,
                    resolution: 256
                })
                layer.addTo(mapRef.current)
                mapRef.current.fitBounds(layer.getBounds())
            }
            )
        }
    }

    return (
        <div style={styles.container}>
            <MapContainer
                ref={mapRef}
                maxZoom={25}
                center={[51.505, -0.09]}
                zoom={13}
                style={styles.mapStyle}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </MapContainer>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#242424'
    },
    mapStyle: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'white'
    }
};