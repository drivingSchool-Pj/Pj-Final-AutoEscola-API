import AppDataSource from "../../data-source";
import { Location } from "../../entities/location.entity";

export const listLocationDataService = async (locationId: string) => {
  const locationRepository = AppDataSource.getRepository(Location);

  const locationData = await locationRepository.findOneBy({
    id: locationId,
  });

  console.log(locationData);

  return locationData;
};
