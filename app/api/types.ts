export interface Model {
  id: string,
  createdAt: Date,
  updatedAt: Date,
}

export interface Post extends Model {
  readonly slug: string,
  title: string,
  excerpt: string,
  markdown: string,
  html: string,
}
