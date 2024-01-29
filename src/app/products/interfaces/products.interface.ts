export interface Products {
  peliculas: Pelicula[];
}

export interface Pelicula {
  show_id:      string;
  type:         Type;
  title:        number | string;
  director:     string;
  cast:         string;
  country:      string;
  date_added:   string;
  release_year: number;
  rating:       Rating;
  duration:     string;
  listed_in:    string;
  description:  string;
}

export enum Rating {
  Empty = "",
  G = "G",
  Nc17 = "NC-17",
  Nr = "NR",
  PG = "PG",
  PG13 = "PG-13",
  R = "R",
  The66Min = "66 min",
  The74Min = "74 min",
  The84Min = "84 min",
  Tv14 = "TV-14",
  TvG = "TV-G",
  TvMa = "TV-MA",
  TvPG = "TV-PG",
  TvY = "TV-Y",
  TvY7 = "TV-Y7",
  TvY7Fv = "TV-Y7-FV",
  Ur = "UR",
}

export enum Type {
  Movie = "Movie",
  TVShow = "TV Show",
}
