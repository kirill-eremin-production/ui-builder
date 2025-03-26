import { AuthGuard } from '@/app/actions/shared/guards/auth-guard';

import { removeSession } from './remove-session';

export type { RemoveSession, RemoveSessionResponse } from './remove-session';

export default AuthGuard(removeSession);
