import React from "react";

interface Product {
  name: string;
  price?: number;
  url?: string;
}

interface ComponentProps {
  products: Product[];
}

export function Component({ products }: ComponentProps) {
  return (
    <body>
      <h1>Products I am interested in</h1>
      <Table values={products} />
    </body>
  );
}

interface TableProps {
  values: Product[];
}
function Table({ values }: TableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>URL</th>
        </tr>
      </thead>

      <tbody>
        {values &&
          values.map((value: Product) => (
            <tr>
              <td>{value.name}</td>
              <td>{value.price}</td>
              <td>{value.url}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
