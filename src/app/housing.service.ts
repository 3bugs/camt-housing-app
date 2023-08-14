import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  readonly url = 'http://localhost:3000/locations';

  constructor() {}

  // getAllHousingLocations(): HousingLocation[] {
  //   return this.housingLocationList;
  // }
  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  // getHousingLocationById(id: number): HousingLocation | undefined {
  //   return this.housingLocationList.find(
  //     (housingLocation) => housingLocation.id === id
  //   );
  // }
  async getHousingLocationById(
    id: number
  ): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Homes application received: firstName: ${firstName}, 
                 lastName: ${lastName}, email: ${email}.`);
  }
}
