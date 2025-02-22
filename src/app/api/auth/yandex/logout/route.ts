import { getSession } from '@/app/actions/sessions';

export async function GET() {
    const session = await getSession();
    session.destroy();

    return Response.redirect(`https://${process.env.host}`);
}
