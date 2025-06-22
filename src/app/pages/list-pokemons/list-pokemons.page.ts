import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
  standalone: false,
})
export class ListPokemonsPage implements OnInit {
  public pokemons: Pokemon[];

  constructor(private pokemosService: PokemonService) {
    this.pokemons = [];
  }

  ngOnInit() {
    this.morePokemons();
  }

  morePokemons($event = null) {
    const promise = this.pokemosService.getPokemon();
    if (promise) {
      promise
        .then((result: Pokemon[]) => {
          console.log(result);

          this.pokemons = this.pokemons.concat(result);
          console.log(this.pokemons);
          if ($event) {
            $event.target.complete();
          }
        })
        .catch((error) => {
          console.error('Error fetching pokemons:', error);
        });
    }
  }
}
