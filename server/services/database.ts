import { DataStoreOptions } from "nedb";

import Nedb = require("nedb");
const isBuild = process.env.NODE_ENV === 'production';
const moneyDB = new Nedb({
  filename: isBuild ? `../../../src/data/money-update.db` : 'data/money-update.db',
  autoload: true
} as DataStoreOptions);

export {
  moneyDB
}