export type FilmCharacter = {
  id: string;
  name: string;
  gender?: string;
  age?: string;
  eye_color?: string;
  hair_color?: string;
};

export type Film = {
  id: string;
  title: string;
  original_title: string;
  description: string;
  image: string;
  movie_banner: string;
  people: string[];
  characters?: FilmCharacter[];
};

export const getFilms = async (title?: string | null) => {
  const response = await fetch("https://ghibliapi.herokuapp.com/films");

  const films: Film[] = await response.json();

  return films.filter((film) => {
    return title
      ? film.title.toLowerCase().includes(title.toLowerCase())
      : true;
  });
};

//get film by id
export const getFilmById = async (filmId: string) => {
  const response = await fetch(
    `https://ghibliapi.herokuapp.com/films/${filmId}`
  );

  const film: Film = await response.json();

  const characters = await Promise.all(
    film.people
      .filter((url) => url !== "https://ghibliapi.herokuapp.com/people/")
      .map((url) => fetch(url).then((res) => res.json()))
  );

  return { ...film, characters };
};

export async function getFilmCharacter(
  characterId: string
): Promise<FilmCharacter> {
  const response = await fetch(
    `https://ghibliapi.herokuapp.com/people/${characterId}`
  );

  if (!response.ok) {
    throw response;
  }

  return response.json();
}
