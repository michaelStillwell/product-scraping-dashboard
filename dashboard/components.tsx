import type { Product as ProductModel } from "./models";

export type ProductProps = {
  product: ProductModel;
};
export const Product = ({ product }: ProductProps) => (
  <tr>
    <td
      style={{
        width: "100px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      }}
    >
      {product.name}
    </td>
    <td>${parseFloat(product.price?.toString() || "0").toFixed(2)}</td>
    <td>
      <a className="link" href={product.fullUrl} target="_blank">
        Visit
      </a>
    </td>
  </tr>
);

export type ProductListProps = {
  products: ProductModel[];
};
export const ProductList = ({ products }: ProductListProps) =>
  products.map((product) => <Product product={product} />);

export const CreateQuery = ({ msg }: any) => (
  <form hx-post="/query">
    {msg && <h3>{msg}</h3>}
    <div>
      <input name="query" className="input" />
      <select
        name="site"
        className="select"
        hx-get="/sites"
        hx-trigger="load"
        hx-swap="beforeend"
      >
        <option disabled selected value="">
          Pick a site
        </option>
      </select>
      <button>Create</button>
    </div>
  </form>
);
