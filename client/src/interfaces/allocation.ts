import { Tweet } from './tweet'

export interface Allocation {
  focus: Tweet;
  main: Tweet;
  replies: Array<Tweet>;
}
