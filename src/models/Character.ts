export class Character {
  id!: number;

  name!: string;

  status!: string;

  species!: string;

  type!: string;

  gender!: string;

  origin!: Object;

  location!: Object;

  image!: string;

  episode!: string[];

  url!: string;

  created!: string;
}

type Object = {
    name: string;
    url: string;
}