import AppDataSource from "../../data-source";
import { Location } from "../../entities/location.entity";

export const listLocationService = async (): Promise<Location[]> => {
  const locationRepository = AppDataSource.getRepository(Location);

  const listLocatios = await locationRepository.find();

  return listLocatios;
};
