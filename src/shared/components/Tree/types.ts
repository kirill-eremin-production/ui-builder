export interface TreeNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: TreeNode[];
  path?: string;
  size?: number;
  modified?: Date;
  icon?: string;
}

export interface TreeContextMenuAction {
  id: string;
  label: string;
  icon?: string;
  action: (node: TreeNode) => void;
  disabled?: boolean;
}

export interface TreeCustomIcons {
  folder?: string;
  folderOpen?: string;
  file?: string;
  [key: string]: string | undefined;
}

export interface TreeProps {
  data: TreeNode[];
  onNodeClick?: (node: TreeNode) => void;
  onNodeDoubleClick?: (node: TreeNode) => void;
  onNodeSelect?: (node: TreeNode) => void;
  onNodeExpand?: (node: TreeNode) => void;
  onNodeCollapse?: (node: TreeNode) => void;
  onDragStart?: (node: TreeNode) => void;
  onDragEnd?: (node: TreeNode, targetNode?: TreeNode) => void;
  selectedNodeId?: string;
  expandedNodeIds?: string[];
  searchQuery?: string;
  contextMenuActions?: TreeContextMenuAction[];
  customIcons?: TreeCustomIcons;
  enableDragDrop?: boolean;
  enableVirtualization?: boolean;
  enableSearch?: boolean;
  maxVisibleItems?: number;
  itemHeight?: number;
  className?: string;
  style?: React.CSSProperties;
}

export interface TreeNodeProps {
  node: TreeNode;
  level: number;
  isExpanded: boolean;
  isSelected: boolean;
  onToggle: (nodeId: string) => void;
  onSelect: (node: TreeNode) => void;
  onClick?: (node: TreeNode) => void;
  onDoubleClick?: (node: TreeNode) => void;
  onContextMenu?: (event: React.MouseEvent, node: TreeNode) => void;
  onDragStart?: (event: React.DragEvent, node: TreeNode) => void;
  onDragEnd?: (event: React.DragEvent, node: TreeNode) => void;
  onDragOver?: (event: React.DragEvent, node: TreeNode) => void;
  onDrop?: (event: React.DragEvent, node: TreeNode) => void;
  customIcons?: TreeCustomIcons;
  enableDragDrop?: boolean;
  searchQuery?: string;
}

export interface ContextMenuProps {
  x: number;
  y: number;
  node: TreeNode;
  actions: TreeContextMenuAction[];
  onClose: () => void;
}

export interface VirtualizedListProps {
  items: Array<TreeNode & { level: number }>;
  itemHeight: number;
  maxVisibleItems: number;
  renderItem: (item: TreeNode & { level: number }, index: number) => React.ReactNode;
}

export interface SearchResult {
  node: TreeNode;
  path: string;
  matches: number;
}