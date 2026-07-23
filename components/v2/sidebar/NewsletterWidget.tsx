import { Mail } from "lucide-react";

export default function NewsletterWidget() {
    return (
        <section className="rounded-xl border border-neutral-200 bg-white p-5">

            <div className="mb-4 flex items-center gap-2">

                <Mail
                    size={18}
                    className="text-neutral-700"
                />

                <h2 className="text-sm font-bold tracking-[0.08em] text-neutral-900">
                    Newsletter
                </h2>

            </div>

            <p className="mb-4 text-sm leading-6 text-neutral-600">
                Dapatkan artikel pilihan Urbanstories langsung ke email kamu.
            </p>

            <form className="space-y-3">

                <input
                    type="email"
                    placeholder="Alamat email"
                    className="h-11 w-full rounded-lg border border-neutral-300 px-4 text-sm outline-none transition focus:border-neutral-900"
                />

                <button
                    type="submit"
                    className="h-11 w-full rounded-lg bg-neutral-900 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                    Berlangganan
                </button>

            </form>

        </section>
    );
}