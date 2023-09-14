import { $, component$, useContext } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonGameContext } from "~/context";
import { PokemonImage } from "~/pokemons/pokemon-image";

export default component$(() => {
  const nav = useNavigate();

  const pokemonGame = useContext(PokemonGameContext);

  // const pokemonId = useSignal(1);
  // const backImage = useSignal(false);
  // const isVisible = useSignal(true);

  const changePokemonId = $((value: number) => {
    if((pokemonGame.pokemonId+value) <= 0) return;
    pokemonGame.pokemonId += value;
  })

  const goToPokemo = $(() => {
    nav(`/pokemon/${pokemonGame.pokemonId}`)
  })

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonGame.pokemonId}</span>

      {/* crear iamgen del id */}
      {/* <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId.value}.png`} 
      alt="pokemont sprite" style={{width: '200px'}} /> */}
      {/* <Link href={`/pokemon/${pokemonId.value}/`}>
        
      </Link> */}

      <div onClick$={() => goToPokemo()}>
        <PokemonImage 
          id={pokemonGame.pokemonId} 
          size={200}
          backImage={pokemonGame.backImage}
          isVisible={pokemonGame.isVisible}
          />
      </div>
      
      <div>
        <button onClick$={() => changePokemonId(-1)} class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={() => changePokemonId(+1)} class="btn btn-primary mr-2">siguiente</button>
        <button onClick$={() => pokemonGame.backImage = !pokemonGame.backImage} class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={() => pokemonGame.isVisible = !pokemonGame.isVisible} class="btn btn-primary">Revelar</button>
      </div>

    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Esta es mi primera app con qwik",
    },
  ],
};
