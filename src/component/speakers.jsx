import { useState } from "react";
import SpeakerList from "./speakerList";
import SpeakerToolBar from "./speakerToolBar"
import { SpeakerFilterProvider } from "../contexts/speakerFilterContext";

export const Speakers = () => {

    return (
        <SpeakerFilterProvider startShowSessions={false}>
            <SpeakerToolBar

            />
            <SpeakerList />
        </SpeakerFilterProvider>
    );
}