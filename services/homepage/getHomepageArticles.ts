import {
  getHomepageSource,
} from "@/services/public/articles";

export async function getHomepageArticles() {
  return getHomepageSource();
}