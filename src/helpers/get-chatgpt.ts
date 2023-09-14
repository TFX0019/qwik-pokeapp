// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.PUBLIC_OPEN_AI_KEY,
});

export const getFuncFatAboutPokemon = async (pokemonName: string): Promise<string> => {
    const response = await openai.completions.create({
        model: "text-davinci-003",
        prompt: `Escribe datos interesantes del pokemon: ${pokemonName}`,
        temperature: 0.7,
        max_tokens: 200,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      console.log(response);

      return response.choices[0].text || `No tengo nada sobre ${pokemonName}`;
}

