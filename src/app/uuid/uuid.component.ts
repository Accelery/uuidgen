import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as copy from 'copy-to-clipboard';
import { AnalyticsService } from 'src/app/analytics.service';
import { environment } from 'src/environments/environment';
import { UuidService } from './uuid.service';

@Component({
  selector: 'app-uuid',
  templateUrl: './uuid.component.html',
  styleUrls: ['./uuid.component.scss'],
})
export class UuidComponent implements OnInit {
  uuidVersion: number;
  copied = false;
  uuid: string;
  isLoading = true;
  clientOnly = false;
  openOptions = false;
  private HTTP_API_ENDPOINT: string;
  private copyTimeout: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private analyticsService: AnalyticsService,
    private uuidService: UuidService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramsMap: ParamMap) => {
      this.initializeUuid();
      this.uuidVersion = +paramsMap.get('version');
      if (this.uuidVersion) {
        this.HTTP_API_ENDPOINT =
          environment.apiEndpoint + '/v' + this.uuidVersion;
        this.fetchUuid();
      } else {
        this.router.navigate(['v', '4']);
      }
    });
  }

  private initializeUuid() {
    this.uuid = '00000000-0000-0000-0000-000000000000';
  }

  refresh() {
    this.fetchUuid();
  }

  onSliderChange($event: MatSlideToggleChange) {
    this.clientOnly = !$event.checked;
  }
  toggleShowOptions() {
    this.openOptions = !this.openOptions;
  }

  copyToClip() {
    this.analyticsService.emitEvent('click', 'copyToClipboard');
    this.copied = false;
    window.clearTimeout(this.copyTimeout);
    const success = copy(this.uuid);
    if (success) {
      this.copied = true;
      this.copyTimeout = window.setTimeout(() => (this.copied = false), 1000);
    }
  }

  private fetchUuid() {
    this.isLoading = true;
    if (this.clientOnly) {
      this.analyticsService.emitEvent('click', 'refreshUuidClient');
      this.uuid = this.uuidService.makeUuid(this.uuidVersion);
      this.isLoading = false;
    } else {
      this.analyticsService.emitEvent('click', 'refreshUuidServer');
      this.http
        .get<{ message: string; uuid: string }>(this.HTTP_API_ENDPOINT)
        .subscribe(
          response => {
            this.isLoading = false;
            this.uuid = response.uuid;
          },
          error => {
            this.isLoading = false;
            this.clientOnly = true;
            this.fetchUuid();
          },
        );
    }
  }
}
