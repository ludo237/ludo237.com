export type CreateInquiry = {
  name: string,
  email: string,
  content: string,
}

interface Model {
  id: string,
  createdAt: Date,
  updatedAt: Date,
}

export interface Inquiry extends Model {
  name: string,
  email: string,
  content: string,
}



