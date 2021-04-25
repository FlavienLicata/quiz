export class Participant {
  id: number;
  name: string;
  email: string;
  quizId: number;
  token: string;
  invitationDate: Date;
  relanceDate: Date;
  participationDate: Date;
  timer: number;
  completionRate: number;
  successRate: number;
}
