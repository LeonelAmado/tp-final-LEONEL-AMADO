import { Request, Response } from "express";
import * as productService from "../services/product.service";
import { IProduct, Product } from "../models/products.model";

export const createProduct = async (req: Request, res: Response) => {
  try {
    console.log("createProduct");
    const productData: IProduct = req.body;

    console.log(productData);

    const product = await productService.createProduct(productData);
    return res.status(201).json(product);
  } catch (error: any) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json("duplicated key error");
    }
    return res.status(500).json("algo pasó");
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("getAllProducts");
    const product = await productService.getAllProducts();

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: "Error al obetener productos" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (Array.isArray(id)) {
    return res.status(400).json({ mensaje: "ID inválido" }); // Ver que tan bien está
  }
  try {
    console.log("getProductById");
    console.log(req.params);

    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error al obtener el producto ${id}` });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (Array.isArray(id)) {
    return res.status(400).json({ mensaje: "ID inválido" }); // Ver que tan bien está
  }
  try {
    console.log("updateProduct");

    // validations de lo que viene este correcto

    const productData: IProduct = req.body;

    const product = await productService.updateProduct(id, productData);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(400)
      .json({ error: `Error al actualizar el producto ${id}` });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (Array.isArray(id)) {
    return res.status(400).json({ mensaje: "ID inválido" }); // Ver que tan bien está
  }
  try {
    console.log("deleteProduct");

    const product = await productService.deleteProduct(id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res.status(200).json({ message: "Producto eliminado!" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error al eliminar el producto ${id}` });
  }
};
