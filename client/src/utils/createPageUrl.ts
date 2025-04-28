export function createPageUrl(name: string) {
    if (!name || name === "") return "/";
    return "/" + name.toLowerCase();
  }
  