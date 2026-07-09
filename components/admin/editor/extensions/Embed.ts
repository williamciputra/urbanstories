import { Node, mergeAttributes } from "@tiptap/core";

export interface EmbedOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    embed: {
      setEmbed: (url: string) => ReturnType;
    };
  }
}

function getEmbedUrl(url: string) {
  // YouTube
  if (
    url.includes("youtube.com/watch?v=") ||
    url.includes("youtu.be/")
  ) {
    const id = url.includes("youtu.be/")
      ? url.split("youtu.be/")[1].split("?")[0]
      : new URL(url).searchParams.get("v");

    return id
      ? `https://www.youtube.com/embed/${id}`
      : null;
  }

  // Spotify
  if (url.includes("open.spotify.com")) {
    return url.replace(
      "open.spotify.com/",
      "open.spotify.com/embed/"
    );
  }

  // Google Maps
  if (url.includes("google.com/maps")) {
    return url;
  }

  return null;
}

export const Embed = Node.create<EmbedOptions>({
  name: "embed",

  group: "block",

  atom: true,

  selectable: true,

  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      url: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-embed]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const url = HTMLAttributes.url as string;

    const embedUrl = getEmbedUrl(url);

    if (embedUrl) {
      return [
        "div",
        mergeAttributes(
          this.options.HTMLAttributes,
          HTMLAttributes,
          {
            "data-embed": "",
            class: "my-8",
          }
        ),
        [
          "iframe",
          {
            src: embedUrl,
            width: "100%",
            height: "450",
            frameborder: "0",
            allowfullscreen: "true",
            allow:
              "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            class:
              "w-full rounded-lg border border-gray-200",
          },
        ],
      ];
    }

    return [
      "div",
      mergeAttributes(
        this.options.HTMLAttributes,
        HTMLAttributes,
        {
          "data-embed": "",
          class:
            "rounded-lg border border-gray-300 bg-gray-50 p-4",
        }
      ),
      [
        "a",
        {
          href: url,
          target: "_blank",
          rel: "noopener noreferrer",
          class: "font-semibold underline",
        },
        url,
      ],
    ];
  },

  addCommands() {
    return {
      setEmbed:
        (url: string) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              url,
            },
          });
        },
    };
  },
});