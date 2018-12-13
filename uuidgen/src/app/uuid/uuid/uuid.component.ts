import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as copy from 'copy-to-clipboard';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-uuid',
  templateUrl: './uuid.component.html',
  styleUrls: ['./uuid.component.scss'],
})
export class UuidComponent implements OnInit, OnDestroy {
  uuidVersion: string;
  copied = false;
  uuid: string;
  private HTTP_API_ENDPOINT: string;
  private copyTimeout: number;
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramsMap: ParamMap) => {
      this.uuidVersion = paramsMap.get('version');
      this.HTTP_API_ENDPOINT =
        environment.apiEndpoint + '/v' + this.uuidVersion;
      this.fetchUuid();
    });
  }

  refresh() {
    this.fetchUuid();
  }
  ngOnDestroy() {}

  copyToClip() {
    // Reset everything!
    this.copied = false;
    window.clearTimeout(this.copyTimeout);

    const success = copy(this.uuid);
    if (success) {
      this.copied = true;
      this.copyTimeout = window.setTimeout(() => (this.copied = false), 1000);
    }
  }

  fetchUuid() {
    this.http
      .get<{ message: string; uuid: string }>(this.HTTP_API_ENDPOINT)
      .subscribe(response => {
        this.uuid = response.uuid;
      });
  }
}
