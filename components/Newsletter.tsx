export default function Newsletter() {
  return (
    <section className="mt-32 border-t border-black pt-20 pb-10">
      <div className="max-w-3xl mx-auto text-center">
        <p className="uppercase tracking-[0.25em] text-sm text-gray-500">
          Newsletter
        </p>

        <h2 className="mt-6 text-6xl font-semibold tracking-tight text-neutral-900">
          Stay Inspired
        </h2>

        <p className="mt-6 text-lg text-gray-600 leading-8">
          Dapatkan cerita pilihan, insight, dan artikel terbaru langsung ke inbox Anda. Tanpa spam.
        </p>

        <form className="mt-12 mx-auto flex max-w-2xl flex-col gap-4 md:flex-row">
          <input
            type="email"
            placeholder="Alamat email Anda"
            className="flex-1 border border-black bg-transparent px-6 py-3.5 text-lg outline-none placeholder:text-gray-400"
          />

          <button
            type="submit"
            className="bg-black text-white px-8 py-3.5 transition hover:bg-neutral-800"
          >
            Berlangganan
          </button>
        </form>
      </div>
    </section>
  );
}