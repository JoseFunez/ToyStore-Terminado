export interface Companies {
    _id?: string;
      id: number;
      name: string;
      logo: string;
      products_in_stock?: Array<Products>;
    corporate_number: string;
    corporate_email: string;
}

export interface Products {
    idProduct: number;
    name: string;
    img: string;
    price: string;
    type: string;
    age: string;
}