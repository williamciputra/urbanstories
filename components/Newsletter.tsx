export default function Newsletter() {
  return (
    <section className="mt-32 py-20 border-t border-black">
      <div className="max-w-3xl mx-auto text-center">
        <p className="uppercase tracking-[0.25em] text-sm text-gray-500">
          Newsletter
        </p>

        <h2 className="mt-5 text-5xl font-semibold tracking-tight">
          Stay Inspired
        </h2>

        <p className="mt-6 text-lg text-gray-600 leading-8">
          Jangan lewatkan cerita-cerita inspiratif seputar gaya hidup,
          kesehatan, teknologi, bisnis, dan berbagai informasi terkini.
        </p>

        <form className="mt-12 flex flex-col md:flex-row gap-4">
          <input
            type="email"
            placeholder="Masukkan alamat email"
            className="flex-1 border border-black bg-transparent px-6 py-4 text-lg outline-none placeholder:text-gray-400"
          />

          <button
            type="submit"
            className="bg-black text-white px-10 py-4 transition hover:bg-neutral-800"
          >
            Langganan
          </button>
        </form>
      </div>
    </section>
  );
}