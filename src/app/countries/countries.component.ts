import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  constructor(private coutries: CountriesService) {
    this.displayedColumns = ['flag', 'name', 'cap', 'op'];
    console.warn('DS: ', this.dataSource)
  }



  ngOnInit(): void {
    this.getCoutries();
  }

  async getCoutries() {
    await this.coutries.getAllCoutries()
      .subscribe(res => {
        console.log('RETORNO: ' + JSON.stringify(res));
        this.dataSource = res;
      }, err => {
        console.error('ERROR: ,' + err.message);
      }
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue.trim().toLowerCase());

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
