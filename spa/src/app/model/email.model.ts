export interface Email {
    id: number;
    from: string;
    to: string;
    subject: string;
    content: string;
    sentOn: Date;
}