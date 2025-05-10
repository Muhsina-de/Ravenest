export interface ForumTopic {
    id: number;
    title: string;
    content: string;
    category: string;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    Author?: {
      username: string;
      profilePicture?: string;
    };
    Comments?: ForumComment[];
  }
  
  export interface ForumComment {
    id: number;
    content: string;
    authorId: number;
    topicId: number;
    createdAt: string;
    updatedAt: string;
    Author?: {
      username: string;
      profilePicture?: string;
    };
  }