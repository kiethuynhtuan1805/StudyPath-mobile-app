type CommentType = {
  _id: string;
  user: User;
  question: string;
  questionReplies: CommentType[];
};

type ReviewType = {
  user: User;
  rating?: number;
  comment: string;
  commentReplies?: ReviewType[];
};

type LinkType = {
  title: string;
  url: string;
};

type CourseDataType = {
  _id: string | any;
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: LinkType[];
  suggestion: string;
  questions: CommentType[];
};

type BenefitType = {
  title: string;
};

type PrerequisiteType = {
  title: string;
};

type CoursesType = {
  id: string;
  name: string;
  description: string;
  progress: number;
  startDate: Date | string;
  endDate: Date | string;
  numberOfCredits: number;
  category: string;
  outcome: string;
};
