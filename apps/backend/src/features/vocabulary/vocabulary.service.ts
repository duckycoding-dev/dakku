import { AppError } from '../../utils/errors';
import type { VocabularyRepository } from './vocabulary.repository';
import type { Vocabulary } from './vocabulary.db';

export type VocabularyService = {
  getVocab: (id: number) => Promise<Vocabulary>;
  // ... other methods
};

export const createVocabularyService = (
  userRepository: VocabularyRepository,
): VocabularyService => {
  return {
    getVocab: async (id) => {
      const vocab = await userRepository.getVocab(id);
      if (!vocab) {
        throw new AppError('NOT_FOUND', {
          message: 'Vocabulary not found',
        });
      }
      return vocab;
    },
  };
};
