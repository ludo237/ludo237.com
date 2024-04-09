import {Github, Gitlab} from "lucide-react";
import Link from "next/link";
import {FC} from "react";
import {GithubFeed} from "~/components/GithubFeed";
import {GitlabFeed} from "~/components/GitlabFeed";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/Card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "~/components/ui/Tabs";

const githubApiKey = process.env.GITHUB_FEED_TOKEN;
const gitlabApiKey = process.env.GITLAB_FEED_TOKEN;

const GitFeedCard: FC = async () => {

  const githubResponse = await fetch('https://api.github.com/users/ludo237/events', {
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${githubApiKey}`,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  const gitlabResponse = await fetch('https://gitlab.com/api/v4/events', {
    headers: {
      'Authorization': `Bearer ${gitlabApiKey}`,
      'Content-Type': 'application/json'
    }
  });

  const githubEvents: GithubEvent[] = await githubResponse.json();
  const gitlabEvents: GitlabEvent[] = await gitlabResponse.json();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sky-500">Git Feed</CardTitle>
        <CardDescription>Activities from Gitlab and Github profiles</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="github" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="github">
              <Github className="size-6" />
            </TabsTrigger>
            <TabsTrigger value="gitlab">
              <Gitlab className="size-6" />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="github">
            <GithubFeed events={githubEvents} />
          </TabsContent>
          <TabsContent value="gitlab">
            <GitlabFeed events={gitlabEvents} />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        <div className="flex items-center space-x-1.5 text-sm">
          <CardDescription>My profiles:</CardDescription>
          <Link href="https://github.com/ludo237">
            <CardDescription>
              <Github />
            </CardDescription>
          </Link>
          <Link href="https://gitlab.com/ludo237">
            <CardDescription>
              <Gitlab />
            </CardDescription>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

export {GitFeedCard};
