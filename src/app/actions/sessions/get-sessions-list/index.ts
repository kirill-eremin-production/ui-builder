import { AuthGuard } from '@/app/actions/shared/guards/auth-guard';

import { getSessionsList } from './get-sessions-list';

export type {
    GetSessionsList,
    GetSessionsListResponse,
} from './get-sessions-list';

export default AuthGuard(getSessionsList);
