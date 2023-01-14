import {Request, Response } from 'express'
import { listAllSchedulesInIstructorService } from '../../services/schedules/listAllSchedulesInInstructor.service'

export const listAllSchedulesInIstructorController = async (req: Request, res: Response) =>{
  
  const instructorId = req.params.id
  const userAcess = req.userDecode.id
  const isAdm = req.userDecode.isAdm

  const schedulesIstructor = await listAllSchedulesInIstructorService(instructorId, userAcess, isAdm)

  return res.status(200).json(schedulesIstructor)

}