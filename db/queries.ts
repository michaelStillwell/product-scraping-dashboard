import { Query } from "./models";

const PATH: string = `${import.meta.dir}/queries.json`;

export const selectQueries = async (): Promise<Query[]> => {
  const queriesFile = Bun.file(PATH);
  const queries = await queriesFile.json();
  return queries;
};

export const selectQuery = async (id: number): Promise<Query[]> => {
  return (await selectQueries()).filter((query) => query.id === id);
};

export const insertQueries = async (query: Query): Promise<Query[]> => {
  let queries = await selectQueries();

  if (
    !queries.some((p) => p?.site === query.site && p?.value === query.value)
  ) {
    const maxId = Math.max(...queries.map((q) => q.id));
    query.id = maxId + 1;
    query.active = true;
    queries.push(query);

    try {
      Bun.write(PATH, JSON.stringify(queries, null, 2));
    } catch (_) {
      console.error("didn't update queries.json");
    }
  }

  return queries;
};

export const updateQueries = async (
  id: number,
  query: Query,
): Promise<Query[]> => {
  const queries = await selectQueries();
  const index = queries.findIndex((p) => p.id === id);
  if (index >= 0) {
    queries[index] = { ...query };

    try {
      Bun.write(PATH, JSON.stringify(queries, null, 2));
    } catch (_) {
      console.error("didn't update queries.json");
    }
  }

  return queries;
};

export const deleteQueries = async (id: number): Promise<Query[]> => {
  const queries = (await selectQueries()).filter((query) => query.id !== id);

  try {
    Bun.write(PATH, JSON.stringify(queries, null, 2));
  } catch (_) {
    console.error("didn't update queries.json");
  }

  return queries;
};
