import dotenv from 'dotenv';
import { join } from 'path';

const __dirname = new URL('.', import.meta.url).pathname;

dotenv.config({ path: join(__dirname, '../../../.env') });
