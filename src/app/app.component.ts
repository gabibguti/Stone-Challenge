import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Funcionario} from './funcionario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit {
  title = 'StoneChallenge';
  funcionarios: Funcionario[];

  constructor (private http: HttpClient) {}

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>('challenge/funcionarios');
  }

  ngOnInit() {
    this.getFuncionarios().subscribe(data => (this.funcionarios = data));
  }
}
