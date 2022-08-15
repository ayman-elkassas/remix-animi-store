import type { LoaderFunction } from "@remix-run/node";
import { getFilmById, Film } from "~/api/films";
import invariant from "tiny-invariant";
import { Outlet, useLoaderData } from "@remix-run/react";
import FilmBanner from "~/components/FilmBanner";
import CharacterList from "~/components/CharacterList";

// loader function
export const loader: LoaderFunction = async ({ params }) => {
  // invariant film id in params
  invariant(params.filmId, "filmId is required");
  const { filmId } = params;
  const film = await getFilmById(filmId);
  return film;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
const Film = () => {
  const film = useLoaderData<Film>();
  return (
    <div>
      <FilmBanner film={film} />
      <div className="p-10">
        <p>{film.description}</p>
      </div>
      <div className="flex py-5 space-x-5">
        <CharacterList characters={film.characters} />
        {/* div flex-1 */}
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Film;
