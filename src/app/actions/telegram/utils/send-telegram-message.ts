import { env } from '@/shared/env';

export async function sendTelegramMessage(text: string) {
    return await fetch(
        `https://api.telegram.org/bot${env.TELEGRAM_BOT_SECRET}/sendMessage`,
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                chat_id: env.TELEGRAM_USER_ID,
                parse_mode: 'Markdown',
                text,
            }),
        }
    );
}
