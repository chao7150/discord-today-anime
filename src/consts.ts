export type SyoboiResponse = {
  items: Program[];
  chInfo: any;
};

export type Program = {
  StTime: number;
  EdTime: number;
  LastUpdate: number;
  Count: number;
  StOffset: number;
  TID: number;
  PID: number;
  ProgComment: string;
  ChID: number;
  SubTitle: string;
  /**
   * @see https://sites.google.com/site/syobocal/spec/proginfo-flag
   */
  Flag: "chu" | "new" | "final" | "rerun" | undefined;
  Deleted: boolean;
  Warn: boolean;
  Revision: number;
  Allday: boolean;
  Title: string;
  ShortTitle: string;
  /**
   * @see https://sites.google.com/site/syobocal/spec/title-cat
   */
  Cat: Category | undefined;
  Urls: { [key: string]: string };
  ChName: string;
  ChURL: string;
  ChGID: number;
};

export type Category =
  | "anime"
  | "anime_rerun"
  | "ova"
  | "anime_related"
  | "tokusatsu"
  | "movie"
  | "tv"
  | "radio"
  | "memo"
  | "others";
