import axios from "axios"
import { Transaction } from "../models/Transaction";

const apiBaseUrl = "https://localhost:7031/api"

export const getAllTransactions = async () => {
    try{
        const response = await axios.get<Transaction[]>(apiBaseUrl+"/transactions");
        return response.data;
    }
    catch(error){
        console.log(error)
    }
}

export const postTransaction = async (transaction: Transaction) => {
    try{
        const response = await axios.post<Transaction>(apiBaseUrl+"/transactions", transaction);
        return response.data;
    }
    catch(error){
        console.log(error)
    }
}