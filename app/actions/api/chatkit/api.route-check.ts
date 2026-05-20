import { auth } from '@clerk/nextjs/server';

/** Smoke check for ChatKit-related API routing (authenticated). */
export async function GET() {
	const { userId } = await auth();
	if (!userId) {
		return Response.json({ error: 'Unauthorized' }, { status: 401 });
	}

	return Response.json({ ok: true, userId });
}
