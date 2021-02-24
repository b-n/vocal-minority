export interface TwitterUser {
  id: string;
  username: string;
  fullname: string;
}

type TweetType = 'main' | 'reply'

export interface Tweet {
  id: string;
  user: TwitterUser;
  type: TweetType;
  text: string;
}
