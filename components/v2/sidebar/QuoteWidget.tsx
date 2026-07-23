export default function QuoteWidget() {

    const quote = {
        content:
            "Every story begins with curiosity.",
        author: "Urbanstories",
    };

    return (
        <section>

            <div className="border-y border-neutral-200 py-8">

                <p className="text-[20px] italic leading-8 tracking-[-0.01em] text-neutral-900">

                    “{quote.content}”

                </p>

                <p className="mt-4 text-sm text-neutral-500">

                    — {quote.author}

                </p>

            </div>

        </section>
    );

}