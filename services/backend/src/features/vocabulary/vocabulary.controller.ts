import type { VocabularyService } from './vocabulary.service';
import { vocabularyRoutes } from './vocabulary.routes';
import type { AppRouteHandler } from '../../types/app_context';

export type VocabularyController = {
  getVocab: AppRouteHandler<typeof vocabularyRoutes.getVocab>;
  // ... other methods
};

export const createVocabularyController = (
  vocabularyService: VocabularyService,
): VocabularyController => {
  return {
    getVocab: async (c) => {
      const { id } = c.req.valid('param');
      const result = await vocabularyService.getVocab(id);
      return c.json(result);
    },
  };
};
