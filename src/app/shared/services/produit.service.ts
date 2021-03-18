import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { APIS } from "../../config";
import { Observable } from 'rxjs';

@Injectable({ providedIn: "root" })
export class Produitservice {


    constructor(private http: HttpClient) { }


    AddProduit(produit: any): Observable<any> {

        return this.http.post<any>(
            `${APIS.PRODUIT}`,
            produit
        );
    }
    
    getAll(): Observable<any> {
        return this.http.get<any[]>(`${APIS.PRODUIT}`);
    }

    edit(produit: any, id: any): Observable<any> {
        return this.http.put<any>(`${APIS.PRODUIT}/${id}`, produit);
    }

    getchampByid(id: number): Observable<any> {
        return this.http.get<any[]>(`${APIS.PRODUIT}/${id}`);
    }

    delete(id: any): Observable<any> {
        return this.http.delete(`${APIS.PRODUIT}/${id}`);
    }


}

