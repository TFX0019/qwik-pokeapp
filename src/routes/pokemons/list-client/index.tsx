import  { $, component$, useContext, useOnDocument, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonListContext } from '~/context';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import { PokemonImage } from '~/pokemons/pokemon-image';

// interface PokemonPageState {
//   currentPage: number;
//   pokemons: SmallPokemon[];
//   isLoading: boolean;
// }

export default component$(() => {

  // const pokemonState = useStore<PokemonPageState>({
  //   currentPage: 0,
  //   pokemons: [],
  //   isLoading: false
  // });

  const pokemonState = useContext(PokemonListContext);

  // useVisibleTask$(async ({track}) => {
  //   track(() => pokemonState.currentPage);
  //   const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
  //   pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
  // });


  useTask$(async ({track}) => {
    track(() => pokemonState.currentPage);
    
    const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
    pokemonState.isLoading = false;
  });

  useOnDocument('scroll', $(() => {
    const maxScroll = document.body.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;

    if((currentScroll + 200) >= maxScroll && !pokemonState.isLoading) {
      pokemonState.isLoading = true;
      pokemonState.currentPage++;
    }

    console.log({maxScroll, currentScroll})
  }));


  return (
    <>
        <div class="flex flex-col">
          <span class="my-5 text-5xl">Status</span>
          <span>Página actual: {pokemonState.currentPage}</span>
          <span>Esta cargando: {pokemonState.isLoading ? 'Si' : 'No'}</span>
        </div>

        <div class="mt-10">
          {/* <button onClick$={() => pokemonState.currentPage--} class="btn btn-primary mr-2">Anteriores</button> */}
          <button onClick$={() => pokemonState.currentPage++} class="btn btn-primary mr-2">Siguiente</button>
        </div>

        <div class="grid sm:grid-cols-2 md:grid-cols-5 mt-5">
          {pokemonState.pokemons.map(({name, id}) => (
            <div key={name} class="m-5 flex-col justify-center items-center">
              <PokemonImage id={Number(id)} size={100} isVisible={true} />
              <span class="capitalize">{name}</span>
            </div>
          ))}
        </div>
    </>
  )
});

export const head: DocumentHead = {
  title: "List Client"
};
