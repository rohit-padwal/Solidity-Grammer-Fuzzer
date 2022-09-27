import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {

  filename: string = 'Choose a File';

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  uploadFile(filename: string) {
    if(filename !== 'Select File') {
      this.snackBar.open(`${filename} uploaded successfully.`, '', {
        duration:2000
      });
    }
  }

  chooseFile(e: any): void {
    if (e.target.files && e.target.files[0]) {
      const file: File = e.target.files[0];
      this.filename = file.name;
    } else {
      this.filename = 'Choose a File';
    }
  }
}
