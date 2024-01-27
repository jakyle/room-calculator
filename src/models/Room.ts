export type Room = {
	id: string;
	name: string;
	description: string;
	dimensions: Array<Dimensions>
}

export type Dimensions = {
	length: number;
	width: number;
}