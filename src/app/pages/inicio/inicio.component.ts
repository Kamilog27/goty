import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  juegos:any[]=[];
  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore.collection('goty').valueChanges()
      .pipe(
        map((resp:any[])=>resp.map(({name,votos})=>({name,value:votos})))
      )
      .subscribe(juegos=>{
        // console.log(juegos)
        this.juegos=juegos;
      })
  }

}
