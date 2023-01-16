import AppDataSource from "../../data-source"
import { Location } from "../../entities/location.entity"
import { AppError } from "../../errors/appError"
import { IlocationBody } from "../../interfaces/location"

export const updateLocationService = async (locationId: string, isAdm: boolean, body:IlocationBody) =>{

  const locationRepository = AppDataSource.getRepository(Location)

  const location = await locationRepository.findOneBy({id: locationId})

  if(!location){
    throw new AppError('Location is invalid!', 404)
  }

  if(!isAdm){
    throw new AppError('you are not authorized to use this function', 401)
  }

  const locationUpdate = {
    ...location,
    ...body
  }

  await locationRepository.save(locationUpdate)

  return locationUpdate
}