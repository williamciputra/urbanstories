import { readFile } from "node:fs/promises";
import path from "node:path";
import Script from "next/script";
import { applyUrbanstoriesChrome } from "@/services/public/v3-chrome";
import V3ChromeBehavior from "@/components/v3/shared/V3ChromeBehavior";

async function getV3Template() {
  const templatePath = path.join(
    process.cwd(),
    "public/news5/demo-seven/index.html",
  );

  const source = await readFile(templatePath, "utf8");

  return applyUrbanstoriesChrome(source).replaceAll(
    "../assets/",
    "/news5/assets/",
  );
}

export async function V3Header() {
  const html = await getV3Template();

  // Gunakan header utama, bukan header offcanvas.
  const headerStart = html.indexOf('<header class="uc-header');
  const headerClose = headerStart === -1
    ? -1
    : html.indexOf("</header>", headerStart);

  const searchStart = html.indexOf('<div id="uc-search-modal"');
  const menuPanelMarker = html.indexOf("Menu panel", searchStart);
  const searchModalEnd = menuPanelMarker === -1
    ? -1
    : html.lastIndexOf("<!--", menuPanelMarker);

  if (
    headerStart === -1 ||
    headerClose === -1 ||
    searchStart === -1 ||
    searchModalEnd === -1
  ) {
    throw new Error(
      "Header utama atau modal pencarian tidak ditemukan di template V3.",
    );
  }

  const headerHtml = html.slice(
    headerStart,
    headerClose + "</header>".length,
  );
  const searchModalHtml = html.slice(searchStart, searchModalEnd).trim();

  return (
    <>
      <link
        rel="stylesheet"
        href="/news5/assets/js/uni-core/css/uni-core.min.css"
      />
      <link rel="stylesheet" href="/news5/assets/css/unicons.min.css" />
      <link rel="stylesheet" href="/news5/assets/css/theme/main.min.css" />

      <Script
        src="/news5/assets/js/uni-core/js/uni-core-bundle.min.js"
        strategy="afterInteractive"
      />

      <div
        className="urbanstories-v3-header"
        style={{ position: "relative", zIndex: 10000 }}
        dangerouslySetInnerHTML={{ __html: headerHtml }}
      />
      <div dangerouslySetInnerHTML={{ __html: searchModalHtml }} />
      <V3ChromeBehavior />
    </>
  );
}

export async function V3Footer() {
  const html = await getV3Template();
  const footerStart = html.indexOf('<footer id="uc-footer"');
  const footerClose = footerStart === -1
    ? -1
    : html.indexOf("</footer>", footerStart);

  if (footerStart === -1 || footerClose === -1) {
    throw new Error("Footer V3 tidak ditemukan di template News5.");
  }

  const footerHtml = html.slice(
    footerStart,
    footerClose + "</footer>".length,
  );

  return (
    <>
      <style>{`
        .urbanstories-v3-footer .uc-footer-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .urbanstories-v3-footer .uc-footer-bottom > .vstack {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          min-width: 0;
        }

        .urbanstories-v3-footer .footer-logo {
          text-align: center;
          white-space: nowrap;
        }

        .urbanstories-v3-footer .footer-copyrights {
          margin: 0;
          white-space: nowrap;
        }

        .urbanstories-v3-footer .footer-site-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .urbanstories-v3-footer .uc-footer-bottom > .panel {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        @media (min-width: 1024px) {
          .urbanstories-v3-footer .uc-footer-bottom {
            flex-direction: row;
            align-items: center;
            text-align: left;
          }

          .urbanstories-v3-footer .uc-footer-bottom > .vstack {
            flex-direction: row;
            justify-content: flex-start;
            gap: 0.75rem;
          }

          .urbanstories-v3-footer .footer-logo {
            text-align: left;
          }

          .urbanstories-v3-footer .footer-site-links {
            justify-content: flex-start;
          }
        }
      `}</style>
      <div
        className="urbanstories-v3-footer"
        dangerouslySetInnerHTML={{ __html: footerHtml }}
      />
    </>
  );
}
