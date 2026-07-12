const WORDPRESS_GRAPHQL_URL =
  process.env.WORDPRESS_GRAPHQL_URL!;

type GraphQLResponse<T> = {
  data: T;
  errors?: {
    message: string;
  }[];
};

export async function wpFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const response = await fetch(
    WORDPRESS_GRAPHQL_URL,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        query,
        variables,
      }),

      next: {
        revalidate: 60,
      },
    }
  );

  const json =
    (await response.json()) as GraphQLResponse<T>;

  if (json.errors) {
    throw new Error(
      json.errors
        .map((e) => e.message)
        .join("\n")
    );
  }

  return json.data;
}