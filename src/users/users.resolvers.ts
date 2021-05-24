import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Mutation: {
    createMovie: (_, { title, year, genre }, { client }) =>
      client.movie.create({
        data: {
          title,
          year,
          genre,
        },
      }),
    deleteMovie: (_, { id }, { client }) =>
      client.movie.delete({ where: { id } }),
    updateMovie: (_, { id, year }, { client }) =>
      client.movie.update({ where: { id }, data: { year } }),
  },
  Query: {
    movies: (_, __, { client }) => client.movie.findMany(),
    movie: (_, { id }, { client }) =>
      client.movie.findUnique({ where: { id } }),
  },
};

export default resolvers;
