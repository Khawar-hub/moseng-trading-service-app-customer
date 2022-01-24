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
    async verify(parameters,id) {
        let obj = new BaseApiManager()
        console.log(config.apiURL + apiEndPoints.cutomercheckOtpCode+id)
        let response = await obj.post(config.apiURL + apiEndPoints.cutomercheckOtpCode+id, parameters)
        return response;
    }
    async password(parameters,id) {
        let obj = new BaseApiManager()
        console.log(config.apiURL + apiEndPoints.cutomercheckOtpCode+id)
        let response = await obj.put(config.apiURL + apiEndPoints.pasword+id, parameters)
        return response;
    }
    async addCard(parameters) {
        let obj = new BaseApiManager()
        let response = await obj.post(config.apiURL + apiEndPoints.addCard, parameters)
        return response;
    }
    async updateuser(parameters,id) {
        let obj = new BaseApiManager()
        let response = await obj.put(config.apiURL + apiEndPoints.updatepassword+id, parameters)
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
    async orderinfo(id) {
        let obj = new BaseApiManager()
        let response = await obj.get(config.apiURL + apiEndPoints.orderinfo+id)
        return response;
    }
    async getallorder(id) {
        let obj = new BaseApiManager()
        let response = await obj.get(config.apiURL + apiEndPoints.GetAllOrdersByUser+id)
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
    async googleapi(origin,destination) {
        let obj = new BaseApiManager()
        let response = await obj.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=AIzaSyBnhCJQWG1TK6aI6yU1EzXgn24jaPgCQK4`)
        return response;
    }
    async getAllTrucks() {
        let obj = new BaseApiManager()
        let response = await obj.get(config.apiURL + apiEndPoints.truckgetAllTruck)
        return response;
    }
    async updateOrder(parameters,id) {
        let obj = new BaseApiManager()
        console.log(config.apiURL + apiEndPoints.orderupdateOrder+id)
        let response = await obj.put(config.apiURL + apiEndPoints.orderupdateOrder+id,parameters)
        return response;
    }
   
    

    
}