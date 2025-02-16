import type { SentencesService } from './sentences.service';
import { sentencesRoutes } from './sentences.routes';
import type { AppRouteHandler } from '../../types/app_context';

export type SentencesController = {
  getSentence: AppRouteHandler<typeof sentencesRoutes.getSentence>;
  // ... other methods
};

export const createSentencesController = (
  sentencesService: SentencesService,
): SentencesController => {
  return {
    getSentence: async (c) => {
      const { id } = c.req.valid('param');
      const result = await sentencesService.getSentence(id);
      return c.json(result);
    },
  };
};
