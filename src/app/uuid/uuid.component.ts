import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import copy from 'copy-text-to-clipboard';
import { AnalyticsService } from 'src/app/analytics.service';
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
  private copyTimeout: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  copyToClip() {
    this.analyticsService.emitEvent('click', 'copyToClipboard');
    this.copied = false;
    window.clearTimeout(this.copyTimeout);
    const success = copy(this.uuid);
    if (success) {
      this.copied = true;
      this.copyTimeout = window.setTimeout(() => (this.copied = false), 1500);
    }
  }

  fetchUuid(version = this.uuidVersion) {
    this.analyticsService.emitEvent('click', 'refreshUuidClient');
    this.uuid = this.uuidService.makeUuid(version);
  }
}
