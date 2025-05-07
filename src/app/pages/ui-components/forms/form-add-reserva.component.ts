import { Component , ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {provideNativeDateAdapter} from '@angular/material/core';


interface Food {
  value: string;
  viewValue: string;
}




@Component({
  selector: 'app-form-add-reserva',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule

  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-add-reserva.component.html',
  styles: ``
})
export class FormAddReservaComponent {

  value: Date;

  selectedValue: string;
 

  foods: Food[] = [
    {value: 'Dentro', viewValue: 'Dentro'},
    {value: 'Fuera', viewValue: 'Fuera'},
  ];

  country: Food[] = [
    { value: 'steak-0', viewValue: 'USA' },
    { value: 'pizza-1', viewValue: 'India' },
    { value: 'tacos-2', viewValue: 'France' },
    { value: 'tacos-3', viewValue: 'UK' },
  ];

  selectedCountry = this.country[2].value;

  city: Food[] = [
    { value: 'steak-0', viewValue: 'Mexico' },
    { value: 'pizza-1', viewValue: 'Mumbai' },
    { value: 'tacos-2', viewValue: 'Tokyo' },
    { value: 'tacos-3', viewValue: 'New York' },
  ];

  selectedCity = this.city[1].value;

  state: Food[] = [
    { value: 'steak-0', viewValue: 'Cuba' },
    { value: 'pizza-1', viewValue: 'Djibouti' },
    { value: 'tacos-2', viewValue: 'Bulgaria' },
    { value: 'tacos-3', viewValue: 'Cabo Verde' },
  ];

  selectedState = this.state[3].value;

}
