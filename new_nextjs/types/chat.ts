
export interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    createdAt?: string;
    isLoading?: boolean;
  }
  
  export interface Conversation {
    id: string;
    title: string;
  }