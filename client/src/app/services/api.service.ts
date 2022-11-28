import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  parseResults: any;

  fetchSourceCodeFromAddress(address: any): Observable < any > {
    return this.httpClient.post('http://127.0.0.1:5000/fetchSourceCode', address);
  }

  parseSourceCode(sourceCode: any): Observable < any > {
    return this.httpClient.post('http://127.0.0.1:5000/parseSourceCode', sourceCode);
  }

  parseFile(file: any): Observable < any > {
    return this.httpClient.post('http://127.0.0.1:5000/parseFile', file);
  }

  lintAllFiles(files: any): Observable < any > {
    return this.httpClient.post('http://127.0.0.1:5000/lintAllFiles', files);
  }
}
