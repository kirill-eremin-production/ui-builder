import React from 'react';

import {
    Archive,
    Code,
    File,
    FileText,
    Folder,
    FolderOpen,
} from '@gravity-ui/icons';

import { getFileIconType } from '../../utils';

import { IconProps } from './types';

export const Icon: React.FC<IconProps> = ({
    node,
    isExpanded = false,
    customIcons,
    className,
}) => {
    const getIconByType = (iconType: string): React.ReactNode => {
        switch (iconType) {
            case 'text':
            case 'document':
                return <FileText />;
            case 'code':
                return <Code />;
            case 'image':
            case 'video':
            case 'audio':
                return <File />;
            case 'archive':
                return <Archive />;
            default:
                return <File />;
        }
    };

    const getNodeIcon = (): React.ReactNode => {
        if (customIcons) {
            if (node.type === 'folder') {
                const iconName = isExpanded
                    ? customIcons.folderOpen || customIcons.folder
                    : customIcons.folder;

                if (iconName) {
                    return <span>{iconName}</span>;
                }
            } else {
                const extension = node.name.split('.').pop()?.toLowerCase();
                const iconName =
                    customIcons[extension || ''] || customIcons.file;

                if (iconName) {
                    return <span>{iconName}</span>;
                }
            }
        }

        if (node.icon) {
            return <span>{node.icon}</span>;
        }

        if (node.type === 'folder') {
            return isExpanded ? <FolderOpen /> : <Folder />;
        } else {
            const iconType = getFileIconType(node.name);
            return getIconByType(iconType);
        }
    };

    return <span className={className}>{getNodeIcon()}</span>;
};
