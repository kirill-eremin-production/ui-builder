import { generateRandom } from '@/shared/utils/generateRandom';

export const generateId = () => {
    return `${new Date().getTime()}_${generateRandom()}`;
};
