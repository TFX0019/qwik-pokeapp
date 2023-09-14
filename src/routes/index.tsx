import { $, component$ } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { usePokemonGame } from "~/hooks/usePokemonGame";
import { PokemonImage } from "~/pokemons/pokemon-image";

export default component$(() => {
  const nav = useNavigate();
  const {
    isVisible,
    backImage,
    pokemonId,
    nextPokemon,
    prevPokemon,
    toggleFromBack,
    toggleVisible
  } = usePokemonGame();



  const goToPokemo = $(() => {
    nav(`/pokemon/${pokemonId.value}`)
  })

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonId.value}</span>


      <div onClick$={() => goToPokemo()}>
        <PokemonImage 
          id={pokemonId.value} 
          size={200}
          backImage={backImage.value}
          isVisible={isVisible.value}
          />
      </div>
      
      <div>
        <button onClick$={() => prevPokemon()} class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={() => nextPokemon()} class="btn btn-primary mr-2">siguiente</button>
        <button onClick$={() => toggleFromBack()} class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={() => toggleVisible()} class="btn btn-primary">Revelar</button>
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
