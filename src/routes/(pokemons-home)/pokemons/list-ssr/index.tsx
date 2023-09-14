import { $, component$, useComputed$, useSignal, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { Modal } from '~/components/shared/modal/modal';
import { getFuncFatAboutPokemon } from '~/helpers/get-chatgpt';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';
import { PokemonImage } from '~/pokemons/pokemon-image';


export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({query, redirect, pathname}) => {
  
  

  const offset = Number(query.get('offset') || '0');
  if(isNaN(offset)) redirect(301, pathname);
  if(offset < 0) redirect(301, pathname);
  
  // const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
  // const data = await response.json() as PokemonListResponse;

  return getSmallPokemons(offset);
});

export default component$(() => {
  const pokemons = usePokemonList();
  const location = useLocation();
  const open = useSignal(false);

  const modalPokemon = useStore({
    name: '',
    id: ''
  });

  const chatGptPokemonFact = useSignal('');

  const currentOffset = useComputed$<number>(() => {
    // const offsetString = location.url.searchParams.get('offset');
    const offsetString = new URLSearchParams(location.url.search);
    return Number(offsetString.get('offset') || 0);
  });

  
  const showModal = $((id: string, name: string) => {
    modalPokemon.id = id;
    modalPokemon.name = name;
    open.value = true;
  });

  const closeModal =$(() => {
    open.value = false;
  });


  useVisibleTask$(({track}) => {
    track(() => modalPokemon.name)
    chatGptPokemonFact.value = '';
    if(modalPokemon.name.length > 0) {
      getFuncFatAboutPokemon(modalPokemon.name).then((resp) => chatGptPokemonFact.value = resp)
    }
    
  })
  

  return (
    <>
        <div class="flex flex-col">
          <span class="my-5 text-5xl">Status</span>
          <span>Offset: {currentOffset}</span>
          <span>esta cargando página: {location.isNavigating ? 'SI' : 'NO'}</span>
        </div>

        <div class="mt-10">
          <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`} class="btn btn-primary mr-2">Anteriores</Link>
          <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`} class="btn btn-primary mr-2">Siguiente</Link>
        </div>

        <div class="grid grid-cols-6 mt-5">
          {pokemons.value.map(({name, id}) => (
            <div key={name} onClick$={() => showModal(id, name)} class="m-5 flex-col justify-center items-center">
              <PokemonImage id={Number(id)} isVisible={true} />
              <span class="capitalize">{name}</span>
            </div>
          ))}
        </div>

        <Modal 
        open={open.value} 
        close={closeModal} 
        persistent={true}
        size='md'
        >
          <div q:slot='title'>{modalPokemon.name}</div>
          <div q:slot='content'>
            <PokemonImage id={Number(modalPokemon.id)} isVisible={true} />
            <span>
              {chatGptPokemonFact.value === '' ? 'Preguntando a chat GPT' : chatGptPokemonFact.value }
            </span>
            </div>
          
        </Modal>
    </>
  )
});

export const head: DocumentHead = {
  title: "List SSR"
};