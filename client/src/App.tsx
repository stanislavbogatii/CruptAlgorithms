import { TileLayer, Marker } from "leaflet";
import { useState } from "react";
import { MapContainer } from "react-leaflet";
import { MapController } from "./components/MapController";
import DesForm from "./components/DesForm";
import RsaForm from "./components/RsaForm";
import SignatureForm from "./components/SignatureForm";

function App() {
  return (
    <div className="flex w-full justify-center flex-col px-[200px] gap-16 mt-[50px]">
      <h1 className="text-center text-3xl font-bold">Lab 4 TSI</h1>
      <div className="flex gap-24 w-full justify-center">
        <DesForm/>
        <RsaForm/>
        <SignatureForm/>
      </div>
    </div>
  );
}

export default App;