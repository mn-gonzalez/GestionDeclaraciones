import { Persona } from "../persona";

export class LoginDTO{
    login: boolean;
    mensaje: string;
    access_token: string;
    token_type: string;
    expires_in: number;
    usuario : Persona;
}