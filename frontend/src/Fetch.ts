const API_HOST =
    window.location.hostname === "localhost" ?
    "http://localhost:8000" :
    "https://backend-37pycmajnq-ul.a.run.app/";

export const fetchRequest = (
    endpoint: string, 
    body: any,
    method: "POST" | "GET", 
    onSuccess: any,
    onError?: any,
) => { 

    fetch(API_HOST + endpoint, {
        method,
        body,
    })
        .then((response) => response.text())
        .then((rawResponse) => {
            const rawData = JSON.parse(rawResponse);
            onSuccess(rawData);
        })
        .catch((error) => {
            if(onError != null) { 
                onError(error);
            }
        });

}

export async function fetchWithBodyParams(
    endPoint: string,
    body: any,
    method: "POST" | "GET",
    onSuccess: any,
    onError?: any,
) {

    fetch(API_HOST + endPoint, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
        .then((response) => response.text())
        .then((rawResponse) => {
            var rawData = JSON.parse(rawResponse);
            onSuccess(rawData);
        })
        .catch((error) => {
            if(onError != null) { 
                onError(error);
            }
        });
}