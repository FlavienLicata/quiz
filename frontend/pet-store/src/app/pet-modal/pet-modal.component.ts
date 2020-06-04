import { Component, Inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pet } from "src/app/models/pet";
import { PetService } from "src/app/services/pet.service";
import { Types } from "src/app/models/types";
import { Genres } from "src/app/models/genres";
import { Races } from "src/app/models/races";
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pet-modal',
  templateUrl: './pet-modal.component.html',
  styleUrls: ['./pet-modal.component.css']
})
export class PetModalComponent implements OnInit {

   constructor(
      private formBuilder: FormBuilder,
      private petService: PetService,
      private toast: ToastrService,
      private spinner: NgxSpinnerService,
      public dialogRef: MatDialogRef<PetModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Pet) {}

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
        'name': [this.data.name, Validators.required],
        'color': [this.data.color, Validators.required],
        'age': [this.data.age, [Validators.required, Validators.min(1)]],
        'weight': [this.data.weight, [Validators.required, Validators.min(0.1)]],
        'race': [this.getRace(this.data.race), Validators.required],
        'type': [this.data.type, Validators.required],
        'genre': [this.data.genre, Validators.required],
        'description': [this.data.description, Validators.required],
        'price': [this.data.price, [Validators.required, Validators.min(1)]]
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

    getRace(race: Races): String {
      return Races[race];
    }

    onSubmit(post) {
      this.pet = post;
      this.pet.id = this.data.id;

      this.spinner.show();
      this.petService.save(this.pet).subscribe( result => {
        if (result && result != null) {
          this.spinner.hide();
          this.toast.success('The pet ' + result.name + ' was successfully updated', 'Success');
          setTimeout(() => this.dialogRef.close(), 1000);
          return;
        }
      },
      error => {
        this.spinner.hide();
        this.toast.error('An error occured when adding the new pet');
      }
      );
    }
}
