import apiClient from "./apiClient";
import { AxiosResponse, AxiosProgressEvent } from 'axios'

export const test = <T>(params: any = {}): Promise<AxiosResponse<T>> => {
    return apiClient({
        url: `/`,
        method: 'get',
        data: params,
    });
};

export const register = <T>(params: any = {}): Promise<AxiosResponse<T>> => {
    return apiClient({
        url: `/register`,
        method: 'post',
        data: params,
    });
};

export const login = <T>(params: any = {}): Promise<AxiosResponse<T>> => {
    return apiClient({
        url: `/login`,
        method: 'post',
        data: params,
    });
};