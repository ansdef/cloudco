import { Request, Response } from 'express';
import Institution from '../models/Institution';
import Course from '../models/Course';
import { Op } from 'sequelize';

export const getAllInstitutions = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    
    let whereClause: any = {};
    if (search) {
      whereClause = {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { address: { [Op.iLike]: `%${search}%` } },
        ],
      };
    }

    const institutions = await Institution.findAll({
      where: whereClause,
      order: [['name', 'ASC']],
    });

    res.json(institutions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getInstitutionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const institution = await Institution.findByPk(id, {
      include: [
        {
          model: Course,
          as: 'courses',
        },
      ],
    });

    if (!institution) {
      return res.status(404).json({ error: 'Institution not found' });
    }

    res.json(institution);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createInstitution = async (req: Request, res: Response) => {
  try {
    const institution = await Institution.create(req.body);
    res.status(201).json(institution);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateInstitution = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const institution = await Institution.findByPk(id);

    if (!institution) {
      return res.status(404).json({ error: 'Institution not found' });
    }

    await institution.update(req.body);
    res.json(institution);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteInstitution = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const institution = await Institution.findByPk(id);

    if (!institution) {
      return res.status(404).json({ error: 'Institution not found' });
    }

    await institution.destroy();
    res.json({ message: 'Institution deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
