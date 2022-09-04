import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import { Categories } from "../../entities/categories.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../error/AppError";
import { IAddressRequest, IPropertyRequest } from "../../interfaces/properties";
import { createAddressService } from "./createAddress.service";

export const createPropertieService = async ({
  size,
  value,
  address,
  categoryId,
}: IPropertyRequest) => {
  const propertyRepository = AppDataSource.getRepository(Properties);
  const addressRepository = AppDataSource.getRepository(Addresses);
  const categoriesRepository = AppDataSource.getRepository(Categories);

  let category: any = "";

  category = await categoriesRepository.findOne({
    where: { id: categoryId },
  });
  if (!category) {
    throw new AppError("invalid category", 404);
  }

  const { city, district, state, zipCode, number }: IAddressRequest = address;
  if (state.length !== 2 || zipCode.length !== 8)
    throw new AppError("Estado ou CEP inválido");

  await createAddressService(address);

  const endereco = new Addresses();
  endereco.city = city;
  endereco.district = district;
  endereco.state = state;
  endereco.zipCode = zipCode;
  if (number) {
    endereco.number = number;
  }

  let enderecoCadastrado: Addresses;
  try {
    enderecoCadastrado = await addressRepository.save(endereco);
  } catch (error) {
    if (error instanceof Error) throw new AppError(error.message);
  }

  const newProperty = new Properties();
  newProperty.size = size;
  newProperty.value = value;
  newProperty.address = enderecoCadastrado!;
  newProperty.category = category!;

  let prop = await propertyRepository.save(newProperty);

  return prop;
};
