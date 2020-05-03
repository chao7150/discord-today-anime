import {
  RawSyoboiResponse,
  SyoboiResponse,
  RawProgram,
  Program,
} from "../const";
import { parseFlag } from "./flag";
import { parseCategory } from "./category";
import { parseUrls } from "./urls";

const programConvertor = (program: RawProgram): Program => ({
  ...program,
  StTime: parseInt(program.StTime, 10),
  EdTime: parseInt(program.EdTime, 10),
  LastUpdate: parseInt(program.LastUpdate, 10),
  Count: parseInt(program.Count, 10),
  StOffset: parseInt(program.StOffset, 10),
  TID: parseInt(program.TID, 10),
  PID: parseInt(program.PID, 10),
  ChID: parseInt(program.ChID, 10),
  Flag: parseFlag(program.Flag),
  Deleted: Boolean(program.Deleted),
  Warn: Boolean(program.Warn),
  Revision: parseInt(program.Revision, 10),
  Allday: Boolean(program.Allday),
  Cat: parseCategory(program.Cat),
  Urls: parseUrls(program.Urls),
  ChGID: parseInt(program.ChGID, 10),
});

export const convertor = (rawResponse: RawSyoboiResponse): SyoboiResponse => ({
  items: rawResponse.items.map(programConvertor),
  chInfo: rawResponse.chInfo,
});
