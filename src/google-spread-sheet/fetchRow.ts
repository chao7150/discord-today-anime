import { GoogleSpreadsheet } from "google-spreadsheet";

export const fetchWhitelist = async (
  doc: GoogleSpreadsheet
): Promise<Array<string>> => {
  return fetchRow(doc, "whitelist", "title");
};

export const fetchBlacklist = async (
  doc: GoogleSpreadsheet
): Promise<Array<string>> => {
  return fetchRow(doc, "blacklist", "title");
};

const fetchRow = async (
  doc: GoogleSpreadsheet,
  sheetTitle: string,
  rowName: string
): Promise<Array<string>> => {
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle[sheetTitle];
  const rows = await sheet.getRows();
  return rows.map((row) => row[rowName]);
};
