import { ModalType } from '../models/ModelTypeSchema';
import { useSharedState } from './useSharedState';

const useModalWindow = (modalType: ModalType) => {
  const [isVisible, setIsVisible] = useSharedState<boolean>(modalType, false);

  return { isVisible, setIsVisible };
};

export { useModalWindow };
