import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Product } from "../product";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ProductPageService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) {}

  getProductByName(params: any) {
    const endpoint = "http://localhost:8080/productByName?name=" + params.name;
    return this.http.get(endpoint);
  }
}
