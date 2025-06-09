'use client'

import { FunctionComponent } from "react";
import { APIProvider, InfoWindow, Map, Marker } from '@vis.gl/react-google-maps';
import Image from "next/image";

interface AddressProps {
    className?: string;
}

const Address: FunctionComponent<AddressProps> = () => {
    return (<>
        <APIProvider apiKey={'AIzaSyBiqhhtbjK7V2FocVKEVLvOJNjX9tpip_M'}>
            <Map
                defaultCenter={{ lat: 17.45674099522391, lng: 78.37608649267113 }}
                defaultZoom={20}
                disableDefaultUI={true}
            >
                <Marker
                    position={{ lat: 17.45674099522391, lng: 78.37608649267113 }}
                    title="Dyu Technologies"
                />
                <InfoWindow position={{ lat: 17.45674099522391, lng: 78.37608649267113 }}>
                    <Image src={"/textlogo-alt.png"} alt="dyu logo" width={48} height={48} />
                </InfoWindow>
            </Map>
        </APIProvider>
    </>);
}

export default Address;