export default function VideoWidget() {
  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-6">

      <h2 className="mb-5 text-lg font-bold text-neutral-900">
        Video
      </h2>

      <div className="aspect-video rounded-lg bg-neutral-200" />

      <p className="mt-4 text-[15px] font-medium leading-6 text-neutral-900">
        Video pilihan editor akan tampil di sini.
      </p>

    </section>
  );
}