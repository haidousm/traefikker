import { Request, Response } from "express";
import {
    findAllProjects,
    findProjectByName,
} from "../services/projects.service";
import { findServicesByProjectId } from "../services/services.service";
import { Project } from "../types/Project";
import { Service } from "../types/Service";
import logger from "../utils/logger";

export const getAllProjectsHandler = async (req: Request, res: Response) => {
    const projects: Project[] = await findAllProjects();
    return res.json(projects);
};

export const getAllServicesForProjectHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const projectName = req.params.projectName;
        const project = await findProjectByName(projectName);
        if (!project) {
            return res.status(404).send("Project not found");
        }
        const services: Service[] = await findServicesByProjectId(project.id);
        return res.json(services);
    } catch (e) {
        if (e instanceof Error) {
            logger.error(e.message);
        }
        return res.status(500).json({
            error: e,
        });
    }
};
