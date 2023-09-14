import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { PokemonGameContext, type PokemonGameState } from "./pokemon-game.context";
import { PokemonListContext, type PokemonListState } from "./pokemon-list.context";

export const PokemonProvider = component$(() => {
    const pokemonGame = useStore<PokemonGameState>({
        pokemonId: 1,
        backImage: false,
        isVisible: true
      });
    
      const pokemonList = useStore<PokemonListState>({
        currentPage: 1,
        isLoading: false,
        pokemons: []
      });
    
      
      useContextProvider(PokemonGameContext, pokemonGame);
      useContextProvider(PokemonListContext, pokemonList);
    
      useVisibleTask$(() => {
        if(localStorage.getItem('pokemon-game')) {
          const {
            backImage = false,
            isVisible = true,
            pokemonId = 1
          } = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState
          pokemonGame.backImage = backImage
          pokemonGame.isVisible = isVisible
          pokemonGame.pokemonId = pokemonId
        }
      });

      useVisibleTask$(({track}) => {
        track(() => [pokemonGame.backImage, pokemonGame.isVisible, pokemonGame.pokemonId]);
        localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame));
      });

  
    return (<Slot />)
});