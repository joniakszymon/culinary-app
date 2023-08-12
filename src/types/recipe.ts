export interface Recipe {
    id: number;
    title: string;
    servings: number;
    ingredients: { name: string; quantity: string }[];
    instructions: string;
    imgSrc?: string;
    difficult: number;
}