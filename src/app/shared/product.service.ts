import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { FbResponse, Product } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  create(product) {
    return this.http.post(`${environment.fbDbUrl}/products.json`, product).pipe(
      map((res: FbResponse) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date),
        };
      })
    );
  }
  getAll() {
    return this.http.get(`${environment.fbDbUrl}/products.json`).pipe(
      map((res) => {
        return Object.keys(res).map((key) => ({
          ...res[key],
          id: key,
          date: new Date(res[key].date),
        }));
      })
    );
  }
  getById(id) {
    console.log(id);
    return this.http.get(`${environment.fbDbUrl}/products/${id}.json`).pipe(
      map((res: Product) => {
        console.log(res);
        return {
          ...res,
          id,
          date: new Date(res.date),
        };
      })
    );
  }
}
