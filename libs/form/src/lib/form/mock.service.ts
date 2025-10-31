import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";

export interface Feature {
  code: string;
  label: string;
  value: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MockService {
  getFeatures(): Observable<Feature[]> {
    return of([
      {
        code: 'left',
        label: 'Подьем на этаж',
        value: true
      },
      {
        code: 'strong-package',
        label: 'Усиленная упаковка',
        value: true
      },
      {
        code: 'fast',
        label: 'Ускоренная доставка',
        value: false
      }
    ])
  }
}

