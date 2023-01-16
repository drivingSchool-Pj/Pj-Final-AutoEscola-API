import { Request, Response } from "express"
import { updateLocationService } from "../../services/location/updateLocation.service"

export const updateLocationController = async (req:Request, res:Response) =>{
  const body = req.body
  const location = req.params.id
  const isAdm = req.userDecode.isAdm
  const updateLocation = await updateLocationService(location, isAdm, body)
  return res.status(200).json(updateLocation)
}