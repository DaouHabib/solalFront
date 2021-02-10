import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { APIS } from "../../config";
import { Observable } from 'rxjs';

@Injectable({ providedIn: "root" })
export class UserService {

    private connectedUser: any; // TODO Model

    constructor(private http: HttpClient) { }

    getConnectedUser(): string {
        return this.connectedUser;
    }

    setConnectedUser(connectedUser: any): void {
        this.connectedUser = connectedUser;
    }
    Adduser(user: any): Observable<any> {

        return this.http.post<any>(
            `${APIS.USERS}`,
            user
        );
    }
    sendEmail(email:any):any {
        return this.http.post<any>("http://localhost:3000/users/sendEmail",email);
    }
    
    getAll(): Observable<any> {
        return this.http.get<any[]>(`${APIS.USERS}`);
    }

    edit(user: any, id: any): Observable<any> {
        return this.http.put<any>(`${APIS.USERS}/${id}`, user);
    }

    getuserByid(id: string): Observable<any> {
        return this.http.get<any[]>(`${APIS.USERS}/${id}`);
    }
    getEmployees(id : any): Observable<any> {

        return this.http.get<any>(`${APIS.USERS}/entreprise/${id}`);
    }
    AddEmployee(user: any,id : any): Observable<any> {

        return this.http.post<any>(
            `${APIS.USERS}/entreprise/${id}`,
            user
        );
    }
    getuser(): Observable<any> {
        return this.http.get<any[]>(`${APIS.USERS}/me`);
    }


    delete(id: any): Observable<any> {
        return this.http.delete(`${APIS.USERS}/${id}`);
    }


}

