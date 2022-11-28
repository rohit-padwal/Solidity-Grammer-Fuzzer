import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {

  form: FormGroup = new FormGroup({
    contractAddress: new FormControl(['']),
    sourceCode: new FormControl(['']),
    solidityFile: new FormControl([{} as File]),
  });

  file: File = {} as File;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private httpClient: HttpClient, private apiService: ApiService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      contractAddress: new FormControl(['']),
      sourceCode: new FormControl(['']),
      solidityFile: new FormControl([{} as File]),
    });
  }


  uploadFile() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    let options = { headers: headers };

    let formParams = new FormData();
    formParams.append('file', this.file);
    if (this.file) {
      this.httpClient.post('http://127.0.0.1:5000/parseFile', formParams, options).subscribe(data => {
        console.log(data);
        this.snackBar.open(`${this.file.name} uploaded successfully.`, '', {
          duration: 2000
        });
      })
    }
  }

  chooseFile(e: any): void {
    if (e.target.files && e.target.files[0]) {
      this.form.patchValue({
        solidityFile: e.target.files[0]
      });
    } else {
      // this.file.name = 'Choose a File';
    }
  }

  goToResultsTab() {
    debugger;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    let options = { headers: headers };
    // if (this.form.get('contractAddress')?.value !== '') {
    //   const contractAddress: string = this.form.get('contractAddress')?.value;
    //   this.apiService.fetchSourceCodeFromAddress(contractAddress, options).subscribe(res => {
    //     console.log(res);
    //   })
    // } else 
    if (this.form.get('sourceCode')?.value) {
      const sourceCode = {
        "SourceCode": this.form.get('sourceCode')?.value
      }
      this.apiService.parseSourceCode(sourceCode, options).subscribe(res => {
        console.log(res);
      })
    } else if (this.form.get('solidityFile')?.value) {

    } else {

    }
  }

  goToMetricsTab() {
    // this.selected = 2;
  }

  submitForm() {

  }
}
