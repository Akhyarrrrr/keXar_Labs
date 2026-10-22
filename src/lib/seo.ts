import { publicConfig } from "./config";
export function pageMeta(title: string, description: string, path = "") {
  const origin = publicConfig.siteUrl;
  return {
    title: `${title} | keXar Labs`,
    description,
    canonical: origin ? `${origin}/${path}` : undefined,
  };
}
