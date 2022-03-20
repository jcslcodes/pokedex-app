import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon.interfaces';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Pokemon[], page: number = 0, search: string=''): Pokemon[] {
    
    if (search.length === 0)
      return value.slice(page, page + 5);

    const filteredPokemons = value.filter( poke => poke.name.includes(search) );
  
    return filteredPokemons.slice (page, page + 5);
  }

}
