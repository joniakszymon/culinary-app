export interface Recipe {
    _id?: string;
    title: string;
    servings: number;
    ingredients: { name: string; quantity: string }[];
    instructions: string;
    imgSrc?: string;
    difficult: number;
}