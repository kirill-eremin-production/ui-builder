'use client';

import { FC } from 'react';

import { PageConfig } from '@/shared/types/PageConfig';

import { PageCanvas } from '@/Renderer/components/PageCanvas';

export type RootProps = {
    config: PageConfig;
};

export const Root: FC<RootProps> = ({ config }) => {
    return <PageCanvas config={config} width={1024} />;
};
