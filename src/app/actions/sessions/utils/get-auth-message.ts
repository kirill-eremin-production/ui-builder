import { env } from '@/app/actions/shared/constants';

export type GetAuthMessageParams = {
    code: string;
    userAgent: string;
};

export function getAuthMessage({
    userAgent,
    ...params
}: GetAuthMessageParams): string {
    const queryParams = new URLSearchParams(params);

    const authLink = `${env.APP_HOST}/auth?${queryParams.toString()}`;

    const userAgentText = '```User-Agent\n' + userAgent + '```';

    return `Ваш код для входа в ui-builder: \`${params.code}\`\n\nВаша ссылка для входа в ui-builder:\n${authLink}\n\n${userAgentText}`;
}
