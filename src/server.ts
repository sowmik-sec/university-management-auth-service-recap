import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorLogger, logger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', err => {
  errorLogger.error(err);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info(`Database is connected successfully`);
    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error('Failed to connect db', error);
  }
  process.on('unhandledRejection', err => {
    console.error('Unhandled Rejection detected, shutting down gracefully...');
    if (server) {
      server.close(() => {
        errorLogger.error(err); // Log the error for debugging
        process.exit(1);
      });
    } else {
      process.exit(1);
    }

    // Give a short timeout in case server.close() hangs
    setTimeout(() => {
      console.error('Forcing server shutdown after timeout');
      process.exit(1);
    }, 5000); // 5 seconds timeout
  });
}

main().catch(err => console.log(err));

// process.on('SIGTERM', () => {
//   logger.info('SIGTERM is received');
//   if (server) {
//     server.close();
//   }
// });
