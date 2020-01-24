import { PagedResult } from './pagedResult';
import { PostDto } from './postDto';

export class UserDto {
  public id: number;
  public username: number;
  public firstName: string;
  public emailAdress: boolean;
  public userAvatar: string;
  public isAlreadyFollowed: boolean;
  public totalPostCount: number;
}
