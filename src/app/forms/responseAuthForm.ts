import { roleForm } from "./roleForm";

export class ResAuthForm {
    id!: number ;
    username  !: string;
    email  !: string;
    token  !: string;
    type     !:string;
    roles !: roleForm[] ;
    //private List<String> roles;
    
    }