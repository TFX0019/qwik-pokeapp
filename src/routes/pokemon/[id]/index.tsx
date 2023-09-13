import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/pokemons/pokemon-image';
// import { PokemonImage } from '~/pokemons/pokemon-image';

export const usePokemonId = routeLoader$<number>(({params, redirect}) => {

  const id = Number(params.id);
  if(isNaN(id) || id <= 0 || id >= 1000) {
    redirect(301, '/')
  }
  return id;
});

export default component$(() => {

  const pokemonId = usePokemonId();




  return (<>
  <span class="text-5xl">Pokemon: {pokemonId}</span>
  <PokemonImage 
          id={pokemonId.value} 
          size={200}
          isVisible={true}
          // backImage={backImage.value}
          // isVisible={isVisible.value}
          />
    </>)
});

export const head: DocumentHead = {
  title: "Pokemon"
};
