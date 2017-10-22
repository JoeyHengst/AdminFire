export interface Record {
    id?: string;
    title?: string;
    content?: string;
    label?: string[];
    image: string;    
    date?: Date;
    type?: string;
    archived?: boolean;
    pending_removal?: boolean;  
  }