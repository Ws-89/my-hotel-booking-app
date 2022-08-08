export interface CustomResponse<T> {
    timeStamp: Date;
    statusCode: number;
    status: string;
    message: string;
    data: { objects?: Array<T>, object?: T };
}