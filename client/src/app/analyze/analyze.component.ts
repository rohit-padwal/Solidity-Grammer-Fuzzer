import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {

  form: FormGroup;
  contractAddress: string;
  sourceCode: string;
  solidityFile: File;

  constructor(private router: Router, private snackBar: MatSnackBar, private apiService: ApiService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      contractAddressForm: new FormControl(['']),
      sourceCodeForm: new FormControl(['']),
      solidityFileForm: new FormControl([{} as File]),
    });
  }

  resetAddressForm() {
    this.form.patchValue({
      contractAddressForm: ''
    });
  }

  resetSourceCodeForm() {
    this.form.patchValue({
      sourceCodeForm: ''
    });
  }

  resetFileForm() {
    this.form.patchValue({
      solidityFileForm: {} as File
    });
  }


  parseFile() {
    this.resetAddressForm();
    this.resetSourceCodeForm();
    const formData = new FormData();

    let fileReader = new FileReader();
    fileReader.readAsText(this.form.get('solidityFileForm').value);
    fileReader.onload = (e) => {
      this.form.patchValue({
        sourceCodeForm: fileReader.result
      });
    }

    formData.append('file', this.form.get('solidityFileForm').value);
    // this.apiService.parseFile(formData).subscribe((res) => {
    //   this.apiService.parseResults = res.response;
    //   this.router.navigateByUrl('/metrics');
    // });
  }

  chooseFile(e: any): void {
    if (e.target.files && e.target.files[0]) {
      this.form.patchValue({
        solidityFileForm: e.target.files[0]
      });
    }
  }

  goToResultsTab() {
    this.resetAddressForm();
    this.resetFileForm();
    if (this.form.get('sourceCodeForm')?.value) {
      const sourceCode = {
        "SourceCode": this.form.get('sourceCodeForm')?.value
      }
      this.apiService.parseSourceCode(sourceCode).subscribe(res => {
        this.apiService.parseResults = res.response;
        this.router.navigateByUrl('/metrics');
      })
    }
  }

  fetchCode() {
    this.resetFileForm();
    this.resetSourceCodeForm();
    if (this.form.get('contractAddressForm')?.value) {
      const address = {
        "address": this.form.get('contractAddressForm')?.value
      }
      this.apiService.fetchSourceCodeFromAddress(address).subscribe(res => {
        if(res === 'Invalid Address Format') {
          this.snackBar.open('Invalid address format', '', {
            duration: 5000
          });
        } else if(res[0]['SourceCode'] === '') {
          this.snackBar.open('Source Code not found!', '', {
            duration: 5000
          });
        } else {
          this.form.patchValue({
            sourceCodeForm: res[0]['SourceCode']
          });
          this.snackBar.open('Source Code added in the editor', '', {
            duration: 5000
          });
        }
      })
    }
  }
}
