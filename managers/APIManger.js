import React from "react";
import BaseApiManager from "./BaseAPIManager";
import apiEndPoints from '../src/screens/utils/apiEndPoints';
import config from '../src/screens/utils/config';

export default class APIManager  {
    constructor() {

    }

    async userSignUp(parameters) {
        let obj = new BaseApiManager()
        let response = await obj.post(config.apiURL + apiEndPoints.register, parameters)
        return response;
    }
    async userLogin(parameters) {
        let obj = new BaseApiManager()
        let response = await obj.post(config.apiURL + apiEndPoints.login, parameters)
        return response;
    }
    async sendCode(parameters) {
        let obj = new BaseApiManager()
        let response = await obj.post(config.apiURL + apiEndPoints.sendCode, parameters)
        return response;
    }
    async addCard(parameters) {
        let obj = new BaseApiManager()
        let response = await obj.post(config.apiURL + apiEndPoints.addCard, parameters)
        return response;
    }
    async updateuser(parameters) {
        let obj = new BaseApiManager()
        let response = await obj.post(config.apiURL + apiEndPoints.updatepassword, parameters)
        return response;
    }
    async updateCard(parameters) {
        let obj = new BaseApiManager()
        let response = await obj.post(config.apiURL + apiEndPoints.updateCard, parameters)
        return response;
    }
    async addorder(parameters) {
        let obj = new BaseApiManager()
        let response = await obj.post(config.apiURL + apiEndPoints.orderadd, parameters)
        return response;
    }
    async getallorder(parameters) {
        let obj = new BaseApiManager()
        let response = await obj.post(config.apiURL + apiEndPoints.GetAllOrdersByUser, parameters)
        return response;
    }
    async bookrider(parameters) {
        let obj = new BaseApiManager()
        let response = await obj.post(config.apiURL + apiEndPoints.orderBookRider, parameters)
        return response;
    }
    async updatestatus(parameters) {
        let obj = new BaseApiManager()
        let response = await obj.post(config.apiURL + apiEndPoints.UpdateOrderStatus, parameters)
        return response;
    }async rating(parameters) {
        let obj = new BaseApiManager()
        let response = await obj.post(config.apiURL + apiEndPoints.ReviewRatingByUser, parameters)
        return response;
    }
    

    
}