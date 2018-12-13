import { Injectable } from '@angular/core';
import { v1, v4 } from 'uuid';
@Injectable({
  providedIn: 'root',
})
export class UuidService {
  constructor() {}

  makeUuid(version: number) {
    switch (version) {
      case 1:
        return v1();
      case 4:
        return v4();
    }
  }
}
