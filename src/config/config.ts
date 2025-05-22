import { config as configDotenv } from 'dotenv';

type Config = {
    isProductionEnv: boolean;
    port: number;
    chatGPTApiKey: string;
    googleProjectId: string;
    googleCloudKey: string;
    httpsKey: string;
    httpsCert: string;
};

const REQUIRED_ENVIRONMENT_VARIABLES = ['CHAT_GPT_API_KEY', 'GOOGLE_PROJECT_ID', 'GOOGLE_CLOUD_KEY'];

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
            chatGPTApiKey: env.CHAT_GPT_API_KEY,
            googleProjectId: env.GOOGLE_PROJECT_ID,
            googleCloudKey: env.GOOGLE_CLOUD_KEY,
            httpsKey: env.HTTPS_KEY || '',
            httpsCert: env.HTTPS_CERT || '',
        };
    }

    return config;
};
