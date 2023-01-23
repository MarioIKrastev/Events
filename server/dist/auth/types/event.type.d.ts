export type Event = {
    title: string;
    description: string;
    day: string;
    month: string;
    year: string;
    user: {
        username: string;
        email: string;
    };
};
