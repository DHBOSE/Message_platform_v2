export enum Priority {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}

export enum Category {
  GENERAL = '综合管理通知',
  CENTRIFUGAL = '离心技术通知',
  AXIAL = '轴流透平通知',
  AIR_SEPARATION = '空分专项通知',
  CFD = 'CFD及强度计算通知',
  ASSEMBLY = '总成技术通知',
}

export interface NotificationItem {
  id: string;
  title: string;
  category: Category;
  department: string;
  date: string;
  priority: Priority;
  summary: string;
  content: string;
  read?: boolean;
}

export interface User {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  status: 'Active' | 'Inactive';
}

export interface DocResource {
  id: string;
  title: string;
  type: 'PDF' | 'DOC' | 'XLS';
  size: string;
  date: string;
  downloads: number;
}

export interface ForumPost {
  id: string;
  title: string;
  author: string;
  replies: number;
  views: number;
  tag: string;
  isHot?: boolean;
}