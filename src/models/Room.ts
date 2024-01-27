export type Room = {
	id: string;
	name: string;
	description: string;
	dimensions: Array<Dimension>;
	squareFeet: number;
	squareInches: number;
}

export type Dimension = {
	description: string;
	length: number;
	width: number;
	squareInches: number;
	squareFeet: number
}