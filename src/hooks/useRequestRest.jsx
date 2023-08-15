import { useEffect, useState } from "react";
import axios from "axios";
export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure",
};

const restUrl = "api/speakers";
const useRequestRest = () => {

    const [data, setData] = useState([]);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState("");

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        const delayFunc = async () => {
            try {
                const result = await axios.get(restUrl);
                //throw "Had Error."
                setRequestStatus(REQUEST_STATUS.SUCCESS);
                setData(result.data);
            } catch (e) {
                setRequestStatus(REQUEST_STATUS.FAILURE);
                setError(e);
            }
        }
        delayFunc();

    }, []);

    const updateRecord = (record, doneCallBack) => {
        const origninalRecord = [...data];
        const newRecords = data.map((rec) => {
            return rec.id === record.id ? record : rec;
        });
        const delayFunction = async () => {
            setData(newRecords);
            try {
                await axios.put(`${restUrl}/${record.id}`, record);
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
                await axios.post(`${restUrl}/9999`, record);
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
                await axios.delete(`${restUrl}/${record.id}`, record);
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
    }
}

export default useRequestRest;