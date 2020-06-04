import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetService } from "src/app/services/pet.service";
import { Pet } from "src/app/models/pet";
import { Types } from "src/app/models/types";
import { Genres } from "src/app/models/genres";
import { Races } from "src/app/models/races";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private petService: PetService,
  private spinner: NgxSpinnerService, private router: Router, private toast: ToastrService) { }

  public pet = new Pet();
  formGroup: FormGroup;

  types = Object.keys(Types).filter(p => !Number.isInteger(parseInt(p)));
  genres = Object.keys(Genres).filter(p => !Number.isInteger(parseInt(p)));
  races = Object.keys(Races).filter(p => !Number.isInteger(parseInt(p)));

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'name': [null, Validators.required],
      'color': [null, Validators.required],
      'age': ['', [Validators.required, Validators.min(1)]],
      'weight': [null, [Validators.required, Validators.min(0.1)]],
      'race': [null, Validators.required],
      'type': [null, Validators.required],
      'genre': [null, Validators.required],
      'description': [null, Validators.required],
      'price': [null, [Validators.required, Validators.min(1)]]
    });
  }

  get age(): any {
    return this.formGroup.get('age');
  }

  get weight(): any {
    return this.formGroup.get('weight');
  }

  get price(): any {
    return this.formGroup.get('price');
  }

  onSubmit(post) {
    this.pet = post;
    this.spinner.show();
    this.petService.save(this.pet).subscribe( result => {
      if (result && result != null) {
        this.spinner.hide();
        this.toast.success('The pet ' + result.name + ' was successfully added', 'Success');
        setTimeout(() => this.router.navigate(['/home']), 2000);
        return;
      }
    },
    error => {
      this.spinner.hide();
      this.toast.error('An error occured when adding the new pet');
    }
    );
  }

  getRace(race: Races): String {
    return Races[race];
  }
}
