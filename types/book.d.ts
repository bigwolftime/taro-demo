interface Book {
  id: number;
  name: string;
  authors: number[];
  coverUrl: string;
  isbn: string;
  publicationTime: string;
  presses: number[],
  desc: string;

  authorList?: Author[],
  pressNames?: string[];
}
