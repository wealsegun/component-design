import { useEffect, useState } from "react";
import { data } from "../../SpeakerData";
export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure",
};
const useRequestDelay = (delayTime, initialData = []) => {
    // const [speakersData, setSpeakersData] = useState([]);
    const [data, setData] = useState([]);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState("");

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        const delayFunc = async () => {
            try {
                await delay(delayTime);
                //throw "Had Error."
                setRequestStatus(REQUEST_STATUS.SUCCESS);
                setData(initialData);
            } catch (e) {
                setRequestStatus(REQUEST_STATUS.FAILURE);
                setError(e);
            }
        }
        delayFunc();

    }, []);


    // const onFavoriteToggle = (id) => {
    //     const speakersRecPrevious = speakersData.find(function (rec) {
    //         return rec.id === id;
    //     });
    //     const speakerRecUpdated = {
    //         ...speakersRecPrevious,
    //         favorite: !speakersRecPrevious.favorite,
    //     };
    //     const speakersDataNew = speakersData.map(function (rec) {
    //         return rec.id === id ? speakerRecUpdated : rec;
    //     });

    //     setSpeakersData(speakersDataNew);
    // }

    const updateRecord = (recordUpdated, doneCallBack) => {
        const origninalRecord = [...data];
        const newRecords = data.map((rec) => {
            return rec.id === recordUpdated.id ? recordUpdated : rec;
        });
        const delayFunction = async () => {
            setData(newRecords);
            try {
                await delay(delayTime);
                if (doneCallBack) {
                    doneCallBack();
                }
            } catch (cerror) {

                console.log("error thrown inside delayFunction", error);
                if (doneCallBack) {
                    doneCallBack();
                }
                setData(origninalRecord);
            }
        }
        delayFunction();
    }

    const insertRecord = (record, doneCallBack) => {
        const originalRecords = [...data];
        const newRecords = [record, ...data];
        async function delayFunction() {
            try {
                setData(newRecords);
                debugger;
                await delay(delayTime);
                if (doneCallBack) {
                    doneCallBack();
                }
            } catch (error) {
                console.log("error thrown inside delayFunction", error);
                if (doneCallBack) {
                    doneCallBack();
                }
                setData(originalRecords);
            }
        }
        delayFunction();
    }

    const deleteRecord = (record, doneCallBack) => {
        const originalRecords = [...data];
        const newRecords = data.filter(function (rec) {
            return rec.id != record.id;
        });
        async function delayFunction() {
            try {
                setData(newRecords);
                await delay(delayTime);
                if (doneCallBack) {
                    doneCallBack();
                }
            } catch (error) {
                console.log("error thrown inside delayFunction", error);
                if (doneCallBack) {
                    doneCallBack();
                }
                setData(originalRecords);
            }
        }
        delayFunction();
    }

    return {
        data,
        requestStatus,
        error,
        updateRecord,
        insertRecord,
        deleteRecord
        // onFavoriteToggle,
    }
}

export default useRequestDelay;