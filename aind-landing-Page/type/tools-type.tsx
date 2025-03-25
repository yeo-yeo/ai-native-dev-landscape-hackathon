export interface Tool {
  name: string;
  description: string;
  date_added: string;
  icon_url: string;
  oss: boolean;
  tags: string[];
  verified: boolean;
  website_url: string;
}

export interface Category {
  description: string;
  level: number;
  name: string;
  tools: Tool[];
}

export interface Domain {
  categories: Category[];
}

export interface ToolsData {
  domains: Domain[];
}
