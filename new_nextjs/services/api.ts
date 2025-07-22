import apiClient from "./apiClient";
import { AxiosResponse, AxiosProgressEvent } from 'axios'

export const promoterLogin = <T>(params: any = {}): Promise<AxiosResponse<T>> => {
    return apiClient({
        url: `/home/promoter/login`,
        method: 'post',
        data: params,
    });
};