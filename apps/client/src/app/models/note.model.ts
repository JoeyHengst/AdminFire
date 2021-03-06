export interface Note {
  id?: string;
  name?: string;
  description?: string;
  label?: string[];
  color?: string;
  date?: Date;
  type?: string;
  archived?: boolean;
  pending_removal?: boolean;  
}