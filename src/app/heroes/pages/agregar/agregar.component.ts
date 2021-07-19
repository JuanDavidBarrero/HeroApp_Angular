import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`

  .formulario{
    height:70%
  }
  img{
    width:100%;
    border-radius: 50px;
  }`]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(private heroeService: HeroesService, private activateRoute: ActivatedRoute, private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activateRoute.params
      .pipe(switchMap(({ id }) => this.heroeService.getHeroePorId(id)))
      .subscribe(heroe => this.heroe = heroe)

  }

  guardar() {

    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      this.heroeService.actualizarHeroe(this.heroe).subscribe(resp => this.mostrarSnackbar('Registros actualizado'))
    } else {
      this.heroeService.agregarHeroe(this.heroe).subscribe(resp => {
        this.router.navigate(['/heroes/editar', resp.id])
        this.mostrarSnackbar("Registro creado");
      });
    }
  }

  borrarHeroe() {
    this.heroeService.borrarHeroe(this.heroe.id!).subscribe(resp => { this.router.navigate(['/heroes']) })
  }

  mostrarSnackbar(mensaje: string) {
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    })
  }

}
