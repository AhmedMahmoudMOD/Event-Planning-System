import { ReqStatus } from "./req.status.enum";

export interface Req {
    fName: string;
    lName: string;
    email: string;
    image: string;
    requestStatus: ReqStatus;
    id: number;
}