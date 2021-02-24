import React from 'react'

type TweetType = 'main' | 'reply'

interface TwitterUser {
  id: string;
  username: string;
  fullname: string;
}

interface TweetProps {
  id: string;
  type: TweetType;
  user: TwitterUser;
  text: string;
  date: string;
}

const Tweet: React.FC<TweetProps> = () => {
  return (
    <div>Tweet goes here</div>
  )
}

export default Tweet
