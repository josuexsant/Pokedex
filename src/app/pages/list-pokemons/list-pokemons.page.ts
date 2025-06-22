import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { NavParams, NavController } from '@ionic/angular';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
  standalone: false,
})
export class ListPokemonsPage implements OnInit {
  public pokemons: Pokemon[];

  constructor(
    private pokemosService: PokemonService,
    private loading: LoadingController,
    private navParams: NavParams,
    private navController: NavController
  ) {
    this.pokemons = [];
  }

  ngOnInit() {
    this.morePokemons();
  }

  async morePokemons($event = null) {
    const promise = this.pokemosService.getPokemon();
    if (promise) {
      if (!$event) {
        let loading = await this.loading.create({
          message: 'Cargando...',
        });
        await loading.present();
      }

      promise
        .then((result: Pokemon[]) => {
          console.log(result);

          this.pokemons = this.pokemons.concat(result);
          console.log(this.pokemons);
          if ($event) {
            $event.target.complete();
          }

          if (this.loading) {
            this.loading.dismiss();
          }
        })
        .catch((error) => {
          console.error('Error fetching pokemons:', error);
        });
    }
  }

  goToDetail(pokemon: Pokemon) {
    this.navParams.data['pokemon'] = pokemon;
    this.navController.navigateForward('/detail-pokemon');
  }
}
