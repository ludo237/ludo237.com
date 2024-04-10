import { Github, Gitlab } from 'lucide-react';
import { FC } from 'react';
import { getGithubEvents, getGitlabEvents } from '~/actions';
import { GithubFeed } from '~/components/GithubFeed';
import { GitlabFeed } from '~/components/GitlabFeed';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '~/components/ui';

const GitFeedCard: FC = async () => {
  const githubResponse = await getGithubEvents();
  const gitlabResponse = await getGitlabEvents();
  const githubEvents: GithubEvent[] = await githubResponse.json();
  const gitlabEvents: GitlabEvent[] = await gitlabResponse.json();

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-sky-500'>Git Feed</CardTitle>
        <CardDescription>
          Activities from Gitlab and Github profiles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='github' className='w-full'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='github'>
              <Github className='size-6' />
            </TabsTrigger>
            <TabsTrigger value='gitlab'>
              <Gitlab className='size-6' />
            </TabsTrigger>
          </TabsList>
          <TabsContent value='github'>
            <GithubFeed events={githubEvents} />
          </TabsContent>
          <TabsContent value='gitlab'>
            <GitlabFeed events={gitlabEvents} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export { GitFeedCard };
