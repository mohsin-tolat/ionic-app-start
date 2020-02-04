import { PostDto } from './postDto';
import { UserDto } from './userDto.model';

export class CommentDto {
  public commentHashId: string;
  public commentedBy: UserDto;
  public postDetails: PostDto;
  public commentedOn: string;
  public content: string;
  public totalCommentLikes: number;
  public isCurrentUserLikeComment: boolean;
  public isCurrentUserComment: boolean;
}

export class UpdateCommentModel {
  public commentHashId: string;
  public commentedOn: string;
  public content: string;
  public commentedByUserHashId: string;
  public postHashId: string;
}
