import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {

  fileName: string = 'Select File';

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  uploadFile(fileName: string) {
    if(fileName !== 'Select File') {
      this.snackBar.open(`${fileName} uploaded successfully.`, '', {
        duration:2000
      });
    }
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.fileName = file.name;
    } else {
      this.fileName = 'Select File';
    }
  }
}
