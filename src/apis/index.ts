import axios from "axios";

const API = axios.create({ baseURL: "http://127.0.0.1:8000" });

export interface InputRequest {
  prompt: string;
}

export const generateAnswer = (inputRequest: InputRequest) =>
  API.post("/generate", inputRequest);
