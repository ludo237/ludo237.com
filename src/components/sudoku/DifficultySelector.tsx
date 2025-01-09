import React from 'react';
import { Label } from '~/components/ui/Label';
import { RadioGroup, RadioGroupItem } from '~/components/ui/RadioGroup';

interface DifficultySelectorProps {
  difficulty: string;
  onDifficultyChange: (newDifficulty: string) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulty,
  onDifficultyChange,
}) => {
  return (
    <RadioGroup
      className='flex items-center space-x-3'
      defaultValue={difficulty}
      onValueChange={(value) => onDifficultyChange(value)}
    >
      <div className='flex items-center space-x-1.5'>
        <RadioGroupItem value='easy' id='easy' />
        <Label htmlFor='easy'>Easy</Label>
      </div>
      <div className='flex items-center space-x-1.5'>
        <RadioGroupItem value='medium' id='medium' />
        <Label htmlFor='medium'>Medium</Label>
      </div>
      <div className='flex items-center space-x-1.5'>
        <RadioGroupItem value='hard' id='hard' />
        <Label htmlFor='hard'>Hard</Label>
      </div>
    </RadioGroup>
  );
};

export { DifficultySelector };
