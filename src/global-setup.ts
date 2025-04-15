import * as dotenv from 'dotenv';

function requireEnvVariable(envVariable: string): string {
  const enVariableValue = process.env[envVariable] ?? '[NOT SET]';
  return enVariableValue;
}

export const BASE_URL = requireEnvVariable('BASE_URL');
export const USER_EMAIL = requireEnvVariable('USER_EMAIL');
export const USER_PASSWORD = requireEnvVariable('USER_PASSWORD');

async function globalSetup(): Promise<void> {
  dotenv.config({ override: true });
}

export default globalSetup;
