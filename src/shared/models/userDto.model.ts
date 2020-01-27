import { PostDto } from './postDto';

export class UserDto {
  public userHashId: string;
  public username: number;
  public firstName: string;
  public emailAdress: boolean;
  public userAvatar: string;
  public isAlreadyFollowed: boolean;
  public totalPostCount: number;
  public allUserPosts: PostDto[];
  public isCurrentUser: boolean;
  public totalFollowers: number;
  public totalFollowings: number;
}
