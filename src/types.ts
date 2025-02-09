export interface Job {
  title: string;
  location: string;
}

export interface Member {
  name: string;
  bio: string;
}

export interface Output {
  [memberName: string]: {
    bio: string;
    matchedJobs: Job[];
  };
}
