import { createContext } from "react";



const SpeakerContext = createContext();

const SpeakerProvider = ({ children, speaker, updateRecord, insertRecord, deleteRecord }) => {

    return (
        // onFavoriteToggle={(doneCallBack) => {
        //     updateRecord({
        //         ...speaker,
        //         favorite: !speaker.favorite,
        //     }, doneCallBack);
        // }}

        <SpeakerContext.Provider value={{ speaker, updateRecord, insertRecord, deleteRecord }}>
            {children}
        </SpeakerContext.Provider>
    )
}

export { SpeakerContext, SpeakerProvider }
