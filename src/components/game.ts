type Platform = "GPL_MOBILE" | "GPL_DESKTOP";

export type Game = {
  game_id: number;
  url_thumb: string | null;
  url_background: string | null;
  name: string;
  product: string;
  category: string;
  platforms: Platform[];
  freebet_support: boolean;
};

export const fixResponse = (data: Game[]) =>
  data.map(item => ({
    ...item,
    url_thumb: item.url_thumb === "null" ? null : item.url_thumb,
    url_background: item.url_background === "null" ? null : item.url_background
  }));
