import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Pokemon } from 'src/app/models/pokemon';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
  standalone: false,
})
export class DetailPokemonPage implements OnInit {
  public pokemon: Pokemon;

  constructor(private navParams: NavParams, private navController: NavController) {
    this.pokemon = this.navParams.data['pokemon'];
    console.log(this.pokemon);
  }

  ngOnInit() {}

  goBack() {
    this.navController.pop();
  }
}
