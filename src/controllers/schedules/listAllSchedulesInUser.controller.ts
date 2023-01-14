import { Request, Response } from "express"
import { listAllSchedulesInUserService } from "../../services/schedules/listAllSchedulesInUser.service"

export const listAllSchedulesInUserController = async (req: Request, res: Response) =>{
  
  const userId = req.params.id
  const isAdm = req.userDecode.isAdm
  const userAcess = req.userDecode.id
  
  const schedulesUser = await listAllSchedulesInUserService(userId, isAdm, userAcess)
  
  return res.status(200).json(schedulesUser)

}