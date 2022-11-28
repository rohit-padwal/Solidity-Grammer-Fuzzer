import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-lint',
  templateUrl: './lint.component.html',
  styleUrls: ['./lint.component.scss']
})
export class LintComponent implements OnInit {

  form: FormGroup;
  result: string;
  files: string[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      solidityFileForm: new FormControl([{} as File]),
    });
  }

  parseFile() {
    const formData = new FormData();
    for(let i = 0; i < this.files.length; i++) {
      formData.append('file', this.files[i]);
    }
    this.apiService.lintAllFiles(formData).subscribe((res) => {
      console.log(res);
    });
  }

  chooseFile(e: any): void {
    if (e.target.files) {
      for(var i=0; i<e.target.files.length; i++) {
        this.files.push(e.target.files[i]);
      }
      this.form.patchValue({
        solidityFileForm: e.target.files
      });
    }
  }
}
