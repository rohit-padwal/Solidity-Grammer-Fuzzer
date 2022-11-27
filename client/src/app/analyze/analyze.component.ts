import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {

  file: File = {} as File;
  
  constructor(private snackBar: MatSnackBar,private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  uploadFile() {   
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*' });

  let options = { headers: headers };

    let formParams = new FormData();
    formParams.append('file', this.file);
    if(this.file) {
      this.httpClient.post('http://127.0.0.1:5000/parseFile', formParams,options).subscribe(data => {
      console.log(data);
      this.snackBar.open(`${this.file.name} uploaded successfully.`, '', {
        duration:2000
      });
    })
      
    }
  }

  chooseFile(e: any): void {
    if (e.target.files && e.target.files[0]) {
      //console.log(e.target.files[0]);
      this.file = e.target.files[0];;
    } else {
      // this.file.name = 'Choose a File';
    }
  }

  sendFile() {
    
  }

}
