import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { Router } from '@angular/router';
//import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input
          type="text"
          placeholder="Filter by city"
          #filter
          (input)="filterResults(filter.value)"
        />
        <button
          class="primary"
          type="button"
          (click)="filterResults(filter.value)"
        >
          Search
        </button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let item of filteredLocationList"
        [housingLocation]="item"
        (notify)="notifyFromChild($event)"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  //housingService: HousingService = inject(HousingService);

  constructor(private housingService: HousingService, private router: Router) {
    this.housingService
      .getAllHousingLocations()
      .then((houseingLocationList) => {
        this.housingLocationList = houseingLocationList;
        this.filteredLocationList = this.housingLocationList;
      });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }

  notifyFromChild(hl: HousingLocation) {
    console.log('notify from child: ' + hl);
    this.router.navigateByUrl('/details/' + hl.id);
  }
}
