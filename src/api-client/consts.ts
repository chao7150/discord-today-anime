export type RawSyoboiResponse = {
  items: RawProgram[];
  chInfo: any;
};

export type RawProgram = {
  StTime: string;
  EdTime: string;
  LastUpdate: string;
  Count: string;
  StOffset: string;
  TID: string;
  PID: string;
  ProgComment: string;
  ChID: string;
  SubTitle: string;
  Flag: string;
  Deleted: string;
  Warn: string;
  Revision: string;
  Allday: string;
  Title: string;
  ShortTitle: string;
  Cat: string;
  Urls: string;
  ChName: string;
  ChURL: string;
  ChGID: string;
};
