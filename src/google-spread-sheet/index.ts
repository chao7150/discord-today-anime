import { GoogleSpreadsheet } from "google-spreadsheet";

export const initialize = async (): Promise<GoogleSpreadsheet> => {
  const creds = require("../../config/anime-coin-service-account.json"); // the file saved above
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREAD_SHEET_ID);
  await doc.useServiceAccountAuth(creds);

  // or preferably, loading that info from env vars / config instead of the file
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  // example using impersonation - NOTE: your service account must have "domain-wide delegation" enabled
  // see https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority
  await doc.useServiceAccountAuth(creds);
  return doc;
};
