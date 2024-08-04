import { roleForm } from "./roleForm";

export class userForm {
    id!: number ;
    username     !: string;
    email        !: string;
    password     !:string;
    roles !: roleForm[] ;
    }