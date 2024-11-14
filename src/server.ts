import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { Server } from 'http';

process.on('uncaughtException', err => {
  console.log(err);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`Database is connected successfully`);
    server = app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    console.log('Failed to connect db', error);
  }
  process.on('unhandledRejection', err => {
    console.error('Unhandled Rejection detected, shutting down gracefully...');
    if (server) {
      server.close(() => {
        console.log(err); // Log the error for debugging
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
//   console.log('SIGTERM is received');
//   if (server) {
//     server.close();
//   }
// });
