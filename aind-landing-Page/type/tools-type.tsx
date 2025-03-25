export interface Tool {
  name: string;
  description: string;
  date_added: string;
  icon_url: string;
  oss: boolean;
  tags: string[];
  verified: boolean;
  website_url: string;
  popular: boolean;
}

export interface Category {
  description: string;
  level: number;
  name: string;
  tools: Tool[];
}

export interface Domain {
  categories: Category[];
  description: string;
  level: number;
  name: string;
}

export interface ToolsData {
  domains: Domain[];
}
