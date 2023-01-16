import AppDataSource from "../../data-source";
import { Location } from "../../entities/location.entity";
import { AppError } from "../../errors/appError";
import { ILocationRequest } from "../../interfaces/location/location.interface";

export const createLocationService = async (
  locationData: ILocationRequest
): Promise<ILocationRequest> => {
  const { street, city, state, complement } = locationData;
  const locationRepository = AppDataSource.getRepository(Location);

  const locationExist = await locationRepository.findOneBy({
    street: street,
    city: city,
    state: state,
    complement: complement,
  });

  if (locationExist) {
    throw new AppError("Location already exists!", 409);
  }

  const newLocation = locationRepository.create(locationData);

  await locationRepository.save(newLocation);

  return newLocation;
};
