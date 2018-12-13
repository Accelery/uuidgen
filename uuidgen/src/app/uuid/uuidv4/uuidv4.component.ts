import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const HTTP_API_ENDPOINT = environment.apiEndpoint + '/v4';

@Component({
  selector: 'app-uuidv4',
  templateUrl: './uuidv4.component.html',
  styleUrls: ['./uuidv4.component.scss'],
})
export class Uuidv4Component implements OnInit {
  uuid: string;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUuid();
  }

  fetchUuid() {
    this.http
      .get<{ message: string; uuid: string }>(HTTP_API_ENDPOINT)
      .subscribe(response => {
        this.uuid = response.uuid;
      });
  }
}
