import { $, component$, useSignal } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/pokemons/pokemon-image";

export default component$(() => {
  const nav = useNavigate();

  const pokemonId = useSignal(1);
  const backImage = useSignal(false);
  const isVisible = useSignal(true);

  const changePokemonId = $((value: number) => {
    if((pokemonId.value+value) <= 0) return;
    pokemonId.value += value;
  })

  const goToPokemo = $(() => {
    nav(`/pokemon/${pokemonId.value}`)
  })

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonId}</span>

      {/* crear iamgen del id */}
      {/* <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId.value}.png`} 
      alt="pokemont sprite" style={{width: '200px'}} /> */}
      {/* <Link href={`/pokemon/${pokemonId.value}/`}>
        
      </Link> */}

      <div onClick$={() => goToPokemo()}>
        <PokemonImage 
          id={pokemonId.value} 
          size={200}
          backImage={backImage.value}
          isVisible={isVisible.value}
          />
      </div>
      
      <div>
        <button onClick$={() => changePokemonId(-1)} class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={() => changePokemonId(+1)} class="btn btn-primary mr-2">siguiente</button>
        <button onClick$={() => backImage.value = !backImage.value} class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={() => isVisible.value = !isVisible.value} class="btn btn-primary">Revelar</button>
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
