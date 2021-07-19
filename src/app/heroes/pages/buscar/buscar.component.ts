import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: []
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];

  heroeSelecionado: Heroe | undefined;

  constructor(private heroService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando() {
    this.heroService.getSugerencia(this.termino.trim()).subscribe(heroes => this.heroes = heroes)
  }

  opcionSelecionada(event: MatAutocompleteSelectedEvent) {

    if (!event.option.value) {
      this.heroeSelecionado = undefined;
      return;
    }

    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;

    this.heroService.getHeroePorId(heroe.id!).subscribe(heroe => this.heroeSelecionado = heroe);

  }

}
