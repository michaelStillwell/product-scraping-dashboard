import { Product } from "./models";

const PATH: string = `${import.meta.dir}/products.json`;

export const selectProducts = async (): Promise<Product[]> => {
  const productsFile = Bun.file(PATH);
  const products = await productsFile.json();
  return products;
};

export const selectProduct = async (id: number): Promise<Product[]> => {
  return (await selectProducts()).filter((product) => product.id === id);
};

export const insertProducts = async (product: Product): Promise<Product[]> => {
  const products = await selectProducts();
  // TODO: name and id must be unique
  if (!products.some((p) => Object.is(p, product))) {
    products.push(product);

    try {
      Bun.write(PATH, JSON.stringify(products, null, 2));
    } catch (_) {
      console.error("didn't update products.json");
    }
  }
  return products;
};

export const updateProducts = async (
  id: number,
  product: Product,
): Promise<Product[]> => {
  const products = await selectProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index >= 0) {
    products[index] = { ...product };

    try {
      Bun.write(PATH, JSON.stringify(products, null, 2));
    } catch (_) {
      console.error("didn't update products.json");
    }
  }

  return products;
};

export const deleteProducts = async (id: number): Promise<Product[]> => {
  let products = (await selectProducts()).filter(
    (product) => product.id !== id,
  );

  try {
    Bun.write(PATH, JSON.stringify(products, null, 2));
  } catch (_) {
    console.error("didn't update products.json");
  }

  return products;
};
