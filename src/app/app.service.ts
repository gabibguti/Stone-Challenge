import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IFuncionario} from './funcionario';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor (private http: HttpClient) {}

  getFuncionarios(): Observable<IFuncionario[]> {
    return this.http.get<IFuncionario[]>('challenge/funcionarios');
  }

  addFuncionario(novoFuncionario: IFuncionario): Observable<any> {
    return this.http.post('challenge/funcionarios', novoFuncionario);
  }

  deleteFuncionario(idFuncionario: number): Observable<any> {
    return this.http.delete('challenge/funcionarios?id=' + idFuncionario.toString());
  }

  updateFuncionario(idFuncionario: string, nomeFuncionario: string = null,
                    cargoFuncionario: string = null, idadeFuncionario: number = null): Observable<any> {
    return this.http.put('challenge/funcionarios', {
      params: {
        id: idFuncionario,
        nome: nomeFuncionario,
        cargo: cargoFuncionario,
        idade: idadeFuncionario
      }
    });
  }
}
