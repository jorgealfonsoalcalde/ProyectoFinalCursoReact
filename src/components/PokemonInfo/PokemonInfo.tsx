import React, { useMemo } from "react";
import { useParams } from "react-router";
import { useGetPokemon } from "../../hooks/useGetPokemon";
import { getMainPokemonType } from "../../utils/getMainPokemonType";
import { capitalizeFirstsLetter } from "../../utils/capitalizeFirstLetter";
import { convertLibsToKg } from "../../utils/convertLbsToKg";
import { convertInchesToCm } from "../../utils/convertInchesToCm";
import { PokemonSprites } from "../PokemonSprites/PokemonSprites";
import { TypeIcons } from "../shared/TypeIcons/TypeIcons";
import { useSearchStore } from "../../store/useSearchStore";

export const PokemonInfo = () => {

  const { pokemonName } = useParams();
  const { pokemonData } = useGetPokemon(pokemonName);
  const mainType = useMemo(
    () => pokemonData && getMainPokemonType(pokemonData),
    [pokemonData]
  );

  return (
    <div className="flex flex-row justify-between shadow-lg bg-gray-100 rounded-lg">
      <div
        className={`${mainType}-background w-72 h-72 rounded-l-lg items-center`}
      >
        <img
          src={pokemonData?.sprites?.front_default}
          alt={pokemonData?.name ?? ""}
          className="mx-auto w-72 h-72"
        />
      </div>
      <div className="flex flex-col grow p-5 gap-3">
        <div className="relative flex">
        <h1 className="text 3xl">{capitalizeFirstsLetter(pokemonData?.name ?? "")}</h1>
        <TypeIcons types={pokemonData?.types ?? []} />
        </div>
        <span>{`Weight: ${convertLibsToKg(pokemonData?.weight ?? 0)} kg`}</span>
        <span>{`Height: ${convertInchesToCm(pokemonData?.height ?? 0)} cm`}</span>
        <PokemonSprites pokemonName={pokemonName} />
      </div>
    </div>
  );
};
