import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
    id: number;
    size?: number;
    backImage?: boolean;
    isVisible?: boolean;
}

export const PokemonImage = component$<Props>(({
    id, 
    size = 200, 
    isVisible = false, 
    backImage = false
}) => {
    const imageLoaded = useSignal(false);
    useTask$(({track}) => {
        track(() => id);
        imageLoaded.value = false;
    });

    const imageUrl = useComputed$(() => {
        if(isNaN(id)) return '';
        return backImage
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    });

    return (
        <div 
        class="flex items-center justify-center" 
        style={{width: `${size}px`, height: `${size}px`}}>
            {!imageLoaded.value && <span>cargando...</span>}
            {/* eslint-disable-next-line qwik/jsx-img */}
            <img class={[{
                'hidden': !imageLoaded.value,
                'brightness-0': !isVisible
            }, 'transition-all']}
            src={imageUrl.value} 
      alt="pokemont sprite" style={{width: `${size}px`}}
      onLoad$={() => imageLoaded.value = true} />
        </div>
    )
});