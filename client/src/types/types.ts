export type productType = {
  _id: string;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments: commentType[];
};

export type commentType = {
  _id: string;
  content: string;
  user: userType;
  replies: replyType[];
};

export type replyType = {
  _id: string;
  content: string;
  replyingTo: string;
  user: userType;
};

type userType = {
  _id: string;
  image: string;
  name: string;
  username: string;
};
