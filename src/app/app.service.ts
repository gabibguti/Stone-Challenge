import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IFuncionario} from './funcionario';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  // Change URL to extern API URL
  baseUrl = environment.apiUrl;

  constructor (private http: HttpClient) {
    console.log('APP SERVICE');
    console.log(environment.production, environment.apiUrl);
    console.log(this.baseUrl);
  }

  getFuncionarios(): Observable<IFuncionario[]> {
    const url = this.baseUrl + 'challenge/funcionarios';
    console.log('GET FUNCIONARIOS');
    console.log(url);
    return this.http.get<IFuncionario[]>(url);
  }

  addFuncionario(novoFuncionario: IFuncionario): Observable<any> {
    const url = this.baseUrl + 'challenge/funcionarios';
    return this.http.post(url, novoFuncionario);
  }

  deleteFuncionario(idFuncionario: number): Observable<any> {
    const url = this.baseUrl + 'challenge/funcionarios';
    return this.http.delete(url + '?id=' + idFuncionario.toString());
  }

  updateFuncionario(idFuncionario: string, nomeFuncionario: string = null,
                    cargoFuncionario: string = null, idadeFuncionario: number = null): Observable<any> {
    let url = this.baseUrl + 'challenge/funcionarios';
    // ID
    url = url + '?id=' + idFuncionario.toString();
    // Nome
    if (nomeFuncionario) {
      url = url + '&nome=' + nomeFuncionario.toString();
    }
    // Idade
    if (idadeFuncionario) {
      url = url + '&idade=' + idadeFuncionario.toString();
    }
    // Cargo
    if (cargoFuncionario) {
      url = url + '&cargo=' + cargoFuncionario.toString();
    }

    return this.http.put(url, {});
  }
}
