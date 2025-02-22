export async function GET() {
    return Response.redirect(
        `https://oauth.yandex.ru/authorize?response_type=code&client_id=${process.env.YANDEX_CLIENT_ID}`,
        307
    );
}
