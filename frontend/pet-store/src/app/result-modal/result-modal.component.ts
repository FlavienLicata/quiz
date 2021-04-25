import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Participant } from "../models/participant";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-results-participant-modal',
  templateUrl: './result-modal.component.html',
  styleUrls: ['./result-modal.component.css']
})
export class ResultModalComponent implements OnInit {

   constructor(
      public dialogRef: MatDialogRef<ResultModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
   ) {}

    public participant = new Participant();
    displayedColumns: string[] = ['question', 'reponse', 'resultat', 'correct'];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.participant = this.data[0];
    this.dataSource = new MatTableDataSource(this.data[1]);
    this.dataSource.paginator = this.paginator;
    }
}
