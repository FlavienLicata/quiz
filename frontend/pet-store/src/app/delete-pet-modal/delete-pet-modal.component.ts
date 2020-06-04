import { Component, Inject } from '@angular/core';
import { Pet } from "src/app/models/pet";
import { PetService } from "src/app/services/pet.service";
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-pet-modal',
  templateUrl: './delete-pet-modal.component.html',
  styleUrls: ['./delete-pet-modal.component.css']
})
export class DeletePetModalComponent {

  constructor(
    private petService: PetService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<DeletePetModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pet) {}

  delete(pet) {
    this.spinner.show();
    this.petService.delete(pet.id).subscribe( result => {
     if (result && result != null) {
       this.spinner.hide();
       this.toast.success('The pet was successfully deleted', 'Success');
       this.dialogRef.close();
       return;
     }
   },
   error => {
     this.spinner.hide();
     this.toast.error('An error occured when charging data');
   }
   );
  }

}
