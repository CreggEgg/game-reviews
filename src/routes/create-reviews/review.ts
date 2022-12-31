type Review =
	| {
			game: string;
			rating: number;
			tags: string[];
	  }
	| undefined
	| {};
export default Review;
