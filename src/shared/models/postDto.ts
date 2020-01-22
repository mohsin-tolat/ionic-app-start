export class PostDto {
  public id: number;
  public uploadBy: number;
  public contentLink: string;
  public isCurrentUserLikedPost: boolean;
  public uploadOn: string;
  public totalLikes: number;
  public uploadedByUserName: string;
  public uploadedUserAvatar: string;
  public totalComments: number;
}
