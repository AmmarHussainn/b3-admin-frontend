import { forwardAuth } from '@/lib/bff';

export const POST = (req) => forwardAuth(req, '/auth/login', { session: true });
