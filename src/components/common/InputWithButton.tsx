import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';

type Props = {
  label: string;
  placeholder: string;
  onClick: () => void;
};
export const InputWithButton: React.FC<Props> = ({
  label,
  placeholder,
  onClick,
}) => {
  return (
    <InputGroup size="md">
      <Input pr="6rem" placeholder={placeholder} focusBorderColor="cyan.700" />
      <InputRightElement
        width="6rem"
        bg={'cyan.700'}
        border={'1px solid cyan.700'}
        borderRightRadius={'md'}
      >
        <Button h="100%" onClick={onClick} colorScheme={'cyan.700'}>
          {label}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
