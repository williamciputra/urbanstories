import { site } from "../data/site";

export default function Hero() {
  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center py-28 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.35em] text-neutral-500">
        {site.name}
      </p>

      <h1 className="mt-8 text-5xl font-semibold tracking-[-0.04em] text-neutral-900 md:text-7xl">
        {site.tagline}
      </h1>

      <p className="mt-10 max-w-2xl text-xl leading-10 text-neutral-600">
        {site.description}
      </p>
    </section>
  );
}