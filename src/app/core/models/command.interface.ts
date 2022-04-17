export interface Command {
	name: string;
	execCommand: string;
	username: string;
	password: string;
	executedAt: Date;
	executedById?: string;
}