import React from "react";
import constants from '../src/screens/utils/constants'
export default class BaseApiManager  {

    constructor() {
        // super()
    }

    
    async send(url,token,message_content) {
        const message = {
            to: token,
            notification: {
                title: message_content.title,
                body: message_content.body ,
                vibrate: 1,
                sound: 1,
                show_in_foreground: true,
                priority: "high",
                content_available: true,
            },
        }

        let headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "key=" + constants.FIREBASE_SERVER_API_KEY,
        })

        let response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(message),
        })
        response = await response.json()
        return response
    }

    async post(url, parameters) {
        let requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: parameters   ,
                   
        };
        console.log('Data to be Posted in Server: ', parameters)
        try {
            return await fetch(url, requestOptions)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log("API Response", responseJson)
                    return responseJson
                });
        }
        catch (error) {
            console.log("BaseAPI Manager Post Method Exception: ", error)
            if (error.message.includes('Network')) {
                alert("Please check your Network Connection!")
                return
            }
            return error
        }
    }
    async put(url, parameters) {
        let requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json' },
            body: parameters   ,
                   
        };
        console.log('Data to be Posted in Server: ', parameters)
        try {
            return await fetch(url, requestOptions)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log("API Response", responseJson)
                    return responseJson
                });
        }
        catch (error) {
            console.log("BaseAPI Manager Post Method Exception: ", error)
            if (error.message.includes('Network')) {
                alert("Please check your Network Connection!")
                return
            }
            return error
        }
    }
    //This method Gets Data 
    async get(url) {
        let requestOptions = {
            method: 'GET',
            headers: { 'Accept': "application/json", },
            
        };
        try {
            return await fetch(url,requestOptions)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log("API Response: ", responseJson)
                    return responseJson
                });
        }
        catch (error) {
            console.log("BaseAPI Manager Get Method Exception: ", error)
            if (error.message.includes('Network')) {
                alert("Please check your Network Connection!")
                return
            }
            return error
        }
    }

}