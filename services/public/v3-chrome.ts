// Shared Urbanstories V3 chrome generator. Keep the existing markup and links.
export function applyUrbanstoriesChrome(inputHtml: string): string {
  let html = inputHtml;

  // V3 HEADER: Urbanstories mega-menu with category-specific latest articles.
  const menuCategories = [
    { name: "News", slug: "news", subs: [
      { name: "Nasional", slug: "nasional" },
      { name: "Internasional", slug: "internasional" },
      { name: "Ekonomi", slug: "ekonomi" },
      { name: "Otomotif", slug: "otomotif" },
    ]},
    { name: "Lifestyle", slug: "lifestyle", subs: [
      { name: "Kesehatan", slug: "kesehatan" },
      { name: "Parasayu", slug: "parasayu" },
      { name: "Travel", slug: "travel" },
      { name: "Fashion", slug: "fashion" },
      { name: "Kuliner", slug: "kuliner" },
    ]},
    { name: "Entertainment", slug: "entertainment", subs: [
      { name: "Film", slug: "film" },
      { name: "Musik", slug: "musik" },
      { name: "Hot Issue", slug: "hot-issue" },
      { name: "Pop Art", slug: "pop-art" },
    ]},
    { name: "Technology", slug: "technology", subs: [
      { name: "Gadgets", slug: "gadgets" },
      { name: "Apps", slug: "apps" },
      { name: "AI", slug: "ai" },
    ]},
    { name: "Explore", slug: "explore", subs: [
      { name: "Refleksi", slug: "refleksi" },
      { name: "Intimacy", slug: "intimacy" },
      { name: "Leksikon", slug: "leksikon" },
      { name: "Parents", slug: "parents" },
    ]},
  ];

  const renderMegaMenu = (category: (typeof menuCategories)[number]) => {
    return `
      <li class="uc-parent">
        <a href="/${category.slug}">${category.name} <span data-uc-navbar-parent-icon></span></a>
        <div class="uc-navbar-dropdown ft-primary text-unset p-3 pb-4 hide-scrollbar"
          data-uc-drop="mode: hover; offset: 0; boundary: !.uc-navbar; animation: uc-animation-slide-top-small; duration: 150;">
          <ul class="uc-nav uc-navbar-dropdown-nav">
            ${category.subs.map((sub) =>
              `<li><a class="text-primary fs-5" href="/category/${category.slug}/${sub.slug}">${sub.name}</a></li>`
            ).join("")}
          </ul>
        </div>
      </li>`;
  };

  // Remove News5 top and bottom navigation bars; preserve the center header.
  const topBarStart = html.indexOf('<div class="uc-top-navbar');
  const centerBarStart = html.indexOf('<div class="uc-center-navbar', topBarStart);
  if (topBarStart !== -1 && centerBarStart !== -1) {
    html = html.slice(0, topBarStart) + html.slice(centerBarStart);
  }

  const bottomBarStart = html.indexOf('<div class="uc-bottom-navbar');
  const bottomNavEnd = html.indexOf('</nav>', bottomBarStart);
  if (bottomBarStart !== -1 && bottomNavEnd !== -1) {
    html = html.slice(0, bottomBarStart) + html.slice(bottomNavEnd);
  }

  const centerStart = html.indexOf('<div class="uc-center-navbar');
  const headerEnd = html.indexOf('</header>', centerStart);

  if (centerStart !== -1 && headerEnd !== -1) {
    const urbanstoriesHeader = `
      <div class="uc-center-navbar panel z-2">
        <div class="container max-w-xl">
          <div class="uc-navbar min-h-72px lg:min-h-80px text-gray-900 dark:text-white">
            <div class="uc-navbar-left">
              <div class="d-block lg:d-none">
                <a class="uc-menu-trigger" href="#urbanstories-mobile-nav" aria-label="Buka menu" data-urbanstories-menu-toggle></a>
              </div>
              <a href="/" class="text-none fw-bold text-primary" aria-label="Urbanstories" style="font-size: 36px; line-height: 1.1;">Urbanstories</a>
            </div>
            <div class="uc-navbar-center">
              <ul class="uc-navbar-nav gap-3 xl:gap-4 fs-5 xl:fs-4 fw-bold d-none lg:d-flex" style="--uc-nav-height: 80px">
                ${menuCategories.map(renderMegaMenu).join("")}
                <li><a href="/sports">Sports</a></li>
              </ul>
            </div>
            <div class="uc-navbar-right">
              <a class="uc-search-trigger" href="#uc-search-modal" data-uc-toggle aria-label="Cari artikel">
                <img class="w-24px" src="/news5/assets/images/common/icons/search.svg" alt="Search" data-uc-svg>
              </a>
            </div>
          </div>
          <div id="urbanstories-mobile-nav" class="d-lg-none py-2" hidden>
            <div class="vstack gap-2">
              ${[
                ...menuCategories.map((category) =>
                  `<details><summary class="fw-bold py-1">${category.name}</summary><div class="hstack gap-2 flex-wrap py-2">${category.subs.map((sub) => `<a class="btn btn-sm btn-alt-primary" href="/category/${category.slug}/${sub.slug}">${sub.name}</a>`).join("")}</div></details>`
                ),
                '<a class="fw-bold py-1" href="/sports">Sports</a>'
              ].join("")}
            </div>
          </div>
        </div>
      </div>`;

    html = html.slice(0, centerStart) + urbanstoriesHeader + html.slice(headerEnd);
  } else {
    console.error("Header Urbanstories V3 dilewati: batas header tidak ditemukan.");
  }

  // V3 mobile navigation: hamburger toggles the hidden category menu.
  const mobileMenuScript = `
<script>
(() => {
  const trigger = document.querySelector("[data-urbanstories-menu-toggle]");
  const menu = document.getElementById("urbanstories-mobile-nav");
  if (!trigger || !menu || trigger.dataset.menuBound === "true") return;
  trigger.dataset.menuBound = "true";
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    menu.hidden = !menu.hidden;
    trigger.setAttribute("aria-expanded", String(!menu.hidden));
  });
})();
</script>
`;
  const mobileScriptMarker = "</body>";
  const mobileScriptIndex = html.lastIndexOf(mobileScriptMarker);
  if (mobileScriptIndex !== -1) {
    html = html.slice(0, mobileScriptIndex) + mobileMenuScript + html.slice(mobileScriptIndex);
  }


  // Urbanstories V3 footer content: preserve News5 footer layout and classes.
  const footerStart = html.indexOf('<footer id="uc-footer"');
  const footerEnd = footerStart === -1 ? -1 : html.indexOf("</footer>", footerStart);

  if (footerStart !== -1 && footerEnd !== -1) {
    let footer = html.slice(footerStart, footerEnd + "</footer>".length);

    const replaceFooterList = (
      headingText: string,
      items: { name: string; href: string }[]
    ) => {
      const headingEnd = footer.indexOf(`>${headingText}</h4>`);
      if (headingEnd === -1) return;

      const listStart = footer.indexOf("<ul", headingEnd);
      const contentStart = listStart === -1 ? -1 : footer.indexOf(">", listStart) + 1;
      const listEnd = contentStart === -1 ? -1 : footer.indexOf("</ul>", contentStart);
      if (listStart === -1 || contentStart === 0 || listEnd === -1) return;

      const listItems = items
        .map((item) => `<li><a href="${item.href}">${item.name}</a></li>`)
        .join("");

      footer = footer.slice(0, contentStart) + listItems + footer.slice(listEnd);
    };

    const footerTopics = [
      ...menuCategories.map((category) => ({
        name: category.name,
        href: `/${category.slug}`,
      })),
      { name: "Sports", href: "/sports" },
    ];

    const footerNews = [
      { name: "Internasional", href: "/category/news/internasional" },
      { name: "Film", href: "/category/entertainment/film" },
      { name: "Musik", href: "/category/entertainment/musik" },
      { name: "Gadgets", href: "/category/technology/gadgets" },
      { name: "AI", href: "/category/technology/ai" },
    ];

    const footerAbout = [
      { name: "About Us", href: "/about" },
      { name: "Redaksi", href: "/" },
      { name: "Kontak", href: "/contact" },
    ];

    replaceFooterList("Latest topics", footerTopics);
    replaceFooterList("The News", footerNews);
    replaceFooterList("About", footerAbout);

    footer = footer.replace(
      /<p class="footer-copyrights">[\s\S]*?<\/p>/,
      '<p class="footer-copyrights">© 2026 Urbanstories. Hak cipta dilindungi.</p>'
    );

    footer = footer.replace(
      /<ul class="footer-site-links nav-x gap-2 fw-medium justify-center lg:justify-start">[\s\S]*?<\/ul>/,
      `<ul class="footer-site-links nav-x gap-2 fw-medium justify-center lg:justify-start">
        <li><a class="uc-link text-underline hover:text-gray-900 dark:hover:text-white duration-150" href="/privacy-policy">Privacy Policy</a></li>
        <li><a class="uc-link text-underline hover:text-gray-900 dark:hover:text-white duration-150" href="/disclaimer">Disclaimer</a></li>
      </ul>`
    );

    const logoStart = footer.indexOf('<div class="footer-logo text-center">');
    if (logoStart !== -1) {
      const logoContentStart = footer.indexOf(">", logoStart) + 1;
      const logoContentEnd = footer.indexOf("</div>", logoContentStart);
      if (logoContentStart > 0 && logoContentEnd !== -1) {
        footer =
          footer.slice(0, logoContentStart) +
          '<span class="uc-logo fw-bold text-gray-900 dark:text-white">Urbanstories</span>' +
          footer.slice(logoContentEnd);
      }
    }

    html =
      html.slice(0, footerStart) +
      footer +
      html.slice(footerEnd + "</footer>".length);
  } else {
    console.error("Footer Urbanstories V3 dilewati: batas footer tidak ditemukan.");
  }


  return html;
}
