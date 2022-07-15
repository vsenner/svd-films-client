export const getOriginalImage = (path: string): string => {
  return `https://image.tmdb.org/t/p/original${path}`;
};

export const getSmallImage = (path: string): string => {
  return `https://image.tmdb.org/t/p/w500${path}`;
};

export const getInitials = (name: string): string => {
  return name[0].toUpperCase();
};
