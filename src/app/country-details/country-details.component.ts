import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {

  countryName: string;
  country: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private coutries: CountriesService
  ) {
    this.countryName = this.activatedRoute.snapshot.paramMap.get('name');
    console.log('CNAME: ', this.countryName);
  }

  ngOnInit(): void {
    this.getCoutries();
  }

  async getCoutries() {
    await this.coutries.getCountry(this.countryName)
      .subscribe(res => {
        console.log('RETORNO COUNTRY: ' + JSON.stringify(res));
        this.country = res[0];
        console.log('COUNTRY NAME: ' + JSON.stringify(this.country.name));

      }, err => {
        console.error('ERROR: ,' + err.message);
      }
      );
  }
}
