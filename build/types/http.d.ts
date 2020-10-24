declare type Method = 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH' | 'purge' | 'PURGE' | 'link' | 'LINK' | 'unlink' | 'UNLINK';
export declare type HTTPRequestConfig = {
    method?: Method;
    url?: string;
    data?: Record<string, any> | any;
};
export declare type HTTPResponse<T> = {
    data: T;
};
export declare type HTTPPromise<T = any> = Promise<HTTPResponse<T>>;
export {};
