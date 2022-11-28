import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  fetchSourceCodeFromAddress(address: string, headers: any): Observable < any > {
    return this.httpClient.post('http://localhost:5000/fetchSourceCode', address, headers);
  }

  parseSourceCode(sourceCode: any, headers: any): Observable < any > {
    return this.httpClient.post('http://localhost:5000/parseSourceCode', sourceCode, headers);
  }

  parseFile(file: File, headers: any): Observable < any > {
    return this.httpClient.post('http://localhost:5000/parseFile', file, headers);
  }

  lintAllFiles(): Observable < any > {
    return this.httpClient.get('http://localhost:5000/lintAllFiles');
  }
}
