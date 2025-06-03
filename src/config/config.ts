import { config as configDotenv } from 'dotenv';

type Config = {
    isProductionEnv: boolean;
    port: number;
    googleProjectId: string;
    googleCloudKey: string;
    googleApiKey: string;
    googleSearchCX: string;
    httpsKey: string;
    httpsCert: string;
};

const REQUIRED_ENVIRONMENT_VARIABLES = ['GOOGLE_PROJECT_ID', 'GOOGLE_CLOUD_KEY', 'GOOGLE_SEARCH_CX', 'GOOGLE_API_KEY'];

const checkEnvironmentVariables = (requiredEnvironmentVariables: string[]) => {
    if (requiredEnvironmentVariables.some((variable) => !(variable in process.env))) {
        const missingVariables = requiredEnvironmentVariables.find((variable) => !(variable in process.env));
        throw new Error(`missing environment variable: ${missingVariables}`);
    }
};

let config: Config;

export const getConfig = () => {
    if (!config) {
        configDotenv();

        const { env } = process as { env: Record<string, string> };
        const isProductionEnv = env.NODE_ENV === 'production';

        checkEnvironmentVariables([
            ...REQUIRED_ENVIRONMENT_VARIABLES,
            ...(isProductionEnv ? ['HTTPS_KEY', 'HTTPS_CERT'] : []),
        ]);

        config = {
            isProductionEnv,
            port: Number(env.PORT) || 4002,
            googleProjectId: env.GOOGLE_PROJECT_ID,
            googleCloudKey: env.GOOGLE_CLOUD_KEY,
            googleSearchCX: env.GOOGLE_SEARCH_CX,
            googleApiKey: env.GOOGLE_API_KEY,
            httpsKey: env.HTTPS_KEY || '',
            httpsCert: env.HTTPS_CERT || '',
        };
    }

    return config;
};
