import { component$, useContext } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { PokemonGameContext } from '~/context';
import { usePokemonGame } from '~/hooks/usePokemonGame';
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
  // const pokemonGame = useContext(PokemonGameContext);
  const {
    isVisible, 
    backImage, 
    toggleFromBack, 
    toggleVisible
  } = usePokemonGame();




  return (<>
  <span class="text-5xl">Pokemon: {pokemonId}</span>
  <PokemonImage 
          id={pokemonId.value} 
          size={200}
          isVisible={isVisible.value}
          backImage={backImage.value}
          // backImage={backImage.value}
          // isVisible={isVisible.value}
          />

      <div>
        <button onClick$={() => toggleFromBack()} class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={() => toggleVisible()} class="btn btn-primary">{isVisible.value ? 'Revelar' : 'Ocultar'}</button>
      </div>
    </>)
});

export const head: DocumentHead = {
  title: "Pokemon"
};
