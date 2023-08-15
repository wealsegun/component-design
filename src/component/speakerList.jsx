
import Speaker from "./speaker";
import useRequestRest, { REQUEST_STATUS } from "../hooks/useRequestRest";
import { SpeakerFilterContext } from "../contexts/speakerFilterContext";
import { useContext } from "react";
import { SpeakerAdd } from "./speakerAdd";
// import SpeakerAdd from ""

const SpeakerList = () => {
    const {
        data: speakersData,
        requestStatus,
        error,
        updateRecord,
        insertRecord,
        deleteRecord
    } = useRequestRest();
    const { searchQuery, eventYear } = useContext(SpeakerFilterContext);

    if (requestStatus === REQUEST_STATUS.FAILURE) {
        return (
            <div className="text-danger">
                ERROR: <b>loading Speaker Data Failed {error}</b>
            </div>
        );
    }

    console.log(speakersData);
    console.log(requestStatus);

    return (
        <div className="container speakers-list">
            {
                requestStatus === REQUEST_STATUS.LOADING ?
                    (<div>Loading...</div>)
                    :
                    (
                        <div>
                            <SpeakerAdd eventYear={eventYear} insertRecord={insertRecord} />
                            <div className="row">
                                {speakersData.
                                    filter((speaker) => {
                                        return (
                                            speaker.first.toLowerCase().includes(searchQuery) ||
                                            speaker.last.toLowerCase().includes(searchQuery)
                                        );
                                    }).
                                    filter((speaker) => {
                                        return speaker.sessions.find((session) => {
                                            return session.eventYear === eventYear;
                                        });
                                    }).
                                    map(function (speaker) {
                                        return (
                                            <Speaker
                                                key={speaker.id}
                                                speaker={speaker}
                                                updateRecord={updateRecord}
                                                insertRecord={insertRecord}
                                                deleteRecord={deleteRecord}
                                            />
                                        );
                                    })}
                            </div>
                        </div>)
            }
        </div>
    )
}

export default SpeakerList;