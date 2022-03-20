import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

import { FetchAllPokemonResponse, Pokemon } from '../interfaces/pokemon.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url: string = "https://pokeapi.co/api/v2";

  constructor(
    private http:HttpClient
  ) { }

  //Diese Methode ist lediglich eine Definition, welche ein Observable zurückliefert
  //Der Observable enhält die Informationen.
  //Auf diese kann man erst zugreifen, wenn man diesen Observable abonniert.
  getAllPokemons(): Observable<Pokemon[]> {
    return this.http.get<FetchAllPokemonResponse>(`${this.url}/pokemon?limit=1500`)
      .pipe(
        map( this.transformSmallPokemonIntoPokemon)
      )
  }

  private transformSmallPokemonIntoPokemon (resp: FetchAllPokemonResponse): Pokemon[] {

    //results is the property array in the interface FetchAllPokemonResponse and map() is an array method (here it is not a rxjs method!)
    const pokemonList:Pokemon[] = resp.results.map(poke => {

      console.log(poke.url);
      
      const urlArr = poke.url.split('/');
      //console.log(urlArr);

      const id = urlArr[6];

      const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`;

      return {
        id: id,
        pic: pic,
        name: poke.name
      }
    })

    return pokemonList;
  }

}
