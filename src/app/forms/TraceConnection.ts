import { userForm } from "./userForm";

export interface TraceConnection {
    id?: number;
    status: string;
    datecnx: Date;
    datedecnx : Date;
    AdrMac: string;
    AdrIP: string;
    dateop: Date;
    user  : userForm;
  }