import Homepage from "@/components/v2/Homepage";

import { getHomepageFeed } from "@/services/public/homepage-v2";

export default async function Home() {
  const homepage = await getHomepageFeed();

  return <Homepage homepage={homepage} />;
}