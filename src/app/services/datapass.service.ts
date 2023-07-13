import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatapassService {

  PHP_PRO_SERVER = "http://localhost/ang-php-mysql/orderrr";

  constructor(private httpClient: HttpClient) { }

  read_repots_detail(){
		return this.httpClient.get<any>(`${this.PHP_PRO_SERVER}/get_details.php`);
	}

}
