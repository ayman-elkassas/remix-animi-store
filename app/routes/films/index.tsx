import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import type { Film } from "~/api/films";
import { getFilms } from "~/api/films";

// SERVER-SIDE RENDERING
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");
  return getFilms(title);
};

// CLIENT-SIDE RENDERING
const Films = () => {
  const films = useLoaderData<Film[]>();
  return (
    <div>
      <Form reloadDocument className="py-5">
        <label className="font-bold">
          Search: {""}
          <input
            type="text"
            name="title"
            placeholder="Search for a film"
            className="border border-gray-400 rounded-lg px-4 py-2"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Search
        </button>
      </Form>
      <div className="grid grid-cols-6 gap-6">
        {films.map((film) => (
          <Link
            to={`${film.id}`}
            className="hover:shadow-2xl hover:scale-105 hover:front-bold cursor-pointer"
            key={film.id}
            prefetch="intent"
          >
            {film.title}
            <img src={film.image} alt={film.title} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export const meta: MetaFunction = () => {
  return {
    title: "Films",
    description: "List of films",
  };
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: "styles",
    },
  ];
};

export default Films;
