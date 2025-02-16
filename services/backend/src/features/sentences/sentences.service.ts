import { AppError } from '../../utils/errors';
import type { SentencesRepository } from './sentences.repository';
import type { Sentence } from './sentences.db';

export type SentencesService = {
  getSentence: (id: number) => Promise<Sentence>;
  // ... other methods
};

export const createSentencesService = (
  sentencesRepository: SentencesRepository,
): SentencesService => {
  return {
    getSentence: async (id) => {
      const sentence = await sentencesRepository.getSentence(id);
      if (!sentence) {
        throw new AppError('NOT_FOUND', {
          message: 'Sentence not found',
        });
      }
      return sentence;
    },
  };
};
