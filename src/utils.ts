export const slugify = (word: string) =>
  word
    .replace(/[^a-zA-Z0-9\s]+/g, "")
    .toLowerCase()
    .replace(" ", "_");
