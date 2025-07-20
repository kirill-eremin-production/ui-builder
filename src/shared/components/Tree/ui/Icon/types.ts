import { TreeCustomIcons, TreeNode } from '../../types';

export interface IconProps {
    node: TreeNode;
    isExpanded?: boolean;
    customIcons?: TreeCustomIcons;
    className?: string;
}
