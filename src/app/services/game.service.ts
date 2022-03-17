import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, pipe, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../interfaces/interface';



@Injectable({
  providedIn: 'root'
})
export class GameService {
  private juegos: Game[] = []
  constructor(private http: HttpClient) { }

  getNominados() {
    if (this.juegos.length === 0) {
      
      return this.http.get<Game[]>(`${environment.url}/goty`)
        .pipe(
          tap(
            juegos => this.juegos = juegos
          )
        )
    } else {
      
      return of(this.juegos);

    }

  }

  votarJuego(id:string){
    return this.http.post<{ok:boolean,msg:string}>(`${environment.url}/goty/${id}`,{})
      .pipe(
        catchError(error=>{
          
          return of(error.error)
        })
      )
  }



}

