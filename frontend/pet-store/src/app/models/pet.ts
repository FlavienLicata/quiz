import {Types} from './types'
import {Genres} from './genres'
import {Races} from './races'

export class Pet {

    id: number;

    name: string;

    type: Types;

    race: Races;

    genre: Genres;

    color: string;

    age: number;

    weight: number;

    description: string;

    price: number;
}
