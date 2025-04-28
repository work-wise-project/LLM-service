import { config as configDotenv } from 'dotenv';

type Config = {
    env: 'development' | 'production';
    port: number;
    chatGPTApiKey: string;
    googleProjectId: string;
    googleCloudKey: string;
};

const REQUIRED_ENVIRONMENT_VARIABLES = ['CHAT_GPT_API_KEY', 'GOOGLE_PROJECT_ID', 'GOOGLE_CLOUD_KEY'];

const checkEnvironmentVariables = () => {
    if (REQUIRED_ENVIRONMENT_VARIABLES.some((variable) => !(variable in process.env))) {
        const missingVariables = REQUIRED_ENVIRONMENT_VARIABLES.find((variable) => !(variable in process.env));
        throw new Error(`missing environment variable: ${missingVariables}`);
    }
};

let config: Config;

export const getConfig = () => {
    if (!config) {
        configDotenv();
        checkEnvironmentVariables();

        const { env } = process as { env: Record<string, string> };

        config = {
            env: env.NODE_ENV === 'production' ? env.NODE_ENV : 'development',
            port: Number(env.PORT) || 4002,
            chatGPTApiKey: env.CHAT_GPT_API_KEY,
            googleProjectId: env.GOOGLE_PROJECT_ID,
            googleCloudKey: env.GOOGLE_CLOUD_KEY,
        };
    }

    return config;
};
