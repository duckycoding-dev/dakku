import { createVocabularyController } from './vocabulary.controller';
import { createVocabularyService } from './vocabulary.service';
import { createVocabularyRepository } from './vocabulary.repository';
import { createRouter } from '../../utils/create-app';

import { vocabularyRoutes } from './vocabulary.routes';
import { db } from '../../db';
// Setup dependencies
const vocabularyRepo = createVocabularyRepository(db);
const vocabularyService = createVocabularyService(vocabularyRepo);
const vocabularyController = createVocabularyController(vocabularyService);

// Create a typed router
const vocabularyRouter = createRouter()
  .basePath('/vocabulary')
  .openapi(vocabularyRoutes.getVocab, vocabularyController.getVocab);

export default vocabularyRouter;
