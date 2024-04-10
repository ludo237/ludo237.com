interface Job {
  avatar: string;
  short: string;
  company: string;
  description: string;
  startedAt: number;
  createdAt: number;
  updatedAt: number;
}

interface Post {
  slug: string;
  title: string;
  summary: string;
  cover: string;
  content: string;
  date: Date;
  tags: string[];
}

interface GithubEvent {
  id: number;
  type: string;
  actor: {
    id: string;
    login: string;
    display_login: string;
    gravatar_id: string;
    avatar_url: string;
    url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  created_at: string;
  public: boolean;
}

interface GitlabEvent {
  id: number;
  title: string;
  project_id: number;
  action_name:
    | 'approved'
    | 'accepted'
    | 'closed'
    | 'commented'
    | 'commented on'
    | 'created'
    | 'destroyed'
    | 'deleted'
    | 'expired'
    | 'joined'
    | 'left'
    | 'merged'
    | 'opened'
    | 'pushed'
    | 'pushed new'
    | 'pushed to'
    | 'reopened'
    | 'updated';
  target_id: number;
  target_iid: number;
  target_type:
    | 'issue'
    | 'milestone'
    | 'merge_request'
    | 'note'
    | 'project'
    | 'snippet'
    | 'user';
  target_title: string;
  created_at: string;
}

interface GitlabProject {
  id: number;
  description: string;
  name: string;
}
