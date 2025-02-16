import { createSentencesController } from './sentences.controller';
import { createSentencesService } from './sentences.service';
import { createSentencesRepository } from './sentences.repository';
import { createRouter } from '../../utils/create-app';
import { sentencesRoutes } from './sentences.routes';
import { db } from '../../db';

// Setup dependencies
const sentencesRepo = createSentencesRepository(db);
const sentencesService = createSentencesService(sentencesRepo);
const sentencesController = createSentencesController(sentencesService);

// Create a typed router
const sentencesRouter = createRouter()
  .basePath('/sentences')
  .openapi(sentencesRoutes.getSentence, sentencesController.getSentence);

export default sentencesRouter;
