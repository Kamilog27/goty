import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/interface';
import { GameService } from 'src/app/services/game.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  juegos:Game[]=[];
  constructor(private gameService:GameService) { }

  ngOnInit(): void {
    this.gameService.getNominados()
      .subscribe(game=>{
        this.juegos=game;
      })
  }
  votarJuego(id:string){
    
    this.gameService.votarJuego(id)
      .subscribe((resp:{ok:boolean,msg:string})=>{
        if(resp.ok){
          Swal.fire('Ha votado!!!',resp.msg,'success')
        }else{
          Swal.fire('Error!!!',resp.msg,'error')
          
        }
      })
  }
}
