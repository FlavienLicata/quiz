import { Component } from '@angular/core';
import { PetService } from "src/app/services/pet.service";
import { Pet } from "src/app/models/pet";
import { SearchForm } from "src/app/models/searchForm";
import { Types } from "src/app/models/types";
import { Races } from "src/app/models/races";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent {

  public pets: Pet[] = [];
  public searchForm: SearchForm = {
    name: '',
    type: null,
    race: null
  };

  constructor(private petService: PetService, private spinner: NgxSpinnerService, private toast: ToastrService) { }

  types = Object.keys(Types).filter(p => !Number.isInteger(parseInt(p)));
  races = Object.keys(Races).filter(p => !Number.isInteger(parseInt(p)));

  search () {
  console.info(this.searchForm);
    this.pets = [];

    this.spinner.show();
    this.petService.findWithForm(this.searchForm).subscribe( result => {
      if (result && result != null) {
        this.spinner.hide();
        result.map(x => this.pets.push(x));
        return;
      }
    },
    error => {
      this.spinner.hide();
      this.toast.error('An error occured when charging data');
    }
    );
  }

  getRace(race: Races): String {
    return Races[race];
  }

}
