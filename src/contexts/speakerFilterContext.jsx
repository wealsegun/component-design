import React, { createContext } from "react"
import  useSpeakerFilter from "../hooks/useSpeakerFilter";


const SpeakerFilterContext = createContext();
const SpeakerFilterProvider = ({ children, startShowSessions = false, startingEventYear = "2019" }) => {

    const {
        showSession,
        setShowSession,
        eventYear,
        setEventYear,
        searchQuery,
        setSearchQuery,
        EVENT_YEARS, } = useSpeakerFilter(startShowSessions, startingEventYear);

    return (
        <SpeakerFilterContext.Provider value={
            {
                showSession,
                setShowSession,
                eventYear,
                setEventYear,
                searchQuery,
                setSearchQuery,
                EVENT_YEARS
            }
        }>
            {children}
        </SpeakerFilterContext.Provider>
    )
}

export { SpeakerFilterContext, SpeakerFilterProvider }