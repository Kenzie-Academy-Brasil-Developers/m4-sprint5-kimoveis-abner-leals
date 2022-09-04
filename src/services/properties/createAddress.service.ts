import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import { AppError } from "../../error/AppError";
import { IAddressRequest } from "../../interfaces/properties";

export const createAddressService = async ({
  city,
  district,
  state,
  zipCode,
  number,
}: IAddressRequest) => {
  const addressRepository = AppDataSource.getRepository(Addresses);
  let exist: any;
  if (!number) {
    exist = await addressRepository.findOne({
      where: {
        city: city,
        district: district,
        state: state,
        zipCode: zipCode,
      },
    });
  } else {
    exist = await addressRepository.findOne({
      where: {
        city: city,
        district: district,
        state: state,
        zipCode: zipCode,
        number: number,
      },
    });
  }
  if (exist) {
    throw new AppError("Unidade já cadastrada", 400);
  }
};
