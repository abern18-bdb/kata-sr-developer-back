
import config from '../../config';
import { pino } from 'pino';
import pretty from "pino-pretty";



export abstract class Utils {
  static LOGGER = pino(
    {
      level: config.LOGGER_LEVEL,
    },
    pretty({
      levelFirst: true,
      ignore: "time,hostname,pid",
    })
  );

}
