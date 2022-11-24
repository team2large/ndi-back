import { Request, Response } from 'express';
import client from '../prisma';
import app from '../app';

export default function templateRoutes() {

  app.get('/', async (req: Request, res: Response) => {
    
    // On ajoute une "visite" du site dans la base de données
    await client.siteVisits.create({ 
        data :{ ipAddress: req.ip } 
    });

    // On récupère le nombre de visites du site
    const visits = await client.siteVisits.count();

    res.status(200).json(`${visits} visits`);
  });

}
