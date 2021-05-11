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
  uuid = '00000000-0000-0000-0000-000000000000';
  copied = false;
  isLoading = true;
  clientOnly = false;
  openOptions = false;
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
      this.uuidVersion = +paramsMap.get('version');
      if (this.uuidVersion) {
        this.fetchUuid(this.uuidVersion);
      } else {
        this.router.navigate(['v', '4']);
      }
    });
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

  fetchUuid(version = this.uuidVersion) {
    this.isLoading = true;
    if (this.clientOnly) {
      this.analyticsService.emitEvent('click', 'refreshUuidClient');
      this.uuid = this.uuidService.makeUuid(version);
      this.isLoading = false;
    } else {
      this.analyticsService.emitEvent('click', 'refreshUuidServer');
      const httpEndpoint = `${environment.apiEndpoint}/v/${version}`;
      this.http.get<string[]>(httpEndpoint).subscribe(
        (response) => {
          this.isLoading = false;
          this.uuid = response[0];
        },
        () => {
          this.isLoading = false;
          this.clientOnly = true;
          this.fetchUuid(version);
        },
      );
    }
  }
}
