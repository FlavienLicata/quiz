import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Pet } from "src/app/models/pet";
import { Races } from "src/app/models/races";
import { PetModalComponent } from 'src/app/pet-modal/pet-modal.component'
import { DeletePetModalComponent } from 'src/app/delete-pet-modal/delete-pet-modal.component'
import { PetService } from "src/app/services/pet.service";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {

  public pets: Pet[] = [];
  public pet = new Pet();
  constructor(private petService: PetService, public dialog: MatDialog,
  private changeDetectorRefs: ChangeDetectorRef, private spinner: NgxSpinnerService, private toast: ToastrService) { }

  displayedColumns: string[] = ['name', 'type', 'race', 'genre', 'price', 'action'];
  dataSource = new MatTableDataSource<Pet>(this.pets);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.spinner.show();
    this.petService.findAll().subscribe( result => {
      if (result && result != null) {
        this.spinner.hide();
        result.map(x => this.pets.push(x));
        this.dataSource = new MatTableDataSource<Pet>(this.pets);
        this.dataSource.paginator = this.paginator;
        this.spinner.hide();
        return;
      }
    },
    error => {
      this.spinner.hide();
      this.toast.error('An error occured when charging data');
    }
    );
  }

  findById(id) {
    this.spinner.show();
    this.petService.findById(id).subscribe( result => {
      if (result && result != null) {
        this.pet = result;
        const dialogRef = this.dialog.open(PetModalComponent, {
          width: '550px',
          height: '500px',
          data: this.pet
        });
        this.spinner.hide();
        dialogRef.afterClosed().subscribe(() => {
          this.pets = [];
          this.findAll();
          this.changeDetectorRefs.detectChanges();
        });
        return;
      }
    },
    error => {
      this.spinner.hide();
      this.toast.error('An error occured when charging pet data');
    }
    );
  }

  openDialog(id): void {
    this.findById(id);
  }

  delete(pet): void {
    this.pet = pet;
    const dialogRef = this.dialog.open(DeletePetModalComponent, {
      width: '250px',
      data: pet
    });

    dialogRef.afterClosed().subscribe(() => {
      this.pets = [];
      this.findAll();
      this.changeDetectorRefs.detectChanges();
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRace(race: Races): String {
    return Races[race];
  }

}
